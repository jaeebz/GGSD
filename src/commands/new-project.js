/**
 * new-project command
 * 
 * Initialize a new GGSD project with questions → research → roadmap
 * 
 * Adapted from Get Shit Done by TÂCHES (glittercowboy)
 * https://github.com/glittercowboy/get-shit-done
 */

import { getGeminiClient, MODELS } from '../gemini/client.js';
import { PROMPTS } from '../gemini/prompts.js';
import { 
  askProjectQuestions,
  askRequirementsQuestions,
  confirmRoadmap 
} from '../utils/questions.js';
import {
  writePlanningFile,
  planningFileExists,
  createPlanningSubdir
} from '../utils/file-ops.js';
import { 
  log, 
  spinner, 
  showCreatedFiles, 
  showNextSteps,
  showError 
} from '../utils/display.js';

/**
 * Main new-project workflow
 */
export async function newProject() {
  try {
    log.header('🚀 GGSD New Project');
    
    // 1. Check if project already initialized
    if (await planningFileExists('PROJECT.md')) {
      log.error('Project already initialized');
      log.info('Found existing .planning/ directory');
      log.info('Use ggsd new-milestone to start a new version');
      return;
    }
    
    // 2. Ask project questions
    const projectInfo = await askProjectQuestions();
    
    // 3. Optional: Research domain
    let research = null;
    if (projectInfo.research) {
      research = await conductResearch(projectInfo);
    }
    
    // 4. Generate requirements
    const requirements = await generateRequirements(projectInfo, research);
    
    // 5. Confirm scope with user
    const scopeConfirmed = await confirmScope(requirements);
    if (!scopeConfirmed) {
      log.warning('Project initialization cancelled');
      return;
    }
    
    // 6. Generate roadmap
    const roadmap = await generateRoadmap(projectInfo, requirements, research);
    
    // 7. Confirm roadmap
    const roadmapConfirmed = await confirmRoadmap(roadmap.formatted);
    if (!roadmapConfirmed) {
      log.warning('Project initialization cancelled');
      return;
    }
    
    // 8. Create planning files
    const createdFiles = await createPlanningFiles(
      projectInfo,
      requirements,
      roadmap,
      research
    );
    
    // 9. Show success
    showSuccess(createdFiles, roadmap);
    
  } catch (err) {
    showError('Failed to initialize project', err.message);
    throw err;
  }
}

/**
 * Conduct domain research with parallel agents
 */
async function conductResearch(projectInfo) {
  log.section('📚 Researching domain...');
  
  const spin = spinner('Spawning research agents').start();
  const client = getGeminiClient();
  
  try {
    // Spawn 4 parallel researchers
    const researchPrompts = [
      {
        type: 'researcher',
        prompt: PROMPTS.stackResearcher({ project: projectInfo }),
        options: {}
      },
      {
        type: 'researcher',
        prompt: PROMPTS.featureResearcher({ 
          project: projectInfo,
          requirements: 'To be determined'
        }),
        options: {}
      },
      {
        type: 'researcher',
        prompt: PROMPTS.architectureResearcher({ 
          project: projectInfo,
          requirements: 'To be determined'
        }),
        options: {}
      },
      {
        type: 'researcher',
        prompt: PROMPTS.pitfallsResearcher({ 
          project: projectInfo,
          stack: projectInfo.technologies || 'Not specified'
        }),
        options: {}
      }
    ];
    
    spin.text = 'Researching stack, features, architecture, and pitfalls...';
    const results = await client.spawnAgentsParallel(researchPrompts);
    
    spin.succeed('Research complete');
    
    // Parse JSON results
    const research = {
      stack: JSON.parse(results[0]),
      features: JSON.parse(results[1]),
      architecture: JSON.parse(results[2]),
      pitfalls: JSON.parse(results[3])
    };
    
    return research;
    
  } catch (err) {
    spin.fail('Research failed');
    log.warning('Continuing without research');
    return null;
  }
}

/**
 * Generate requirements document
 */
