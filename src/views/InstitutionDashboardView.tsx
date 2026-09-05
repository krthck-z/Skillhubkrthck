import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  TrendingUp,
  Award,
  Users,
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BarChart3,
  Search,
  BookOpen,
  Filter,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { initialStudentDirectory } from '../data/studentProjectsData';
import { StudentPublicProfileModal } from '../components/modals/StudentPublicProfileModal';
import { StudentDirectoryItem } from '../types';

export const InstitutionDashboardView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentDirectoryItem | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportCompleteModal, setExportCompleteModal] = useState(false);

  const collegeInfo = {
    name: 'Sri Sai Baba National (SSBN) Autonomous Degree College',
    location: 'Court Road, Anantapur, Andhra Pradesh',
    accreditation: "NAAC Grade 'A' (CGPA 3.24) • Autonomous Status (UGC)",
    affiliatedTo: 'Sri Krishnadevaraya University (SKU)',
    totalStudents: 450,
    verifiedPlacementEligible: 310,
    activeRecruiterDrives: 14
  };

  const departments = [
    {
      id: 'bsc-cs',
      name: 'B.Sc Computer Science',
      enrolled: 180,
      avgReadiness: 78,
      verifiedSkillsPct: 82,
      topSkills: ['React', 'Python', 'SQL', 'Git']
    },
    {
      id: 'bca',
      name: 'Bachelor of Computer Applications (BCA)',
      enrolled: 120,
      avgReadiness: 82,
      verifiedSkillsPct: 88,
      topSkills: ['Java', 'Web Dev', 'Database Management', 'DSA']
    },
    {
      id: 'bcom-ca',
      name: 'B.Com Computer Applications',
      enrolled: 90,
      avgReadiness: 65,
      verifiedSkillsPct: 62,
      topSkills: ['Tally', 'Advanced Excel', 'Financial Modeling', 'SQL']
    },
    {
      id: 'bsc-electronics',
      name: 'B.Sc Electronics & IoT',
      enrolled: 60,
      avgReadiness: 71,
      verifiedSkillsPct: 69,
      topSkills: ['Arduino / ESP32', 'C Programming', 'Circuit PCB', 'Sensors']
    }
  ];

  const skillGapTrends = [
    { skill: 'React & Component Architecture', gapRate: 38, impact: 'High', recruiterDemand: 'Very High' },
    { skill: 'Cloud & Docker Containerization', gapRate: 52, impact: 'Medium', recruiterDemand: 'High' },
    { skill: 'SQL Schema Design & Normalization', gapRate: 24, impact: 'High', recruiterDemand: 'Critical' },
    { skill: 'Git Pull Requests & Code Reviews', gapRate: 31, impact: 'Medium', recruiterDemand: 'High' }
  ];

  const recruiterInterests = [
    { company: 'Rayalaseema Digital Media', roles: 'Junior Web Assistant, Frontend Intern', shortlistedCount: 8, status: 'Active Interviews' },
    { company: 'NovaSoft Cloud Labs', roles: 'React Developer (Sprint Batch)', shortlistedCount: 5, status: 'Sandbox Review' },
    { company: 'Anantapur Digital Infrastructure Hub', roles: 'IT Associate, Hardware Specialist', shortlistedCount: 6, status: 'Campus Testing' },
    { company: 'Kisan Mitra Agri-Tech AI', roles: 'Computer Vision Intern', shortlistedCount: 3, status: 'Offer Released' }
  ];

  const handleExportNAAC = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportCompleteModal(true);
      showToast('NAAC Criterion 5.1 Student Progression Report generated successfully!');
    }, 900);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* College Name, Badge & Quick Switch */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
              College & Institution Portal
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {collegeInfo.accreditation}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {collegeInfo.name}
          </h1>

          <p className="text-xs text-slate-500 font-medium">
            {collegeInfo.location} • Affiliated with {collegeInfo.affiliatedTo}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportNAAC}
            disabled={isExporting}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating Report...' : 'Export Accreditation / NAAC Report'}</span>
          </button>

          <button
            onClick={() => setActiveTab('institutions')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            All Anantapur Colleges
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Enrolled Undergraduates
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{collegeInfo.totalStudents}</span>
            <span className="text-xs text-slate-500">students</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Verified Placement Ready
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-700">{collegeInfo.verifiedPlacementEligible}</span>
            <span className="text-xs font-semibold text-emerald-600">69% batch</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
            Recruiter Scouting Drives
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-indigo-700">{collegeInfo.activeRecruiterDrives}</span>
            <span className="text-xs text-slate-500">companies</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
            Average Skill Readiness
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">76%</span>
            <span className="text-xs font-semibold text-emerald-600">+12% vs last sem</span>
          </div>
        </div>
      </div>

      {/* Department Analytics */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>Department Analytics</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified skill capability index broken down by college department
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{dept.name}</h3>
                  <span className="text-xs text-slate-500">{dept.enrolled} Enrolled Final & Pre-Final Students</span>
                </div>
                <span className="text-sm font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  {dept.avgReadiness}% Readiness
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Verified Practical Evidence Ratio</span>
                  <span className="font-bold text-slate-800">{dept.verifiedSkillsPct}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${dept.verifiedSkillsPct}%` }} />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {dept.topSkills.map((sk) => (
                  <span key={sk} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Readiness Distribution & Top Students */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Student Readiness Distribution */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span>Student Readiness Distribution</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Evidence tier breakdown across 450 evaluated candidates
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-700">Immediate Fast-Hire Ready (Tier 3 & 4)</span>
                <span className="text-slate-900">112 Students (25%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '25%' }} />
              </div>
              <p className="text-[11px] text-slate-500">Passed proctored sandbox or viva code defense</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-indigo-700">High Potential / Minor Gap (Tier 2)</span>
                <span className="text-slate-900">198 Students (44%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '44%' }} />
              </div>
              <p className="text-[11px] text-slate-500">Verified GitHub repository or accredited college project</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-amber-700">Foundational Bridge Stage (Tier 1)</span>
                <span className="text-slate-900">140 Students (31%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '31%' }} />
              </div>
              <p className="text-[11px] text-slate-500">Self-declared skills awaiting lab verification</p>
            </div>
          </div>
        </section>

        {/* Top Performing Students */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Top Performing Students</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Highest calibrated evidence scores in SSBN College
              </p>
            </div>
            <button
              onClick={() => setActiveTab('discover')}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Full Student Directory →
            </button>
          </div>

          <div className="space-y-2.5">
            {initialStudentDirectory.slice(0, 4).map((st) => (
              <div
                key={st.id}
                onClick={() => setSelectedStudentForModal(st)}
                className="p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/70 flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {st.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 truncate">{st.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{st.course} • {st.targetCareer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    {st.careerReadiness}%
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Skill Gap Trends in College & Recruiter Interest */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Skill Gap Trends */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>Skill Gap Trends in College</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Curricular areas where student test scores lag behind hiring requirements
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {skillGapTrends.map((g) => (
              <div key={g.skill} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">{g.skill}</h4>
                  <span className="text-[10px] text-slate-500">Recruiter Demand: {g.recruiterDemand}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-amber-700">{g.gapRate}% Batch Gap</span>
                  <span className="block text-[10px] text-slate-400">Bridge lab recommended</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recruiter Interest */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              <span>Active Recruiter Interest</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Companies actively reviewing SSBN student profiles on SkillBridge
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {recruiterInterests.map((rec) => (
              <div key={rec.company} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">{rec.company}</h4>
                  <p className="text-[11px] text-slate-500">{rec.roles}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                    {rec.shortlistedCount} Shortlisted
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-semibold mt-0.5">{rec.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ===================================================================== */}
      {/* 4. PLACEMENT TRACKING & CURRICULUM INTELLIGENCE                       */}
      {/* ===================================================================== */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Placement Metrics Matrix */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Placement Tracking Analytics</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified skill proof vs traditional self-reported offers
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Audit Verified
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="block text-2xl font-black text-slate-900">84%</span>
              <span className="text-[11px] font-semibold text-slate-500">Verified Placement</span>
              <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">+18% vs 2025</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="block text-2xl font-black text-slate-900">26d</span>
              <span className="text-[11px] font-semibold text-slate-500">Avg Time to Offer</span>
              <span className="block text-[10px] text-indigo-600 font-bold mt-0.5">Fast-track pipeline</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="block text-2xl font-black text-slate-900">62%</span>
              <span className="text-[11px] font-semibold text-slate-500">Regional Retention</span>
              <span className="block text-[10px] text-amber-600 font-bold mt-0.5">AP & Rayalaseema</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Local District Industry vs Metro Tech Cities:</span>
              <span className="font-bold text-slate-900">62% Rayalaseema / 38% Bengaluru & Hyd</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '62%' }} title="Regional Local 62%" />
              <div className="bg-indigo-500 h-full" style={{ width: '38%' }} title="Metro Hubs 38%" />
            </div>
            <p className="text-[11px] text-slate-400">
              Students equipped with verified practical code defense secured internships 14 days earlier than paper-resume peers.
            </p>
          </div>
        </section>

        {/* Curriculum Intelligence & Syllabus Gap Alerts */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Curriculum Intelligence</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                University syllabus vs live 2026 industry demand delta
              </p>
            </div>
            <button
              onClick={() => setActiveTab('faculty')}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Faculty Portal →
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span>Unit 4 Web Tech: Add Docker & CI/CD Deployment</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 bg-amber-200 rounded text-amber-900">High Priority</span>
              </div>
              <p className="text-amber-800 text-[11px]">
                89% of hiring recruiters in Rayalaseema require basic container workflow, not covered in standard 2023 syllabus.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1">
              <div className="flex items-center justify-between font-bold text-indigo-900">
                <span>Unit 2 Database Systems: Introduce PostgreSQL JSON & Supabase</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 bg-indigo-200 rounded text-indigo-900">Medium</span>
              </div>
              <p className="text-indigo-800 text-[11px]">
                Recruiters prioritize modern document-relational hybrid models over legacy MS Access tutorials.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500 text-[11px]">7 Faculty Members Active in FDPs</span>
              <button
                onClick={() => setActiveTab('faculty')}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Manage Faculty Exposure →
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Export Complete Dialog */}
      {exportCompleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  NAAC Criterion 5.1 Report Generated
                </h3>
                <p className="text-xs text-slate-500">
                  Official Student Progression & Skill Assessment Audit
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <p>
                <strong>Document:</strong> SSBN_NAAC_Criterion_5.1_SkillBridge_Audit_2026.pdf
              </p>
              <p>
                <strong>Summary:</strong> 450 student portfolios evaluated, 310 certified placement-ready with proctored practical test logs, 14 company MOUs logged.
              </p>
              <p className="text-[11px] text-slate-500">
                Meets UGC and Andhra Pradesh State Council of Higher Education (APSCHE) digital verification guidelines.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setExportCompleteModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close & Print Preview
              </button>
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
