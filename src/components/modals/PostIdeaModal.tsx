import React, { useState } from 'react';
import { X, Rocket, Sparkles, CheckCircle2, ShieldCheck, Users, Briefcase, Lightbulb, Target, Wrench, Handshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PostIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostIdeaModal: React.FC<PostIdeaModalProps> = ({ isOpen, onClose }) => {
  const { createStartupIdea, profile } = useApp();

  const [activeTab, setActiveTab] = useState<'basics' | 'solution' | 'team' | 'support'>('basics');

  // Basic Information
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'AI / ML' | 'Agritech' | 'Healthtech' | 'Edtech' | 'Fintech' | 'SaaS' | 'CleanTech'>('AI / ML');
  const [stage, setStage] = useState<'IDEA' | 'VALIDATED' | 'TEAM_BUILDING' | 'PROTOTYPE' | 'PILOT' | 'FUNDRAISING' | 'GROWING'>('IDEA');
  const [location, setLocation] = useState(profile.location || 'Anantapur / Remote');
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-Site'>('Hybrid');

  // Problem & Solution
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [targetUsers, setTargetUsers] = useState('College students, semi-rural youth, local businesses');
  const [businessModel, setBusinessModel] = useState('Freemium SaaS with localized transactional micro-fees');
  const [techStack, setTechStack] = useState('React, TypeScript, Tailwind, Python, FastAPI');
  const [expectedImpact, setExpectedImpact] = useState('Serve 500+ local users in the first 6 months');

  // Team & Resources
  const [skills, setSkills] = useState('React Frontend, Python ML, UI/UX Design, Node.js Backend');
  const [teamSize, setTeamSize] = useState(4);
  const [resources, setResources] = useState('College lab testing access, 2 test Android devices, cloud sandbox credits');
  const [visibility, setVisibility] = useState<'Public' | 'Private' | 'Invite Only'>('Public');

  // Support & Ecosystem
  const [funding, setFunding] = useState('₹5,00,000 (Student Seed Grant / Incubation)');
  const [mentorRequirement, setMentorRequirement] = useState('Senior Systems Architect & Vernacular Product Lead');
  const [industrySupport, setIndustrySupport] = useState('Pilot trial partnership with local business association');
  const [govSupport, setGovSupport] = useState('State Student Innovation Fellowship & DPIIT Seed Fund eligibility');

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
      location,
      workMode,
      targetUsers,
      businessModel,
      technologyStack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
      skillsNeeded: skills.split(',').map((s) => s.trim()).filter(Boolean),
      resourcesNeeded: resources.split(',').map((s) => s.trim()).filter(Boolean),
      fundingNeeded: funding,
      mentorRequirement,
      industrySupportNeeded: industrySupport,
      governmentSupportNeeded: govSupport,
      expectedImpact,
      teamCountTarget: Number(teamSize),
      visibility
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between border-b border-indigo-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Rocket className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">Publish Startup / Venture to SkillBridge</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-400/30">
                  ECOSYSTEM READY
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Recruit verified student co-builders, apply for seed grants, and connect with mentors
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Nav Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold px-4 pt-2 gap-1 overflow-x-auto">
          {[
            { id: 'basics', label: '1. Venture Basics', icon: Lightbulb },
            { id: 'solution', label: '2. Problem & Tech', icon: Wrench },
            { id: 'team', label: '3. Team & Roles', icon: Users },
            { id: 'support', label: '4. Grants & Mentorship', icon: Handshake }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-indigo-600 bg-white text-indigo-700 font-bold shadow-xs'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs flex-1">
          
          {/* TAB 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Venture / Innovation Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KisanAI Offline Pest Advisory, PeerMesh Campus Hub, MedVani Tele-Triage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none text-slate-900 text-sm font-medium"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Industry / Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="AI / ML">AI / ML & Agents</option>
                    <option value="Agritech">Agritech & Rural</option>
                    <option value="Healthtech">Healthtech & Diagnostics</option>
                    <option value="Edtech">Edtech & Skill Infrastructure</option>
                    <option value="Fintech">Fintech & Local Escrow</option>
                    <option value="SaaS">SaaS & Developer Tools</option>
                    <option value="CleanTech">CleanTech & Energy</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Current Venture Stage *</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="IDEA">Idea & Validation Phase</option>
                    <option value="VALIDATED">Validated (Surveys / Interviews Done)</option>
                    <option value="TEAM_BUILDING">Team Building (Looking for Co-Founders)</option>
                    <option value="PROTOTYPE">Prototype Built (Alpha In Progress)</option>
                    <option value="PILOT">Pilot Ready (Testing with Early Users)</option>
                    <option value="FUNDRAISING">Fundraising / Grant Application</option>
                    <option value="GROWING">Growing (Paying Users / Traction)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Location / Hub *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anantapur / Bengaluru / Hyderabad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="Hybrid">Hybrid (Campus + Remote)</option>
                    <option value="Remote">100% Remote / Distributed</option>
                    <option value="On-Site">On-Site (District Innovation Centre)</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
                <span className="text-slate-700">
                  Ready to describe problem & architecture?
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('solution')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
                >
                  Next: Problem & Solution →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROBLEM & SOLUTION */}
          {activeTab === 'solution' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Problem Statement * <span className="font-normal text-slate-400 text-[11px]">(Who suffers and what is broken?)</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Smallholder farmers in Rayalaseema lack dialect-aware pest diagnosis; existing apps require high-speed internet they don't have."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Proposed Solution * <span className="font-normal text-slate-400 text-[11px]">(What is your technological or workflow answer?)</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. An offline-first PWA with embedded quantized vision models and Telugu voice output delivering localized advisory in under 3 seconds."
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Target Users</label>
                  <input
                    type="text"
                    value={targetUsers}
                    onChange={(e) => setTargetUsers(e.target.value)}
                    placeholder="e.g. Marginal farmers, retail merchants, students"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Business / Sustainability Model</label>
                  <input
                    type="text"
                    value={businessModel}
                    onChange={(e) => setBusinessModel(e.target.value)}
                    placeholder="e.g. B2B data dashboard + freemium consumer tier"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Technology Stack</label>
                  <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="e.g. React, TypeScript, Python, TensorFlow Lite"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Expected 6-Month Impact</label>
                  <input
                    type="text"
                    value={expectedImpact}
                    onChange={(e) => setExpectedImpact(e.target.value)}
                    placeholder="e.g. 500 active users; 30% cost savings for local shops"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('basics')}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('team')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
                >
                  Next: Team & Open Roles →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: TEAM & ROLES */}
          {activeTab === 'team' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Skills Needed in Co-Builders * <span className="font-normal text-slate-400 text-[11px]">(Comma separated)</span>
                </label>
                <input
                  type="text"
                  required
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, Node.js, Python, Figma UI/UX, Razorpay"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none text-slate-900 font-medium"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  SkillBridge will automatically match candidates whose Skill Passports prove these skills.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
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
                  <label className="font-bold text-slate-800 block mb-1">Network Visibility</label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="Public">Public (Visible to All Verified Students)</option>
                    <option value="Invite Only">Invite Only (Selective Match)</option>
                    <option value="Private">Private / College Incubation Cell Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Resources & Hardware Needed</label>
                <textarea
                  rows={2}
                  value={resources}
                  onChange={(e) => setResources(e.target.value)}
                  placeholder="e.g. Lab testing equipment, GPU instance credits, 5 test devices"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                />
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('solution')}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('support')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
                >
                  Next: Grants & Mentorship →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SUPPORT & ECOSYSTEM */}
          {activeTab === 'support' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Funding Target / Needed</label>
                  <input
                    type="text"
                    value={funding}
                    onChange={(e) => setFunding(e.target.value)}
                    placeholder="e.g. ₹5,00,000 (Govt Grant / Incubator)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Mentor Type Needed</label>
                  <input
                    type="text"
                    value={mentorRequirement}
                    onChange={(e) => setMentorRequirement(e.target.value)}
                    placeholder="e.g. Technical Edge AI or Go-to-Market"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Industry Support Required</label>
                <input
                  type="text"
                  value={industrySupport}
                  onChange={(e) => setIndustrySupport(e.target.value)}
                  placeholder="e.g. Pilot deployment partner, retail merchant network"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Government / Incubator Support Needed</label>
                <input
                  type="text"
                  value={govSupport}
                  onChange={(e) => setGovSupport(e.target.value)}
                  placeholder="e.g. MeitY TIDE 2.0 EIR stipend, DPIIT Seed Fund, College Innovation Sandbox"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-900">
                  <strong>SkillBridge Evidence Protection:</strong> Co-builder recruitment verifies candidate credentials directly against authenticated practical tests and lab viva records. Contact details remain private until candidate status is approved.
                </div>
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between -mx-5 -mb-5 mt-4 rounded-b-2xl">
            <span className="text-[11px] text-slate-500">
              Founder: <strong>{profile.name}</strong> • {profile.institution}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Publish Venture to Ecosystem</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
