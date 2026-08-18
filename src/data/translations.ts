import { Language } from '../types';

export const TRANSLATIONS: Record<Language, {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    services: string;
    chat: string;
    eligibility: string;
    documents: string;
    guide: string;
    myApplications: string;
    grievance: string;
    about: string;
    demoBadge: string;
  };
  hero: {
    title: string;
    subtitle: string;
    askButton: string;
    findButton: string;
    quickSearchPlaceholder: string;
    searchBtn: string;
  };
  featureCards: {
    findServicesTitle: string;
    findServicesDesc: string;
    eligibilityTitle: string;
    eligibilityDesc: string;
    docAssistantTitle: string;
    docAssistantDesc: string;
    guideTitle: string;
    guideDesc: string;
  };
  trustDisclaimer: string;
  trySection: {
    heading: string;
    subheading: string;
    scenario1Title: string;
    scenario1Desc: string;
    scenario1Prompt: string;
    scenario2Title: string;
    scenario2Desc: string;
    scenario2Prompt: string;
    scenario3Title: string;
    scenario3Desc: string;
    scenario3Prompt: string;
  };
  chat: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    clear: string;
    copy: string;
    copied: string;
    readAloud: string;
    stopAudio: string;
    suggestedHeading: string;
    emptyState: string;
    aiTyping: string;
  };
  common: {
    viewDetails: string;
    askAi: string;
    checkEligibility: string;
    applyGuide: string;
    officialPortal: string;
    requiredDocs: string;
    category: string;
    state: string;
    status: string;
    close: string;
    back: string;
    submit: string;
    reset: string;
    loading: string;
    disclaimerLabel: string;
  };
}> = {
  en: {
    appName: 'JanSahay AI',
    tagline: 'Government Services, Made Simple for Every Citizen.',
    nav: {
      home: 'Home',
      services: 'Find Services',
      chat: 'AI Assistant',
      eligibility: 'Check Eligibility',
      documents: 'Document Assistant',
      guide: 'Application Guide',
      myApplications: 'My Applications',
      grievance: 'Grievance Help',
      about: 'About Prototype',
      demoBadge: 'DEMO PROTOTYPE'
    },
    hero: {
      title: 'Access Government Services with Confidence',
      subtitle: 'Discover relevant public services, understand eligibility, prepare documents, and get step-by-step guidance with AI.',
      askButton: 'Ask JanSahay AI',
      findButton: 'Find Government Services',
      quickSearchPlaceholder: 'Search for scholarships, farmer benefits, housing subsidy, or certificates...',
      searchBtn: 'Search Services'
    },
    featureCards: {
      findServicesTitle: 'Find Services',
      findServicesDesc: 'Discover public services and schemes tailored to your specific background.',
      eligibilityTitle: 'Check Eligibility',
      eligibilityDesc: 'Understand whether you qualify before investing time in paperwork.',
      docAssistantTitle: 'Document Assistant',
      docAssistantDesc: 'Upload a complex government notice or form to get a simple, jargon-free explanation.',
      guideTitle: 'Application Guide',
      guideDesc: 'Get a clear 7-step roadmap from eligibility to submission and tracking.'
    },
    trustDisclaimer: 'JanSahay AI provides guidance and preliminary assessment. It does not replace official government portals or authorities.',
    trySection: {
      heading: 'Try JanSahay AI in Action',
      subheading: 'Select a common citizen situation to experience how JanSahay AI simplifies public governance:',
      scenario1Title: 'Student Seeking Financial Aid',
      scenario1Desc: 'Looking for college fee scholarships, eligibility rules, and income certificate guidelines.',
      scenario1Prompt: 'Mujhe government scholarship ke baare mein batao. Main college student hoon aur mujhe financial support chahiye.',
      scenario2Title: 'Government Certificate Guide',
      scenario2Desc: 'Need step-by-step instructions on applying for an Income or Caste certificate.',
      scenario2Prompt: 'Income certificate banwane ke liye kya documents chahiye aur apply karne ka step-by-step process kya hai?',
      scenario3Title: 'Application Marked Defective / Rejected',
      scenario3Desc: 'Guidance on what to do when a government application is delayed, defective, or rejected.',
      scenario3Prompt: 'Mera scholarship application reject ho gaya hai aur defective status dikha raha hai, ab mujhe kya karna chahiye?'
    },
    chat: {
      title: 'Ask JanSahay AI',
      subtitle: 'Conversational Citizen Support in English, हिंदी, and Hinglish',
      placeholder: 'Ask in English, Hindi, or Hinglish (e.g. "Mujhe farmer scheme ke baare mein batao")...',
      send: 'Send',
      clear: 'Clear Chat',
      copy: 'Copy',
      copied: 'Copied!',
      readAloud: 'Read Aloud',
      stopAudio: 'Stop',
      suggestedHeading: 'Common Citizen Questions',
      emptyState: 'How can JanSahay AI assist you with public services today?',
      aiTyping: 'JanSahay AI is researching public service guidelines...'
    },
    common: {
      viewDetails: 'View Details',
      askAi: 'Ask AI About This',
      checkEligibility: 'Check Eligibility',
      applyGuide: 'Application Guide',
      officialPortal: 'Visit Official Portal',
      requiredDocs: 'Required Documents',
      category: 'Category',
      state: 'State / Region',
      status: 'Status',
      close: 'Close',
      back: 'Back',
      submit: 'Submit',
      reset: 'Reset',
      loading: 'Analyzing with Gemini...',
      disclaimerLabel: 'Official Verification Notice'
    }
  },
  hi: {
    appName: 'जनसहाय AI (JanSahay AI)',
    tagline: 'सरकारी योजनाएं और सेवाएं, हर नागरिक के लिए आसान।',
    nav: {
      home: 'होम',
      services: 'सरकारी सेवाएं',
      chat: 'AI सहायक',
      eligibility: 'पात्रता जांचें',
      documents: 'दस्तावेज़ सहायक',
      guide: 'आवेदन गाइड',
      myApplications: 'मेरे आवेदन',
      grievance: 'शिकायत सहायता',
      about: 'प्रोटोटाइप के बारे में',
      demoBadge: 'डेमो प्रोटोटाइप'
    },
    hero: {
      title: 'आत्मविश्वास के साथ सरकारी सेवाओं का लाभ उठाएं',
      subtitle: 'योजनाओं की खोज करें, पात्रता समझें, दस्तावेज़ तैयार करें और AI की मदद से चरण-दर-चरण मार्गदर्शन पाएं।',
      askButton: 'जनसहाय AI से पूछें',
      findButton: 'योजनाएं खोजें',
      quickSearchPlaceholder: 'छात्रवृत्ति, किसान सहायता, आवास योजना या प्रमाण पत्र खोजें...',
      searchBtn: 'खोजें'
    },
    featureCards: {
      findServicesTitle: 'सेवाएं खोजें',
      findServicesDesc: 'अपनी आवश्यकताओं और पृष्ठभूमि के अनुसार सार्वजनिक सेवाएं खोजें।',
      eligibilityTitle: 'पात्रता जांचें',
      eligibilityDesc: 'आवेदन से पहले समझें कि आप पात्र हैं या नहीं।',
      docAssistantTitle: 'दस्तावेज़ सहायक',
      docAssistantDesc: 'सरकारी नोटिस या फॉर्म अपलोड करें और सरल हिंदी में समझें।',
      guideTitle: 'आवेदन गाइड',
      guideDesc: 'आवेदन के 7 चरणों का स्पष्ट और व्यावहारिक रोडमैप पाएं।'
    },
    trustDisclaimer: 'जनसहाय AI केवल मार्गदर्शन प्रदान करता है और आधिकारिक सरकारी पोर्टल या विभाग का स्थान नहीं लेता है।',
    trySection: {
      heading: 'जनसहाय AI का अनुभव करें',
      subheading: 'नागरिकों की इन 3 प्रमुख समस्याओं में से एक चुनें और तुरंत AI समाधान देखें:',
      scenario1Title: 'छात्र वित्तीय सहायता',
      scenario1Desc: 'कॉलेज फीस छात्रवृत्ति, पात्रता और जरूरी कागजात की जानकारी।',
      scenario1Prompt: 'मुझे सरकारी छात्रवृत्ति के बारे में बताएं। मैं कॉलेज का छात्र हूं और मुझे फीस सहायता चाहिए।',
      scenario2Title: 'प्रमाण पत्र आवेदन',
      scenario2Desc: 'आय, जाति या निवास प्रमाण पत्र बनवाने की पूरी प्रक्रिया।',
      scenario2Prompt: 'आय प्रमाण पत्र बनवाने के लिए क्या दस्तावेज चाहिए और ऑनलाइन अप्लाई कैसे करें?',
      scenario3Title: 'आवेदन रद्द / रिजेक्ट होने पर',
      scenario3Desc: 'यदि आपका आवेदन डिफेक्टिव या निरस्त हो गया है तो क्या कदम उठाएं।',
      scenario3Prompt: 'मेरा स्कॉलरशिप फॉर्म रिजेक्ट हो गया है, अब मुझे क्या करना चाहिए?'
    },
    chat: {
      title: 'जनसहाय AI से संवाद करें',
      subtitle: 'हिंदी, English और Hinglish में सरल नागरिक सेवा सहायता',
      placeholder: 'हिंदी या अंग्रेजी में अपना सवाल पूछें (उदा. "मुझे किसान योजना के बारे में बताएं")...',
      send: 'भेजें',
      clear: 'चैट मिटाएं',
      copy: 'कॉपी करें',
      copied: 'कॉपी हो गया!',
      readAloud: 'बोलकर सुनाएं',
      stopAudio: 'रोकें',
      suggestedHeading: 'नागरिकों के प्रमुख सवाल',
      emptyState: 'आज जनसहाय AI आपकी सरकारी सेवाओं में कैसे सहायता कर सकता है?',
      aiTyping: 'जनसहाय AI जानकारी तैयार कर रहा है...'
    },
    common: {
      viewDetails: 'विवरण देखें',
      askAi: 'AI से पूछें',
      checkEligibility: 'पात्रता जांचें',
      applyGuide: 'आवेदन गाइड',
      officialPortal: 'आधिकारिक पोर्टल खोलें',
      requiredDocs: 'आवश्यक दस्तावेज़',
      category: 'श्रेणी',
      state: 'राज्य / क्षेत्र',
      status: 'स्थिति',
      close: 'बंद करें',
      back: 'पीछे जाएं',
      submit: 'जमा करें',
      reset: 'रीसेट करें',
      loading: 'Gemini AI द्वारा विश्लेषण जारी...',
      disclaimerLabel: 'आधिकारिक सत्यापन सूचना'
    }
  },
  hinglish: {
    appName: 'JanSahay AI',
    tagline: 'Government Services, Made Simple for Every Citizen.',
    nav: {
      home: 'Home',
      services: 'Find Schemes',
      chat: 'AI Assistant',
      eligibility: 'Eligibility Check',
      documents: 'Doc Assistant',
      guide: 'Application Guide',
      myApplications: 'My Applications',
      grievance: 'Grievance Help',
      about: 'About Prototype',
      demoBadge: 'DEMO PROTOTYPE'
    },
    hero: {
      title: 'Access Government Services with Full Confidence',
      subtitle: 'Sahi public schemes discover karein, eligibility samjhein, documents ready karein aur step-by-step guidance paayein.',
      askButton: 'JanSahay AI se Poochein',
      findButton: 'Schemes Check Karein',
      quickSearchPlaceholder: 'Scholarships, Kisan yojanas, Housing subsidy ya Certificates search karein...',
      searchBtn: 'Search Services'
    },
    featureCards: {
      findServicesTitle: 'Find Services',
      findServicesDesc: 'Apni background aur need ke according relevant govt schemes explore karein.',
      eligibilityTitle: 'Check Eligibility',
      eligibilityDesc: 'Apply karne se pehle confirm karein ki aap qualify karte hain ya nahi.',
      docAssistantTitle: 'Document Assistant',
      docAssistantDesc: 'Mushkil govt circular ya form upload karein aur simple Hinglish explanation paayein.',
      guideTitle: 'Application Guide',
      guideDesc: 'Eligibility se lekar submission tak clear 7-step process follow karein.'
    },
    trustDisclaimer: 'JanSahay AI ek guidance tool hai aur official government portal ya authority ko replace nahi karta.',
    trySection: {
      heading: 'Try JanSahay AI Live',
      subheading: 'Kisi bhi sample citizen case par click karein aur real-time AI guidance dekhein:',
      scenario1Title: 'Student Scholarship Guidance',
      scenario1Desc: 'College fees ke liye financial assistance aur eligibility rules.',
      scenario1Prompt: 'Mujhe government scholarship ke baare mein batao. Main college student hoon aur mujhe financial support chahiye.',
      scenario2Title: 'Certificate Application Process',
      scenario2Desc: 'Income certificate ke required documents aur step-by-step applying method.',
      scenario2Prompt: 'Income certificate banwane ke liye kya documents chahiye aur apply karne ka step-by-step process kya hai?',
      scenario3Title: 'Application Rejection / Defect Help',
      scenario3Desc: 'Agar portal par status rejected ya defective hai to next action kya lena hai.',
      scenario3Prompt: 'Mera scholarship application reject ho gaya hai aur defective status dikha raha hai, ab mujhe kya karna chahiye?'
    },
    chat: {
      title: 'Ask JanSahay AI',
      subtitle: 'Simple citizen conversation in Hindi, English & Hinglish',
      placeholder: 'Hinglish ya English mein poochein (jaise "Mujhe PM Kisan ke rules samjhao")...',
      send: 'Send',
      clear: 'Clear Chat',
      copy: 'Copy',
      copied: 'Copied!',
      readAloud: 'Read Aloud',
      stopAudio: 'Stop',
      suggestedHeading: 'Popular Questions',
      emptyState: 'Aaj JanSahay AI se aap kya poochna chahte hain?',
      aiTyping: 'JanSahay AI guidance formulate kar raha hai...'
    },
    common: {
      viewDetails: 'View Details',
      askAi: 'Ask AI About This',
      checkEligibility: 'Check Eligibility',
      applyGuide: 'Application Guide',
      officialPortal: 'Open Official Portal',
      requiredDocs: 'Required Documents',
      category: 'Category',
      state: 'State',
      status: 'Status',
      close: 'Close',
      back: 'Back',
      submit: 'Submit',
      reset: 'Reset',
      loading: 'Analyzing with Gemini...',
      disclaimerLabel: 'Official Verification Notice'
    }
  }
};
