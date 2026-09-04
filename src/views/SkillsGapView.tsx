import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Award,
  ArrowRight,
  TrendingDown,
  Filter,
  Search,
  Sparkles,
  Calendar,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SkillItem, EvidenceLevel } from '../types';

export const SkillsGapView: React.FC = () => {
  const {
    skills,
    setActiveTab,
    setActiveAssessmentModalItem,
    assessments,
    setActiveOfflineModalSkill,
    revalidateSkill
  } = useApp();

  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const evidenceTrustHierarchy: EvidenceLevel[] = [
    'SELF_DECLARED',
    'CERTIFICATE_UPLOADED',
    'CERTIFICATE_VERIFIED',
    'ASSESSMENT_PASSED',
    'PRACTICAL_VERIFIED',
    'VIVA_DEFENSE',
    'OFFLINE_VERIFIED',
    'INDUSTRY_VERIFIED',
    'REAL_PERFORMANCE'
  ];

  const filteredSkills = skills.filter((s) => {
    const matchesSeverity = filterSeverity === 'ALL' || s.gapSeverity === filterSeverity;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Personalized Skill Gap Diagnostic Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculated against Full Stack Developer requirements. Tracks exact capability deficit and trust confidence.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('skill-passport')}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>View Verified Skill Passport →</span>
        </button>
      </div>

      {/* Trust Hierarchy Visualization (Section 12) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              SkillBridge Evidence & Trust Hierarchy
            </h2>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            Higher Evidence = Stronger Trust
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          A certificate proves you spent time reading or listening. Proctored sandboxes, live code defense, and offline physical examination prove you can execute under industry scrutiny.
        </p>

        {/* Linear Stepper */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 pt-2 text-[10px] font-mono">
          {evidenceTrustHierarchy.map((lvl, index) => (
            <div
              key={lvl}
              className={`p-2 rounded-lg text-center border ${
                index >= 6
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold'
                  : index >= 4
                  ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 font-medium'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <span className="block text-[9px] text-slate-400 opacity-60">Lvl {index + 1}</span>
              <span className="line-clamp-2 mt-0.5">{(lvl || '').replace(/_/g, ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search skill (e.g. React, Node.js, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'Critical', 'High', 'Medium', 'Low', 'None'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterSeverity === sev
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sev === 'ALL' ? 'All Skills' : `${sev} Gap`}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Diagnostic Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => {
          const isCritical = skill.gapSeverity === 'Critical';
          const isHigh = skill.gapSeverity === 'High';
          return (
            <div
              key={skill.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{skill.name}</h3>
                    <span className="text-[11px] text-slate-500">{skill.category}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : isHigh
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : skill.gapSeverity === 'None'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}
                  >
                    {skill.gapSeverity === 'None' ? 'Mastered ✓' : `${skill.gapSeverity} Gap`}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {skill.description}
                </p>

                {/* Level & Gap Bar */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600">
                      Current: <strong className="text-slate-900">{skill.currentLevel}</strong>
                    </span>
                    <span className="text-slate-600">
                      Target: <strong className="text-indigo-700">{skill.requiredLevel}</strong>
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${skill.gapPercentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Deficit Gap: <strong>{skill.gapPercentage}%</strong></span>
                    <span>Verified: <strong>{100 - skill.gapPercentage}%</strong></span>
                  </div>
                </div>

                {/* Evidence Metrics */}
                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Evidence State:</span>
                    <span className="font-bold text-slate-900">{(skill.evidenceLevel || '').replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Evidence Confidence:</span>
                    <span className={`font-bold ${
                      skill.evidenceConfidence === 'HIGH' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {skill.evidenceConfidence}
                    </span>
                  </div>
                  {skill.vivaScore && (
                    <div className="flex justify-between text-slate-600">
                      <span>Oral Viva Defense:</span>
                      <span className="font-mono font-bold text-indigo-700">{skill.vivaScore}%</span>
                    </div>
                  )}
                  {skill.freshness === 'REVALIDATION_DUE' && (
                    <div className="flex items-center justify-between text-amber-800 bg-amber-50 p-1.5 rounded-lg text-[11px]">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3" /> Revalidation Due in 30 Days
                      </span>
                      <button
                        onClick={() => revalidateSkill(skill.id)}
                        className="text-xs font-bold text-indigo-600 underline"
                      >
                        Revalidate
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Card CTA Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveTab('learning')}
                  className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                >
                  View Learning
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const assess = assessments.find((a) => a.skill.toLowerCase() === skill.name.toLowerCase());
                      if (assess) setActiveAssessmentModalItem(assess);
                      else setActiveTab('assessments');
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Assess
                  </button>

                  <button
                    onClick={() => setActiveOfflineModalSkill(skill.name)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    title="Book Proctored Physical Exam"
                  >
                    Verify
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
