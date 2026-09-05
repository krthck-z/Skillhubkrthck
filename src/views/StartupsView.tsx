import React, { useState } from 'react';
import {
  Rocket,
  Users,
  Search,
  Filter,
  Sparkles,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  Target,
  Award,
  Layers,
  Heart,
  TrendingUp,
  FileText,
  Send,
  Building2,
  Briefcase,
  ChevronRight,
  X,
  UserCheck,
  Compass,
  DollarSign,
  Cpu,
  BookOpen,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostIdeaModal } from '../components/modals/PostIdeaModal';
import { StartupIdea, StartupOpenRole, CandidateTalentProfile, StartupFundingScheme } from '../types';

export const StartupsView: React.FC = () => {
  const {
    startupIdeas,
    fundingSchemes,
    candidateTalents,
    profile,
    toggleLikeStartup,
    toggleSupportStartup,
    joinStartupTeam,
    applyToStartupRole,
    handleStartupApplicantAction,
    applyStartupFundingScheme,
    inviteTalentToTeam,
    verifyStartupMilestone
  } = useApp();

  // Navigation sub-tab
  const [activeTab, setActiveTab] = useState<'feed' | 'talent' | 'readiness' | 'funding' | 'my-ventures'>('feed');

  // Modal states
  const [isPostIdeaOpen, setIsPostIdeaOpen] = useState(false);
  const [selectedDossierIdea, setSelectedDossierIdea] = useState<StartupIdea | null>(null);
  const [applyingRoleData, setApplyingRoleData] = useState<{ startup: StartupIdea; role: StartupOpenRole } | null>(null);
  const [applicationPitch, setApplicationPitch] = useState('');

  // Feed Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyOpenRoles, setOnlyOpenRoles] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Readiness Tab Selected Startup
  const [selectedReadinessId, setSelectedReadinessId] = useState<string>(startupIdeas[0]?.id || '');

  const categories = ['ALL', 'AI / ML', 'Agritech', 'Healthtech', 'Edtech', 'Fintech', 'SaaS', 'CleanTech'];
  const stages = ['ALL', 'IDEA', 'VALIDATED', 'TEAM_BUILDING', 'PROTOTYPE', 'PILOT', 'FUNDRAISING'];

  // Filtered startups for feed
  const filteredStartups = startupIdeas.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesStage = selectedStage === 'ALL' || item.stage === selectedStage;
    const matchesSearch =
      item.ideaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.founderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.skillsNeeded || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesOpenRoles = !onlyOpenRoles || (item.openRoles || []).some((r) => r.spotsAvailable > 0);
    const matchesVerified = !onlyVerified || item.verificationStatus === 'VERIFIED_BY_INCUBATOR';

    return matchesCat && matchesStage && matchesSearch && matchesOpenRoles && matchesVerified;
  });

  // Calculate stats
  const totalVentures = startupIdeas.length;
  const totalOpenRoles = startupIdeas.reduce(
    (acc, s) => acc + (s.openRoles || []).reduce((rAcc, r) => rAcc + (r.spotsAvailable || 0), 0),
    0
  );
  const totalFundingCount = fundingSchemes.length;
  const myVenturesCount = startupIdeas.filter(
    (s) => s.founderName === profile.name || (s.teamMembers || []).some((m) => m.name === profile.name)
  ).length;

  // Handle Role Application
  const handleRoleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingRoleData) return;
    applyToStartupRole(applyingRoleData.startup.id, applyingRoleData.role.roleTitle, applicationPitch);
    setApplyingRoleData(null);
    setApplicationPitch('');
  };

  const selectedReadinessStartup = startupIdeas.find((s) => s.id === selectedReadinessId) || startupIdeas[0];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-200">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-slate-900">
                    Student Startup & Innovation Hub
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                    Ecosystem v2.0
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  IDEA → VALIDATE → BUILD TEAM → PROTOTYPE → PILOT → FUNDING → GROW
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPostIdeaOpen(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Innovation Idea</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs">
          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
            <span className="text-[11px] text-purple-700 font-semibold block">Active Student Ventures</span>
            <span className="text-lg font-black text-purple-950 mt-0.5 block">{totalVentures} Ventures</span>
          </div>
          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <span className="text-[11px] text-indigo-700 font-semibold block">Open Co-Builder Roles</span>
            <span className="text-lg font-black text-indigo-950 mt-0.5 block">{totalOpenRoles} Openings</span>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <span className="text-[11px] text-emerald-700 font-semibold block">Seed Grants & Schemes</span>
            <span className="text-lg font-black text-emerald-950 mt-0.5 block">{totalFundingCount} Active Programs</span>
          </div>
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
            <span className="text-[11px] text-amber-700 font-semibold block">My Ventures & Teams</span>
            <span className="text-lg font-black text-amber-950 mt-0.5 block">{myVenturesCount} Ventures</span>
          </div>
        </div>
      </div>

      {/* Safety & Trust Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-200">
            <strong className="text-white">Evidence-Driven Startup Network:</strong> Co-builder matching is grounded in verified SkillBridge credentials. Student contact details remain protected until mutual application acceptance.
          </span>
        </div>
        <span className="text-[10px] text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30 shrink-0">
          PROTOTYPE DEMO ENVIRONMENT
        </span>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'feed', label: 'Explore Ventures & Feed', icon: Rocket, badge: totalVentures },
          { id: 'talent', label: 'AI Co-Founder & Talent Matcher', icon: Sparkles, badge: candidateTalents.length },
          { id: 'readiness', label: 'Venture Readiness & Milestones', icon: TrendingUp },
          { id: 'funding', label: 'Seed Grants & Incubation', icon: DollarSign, badge: totalFundingCount },
          { id: 'my-ventures', label: 'My Ventures & Applications', icon: Layers, badge: myVenturesCount }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: VENTURES FEED */}
      {/* ========================================================================= */}
      {activeTab === 'feed' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search ventures, technologies, or skills needed..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-purple-400"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3 text-xs w-full md:w-auto justify-end">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={onlyOpenRoles}
                    onChange={(e) => setOnlyOpenRoles(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Open Roles Only</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Incubator Verified</span>
                </label>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Domain:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === c
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Stage Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Stage:</span>
              {stages.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStage(st)}
                  className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    selectedStage === st
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Ventures Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {filteredStartups.map((item) => {
              const teamList = item.teamMembers || [];
              const isUserJoined = teamList.some((m) => m.name === profile.name);
              const isFounder = item.founderName === profile.name;
              const hasOpenRoles = (item.openRoles || []).some((r) => r.spotsAvailable > 0);
              const readiness = item.readinessScore || 70;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-base text-slate-900">{item.ideaTitle}</h3>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                            {item.category}
                          </span>
                          {item.verificationStatus === 'VERIFIED_BY_INCUBATOR' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Incubator Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              Self-Declared Student Venture
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span>
                            Founder: <strong className="text-slate-800">{item.founderName}</strong>
                          </span>
                          <span>•</span>
                          <span>{item.institution || 'Collegiate Network'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {item.location || 'Remote'} ({item.workMode || 'Hybrid'})
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-[11px] font-bold font-mono border border-indigo-200">
                          {item.stage}
                        </span>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span>Readiness: <strong>{readiness}%</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Problem & Solution */}
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">
                          Problem Addressed:
                        </span>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">{item.problem}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-purple-50/40 border border-purple-100">
                        <span className="font-bold text-purple-900 block text-[10px] uppercase tracking-wider">
                          Proposed Technological Solution:
                        </span>
                        <p className="text-purple-950 mt-0.5 leading-relaxed">{item.solution}</p>
                      </div>
                    </div>

                    {/* Open Roles Pill Section */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-slate-800">
                          Open Co-Builder Roles ({item.openRoles?.length || 0}):
                        </span>
                        <span className="text-[10px] text-slate-500">Recruiting by verified Skill Passport</span>
                      </div>

                      <div className="space-y-1.5">
                        {(item.openRoles || []).map((role) => {
                          const userCanApply = !isUserJoined && role.spotsAvailable > 0;
                          return (
                            <div
                              key={role.id}
                              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2"
                            >
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-xs text-slate-900">{role.roleTitle}</span>
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    ({role.spotsAvailable} spot{role.spotsAvailable > 1 ? 's' : ''} left)
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {(role.skillsRequired || []).map((sk, idx) => (
                                    <span
                                      key={idx}
                                      className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-100 text-purple-700"
                                    >
                                      {sk}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {userCanApply && (
                                <button
                                  onClick={() => setApplyingRoleData({ startup: item, role })}
                                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] rounded-lg shadow-2xs shrink-0 cursor-pointer"
                                >
                                  Apply for Role
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Team Members Roster */}
                    <div className="text-xs pt-1 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-slate-700">
                          Current Active Team ({teamList.length} / {item.teamCountTarget || 4}):
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold">● Active Sprint</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {teamList.map((tm, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[11px]"
                          >
                            <span className="font-bold text-slate-900">{tm.name}</span>
                            <span className="text-slate-500">({tm.role})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Funding & Metadata Footer info */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Funding: <strong className="text-slate-800">{item.fundingNeeded || 'Grant Stage'}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Stack: <strong>{(item.technologyStack || item.skillsNeeded || []).slice(0, 2).join(', ')}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLikeStartup(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                          item.isLiked
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-rose-600' : ''}`} />
                        <span>{item.likesCount || 0}</span>
                      </button>

                      <button
                        onClick={() => setSelectedDossierIdea(item)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Venture Dossier</span>
                      </button>
                    </div>

                    {isFounder ? (
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                        👑 You are Founder
                      </span>
                    ) : isUserJoined ? (
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Joined Co-Builder</span>
                      </div>
                    ) : hasOpenRoles ? (
                      <button
                        onClick={() => {
                          const firstRole = (item.openRoles || [])[0];
                          if (firstRole) setApplyingRoleData({ startup: item, role: firstRole });
                        }}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Join Team</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => joinStartupTeam(item.id, 'Student Collaborator')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Request to Collaborate
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStartups.length === 0 && (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
              <Compass className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No Ventures Matching Your Filter</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your domain category or stage filters, or post your own student venture idea!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedStage('ALL');
                  setSearchQuery('');
                  setOnlyOpenRoles(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: AI CO-FOUNDER & TALENT MATCHER */}
      {/* ========================================================================= */}
      {activeTab === 'talent' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-black">AI Co-Founder & Talent Match Engine</h2>
              </div>
              <p className="text-xs text-purple-200 mt-1 max-w-2xl">
                Find collegiate co-builders with verified lab scores, GitHub project verification, and certified skill outputs. Zero fake resumes.
              </p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/20 text-xs">
              <span className="text-purple-200 block text-[11px]">Matching Criteria:</span>
              <span className="font-bold text-white">Skill Verification + Lab Vivas + Weekly Availability</span>
            </div>
          </div>

          {/* Talent Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {candidateTalents.map((talent) => (
              <div
                key={talent.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={talent.avatar}
                      alt={talent.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900 truncate">{talent.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {talent.matchScore}% MATCH
                        </span>
                      </div>
                      <p className="text-xs text-purple-700 font-bold">{talent.primaryRole}</p>
                      <p className="text-[11px] text-slate-500 truncate">{talent.institution}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{talent.bio}"
                  </p>

                  {/* Verified Skills */}
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 block mb-1">
                      Verified Skill Badges:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {talent.verifiedSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1"
                        >
                          <ShieldCheck className="w-2.5 h-2.5 text-indigo-600" />
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 text-slate-600">
                    <div>
                      <span className="text-slate-400 block">Availability:</span>
                      <strong className="text-slate-800">{talent.availability}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Portfolio Code:</span>
                      <strong className="text-emerald-700">{talent.completedProjects} Verified Projects</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Evidence: <strong>{talent.evidenceLevel.replace('_', ' ')}</strong>
                  </span>
                  <button
                    onClick={() => {
                      const myFirstStartup = startupIdeas.find((s) => s.founderName === profile.name) || startupIdeas[0];
                      if (myFirstStartup) {
                        inviteTalentToTeam(myFirstStartup.id, talent.id, talent.primaryRole);
                      }
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Invite to Venture</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VENTURE READINESS & MILESTONES */}
      {/* ========================================================================= */}
      {activeTab === 'readiness' && selectedReadinessStartup && (
        <div className="space-y-5 animate-in fade-in">
          {/* Venture Selector Banner */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Evaluating Venture Readiness for:
              </span>
              <div className="flex items-center gap-2 mt-1">
                <select
                  value={selectedReadinessId}
                  onChange={(e) => setSelectedReadinessId(e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 font-extrabold text-sm text-slate-900 bg-slate-50 outline-none"
                >
                  {startupIdeas.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.ideaTitle} ({s.category} • Stage: {s.stage})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-semibold block">Venture Readiness Score</span>
                <span className="text-2xl font-black text-purple-700">
                  {selectedReadinessStartup.readinessScore || 75}/100
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-purple-600 flex items-center justify-center font-black text-xs text-purple-800 bg-purple-50">
                {selectedReadinessStartup.readinessScore || 75}%
              </div>
            </div>
          </div>

          {/* 6 Core Readiness Pillars */}
          <div className="grid md:grid-cols-2 gap-4">
            {(selectedReadinessStartup.readinessFactors || [
              { factor: 'Problem Clarity', status: 'DONE', detail: 'Surveyed target users with recorded interview logs.' },
              { factor: 'Solution Architecture', status: 'DONE', detail: 'Technical architecture diagrams and data schema validated.' },
              { factor: 'Team Completeness', status: 'WARNING', detail: 'Co-founders recruited; seeking backend developer.' },
              { factor: 'Working Prototype', status: 'DONE', detail: 'Interactive React frontend and working API deployed.' },
              { factor: 'Validation Evidence', status: 'WARNING', detail: 'Early feedback collected from 50 target collegiate testers.' },
              { factor: 'Funding Strategy', status: 'DONE', detail: 'Prepared grant proposal for MeitY TIDE 2.0.' }
            ]).map((factor, idx) => {
              const isDone = factor.status === 'DONE';
              const isWarn = factor.status === 'WARNING';
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start gap-3.5"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : isWarn
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isWarn ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{factor.factor}</span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : isWarn
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {factor.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{factor.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Milestone Verification Sandbox */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Venture Milestone Defense & Verification
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submit proof of development (GitHub repo, survey records, pilot logs) for incubator sign-off.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                Milestone Progress: {selectedReadinessStartup.milestoneProgress || 40}%
              </span>
            </div>

            <div className="space-y-3">
              {[
                { title: 'MVP Source Code Repository Defense', points: '+15 Readiness Score', done: true },
                { title: 'Pilot User Validation (Min 30 Responses)', points: '+15 Readiness Score', done: true },
                { title: 'Vernacular Telugu Audio / Speech Pipeline Test', points: '+15 Readiness Score', done: false },
                { title: 'Incubation Screening Viva with Faculty Panel', points: '+20 Readiness Score', done: false }
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        m.done ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900">{m.title}</span>
                      <span className="text-[11px] text-purple-700 font-semibold block">{m.points}</span>
                    </div>
                  </div>

                  {m.done ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      Verified by Incubation Lead
                    </span>
                  ) : (
                    <button
                      onClick={() => verifyStartupMilestone(selectedReadinessStartup.id, m.title)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg shadow-2xs cursor-pointer"
                    >
                      Submit Evidence
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SEED GRANTS & INCUBATION DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'funding' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-black">Collegiate Seed Grants & Incubation Programs</h2>
              </div>
              <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
                Verified student founders can fast-track applications to state incubation cells and seed grant programs with their SkillBridge Venture Dossier.
              </p>
            </div>
            <span className="text-[11px] font-bold bg-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
              MOCK / PROTOTYPE SCHEMES FOR DEMO
            </span>
          </div>

          {/* Grants Cards Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {fundingSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {scheme.provider}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 mt-0.5">{scheme.title}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-200 shrink-0">
                      {scheme.grantAmount}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{scheme.description}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                    <span className="font-bold text-slate-800 block text-[11px]">Eligibility Criteria:</span>
                    <p className="text-slate-600">{scheme.eligibility}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Stage:</span>
                      <strong className="text-slate-800">{scheme.stageTarget}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Upcoming Deadline:</span>
                      <strong className="text-rose-700">{scheme.deadline}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Includes Incubation Desk & Mentorship
                  </span>

                  {scheme.applied ? (
                    <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dossier Submitted</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => applyStartupFundingScheme(scheme.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Apply with Venture Dossier</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MY VENTURES & APPLICANT DESK */}
      {/* ========================================================================= */}
      {activeTab === 'my-ventures' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Privacy & Safety Note */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-amber-900">
                <strong>Founder Privacy Shield:</strong> Candidate personal contacts are masked until you review and click <strong>Accept into Team</strong>.
              </span>
            </div>
            <button
              onClick={() => setIsPostIdeaOpen(true)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shrink-0 cursor-pointer"
            >
              + Create New Venture
            </button>
          </div>

          {/* List of User's Ventures */}
          <div className="space-y-5">
            {startupIdeas
              .filter(
                (s) => s.founderName === profile.name || (s.teamMembers || []).some((m) => m.name === profile.name)
              )
              .map((startup) => {
                const isFounder = startup.founderName === profile.name;
                const applicants = startup.applicants || [];

                return (
                  <div
                    key={startup.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-slate-900">{startup.ideaTitle}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                            {isFounder ? '👑 You are Founder' : '⭐ Co-Builder'}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                            Stage: {startup.stage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Category: <strong>{startup.category}</strong> • Location: <strong>{startup.location}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDossierIdea(startup)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View One-Pager</span>
                        </button>
                      </div>
                    </div>

                    {/* Team Members in this Venture */}
                    <div>
                      <span className="text-xs font-bold text-slate-800 block mb-2">
                        Active Co-Builders ({startup.teamMembers?.length || 0} / {startup.teamCountTarget || 4}):
                      </span>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {(startup.teamMembers || []).map((tm, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-slate-900 block">{tm.name}</span>
                              <span className="text-slate-500 text-[11px]">{tm.role}</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              Active
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Incoming Applicants Desk (Visible if Founder) */}
                    {isFounder && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-800">
                            Candidate Applications Desk ({applicants.length}):
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Verified against SkillBridge practical lab assessments
                          </span>
                        </div>

                        {applicants.length > 0 ? (
                          <div className="space-y-2">
                            {applicants.map((app) => (
                              <div
                                key={app.id}
                                className="p-4 rounded-xl border border-slate-200 bg-purple-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-slate-900 text-sm">{app.studentName}</span>
                                    <span className="px-2 py-0.2 rounded font-bold text-[10px] bg-indigo-100 text-indigo-700">
                                      {app.matchScore}% Match
                                    </span>
                                    <span className="text-[11px] text-purple-700 font-bold">
                                      Applying for: {app.roleApplied}
                                    </span>
                                  </div>
                                  <p className="text-slate-600 mt-1 italic">"{app.intro}"</p>
                                  <div className="flex flex-wrap gap-1 mt-1.5">
                                    {(app.verifiedSkills || []).map((sk, skIdx) => (
                                      <span
                                        key={skIdx}
                                        className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-700"
                                      >
                                        ✓ {sk}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {app.status === 'ACCEPTED' ? (
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg">
                                      Accepted
                                    </span>
                                  ) : app.status === 'REJECTED' ? (
                                    <span className="px-3 py-1 bg-slate-200 text-slate-600 font-bold text-xs rounded-lg">
                                      Declined
                                    </span>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => handleStartupApplicantAction(startup.id, app.id, 'REJECT')}
                                        className="px-3 py-1 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                                      >
                                        Decline
                                      </button>
                                      <button
                                        onClick={() => handleStartupApplicantAction(startup.id, app.id, 'ACCEPT')}
                                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
                                      >
                                        <UserCheck className="w-3.5 h-3.5" />
                                        <span>Accept into Team</span>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs">
                            No pending applicants right now. Your open roles are listed in the Student Feed!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: APPLY FOR ROLE */}
      {/* ========================================================================= */}
      {applyingRoleData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-5 bg-gradient-to-r from-purple-900 to-indigo-950 text-white flex items-start justify-between">
              <div>
                <span className="text-base font-extrabold block">Apply to Co-Build at {applyingRoleData.startup.ideaTitle}</span>
                <p className="text-xs text-purple-200 mt-0.5">
                  Role: <strong>{applyingRoleData.role.roleTitle}</strong>
                </p>
              </div>
              <button
                onClick={() => setApplyingRoleData(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRoleApplySubmit} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-purple-950">
                <span className="font-bold block mb-1">Your Verified Skill Passport will be shared:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded bg-white text-indigo-700 font-bold border border-purple-200">
                    Python (Industry Verified)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-indigo-700 font-bold border border-purple-200">
                    React (Certificate Verified)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-indigo-700 font-bold border border-purple-200">
                    SQL & Databases
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Why do you want to build this? (Application Pitch)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your interest in this problem statement, your weekly availability (e.g. 15 hours), and what you want to construct."
                  value={applicationPitch}
                  onChange={(e) => setApplicationPitch(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApplyingRoleData(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application with Passport</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VENTURE DOSSIER ONE-PAGER */}
      {/* ========================================================================= */}
      {selectedDossierIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-purple-950 text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-white">{selectedDossierIdea.ideaTitle}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-400/20 text-purple-300 border border-purple-400/30">
                    {selectedDossierIdea.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Venture Dossier & Executive Pitch One-Pager
                </p>
              </div>
              <button
                onClick={() => setSelectedDossierIdea(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Founder:</span>
                  <strong className="text-slate-900">{selectedDossierIdea.founderName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Institution:</span>
                  <strong className="text-slate-900">{selectedDossierIdea.institution || 'Collegiate Network'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Readiness Score:</span>
                  <strong className="text-purple-700">{selectedDossierIdea.readinessScore || 75}%</strong>
                </div>
              </div>

              <div>
                <span className="font-extrabold text-slate-900 block text-xs uppercase text-slate-500 mb-1">
                  1. Problem Statement
                </span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedDossierIdea.problem}
                </p>
              </div>

              <div>
                <span className="font-extrabold text-slate-900 block text-xs uppercase text-slate-500 mb-1">
                  2. Technological Solution & Product
                </span>
                <p className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-purple-950 leading-relaxed">
                  {selectedDossierIdea.solution}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Target Users:</span>
                  <strong className="text-slate-800">{selectedDossierIdea.targetUsers || 'Collegiate and regional communities'}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Business Model:</span>
                  <strong className="text-slate-800">{selectedDossierIdea.businessModel || 'Freemium software with tiered service model'}</strong>
                </div>
              </div>

              <div>
                <span className="font-extrabold text-slate-900 block text-xs uppercase text-slate-500 mb-1">
                  3. Technology Stack & Architecture
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedDossierIdea.technologyStack || selectedDossierIdea.skillsNeeded || []).map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-bold border border-indigo-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-extrabold text-slate-900 block text-xs uppercase text-slate-500 mb-1">
                  4. Co-Founders & Roster
                </span>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(selectedDossierIdea.teamMembers || []).map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                      <span className="font-bold text-slate-900">{m.name}</span>
                      <span className="text-slate-500 text-[11px]">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => setSelectedDossierIdea(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Idea Modal */}
      <PostIdeaModal isOpen={isPostIdeaOpen} onClose={() => setIsPostIdeaOpen(false)} />

    </div>
  );
};
