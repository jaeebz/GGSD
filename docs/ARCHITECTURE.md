# GGSD Architecture

## System Overview

GGSD is a multi-layer system that orchestrates Gemini API calls through MCP servers to execute spec-driven development workflows.

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                      │
│                  (CLI Commands / MCP)                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Command Orchestrator                   │
│          (Manages workflow, spawns agents)              │
└─────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                    ↓
┌──────────────────┐              ┌──────────────────────┐
│   MCP Servers    │              │   Gemini API Layer   │
│  (Tool Calling)  │              │  (Agent Execution)   │
└──────────────────┘              └──────────────────────┘
        ↓                                    ↓
┌─────────────────────────────────────────────────────────┐
│              File System & Git Operations               │
│           (.planning/, PROJECT.md, git, etc.)           │
└─────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Command Layer

**Purpose:** CLI interface for user interactions

**Components:**
- `bin/ggsd.js` - Main CLI entry point
- `commands/*.js` - Individual command implementations
- `src/cli/` - CLI utilities, prompts, formatting

**Key Files:**
```
commands/
├── new-project.js         # Initialize project
├── discuss-phase.js       # Capture decisions
├── plan-phase.js          # Research + planning
├── execute-phase.js       # Execute plans
├── verify-work.js         # Manual verification
├── progress.js            # Status display
└── ...
```

---

### 2. Orchestration Layer

**Purpose:** Manages workflow state and spawns specialized agents

**Components:**
- `src/orchestrator/` - Core orchestration logic
- `src/agents/` - Agent spawning and management
- `src/state/` - State management

**Key Responsibilities:**
1. Parse user commands
2. Load relevant context from `.planning/`
3. Determine which agents to spawn
4. Coordinate parallel/sequential execution
5. Aggregate results
6. Update state files

**Agent Types:**
```javascript
// Research Agents (Parallel)
- StackResearcher: Analyzes tech stack patterns
- FeatureResearcher: Investigates feature implementation
- ArchitectureResearcher: Studies architectural patterns
- PitfallsResearcher: Identifies common issues

// Planning Agents (Sequential)
- Planner: Creates task plans
- Checker: Verifies plans against requirements
- (Loop until plans pass)

// Execution Agents (Parallel waves)
- Executor: Implements individual plans
- (Fresh 200k context per executor)

// Verification Agents (Conditional)
- Verifier: Checks against goals
- Debugger: Diagnoses failures
```

---

### 3. MCP Server Layer

**Purpose:** Provide tool-calling capabilities to Gemini agents

**Servers:**

#### `mcp-files` - File Operations
```typescript
Tools:
- read_planning_file(path): Read from .planning/
- write_planning_file(path, content): Write with size validation
- list_planning_files(): Directory listing
- validate_file_size(path): Check against limits
```

#### `mcp-git` - Git Operations
```typescript
Tools:
- commit_task(message, files): Atomic commit
- tag_release(version, message): Tag milestone
- get_history(phase?): Commit history
- check_dirty(): Check for uncommitted changes
```

#### `mcp-state` - State Management
```typescript
Tools:
- get_state(): Read STATE.md
- update_state(updates): Update state
- get_phase_status(phase): Phase details
- mark_phase_complete(phase): Complete phase
```

#### `mcp-research` - Research Coordination
```typescript
Tools:
- spawn_researchers(domains): Parallel research
- aggregate_findings(): Collect results
- extract_patterns(findings): Pattern analysis
```

---

### 4. Gemini API Layer

**Purpose:** Execute agent logic using Gemini models

**Components:**
- `src/gemini/client.js` - API client wrapper
- `src/gemini/prompts.js` - Prompt templates
- `src/gemini/context.js` - Context management

**Model Selection:**
```javascript
// Strategic model choice based on task
const MODEL_MAP = {
  research: 'gemini-2.0-flash-001',      // Fast parallel research
  planning: 'gemini-2.0-pro-001',        // Deep reasoning
  execution: 'gemini-2.0-pro-001',       // Code generation
  verification: 'gemini-2.0-flash-001',  // Quick checks
  debugging: 'gemini-2.0-pro-001'        // Complex diagnosis
};
```

**Context Window Management:**
- Main orchestrator: ~40% usage (120k/300k tokens)
- Spawned agents: Fresh context (200k tokens each)
- No context accumulation across agents

---

### 5. File System Layer

**Purpose:** Structured storage of project artifacts

