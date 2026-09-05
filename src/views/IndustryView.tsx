import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Search,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Star,
  Zap,
  Clock,
  Plus,
  AlertCircle,
  FileCheck,
  Filter,
  Check,
  ExternalLink,
  ChevronDown,
  BookOpen,
  Code2,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Send,
  UserCheck,
  Compass,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FastRecruitmentRequirement, FastMatchCandidateComparison } from '../types';

export const IndustryView: React.FC = () => {
  const {
    fastRequirements,
    addFastRequirement,
    candidateComparisons,
    toggleCandidateShortlist,
    hireCandidate,
    industryHiringOpportunities,
    applyToIndustryOpportunity,
    toggleSaveIndustryOpportunity,
    setActiveTab,
    showToast
  } = useApp();

  // 11 Industry Tabs requested:
  // Overview, Companies, Industry Hiring, Fast Match, Industry Training,
  // Industry Projects, Talent Search, Internships, Jobs, Apprenticeships, Mentorship
  type IndustryTab =
    | 'overview'
    | 'companies'
    | 'hiring'
    | 'fast-match'
    | 'training'
    | 'projects'
    | 'talent-search'
    | 'internships'
    | 'jobs'
    | 'apprenticeships'
    | 'mentorship';

  const [activeTab, setTab] = useState<IndustryTab>('overview');
  const [selectedReqId, setSelectedReqId] = useState<string>(fastRequirements[0]?.id || 'fast-req-1');
  const [isDefineModalOpen, setIsDefineModalOpen] = useState(false);

  // Recruiter Search Engine state
  const [recruiterSearchSkill, setRecruiterSearchSkill] = useState('React');
  const [evidenceFilter, setEvidenceFilter] = useState<'ALL' | 'PRACTICAL' | 'OFFLINE'>('ALL');
  const [candidateResultsVisible, setCandidateResultsVisible] = useState(true);

  // Category filter for Hiring
  const [hiringCategoryFilter, setHiringCategoryFilter] = useState<string>('ALL');

  // New Requirement Form state
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('Rayalaseema Tech Systems');
  const [newLocation, setNewLocation] = useState('Anantapur / Hybrid');
  const [newUrgency, setNewUrgency] = useState<'IMMEDIATE' | '7_DAYS' | '15_DAYS' | 'INTERNSHIP' | 'PART_TIME'>('IMMEDIATE');
  const [newStipend, setNewStipend] = useState('₹22,000 / mo');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, Tailwind CSS, Git');

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
      department: 'Engineering Unit',
      location: newLocation,
      urgency: newUrgency,
      stipendOrSalary: newStipend,
      exactSkills: parsedSkills,
      totalMatchedCandidates: 3,
      createdAt: new Date().toISOString().split('T')[0]
    });

    setIsDefineModalOpen(false);
    setNewRoleTitle('');
    showToast(`Hiring mandate for "${newRoleTitle}" published to 48h Fast Match engine!`);
  };

  const verifiedPartners = [
    {
      id: 'p1',
      name: 'CloudScale Systems',
      industry: 'Cloud Infrastructure & Enterprise SaaS',
      location: 'Hyderabad & Remote',
      verifiedHiresCount: 148,
      verifiedRoles: ['Junior Full Stack Engineer', 'Backend Go Developer', 'DevOps Associate'],
      verificationMandates: [
        'Practical coding sandbox passed with score >= 85%',
        'Architectural viva oral defense authenticated',
        'Demonstrated GitHub commits on production-style repo'
      ],
      notice: 'Direct first-round technical interview without ATS resume screening for candidates clearing verified requirements.'
    },
    {
      id: 'p2',
      name: 'Andhra FinTech Labs',
      industry: 'Banking APIs & Financial Microservices',
      location: 'Vijayawada & Anantapur',
      verifiedHiresCount: 82,
      verifiedRoles: ['Node.js API Specialist', 'Database Performance Analyst', 'Security Audit Trainee'],
      verificationMandates: [
        'Demonstrated understanding of OAuth & JWT token lifecycles',
        'SQL indexing & transaction isolation defense',
        'Proctored assessment conducted at JNTUA examination hub'
      ],
      notice: 'Priority interview fast-track for candidates with verified local project submissions.'
    },
    {
      id: 'p3',
      name: 'Rayalaseema Tech Hub',
      industry: 'IoT, Agriculture Analytics & Regional Tech',
      location: 'Anantapur District',
      verifiedHiresCount: 64,
      verifiedRoles: ['Full Stack Python Developer', 'IoT Gateway Assistant', 'Field Deployment Lead'],
      verificationMandates: [
        'Physical attendance verification at Anantapur District Skill Lab',
        'Offline mobile-first responsive architecture defense'
      ],
      notice: 'Direct hiring partner for regional engineering colleges with regional bonus allowance.'
    },
    {
      id: 'p4',
      name: 'TechMahindra Global Delivery Hub',
      industry: 'IT Services & Digital Engineering',
      location: 'Bengaluru / Hyderabad',
      verifiedHiresCount: 210,
      verifiedRoles: ['Associate Software Engineer', 'React Frontend Developer', 'Quality Engineer'],
      verificationMandates: [
        'SkillBridge verified code defense score >= 80%',
        'Proctored offline centre assessment clearance'
      ],
      notice: 'Direct pooled campus drives through SkillBridge partner colleges.'
    },
    {
      id: 'p5',
      name: 'Kia Supplier Industrial Tech Corridor',
      industry: 'Automotive Embedded Systems & PLC Automation',
      location: 'Erramanchi / Penukonda Corridor',
      verifiedHiresCount: 95,
      verifiedRoles: ['Embedded C Programmer', 'PLC Automation Trainee', 'Telemetry Quality Inspector'],
      verificationMandates: [
        'Hardware-in-the-loop simulation test verified',
        'Physical workshop practical completion certificate'
      ],
      notice: 'Specialized industrial corridor apprenticeships and direct placement track.'
    },
    {
      id: 'p6',
      name: 'GreenEnergy Microgrid Labs',
      industry: 'Renewable Energy SCADA & Smart Grid IoT',
      location: 'Anantapur Solar Park / Kurnool',
      verifiedHiresCount: 42,
      verifiedRoles: ['Solar SCADA Telemetry Analyst', 'Python Data Engineer', 'Firmware Assistant'],
      verificationMandates: [
        'Energy sensor telemetry processing project verified',
        'Clean viva defense on industrial modbus protocol'
      ],
      notice: 'Hands-on clean energy technology apprenticeships with stipend.'
    }
  ];

  // Industry-led practical student training modules (strictly for students, NO faculty training)
  const industryTrainingModules = [
    {
      id: 'it-1',
      title: 'CloudScale Enterprise DevOps & Microservices Sandbox',
      company: 'CloudScale Systems',
      duration: '4 Weeks (Practical)',
      mode: 'Hands-on Sandbox',
      skills: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS / GCP'],
      description: 'Hands-on enterprise container deployment lab. Build, test, and deploy resilient multi-service architectures under simulated load.',
      enrolledCount: 184,
      targetRoles: ['Junior DevOps Engineer', 'Cloud Infrastructure Trainee']
    },
    {
      id: 'it-2',
      title: 'FinTech High-Throughput API Gateway Engineering',
      company: 'Andhra FinTech Labs',
      duration: '3 Weeks (Intensive)',
      mode: 'Live Code Sandbox',
      skills: ['Node.js', 'PostgreSQL', 'Redis Caching', 'Rate Limiting'],
      description: 'Production financial API design adhering to real banking latency limits, transaction rollbacks, and tamper-proof audit trails.',
      enrolledCount: 142,
      targetRoles: ['Backend API Specialist', 'Junior Software Engineer']
    },
    {
      id: 'it-3',
      title: 'Industrial IoT Edge Sensor Integration & Firmware Protocol',
      company: 'Rayalaseema Tech Hub',
      duration: '4 Weeks (Lab-Based)',
      mode: 'Hardware Sandbox & Emulator',
      skills: ['Embedded C', 'MQTT', 'ESP32 / Raspberry Pi', 'Sensor Telemetry'],
      description: 'Connect industrial telemetry sensors to low-bandwidth regional gateways with offline buffering and edge anomaly detection.',
      enrolledCount: 96,
      targetRoles: ['IoT Embedded Engineer', 'Automation Trainee']
    },
    {
      id: 'it-4',
      title: 'Modern Front-End Performance & Accessibility Auditing',
      company: 'TechMahindra Practice Group',
      duration: '2 Weeks (Practical)',
      mode: 'Interactive Viva & Code Audit',
      skills: ['React 19', 'TypeScript', 'Lighthouse Optimization', 'WCAG AA'],
      description: 'Master enterprise web delivery: Zero-CLS layouts, code-splitting, accessible UI components, and state management at scale.',
      enrolledCount: 220,
      targetRoles: ['Frontend Engineer', 'UI Developer']
    }
  ];

  // Live industry projects co-sponsored by enterprise partners
  const industryProjects = [
    {
      id: 'ip-1',
      title: 'Rural Cold-Storage Temperature & Humidity Telemetry Pipeline',
      sponsor: 'Rayalaseema Tech Hub & Agricultural Corridor',
      stipend: '₹15,000 Milestone Grant',
      duration: '6 Weeks',
      teamSize: '2-4 Students',
      skills: ['Python', 'MQTT', 'TimescaleDB', 'React Dashboard'],
      deliverable: 'Working web dashboard rendering real-time IoT temperature sensor streams with SMS threshold alert dispatch.',
      status: 'ACCEPTING_APPLICATIONS'
    },
    {
      id: 'ip-2',
      title: 'Micro-Savings UPI Recurring Transaction Mock Engine',
      sponsor: 'Andhra FinTech Labs',
      stipend: '₹20,000 Milestone Grant',
      duration: '8 Weeks',
      teamSize: '2-3 Students',
      skills: ['Node.js', 'PostgreSQL', 'Redis', 'Unit Testing'],
      deliverable: 'Fully tested backend microservice handling simulated high-concurrency micro-deposits with strict transaction guarantees.',
      status: 'ACTIVE_NOW'
    },
    {
      id: 'ip-3',
      title: 'Autonomous Plant Fleet Logistics Dispatch Optimizer',
      sponsor: 'Kia Supplier Industrial Tech',
      stipend: '₹18,000 Milestone Grant',
      duration: '6 Weeks',
      teamSize: '2-4 Students',
      skills: ['Algorithms', 'Python', 'FastAPI', 'Leaflet Maps'],
      deliverable: 'Route optimization algorithm minimizing internal delivery shuttle latency between Erramanchi supplier parks.',
      status: 'ACCEPTING_APPLICATIONS'
    }
  ];

  // Industry internships
  const industryInternships = [
    {
      id: 'ii-1',
      title: 'Full Stack Development Intern',
      company: 'CloudScale Systems',
      location: 'Hyderabad / Hybrid',
      stipend: '₹25,000 / month',
      duration: '6 Months',
      skills: ['React', 'Node.js', 'SQL', 'Git'],
      eligibility: 'Pre-final & Final Year Students with Verified Skill Passport',
      openings: 12
    },
    {
      id: 'ii-2',
      title: 'Backend Engineering Intern',
      company: 'Andhra FinTech Labs',
      location: 'Vijayawada / Remote',
      stipend: '₹20,000 / month',
      duration: '4 Months',
      skills: ['Python / Node.js', 'PostgreSQL', 'REST APIs'],
      eligibility: 'Students clearing Backend Code Defense Level 2',
      openings: 8
    },
    {
      id: 'ii-3',
      title: 'Embedded Systems & Automation Intern',
      company: 'Kia Supplier Industrial Corridor',
      location: 'Penukonda / Erramanchi',
      stipend: '₹18,000 / month',
      duration: '6 Months',
      skills: ['C/C++', 'Microcontrollers', 'CAN Protocol'],
      eligibility: 'ECE / EEE / Mechanical Students with hardware workshop proof',
      openings: 15
    }
  ];

  // Full-time jobs
  const industryJobs = [
    {
      id: 'ij-1',
      title: 'Junior Software Engineer (Full Stack)',
      company: 'CloudScale Systems',
      location: 'Hyderabad / Hybrid',
      ctc: '₹6.5 - ₹8.0 LPA',
      skills: ['Java / Spring Boot', 'React', 'Docker'],
      minLevel: 'Tier 3 (Proctored Defense Passed)',
      description: 'Direct campus & off-campus hiring track without initial resume screening for verified candidates.'
    },
    {
      id: 'ij-2',
      title: 'Associate Cloud Engineer',
      company: 'TechMahindra Global Delivery Hub',
      location: 'Bengaluru / Hyderabad',
      ctc: '₹4.5 - ₹6.0 LPA',
      skills: ['Linux', 'Cloud Architecture', 'Python / Bash Scripting'],
      minLevel: 'Tier 2 (Practical Sandbox Clearance)',
      description: 'Deployment and maintenance of enterprise cloud pipelines for international clients.'
    },
    {
      id: 'ij-3',
      title: 'FinTech Systems Developer',
      company: 'Andhra FinTech Labs',
      location: 'Vijayawada / Hybrid',
      ctc: '₹5.5 - ₹7.2 LPA',
      skills: ['Node.js', 'SQL Optimization', 'Security Protocols'],
      minLevel: 'Tier 3 (Oral Defense Authenticated)',
      description: 'Building microservices handling real-time compliance and regional UPI integration.'
    }
  ];

  // Apprenticeships
  const industryApprenticeships = [
    {
      id: 'ia-1',
      title: 'Industrial IT Apprenticeship (NAPS Aligned)',
      company: 'Rayalaseema Tech Systems',
      location: 'Anantapur Town',
      stipend: '₹14,000 / month + Govt NAPS Subsidy',
      duration: '1 Year (Hands-on)',
      domain: 'Information Technology & Systems Administration',
      description: 'Structured on-the-job training program providing practical corporate experience alongside recognized apprenticeship credentials.'
    },
    {
      id: 'ia-2',
      title: 'Automotive Manufacturing & PLC Apprenticeship',
      company: 'Kia Motors Supplier Cluster',
      location: 'Erramanchi Corridor',
      stipend: '₹16,500 / month + Canteen & Transport',
      duration: '1 Year',
      domain: 'Robotics, Assembly Line & Embedded Diagnostics',
      description: 'Rigorous shop-floor practical training in automation systems, robot arm diagnostics, and real-time telemetry.'
    },
    {
      id: 'ia-3',
      title: 'Smart Grid & Solar Farm Technician Apprenticeship',
      company: 'GreenEnergy Microgrid Labs',
      location: 'Anantapur Solar Park',
      stipend: '₹15,000 / month',
      duration: '1 Year',
      domain: 'Solar Inverters, SCADA Telemetry & Grid Analytics',
      description: 'Field apprenticeships in power generation diagnostics, sensor calibrations, and inverter control software.'
    }
  ];

  // Mentorship
  const industryMentors = [
    {
      id: 'im-1',
      name: 'Ravi Teja Varma',
      role: 'Principal Architect',
      company: 'CloudScale Systems',
      experience: '14+ Years',
      domain: 'Distributed Systems & Cloud Scale',
      slotsAvailable: 4,
      availability: 'Weekends (1-on-1)',
      bio: 'Mentoring regional engineering students on clean architecture, interview code defense, and scalable database sharding.'
    },
    {
      id: 'im-2',
      name: 'Suhasini Reddy',
      role: 'VP of Engineering',
      company: 'Andhra FinTech Labs',
      experience: '12+ Years',
      domain: 'FinTech Security & API Architecture',
      slotsAvailable: 3,
      availability: 'Thursday Evenings',
      bio: 'Helps students translate college academic projects into enterprise-grade, unit-tested production codebases.'
    },
    {
      id: 'im-3',
      name: 'Dr. Chandrasekhar Rao',
      role: 'Senior Embedded Firmware Lead',
      company: 'Kia Supplier Corridor Tech',
      experience: '16+ Years',
      domain: 'Automotive CAN, RTOS & Industrial IoT',
      slotsAvailable: 5,
      availability: 'Saturday Mornings',
      bio: 'Guiding hardware and software enthusiasts on RTOS scheduling, firmware reliability, and sensor bus debugging.'
    }
  ];

  // Candidates for Talent Search
  const candidatePool = [
    {
      id: 'c1',
      name: 'Karthik Peetla',
      institution: 'JNTUA College of Engineering, Anantapur',
      degree: 'B.Tech Computer Science (2026)',
      readiness: 84,
      verifiedSkills: ['React 19', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git'],
      evidenceLevel: 'PRACTICAL_TEST_PASSED',
      defenseVerified: true,
      githubProject: 'Kisan Mitra AI (AgriTech Dashboard)',
      targetRole: 'Full Stack Engineer'
    },
    {
      id: 'c2',
      name: 'Ananya Sharma',
      institution: 'JNTUA College of Engineering, Anantapur',
      degree: 'B.Tech CSE (Final Year)',
      readiness: 91,
      verifiedSkills: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
      evidenceLevel: 'OFFLINE_PROCTORED_PASSED',
      defenseVerified: true,
      githubProject: 'Algorithmic Canvas Complexity Profiler',
      targetRole: 'Python Backend Engineer'
    },
    {
      id: 'c3',
      name: 'P. Sai Kumar',
      institution: 'G. Pulla Reddy Engineering College, Kurnool',
      degree: 'B.Tech IT (2026)',
      readiness: 78,
      verifiedSkills: ['Java', 'Spring Boot', 'SQL', 'React'],
      evidenceLevel: 'PRACTICAL_TEST_PASSED',
      defenseVerified: false,
      githubProject: 'Hospital OPD Queue Optimization System',
      targetRole: 'Junior Java Developer'
    },
    {
      id: 'c4',
      name: 'B. Meghana',
      institution: 'SRIT Anantapur',
      degree: 'B.Tech ECE (2025)',
      readiness: 86,
      verifiedSkills: ['Embedded C', 'Python', 'IoT Protocols', 'MQTT'],
      evidenceLevel: 'OFFLINE_PROCTORED_PASSED',
      defenseVerified: true,
      githubProject: 'Solar Inverter Telemetry Gateway',
      targetRole: 'IoT Embedded Engineer'
    }
  ];

  const searchedCandidates = candidatePool.filter((c) => {
    const matchesSkill = c.verifiedSkills.some((s) =>
      s.toLowerCase().includes(recruiterSearchSkill.toLowerCase())
    );
    if (!matchesSkill && recruiterSearchSkill.trim() !== '') return false;
    if (evidenceFilter === 'PRACTICAL' && c.evidenceLevel !== 'PRACTICAL_TEST_PASSED') return false;
    if (evidenceFilter === 'OFFLINE' && c.evidenceLevel !== 'OFFLINE_PROCTORED_PASSED') return false;
    return true;
  });

  const filteredHiringOpportunities = (industryHiringOpportunities || []).filter((opp) => {
    if (hiringCategoryFilter !== 'ALL' && opp.category !== hiringCategoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* 1. TOP PORTAL HEADER                                                      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 border border-indigo-100">
                <Building2 className="w-3 h-3 text-indigo-600" />
                Industry Recruitment Gateway
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Evidence-First Hiring
              </span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              INDUSTRY PORTAL
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Connects companies directly with capable students through verified skill demonstrations, proctored coding defenses, fast-match candidate evaluations, and enterprise capstone projects.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsDefineModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Define Exact Requirement</span>
            </button>
            <button
              onClick={() => setTab('talent-search')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-600" />
              <span>Search Talent</span>
            </button>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Partners</span>
            <span className="text-lg font-black text-slate-900">42+ Active</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">MNCs, Startups & MSMEs</span>
          </div>
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Screening SLA</span>
            <span className="text-lg font-black text-indigo-700">48-Hour Guarantee</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Direct candidate match</span>
          </div>
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ATS Keyword Guessing</span>
            <span className="text-lg font-black text-emerald-700">0% Filter Noise</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Evaluated on real code</span>
          </div>
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Hiring Corridors</span>
            <span className="text-lg font-black text-slate-900">11 Clusters</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Rayalaseema & Hyderabad</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB NAVIGATION STRIP (11 Structured Tabs)                              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'overview', label: 'Overview', icon: Compass },
            { id: 'companies', label: 'Companies', icon: Building2 },
            { id: 'hiring', label: 'Industry Hiring', icon: Briefcase },
            { id: 'fast-match', label: 'Fast Match', icon: Zap },
            { id: 'training', label: 'Industry Training', icon: BookOpen },
            { id: 'projects', label: 'Industry Projects', icon: Code2 },
            { id: 'talent-search', label: 'Talent Search', icon: Search },
            { id: 'internships', label: 'Internships', icon: Award },
            { id: 'jobs', label: 'Jobs', icon: CheckCircle2 },
            { id: 'apprenticeships', label: 'Apprenticeships', icon: Layers },
            { id: 'mentorship', label: 'Mentorship', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id as IndustryTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
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

      {/* ========================================================================= */}
      {/* 3. TAB CONTENT RENDERERS                                                  */}
      {/* ========================================================================= */}

      {/* ----------------------------- TAB 1: OVERVIEW ---------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Welcome Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
              Corporate Recruitment Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Recruit by Demonstrated Evidence, Not Resume Exaggerations
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-3xl leading-relaxed">
              SkillBridge replaces generic resume screening with audited coding viva defenses, proctored practical sandboxes, and verified GitHub repository milestones. Companies define exact granular requirements, and candidates with verified clearance are fast-tracked to first-round technical interviews within 48 hours.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setTab('fast-match')}
                className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Explore 48-Hour Fast Match Engine</span>
              </button>
              <button
                onClick={() => setTab('companies')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>View Partner Companies</span>
              </button>
            </div>
          </div>

          {/* 4 Feature Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setTab('companies')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Corporate Partners
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                42+ verified corporate employers guaranteeing direct technical interviews for authenticated skill clearance.
              </p>
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 pt-1">
                <span>View Partners</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => setTab('fast-match')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                Fast Match Engine
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compare student capabilities skill-by-skill with exact match fractions, shortlist instantly, and fast-hire.
              </p>
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1 pt-1">
                <span>Open Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => setTab('training')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Industry Training
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Company-designed technical sandboxes for students to bridge enterprise stack gaps. (Faculty FDPs are in Academia).
              </p>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-1">
                <span>Explore Sandboxes</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => setTab('projects')}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Industry Capstones
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Live corporate project briefs with milestone grants, recruiter code reviews, and direct hiring conversion.
              </p>
              <span className="text-xs font-bold text-purple-700 flex items-center gap-1 pt-1">
                <span>Browse Projects</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------- TAB 2: COMPANIES ---------------------------- */}
      {activeTab === 'companies' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Verified Corporate Partners</h2>
              <p className="text-xs text-slate-500">
                Enterprises and technology organizations hiring students based on authenticated SkillBridge evidence.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Showing {verifiedPartners.length} Active Corridors
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {verifiedPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">{partner.name}</h3>
                      <p className="text-[11px] text-indigo-700 font-semibold">{partner.industry}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 shrink-0">
                      {partner.verifiedHiresCount} Hires
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{partner.location}</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Active Hiring Roles:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {partner.verifiedRoles.map((r, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Verification Mandates:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {partner.verificationMandates.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setTab('hiring');
                      showToast(`Filtered hiring opportunities for ${partner.name}`);
                    }}
                    className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Hiring Openings</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------- TAB 3: INDUSTRY HIRING ------------------------- */}
      {activeTab === 'hiring' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Industry Hiring Directory</h2>
              <p className="text-xs text-slate-500">
                Multi-tier opportunities across MNCs, National Enterprises, Startups, and Regional MSMEs.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'MNC', label: 'MNCs' },
                { id: 'NATIONAL', label: 'National' },
                { id: 'STARTUP', label: 'Startups' },
                { id: 'REGIONAL', label: 'Regional' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setHiringCategoryFilter(cat.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    hiringCategoryFilter === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHiringOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {opp.category}
                      </span>
                      <h3 className="text-sm font-black text-slate-900 mt-1.5 leading-snug">
                        {opp.roleTitle}
                      </h3>
                    </div>
                    <button
                      onClick={() => toggleSaveIndustryOpportunity(opp.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        opp.saved ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      title="Save / Bookmark"
                    >
                      <Star className={`w-4 h-4 ${opp.saved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{opp.companyName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{opp.location}</span>
                    </span>
                    <span>•</span>
                    <span>{opp.workMode}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Compensation:</span>
                    <span className="text-slate-900 font-extrabold">{opp.stipendOrSalary}</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(opp.requiredSkills || []).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-800 border border-indigo-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">Verification: <strong>{opp.verificationStatus}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">Eligibility: <strong>{opp.eligibility}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('assessments');
                      showToast(`Opening skill assessments for ${opp.roleTitle}`);
                    }}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Assess
                  </button>

                  <button
                    onClick={() => applyToIndustryOpportunity(opp.id)}
                    disabled={opp.applied}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      opp.applied
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    {opp.applied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Direct Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --------------------------- TAB 4: FAST MATCH --------------------------- */}
      {activeTab === 'fast-match' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                    <Zap className="w-4 h-4" />
                  </span>
                  <h2 className="text-base font-black text-slate-900">
                    48-Hour Fast Match & Candidate Comparison Matrix
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Compare student verified skills against exact job mandates. 100% matched candidates can be shortlisted or hired immediately.
                </p>
              </div>

              {/* Requirement Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Target Role:</span>
                <select
                  value={selectedReqId}
                  onChange={(e) => setSelectedReqId(e.target.value)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 cursor-pointer"
                >
                  {fastRequirements.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.roleTitle} ({r.companyName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Requirement Summary Card */}
            {selectedRequirement && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-900">{selectedRequirement.roleTitle}</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                      {selectedRequirement.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700">
                    {selectedRequirement.companyName} • {selectedRequirement.location} • {selectedRequirement.stipendOrSalary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(selectedRequirement.exactSkills || []).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-indigo-800 border border-indigo-200">
                      {s.skillName} {s.isRequired ? '(Required)' : '(Bonus)'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Candidate Comparison Rows */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Matched Candidate Profiles ({candidatesForReq.length})
            </h3>

            {candidatesForReq.map((cand) => (
              <div
                key={cand.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Candidate Info */}
                <div className="space-y-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-900">{cand.candidateName}</h4>
                    {cand.is100PercentMatch && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        100% Match
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{cand.degree}</p>
                  <p className="text-[11px] text-slate-400">{cand.institution}</p>
                </div>

                {/* Match Score & Fraction */}
                <div className="text-center sm:text-left min-w-[120px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Match Score</span>
                  <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 mt-0.5 inline-block">
                    {cand.matchedCount}/{cand.totalRequiredCount} Skills ({Math.round((cand.matchedCount / cand.totalRequiredCount) * 100)}%)
                  </span>
                </div>

                {/* Evidence Level Breakdown per Skill */}
                <div className="flex-1 max-w-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Verified Skill Evaluations
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(cand.skillsEvaluation || []).map((ev, i) => (
                      <div
                        key={i}
                        className="p-1.5 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]"
                      >
                        <span className="font-bold text-slate-800 truncate">{ev.skill}</span>
                        <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded shrink-0">
                          {ev.evidenceLevel ? ev.evidenceLevel.replace(/_/g, ' ') : 'VERIFIED'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleCandidateShortlist(selectedRequirement.id, cand.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cand.shortlisted
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cand.shortlisted ? 'Shortlisted' : 'Shortlist'}
                  </button>

                  <button
                    onClick={() => hireCandidate(selectedRequirement.id, cand.id)}
                    disabled={cand.hired}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      cand.hired
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    {cand.hired ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Hired</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Fast Hire</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------ TAB 5: INDUSTRY TRAINING ------------------------ */}
      {activeTab === 'training' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Industry-Designed Student Training</h2>
              <p className="text-xs text-slate-500">
                Corporate practical sandboxes created by enterprise partners to train students on production workflows.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Note: Faculty Training & FDPs are located in the Academia Portal
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {industryTrainingModules.map((tm) => (
              <div
                key={tm.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                      {tm.company}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{tm.duration}</span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">{tm.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tm.description}</p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Practical Skills Covered:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {tm.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Enrolled: <strong>{tm.enrolledCount} Students</strong></span>
                    <span>Mode: <strong>{tm.mode}</strong></span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActiveTab('learning');
                      showToast(`Enrolled in ${tm.title}`);
                    }}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Launch Training Sandbox</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------ TAB 6: INDUSTRY PROJECTS ------------------------ */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Live Corporate Capstone Projects</h2>
              <p className="text-xs text-slate-500">
                Real enterprise project briefs with milestone funding grants, mentor code reviews, and direct hiring triggers.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Milestone Grants Funded
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {industryProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {proj.stipend}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{proj.duration}</span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 leading-snug">{proj.title}</h3>
                  <p className="text-[11px] font-bold text-indigo-700">{proj.sponsor}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.deliverable}</p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Tech Stack:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {proj.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActiveTab('projects');
                      showToast(`Project workspace opened for ${proj.title}`);
                    }}
                    className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Submit Project Proposal</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------- TAB 7: TALENT SEARCH --------------------------- */}
      {activeTab === 'talent-search' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Recruiter Evidence Query Engine
                </h2>
                <p className="text-xs text-slate-500">
                  Search candidate database strictly by demonstrated skills, proctored exam clearances, and validated codebases.
                </p>
              </div>

              {/* Evidence Level Filter */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'ALL', label: 'All Evidence' },
                  { id: 'PRACTICAL', label: 'Practical Sandbox Passed' },
                  { id: 'OFFLINE', label: 'Proctored Offline Exam' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setEvidenceFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      evidenceFilter === f.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={recruiterSearchSkill}
                  onChange={(e) => setRecruiterSearchSkill(e.target.value)}
                  placeholder="Query required skill (e.g. React, Python, TypeScript, SQL, Docker)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={() => setCandidateResultsVisible(true)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Execute Query
              </button>
            </div>
          </div>

          {/* Candidates Results List */}
          {candidateResultsVisible && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Matching Verified Candidates ({searchedCandidates.length})</span>
                <span>Sorted by Verified Evidence Depth</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {searchedCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-black text-slate-900">{cand.name}</h4>
                          <p className="text-xs text-slate-600 font-medium">{cand.degree}</p>
                          <p className="text-[11px] text-slate-400">{cand.institution}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block">
                            {cand.readiness}% Ready
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Demonstrated Skills:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {cand.verifiedSkills.map((s, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                s.toLowerCase().includes(recruiterSearchSkill.toLowerCase())
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Verified Project Codebase:
                        </span>
                        <span className="font-bold text-slate-800">{cand.githubProject}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => showToast(`Interview invite sent to ${cand.name} via official mailbox`)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Invite to 48h Technical Interview</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------- TAB 8: INTERNSHIPS ---------------------------- */}
      {activeTab === 'internships' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Industry Internships</h2>
              <p className="text-xs text-slate-500">
                Corporate internships offering verified stipends, structured mentor guidance, and PPO conversions.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {industryInternships.length} Verified Programs
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {industryInternships.map((int) => (
              <div
                key={int.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">{int.title}</h3>
                      <p className="text-xs font-bold text-indigo-700">{int.company}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                      {int.openings} Openings
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Stipend:</span>
                    <span className="text-slate-900 font-extrabold">{int.stipend}</span>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{int.location} ({int.duration})</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Skills Required:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {int.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Eligibility: {int.eligibility}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => showToast(`Application submitted for ${int.title} at ${int.company}`)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply for Internship</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------- TAB 9: JOBS -------------------------------- */}
      {activeTab === 'jobs' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Direct Full-Time Engineering Jobs</h2>
              <p className="text-xs text-slate-500">
                Transparent CTC packages with guaranteed first-round interviews for candidates meeting verified thresholds.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              Guaranteed Interview Clearance
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {industryJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{job.title}</h3>
                    <p className="text-xs font-bold text-indigo-700">{job.company}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{job.location}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold">Annual Package:</span>
                    <span className="text-emerald-900 font-extrabold">{job.ctc}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Core Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    Required Clearance: <strong>{job.minLevel}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => showToast(`Applied for ${job.title} at ${job.company}`)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply for Job</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------- TAB 10: APPRENTICESHIPS -------------------------- */}
      {activeTab === 'apprenticeships' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Industrial Apprenticeships (NAPS / Clusters)</h2>
              <p className="text-xs text-slate-500">
                1-Year structured industrial apprenticeships in manufacturing, IT, and regional smart grid corridors.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              National Scheme Aligned
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {industryApprenticeships.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {app.domain}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 mt-2">{app.title}</h3>
                    <p className="text-xs font-bold text-slate-700">{app.company}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Stipend & Benefits:</span>
                    <span className="text-slate-900 font-extrabold">{app.stipend}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{app.description}</p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{app.location} • {app.duration}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => showToast(`Apprenticeship application registered for ${app.title}`)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Register for Apprenticeship</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------- TAB 11: MENTORSHIP ---------------------------- */}
      {activeTab === 'mentorship' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Industry Practitioner Mentorship</h2>
              <p className="text-xs text-slate-500">
                1-on-1 guidance from staff engineers and engineering leads to prepare candidates for high-concurrency technical interviews.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              Verified Tech Leads
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {industryMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">{mentor.name}</h3>
                      <p className="text-xs font-bold text-indigo-700">{mentor.role}</p>
                      <p className="text-[11px] text-slate-500">{mentor.company} ({mentor.experience})</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                      {mentor.slotsAvailable} Slots Left
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{mentor.bio}</p>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                    <div>Focus: <strong>{mentor.domain}</strong></div>
                    <div>Schedule: <strong>{mentor.availability}</strong></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setActiveTab('mailbox');
                      showToast(`Booking request dispatched to ${mentor.name}`);
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book 1-on-1 Mentorship Slot</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DEFINE REQUIREMENT MODAL                                               */}
      {/* ========================================================================= */}
      {isDefineModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Define Exact Skill Requirement
                </h3>
                <p className="text-xs text-slate-500">
                  Specify granular skills without demanding unneeded degrees or gatekeeping.
                </p>
              </div>
              <button
                onClick={() => setIsDefineModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Role Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Junior Web Integrator (HTML/CSS/JS + Git)"
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location / Mode
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hiring Urgency
                  </label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="IMMEDIATE">Immediate (48h SLA)</option>
                    <option value="7_DAYS">Within 7 Days</option>
                    <option value="15_DAYS">Within 15 Days</option>
                    <option value="INTERNSHIP">Internship Cycle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Stipend / Salary
                  </label>
                  <input
                    type="text"
                    value={newStipend}
                    onChange={(e) => setNewStipend(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Required Granular Skills (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, TypeScript, Tailwind CSS, Git"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  SkillBridge evaluates candidates against each skill using authenticated sandbox artifacts.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDefineModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Publish to Fast Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
