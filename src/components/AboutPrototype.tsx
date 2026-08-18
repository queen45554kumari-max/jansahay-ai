import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Cpu,
  Layers,
  CheckCircle2,
  Award,
  Globe,
  ArrowRight,
  Activity,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { checkServerHealth, runGeminiDiagnosticTest } from '../services/api';

interface AboutPrototypeProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPrototype: React.FC<AboutPrototypeProps> = ({ setActiveTab }) => {
  const [healthStatus, setHealthStatus] = useState<{
    status: string;
    service: string;
    geminiConfigured: boolean;
    model?: string;
  } | null>(null);
  const [testResult, setTestResult] = useState<{
    loading: boolean;
    success?: boolean;
    reply?: string;
    model?: string;
    errorCode?: string;
    message?: string;
  } | null>(null);

  useEffect(() => {
    checkServerHealth().then((res) => setHealthStatus(res));
  }, []);

  const handleRunDiagnostic = async () => {
    setTestResult({ loading: true });
    try {
      const res = await runGeminiDiagnosticTest();
      setTestResult({
        loading: false,
        success: res.success,
        reply: res.reply,
        model: res.model,
        errorCode: res.errorCode,
        message: res.message,
      });
    } catch (e: any) {
      setTestResult({
        loading: false,
        success: false,
        errorCode: 'CLIENT_ERROR',
        message: e.message || 'Diagnostic failed',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Bento Tile */}
      <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-800/40 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold border border-white/15">
          <Award className="w-4 h-4 text-orange-400" />
          <span>Hackathon Submission • Track 1 DPI & Governance</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          JanSahay AI — Citizen Service Assistant
        </h1>

        <p className="text-xs sm:text-sm text-indigo-100 max-w-3xl leading-relaxed">
          "Government Services, Made Simple for Every Citizen." A conversational, multilingual AI intelligence layer built on top of India's Digital Public Infrastructure (DPI) to eliminate bureaucratic friction and empower citizens.
        </p>

        <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
          <span className="bg-white/15 text-white px-3 py-1 rounded-lg font-medium border border-white/10 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Powered by Google {healthStatus?.model ? (healthStatus.model === 'gemini-3.6-flash' ? 'Gemini 3.6 Flash' : healthStatus.model) : 'Gemini 3.6 Flash'}</span>
          </span>
          <span className="bg-white/15 text-white px-3 py-1 rounded-lg font-medium border border-white/10">
            Official @google/genai SDK
          </span>
          <span className="bg-white/15 text-white px-3 py-1 rounded-lg font-medium border border-white/10">
            Full-Stack Node.js & React 19
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg font-medium border border-emerald-500/30">
            DPI Compatible Architecture
          </span>
        </div>
      </div>

      {/* Live System Diagnostics & API Status Bento Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-900" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Live System Status & Gemini Engine Health
            </h3>
          </div>
          <button
            onClick={handleRunDiagnostic}
            disabled={testResult?.loading}
            className="bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${testResult?.loading ? 'animate-spin' : ''}`} />
            <span>{testResult?.loading ? 'Testing Connection...' : 'Run Gemini Connection Test'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500">Backend Server</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{healthStatus?.service || 'JanSahay AI Backend'}</span>
            </div>
            <p className="text-[11px] text-slate-500">Status: {healthStatus?.status || 'Active'}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500">Gemini Key Injection</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className={`w-2 h-2 rounded-full ${healthStatus?.geminiConfigured ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span>{healthStatus?.geminiConfigured ? 'Key Configured (Server)' : 'Not Configured'}</span>
            </div>
            <p className="text-[11px] text-slate-500">Zero client-side leakage</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500">Active Model Engine</span>
            <div className="flex items-center gap-1.5 font-bold text-indigo-950">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>{healthStatus?.model || 'gemini-3.6-flash'}</span>
            </div>
            <p className="text-[11px] text-slate-500">Official @google/genai SDK</p>
          </div>
        </div>

        {testResult && !testResult.loading && (
          <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
            testResult.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-bold">
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>
                {testResult.success
                  ? 'Gemini Diagnostic Test Successful'
                  : `Diagnostic Test Failed: ${testResult.errorCode || 'ERROR'}`}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {testResult.success ? testResult.reply : testResult.message}
            </p>
          </div>
        )}
      </div>

      {/* Bento Grid: 4 Pillars of Innovation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-900 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5 text-indigo-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            1. Multilingual Natural Interaction
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Citizens can query, understand requirements, and receive guidance in Hindi (Devanagari), conversational Hinglish, or English without navigating labyrinthine portal menus.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            2. Jargon Decoder & Circular Simplifier
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Translates complex bureaucratic terms (such as <em>Non-Creamy Layer</em>, <em>NPCI Mapping</em>, <em>Self-Attestation</em>, <em>Khasra Khatauni</em>) into actionable, plain-language instructions.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            3. Zero-Knowledge Privacy Architecture
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Evaluates eligibility and generates checklists strictly using high-level demographic brackets. No passwords, OTPs, or biometric data are ever required or logged.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            4. Proactive Defect Prevention & Redressal
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Over 30% of welfare applications get rejected due to minor preventable defects (e.g., outdated financial year certificates). JanSahay AI flags these before submission.
          </p>
        </div>
      </div>

      {/* Technical Architecture Bento Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <Cpu className="w-5 h-5 text-indigo-900" />
          <span>System Architecture & API Security</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="font-bold text-indigo-950 block">Server-Side AI Proxy</span>
            <p className="text-slate-500">
              API routes (<code>/api/chat</code>, <code>/api/eligibility</code>, <code>/api/document-analyze</code>, <code>/api/grievance</code>) securely proxy all requests via <code>@google/genai</code> without leaking keys.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="font-bold text-indigo-950 block">Multi-Modal Document Understanding</span>
            <p className="text-slate-500">
              Directly decodes PDF and image circulars using Gemini's native multimodal capabilities with strict in-memory privacy.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="font-bold text-indigo-950 block">DPI & Portal Alignment</span>
            <p className="text-slate-500">
              Directly routes citizens to official government portals (National Scholarship Portal, PM-Kisan, Ayushman Bharat, CPGRAMS).
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Build with AI: Code for Communities — 2nd Edition (Track 1)
          </div>
          <button
            onClick={() => setActiveTab('home')}
            className="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
