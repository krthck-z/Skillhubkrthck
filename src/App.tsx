/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';

// Views
import { StudentHomeView } from './views/StudentHomeView';
import { CareerMapView } from './views/CareerMapView';
import { SkillsGapView } from './views/SkillsGapView';
import { SkillPassportView } from './views/SkillPassportView';
import { LearningView } from './views/LearningView';
import { AssessmentsView } from './views/AssessmentsView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { StartupsView } from './views/StartupsView';
import { IndustryView } from './views/IndustryView';
import { InstitutionsView } from './views/InstitutionsView';
import { ScholarshipsView } from './views/ScholarshipsView';
import { TechnologyView } from './views/TechnologyView';
import { ProfileView } from './views/ProfileView';

// Modals
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { AskAIModal } from './components/modals/AskAIModal';
import { OfflineBookingModal } from './components/modals/OfflineBookingModal';
import { AssessmentModal } from './components/modals/AssessmentModal';
import { OpportunityDetailModal } from './components/modals/OpportunityDetailModal';
import { TrainForJobModal } from './components/modals/TrainForJobModal';

// Icons & UI
import { ShieldCheck, Sparkles, Heart, Building2, GraduationCap, Users } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, role, toastMessage, profile, setActiveTab } = useApp();
  const currentRole = role || 'STUDENT';

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <StudentHomeView />;
      case 'career-map':
        return <CareerMapView />;
      case 'skills':
        return <SkillsGapView />;
      case 'skill-passport':
        return <SkillPassportView />;
      case 'learning':
        return <LearningView />;
      case 'assessments':
        return <AssessmentsView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'startups':
        return <StartupsView />;
      case 'industry':
        return <IndustryView />;
      case 'institutions':
        return <InstitutionsView />;
      case 'scholarships':
        return <ScholarshipsView />;
      case 'technology':
        return <TechnologyView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <StudentHomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white text-slate-800">
      
      {/* Top Navbar with Role Switcher & System Indicators */}
      <Navbar />

      {/* Primary Navigation Pill Tabs */}
      <NavigationTabs />

      {/* Perspective / Role Banner (If switched to Industry, Institution, or Startup) */}
      {currentRole !== 'student' && (
        <div className="bg-indigo-950 text-indigo-100 border-b border-indigo-800 px-4 py-2.5 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>
                Simulating perspective as <strong className="capitalize">{currentRole}</strong>: You can inspect verified candidate portfolios, audit institution benchmarks, and review active talent feeds.
              </span>
            </div>
            <button
              onClick={() => {
                if (currentRole === 'industry') setActiveTab('industry');
                else if (currentRole === 'institute') setActiveTab('institutions');
                else if (currentRole === 'startup') setActiveTab('startups');
                else setActiveTab('home');
              }}
              className="text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer"
            >
              Jump to {(currentRole || '').replace(/_/g, ' ')} view →
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
              SB
            </div>
            <span className="font-extrabold text-slate-800 tracking-tight">
              SKILLBRIDGE AI
            </span>
            <span>• Evidence-Driven Ecosystem</span>
          </div>

          <p className="text-center sm:text-right text-[11px] text-slate-400">
            Bridging students, higher education, local industry, and startups through authenticated capability.
          </p>
        </div>
      </footer>

      {/* Global Modals */}
      <GlobalSearchModal />
      <AskAIModal />
      <OfflineBookingModal />
      <AssessmentModal />
      <OpportunityDetailModal />
      <TrainForJobModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 text-xs font-semibold flex items-center gap-2.5 max-w-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
