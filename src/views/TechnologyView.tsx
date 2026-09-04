import React from 'react';
import {
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TechnologyView: React.FC = () => {
  const { techTrends, addTrendToCareerMap, setActiveTab } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Technology & Industry Skill Trends
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Live hiring market signals. Add high-demand emerging technologies directly into your personalized learning and career map before academic curricula catch up.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('career-map')}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>View Career Map →</span>
        </button>
      </div>

      {/* Grid of Technology Signals */}
      <div className="grid md:grid-cols-2 gap-5">
        {techTrends.map((trend) => (
          <div
            key={trend.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">{trend.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      {trend.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 mt-1 block">
                    📈 {trend.growthRate} Demand Growth
                  </span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{trend.relevanceToStudentGoal}</p>

              {/* Recommended Learning Route */}
              <div className="text-xs">
                <span className="font-bold text-slate-700 text-[10px] uppercase block mb-1.5">
                  Actionable Learning Route:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(trend.learningRoute || []).map((step, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Foundational to Next-Gen Roles
              </span>

              {trend.addedToCareerMap ? (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Your Career Map
                </span>
              ) : (
                <button
                  onClick={() => addTrendToCareerMap(trend.id)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add to Career Map</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
