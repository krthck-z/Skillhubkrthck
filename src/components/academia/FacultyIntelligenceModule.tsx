import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  Plus,
  Send,
  X,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { initialFacultyMembers } from '../../data/portalDetailedData';
import { FacultyMemberItem, FacultyComplaintRecord } from '../../types';
import { useApp } from '../../context/AppContext';

export const FacultyIntelligenceModule: React.FC = () => {
  const { showToast } = useApp();

  type FacultyViewTab = 'directory' | 'performance' | 'complaints';
  const [activeTab, setActiveTab] = useState<FacultyViewTab>('directory');

  const [facultyList, setFacultyList] = useState<FacultyMemberItem[]>(initialFacultyMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [selectedFacultyForDetail, setSelectedFacultyForDetail] = useState<FacultyMemberItem | null>(null);

  // Complaint Filing Form State
  const [isFilingComplaint, setIsFilingComplaint] = useState(false);
  const [complaintFacultyId, setComplaintFacultyId] = useState(facultyList[0]?.id || '');
  const [complaintCategory, setComplaintCategory] = useState<FacultyComplaintRecord['category']>('CURRICULUM_DELIVERY');
  const [complaintSummary, setComplaintSummary] = useState('');
  const [complaintEvidence, setComplaintEvidence] = useState('');

  const handleFileComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintSummary.trim()) return;

    const newRecord: FacultyComplaintRecord = {
      id: `comp-${Date.now()}`,
      category: complaintCategory,
      filedByRole: 'HOD',
      dateReported: new Date().toISOString().split('T')[0],
      summary: complaintSummary,
      evidenceNotes: complaintEvidence,
      status: 'UNDER_REVIEW'
    };

    setFacultyList(prev =>
      prev.map(f =>
        f.id === complaintFacultyId
          ? { ...f, complaints: [newRecord, ...f.complaints] }
          : f
      )
    );

    setIsFilingComplaint(false);
    setComplaintSummary('');
    setComplaintEvidence('');
    showToast('Formal academic report logged for Institutional Review.');
  };

  const departments = Array.from(new Set(facultyList.map(f => f.department)));

  const filteredFaculty = facultyList.filter(f => {
    if (selectedDepartment !== 'ALL' && f.department !== selectedDepartment) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchSub = f.subjectsTaught.some(s => s.toLowerCase().includes(q));
      const matchSkill = f.skills.some(s => s.skillName.toLowerCase().includes(q));
      if (!matchName && !matchSub && !matchSkill) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'directory' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Faculty Intelligence Directory ({facultyList.length})
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'performance' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Academic Subject Performance & Pass Rates
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'complaints' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Institutional Reporting & Complaints Audit
          </button>
        </div>

        <button
          onClick={() => setIsFilingComplaint(true)}
          className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Log Academic / Quality Report</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 1. FACULTY INTELLIGENCE DIRECTORY                                     */}
      {/* ===================================================================== */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <span>Institutional Faculty Intelligence & Skill Matrix</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Continuous skill evaluations, offline lab verification badges, and curriculum alignment recommendations.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by faculty, skill, subject..."
                    className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-bold text-slate-700"
                >
                  <option value="ALL">All Departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filteredFaculty.map((fac) => (
              <div key={fac.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-5 hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Top Profile Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-13 h-13 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-xs">
                        {(fac.name || 'Faculty').split(' ').map(n => n ? n[0] : '').join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-slate-900 text-base">{fac.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            fac.offlineVerificationStatus === 'PRACTICALLY_VERIFIED'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {fac.offlineVerificationStatus.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{fac.designation} • {fac.department}</p>
                        <p className="text-[11px] text-slate-400">{fac.qualification} • {fac.experienceYears} Years Exp.</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Faculty Rating</span>
                      <span className="text-base font-mono font-black text-indigo-700">★ {fac.overallPerformanceRating}</span>
                    </div>
                  </div>

                  {/* Subjects Taught Chips */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Subjects Taught:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {fac.subjectsTaught.map((sub, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual Skill Bars */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Skill Proficiency & Lab Evidence:
                    </span>
                    <div className="space-y-2">
                      {fac.skills.map((sk, idx) => {
                        const levelColor =
                          sk.level === 'STRONG'
                            ? 'bg-emerald-500'
                            : sk.level === 'DEVELOPING'
                            ? 'bg-amber-500'
                            : 'bg-rose-500';

                        const badgeColor =
                          sk.level === 'STRONG'
                            ? 'text-emerald-700 bg-emerald-50'
                            : sk.level === 'DEVELOPING'
                            ? 'text-amber-700 bg-amber-50'
                            : 'text-rose-700 bg-rose-50';

                        return (
                          <div key={idx} className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">{sk.skillName}</span>
                              <div className="flex items-center gap-1.5">
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${badgeColor}`}>
                                  {sk.level.replace(/_/g, ' ')}
                                </span>
                                <span className="font-mono font-bold text-slate-700 text-xs">{sk.proficiencyScore}%</span>
                              </div>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div className={`h-full rounded-full ${levelColor}`} style={{ width: `${sk.proficiencyScore}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommended Skills to Develop */}
                  <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 text-xs space-y-1">
                    <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider block">
                      Recommended Curriculum Upgrades:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {fac.recommendedSkillsToDevelop.map((rsk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white text-indigo-700 text-[10px] font-bold border border-indigo-200">
                          + {rsk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Attendance: <strong>{fac.attendancePercentage}%</strong></span>
                  <span>FDPs: <strong>{fac.fdpParticipationCount}</strong></span>
                  <button
                    onClick={() => setSelectedFacultyForDetail(fac)}
                    className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    View Academic Records →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. ACADEMIC SUBJECT PERFORMANCE & PASS RATES                          */}
      {/* ===================================================================== */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Faculty Subject Teaching Performance & Pass Rates</span>
            </h2>
            <p className="text-xs text-slate-500">
              Correlates enrolled student pass percentages, exam performance, and lab vivas with faculty member credentials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {facultyList.flatMap(f =>
              (f.subjectMetrics || []).map((m, idx) => (
                <div key={`${f.id}-${idx}`} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {m.subjectCode}
                      </span>
                      <h4 className="font-black text-slate-900 text-base mt-1">{m.subjectName}</h4>
                      <p className="text-xs text-slate-500">{f.name} • {m.semester}</p>
                    </div>
                    <span className="text-lg font-black font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      {m.passPercentage}% Pass
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Enrolled</span>
                      <span className="font-mono font-bold text-slate-800 text-sm">{m.studentsEnrolled}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 block font-bold">Passed</span>
                      <span className="font-mono font-bold text-emerald-700 text-sm">{m.studentsPassed}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-rose-500 block font-bold">Failed</span>
                      <span className="font-mono font-bold text-rose-600 text-sm">{m.studentsFailed}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Average Student Score: <strong>{m.averageScore} / 100</strong></span>
                    <span className="text-emerald-700 font-bold">Trend: {m.trend} ↑</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. INSTITUTIONAL COMPLAINTS & AUDIT TRAIL                             */}
      {/* ===================================================================== */}
      {activeTab === 'complaints' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>Faculty Academic Concern & Complaint Audit Log</span>
            </h2>
            <p className="text-xs text-slate-500">
              Institutional reporting trail: Reported → Under Review → Verification → Institutional Decision.
            </p>
          </div>

          <div className="space-y-4">
            {facultyList.flatMap(f =>
              (f.complaints || []).map((comp) => (
                <div key={comp.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        {comp.category.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs font-bold text-slate-700">Faculty: {f.name}</span>
                      <span className="text-xs text-slate-400">• Filed by {comp.filedByRole} on {comp.dateReported}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-900">
                      {comp.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-900">{comp.summary}</p>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    Evidence Notes: {comp.evidenceNotes}
                  </p>

                  {comp.resolutionDecision && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      <strong>Institutional Resolution:</strong> {comp.resolutionDecision}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Log Report Modal */}
      {isFilingComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">File Academic Quality Report</h3>
              <button onClick={() => setIsFilingComplaint(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFileComplaint} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Faculty Member *</label>
                <select
                  value={complaintFacultyId}
                  onChange={(e) => setComplaintFacultyId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  {facultyList.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={complaintCategory}
                  onChange={(e) => setComplaintCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="CURRICULUM_DELIVERY">Curriculum Delivery & Outdated Syllabus</option>
                  <option value="ACADEMIC_PERFORMANCE">Low Student Pass Rate Concern</option>
                  <option value="ATTENDANCE_CONCERN">Repeated Absence / Late Lab Delivery</option>
                  <option value="STUDENT_FEEDBACK">Student Feedback Concern</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Summary *</label>
                <input
                  type="text"
                  required
                  value={complaintSummary}
                  onChange={(e) => setComplaintSummary(e.target.value)}
                  placeholder="e.g. Students reporting lack of practical hands-on labs in Semester 3"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Evidence & Notes</label>
                <textarea
                  rows={3}
                  value={complaintEvidence}
                  onChange={(e) => setComplaintEvidence(e.target.value)}
                  placeholder="Detailed observations, class dates, or student representation notes..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFilingComplaint(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Institutional Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Faculty Details Modal */}
      {selectedFacultyForDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">{selectedFacultyForDetail.name}</h3>
                <p className="text-xs text-slate-500">{selectedFacultyForDetail.facultyId} • {selectedFacultyForDetail.department}</p>
              </div>
              <button onClick={() => setSelectedFacultyForDetail(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-700 block">Qualification & Track:</span>
                <p className="text-slate-600">{selectedFacultyForDetail.qualification}</p>
                <p className="text-slate-500">{selectedFacultyForDetail.experienceYears} Years Academic & Research Experience</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 block">Offline Proctored Test Log:</span>
                {selectedFacultyForDetail.offlineTestRecords.length === 0 ? (
                  <p className="text-slate-400 italic">No offline tests conducted yet.</p>
                ) : (
                  selectedFacultyForDetail.offlineTestRecords.map(t => (
                    <div key={t.id} className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-0.5">
                      <div className="flex justify-between font-bold">
                        <span>{t.skillName}</span>
                        <span>{t.scorePercent}% • {t.verdict}</span>
                      </div>
                      <p className="text-[11px] text-emerald-800">Evaluator: {t.evaluatorName} ({t.evaluatorOrg})</p>
                      <p className="text-[11px] text-emerald-700 italic">"{t.feedbackNotes}"</p>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 block">Verified Industry Certifications:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {selectedFacultyForDetail.certifications.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedFacultyForDetail(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
