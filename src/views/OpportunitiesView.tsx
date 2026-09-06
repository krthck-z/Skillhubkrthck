import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Info,
  Tag,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OpportunityItem } from '../types';
import { expandedOpportunitiesList, ExpandedOpportunity } from '../data/expandedOpportunitiesData';

export const OpportunitiesView: React.FC = () => {
  const {
    opportunities,
    setSelectedOpportunityModal,
    setIsTrainJobModalOpen,
    applyToOpportunity,
    showToast
  } = useApp();

  const [domainFilter, setDomainFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine core opportunities with expanded multi-domain opportunities
  const allOpportunitiesList = [
    ...opportunities.map(o => ({
      ...o,
      careerDomain: 'Technology & AI' as const,
      isSampleDemo: false,
      applicationMode: 'DIRECT_APPLY' as const,
      experienceRequired: '0–1 Years / Fresh Graduates'
    })),
    ...expandedOpportunitiesList
  ];

  const domains = [
    'ALL',
    'Technology & AI',
    'Hardware & Robotics',
    'Creative, Media & Design',
    'Engineering & Manufacturing',
    'Aviation, Travel & Hospitality',
    'Agriculture & Agritech',
    'Government & Public Sector'
  ];

  const types = [
    { id: 'ALL', label: 'All Work Types' },
    { id: 'INTERNSHIP', label: 'Internships' },
    { id: 'FULL_TIME', label: 'Full-Time Roles' },
    { id: 'PART_TIME', label: 'Earn While You Learn (Part-Time)' },
    { id: 'FELLOWSHIP', label: 'Fellowships & Research' },
    { id: 'HACKATHON', label: 'Hackathons & Challenges' }
  ];

  const filtered = allOpportunitiesList.filter((opp) => {
    const matchesDomain = domainFilter === 'ALL' || opp.careerDomain === domainFilter;
    const matchesType = typeFilter === 'ALL' || opp.type === typeFilter;
    const matchesElig = eligibilityFilter === 'ALL' || opp.eligibilityStatus === eligibilityFilter;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesType && matchesElig && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Regional & Multi-Domain Opportunity Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Verified Opportunities & Career Drives
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Real industry openings, apprenticeships, and university fellowships evaluated against your demonstrated passport. No blind resume scanning.
          </p>
        </div>

        <button
          onClick={() => setIsTrainJobModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-indigo-200 hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Train For Job Pathway</span>
        </button>
      </div>

      {/* Demo Disclosure Transparency Notice */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">SkillBridge Transparency Protocol:</strong>
          <span className="ml-1 text-amber-800">
            Real-world opportunities are marked with verified green badges. Curated simulations and educational exercises are explicitly labelled as <strong>[SAMPLE DEMO DATA]</strong> to maintain genuine recruiter trust.
          </span>
        </div>
      </div>

      {/* Fast Match For Students Section */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Fast Match Engine
              </span>
              <span className="text-xs font-bold text-slate-300">
                Direct Recruiter Matching
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Top Calibrated Matches for Your Profile
            </h2>
          </div>
          <span className="text-xs text-indigo-300">
            Based on your 92% readiness score & verified Git repositories
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {allOpportunitiesList.slice(0, 2).map((opp) => (
            <div
              key={`fast-${opp.id}`}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-500/30 text-indigo-200 border border-indigo-400/20 uppercase">
                    {opp.careerDomain}
                  </span>
                  <span className="text-sm font-black text-emerald-400 font-mono">
                    {opp.matchScore}% Match
                  </span>
                </div>
                <h3 className="font-bold text-base text-white">{opp.title}</h3>
                <p className="text-xs text-slate-300">
                  {opp.companyName} • <MapPin className="w-3 h-3 inline text-slate-400" /> {opp.location}
                </p>
                <p className="text-xs font-bold text-emerald-400 font-mono">{opp.stipendOrSalary}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <span className="text-[11px] text-slate-400">Application Deadline: {opp.deadline}</span>
                <button
                  onClick={() => setSelectedOpportunityModal(opp)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar: Domain, Work Type & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roles by title, company, skills, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-slate-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-400">Career Domain:</span>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
            >
              {domains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
            >
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>Showing <strong>{filtered.length}</strong> opportunities matching your filters</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-indigo-600 hover:underline cursor-pointer font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className={`bg-white rounded-3xl p-6 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              opp.applied
                ? 'border-emerald-200 bg-emerald-50/10'
                : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
            }`}
          >
            <div className="space-y-2.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black text-lg text-slate-900">{opp.title}</span>
                
                {/* Domain Pill */}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                  {opp.careerDomain}
                </span>

                {/* Work Type Pill */}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                  {(opp.type || '').replace(/_/g, ' ')}
                </span>

                {/* Verified vs Demo Tag */}
                {opp.isSampleDemo || opp.companyName.includes('(DEMO)') ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 tracking-wide">
                    SAMPLE DEMO DATA
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Industry Drive
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600">
                <strong className="text-slate-900">{opp.companyName}</strong> • {opp.industry} • <MapPin className="w-3.5 h-3.5 inline text-slate-400 -mt-0.5" /> {opp.location}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                <span className="font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-mono">
                  {opp.stipendOrSalary}
                </span>
                <span>•</span>
                <span>Work Mode: {opp.workMode}</span>
                <span>•</span>
                <span>Experience: {opp.experienceRequired}</span>
                <span>•</span>
                <span>Deadline: {opp.deadline}</span>
              </div>

              {/* Skills and match breakdown */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-slate-700">Skills required:</span>
                {opp.requiredSkills.map((req, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 ${
                      req.met
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {req.met ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-rose-500" />}
                    {req.skill}
                  </span>
                ))}
              </div>

              {opp.missingSkills.length > 0 ? (
                <p className="text-[11px] text-amber-800 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  Gaps to bridge: <strong>{opp.missingSkills.join(', ')}</strong> (Take training pathway to qualify)
                </p>
              ) : (
                <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  100% matched! Verified evidence meets all recruiter specifications.
                </p>
              )}
            </div>

            {/* Match percentage score & Actions */}
            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-left md:text-right">
                <div className="flex items-baseline md:justify-end gap-1.5">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {opp.matchScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Match</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  opp.eligibilityStatus === 'ELIGIBLE'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {(opp.eligibilityStatus || '').replace(/_/g, ' ')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {opp.trainingPathAvailable && opp.missingSkills.length > 0 && (
                  <button
                    onClick={() => setIsTrainJobModalOpen(true)}
                    className="px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors cursor-pointer"
                  >
                    Train For This
                  </button>
                )}

                <button
                  onClick={() => setSelectedOpportunityModal(opp)}
                  className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  View Details
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
