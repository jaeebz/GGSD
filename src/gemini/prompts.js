/**
 * Prompt Templates for Gemini
 * 
 * Adapted from GSD's XML format to Gemini-optimized JSON + instructions
 * Original: https://github.com/glittercowboy/get-shit-done
 */

export const PROMPTS = {
  /**
   * Stack Researcher - Parallel domain research
   */
  stackResearcher: (context) => `
You are a technical stack researcher analyzing a development project.

PROJECT CONTEXT:
${JSON.stringify(context.project, null, 2)}

YOUR TASK:
Research and document the technical stack, focusing on:
1. Core technologies mentioned or implied
2. Common patterns in this stack
3. Essential dependencies and tools
4. Development environment setup

OUTPUT FORMAT (JSON):
{
  "technologies": ["tech1", "tech2"],
  "patterns": ["pattern1", "pattern2"],
  "dependencies": ["dep1", "dep2"],
  "environment": "setup description",
  "recommendations": ["rec1", "rec2"]
}

Be specific and practical. Focus on what will actually be used in v1.
`,

  /**
   * Feature Researcher - Investigate implementation approaches
   */
  featureResearcher: (context) => `
You are researching feature implementation approaches.

PROJECT CONTEXT:
${JSON.stringify(context.project, null, 2)}

REQUIREMENTS:
${context.requirements}

YOUR TASK:
Research how to implement the key features, focusing on:
1. Proven implementation patterns
2. Libraries/frameworks commonly used
3. API design approaches
4. Data structures needed

OUTPUT FORMAT (JSON):
{
  "features": [
    {
      "name": "feature name",
      "approach": "how to implement",
      "libraries": ["lib1", "lib2"],
      "examples": ["example patterns"]
    }
  ],
  "considerations": ["important factors"]
}

Prioritize battle-tested solutions over experimental approaches.
`,

  /**
   * Architecture Researcher - System design patterns
   */
  architectureResearcher: (context) => `
You are an architecture researcher analyzing system design.

PROJECT CONTEXT:
${JSON.stringify(context.project, null, 2)}

REQUIREMENTS:
${context.requirements}

YOUR TASK:
Research architectural patterns for this type of system:
1. Overall architecture style (monolith, microservices, etc.)
2. Directory/file structure conventions
3. Data flow patterns
4. State management approach

OUTPUT FORMAT (JSON):
{
  "architecture": "architectural style",
  "structure": {
    "directories": ["dir1/", "dir2/"],
    "conventions": ["convention1", "convention2"]
  },
  "dataFlow": "description",
  "stateManagement": "approach",
  "rationale": "why this architecture"
}

Focus on maintainability and scalability.
`,

  /**
   * Pitfalls Researcher - Common issues and gotchas
   */
  pitfallsResearcher: (context) => `
You are researching common pitfalls and issues.

PROJECT CONTEXT:
${JSON.stringify(context.project, null, 2)}

TECH STACK:
${context.stack || 'Not yet determined'}

YOUR TASK:
Identify common pitfalls in this type of project:
1. Technical gotchas with the stack
2. Common mistakes developers make
3. Performance issues to avoid
4. Security considerations

OUTPUT FORMAT (JSON):
{
  "pitfalls": [
    {
      "issue": "description",
      "why": "why it happens",
      "avoid": "how to avoid it"
    }
  ],
  "security": ["security concern 1", "security concern 2"],
  "performance": ["performance tip 1", "performance tip 2"]
}

Be specific. Include real-world examples where possible.
`,

  /**
   * Planner - Creates task plans from phase requirements
   */
  planner: (context) => `
You are creating a verified task plan for a development phase.

PROJECT CONTEXT:
${JSON.stringify(context.project, null, 2)}

PHASE REQUIREMENTS:
${context.phaseRequirements}

IMPLEMENTATION CONTEXT:
${context.implementationContext || 'No specific preferences provided'}

RESEARCH FINDINGS:
${context.research || 'No research available'}

YOUR TASK:
Create 2-3 atomic task plans that implement this phase. Each task should:
1. Be completable in one focused session (2-4 hours)
2. Have clear verification steps
3. Produce working, testable functionality
4. Follow the architectural patterns

OUTPUT FORMAT (JSON):
{
  "plans": [
    {
      "taskNumber": 1,
      "name": "Clear task name",
      "files": ["file1.js", "file2.js"],
      "action": "Detailed implementation instructions",
      "verify": "How to verify it works",
      "done": "What 'done' looks like",
      "dependencies": []
    }
  ],
  "estimatedEffort": "total time estimate",
  "criticalPath": ["task dependencies"]
}

Make tasks atomic but substantial. Avoid trivial tasks.
`,

  /**
   * Plan Checker - Verifies plans against requirements
   */
  planChecker: (plan, context) => `
You are verifying a task plan against project requirements.

PROJECT REQUIREMENTS:
${context.requirements}

PHASE REQUIREMENTS:
${context.phaseRequirements}

PROPOSED PLAN:
${JSON.stringify(plan, null, 2)}

YOUR TASK:
Verify this plan:
1. Covers all phase requirements
2. Tasks are atomic and clear
3. Verification steps are concrete
4. No circular dependencies
5. Follows architectural patterns

OUTPUT FORMAT (JSON):
{
  "passed": true/false,
  "issues": [
    {
      "severity": "critical|warning",
      "issue": "description",
      "suggestion": "how to fix"
    }
  ],
  "coverage": {
    "requiredFeatures": ["feature1", "feature2"],
    "coveredBy": {
      "feature1": "task 1",
      "feature2": "task 2"
    }
  }
}

Be rigorous. If something is unclear, mark it as an issue.
`,

  /**
   * Executor - Implements a task plan
   */
  executor: (task, context) => `
You are implementing a specific task from a verified plan.

PROJECT CONTEXT:
${JSON.stringify(context.project, null, 2)}

TASK TO IMPLEMENT:
${JSON.stringify(task, null, 2)}

RELEVANT FILES:
${context.existingFiles || 'No existing files'}

YOUR TASK:
1. Implement exactly what the task specifies
2. Follow the action instructions precisely
3. Run the verification steps
4. Report results

OUTPUT FORMAT (JSON):
{
  "filesChanged": [
    {
      "path": "file/path.js",
      "action": "created|modified",
      "summary": "what changed"
    }
  ],
  "verification": {
    "steps": ["step1 result", "step2 result"],
    "passed": true/false,
    "issues": ["any issues found"]
  },
  "summary": "Brief summary of what was implemented",
  "nextSteps": ["any follow-up needed"]
}

IMPORTANT: Include the actual file contents in your response for files that need to be created/modified.

For each file, format as:
FILE: path/to/file.ext
\`\`\`language
[file contents]
\`\`\`
`,

  /**
   * Verifier - Checks implemented code against goals
   */
  verifier: (phase, context) => `
You are verifying that a phase was implemented correctly.

PHASE GOALS:
${context.phaseGoals}

IMPLEMENTATION SUMMARIES:
${context.summaries}

CODEBASE STATE:
${context.codebaseSnapshot || 'Not available'}

YOUR TASK:
Verify the implementation:
1. All phase goals achieved
2. Code quality acceptable
3. Tests passing (if applicable)
4. No obvious bugs or issues

OUTPUT FORMAT (JSON):
{
  "passed": true/false,
  "goalsAchieved": {
    "goal1": true/false,
    "goal2": true/false
  },
  "codeQuality": {
    "rating": "excellent|good|acceptable|poor",
    "issues": ["issue1", "issue2"]
  },
  "testResults": "description or 'no tests'",
  "issues": [
    {
      "severity": "critical|major|minor",
      "description": "what's wrong",
      "location": "where in code",
      "suggestion": "how to fix"
    }
  ],
  "recommendation": "pass|fix_required|needs_review"
}

Be thorough but fair. Minor issues shouldn't fail verification.
`,

  /**
   * Debugger - Diagnoses failures
   */
  debugger: (issue, context) => `
You are diagnosing a failure in the implementation.

REPORTED ISSUE:
${issue}

PROJECT CONTEXT:
${JSON.stringify(context.project, null, 2)}

RECENT CHANGES:
${context.recentChanges || 'Not available'}

RELEVANT CODE:
${context.relevantCode || 'Not available'}

YOUR TASK:
Diagnose the root cause:
1. What is actually broken
2. Why it broke
3. Where in the code
4. How to fix it

OUTPUT FORMAT (JSON):
{
  "diagnosis": {
    "rootCause": "what actually broke",
    "why": "why it broke",
    "location": "file:line or description",
    "impact": "what else might be affected"
  },
  "fix": {
    "approach": "how to fix it",
    "files": ["files to change"],
    "steps": ["step1", "step2"],
    "verification": "how to verify fix works"
  },
  "prevention": "how to prevent this in future"
}

Be specific. Include exact file paths and code locations.
`
};

/**
 * Build context for prompts
 */
export function buildContext(files) {
  return {
    project: files.PROJECT || {},
    requirements: files.REQUIREMENTS || '',
    roadmap: files.ROADMAP || '',
    state: files.STATE || '',
    phaseContext: files.PHASE_CONTEXT || '',
    research: files.RESEARCH || ''
  };
}

/**
 * Format task for execution
 */
export function formatTask(task) {
  return {
    number: task.taskNumber,
    name: task.name,
    files: task.files || [],
    action: task.action,
    verify: task.verify,
    done: task.done,
    dependencies: task.dependencies || []
  };
}
