import {
  UserProfile,
  EligibilityResult,
  DocumentAnalysisResult,
  GrievanceAnalysisResult,
  Language,
} from '../types';

export class ApiError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, statusCode: number = 500, errorCode: string = 'SERVER_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

// Health check call
export async function checkServerHealth(): Promise<{
  status: string;
  service: string;
  geminiConfigured: boolean;
  model?: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    return data;
  } catch (e: any) {
    return {
      status: 'error',
      service: 'JanSahay AI Backend',
      geminiConfigured: false,
      error: e.message || 'Cannot reach backend server',
    };
  }
}

// Minimal diagnostic connection test
export async function runGeminiDiagnosticTest(): Promise<{
  success: boolean;
  model?: string;
  reply?: string;
  errorCode?: string;
  message?: string;
}> {
  try {
    const res = await fetch('/api/gemini-test');
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        errorCode: data.errorCode || 'SERVER_ERROR',
        message: data.message || `Diagnostic request failed with status ${res.status}`,
      };
    }
    return data;
  } catch (e: any) {
    return {
      success: false,
      errorCode: 'NETWORK_ERROR',
      message: e.message || 'Network connection failed while running diagnostic test',
    };
  }
}

// 1. Chat Assistant
export async function askAssistant(
  messages: { role: string; content: string }[],
  language: Language
): Promise<{ text: string; reply: string; success: boolean }> {
  let response: Response;
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language }),
    });
  } catch (err: any) {
    throw new ApiError(
      'Network connection failed. Unable to reach JanSahay AI server.',
      0,
      'NETWORK_ERROR'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg =
      data.message ||
      data.error ||
      `Server returned error status ${response.status}. Please verify server configuration.`;
    throw new ApiError(msg, response.status, data.errorCode || 'SERVER_ERROR');
  }

  const output = data.reply || data.text || '';
  return {
    success: true,
    text: output,
    reply: output,
  };
}

// 2. Eligibility Evaluation
export async function checkEligibility(
  profile: UserProfile,
  language: Language
): Promise<EligibilityResult> {
  let response: Response;
  try {
    response = await fetch('/api/eligibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, language }),
    });
  } catch (err: any) {
    throw new ApiError(
      'Network connection failed while contacting the eligibility evaluation engine.',
      0,
      'NETWORK_ERROR'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg =
      data.message ||
      data.error ||
      `Eligibility evaluation failed (HTTP ${response.status}).`;
    throw new ApiError(msg, response.status, data.errorCode || 'SERVER_ERROR');
  }

  return data;
}

// 3. Document Analysis & Jargon Decoder
export interface AnalyzeDocumentParams {
  text?: string;
  fileData?: string;
  mimeType?: string;
  fileName?: string;
  category?: string;
  language: Language;
}

export async function analyzeDocument(
  params: AnalyzeDocumentParams
): Promise<DocumentAnalysisResult> {
  let response: Response;
  try {
    response = await fetch('/api/document-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  } catch (err: any) {
    throw new ApiError(
      'Network connection failed while uploading and analyzing document.',
      0,
      'NETWORK_ERROR'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg =
      data.message ||
      data.error ||
      `Document analysis failed (HTTP ${response.status}).`;
    throw new ApiError(msg, response.status, data.errorCode || 'SERVER_ERROR');
  }

  return data;
}

// 4. Grievance Redressal Assistant
export async function analyzeGrievance(
  description: string,
  category: string,
  language: Language
): Promise<GrievanceAnalysisResult> {
  let response: Response;
  try {
    response = await fetch('/api/grievance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, category, language }),
    });
  } catch (err: any) {
    throw new ApiError(
      'Network connection failed while analyzing grievance.',
      0,
      'NETWORK_ERROR'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg =
      data.message ||
      data.error ||
      `Grievance analysis failed (HTTP ${response.status}).`;
    throw new ApiError(msg, response.status, data.errorCode || 'SERVER_ERROR');
  }

  return data;
}
