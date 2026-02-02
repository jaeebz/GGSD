# 📚 GGSD Documentation Index

Complete guide to all GGSD documentation.

---

## 🚀 Getting Started (Start Here!)

### [INSTALLATION.md](INSTALLATION.md)
**Complete installation guide with troubleshooting**
- Pre-installation checklist
- 3 installation methods
- Verification steps
- Platform-specific notes
- Troubleshooting common issues

### [QUICKSTART.md](QUICKSTART.md)
**Learn the workflow in under 15 minutes**
- Your first project walkthrough
- Core workflow explanation
- Quick command reference
- Common workflows
- Best practices and tips

---

## 📖 Core Documentation

### [README.md](README.md)
**Project overview and introduction**
- What is GGSD?
- Why it exists
- How it differs from GSD
- Quick installation
- Basic usage

### [ARCHITECTURE.md](docs/ARCHITECTURE.md)
**Technical deep-dive into system design**
- System overview
- Core components
- Data flow
- Prompt engineering
- Context management
- Agent orchestration patterns
- Performance optimizations

---

## 🛠️ Development

### [CONTRIBUTING.md](CONTRIBUTING.md)
**Guide for contributors**
- Development setup
- Project structure
- Types of contributions
- Development workflow
- Code standards
- Testing guidelines
- Attribution requirements

### [ROADMAP.md](ROADMAP.md)
**Implementation plan and progress**
- Current status and progress
- Phase-by-phase breakdown
- Command implementation details
- Sprint planning
- Success metrics
- Known challenges

---

## 🐙 GitHub & Collaboration

### [GITHUB.md](GITHUB.md)
**Setting up your GGSD project on GitHub**
- Creating GitHub repository
- Connecting local repo
- Issue templates
- Pull request templates
- GitHub Actions setup
- Adding badges
- Maintaining attribution
- Release workflow

---

## 📝 Reference Documents

### [LICENSE](LICENSE)
**MIT License with attribution**
- Original GSD license
- GGSD adaptation license
- Attribution to TÂCHES (glittercowboy)

### [CONTRIBUTORS.md](CONTRIBUTORS.md) *(To be created)*
**List of all contributors**
- Original author credits
- GGSD contributors
- How to get listed

---

## 📚 Documentation by Use Case

### 👶 I'm New to GGSD

**Read in this order:**

1. [INSTALLATION.md](INSTALLATION.md) - Set up GGSD
2. [QUICKSTART.md](QUICKSTART.md) - Learn the basics
3. [README.md](README.md) - Understand the philosophy
4. Build your first project!

**Estimated time**: 30 minutes

---

### 🔧 I Want to Understand How It Works

**Read in this order:**

