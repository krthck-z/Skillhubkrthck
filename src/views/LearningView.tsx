import React, { useState } from 'react';
import {
  BookOpen,
  Filter,
  Search,
  CheckCircle2,
  Sparkles,
  MapPin,
  Star,
  Clock,
  ShieldCheck,
  Building,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LearningResource } from '../types';

export const LearningView: React.FC = () => {
  const {
    learningResources,
    startLearning,
    completeLearning,
    setIsAskAIOpen,
    setActiveTab,
    setActiveAssessmentModalItem,
    assessments
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Resources' },
    { id: 'FREE_ONLINE', label: 'Free Online' },
    { id: 'GOVERNMENT', label: 'Government & Public' },
    { id: 'OFFLINE_CENTRE', label: 'Offline Centres (Near Me)' },
    { id: 'PAID_ONLINE', label: 'Paid Industry' },
    { id: 'PRACTICAL_TRAINING', label: 'Practical Labs' }
  ];

  const filtered = learningResources.filter((res) => {
    const matchesCat = categoryFilter === 'ALL' || res.type === categoryFilter;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabusId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Personalized Learning & Skill Development
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Curated to address your identified skill gaps (React, Node.js, Git, DSA). Integrates free online resources, government initiatives, and local physical bootlabs in Anantapur.
          </p>
        </div>

        <button
          onClick={() => setIsAskAIOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>Ask AI Doubt Assistant</span>
        </button>
      </div>

      {/* Philosophy note: Course -> Practice -> Assessment */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
          <span className="text-indigo-950 font-medium">
            <strong>SkillBridge Principle:</strong> Completing a course is step 1. You must defend your knowledge in practical assessments and oral vivas to convert knowledge into verified evidence.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by topic, skill, or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Learning Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((res) => {
          const isExpanded = expandedSyllabusId === res.id;
          return (
            <div
              key={res.id}
              className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                res.completed
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                  : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      res.isGovernment
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : res.type === 'OFFLINE_CENTRE'
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : res.type === 'FREE_ONLINE'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-slate-100 text-slate-800 border border-slate-300'
                    }`}
                  >
                    {(res.type || '').replace(/_/g, ' ')}
                  </span>
                  
                  <span className="font-extrabold text-sm text-indigo-700">{res.price}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm mt-2.5 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{res.provider}</p>

                {res.location && (
                  <p className="text-[11px] text-purple-700 font-semibold flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {res.location}
                  </p>
                )}

                {/* Why recommended highlight */}
                <div className="mt-3 p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed">
                  <span className="font-bold text-indigo-800 block text-[10px] uppercase">
                    Why Recommended for You:
                  </span>
                  {res.whyRecommended}
                </div>

                {/* Meta details */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {res.duration}
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {res.industryAlignment}% Industry Match
                  </div>
                </div>

                {/* Expandable Syllabus */}
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => toggleSyllabus(res.id)}
                    className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 hover:text-indigo-600 py-1"
                  >
                    <span>Curriculum Syllabus ({res.syllabus.length} units)</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <ul className="mt-2 space-y-1.5 text-[11px] text-slate-600 list-disc list-inside bg-slate-50 p-2.5 rounded-lg">
                      {res.syllabus.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setIsAskAIOpen(true)}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Ask Doubt
                </button>

                {res.completed ? (
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                    <button
                      onClick={() => {
                        const assess = assessments.find((a) => a.skill.toLowerCase() === res.skill.toLowerCase());
                        if (assess) setActiveAssessmentModalItem(assess);
                        else setActiveTab('assessments');
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-2xs"
                    >
                      Take Test
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => completeLearning(res.id)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      Complete & Verify
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
