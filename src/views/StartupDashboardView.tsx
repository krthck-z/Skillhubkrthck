import React, { useState } from 'react';
import {
  Rocket,
  Users,
  Search,
  CheckCircle2,
  DollarSign,
  Building2,
  Sparkles,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Zap,
  Filter,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { initialStudentDirectory } from '../data/studentProjectsData';
import { StudentPublicProfileModal } from '../components/modals/StudentPublicProfileModal';
import { StudentDirectoryItem } from '../types';

export const StartupDashboardView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentDirectoryItem | null>(null);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isTeamRequestModalOpen, setIsTeamRequestModalOpen] = useState(false);

  // Form states for Challenge Post
  const [challengeTitle, setChallengeTitle] = useState('Build an Offline Groundnut Leaf Disease Classifier');
  const [challengeReward, setChallengeReward] = useState('₹15,000 Stipend + Direct Internship Offer');
  const [challengeSkills, setChallengeSkills] = useState('Python, OpenCV, React 19');
  const [challengeDesc, setChallengeDesc] = useState('Develop a lightweight web-worker computer vision model that runs in client browser without server latency.');

  // Form states for Team Request
  const [teamRoleNeeded, setTeamRoleNeeded] = useState('Full Stack Frontend & API Lead');
  const [teamSize, setTeamSize] = useState('2 Students');
  const [teamStipend, setTeamStipend] = useState('₹12,000 / month per student');

  // Co-founder search posts
  const cofounderNeeds = [
    {
      role: 'Technical Co-Founder / Lead AI Engineer',
      equityOrStipend: '12% - 18% Equity + ₹25,000 Monthly Living Grant',
      requiredSkills: ['Python', 'PyTorch / YOLO', 'FastAPI', 'Computer Vision'],
      location: 'Anantapur / Hybrid',
      status: 'Actively Interviewing'
    },
    {
      role: 'Full-Stack Web Architect',
      equityOrStipend: '5% - 8% Equity + ₹15,000 Stipend',
      requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      location: 'Anantapur / Remote',
      status: 'Shortlisting Candidates'
    }
  ];

  // Grant & Funding pipeline
  const fundingPipeline = [
    {
      program: 'Andhra Pradesh Innovation Society (APIS) Seed Grant',
      amount: '₹5,00,000',
      status: 'Shortlisted for Jury Pitch',
      stage: 'Pitch Scheduled 18 Sep 2026',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      program: 'Startup India Seed Fund Scheme (SISFS) via AIC-SKU',
      amount: '₹20,00,000',
      status: 'Evaluation Stage',
      stage: 'Technical Due Diligence in Progress',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    {
      program: 'NABARD Rural Agri-Enterprise Innovation Catalyst',
      amount: '₹3,50,000',
      status: 'Approved & Disbursed',
      stage: 'Tranche 1 Deployed for Field Sensors',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  ];

  // Student talent pool matching
  const matchedStudents = initialStudentDirectory.filter((st) =>
    st.verifiedSkills.some((s) => ['React', 'Python', 'Web Dev', 'DSA', 'SQL'].includes(s))
  );

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChallengeModalOpen(false);
    showToast(`Technical Challenge "${challengeTitle}" posted to Student Hub!`);
  };

  const handleRequestTeam = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTeamRequestModalOpen(false);
    showToast(`Student Team request for "${teamRoleNeeded}" sent to SSBN & SKU placement coordinators!`);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Startup Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-800 border border-rose-200">
              Startup Founder Dashboard
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Incubated at AIC-SKU (Cohort 2026)
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Kisan Mitra AI — Regional Agritech Diagnostic Hub
          </h1>

          <p className="text-xs text-slate-600 font-medium max-w-2xl">
            Multimodal agricultural intelligence delivering vernacular crop disease diagnosis to groundnut and horticulture farmers across Anantapur and Rayalaseema.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsChallengeModalOpen(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Technical Challenge</span>
          </button>

          <button
            onClick={() => setIsTeamRequestModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Request Student Team</span>
          </button>

          <button
            onClick={() => setActiveTab('startups')}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Ideas Directory
          </button>
        </div>
      </div>

      {/* Incubator Status & Funding Strip */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Regional Incubator
          </span>
          <h3 className="text-sm font-extrabold text-slate-900 mt-1">AIC-SKU Anantapur</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-0.5 inline-block">
            Active Incubation & Lab Access
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Pipeline Grants
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">₹28.5L</span>
            <span className="text-xs text-indigo-600 font-semibold">3 Schemes</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Matched Student Developers
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{matchedStudents.length}</span>
            <span className="text-xs text-slate-500">Tier 2+ verified</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Field Pilots Active
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-700">4 Mandals</span>
            <span className="text-xs text-slate-500">220 farmers</span>
          </div>
        </div>
      </div>

      {/* Co-founder Search & Funding Pipeline */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Co-founder Search */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-600" />
                <span>Co-Founder & Core Team Search</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Key equity leadership roles open for technical candidates
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {cofounderNeeds.map((pos) => (
              <div key={pos.role} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{pos.role}</h4>
                    <span className="text-xs text-indigo-700 font-bold">{pos.equityOrStipend}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {pos.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {pos.requiredSkills.map((sk) => (
                    <span key={sk} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <span>Location: {pos.location}</span>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Scout Qualified Students →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Funding / Grant Pipeline */}
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Funding / Grant Pipeline</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                State & Central government non-dilutive innovation grants
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {fundingPipeline.map((fund) => (
              <div key={fund.program} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 leading-snug">{fund.program}</h4>
                    <span className="text-sm font-black text-slate-900">{fund.amount}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${fund.badgeColor}`}>
                    {fund.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{fund.stage}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Student Talent Pool Matching */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Student Talent Pool Matching</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified local students from Anantapur engineering and degree colleges matching your tech stack
            </p>
          </div>
          <button
            onClick={() => setActiveTab('discover')}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            Open Student Directory →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchedStudents.map((st) => (
            <div
              key={st.id}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {st.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{st.name}</h4>
                      <p className="text-[11px] text-slate-500">{st.college.split(',')[0]}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {st.careerReadiness}% Ready
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {st.verifiedSkills.slice(0, 3).map((sk) => (
                    <span key={sk} className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                <button
                  onClick={() => setSelectedStudentForModal(st)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    showToast(`Internship invitation sent to ${st.name}!`);
                  }}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Invite to Sprint
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Post Challenge Modal */}
      {isChallengeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                Post Technical Challenge / Hackathon
              </h3>
              <button
                onClick={() => setIsChallengeModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateChallenge} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Challenge Title</label>
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Reward / Compensation</label>
                <input
                  type="text"
                  value={challengeReward}
                  onChange={(e) => setChallengeReward(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Skills</label>
                <input
                  type="text"
                  value={challengeSkills}
                  onChange={(e) => setChallengeSkills(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Challenge Description & Deliverables</label>
                <textarea
                  value={challengeDesc}
                  onChange={(e) => setChallengeDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChallengeModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Publish Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Student Team Modal */}
      {isTeamRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                Request Student Sprint Team
              </h3>
              <button
                onClick={() => setIsTeamRequestModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestTeam} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Role / Sprint Need</label>
                <input
                  type="text"
                  value={teamRoleNeeded}
                  onChange={(e) => setTeamRoleNeeded(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Team Size</label>
                  <input
                    type="text"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Monthly Stipend</label>
                  <input
                    type="text"
                    value={teamStipend}
                    onChange={(e) => setTeamStipend(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTeamRequestModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Submit Team Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Profile Modal */}
      {selectedStudentForModal && (
        <StudentPublicProfileModal
          student={selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}

    </div>
  );
};