1. [README.md](README.md) - High-level overview
2. [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical details
3. [ROADMAP.md](ROADMAP.md) - See what's implemented
4. Browse the source code

**Estimated time**: 1-2 hours

---

### 🤝 I Want to Contribute

**Read in this order:**

1. [CONTRIBUTING.md](CONTRIBUTING.md) - Contributor guide
2. [ROADMAP.md](ROADMAP.md) - See what needs work
3. [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Understand the system
4. [GITHUB.md](GITHUB.md) - GitHub workflow
5. Pick an issue and start coding!

**Estimated time**: 2-3 hours to get familiar

---

### 🚢 I Want to Deploy GGSD

**Read in this order:**

1. [INSTALLATION.md](INSTALLATION.md) - Installation options
2. [GITHUB.md](GITHUB.md) - GitHub setup
3. [CONTRIBUTING.md](CONTRIBUTING.md) - Development workflow
4. Set up your repository

**Estimated time**: 1 hour

---

### 🐛 I'm Having Issues

**Check these resources:**

1. [INSTALLATION.md](INSTALLATION.md) - Troubleshooting section
2. [QUICKSTART.md](QUICKSTART.md) - Common workflows
3. [GitHub Issues](https://github.com/jaeebz/GGSD/issues)
4. [Original GSD](https://github.com/glittercowboy/get-shit-done) - Reference

**Estimated time**: 10-30 minutes

---

## 📋 Quick Reference

### File Naming Conventions

```
.planning/
├── PROJECT.md          # Vision and goals
├── REQUIREMENTS.md     # What's in scope (v1, v2, out of scope)
├── ROADMAP.md         # Phased plan
├── STATE.md           # Current progress
├── research/          # Domain research
├── phases/
│   └── 01-name/
│       ├── CONTEXT.md      # Implementation decisions
│       ├── RESEARCH.md     # Phase-specific research
│       ├── 01-PLAN.md      # Task plan
│       ├── 01-SUMMARY.md   # Execution result
│       └── VERIFICATION.md # Phase verification
└── quick/             # Ad-hoc tasks
```

### Command Reference

```bash
# Core workflow
ggsd new-project           # Initialize
ggsd discuss-phase <N>     # Capture decisions
ggsd plan-phase <N>        # Research + plan
ggsd execute-phase <N>     # Build
ggsd verify-work [N]       # Test

# Navigation
ggsd progress              # Status
ggsd help                  # Commands

# Utilities
ggsd quick                 # Ad-hoc task
ggsd add-todo "desc"       # Capture idea
ggsd map-codebase          # Analyze code
```

### File Size Limits

| File | Max Size | Purpose |
|------|----------|---------|
| PROJECT.md | 2KB | Vision (always loaded) |
| REQUIREMENTS.md | 5KB | Comprehensive requirements |
| ROADMAP.md | 3KB | High-level phases |
| STATE.md | 2KB | Current position |
| CONTEXT.md | 4KB | Implementation decisions |
| PLAN.md | 3KB | Atomic task |
| SUMMARY.md | 2KB | Execution results |

---

## 🔗 External Resources

### Original Project

- **Get Shit Done**: https://github.com/glittercowboy/get-shit-done
- **Author**: TÂCHES (glittercowboy)
- **License**: MIT

### Related Technologies

- **Gemini API**: https://ai.google.dev/
- **Model Context Protocol**: https://github.com/modelcontextprotocol
- **Claude Code**: https://docs.anthropic.com/claude/docs
- **Node.js**: https://nodejs.org/
- **Commander.js**: https://github.com/tj/commander.js

---

## 🎯 Documentation Goals

### Completeness ✅
- [x] Installation guide
- [x] Quick start guide
- [x] Architecture documentation
- [x] Contributing guide
- [x] GitHub setup guide
- [x] Implementation roadmap
- [ ] API reference (planned)
- [ ] Migration guide (planned)
- [ ] MCP servers guide (planned)
- [ ] Examples collection (planned)

### Clarity ✅
- Clear structure
- Logical ordering
- Practical examples
- Troubleshooting sections

### Accuracy 🔄
- Regular updates
- Version tracking
- Issue-driven improvements

---

## 📝 Documentation Standards

### Markdown Files

All documentation uses:
- **Markdown format** (.md)
- **Clear headings** (H1 for title, H2-H4 for sections)
- **Code blocks** with language hints
- **Emoji indicators** for visual scanning
- **Tables** for structured data
- **Links** to related docs

### Code Examples

All code examples:
- **Syntax highlighted**
- **Copy-paste ready**
- **Include expected output**
- **Note platform differences**

### Commands

All command examples:
- **Show full command**
- **Explain what it does**
- **Show expected output**
- **Note prerequisites**

---

## 🔄 Keeping Documentation Updated

### When to Update Docs

Update documentation when:
- Adding new commands
- Changing workflows
- Fixing bugs
- Improving features
- User feedback
- Questions in issues

### How to Update

```bash
# 1. Create branch
git checkout -b docs/update-quickstart

# 2. Edit documentation
vim QUICKSTART.md

# 3. Commit
git commit -m "docs: update quickstart with new examples"

# 4. Push and PR
git push origin docs/update-quickstart
```

---

## 🙏 Attribution

All documentation maintains attribution to:
- **Original Author**: TÂCHES (glittercowboy)
- **Original Project**: Get Shit Done
- **License**: MIT

This is non-negotiable and included in every documentation file.

---

## 📮 Feedback

Found an issue in the docs?
- [Open an issue](https://github.com/jaeebz/GGSD/issues/new)
- [Start a discussion](https://github.com/jaeebz/GGSD/discussions)
- [Submit a PR](https://github.com/jaeebz/GGSD/pulls)

Want a specific topic covered?
- Request it in discussions
- Add it to the roadmap
- Write it yourself (we welcome contributions!)

---

**Documentation is a living project. Help us improve it!**

Last updated: January 2026  
Version: 0.1.0 (Foundation Complete)
