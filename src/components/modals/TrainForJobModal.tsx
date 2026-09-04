import React from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Award,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainForJobModal: React.FC = () => {
  const {
    isTrainJobModalOpen,
    setIsTrainJobModalOpen,
    trainForJobRoute,
    advanceTrainJobStep,
    profile
  } = useApp();

  if (!isTrainJobModalOpen) return null;

  const route = trainForJobRoute;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold">TRAIN FOR THIS JOB</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Direct Hiring Pathway
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Target: <strong>{route.jobTitle}</strong> at <strong>{route.companyName}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrainJobModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pathway Progress & Eligibility Banner */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-bold text-slate-800">Pathway Completion:</span>
              <span className="ml-2 font-mono font-bold text-indigo-600 text-xs">{route.overallProgress}%</span>
            </div>
            {route.isInterviewReady ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ELIGIBLE FOR COMPANY INTERVIEW
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> NOT READY YET — CLOSE 2 GAPS
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${route.overallProgress}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            CloudScale Systems guarantees direct technical interview access for any candidate who completes all 7 verified milestones.
          </p>
        </div>

        {/* 7-Step Interactive Roadmap */}
        <div className="p-5 space-y-3 text-xs flex-1">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Curated 7-Stage Capability Roadmap:
          </h4>

          <div className="space-y-2.5">
            {route.steps.map((step) => (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  step.completed
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center font-bold text-[10px] text-slate-500">
                        {step.stepNumber}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-xs ${step.completed ? 'text-emerald-950' : 'text-slate-900'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-slate-100 text-slate-600 font-medium">
                        {step.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div>
                  {step.completed ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      Verified ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => advanceTrainJobStep(step.id)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                    >
                      Complete Step
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {route.isInterviewReady && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-2 mt-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h5 className="font-extrabold text-sm text-emerald-950">
                Congratulations {profile.name}!
              </h5>
              <p className="text-xs text-emerald-800">
                You have proven complete capability across Node.js, Git, Capstone and Proctored Verification. Your guaranteed technical interview invitation has been dispatched to your Mailbox!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Backed by CloudScale Systems verified hiring rubric
          </span>
          <button
            onClick={() => setIsTrainJobModalOpen(false)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
