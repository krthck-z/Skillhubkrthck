import React, { useState } from 'react';
import {
  FileCheck,
  ShieldAlert,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Play,
  Check,
  FolderGit2,
  Building,
  Info,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AssessmentItem } from '../types';

export const AssessmentsView: React.FC = () => {
  const {
    assessments,
    setActiveAssessmentModalItem,
    setActiveOfflineModalSkill,
    offlineBookings,
    verifyOfflineAssessmentSuccess,
    setIsTrainJobModalOpen,
    setActiveTab,
    profile
  } = useApp();

  const [selectedRoute, setSelectedRoute] = useState<'ALL' | 'ROUTE_PORTFOLIO' | 'ROUTE_ONLINE' | 'ROUTE_OFFLINE' | 'ROUTE_COMPANY'>('ALL');

  const filteredAssessments = assessments.filter((a) => {
    if (selectedRoute === 'ROUTE_ONLINE') return a.type === 'PRACTICAL_CODING' || a.type === 'VIVA';
    if (selectedRoute === 'ROUTE_OFFLINE') return a.type === 'OFFLINE_VERIFIED' || a.offlineCenterAvailable;
    return true;
  });

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <FileCheck className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Capability Verification & 4 Assessment Routes
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            SkillBridge offers flexible, fraud-resistant proof of capability. Choose the verification pathway that fits your lifestyle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('portfolio')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Direct Portfolio Route</span>
          </button>
        </div>
      </div>

      {/* CRITICAL CLARIFICATION BANNER: OFFLINE IS NOT MANDATORY */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-extrabold text-amber-900 text-sm block">
            Offline Assessment is 100% Voluntary & Not Mandatory
          </span>
          <p className="text-amber-800 leading-relaxed">
            You do <strong>not</strong> have to travel to an offline exam centre to get hired or certified on SkillBridge. You can complete verification directly through <strong>Route 1 (Verified Projects)</strong> or <strong>Route 2 (Proctored Online Sandbox)</strong>. Offline centre evaluation is purely voluntary for students who want physical invigilation stamps.
          </p>
        </div>
      </div>

      {/* THE 4 ASSESSMENT ROUTES CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Route 1: Direct Portfolio Application */}
        <div
          onClick={() => setSelectedRoute('ROUTE_PORTFOLIO')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            selectedRoute === 'ROUTE_PORTFOLIO'
              ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                Route 1
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">Zero Exam</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-2">
              Direct Portfolio Application
            </h2>
            <p className="text-xs text-slate-500 mt-1 line-clamp-3">
              Use your authenticated GitHub repository, live web deployment, or startup code. Bypasses tests when commit history proves authenticity.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('portfolio');
            }}
            className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Manage Verified Projects →
          </button>
        </div>

        {/* Route 2: Online Proctored Sandbox */}
        <div
          onClick={() => setSelectedRoute('ROUTE_ONLINE')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            selectedRoute === 'ROUTE_ONLINE'
              ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                Route 2
              </span>
              <span className="text-[10px] text-indigo-600 font-bold">Standard</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-2">
              Online Verified Sandbox & Viva
            </h2>
            <p className="text-xs text-slate-500 mt-1 line-clamp-3">
              Timed coding sandboxes with shuffled algorithm tests, followed by an automated oral viva defense to verify code authorship.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRoute('ROUTE_ONLINE');
            }}
            className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Filter Online Tests →
          </button>
        </div>

        {/* Route 3: Voluntary Offline Lab */}
        <div
          onClick={() => setSelectedRoute('ROUTE_OFFLINE')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            selectedRoute === 'ROUTE_OFFLINE'
              ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Route 3 (Voluntary)
              </span>
              <span className="text-[10px] text-amber-700 font-bold">Optional Trust</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-2">
              Voluntary Offline Center
            </h2>
            <p className="text-xs text-slate-500 mt-1 line-clamp-3">
              Attend a proctored physical lab session at Anantapur District Skill Lab or partner colleges for maximum physical verification trust.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveOfflineModalSkill('React');
            }}
            className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Book Anantapur Lab →
          </button>
        </div>

        {/* Route 4: Company-Sponsored Training */}
        <div
          onClick={() => setSelectedRoute('ROUTE_COMPANY')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            selectedRoute === 'ROUTE_COMPANY'
              ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-600/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Route 4
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">Sponsored</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-2">
              Company Training Pathway
            </h2>
            <p className="text-xs text-slate-500 mt-1 line-clamp-3">
              Sponsored fast-track curriculum curated by partner firms (CloudScale, Andhra FinTech) with guaranteed direct interviews upon completion.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsTrainJobModalOpen(true);
            }}
            className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Train For Job Pathway →
          </button>
        </div>

      </div>

      {/* Booked Offline Sessions Banner (If any) */}
      {offlineBookings.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white border border-emerald-500/40 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm sm:text-base">
                Proctored Voluntary Offline Session Scheduled
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
              STATUS: {offlineBookings[0].status}
            </span>
          </div>

          <div className="grid sm:grid-cols-4 gap-3 text-xs bg-white/5 p-3 rounded-xl border border-white/10">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Candidate</span>
              <span className="font-bold text-white">{offlineBookings[0].candidateName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Skill & Date</span>
              <span className="font-bold text-emerald-300">{offlineBookings[0].skillName} • {offlineBookings[0].date}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Venue</span>
              <span className="font-medium text-slate-200">{offlineBookings[0].venue}, {offlineBookings[0].city}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Slot & Fee</span>
              <span className="font-medium text-slate-200">{offlineBookings[0].time} ({offlineBookings[0].fee})</span>
            </div>
          </div>

          {offlineBookings[0].status === 'CONFIRMED' && (
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-slate-300">
                Demonstrate passing your voluntary offline verification to stamp your passport:
              </span>
              <button
                onClick={() => verifyOfflineAssessmentSuccess(offlineBookings[0].skillName)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Simulate Exam Passed (94%)</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Available Assessments List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Active Assessment Challenges ({filteredAssessments.length})
            </h2>
            <p className="text-xs text-slate-500">
              Tested against dynamic question generators and oral defense
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setSelectedRoute('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedRoute === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Routes
            </button>
            <button
              onClick={() => setSelectedRoute('ROUTE_ONLINE')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedRoute === 'ROUTE_ONLINE' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Online Only
            </button>
            <button
              onClick={() => setSelectedRoute('ROUTE_OFFLINE')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedRoute === 'ROUTE_OFFLINE' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Voluntary Offline
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredAssessments.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>Skill: <strong className="text-indigo-700">{item.skill}</strong></span>
                      <span>•</span>
                      <span>{item.durationMinutes} Mins</span>
                      <span>•</span>
                      <span>Pass: {item.passingScore}%</span>
                    </div>
                  </div>

                  {item.passed ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Passed ({item.score}%)
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      Pending
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <span className="font-bold text-slate-700 text-[10px] uppercase">Integrity Elements:</span>
                  <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                    {(item.integrityFeatures || []).slice(0, 3).map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {item.offlineCenterAvailable && (
                  <button
                    onClick={() => setActiveOfflineModalSkill(item.skill)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Offline (Voluntary)
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setActiveAssessmentModalItem(item)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                      item.passed
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{item.passed ? 'Retake Defense' : 'Start Assessment'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
