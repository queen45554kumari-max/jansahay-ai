import React, { useState, useRef } from 'react';
import {
  FileText,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  MessageSquare,
  AlertCircle,
  X,
  ShieldCheck
} from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { DocumentAnalysisResult, SampleDocumentItem } from '../types';
import { analyzeDocument, ApiError } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface DocumentAssistantProps {
  onOpenChatWithQuery: (query: string) => void;
}

export const DocumentAssistant: React.FC<DocumentAssistantProps> = ({
  onOpenChatWithQuery,
}) => {
  const { language } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<SampleDocumentItem | null>(null);
  const [customText, setCustomText] = useState<string>('');
  const [docCategory, setDocCategory] = useState<string>('Revenue & Eligibility');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysisResult | null>(null);
  const [errorState, setErrorState] = useState<{ message: string; code?: string } | null>(null);

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<{
    file: File;
    base64: string;
    mimeType: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (doc: SampleDocumentItem) => {
    setSelectedDoc(doc);
    setCustomText(doc.content);
    setDocCategory(doc.category);
    setUploadedFile(null);
    setUploadError(null);
    setErrorState(null);
  };

  const handleFileChange = (file: File) => {
    setUploadError(null);
    setErrorState(null);

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds the 5MB limit. Please upload a smaller document.');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Unsupported file format. Please upload a PDF, JPG, or PNG document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setUploadedFile({
        file,
        base64,
        mimeType: file.type || 'application/pdf',
      });
      setSelectedDoc(null);
      if (!customText) {
        setCustomText(`[Uploaded Document: ${file.name}]`);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read document file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!customText.trim() && !uploadedFile) return;
    setIsLoading(true);
    setAnalysis(null);
    setErrorState(null);

    try {
      const res = await analyzeDocument({
        text: customText.trim(),
        fileData: uploadedFile ? uploadedFile.base64 : undefined,
        mimeType: uploadedFile ? uploadedFile.mimeType : undefined,
        fileName: uploadedFile ? uploadedFile.file.name : undefined,
        category: docCategory,
        language,
      });
      setAnalysis(res);
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
    setSelectedDoc(null);
    setCustomText('');
    setUploadedFile(null);
    setUploadError(null);
    setAnalysis(null);
    setErrorState(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5 text-orange-600" />
            Official Jargon Decoder & Document Assistant
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Simplify Bureaucratic Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Decode complex official notifications, income certificate mandates, and gazette circulars into plain citizen terms.
          </p>
        </div>

        {(analysis || errorState) && (
          <button
            onClick={handleReset}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Decode Another Document</span>
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
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Analysis</span>
            </button>
          </div>
        </div>
      )}

      {!analysis ? (
        <div className="space-y-6">
          {/* Preset Sample Documents */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Sample Official Circulars & Notices (Click to Load):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleSelectPreset(doc)}
                  className={`p-4 rounded-2xl text-left border transition-all shadow-2xs group cursor-pointer ${
                    selectedDoc?.id === doc.id
                      ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-900/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {doc.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2 group-hover:text-indigo-950">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {doc.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Document Upload / Text Area Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            {/* Drag & Drop Box */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Upload Document (PDF, JPG, PNG — Max 5MB):
              </label>
              
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
                  uploadedFile
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/jpeg,image/png,image/jpg,image/webp,text/plain"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />

                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">{uploadedFile.file.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {(uploadedFile.file.size / 1024).toFixed(1)} KB • Ready for Gemini Analysis
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="w-8 h-8 text-indigo-900" />
                    <p className="text-xs font-semibold text-slate-700">
                      Click to upload or drag and drop official document scan/PDF
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Supports PDF, PNG, JPG files up to 5MB
                    </p>
                  </div>
                )}
              </div>

              {uploadError && (
                <p className="text-xs text-rose-600 font-medium mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{uploadError}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Or Paste Document Text / Form Excerpt:
              </label>
              <div className="text-[11px] text-slate-500">
                You can paste the entire circular or key instructions.
              </div>
            </div>

            <textarea
              rows={6}
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setSelectedDoc(null);
              }}
              placeholder="Paste notification text, guidelines, defect remarks, or circular clauses here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:bg-white transition-all"
            ></textarea>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-[11px] text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero-Retention Privacy Guarantee:</strong> Citizen documents are processed in-memory for instant simplification and are never permanently stored.
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Gemini extracts simplified meanings, deadlines, and critical document checklists.</span>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={(!customText.trim() && !uploadedFile) || isLoading}
                className="w-full sm:w-auto bg-indigo-900 hover:bg-indigo-800 active:scale-95 disabled:opacity-40 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Decoding Bureaucratic Jargon...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Simplify & Decode Document</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Plain Summary Bento Tile */}
          <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full">
                {analysis.documentType || 'Official Circular'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white px-3 py-1 rounded-full border border-white/10">
                Authority: {analysis.issuingAuthority || 'Competent Authority'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Plain-Language Citizen Summary
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              {analysis.plainLanguageSummary}
            </p>
          </div>

          {/* Jargon Translation Bento Table */}
          {analysis.simplifiedJargon && analysis.simplifiedJargon.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-indigo-700" />
                <span>Decoded Administrative Terms (Jargon vs Meaning)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {analysis.simplifiedJargon.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-indigo-950 block">
                        "{item.term}"
                      </span>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        <strong>Simple Meaning:</strong> {item.meaning}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60 text-[11px] text-orange-800 font-medium">
                      ⚠️ <strong>Citizen Impact:</strong> {item.citizenImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Dates & Action Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Checklist */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Action Checklist for Citizen</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {analysis.actionChecklist?.map((act, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pitfalls to Avoid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Common Pitfalls Leading to Rejection</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {analysis.commonPitfalls?.map((pit, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-amber-950 flex items-start gap-2">
                    <span className="text-amber-700 font-bold">⚠️</span>
                    <span className="leading-relaxed">{pit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Follow up Chat Banner */}
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-indigo-950 font-medium">
              Have questions regarding a specific clause or required affidavit wording?
            </span>
            <button
              onClick={() => onOpenChatWithQuery(`Regarding this document (${analysis.documentType || 'Official Circular'}): How do I prepare the required documents without errors?`)}
              className="bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI in Chat</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
