export type Language = 'en' | 'hi' | 'hinglish';

export interface Scheme {
  id: string;
  name: string;
  nameHi?: string;
  category: string;
  ministry: string;
  benefit: string;
  benefitAmount?: string;
  targetAudience: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  officialUrl: string;
  status: 'Active' | 'Open' | 'Verified' | 'Closing Soon';
  tags: string[];
  icon: string;
  processingTime?: string;
  applicationFee?: string;
}

export type GovernmentService = Scheme;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  matchedSchemes?: Scheme[];
}

export interface UserProfile {
  state: string;
  ageGroup: string;
  occupation: string;
  incomeLevel: string;
  gender: string;
  category: string; // General, OBC, SC, ST, EWS
  primaryNeed: string;
}

export interface EligibilityResult {
  matchScore: number;
  overallSummary: string;
  qualifiedSchemes: {
    schemeName: string;
    category: string;
    whyEligible: string;
    estimatedBenefit: string;
    keyConditions: string[];
    officialUrl?: string;
  }[];
  potentialSchemes: {
    schemeName: string;
    missingRequirement: string;
    howToFulfill: string;
  }[];
  criticalDocumentsNeeded: string[];
  precautions: string[];
}

export interface DocumentAnalysisResult {
  documentType: string;
  issuingAuthority: string;
  plainLanguageSummary: string;
  simplifiedJargon: {
    term: string;
    meaning: string;
    citizenImpact: string;
  }[];
  importantDates: {
    label: string;
    dateOrPeriod: string;
  }[];
  requiredDocuments: string[];
  actionChecklist: string[];
  commonPitfalls: string[];
}

export interface GrievanceAnalysisResult {
  issueCategory: string;
  severityLevel: 'High' | 'Medium' | 'Low';
  probableReason: string;
  recommendedSteps: string[];
  officialPortals: {
    name: string;
    type: string;
    description: string;
    url?: string;
  }[];
  documentsToCheck: string[];
  disclaimer: string;
}

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
  checkpoints: string[];
  proTip: string;
}

export type ApplicationStatus = 'submitted' | 'scrutiny' | 'defective' | 'approved' | 'rejected';

export interface ApplicationItem {
  id: string;
  serviceName: string;
  category: string;
  appliedDate: string;
  applicationNumber: string;
  status: ApplicationStatus;
  statusLabel: string;
  lastUpdated: string;
  currentStage: string;
  progressPercent: number;
  remarks?: string;
  portalUrl: string;
  stages: {
    stage: string;
    date: string;
    status: 'completed' | 'current' | 'pending';
    note?: string;
  }[];
  actionRequired?: string;
}

export interface SampleDocumentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
}
