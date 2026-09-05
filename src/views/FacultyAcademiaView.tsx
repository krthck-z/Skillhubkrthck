import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  BookOpen,
  Briefcase,
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Filter,
  Search,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Send,
  FileCheck,
  Plus,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FacultyOpportunityItem, FacultyOpportunityType } from '../types';

export const FacultyAcademiaView: React.FC = () => {
  const { facultyOpportunities, applyToFacultyOpportunity, showToast } = useApp();

  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpp, setSelectedOpp] = useState<FacultyOpportunityItem | null>(null);
  const [isNominateModalOpen, setIsNominateModalOpen] = useState(false);

  // Form states for faculty nomination
  const [facultyName, setFacultyName] = useState('Dr. P. Ravindra Reddy');
  const [designation, setDesignation] = useState('Associate Professor & HOD');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [collegeName, setCollegeName] = useState('SSBN Autonomous College, Anantapur');
  const [aicteId, setAicteId] = useState('FAC-AP-2024-8841');
  const [sopText, setSopText] = useState('I wish to participate to integrate modern microservices and container orchestration into our upcoming semester lab curriculum.');

  const typeOptions: { id: string; label: string }[] = [
    { id: 'ALL', label: 'All Programs' },
    { id: 'FACULTY_INTERNSHIP', label: 'Faculty Internships' },
    { id: 'INDUSTRIAL_TRAINING', label: 'Industrial Training' },
    { id: 'FDP', label: 'FDPs' },
    { id: 'CONSULTANCY', label: 'Consultancy' },
    { id: 'RESEARCH_COLLABORATION', label: 'Research Collaboration' },
    { id: 'GUEST_LECTURE', label: 'Guest Lectures & Workshops' }
  ];

  const filteredOpportunities = facultyOpportunities.filter((opp) => {
    if (selectedType !== 'ALL' && opp.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.hostOrganization.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q) ||
        opp.focusDomains.some((d) => d.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleNominateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;
    applyToFacultyOpportunity(selectedOpp.id);
    setIsNominateModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Academician & Faculty Collaboration Track</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Academia & Faculty Portal
            </h1>
            <p className="text-base sm:text-lg font-bold text-emerald-700">
              Bridging University Pedagogy with Real Industrial Execution (SIH26044).
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Under National Education Policy (NEP) & AICTE guidelines, professors and lecturers require direct enterprise immersion. Access verified <strong>Faculty Internships</strong>, <strong>Faculty Development Programs (FDP)</strong>, <strong>Joint R&D Grants</strong>, <strong>Industrial Consultancy</strong>, and <strong>Visiting Corporate Expert Lectures</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSelectedType('FACULTY_INTERNSHIP');
                showToast('Filtered by Faculty Internships');
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <span>Explore Faculty Internships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setSelectedType('FDP');
                showToast('Filtered by FDPs');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <span>AICTE Approved FDPs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, corporate host, domain (e.g., Cloud, PyTorch, Agriculture)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto pb-1 no-scrollbar">
            {typeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedType(opt.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === opt.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Type Badge & Host */}
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                  {opp.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {opp.verificationStatus}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900 leading-snug">
                  {opp.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-700">
                  {opp.hostOrganization}
                </p>
                <span className="text-[11px] text-slate-500 block">
                  {opp.hostType} • {opp.location}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {opp.description}
              </p>

              {/* Domains & Grant */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {opp.stipendOrGrant && (
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 font-semibold text-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Grant / Honorarium:</span>
                    <span className="text-emerald-700 font-bold">{opp.stipendOrGrant}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Duration: <strong>{opp.duration}</strong></span>
                  <span>Mode: <strong>{opp.mode}</strong></span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Focus Domains:</span>
                  <div className="flex flex-wrap gap-1">
                    {opp.focusDomains.map((dom, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedOpp(opp);
                  setIsNominateModalOpen(true);
                }}
                disabled={opp.applied}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  opp.applied
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {opp.applied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Nomination Submitted</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply / Nominate Faculty</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nomination Form Modal */}
      {isNominateModalOpen && selectedOpp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-200 shadow-xl space-y-4 my-8 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedOpp.type.replace('_', ' ')}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                  Faculty Nomination / Application
                </h3>
              </div>
              <button
                onClick={() => setIsNominateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs space-y-1">
              <p className="font-bold text-slate-800">{selectedOpp.title}</p>
              <p className="text-slate-500">{selectedOpp.hostOrganization} • {selectedOpp.duration}</p>
              <p className="text-[11px] text-emerald-700 font-semibold">{selectedOpp.stipendOrGrant}</p>
            </div>

            <form onSubmit={handleNominateSubmit} className="space-y-3 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Faculty Full Name</label>
                  <input
                    type="text"
                    value={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Designation & Role</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">AICTE / Faculty ID</label>
                  <input
                    type="text"
                    value={aicteId}
                    onChange={(e) => setAicteId(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">College / Institution</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Statement of Purpose / Pedagogical Outcome</label>
                <textarea
                  rows={3}
                  value={sopText}
                  onChange={(e) => setSopText(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  By submitting, your college principal / Dean will receive an automated NOC validation email via the SkillBridge Institutional Portal.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNominateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Nomination</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
