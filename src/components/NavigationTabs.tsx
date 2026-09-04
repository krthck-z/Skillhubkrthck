import React from 'react';
import {
  LayoutDashboard,
  GitFork,
  CheckCircle2,
  BookOpen,
  FileCheck,
  Briefcase,
  DollarSign,
  Building,
  Rocket,
  Users,
  Award,
  FileText,
  Mail,
  TrendingUp,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NavigationTabs: React.FC = () => {
  const { activeTab, setActiveTab, role, mailMessages } = useApp();

  const unreadMail = mailMessages.filter((m) => !m.isRead).length;

  if (role !== 'student') {
    // When in Industry, Institute, or Startup role, show focused perspective tabs
    return (
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Viewing as:
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold uppercase">
                {role}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('home')}
              className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              Switch back to Student Ecosystem →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'career-map', label: 'Career Map', icon: GitFork, badge: 'Target: Full Stack' },
    { id: 'skills', label: 'Skill Gaps', icon: CheckCircle2, badge: '4 Gaps' },
    { id: 'skill-passport', label: 'Skill Passport', icon: ShieldCheck },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: FileCheck, highlight: true },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase, badge: 'Intern / Job / Part-Time' },
    { id: 'scholarships', label: 'Scholarships', icon: DollarSign },
    { id: 'startups', label: 'Startup Hub', icon: Rocket, badge: 'Team Match' },
    { id: 'institutions', label: 'Institutions', icon: Building },
    { id: 'mentors', label: 'Mentors & Network', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'portfolio', label: 'Portfolio & Resume', icon: FileText },
    { id: 'mailbox', label: 'Mailbox', icon: Mail, count: unreadMail },
    { id: 'technology', label: 'Tech Trends', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: UserCheck }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-2.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                      isActive ? 'bg-white text-indigo-700' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
                {item.badge && !isActive && (
                  <span className="hidden xl:inline-block text-[9px] px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-500 font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
