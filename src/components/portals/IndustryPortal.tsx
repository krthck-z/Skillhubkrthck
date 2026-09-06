import React, { useState } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
  Zap,
  Layers,
  ChevronRight,
  Send,
  FileCheck,
  Calendar,
  MapPin,
  FileText,
  BarChart3,
  Settings,
  BookOpen,
  FolderGit2,
  Check,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FastRecruitmentRequirement, FastMatchCandidateComparison } from '../../types';
import { initialStudentDirectory } from '../../data/studentProjectsData';
import { StudentPublicProfileModal } from '../modals/StudentPublicProfileModal';
import { IndustryTalentModule } from '../industry/IndustryTalentModule';
import { IndustryHiringModule } from '../industry/IndustryHiringModule';
import { IndustryReportsModule } from '../industry/IndustryReportsModule';
import { IndustryTrainingModule } from '../industry/IndustryTrainingModule';

export const IndustryPortal: React.FC = () => {
  const {
    activeTab,
    fastRequirements,
    addFastRequirement,
    candidateComparisons,
    toggleCandidateShortlist,
    hireCandidate,
    industryHiringOpportunities,
    applyToIndustryOpportunity,
    toggleSaveIndustryOpportunity,
    showToast,
    setRole,
    setActiveTab
  } = useApp();

  type IndustryNavTab =
    | 'dashboard'
    | 'talent'
    | 'hiring'
    | 'reports'
    | 'training'
    | 'internships'
    | 'colleges'
    | 'projects'
    | 'network'
    | 'profile'
    | 'analytics'
    | 'settings';

  const [activeNav, setActiveNav] = useState<IndustryNavTab>('dashboard');

  // Synchronize internal activeNav with Navbar activeTab
  React.useEffect(() => {
    if (activeTab) {
      if (['dashboard', 'industry'].includes(activeTab)) {
        setActiveNav('dashboard');
      } else if (['talent', 'fast-match', 'talent-search'].includes(activeTab)) {
        setActiveNav('talent');
      } else if (['hiring', 'industry-hiring', 'pipeline'].includes(activeTab)) {
        setActiveNav('hiring');
      } else if (['reports', 'intelligence', 'analytics'].includes(activeTab)) {
        setActiveNav('reports');
      } else if (['training', 'train-students', 'train-faculty'].includes(activeTab)) {
        setActiveNav('training');
      } else if (['internships', 'student-internships'].includes(activeTab)) {
        setActiveNav('internships');
      } else if (['colleges', 'institutions', 'college-mou'].includes(activeTab)) {
        setActiveNav('colleges');
      } else if (['projects', 'problem-statements'].includes(activeTab)) {
        setActiveNav('projects');
      } else if (['network', 'partners'].includes(activeTab)) {
        setActiveNav('network');
      } else if (['profile', 'company-profile'].includes(activeTab)) {
        setActiveNav('profile');
      } else if (['analytics'].includes(activeTab)) {
        setActiveNav('analytics');
      } else if (['settings'].includes(activeTab)) {
        setActiveNav('settings');
      }
    }
  }, [activeTab]);
  const [talentSubTab, setTalentSubTab] = useState<'search' | 'fast-match' | 'shortlist'>('fast-match');
  const [hiringSubTab, setHiringSubTab] = useState<'requirements' | 'pipeline' | 'interviews'>('requirements');
  const [trainingSubTab, setTrainingSubTab] = useState<'students' | 'faculty' | 'programs'>('students');

  // Fast Match Selected Requirement
  const [selectedReqId, setSelectedReqId] = useState<string>(fastRequirements[0]?.id || 'fast-req-1');
  const [isDefineModalOpen, setIsDefineModalOpen] = useState(false);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<any | null>(null);

  // Recruiter Search Engine state
  const [recruiterSearchSkill, setRecruiterSearchSkill] = useState('React');
  const [evidenceFilter, setEvidenceFilter] = useState<'ALL' | 'PRACTICAL' | 'OFFLINE'>('ALL');
  const [hiringCategoryFilter, setHiringCategoryFilter] = useState<string>('ALL');

  // New Requirement Form state
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('Rayalaseema Tech Systems');
  const [newLocation, setNewLocation] = useState('Anantapur / Hybrid');
  const [newUrgency, setNewUrgency] = useState<'IMMEDIATE' | '7_DAYS' | '15_DAYS' | 'INTERNSHIP' | 'PART_TIME'>('IMMEDIATE');
  const [newStipend, setNewStipend] = useState('₹22,000 / mo');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, Tailwind CSS, Git');

  // College Collaboration MoU Form
  const [selectedCollegeForMoU, setSelectedCollegeForMoU] = useState<string | null>(null);
  const [mouNotes, setMouNotes] = useState('');
  const [isMoUModalOpen, setIsMoUModalOpen] = useState(false);

  const selectedRequirement = fastRequirements.find((r) => r.id === selectedReqId) || fastRequirements[0];
  const candidatesForReq = (selectedRequirement && candidateComparisons[selectedRequirement.id]) || [];

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleTitle.trim()) return;

    const parsedSkills = skillsInput.split(',').map((s, idx) => ({
      skillName: s.trim(),
      isRequired: idx < 2,
      minEvidenceLevel: (idx === 0 ? 'PRACTICAL_TEST_PASSED' : 'VERIFIED_PROJECT') as any
    }));

    addFastRequirement({
      companyName: newCompanyName,
      roleTitle: newRoleTitle,
      hiringUrgency: newUrgency,
      location: newLocation,
      stipendOrSalary: newStipend,
      experienceLevel: 'Entry-Level / Pre-Screened',
      skillsRequired: parsedSkills
    });

    setIsDefineModalOpen(false);
    setNewRoleTitle('');
    showToast(`Hiring requirement for "${newRoleTitle}" created successfully! Candidates matched instantly.`);
  };

  const collegesList = [
    {
      id: 'ssbn-autonomous',
      name: 'Sri Sai Baba National (SSBN) Autonomous Degree College',
      location: 'Court Road, Anantapur',
      naacGrade: 'NAAC Grade A (CGPA 3.24)',
      type: 'Autonomous Degree & PG',
      studentsCount: 450,
      placementReadiness: '78% Average Readiness',
      branches: ['B.Sc Computer Science', 'BCA', 'B.Com CA', 'B.Sc Electronics'],
      mouStatus: 'PARTNERED_MOU'
    },
    {
      id: 'jntua-cea',
      name: 'JNTUA College of Engineering Anantapur',
      location: 'Sir Mokshagundam Vishweshwaraya Road, Anantapur',
      naacGrade: 'NAAC Grade A+ (Autonomous)',
      type: 'Premier Engineering University',
      studentsCount: 1200,
      placementReadiness: '84% Average Readiness',
      branches: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'AI & DS'],
      mouStatus: 'EXPLORING'
    },
    {
      id: 'sku-anantapur',
      name: 'Sri Krishnadevaraya University (SKU) Campus College',
      location: 'NH-44, Anantapur',
      naacGrade: 'NAAC Grade B++ (State University)',
      type: 'University College of Sciences',
      studentsCount: 850,
      placementReadiness: '72% Average Readiness',
      branches: ['MCA', 'M.Sc Computer Science', 'Biotechnology', 'Instrumentation'],
      mouStatus: 'EXPLORING'
    },
    {
      id: 'gecv-anantapur',
      name: 'Government Engineering College, Anantapur',
      location: 'Gooty Road, Anantapur',
      naacGrade: 'NBA Accredited',
      type: 'State Government Technical Institution',
      studentsCount: 600,
      placementReadiness: '76% Average Readiness',
      branches: ['Computer Science', 'Electronics & Comm', 'Electrical Engineering'],
      mouStatus: 'EXPLORING'
    }
  ];

  const pipelineCandidates = [
    { name: 'Karthik Peetla', role: 'Junior Full Stack Developer', college: 'SSBN College', stage: 'Screened & Interview Ready', match: '92%', evidence: 'Practical Defense Passed' },
    { name: 'Swetha Narayana', role: 'Frontend React Intern', college: 'JNTUA CEA', stage: 'Technical Assessment', match: '88%', evidence: 'Verified Live Project' },
    { name: 'B. Mahesh Reddy', role: 'Python Data Intern', college: 'SKU Campus', stage: 'Initial Shortlist', match: '81%', evidence: 'Proctored Offline Exam' },
    { name: 'K. Lakshmi Prasad', role: 'Hardware & IoT Technician', college: 'SSBN College', stage: 'Offer Released', match: '89%', evidence: 'AIC-SKU Lab Certified' }
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* ================================================================= */}
      {/* INDUSTRY PORTAL HERO & CONTEXT HEADER                             */}
      {/* ================================================================= */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Official Industry & Corporate Recruiter Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Industry Talent, Hiring & Collaboration Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hire pre-screened students with verified practical evidence, collaborate with regional colleges, train university faculty under NEP guidelines, and deploy industrial capstone projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsDefineModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Hiring Requirement</span>
            </button>
            <button
              onClick={() => {
                setActiveNav('colleges');
                showToast('Viewing affiliated regional colleges');
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Campus Drives & MoUs</span>
            </button>
          </div>
        </div>

        {/* Portal KPI Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block">Active Fast Requirements</span>
            <span className="text-xl font-black text-white font-mono">{fastRequirements.length} Active</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block">Matched Candidates</span>
            <span className="text-xl font-black text-emerald-400 font-mono">14 Verified</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block">Partner Colleges</span>
            <span className="text-xl font-black text-indigo-400 font-mono">{collegesList.length} Campuses</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 font-semibold block">Recruiter Trust Score</span>
            <span className="text-xl font-black text-amber-400 font-mono">98% Verified</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* INDUSTRY PORTAL NAVIGATION TABS                                   */}
      {/* ================================================================= */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-2xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'talent', label: 'Talent & Fast Match', icon: Users },
            { id: 'hiring', label: 'Hiring & Pipeline', icon: Briefcase },
            { id: 'reports', label: 'Intelligence & Reports', icon: BarChart3 },
            { id: 'training', label: 'Student & Faculty Training', icon: BookOpen },
            { id: 'internships', label: 'Internships', icon: Zap },
            { id: 'colleges', label: 'College Collaboration & MoUs', icon: GraduationCap },
            { id: 'projects', label: 'Industry Problem Statements', icon: FolderGit2 },
            { id: 'network', label: 'Industry Network', icon: Layers },
            { id: 'profile', label: 'Company Profile & Trust', icon: ShieldCheck },
            { id: 'settings', label: 'Workspace Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveNav(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 1. DASHBOARD VIEW                                                 */}
      {/* ================================================================= */}
      {activeNav === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Fast Match Candidate Quick Review */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>Instant Candidate Matches for {selectedRequirement.roleTitle}</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Matches evaluated against verified projects, practical code sandboxes, and viva examinations.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveNav('talent');
                    setTalentSubTab('fast-match');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Matches</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {candidatesForReq.slice(0, 3).map((candidate: any) => {
                  const candName = candidate.candidateName || candidate.studentName || 'Candidate';
                  const candId = candidate.id || candidate.studentId || 'cand-id';
                  const isShort = candidate.shortlisted ?? candidate.isShortlisted ?? false;
                  const isHired = candidate.hired ?? candidate.isHired ?? false;
                  const matchPercent = candidate.readinessScore ?? Math.round(((candidate.matchedCount || 1) / (candidate.totalRequiredCount || 1)) * 100);

                  return (
                    <div key={candId} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm shrink-0">
                          {candName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{candName}</span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {matchPercent}% Match
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{candidate.degree} • {candidate.institution}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => toggleCandidateShortlist(selectedRequirement.id, candId)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            isShort
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {isShort ? 'Shortlisted ✓' : 'Shortlist'}
                        </button>
                        <button
                          onClick={() => hireCandidate(selectedRequirement.id, candId)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer ${
                            isHired
                              ? 'bg-emerald-600'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {isHired ? 'Hired ✓' : 'Release Offer'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recruiter Hiring Pipeline Funnel */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span>Hiring Pipeline</span>
              </h2>
              <p className="text-xs text-slate-500">Active candidates moving through screening stages.</p>

              <div className="space-y-3 pt-2">
                {pipelineCandidates.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{c.name}</span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        {c.match}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{c.role} • {c.college}</p>
                    <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
                      <span className="text-emerald-700 font-semibold">{c.stage}</span>
                      <span>{c.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveNav('hiring');
                  setHiringSubTab('pipeline');
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                View Detailed Pipeline
              </button>
            </div>
          </div>

          {/* College Collaboration Overview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <span>College Collaboration & Campus Placement Hub</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Connect with accredited colleges in Rayalaseema to arrange campus drives and sponsor labs.
                </p>
              </div>
              <button
                onClick={() => setActiveNav('colleges')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore All Campuses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {collegesList.map((col) => (
                <div key={col.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{col.naacGrade}</span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{col.name}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{col.location}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700">{col.studentsCount} Students</span>
                    <button
                      onClick={() => {
                        setSelectedCollegeForMoU(col.name);
                        setIsMoUModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {col.mouStatus === 'PARTNERED_MOU' ? 'Active MoU ✓' : 'Propose MoU'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 2. TALENT & FAST MATCH VIEW                                       */}
      {/* ================================================================= */}
      {activeNav === 'talent' && (
        <IndustryTalentModule onOpenDefineModal={() => setIsDefineModalOpen(true)} />
      )}

      {/* ================================================================= */}
      {/* 3. HIRING & PIPELINE VIEW                                         */}
      {/* ================================================================= */}
      {activeNav === 'hiring' && (
        <IndustryHiringModule />
      )}

      {/* ================================================================= */}
      {/* 4. INDUSTRY INTELLIGENCE & REPORTS VIEW                           */}
      {/* ================================================================= */}
      {activeNav === 'reports' && (
        <IndustryReportsModule />
      )}

      {/* ================================================================= */}
      {/* 5. STUDENT & FACULTY TRAINING VIEW                                */}
      {/* ================================================================= */}
      {activeNav === 'training' && (
        <IndustryTrainingModule />
      )}

      {/* ================================================================= */}
      {/* 5. COLLEGE COLLABORATION & MOUS                                    */}
      {/* ================================================================= */}
      {activeNav === 'colleges' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>Regional College Collaboration Directory</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Explore accredited autonomous colleges, engineering campuses, and university departments in Anantapur district for formal MoUs and placement drives.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCollegeForMoU('All Partner Colleges');
                setIsMoUModalOpen(true);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            >
              + Propose Institutional MoU
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {collegesList.map((col) => (
              <div key={col.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{col.naacGrade}</span>
                    <h3 className="font-bold text-slate-900 text-base">{col.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{col.location}</span>
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shrink-0 ${
                    col.mouStatus === 'PARTNERED_MOU' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {col.mouStatus === 'PARTNERED_MOU' ? 'Partnered MoU ✓' : 'Available for MoU'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Placement Eligible</span>
                    <span className="font-bold text-slate-800">{col.studentsCount} Students</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Average Skill Readiness</span>
                    <span className="font-bold text-indigo-700">{col.placementReadiness}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">Key Disciplines Taught:</span>
                  <div className="flex flex-wrap gap-1">
                    {col.branches.map((b, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      showToast(`Requested campus drive dates from ${col.name} placement cell`);
                    }}
                    className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    Schedule Campus Drive
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCollegeForMoU(col.name);
                      setIsMoUModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send MoU Proposal →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 6. PROJECTS & PROBLEM STATEMENTS                                  */}
      {/* ================================================================= */}
      {activeNav === 'projects' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                <span>Industry Capstone Problem Statements</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Post real business challenge statements for university final-year capstone teams. Review submitted code repositories.
              </p>
            </div>
            <button
              onClick={() => showToast('Opened Post Problem Statement modal')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            >
              + Post Problem Statement
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                Active Capstone #IND-2026-08
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                Multilingual Speech-to-Text for Regional Groundnut Farmers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Build an offline-first mobile web module that translates regional spoken Telugu dialect queries into structured JSON for crop disease triage.
              </p>
              <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>3 Student Teams Submitted Solutions</span>
                <button
                  onClick={() => showToast('Reviewing student submissions for Capstone #IND-2026-08')}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Review Solutions →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase">
                Active Capstone #IND-2026-14
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                Micro-Invoicing & GST E-Way Bill Integration for Regional SMEs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Construct an open-source React & PostgreSQL template allowing local brick-and-mortar stores to generate standard GST E-Way bills with one-click print.
              </p>
              <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>2 Student Teams Submitted Solutions</span>
                <button
                  onClick={() => showToast('Reviewing student submissions for Capstone #IND-2026-14')}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Review Solutions →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 7. COMPANY PROFILE & RECRUITER VERIFICATION                        */}
      {activeNav === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 max-w-3xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Company Profile & Recruiter Credentials</h2>
              <p className="text-xs text-slate-500">Corporate verification ensures high student trust and verified recruiter badge.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Recruiter
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase text-[10px]">Company Name</span>
              <p className="font-bold text-slate-900 text-sm">Rayalaseema Tech Systems Pvt Ltd</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase text-[10px]">Corporate CIN / GST</span>
              <p className="font-mono text-slate-700">U72900AP2022PTC118942 • 37AAECR8812Q1Z9</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase text-[10px]">Official Head Office</span>
              <p className="text-slate-700">Technology Innovation Corridor, Anantapur, AP</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase text-[10px]">Industry Domain</span>
              <p className="text-slate-700">Enterprise Cloud Platforms & Agritech SaaS</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-2">
            <span className="font-bold text-indigo-900 block">Recruiter Access Level: Lead Talent Partner</span>
            <p className="text-slate-600 leading-relaxed">
              You are authorized to view full candidate contact information, schedule proctored online viva defenses, issue official SkillBridge verified offer letters, and execute college MoUs.
            </p>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 8. SETTINGS & OTHER TABS                                          */}
      {/* ================================================================= */}
      {['network', 'settings', 'internships'].includes(activeNav) && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs text-center space-y-3">
          <h3 className="text-base font-bold text-slate-900 capitalize">{activeNav} Module Active</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Configured for corporate team management, webhook notifications, and regional industry association partnerships.
          </p>
          <button
            onClick={() => setActiveNav('dashboard')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Return to Recruiter Dashboard
          </button>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: CREATE HIRING REQUIREMENT                                  */}
      {/* ================================================================= */}
      {isDefineModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Create Fast Hiring Requirement</h3>
                <p className="text-xs text-slate-500">Candidates will be matched immediately using proctored proof.</p>
              </div>
              <button
                onClick={() => setIsDefineModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Junior React Frontend Developer"
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hiring Urgency</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="IMMEDIATE">Immediate (24-48 Hrs)</option>
                    <option value="7_DAYS">Within 7 Days</option>
                    <option value="15_DAYS">Within 15 Days</option>
                    <option value="INTERNSHIP">Internship Cycle</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Offered Stipend / Salary</label>
                  <input
                    type="text"
                    value={newStipend}
                    onChange={(e) => setNewStipend(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location & Mode</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  placeholder="React, TypeScript, Tailwind, Git"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  First two skills will be marked as strictly mandatory with practical code verification.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDefineModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Post & Match Candidates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: PROPOSE MOU TO COLLEGE                                     */}
      {/* ================================================================= */}
      {isMoUModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Propose Institutional MoU</h3>
                <p className="text-xs text-slate-500">Initiate official industry collaboration with {selectedCollegeForMoU}.</p>
              </div>
              <button
                onClick={() => setIsMoUModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Institution</label>
                <input
                  type="text"
                  readOnly
                  value={selectedCollegeForMoU || ''}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">MoU Collaboration Scope</label>
                <div className="space-y-1.5 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                    <span>Exclusive Campus Placement Drives & Pre-Placement Offers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                    <span>Faculty Development Programs (FDPs) & Industrial Exposure</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                    <span>Industry Capstone Projects & Mentor Code Reviews</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-indigo-600" />
                    <span>Co-Sponsor Physical Hardware / AI Innovation Lab</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposed Term & Notes</label>
                <textarea
                  rows={3}
                  value={mouNotes}
                  onChange={(e) => setMouNotes(e.target.value)}
                  placeholder="e.g. Proposing a 3-year renewable MoU to hire up to 25 verified CS & BCA students annually..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMoUModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMoUModalOpen(false);
                    showToast(`MoU Proposal officially submitted to ${selectedCollegeForMoU} Placement Dean!`);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Submit Official MoU Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Public Profile Modal */}
      {selectedStudentForModal && (
        <StudentPublicProfileModal
          student={selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}
    </div>
  );
};
