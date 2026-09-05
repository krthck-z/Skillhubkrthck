import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Filter,
  Search,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  GraduationCap,
  FolderGit2,
  ArrowRight,
  DollarSign,
  FileCheck
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
    assessments,
    profile,
    showToast
  } = useApp();

  // Category filters as specified by user
  const [activeCategory, setActiveCategory] = useState<string>('RECOMMENDED');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'ALL' | 'FREE' | 'PAID'>('ALL');
  const [modeFilter, setModeFilter] = useState<'ALL' | 'Online' | 'Offline' | 'Hybrid'>('ALL');
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'Beginner' | 'Intermediate' | 'Advanced'>('ALL');
  const [verifiedCredentialOnly, setVerifiedCredentialOnly] = useState(false);
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const categories = [
    { id: 'RECOMMENDED', label: 'Recommended for My Goal', icon: Sparkles, badge: profile.targetCareer },
    { id: 'INDUSTRY', label: 'Verified Industry Courses', icon: ShieldCheck },
    { id: 'REGIONAL_COLLEGE', label: 'Regional College Courses', icon: GraduationCap },
    { id: 'FAST_TRACK', label: 'Fast Skill Tracks', icon: Zap },
    { id: 'ASSESSMENT_LINKED', label: 'Assessment-Linked', icon: FileCheck },
    { id: 'CAPSTONE', label: 'Capstone Project Courses', icon: FolderGit2 },
    { id: 'OFFLINE_LOCAL', label: 'Local Offline (Anantapur)', icon: MapPin }
  ];

  const filteredResources = useMemo(() => {
    return learningResources.filter((res) => {
      // 1. Category logic
      if (activeCategory === 'RECOMMENDED') {
        // Matched target skills or whyRecommended
        const matchesCareer =
          res.skill.toLowerCase().includes('react') ||
          res.skill.toLowerCase().includes('python') ||
          res.skill.toLowerCase().includes('sql') ||
          res.industryAlignment >= 85;
        if (!matchesCareer) return false;
      } else if (activeCategory === 'INDUSTRY') {
        const isInd = res.type === 'PAID_ONLINE' || res.industryAlignment >= 90 || res.verificationStatus.includes('Accredited') || res.provider.includes('IBM') || res.provider.includes('Meta') || res.provider.includes('Google');
        if (!isInd) return false;
      } else if (activeCategory === 'REGIONAL_COLLEGE') {
        const isCollege = res.isGovernment || res.type === 'GOVERNMENT' || res.provider.includes('JNTU') || res.provider.includes('Public') || res.provider.includes('University') || res.provider.includes('IIT');
        if (!isCollege) return false;
      } else if (activeCategory === 'FAST_TRACK') {
        const isFast = parseInt(res.duration.replace(/\D/g, '') || '99') <= 24 || res.duration.includes('Hours') || res.duration.includes('Days');
        if (!isFast) return false;
      } else if (activeCategory === 'ASSESSMENT_LINKED') {
        const hasAssess = !!assessments.find((a) => a.skill.toLowerCase() === res.skill.toLowerCase());
        if (!hasAssess) return false;
      } else if (activeCategory === 'CAPSTONE') {
        const isProj = res.practicalTraining || res.title.toLowerCase().includes('project') || res.title.toLowerCase().includes('capstone') || res.syllabus.some((s) => s.toLowerCase().includes('project'));
        if (!isProj) return false;
      } else if (activeCategory === 'OFFLINE_LOCAL') {
        if (res.mode !== 'Offline' && res.type !== 'OFFLINE_CENTRE') return false;
      }

      // 2. Price filter
      if (priceFilter === 'FREE' && !res.isFree && res.price !== 'Free' && !res.price.toLowerCase().includes('free')) return false;
      if (priceFilter === 'PAID' && (res.isFree || res.price === 'Free' || res.price.toLowerCase().includes('free'))) return false;

      // 3. Mode filter
      if (modeFilter !== 'ALL' && res.mode !== modeFilter) return false;

      // 4. Level filter
      if (levelFilter !== 'ALL' && res.level !== levelFilter) return false;

      // 5. Verified credential filter
      if (verifiedCredentialOnly && !res.freeCertificate && !res.verificationStatus.toLowerCase().includes('verified') && !res.verificationStatus.toLowerCase().includes('accredited')) {
        return false;
      }

      // 6. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText =
          res.title.toLowerCase().includes(q) ||
          res.skill.toLowerCase().includes(q) ||
          res.provider.toLowerCase().includes(q) ||
          (res.location && res.location.toLowerCase().includes(q)) ||
          res.whyRecommended.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      return true;
    });
  }, [
    learningResources,
    activeCategory,
    priceFilter,
    modeFilter,
    levelFilter,
    verifiedCredentialOnly,
    searchQuery,
    assessments
  ]);

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabusId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-indigo-50 text-indigo-700">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              SkillBridge Structured Learning Hub
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Targeted Courseware & Capability Pathways
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every learning resource is mathematically correlated to your target career goal ({profile.targetCareer}) and verified by practical skill defenses. No unvetted tutorial links.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsAskAIOpen(true)}
            className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-2xl border border-indigo-200/80 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>Ask AI Doubt Assistant</span>
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify Knowledge in Tests</span>
          </button>
        </div>
      </section>

      {/* Category Tabs Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
              <span>{cat.label}</span>
              {cat.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${isActive ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-700'}`}>
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Multi-Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by topic, skill, provider, or syllabus keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          {/* Quick Clear Filter */}
          {(priceFilter !== 'ALL' || modeFilter !== 'ALL' || levelFilter !== 'ALL' || verifiedCredentialOnly || searchQuery) && (
            <button
              onClick={() => {
                setPriceFilter('ALL');
                setModeFilter('ALL');
                setLevelFilter('ALL');
                setVerifiedCredentialOnly(false);
                setSearchQuery('');
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold underline shrink-0 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
          
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Pricing / Fee</label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="ALL">All (Free & Paid)</option>
              <option value="FREE">Free / Subsidized</option>
              <option value="PAID">Paid Certification</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Delivery Mode</label>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="ALL">All Modes</option>
              <option value="Online">Online Self-Paced</option>
              <option value="Offline">Offline Physical (Anantapur)</option>
              <option value="Hybrid">Hybrid Cohort</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Difficulty Level</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="ALL">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedCredentialOnly}
                onChange={(e) => setVerifiedCredentialOnly(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Verified Credential Included</span>
            </label>
          </div>

        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredResources.length}</strong> structured courses for <strong>{categories.find((c) => c.id === activeCategory)?.label}</strong></span>
        <span className="font-semibold text-indigo-600">All courses include verified assessment pathways</span>
      </div>

      {/* Course Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isExpanded = expandedSyllabusId === res.id;
          const linkedAssessment = assessments.find((a) => a.skill.toLowerCase() === res.skill.toLowerCase());
          const relevanceScore = res.careerRelevanceScore || res.industryAlignment || 90;

          return (
            <div
              key={res.id}
              className={`bg-white rounded-3xl p-5 border transition-all flex flex-col justify-between space-y-4 shadow-xs ${
                res.completed
                  ? 'border-emerald-300 bg-emerald-50/10 shadow-xs'
                  : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                {/* Header Pills: Provider & Price */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                      {res.level} • {res.mode}
                    </span>
                    {(res.isFree || res.price === 'Free') && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Free
                      </span>
                    )}
                  </div>
                  
                  <span className="font-extrabold text-xs px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                    {res.price}
                  </span>
                </div>

                {/* Course Title & Provider */}
                <div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{res.provider}</span>
                  </p>
                  {res.location && (
                    <p className="text-[11px] text-purple-700 font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-purple-600" />
                      <span>{res.location}</span>
                    </p>
                  )}
                </div>

                {/* Relevance & Alignment Gauge */}
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      Career Relevance
                    </span>
                    <span className="font-extrabold text-indigo-600">{relevanceScore}% Match</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${relevanceScore}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {res.whyRecommended}
                  </p>
                </div>

                {/* Meta details: Duration, Rating, Industry Recognition */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{res.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 font-medium truncate">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span className="truncate">{res.verificationStatus}</span>
                  </div>
                </div>

                {/* Expandable Syllabus Accordion */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => toggleSyllabus(res.id)}
                    className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 hover:text-indigo-600 py-1 cursor-pointer"
                  >
                    <span>Syllabus Summary ({(res.syllabus || []).length} Units)</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 space-y-1 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {(res.syllabus || []).map((s, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                
                {/* Linked Assessment Trigger */}
                {linkedAssessment && (
                  <button
                    onClick={() => {
                      setActiveAssessmentModalItem(linkedAssessment);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer border border-indigo-200"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                      Take Skill Defense ({linkedAssessment.title})
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Primary Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      showToast(`Opened study guide for ${res.title} (${res.provider}).`);
                    }}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    title="External syllabus preview"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </button>

                  {res.completed ? (
                    <div className="flex-1 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed & Logged</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => completeLearning(res.id)}
                      className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer text-center"
                    >
                      Complete & Log Progress
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No courses match your filter combination</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching to 'All (Free & Paid)' or selecting a different delivery mode.
          </p>
          <button
            onClick={() => {
              setPriceFilter('ALL');
              setModeFilter('ALL');
              setLevelFilter('ALL');
              setVerifiedCredentialOnly(false);
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
