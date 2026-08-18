/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingDashboard } from './components/LandingDashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { FindServices } from './components/FindServices';
import { EligibilityChecker } from './components/EligibilityChecker';
import { DocumentAssistant } from './components/DocumentAssistant';
import { ApplicationGuide } from './components/ApplicationGuide';
import { MyApplications } from './components/MyApplications';
import { GrievanceAssistant } from './components/GrievanceAssistant';
import { AboutPrototype } from './components/AboutPrototype';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [initialChatQuery, setInitialChatQuery] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const handleOpenChatWithQuery = (query: string) => {
    setInitialChatQuery(query);
    setActiveTab('chat');
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab('services');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-900 selection:text-white">
        {/* Header Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenChatWithQuery={handleOpenChatWithQuery}
        />

        {/* Main View Area */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <LandingDashboard
              setActiveTab={setActiveTab}
              onOpenChatWithQuery={handleOpenChatWithQuery}
              onSelectService={handleSelectService}
            />
          )}

          {activeTab === 'services' && (
            <FindServices
              onOpenChatWithQuery={handleOpenChatWithQuery}
              setActiveTab={setActiveTab}
              selectedServiceId={selectedServiceId}
              onClearSelectedService={() => setSelectedServiceId(null)}
            />
          )}

          {activeTab === 'chat' && (
            <ChatAssistant
              initialQuery={initialChatQuery}
              onClearInitialQuery={() => setInitialChatQuery('')}
              setActiveTab={setActiveTab}
              onSelectService={handleSelectService}
            />
          )}

          {activeTab === 'eligibility' && (
            <EligibilityChecker onOpenChatWithQuery={handleOpenChatWithQuery} />
          )}

          {activeTab === 'documents' && (
            <DocumentAssistant onOpenChatWithQuery={handleOpenChatWithQuery} />
          )}

          {activeTab === 'guide' && (
            <ApplicationGuide
              onOpenChatWithQuery={handleOpenChatWithQuery}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'my-applications' && (
            <MyApplications
              onOpenChatWithQuery={handleOpenChatWithQuery}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'grievance' && (
            <GrievanceAssistant onOpenChatWithQuery={handleOpenChatWithQuery} />
          )}

          {activeTab === 'about' && (
            <AboutPrototype setActiveTab={setActiveTab} />
          )}
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>
    </LanguageProvider>
  );
}
