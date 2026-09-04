import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Search,
  Filter,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  FileCheck,
  Star,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const IndustryView: React.FC = () => {
  const { opportunities, setSelectedOpportunityModal, setIsTrainJobModalOpen, setActiveTab } = useApp();

  const [evidenceFilter, setEvidenceFilter] = useState<'ALL' | 'PRACTICAL' | 'OFFLINE'>('ALL');
  const [recruiterSearchSkill, setRecruiterSearchSkill] = useState('React');
  const [candidateResultsVisible, setCandidateResultsVisible] = useState(false);

  const verifiedPartners = [
    {
      id: 'p1',
      name: 'CloudScale Systems',
      industry: 'Cloud Infrastructure & Enterprise SaaS',
      location: 'Hyderabad & Remote',
      verifiedHiresCount: 148,
      verifiedRoles: ['Junior Full Stack Engineer', 'Backend Go Developer', 'DevOps Associate'],
      verificationMandates: [
        'Practical coding sandbox passed with score >= 85%',
        'Architectural viva oral defense authenticated',
        'Demonstrated GitHub commits on production-style repo'
      ],
      interviewGuaranteeNotice:
        'Guarantees direct first-round technical interview without ATS resume screening for any candidate completing the 7-step SkillBridge pathway.'
    },
    {
      id: 'p2',
      name: 'Andhra FinTech Labs',
      industry: 'Banking & Financial Technology',
      location: 'Visakhapatnam & Vijayawada',
      verifiedHiresCount: 92,
      verifiedRoles: ['Fintech QA Engineer', 'React Frontend Specialist', 'Security Compliance Fellow'],
      verificationMandates: [
        'Data structures and SQL query optimization verified',
        'Proctored offline centre verification at Anantapur or Vizag',
        'Clean viva defense on API authorization & transaction idempotency'
      ],
      interviewGuaranteeNotice:
        'Sponsors fast-track incubation stipends of ₹25,000/month for verified Tier-2 & Tier-3 engineering candidates.'
    },
    {
      id: 'p3',
      name: 'Rayalaseema Tech Hub',
      industry: 'AgriTech & Rural Logistics',
      location: 'Anantapur / Tirupati',
      verifiedHiresCount: 64,
      verifiedRoles: ['Full Stack Python Developer', 'IoT Gateway Assistant', 'Field Deployment Lead'],
      verificationMandates: [
        'Physical attendance verification at Anantapur District Skill Lab',
        'Offline mobile-first responsive architecture defense'
      ],
      interviewGuaranteeNotice:
        'Direct hiring partner for Anantapur engineering colleges with regional bonus allowance.'
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Verified Industry & Employer Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Where forward-thinking companies recruit based on verified student code, viva defense, and proctored execution—eliminating fraudulent resumes and keyword padding.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('opportunities')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Briefcase className="w-4 h-4" />
          <span>Explore All Openings</span>
        </button>
      </div>

      {/* Recruiter Evidence Search Sandbox (Section 30) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              Recruiter Search Engine: Query by Demonstrated Evidence
            </h2>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Fraud-Proof Hiring
          </span>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Recruiters on SkillBridge don't search: <em>"Resume contains keyword React"</em> (anyone can type words). They search: <em>"React ≥ Level 4 + Practical Sandbox Passed + Oral Viva Defense Authenticated"</em>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="flex-1 bg-white/10 rounded-xl p-2.5 flex items-center gap-2 border border-white/10">
            <span className="text-xs text-slate-400">Target Skill:</span>
            <input
              type="text"
              value={recruiterSearchSkill}
              onChange={(e) => setRecruiterSearchSkill(e.target.value)}
              className="bg-transparent text-white font-bold text-xs outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={evidenceFilter}
              onChange={(e) => setEvidenceFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none cursor-pointer"
            >
              <option value="ALL" className="text-slate-900">Minimum: Assessed & Tested</option>
              <option value="PRACTICAL" className="text-slate-900">Minimum: Practical Sandbox + Viva</option>
              <option value="OFFLINE" className="text-slate-900">Highest: Proctored Offline Centre</option>
            </select>

            <button
              onClick={() => setCandidateResultsVisible(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Query Talent Pool</span>
            </button>
          </div>
        </div>

        {candidateResultsVisible && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mt-2 animate-in fade-in">
            <span className="text-xs font-bold text-emerald-400">
              ✓ Found 1 Verified Match meeting strict evidence criteria:
            </span>
            <div className="p-3 rounded-lg bg-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-xs">Karthik Peetla (JNTUA Anantapur)</span>
                <p className="text-[11px] text-slate-300">
                  {recruiterSearchSkill} Evidence: Level 4 • Practical Defense: Passed • Offline Centre Booking: Active
                </p>
              </div>
              <button
                onClick={() => setActiveTab('skill-passport')}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
              >
                View Skill Passport
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Verified Employers List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          SkillBridge Certified Hiring Partners
        </h2>

        <div className="space-y-4">
          {verifiedPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">{partner.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Certified Partner
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{partner.industry} • {partner.location}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                    {partner.verifiedHiresCount} Verified Placements
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-1.5">Roles Actively Hiring:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.verifiedRoles.map((r, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-semibold text-xs border border-indigo-100">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block mb-1.5">Verification Criteria Demanded:</span>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    {partner.verificationMandates.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct interview guarantee notice */}
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs flex items-start gap-2.5">
                <Star className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-indigo-950">Interview Guarantee Agreement: </span>
                  <span className="text-indigo-900">{partner.interviewGuaranteeNotice}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">
                  Direct evaluation via SkillBridge verified credentials
                </span>
                <button
                  onClick={() => setIsTrainJobModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Train For This Partner's Roles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
