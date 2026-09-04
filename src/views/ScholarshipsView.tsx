import React, { useState } from 'react';
import {
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ScholarshipsView: React.FC = () => {
  const { scholarships, applyToScholarship, profile } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const filtered = scholarships.filter((s) =>
    (s.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.provider || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              <DollarSign className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Scholarships, Subsidies & Fee Assistance
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            No student should abandon capability building due to proctored test fees, internet costs, or laptop constraints. SkillBridge bridges students with public & CSR funds.
          </p>
        </div>
      </div>

      {/* Philosophy Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-emerald-950 font-medium">
            <strong>Direct Fee Waiver:</strong> Verified students can have up to 100% of their physical offline assessment fees covered directly through government skill subsidies.
          </span>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500">{s.provider}</p>
                </div>
                <span className="font-extrabold text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  {s.benefitAmount}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{s.whyRecommended}</p>

              {/* Criteria */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-700 text-[10px] uppercase">Eligibility Criteria:</span>
                <ul className="space-y-0.5 text-[11px] text-slate-600 list-disc list-inside">
                  {(s.requirements || []).map((c, i) => (
                    <li key={i}>{c.label} {c.met ? '✓' : '(Pending)'}</li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div className="text-xs">
                <span className="font-bold text-slate-700 text-[10px] uppercase block mb-1">
                  Required Documents:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(s.requiredDocuments || []).map((doc, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] flex items-center gap-1">
                      <FileText className="w-3 h-3 text-slate-400" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                <span>Application Deadline: <strong>{s.deadline}</strong></span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                s.applied
                  ? 'bg-indigo-100 text-indigo-800'
                  : s.eligibilityStatus === 'ELIGIBLE'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {s.applied ? 'Application Submitted ✓' : (s.eligibilityStatus || '').replace(/_/g, ' ')}
              </span>

              {s.applied ? (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Processing Review
                </span>
              ) : (
                <button
                  onClick={() => applyToScholarship(s.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Apply with Verified Docs
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