**Directory Structure:**
```
project-root/
├── .planning/
│   ├── PROJECT.md              # Vision, goals
│   ├── REQUIREMENTS.md         # Scoped requirements
│   ├── ROADMAP.md             # Phased plan
│   ├── STATE.md               # Current position
│   ├── research/              # Domain research
│   │   ├── stack.md
│   │   ├── features.md
│   │   ├── architecture.md
│   │   └── pitfalls.md
│   ├── phases/
│   │   ├── 01-authentication/
│   │   │   ├── CONTEXT.md     # Implementation decisions
│   │   │   ├── RESEARCH.md    # Phase research
│   │   │   ├── 01-PLAN.md     # Task plan
│   │   │   ├── 01-SUMMARY.md  # Execution result
│   │   │   ├── 02-PLAN.md
│   │   │   ├── 02-SUMMARY.md
│   │   │   └── VERIFICATION.md
│   │   └── 02-user-profiles/
│   │       └── ...
│   ├── quick/                 # Quick mode tasks
│   │   ├── 001-fix-bug/
│   │   │   ├── PLAN.md
│   │   │   └── SUMMARY.md
│   │   └── 002-add-feature/
│   │       └── ...
│   └── todos/                 # Captured ideas
│       ├── future-features.md
│       └── tech-debt.md
└── [your code files]
```

---

## Data Flow

### Example: Execute Phase

```
1. User runs: ggsd execute-phase 1
                ↓
2. Command Layer
   - Parses command
   - Loads phase plans from .planning/phases/01-*/
                ↓
3. Orchestrator
   - Groups plans into waves (parallel/sequential)
   - Spawns executor agents
                ↓
4. MCP Layer
   - Provides tools to agents
   - Reads context files
   - Executes git operations
                ↓
5. Gemini API
   - Fresh 200k context per executor
   - Implements plan
   - Returns results
                ↓
6. Orchestrator
   - Aggregates summaries
   - Writes SUMMARY.md via MCP
   - Commits via MCP
                ↓
7. User sees: "Phase 1 complete: 3 tasks executed"
```

---

## Prompt Engineering

### Prompt Structure for Gemini

Unlike Claude's XML format, Gemini works better with structured JSON + clear instructions:

```javascript
// GSD (Claude) - XML heavy
const prompt = `
<task type="auto">
  <n>Create login endpoint</n>
  <files>src/app/api/auth/login/route.ts</files>
  <action>...</action>
</task>
`;

// GGSD (Gemini) - JSON + instructions
const prompt = `
You are implementing a task from a verified plan.

TASK:
${JSON.stringify(task, null, 2)}

CONTEXT FILES:
- PROJECT.md: ${projectContent}
- REQUIREMENTS.md: ${requirementsContent}
- {phase}-CONTEXT.md: ${contextContent}

INSTRUCTIONS:
1. Read the task action carefully
2. Implement the code as specified
3. Follow the verification steps
4. Report what you changed

OUTPUT FORMAT:
{
  "filesChanged": ["path1", "path2"],
  "summary": "What was done",
  "verification": "Verification results"
}
`;
```

### Prompt Templates

Located in `src/gemini/prompts.js`:

```javascript
export const PROMPTS = {
  researcher: (domain, context) => `...`,
  planner: (phase, context) => `...`,
  executor: (task, context) => `...`,
  verifier: (phase, goals) => `...`,
  debugger: (issue, context) => `...`
};
```

---

## Context Engineering

### File Size Limits (Gemini-optimized)

Gemini 2.0 has a 2M token context window, but quality degrades:

| File | Max Size | Reason |
|------|----------|--------|
| PROJECT.md | 2KB | Loaded in every agent |
| REQUIREMENTS.md | 5KB | Comprehensive but focused |
| ROADMAP.md | 3KB | High-level overview |
| STATE.md | 2KB | Current position only |
| CONTEXT.md | 4KB | Phase-specific decisions |
| PLAN.md | 3KB | Atomic task |
| SUMMARY.md | 2KB | Execution results |

### Context Loading Strategy

```javascript
// Orchestrator (main session)
const mainContext = {
  project: loadFile('PROJECT.md'),      // 2KB
  requirements: loadFile('REQUIREMENTS.md'), // 5KB
  roadmap: loadFile('ROADMAP.md'),      // 3KB
  state: loadFile('STATE.md')           // 2KB
};
// Total: ~12KB core context
// Usage: ~4% of 300k context window

// Spawned Agent (fresh session)
const agentContext = {
  ...mainContext,                        // 12KB
  phaseContext: loadFile('01-CONTEXT.md'), // 4KB
  plan: loadFile('01-01-PLAN.md')       // 3KB
};
// Total: ~19KB task context
// Usage: ~10% of 200k context window
// Remaining: 180k for implementation
```

