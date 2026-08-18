import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { UserProfile, EligibilityResult } from '../types';
import { checkEligibility, ApiError } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface EligibilityCheckerProps {
  onOpenChatWithQuery: (query: string) => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  onOpenChatWithQuery,
}) => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [errorState, setErrorState] = useState<{ message: string; code?: string } | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    state: 'Uttar Pradesh',
    ageGroup: '18-25 years (Youth / Student)',
    occupation: 'Student (Higher Secondary / College)',
    incomeLevel: 'Below ₹1,50,000 / year (Low Income)',
    gender: 'Male',
    category: 'OBC (Non-Creamy Layer)',
    primaryNeed: 'Education Scholarship & Tuition Fee Support',
  });

  const statesList = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi NCR', 'Gujarat', 'Haryana',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh',
    'West Bengal', 'Other State / UT'
  ];

  const handleRunAssessment = async () => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const data = await checkEligibility(profile, language);
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
    setResult(null);
    setErrorState(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            AI Scheme Matcher
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Citizen Eligibility Evaluator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Answer 6 non-sensitive profile questions to evaluate your potential entitlement under central and state public welfare programs.
          </p>
        </div>

        {(result || errorState) && (
          <button
            onClick={handleReset}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
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
              onClick={handleRunAssessment}
              disabled={isLoading}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Assessment</span>
            </button>
          </div>
        </div>
      )}

      {!result ? (
        /* Assessment Form */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. State of Permanent Residence:
              </label>
              <select
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-indigo-900 outline-none"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Age Group */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Age Bracket:
              </label>
              <select
                value={profile.ageGroup}
                onChange={(e) => setProfile({ ...profile, ageGroup: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-indigo-900 outline-none"
              >
                <option value="Below 18 years (Minor / School Student)">Below 18 years (Minor / School Student)</option>
                <option value="18-25 years (Youth / Student)">18-25 years (Youth / Higher Education)</option>
                <option value="26-40 years (Working Adult / Artisan)">26-40 years (Working Adult / Artisan)</option>
                <option value="41-59 years (Adult / Worker)">41-59 years (Adult / Worker)</option>
                <option value="60-69 years (Senior Citizen)">60-69 years (Senior Citizen)</option>
                <option value="70+ years (Super Senior Citizen)">70+ years (Super Senior Citizen - Ayushman 70+)</option>
              </select>
            </div>

            {/* Occupation */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Occupation / Activity:
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-indigo-900 outline-none"
              >
                <option value="Student (Higher Secondary / College)">Student (Higher Secondary / College / Technical)</option>
                <option value="Farmer / Cultivator (Landholding)">Farmer / Cultivator (Landholding)</option>
                <option value="Agricultural Laborer / Unorganized Worker">Agricultural Laborer / Unorganized Worker</option>
                <option value="Street Vendor / Micro-Enterprise">Street Vendor / Hawkers / Micro-Business</option>
                <option value="Homemaker / Women Self-Help Group">Homemaker / Women SHG Member</option>
                <option value="Unemployed / Jobseeker">Unemployed / Jobseeker</option>
                <option value="Private Sector Employee">Private Sector Employee</option>
              </select>
            </div>

            {/* Income Tier */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                4. Total Annual Household Income:
              </label>
              <select
                value={profile.incomeLevel}
                onChange={(e) => setProfile({ ...profile, incomeLevel: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-indigo-900 outline-none"
              >
                <option value="Below ₹1,00,000 / year (BPL / Antyodaya)">Below ₹1,00,000 / year (BPL / Antyodaya)</option>
                <option value="₹1,00,000 - ₹2,50,000 / year (Low Income)">₹1,00,000 - ₹2,50,000 / year (Low Income / Scholarship eligible)</option>
                <option value="₹2,50,000 - ₹5,00,000 / year (Middle Tier)">₹2,50,000 - ₹5,00,000 / year (Middle Tier)</option>
                <option value="₹5,00,000 - ₹8,00,000 / year (Non-Creamy Layer / EWS)">₹5,00,000 - ₹8,00,000 / year (Non-Creamy Layer / EWS)</option>
                <option value="Above ₹8,00,000 / year (General Tier)">Above ₹8,00,000 / year (General Tier)</option>
              </select>
            </div>

            {/* Social Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                5. Social Reservation Category:
              </label>
              <select
                value={profile.category}
                onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-indigo-900 outline-none"
              >
                <option value="OBC (Non-Creamy Layer)">OBC (Non-Creamy Layer)</option>
                <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>
                <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
                <option value="Economically Weaker Section (EWS)">General - EWS (Income &lt; ₹8 Lakh)</option>
                <option value="General (Unreserved)">General (Unreserved)</option>
                <option value="Minority Community">Minority Community</option>
              </select>
            </div>

            {/* Primary Need */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                6. Primary Need / Objective:
              </label>
              <select
                value={profile.primaryNeed}
                onChange={(e) => setProfile({ ...profile, primaryNeed: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-indigo-900 outline-none"
              >
                <option value="Education Scholarship & Tuition Fee Support">Education Scholarship & Tuition Fee Support</option>
                <option value="Direct Farmer Cash Support (PM-Kisan)">Direct Farmer Cash Support (PM-Kisan)</option>
                <option value="Hospital & Health Coverage (Ayushman Bharat)">Hospital & Health Coverage (Ayushman Bharat)</option>
                <option value="Micro Business / Street Vending Loan">Micro Business / Street Vending Loan</option>
                <option value="Housing & Rural Construction Grant">Housing & Rural Construction Grant</option>
                <option value="Old Age & Retirement Pension">Old Age & Retirement Pension</option>
                <option value="Ration Card & Food Subsidy">Ration Card & Food Subsidy</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>We never ask for or save sensitive credentials, OTPs, or bank account numbers.</span>
            </div>

            <button
              onClick={handleRunAssessment}
              disabled={isLoading}
              className="w-full sm:w-auto bg-indigo-900 hover:bg-indigo-800 active:scale-95 disabled:opacity-50 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Evaluating Eligibility...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>Generate Match Results</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Match Score & Summary Bento Tile */}
          <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Assessment Overview
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Advisory Entitlement Evaluation
                </h2>
                <p className="text-xs sm:text-sm text-indigo-100 mt-2 max-w-2xl leading-relaxed">
                  {result.overallSummary}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl sm:text-4xl font-black text-orange-400">
                  {result.matchScore}%
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 mt-0.5">
                  Match Score
                </span>
              </div>
            </div>
          </div>

          {/* Qualified Schemes Bento Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Potential Schemes for Your Profile</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.qualifiedSchemes?.map((scheme, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                        {scheme.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Potential Match
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {scheme.schemeName}
                    </h4>

                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-semibold text-emerald-950">
                      Estimated Benefit: {scheme.estimatedBenefit}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {scheme.whyEligible}
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        Key Conditions to Fulfill:
                      </span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {scheme.keyConditions?.map((cond, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {scheme.officialUrl && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={scheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-900 hover:text-indigo-950 hover:underline"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => onOpenChatWithQuery(`How do I apply for ${scheme.schemeName}? What are the exact steps?`)}
                        className="text-xs font-bold text-slate-600 hover:text-indigo-950 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Walkthrough in Chat</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Critical Documents & Precautions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Required Documents */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Critical Documents to Prepare</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {result.criticalDocumentsNeeded?.map((doc, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precautions */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Rejection-Prevention Warnings</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {result.precautions?.map((warn, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-amber-950 flex items-start gap-2">
                    <span className="text-amber-700 font-bold">!</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
