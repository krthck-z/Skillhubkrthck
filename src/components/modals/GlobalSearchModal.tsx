import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, Briefcase, Rocket, FileCheck, Building, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setActiveTab,
    skills,
    opportunities,
    learningResources,
    startupIdeas,
    institutions,
    techTrends
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedSkills = skills.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  const matchedOpps = opportunities.filter((o) => o.title.toLowerCase().includes(q) || o.companyName.toLowerCase().includes(q));
  const matchedLearning = learningResources.filter((l) => l.title.toLowerCase().includes(q) || l.skill.toLowerCase().includes(q));
  const matchedStartups = startupIdeas.filter((s) => s.ideaTitle.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));

  const handleSelect = (view: string) => {
    setActiveTab(view);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-indigo-600" />
          <input
            type="text"
            placeholder="Search skills, internships, startups, courses, institutions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400 text-slate-800"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Categories */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {query.length === 0 ? (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Career Map', tab: 'career-map', icon: Sparkles },
                  { label: 'Skill Gaps (React)', tab: 'skills', icon: FileCheck },
                  { label: 'Internships', tab: 'opportunities', icon: Briefcase },
                  { label: 'Startup Teams', tab: 'startups', icon: Rocket }
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleSelect(item.tab)}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-semibold transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4 text-indigo-500" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Skills Results */}
              {matchedSkills.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-indigo-600" /> Skills & Evidence
                  </p>
                  <div className="space-y-1">
                    {matchedSkills.slice(0, 3).map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect('skills')}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{s.name}</span>
                          <span className="ml-2 text-slate-500 font-mono text-[11px]">
                            Gap: {s.gapPercentage}% • {s.evidenceLevel}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Opportunities Results */}
              {matchedOpps.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Opportunities
                  </p>
                  <div className="space-y-1">
                    {matchedOpps.slice(0, 3).map((o) => (
                      <div
                        key={o.id}
                        onClick={() => handleSelect('opportunities')}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{o.title}</span>
                          <span className="ml-2 text-slate-500 text-[11px]">{o.companyName} ({o.stipendOrSalary})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                          {o.matchScore}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Results */}
              {matchedLearning.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Learning Resources
                  </p>
                  <div className="space-y-1">
                    {matchedLearning.slice(0, 3).map((l) => (
                      <div
                        key={l.id}
                        onClick={() => handleSelect('learning')}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{l.title}</span>
                          <span className="ml-2 text-slate-500 text-[11px]">({l.provider})</span>
                        </div>
                        <span className="text-[11px] font-medium text-indigo-600">{l.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Startup Results */}
              {matchedStartups.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-amber-600" /> Startups & Ideas
                  </p>
                  <div className="space-y-1">
                    {matchedStartups.slice(0, 2).map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect('startups')}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                      >
                        <span className="font-bold text-slate-900">{s.ideaTitle}</span>
                        <span className="text-slate-500 text-[11px]">{s.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search spans entire SkillBridge Ecosystem</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
