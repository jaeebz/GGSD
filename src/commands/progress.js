/**
 * progress command
 * 
 * Show current project status and next steps
 * 
 * Adapted from Get Shit Done by TÂCHES (glittercowboy)
 * https://github.com/glittercowboy/get-shit-done
 */

import { readPlanningFile, planningFileExists } from '../utils/file-ops.js';
import { log, showError, formatCommand } from '../utils/display.js';
import chalk from 'chalk';

/**
 * Main progress display
 */
export async function showProgress() {
  try {
    // Check if project is initialized
    if (!await planningFileExists('STATE.md')) {
      log.error('No project found in current directory');
      log.info('Run: ' + formatCommand('ggsd new-project') + ' to initialize');
      return;
    }
    
    // Read planning files
    const state = await readPlanningFile('STATE.md');
    const roadmap = await readPlanningFile('ROADMAP.md');
    const project = await readPlanningFile('PROJECT.md');
    
    // Parse state
    const stateInfo = parseState(state);
    const roadmapInfo = parseRoadmap(roadmap);
    const projectInfo = parseProject(project);
    
    // Display
    displayProgress(projectInfo, stateInfo, roadmapInfo);
    
  } catch (err) {
    showError('Failed to show progress', err.message);
    throw err;
  }
}

/**
 * Parse STATE.md content
 */
function parseState(content) {
  const lines = content.split('\n');
  
  // Extract milestone
  const milestoneLine = lines.find(l => l.includes('**Milestone:**'));
  const milestone = milestoneLine ? milestoneLine.split('**Milestone:**')[1].trim() : 'Unknown';
  
  // Extract phase
  const phaseLine = lines.find(l => l.includes('**Phase:**'));
  const phase = phaseLine ? phaseLine.split('**Phase:**')[1].trim() : 'Not started';
  
  // Extract last updated
  const updatedLine = lines.find(l => l.includes('**Last Updated:**'));
  const lastUpdated = updatedLine ? updatedLine.split('**Last Updated:**')[1].trim() : 'Unknown';
  
  // Extract next action
  const nextActionIdx = lines.findIndex(l => l.includes('## Next Action'));
  const nextAction = nextActionIdx >= 0 ? lines[nextActionIdx + 2]?.replace('Run: ', '').replace(/`/g, '').trim() : null;
  
  // Extract progress items
  const progressIdx = lines.findIndex(l => l.includes('## Progress'));
  const progressItems = [];
  if (progressIdx >= 0) {
    for (let i = progressIdx + 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('-')) {
        progressItems.push(line.substring(2));
      } else if (line.startsWith('#')) {
        break; // Next section
      }
    }
  }
  
  // Extract blockers
  const blockersIdx = lines.findIndex(l => l.includes('## Blockers'));
  const blockers = [];
  if (blockersIdx >= 0) {
    for (let i = blockersIdx + 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('-') && !line.includes('No blockers')) {
        blockers.push(line.substring(2));
      } else if (line.startsWith('#') || line.startsWith('*')) {
        break;
      }
    }
  }
  
  return {
    milestone,
    phase,
    lastUpdated,
    nextAction,
    progressItems,
    blockers
  };
}

/**
 * Parse ROADMAP.md content
 */
function parseRoadmap(content) {
  const lines = content.split('\n');
  const phases = [];
  
  let currentPhase = null;
  
  for (const line of lines) {
    // Phase header
    if (line.startsWith('### Phase')) {
      if (currentPhase) {
        phases.push(currentPhase);
      }
      const match = line.match(/### Phase (\d+): (.+)/);
      if (match) {
        currentPhase = {
          number: parseInt(match[1]),
          name: match[2],
          status: 'PENDING',
          description: '',
          features: []
        };
      }
    }
    // Status
    else if (line.includes('**Status:**') && currentPhase) {
      const status = line.split('**Status:**')[1].trim();
      currentPhase.status = status;
    }
    // Description (first paragraph after status)
    else if (currentPhase && !currentPhase.description && line.trim() && !line.startsWith('**')) {
      currentPhase.description = line.trim();
    }
    // Features
    else if (line.startsWith('-') && currentPhase) {
      currentPhase.features.push(line.substring(2).trim());
    }
  }
  
  if (currentPhase) {
    phases.push(currentPhase);
  }
  
  return { phases };
}

/**
 * Parse PROJECT.md content
 */
function parseProject(content) {
  const lines = content.split('\n');
  
  // Extract name (first line, remove #)
  const name = lines[0].replace(/^#\s*/, '').trim();
  
  // Extract goal
  const goalIdx = lines.findIndex(l => l.includes('## Goal'));
  const goal = goalIdx >= 0 ? lines[goalIdx + 2]?.trim() : '';
  
  return { name, goal };
}

/**
 * Display progress
 */
function displayProgress(project, state, roadmap) {
  console.log('');
  console.log(chalk.bold.cyan('📋 ' + project.name));
  console.log(chalk.cyan('━'.repeat(project.name.length + 3)));
  console.log('');
  
  // Current status
  console.log(chalk.bold('Current Status'));
  console.log(chalk.dim('  Milestone:'), state.milestone);
  console.log(chalk.dim('  Phase:'), state.phase);
  console.log(chalk.dim('  Updated:'), formatDate(state.lastUpdated));
  console.log('');
  
  // Roadmap
  console.log(chalk.bold('Roadmap'));
  roadmap.phases.forEach(phase => {
    const statusIcon = getStatusIcon(phase.status);
    const statusColor = getStatusColor(phase.status);
    console.log(
      `  ${statusIcon} Phase ${phase.number}: ${chalk.bold(phase.name)} ${statusColor('[' + phase.status + ']')}`
    );
  });
  console.log('');
  
  // Blockers (if any)
  if (state.blockers.length > 0) {
    console.log(chalk.bold.yellow('⚠️  Blockers'));
    state.blockers.forEach(blocker => {
      console.log(chalk.yellow('  •'), blocker);
    });
    console.log('');
  }
  
  // Next action
  if (state.nextAction) {
    console.log(chalk.bold('Next Action'));
    console.log('  ' + formatCommand(state.nextAction));
    console.log('');
  }
}

/**
 * Get status icon
 */
function getStatusIcon(status) {
  switch (status.toUpperCase()) {
    case 'COMPLETE':
    case 'DONE':
      return chalk.green('✓');
    case 'IN PROGRESS':
    case 'IN_PROGRESS':
      return chalk.yellow('▶');
    case 'PENDING':
      return chalk.dim('○');
    case 'BLOCKED':
      return chalk.red('✗');
    default:
      return chalk.dim('•');
  }
}

/**
 * Get status color function
 */
function getStatusColor(status) {
  switch (status.toUpperCase()) {
    case 'COMPLETE':
    case 'DONE':
      return chalk.green;
    case 'IN PROGRESS':
    case 'IN_PROGRESS':
      return chalk.yellow;
    case 'PENDING':
      return chalk.dim;
    case 'BLOCKED':
      return chalk.red;
    default:
      return chalk.white;
  }
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  } catch {
    return dateStr;
  }
}
