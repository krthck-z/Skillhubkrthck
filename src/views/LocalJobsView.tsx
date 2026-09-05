import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Search,
  Send,
  Building,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  X,
  FileCheck,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LocalPartTimeJob } from '../types';

export const LocalJobsView: React.FC = () => {
  const {
    localJobs,
    applyLocalJob,
    toggleSaveLocalJob,
    withdrawLocalJob,
    profile,
    setActiveTab,
    showToast
  } = useApp();

  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [scheduleFilter, setScheduleFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedJob, setSelectedJob] = useState<LocalPartTimeJob | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyPitch, setApplyPitch] = useState('');

  // Extract unique locations and categories
  const locations = useMemo(() => {
    const set = new Set(localJobs.map((j) => j.location));
    return ['ALL', ...Array.from(set)];
  }, [localJobs]);

  const categories = useMemo(() => {
    const set = new Set(localJobs.map((j) => j.category));
    return ['ALL', ...Array.from(set)];
  }, [localJobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return localJobs.filter((job) => {
      if (locationFilter !== 'ALL' && !job.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
      if (scheduleFilter !== 'ALL' && !job.workingHours.toLowerCase().includes(scheduleFilter.toLowerCase())) {
        return false;
      }
      if (categoryFilter !== 'ALL' && job.category !== categoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchEmp = job.employer.toLowerCase().includes(q);
        const matchLoc = job.location.toLowerCase().includes(q);
        const matchSkills = (job.requiredSkills || []).some((s) => s.toLowerCase().includes(q));
        const matchDesc = job.description.toLowerCase().includes(q);
        return matchTitle || matchEmp || matchLoc || matchSkills || matchDesc;
      }
      return true;
    });
  }, [localJobs, locationFilter, scheduleFilter, categoryFilter, searchQuery]);

  const handleOpenApplyModal = (job: LocalPartTimeJob) => {
    setSelectedJob(job);
    setApplyPitch(
      `Hello ${job.employer},\n\nI am applying for the ${job.title} position. I have verified SkillBridge credentials in ${(job.requiredSkills || []).slice(0, 2).join(', ')} with high assessment test defenses and am available for ${job.workingHours}.`
    );
    setIsApplyModalOpen(true);
  };

  const handleConfirmApply = () => {
    if (!selectedJob) return;
    applyLocalJob(selectedJob.id, applyPitch);
    setIsApplyModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Local Part-Time Jobs & Student Gigs
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Employer Verified
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Verified local opportunities tailored to your academic schedule with direct Skill Passport auto-match
              </p>
            </div>
          </div>
        </div>

        {/* Student Verification Badge Bar & Google Map Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setActiveTab('map')}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>View All on Google Map</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
          </button>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Verified Passport Match</span>
              <span className="text-[11px] text-slate-500">
                {profile.name} • {profile.department}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search local jobs by title, skill, or employer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="ALL">All Locations & Remote</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Remote">Remote / Online</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* Schedule Filter */}
          <div>
            <select
              value={scheduleFilter}
              onChange={(e) => setScheduleFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="ALL">All Schedules</option>
              <option value="Flexible">Flexible Hours</option>
              <option value="Weekend">Weekend Only</option>
              <option value="Evening">Evening (4-8 PM)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'ALL' ? 'All Roles' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Job Cards (Left/Center) + Selected Job Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Job Cards Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Showing {filteredJobs.length} local opportunities</span>
            <span>Sorted by Skill Match</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No local jobs match your criteria</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting filters to explore all student gigs.</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              const isApplied = job.applicationState === 'Applied';

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-slate-900 hover:text-emerald-600 transition-colors">
                          {job.title}
                        </h3>
                        {job.verificationStatus === 'Employer Verified' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 font-medium">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {job.employer} •{' '}
                        <span className="font-mono text-emerald-700">{job.employerHandle || '@employer'}</span>
                      </p>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-right shrink-0">
                      <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-extrabold text-xs flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        {job.matchScore}% Match
                      </div>
                    </div>
                  </div>

                  {/* Badges Row: Location, Schedule, Rate */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {job.workingHours}
                    </span>
                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                      <DollarSign className="w-3 h-3 text-emerald-600" />
                      {job.salaryRate}
                    </span>
                  </div>

                  {/* Skills Required */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(job.requiredSkills || []).map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Footer Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveLocalJob(job.id);
                      }}
                      className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                        job.isSaved ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${job.isSaved ? 'fill-emerald-600' : ''}`} />
                      <span>{job.isSaved ? 'Saved' : 'Save for later'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {isApplied ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Application Submitted
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenApplyModal(job);
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>1-Click Apply</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Job Detail Panel (Right 5 cols) */}
        <div className="lg:col-span-5">
          {selectedJob ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs sticky top-28 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {selectedJob.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {selectedJob.matchScore}% Verified Match
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-slate-900 mb-1">
                  {selectedJob.title}
                </h2>
                <p className="text-xs font-medium text-slate-600">
                  {selectedJob.employer} • {selectedJob.location}
                </p>
              </div>

              {/* Compensation & Working Hours Pill Box */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Payout</span>
                  <p className="font-extrabold text-emerald-700 text-sm">{selectedJob.salaryRate}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Schedule</span>
                  <p className="font-extrabold text-slate-800">{selectedJob.workingHours}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">Role Description</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Verified Defense Requirements */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Required Verified Skills</h4>
                <div className="space-y-1.5">
                  {(selectedJob.requiredSkills || []).map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200/70 text-xs"
                    >
                      <span className="font-semibold text-slate-800">{skill}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> In Your Passport
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security note */}
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-start gap-2 text-[11px] text-emerald-900 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Employer communicates only through SkillBridge Mailbox. No upfront fees or off-platform payment requests permitted.
                </span>
              </div>

              {/* Action Button */}
              {selectedJob.applicationState === 'Applied' ? (
                <div className="space-y-2">
                  <div className="w-full p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Application Active — Check Mailbox for Updates
                  </div>
                  <button
                    onClick={() => withdrawLocalJob(selectedJob.id)}
                    className="w-full text-center text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                  >
                    Withdraw Application
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleOpenApplyModal(selectedJob)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply with Skill Passport</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">Select a local job to view complete details, schedule, and match analysis.</p>
            </div>
          )}
        </div>
      </div>

      {/* APPLY CONFIRMATION MODAL */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Apply for {selectedJob.title}
                </h3>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Employer Preview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{selectedJob.employer}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {selectedJob.location} • {selectedJob.workingHours} • {selectedJob.salaryRate}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {selectedJob.matchScore}% Match
                </span>
              </div>

              {/* Pitch Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Note / Schedule Availability
                </label>
                <textarea
                  rows={4}
                  value={applyPitch}
                  onChange={(e) => setApplyPitch(e.target.value)}
                  className="w-full p-3 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
              </div>

              {/* Passport Attachment Preview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-emerald-600">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-800">
                    {profile.name} - SkillBridge Passport.pdf
                  </h5>
                  <p className="text-[10px] text-slate-500">
                    Includes verified test defense hashes, mentor ratings & capstone links
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmApply}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
