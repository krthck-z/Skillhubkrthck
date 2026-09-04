import React, { useState } from 'react';
import {
  Rocket,
  Users,
  Search,
  Filter,
  Sparkles,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  MapPin,
  ArrowRight,
  ExternalLink,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostIdeaModal } from '../components/modals/PostIdeaModal';
import { StartupIdea } from '../types';

export const StartupsView: React.FC = () => {
  const { startupIdeas, joinStartupTeam, profile } = useApp();

  const [isPostIdeaOpen, setIsPostIdeaOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [joiningIdeaId, setJoiningIdeaId] = useState<string | null>(null);
  const [joinRoleInput, setJoinRoleInput] = useState('Frontend / Full Stack Developer');

  const categories = ['ALL', 'AI / ML', 'Agritech', 'Healthtech', 'Edtech', 'Fintech', 'SaaS'];

  const filtered = startupIdeas.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.ideaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.founderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skillsNeeded.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleJoin = (ideaId: string) => {
    joinStartupTeam(ideaId, joinRoleInput);
    setJoiningIdeaId(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              <Rocket className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Student Startup & Innovation Ecosystem
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Where student founders post real problem statements and recruit co-builders based on verified practical evidence. Joining adds verified startup experience to your passport.
          </p>
        </div>

        <button
          onClick={() => setIsPostIdeaOpen(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Your Venture Idea</span>
        </button>
      </div>

      {/* Ecosystem Philosophy */}
      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
          <span className="text-purple-950 font-medium">
            <strong>Evidence-Driven Co-founding:</strong> No more ghost teammates. Candidates apply with their verified SkillBridge Passport demonstrating proven code output.
          </span>
        </div>
      </div>

      {/* Category and Search Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ideas, problems, or skills needed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Startup Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((item) => {
          const isUserJoined = item.teamMembers.some((m) => m.name === profile.name);
          const isPromptingJoin = joiningIdeaId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900">{item.ideaTitle}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Founder: <strong className="text-slate-700">{item.founderName}</strong> ({item.institution})
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold font-mono">
                    {item.stage}
                  </span>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800 block text-[10px] uppercase">
                      Problem Addressed:
                    </span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.problem}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                    <span className="font-bold text-purple-900 block text-[10px] uppercase">
                      Proposed Solution:
                    </span>
                    <p className="text-purple-950 mt-0.5 leading-relaxed">{item.solution}</p>
                  </div>
                </div>

                {/* Skills Needed */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                    Skills Needed for Venture:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.skillsNeeded.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-slate-600 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Funding: <strong>{item.fundingNeeded}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    <span>Team: <strong>{item.teamMembers.length} / {item.teamCountTarget}</strong> members</span>
                  </div>
                </div>

                {/* Team roster preview */}
                <div className="text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Current Active Team:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.teamMembers.map((tm, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                        <strong>{tm.name}</strong> ({tm.role})
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Join or Joined Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                {isUserJoined ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      You are a verified co-builder on this project!
                    </span>
                    <span className="text-[10px] text-emerald-700 uppercase">Active</span>
                  </div>
                ) : isPromptingJoin ? (
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                    <span className="text-xs font-bold text-purple-950 block">
                      Select your contributing role:
                    </span>
                    <input
                      type="text"
                      value={joinRoleInput}
                      onChange={(e) => setJoinRoleInput(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-purple-300 bg-white text-xs outline-none"
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setJoiningIdeaId(null)}
                        className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleJoin(item.id)}
                        className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                      >
                        Confirm Join & Update Passport
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Recruits by verified skill capability
                    </span>
                    <button
                      onClick={() => setJoiningIdeaId(item.id)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Join as Co-Builder</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      <PostIdeaModal isOpen={isPostIdeaOpen} onClose={() => setIsPostIdeaOpen(false)} />

    </div>
  );
};
