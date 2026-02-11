# GGSD Project Templates

**Rapid Prototyping Through Pre-Configured Project Types**

---

## 📋 Overview

Project templates are **pre-configured starting points** that include:
- Technology stack recommendations
- Domain-specific question flows
- Common architecture patterns
- Best practices and pitfalls
- Example code and structures
- Dependencies and tools

**Goal**: Get from idea to working prototype in hours, not weeks.

---

## 🎯 Template Philosophy

### Why Templates Matter

**Without templates**:
```
User: "I want to build a music social network"
GGSD: "Okay, what technologies do you want to use?"
User: "Um... I don't know?"
(Research paralysis, decision fatigue, overwhelm)
```

**With templates**:
```
User: "I want to build a music social network"
GGSD: "Great! That's a Social Media + Audio project."
      "I'll set you up with React, Node.js, and an audio player."
      "Now, let's talk about your specific features..."
(Confident start, focused questions, rapid progress)
```

---

## 📦 Core Templates (v1.0)

### 1. Audio/DSP Processing 🎵

**For**: Audio effects, synthesizers, VST plugins, music tools

**Tech Stack**:
- **Desktop Plugins**: JUCE, VST SDK
- **Web Audio**: Tone.js, Web Audio API, Howler.js
- **Max/MSP**: Max for Live, Gen~
- **Mobile**: iOS Core Audio, Android Audio API

**Typical Questions**:
```
? Real-time or offline processing?
? Input source? (Mic / File / MIDI / Camera / Sensor)
? Output? (Speakers / File / Visual / MIDI)
? Effect type? (Filter / Delay / Distortion / Synthesis / Other)
? Control method? (Knobs / Touch / MIDI / Automation / CV)
? Preset system needed?
? Sample rate? (44.1k / 48k / 96k / Adaptive)
? Buffer size? (Small=low-latency / Large=stable)
```

**Common Architectures**:
- **Plugin**: VST3, AU, AAX with JUCE framework
- **Web App**: React + Tone.js + Web Audio API
- **Max Patch**: Max for Live device
- **Standalone**: Electron + Web Audio

**Pitfalls to Avoid**:
- Buffer underruns (too small buffer)
- Sample rate mismatches
- Latency accumulation
- CPU overload in real-time
- Missing MIDI learn functionality

**Example Projects**:
- Wah-wah effect controlled by webcam light
- Granular synthesizer with touch interface
- Vocal harmonizer with automatic pitch detection

---

### 2. Graphics & Visual Tools 🎨

**For**: Image editors, visual effects, creative tools, design apps

**Tech Stack**:
- **2D Canvas**: HTML Canvas, Paper.js, Fabric.js
- **WebGL**: Three.js, PixiJS, Babylon.js
- **Desktop**: Electron + Canvas/WebGL
- **Mobile**: iOS Metal, Android Vulkan
- **Processing**: p5.js, Processing, openFrameworks

**Typical Questions**:
```
? 2D or 3D graphics?
? Real-time or batch processing?
? Interactive or automated?
? Input? (Image / Video / Camera / Drawing)
? Output format? (PNG / SVG / PDF / Video)
? Filters/effects needed?
? Layer system?
? Undo/redo important?
```

**Common Architectures**:
- **Web Editor**: React + Canvas + State Management
- **Desktop Tool**: Electron + GPU acceleration
- **Plugin**: Photoshop/GIMP/Figma extension
- **Mobile App**: Native with GPU rendering

**Pitfalls to Avoid**:
- Performance with large images
- Memory leaks with canvas
- Cross-browser WebGL differences
- Undo/redo state explosion
- File format compatibility

---

### 3. 3D Rendering & Animation 🎬

**For**: 3D viewers, modeling tools, animation, VR/AR

**Tech Stack**:
- **Web 3D**: Three.js, Babylon.js, A-Frame
- **Game Engines**: Unity, Godot, Unreal
- **Modeling**: Blender API, Open3D
- **VR/AR**: WebXR, ARKit, ARCore

**Typical Questions**:
```
? Real-time rendering or pre-render?
? Interactive or cinematic?
? VR/AR support?
? Physics simulation needed?
? Target platform? (Web / Desktop / Mobile / Console)
? Poly count? (Low / Medium / High / Ultra)
? Lighting? (Baked / Real-time / Ray-traced)
? Animation system? (Timeline / Skeletal / Physics)
```

