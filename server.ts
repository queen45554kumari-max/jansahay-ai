import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// Standard supported Gemini model constant used across all endpoints
const GEMINI_MODEL = 'gemini-3.6-flash';

// Helper to get initialized GoogleGenAI instance using GEMINI_API_KEY
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Server error classifier for Gemini API calls
function handleGeminiError(error: any, res: Response) {
  console.error('Gemini API Error details (server-only log):', error);
  const errMsg = error?.message || String(error);
  const status = error?.status || error?.statusCode;

  if (errMsg.includes('GEMINI_API_KEY is not configured') || !process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      success: false,
      errorCode: 'CONFIG_ERROR',
      message: 'GEMINI_API_KEY is not configured on the server.',
    });
  }

  if (
    status === 401 ||
    status === 403 ||
    errMsg.includes('API_KEY_INVALID') ||
    errMsg.includes('API key not valid') ||
    errMsg.includes('UNAUTHENTICATED') ||
    errMsg.includes('PERMISSION_DENIED')
  ) {
    return res.status(status === 401 || status === 403 ? status : 401).json({
      success: false,
      errorCode: 'AUTH_ERROR',
      message: 'Gemini authentication failed. Please check the server API key.',
    });
  }

  if (
    status === 429 ||
    errMsg.includes('RESOURCE_EXHAUSTED') ||
    errMsg.includes('quota') ||
    errMsg.includes('rate limit') ||
    errMsg.includes('429')
  ) {
    return res.status(429).json({
      success: false,
      errorCode: 'RATE_LIMIT',
      message: 'Gemini quota or rate limit was reached. Please try again later.',
    });
  }

  if (status === 404 || errMsg.includes('NOT_FOUND') || errMsg.includes('model not found')) {
    return res.status(404).json({
      success: false,
      errorCode: 'MODEL_ERROR',
      message: `Requested Gemini model '${GEMINI_MODEL}' was not found or is unavailable.`,
    });
  }

  if (status === 400 || errMsg.includes('INVALID_ARGUMENT')) {
    return res.status(400).json({
      success: false,
      errorCode: 'BAD_REQUEST',
      message: 'Invalid request sent to Gemini API.',
    });
  }

  return res.status(status && status >= 400 && status < 600 ? status : 500).json({
    success: false,
    errorCode: 'SERVER_ERROR',
    message: 'An unexpected server error occurred while processing the Gemini request.',
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // 1. Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    const isConfigured = Boolean(process.env.GEMINI_API_KEY);
    if (!isConfigured) {
      res.status(503).json({
        status: 'error',
        service: 'JanSahay AI Backend',
        geminiConfigured: false,
        error: 'GEMINI_API_KEY is not configured',
      });
      return;
    }

    res.json({
      status: 'ok',
      service: 'JanSahay AI Backend',
      geminiConfigured: true,
      model: GEMINI_MODEL,
    });
  });

  // 2. Gemini Diagnostic Test Endpoint
  app.get('/api/gemini-test', async (_req: Request, res: Response): Promise<void> => {
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: 'Reply with exactly: JanSahay AI Gemini connection successful.',
      });

      const replyText = response.text?.trim() || 'JanSahay AI Gemini connection successful.';
      res.json({
        success: true,
        model: GEMINI_MODEL,
        reply: replyText,
      });
    } catch (error: any) {
      handleGeminiError(error, res);
    }
  });

  // 3. Multilingual Citizen Chat API Route
  app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, messages, history, language = 'en' } = req.body;

      const ai = getGeminiClient();

      // Consolidate conversation context
      let rawHistory: Array<{ role: string; content: string }> = [];

      if (Array.isArray(messages) && messages.length > 0) {
        rawHistory = messages;
      } else if (Array.isArray(history) && history.length > 0) {
        rawHistory = history.map((item: any) => ({
          role: item.role || (item.sender === 'user' ? 'user' : 'assistant'),
          content: item.content || item.text || '',
        }));
      }

      if (message && typeof message === 'string' && message.trim()) {
        const lastMsg = rawHistory[rawHistory.length - 1];
        if (!lastMsg || lastMsg.content !== message) {
          rawHistory.push({ role: 'user', content: message });
        }
      }

      const conversationHistory = rawHistory
        .map((m) => `${m.role === 'user' ? 'Citizen' : 'JanSahay Assistant'}: ${m.content}`)
        .join('\n');

      const systemInstruction = `You are "JanSahay AI", an expert, empathetic, and knowledgeable Indian Digital Public Infrastructure and Citizen Welfare Assistant.
Your mission is to make government services, welfare schemes, eligibility rules, and documentation requirements simple, clear, and actionable for every Indian citizen.

Tone & Persona:
- Respectful, trustworthy, clear, and encouraging.
- Language: Respond in ${
        language === 'hi'
          ? 'clear, natural Hindi (Devanagari script)'
          : language === 'hinglish'
          ? 'natural conversational Hinglish (Hindi written in Roman English script)'
          : 'clear, concise English'
      }.
- Avoid bureaucratic jargon; when administrative terms (like Domicile, Non-Creamy Layer, OTR, NPCI Seeding, Gazetted Officer) appear, explain them in simple terms.
- Always remind citizens to use official government portals (ending in .gov.in or .nic.in) and warn against paying unauthorized agents.
- Never ask for or store passwords, OTPs, or bank PINs.

Format your response clearly using bullet points and bold section headers. Suggest 2-3 helpful follow-up steps.`;

      const promptText = `${systemInstruction}\n\nCitizen Conversation History:\n${
        conversationHistory || message || 'Hello'
      }\n\nPlease provide your helpful guidance:`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }],
          },
        ],
      });

      const outputText =
        response.text ||
        'I am here to assist you with any government scheme, eligibility check, or document question.';

      res.json({
        success: true,
        reply: outputText,
        text: outputText,
      });
    } catch (error: any) {
      handleGeminiError(error, res);
    }
  });

  // 4. AI Eligibility Checker API Route
  app.post('/api/eligibility', async (req: Request, res: Response): Promise<void> => {
    try {
      const { profile, language = 'en' } = req.body;

      const ai = getGeminiClient();

      const prompt = `You are the JanSahay AI Citizen Eligibility Evaluator.
Analyze this citizen profile for Indian Central and State government welfare schemes:
- State of Residence: ${profile?.state || 'All India'}
- Age Bracket: ${profile?.ageGroup || 'General'}
- Occupation/Profession: ${profile?.occupation || 'General'}
- Annual Household Income: ${profile?.incomeLevel || 'Below 2.5 Lakhs'}
- Gender: ${profile?.gender || 'All'}
- Social Category: ${profile?.category || 'General'}
- Primary Need/Goal: ${profile?.primaryNeed || 'Welfare'}

Language required: ${language === 'hi' ? 'Hindi' : language === 'hinglish' ? 'Hinglish' : 'English'}

CRITICAL GUIDANCE RULES:
1. Provide preliminary advisory guidance only based on public scheme norms.
2. NEVER say "You qualify." Instead use wording like: "You may be eligible based on the information provided."
3. Always include this explicit statement in the summary: "Final eligibility must be verified through the official government authority."
4. Do NOT invent government schemes, benefits, deadlines, or eligibility rules. Rely only on authentic Indian public schemes (e.g. NSP Scholarships, PM-Kisan, Ayushman Bharat PM-JAY, PM SVANidhi, PMMY Mudra, NFSA Ration).

Provide a JSON object strictly matching this schema:
{
  "matchScore": number (0-100),
  "overallSummary": string,
  "qualifiedSchemes": [
    {
      "schemeName": string,
      "category": string,
      "whyEligible": string,
      "estimatedBenefit": string,
      "keyConditions": [string],
      "officialUrl": string
    }
  ],
  "potentialSchemes": [
    {
      "schemeName": string,
      "missingRequirement": string,
      "howToFulfill": string
    }
  ],
  "criticalDocumentsNeeded": [string],
  "precautions": [string]
}`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
        },
      });

      const jsonText = response.text || '{}';
      res.json(JSON.parse(jsonText));
    } catch (error: any) {
      handleGeminiError(error, res);
    }
  });

  // 5. Document Analysis & Jargon Decoder API Route (Supports Multimodal PDF & Images)
  app.post('/api/document-analyze', async (req: Request, res: Response): Promise<void> => {
    try {
      const { text, fileData, mimeType, fileName, category, language = 'en' } = req.body;

      const ai = getGeminiClient();

      const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
        'text/plain',
      ];

      // Multimodal parts container
      const parts: any[] = [];

      // Validate and process uploaded document if provided
      if (fileData) {
        if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
          res.status(400).json({
            success: false,
            errorCode: 'BAD_REQUEST',
            message: 'Unsupported document format. Allowed formats: PDF, JPG, JPEG, PNG.',
          });
          return;
        }

        // Limit raw base64 size (7MB base64 corresponds to ~5MB file)
        if (typeof fileData === 'string' && fileData.length > 7 * 1024 * 1024) {
          res.status(400).json({
            success: false,
            errorCode: 'BAD_REQUEST',
            message: 'Document file size exceeds the 5MB limit.',
          });
          return;
        }

        // Clean base64 string if it contains data URI prefix
        const base64Clean = fileData.includes(';base64,')
          ? fileData.split(';base64,')[1]
          : fileData;

        parts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Clean,
          },
        });
      }

      const instructions = `You are an expert citizen document simplifier for Indian administrative, revenue, and welfare documents.
Document Category: ${category || 'General'}
${fileName ? `Document Name: ${fileName}` : ''}
${text ? `Document Text Content:\n"""\n${text}\n"""` : ''}

Target Language: ${language === 'hi' ? 'Hindi' : language === 'hinglish' ? 'Hinglish' : 'English'}

Task:
1. Decode complex administrative jargon (e.g., Non-Creamy Layer, Gazetted Officer, Competent Revenue Authority, NPCI Mapping, Domicile, Self-Attestation).
2. Extract important validity dates, deadlines, and financial year cycles.
3. List mandatory supporting documents and step-by-step citizen action checklist.
4. Highlight common mistakes/pitfalls leading to rejection.

Provide a structured JSON output with this schema:
{
  "documentType": string,
  "issuingAuthority": string,
  "plainLanguageSummary": string,
  "simplifiedJargon": [
    {
      "term": string,
      "meaning": string,
      "citizenImpact": string
    }
  ],
  "importantDates": [
    {
      "label": string,
      "dateOrPeriod": string
    }
  ],
  "requiredDocuments": [string],
  "actionChecklist": [string],
  "commonPitfalls": [string]
}`;

      parts.push({ text: instructions });

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ role: 'user', parts }],
        config: {
          responseMimeType: 'application/json',
        },
      });

      const jsonText = response.text || '{}';
      res.json(JSON.parse(jsonText));
    } catch (error: any) {
      handleGeminiError(error, res);
    }
  });

  // 6. Grievance Analysis API Route
  app.post('/api/grievance', async (req: Request, res: Response): Promise<void> => {
    try {
      const desc = req.body.description || req.body.problemDescription;
      const { category, language = 'en' } = req.body;

      if (!desc || !desc.trim()) {
        res.status(400).json({
          success: false,
          errorCode: 'BAD_REQUEST',
          message: 'Please provide a description of the grievance.',
        });
        return;
      }

      const ai = getGeminiClient();

      const prompt = `A citizen is facing a problem/delay/rejection with an Indian government service:
Category: ${category || 'General'}
Citizen's Problem Description:
"""
${desc}
"""

Target Language: ${language === 'hi' ? 'Hindi' : language === 'hinglish' ? 'Hinglish' : 'English'}

Analyze the situation and return a JSON object with this schema:
{
  "issueCategory": string,
  "severityLevel": "High" | "Medium" | "Low",
  "probableReason": string,
  "recommendedSteps": [string],
  "officialPortals": [
    {
      "name": string,
      "type": string,
      "description": string,
      "url": string
    }
  ],
  "documentsToCheck": [string],
  "disclaimer": string
}`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
        },
      });

      const jsonText = response.text || '{}';
      res.json(JSON.parse(jsonText));
    } catch (error: any) {
      handleGeminiError(error, res);
    }
  });

  // Vite middleware for development or static file serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JanSahay AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
