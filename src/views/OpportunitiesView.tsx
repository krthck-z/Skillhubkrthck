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
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OpportunityItem } from '../types';

export const OpportunitiesView: React.FC = () => {
  const {
    opportunities,
    setSelectedOpportunityModal,
    setIsTrainJobModalOpen,
    applyToOpportunity
  } = useApp();

  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const types = [
    { id: 'ALL', label: 'All Openings' },
    { id: 'INTERNSHIP', label: 'Internships' },
    { id: 'FULL_TIME', label: 'Full-Time Jobs' },
    { id: 'PART_TIME', label: 'Earn While You Learn (Part-Time)' },
    { id: 'PROJECT', label: 'Live Projects' },
    { id: 'HACKATHON', label: 'Hackathons' }
  ];

  const filtered = opportunities.filter((opp) => {
    const matchesType = typeFilter === 'ALL' || opp.type === typeFilter;
    const matchesElig = eligibilityFilter === 'ALL' || opp.eligibilityStatus === eligibilityFilter;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesElig && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Verified Opportunity & Hiring Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real industry openings evaluated against your demonstrated passport. No blind keyword resume screening.
          </p>
        </div>

        <button
          onClick={() => setIsTrainJobModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Train For This Job Pathway</span>
        </button>
      </div>

      {/* Philosophy Banner: Where Am I Eligible? (Section 15 & 16) */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-emerald-950 font-medium">
            <strong>Direct Recruiter Access:</strong> When your passport proves 100% verified match, employers bypass standard ATS resume filters and extend guaranteed interview slots.
          </span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by title, company, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Status:</span>
            {['ALL', 'ELIGIBLE', 'PARTIALLY_ELIGIBLE'].map((el) => (
              <button
                key={el}
                onClick={() => setEligibilityFilter(el)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  eligibilityFilter === el
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {el === 'ALL' ? 'All' : (el || '').replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunity Type Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                typeFilter === t.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-3.5">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className={`bg-white rounded-2xl p-5 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
              opp.applied
                ? 'border-emerald-200 bg-emerald-50/10'
                : 'border-slate-200 hover:border-indigo-300 hover:shadow-xs'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-base text-slate-900">{opp.title}</span>
                {opp.isVerifiedCompany && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Partner
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                  {(opp.type || '').replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-600">
                <strong className="text-slate-800">{opp.companyName}</strong> • {opp.industry} • <MapPin className="w-3.5 h-3.5 inline text-slate-400 -mt-0.5" /> {opp.location}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {opp.stipendOrSalary}
                </span>
                <span>•</span>
                <span>Duration: {opp.duration}</span>
                <span>•</span>
                <span>Deadline: {opp.deadline}</span>
              </div>

              {/* Skills and match breakdown */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-slate-700">Skills required:</span>
                {opp.requiredSkills.map((req, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
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
                  Gap to bridge: <strong>{opp.missingSkills.join(', ')}</strong> (Take training pathway to qualify)
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
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {opp.matchScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Match</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                    className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors cursor-pointer"
                  >
                    Train For This
                  </button>
                )}

                <button
                  onClick={() => setSelectedOpportunityModal(opp)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
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
