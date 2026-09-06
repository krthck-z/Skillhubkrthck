import React, { useState } from 'react';
import {
  GitFork,
  CheckCircle2,
  Lock,
  ArrowDown,
  Sparkles,
  BookOpen,
  FileCheck,
  Briefcase,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Target,
  Compass,
  Zap,
  TrendingUp,
  Award,
  Filter,
  Check,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerNode } from '../types';
import { careerUniverse, CareerUniverseItem } from '../data/careerUniverseData';

export const CareerMapView: React.FC = () => {
  const {
    careerNodes,
    profile,
    setProfile,
    skills,
    setActiveTab,
    setActiveAssessmentModalItem,
    assessments,
    setActiveOfflineModalSkill,
    showToast
  } = useApp();

  const [activeViewMode, setActiveViewMode] = useState<'guide' | 'nodes'>('guide');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Match initial selected career from student profile target
  const initialCareer =
    careerUniverse.find(
      (c) =>
        c.title.toLowerCase().includes(profile.targetCareer.toLowerCase()) ||
        profile.targetCareer.toLowerCase().includes(c.title.toLowerCase())
    ) || careerUniverse[0];

  const [selectedCareer, setSelectedCareer] = useState<CareerUniverseItem>(initialCareer);

  // Synchronize with student's profile target career dynamically
  React.useEffect(() => {
    if (profile?.targetCareer) {
      const match = careerUniverse.find(
        (c) =>
          c.title.toLowerCase().includes(profile.targetCareer.toLowerCase()) ||
          profile.targetCareer.toLowerCase().includes(c.title.toLowerCase())
      );
      if (match) {
        setSelectedCareer(match);
      }
    }
  }, [profile?.targetCareer]);

  // Dynamic nodes generated from the selected career
  const currentCareer = selectedCareer || careerUniverse[0];
  const strengths = Array.isArray(currentCareer?.currentStrengths) ? currentCareer.currentStrengths : ['Practical Problem Solving', 'Technical Foundations'];
  const missing = Array.isArray(currentCareer?.missingSkills) ? currentCareer.missingSkills : ['Advanced System Architecture', 'Production Deployment'];

  const dynamicNodes: CareerNode[] = [
    {
      id: `${currentCareer?.id || 'career'}-node-1`,
      title: `${currentCareer?.title || 'Career'} Prerequisites & Foundational Theory`,
      subtitle: 'Degree coursework and foundational analytical lab competencies',
      type: 'FOUNDATION',
      status: 'COMPLETED',
      progress: 100,
      evidenceState: 'PRACTICAL_VERIFIED',
      description: `Fundamental mathematical and theoretical principles, degree coursework, and foundational lab evaluations.`,
      skills: (strengths || []).slice(0, 2)
    },
    {
      id: `${currentCareer?.id || 'career'}-node-2`,
      title: 'Current Transferable Strengths & Portfolio Projects',
      subtitle: 'Demonstrated competencies with verified code defense',
      type: 'PROJECTS',
      status: 'IN_PROGRESS',
      progress: 72,
      evidenceState: 'VIVA_DEFENSE',
      description: `Demonstrated technical competencies and verified student projects aligned to ${currentCareer?.title || 'Target Career'}.`,
      skills: (strengths || []).slice(2, 5).length > 0 ? (strengths || []).slice(2, 5) : (strengths || []).slice(0, 2)
    },
    {
      id: `${currentCareer?.id || 'career'}-node-3`,
      title: 'Identified Skill Gaps & Proctored Practice Drills',
      subtitle: 'Targeted triage and proctored benchmark assessments',
      type: 'PRACTICAL_ASSESSMENT',
      status: 'RECOMMENDED',
      progress: 25,
      evidenceState: 'ASSESSMENT_PASSED',
      description: `Targeted practice drills, lab viva, and proctored evaluations required to eliminate critical skill gaps.`,
      skills: missing || []
    },
    {
      id: `${currentCareer?.id || 'career'}-node-4`,
      title: 'Industry Capstone & Lab Demonstration',
      subtitle: 'Production-ready prototype with industry rubric verification',
      type: 'VIVA_DEFENSE',
      status: 'LOCKED',
      progress: 0,
      evidenceState: 'OFFLINE_VERIFIED',
      description: `Comprehensive project deployment or physical hardware prototype validated under industry rubric.`,
      skills: [`Applied ${currentCareer?.title || 'Engineering'}`, 'Production Verification', 'Live Viva']
    },
    {
      id: `${currentCareer?.id || 'career'}-node-5`,
      title: `${currentCareer?.industryDemand || 'High'} Demand Recruiter Fast-Track`,
      subtitle: '48-hour matching eligibility for vetted regional employers',
      type: 'JOB',
      status: 'LOCKED',
      progress: 0,
      evidenceState: 'INDUSTRY_VERIFIED',
      description: `Direct eligibility for 48-hour recruiter matching drives across Rayalaseema and partner enterprise hubs.`,
      skills: ['Code Defense Tier 3', 'Technical Viva', 'Audited Portfolio']
    }
  ];

  const [selectedNode, setSelectedNode] = useState<CareerNode>(dynamicNodes[1]);

  const activeNode = dynamicNodes.find((n) => n.id === selectedNode?.id) || dynamicNodes[1];

  const handleSetTargetCareer = (career: CareerUniverseItem) => {
    setProfile((prev) => ({
      ...prev,
      targetCareer: career.title
    }));
    setSelectedCareer(career);
    setSelectedNode(dynamicNodes[1]);
    showToast(`🎯 Target career set to "${career.title}"! Roadmap & opportunities recalibrated.`);
  };

  const getNodeColor = (status: CareerNode['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'border-emerald-500 bg-emerald-50/50 text-emerald-900';
      case 'IN_PROGRESS':
        return 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-200';
      case 'RECOMMENDED':
        return 'border-amber-500 bg-amber-50/60 text-amber-950';
      case 'LOCKED':
        return 'border-slate-300 bg-slate-100/80 text-slate-500 opacity-80';
    }
  };

  const categories = [
    'ALL',
    'Technology & AI',
    'Engineering & Hardware',
    'Creative & Media',
    'Business & Marketing',
    'Aviation & Logistics',
    'Hospitality & Tourism',
    'Agriculture & Environment',
    'Government & Defence'
  ];

  const filteredUniverse = careerUniverse.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Career Intelligence & Roadmap Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Personalized Career Guide: {profile.targetCareer}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Evaluates your verified projects, practical test viva, college branch, and target goals to recommend personalized career paths, skill gap triage, and immediate next actions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-3.5 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Match Calibration</span>
            <span className="text-xl font-black text-indigo-700 font-mono">92% Target Match</span>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveViewMode('guide')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeViewMode === 'guide'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Career Guide
            </button>
            <button
              onClick={() => setActiveViewMode('nodes')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeViewMode === 'nodes'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Milestone Nodes
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 1. PERSONALIZED CAREER GUIDE VIEW                                 */}
      {/* ================================================================= */}
      {activeViewMode === 'guide' && (
        <div className="space-y-6">
          
          {/* Primary Recommended Match Card */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wide">
                      Primary Profile Match: {selectedCareer.matchScore}% Compatibility
                    </div>
                    {profile.targetCareer.toLowerCase() === selectedCareer.title.toLowerCase() ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow-xs">
                        <Check className="w-3 h-3" />
                        Current Target Career Goal
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetTargetCareer(selectedCareer)}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-indigo-950 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
                      >
                        <Target className="w-3 h-3 text-indigo-600" />
                        Set as My Target Career Goal
                      </button>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mt-2 text-white">{selectedCareer.title}</h2>
                  <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-2xl">{selectedCareer.description}</p>
                </div>

                <div className="text-right shrink-0 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Market Compensation</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">{selectedCareer.avgSalaryRange}</span>
                  <span className="text-[10px] text-amber-300 block font-semibold">Demand: {selectedCareer.industryDemand}</span>
                </div>
              </div>

              {/* Match Reasons & Current Strengths */}
              <div className="grid md:grid-cols-2 gap-6 text-xs">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3">
                  <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Why This Matches Your Evidence:</span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedCareer.matchReasons.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Identified Skill Gaps to Bridge:</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedCareer.missingSkills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                    Bridging these gaps unlocks immediate eligibility for 8+ verified recruiter fast-match drives in Rayalaseema.
                  </p>
                </div>
              </div>

              {/* Next Best Action Banner */}
              <div className="bg-indigo-600/30 border border-indigo-400/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                    Recommended Next Best Action
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedCareer.nextBestAction}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('learning')}
                    className="px-4 py-2 bg-white text-indigo-950 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Start Recommended Course
                  </button>
                  <button
                    onClick={() => setActiveTab('opportunities')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    View Matching Roles
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Broad Career Universe Exploration */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span>Explore the Broad Career Universe</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Beyond software: explore Hardware, Aviation, Creative Media, AgriTech, and Defence pathways calibrated to your transferable foundations.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                <span className="text-xs font-bold text-slate-400 shrink-0">Filter Domain:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUniverse.map((item) => {
                const isSelected = selectedCareer.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCareer(item)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.category}
                        </span>
                        <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-full ${
                          item.matchScore >= 85
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.matchScore >= 70
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.matchScore}% Match
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 font-mono text-[11px]">{item.avgSalaryRange}</span>
                      <span className="text-indigo-600 font-bold flex items-center gap-1">
                        Inspect Profile →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ================================================================= */}
      {/* 2. MILESTONE NODES (Original Roadmap Graph)                       */}
      {/* ================================================================= */}
      {activeViewMode === 'nodes' && (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Visual Step Sequence */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sequence of Capability Milestones
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
                </span>
                <span className="flex items-center gap-1 text-indigo-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" /> Active Focus
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-300" /> Locked
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              {dynamicNodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div key={node.id}>
                    <div
                      onClick={() => setSelectedNode(node)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${getNodeColor(
                        node.status
                      )} ${isSelected ? 'shadow-md ring-2 ring-indigo-500' : 'hover:opacity-90'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-white/80 border border-current flex items-center justify-center font-bold text-xs shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm">{node.title}</h3>
                            {node.status === 'COMPLETED' && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            )}
                            {node.status === 'LOCKED' && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                          </div>
                          <p className="text-xs opacity-80 line-clamp-1">{node.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
                          {node.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-mono font-bold">{node.skills.length} Skills</span>
                      </div>
                    </div>

                    {index < dynamicNodes.length - 1 && (
                      <div className="flex justify-center my-1 text-slate-300">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Inspector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Node Inspector
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {activeNode.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">{activeNode.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{activeNode.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Key Skills Evaluated:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Ecosystem Connectors:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveTab('learning')}
                    className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>LEARN</span>
                  </button>
                  <button
                    onClick={() => {
                      const found = assessments.find((a) => activeNode.skills.includes(a.skill));
                      if (found) setActiveAssessmentModalItem(found);
                      else setActiveTab('assessments');
                    }}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>ASSESS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
