import React from 'react';
import {
  GraduationCap,
  Building,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  BookOpen,
  MapPin,
  ShieldCheck,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InstitutionsView: React.FC = () => {
  const { profile, offlineBookings, setActiveOfflineModalSkill } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Institution & College Ecosystem Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Partnered campus intelligence for <strong>{profile.institution}</strong>. Bridges theoretical academic syllabi with verified recruiter requirements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-indigo-600" />
            <span>NAAC / AICTE Accredited Node</span>
          </span>
        </div>
      </div>

      {/* Flagship Contrast Metric: Real Skill vs Certificate Ratio (Section 34) */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              Institutional Reality Check: Paper Certificates vs Practical Proof
            </h2>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
            JNTUA 2026 Batch Diagnostic
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Traditional placements face severe drop-offs because certificates do not guarantee working ability. SkillBridge establishes actual student capability benchmarks for university leadership.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Students with Paper Certificates</span>
            <p className="text-2xl font-black text-amber-300 font-mono">84%</p>
            <p className="text-[11px] text-slate-300">Claimed web development completion on resumes.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Can Defend Code in Oral Viva</span>
            <p className="text-2xl font-black text-indigo-300 font-mono">29%</p>
            <p className="text-[11px] text-slate-300">Successfully defended state flow & API design without reading notes.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Pass Physical Sandbox Test</span>
            <p className="text-2xl font-black text-emerald-400 font-mono">19%</p>
            <p className="text-[11px] text-slate-300">Achieved invigilated proctored verification at Anantapur centre.</p>
          </div>
        </div>
      </div>

      {/* Cohort Insights & Curriculum Updates (Section 33) */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Curriculum Gap Recommendations */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">
              AI-Curated Syllabus Updates for 2026–2027
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Based on direct feedback from hiring partners (CloudScale, Andhra FinTech):
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Introduce Node.js & Docker in CS304 Lab</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                  Critical Gap
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Currently 70% of JNTUA CS graduates lack backend runtime experience, causing immediate rejection in junior full stack hiring.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Integrate Oral Code Defense in Mid-Term Exams</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  Integrity Update
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Replaces rote lab record copies with a 3-minute oral explanation of component hooks and SQL index behavior.
              </p>
            </div>
          </div>
        </div>

        {/* Local District Offline Hub Integration (Anantapur) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-base text-slate-900">
              Anantapur District Skill Lab & Proctored Centre
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Physical infrastructure connected to SkillBridge network:
          </p>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-950 text-sm">Govt Polytechnic Campus Node</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Active & Invigilated
              </span>
            </div>
            <p className="text-purple-900 leading-relaxed">
              Equipped with 60 high-speed Linux workstations, local caching servers for offline bandwidth resilience, and biometric physical verification.
            </p>
            <div className="pt-1 text-[11px] text-purple-800 space-y-0.5">
              <p>📍 Location: Old Town Road, Near Clock Tower, Anantapur</p>
              <p>⏰ Operating Hours: Tuesday – Sunday (9:00 AM – 6:00 PM)</p>
            </div>
          </div>

          <button
            onClick={() => setActiveOfflineModalSkill('React')}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Book Lab Verification Slot
          </button>
        </div>

      </div>

    </div>
  );
};