**Common Architectures**:
- **Web Viewer**: React + Three.js + OrbitControls
- **Desktop App**: Unity/Unreal + custom tools
- **VR Experience**: WebXR + hand tracking
- **Model Editor**: Three.js + transform controls

---

### 4. Games & Interactive 🎮

**For**: 2D/3D games, simulations, interactive experiences

**Tech Stack**:
- **2D**: Phaser, Godot, GameMaker
- **3D**: Unity, Unreal, Godot
- **Web**: Phaser, Three.js, Babylon.js
- **Mobile**: Unity/Godot export

**Typical Questions**:
```
? 2D or 3D?
? Genre? (Platformer / Puzzle / RPG / Shooter / Other)
? Multiplayer?
? Physics needed?
? Target platform? (Web / Desktop / Mobile / Console)
? Monetization? (Free / Paid / IAP / Ads)
? Save system?
? Tutorial/levels system?
```

**Common Architectures**:
- **Web Game**: Phaser + WebSockets for multiplayer
- **Mobile Game**: Unity with IAP integration
- **Desktop Game**: Godot with Steam integration

---

### 5. Social Media & Communication 💬

**For**: Social platforms, chat apps, content sharing, communities

**Tech Stack**:
- **Frontend**: React, Vue, Next.js
- **Backend**: Node.js, Express, FastAPI
- **Database**: PostgreSQL, MongoDB, Firebase
- **Real-time**: WebSockets, Socket.io, Firebase
- **Storage**: AWS S3, Cloudinary, Firebase Storage
- **Auth**: Auth0, Firebase Auth, custom JWT

**Typical Questions**:
```
? Content type? (Text / Images / Video / Audio / Mixed)
? Real-time features? (Chat / Notifications / Live updates)
? Scale expectation? (10s / 100s / 1000s / 10000s+ users)
? User authentication? (Email / Social / Phone)
? User profiles?
? Privacy controls? (Public / Private / Friends-only)
? Moderation needed?
? Media upload size limits?
```

**Common Architectures**:
- **Modern Stack**: Next.js + Supabase + Vercel
- **Real-time**: React + Firebase + Cloud Functions
- **Scalable**: React + Node.js + PostgreSQL + Redis
- **Simple**: React + Firebase (serverless)

**Example**: BassBook (music social network with patch sharing)

---

### 6. AI/ML Applications 🤖

**For**: ML models, data analysis, AI-powered tools

**Tech Stack**:
- **Python ML**: TensorFlow, PyTorch, scikit-learn
- **Web Integration**: FastAPI, Flask
- **Frontend**: React, Streamlit, Gradio
- **Cloud ML**: Hugging Face, Google AI, OpenAI
- **Model Deployment**: Docker, AWS, Replicate

**Typical Questions**:
```
? Model type? (Classification / Generation / Detection / NLP / Other)
? Training data? (Existing dataset / User-provided / Scraped)
? Training needed or pre-trained?
? Input format? (Text / Image / Audio / Video)
? Output format? (Text / Image / Data / Predictions)
? Real-time or batch?
? API needed?
? GPU required?
```

**Common Architectures**:
- **Simple App**: Streamlit + Pre-trained model
- **API Service**: FastAPI + PyTorch + Docker
- **Full Stack**: React + Python API + PostgreSQL
- **Serverless**: Vercel + Replicate + Edge functions

---

### 7. Engineering & Simulation 🔬

**For**: Scientific computing, simulations, CAD tools, data viz

**Tech Stack**:
- **Python**: NumPy, SciPy, Matplotlib
- **Specialized**: MATLAB, Mathematica, Julia
- **Visualization**: D3.js, Plotly, Three.js
- **CAD**: OpenCASCADE, FreeCAD API
- **Physics**: PyBullet, PhysX, Bullet

**Typical Questions**:
```
? Domain? (Physics / Chemistry / Engineering / Mathematics)
? Real-time or batch computation?
? Visualization needed?
? Precision level? (Float / Double / Arbitrary)
? 2D or 3D visualization?
? Interactive or static?
? Export format? (CSV / JSON / PDF / Images)
```

---

### 8. Business/Enterprise 💼

**For**: CRM, inventory, workflows, dashboards, internal tools

**Tech Stack**:
- **Frontend**: React, Angular, Vue
- **Backend**: .NET, Spring Boot, Node.js
- **Database**: PostgreSQL, MySQL, SQL Server
- **Reports**: PDF generation, Excel export
- **Auth**: Active Directory, OAuth, SSO

