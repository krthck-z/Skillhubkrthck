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
  Check
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
    profile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ALL' | 'PRACTICAL' | 'OFFLINE'>('ALL');

  const filteredAssessments = assessments.filter((a) => {
    if (activeTab === 'PRACTICAL') return a.type === 'PRACTICAL_CODING' || a.type === 'VIVA';
    if (activeTab === 'OFFLINE') return a.type === 'OFFLINE_VERIFIED' || a.offlineCenterAvailable;
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <FileCheck className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Assessment & Capability Defense System
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Never reduced to a basic multiple-choice quiz. Tests combine real-time coding sandboxes, viva oral defense checks, and invigilated offline assessment centres.
          </p>
        </div>

        <button
          onClick={() => setActiveOfflineModalSkill('React')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Offline Test (Anantapur)</span>
        </button>
      </div>

      {/* Assessment Integrity Notice (Section 10) */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white text-sm">
            Assessment Integrity Architecture
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
            No Hollow Claims
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed max-w-4xl">
          SkillBridge does not claim 100% automated AI detection. Instead, highest trust is achieved when <strong>multiple independent checks agree</strong>: timed dynamic question shuffling, sandboxed code execution, follow-up architectural viva questions, and physical proctored assessment at verified centres.
        </p>
      </div>

      {/* Booked Offline Sessions Banner (Section 11) */}
      {offlineBookings.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white border border-emerald-500/40 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm sm:text-base">
                Proctored In-Person Physical Booking Confirmed
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
              <span className="text-slate-400 block text-[10px] uppercase">Time & Fee</span>
              <span className="font-medium text-slate-200">{offlineBookings[0].time} ({offlineBookings[0].fee})</span>
            </div>
          </div>

          {offlineBookings[0].status === 'CONFIRMED' && (
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-slate-300">
                Simulate attending & passing the physical exam to elevate your evidence confidence to HIGH:
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

      {/* Available Assessments Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Online & Practical Assessments</h2>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                activeTab === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Tests
            </button>
            <button
              onClick={() => setActiveTab('PRACTICAL')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                activeTab === 'PRACTICAL' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Practical & Viva
            </button>
            <button
              onClick={() => setActiveTab('OFFLINE')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                activeTab === 'OFFLINE' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Offline Verified
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredAssessments.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
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
                    {item.integrityFeatures.slice(0, 3).map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {item.offlineCenterAvailable && (
                  <button
                    onClick={() => setActiveOfflineModalSkill(item.skill)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Offline Test
                  </button>
                )}

                <div className="flex items-center gap-2">
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
