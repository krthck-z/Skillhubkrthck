/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';

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
import { InstitutionDashboardView } from './views/InstitutionDashboardView';
import { StartupDashboardView } from './views/StartupDashboardView';
import { ScholarshipsView } from './views/ScholarshipsView';
import { TechnologyView } from './views/TechnologyView';
import { ProfileView } from './views/ProfileView';
import { MailboxView } from './views/MailboxView';
import { LocalJobsView } from './views/LocalJobsView';
import { PodcastsMeetupsView } from './views/PodcastsMeetupsView';
import { ContactsNetworkView } from './views/ContactsNetworkView';
import { EcosystemMapView } from './views/EcosystemMapView';
import { DiscoverView } from './views/DiscoverView';
import { ProjectHubView } from './views/ProjectHubView';
import { MessagesView } from './views/MessagesView';
import { EcosystemHubView } from './views/EcosystemHubView';
import { FacultyAcademiaView } from './views/FacultyAcademiaView';
import { IndustryHiringView } from './views/IndustryHiringView';
import { IndustryPortal } from './components/portals/IndustryPortal';
import { AcademiaPortal } from './components/portals/AcademiaPortal';
import { Footer } from './components/Footer';

// Modals
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { AskAIModal } from './components/modals/AskAIModal';
import { OfflineBookingModal } from './components/modals/OfflineBookingModal';
import { AssessmentModal } from './components/modals/AssessmentModal';
import { OpportunityDetailModal } from './components/modals/OpportunityDetailModal';
import { TrainForJobModal } from './components/modals/TrainForJobModal';
import { GoogleMapsKeyModal } from './components/maps/GoogleMapsKeyModal';
import { GoogleMapsProvider } from './components/maps/GoogleMapsContext';

// Icons & UI
import { ShieldCheck, Sparkles, Heart, Building2, GraduationCap, Users } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, role, switchPortal, toastMessage, profile, setActiveTab } = useApp();
  const currentRole = role || 'student';

  const renderActiveView = () => {
    // If the active role is industry, deliver the genuine Industry Portal experience
    if (currentRole === 'industry' && !['messages', 'chat', 'mailbox'].includes(activeTab)) {
      return <IndustryPortal />;
    }

    // If the active role is institute/academia, deliver the genuine Academia Portal experience
    if (currentRole === 'institute' && !['messages', 'chat', 'mailbox'].includes(activeTab)) {
      return <AcademiaPortal />;
    }

    switch (activeTab) {
      case 'home':
        if (currentRole === 'startup') return <StartupDashboardView />;
        return <StudentHomeView />;
      case 'discover':
        return <DiscoverView />;
      case 'projects':
      case 'project-hub':
        return <ProjectHubView />;
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
        if (currentRole === 'startup') return <StartupDashboardView />;
        return <StartupsView />;
      case 'industry':
      case 'industry-hiring':
      case 'fast-match':
      case 'companies':
      case 'talent-search':
        return <IndustryPortal />;
      case 'faculty':
      case 'academia':
      case 'naac-reports':
        return <AcademiaPortal />;
      case 'messages':
      case 'chat':
        return <MessagesView />;
      case 'ecosystem':
      case 'ecosystem-hub':
        return <EcosystemHubView />;
      case 'institutions':
        return <InstitutionsView />;
      case 'mentors':
      case 'contacts':
        return <ContactsNetworkView />;
      case 'local-jobs':
        return <LocalJobsView />;
      case 'map':
      case 'ecosystem-map':
        return <EcosystemMapView />;
      case 'podcasts':
        return <PodcastsMeetupsView />;
      case 'scholarships':
        return <ScholarshipsView />;
      case 'technology':
        return <TechnologyView />;
      case 'mailbox':
        return <MailboxView />;
      case 'profile':
      case 'achievements':
      case 'portfolio':
        return <ProfileView />;
      default:
        return <StudentHomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white text-slate-800">
      
      {/* Top Unified Navbar with Brand, Navigation, Search, Tools & Role Switcher */}
      <Navbar />

      {/* Perspective / Role Banner (If switched to Industry, Institution, or Startup) */}
      {currentRole !== 'student' && (
        <div className="bg-indigo-950 text-indigo-100 border-b border-indigo-800/80 py-2.5 text-xs shadow-inner">
          <div className="app-container flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Active Perspective: <strong className="capitalize text-white font-bold">{currentRole === 'institute' ? 'Academia / Institution' : currentRole}</strong> Portal — Isolated workspace with role-specific workflows and analytics.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => switchPortal('student')}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>← Student Portal</span>
              </button>
              {currentRole === 'industry' ? (
                <button
                  onClick={() => switchPortal('institute')}
                  className="px-2.5 py-1 bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 hover:text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer border border-emerald-600/40"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Academia Portal</span>
                </button>
              ) : (
                <button
                  onClick={() => switchPortal('industry')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer border border-slate-700"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Industry Portal</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 app-container pt-6 pb-12">
        {renderActiveView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals */}
      <GlobalSearchModal />
      <AskAIModal />
      <OfflineBookingModal />
      <AssessmentModal />
      <OpportunityDetailModal />
      <TrainForJobModal />
      <GoogleMapsKeyModal />

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
      <GoogleMapsProvider>
        <MainContent />
      </GoogleMapsProvider>
    </AppProvider>
  );
}
