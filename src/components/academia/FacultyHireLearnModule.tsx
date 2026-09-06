import React, { useState } from 'react';
import {
  Briefcase,
  BookOpen,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  ExternalLink,
  Award,
  Users,
  Send,
  Calendar,
  X,
  GraduationCap,
  Sparkles,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { initialFacultyOpportunities } from '../../data/industryAcademiaData';
import { initialFacultyMembers } from '../../data/portalDetailedData';
import { FacultyOpportunityItem, FacultyMemberItem, FacultyOfflineTestRecord } from '../../types';
import { useApp } from '../../context/AppContext';

export const FacultyHireLearnModule: React.FC = () => {
  const { showToast } = useApp();

  type SubMode = 'hire' | 'learn' | 'offline-verification';
  const [activeSubMode, setActiveSubMode] = useState<SubMode>('hire');

  // Faculty Hire State
  const [hireSearch, setHireSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('ALL');
  const [isPostingHireReq, setIsPostingHireReq] = useState(false);
  const [hireReqRole, setHireReqRole] = useState('');
  const [hireReqDept, setHireReqDept] = useState('Computer Science');
  const [hireReqExp, setHireReqExp] = useState('5+ Years (Industry or Academic)');
  const [hireReqMode, setHireReqMode] = useState<'On-Site' | 'Hybrid' | 'Virtual'>('Hybrid');
  const [hireReqRemuneration, setHireReqRemuneration] = useState('₹45,000 / month');

  // Faculty Learn State
  const [learnCategory, setLearnCategory] = useState<'ALL' | 'ONLINE' | 'OFFLINE' | 'GOVT' | 'INDUSTRY'>('ALL');
  const [learnSearch, setLearnSearch] = useState('');
  const [enrolledProgramIds, setEnrolledProgramIds] = useState<string[]>([]);

  // Offline Verification Workflow State
  const [evalFacultyId, setEvalFacultyId] = useState(initialFacultyMembers[1]?.id || 'fac-2');
  const [testSkillName, setTestSkillName] = useState('Modern React & Component State');
  const [testType, setTestType] = useState<FacultyOfflineTestRecord['testType']>('LAB_PRACTICAL');
  const [testScore, setTestScore] = useState<number>(85);
  const [evalVerdict, setEvalVerdict] = useState<'PASS' | 'FAIL'>('PASS');
  const [evalNotes, setEvalNotes] = useState('Successfully completed interactive code sandbox defense and answered all state synchronization questions.');
  const [evaluatorName, setEvaluatorName] = useState('Dr. P. Ravindra Reddy (HOD)');
  const [evaluatorOrg, setEvaluatorOrg] = useState('SkillBridge Academic Inspection Board');

  const [verifiedFacultyRecords, setVerifiedFacultyRecords] = useState(initialFacultyMembers);

  // Qualified External Trainers / Visiting Faculty Pool
  const externalTrainersPool = [
    {
      id: 'train-ext-1',
      name: 'Dr. Sudhakar Rao',
      title: 'Visiting Professor of Cloud Systems',
      currentOrg: 'Ex-Infosys Principal Architect / CloudScale Labs',
      location: 'Bengaluru / Hybrid Anantapur',
      domains: ['Cloud Architecture', 'Kubernetes', 'Distributed Systems'],
      qualification: 'Ph.D. (IISc Bangalore)',
      experience: 18,
      rating: 4.9,
      availability: 'Available 2 Days / Week (Fridays & Saturdays)',
      expectedHonorarium: '₹4,000 / session'
    },
    {
      id: 'train-ext-2',
      name: 'Mrs. Aruna Devi',
      title: 'Adjunct Lecturer in Data Science',
      currentOrg: 'Rayalaseema Analytics Research Center',
      location: 'Tirupati / Anantapur',
      domains: ['Python Machine Learning', 'Data Visualization', 'SQL'],
      qualification: 'M.Tech (JNTUA), B.Tech (CSE)',
      experience: 9,
      rating: 4.7,
      availability: 'Immediate (Evenings & Weekends)',
      expectedHonorarium: '₹2,500 / session'
    },
    {
      id: 'train-ext-3',
      name: 'Er. C. Harikrishna',
      title: 'Industry IoT Specialist & Guest Instructor',
      currentOrg: 'Srinivasa Solar & Rural Telemetry',
      location: 'Anantapur / Tadipatri',
      domains: ['Embedded C', 'LoRa Telemetry', 'Agricultural Sensors'],
      qualification: 'B.Tech (ECE), MSME Certified Lead',
      experience: 12,
      rating: 4.8,
      availability: 'Available for 4-Week Intensive Labs',
      expectedHonorarium: '₹3,000 / session'
    }
  ];

  // Government & Industry Faculty Learning Opportunities
  const facultyLearningPrograms = [
    {
      id: 'fdp-gov-1',
      title: 'AICTE-ATAL Faculty Development Program on Next-Gen Generative AI',
      provider: 'AICTE Training & Learning Academy / JNTUA COE',
      category: 'GOVT',
      mode: 'Hybrid',
      duration: '2 Weeks (40 Hours)',
      cost: 'Free (Govt Funded / AICTE Sponsored)',
      certification: 'AICTE-ATAL National Master Trainer Certificate',
      deadline: '2026-09-30',
      industryRelevance: 'High — Aligns with UGC national framework for AI in higher education',
      eligibility: 'Faculty in CSE, IT, ECE, MCA departments'
    },
    {
      id: 'fdp-ind-2',
      title: 'Enterprise Cloud-Native Microservices & Docker Residency',
      provider: 'CloudScale Systems Corporate Labs',
      category: 'INDUSTRY',
      mode: 'Offline On-Campus',
      duration: '4 Weeks (Saturdays Only)',
      cost: 'Industry Sponsored (Zero Fee for Partner Colleges)',
      certification: 'CloudScale Industry-Verified Educator Credential',
      deadline: '2026-10-10',
      industryRelevance: 'Critical — Direct bridge for SSBN CS syllabus gap',
      eligibility: 'Computer Science and BCA faculty with basic Linux exposure'
    },
    {
      id: 'fdp-gov-3',
      title: 'SWAYAM-NPTEL Advanced Database Systems & Query Optimization',
      provider: 'IIT Kharagpur / Ministry of Education',
      category: 'GOVT',
      mode: 'Online (Self-Paced + Proctored Exam)',
      duration: '8 Weeks',
      cost: 'Free Courseware / ₹1,000 for Proctored In-Person Exam',
      certification: 'NPTEL Elite Silver / Gold Faculty Certification',
      deadline: '2026-09-25',
      industryRelevance: 'High — Core foundational curriculum standard',
      eligibility: 'Open to all higher education faculty'
    }
  ];

  const handlePostHireReq = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostingHireReq(false);
    showToast(`Faculty Hiring Notice for "${hireReqRole}" published to Academic Talent Network!`);
    setHireReqRole('');
  };

  const handleNominateFaculty = (progTitle: string) => {
    showToast(`Faculty nomination submitted for "${progTitle}". Confirmation sent to Principal Office.`);
  };

  const handleConductOfflineTest = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest: FacultyOfflineTestRecord = {
      id: `test-${Date.now()}`,
      skillName: testSkillName,
      testDate: new Date().toISOString().split('T')[0],
      evaluatorName,
      evaluatorOrg,
      testType,
      scorePercent: testScore,
      verdict: evalVerdict,
      feedbackNotes: evalNotes
    };

    setVerifiedFacultyRecords(prev =>
      prev.map(f => {
        if (f.id === evalFacultyId) {
          const isPass = evalVerdict === 'PASS';
          return {
            ...f,
            offlineVerificationStatus: isPass ? 'PRACTICALLY_VERIFIED' : 'RETEST_SCHEDULED',
            offlineTestRecords: [newTest, ...f.offlineTestRecords],
            skills: f.skills.map(sk =>
              sk.skillName.toLowerCase().includes(testSkillName.toLowerCase())
                ? {
                    ...sk,
                    level: isPass ? 'STRONG' : 'NEEDS_IMPROVEMENT',
                    proficiencyScore: testScore,
                    lastVerifiedDate: new Date().toISOString().split('T')[0],
                    evidenceSource: `Proctored Offline Test (${evaluatorOrg})`
                  }
                : sk
            )
          };
        }
        return f;
      })
    );

    showToast(
      evalVerdict === 'PASS'
        ? `Offline test PASSED! Faculty practically verified with official credential.`
        : `Offline test record saved. Status: Skill requires improvement / Retest scheduled.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Main Mode Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveSubMode('hire')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMode === 'hire'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>FACULTY HIRE (Visiting Professors & Trainers)</span>
          </button>

          <button
            onClick={() => setActiveSubMode('learn')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMode === 'learn'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>FACULTY LEARN (FDPs & Industry Immersion)</span>
          </button>

          <button
            onClick={() => setActiveSubMode('offline-verification')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMode === 'offline-verification'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Mandatory Offline Skill Verification Test</span>
          </button>
        </div>

        {activeSubMode === 'hire' && (
          <button
            onClick={() => setIsPostingHireReq(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Faculty Hiring Notice</span>
          </button>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 1. FACULTY HIRE MODULE                                                */}
      {/* ===================================================================== */}
      {activeSubMode === 'hire' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  <span>Discover & Hire Qualified Visiting Faculty & Industry Trainers</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hire adjunct professors, guest lecturers, and certified corporate engineers to bridge curriculum gaps and conduct practical lab modules.
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={hireSearch}
                  onChange={(e) => setHireSearch(e.target.value)}
                  placeholder="Search by name or subject domain..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalTrainersPool.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between hover:border-indigo-300 transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-black text-slate-900 text-base leading-tight">{trainer.name}</h4>
                      <p className="text-xs text-indigo-600 font-semibold">{trainer.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{trainer.currentOrg}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold shrink-0">
                      ★ {trainer.rating}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience:</span>
                      <strong className="text-slate-700">{trainer.experience} Years</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <strong className="text-slate-700">{trainer.location}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Honorarium:</span>
                      <strong className="text-emerald-700 font-bold">{trainer.expectedHonorarium}</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Domains of Specialization:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {trainer.domains.map((dom, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {dom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-xl border border-amber-100">
                    Availability: {trainer.availability}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => showToast(`Invited ${trainer.name} for institutional teaching interview.`)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invite to Course / Interview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. FACULTY LEARN MODULE (FDPS & INDUSTRY IMMERSION)                   */}
      {/* ===================================================================== */}
      {activeSubMode === 'learn' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>Faculty Learn: Verified FDPs, Certifications & Internships</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  AICTE-ATAL programs, SWAYAM-NPTEL master tracks, and industry sponsored summer sabbaticals.
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['ALL', 'GOVT', 'INDUSTRY'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setLearnCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      learnCategory === cat
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Programs' : cat === 'GOVT' ? 'Govt Schemes (AICTE/SWAYAM)' : 'Industry Sponsored'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {facultyLearningPrograms
              .filter(p => learnCategory === 'ALL' || p.category === learnCategory)
              .map((prog) => (
                <div key={prog.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4 hover:border-indigo-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-slate-900 text-base">{prog.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prog.category === 'GOVT' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {prog.category === 'GOVT' ? 'Govt Scheme' : 'Industry Sponsored'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{prog.provider} • Mode: {prog.mode} • Duration: {prog.duration}</p>
                    </div>

                    <button
                      onClick={() => handleNominateFaculty(prog.title)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      Nominate Faculty Member
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Certification Outcome</span>
                      <span className="font-bold text-indigo-700">{prog.certification}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Cost & Funding</span>
                      <span className="font-bold text-emerald-700">{prog.cost}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Application Deadline</span>
                      <span className="font-bold text-slate-700">{prog.deadline}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1">
                    <span><strong>Eligibility:</strong> {prog.eligibility}</span>
                    <span className="text-indigo-600 font-semibold">{prog.industryRelevance}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. MANDATORY OFFLINE FACULTY SKILL VERIFICATION WORKFLOW               */}
      {/* ===================================================================== */}
      {activeSubMode === 'offline-verification' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Mandatory Offline Practical Defense Protocol</span>
            </div>
            <h2 className="text-lg font-black text-emerald-950">
              In-Person Lab Practical & Viva Evaluation Manager
            </h2>
            <p className="text-xs text-emerald-800 max-w-3xl leading-relaxed">
              Following completion of any course or FDP, faculty must physically demonstrate their skills in an invigilated lab viva and coding defense before receiving the <strong>"Practically Verified"</strong> credential.
              If the score is below 70%, the system flags <strong>"Skill Requires Improvement"</strong> and schedules re-testing.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Interactive Evaluation Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Conduct Offline Faculty Practical Assessment</span>
              </h3>

              <form onSubmit={handleConductOfflineTest} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Faculty Member *</label>
                    <select
                      value={evalFacultyId}
                      onChange={(e) => setEvalFacultyId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                    >
                      {verifiedFacultyRecords.map(f => (
                        <option key={f.id} value={f.id}>{f.name} ({f.department})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Skill Being Evaluated *</label>
                    <input
                      type="text"
                      required
                      value={testSkillName}
                      onChange={(e) => setTestSkillName(e.target.value)}
                      placeholder="e.g. Modern React & Component State"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Assessment Type</label>
                    <select
                      value={testType}
                      onChange={(e) => setTestType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="LAB_PRACTICAL">Lab Coding Practical</option>
                      <option value="ORAL_VIVA">Architectural Oral Viva</option>
                      <option value="TEACHING_DEMO">Live Classroom Demo</option>
                      <option value="CODE_DEFENSE">Git Code Defense</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Score Percentage (0-100) *</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={testScore}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setTestScore(val);
                        setEvalVerdict(val >= 70 ? 'PASS' : 'FAIL');
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Evaluation Verdict</label>
                    <select
                      value={evalVerdict}
                      onChange={(e) => setEvalVerdict(e.target.value as any)}
                      className={`w-full px-3 py-2 rounded-xl border font-bold ${
                        evalVerdict === 'PASS' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      <option value="PASS">PASS (Practically Verified ✓)</option>
                      <option value="FAIL">FAIL (Skill Requires Improvement)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Lead Examiner / Evaluator</label>
                    <input
                      type="text"
                      value={evaluatorName}
                      onChange={(e) => setEvaluatorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Evaluator Organization</label>
                    <input
                      type="text"
                      value={evaluatorOrg}
                      onChange={(e) => setEvaluatorOrg(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Examiner Defense Feedback & Observations</label>
                  <textarea
                    rows={3}
                    value={evalNotes}
                    onChange={(e) => setEvalNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Record Official Offline Evaluation Result</span>
                </button>
              </form>
            </div>

            {/* Offline Test Verification Status Sidebar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Offline Verification Status</h4>
              <div className="space-y-3">
                {verifiedFacultyRecords.map(f => (
                  <div key={f.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{f.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        f.offlineVerificationStatus === 'PRACTICALLY_VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {f.offlineVerificationStatus.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{f.department}</p>
                    <p className="text-[10px] text-slate-400">
                      Tests Completed: {f.offlineTestRecords.length}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Faculty Hiring Notice Modal */}
      {isPostingHireReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">Post Faculty Hiring Notice</h3>
              <button onClick={() => setIsPostingHireReq(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostHireReq} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject / Role Title *</label>
                <input
                  type="text"
                  required
                  value={hireReqRole}
                  onChange={(e) => setHireReqRole(e.target.value)}
                  placeholder="e.g. Visiting Professor: Cloud & DevOps Lab"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={hireReqDept}
                  onChange={(e) => setHireReqDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mode</label>
                  <select
                    value={hireReqMode}
                    onChange={(e) => setHireReqMode(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-Site">On-Site (Offline)</option>
                    <option value="Virtual">Virtual / Remote</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Honorarium</label>
                  <input
                    type="text"
                    value={hireReqRemuneration}
                    onChange={(e) => setHireReqRemuneration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPostingHireReq(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
