# GGSD (Gemini Get Shit Done)

**Making Software Development Accessible to Everyone**

*An AI-powered development assistant that guides you from idea to working software - no coding experience required.*

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](./LICENSE)

---

## 🌟 Attribution

GGSD is an adaptation of the excellent [Get Shit Done](https://github.com/glittercowboy/get-shit-done) by [TÂCHES (glittercowboy)](https://github.com/glittercowboy).

**Original Project:** https://github.com/glittercowboy/get-shit-done  
**Original Author:** TÂCHES (glittercowboy)  
**Original License:** MIT

This adaptation maintains the core philosophy and workflow of GSD while reimagining it for Google's Gemini ecosystem with Model Context Protocol (MCP) integration.

---

## 🎯 What is GGSD?

GGSD is an **intelligent development assistant** that helps anyone build software - from complete beginners to experienced developers. Through AI-guided conversations, it transforms your ideas into working applications.

### 🌟 New Vision: Democratizing Software Development

> "Build what you want, learn to code in the process"

**Key Features**:
- **🎓 Educational by Design** - Learn while building, not before
- **🎯 Template-Driven** - 10+ project types with pre-configured stacks
- **💬 Conversational** - "20 Questions" approach to project definition
- **🔄 Flexible** - Pivot and change direction anytime
- **🚀 Rapid Prototyping** - Hours to MVP, not weeks

### Core Philosophy

- **Non-Technical First** - Assume zero coding knowledge
- **No enterprise theater** - No sprint ceremonies or Jira workflows
- **Just build** - Describe what you want, get it built
- **Learn by doing** - Understand the code you create

---

## 🚀 What's Different from GSD?

### Gemini-Specific Adaptations

1. **Google Gemini API** instead of Anthropic Claude API
2. **MCP (Model Context Protocol)** integration for tool use
3. **Gemini CLI** compatibility instead of Claude Code
4. **Gemini-optimized prompts** (adapted from Claude's XML format)
5. **Enhanced context window management** for Gemini 2.0's capabilities

### New Features & Improvements

- **MCP Servers** - Dedicated servers for file ops, git, state management
- **Parallel research** - Leverages Gemini's multimodal capabilities
- **Enhanced verification** - Automated testing workflows
- **Flexible deployment** - Works with Gemini Pro, Flash, and experimental models

---

## 📋 Prerequisites

- Node.js 18+ 
- Google AI Studio API key ([get one here](https://aistudio.google.com/app/apikey))
- Git installed
- Gemini CLI configured (optional but recommended)
- MCP-compatible environment

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/jaeebz/GGSD.git
cd ggsd

# Install dependencies
npm install

# Configure your Gemini API key
export GEMINI_API_KEY="your-api-key-here"

# Run the installer
npm run install-global   # Install to ~/.ggsd/
# OR
npm run install-local    # Install to ./.ggsd/
```

### MCP Server Setup

```bash
# Install MCP servers
npm run install-mcp

# Verify MCP connection
npm run test-mcp
```

---

## 🎮 Quick Start

### 1. Initialize a New Project

```bash
ggsd new-project
```

The system will:
1. Ask questions until it understands your idea
2. Research the domain (optional)
3. Extract requirements (v1, v2, out of scope)
4. Create a phased roadmap

### 2. Work Through Phases

```bash
# Discuss implementation details
ggsd discuss-phase 1

# Research and plan
ggsd plan-phase 1

# Execute the work
ggsd execute-phase 1

# Verify it works
ggsd verify-work 1
```

### 3. Track Progress

```bash
ggsd progress
```

---

## 📚 Core Workflow

```
┌─────────────────────────────────────────────────┐
│  1. new-project                                 │
│     → Questions → Research → Requirements       │
│     → Roadmap                                   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  2. discuss-phase [N]                           │
│     → Capture your vision & preferences         │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  3. plan-phase [N]                              │
│     → Research → Create plans → Verify          │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  4. execute-phase [N]                           │
│     → Parallel waves → Fresh context            │
│     → Atomic commits                            │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  5. verify-work [N]                             │
│     → Manual testing → Debug if needed          │
└─────────────────────────────────────────────────┘
                      ↓
         Repeat until milestone complete
                      ↓
┌─────────────────────────────────────────────────┐
│  6. complete-milestone                          │
│     → Archive → Tag release                     │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Available Commands

### Core Workflow
- `ggsd new-project` - Initialize new project
- `ggsd discuss-phase [N]` - Capture implementation decisions
- `ggsd plan-phase [N]` - Research and plan phase
- `ggsd execute-phase [N]` - Execute plans in parallel
- `ggsd verify-work [N]` - Manual verification
- `ggsd complete-milestone` - Archive and tag
- `ggsd new-milestone [name]` - Start next version

### Navigation
- `ggsd progress` - Show current status
- `ggsd help` - Show all commands

### Phase Management
- `ggsd add-phase` - Append phase to roadmap
- `ggsd insert-phase [N]` - Insert urgent work
- `ggsd remove-phase [N]` - Remove future phase

### Utilities
- `ggsd add-todo [desc]` - Capture idea
- `ggsd check-todos` - List pending todos
- `ggsd debug [desc]` - Systematic debugging
- `ggsd quick` - Ad-hoc task execution

### Brownfield
- `ggsd map-codebase` - Analyze existing codebase

---

## 🏗️ Architecture

### MCP Servers

GGSD uses dedicated MCP servers for:

1. **File Operations Server** (`mcp-files`)
   - Read/write planning documents
   - Manage `.planning/` structure
   - Handle size limits

2. **Git Operations Server** (`mcp-git`)
   - Atomic commits per task
   - Tag management
   - History tracking

3. **State Management Server** (`mcp-state`)
   - Track project progress
   - Manage STATE.md
   - Session handoffs

4. **Research Server** (`mcp-research`)
   - Parallel domain research
   - Ecosystem analysis
   - Pattern investigation

### Context Engineering

| File | Purpose | Max Size |
|------|---------|----------|
| `PROJECT.md` | Vision & goals | 2KB |
| `REQUIREMENTS.md` | Scoped requirements | 5KB |
| `ROADMAP.md` | Phased plan | 3KB |
| `STATE.md` | Current position | 2KB |
| `{phase}-CONTEXT.md` | Implementation decisions | 4KB |
| `{phase}-PLAN.md` | Atomic task plans | 3KB each |
| `{phase}-SUMMARY.md` | Execution results | 2KB |

---

## 🎨 Why It Works

### 1. Context Engineering
Every file has a purpose and size limit. Stay under the limits, get consistent excellence.

### 2. Multi-Agent Orchestration
Thin orchestrators spawn specialized agents:
- **Research**: 4 parallel researchers
- **Planning**: Planner + checker loop
- **Execution**: Parallel executors with fresh context
- **Verification**: Verifier + debuggers

### 3. Atomic Git Commits
Each task = one commit. Perfect for bisecting and rollbacks.

### 4. Modular Design
Add phases, insert urgent work, adjust plans - never locked in.

---

## 🔄 Improvements Over GSD

### Enhanced for Gemini

1. **Multimodal Context** - Leverage Gemini's image/video understanding
2. **Longer Context Windows** - Gemini 2.0's 2M token window
3. **Better Parallel Processing** - Optimized for Gemini's architecture
4. **MCP Native** - Built for the protocol, not adapted

### New Features

- **Codebase mapping** - Automated before `new-project`
- **Visual verification** - Screenshot-based testing
- **Enhanced debugging** - Multi-pass diagnosis
- **Cost optimization** - Smart model selection (Pro/Flash)

---

## 🐛 Troubleshooting

**Commands not working?**
```bash
# Verify installation
ggsd help

# Reinstall
npm run install-global
```

**MCP connection issues?**
```bash
# Test MCP servers
npm run test-mcp

# Restart servers
npm run restart-mcp
```

**Gemini API errors?**
```bash
# Verify API key
echo $GEMINI_API_KEY

# Test connection
npm run test-gemini
```

---

## 📖 Documentation

### Getting Started
- 📘 [Quick Start Guide](./QUICKSTART.md) - Get up and running in 15 minutes
- 🛠️ [Installation Guide](./INSTALLATION.md) - Detailed setup instructions
- ✅ [Setup Checklist](./SETUP_CHECKLIST.md) - Step-by-step setup verification

### Core Concepts
- 🎯 **[Vision & Philosophy](./VISION.md)** - Our mission to democratize development
- 📦 **[Project Templates](./TEMPLATES.md)** - 10+ pre-configured project types  
- 🏗️ [Architecture Guide](./docs/ARCHITECTURE.md) - How GGSD works internally
- 🗺️ [Development Roadmap](./ROADMAP.md) - What we're building next

### Contributing & Development
- 🤝 [Contributing Guide](./CONTRIBUTING.md) - How to help build GGSD
- 🐙 [GitHub Setup](./GITHUB.md) - Push your GGSD fork
- 📊 [Project Summary](./PROJECT_SUMMARY.md) - What we've built so far
- 📚 [Full Documentation Index](./docs/README.md) - All documentation

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

**Original GSD License:** MIT License - Copyright (c) 2024 TÂCHES (glittercowboy)

---

## 🙏 Acknowledgments

- **TÂCHES (glittercowboy)** - Original GSD creator
- **Anthropic** - Claude Code and API
- **Google** - Gemini API and models
- **MCP Community** - Model Context Protocol

---

## 🌟 Star History

If this project helps you, please consider starring it on GitHub!

---

**GGSD: Gemini-powered, spec-driven development that just works.**
