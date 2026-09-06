import React, { useState } from 'react';
import {
  GitPullRequest,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  Download,
  Building2,
  GraduationCap
} from 'lucide-react';
import { initialSyllabusGaps } from '../../data/portalDetailedData';
import { SyllabusGapItem } from '../../types';
import { useApp } from '../../context/AppContext';

export const CurriculumGapModule: React.FC = () => {
  const { showToast } = useApp();

  type ViewType = 'gaps' | 'alignment';
  const [activeView, setActiveView] = useState<ViewType>('gaps');
  const [gaps, setGaps] = useState<SyllabusGapItem[]>(initialSyllabusGaps);
  const [selectedDomain, setSelectedDomain] = useState<string>(gaps[0]?.id || 'gap-1');

  // Selected Gap Detail
  const currentGap = gaps.find(g => g.id === selectedDomain) || gaps[0];

  // End-to-end Curriculum Alignment Chain Data
  const alignmentChain = [
    {
      step: '1. Student Career Goal',
      target: 'Full Stack Web & Cloud Application Engineer',
      status: 'DEFINED',
      indicator: '🟢'
    },
    {
      step: '2. Industry Requirements',
      target: 'Modern Component State, RESTful APIs, Containerized Deployment, Git PR Workflows',
      status: 'VERIFIED',
      indicator: '🟢'
    },
    {
      step: '3. Required Skills',
      target: 'React 18, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Docker, GitHub Actions',
      status: 'MAPPED',
      indicator: '🟢'
    },
    {
      step: '4. Institution Curriculum',
      target: 'SSBN B.Sc Computer Science (Sem 1-6 Autonomous Regulation)',
      status: 'EVALUATED',
      indicator: '🟡'
    },
    {
      step: '5. Technologies Taught',
      target: 'HTML5, CSS Selectors, Core Java, PHP/MySQL, C++ OOP',
      status: 'GAP IDENTIFIED: Outdated web stack; missing modern React & TypeScript',
      indicator: '🔴'
    },
    {
      step: '6. Practical Exposure',
      target: 'Traditional college lab assignments executed on local localhost only',
      status: 'GAP IDENTIFIED: No live hosted deployments; no cloud CLI exposure',
      indicator: '🔴'
    },
    {
      step: '7. Capstone Projects',
      target: 'Static college project reports vs production GitHub repository with unit tests',
      status: 'GAP IDENTIFIED: Project Hub integration required',
      indicator: '🟡'
    },
    {
      step: '8. Industry Training',
      target: '4-Week NovaSoft & SkillBridge Full Stack Immersion Track',
      status: 'SCHEDULED: Faculty training underway in Lab 2',
      indicator: '🟢'
    },
    {
      step: '9. Assessment',
      target: 'Proctored code sandbox defense + offline lab viva',
      status: 'ACTIVE: SkillBridge Assessment Engine',
      indicator: '🟢'
    },
    {
      step: '10. Career Readiness',
      target: 'Graduates eligible for 48H Fast Match direct hiring without remedial training',
      status: 'TARGET OUTCOME: 88% Placement Readiness',
      indicator: '🟢'
    }
  ];

  return (
    <div className="space-y-6">
      {/* View Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveView('gaps')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'gaps' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Syllabus Gap Analysis Engine ({gaps.length} Domains)
          </button>
          <button
            onClick={() => setActiveView('alignment')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'alignment' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            10-Step End-to-End Curriculum Alignment Tracker
          </button>
        </div>

        <button
          onClick={() => showToast('Generated formal Curriculum Alignment Audit Report PDF for Academic Council.')}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Academic Council Dossier</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 1. SYLLABUS GAP ANALYSIS ENGINE                                       */}
      {/* ===================================================================== */}
      {activeView === 'gaps' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-indigo-600" />
              <span>Syllabus Gap Analysis: Academic Curriculum vs Industry Demand</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select a syllabus domain to inspect what is covered, what is outdated, missing practical components, and actionable remedial modules.
            </p>

            {/* Domain Selector Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {gaps.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedDomain(g.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedDomain === g.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {g.subjectOrDomain}
                </button>
              ))}
            </div>
          </div>

          {/* Gap Breakdown Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Domain Audit</span>
                <h3 className="text-lg font-black text-slate-900">{currentGap.subjectOrDomain}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                Actionable Curriculum Bridge Available
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-xs">
              {/* Covered in Current Syllabus */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Covered in Current Syllabus:</span>
                </span>
                <ul className="space-y-1 text-emerald-950 font-medium">
                  {currentGap.coveredInCurrentSyllabus.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outdated Technologies */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
                <span className="font-bold text-rose-900 flex items-center gap-1.5 text-xs">
                  <X className="w-4 h-4 text-rose-600" />
                  <span>Outdated Technologies Taught:</span>
                </span>
                <ul className="space-y-1 text-rose-950 font-medium">
                  {currentGap.outdatedTechnologies.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{s} (Remove or update)</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Critical Skills */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Missing Critical Industry Skills:</span>
                </span>
                <ul className="space-y-1 text-amber-950 font-medium">
                  {currentGap.missingSkills.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Practical Exposure & Projects Deficit */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-800 block">Missing Practical Exposure:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {currentGap.missingPracticalExposure.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-800 block">Missing Production Projects:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {currentGap.missingProjects.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specific Remediation Recommendation */}
            <div className="p-5 rounded-3xl bg-indigo-50/80 border border-indigo-200 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="font-black text-indigo-950 text-sm">
                  Recommended Curriculum Remedial Module
                </h4>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-bold block">Suggested Module:</span>
                  <strong className="text-indigo-950 text-xs">{currentGap.recommendation.suggestedModule}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block">Duration & Level:</span>
                  <span className="text-slate-800 font-semibold">{currentGap.recommendation.duration} • {currentGap.recommendation.skillLevel}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block">Industry Partner Trainer:</span>
                  <span className="text-slate-800 font-semibold">{currentGap.recommendation.industryTrainerPartner}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-100 text-xs text-indigo-900 space-y-1">
                <p><strong>Practical Lab Component:</strong> {currentGap.recommendation.practicalComponent}</p>
                <p><strong>Capstone Project:</strong> {currentGap.recommendation.capstoneProject}</p>
                <p><strong>Assessment Type:</strong> {currentGap.recommendation.assessmentType}</p>
                <p><strong>Certification Outcome:</strong> <span className="font-bold text-emerald-800">{currentGap.recommendation.certificationOutcome}</span></p>
              </div>

              <button
                onClick={() => showToast(`Remedial module "${currentGap.recommendation.suggestedModule}" queued for Board of Studies approval!`)}
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Adopt Module into Autonomous Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. 10-STEP END-TO-END CURRICULUM ALIGNMENT TRACKER                   */}
      {/* ===================================================================== */}
      {activeView === 'alignment' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Complete End-to-End Curriculum Alignment Pipeline</span>
            </h2>
            <p className="text-xs text-slate-500">
              Full trace from student career ambitions through industry requirements, curriculum delivery, and verifiable career readiness.
            </p>
          </div>

          <div className="space-y-3">
            {alignmentChain.map((chain, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-indigo-300 transition-all">
                <div className="flex items-start sm:items-center gap-3">
                  <span className="text-lg shrink-0">{chain.indicator}</span>
                  <div>
                    <span className="font-black text-slate-900 text-xs uppercase tracking-wider block">
                      {chain.step}
                    </span>
                    <p className="font-bold text-indigo-950 mt-0.5">{chain.target}</p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                    chain.status.includes('GAP')
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : chain.status.includes('SCHEDULED') || chain.status.includes('EVALUATED')
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {chain.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
