import React, { useState } from 'react';
import {
  X,
  Building2,
  ExternalLink,
  MessageSquare,
  FileCheck2,
  Layers,
  FileText,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
  Check,
  Printer
} from 'lucide-react';
import { GovernmentService } from '../types';

interface ServiceModalProps {
  service: GovernmentService | null;
  onClose: () => void;
  onAskAi: (serviceName: string) => void;
  onCheckEligibility: () => void;
  onOpenGuide: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onAskAi,
  onCheckEligibility,
  onOpenGuide,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'steps'>('overview');
  const [copied, setCopied] = useState(false);

  if (!service) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${service.name} - Information on JanSahay AI`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="service-details-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2.5 py-0.5 rounded-full">
                {service.category}
              </span>
              <span className="text-[11px] font-medium text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                {service.state}
              </span>
              <span className="text-[11px] font-medium text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                {service.serviceType}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {service.name}
            </h2>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {service.ministryOrDepartment}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Share service info"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Print details"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'eligibility', label: 'Eligibility' },
            { id: 'documents', label: `Required Documents (${service.documents.length})` },
            { id: 'steps', label: `How to Apply (${service.steps.length} Steps)` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  About This Scheme / Service
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                    Government Fee
                  </span>
                  <p className="text-xs font-bold text-slate-800">{service.applicationFee}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Estimated Processing Time
                  </span>
                  <p className="text-xs font-bold text-slate-800">{service.processingTime}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                    Target Beneficiaries
                  </span>
                  <p className="text-xs font-bold text-slate-800">{service.citizenType.join(', ')}</p>
                </div>
              </div>

              {/* Summary of key highlights */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Criteria Summary
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {service.eligibility.incomeLimit && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <strong>Income Limit:</strong> {service.eligibility.incomeLimit}
                    </li>
                  )}
                  {service.eligibility.residency && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <strong>Residency:</strong> {service.eligibility.residency}
                    </li>
                  )}
                  {service.eligibility.otherRequirements?.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-950 leading-relaxed">
                  <p className="font-semibold">Detailed Eligibility Rules</p>
                  <p className="text-blue-800 mt-0.5">
                    Meeting these preliminary criteria is essential before filing. Use the AI Eligibility tool to cross-reference against your specific profile.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {service.eligibility.ageMin !== undefined && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">Age Requirement:</span>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Between {service.eligibility.ageMin} and {service.eligibility.ageMax || 'No upper limit'} years.
                    </p>
                  </div>
                )}

                {service.eligibility.incomeLimit && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">Annual Income Ceiling:</span>
                    <p className="text-xs text-slate-700 mt-0.5">
                      {service.eligibility.incomeLimit} (Documented by competent Revenue Authority).
                    </p>
                  </div>
                )}

                {service.eligibility.otherRequirements && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-900">Specific Program Conditions:</span>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-slate-700">
                      {service.eligibility.otherRequirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Keep clear, self-attested scanned copies in PDF/JPG format (under 200KB) ready before beginning the application:
              </p>
              <div className="space-y-2">
                {service.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          {doc.name}
                          {doc.isMandatory ? (
                            <span className="text-[10px] text-rose-600 bg-rose-50 border border-rose-200 font-semibold px-1.5 py-0.2 rounded">
                              Mandatory
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 bg-slate-100 font-medium px-1.5 py-0.2 rounded">
                              Optional / If Applicable
                            </span>
                          )}
                        </h5>
                        <p className="text-xs text-slate-600 mt-0.5">{doc.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                {service.steps.map((step) => (
                  <div key={step.stepNumber} className="relative space-y-1">
                    <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-blue-700 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {step.stepNumber}
                    </div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {step.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                    {step.onlineUrl && (
                      <a
                        href={step.onlineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800 font-semibold pt-1"
                      >
                        Visit portal for Step {step.stepNumber} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {service.officialSource ? (
              <a
                href={service.officialSource}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-slate-500 italic">
                State District revenue office application
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAskAi(service.name);
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onCheckEligibility();
              }}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Check Eligibility</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
