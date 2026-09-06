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
  Zap,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    role,
    switchPortal,
    activeTab,
    setActiveTab,
    profile,
    mailMessages,
    notifications,
    unreadChatCount,
    setIsSearchOpen,
    setIsAskAIOpen,
    markNotificationAsRead
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadMailCount = mailMessages.filter((m) => !m.isRead).length;
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  // 1. Student Portal Navigation (Ecosystem FIRST as requested)
  const studentPrimaryNav = [
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'home', label: 'Home' },
    { id: 'learning', label: 'Learning' },
    { id: 'career-map', label: 'Career Map' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'assessments', label: 'Assessments' }
  ];

  const studentMoreNav = [
    { id: 'skills', label: 'Skill Gaps & Matrix', icon: Layers, desc: 'Priority gap identification & practice drills' },
    { id: 'discover', label: 'Discover & Search', icon: Compass, desc: 'Search regional projects, jobs & companies' },
    { id: 'projects', label: 'Project Hub', icon: FolderGit2, desc: 'Audited Git repositories & capstones' },
    { id: 'skill-passport', label: 'Verified Skill Passport', icon: ShieldCheck, desc: 'Evidence levels & proctored defense' },
    { id: 'startups', label: 'Startups & Incubation', icon: Rocket, desc: 'AIC-SKU ideas & seed funding' },
    { id: 'institutions', label: 'Institutions Directory', icon: GraduationCap, desc: 'Colleges & universities directory' },
    { id: 'map', label: 'District Ecosystem Map', icon: MapPin, desc: 'Interactive geographic directory' },
    { id: 'podcasts', label: 'Podcasts & Meetups', icon: Radio, desc: 'Regional founder stories & talks' },
    { id: 'contacts', label: 'Mentors & Alumni', icon: User, desc: 'Verified regional industry guides' },
    { id: 'local-jobs', label: 'Local Part-Time Jobs', icon: Briefcase, desc: 'Rayalaseema tech opportunities' },
    { id: 'scholarships', label: 'Scholarships & Grants', icon: Award, desc: 'State and merit education funding' },
    { id: 'technology', label: 'Technology Trends Radar', icon: Sparkles, desc: 'Regional recruiter tech radar' },
    { id: 'profile', label: 'My Profile & Portfolio', icon: User, desc: 'Digital portfolio and verified credentials' }
  ];

  // 2. Industry Portal Navigation
  const industryPrimaryNav = [
    { id: 'industry', label: 'Dashboard' },
    { id: 'talent', label: 'Talent & Fast Match' },
    { id: 'hiring', label: 'Hiring & Pipeline' },
    { id: 'training', label: 'Training' },
    { id: 'internships', label: 'Internships' },
    { id: 'colleges', label: 'College MoUs' }
  ];

  const industryMoreNav = [
    { id: 'projects', label: 'Industry Problem Statements', icon: FolderGit2, desc: 'Sponsor capstones and challenge statements' },
    { id: 'network', label: 'Industry Network', icon: Layers, desc: 'Corporate partnerships and employer consortium' },
    { id: 'profile', label: 'Company Profile & Trust', icon: ShieldCheck, desc: 'Recruiter verification & profile settings' },
    { id: 'settings', label: 'Workspace Settings', icon: Building2, desc: 'Billing, team permissions, and API keys' }
  ];

  // 3. Academia Portal Navigation
  const academiaPrimaryNav = [
    { id: 'academia', label: 'Dashboard' },
    { id: 'faculty-dev', label: 'Faculty Development' },
    { id: 'industry-connect', label: 'Industry Connect' },
    { id: 'student-intelligence', label: 'Student Intelligence' },
    { id: 'curriculum', label: 'Curriculum & Skills' }
  ];

  const academiaMoreNav = [
    { id: 'student-opps', label: 'Student Opportunities', icon: Briefcase, desc: 'Direct corporate internship allocation' },
    { id: 'faculty-recruitment', label: 'Faculty Recruitment', icon: User, desc: 'Hire certified trainers and visiting faculty' },
    { id: 'events', label: 'Events & Hackathons', icon: Sparkles, desc: 'Inter-college competitions and symposiums' },
    { id: 'research', label: 'Research & Consultancy', icon: BookOpen, desc: 'Funded research & industrial consultancy' },
    { id: 'profile', label: 'Institution Profile', icon: GraduationCap, desc: 'NAAC reports and college accreditation' }
  ];

  const primaryNavItems =
    role === 'industry'
      ? industryPrimaryNav
      : role === 'institute'
      ? academiaPrimaryNav
      : studentPrimaryNav;

  const moreNavItems =
    role === 'industry'
      ? industryMoreNav
      : role === 'institute'
      ? academiaMoreNav
      : studentMoreNav;

  const isMoreActive = moreNavItems.some((item) => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs h-[72px]">
      <div className="app-container h-full">
        <div className="flex items-center justify-between h-full gap-2 lg:gap-4">
          
          {/* ================================================================= */}
          {/* 1. SKILLBRIDGE AI LOGO & BRAND                                    */}
          {/* ================================================================= */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              onClick={() => {
                if (role === 'industry') setActiveTab('industry');
                else if (role === 'institute') setActiveTab('academia');
                else setActiveTab('ecosystem');
              }}
              title="SkillBridge AI Homepage"
            >
              {/* Professional Neural Bridge SkillBridge Icon */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 shrink-0 ring-1 ring-white/20 transition-transform group-hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Neural Synapse Arcs (Brain / Intelligence) */}
                  <path d="M7 16C5 16 3.5 14.5 3.5 12.5C3.5 10.7 4.8 9.2 6.5 9C7.2 6.7 9.4 5 12 5C14.2 5 16.1 6.2 17.1 8C18.1 6.2 20 5 22.2 5C24.8 5 27 6.7 27.7 9C29.4 9.2 30.7 10.7 30.7 12.5C30.7 14.5 29.2 16 27.2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                  {/* Connecting Opportunity Arch Bridge */}
                  <path d="M4 25C8 18 12 14.5 16 14.5C20 14.5 24 18 28 25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M10 20.5V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 14.5V25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M22 20.5V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  {/* Core Intelligence Nodes */}
                  <circle cx="16" cy="9.5" r="2" fill="currentColor" />
                  <circle cx="10.5" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="21.5" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-950">
                    SKILLBRIDGE <span className="text-indigo-600 font-black">AI</span>
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-slate-500 hidden sm:block leading-none mt-0.5">
                  Bridging Skills to Opportunities
                </p>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. THREE-PORTAL SEGMENTED SWITCHER (Unmissable & Prominent)       */}
          {/* ================================================================= */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/90 shrink-0 shadow-2xs">
            <button
              onClick={() => switchPortal('student')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                role === 'student'
                  ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
              title="Switch to Student Portal"
            >
              <User className={`w-3.5 h-3.5 ${role === 'student' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Student</span>
            </button>

            <button
              onClick={() => switchPortal('industry')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                role === 'industry'
                  ? 'bg-slate-900 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
              title="Switch to Industry & Recruiter Portal"
            >
              <Building2 className={`w-3.5 h-3.5 ${role === 'industry' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>Industry</span>
            </button>

            <button
              onClick={() => switchPortal('institute')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                role === 'institute'
                  ? 'bg-emerald-700 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
              title="Switch to Academia & Institutional Administration Portal"
            >
              <GraduationCap className={`w-3.5 h-3.5 ${role === 'institute' ? 'text-emerald-200' : 'text-slate-400'}`} />
              <span>Academia</span>
            </button>
          </div>

          {/* ================================================================= */}
          {/* 3. PRIMARY NAVIGATION (Desktop)                                   */}
          {/* ================================================================= */}
          <nav className="hidden lg:flex items-center space-x-1 shrink-0">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? role === 'industry'
                        ? 'bg-slate-900 text-white font-bold'
                        : role === 'institute'
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Portal-Specific "More" Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  isMoreActive && !primaryNavItems.some(p => p.id === activeTab)
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
                    {role === 'industry'
                      ? 'Industry Modules'
                      : role === 'institute'
                      ? 'Institutional Modules'
                      : 'Ecosystem Modules'}
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-0.5">
                    {moreNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
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
          {/* 4. UNIVERSAL SEARCH (Responsively Constrained to Prevent Overflow) */}
          {/* ================================================================= */}
          <div className="hidden xl:flex items-center shrink min-w-0 max-w-[200px] 2xl:max-w-[240px]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-full flex items-center justify-between px-3 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200/80 transition-all cursor-pointer group truncate"
              title="Search skills, opportunities, colleges... (Press ⌘K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                <span className="truncate">Search skills, jobs...</span>
              </div>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs shrink-0 ml-1">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* ================================================================= */}
          {/* 5. RIGHT ACTIONS: Ask AI, Messages, Mail, Notifications, Profile  */}
          {/* ================================================================= */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Ask AI Doubt Engine Button */}
            <button
              onClick={() => setIsAskAIOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100/60 shadow-2xs transition-all cursor-pointer"
              title="Ask AI Doubt Engine"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">Ask AI</span>
            </button>

            {/* Messages / Direct Chat Button */}
            <button
              onClick={() => setActiveTab('messages')}
              className={`relative h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer ${
                activeTab === 'messages' ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
              title="Messages & Direct Real-Time Chat"
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
              title="Formal Mailbox & Recruiter Inquiries"
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
                title="System Notifications"
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

            {/* Profile Avatar Chip */}
            <div
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-1.5 pr-1 sm:pr-2 py-1 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group shrink-0"
              title="View Profile & Digital Portfolio"
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-200 group-hover:ring-indigo-400 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all shrink-0">
                  KP
                </div>
              )}
              <div className="hidden 2xl:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[90px]">
                  {profile.name.split(' ')[0]}
                </div>
                <div className="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5">
                  <CheckCircle className="w-2.5 h-2.5 shrink-0" />
                  <span>{profile.careerReadiness}%</span>
                </div>
              </div>
            </div>

            {/* Search Icon Trigger on Small Viewports */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="xl:hidden h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer ml-0.5"
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 shadow-2xl">
          
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

          {/* Mobile 3-Portal Switcher */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Switch Portal Experience
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  switchPortal('student');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-center p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                  role === 'student'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Student</span>
              </button>

              <button
                onClick={() => {
                  switchPortal('industry');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-center p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                  role === 'industry'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Industry</span>
              </button>

              <button
                onClick={() => {
                  switchPortal('institute');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-center p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 ${
                  role === 'institute'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Academia</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              {role === 'industry' ? 'Industry Navigation' : role === 'institute' ? 'Academia Navigation' : 'Student Navigation'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {primaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                        : 'text-slate-700 hover:bg-slate-50 border border-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Additional Modules */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Additional Modules
            </span>
            <div className="space-y-1">
              {moreNavItems.slice(0, 6).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
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
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
