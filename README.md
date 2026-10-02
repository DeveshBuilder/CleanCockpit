# CleanCockpit - DGCA AI Ground School Assistant ✈️🇮🇳

An interactive, modern web application designed for Indian aspiring pilots studying for the **Directorate General of Civil Aviation (DGCA)** examinations (CPL / ATPL / PPL).

## 🚀 Key Features

- **Input & Ingestion Module**:
  - Drag-and-drop file ingestion (PDFs, DOCX, Images)
  - Web Speech API voice-to-text transcription with Indian aviation phraseology
  - Manual raw notes input and preloaded DGCA syllabus presets (Air Regulations, Aviation Meteorology, Air Navigation, Technical General, RTR-A)
- **AI Customization Control Panel**:
  - 3 Cognitive Complexity Levels: *ELI5*, *12th-Grade Physics*, *Senior DGCA Flight Instructor*
  - 3 Output Formats: *Detailed Paragraphs*, *Numbered Lists*, *Bullet Points*
  - Visual Architecture Switcher: *Flowcharts*, *Mind-Maps*, *Process Diagrams*
  - Mock Exam Settings: Customizable question volume (3 to 15 questions) and exam levels (CPL, ATPL, PPL)
- **Official Grounding**:
  - Grounded in Aircraft Rules 1937, DGCA Civil Aviation Requirements (CARs Section 2, 7 & 8), and AIP India
- **Output & Flight Briefing Dossier**:
  - Full-length, unabbreviated study dossiers
  - Interactive Mermaid.js diagram viewer with pan and zoom controls
  - Real-time interactive DGCA Mock Exam with immediate feedback and flight instructor explanations
  - Printable / Downloadable PDF Dossier export

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS & Vanilla CSS (Cockpit HUD Dark Glassmorphism)
- **Icons**: Lucide-React
- **Diagrams**: Mermaid.js
- **Audio**: Web Audio API Cockpit sound design & Speech Synthesis

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build
```
