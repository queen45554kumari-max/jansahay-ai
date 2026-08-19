# JanSahay AI — AI-Powered Citizen Service Assistant

> **"Government Services, Made Simple for Every Citizen."**

🏆 **Hackathon Submission:** Build with AI: Code for Communities — 2nd Edition  
🎯 **Track:** Track 1 — AI for Digital Public Infrastructure & Governance  
⚡ **AI Engine:** Google Gemini 3.6 Flash via official `@google/genai` SDK  

---

## 🌟 Executive Summary

India has built world-leading Digital Public Infrastructure (DPI) including Aadhaar, UPI, DigiLocker, and Direct Benefit Transfer (DBT). However, the average citizen—especially in rural or semi-urban areas—still faces steep hurdles navigating government services:
- **Bureaucratic Jargon:** Circulars and guidelines are filled with complex legal and administrative terms (e.g., *Non-Creamy Layer*, *Domicile*, *Aadhaar Seeding*, *Gazetted Officer*).
- **Fragmented Portals:** Thousands of central and state schemes are scattered across disconnected portals without a unified discovery mechanism.
- **High Application Defect Rates:** Applications get routinely rejected or delayed due to minor document mistakes (e.g., outdated financial year income certificates, unseeded DBT bank accounts).

**JanSahay AI** is a conversational AI access layer that bridges the last-mile gap in citizen governance. It empowers citizens to discover public schemes, evaluate personalized eligibility without compromising sensitive credentials, decode complex official circulars into plain language, and track application workflows with clear guidance.

---

## 🚀 Key Features & Endpoints

1. **Backend Health Check (`GET /api/health`):**
   - Returns service operational status and confirms whether `GEMINI_API_KEY` is configured.
   ```json
   {
     "status": "ok",
     "service": "JanSahay AI Backend",
     "geminiConfigured": true,
     "model": "gemini-3.6-flash"
   }
   ```

2. **Gemini Diagnostic Connection Test (`GET /api/gemini-test`):**
   - Executes a minimal server-side test request to verify API connectivity.
   ```json
   {
     "success": true,
     "model": "gemini-3.6-flash",
     "reply": "JanSahay AI Gemini connection successful."
   }
   ```

3. **Multilingual AI Citizen Assistant (`POST /api/chat`):**
   - Natural conversational interface supporting **English**, **हिंदी (Hindi)**, and **Hinglish**.
   - Answers questions regarding public welfare schemes, document checklists, application timelines, and office procedures.
   - Built-in Speech Synthesis (Read Aloud) and Transcript Export.

4. **AI Eligibility Checker (`POST /api/eligibility`):**
   - Guided 6-question non-sensitive profile assessment (State, Age Bracket, Occupation, Income Tier, Category, Primary Need).
   - Generates structured match scores, justification breakdowns, document requirements, and cautionary checkpoints.
   - Explicit advisory disclaimer: "Final eligibility must be verified through the official government authority."

5. **Document Jargon Decoder & Assistant (`POST /api/document-analyze`):**
   - Upload PDF, JPG, PNG scans (up to 5MB) or paste text of government circulars, SOPs, and application forms.
   - Powered by Gemini multimodal understanding with in-memory zero-retention privacy.
   - Decodes confusing jargon into simple citizen language, extracts deadlines, and builds checklists.

6. **Grievance Redressal Assistant (`POST /api/grievance`):**
   - Analyzes application rejections, defective remarks, and administrative delays.
   - Outlines structured escalation steps and connects citizens to official portals like CPGRAMS and state CM helplines.

7. **Public Service Directory & 7-Step Universal Roadmap:**
   - 11 categories with verified government links (.gov.in / .nic.in).
   - Universal application framework covering guidelines check, self-attestation, Aadhaar OTR, form filing, scan compression, and reference tracking.

---

## 🛡️ Responsible AI & Security Standards

- **Zero Sensitive Credential Retention:** JanSahay AI never prompts for or stores passwords, banking PINs, OTPs, or full Aadhaar numbers.
- **Server-Side API Key Protection:** The `GEMINI_API_KEY` is strictly confined to server-side Express routes and is never exposed to client browsers. No client-side `VITE_` API keys are used.
- **Structured Error Handling:** Server errors (401, 403, 429, 500, 503) return structured error codes (`AUTH_ERROR`, `RATE_LIMIT`, `CONFIG_ERROR`, `SERVER_ERROR`) allowing the UI to display clear messages with Retry options without leaking secrets.
- **Verified Official Sources:** All scheme cards and guidance explicitly route citizens to authentic government domains (`.gov.in` / `.nic.in`).
- **Statutory Disclaimers:** Clear notices state that JanSahay AI provides advisory guidance and does not replace official government portals or statutory bodies.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    JanSahay AI Frontend                     │
│    (React 19 + TypeScript + Vite + Tailwind CSS + Lucide)    │
│  - Multi-language context (EN / HI / Hinglish)              │
│  - Accessible civic UI, High-contrast responsive design     │
│  - Robust error boundary with user-friendly retry states    │
└───────────────────────────────┬─────────────────────────────┘
                                │ JSON API (POST / GET)
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Backend Proxy                    │
│                        (server.ts)                          │
│  - /api/health           - /api/gemini-test                 │
│  - /api/chat             - /api/eligibility                 │
│  - /api/document-analyze - /api/grievance                   │
│  - Strict system prompt & civic safety guardrails           │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 Google GenAI SDK (Node.js)                  │
│                     (@google/genai)                         │
│  - Model: gemini-3.6-flash                                  │
│  - Structured JSON schema outputs (responseMimeType)        │
│  - Multi-modal document understanding (PDF & Images)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express 4, `@google/genai` SDK
- **Build & Dev Tooling:** Vite 6, TSX, ESBuild

---

## 🛠️ Environment Configuration & Running

1. **Configure Environment Variables:**
   Create `.env` using `.env.example`:
   ```env
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000`.

3. **Build and Test for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## ☁️ Google Cloud Run Deployment

JanSahay AI is container and Cloud Run-ready with native dynamic `PORT` routing, `0.0.0.0` binding, and bundled static Vite assets served by the Express backend.

### Quick Deploy to Cloud Run (gcloud CLI):

1. **Build and Deploy with Cloud Build / Cloud Run:**
   ```bash
   gcloud run deploy jansahay-ai \
     --source . \
     --platform managed \
     --region asia-south1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   ```

2. **Cloud Run Runtime Specifications:**
   - **Port Configuration:** Cloud Run dynamically injects `process.env.PORT` (e.g. 8080). `server.ts` automatically binds to `process.env.PORT` and `0.0.0.0`.
   - **Container Start Command:** `npm start` (executes `node dist/server.cjs`).
   - **Production Assets:** Single artifact bundle serving frontend SPA from `dist/` and backend API endpoints from `/api/*`.
   - **Environment Variables:** `GEMINI_API_KEY` is securely stored in Cloud Run environment variables / Secret Manager and never exposed to the client.

---

## 📋 Hackathon Track Alignment

- **Track 1: AI for Digital Public Infrastructure & Governance**
  JanSahay AI demonstrates how generative AI models can act as an empathetic, multilingual interface over complex national and state digital public infrastructure, democratizing access to welfare and governance for 1.4 billion citizens.
