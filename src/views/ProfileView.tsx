import React, { useState } from 'react';
import {
  User,
  Award,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  MapPin,
  Building,
  Sparkles,
  ExternalLink,
  Trash2,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileView: React.FC = () => {
  const {
    profile,
    achievements,
    mailMessages,
    markMailAsRead,
    offlineBookings,
    setActiveOfflineModalSkill,
    setTargetCareer,
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'ACHIEVEMENTS' | 'MAILBOX'>('OVERVIEW');

  const careerOptions = [
    'Full Stack Developer',
    'Backend Engineer',
    'AI & Machine Learning Engineer',
    'Cloud & DevOps Specialist'
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Profile Identity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              KP
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Evidence Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {profile.degree} • {profile.institution}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}</span>
                <span>•</span>
                <span>Roll ID: <strong className="text-slate-700 font-mono">22001A0589</strong></span>
                <span>•</span>
                <span>Batch: <strong>2022–2026</strong></span>
              </div>
            </div>
          </div>

          {/* Target Career Switcher (Section 36) */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5 self-stretch md:self-auto min-w-[240px]">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Active Target Career Goal:
            </span>
            <select
              value={profile.targetCareer}
              onChange={(e) => {
                setTargetCareer(e.target.value);
                showToast(`Target career updated to ${e.target.value}. Readiness recalibrated!`);
              }}
              className="w-full px-3 py-1.5 font-bold text-indigo-700 bg-white border border-indigo-200 rounded-xl outline-none cursor-pointer text-xs"
            >
              {careerOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 block">
              Recalculates skill gaps & readiness instantly.
            </span>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveSubTab('OVERVIEW')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              activeSubTab === 'OVERVIEW'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Readiness & Diagnostics
          </button>
          <button
            onClick={() => setActiveSubTab('ACHIEVEMENTS')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'ACHIEVEMENTS'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Badges & Achievements ({achievements.filter((a) => a.unlocked).length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('MAILBOX')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'MAILBOX'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Student Mailbox ({mailMessages.length})</span>
          </button>
        </div>
      </div>

      {/* OVERVIEW SUB-TAB: Explainable Readiness Diagnostics (Section 3) */}
      {activeSubTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Explainable Career Readiness: {profile.careerReadiness}%
                </h2>
                <p className="text-xs text-slate-500">
                  How SkillBridge AI calculates your hiring probability
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Calibrated against 100+ Hiring Partners
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              "Never show a hollow mystery score. Your 72% readiness reflects: verified skills (70%), objective assessments passed (75%), code sandbox defense (60%), startup & real-world projects (40%), oral viva communication (80%), and current framework alignment (85%). Closing your React & Node.js practical gap will elevate your score to 88%."
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">1. Skills Mastery</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.skills}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.skills}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">2. Objective Assessment</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.assessment}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.assessment}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">3. Practical Coding Sandbox</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.practical}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.practical}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">4. Real Startup Experience</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.experience}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.experience}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">5. Viva Oral Defense</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.communication}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.communication}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600">6. Industry Alignment</span>
                <p className="text-xl font-black text-slate-900 font-mono">{profile.readinessBreakdown.industryAlignment}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${profile.readinessBreakdown.industryAlignment}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Active Offline Bookings Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Offline Assessment Reservations</h3>
              </div>
              <button
                onClick={() => setActiveOfflineModalSkill('React')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                + Book New Slot
              </button>
            </div>

            {offlineBookings.length > 0 ? (
              <div className="space-y-2">
                {offlineBookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm">{b.skillName} In-Person Proctored Test</span>
                      <p className="text-slate-600 mt-0.5">{b.venue}, {b.city} • {b.date} ({b.time})</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3">No active bookings yet.</p>
            )}
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS SUB-TAB (Section 38) */}
      {activeSubTab === 'ACHIEVEMENTS' && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl">{ach.badgeIcon}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ach.unlocked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {ach.unlocked ? 'Unlocked ✓' : 'In Progress'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-3">{ach.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ach.description}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                {ach.unlocked ? `Achieved on ${ach.unlockedAt}` : 'Complete verification requirements to unlock'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MAILBOX SUB-TAB (Section 39) */}
      {activeSubTab === 'MAILBOX' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100">
          <div className="p-5 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-slate-900">Student Mailbox & Alerts</h2>
              <p className="text-xs text-slate-500">Notifications from hiring partners, offline centres, and startup teams</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {mailMessages.length} Messages
            </span>
          </div>

          {mailMessages.map((mail) => (
            <div
              key={mail.id}
              onClick={() => markMailAsRead(mail.id)}
              className={`p-5 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                !mail.isRead ? 'bg-indigo-50/40 hover:bg-indigo-50/70' : 'hover:bg-slate-50'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {!mail.isRead && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                  <span className="font-bold text-xs text-slate-900">{mail.sender}</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
                    {mail.category}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-900">{mail.subject}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{mail.body}</p>
              </div>

              <span className="text-[11px] text-slate-400 shrink-0 self-start sm:self-auto font-mono">
                {mail.date}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
