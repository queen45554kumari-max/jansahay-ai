import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileCheck2,
  Building2,
  CheckCircle2,
  X,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { SCHEMES } from '../data/schemes';
import { Scheme } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FindServicesProps {
  onOpenChatWithQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
  selectedServiceId: string | null;
  onClearSelectedService: () => void;
}

export const FindServices: React.FC<FindServicesProps> = ({
  onOpenChatWithQuery,
  setActiveTab,
  selectedServiceId,
  onClearSelectedService,
}) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalScheme, setActiveModalScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      const found = SCHEMES.find((s) => s.id === selectedServiceId);
      if (found) {
        setActiveModalScheme(found);
      }
    }
  }, [selectedServiceId]);

  const categories = useMemo(() => {
    const set = new Set(SCHEMES.map((s) => s.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredSchemes = useMemo(() => {
    return SCHEMES.filter((scheme) => {
      const matchesCategory =
        selectedCategory === 'All' || scheme.category === selectedCategory;
      const matchesSearch =
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.benefit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCloseModal = () => {
    setActiveModalScheme(null);
    onClearSelectedService();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            Verified Government Welfare Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Government Schemes & Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Explore active central and state welfare initiatives with transparent eligibility conditions, required documents, and official portal application links.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('eligibility')}
          className="bg-indigo-900 hover:bg-indigo-800 active:scale-95 text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-900/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Match by Profile</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scheme name, keyword (scholarship, kisan, health, housing)..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-900 shadow-2xs"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scheme Cards Grid matching Bento design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            onClick={() => setActiveModalScheme(scheme)}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-md p-6 flex flex-col justify-between transition-all cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                  {scheme.icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      scheme.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {scheme.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {scheme.category}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                  {scheme.name}
                </h3>
                {scheme.nameHi && (
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {scheme.nameHi}
                  </p>
                )}
                <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                  {scheme.benefit}
                </p>
              </div>

              {scheme.benefitAmount && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-indigo-950 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-normal">Entitlement:</span>
                  <span>{scheme.benefitAmount}</span>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-900 group-hover:text-indigo-950">
              <span>View Full Guide & Documents</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-700">
            No matching services found for "{searchTerm}"
          </p>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms or ask JanSahay AI directly.
          </p>
          <button
            onClick={() => onOpenChatWithQuery(`Tell me about: ${searchTerm}`)}
            className="bg-indigo-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            Ask JanSahay AI Assistant
          </button>
        </div>
      )}

      {/* Modal Scheme Deep-Dive */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl shrink-0">
                  {activeModalScheme.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {activeModalScheme.category}
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    {activeModalScheme.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {activeModalScheme.ministry}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scheme Benefit */}
            <div className="p-4 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-300">
                Key Citizen Benefit
              </span>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                {activeModalScheme.benefit}
              </p>
            </div>

            {/* Eligibility Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eligibility Criteria</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeModalScheme.eligibilityCriteria.map((item, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>Mandatory Documents</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeModalScheme.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-950 font-medium">
                    ✓ {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* Application Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                How to Apply
              </h4>
              <ol className="space-y-2 text-xs text-slate-700">
                {activeModalScheme.applicationSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  handleCloseModal();
                  onOpenChatWithQuery(`I want to apply for ${activeModalScheme.name}. Please explain the exact steps and document requirements in simple language.`);
                }}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-700" />
                <span>Ask AI About this Scheme</span>
              </button>

              <a
                href={activeModalScheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
