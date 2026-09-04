import React from 'react';
import {
  X,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OpportunityDetailModal: React.FC = () => {
  const {
    selectedOpportunityModal,
    setSelectedOpportunityModal,
    applyToOpportunity,
    setIsTrainJobModalOpen,
    setActiveTab
  } = useApp();

  if (!selectedOpportunityModal) return null;

  const opp = selectedOpportunityModal;

  const handleApply = () => {
    applyToOpportunity(opp.id);
    setSelectedOpportunityModal(null);
  };

  const handleStartTraining = () => {
    setSelectedOpportunityModal(null);
    setIsTrainJobModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900">{opp.title}</span>
                {opp.isVerifiedCompany && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Employer
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{opp.companyName} • {opp.industry}</p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {opp.location}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-700">{opp.stipendOrSalary}</span>
                <span>•</span>
                <span>Deadline: {opp.deadline}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedOpportunityModal(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Eligibility Diagnostics */}
        <div className="p-5 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Profile Capability Match Engine:
            </h4>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              opp.eligibilityStatus === 'ELIGIBLE'
                ? 'bg-emerald-100 text-emerald-800'
                : opp.eligibilityStatus === 'PARTIALLY_ELIGIBLE'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {opp.matchScore}% Match • {(opp.eligibilityStatus || '').replace(/_/g, ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {opp.requiredSkills.map((req, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                  req.met
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-semibold'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950 font-medium'
                }`}
              >
                {req.met ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <span>{req.skill}</span>
              </div>
            ))}
          </div>

          {opp.missingSkills.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Missing Prerequisites: </span>
                <span>{opp.missingSkills.join(', ')}. </span>
                <span className="text-amber-800">Complete verified learning or practical assessment to achieve 100% eligibility.</span>
              </div>
            </div>
          )}
        </div>

        {/* Job Responsibilities & Description */}
        <div className="p-5 space-y-4 text-xs flex-1">
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-1">About the Role:</h4>
            <p className="text-slate-600 leading-relaxed">{opp.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-1.5">Key Responsibilities:</h4>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              {opp.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-1.5">Benefits & Perks:</h4>
            <div className="flex flex-wrap gap-2">
              {opp.perks.map((p, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            {opp.trainingPathAvailable && opp.missingSkills.length > 0 && (
              <button
                onClick={handleStartTraining}
                className="px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Train For This Job Pathway</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedOpportunityModal(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
            >
              Close
            </button>
            {opp.applied ? (
              <span className="px-5 py-2 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Applied
              </span>
            ) : (
              <button
                onClick={handleApply}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply with Verified Passport</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
