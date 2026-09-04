import React, { useState } from 'react';
import { X, Rocket, Sparkles, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PostIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostIdeaModal: React.FC<PostIdeaModalProps> = ({ isOpen, onClose }) => {
  const { createStartupIdea, profile } = useApp();

  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [category, setCategory] = useState<'AI / ML' | 'Agritech' | 'Healthtech' | 'Edtech' | 'Fintech' | 'SaaS'>('AI / ML');
  const [stage, setStage] = useState<'Idea' | 'Prototype' | 'Early Stage' | 'MVP Built'>('Prototype');
  const [skills, setSkills] = useState('React, Python, Tailwind');
  const [funding, setFunding] = useState('₹5,00,000 (Grant / Incubation)');
  const [teamSize, setTeamSize] = useState(4);
  const [visibility, setVisibility] = useState<'Public' | 'Private' | 'Invite Only'>('Public');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problem.trim() || !solution.trim()) return;

    createStartupIdea({
      ideaTitle: title,
      problem,
      solution,
      category,
      stage,
      skillsNeeded: skills.split(',').map((s) => s.trim()).filter(Boolean),
      fundingNeeded: funding,
      teamCountTarget: Number(teamSize),
      visibility
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Rocket className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-base font-bold">Post Your Startup / Innovation Idea</span>
              <p className="text-xs text-slate-300 mt-0.5">
                Publish to SkillBridge student founders & recruit verified co-builders
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs flex-1">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Idea / Venture Title *</label>
            <input
              type="text"
              required
              placeholder="e.g., KrishiSeva Offline Voice Advisory or PeerMesh Hub"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="AI / ML">AI / ML & Agents</option>
                <option value="Agritech">Agritech</option>
                <option value="Healthtech">Healthtech</option>
                <option value="Edtech">Edtech</option>
                <option value="Fintech">Fintech</option>
                <option value="SaaS">SaaS & Tools</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Current Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="Idea">Idea / Validation</option>
                <option value="Prototype">Prototype Built</option>
                <option value="Early Stage">Early Stage User Testing</option>
                <option value="MVP Built">MVP Deployed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Problem Statement *</label>
            <textarea
              rows={2}
              required
              placeholder="What urgent friction or broken experience does this solve?"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Proposed Solution *</label>
            <textarea
              rows={2}
              required
              placeholder="How does your technological or process solution solve it?"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Skills Needed for Team</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, SQL, Machine Learning"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Funding Needed / Target</label>
              <input
                type="text"
                placeholder="e.g. ₹5,00,000 (Govt Grant / Incubator)"
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Target Team Size</label>
              <input
                type="number"
                min={2}
                max={10}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="Public">Public (Visible in Student Innovation Feed)</option>
                <option value="Invite Only">Invite Only</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between -mx-5 -mb-5 mt-4 rounded-b-2xl">
            <span className="text-[11px] text-slate-500">
              Founder: <strong>{profile.name}</strong> • {profile.institution}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Publish Idea to Network</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
