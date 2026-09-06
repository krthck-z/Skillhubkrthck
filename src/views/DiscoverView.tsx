import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  Users,
  FolderGit2,
  Rocket,
  Building2,
  Award,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Filter,
  UserPlus,
  Mail,
  UserCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentDirectoryItem } from '../types';
import { initialStudentDirectory } from '../data/studentProjectsData';
import { StudentPublicProfileModal } from '../components/modals/StudentPublicProfileModal';
import { ProjectHubView } from './ProjectHubView';
import { StartupsView } from './StartupsView';
import { IndustryView } from './IndustryView';
import { OpportunitiesView } from './OpportunitiesView';

export const DiscoverView: React.FC = () => {
  const {
    profile,
    sendMail,
    showToast,
    setActiveTab,
    startOrOpenConversation,
    contacts,
    mentors,
    opportunities,
    startupIdeas
  } = useApp();

  // Active section
  const [activeSection, setActiveSection] = useState<'people' | 'projects' | 'startups' | 'companies' | 'mentors' | 'opportunities'>('people');

  // Student Search Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('ALL');
  const [collegeFilter, setCollegeFilter] = useState('ALL');
  const [careerGoalFilter, setCareerGoalFilter] = useState('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Student state
  const [students, setStudents] = useState<StudentDirectoryItem[]>(initialStudentDirectory);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<StudentDirectoryItem | null>(null);

  // Filtered students list
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      if (verifiedOnly && st.verifiedSkills.length === 0) return false;
      if (skillFilter !== 'ALL') {
        const hasSkill = st.verifiedSkills.includes(skillFilter) || st.unverifiedSkills.includes(skillFilter);
        if (!hasSkill) return false;
      }
      if (collegeFilter !== 'ALL' && !st.college.toLowerCase().includes(collegeFilter.toLowerCase())) {
        return false;
      }
      if (careerGoalFilter !== 'ALL' && st.targetCareer !== careerGoalFilter) {
        return false;
      }
      if (availabilityFilter !== 'ALL' && !st.availability.includes(availabilityFilter)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = st.name.toLowerCase().includes(q);
        const matchId = st.studentId.toLowerCase().includes(q);
        const matchCollege = st.college.toLowerCase().includes(q);
        const matchCourse = st.course.toLowerCase().includes(q);
        const matchLoc = st.location.toLowerCase().includes(q);
        const matchGoal = st.targetCareer.toLowerCase().includes(q);
        const matchSkills = [...st.verifiedSkills, ...st.unverifiedSkills].some((s) => s.toLowerCase().includes(q));
        const matchProjects = st.projectInterests.some((p) => p.toLowerCase().includes(q));
        const matchStartup = st.startupInterests.some((s) => s.toLowerCase().includes(q));
        return (
          matchName ||
          matchId ||
          matchCollege ||
          matchCourse ||
          matchLoc ||
          matchGoal ||
          matchSkills ||
          matchProjects ||
          matchStartup
        );
      }
      return true;
    });
  }, [students, verifiedOnly, skillFilter, collegeFilter, careerGoalFilter, availabilityFilter, searchQuery]);

  const handleToggleConnect = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const nextState = !s.isConnected;
          showToast(nextState ? `Connected with ${s.name}!` : `Disconnected from ${s.name}`);
          return { ...s, isConnected: nextState };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              SkillBridge Unified Discovery
            </span>
            <span className="text-xs text-slate-400">
              • Anantapur & Regional Talent Ecosystem
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Discover People, Projects, Startups & Opportunities
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Search verified peers across Rayalaseema colleges by demonstrated skills, explore active project teams, connect with student-founded ventures, and discover direct hiring pipelines.
          </p>

          {/* Section Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-3">
            {[
              { id: 'people', label: 'People / Students', icon: Users, count: filteredStudents.length },
              { id: 'projects', label: 'Project Hub', icon: FolderGit2, count: 4 },
              { id: 'startups', label: 'Startups & Ventures', icon: Rocket, count: startupIdeas.length },
              { id: 'companies', label: 'Companies & Talent', icon: Building2, count: 8 },
              { id: 'mentors', label: 'Mentors', icon: Award, count: mentors.length },
              { id: 'opportunities', label: 'Opportunities', icon: Briefcase, count: opportunities.length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-indigo-700 text-white' : 'bg-white/10 text-slate-300'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 1: PEOPLE / STUDENT DISCOVERY */}
      {activeSection === 'people' && (
        <div className="space-y-6">
          
          {/* Search & Multi-Filter Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Student ID, name, skill, verified skill, college, course, location, career goal..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Verified Skills Only</span>
                </label>
              </div>
            </div>

            {/* Sub-Filters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Filter by Skill</label>
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="ALL">All Skills</option>
                  <option value="React">React</option>
                  <option value="Python">Python</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="SQL">SQL</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Docker">Docker</option>
                  <option value="Git">Git</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">College</label>
                <select
                  value={collegeFilter}
                  onChange={(e) => setCollegeFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="ALL">All Institutions</option>
                  <option value="JNTUA">JNTUA Anantapur</option>
                  <option value="Sri Sai Baba">SSBN Autonomous</option>
                  <option value="SRIT">SRIT Rotarypuram</option>
                  <option value="Government College for Men">GCM Anantapur</option>
                  <option value="GATES">GATES Gooty</option>
                  <option value="PVKK">PVKK Institute</option>
                  <option value="SKU">SK University</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Career Goal</label>
                <select
                  value={careerGoalFilter}
                  onChange={(e) => setCareerGoalFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="ALL">All Careers</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="AI/ML Engineer">AI/ML Engineer</option>
                  <option value="IoT & Hardware Systems Engineer">IoT & Embedded</option>
                  <option value="Cloud & DevOps Engineer">Cloud & DevOps</option>
                  <option value="Backend & Database Engineer">Backend Engineer</option>
                  <option value="Data Analyst & BI Specialist">Data Analyst</option>
                  <option value="Product Manager & Growth Lead">Product / Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Availability</label>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="ALL">Any Availability</option>
                  <option value="Immediate">Immediate (15+ hrs)</option>
                  <option value="Part-Time">Part-Time (8-10 hrs)</option>
                  <option value="Weekends">Weekends Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudents.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Avatar & Name */}
                  <div className="flex items-start gap-3">
                    <img
                      src={st.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={st.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">{st.name}</h3>
                        <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700" title="Verified Skill Profile">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-indigo-600 truncate">{st.targetCareer}</p>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded inline-block">
                        {st.studentId}
                      </span>
                    </div>
                  </div>

                  {/* College & Location */}
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="line-clamp-1 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{st.college.split(',')[0]}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{st.location}</span>
                    </p>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {st.bio}
                  </p>

                  {/* Verified Skills chips */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Verified Skills ({(st.verifiedSkills || []).length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(st.verifiedSkills || []).slice(0, 4).map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {sk}
                        </span>
                      ))}
                      {(st.verifiedSkills || []).length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600">
                          +{(st.verifiedSkills || []).length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Readiness & Availability Indicator */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {st.availability.split(' ')[0]}
                    </span>
                    <span className="font-bold text-slate-700">
                      Readiness: <strong className="text-indigo-600">{st.careerReadiness}%</strong>
                    </span>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setSelectedStudentForProfile(st)}
                    className="w-full px-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      startOrOpenConversation({
                        participantName: st.name,
                        participantRole: 'student',
                        participantOrg: st.college,
                        initialMessage: `Hi ${st.name}, I reviewed your verified ${st.targetCareer} profile on SkillBridge and wanted to connect!`
                      });
                      setActiveTab('messages');
                    }}
                    className="w-full px-2 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Direct live chat"
                  >
                    <Send className="w-3 h-3 text-indigo-600" />
                    <span>Chat</span>
                  </button>

                  <button
                    onClick={() => handleToggleConnect(st.id)}
                    className={`w-full px-2 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      st.isConnected
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {st.isConnected ? (
                      <>
                        <UserCheck className="w-3 h-3 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No student profiles match your search</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your skill criteria or searching by a general keyword like 'Python', 'React', or 'JNTUA'.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSkillFilter('ALL');
                  setCollegeFilter('ALL');
                  setCareerGoalFilter('ALL');
                  setAvailabilityFilter('ALL');
                  setVerifiedOnly(false);
                }}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: PROJECT HUB */}
      {activeSection === 'projects' && (
        <ProjectHubView onOpenStudentProfile={(st) => setSelectedStudentForProfile(st)} />
      )}

      {/* SECTION 3: STARTUPS */}
      {activeSection === 'startups' && (
        <StartupsView />
      )}

      {/* SECTION 4: COMPANIES & TALENT */}
      {activeSection === 'companies' && (
        <IndustryView />
      )}

      {/* SECTION 5: MENTORS */}
      {activeSection === 'mentors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Verified Industry & Alumni Mentors</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">{mentors.length} Verified Mentors</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mentors.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={m.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                      alt={m.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900">{m.name}</h3>
                        {m.verified && (
                          <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-700" title="Alumni Verified">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-indigo-600 font-medium">{m.title || 'Industry Mentor'} • {m.company}</p>
                      <p className="text-[11px] text-slate-400">{m.industry} • {m.experienceYears}y exp</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{m.availability}</p>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mentorship Topics & Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {((m.topics && m.topics.length > 0 ? m.topics : m.skills) || []).map((spec, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      sendMail({
                        recipient: m.name,
                        recipientRole: `Mentor • ${m.company}`,
                        recipientHandle: `@${m.name.toLowerCase().replace(/\s+/g, '')}`,
                        subject: `Mentorship guidance request for ${profile.targetCareer}`,
                        body: `Hi ${m.name},\n\nI am Karthik Peetla, aspiring ${profile.targetCareer}. Would appreciate your advice on architecture and interview readiness.`,
                        category: 'MENTORSHIP',
                        priority: 'NORMAL'
                      });
                      showToast(`Mentorship booking inquiry sent to ${m.name}!`);
                    }}
                    className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Request 1:1 Guidance Session</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: OPPORTUNITIES */}
      {activeSection === 'opportunities' && (
        <OpportunitiesView />
      )}

      {/* PUBLIC PROFILE MODAL */}
      {selectedStudentForProfile && (
        <StudentPublicProfileModal
          student={selectedStudentForProfile}
          onClose={() => setSelectedStudentForProfile(null)}
          onInviteToProject={(st) => {
            setSelectedStudentForProfile(null);
            setActiveSection('projects');
            showToast(`Invited ${st.name} to project hub team!`);
          }}
          onInviteToStartup={(st) => {
            setSelectedStudentForProfile(null);
            setActiveSection('startups');
            showToast(`Invited ${st.name} to startup co-founding squad!`);
          }}
        />
      )}

    </div>
  );
};