**Typical Questions**:
```
? User roles? (Admin / Manager / Employee / Custom)
? Data volume? (Records in 100s / 1000s / 100000s)
? Reporting needed?
? Integration with? (Excel / Email / Calendar / CRM)
? Multi-tenant?
? Audit logging?
? Offline capability?
```

---

### 9. Developer Tools 🛠️

**For**: IDEs, build tools, testing frameworks, CLIs

**Tech Stack**:
- **Desktop**: Electron, Tauri
- **CLI**: Node.js, Python Click, Rust
- **VSCode Extension**: TypeScript + VSCode API
- **Web Tools**: React + Monaco Editor

**Typical Questions**:
```
? Type? (IDE / Build Tool / Linter / Formatter / CLI / Extension)
? Target language/platform?
? Integration with existing tools?
? Plugin system needed?
? Configuration format? (JSON / YAML / Code)
? GUI or CLI?
```

---

### 10. Custom/Unique 🌟

**For**: Projects that don't fit standard categories

**Approach**:
- Start with broad questions
- AI analyzes and suggests closest template(s)
- Hybrid approach combining multiple templates
- Create custom decision tree on the fly

---

## 🏗️ Template Structure

Each template is a JSON configuration file:

```javascript
// src/templates/audio-dsp.json
{
  "id": "audio-dsp",
  "name": "Audio/DSP Processing",
  "description": "Audio effects, synthesizers, VST plugins, music tools",
  "icon": "🎵",
  "category": "creative",
  
  "techStack": {
    "primary": ["JUCE", "Web Audio API", "Tone.js"],
    "alternatives": {
      "desktop": ["JUCE", "VST SDK"],
      "web": ["Tone.js", "Web Audio API"],
      "mobile": ["Core Audio", "Android Audio"]
    }
  },
  
  "questions": [
    {
      "id": "realtime",
      "type": "choice",
      "question": "Real-time or offline processing?",
      "options": [
        {
          "value": "realtime",
          "label": "Real-time (like live effects)",
          "explanation": "Processes audio instantly as it's playing. Lower latency but more CPU intensive.",
          "implications": ["Requires buffer management", "CPU optimization critical"]
        },
        {
          "value": "offline",
          "label": "Offline (renders to file)",
          "explanation": "Processes audio in the background, saves to file. Can be slower but more complex effects possible.",
          "implications": ["Progress indicator needed", "File I/O handling"]
        }
      ],
      "educational": {
        "why": "Real-time means instant response (like a phone call). Offline means processing happens in the background (like email).",
        "analogy": "Real-time is like cooking on a live TV show - everything happens now. Offline is like meal prep - you do it ahead of time.",
        "learnMore": "https://docs.ggsd.dev/audio/realtime-vs-offline"
      }
    },
    {
      "id": "input_source",
      "type": "choice",
      "question": "What's your audio input?",
      "dependsOn": { "realtime": "realtime" },
      "options": ["Microphone", "File", "MIDI", "Camera (visual)", "Sensor"]
    }
    // ... more questions
  ],
  
  "architecture": {
    "recommended": "plugin",
    "patterns": {
      "plugin": {
        "description": "VST3/AU plugin with JUCE",
        "files": ["processor.cpp", "editor.cpp", "parameters.h"],
        "benefits": ["Works in DAWs", "Industry standard", "Mature framework"]
      },
      "webapp": {
        "description": "Web-based with Tone.js",
        "files": ["AudioEngine.js", "Controls.jsx", "Visualizer.jsx"],
        "benefits": ["Cross-platform", "Easy distribution", "No installation"]
      }
    }
  },
  
  "pitfalls": [
    {
      "issue": "Buffer underruns",
      "cause": "Buffer size too small for CPU",
      "solution": "Increase buffer size or optimize processing",
      "prevention": "Profile CPU usage early, adaptive buffering"
    }
  ],
  
  "examples": [
    {
      "name": "Wah-Wah Effect",
      "description": "Classic auto-wah controlled by input envelope",
      "github": "https://github.com/examples/wah-wah",
      "difficulty": "beginner"
    }
  ]
}
```

---

## 🎓 Educational Content Per Template

Each template includes:

### Concept Explanations
- Key concepts for this domain
- Simple analogies
- Visual diagrams
- "Why this matters"

### Common Patterns
- Typical architectures
- Best practices
- Anti-patterns to avoid

### Glossary
- Domain-specific terms
- Plain-English definitions
- Usage examples

---

## 🔄 Decision Tree Structure