async function generateRequirements(projectInfo, research) {
  log.section('📋 Extracting requirements...');
  
  // Ask user for features
  const scope = await askRequirementsQuestions(projectInfo);
  
  // Build requirements object
  const requirements = {
    v1: parseFeatureList(scope.v1Features),
    v2: parseFeatureList(scope.v2Features),
    outOfScope: parseFeatureList(scope.outOfScope)
  };
  
  return requirements;
}

/**
 * Parse feature list from text
 */
function parseFeatureList(text) {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && line !== '-')
    .map(line => line.replace(/^[-*]\s*/, ''));
}

/**
 * Confirm scope with user
 */
async function confirmScope(requirements) {
  console.log('');
  log.section('Scope Summary:');
  console.log('');
  console.log('v1 (Must Have):');
  requirements.v1.forEach(f => console.log(`  • ${f}`));
  console.log('');
  console.log('v2 (Nice to Have):');
  requirements.v2.forEach(f => console.log(`  • ${f}`));
  console.log('');
  console.log('Out of Scope:');
  requirements.outOfScope.forEach(f => console.log(`  • ${f}`));
  console.log('');
  
  const { confirm } = await import('../utils/questions.js');
  return await confirm('Does this scope look correct?', true);
}

/**
 * Generate roadmap with AI
 */
async function generateRoadmap(projectInfo, requirements, research) {
  log.section('🗺️  Generating roadmap...');
  
  const spin = spinner('Creating phased roadmap').start();
  const client = getGeminiClient();
  
  try {
    // Build context for roadmap generation
    const context = {
      project: projectInfo,
      requirements: requirements,
      research: research
    };
    
    // Prompt for roadmap generation
    const prompt = buildRoadmapPrompt(context);
    
    const result = await client.generateJSON(
      MODELS.PLANNING,
      prompt
    );
    
    spin.succeed('Roadmap generated');
    
    return {
      phases: result.phases,
      formatted: formatRoadmap(result.phases)
    };
    
  } catch (err) {
    spin.fail('Roadmap generation failed');
    throw err;
  }
}

/**
 * Build roadmap generation prompt
 */
function buildRoadmapPrompt(context) {
  const { project, requirements, research } = context;
  
  return `You are creating a phased development roadmap for a new project.

PROJECT:
${JSON.stringify(project, null, 2)}

V1 REQUIREMENTS (must have):
${requirements.v1.map(f => `- ${f}`).join('\n')}

V2 REQUIREMENTS (nice to have):
${requirements.v2.map(f => `- ${f}`).join('\n')}

OUT OF SCOPE:
${requirements.outOfScope.map(f => `- ${f}`).join('\n')}

${research ? `RESEARCH FINDINGS:
Stack: ${JSON.stringify(research.stack.technologies)}
Architecture: ${research.architecture.architecture}
` : ''}

Create a phased roadmap with 3-5 phases. Each phase should:
1. Be a meaningful chunk of functionality
2. Build on previous phases
3. Deliver working, testable features
4. Take roughly 1-3 days to complete

Output ONLY valid JSON in this format:
{
  "phases": [
    {
      "number": 1,
      "name": "Phase name",
      "description": "What this phase delivers",
      "features": ["feature 1", "feature 2"]
    }
  ]
}`;
}

/**
 * Format roadmap for display
 */
function formatRoadmap(phases) {
  let output = '';
  phases.forEach(phase => {
    output += `\nPhase ${phase.number}: ${phase.name}\n`;
    output += `${phase.description}\n`;
    output += `Features:\n`;
    phase.features.forEach(f => {
      output += `  • ${f}\n`;
    });
  });
  return output;
}

/**
 * Create all planning files
 */
