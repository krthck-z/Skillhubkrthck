import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Briefcase,
  Rocket,
  FileCheck,
  Building2,
  Sparkles,
  Mail,
  Users,
  MapPin,
  Radio,
  GraduationCap,
  FolderGit2,
  Award,
  GitFork,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { initialStudentDirectory } from '../../data/studentProjectsData';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setActiveTab,
    skills,
    careerNodes,
    opportunities,
    learningResources,
    assessments,
    startupIdeas,
    institutions,
    techTrends,
    mailMessages,
    contacts,
    mentors,
    localJobs,
    podcasts,
    offlineMeetups,
    hubProjects
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');

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

  // Matched Categories
  const matchedSkills = skills.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  const matchedCareers = careerNodes.filter((c) => c.title.toLowerCase().includes(q) || c.cluster.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  const matchedLearning = learningResources.filter((l) => l.title.toLowerCase().includes(q) || l.skill.toLowerCase().includes(q) || l.provider.toLowerCase().includes(q));
  const matchedAssessments = assessments.filter((a) => a.title.toLowerCase().includes(q) || (a.skill && a.skill.toLowerCase().includes(q)));
  const matchedOpps = opportunities.filter((o) => o.title.toLowerCase().includes(q) || o.companyName.toLowerCase().includes(q) || o.location.toLowerCase().includes(q));
  const matchedStartups = startupIdeas.filter((s) => s.ideaTitle.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.pitch.toLowerCase().includes(q));
  const matchedInstitutions = institutions.filter((i) => i.name.toLowerCase().includes(q) || i.location.toLowerCase().includes(q) || (i.code && i.code.toLowerCase().includes(q)));
  const matchedStudents = initialStudentDirectory.filter((st) =>
    st.name.toLowerCase().includes(q) ||
    st.studentId.toLowerCase().includes(q) ||
    st.college.toLowerCase().includes(q) ||
    st.targetCareer.toLowerCase().includes(q) ||
    (st.verifiedSkills || []).some((s) => s.toLowerCase().includes(q))
  );
  const matchedProjects = (hubProjects || []).filter((p) => 
    p.title.toLowerCase().includes(q) || 
    (p.description && p.description.toLowerCase().includes(q)) || 
    (p.skillsRequired || []).some((t) => t.toLowerCase().includes(q))
  );
  const matchedMentors = mentors.filter((m) => 
    m.name.toLowerCase().includes(q) || 
    m.company.toLowerCase().includes(q) || 
    (m.title && m.title.toLowerCase().includes(q)) || 
    (m.skills || []).some((s) => s.toLowerCase().includes(q))
  );
  const matchedMail = mailMessages.filter((m) => m.subject.toLowerCase().includes(q) || m.body.toLowerCase().includes(q) || m.sender.toLowerCase().includes(q));

  const totalResults =
    matchedSkills.length +
    matchedCareers.length +
    matchedLearning.length +
    matchedAssessments.length +
    matchedOpps.length +
    matchedStartups.length +
    matchedInstitutions.length +
    matchedStudents.length +
    matchedProjects.length +
    matchedMentors.length +
    matchedMail.length;

  const handleSelect = (view: string) => {
    setActiveTab(view);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            type="text"
            placeholder="Search skills, careers, courses, jobs, startups, colleges, students, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm bg-transparent outline-hidden placeholder:text-slate-400 text-slate-900 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Category Pills when query typed */}
        {query.length > 0 && (
          <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase">Filter:</span>
            {[
              { id: 'ALL', label: 'All Results', count: totalResults },
              { id: 'SKILLS', label: 'Skills', count: matchedSkills.length },
              { id: 'CAREERS', label: 'Careers', count: matchedCareers.length },
              { id: 'LEARNING', label: 'Courses', count: matchedLearning.length },
              { id: 'ASSESSMENTS', label: 'Assessments', count: matchedAssessments.length },
              { id: 'OPPORTUNITIES', label: 'Jobs & Internships', count: matchedOpps.length },
              { id: 'STARTUPS', label: 'Startups', count: matchedStartups.length },
              { id: 'INSTITUTIONS', label: 'Colleges', count: matchedInstitutions.length },
              { id: 'STUDENTS', label: 'Students', count: matchedStudents.length },
              { id: 'PROJECTS', label: 'Projects', count: matchedProjects.length },
              { id: 'MENTORS', label: 'Mentors', count: matchedMentors.length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  activeCategoryFilter === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        )}

        {/* Search Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {query.length === 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quick Navigation
                </p>
                <span className="text-[11px] text-slate-400">Jump straight into modules</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Unified Discover', tab: 'discover', icon: Search, desc: 'Students, teams & ventures' },
                  { label: 'Project Hub', tab: 'projects', icon: FolderGit2, desc: 'Collaborative workspaces' },
                  { label: 'Career Map', tab: 'career-map', icon: GitFork, desc: 'Interactive skill tree' },
                  { label: 'Assessments', tab: 'assessments', icon: FileCheck, desc: 'Online & offline defense' },
                  { label: 'Opportunities', tab: 'opportunities', icon: Briefcase, desc: 'Fast Match hiring' },
                  { label: 'Institutions', tab: 'institutions', icon: GraduationCap, desc: 'Anantapur intelligence' },
                  { label: 'Startups & Squads', tab: 'startups', icon: Rocket, desc: 'Co-founders & grants' },
                  { label: 'Mailbox & Direct', tab: 'mailbox', icon: Mail, desc: 'Internal encrypted comms' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleSelect(item.tab)}
                      className="flex flex-col p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-200 transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-900">{item.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No results found for "{query}"</p>
              <p className="text-xs text-slate-400">
                Try searching for 'Python', 'React', 'JNTUA', 'Full Stack', or 'Internship'.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* STUDENTS / PEOPLE */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'STUDENTS') && matchedStudents.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-indigo-600" /> Students & Peers ({matchedStudents.length})</span>
                    <button onClick={() => handleSelect('discover')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">View All in Discover →</button>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {matchedStudents.slice(0, 4).map((st) => (
                      <div
                        key={st.id}
                        onClick={() => handleSelect('discover')}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer transition-all"
                      >
                        <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900 truncate">{st.name}</span>
                            <span className="font-mono text-[9px] text-slate-400">({st.studentId})</span>
                          </div>
                          <p className="text-[11px] text-indigo-600 truncate">{st.targetCareer}</p>
                          <p className="text-[10px] text-slate-400 truncate">{st.college.split(',')[0]}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COLLABORATIVE PROJECTS */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'PROJECTS') && matchedProjects.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><FolderGit2 className="w-3.5 h-3.5 text-indigo-600" /> Collaborative Projects ({matchedProjects.length})</span>
                    <button onClick={() => handleSelect('projects')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">View Project Hub →</button>
                  </p>
                  <div className="space-y-1.5">
                    {matchedProjects.slice(0, 3).map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => handleSelect('projects')}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                          <span className="ml-2 text-[11px] text-slate-500">Lead: {proj.creatorName}</span>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {(proj.skillsRequired || []).slice(0, 3).map((t, idx) => (
                              <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-100 text-[10px] font-medium text-slate-600">{t}</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          {proj.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SKILLS */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'SKILLS') && matchedSkills.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><FileCheck className="w-3.5 h-3.5 text-indigo-600" /> Skills & Evidence ({matchedSkills.length})</span>
                    <button onClick={() => handleSelect('skills')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">Skill Diagnostics →</button>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {matchedSkills.slice(0, 4).map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect('skills')}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900">{s.name}</span>
                          <p className="text-[10px] text-slate-500">{s.category} • Gap: {s.gapPercentage}%</p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                          {s.evidenceLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CAREERS */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'CAREERS') && matchedCareers.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5 text-indigo-600" /> Career Milestones ({matchedCareers.length})</span>
                    <button onClick={() => handleSelect('career-map')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">Explore Career Map →</button>
                  </p>
                  <div className="space-y-1.5">
                    {matchedCareers.slice(0, 3).map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect('career-map')}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900">{c.title}</span>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{c.description}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600">Level {c.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* JOBS & INTERNSHIPS */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'OPPORTUNITIES') && matchedOpps.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Opportunities & Jobs ({matchedOpps.length})</span>
                    <button onClick={() => handleSelect('opportunities')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">Fast Match →</button>
                  </p>
                  <div className="space-y-1.5">
                    {matchedOpps.slice(0, 3).map((o) => (
                      <div
                        key={o.id}
                        onClick={() => handleSelect('opportunities')}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900">{o.title}</span>
                          <p className="text-[11px] text-slate-500">{o.companyName} • {o.stipendOrSalary} • {o.location}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {o.matchScore}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INSTITUTIONS / COLLEGES */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'INSTITUTIONS') && matchedInstitutions.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> Institutions & Colleges ({matchedInstitutions.length})</span>
                    <button onClick={() => handleSelect('institutions')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">Audit Intelligence →</button>
                  </p>
                  <div className="space-y-1.5">
                    {matchedInstitutions.slice(0, 3).map((inst) => (
                      <div
                        key={inst.id}
                        onClick={() => handleSelect('institutions')}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="text-xs font-bold text-slate-900 block truncate">{inst.name}</span>
                          <p className="text-[11px] text-slate-500 truncate">{inst.location}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-indigo-600">{inst.industryAlignment}%</span>
                          <span className="block text-[9px] text-slate-400 uppercase">Alignment</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STARTUPS */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'STARTUPS') && matchedStartups.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Rocket className="w-3.5 h-3.5 text-amber-600" /> Startups & Ventures ({matchedStartups.length})</span>
                    <button onClick={() => handleSelect('startups')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">Startups View →</button>
                  </p>
                  <div className="space-y-1.5">
                    {matchedStartups.slice(0, 3).map((st) => (
                      <div
                        key={st.id}
                        onClick={() => handleSelect('startups')}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900">{st.ideaTitle}</span>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{st.pitch}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                          {st.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MENTORS */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'MENTORS') && matchedMentors.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-indigo-600" /> Mentors & Guides ({matchedMentors.length})</span>
                    <button onClick={() => handleSelect('mentors')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">Mentors Directory →</button>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {matchedMentors.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleSelect('mentors')}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-slate-900 truncate block">{m.name}</span>
                          <p className="text-[10px] text-slate-500 truncate">{m.role} at {m.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COURSES & LEARNING */}
              {(activeCategoryFilter === 'ALL' || activeCategoryFilter === 'LEARNING') && matchedLearning.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-600" /> Courses & Resources ({matchedLearning.length})</span>
                    <button onClick={() => handleSelect('learning')} className="text-indigo-600 hover:underline cursor-pointer text-[11px]">Learning Hub →</button>
                  </p>
                  <div className="space-y-1.5">
                    {matchedLearning.slice(0, 3).map((l) => (
                      <div
                        key={l.id}
                        onClick={() => handleSelect('learning')}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900">{l.title}</span>
                          <p className="text-[11px] text-slate-500">{l.provider} • {l.duration}</p>
                        </div>
                        <span className="text-xs font-semibold text-indigo-600">{l.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            Universal Search indexed across verified Rayalaseema ecosystem
          </span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
