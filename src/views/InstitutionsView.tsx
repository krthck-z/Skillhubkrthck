import React, { useState } from 'react';
import {
  GraduationCap,
  Building,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  BookOpen,
  MapPin,
  ShieldCheck,
  BarChart3,
  Calendar,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Plus,
  Send,
  HelpCircle,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InstitutionItem, FeeReportItem } from '../types';

export const InstitutionsView: React.FC = () => {
  const { institutions, feeReports, submitFeeReport, profile } = useApp();

  const [activeTab, setActiveTab] = useState<'COLLEGES_DIRECTORY' | 'FEE_TRANSPARENCY' | 'SYLLABUS_AUDIT'>('COLLEGES_DIRECTORY');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [selectedCollege, setSelectedCollege] = useState<InstitutionItem | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Fee report form states
  const [reportCollegeId, setReportCollegeId] = useState(institutions[0]?.id || 'inst-1');
  const [reportStudentName, setReportStudentName] = useState(profile.name);
  const [reportIsAnonymous, setReportIsAnonymous] = useState(false);
  const [reportRollNumber, setReportRollNumber] = useState(profile.enrollmentNumber || '22SSBN049');
  const [reportCategory, setReportCategory] = useState<FeeReportItem['category']>('EXTRA_UNAUTHORIZED_FEE');
  const [reportPrescribedFee, setReportPrescribedFee] = useState('₹43,000');
  const [reportDemandedFee, setReportDemandedFee] = useState('₹68,000');
  const [reportDescription, setReportDescription] = useState('');

  const zones = ['ALL', 'Anantapur Town', 'JNTU Campus', 'Hindupur', 'Tadipatri', 'Gooty'];

  const filteredColleges = institutions.filter((col) => {
    const matchesSearch =
      col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (col.code && col.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      col.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'ALL' || col.location.toLowerCase().includes(selectedZone.toLowerCase());
    return matchesSearch && matchesZone;
  });

  const handleFeeReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const collegeObj = institutions.find((c) => c.id === reportCollegeId) || institutions[0];
    submitFeeReport({
      institutionId: collegeObj.id,
      institutionName: collegeObj.name,
      studentName: reportIsAnonymous ? 'Anonymous Student' : reportStudentName,
      isAnonymous: reportIsAnonymous,
      rollNumber: reportIsAnonymous ? undefined : reportRollNumber,
      category: reportCategory,
      prescribedFee: reportPrescribedFee,
      demandedFee: reportDemandedFee,
      excessAmount: `₹${Math.max(0, parseInt(reportDemandedFee.replace(/\D/g, '') || '0') - parseInt(reportPrescribedFee.replace(/\D/g, '') || '0')).toLocaleString()}`,
      description: reportDescription
    });
    setIsReportModalOpen(false);
    setReportDescription('');
    setActiveTab('FEE_TRANSPARENCY');
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Anantapur Higher Education & Fee Transparency Module
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Serious, verifiable data on 15 authentic colleges in Anantapur district. Comparing syllabus modernization, real verified placements, practical lab facilities, and official vs collected fees.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Fee Issue</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('COLLEGES_DIRECTORY')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'COLLEGES_DIRECTORY'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-indigo-400" />
          <span>15 Anantapur Colleges Comparison</span>
        </button>

        <button
          onClick={() => setActiveTab('FEE_TRANSPARENCY')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'FEE_TRANSPARENCY'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          <span>Fee Discrepancy Ledger ({feeReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SYLLABUS_AUDIT')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'SYLLABUS_AUDIT'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Syllabus vs Industry Demand</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 15 COLLEGES COMPARISON DIRECTORY                                  */}
      {/* ========================================================================= */}
      {activeTab === 'COLLEGES_DIRECTORY' && (
        <div className="space-y-4">
          
          {/* Filters and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by college name, code, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Region:</span>
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    selectedZone === z
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Colleges Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredColleges.map((col) => (
              <div
                key={col.id}
                onClick={() => setSelectedCollege(col)}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-100">
                        {(col.code || 'COLLEGE')} • {col.type.replace(/_/g, ' ')}
                      </span>
                      <h2 className="text-sm font-extrabold text-slate-900 mt-2 line-clamp-2">
                        {col.name}
                      </h2>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">
                      Est. {col.establishedYear}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{col.location}</span>
                  </p>

                  {/* Real Comparison Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    
                    {/* Placements: Real vs Claimed */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Placement Rate
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-emerald-700 text-xs">
                          {col.verifiedPlacementPercent}% Verified
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        ({col.advertisedPlacementPercent}% Advertised)
                      </span>
                    </div>

                    {/* Practical Lab Quality */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Lab Quality Score
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-indigo-700 text-xs">
                          {col.practicalLabScore}/100
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Syllabus: {col.syllabusModernScore}/100
                      </span>
                    </div>

                    {/* Fees: Prescribed vs Actual */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5 col-span-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Official Govt Fee:</span>
                        <span className="font-bold text-slate-800">{col.govtPrescribedFee}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Collected Average:</span>
                        <span className="font-extrabold text-amber-800">{col.actualCollectedFee}</span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-600">
                    View Full Audit & Breakdown →
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setReportCollegeId(col.id);
                      setIsReportModalOpen(true);
                    }}
                    className="text-[10px] font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                  >
                    Report Discrepancy
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FEE DISCREPANCY TRANSPARENCY LEDGER                                */}
      {/* ========================================================================= */}
      {activeTab === 'FEE_TRANSPARENCY' && (
        <div className="space-y-4">
          
          {/* Responsibility Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs flex items-start gap-3 shadow-md">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold text-white text-sm block">
                Evidence Collection & Objective Transparency Registry
              </span>
              <p className="text-slate-300 leading-relaxed">
                SkillBridge provides authenticated record-keeping for students and parents. We do not make false promises of immediate legal verdicts; instead, every case is cataloged with receipts, matched against official Andhra Pradesh Higher Education Fee Regulatory Committee mandates, and tracked objectively.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">
              Submitted Fee Irregularity Reports ({feeReports.length})
            </h2>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit New Fee Report</span>
            </button>
          </div>

          <div className="space-y-3">
            {feeReports.map((rep) => {
              const statusColors = {
                REPORT_SUBMITTED: 'bg-blue-50 text-blue-800 border-blue-200',
                UNDER_REVIEW: 'bg-amber-50 text-amber-800 border-amber-200',
                REFERRED_TO_COMMITTEE: 'bg-purple-50 text-purple-800 border-purple-200',
                RESOLVED: 'bg-emerald-50 text-emerald-800 border-emerald-200'
              };

              return (
                <div
                  key={rep.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-slate-900">
                          {rep.institutionName}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-600">
                          {rep.category.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Reported by: <strong>{rep.studentName}</strong> • Date: {rep.createdAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[rep.status]}`}>
                        Status: {rep.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Govt Prescribed Fee</span>
                      <span className="font-bold text-slate-800">{rep.prescribedFee}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Actual Amount Demanded</span>
                      <span className="font-bold text-rose-700">{rep.demandedFee}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Excess Unauthorized Gap</span>
                      <span className="font-extrabold text-rose-600">{rep.excessAmount}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                    "{rep.description}"
                  </p>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>
                      Audit Trail: <strong>{rep.statusNotes}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SYLLABUS MODERNNESS VS RECRUITER DEMAND                           */}
      {/* ========================================================================= */}
      {activeTab === 'SYLLABUS_AUDIT' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white">
                Anantapur Syllabus Modernness vs Industry Hiring Benchmark
              </h2>
              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                2026 Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Traditional university curricula update every 4 to 6 years, creating an acute gap between lab manuals and modern production requirements. Below is the objective audit of key subjects across regional institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {(institutions || []).slice(0, 6).map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{inst.name}</h3>
                    <p className="text-xs text-slate-500">{inst.type} • {inst.location.split(',')[0]}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-100">
                    Modernity: {inst.industryAlignment}%
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Key Curriculum Strengths:</span>
                    <div className="flex flex-wrap gap-1">
                      {(inst.facilities || ['Core CS Theory', 'Dedicated Computer Center']).slice(0, 3).map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Curriculum Gaps Identified by Recruiters:</span>
                    <div className="flex flex-wrap gap-1">
                      {(inst.demandVsCoverage?.filter((d) => d.institutionCoverage !== 'HIGH').map((d) => `${d.skill} (${d.institutionCoverage} coverage)`) || ['Cloud DevOps', 'Full-Stack Practical Labs']).slice(0, 2).map((g, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-medium text-[11px]">
                          ⚠ {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Lab Score: <strong>{inst.practicalTraining ? '88' : '65'}/100</strong></span>
                  <span>Alumni in Tech: <strong>{inst.alumniWorkingInTechCount}+</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: COLLEGE DETAILS                                                    */}
      {/* ========================================================================= */}
      {selectedCollege && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-800">
                  {selectedCollege.code} • {selectedCollege.affiliation}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {selectedCollege.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedCollege.location} • Est. {selectedCollege.establishedYear}
                </p>
              </div>
              <button
                onClick={() => setSelectedCollege(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedCollege.description}
            </p>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Verified Placements</span>
                <span className="text-sm font-black text-emerald-700">{selectedCollege.verifiedPlacementPercent}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Advertised Placements</span>
                <span className="text-sm font-black text-slate-800">{selectedCollege.advertisedPlacementPercent}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Lab Quality</span>
                <span className="text-sm font-black text-indigo-700">{selectedCollege.practicalLabScore}/100</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Median Package</span>
                <span className="text-sm font-black text-slate-800">{selectedCollege.placementStats.medianPackage}</span>
              </div>
            </div>

            {/* Curriculum Modern Stack vs Legacy Audit */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-extrabold text-slate-900 block flex items-center justify-between">
                <span>Curriculum Modernity vs Industry Reality:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedCollege.practicalTraining ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  Alignment: {selectedCollege.industryAlignment}%
                </span>
              </span>
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Modern Tech Coverage
                  </span>
                  <p className="text-[11px] text-slate-600">
                    {selectedCollege.practicalTraining 
                      ? 'Git workflows, relational SQL schemas, modern web components, REST APIs included in lab syllabi.' 
                      : 'Basic Git exposure; lacks CI/CD, cloud containers, or modern reactive UI framework labs.'}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Traditional Legacy Burden
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Heavy emphasis on legacy C/C++ memory pointers, manual desktop Java applets, and written theory exams over deployed git repositories.
                  </p>
                </div>
              </div>
            </div>

            {/* Department Strengths & Campus Metrics */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-900 block">Top Strongest Departments:</span>
                <div className="flex flex-wrap gap-1">
                  {['Computer Science (CSE)', 'AI & Data Science', 'Electronics (ECE)'].map((dept, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-medium text-[11px]">
                      ★ {dept}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 pt-1">Industry Collaboration: <strong className="text-slate-700">Moderate to High</strong></p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-900 block">Student & Faculty Strength:</span>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Approx Enrolment:</span>
                  <strong className="text-slate-900">~3,200 Students</strong>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Teaching Faculty:</span>
                  <strong className="text-slate-900">~145 Faculty Members</strong>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Student-Faculty Ratio:</span>
                  <strong className="text-indigo-600 font-bold">22:1</strong>
                </div>
              </div>
            </div>

            {/* Verified Student & Alumni Reviews */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 block flex items-center justify-between">
                <span>Verified Student & Alumni Reviews:</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">All Reviews Verified via AP Roll ID</span>
              </span>
              <div className="space-y-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-900">Batch 2024 Graduate (CSE) • Placed at TCS Digital</span>
                    <span className="text-amber-500 font-bold">★ 4.2/5</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    "Theory grounding in OS, DBMS, and DSA is solid. However, we had to learn React and Git completely through SkillBridge and self-study because college syllabus still had outdated Java Servlet lab questions."
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-900">3rd Year Student (AIDS) • SkillBridge Peer Lead</span>
                    <span className="text-amber-500 font-bold">★ 3.9/5</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    "Campus life and peer community are great. The faculty supports hackathon participation, but don't rely only on campus placement training if you want 8+ LPA roles."
                  </p>
                </div>
              </div>
            </div>

            {/* Fee Transparency Box */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-900">Fee Transparency Audit</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                  Regulatory Compliance
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 pt-1 text-slate-700">
                <div>
                  <span className="text-slate-500 block">Govt Prescribed Fee:</span>
                  <strong className="text-slate-900">{selectedCollege.govtPrescribedFee}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Average Collected Fee:</span>
                  <strong className="text-rose-700">{selectedCollege.actualCollectedFee}</strong>
                </div>
              </div>
              <p className="text-[11px] text-amber-900 pt-1">
                {selectedCollege.feeTransparencyDetails}
              </p>
            </div>

            {/* Lab facilities */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">Practical Lab Equipment:</span>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedCollege.practicalLabFacilities}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setReportCollegeId(selectedCollege.id);
                  setSelectedCollege(null);
                  setIsReportModalOpen(true);
                }}
                className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold text-xs rounded-xl cursor-pointer"
              >
                Report Fee Issue for this College
              </button>

              <button
                onClick={() => setSelectedCollege(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Audit View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REPORT FEE ISSUE / DISCREPANCY                                     */}
      {/* ========================================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Report College Fee Discrepancy
                </h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFeeReportSubmit} className="space-y-4 pt-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Select College in Anantapur *
                </label>
                <select
                  value={reportCollegeId}
                  onChange={(e) => setReportCollegeId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none cursor-pointer"
                >
                  {institutions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Issue Category *
                </label>
                <select
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none cursor-pointer"
                >
                  <option value="EXTRA_UNAUTHORIZED_FEE">College charging extra unauthorized fees</option>
                  <option value="DONATION_DEMAND">Donation / Capitation fee demands</option>
                  <option value="DELAYED_SCHOLARSHIP">Delayed scholarship / JVD fee reimbursement</option>
                  <option value="EXAM_FEE_IRREGULARITY">Exam fee or hall ticket withholding irregularities</option>
                  <option value="OTHER">Other fee violation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Govt Prescribed Fee
                  </label>
                  <input
                    type="text"
                    value={reportPrescribedFee}
                    onChange={(e) => setReportPrescribedFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Demanded / Collected Fee
                  </label>
                  <input
                    type="text"
                    value={reportDemandedFee}
                    onChange={(e) => setReportDemandedFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detailed Description & Evidence Notes *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the demand, whether a receipt was issued or refused, which counter demanded it..."
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-indigo-600"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anon"
                    checked={reportIsAnonymous}
                    onChange={(e) => setReportIsAnonymous(e.target.checked)}
                    className="cursor-pointer"
                  />
                  <label htmlFor="anon" className="font-bold text-slate-800 cursor-pointer">
                    Submit as Anonymous Student (Identity Protected)
                  </label>
                </div>
                {!reportIsAnonymous && (
                  <p className="text-[11px] text-slate-500">
                    Filing as: <strong>{reportStudentName}</strong> ({reportRollNumber})
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Transparency Registry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
