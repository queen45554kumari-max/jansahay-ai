import React, { useState } from 'react';
import {
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Building2,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  FileText,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { GrievanceAnalysisResult } from '../types';
import { analyzeGrievance, ApiError } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface GrievanceAssistantProps {
  onOpenChatWithQuery: (query: string) => void;
}

export const GrievanceAssistant: React.FC<GrievanceAssistantProps> = ({
  onOpenChatWithQuery,
}) => {
  const { language } = useLanguage();
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Scholarship & Education');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GrievanceAnalysisResult | null>(null);
  const [errorState, setErrorState] = useState<{ message: string; code?: string } | null>(null);

  const presetIssues = [
    {
      title: 'Scholarship Application Defective',
      text: 'My scholarship application was marked defective because the officer claims my income certificate is outdated, but it was issued 6 months ago.',
    },
    {
      title: 'PM-Kisan Benefit Delayed / Stopped',
      text: 'My PM-Kisan installment has not arrived for 2 consecutive quarters even though my Aadhaar e-KYC and land seeding are shown active on the portal.',
    },
    {
      title: 'Demand for Physical Office Visits',
      text: 'The revenue department sub-office is asking for in-person physical presence and unlisted stamp papers for an online Domicile Certificate application.',
    },
    {
      title: 'Ayushman Hospital Refusing Cashless Treatment',
      text: 'An empaneled private hospital is asking for advance cash payment and refusing to admit an Ayushman Bharat PM-JAY Golden Card beneficiary.',
    },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!problemDescription.trim()) return;

    setIsLoading(true);
    setResult(null);
    setErrorState(null);

    try {
      const data = await analyzeGrievance(problemDescription, category, language);
      setResult(data);
    } catch (err: any) {
      const msg =
        err instanceof ApiError
          ? err.message
          : err?.message || 'JanSahay AI is temporarily unavailable. Please try again.';
      setErrorState({
        message: msg,
        code: err?.errorCode || (err instanceof ApiError ? err.errorCode : undefined),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProblemDescription('');
    setResult(null);
    setErrorState(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold mb-2">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Citizen Grievance & Escalation Navigator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Grievance Redressal Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Facing delays, defective statuses, or unfair rejections? JanSahay AI analyzes your situation and maps out the correct official escalation steps.
          </p>
        </div>

        {(result || errorState) && (
          <button
            onClick={handleReset}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Grievance Assessment</span>
          </button>
        )}
      </div>

      {errorState && (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 space-y-3">
          <div className="flex items-start gap-3 text-rose-900">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold">JanSahay AI is temporarily unavailable.</h3>
              <p className="text-xs text-rose-700">{errorState.message}</p>
            </div>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Grievance Assessment</span>
            </button>
          </div>
        </div>
      )}

      {!result ? (
        <div className="space-y-6">
          {/* Preset Scenarios Bento Tile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Common Citizen Grievance Scenarios (Click to test):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presetIssues.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setProblemDescription(preset.text)}
                  className="p-4 bg-slate-50 hover:bg-rose-50/60 border border-slate-200 hover:border-rose-300 rounded-2xl text-left transition-all shadow-2xs group cursor-pointer"
                >
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    "{preset.text}"
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Grievance Input Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Service Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-indigo-900 outline-none"
                >
                  <option value="Scholarship & Education">Scholarship & Education</option>
                  <option value="Direct Benefit Transfer & Agriculture">Agriculture & Farmer Welfare (PM-Kisan)</option>
                  <option value="Certificates & Revenue (Income/Caste/Domicile)">Certificates & Revenue (Income/Caste/Domicile)</option>
                  <option value="Health Insurance (Ayushman Bharat)">Healthcare (Ayushman Bharat / PM-JAY)</option>
                  <option value="Social Security Pension">Social Security Pension</option>
                  <option value="Ration Card & Food Security">Ration Card & Food Security</option>
                  <option value="Other Administrative Issue">Other Administrative Issue</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Describe the Issue or Rejection in Your Own Words:
                </label>
                <p className="text-[11px] text-slate-500">
                  Include relevant dates, scrutiny remarks, portal messages, or difficulties faced.
                </p>
                <textarea
                  rows={5}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Explain what happened: e.g., 'I submitted my application on 15th Jan, but today the portal shows status Defective stating that income certificate signature is missing...'"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:bg-white transition-all"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>JanSahay AI guides you on official statutory channels (CPGRAMS, RTI, Helpdesks).</span>
                </div>

                <button
                  type="submit"
                  disabled={!problemDescription.trim() || isLoading}
                  className="w-full sm:w-auto bg-indigo-900 hover:bg-indigo-800 active:scale-95 disabled:opacity-40 text-white px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Analyzing Redressal Path...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      <span>Generate Escalation Guide</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Summary Bento Tile */}
          <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-800/40 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full">
                {result.issueCategory}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
                Severity: {result.severityLevel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Root Cause & Problem Diagnosis
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {result.probableReason}
            </p>
          </div>

          {/* Recommended Step-by-Step Escalation Plan */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              <span>Recommended Action Steps for Citizen</span>
            </div>
            <ol className="space-y-2.5">
              {result.recommendedSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Official Portals for Escalation */}
          {result.officialPortals && result.officialPortals.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Statutory & Official Escalation Portals</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.officialPortals.map((portal, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-emerald-950">
                          {portal.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {portal.type}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                        {portal.description}
                      </p>
                    </div>
                    {portal.url && (
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 hover:underline pt-1"
                      >
                        Open Official Portal <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents to Check & Disclaimer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-slate-700" />
                <span>Documents to Keep Ready</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {result.documentsToCheck.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-700" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 space-y-2 text-xs text-amber-900 flex flex-col justify-center">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Statutory Grievance Redressal Notice</span>
              </div>
              <p className="leading-relaxed">
                {result.disclaimer}
              </p>
            </div>
          </div>

          {/* Follow up in AI Chat */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-indigo-950 font-medium">
              Need help drafting a formal application to the Nodal Officer or grievance letter?
            </div>
            <button
              onClick={() => onOpenChatWithQuery(`Please help me draft a formal letter to the Grievance Officer regarding: ${problemDescription}`)}
              className="bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Draft Grievance Letter in Chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
