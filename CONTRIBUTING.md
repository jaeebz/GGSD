# Contributing to GGSD

Thank you for your interest in contributing to GGSD! This project is an adaptation of the excellent [Get Shit Done](https://github.com/glittercowboy/get-shit-done) by TÂCHES (glittercowboy).

## 🎯 Project Goals

GGSD aims to bring the powerful spec-driven development workflow of GSD to the Gemini ecosystem while:

1. Maintaining the core philosophy and simplicity of GSD
2. Leveraging Gemini's unique capabilities (multimodal, long context)
3. Building native MCP integration
4. Staying true to the "no enterprise theater" spirit

## 🚀 Getting Started

### Development Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/ggsd.git
cd ggsd

# Install dependencies
npm install

# Set up your Gemini API key
export GEMINI_API_KEY='your-key-here'

# Link for local development
npm link

# Run tests
npm test
```

### Project Structure

```
ggsd/
├── bin/                    # CLI entry point
│   └── ggsd.js
├── src/
│   ├── commands/          # Command implementations
│   ├── gemini/            # Gemini API client
│   ├── mcp/               # MCP server logic
│   ├── orchestrator/      # Workflow orchestration
│   ├── agents/            # Agent spawning
│   └── utils/             # Shared utilities
├── mcp-servers/           # MCP server implementations
├── tests/                 # Test suites
└── docs/                  # Documentation
```

## 🔨 Types of Contributions

### 1. Core Commands

Implementing the workflow commands in `src/commands/`:

**Priority Commands:**
- [ ] `new-project.js` - Project initialization
- [ ] `discuss-phase.js` - Capture decisions
- [ ] `plan-phase.js` - Research + planning
- [ ] `execute-phase.js` - Execute plans
- [ ] `verify-work.js` - Manual verification

**Supporting Commands:**
- [ ] `progress.js` - Status display
- [ ] `add-phase.js` - Phase management
- [ ] `quick.js` - Ad-hoc tasks
- [ ] `map-codebase.js` - Analyze existing code

### 2. MCP Servers

Creating MCP servers in `mcp-servers/`:

**Core Servers:**
- [ ] `files/` - File operations
- [ ] `git/` - Git operations
- [ ] `state/` - State management
- [ ] `research/` - Research coordination

### 3. Orchestration Logic

Building the multi-agent orchestration system:

- [ ] Agent spawning patterns
- [ ] Context management
- [ ] Error handling and retries
- [ ] Parallel execution

### 4. Testing

Adding comprehensive tests:

- [ ] Unit tests for commands
- [ ] Integration tests for workflows
- [ ] E2E tests for full cycles
- [ ] MCP server tests

### 5. Documentation

Improving and expanding docs:

- [ ] Command usage guides
- [ ] Architecture deep-dives
- [ ] Migration guides from GSD
- [ ] Example projects

## 📝 Development Workflow

### 1. Pick an Issue

Check [GitHub Issues](https://github.com/YOUR_USERNAME/ggsd/issues) for:
- `good first issue` - Good for newcomers
- `help wanted` - Need contributors
- `priority` - High impact

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 3. Make Your Changes

Follow the coding standards:

```javascript
// Good: Clear, descriptive names
async function executePhaseWorkflow(phaseNumber) {
  const plans = await loadPhasePlans(phaseNumber);
  const waves = groupIntoWaves(plans);
  return await executeWaves(waves);
}

// Bad: Vague, unclear
async function doStuff(n) {
  const p = await load(n);
  return await exec(p);
}
```

### 4. Write Tests

```javascript
// tests/commands/new-project.test.js
import { test } from 'node:test';
import assert from 'node:assert';
import { newProject } from '../../src/commands/new-project.js';

test('new-project creates required files', async () => {
  // Test implementation
});
```

### 5. Run Tests and Lint

```bash
npm test
npm run lint
```

### 6. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(commands): implement new-project command

- Add question flow for project initialization
- Create PROJECT.md and ROADMAP.md
- Spawn research agents if requested

Closes #42"
```

**Commit types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Adding tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance

### 7. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## ✅ Code Standards

### JavaScript/Node.js

- **ES Modules**: Use `import/export`, not `require`
- **Async/Await**: Prefer over promises and callbacks
- **Error Handling**: Always use try/catch
- **Constants**: Use UPPER_SNAKE_CASE
- **Functions**: Use descriptive names

```javascript
// ✅ Good
export async function planPhaseWorkflow(phaseNumber) {
  try {
    const context = await loadContext(phaseNumber);
    const research = await conductResearch(context);
    const plans = await createPlans(research);
    return await verifyPlans(plans, context);
  } catch (error) {
    throw new Error(`Plan phase failed: ${error.message}`);
  }
}

// ❌ Bad
export function plan(n) {
  return new Promise((resolve, reject) => {
    loadContext(n).then(ctx => {
      research(ctx).then(r => {
        create(r).then(p => {
          verify(p).then(resolve).catch(reject);
        });
      });
    });
  });
}
```

### Gemini API Usage

- **Model Selection**: Use appropriate model for task type
- **Retry Logic**: Always use `GeminiClient._withRetry`
- **Error Messages**: Clear, actionable errors
- **Context Management**: Mind token limits

```javascript
// ✅ Good
import { getGeminiClient, MODELS } from '../gemini/client.js';

const client = getGeminiClient();
const result = await client.generate(
  MODELS.PLANNING,
  prompt,
  { temperature: 0.7 }
);

// ❌ Bad
const result = await fetch('https://api.gemini.com/...'); // Don't bypass client
```

### File Operations

- **Always validate paths**: No directory traversal
- **Check file sizes**: Respect limits
- **Use MCP servers**: Don't use fs directly in commands

```javascript
// ✅ Good
import { mcpFiles } from '../mcp/files.js';

const content = await mcpFiles.read('.planning/PROJECT.md');
await mcpFiles.write('.planning/STATE.md', state);

// ❌ Bad
import { readFileSync, writeFileSync } from 'fs';
const content = readFileSync('PROJECT.md'); // Insecure
```

## 🧪 Testing Guidelines

### Unit Tests

Test individual functions in isolation:

```javascript
// tests/unit/orchestrator.test.js
import { test } from 'node:test';
import assert from 'node:assert';
import { groupIntoWaves } from '../../src/orchestrator/waves.js';

test('groupIntoWaves handles dependencies correctly', () => {
  const plans = [
    { id: 1, dependencies: [] },
    { id: 2, dependencies: [1] },
    { id: 3, dependencies: [] }
  ];
  
  const waves = groupIntoWaves(plans);
  
  assert.equal(waves.length, 2);
  assert.equal(waves[0].length, 2); // Plans 1 and 3
  assert.equal(waves[1].length, 1); // Plan 2
});
```

### Integration Tests

Test multiple components working together:

```javascript
// tests/integration/workflow.test.js
import { test } from 'node:test';
import { discussPhase } from '../../src/commands/discuss-phase.js';
import { planPhase } from '../../src/commands/plan-phase.js';

test('discuss-phase creates context for plan-phase', async () => {
  await discussPhase(1, { mockInput: true });
  const plans = await planPhase(1);
  
  assert.ok(plans.length > 0);
});
```

### E2E Tests

Test complete user workflows:

```javascript
// tests/e2e/complete-phase.test.js
import { test } from 'node:test';
import { setupTestProject } from '../helpers/setup.js';

test('complete phase 1 workflow', async () => {
  const project = await setupTestProject();
  
  await project.newProject();
  await project.discussPhase(1);
  await project.planPhase(1);
  await project.executePhase(1);
  
  assert.ok(project.hasFile('.planning/phases/01-*/SUMMARY.md'));
});
```

## 📚 Documentation Standards

### Command Documentation

Each command should have:

1. **Purpose**: What it does
2. **Usage**: How to use it
3. **Options**: Available flags
4. **Examples**: Real-world usage
5. **Output**: What it creates

```markdown
## ggsd plan-phase

**Purpose**: Research and create verified task plans for a phase.

**Usage**: 
```bash
ggsd plan-phase <phase-number>
```

**What it does**:
1. Researches implementation approaches
2. Creates 2-3 atomic task plans
3. Verifies plans against requirements
4. Loops until plans pass

**Creates**:
- `.planning/phases/{phase}-RESEARCH.md`
- `.planning/phases/{phase}-{N}-PLAN.md`

**Example**:
```bash
$ ggsd plan-phase 1
Researching phase 1...
Creating plans...
Verifying plans...
✓ 3 plans created and verified
```

### Code Comments

```javascript
/**
 * Execute a phase by running all its plans in parallel waves
 * 
 * @param {number} phaseNumber - Phase to execute (1-based)
 * @returns {Promise<ExecutionSummary>} - Results of execution
 * 
 * @example
 * const summary = await executePhaseWorkflow(1);
 * console.log(`Executed ${summary.tasksCompleted} tasks`);
 */
export async function executePhaseWorkflow(phaseNumber) {
  // Implementation
}
```

## 🎨 Attribution Requirements

When contributing, ensure:

1. **Maintain attribution**: Don't remove GSD credits
2. **Add your name**: Feel free to add yourself to contributors
3. **Reference original**: When adapting GSD code, note it
4. **License compliance**: Keep MIT license intact

```javascript
/**
 * Task Plan Verifier
 * 
 * Adapted from Get Shit Done by TÂCHES (glittercowboy)
 * Original: https://github.com/glittercowboy/get-shit-done
 * 
 * Modified for Gemini API and MCP integration
 * Contributors: [Your Name]
 */
```

## 🐛 Bug Reports

When reporting bugs:

1. **Search first**: Check if already reported
2. **Be specific**: Include exact steps to reproduce
3. **Provide context**: OS, Node version, GGSD version
4. **Include logs**: Error messages and stack traces

**Good bug report:**

```markdown
## Bug: execute-phase fails with large plans

**Environment**:
- OS: macOS 14.1
- Node: 18.17.0
- GGSD: 0.1.0

**Steps to reproduce**:
1. Create project with `ggsd new-project`
2. Add 10+ tasks in phase 1
3. Run `ggsd execute-phase 1`

**Expected**: All tasks execute
**Actual**: Fails with "Context limit exceeded"

**Error log**:
```
Error: Context limit exceeded at GeminiClient.generate
  at src/gemini/client.js:45:12
```

**Suggested fix**: 
Split large phases into smaller waves
```

## 💡 Feature Requests

When suggesting features:

1. **Explain the problem**: What are you trying to solve?
2. **Describe your solution**: How would it work?
3. **Consider alternatives**: Other ways to solve it?
4. **Show examples**: What would usage look like?

**Good feature request:**

```markdown
## Feature: Visual verification mode

**Problem**: 
Manual verification of UI changes is tedious. I have to manually test each visual deliverable.

**Proposed solution**:
Add screenshot-based verification:
```bash
ggsd verify-work 1 --visual
```

Takes screenshots at key steps, compares to expected states.

**Alternative approaches**:
- Record video of test session
- Use visual regression testing tools
- Manual checklist (current approach)

**Example usage**:
```bash
$ ggsd verify-work 1 --visual
📸 Taking screenshots...
✓ Login page: Matches expected
✗ Dashboard: Layout differs
  - Expected: Cards in 3 columns
  - Actual: Cards in 2 columns
```

**Complexity**: Medium
**Value**: High (saves time on UI-heavy projects)
```

## 🔒 Security

If you discover a security vulnerability:

1. **Don't open a public issue**
2. **Email**: [Your security contact email]
3. **Include**: Description, steps to reproduce, potential impact

## 📋 Pull Request Checklist

Before submitting:

- [ ] Code follows style guidelines
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] Commits follow conventional commit format
- [ ] Attribution maintained
- [ ] No console.log() left in code
- [ ] Error handling included

## 🙏 Recognition

Contributors will be:
- Listed in README.md
- Credited in release notes
- Celebrated in project updates

Thank you for helping make GGSD better!

---

**Questions?** 

Open a discussion on GitHub or reference the [original GSD project](https://github.com/glittercowboy/get-shit-done).

**Attribution**: This contribution guide inspired by GSD's collaborative spirit.
