import React, { useState, useEffect } from 'react';
import {
  User,
  Award,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  MapPin,
  Building,
  Sparkles,
  ExternalLink,
  Trash2,
  RefreshCw,
  Clock,
  FolderGit2,
  FileText,
  Plus,
  Github,
  Globe,
  Printer,
  Share2,
  Check,
  Edit3,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProjectItem } from '../types';
import { StudentPublicProfileModal } from '../components/modals/StudentPublicProfileModal';
import { initialStudentDirectory } from '../data/studentProjectsData';
import { calculateProfileCompletion } from '../utils/profileCompletion';

export const ProfileView: React.FC = () => {
  const {
    profile,
    skills,
    studentProjects,
    addStudentProject,
    achievements,
    mailMessages,
    markMailAsRead,
    offlineBookings,
    setActiveOfflineModalSkill,
    setTargetCareer,
    showToast,
    activeTab,
    setActiveTab,
    updateProfile,
    addStartupExperience
  } = useApp();

  const profileStatus = calculateProfileCompletion(profile, skills, studentProjects, achievements);

  // Initialize subtab based on navigation context
  const [activeSubTab, setActiveSubTab] = useState<'PORTFOLIO' | 'RESUME' | 'EXPERIENCE' | 'ACHIEVEMENTS' | 'READINESS' | 'MAILBOX'>('PORTFOLIO');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isPublicProfileModalOpen, setIsPublicProfileModalOpen] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);

  // Edit details form state
  const [editName, setEditName] = useState(profile.name);
  const [editDegree, setEditDegree] = useState(profile.degree);
  const [editInstitution, setEditInstitution] = useState(profile.institution);
  const [editLocation, setEditLocation] = useState(profile.location);
  const [editEmail, setEditEmail] = useState(profile.email || 'karthik.patel@gecv.ac.in');
  const [editPhone, setEditPhone] = useState(profile.phone || '+91 98765 43210');
  const [editBio, setEditBio] = useState(profile.bio || 'Aspiring Full Stack Engineer passionate about scalable distributed systems, cloud architecture, and modern TypeScript frontend.');
  const [editEnrollmentNumber, setEditEnrollmentNumber] = useState(profile.enrollmentNumber || '22SSBN049');

  // Experience form state
  const [expRole, setExpRole] = useState('Full Stack Engineering Intern');
  const [expStartupName, setExpStartupName] = useState('FinPulse Tech Solutions');
  const [expDuration, setExpDuration] = useState('May 2025 – July 2025 (3 mos)');
  const [expSkills, setExpSkills] = useState('React, TypeScript, Express, PostgreSQL, Docker');

  useEffect(() => {
    setEditName(profile.name);
    setEditDegree(profile.degree);
    setEditInstitution(profile.institution);
    setEditLocation(profile.location);
  }, [profile]);

  // Sync with main navigation tab if directly routed
  useEffect(() => {
    if (activeTab === 'portfolio') {
      setActiveSubTab('PORTFOLIO');
    } else if (activeTab === 'achievements') {
      setActiveSubTab('ACHIEVEMENTS');
    }
  }, [activeTab]);

  // Project form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [newLiveUrl, setNewLiveUrl] = useState('');
  const [newSkills, setNewSkills] = useState('React, TypeScript, Tailwind CSS');
  const [newEvidenceLevel, setNewEvidenceLevel] = useState<StudentProjectItem['evidenceLevel']>('GITHUB_VERIFIED');

  const careerOptions = [
    'Full Stack Developer',
    'Backend Engineer',
    'AI & Machine Learning Engineer',
    'Cloud & DevOps Specialist'
  ];

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addStudentProject({
      title: newTitle,
      description: newDesc,
      skills: newSkills.split(',').map((s) => s.trim()),
      githubUrl: newGithub || 'https://github.com/karthikpeetla/sample-repo',
      liveUrl: newLiveUrl || undefined,
      evidenceLevel: newEvidenceLevel,
      vivaDefenseVerified: true,
      verifiedDate: new Date().toISOString().split('T')[0]
    });

    setIsAddProjectModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewGithub('');
    setNewLiveUrl('');
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Dynamic Profile Completion Status Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Student Profile Completion</span>
              <span
                className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md border ${
                  profileStatus.isComplete
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
              >
                {profileStatus.percentage}% Complete
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {profileStatus.isComplete
                ? 'All 7 verification areas completed! Your credentials and evidence are 100% recruiter-verified.'
                : `${profileStatus.completedCount} of 7 areas completed. Complete missing areas to achieve 100% verified status.`}
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-500">Overall Progress</span>
              <span className={profileStatus.isComplete ? 'text-emerald-700' : 'text-indigo-700'}>
                {profileStatus.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  profileStatus.isComplete ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${profileStatus.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 7 Required Areas Checklist */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          {profileStatus.areas.map((area) => (
            <div
              key={area.id}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                area.isComplete
                  ? 'bg-emerald-50/70 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50/70 text-rose-800 border-rose-200/80'
              }`}
            >
              {area.isComplete ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              )}
              <span>{area.label}</span>
              {!area.isComplete && (
                <span className="text-[10px] text-rose-600 font-bold ml-1">Incomplete</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Central Identity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              KP
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Evidence Verified
                </span>
                <button
                  onClick={() => setIsEditDetailsModalOpen(true)}
                  className="px-2.5 py-0.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Details</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {profile.degree} • {profile.institution}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}</span>
                <span>•</span>
                <span>Roll ID: <strong className="text-slate-700 font-mono">{profile.enrollmentNumber || '22SSBN049'}</strong></span>
                <span>•</span>
                <span>Batch: <strong>2022–2026</strong></span>
              </div>
            </div>
          </div>

          {/* Target Career Switcher */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5 self-stretch md:self-auto min-w-[240px]">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Active Target Career Goal:
            </span>
            <select
              value={profile.targetCareer}
              onChange={(e) => {
                setTargetCareer(e.target.value);
                showToast(`Target career updated to ${e.target.value}. Readiness recalibrated!`);
              }}
              className="w-full px-3 py-1.5 font-bold text-indigo-700 bg-white border border-indigo-200 rounded-xl outline-none cursor-pointer text-xs"
            >
              {careerOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 block">
              Recalculates skill gaps & readiness instantly.
            </span>
            <button
              onClick={() => setIsPublicProfileModalOpen(true)}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Recruiter Public Preview</span>
            </button>
          </div>
        </div>

        {/* Speciality Banner & Core Competencies */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-4 rounded-2xl border border-indigo-800 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">Verified Speciality</span>
            <div className="my-2">
              <h3 className="text-base font-black text-white">Full-Stack Web Development</h3>
              <p className="text-xs text-indigo-200 font-semibold">+ Generative AI Agent Integration</p>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono">Viva Defended & Authenticated</span>
          </div>

          <div className="md:col-span-2 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">What {profile.name} Is Good At</span>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Demonstrated high proficiency in building end-to-end responsive web apps with React 19, TypeScript, Express, and PostgreSQL. Capable of architecting RESTful services, integrating LLM completions with structured JSON outputs, and defending system trade-offs in live oral interviews.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-bold">React 19 Hooks</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-bold">TypeScript ES6+</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-bold">Relational Schema Design</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-bold">GenAI Prompt Engineering</span>
            </div>
          </div>
        </div>

        {/* Distinct Functional Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveSubTab('PORTFOLIO')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'PORTFOLIO'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Verified Portfolio ({studentProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('RESUME')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'RESUME'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Verified Resume</span>
          </button>

          <button
            onClick={() => setActiveSubTab('EXPERIENCE')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'EXPERIENCE'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience ({profile.startupExperiences?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ACHIEVEMENTS')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'ACHIEVEMENTS'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Achievements & Badges ({achievements.filter((a) => a.unlocked).length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('READINESS')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'READINESS'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Readiness Diagnostics ({profile.careerReadiness}%)
          </button>

          <button
            onClick={() => setActiveSubTab('MAILBOX')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'MAILBOX'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Mailbox ({mailMessages.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PORTFOLIO SUB-TAB: VERIFIED PROJECTS & REPOS                            */}
      {/* ========================================================================= */}
      {activeSubTab === 'PORTFOLIO' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Verified Projects & Code Proof
              </h2>
              <p className="text-xs text-slate-500">
                Recruiters examine commit timelines, working endpoints, and oral viva defenses—not empty claims.
              </p>
            </div>

            <button
              onClick={() => setIsAddProjectModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Project</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {studentProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 line-clamp-1">
                      {proj.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                      {proj.evidenceLevel.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(proj.skillsDemonstrated || proj.skills || []).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 text-[11px] font-semibold border border-indigo-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Viva Verified</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. RESUME SUB-TAB: VERIFIED EVIDENCE RESUME                                */}
      {/* ========================================================================= */}
      {activeSubTab === 'RESUME' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Official SkillBridge Verified Resume
              </span>
              <span className="text-xs text-slate-400">
                Sharable digital credential backed by proctored telemetry
              </span>
            </div>
            <button
              onClick={() => showToast('Resume exported as authenticated PDF with verification QR.')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Authenticated PDF</span>
            </button>
          </div>

          {/* Formatted Resume Preview */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6 max-w-4xl mx-auto">
            {/* Resume Header */}
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
                <p className="text-sm font-semibold text-indigo-700 mt-0.5">
                  Aspiring {profile.targetCareer} • Anantapur, Andhra Pradesh
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                  <span>karthik.peetla@skillbridge.edu</span>
                  <span>•</span>
                  <span>+91 98765 43210</span>
                  <span>•</span>
                  <span>Roll: {profile.enrollmentNumber}</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 text-right self-start sm:self-auto">
                <span className="text-[10px] font-black uppercase text-emerald-800 block">
                  SkillBridge Verified Passport
                </span>
                <span className="text-xs font-mono font-bold text-emerald-950">
                  #SB-AP-2026-9941
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">
                  100% Anti-Fraud Audit Stamped
                </span>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2 text-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Education</h3>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{profile.institution}</h4>
                  <p className="text-slate-600">{profile.degree}</p>
                </div>
                <span className="text-slate-500 font-mono">2022 – 2026 (CGPA: 8.4/10)</span>
              </div>
            </div>

            {/* Verified Skills Matrix */}
            <div className="space-y-2 text-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Verified Technical Proficiencies (Viva & Sandbox Passed)
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block">Frontend & UI Engineering</span>
                  <span className="text-slate-600 text-[11px]">React 19, TypeScript, JavaScript ES6+, Tailwind CSS, Responsive DOM</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block">Backend & APIs</span>
                  <span className="text-slate-600 text-[11px]">Node.js, Express, RESTful Design, Idempotency, SQL Queries</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block">Architecture & Testing</span>
                  <span className="text-slate-600 text-[11px]">Component Lifecycle, State Machines, Git Branching, Jest Unit Testing</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block">Regional & Domain Knowledge</span>
                  <span className="text-slate-600 text-[11px]">AgriTech Grounding, Mobile-first Offline PWA, Cloud Deployment</span>
                </div>
              </div>
            </div>

            {/* Verified Projects */}
            <div className="space-y-3 text-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Verified Projects (with Live Demos & Code Defense)
              </h3>
              {studentProjects.map((p) => (
                <div key={p.id} className="border-b border-slate-100 pb-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{p.title}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {p.evidenceLevel.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{p.description}</p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    Tech Stack: {(p.skillsDemonstrated || p.skills || []).join(', ')} • Repo: {p.githubUrl}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2.5 EXPERIENCE SUB-TAB: STARTUP & INDUSTRY WORK EXPERIENCE               */}
      {/* ========================================================================= */}
      {activeSubTab === 'EXPERIENCE' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Verified Work & Startup Experience
              </h2>
              <p className="text-xs text-slate-500">
                Internships, incubator venture contributions, and engineering roles verified by mentor or supervisor defense.
              </p>
            </div>

            <button
              onClick={() => setIsAddExperienceModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          </div>

          {(!profile.startupExperiences || profile.startupExperiences.length === 0) ? (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">No Verified Experience Added Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Adding verified startup experience or an engineering internship completes your Profile Experience milestone and unlocks 100% verified status.
              </p>
              <button
                onClick={() => setIsAddExperienceModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your Experience Now</span>
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {profile.startupExperiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">{exp.role}</h3>
                        <p className="text-xs font-semibold text-indigo-700">{exp.startupName}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                        {exp.evidenceStatus.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.duration}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Demonstrated Skills</span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skillsDemonstrated.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 text-[11px] font-semibold border border-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Proctored Proof Logged
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ACHIEVEMENTS SUB-TAB                                                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'ACHIEVEMENTS' && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl">{ach.badgeIcon}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ach.unlocked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {ach.unlocked ? 'Unlocked ✓' : 'In Progress'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-3">{ach.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ach.description}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                {ach.unlocked ? `Achieved on ${ach.unlockedAt}` : 'Complete verification requirements to unlock'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. READINESS DIAGNOSTICS SUB-TAB                                          */}
      {/* ========================================================================= */}
      {activeSubTab === 'READINESS' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Explainable Career Readiness: {profile.careerReadiness}%
                </h2>
                <p className="text-xs text-slate-500">
                  How SkillBridge AI calculates your hiring probability
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Calibrated against 100+ Hiring Partners
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              "Never show a hollow mystery score. Your {profile.careerReadiness}% readiness reflects: verified skills ({profile.readinessBreakdown.skills}%), objective assessments passed ({profile.readinessBreakdown.assessment}%), code sandbox defense ({profile.readinessBreakdown.practical}%), startup & real-world projects ({profile.readinessBreakdown.experience}%), oral viva communication ({profile.readinessBreakdown.communication}%), and current framework alignment ({profile.readinessBreakdown.industryAlignment}%)."
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">1. Skills Mastery</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.skills}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.skills}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">2. Objective Assessment</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.assessment}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.assessment}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">3. Practical Coding Sandbox</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.practical}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.practical}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">4. Real Startup Experience</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.experience}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.experience}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">5. Viva Oral Defense</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.communication}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.communication}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">6. Industry Alignment</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.industryAlignment}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.industryAlignment}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MAILBOX SUB-TAB                                                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'MAILBOX' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100">
          <div className="p-5 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-slate-900">Student Mailbox & Alerts</h2>
              <p className="text-xs text-slate-500">Notifications from hiring partners, offline centres, and startup teams</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {mailMessages.length} Messages
            </span>
          </div>

          {mailMessages.map((mail) => (
            <div
              key={mail.id}
              onClick={() => markMailAsRead(mail.id)}
              className={`p-5 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                !mail.isRead ? 'bg-indigo-50/40 hover:bg-indigo-50/70' : 'hover:bg-slate-50'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {!mail.isRead && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                  <span className="font-bold text-xs text-slate-900">{mail.sender}</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
                    {mail.category}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-900">{mail.subject}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{mail.body}</p>
              </div>

              <span className="text-[11px] text-slate-400 shrink-0 self-start sm:self-auto font-mono">
                {mail.date}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: ADD VERIFIED PROJECT */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Add Project to Verified Portfolio
                </h3>
              </div>
              <button
                onClick={() => setIsAddProjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 pt-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AgriSmart IoT Farmer Advisory Dashboard"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description & Impact *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe what the project does, real users, and key engineering challenges solved..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newLiveUrl}
                    onChange={(e) => setNewLiveUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Skills / Tech Stack
                  </label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Node.js"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Evidence Level
                  </label>
                  <select
                    value={newEvidenceLevel}
                    onChange={(e) => setNewEvidenceLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none cursor-pointer"
                  >
                    <option value="LIVE_PRODUCTION">Live in Production (Highest)</option>
                    <option value="GITHUB_VERIFIED">GitHub Verified Code</option>
                    <option value="COMPLETED">Completed Sandbox</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Save to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Public Recruiter Modal */}
      {isPublicProfileModalOpen && (
        <StudentPublicProfileModal
          student={initialStudentDirectory[0]}
          onClose={() => setIsPublicProfileModalOpen(false)}
        />
      )}

      {/* Edit Profile Details Modal */}
      {isEditDetailsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Edit Student Profile Details</h3>
              </div>
              <button
                onClick={() => setIsEditDetailsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editName.trim()) return;
                updateProfile({
                  name: editName.trim(),
                  degree: editDegree.trim(),
                  institution: editInstitution.trim(),
                  location: editLocation.trim(),
                  email: editEmail.trim(),
                  phone: editPhone.trim(),
                  bio: editBio.trim(),
                  enrollmentNumber: editEnrollmentNumber.trim()
                });
                setIsEditDetailsModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree & Branch</label>
                  <input
                    type="text"
                    required
                    value={editDegree}
                    onChange={(e) => setEditDegree(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">College / Institution</label>
                  <input
                    type="text"
                    required
                    value={editInstitution}
                    onChange={(e) => setEditInstitution(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location (City, State)</label>
                  <input
                    type="text"
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Enrollment Roll ID</label>
                  <input
                    type="text"
                    value={editEnrollmentNumber}
                    onChange={(e) => setEditEnrollmentNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Professional Bio / Elevator Pitch</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditDetailsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Save Profile Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {isAddExperienceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Add Verified Experience</h3>
              </div>
              <button
                onClick={() => setIsAddExperienceModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!expRole.trim() || !expStartupName.trim()) return;
                addStartupExperience({
                  role: expRole.trim(),
                  startupName: expStartupName.trim(),
                  duration: expDuration.trim(),
                  skillsDemonstrated: expSkills.split(',').map((s) => s.trim()).filter(Boolean),
                  evidenceStatus: 'VERIFIED_DEFENSE'
                });
                setIsAddExperienceModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Role / Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Stack Engineering Intern"
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Startup Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FinPulse Tech Solutions"
                  value={expStartupName}
                  onChange={(e) => setExpStartupName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Duration & Period</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. May 2025 – July 2025 (3 mos)"
                  value={expDuration}
                  onChange={(e) => setExpDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Demonstrated Skills (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, TypeScript, Express, PostgreSQL"
                  value={expSkills}
                  onChange={(e) => setExpSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Automatic Proctored Evidence Calibration
                </span>
                <p>Adding this experience satisfies the "Experience" profile milestone and automatically recalibrates your Career Readiness percentage.</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExperienceModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
