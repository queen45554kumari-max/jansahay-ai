import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'JanSahay AI',
    tagline: 'Government Services, Made Simple for Every Citizen',
    heroTitle: 'Access Government Services with Confidence',
    heroSubtitle: 'Discover relevant public welfare schemes, decode circulars, evaluate eligibility, and get step-by-step guidance.',
    searchPlaceholder: 'Search for a service (e.g. Scholarship, PM-Kisan, Ration Card)...',
    searchButton: 'Search',
    askAi: 'Ask JanSahay AI',
    documentAssistant: 'Document Assistant',
    eligibilityChecker: 'Eligibility Checker',
    featuredServices: 'Featured Welfare Services',
    applicationStatus: 'Application Tracker',
    viewAll: 'View All',
    checkEligibility: 'Check Your Match',
    simplifyDocs: 'Simplify Documents',
    uploadDoc: 'Upload Document / Paste Text',
    startAssessment: 'Start Assessment',
    activeStatus: 'Active',
    openStatus: 'Open',
    verifiedStatus: 'Verified',
  },
  hi: {
    appName: 'जनसहाय AI',
    tagline: 'सरकारी योजनाएं और सेवाएं, हर नागरिक के लिए आसान',
    heroTitle: 'सरकारी सेवाओं और योजनाओं का लाभ आसानी से पाएं',
    heroSubtitle: 'सही कल्याणकारी योजनाओं की खोज करें, पात्रता जांचें और आसान हिंदी में मार्गदर्शन पाएं।',
    searchPlaceholder: 'योजना या सेवा खोजें (जैसे छात्रवृत्ति, पीएम-किसान, राशन कार्ड)...',
    searchButton: 'खोजें',
    askAi: 'जनसहाय AI से पूछें',
    documentAssistant: 'दस्तावेज़ सहायक',
    eligibilityChecker: 'पात्रता जांच',
    featuredServices: 'प्रमुख सरकारी योजनाएं',
    applicationStatus: 'आवेदन स्थिति ट्रैकर',
    viewAll: 'सभी देखें',
    checkEligibility: 'अपनी पात्रता जांचें',
    simplifyDocs: 'कठिन कागजात समझें',
    uploadDoc: 'दस्तावेज़ अपलोड करें / टेक्स्ट डालें',
    startAssessment: 'जांच शुरू करें',
    activeStatus: 'सक्रिय',
    openStatus: 'खुला है',
    verifiedStatus: 'सत्यापित',
  },
  hinglish: {
    appName: 'JanSahay AI',
    tagline: 'Sarkari Schemes aur Services, Har Citizen ke liye Simple',
    heroTitle: 'Sarkari Services aur Schemes ka Benefit Asani se Paayein',
    heroSubtitle: 'Sahi schemes discover karein, documents aur eligibility check karein, aur step-by-step simple guide paayein.',
    searchPlaceholder: 'Search karein (jaise Scholarship, PM-Kisan, Ration Card)...',
    searchButton: 'Search',
    askAi: 'JanSahay AI se Poohein',
    documentAssistant: 'Document Assistant',
    eligibilityChecker: 'Eligibility Checker',
    featuredServices: 'Popular Sarkari Schemes',
    applicationStatus: 'Application Tracker',
    viewAll: 'Sabhi Dekhein',
    checkEligibility: 'Eligibility Check Karein',
    simplifyDocs: 'Govt Notices Simplify Karein',
    uploadDoc: 'Notice Upload ya Paste Karein',
    startAssessment: 'Assessment Start Karein',
    activeStatus: 'Active',
    openStatus: 'Open',
    verifiedStatus: 'Verified',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
