import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Users,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowRight,
  MoreVertical,
  X,
  FileCheck,
  Building2,
  MapPin,
  Calendar,
  AlertCircle,
  Sparkles,
  Award,
  Send,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FastRecruitmentRequirement } from '../../types';

interface PipelineCandidate {
  id: string;
  name: string;
  roleTitle: string;
  college: string;
  matchScore: number;
  stage: 'APPLIED' | 'SCREENING' | 'SHORTLISTED' | 'INTERVIEW' | 'SELECTED' | 'OFFER' | 'HIRED';
  verifiedSkills: string[];
  appliedDate: string;
  recruiterNotes: string;
}

const initialPipeline: PipelineCandidate[] = [
  {
    id: 'pipe-1',
    name: 'Karthik Peetla',
    roleTitle: 'Junior Full Stack Developer',
    college: 'SSBN Autonomous College, Anantapur',
    matchScore: 94,
    stage: 'INTERVIEW',
    verifiedSkills: ['React', 'TypeScript', 'Node.js', 'Git'],
    appliedDate: '2026-09-02',
    recruiterNotes: 'Code sandbox defense passed with 94% proctored score. Architectural viva scheduled.'
  },
  {
    id: 'pipe-2',
    name: 'Swetha N.',
    roleTitle: 'React Frontend Intern',
    college: 'JNTUA College of Engineering, Anantapur',
    matchScore: 88,
    stage: 'SCREENING',
    verifiedSkills: ['HTML/CSS', 'JavaScript', 'React'],
    appliedDate: '2026-09-04',
    recruiterNotes: 'Reviewed portfolio GitHub repository; pending API state management verification.'
  },
  {
    id: 'pipe-3',
    name: 'B. Rajesh Naik',
    roleTitle: 'Backend API Developer',
    college: 'SSBN Autonomous College, Anantapur',
    matchScore: 78,
    stage: 'APPLIED',
    verifiedSkills: ['Python', 'SQL', 'FastAPI'],
    appliedDate: '2026-09-05',
    recruiterNotes: 'Application received via 48H Fast Match queue.'
  },
  {
    id: 'pipe-4',
    name: 'Ananya Sharma',
    roleTitle: 'Full Stack Engineering Fellow',
    college: 'JNTUA College of Engineering, Anantapur',
    matchScore: 98,
    stage: 'OFFER',
    verifiedSkills: ['React', 'Python', 'Docker', 'REST APIs'],
    appliedDate: '2026-08-25',
    recruiterNotes: 'Formal offer released: ₹24,000 stipend + full-time pre-placement offer.'
  },
  {
    id: 'pipe-5',
    name: 'V. Sai Tharun',
    roleTitle: 'IoT Telemetry Technician',
    college: 'SSBN Autonomous College, Anantapur',
    matchScore: 85,
    stage: 'SELECTED',
    verifiedSkills: ['Embedded C', 'Microcontrollers', 'Sensors'],
    appliedDate: '2026-08-30',
    recruiterNotes: 'Passed on-site hardware diagnosis test at Tadipatri facility.'
  },
  {
    id: 'pipe-6',
    name: 'G. Mounika',
    roleTitle: 'Junior Data Analyst',
    college: 'SSBN Autonomous College, Anantapur',
    matchScore: 91,
    stage: 'HIRED',
    verifiedSkills: ['SQL', 'Advanced Excel', 'Tally Prime'],
    appliedDate: '2026-08-15',
    recruiterNotes: 'Onboarded to Rayalaseema Tech Systems commercial billing team.'
  }
];

