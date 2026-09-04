import React, { useState } from 'react';
import {
  Brain,
  Search,
  Mail,
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
  MapPin,
  CalendarCheck
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
    setIsSearchOpen,
    setIsAskAIOpen,
    offlineBookings,
    markNotificationAsRead
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadMailCount = mailMessages.filter((m) => !m.isRead).length;
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  const roleOptions: { id: UserRole; label: string; icon: any }[] = [
    { id: 'student', label: 'Student', icon: User },
    { id: 'industry', label: 'Industry / Co.', icon: Building2 },
    { id: 'institute', label: 'College / Inst.', icon: GraduationCap },
    { id: 'startup', label: 'Startup Founder', icon: Rocket }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
                  SKILLBRIDGE<span className="text-indigo-600">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <ShieldCheck className="w-3 h-3" /> Evidence-Driven
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden md:block">
                From Learning to Proven Capability
              </p>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-500 bg-slate-100/80 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                <span className="text-xs">Search skills, internships, startups, courses...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Ask AI Doubt Button */}
            <button
              onClick={() => setIsAskAIOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200/80 hover:border-indigo-300 hover:bg-indigo-100/50 shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Ask AI</span>
            </button>

            {/* Offline Assessment Status Pill (If booked) */}
            {offlineBookings.length > 0 && (
              <button
                onClick={() => setActiveTab('assessments')}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                title="Proctored Offline Assessment Booked"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xl:inline">Offline Booked:</span>
                <span className="font-semibold">{offlineBookings[0].skillName}</span>
              </button>
            )}

            {/* Mailbox Icon */}
            <button
              onClick={() => setActiveTab('mailbox')}
              className={`relative p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer ${
                activeTab === 'mailbox' ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
              title="Mailbox & Inquiries"
            >
              <Mail className="w-5 h-5" />
              {unreadMailCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full ring-2 ring-white animate-bounce">
                  {unreadMailCount}
                </span>
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <span className="text-[11px] text-indigo-600 font-medium cursor-pointer" onClick={() => setIsNotifOpen(false)}>
                      Close
                    </span>
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
                          !n.isRead ? 'bg-indigo-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Dropdown / Pill */}
            <div className="relative border-l border-slate-200 pl-2 sm:pl-3">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {roleOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = role === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setRole(opt.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-indigo-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title={`Switch to ${opt.label} perspective`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* User Quick Info */}
            <div
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-2 cursor-pointer group"
              title="View Profile & Privacy Settings"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all">
                KP
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {profile.name}
                </div>
                <div className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5" />
                  {profile.careerReadiness}% Ready
                </div>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-slate-100 rounded-lg"
          >
            <Search className="w-4 h-4" /> Search all modules...
          </button>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'career-map', label: 'Career Map' },
              { id: 'skills', label: 'Skills & Gaps' },
              { id: 'learning', label: 'Learning' },
              { id: 'assessments', label: 'Assessments' },
              { id: 'opportunities', label: 'Opportunities' },
              { id: 'startups', label: 'Startup Hub' },
              { id: 'scholarships', label: 'Scholarships' },
              { id: 'portfolio', label: 'Skill Passport' },
              { id: 'mailbox', label: `Mailbox (${unreadMailCount})` }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-semibold rounded-lg ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
