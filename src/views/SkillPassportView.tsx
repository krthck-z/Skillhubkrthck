import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Award,
  RefreshCw,
  Printer,
  Share2,
  ExternalLink,
  MapPin,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillPassportView: React.FC = () => {
  const { profile, skills, revalidateSkill, showToast } = useApp();

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Verified Skill Passport URL copied to clipboard for employers!');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Passport Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-white font-extrabold text-2xl shadow-inner shrink-0">
              KP
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {profile.name} • Professional Skill Passport
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Blockchain Authenticated
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {profile.degree} • {profile.institution} • {profile.location}
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                <span>Passport ID: <strong className="font-mono text-white">SB-2026-AP-7959</strong></span>
                <span>•</span>
                <span>Target Career: <strong className="text-indigo-300">{profile.targetCareer}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Credential</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Freshness & Trust Guarantee Alert (Section 43) */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs flex items-start gap-3">
        <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-indigo-950">Dynamic Skill Freshness Protocol:</h4>
          <p className="text-indigo-900 mt-0.5 leading-relaxed">
            "Skills do not remain permanently verified. Technology shifts, framework APIs evolve, and memory decays. SkillBridge requires regular micro-revalidations (every 6 to 12 months) so recruiters can trust your <em>current</em> practical capability."
          </p>
        </div>
      </div>

      {/* Verified Skills Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Demonstrated Capabilities Matrix</h2>
            <p className="text-xs text-slate-500">Separates genuine verified mastery from self-declared claims</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {skills.length} Tracked Capabilities
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Demonstrated Level</th>
                <th className="py-3 px-4">Evidence Level</th>
                <th className="py-3 px-4">Verification State</th>
                <th className="py-3 px-4">Freshness</th>
                <th className="py-3 px-4">Proctored Venue / Viva</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {skills.map((s) => {
                const isHighTrust = s.evidenceConfidence === 'HIGH';
                const isDue = s.freshness === 'REVALIDATION_DUE';
                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {s.name}
                      <span className="block text-[10px] font-normal text-slate-400">{s.category}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                        {s.currentLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold text-slate-800">
                        {(s.evidenceLevel || '').replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isHighTrust
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {(s.status || '').replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isDue ? (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[10px] border border-amber-200">
                          <AlertCircle className="w-3 h-3" /> Due in 30 Days
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> CURRENT (Fresh)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {s.offlineCenterName ? (
                        <span className="flex items-center gap-1 text-[11px] text-slate-800">
                          <MapPin className="w-3 h-3 text-indigo-500" /> {s.offlineCenterName}
                        </span>
                      ) : s.vivaScore ? (
                        <span className="text-[11px] text-indigo-700 font-mono font-semibold">
                          Viva Score: {s.vivaScore}%
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isDue ? (
                        <button
                          onClick={() => revalidateSkill(s.id)}
                          className="px-2.5 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer border border-indigo-200"
                        >
                          Revalidate Now
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Verified</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Startup & Project Experience Section */}
      {profile.startupExperiences.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-base text-slate-900">Verified Startup Experience</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            {profile.startupExperiences.map((exp, i) => (
              <div key={i} className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-purple-950 text-sm">{exp.role}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-200/80 text-purple-900 font-bold text-[10px]">
                    {exp.evidenceStatus}
                  </span>
                </div>
                <p className="font-semibold text-purple-900">{exp.startupName} • {exp.duration}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {exp.skillsDemonstrated.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-purple-800 text-[10px] font-mono border border-purple-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
