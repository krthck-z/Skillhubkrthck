import React, { useState } from 'react';
import {
  Building2,
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Send,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Globe,
  FileCode2,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IndustryHiringOpportunity, CompanyCategory } from '../types';

export const IndustryHiringView: React.FC = () => {
  const {
    industryHiringOpportunities,
    applyToIndustryOpportunity,
    toggleSaveIndustryOpportunity,
    setActiveTab,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOppDetails, setSelectedOppDetails] = useState<IndustryHiringOpportunity | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'ALL', label: 'All Categories' },
    { id: 'MNC', label: 'MNCs & Global Tech' },
    { id: 'NATIONAL_ENTERPRISE', label: 'National Enterprises' },
    { id: 'STARTUP', label: 'High-Growth Startups' },
    { id: 'REGIONAL_INDUSTRY', label: 'Regional Industries' },
    { id: 'MSME', label: 'MSMEs & Local Partners' }
  ];

  const filteredOpportunities = (industryHiringOpportunities || []).filter((opp) => {
    if (selectedCategory !== 'ALL' && opp.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = (opp.roleTitle || '').toLowerCase();
      const company = (opp.companyName || '').toLowerCase();
      const loc = (opp.location || '').toLowerCase();
      const skills = (opp.requiredSkills || []).some((s) => s.toLowerCase().includes(q));
      return title.includes(q) || company.includes(q) || loc.includes(q) || skills;
    }
    return true;
  });

  const getCategoryBadge = (cat: CompanyCategory | string) => {
    switch (cat) {
      case 'MNC':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">MNC / Global Tech</span>;
      case 'NATIONAL':
      case 'NATIONAL_ENTERPRISE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-50 text-indigo-800 border border-indigo-200">National Enterprise</span>;
      case 'STARTUP':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-50 text-rose-800 border border-rose-200">Venture Startup</span>;
      case 'REGIONAL':
      case 'REGIONAL_INDUSTRY':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">Regional Industry</span>;
      case 'MSME':
      case 'LOCAL':
      case 'INDUSTRY_SPECIFIC':
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">MSME / Regional Partner</span>;
    }
  };

  const getUrgencyBadge = () => {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300">
        <Zap className="w-3 h-3 text-rose-600" />
        <span>48H Fast Match Active</span>
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Multi-Tier Industry Employer Directory</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Industry Hiring & Corporate Pipelines
            </h1>
            <p className="text-base sm:text-lg font-bold text-purple-700">
              Direct Verified Hiring from MNCs, National Enterprises, Startups, and MSMEs.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            SkillBridge replaces generic job boards with competency-matched employer pipelines. Every opening features <strong>Required Proctored Assessments</strong>, <strong>Viva Code Defense Criteria</strong>, and transparent <strong>CTC / Stipend packages</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => {
                setSelectedUrgency('IMMEDIATE_48H');
                showToast('Filtering by 48H Urgent Recruiters');
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Show 48H Urgent Openings</span>
            </button>

            <button
              onClick={() => setActiveTab('fast-match')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore 48H Fast Match Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, roles, locations, or skills (e.g. React, PyTorch, Embedded)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Category & Urgency */}
              <div className="flex items-start justify-between gap-2">
                {getCategoryBadge(opp.companyCategory)}
                <button
                  onClick={() => toggleSaveIndustryOpportunity(opp.id)}
                  className="text-slate-400 hover:text-purple-600 cursor-pointer p-1"
                  title="Bookmark Opportunity"
                >
                  {opp.saved ? (
                    <BookmarkCheck className="w-4 h-4 text-purple-600 fill-purple-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Title & Company */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    {opp.roleTitle}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                  <Building2 className="w-3.5 h-3.5" />
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
              </div>

              {/* Urgency Pill */}
              <div>{getUrgencyBadge()}</div>

              {/* Compensation */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Compensation:</span>
                <span className="text-slate-900 font-extrabold">{opp.stipendOrSalary}</span>
              </div>

              {/* Required Skills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Verified Skills Required:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(opp.requiredSkills || []).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-800 border border-purple-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Defense & Assessment Criteria */}
              <div className="space-y-1 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Verification: <strong>{opp.verificationStatus}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate">Eligibility: <strong>{opp.eligibility}</strong></span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('assessments');
                  showToast(`Opening proctored skill assessments`);
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                title="Take required skill assessment"
              >
                Assess
              </button>

              <button
                onClick={() => applyToIndustryOpportunity(opp.id)}
                disabled={opp.applied}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  opp.applied
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
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
  );
};