export const IndustryHiringModule: React.FC = () => {
  const { fastRequirements, addFastRequirement, showToast } = useApp();

  type HiringSubTab = 'pipeline' | 'requirements' | 'create';
  const [hiringSubTab, setHiringSubTab] = useState<HiringSubTab>('pipeline');
  const [pipeline, setPipeline] = useState<PipelineCandidate[]>(initialPipeline);
  const [filterRole, setFilterRole] = useState<string>('ALL');

  // Form State for "Create New Requirement"
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('Core Engineering');
  const [jobType, setJobType] = useState<'Full-time' | 'Part-time' | 'Internship' | 'Apprenticeship' | 'Contract'>('Full-time');
  const [location, setLocation] = useState('Anantapur (Hybrid)');
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'Offline'>('Hybrid');
  const [salaryRange, setSalaryRange] = useState('₹22,000 - ₹30,000 / month');
  const [requiredEducation, setRequiredEducation] = useState('B.Sc / B.Tech / BCA / MCA in Computer Science or allied branches');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, Tailwind CSS, Git');
  const [minSkillLevel, setMinSkillLevel] = useState<'Basic' | 'Intermediate' | 'Advanced'>('Basic');
  const [experienceRequired, setExperienceRequired] = useState('Entry-Level / 0-1 Years (Students Welcome)');
  const [urgency, setUrgency] = useState<'IMMEDIATE' | '7_DAYS' | '15_DAYS' | 'INTERNSHIP' | 'PART_TIME'>('IMMEDIATE');
  const [openingsCount, setOpeningsCount] = useState<number>(3);
  const [applicationDeadline, setApplicationDeadline] = useState('2026-10-15');
  const [description, setDescription] = useState(
    'Looking for motivated regional student engineers with demonstrated practical coding ability. Zero emphasis on rote learning; evaluation conducted purely on working GitHub code sandboxes and architectural viva defense.'
  );

  const STAGES: PipelineCandidate['stage'][] = [
    'APPLIED',
    'SCREENING',
    'SHORTLISTED',
    'INTERVIEW',
    'SELECTED',
    'OFFER',
    'HIRED'
  ];

  const handleStageMove = (candId: string, newStage: PipelineCandidate['stage']) => {
    setPipeline(prev =>
      prev.map(c => (c.id === candId ? { ...c, stage: newStage } : c))
    );
    showToast(`Candidate moved to ${newStage} stage.`);
  };

  const handleUpdateNotes = (candId: string, notes: string) => {
    setPipeline(prev =>
      prev.map(c => (c.id === candId ? { ...c, recruiterNotes: notes } : c))
    );
  };

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    const parsedSkills = skillsInput.split(',').map((s, idx) => ({
      skillName: s.trim(),
      isRequired: idx < 2,
      minEvidenceLevel: (idx === 0 ? 'PRACTICAL_TEST_PASSED' : 'VERIFIED_PROJECT') as any
    }));

    addFastRequirement({
      companyName: 'Rayalaseema Tech Systems',
      roleTitle: jobTitle,
      hiringUrgency: urgency,
      location: `${location} • ${workMode}`,
      stipendOrSalary: salaryRange,
      experienceLevel: experienceRequired,
      skillsRequired: parsedSkills
    });

    setJobTitle('');
    setHiringSubTab('requirements');
    showToast(`Hiring requirement "${jobTitle}" created and published to Fast Match!`);
  };

  const filteredPipeline = filterRole === 'ALL'
    ? pipeline
    : pipeline.filter(c => c.roleTitle.toLowerCase().includes(filterRole.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setHiringSubTab('pipeline')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hiringSubTab === 'pipeline' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Hiring Pipeline Funnel ({pipeline.length})
          </button>
          <button
            onClick={() => setHiringSubTab('requirements')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hiringSubTab === 'requirements' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Open Job Postings ({fastRequirements.length})
          </button>
          <button
            onClick={() => setHiringSubTab('create')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hiringSubTab === 'create' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            + Post New Requirement
          </button>
        </div>

        {hiringSubTab === 'pipeline' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Filter Role:</span>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-2.5 py-1 rounded-xl border border-slate-200 bg-white text-xs font-bold"
            >
              <option value="ALL">All Roles</option>
              {fastRequirements.map(r => (
                <option key={r.id} value={r.roleTitle}>{r.roleTitle}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 1. VISUAL 7-STAGE HIRING PIPELINE FUNNEL                              */}
      {/* ===================================================================== */}
      {hiringSubTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-1">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Full Lifecycle Recruiter Pipeline Funnel</span>
            </h2>
            <p className="text-xs text-slate-500">
              Advance candidates from application through screening, interview, and formal offer. Every action updates the candidate's verified record.
            </p>
          </div>

          {/* Kanban / Horizontal Funnel Columns */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 overflow-x-auto pb-4">
            {STAGES.map((stg) => {
              const inStage = filteredPipeline.filter(c => c.stage === stg);
              return (
                <div key={stg} className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/80 space-y-3 min-w-[210px] md:min-w-0">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                      {stg.replace(/_/g, ' ')}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold flex items-center justify-center">
                      {inStage.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {inStage.length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic text-center py-4">No candidates</p>
                    ) : (
                      inStage.map((cand) => (
                        <div key={cand.id} className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs space-y-2 hover:border-indigo-300 transition-all text-xs">
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-slate-900 leading-tight block">{cand.name}</span>
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-1 rounded shrink-0">
                              {cand.matchScore}%
                            </span>
                          </div>

                          <p className="text-[10px] text-slate-500 truncate">{cand.roleTitle}</p>
                          <p className="text-[9px] text-slate-400 truncate">{cand.college}</p>

                          <div className="flex flex-wrap gap-0.5">
                            {(cand.verifiedSkills || []).slice(0, 3).map((sk, idx) => (
                              <span key={idx} className="text-[9px] bg-slate-100 text-slate-700 px-1 py-0.2 rounded">
                                {sk}
                              </span>
                            ))}
                          </div>

                          {/* Recruiter Notes Input */}
                          <div className="pt-1 border-t border-slate-100">
                            <input
                              type="text"
                              value={cand.recruiterNotes}
                              onChange={(e) => handleUpdateNotes(cand.id, e.target.value)}
                              placeholder="Recruiter notes..."
                              className="w-full text-[10px] px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50/50 text-slate-600 focus:bg-white"
                            />
                          </div>

                          {/* Stage Transition Selector */}
                          <div className="pt-1 flex items-center justify-between">
                            <select
                              value={cand.stage}
                              onChange={(e) => handleStageMove(cand.id, e.target.value as any)}
                              className="w-full text-[10px] font-bold px-1.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-pointer"
                            >
                              {STAGES.map((s) => (
                                <option key={s} value={s}>Move to {s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. OPEN JOB REQUIREMENTS LIST                                         */}
      {/* ===================================================================== */}
      {hiringSubTab === 'requirements' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {fastRequirements.map((req) => (
              <div key={req.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">{req.roleTitle}</h3>
                    <p className="text-xs text-slate-500">{req.companyName} • {req.location}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800">
                    {req.hiringUrgency}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Offered Stipend/Salary</span>
                    <span className="font-bold text-emerald-700 text-xs">{req.stipendOrSalary}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Required Level</span>
                    <span className="font-bold text-slate-700 text-xs">{req.experienceLevel || 'Entry-Level'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Required Minimum Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(req.skillsRequired || []).map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {sk.skillName} • {sk.minEvidenceLevel}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Status: Active in Fast Match Feed</span>
                  <button
                    onClick={() => {
                      setFilterRole(req.roleTitle);
                      setHiringSubTab('pipeline');
                    }}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Candidates in Pipeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. POST NEW REQUIREMENT FORM (COMPLETE 14-FIELD SPECIFICATION)        */}
      {/* ===================================================================== */}
      {hiringSubTab === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs max-w-3xl mx-auto space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" />
              <span>Post New Industry Hiring Requirement</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify your real technical requirements. SkillBridge AI will match verified student credentials without requiring arbitrary course completions.
            </p>
          </div>

          <form onSubmit={handleCreateRequirement} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Junior React Frontend Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Core SaaS Product Engineering"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Work Mode</label>
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Offline">On-Site / Offline</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="IMMEDIATE">Immediate (48H Fast Match)</option>
                  <option value="7_DAYS">7 Days Sprint</option>
                  <option value="15_DAYS">15 Days Standard</option>
                  <option value="INTERNSHIP">Semester Internship</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Collectorate Road, Anantapur"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Offered Compensation / Stipend</label>
                <input
                  type="text"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  placeholder="e.g. ₹20,000 / month"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma separated) *</label>
              <input
                type="text"
                required
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="e.g. React, TypeScript, Tailwind CSS, Git"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                The first 2 skills will be set as mandatory minimum requirements.
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Minimum Skill Level</label>
                <select
                  value={minSkillLevel}
                  onChange={(e) => setMinSkillLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Basic">Basic (Syntax & Fundamentals)</option>
                  <option value="Intermediate">Intermediate (Real Projects)</option>
                  <option value="Advanced">Advanced (Production Ready)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Number of Openings</label>
                <input
                  type="number"
                  min={1}
                  value={openingsCount}
                  onChange={(e) => setOpeningsCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Application Deadline</label>
                <input
                  type="date"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Detailed Description & Candidate Expectations</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setHiringSubTab('requirements')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Publish Requirement to Fast Match</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
