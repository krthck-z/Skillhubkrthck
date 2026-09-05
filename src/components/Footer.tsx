import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="app-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
                SB
              </div>
              <span className="text-base font-black tracking-tight text-slate-900">
                SKILLBRIDGE
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>ACADEMIA × INDUSTRY</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              From Learning to Opportunity. Centralized ecosystem connecting Students, Industries, Academicians, and Institutions (SIH26044).
            </p>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('learning')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Learning
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('career')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Career Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assessments')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Assessments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('opportunities')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('discover')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Discover
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Project Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Ecosystem */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('institutions')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Institutions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('industry')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Industries
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('startups')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Startups
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('industry-hiring')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Companies
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contacts')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Mentors
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('local-jobs')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Local Jobs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Student */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Student
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('portfolio')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Resume
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('achievements')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Achievements
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('opportunities')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Applications
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('messages')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Messages
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Academia */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Academia
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('faculty')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Faculty Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faculty')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  FDP Programs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faculty')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Research Collaboration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faculty')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Industry Collaboration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('institutions')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Curriculum Intelligence
                </button>
              </li>
            </ul>
          </div>

          {/* Column 6: Industry */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Industry
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('industry')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Post Opportunity
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('industry')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Talent Search
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('fast-match')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  48H Fast Match
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('learning')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Company Training
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Industry Projects
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-slate-800 cursor-pointer">About</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Help Center</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Contact Us</span>
          </div>
          <p className="flex items-center gap-1.5">
            <span>© 2026 SkillBridge. All rights reserved.</span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-600 font-semibold">PS ID: SIH26044</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
