import React, { useState } from 'react';
import {
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Zap,
  MapPin,
  FolderGit2,
  Rocket,
  Search,
  ChevronRight,
  Flame,
  Award,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EcosystemHubView: React.FC = () => {
  const { setActiveTab, showToast } = useApp();
  const [activeBranch, setActiveBranch] = useState<'ALL' | 'LEARN' | 'OPPORTUNITIES' | 'INDUSTRY' | 'ACADEMIA' | 'COMMUNITY'>('ALL');

  const branches = [
    {
      id: 'LEARN',
      title: 'LEARN',
      subtitle: 'Structured skill acquisition, verified courses, and offline training labs',
      color: 'indigo',
      icon: BookOpen,
      links: [
        { label: 'Verified Courses & Labs', desc: 'Industry aligned curricula with code defense', tab: 'learning' },
        { label: 'Free Resources & Playlists', desc: 'Audited open educational repositories', tab: 'learning' },
        { label: 'Government Programs (APSSDC / AICTE)', desc: 'Subsidized technical enablement schemes', tab: 'learning' },
        { label: 'Skill Certifications & Badges', desc: 'Proctored examination pathways', tab: 'assessments' },
        { label: 'Offline Physical Training Centers', desc: 'Practical hardware and computer centers', tab: 'map' },
        { label: 'Workshops & Hackathons', desc: 'Fast-paced collaborative engineering sprints', tab: 'podcasts' }
      ]
    },
    {
      id: 'OPPORTUNITIES',
      title: 'OPPORTUNITIES',
      subtitle: 'From local stipends to national recruitment and research fellowships',
      color: 'blue',
      icon: Briefcase,
      links: [
        { label: 'Corporate Internships', desc: 'Sprint batches and 6-month industry placements', tab: 'opportunities' },
        { label: 'Full-Time Engineering Jobs', desc: 'Entry-level campus and off-campus roles', tab: 'opportunities' },
        { label: 'National Apprenticeships', desc: 'NATS/NAPS registered practical contracts', tab: 'opportunities' },
        { label: 'Part-Time & Campus Jobs', desc: 'Flexible evening/weekend local assistance', tab: 'local-jobs' },
        { label: 'Local Skill Jobs', desc: 'On-site technical support for regional businesses', tab: 'local-jobs' },
        { label: 'Live Projects with Industry', desc: 'Collaborate with enterprises on real codebases', tab: 'projects' },
        { label: 'Scholarships & Grants', desc: 'Merit and need-based institutional funding', tab: 'scholarships' },
        { label: 'Competitions & Hackathons', desc: 'Prize pools and recruiter talent scouting', tab: 'opportunities' },
        { label: 'Research Opportunities', desc: 'Collaborative undergraduate lab research tracks', tab: 'faculty' }
      ]
    },
    {
      id: 'INDUSTRY',
      title: 'INDUSTRY',
      subtitle: 'Direct employer pipelines, 48H urgent hiring, and corporate talent evaluation',
      color: 'purple',
      icon: Building2,
      links: [
        { label: 'Industry Hiring Directory', desc: 'Categorized by MNC, National, Regional, Startups, and MSMEs', tab: 'industry-hiring' },
        { label: '48H Fast Match Queue', desc: 'Urgent recruiter discovery based on verified passports', tab: 'fast-match' },
        { label: 'Partner Companies & Standards', desc: 'Corporate hiring benchmarks and defense criteria', tab: 'industry' },
        { label: 'Company Training & Bootcamps', desc: 'Sponsored enterprise onboarding programs', tab: 'learning' },
        { label: 'Industry Projects Hub', desc: 'Solve real-world corporate engineering challenges', tab: 'projects' },
        { label: 'Industry Mentorship Sessions', desc: 'Book 1-on-1 code reviews with senior architects', tab: 'contacts' },
        { label: 'Recruiter Talent Search', desc: 'Compare candidates with proctored skill matrices', tab: 'industry' }
      ]
    },
    {
      id: 'ACADEMIA',
      title: 'ACADEMIA',
      subtitle: 'Institutional curriculum intelligence, faculty upskilling, and joint R&D',
      color: 'emerald',
      icon: GraduationCap,
      links: [
        { label: 'Colleges & Institutions Directory', desc: 'Accreditation, NAAC evidence, and syllabus audits', tab: 'institutions' },
        { label: 'Curriculum Intelligence & Alignment', desc: 'Match university syllabi with corporate job requirements', tab: 'institutions' },
        { label: 'Faculty Internships in Industry', desc: 'Summer immersion programs for professors and lecturers', tab: 'faculty' },
        { label: 'Faculty Development Programs (FDP)', desc: 'AICTE/UGC recognized modern technology workshops', tab: 'faculty' },
        { label: 'Research Collaboration & Grants', desc: 'Joint industry-academia R&D and patent filings', tab: 'faculty' },
        { label: 'Institutional Consultancy Projects', desc: 'Monetize departmental expertise with local enterprises', tab: 'faculty' },
        { label: 'Industry Workshops for Campuses', desc: 'Book visiting corporate fellows for viva defenses', tab: 'faculty' }
      ]
    },
    {
      id: 'COMMUNITY',
      title: 'COMMUNITY',
      subtitle: 'Peer discovery, collaborative project teams, startups, and live discussions',
      color: 'amber',
      icon: Users,
      links: [
        { label: 'Student Directory & Discover', desc: 'Find co-founders, teammates, and peers by verified skills', tab: 'discover' },
        { label: 'Collaborative Project Hub', desc: 'Create or join student projects across colleges', tab: 'projects' },
        { label: 'Student Startups & Incubators', desc: 'Campus ventures seeking co-founders and grants', tab: 'startups' },
        { label: 'Verified Mentors Network', desc: 'Connect with alumni and corporate technology leaders', tab: 'contacts' },
        { label: 'Direct Messages & Real-Time Chat', desc: 'Instant student-to-student and recruiter chat', tab: 'messages' },
        { label: 'Podcasts, Meetups & Live AMAs', desc: 'Listen to regional founder stories and career lessons', tab: 'podcasts' }
      ]
    }
  ];

  const visibleBranches = activeBranch === 'ALL'
    ? branches
    : branches.filter((b) => b.id === activeBranch);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Hero Header Gateway */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Centralized Collaboration Gateway (SIH26044)</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              SKILLBRIDGE ECOSYSTEM
            </h1>
            <p className="text-base sm:text-lg font-bold text-indigo-700">
              Connect students, learning, academia, industry, and opportunities in one unified ecosystem.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            SkillBridge replaces isolated student dashboards and passive job boards with a multi-stakeholder platform uniting <strong>Students</strong>, <strong>Industries</strong>, <strong>Academicians</strong>, and <strong>Institutions</strong> around verified skill mapping, internships, faculty immersion, and high-speed recruitment.
          </p>

          {/* Quick Branch Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <button
              onClick={() => setActiveBranch('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeBranch === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Branches (5)
            </button>
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBranch(b.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBranch === b.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <b.icon className="w-3.5 h-3.5" />
                <span>{b.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5 Branches Detailed Gateway Grid */}
      <div className="space-y-8">
        {visibleBranches.map((branch) => {
          const IconComponent = branch.icon;
          return (
            <div
              key={branch.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5"
            >
              {/* Branch Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">
                      {branch.title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {branch.subtitle}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full self-start sm:self-auto">
                  {branch.links.length} Connected Modules
                </span>
              </div>

              {/* Branch Sub-modules Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {branch.links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveTab(link.tab);
                      showToast(`Navigating to ${link.label}`);
                    }}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                          {link.label}
                        </h4>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {link.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/50">
                      <span className="font-semibold text-slate-600">Route: {link.tab}</span>
                      <span className="text-indigo-600 font-bold group-hover:underline">Open Module →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
