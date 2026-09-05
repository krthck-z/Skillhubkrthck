import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck,
  Briefcase,
  Building,
  Rocket,
  UserCheck,
  Mail,
  Compass,
  GitFork,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  MapPin,
  Award,
  FileText,
  Radio,
  Map as MapIcon,
  TrendingUp,
  Users,
  ChevronDown,
  ExternalLink,
  Sparkles,
  FolderGit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NavigationTabs: React.FC = () => {
  const { activeTab, setActiveTab, role, mailMessages } = useApp();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const unreadMail = mailMessages.filter((m) => !m.isRead).length;

  if (role !== 'student') {
    // Focused perspective indicator
    return (
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Active Perspective:
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold uppercase text-[10px]">
                {role}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('home')}
              className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer flex items-center gap-1 text-xs"
            >
              Return to Student View →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine active cluster
  const isDiscoverCluster = ['discover', 'projects', 'project-hub'].includes(activeTab);
  const isLearningCluster = ['learning', 'career-map', 'skills', 'skill-passport'].includes(activeTab);
  const isOpportunityCluster = ['opportunities', 'local-jobs', 'scholarships'].includes(activeTab);
  const isProfileCluster = ['profile', 'portfolio', 'achievements'].includes(activeTab);
  const isEcosystemCluster = ['map', 'ecosystem-map', 'podcasts', 'mentors', 'contacts', 'technology'].includes(activeTab);

  const primaryNavItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard, isActive: activeTab === 'home' },
    { id: 'discover', label: 'Discover', icon: Compass, isActive: isDiscoverCluster, badge: 'Network' },
    { id: 'learning', label: 'Learning', icon: BookOpen, isActive: isLearningCluster, badge: 'Career Map' },
    { id: 'assessments', label: 'Assessments', icon: FileCheck, isActive: activeTab === 'assessments', highlight: true },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase, isActive: isOpportunityCluster, badge: 'Fast Match' },
    { id: 'projects', label: 'Project Hub', icon: FolderGit2, isActive: activeTab === 'projects' || activeTab === 'project-hub' },
    { id: 'industry', label: 'Industries', icon: Building, isActive: activeTab === 'industry' },
    { id: 'institutions', label: 'Institutions', icon: Building, isActive: activeTab === 'institutions', badge: 'Anantapur' },
    { id: 'startups', label: 'Startups', icon: Rocket, isActive: activeTab === 'startups' },
    { id: 'profile', label: 'My Profile', icon: UserCheck, isActive: isProfileCluster },
    { id: 'mailbox', label: 'Mailbox', icon: Mail, isActive: activeTab === 'mailbox', count: unreadMail }
  ];

  const ecosystemItems = [
    { id: 'map', label: 'Ecosystem Google Map', icon: MapIcon, desc: 'Interactive geographic map of colleges, tech parks & centres' },
    { id: 'podcasts', label: 'Podcasts & Meetups', icon: Radio, desc: 'Tech audio series & local offline developer circles' },
    { id: 'mentors', label: 'People & Network', icon: Users, desc: 'Verified industry mentors & alumni connections' },
    { id: 'technology', label: 'Tech Trends & Telemetry', icon: TrendingUp, desc: 'Industry hiring demands & emerging framework tracking' }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Main Module Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMoreOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    item.isActive
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/90'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                        item.isActive ? 'bg-white text-indigo-700' : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  {item.badge && !item.isActive && (
                    <span className="hidden lg:inline-block text-[9px] px-1.5 py-0.2 rounded-sm bg-slate-100 text-slate-500 font-medium">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Ecosystem Explorer Dropdown */}
          <div className="relative ml-2 shrink-0">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isEcosystemCluster || isMoreOpen
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Ecosystem</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                  <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    Extended Ecosystem
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Geospatial maps, network, audio & tech telemetry
                  </p>
                </div>
                {ecosystemItems.map((eco) => {
                  const EcoIcon = eco.icon;
                  const isEcoActive = activeTab === eco.id;
                  return (
                    <button
                      key={eco.id}
                      onClick={() => {
                        setActiveTab(eco.id);
                        setIsMoreOpen(false);
                      }}
                      className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg transition-colors cursor-pointer ${
                        isEcoActive ? 'bg-indigo-50 text-indigo-900 font-medium' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`p-1.5 rounded-md mt-0.5 ${isEcoActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <EcoIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                          {eco.label}
                          {isEcoActive && <span className="text-[9px] px-1 bg-indigo-200 text-indigo-800 rounded">Active</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
                          {eco.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contextual Sub-Navigation Strip for Grouped Modules */}
      {isDiscoverCluster && (
        <div className="bg-indigo-900 text-white py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider pr-2 border-r border-indigo-700 shrink-0">
              Student Network
            </span>
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                activeTab === 'discover' ? 'bg-white text-indigo-900 font-bold' : 'text-indigo-200 hover:bg-indigo-800'
              }`}
            >
              Unified Discover & Search
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                activeTab === 'projects' || activeTab === 'project-hub' ? 'bg-white text-indigo-900 font-bold' : 'text-indigo-200 hover:bg-indigo-800'
              }`}
            >
              <FolderGit2 className="w-3 h-3" />
              Collaborative Project Hub
            </button>
            <button
              onClick={() => setActiveTab('startups')}
              className="px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer text-indigo-200 hover:bg-indigo-800 transition-colors"
            >
              Co-Founder Matching
            </button>
            <button
              onClick={() => setActiveTab('mentors')}
              className="px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer text-indigo-200 hover:bg-indigo-800 transition-colors"
            >
              Verified Mentors
            </button>
          </div>
        </div>
      )}

      {isLearningCluster && (
        <div className="bg-indigo-50/60 border-t border-indigo-100/60 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider pr-2 border-r border-indigo-200 shrink-0">
              Learning Sections
            </span>
            <button
              onClick={() => setActiveTab('learning')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'learning' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-900 hover:bg-indigo-100/80'
              }`}
            >
              Learning Hub
            </button>
            <button
              onClick={() => setActiveTab('career-map')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'career-map' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-900 hover:bg-indigo-100/80'
              }`}
            >
              <GitFork className="w-3 h-3" />
              Career Map & Milestones
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'skills' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-900 hover:bg-indigo-100/80'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              Skill Gaps & Diagnostics
            </button>
            <button
              onClick={() => setActiveTab('skill-passport')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'skill-passport' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-900 hover:bg-indigo-100/80'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              Verified Skill Passport
            </button>
          </div>
        </div>
      )}

      {isOpportunityCluster && (
        <div className="bg-emerald-50/60 border-t border-emerald-100/60 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider pr-2 border-r border-emerald-200 shrink-0">
              Opportunities
            </span>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'opportunities' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-900 hover:bg-emerald-100/80'
              }`}
            >
              Fast Match & Jobs
            </button>
            <button
              onClick={() => setActiveTab('local-jobs')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'local-jobs' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-900 hover:bg-emerald-100/80'
              }`}
            >
              <MapPin className="w-3 h-3" />
              Local Jobs & Gigs (Anantapur)
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'scholarships' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-900 hover:bg-emerald-100/80'
              }`}
            >
              <DollarSign className="w-3 h-3" />
              SkillBridge Scholarships
            </button>
          </div>
        </div>
      )}

      {isProfileCluster && (
        <div className="bg-slate-100 border-t border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider pr-2 border-r border-slate-300 shrink-0">
              My Profile Hub
            </span>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'profile' ? 'bg-slate-900 text-white font-bold' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Profile Overview
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'portfolio' ? 'bg-slate-900 text-white font-bold' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              Projects Showcase
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                activeTab === 'achievements' ? 'bg-slate-900 text-white font-bold' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3 h-3 text-amber-500" />
              ⭐ Achievements
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