---

## Agent Orchestration Patterns

### Pattern 1: Parallel Research
```javascript
async function researchPhase(phase) {
  const researchers = [
    spawnAgent('stack', stackPrompt),
    spawnAgent('features', featuresPrompt),
    spawnAgent('architecture', archPrompt),
    spawnAgent('pitfalls', pitfallsPrompt)
  ];
  
  const findings = await Promise.all(researchers);
  return aggregateFindings(findings);
}
```

### Pattern 2: Sequential with Verification Loop
```javascript
async function planPhase(phase) {
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    const plan = await spawnAgent('planner', plannerPrompt);
    const check = await spawnAgent('checker', checkerPrompt(plan));
    
    if (check.passed) {
      return plan;
    }
    
    attempts++;
  }
  
  throw new Error('Failed to create valid plan');
}
```

### Pattern 3: Parallel Waves with Dependencies
```javascript
async function executePhase(phase) {
  const plans = loadPhasePlans(phase);
  const waves = groupIntoWaves(plans); // Dependency analysis
  
  for (const wave of waves) {
    // Execute wave in parallel
    const results = await Promise.all(
      wave.map(plan => spawnAgent('executor', executorPrompt(plan)))
    );
    
    // Commit each task atomically
    for (const result of results) {
      await mcpGit.commit(result.message, result.files);
    }
  }
}
```

---

## Error Handling

### Retry Strategy
```javascript
const RETRY_CONFIG = {
  maxRetries: 3,
  backoff: 'exponential',
  retryableErrors: [
    'RATE_LIMIT',
    'TIMEOUT',
    'INTERNAL_ERROR'
  ]
};
```

### Failure Recovery
```javascript
// If agent fails mid-execution
1. Save partial state to STATE.md
2. Create failure report in .planning/failures/
3. Offer user options:
   - Retry with same plan
   - Spawn debugger agent
   - Skip task
   - Abort phase
```

---

## Performance Optimizations

### 1. Parallel Execution
- Research: 4 agents simultaneously
- Execution: Wave-based parallelization (3-5 agents per wave)
- Total speedup: 3-4x vs sequential

### 2. Model Selection
- Flash for quick tasks (verification, simple research)
- Pro for complex tasks (planning, execution)
- Cost savings: ~60% vs using Pro everywhere

### 3. Context Caching
```javascript
// Cache frequently used context
const contextCache = new Map();
function loadWithCache(path) {
  if (!contextCache.has(path)) {
    contextCache.set(path, loadFile(path));
  }
  return contextCache.get(path);
}
```

### 4. Lazy Loading
- Only load phase-specific files when needed
- Don't load all phases into memory
- Stream large files instead of reading entirely

---

## Testing Strategy

### Unit Tests
```
tests/
├── unit/
│   ├── orchestrator.test.js
│   ├── agents.test.js
│   ├── mcp-servers.test.js
│   └── prompts.test.js
```

### Integration Tests
```
tests/
├── integration/
│   ├── workflow.test.js      # Full workflow
│   ├── mcp-integration.test.js
│   └── gemini-api.test.js
```

### End-to-End Tests
```
tests/
├── e2e/
│   ├── new-project.test.js
│   ├── execute-phase.test.js
│   └── complete-milestone.test.js
```

---

## Security Considerations

### API Key Management
- Never commit GEMINI_API_KEY
- Use environment variables
- Support .env files
- Warn if key exposed

### File System Access
- MCP servers only access `.planning/` directory
- Validate all paths
- Prevent directory traversal
- Size limits on writes

### Git Operations
- Validate commit messages
- Check for sensitive data before commit
- Allow git hooks to run
- Respect .gitignore

---

## Future Enhancements

### Planned Features
1. **Visual Verification** - Screenshot-based testing
2. **Multimodal Context** - Image/video in requirements
3. **Cost Tracking** - Per-phase API cost reporting
4. **Parallel Milestones** - Multiple active milestones
5. **Team Collaboration** - Shared state management
6. **Custom Agents** - User-defined agent types

### Research Areas
1. **Adaptive Planning** - Learn from past execution
2. **Smart Dependency Detection** - Better wave grouping
3. **Context Compression** - Reduce file sizes intelligently
4. **Incremental Verification** - Continuous validation

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development setup and guidelines.

---

**This architecture prioritizes clarity, modularity, and efficient use of Gemini's capabilities.**
