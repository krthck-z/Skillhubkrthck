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
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerNode } from '../types';

export const CareerMapView: React.FC = () => {
  const {
    careerNodes,
    profile,
    skills,
    setActiveTab,
    setActiveAssessmentModalItem,
    assessments,
    setActiveOfflineModalSkill
  } = useApp();

  const [selectedNode, setSelectedNode] = useState<CareerNode>(careerNodes[1]); // Frontend node default

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

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <GitFork className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Career Map: {profile.targetCareer}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            The Central Intelligence Layer of SkillBridge AI. Each node tracks practical evidence rather than passive certificate collection.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs">
            <span className="text-slate-500">Overall Target Progress: </span>
            <span className="font-extrabold text-indigo-700 font-mono text-sm">{profile.careerReadiness}%</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Visual Node Sequence (Left) + Detailed Interactive Node Inspector (Right) */}
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
            {careerNodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div key={node.id}>
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${getNodeColor(
                      node.status
                    )} ${isSelected ? 'ring-2 ring-indigo-500 shadow-sm' : 'hover:border-indigo-300'}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-white/80 border border-slate-200 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
                        {node.status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : node.status === 'LOCKED' ? (
                          <Lock className="w-4 h-4 text-slate-400" />
                        ) : (
                          <span className="text-indigo-700">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900">{node.title}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full font-bold uppercase tracking-wider bg-white/70 border border-slate-200/80">
                            {(node.evidenceState || '').replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{node.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-mono font-bold text-slate-700">
                          {node.progress}%
                        </span>
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className="bg-indigo-600 h-full"
                            style={{ width: `${node.progress}%` }}
                          />
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                  </div>

                  {index < careerNodes.length - 1 && (
                    <div className="flex justify-center my-1 text-slate-300">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Node Inspector & Action Hub */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                  Node Inspector: {selectedNode.type}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-500">{selectedNode.subtitle}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedNode.status === 'COMPLETED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : selectedNode.status === 'IN_PROGRESS'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {selectedNode.status}
              </span>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-1">Milestone Objective:</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                {selectedNode.description}
              </p>
            </div>

            {/* Evidence State */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-1">Trust Hierarchy Level:</h4>
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs flex items-center justify-between">
                <span className="font-extrabold text-indigo-950">
                  {(selectedNode?.evidenceState || '').replace(/_/g, ' ')}
                </span>
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </div>
            </div>

            {/* Required Skills in Node */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-2">Key Skills Evaluated:</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connective Action Buttons (Crucial for Section 2) */}
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
                    const found = assessments.find((a) => selectedNode.skills.includes(a.skill));
                    if (found) setActiveAssessmentModalItem(found);
                    else setActiveTab('assessments');
                  }}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>ASSESS</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveOfflineModalSkill(selectedNode.skills[0] || 'React')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VERIFY OFFLINE</span>
                </button>

                <button
                  onClick={() => setActiveTab('opportunities')}
                  className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>OPPORTUNITIES</span>
                </button>
              </div>

            </div>

          </div>

          {/* Core loop reminder */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>SkillBridge Principle:</strong> Nodes transition from <em>Self Declared</em> to <em>Practically Verified</em> only when code execution and oral architectural defenses are authenticated.
          </div>
        </div>

      </div>

    </div>
  );
};
