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
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Send,
  Plus,
  X,
  FileCheck,
  Briefcase,
  Layers,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { initialStudentDirectory } from '../../data/studentProjectsData';
import { StudentPublicProfileModal } from '../modals/StudentPublicProfileModal';
import { StudentDirectoryItem, FacultyOpportunityItem } from '../../types';
import { FacultyIntelligenceModule } from '../academia/FacultyIntelligenceModule';
import { FacultyHireLearnModule } from '../academia/FacultyHireLearnModule';
import { AcademiaStudentDirectoryModule } from '../academia/AcademiaStudentDirectoryModule';
import { CurriculumGapModule } from '../academia/CurriculumGapModule';

export const AcademiaPortal: React.FC = () => {
  const { activeTab, setActiveTab, facultyOpportunities, applyToFacultyOpportunity, showToast } = useApp();

  type AcademiaNavTab =
    | 'dashboard'
    | 'faculty-dev'
    | 'industry-connect'
    | 'student-intelligence'
    | 'curriculum'
    | 'student-opps'
    | 'faculty-recruitment'
    | 'events'
    | 'research'
    | 'profile'
    | 'analytics';

  const [activeNav, setActiveNav] = useState<AcademiaNavTab>('dashboard');

  // Synchronize internal activeNav with Navbar activeTab
  React.useEffect(() => {
    if (activeTab) {
      if (['dashboard', 'academia', 'home'].includes(activeTab)) {
        setActiveNav('dashboard');
      } else if (['faculty-dev', 'faculty', 'fdp'].includes(activeTab)) {
        setActiveNav('faculty-dev');
      } else if (['industry-connect', 'partnerships'].includes(activeTab)) {
        setActiveNav('industry-connect');
      } else if (['student-intelligence', 'students', 'readiness'].includes(activeTab)) {
        setActiveNav('student-intelligence');
      } else if (['curriculum', 'skills', 'syllabus'].includes(activeTab)) {
        setActiveNav('curriculum');
      } else if (['student-opps', 'internships', 'jobs'].includes(activeTab)) {
        setActiveNav('student-opps');
      } else if (['faculty-recruitment', 'hire-faculty'].includes(activeTab)) {
        setActiveNav('faculty-recruitment');
      } else if (['events', 'hackathons'].includes(activeTab)) {
        setActiveNav('events');
      } else if (['research', 'consultancy'].includes(activeTab)) {
        setActiveNav('research');
      } else if (['profile', 'naac-reports', 'institution'].includes(activeTab)) {
        setActiveNav('profile');
      } else if (['analytics'].includes(activeTab)) {
        setActiveNav('analytics');
      }
    }
  }, [activeTab]);
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [facultyDevSubTab, setFacultyDevSubTab] = useState<'intelligence' | 'learn'>('intelligence');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentDirectoryItem | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportCompleteModal, setExportCompleteModal] = useState(false);

  // Faculty Nomination Modal State
  const [isNominateModalOpen, setIsNominateModalOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<FacultyOpportunityItem | null>(null);
  const [facultyName, setFacultyName] = useState('Dr. P. Ravindra Reddy');
  const [designation, setDesignation] = useState('Associate Professor & HOD');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [aicteId, setAicteId] = useState('FAC-AP-2024-8841');

  // Institution Meta
  const collegeInfo = {
    name: 'Sri Sai Baba National (SSBN) Autonomous Degree College',
    location: 'Court Road, Anantapur, Andhra Pradesh',
    accreditation: "NAAC Grade 'A' (CGPA 3.24) • Autonomous Status (UGC)",
    naacGrade: "Grade 'A' (CGPA 3.24)",
    ugcAutonomous: 'Autonomous Status (UGC 2024-2034)',
    affiliatedUniversity: 'Sri Krishnadevaraya University (SKU)',
    affiliatedTo: 'Sri Krishnadevaraya University (SKU)',
    aisheCode: 'C-28149',
    totalStudents: 450,
    verifiedPlacementEligible: 310,
    activeRecruiterDrives: 14,
    facultyCount: 38
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

  const curriculumAlignmentData = [
    { course: 'CS-301: Web Application Architecture', currentTech: 'HTML5, CSS, PHP (Legacy)', recommendation: 'Migrate to TypeScript, React 19 & Tailwind CSS', alignment: 'NEEDS_REVISION' },
    { course: 'CS-402: Database Management Systems', currentTech: 'Oracle SQL, Relational Algebra', recommendation: 'Include PostgreSQL, indexing & connection pools', alignment: 'PARTIAL' },
    { course: 'CS-504: Data Structures & Algorithms', currentTech: 'Arrays, Trees, Graphs, Sorting', recommendation: 'Add practical LeetCode/Proctored sandbox tests', alignment: 'STRONG' },
    { course: 'EC-303: Microcontrollers & Embedded Systems', currentTech: '8051 Microcontroller assembly', recommendation: 'Upgrade to ESP32 FreeRTOS & IoT MQTT Telemetry', alignment: 'NEEDS_REVISION' }
  ];

  const handleExportNAAC = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportCompleteModal(true);
      showToast('NAAC Criterion 5.1 Student Progression Report generated successfully!');
    }, 900);
  };

  const handleNominateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;
    applyToFacultyOpportunity(selectedOpp.id);
    setIsNominateModalOpen(false);
    showToast(`Nomination for ${facultyName} submitted for ${selectedOpp.title}!`);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* ================================================================= */}
      {/* ACADEMIA PORTAL HERO & ACCREDITATION HEADER                       */}
      {/* ================================================================= */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official University & College Administration Workspace (SIH-26044)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Academia, Faculty & Institutional Intelligence Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bridging academic syllabus with live enterprise hiring requirements. Track student skill gaps, sponsor NEP faculty corporate internships, align curriculum with industry, and generate automated NAAC Criterion 5.1 reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportNAAC}
              disabled={isExporting}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating NAAC Report...' : 'Export NAAC Report (Criterion 5.1)'}</span>
            </button>
            <button
              onClick={() => {
                setActiveNav('faculty-dev');
                showToast('Viewing Faculty Development Programs (FDPs)');
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Faculty FDPs & Internships</span>
            </button>
          </div>
        </div>

        {/* Institution Info & Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Campus Identity</span>
            <span className="font-bold text-white truncate block">{collegeInfo.name.split('(')[0]}</span>
            <span className="text-[10px] text-emerald-300 font-mono">AISHE: {collegeInfo.aisheCode}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Accreditation</span>
            <span className="font-bold text-amber-300 block">{collegeInfo.accreditation.split('•')[0]}</span>
            <span className="text-[10px] text-slate-400">Autonomous (UGC)</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Placement Eligible</span>
            <span className="text-lg font-black text-white font-mono">{collegeInfo.verifiedPlacementEligible} / {collegeInfo.totalStudents}</span>
            <span className="text-[10px] text-emerald-400 font-semibold block">68.8% Verified Ready</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Recruiter Drives</span>
            <span className="text-lg font-black text-indigo-400 font-mono">{collegeInfo.activeRecruiterDrives} Active</span>
            <span className="text-[10px] text-slate-400">Rayalaseema & Metro</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* ACADEMIA PORTAL NAVIGATION TABS                                  */}
      {/* ================================================================= */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-2xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'faculty-dev', label: 'Faculty Development (NEP)', icon: Award },
            { id: 'industry-connect', label: 'Industry Connect & MoUs', icon: Building2 },
            { id: 'student-intelligence', label: 'Student Intelligence & Skills', icon: Users },
            { id: 'curriculum', label: 'Curriculum & Alignment Engine', icon: BookOpen },
            { id: 'student-opps', label: 'Student Opportunities', icon: Briefcase },
            { id: 'faculty-recruitment', label: 'Faculty Recruitment', icon: GraduationCap },
            { id: 'events', label: 'Hackathons & Expos', icon: Sparkles },
            { id: 'research', label: 'Research & Consultancy', icon: Layers },
            { id: 'profile', label: 'College Profile & NAAC', icon: ShieldCheck },
            { id: 'analytics', label: 'Progression Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveNav(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
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
          {/* Department Breakdown Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{dept.name}</h3>
                  <span className="text-xs font-bold text-slate-400 font-mono">{dept.enrolled} Enrolled</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Readiness Score</span>
                    <span className="font-bold text-emerald-700 font-mono">{dept.avgReadiness}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${dept.avgReadiness}%` }} />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Top Verified Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {dept.topSkills.map((sk, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Diagnostic Gap Matrix & Placement Pipeline */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Real-time Skill Gap Diagnostics */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Institution-Wide Skill Gap Diagnostics</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Calculated against live recruiter requirements across 14 hiring drives.
                  </p>
                </div>
                <button
                  onClick={() => setActiveNav('curriculum')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Curriculum Fixes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                {skillGapTrends.map((trend, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{trend.skill}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                        {trend.gapRate}% Students Lacking
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Curriculum Impact: <strong>{trend.impact}</strong></span>
                      <span className="text-indigo-700 font-semibold">Demand: {trend.recruiterDemand}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement & Recruiter Engagement */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>Campus Hiring & Industry Engagements</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Corporate companies actively reviewing SSBN College student portfolios.
                  </p>
                </div>
                <button
                  onClick={() => setActiveNav('industry-connect')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Partners</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  { company: 'NovaSoft Cloud Labs', roles: 'React & Frontend Interns', count: 5, status: 'Interview Stage' },
                  { company: 'Rayalaseema Digital Media', roles: 'Web & Media Associates', count: 8, status: 'Shortlisted' },
                  { company: 'Kisan Mitra AgriTech AI', roles: 'Computer Vision Trainees', count: 3, status: 'Offers Released' },
                  { company: 'Anantapur Digital Support Hub', roles: 'Hardware & IoT Specialists', count: 6, status: 'Active Campus Test' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{item.company}</span>
                      <span className="text-[11px] text-slate-500">{item.roles}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold block">
                        {item.count} Students
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 2. FACULTY DEVELOPMENT (NEP) & INTELLIGENCE VIEW                  */}
      {/* ================================================================= */}
      {activeNav === 'faculty-dev' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFacultyDevSubTab('intelligence')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  facultyDevSubTab === 'intelligence'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Faculty Intelligence & Performance Monitoring
              </button>
              <button
                onClick={() => setFacultyDevSubTab('learn')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  facultyDevSubTab === 'learn'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Faculty Learn & NEP Immersion Track
              </button>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              NAAC & AICTE Cadre Performance Matrix
            </span>
          </div>

          {facultyDevSubTab === 'intelligence' ? (
            <FacultyIntelligenceModule />
          ) : (
            <FacultyHireLearnModule initialMode="learn" />
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* 3. CURRICULUM & ALIGNMENT ENGINE                                  */}
      {/* ================================================================= */}
      {activeNav === 'curriculum' && (
        <CurriculumGapModule />
      )}

      {/* ================================================================= */}
      {/* 4. STUDENT INTELLIGENCE & VERIFIED DIRECTORY                      */}
      {/* ================================================================= */}
      {activeNav === 'student-intelligence' && (
        <AcademiaStudentDirectoryModule />
      )}

      {/* ================================================================= */}
      {/* 5. INDUSTRY CONNECT & CORPORATE MOUS                             */}
      {/* ================================================================= */}
      {activeNav === 'industry-connect' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <span>Active Corporate MoUs & Industry Partnerships</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Formal bilateral agreements governing student internships, faculty industrial exposure, and placement pipelines.
              </p>
            </div>
            <button
              onClick={() => showToast('MoU Proposal workflow initiated with Industry Liaison cell')}
              className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
            >
              + Propose New Bilateral MoU
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                partner: 'Rayalaseema Tech Systems (Pvt. Ltd.)',
                scope: 'Full-Stack Software Engineering & Generative AI Lab',
                validUntil: 'August 2028 (3 Years Active)',
                internsHired: '38 Students',
                status: 'ACTIVE_MOU',
                contact: 'hr@rayalaseematech.com'
              },
              {
                partner: 'Kia Motors India Supplier Cluster (Penukonda)',
                scope: 'Industrial IoT, Automated Quality Inspection & Embedded Systems',
                validUntil: 'December 2027 (Renewable)',
                internsHired: '24 Students',
                status: 'ACTIVE_MOU',
                contact: 'collaborations@kia-supplierhub.org'
              },
              {
                partner: 'AP Innovation Society & AIC-SKU Incubation',
                scope: 'Student Entrepreneurship, IP Patent Filing & Seed Grants',
                validUntil: 'March 2029 (5 Years Active)',
                internsHired: '15 Incubated Teams',
                status: 'ACTIVE_MOU',
                contact: 'incubation@aic-sku.in'
              },
              {
                partner: 'Anantapur Renewable Energy & Solar Tech Consortium',
                scope: 'Green Tech SCADA, Grid Data Analytics & Electrical CAD',
                validUntil: 'November 2027',
                internsHired: '19 Students',
                status: 'ACTIVE_MOU',
                contact: 'training@rayalaseemasolar.in'
              }
            ].map((mou, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{mou.partner}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{mou.scope}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Active Bilateral MoU
                  </span>
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span>Tenure: {mou.validUntil}</span>
                  <span className="font-bold text-emerald-800">{mou.internsHired} Placed</span>
                </div>
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{mou.contact}</span>
                  <button
                    onClick={() => showToast(`Signed MoU Agreement PDF downloaded for ${mou.partner}`)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View Signed Agreement</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ================================================================= */}
      {/* 7. STUDENT OPPORTUNITIES BOARD                                   */}
      {/* ================================================================= */}
      {activeNav === 'student-opps' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-700" />
                <span>Placement Drives & Corporate Internships Allocation</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Active recruitment drives with pre-screened eligibility for 2025-2026 students.
              </p>
            </div>
            <button
              onClick={() => showToast('Bulk student verification certificates generated for placement drive')}
              className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
            >
              Issue Bulk College NOCs (310)
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                role: 'Junior Full Stack Developer (React / Node)',
                company: 'Rayalaseema Tech Systems',
                stipend: '₹22,000 / mo',
                eligibility: 'B.Sc CS / BCA • 75%+ Readiness',
                allocated: '42 Candidates Shortlisted'
              },
              {
                role: 'Embedded Firmware Intern',
                company: 'Kia Supplier Cluster Penukonda',
                stipend: '₹18,500 / mo',
                eligibility: 'B.Sc Electronics / CS • Level 2+',
                allocated: '28 Candidates Shortlisted'
              },
              {
                role: 'Data Analyst & BI Intern',
                company: 'Anantapur Solar Analytics Consortium',
                stipend: '₹20,000 / mo',
                eligibility: 'B.Sc Statistics / Computer Applications',
                allocated: '19 Candidates Shortlisted'
              },
              {
                role: 'Graduate Engineering Trainee (GET)',
                company: 'L&T Construction Technology',
                stipend: '₹25,000 / mo',
                eligibility: 'Physics / Mathematics / Civil Cad',
                allocated: '31 Candidates Shortlisted'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.role}</h4>
                    <p className="text-xs text-emerald-800 font-semibold mt-0.5">{item.company}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-slate-100 text-slate-800 font-mono text-xs font-bold">
                    {item.stipend}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Criteria:</strong> {item.eligibility}</p>
                  <p className="text-emerald-700 font-bold">Status: {item.allocated}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => showToast(`Opening shortlisted student roster for ${item.role}`)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    View Nominated Student Roster →
                  </button>
                  <span className="text-[11px] text-slate-400">Verified via Skill Passport</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 8. FACULTY RECRUITMENT, VISITING EXPERTS & ADJUNCT TRAINERS       */}
      {/* ================================================================= */}
      {activeNav === 'faculty-recruitment' && (
        <FacultyHireLearnModule initialMode="hire" />
      )}

      {/* ================================================================= */}
      {/* 9. EVENTS, HACKATHONS & SYMPOSIUMS                               */}
      {/* ================================================================= */}
      {activeNav === 'events' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>Inter-College Hackathons & Project Expos</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Regional competitive engineering events hosted by Sri Sai Baba National Degree College and partner institutions.
              </p>
            </div>
            <button
              onClick={() => showToast('College Hackathon Registration window opened')}
              className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
            >
              + Create Department Tech Fest
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Rayalaseema Smart College Hackathon 2026',
                dates: 'October 14-16, 2026',
                prizes: '₹1,50,000 Cash + Seed Incubation',
                teams: '48 Teams Registered (12 Colleges)',
                venue: 'SSBN Auditorium & Central Computer Labs'
              },
              {
                title: 'AI & Generative Tools for Regional Problem Solving',
                dates: 'November 2-3, 2026',
                prizes: 'Direct Job Offers from Partner Industry',
                teams: '32 Student Projects Selected',
                venue: 'Innovation & Incubation Hall'
              },
              {
                title: 'Renewable CleanTech Hardware Prototype Expo',
                dates: 'December 10, 2026',
                prizes: 'Co-Sponsored by Anantapur Solar Cluster',
                teams: '22 Working Hardware Models',
                venue: 'Electronics & Physics Lab Grounds'
              }
            ].map((ev, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{ev.title}</h4>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                    {ev.dates}
                  </span>
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <p><strong>Prizes:</strong> {ev.prizes}</p>
                  <p><strong>Turnout:</strong> {ev.teams}</p>
                  <p className="text-slate-500"><strong>Venue:</strong> {ev.venue}</p>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => showToast(`Delegation management opened for ${ev.title}`)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Manage College Student Teams →
                  </button>
                  <span className="text-[11px] text-slate-400">Institutional Event</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 10. APPLIED RESEARCH & INDUSTRIAL CONSULTANCY                     */}
      {activeNav === 'research' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <span>Applied R&D & Industrial Consultancy Grants</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Faculty-led research funded by regional MSMEs, AICTE RPS, and DST government schemes.
              </p>
            </div>
            <button
              onClick={() => showToast('New consultancy proposal dossier template opened')}
              className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
            >
              + Submit Consultancy Proposal
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Solar Inverter Failure Prediction via Edge ML',
                lead: 'Dr. P. Ravindra Reddy & Department of CS',
                fundingAgency: 'Anantapur Solar Tech Consortium',
                grantAmount: '₹8,50,000',
                status: 'Phase 2: In Deployment'
              },
              {
                title: 'Low-Cost IoT Water Table Monitoring for Rural Anantapur',
                lead: 'Prof. K. Murali Krishna & Electronics Dept',
                fundingAgency: 'AP State Innovation & Water Resources Board',
                grantAmount: '₹12,00,000',
                status: 'Field Testing 18 Sensor Nodes'
              },
              {
                title: 'Automated Telugu Voice Transcription for Rural Legal Aid',
                lead: 'Dr. S. Lakshmi & Computer Applications Dept',
                fundingAgency: 'DST Digital Humanities Grant',
                grantAmount: '₹6,20,000',
                status: 'Dataset Collection Complete'
              }
            ].map((res, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{res.title}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200">
                    {res.grantAmount}
                  </span>
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <p><strong>Principal Investigator:</strong> {res.lead}</p>
                  <p><strong>Sponsoring Agency:</strong> {res.fundingAgency}</p>
                  <p className="text-emerald-800 font-semibold">Stage: {res.status}</p>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => showToast(`Opening quarterly progress audit for ${res.title}`)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    View Research Milestone Audit →
                  </button>
                  <span className="text-[11px] text-slate-400">NAAC Criterion 3.1</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 11. INSTITUTION PROFILE & ACCREDITATION                          */}
      {activeNav === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-700" />
                <span>Official Institutional Profile & NAAC Accreditation Dossier</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verified college credentials, AISHE compliance, NAAC Grade A metrics, and autonomous affiliation records.
              </p>
            </div>
            <button
              onClick={() => showToast('Institutional Dossier downloaded')}
              className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
            >
              Download AISHE Dossier (PDF)
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Statutory Identification & Governance
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">AISHE Code</span>
                  <span className="font-mono font-bold text-slate-900">{collegeInfo.aisheCode}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Autonomous Ref</span>
                  <span className="font-mono font-bold text-slate-900">{collegeInfo.ugcAutonomous}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">NAAC Grade</span>
                  <span className="font-bold text-emerald-700">{collegeInfo.naacGrade}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Affiliated University</span>
                  <span className="font-bold text-slate-900">{collegeInfo.affiliatedUniversity}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Annual Student Demographics & Capacity
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-lg font-black text-slate-900 font-mono block">3,450</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Total Enrolled</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-lg font-black text-emerald-700 font-mono block">78%</span>
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">Placement Rate</span>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                  <span className="text-lg font-black text-indigo-700 font-mono block">14</span>
                  <span className="text-[10px] text-indigo-800 font-bold uppercase">Industry MoUs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 12. PLACEMENT & PROGRESSION ANALYTICS                            */}
      {activeNav === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-700" />
                <span>NAAC Placement & Career Progression Analytics</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Audited metrics supporting NAAC Criterion 5.1 (Student Progression) and NIRF institutional data requirements.
              </p>
            </div>
            <button
              onClick={() => handleExportNAAC()}
              className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Verified Spreadsheet (.xlsx)</span>
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Placed (2025-26)</span>
              <span className="text-2xl font-black text-emerald-700 font-mono">310 / 380</span>
              <span className="text-[11px] text-slate-500 block">81.5% Placement Ratio</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Average CTC Package</span>
              <span className="text-2xl font-black text-slate-900 font-mono">₹4.20 LPA</span>
              <span className="text-[11px] text-emerald-600 block">+14% vs Previous Year</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest CTC Offer</span>
              <span className="text-2xl font-black text-indigo-700 font-mono">₹8.50 LPA</span>
              <span className="text-[11px] text-slate-500 block">Rayalaseema Tech Systems</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Partner Campus Drives</span>
              <span className="text-2xl font-black text-slate-900 font-mono">18 Drives</span>
              <span className="text-[11px] text-slate-500 block">100% Proctored Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: NOMINATE FACULTY                                           */}
      {/* ================================================================= */}
      {isNominateModalOpen && selectedOpp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Nominate Faculty Member</h3>
                <p className="text-xs text-slate-500">{selectedOpp.title} ({selectedOpp.hostOrganization})</p>
              </div>
              <button
                onClick={() => setIsNominateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleNominateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Faculty Full Name *</label>
                <input
                  type="text"
                  required
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">AICTE Faculty ID</label>
                  <input
                    type="text"
                    value={aicteId}
                    onChange={(e) => setAicteId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNominateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-xs"
                >
                  Submit Official Nomination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: EXPORT NAAC REPORT COMPLETE                                */}
      {/* ================================================================= */}
      {exportCompleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-lg">NAAC Progression Report Ready</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official Criterion 5.1 (Student Support and Progression) audit data for Sri Sai Baba National (SSBN) Autonomous Degree College has been compiled with verified employer proof.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 font-mono text-left space-y-1">
              <p>• File: NAAC_SSBN_Criterion_5.1_2026.xlsx</p>
              <p>• Verified Placed / Progression: 310 Students</p>
              <p>• Industry Partner Drives: 14 Documented</p>
            </div>
            <button
              onClick={() => setExportCompleteModal(false)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Download Verified Spreadsheet
            </button>
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