Templates define cascading question flows:

```
Audio/DSP Template:

Q1: Real-time? 
    → Yes: Q2a (input: mic/midi/camera)
    → No:  Q2b (input: file type)

Q2a: Input = Mic?
    → Yes: Q3a (buffer size)
    → No:  Q3b (MIDI or camera)

Q3a: Buffer size?
    → Small: WARNING (latency ok, but CPU critical)
    → Large: INFO (stable, slightly more latency)

... continues to Q20
```

Each path generates different recommendations and warnings.

---

## 🚀 Template Usage Flow

### 1. Template Selection
```
? What type of project?
  ❯ Audio/DSP Processing 🎵
    Graphics & Visual Tools 🎨
    3D Rendering & Animation 🎬
    ...
```

### 2. Template-Specific Questions
```
📚 Audio/DSP Processing

? Real-time or offline processing?
  ❯ Real-time (like live effects)
    Offline (renders to file)
    
💡 Real-time means instant response...
```

### 3. Tech Stack Auto-Configuration
```
✓ Setting up JUCE framework
✓ Configuring VST3 build
✓ Adding Web Audio fallback
```

### 4. Architecture Recommendation
```
🏗️ Recommended Architecture:
   VST3 Plugin with JUCE framework
   
   Why? Best for:
   - DAW integration
   - Professional use
   - Industry standard
   
   Alternative: Web-based (easier distribution)
   
? Use recommended? (Y/n)
```

### 5. Roadmap Generation
```
Generated roadmap based on Audio/DSP template:
  Phase 1: Audio I/O + Basic processing
  Phase 2: Effect parameters + UI
  Phase 3: Presets + Polish
```

---

## 📈 Template Metrics

Each template tracks:
- **Usage count**: How often chosen
- **Success rate**: % of projects completed
- **Avg. time to MVP**: Days from start to working prototype
- **Common issues**: What users struggle with
- **User satisfaction**: Feedback ratings

Used to continuously improve templates.

---

## 🤝 Community Templates

### Publishing Templates

Users can create and share templates:

```bash
# Create new template
ggsd template create

# Publish to marketplace
ggsd template publish audio-ml-combo

# Install community template
ggsd template install @username/audio-ml-combo
```

### Template Quality Standards

Templates must include:
- [ ] Complete question flow (min 10 questions)
- [ ] Tech stack recommendations
- [ ] At least 1 architecture pattern
- [ ] 3+ pitfalls documented
- [ ] 2+ example projects
- [ ] Educational content for key concepts
- [ ] Tested with 3+ users

---

## 🎯 Template Development Priorities

### v1.0 (Next 3 months)
1. Audio/DSP ✅ (highest value for unique use cases)
2. Social Media ✅ (most common request)
3. Games (popular with learners)
4. AI/ML (trending, educational)
5. Web Apps (broadest appeal)

### v1.5 (3-6 months)
6. Mobile Apps
7. Desktop Apps
8. Chrome Extensions
9. CLI Tools
10. IoT/Hardware

### v2.0 (6-12 months)
- 20+ core templates
- 50+ community templates
- Template combinations (Audio + AI, Social + Games)
- Custom template generator

---

## 🔧 Template Maintenance

Templates require ongoing updates for:
- New technology versions
- Deprecated dependencies
- Improved best practices
- User feedback integration
- New platform support

**Update Frequency**: Quarterly reviews, urgent fixes as needed

---

## 📚 Template Documentation

Each template has dedicated docs:
- `docs/templates/audio-dsp.md` - Full guide
- `docs/templates/audio-dsp-examples.md` - Example projects
- `docs/templates/audio-dsp-faq.md` - Common questions
- `docs/templates/audio-dsp-glossary.md` - Terms and concepts

---

## 🎓 Learning Path Per Template

Templates can suggest learning progression:

**Audio/DSP Beginner Path**:
1. Simple gain control (understand audio flow)
2. EQ filter (learn frequency domain)
3. Delay effect (grasp buffer management)
4. Reverb (complex processing)
5. Custom synthesizer (full control)

Each project builds on previous concepts.

---

**Templates are the foundation of GGSD's "rapid prototyping" philosophy. They transform "I have an idea" into "I have working code" in hours instead of weeks.**

---

## 🙏 Attribution

Template system inspired by:
- Yeoman generators
- Create React App
- Vue CLI
- Rails scaffolding
- GitHub templates

Enhanced with AI-guided decision trees and educational content.

License: MIT
