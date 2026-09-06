import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  ShieldCheck,
  AlertTriangle,
  Award,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal,
  Mail,
  ExternalLink,
  ChevronRight,
  Plus,
  X,
  Send,
  UserCheck,
  FileSpreadsheet
} from 'lucide-react';
import { initialStudentDirectory } from '../../data/studentProjectsData';
import { initialStudentInterventions } from '../../data/portalDetailedData';
import { StudentDirectoryItem, StudentInterventionRecord, StudentRiskBand } from '../../types';
import { useApp } from '../../context/AppContext';
import { StudentPublicProfileModal } from '../modals/StudentPublicProfileModal';

// Generate robust 450-student strength sample view with deterministic mapping
const generateExtendedDirectory = (): (StudentDirectoryItem & {
  yearNum: string;
  section: string;
  cgpa: number;
  attendancePercent: number;
  riskBand: StudentRiskBand;
  skillGaps: string[];
  internshipStatus: 'Placed' | 'In Process' | 'Not Started';
})[] => {
  const baseStudents = initialStudentDirectory || [];
  const departments = ['B.Sc Computer Science', 'BCA', 'B.Com Computer Applications', 'B.Sc Electronics'];
  const sections = ['Section A', 'Section B', 'Section C'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  return baseStudents.map((st, idx) => {
    const dept = departments[idx % departments.length];
    const sec = sections[idx % sections.length];
    const yr = years[idx % years.length];
    const cgpa = Number((7.2 + ((idx * 0.4) % 2.6)).toFixed(1));
    const att = Math.min(98, 70 + (idx * 5) % 29);
    const score = st.readinessScore || 70;

    let band: StudentRiskBand = 'DEVELOPING';
    if (score >= 85 && att >= 85) band = 'HIGH_PERFORMING';
    else if (score < 60 || att < 75) band = 'AT_RISK';
    else if (score < 50 || att < 70) band = 'NEEDS_INTERVENTION';

    const gaps = ['Docker', 'Cloud CI/CD', 'API Architecture'].slice(0, 1 + (idx % 2));
    const internshipStatus = score > 85 ? 'Placed' : score > 70 ? 'In Process' : 'Not Started';

    return {
      ...st,
      degree: dept,
      yearNum: yr,
      section: sec,
      cgpa,
      attendancePercent: att,
      riskBand: band,
      skillGaps: gaps,
      internshipStatus
    };
  });
};

export const AcademiaStudentDirectoryModule: React.FC = () => {
  const { showToast, sendMail, openChatWithUser } = useApp();

  type ViewMode = 'directory' | 'intervention' | 'analytics';
  const [activeView, setActiveView] = useState<ViewMode>('directory');

  const fullStudents = useMemo(() => generateExtendedDirectory(), []);
  const [interventions, setInterventions] = useState<StudentInterventionRecord[]>(initialStudentInterventions);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');

  // Modal / Intervention Form State
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentDirectoryItem | null>(null);
  const [interventionStudent, setInterventionStudent] = useState<any | null>(null);
  const [interventionType, setInterventionType] = useState<StudentInterventionRecord['interventionType']>('ACADEMIC_COUNSELLING');
  const [interventionNotes, setInterventionNotes] = useState('');
  const [assignedFaculty, setAssignedFaculty] = useState('Dr. P. Ravindra Reddy');

  const filteredStudents = useMemo(() => {
    return fullStudents.filter(st => {
      if (selectedDept !== 'ALL' && st.degree !== selectedDept) return false;
      if (selectedYear !== 'ALL' && st.yearNum !== selectedYear) return false;
      if (selectedSection !== 'ALL' && st.section !== selectedSection) return false;
      if (selectedRisk !== 'ALL' && st.riskBand !== selectedRisk) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mName = st.name.toLowerCase().includes(q);
        const mId = st.id.toLowerCase().includes(q);
        const mGoal = (st.careerGoal || '').toLowerCase().includes(q);
        const mSkills = (st.verifiedSkills || []).some(s => s.toLowerCase().includes(q));
        if (!mName && !mId && !mGoal && !mSkills) return false;
      }
      return true;
    });
  }, [fullStudents, selectedDept, selectedYear, selectedSection, selectedRisk, searchQuery]);

  const handleCreateIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interventionStudent) return;

    const newRecord: StudentInterventionRecord = {
      id: `int-${Date.now()}`,
      studentId: interventionStudent.id,
      studentName: interventionStudent.name,
      riskBand: interventionStudent.riskBand,
      flagReason: `CGPA: ${interventionStudent.cgpa} • Attendance: ${interventionStudent.attendancePercent}%`,
      interventionType,
      assignedFacultyName: assignedFaculty,
      dateCreated: new Date().toISOString().split('T')[0],
      status: 'UNDER_SUPPORT',
      actionNotes: interventionNotes || 'Assigned tailored lab mentoring sessions.'
    };

    setInterventions([newRecord, ...interventions]);
    showToast(`Early intervention plan created for ${interventionStudent.name}!`);
    setInterventionStudent(null);
    setInterventionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top View Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveView('directory')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'directory' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Verified Student Directory (450 Students)
          </button>
          <button
            onClick={() => setActiveView('intervention')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'intervention' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Early Support & Interventions ({interventions.length})
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'analytics' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Institutional Placement & Skill Analytics
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Institution: <strong>SSBN Autonomous College, Anantapur</strong>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. VERIFIED STUDENT DIRECTORY WITH COMPREHENSIVE FILTERS              */}
      {/* ===================================================================== */}
      {activeView === 'directory' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Collegiate Student Strength & Verification Directory</span>
              </h3>
              <span className="text-xs text-slate-500">
                Displaying <strong>{filteredStudents.length}</strong> of 450 students
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, ID, career goal, or skill..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ALL">All Departments</option>
                  <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Com Computer Applications">B.Com Computer Applications</option>
                  <option value="B.Sc Electronics">B.Sc Electronics</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Academic Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ALL">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Class Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ALL">All Sections</option>
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Performance Band</label>
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value="ALL">All Bands</option>
                  <option value="HIGH_PERFORMING">🟢 High Performing</option>
                  <option value="DEVELOPING">🟡 Developing</option>
                  <option value="AT_RISK">🟠 At Risk</option>
                  <option value="NEEDS_INTERVENTION">🔴 Needs Intervention</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((st) => {
              const bandBadge =
                st.riskBand === 'HIGH_PERFORMING'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : st.riskBand === 'DEVELOPING'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : st.riskBand === 'AT_RISK'
                  ? 'bg-orange-50 text-orange-800 border-orange-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200';

              return (
                <div key={st.id} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between hover:border-indigo-300 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-black text-slate-900 text-sm">{st.name}</h4>
                          <span className={`px-2 py-0.2 rounded-full text-[9px] font-black border uppercase ${bandBadge}`}>
                            {st.riskBand.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{st.degree} • {st.yearNum} ({st.section})</p>
                        <p className="text-[10px] text-slate-400 font-mono">ID: {st.id}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold shrink-0">
                        {st.readinessScore}% Ready
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">CGPA</span>
                        <span className="font-bold text-slate-800">{st.cgpa}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">Attendance</span>
                        <span className={`font-bold ${st.attendancePercent < 75 ? 'text-rose-600' : 'text-slate-800'}`}>
                          {st.attendancePercent}%
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">Internship</span>
                        <span className="font-bold text-indigo-600 truncate block">{st.internshipStatus}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Verified Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(st.verifiedSkills || []).slice(0, 3).map((sk, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {st.skillGaps.length > 0 && (
                      <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100 text-[11px] text-amber-900">
                        <strong>Identified Gaps:</strong> {st.skillGaps.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setInterventionStudent(st)}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      + Flag Intervention
                    </button>
                    <button
                      onClick={() => setSelectedStudentForModal(st)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Dossier
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. EARLY SUPPORT & INTERVENTIONS                                      */}
      {/* ===================================================================== */}
      {activeView === 'intervention' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Student Support & Early Intervention Tracking</span>
            </h2>
            <p className="text-xs text-slate-500">
              Proactive diagnostic support for students with low lab attendance, viva defense difficulties, or skill gaps.
            </p>
          </div>

          <div className="space-y-4">
            {interventions.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.studentName}</span>
                    <span className="text-xs text-slate-400">({item.studentId})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      {item.interventionType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-700">
                    Status: {item.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block">Flag Reason:</span>
                    <p className="text-slate-700 font-medium">{item.flagReason}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Assigned Faculty Mentor:</span>
                    <p className="text-indigo-700 font-bold">{item.assignedFacultyName}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <strong>Action Notes:</strong> {item.actionNotes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. INSTITUTIONAL PLACEMENT & SKILL ANALYTICS                          */}
      {/* ===================================================================== */}
      {activeView === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Campus Strength & Skill Distribution Analytics</span>
            </h2>
            <p className="text-xs text-slate-500">
              Aggregated placement readiness across departments at SSBN Autonomous College.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Enrolled Strength</span>
              <span className="text-3xl font-black text-indigo-900 font-mono block">450</span>
              <span className="text-[11px] text-slate-500">UG Programs</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Placement Ready (80%+)</span>
              <span className="text-3xl font-black text-emerald-600 font-mono block">186</span>
              <span className="text-[11px] text-emerald-700">41.3% of total pool</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Developing (60-79%)</span>
              <span className="text-3xl font-black text-amber-600 font-mono block">212</span>
              <span className="text-[11px] text-amber-700">In practical labs</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs text-center space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Support Required</span>
              <span className="text-3xl font-black text-rose-600 font-mono block">52</span>
              <span className="text-[11px] text-rose-700">Under active coaching</span>
            </div>
          </div>
        </div>
      )}

      {/* Flag Intervention Modal */}
      {interventionStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">
                Create Support Intervention for {interventionStudent.name}
              </h3>
              <button onClick={() => setInterventionStudent(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIntervention} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Intervention Type</label>
                <select
                  value={interventionType}
                  onChange={(e) => setInterventionType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value="ACADEMIC_COUNSELLING">1:1 Academic Counselling</option>
                  <option value="COURSE_REMEDIATION">Course / Lab Remediation</option>
                  <option value="MENTOR_ASSIGNMENT">Faculty Mentor Assignment</option>
                  <option value="LAB_VIVA_COACHING">Lab Viva Coaching Clinic</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Faculty Mentor</label>
                <input
                  type="text"
                  value={assignedFaculty}
                  onChange={(e) => setAssignedFaculty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Action Notes & Support Plan</label>
                <textarea
                  rows={3}
                  value={interventionNotes}
                  onChange={(e) => setInterventionNotes(e.target.value)}
                  placeholder="e.g. Schedule 2 hours extra Saturday lab slot; provide guided code defense practice."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInterventionStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Assign Support Plan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Dossier Modal */}
      {selectedStudentForModal && (
        <StudentPublicProfileModal
          student={selectedStudentForModal}
          isOpen={!!selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}
    </div>
  );
};
