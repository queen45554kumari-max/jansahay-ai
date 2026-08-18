import React, { useState } from 'react';
import {
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
  Info
} from 'lucide-react';
import { SAMPLE_APPLICATIONS } from '../data/sampleApplications';
import { ApplicationItem, ApplicationStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MyApplicationsProps {
  onOpenChatWithQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
}

export const MyApplications: React.FC<MyApplicationsProps> = ({
  onOpenChatWithQuery,
  setActiveTab,
}) => {
  const { language } = useLanguage();
  const [applications] = useState<ApplicationItem[]>(SAMPLE_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem>(SAMPLE_APPLICATIONS[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-semibold mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-orange-500" />
            Citizen Application & Lifecycle Tracker
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Public Service Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time scrutiny stages, verify defect notices, and receive instant AI assistance on how to resolve departmental remarks.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('services')}
          className="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 shadow-md shadow-indigo-900/20"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Apply for New Scheme</span>
        </button>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Application Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block px-1">
            Active Filings (3 Sample Applications):
          </span>

          {applications.map((app) => {
            const isSelected = selectedApp.id === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-2xs space-y-3 ${
                  isSelected
                    ? 'bg-white border-indigo-600 ring-2 ring-indigo-900/10 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Ref #{app.applicationNumber}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {app.serviceName}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase shrink-0 ${
                      app.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'defective'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {app.statusLabel}
                  </span>
                </div>

                {/* Progress Mini Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Stage: {app.currentStage}</span>
                    <span className="font-bold text-slate-700">{app.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        app.status === 'approved'
                          ? 'bg-emerald-600'
                          : app.status === 'defective'
                          ? 'bg-rose-600'
                          : 'bg-indigo-900'
                      }`}
                      style={{ width: `${app.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Applied on: {app.appliedDate}</span>
                  <span className="text-indigo-700 font-semibold flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Application Timeline & Resolution (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-md">
                {selectedApp.category}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                {selectedApp.serviceName}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Application ID: {selectedApp.applicationNumber}
              </p>
            </div>

            <a
              href={selectedApp.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <span>Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Defect Remark Notice if defective */}
          {selectedApp.status === 'defective' && selectedApp.remarks && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Defective Status Scrutiny Remark:</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-rose-100">
                "{selectedApp.remarks}"
              </p>
              {selectedApp.actionRequired && (
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-rose-950">
                    Required Action: {selectedApp.actionRequired}
                  </span>
                  <button
                    onClick={() => onOpenChatWithQuery(`My application (${selectedApp.serviceName}) has a defect remark: "${selectedApp.remarks}". How should I fix it and what exact steps should I take?`)}
                    className="bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask AI How to Fix</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Scrutiny Remarks for non-defective */}
          {selectedApp.status !== 'defective' && selectedApp.remarks && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">Department Remark:</span>
              <p>{selectedApp.remarks}</p>
            </div>
          )}

          {/* Stage by Stage Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Verification Progress Timeline
            </h4>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {selectedApp.stages.map((stage, idx) => {
                const isDone = stage.status === 'completed';
                const isCurrent = stage.status === 'current';
                return (
                  <div key={idx} className="flex items-start gap-4 relative">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : isCurrent
                          ? 'bg-indigo-900 text-white ring-4 ring-indigo-100'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </span>

                    <div className="flex-1 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-900">
                          {stage.stage}
                        </h5>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {stage.date}
                        </span>
                      </div>
                      {stage.note && (
                        <p className="text-[11px] text-slate-500 mt-1">
                          {stage.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Follow up Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Need assistance contacting the Nodal Officer?
            </span>
            <button
              onClick={() => onOpenChatWithQuery(`Please help me draft an inquiry regarding application #${selectedApp.applicationNumber} for ${selectedApp.serviceName}`)}
              className="text-xs font-bold text-indigo-900 hover:text-indigo-950 flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Draft Inquiry in Chat</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
