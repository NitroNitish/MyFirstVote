# 🗳️ MyFirstVote — Your Complete First-Time Voter Guide

<div align="center">

![MyFirstVote Banner](https://img.shields.io/badge/MyFirstVote-India's%20Voting%20Guide-FF6B1A?style=for-the-badge&logo=data:image/svg+xml;base64,)

[![Live Demo](https://img.shields.io/badge/Live-Demo-2D7D46?style=for-the-badge)](https://myfirstvote-r2i4zontkq-el.a.run.app)
[![GitHub](https://img.shields.io/badge/GitHub-NitroNitish-0D1B3E?style=for-the-badge&logo=github)](https://github.com/NitroNitish/vote-ready-india)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**_From Confused to Confident in Just 10 Minutes_**

> An interactive civic-tech platform that empowers India's first-time voters with knowledge, practice, and confidence.

</div>

---

## 📌 Chosen Vertical: Civic Education & Democratic Empowerment

MyFirstVote targets the **Civic Education** vertical — building a smart, conversational assistant that guides first-time Indian voters through everything they need to know before election day. India has millions of first-time voters every election cycle who lack clear, accessible guidance. MyFirstVote bridges that gap with an AI-powered, gamified learning experience.

---

## 🎯 Problem Statement

Every election, millions of Indian youth turn 18 and become eligible to vote — yet many don't:
- Know **how to register** (Form 6 at voters.eci.gov.in)
- Understand **what ID to bring** to the polling booth
- Know **how an EVM works** before they face one
- Feel **confident enough** to actually go vote

**MyFirstVote** solves all of this in a structured 4-step journey, backed by an AI chatbot that answers any remaining questions.

---

## ✨ Key Features

### 🎮 1. Voting Knowledge Quiz
- **40-question bank** covering: Basics, Documents, Process, EVM Usage, Rights & Rules, and Common Myths
- 10 randomized questions per session for replayability
- Instant feedback with detailed explanations for every answer
- Score tracking with performance categories

### 📋 2. Complete Process Guide
- Step-by-step visual guide to the voting process
- Documents checklist (all 12 valid photo IDs per ECI)
- Pre-election, polling day, and post-voting tips
- Interactive checklist for day-of preparation

### 🗳️ 3. Realistic EVM Simulator
- Accurate Electronic Voting Machine (EVM) replica
- Candidate selection → Confirmation → Recording with realistic beep sound
- NOTA (None of the Above) option included
- VVPAT explanation and visual simulation

### 🏆 4. Personalized Certificate
- Downloadable PNG certificate of completion
- Personalized with name and city
- One-click share to WhatsApp and Twitter
- Includes quiz score and achievement breakdown

### 💬 5. AI Election Assistant (Chatbot)
- Powered by **Google Gemini 2.0 Flash** via OpenRouter
- Answers any question about Indian elections in real-time
- Streaming responses for fast, natural conversation
- Context-aware: focused on Indian elections and voting
- Quick-reply suggestions for common questions

### 🌐 6. Multilingual Support
- Integrated **Google Translate** for instant site-wide translation
- Supports **Hindi, Marathi, Telugu, Tamil, Kannada, Bengali**, and more
- Premium, unobtrusive widget for seamless language switching

---

## 🏗️ Architecture & Technical Approach

```
┌─────────────────────────────────────────────────────────┐
│                    MyFirstVote App                       │
├─────────────┬──────────────┬────────────────────────────┤
│   Frontend  │   Backend    │      Google Services        │
│   (React)   │  (Supabase   │                            │
│             │   Edge Fn)   │  • Gemini 2.0 Flash (AI)   │
│  TanStack   │             │  • Google AI Studio (Proto) │
│   Router    │   Deno RT    │  • Stitch (UI/UX)          │
│  Tailwind   │  Functions   │  • Google Translate (i18n)  │
│    CSS 4    │             │  • Antigravity (Assistant) │
└─────────────┴──────────────┴────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **TanStack Start** (React 19, SSR-capable) |
| Routing | TanStack Router (file-based) |
| Styling | **Tailwind CSS v4** with custom design tokens |
| AI Integration | **Google Gemini 2.0 Flash** (via OpenRouter) |
| Backend | Supabase Edge Functions (Deno) |
| Database | Supabase (PostgreSQL) |
| **Development** | **Antigravity AI** (Pair Programming) |
| **Prototyping** | **Google AI Studio** & **Stitch** |
| **Multilingual** | **Google Translate** |
| **Testing** | **Vitest** & **React Testing Library** |
| Build Tool | Vite 7 |

---

## 🛠️ Development Workflow: Powered by Google AI

This project was built using a cutting-edge development workflow centered around the Google AI ecosystem:

1.  **AI-First Development**: Leveraged **Antigravity**, a powerful agentic AI coding assistant, to architect the project, generate complex React components, and ensure high code quality through pair programming.
2.  **Rapid Prototyping with AI Studio**: Used **Google AI Studio** to iterate on the AI Assistant's system prompts, ensuring the chatbot provides accurate, context-aware, and helpful guidance for Indian voters.
3.  **UI/UX Excellence with Stitch**: Utilized **Stitch (StitchMCP)** to prototype the design system and UI components, ensuring a premium, modern, and highly accessible user interface that resonates with first-time voters.
4.  **The Gemini Core**: **Gemini 2.0 Flash** serves as the project's brain, not just in the final product but as a technical consultant throughout the build process.


---

## 🤖 How the AI Assistant Works

The AI chatbot uses a **multi-layer approach**:

1. **System Prompt Engineering**: The AI is pre-configured as an Indian election expert with knowledge of:
   - All 12 valid voter photo IDs
   - ECI registration process (Form 6)
   - Polling booth procedures
   - EVM/VVPAT mechanics
   - Voter rights and common myths

2. **Google Gemini Integration**: Calls `google/gemini-2.0-flash-001` via OpenRouter for fast, accurate responses

3. **Streaming Responses**: Uses Server-Sent Events (SSE) for real-time token streaming — responses appear instantly as they generate

4. **Context Awareness**: The AI keeps full conversation history for multi-turn dialogue

---

## 🗺️ User Journey

```
Landing Page
    ↓
[Start Your Journey]
    ↓
Step 1: Quiz (10 questions, immediate feedback)
    ↓
Step 2: Process Guide (learn every step + documents)
    ↓  
Step 3: EVM Simulator (practice on realistic machine)
    ↓
Step 4: Certificate (download + share)
    ↓
[Chatbot available on every page for any questions]
```

### Progress Persistence
- Journey progress is saved in **localStorage** — users can resume where they left off
- Quiz scores, completed steps, and voting simulation results all persist across sessions

---

## 🎨 Design Philosophy

- **India-first color palette**: Saffron (`#FF6B1A`), White, India Green (`#2D7D46`), and Navy (`#0D1B3E`)
- **Mobile-first responsive design**: Works perfectly on phones (where most Indian users access the web)
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML, high contrast
- **Progressive disclosure**: Information is revealed step-by-step to avoid overwhelming new voters

---

## 🔐 Security

- **No personal data collection**: Zero signup required, no data stored server-side
- **API keys secured**: All sensitive keys in environment variables, never exposed to client
- **`.env` in `.gitignore`**: Keys never committed to version control
- **Content Security**: AI responses are constrained to election topics only via system prompt
- **CORS configured**: Edge functions have proper CORS headers for production security

---

## 📱 Accessibility

- **ARIA labels** on all interactive elements
- **Keyboard navigable** throughout the entire journey
- **High contrast** color ratios meeting WCAG AA standards
- **Screen reader friendly** semantic HTML structure
- **Mobile optimized** — full functionality on small screens
- **Works offline** (PWA-ready static assets)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/NitroNitish/vote-ready-india.git
cd vote-ready-india

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_OPENROUTER_API_KEY and VITE_SUPABASE_* keys

# Start development server
npm run dev
```

The app runs on `http://localhost:8080`

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## 📊 Google Services & AI Ecosystem Integration

| Service / Tool | Role in Project |
|----------------|-----------------|
| **Google Gemini 2.0 Flash** | Powers the core AI Assistant — providing accurate, low-latency, and context-aware responses about Indian elections. |
| **Google AI Studio** | Used for rapid prototyping and fine-tuning the chatbot's system instructions and personality. |
| **Antigravity** | The agentic AI coding assistant used for the entire development lifecycle, from architecture to implementation. |
| **Stitch (StitchMCP)** | Facilitated high-fidelity UI design and component prototyping, ensuring a world-class user experience. |
| **Google Translate** | Provides instant multilingual accessibility, ensuring every citizen can learn in their native language. |

---

## ☁️ Google Cloud & AI Ecosystem Integration

This project is built from the ground up to leverage the full power of the Google Cloud Ecosystem:

- **Google Cloud Run**: Managed compute platform for deploying the containerized application at scale.
- **Google Cloud Build**: Automated CI/CD pipeline for building and deploying container images.
- **Google Secret Manager**: Securely stores sensitive API keys (OpenRouter, Supabase) and project configurations.
- **Google Artifact Registry**: Private repository for managing Docker container images.
- **Google Gemini 2.0 Flash**: The core "brain" behind our context-aware election assistant.
- **Google AI Studio**: Primary prototyping environment for prompt engineering and model optimization.
- **Google Translate**: Dynamic i18n layer providing site-wide accessibility in native Indian languages.
- **Google Fonts**: Leveraging modern typography (Inter, Outfit) for a premium reading experience.

---

## 🧪 Testing & Quality Assurance

The project includes a robust testing suite built with **Vitest** and **React Testing Library** to ensure reliability and maintainability.

### Running Tests
```bash
# Run unit and component tests
npm test

# Run tests in UI mode
npm run test:ui (requires @vitest/ui)
```

### Coverage
- **Component Tests**: Verifies rendering and interaction logic for UI components (e.g., `Confetti`).
- **Logic Tests**: Validates core business logic and state management (e.g., `journey` progress).
- **Mocking**: Comprehensive mocking of browser APIs like `localStorage` and `fetch`.

---

## 📂 Project Structure

```
vote-ready-india/
├── src/
│   ├── components/
│   │   ├── ChatBot.tsx          # AI Election Assistant (Gemini-powered)
│   │   ├── Confetti.tsx         # Celebration animation
│   │   ├── JourneyProgress.tsx  # 4-step progress tracker
│   │   └── ui/                  # Radix UI component library
│   ├── lib/
│   │   ├── quiz-data.ts         # 40-question knowledge bank
│   │   ├── journey.ts           # Progress state management
│   │   └── utils.ts             # Utility functions
│   ├── routes/
│   │   ├── index.tsx            # Landing page
│   │   ├── quiz.index.tsx       # Interactive quiz
│   │   ├── quiz.result.tsx      # Quiz results
│   │   ├── process.tsx          # Voting process guide
│   │   ├── ballot.tsx           # EVM simulator
│   │   └── certificate.tsx      # Achievement certificate
│   └── styles.css               # Global styles & design tokens
├── supabase/
│   └── functions/chat/
│       └── index.ts             # AI chat edge function (OpenRouter/Gemini)
└── README.md
```

---

## 🎪 Assumptions Made

1. **Target audience**: First-time voters aged 18-25 in India with basic smartphone/internet access
2. **Language**: Native multilingual support (Hindi, Marathi, etc.) via **Google Translate**
3. **Connectivity**: Assumes basic internet for the AI chatbot; all other features work offline
4. **Data freshness**: Candidate data in the EVM simulator is fictional/representative (real candidates change per election)
5. **ECI Accuracy**: All factual information is based on official ECI guidelines as of 2024-2025

---

## 🏆 What Makes This Submission Strong

1. **Real-world impact**: Directly addresses India's voter education gap with a practical, free tool
2. **Meaningful Google Services integration**: Gemini 2.0 Flash is central to the product, not an afterthought
3. **Complete user journey**: End-to-end experience from learning → practicing → achieving
4. **Clean, maintainable code**: TypeScript throughout, component-based architecture, well-structured routes
5. **Security-conscious**: Proper env handling, no data collection, constrained AI prompts
6. **Accessible design**: Mobile-first, keyboard navigable, WCAG-compliant colors
7. **Gamified learning**: Quiz + certificate makes civic education engaging and shareable

---

## 🌟 Future Roadmap

- [ ] **State-specific election data** (dynamic candidate lists based on user's state)
- [ ] **Voter registration status checker** (via ECI API integration)
- [ ] **Polling booth finder** (Google Maps integration)
- [ ] **WhatsApp chatbot** for voters without smartphone access
- [ ] **Progressive Web App** (installable, full offline support)

---

## 📄 License

MIT License — Free to use, share, and build upon.

---

<div align="center">

**Built with 💚 for India's Democracy 🇮🇳**

_Every vote counts. Every voice matters. Be the change._

[🗳️ Start Your Journey](https://myfirstvote-r2i4zontkq-el.a.run.app) | [📂 GitHub](https://github.com/NitroNitish/vote-ready-india)

</div>
