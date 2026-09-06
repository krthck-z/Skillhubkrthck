import React from 'react';
import {
  BarChart3,
  Building2,
  Users,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Award,
  Globe,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Cpu,
  MapPin
} from 'lucide-react';
import { companyIntelligenceData } from '../../data/portalDetailedData';

export const IndustryReportsModule: React.FC = () => {
  const metrics = [
    { label: 'Total Recruitments', value: 26, unit: 'Hired', trend: '+4 this month', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'New Recruitments This Quarter', value: 8, unit: 'Q3 2026', trend: 'On target', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Requirements', value: 3, unit: 'Open Roles', trend: 'Live in Fast Match', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Internships', value: 14, unit: 'Students', trend: 'Stipendiary', color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Completed Internships', value: 24, unit: 'Graduated', trend: '92% PPO conversion', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Students Trained', value: 180, unit: 'Learners', trend: 'Through SkillBridge Labs', color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Faculty Trained', value: 12, unit: 'Professors', trend: 'Regional Colleges', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Training Programs', value: 4, unit: 'Cohorts', trend: 'Full Stack & IoT', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Completed Programs', value: 5, unit: 'Bootcamps', trend: 'Practical Certified', color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'Active Industry Projects', value: 8, unit: 'Live Teams', trend: 'SSBN & JNTUA', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Completed Projects', value: 6, unit: 'Deployed', trend: 'Production Live', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Academic MoUs', value: 3, unit: 'Active', trend: 'SSBN, JNTUA, SKU', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'College Partnerships', value: 4, unit: 'Campuses', trend: 'Rayalaseema Belt', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'CSR Academic Support', value: '₹4.5L', unit: 'Lab Grants', trend: 'Hardware Workstations', color: 'text-rose-600', bg: 'bg-rose-50' }
  ];

  // Visual Hiring Velocity Data for 6 Months
  const hiringVelocity = [
    { month: 'Apr', hires: 3, height: '35%' },
    { month: 'May', hires: 4, height: '48%' },
    { month: 'Jun', hires: 2, height: '25%' },
    { month: 'Jul', hires: 5, height: '60%' },
    { month: 'Aug', hires: 7, height: '85%' },
    { month: 'Sep', hires: 8, height: '100%' }
  ];

  // College Distribution of Talent Placements
  const collegeShare = [
    { name: 'SSBN Autonomous College, Anantapur', hires: 14, percent: 54 },
    { name: 'JNTUA College of Engineering', hires: 8, percent: 31 },
    { name: 'Sri Krishnadevaraya University (SKU)', hires: 4, percent: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* Transparency Protocol & Data Integrity Disclaimer */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-5 flex items-start gap-3.5">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-amber-900">
          <h4 className="font-bold">SkillBridge Corporate Transparency & Data Integrity Protocol</h4>
          <p className="leading-relaxed">
            All academic partnership data, verified recruitment counters, and training outcomes reflect verified platform milestones.
            Proprietary private corporate financial data (such as corporate annual turnover) is strictly marked as <strong>"Confidential / Not Disclosed"</strong> in compliance with enterprise governance standards.
          </p>
        </div>
      </div>

      {/* Verified Company Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
              RT
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">{companyIntelligenceData.companyName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-200">
                  Verified Industry Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {companyIntelligenceData.industry} • Established {companyIntelligenceData.establishedYear}
              </p>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Annual Turnover</span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md inline-block mt-0.5">
              {companyIntelligenceData.annualTurnover}
            </span>
          </div>
        </div>

        {/* Structured Corporate Attributes Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Headquarters & Location</span>
            </span>
            <p className="font-bold text-slate-800">{companyIntelligenceData.headquarters}</p>
            <p className="text-slate-500 text-[11px]">{companyIntelligenceData.location}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Engineering Strength</span>
            </span>
            <p className="font-bold text-slate-800">{companyIntelligenceData.employeeStrength}</p>
            <p className="text-slate-500 text-[11px]">Size: {companyIntelligenceData.companySize}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>Industry Specialization</span>
            </span>
            <p className="font-bold text-slate-800 leading-snug">{companyIntelligenceData.industrySpecialization}</p>
          </div>
        </div>

        {/* Technologies Stack & Operating Units */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Verified Production Technologies:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {companyIntelligenceData.technologiesUsed.map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Academic MoUs & CSR Impact */}
        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
              Active University Partnerships:
            </span>
            <div className="space-y-1.5">
              {companyIntelligenceData.academicPartnerships.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-indigo-950 block">{p.college}</span>
                    <span className="text-[10px] text-slate-500">{p.focus}</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
              CSR & Academic Lab Infrastructure Grant:
            </span>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-xs space-y-2">
              <span className="font-bold text-emerald-950 block">Regional Hardware & Lab Equipment Grants</span>
              <p className="text-emerald-800 leading-relaxed text-[11px]">
                {companyIntelligenceData.csrAcademicGrants}
              </p>
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited Under CSR Section 135 & SkillBridge Transparency Charter</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 14 Key Dynamic Activity Metrics Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>14 Key Operational & Academic Recruitment Metrics</span>
          </h3>
          <span className="text-xs text-slate-500">Live Enterprise Telemetry</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                {m.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-black font-mono ${m.color}`}>{m.value}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{m.unit}</span>
              </div>
              <span className="text-[9px] text-slate-500 block truncate">{m.trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Charts: Velocity and Campus Share */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Hiring Velocity Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Hiring Velocity (Last 6 Months)</h4>
              <p className="text-[11px] text-slate-500">Number of student and intern offers accepted</p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200">
            {hiringVelocity.map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-black text-indigo-700 font-mono">{bar.hires}</span>
                <div
                  className="w-full max-w-[36px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all"
                  style={{ height: bar.height }}
                />
                <span className="text-[10px] font-bold text-slate-500">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Share by College */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Placement Share by Regional Institution</h4>
              <p className="text-[11px] text-slate-500">Distribution across verified campus MoUs</p>
            </div>
            <GraduationCap className="w-4 h-4 text-indigo-600" />
          </div>

          <div className="space-y-3 pt-2">
            {collegeShare.map((col, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{col.name}</span>
                  <span className="font-mono font-bold text-indigo-700">{col.hires} hires ({col.percent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${col.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
