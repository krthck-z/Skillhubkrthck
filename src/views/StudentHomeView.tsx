import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Compass,
  BookOpen,
  Briefcase,
  DollarSign,
  TrendingUp,
  Rocket,
  ShieldCheck,
  Calendar,
  Building,
  Mail,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentHomeView: React.FC = () => {
  const {
    profile,
    skills,
    careerNodes,
    learningResources,
    opportunities,
    scholarships,
    startupIdeas,
    techTrends,
    mailMessages,
    setActiveTab,
    setActiveAssessmentModalItem,
    assessments,
    setSelectedOpportunityModal,
    setIsTrainJobModalOpen,
    offlineBookings
  } = useApp();

  const skillGaps = skills.filter((s) => s.gapPercentage > 0).sort((a, b) => b.gapPercentage - a.gapPercentage);
  const topGaps = skillGaps.slice(0, 4);

  const matchedInternships = opportunities.filter((o) => o.type === 'INTERNSHIP');
  const matchedJobs = opportunities.filter((o) => o.type === 'FULL_TIME');
  const partTimeOpps = opportunities.filter((o) => o.type === 'PART_TIME');

  const unreadMails = mailMessages.filter((m) => !m.isRead);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* 1. HERO COCKPIT: WHERE AM I? WHERE AM I GOING? WHAT SHOULD I DO NEXT? */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Core Identity & Readiness */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                Target Career: {profile.targetCareer}
              </span>
              <span className="text-xs text-slate-400">
                • {profile.degree}, {profile.institution}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Hello, {profile.name}.
            </h1>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              SkillBridge AI tracks your <strong>demonstrated evidence</strong> across proctored tests, live repositories, and startup code — not just attendance certificates.
            </p>

            {/* Next Best Action Banner */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                      Recommended Next Best Action
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    Complete React Practical Coding & Oral Defense
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Closes your 35% React gap and unlocks proctored Offline Verification at Anantapur Centre.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const reactAssess = assessments.find((a) => a.id === 'assess-react-practical');
                  if (reactAssess) setActiveAssessmentModalItem(reactAssess);
                }}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md shrink-0 transition-all cursor-pointer flex items-center gap-1.5 self-center"
              >
                <span>Assess Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Explainable Career Readiness Breakdown */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Verified Career Readiness
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {profile.careerReadiness}%
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    Industry Calibrated
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-[11px] font-semibold text-indigo-300 hover:text-white underline cursor-pointer"
              >
                Why this score? →
              </button>
            </div>

            {/* Diagnostic Metrics Matrix */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Skills</p>
                <p className="text-sm font-bold text-white mt-0.5">{profile.readinessBreakdown.skills}%</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Assessment</p>
                <p className="text-sm font-bold text-white mt-0.5">{profile.readinessBreakdown.assessment}%</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Practical</p>
                <p className="text-sm font-bold text-white mt-0.5">{profile.readinessBreakdown.practical}%</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Experience</p>
                <p className="text-sm font-bold text-white mt-0.5">{profile.readinessBreakdown.experience}%</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Comm / Viva</p>
                <p className="text-sm font-bold text-white mt-0.5">{profile.readinessBreakdown.communication}%</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Industry Align</p>
                <p className="text-sm font-bold text-white mt-0.5">{profile.readinessBreakdown.industryAlignment}%</p>
              </div>
            </div>

            {/* Offline Status Check */}
            {offlineBookings.length > 0 ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Offline Booking Active: {offlineBookings[0].skillName}
                </span>
                <span className="font-bold">{offlineBookings[0].date}</span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-200 text-xs flex items-center justify-between">
                <span className="text-[11px]">Proctored Centre Anantapur:</span>
                <button
                  onClick={() => setActiveTab('assessments')}
                  className="text-xs font-bold text-indigo-300 hover:text-white underline cursor-pointer"
                >
                  View Dates (12, 18, 25 Sep)
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 2. TOP SKILL GAPS (WHAT AM I MISSING?) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">
              Top Identified Skill Gaps for Full Stack Target
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('skills')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Skills & Evidence Levels</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {topGaps.map((gap) => (
            <div
              key={gap.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">{gap.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      gap.gapSeverity === 'Critical'
                        ? 'bg-rose-100 text-rose-800'
                        : gap.gapSeverity === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {gap.gapSeverity} Gap
                  </span>
                </div>

                <div className="mt-2 text-xs space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Current: <strong className="text-slate-800">{gap.currentLevel}</strong></span>
                    <span>Required: <strong className="text-indigo-700">{gap.requiredLevel}</strong></span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full ${
                        gap.gapSeverity === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${gap.gapPercentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 text-right pt-0.5">
                    Gap: {gap.gapPercentage}%
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">
                  {(gap.evidenceLevel || '').replace(/_/g, ' ')}
                </span>
                <button
                  onClick={() => setActiveTab('learning')}
                  className="px-2.5 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                >
                  Learn →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WHERE CAN I LEARN? (RECOMMENDED LEARNING RESOURCES) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Personalized Learning Ecosystem</h2>
              <p className="text-xs text-slate-500">Directly mapped to your identified gaps & local offline hubs</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('learning')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Catalog (Free, Govt, Offline)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {learningResources.slice(0, 3).map((res) => (
            <div
              key={res.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      res.isGovernment
                        ? 'bg-emerald-100 text-emerald-800'
                        : res.type === 'OFFLINE_CENTRE'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {(res.type || '').replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{res.price}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-1">{res.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{res.provider}</p>

                <p className="text-[11px] text-indigo-900 bg-indigo-50/70 p-2 rounded-lg mt-2.5 font-medium leading-relaxed">
                  💡 {res.whyRecommended}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">⏱ {res.duration}</span>
                <button
                  onClick={() => setActiveTab('learning')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. OPPORTUNITIES & EARN WHILE YOU LEARN GRID */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Matched Internships & Jobs (WHERE AM I ELIGIBLE?) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Matched Internships & Career Openings
                </h2>
                <p className="text-xs text-slate-500">Evaluated against your verified capabilities</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('opportunities')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {opportunities.slice(0, 3).map((opp) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{opp.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      opp.eligibilityStatus === 'ELIGIBLE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opp.eligibilityStatus === 'PARTIALLY_ELIGIBLE'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {(opp.eligibilityStatus || '').replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {opp.companyName} • {opp.location} • <strong className="text-emerald-700">{opp.stipendOrSalary}</strong>
                  </p>
                  
                  {opp.missingSkills.length > 0 ? (
                    <p className="text-[11px] text-amber-800 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Missing: <strong>{opp.missingSkills.join(', ')}</strong> (Complete learning to unlock)
                    </p>
                  ) : (
                    <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      All required technical capabilities verified in your passport!
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {opp.trainingPathAvailable && opp.missingSkills.length > 0 && (
                    <button
                      onClick={() => setIsTrainJobModalOpen(true)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-colors cursor-pointer"
                    >
                      Train For This Job
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedOpportunityModal(opp)}
                    className="px-4 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: WHAT CAN I EARN WHILE I LEARN? (PART-TIME SKILL WORK) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-amber-50/60 to-white rounded-2xl p-6 border border-amber-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Earn While You Learn</h2>
              <p className="text-[11px] text-slate-500">Skill-based local & evening work</p>
            </div>
          </div>

          <div className="space-y-3">
            {partTimeOpps.map((pt) => (
              <div
                key={pt.id}
                className="p-3.5 rounded-xl bg-white border border-amber-200/90 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{pt.title}</span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {pt.stipendOrSalary}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {pt.companyName} • {pt.duration}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-semibold text-emerald-700">
                    ✓ {pt.matchScore}% Skill Match (Eligible)
                  </span>
                  <button
                    onClick={() => setSelectedOpportunityModal(pt)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Apply →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-100/50 border border-amber-200 text-[11px] text-amber-900">
            <strong>Bridge Principle:</strong> Skill-based part-time work sustains your education while establishing verified practical customer experience.
          </div>
        </div>

      </div>

      {/* 5. STARTUPS, SCHOLARSHIPS & NEW TECH ECOSYSTEM PREVIEWS */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Startup Co-Founder & Team Building */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">Startup Collaboration</h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Team Matching
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Founders recruit builders based on verified skills. Joining grants verified startup experience on your passport!
            </p>

            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1">
              <span className="font-bold text-purple-950 block">AI Agriculture Assistant (Kisan Mitra)</span>
              <p className="text-purple-900 text-[11px]">Looking for: React Developer • Telugu localization</p>
              <span className="text-emerald-700 font-semibold text-[10px] block pt-0.5">
                ✓ Your Python & React profile matches!
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('startups')}
            className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Explore Startup Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scholarships & Financial Support */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Scholarship Support</h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Up to ₹30,000
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Government, CSR, and institutional grants to fund your bootcamps, proctored testing fees, and hardware needs.
            </p>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-950 block">National Skill Assistance Program</span>
              <p className="text-emerald-900 text-[11px]">Covers up to ₹15,000 course & testing fees.</p>
              <span className="text-amber-700 font-semibold text-[10px] block pt-0.5">
                Status: Upload current income doc to complete eligibility.
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('scholarships')}
            className="w-full mt-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Check Scholarship Eligibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Technology & Emerging Trends */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Tech & Skill Trends</h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                AI & Cloud
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time industry hiring signals. Add emerging skills directly to your Career Map before curriculum updates.
            </p>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-1">
              <span className="font-bold text-blue-950 block">Next.js 15 & Server Components</span>
              <p className="text-blue-900 text-[11px]">Surging +88% demand in startup full stack roles.</p>
              <span className="text-indigo-700 font-semibold text-[10px] block pt-0.5">
                Direct extension of your React foundation.
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('technology')}
            className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>View Technology Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
