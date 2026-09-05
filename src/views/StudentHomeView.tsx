import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Compass,
  BookOpen,
  Briefcase,
  Building,
  ShieldCheck,
  Mail,
  ChevronRight,
  Zap,
  Clock,
  Target,
  FileCheck,
  TrendingUp,
  MapPin,
  Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentHomeView: React.FC = () => {
  const {
    profile,
    skills,
    opportunities,
    notifications,
    mailMessages,
    setActiveTab,
    setActiveAssessmentModalItem,
    assessments,
    setSelectedOpportunityModal,
    learningResources
  } = useApp();

  const skillGaps = skills.filter((s) => s.gapPercentage > 0).sort((a, b) => b.gapPercentage - a.gapPercentage);
  const topGap = skillGaps[0] || { name: 'React & Component State', gapPercentage: 35 };

  // Recommended 2-3 items for student
  const recommendedCourse = learningResources.find(
    (r) => r.skill.toLowerCase().includes('react') || r.industryAlignment >= 90
  ) || learningResources[0];

  const recommendedAssessment = assessments.find(
    (a) => a.id === 'assess-react-practical'
  ) || assessments[0];

  // Top 2-3 matching opportunities
  const topOpportunities = opportunities.slice(0, 3);

  // Filter important notifications
  const importantNotifications = notifications.slice(0, 3);
  const unreadMails = mailMessages.filter((m) => !m.isRead);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* 1. HERO: SKILLBRIDGE AI — From Learning to Proven Capability              */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Vision & Action (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Official Evidence Platform</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                SKILLBRIDGE AI
              </h1>
              <p className="text-base sm:text-lg font-semibold text-indigo-700">
                From Learning to Proven Capability.
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Replaces unverified resume claims with audited code defenses, proctored practical sandboxes, and verified project milestones connected directly to fast recruiter matching.
            </p>

            {/* Process flow: Learn → Assess → Prove → Connect */}
            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200/80 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <BookOpen className="w-3.5 h-3.5" />
                  Learn
                </span>
                <span className="text-slate-300">→</span>
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <FileCheck className="w-3.5 h-3.5" />
                  Assess
                </span>
                <span className="text-slate-300">→</span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Prove
                </span>
                <span className="text-slate-300">→</span>
                <span className="flex items-center gap-1.5 text-blue-700">
                  <Briefcase className="w-3.5 h-3.5" />
                  Connect
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('profile')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Build My Skill Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('opportunities')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Opportunities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Active Evidence & Candidate Readiness Matrix (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Evidence Calibration
                </span>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                48h SLA Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Career Readiness</span>
                <span className="text-xl font-black text-emerald-600">{profile.careerReadiness}%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Audited & Verified</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Role</span>
                <span className="text-sm font-black text-slate-900 truncate block mt-1">{profile.targetCareer}</span>
                <span className="text-[10px] text-indigo-600 font-semibold block mt-0.5">High Regional Demand</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Proctored Code Defense</span>
                <span className="font-bold text-emerald-700">Tier 3 (Verified)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${profile.careerReadiness}%` }} />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('assessments')}
                className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Verify Next Skill Milestone</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MY CURRENT PATH                                                        */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>MY CURRENT PATH</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized career trajectory and evidence calibration for {profile.name}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('career-map')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Item 1: Career Goal */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Career Goal
              </span>
              <h3 className="text-sm font-extrabold text-slate-900">
                {profile.targetCareer}
              </h3>
              <p className="text-xs text-slate-500">
                Target Role across Rayalaseema & Remote
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60">
              <button
                onClick={() => setActiveTab('career-map')}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Inspect Milestones →
              </button>
            </div>
          </div>

          {/* Item 2: Skill Readiness */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Skill Readiness
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  {profile.careerReadiness}%
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Verified
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${profile.careerReadiness}%` }}
                />
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60">
              <button
                onClick={() => setActiveTab('profile')}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                View Calibration →
              </button>
            </div>
          </div>

          {/* Item 3: Priority Skill Gap */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Priority Skill Gap
              </span>
              <h3 className="text-sm font-extrabold text-slate-900">
                {topGap.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{topGap.gapPercentage}% gap to target readiness</span>
              </div>
            </div>
            <div className="pt-2 border-t border-amber-200/60">
              <button
                onClick={() => setActiveTab('skills')}
                className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
              >
                Close This Gap →
              </button>
            </div>
          </div>

          {/* Item 4: Next Recommended Action */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                Next Recommended Action
              </span>
              <h3 className="text-sm font-extrabold text-slate-900">
                React Code Defense Sandbox
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete a 25-min proctored code challenge to elevate profile to Verified Level 3.
              </p>
            </div>
            <div className="pt-2 border-t border-indigo-200/60">
              <button
                onClick={() => {
                  if (recommendedAssessment) {
                    setActiveAssessmentModalItem(recommendedAssessment);
                  } else {
                    setActiveTab('assessments');
                  }
                }}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Take Challenge</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RECOMMENDED FOR YOU (2–3 items)                                        */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>RECOMMENDED FOR YOU</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              High-priority steps directly tailored to your target career
            </p>
          </div>
          <button
            onClick={() => setActiveTab('learning')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Learning Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          
          {/* Recommended Card 1: Course / Resource */}
          {recommendedCourse && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Recommended Course
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {recommendedCourse.price}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                  {recommendedCourse.title}
                </h3>
                <p className="text-xs text-slate-500">
                  By {recommendedCourse.provider} • {recommendedCourse.duration}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {recommendedCourse.whyRecommended}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700">
                  {recommendedCourse.industryAlignment}% Match
                </span>
                <button
                  onClick={() => setActiveTab('learning')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                >
                  Start Course
                </button>
              </div>
            </div>
          )}

          {/* Recommended Card 2: Assessment Challenge */}
          {recommendedAssessment && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Target Assessment
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {recommendedAssessment.durationMinutes} mins
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                  {recommendedAssessment.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Skill: {recommendedAssessment.skill} • {recommendedAssessment.type.replace(/_/g, ' ')}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Completing this assessment qualifies you for 3 regional immediate recruiter openings.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700">
                  Evidence Tier 3
                </span>
                <button
                  onClick={() => setActiveAssessmentModalItem(recommendedAssessment)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                >
                  Start Test
                </button>
              </div>
            </div>
          )}

          {/* Recommended Card 3: Project Capstone */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Capstone Project
                </span>
                <span className="text-xs font-bold text-slate-700">
                  GitHub Audited
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                Kisan Mitra Agri-Tech Voice Assistant
              </h3>
              <p className="text-xs text-slate-500">
                Domain: Telugu NLP & Computer Vision
              </p>
              <p className="text-xs text-slate-600 line-clamp-2">
                Showcase verified full-stack capability to local startups and Bangalore tech recruiters.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700">
                Verified Evidence
              </span>
              <button
                onClick={() => setActiveTab('projects')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
              >
                Inspect Project
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OPPORTUNITIES (2–3 items)                                              */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>OPPORTUNITIES</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Urgent openings and matched internships in Anantapur & Remote
            </p>
          </div>
          <button
            onClick={() => setActiveTab('opportunities')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>All Opportunities ({opportunities.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {topOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {opp.matchScore}% Fast Match
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {opp.stipendOrSalary}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {opp.companyName || (opp as any).company} • {opp.location}
                </p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {(opp.requiredSkills || []).slice(0, 3).map((sk) => (
                    <span key={sk.skill} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {sk.skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedOpportunityModal(opp)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => setSelectedOpportunityModal(opp)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg cursor-pointer transition-colors"
                >
                  Direct Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IMPORTANT ACTIVITY (Only relevant notifications)                       */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              IMPORTANT ACTIVITY
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('mailbox')}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open Mailbox {unreadMails.length > 0 && `(${unreadMails.length} unread)`}</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {importantNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.targetView) setActiveTab(n.targetView as any);
              }}
              className="py-3 flex items-start justify-between gap-4 hover:bg-slate-50/80 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${n.isRead ? 'bg-slate-300' : 'bg-indigo-600 animate-pulse'}`} />
                  <h4 className="text-xs font-bold text-slate-900">
                    {n.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 pl-4">
                  {n.message}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-medium pt-0.5">
                {n.timestamp}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