async function createPlanningFiles(projectInfo, requirements, roadmap, research) {
  log.section('📝 Creating planning files...');
  
  const createdFiles = [];
  
  // Create subdirectories
  await createPlanningSubdir('research');
  await createPlanningSubdir('phases');
  await createPlanningSubdir('todos');
  
  // PROJECT.md
  const projectMd = buildProjectMd(projectInfo);
  await writePlanningFile('PROJECT.md', projectMd);
  createdFiles.push('.planning/PROJECT.md');
  
  // REQUIREMENTS.md
  const requirementsMd = buildRequirementsMd(requirements, roadmap);
  await writePlanningFile('REQUIREMENTS.md', requirementsMd);
  createdFiles.push('.planning/REQUIREMENTS.md');
  
  // ROADMAP.md
  const roadmapMd = buildRoadmapMd(roadmap);
  await writePlanningFile('ROADMAP.md', roadmapMd);
  createdFiles.push('.planning/ROADMAP.md');
  
  // STATE.md
  const stateMd = buildStateMd(roadmap);
  await writePlanningFile('STATE.md', stateMd);
  createdFiles.push('.planning/STATE.md');
  
  // Research files (if research was done)
  if (research) {
    const stackMd = buildResearchMd('Stack', research.stack);
    await writePlanningFile('research/stack.md', stackMd);
    createdFiles.push('.planning/research/stack.md');
    
    const featuresMd = buildResearchMd('Features', research.features);
    await writePlanningFile('research/features.md', featuresMd);
    createdFiles.push('.planning/research/features.md');
    
    const architectureMd = buildResearchMd('Architecture', research.architecture);
    await writePlanningFile('research/architecture.md', architectureMd);
    createdFiles.push('.planning/research/architecture.md');
    
    const pitfallsMd = buildResearchMd('Pitfalls', research.pitfalls);
    await writePlanningFile('research/pitfalls.md', pitfallsMd);
    createdFiles.push('.planning/research/pitfalls.md');
  }
  
  return createdFiles;
}

/**
 * Build PROJECT.md content
 */
function buildProjectMd(projectInfo) {
  return `# ${projectInfo.name}

## Goal

${projectInfo.goal}

${projectInfo.technologies ? `## Technologies\n\n${projectInfo.technologies}\n` : ''}
${projectInfo.constraints ? `## Constraints\n\n${projectInfo.constraints}\n` : ''}

## Milestone

v1.0

---

*Created by GGSD on ${new Date().toISOString().split('T')[0]}*
`;
}

/**
 * Build REQUIREMENTS.md content
 */
function buildRequirementsMd(requirements, roadmap) {
  let content = `# Requirements

## v1 (Must Have)

${requirements.v1.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## v2 (Nice to Have)

${requirements.v2.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Out of Scope

${requirements.outOfScope.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Phase Mapping

`;

  roadmap.phases.forEach(phase => {
    content += `\n### Phase ${phase.number}: ${phase.name}\n\n`;
    phase.features.forEach(f => {
      content += `- ${f}\n`;
    });
  });

  return content;
}

/**
 * Build ROADMAP.md content
 */
function buildRoadmapMd(roadmap) {
  let content = `# Roadmap

## Milestone: v1.0

`;

  roadmap.phases.forEach(phase => {
    content += `\n### Phase ${phase.number}: ${phase.name}\n\n`;
    content += `**Status:** PENDING\n\n`;
    content += `${phase.description}\n\n`;
    content += `**Features:**\n`;
    phase.features.forEach(f => {
      content += `- ${f}\n`;
    });
  });

  return content;
}

/**
 * Build STATE.md content
 */
function buildStateMd(roadmap) {
  return `# State

## Current Status

**Milestone:** v1.0  
**Phase:** Not started  
**Last Updated:** ${new Date().toISOString()}

## Progress

${roadmap.phases.map(p => `- Phase ${p.number}: ${p.name} - PENDING`).join('\n')}

## Next Action

Run: \`ggsd discuss-phase 1\`

## Decisions

*(Decisions will be tracked here as the project progresses)*

## Blockers

*(No blockers yet)*
`;
}

/**
 * Build research markdown
 */
function buildResearchMd(title, data) {
  return `# ${title} Research

${JSON.stringify(data, null, 2)}

---

*Generated by GGSD on ${new Date().toISOString().split('T')[0]}*
`;
}

/**
 * Show success message
 */
function showSuccess(createdFiles, roadmap) {
  showCreatedFiles(createdFiles);
  
  log.success('Project initialized successfully! 🎉');
  
  showNextSteps([
    'Review the roadmap in .planning/ROADMAP.md',
    'Check project details in .planning/PROJECT.md',
    'Run: ggsd progress (to see current status)',
    `Run: ggsd discuss-phase 1 (to start Phase 1: ${roadmap.phases[0].name})`
  ]);
}
