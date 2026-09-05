import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Mail,
  MessageSquare,
  Bell,
  Sparkles,
  ShieldCheck,
  User,
  Building2,
  GraduationCap,
  Rocket,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  MapPin,
  CalendarCheck,
  Compass,
  FolderGit2,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Radio,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    profile,
    mailMessages,
    notifications,
    unreadChatCount,
    setIsSearchOpen,
    setIsAskAIOpen,
    offlineBookings,
    markNotificationAsRead
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadMailCount = mailMessages.filter((m) => !m.isRead).length;
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  const roleOptions: { id: UserRole; label: string; icon: any; short: string }[] = [
    { id: 'student', label: 'Student Perspective', icon: User, short: 'Student' },
    { id: 'industry', label: 'Industry & Recruiters', icon: Building2, short: 'Industry' },
    { id: 'institute', label: 'College Administration', icon: GraduationCap, short: 'College' },
    { id: 'startup', label: 'Startup Founder', icon: Rocket, short: 'Startup' }
  ];

  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'learning', label: 'Learning' },
    { id: 'career-map', label: 'Career Map' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'industry', label: 'Industry' },
    { id: 'faculty', label: 'Academia' },
    { id: 'discover', label: 'Discover' },
    { id: 'projects', label: 'Project Hub' },
    { id: 'ecosystem', label: 'Ecosystem' }
  ];

  const ecosystemNavItems = [
    { id: 'ecosystem', label: 'Ecosystem Gateway', icon: Layers, desc: 'All 5 major branches & centralized collaboration' },
    { id: 'industry', label: 'Industry Portal & Fast Match', icon: Building2, desc: 'Companies, Hiring, Training, Projects & Talent Search' },
    { id: 'faculty', label: 'Faculty & Academia Portal', icon: GraduationCap, desc: 'Faculty internships, FDPs, and research' },
    { id: 'institutions', label: 'Colleges & Fee Audit', icon: GraduationCap, desc: '15 authentic Anantapur institutions & fee transparency' },
    { id: 'startups', label: 'Startup Incubator', icon: Rocket, desc: 'AIC-SKU and AP Innovation Society grants' },
    { id: 'career-map', label: 'Career Map & Roadmap', icon: Compass, desc: 'Diagnostic skill roadmap and milestone tracks' },
    { id: 'skills', label: 'Skills & Gap Matrix', icon: Layers, desc: 'Priority gap identification & practice drills' },
    { id: 'skill-passport', label: 'Verified Skill Passport', icon: ShieldCheck, desc: 'Evidence levels and proctored code defense' },
    { id: 'map', label: 'District Ecosystem Map', icon: MapPin, desc: 'Interactive geographic directory of tech centers' },
    { id: 'podcasts', label: 'Podcasts & Meetups', icon: Radio, desc: 'Regional founder stories & community events' },
    { id: 'contacts', label: 'Mentors & Alumni Network', icon: User, desc: 'Connect with verified regional industry guides' },
    { id: 'local-jobs', label: 'Local Part-Time Jobs', icon: Briefcase, desc: 'Part-time tech jobs in Anantapur district' },
    { id: 'scholarships', label: 'Scholarships & Grants', icon: Award, desc: 'State and merit education funding programs' },
    { id: 'technology', label: 'Technology Trends Radar', icon: Sparkles, desc: 'Regional recruiter tech radar & demands' }
  ];

  const isEcosystemActive = ecosystemNavItems.some((item) => item.id === activeTab);

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setIsRoleMenuOpen(false);
    if (newRole === 'industry') {
      setActiveTab('industry');
    } else if (newRole === 'institute') {
      setActiveTab('institutions');
    } else if (newRole === 'startup') {
      setActiveTab('startups');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs h-[70px]">
      <div className="app-container h-full">
        <div className="flex items-center justify-between h-full gap-3">
          
          {/* ================================================================= */}
          {/* 1. SKILLBRIDGE LOGO                                               */}
          {/* ================================================================= */}
          <div
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs font-black text-sm shrink-0">
              SB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  SKILLBRIDGE
                </span>
                <span className="inline-flex items-center text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ACADEMIA × INDUSTRY
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 hidden xl:block leading-none mt-0.5">
                From Learning to Opportunity
              </p>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. PRIMARY NAVIGATION (Desktop)                                   */}
          {/* ================================================================= */}
          <nav className="hidden lg:flex items-center space-x-1 shrink-0">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Ecosystem "More" Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  isEcosystemActive && !primaryNavItems.some(p => p.id === activeTab)
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Regional Ecosystem Modules
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-0.5">
                    {ecosystemNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id as any);
                            setIsMoreMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                          <div className="truncate">
                            <span className="block font-semibold">{item.label}</span>
                            <span className="block text-[10px] text-slate-400 truncate">{item.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ================================================================= */}
          {/* 3. FLEXIBLE SPACE                                                 */}
          {/* ================================================================= */}
          <div className="flex-1 min-w-[8px]" />

          {/* ================================================================= */}
          {/* 4. UNIVERSAL SEARCH (Desktop)                                     */}
          {/* ================================================================= */}
          <div className="hidden xl:flex items-center shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-44 2xl:w-56 flex items-center justify-between px-3 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200/80 transition-all cursor-pointer group"
              title="Search skills, opportunities, colleges... (Press ⌘K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                <span className="truncate">Search skills, jobs...</span>
              </div>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* ================================================================= */}
          {/* 5. RIGHT ACTIONS: Ask AI, Messages, Mail, Notifications            */}
          {/* ================================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Ask AI Doubt Button */}
            <button
              onClick={() => setIsAskAIOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100/60 shadow-2xs transition-all cursor-pointer"
              title="Ask AI Doubt Engine"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ask AI</span>
            </button>

            {/* Messages / Direct Chat Button */}
            <button
              onClick={() => setActiveTab('messages')}
              className={`relative h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer ${
                activeTab === 'messages' ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
              title="Real-Time Messages & Direct Chat"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadChatCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[16px] px-0.5 text-[9px] font-bold text-white bg-indigo-600 rounded-full ring-2 ring-white">
                  {unreadChatCount}
                </span>
              )}
            </button>

            {/* Formal Mailbox Button */}
            <button
              onClick={() => setActiveTab('mailbox')}
              className={`relative h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer ${
                activeTab === 'mailbox' ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
              title="Mailbox & Formal Inquiries"
            >
              <Mail className="w-4 h-4" />
              {unreadMailCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[16px] px-0.5 text-[9px] font-bold text-white bg-indigo-600 rounded-full ring-2 ring-white">
                  {unreadMailCount}
                </span>
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="text-xs text-indigo-600 font-semibold hover:underline cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.targetView) setActiveTab(n.targetView);
                          setIsNotifOpen(false);
                        }}
                        className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                          !n.isRead ? 'bg-indigo-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Perspective Dropdown */}
            <div className="relative" ref={roleRef}>
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="hidden md:inline-flex items-center gap-1.5 h-9 px-2.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors cursor-pointer border border-slate-200/60"
                title="Change active user perspective"
              >
                {role === 'student' && <User className="w-3.5 h-3.5 text-indigo-600" />}
                {role === 'industry' && <Building2 className="w-3.5 h-3.5 text-emerald-600" />}
                {role === 'institute' && <GraduationCap className="w-3.5 h-3.5 text-amber-600" />}
                {role === 'startup' && <Rocket className="w-3.5 h-3.5 text-rose-600" />}
                <span className="capitalize">{role}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Active Role
                  </div>
                  {roleOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = role === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleRoleSelect(opt.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* =============================================================== */}
            {/* 6. PROFILE (Protected from Edge Clipping)                        */}
            {/* =============================================================== */}
            <div
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-2 pr-1 sm:pr-2 py-1 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group shrink-0"
              title="View Profile & Digital Portfolio"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all shrink-0">
                KP
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {profile.name.split(' ')[0]}
                </div>
                <div className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5" />
                  <span>{profile.careerReadiness}% Ready</span>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* MOBILE ONLY: Search Trigger & Menu Button                        */}
            {/* =============================================================== */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="xl:hidden h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer ml-1"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE FULL-WIDTH NAVIGATION DRAWER                                   */}
      {/* ===================================================================== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2">
          
          {/* Mobile Search Button */}
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-500 bg-slate-100 rounded-xl border border-slate-200"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search skills, jobs, colleges...</span>
          </button>

          {/* Mobile Role Switcher */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Active Role Perspective
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {roleOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    handleRoleSelect(opt.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    role === opt.id
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <opt.icon className="w-4 h-4" />
                  <span>{opt.short}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Main Navigation
            </span>
            <div className="grid grid-cols-2 gap-1">
              {primaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Ecosystem Links */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Ecosystem Modules
            </span>
            <div className="space-y-1">
              {ecosystemNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Ask AI */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setIsAskAIOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Doubt Engine</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};

