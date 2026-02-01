# GGSD Quick Start Guide

Get up and running with Gemini Get Shit Done in under 5 minutes.

---

## Prerequisites Checklist

- [ ] Node.js 18+ installed ([download here](https://nodejs.org/))
- [ ] Git installed
- [ ] Gemini API key ([get one here](https://aistudio.google.com/app/apikey))
- [ ] Terminal/command line access

---

## Installation

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ggsd.git
cd ggsd

# Run the setup script
chmod +x setup.sh
./setup.sh
```

The setup script will:
- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Prompt for your Gemini API key
- ✅ Initialize git if needed
- ✅ Show you next steps

### 2. Set Your Gemini API Key

If you skipped it during setup, set it now:

```bash
# Add to your shell profile (~/.bashrc or ~/.zshrc)
echo "export GEMINI_API_KEY='your-api-key-here'" >> ~/.zshrc

# Or set for current session only
export GEMINI_API_KEY='your-api-key-here'
```

### 3. Install the CLI Globally (Optional)

```bash
npm link
```

Now you can use `ggsd` from anywhere!

---

## Your First Project

Let's build a simple todo app to learn the workflow:

### Step 1: Initialize Project

```bash
# Create a new directory for your project
mkdir my-todo-app
cd my-todo-app

# Initialize with GGSD
ggsd new-project
```

**What happens:**
1. GGSD asks questions about your project
2. Optionally researches the domain
3. Creates requirements (v1, v2, out of scope)
4. Generates a phased roadmap

**Example interaction:**
```
? What are you building? 
> A simple todo app with task management

? What's the primary goal?
> Users can create, complete, and delete todos

? Any specific technologies?
> React + TypeScript + local storage

? Should we research the domain? (Y/n)
> Y
```

**Creates:**
- `.planning/PROJECT.md` - Your vision
- `.planning/REQUIREMENTS.md` - What's in scope
- `.planning/ROADMAP.md` - Phased plan
- `.planning/STATE.md` - Current progress

### Step 2: Review the Roadmap

```bash
ggsd progress
```

You'll see something like:

```
📋 Project: Todo App
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Status: Planning
Milestone: v1.0

Roadmap:
  Phase 1: Core task management        [PENDING]
  Phase 2: Task organization           [PENDING]
  Phase 3: User experience polish      [PENDING]

Next: ggsd discuss-phase 1
```

### Step 3: Discuss Phase 1

```bash
ggsd discuss-phase 1
```

**What happens:**
GGSD identifies gray areas in the phase and asks your preferences:

```
? Task layout: List or grid? 
> List

? New task input: Inline or modal?
> Inline with Enter to add

? Empty state: Show tutorial?
> Yes, simple 3-step guide
```

**Creates:**
- `.planning/phases/01-core-task-management/CONTEXT.md`

This captures YOUR vision before any code is written.

### Step 4: Plan the Phase

```bash
ggsd plan-phase 1
```

**What happens:**
1. Research phase investigates implementation patterns
2. Creates 2-3 atomic task plans
3. Verifies plans against requirements
4. Loops until plans pass validation

**Creates:**
- `.planning/phases/01-core-task-management/RESEARCH.md`
- `.planning/phases/01-core-task-management/01-PLAN.md`
- `.planning/phases/01-core-task-management/02-PLAN.md`

### Step 5: Execute the Phase

```bash
ggsd execute-phase 1
```

**What happens:**
1. Groups plans into parallel waves
2. Spawns executor agents with fresh context
3. Implements each plan
4. Commits each task atomically
5. Verifies against goals

**You'll see:**
```
⚡ Executing Phase 1: Core task management
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Wave 1 (parallel):
  ✓ Task 1: Create task state management (2m 34s)
  ✓ Task 2: Build task list UI (3m 12s)

Committing changes...
  ✓ feat(01): create task state management
  ✓ feat(01): build task list UI

Verification: ✓ Passed

Phase 1 complete!
```

**Creates:**
- `.planning/phases/01-core-task-management/01-SUMMARY.md`
- `.planning/phases/01-core-task-management/02-SUMMARY.md`
- `.planning/phases/01-core-task-management/VERIFICATION.md`
- Git commits (one per task)

### Step 6: Verify It Works

```bash
ggsd verify-work 1
```

**What happens:**
GGSD walks you through testing each deliverable:

```
Testing Phase 1 deliverables...

✓ Can you create a new task? (Y/n)
> Y

✓ Does the task appear in the list? (Y/n)
> Y

✓ Can you mark it complete? (Y/n)
> n

Issue: Complete button not working
```

If issues found, GGSD spawns debugger agents to diagnose and creates fix plans.

### Step 7: Repeat for Remaining Phases

```bash
ggsd discuss-phase 2
ggsd plan-phase 2
ggsd execute-phase 2
ggsd verify-work 2

ggsd discuss-phase 3
ggsd plan-phase 3
ggsd execute-phase 3
ggsd verify-work 3
```

### Step 8: Complete the Milestone

```bash
ggsd complete-milestone
```

**What happens:**
1. Archives milestone to `.planning/milestones/v1.0/`
2. Tags release: `git tag v1.0`
3. Updates STATE.md
4. Clears roadmap for next milestone

---

## Quick Commands Reference

```bash
# Navigation
ggsd progress              # Where am I? What's next?
ggsd help                  # Show all commands

# Core workflow
ggsd new-project           # Initialize
ggsd discuss-phase <N>     # Capture decisions
ggsd plan-phase <N>        # Research + plan
ggsd execute-phase <N>     # Build it
ggsd verify-work [N]       # Test it

# Phase management
ggsd add-phase             # Append to roadmap
ggsd insert-phase <N>      # Insert urgent work

# Utilities
ggsd quick                 # Ad-hoc task
ggsd add-todo "idea"       # Capture for later
ggsd check-todos           # View todos

# Milestones
ggsd complete-milestone    # Finish v1
ggsd new-milestone v2      # Start v2
```

---

## Understanding the Workflow

### The 4-Step Loop

```
┌─────────────┐
│   DISCUSS   │ ← Capture YOUR vision
└──────┬──────┘
       ↓
┌─────────────┐
│    PLAN     │ ← Research + create verified plans
└──────┬──────┘
       ↓
┌─────────────┐
│   EXECUTE   │ ← Build it (parallel, fresh context)
└──────┬──────┘
       ↓
┌─────────────┐
│   VERIFY    │ ← Test it manually
└──────┬──────┘
       ↓
    Repeat until milestone complete
```

### Key Concepts

**Phases** - Meaningful chunks of functionality
- Phase 1: Core features
- Phase 2: Enhancements
- Phase 3: Polish

**Tasks** - Atomic units of work within a phase
- Completable in 2-4 hours
- One commit per task
- Clear verification steps

**Waves** - Groups of independent tasks
- Execute in parallel
- Fresh context per task
- No context rot

**Milestones** - Complete versions
- v1, v2, v3...
- Each gets git tag
- Archived after completion

---

## File Structure Explained

```
your-project/
├── .planning/                  # GGSD workspace
│   ├── PROJECT.md             # Vision (always loaded)
│   ├── REQUIREMENTS.md        # What's in scope
│   ├── ROADMAP.md            # Phased plan
│   ├── STATE.md              # Current position
│   │
│   ├── research/             # Domain research
│   │   ├── stack.md
│   │   ├── features.md
│   │   ├── architecture.md
│   │   └── pitfalls.md
│   │
│   ├── phases/               # Phase workspaces
│   │   ├── 01-phase-name/
│   │   │   ├── CONTEXT.md        # Your decisions
│   │   │   ├── RESEARCH.md       # Implementation research
│   │   │   ├── 01-PLAN.md        # Task plan
│   │   │   ├── 01-SUMMARY.md     # Execution result
│   │   │   ├── 02-PLAN.md
│   │   │   └── VERIFICATION.md   # Phase verification
│   │   └── 02-phase-name/
│   │       └── ...
│   │
│   ├── quick/                # Ad-hoc tasks
│   │   └── 001-task-name/
│   │       ├── PLAN.md
│   │       └── SUMMARY.md
│   │
│   └── todos/                # Captured ideas
│       └── future-features.md
│
└── [your code]               # Actual project files
```

---

## Common Workflows

### Starting Fresh

```bash
mkdir my-project && cd my-project
ggsd new-project
# Answer questions
ggsd progress
```

### Adding to Existing Codebase

```bash
cd existing-project
ggsd map-codebase           # Analyze first
ggsd new-project            # Then initialize
```

### Urgent Bug Fix

```bash
ggsd quick
? What do you want to do?
> Fix login button not working on mobile
```

Creates plan, executes, commits - all in one flow.

### Capturing Ideas Mid-Work

```bash
ggsd add-todo "Add dark mode support"
ggsd add-todo "Improve error messages"

# Later...
ggsd check-todos
```

### Jumping to Different Phase

```bash
ggsd progress              # See all phases
ggsd insert-phase 2        # Insert urgent phase
ggsd execute-phase 2       # Jump to it
```

---

## Troubleshooting

### "Command not found: ggsd"

**Solution:**
```bash
cd /path/to/ggsd
npm link
```

Or use with npx:
```bash
npx ggsd new-project
```

### "GEMINI_API_KEY not set"

**Solution:**
```bash
export GEMINI_API_KEY='your-key-here'

# Or add to ~/.zshrc:
echo "export GEMINI_API_KEY='your-key-here'" >> ~/.zshrc
source ~/.zshrc
```

### "Rate limit exceeded"

**What's happening:**
Gemini API has rate limits on free tier.

**Solution:**
Wait a minute, then retry. GGSD has automatic retry logic.

### "Agent timeout"

**What's happening:**
Complex task took too long.

**Solution:**
Break into smaller tasks or try again (may have been transient).

### "No .planning/ directory found"

**What's happening:**
You're not in a GGSD-initialized project.

**Solution:**
```bash
ggsd new-project    # Initialize first
```

---

## Best Practices

### ✅ Do

- **Be specific in discussions** - More detail = better results
- **Verify after each phase** - Catch issues early
- **Use quick for urgent fixes** - Don't disrupt main workflow
- **Review plans before executing** - Make sure they match your vision
- **Commit regularly** - Each task gets a commit automatically

### ❌ Don't

- **Skip discussion step** - GGSD can't read your mind
- **Execute without planning** - Plans are verified against requirements
- **Ignore verification failures** - Fix before moving on
- **Delete .planning/ folder** - It's your project memory
- **Manually edit generated code mid-phase** - Let GGSD finish, then iterate

---

## Tips for Better Results

### 1. Front-load Decisions in Discussion

Bad:
```
? Task layout?
> Whatever works
```

Good:
```
? Task layout?
> Vertical list, compact density, checkbox on left,
> task text in middle, delete button on hover right
```

### 2. Reference Existing Patterns

```
? Authentication approach?
> Similar to how GitHub does it - JWT tokens,
> httpOnly cookies, 7-day expiry
```

### 3. Specify Edge Cases

```
? What happens when...
> If list is empty: show welcome message + "Add your first task" CTA
> If task deleted: fade out animation, confirm if multiple selected
```

### 4. Use Research Phase Wisely

**Research when:**
- Unfamiliar stack
- Complex domain
- Multiple implementation options

**Skip research when:**
- Simple CRUD
- Know exactly what you want
- Tight on API quota

---

## What's Next?

### Build Something Real

Now that you know the basics, build something you actually need:

- Personal dashboard
- Client project
- Side project idea
- Portfolio site

### Customize for Your Team

- Adapt prompts in `src/gemini/prompts.js`
- Add custom commands in `src/commands/`
- Create team-specific templates
- Share your .planning/ structure

### Contribute Back

- Report issues
- Suggest improvements
- Submit PRs
- Share your workflows

---

## Getting Help

- **Documentation**: [Full docs](docs/README.md)
- **Examples**: [Example projects](examples/)
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/ggsd/issues)
- **Original**: [Get Shit Done by TÂCHES](https://github.com/glittercowboy/get-shit-done)

---

## Acknowledgments

GGSD is adapted from **[Get Shit Done](https://github.com/glittercowboy/get-shit-done)** by **TÂCHES (glittercowboy)**.

Original concept, workflow, and philosophy by TÂCHES.  
Gemini adaptation and MCP integration by GGSD contributors.

License: MIT (both projects)

---

**Ready to get shit done with Gemini? Start building! 🚀**
