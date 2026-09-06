import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Calendar,
  Laptop,
  Building2,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  MapPin,
  ExternalLink,
  Plus,
  ShieldCheck,
  Search,
  Filter,
  Check,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import {
  initialFacultyTrainingEnrollments,
  initialFacultyClassSchedules
} from '../../data/portalDetailedData';
import { FacultyTrainingEnrollment, FacultyClassScheduleItem } from '../../types';
import { useApp } from '../../context/AppContext';

export const IndustryTrainingModule: React.FC = () => {
  const { showToast } = useApp();

  type TrainingTab = 'train-faculty' | 'train-students' | 'schedule' | 'online-programs' | 'offline-programs';
  const [trainingTab, setTrainingTab] = useState<TrainingTab>('train-faculty');

  const [enrollments, setEnrollments] = useState<FacultyTrainingEnrollment[]>(initialFacultyTrainingEnrollments);
  const [schedules, setSchedules] = useState<FacultyClassScheduleItem[]>(initialFacultyClassSchedules);
  const [facultySearch, setFacultySearch] = useState('');

  // Update Faculty Attendance or Assessment
  const handleUpdateEnrollmentStatus = (id: string, newAssessmentStatus: FacultyTrainingEnrollment['assessmentStatus']) => {
    setEnrollments(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              assessmentStatus: newAssessmentStatus,
              certificationStatus: newAssessmentStatus === 'PASSED' ? 'PRACTICALLY_VERIFIED' : item.certificationStatus,
              courseProgressPercent: newAssessmentStatus === 'PASSED' ? 100 : item.courseProgressPercent
            }
          : item
      )
    );
    showToast(`Faculty assessment status updated to ${newAssessmentStatus}`);
  };

  const handleIncrementAttendance = (id: string) => {
    setEnrollments(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, attendancePercent: Math.min(100, item.attendancePercent + 5) }
          : item
      )
    );
    showToast('Recorded faculty attendance for today session.');
  };

  const filteredEnrollments = enrollments.filter(e => {
    if (!facultySearch.trim()) return true;
    const q = facultySearch.toLowerCase();
    return (
      e.facultyName.toLowerCase().includes(q) ||
      e.collegeName.toLowerCase().includes(q) ||
      e.targetSkill.toLowerCase().includes(q) ||
      e.trainingProgramName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'train-faculty', label: 'Faculty Training Directory', icon: UserCheck },
            { id: 'schedule', label: 'Class Schedule Calendar', icon: Calendar },
            { id: 'train-students', label: 'Student Bootcamps', icon: Users },
            { id: 'offline-programs', label: 'Offline On-Campus Labs', icon: Building2 },
            { id: 'online-programs', label: 'Virtual Enterprise Tracks', icon: Laptop }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = trainingTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTrainingTab(tab.id as TrainingTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. FACULTY TRAINING DIRECTORY                                         */}
      {/* ===================================================================== */}
      {trainingTab === 'train-faculty' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  <span>College Faculty Training & Immersion Directory</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real tracking of regional professors and lecturers undergoing industry upskilling. Every faculty member undergoes practical lab defense before being certified.
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  placeholder="Search faculty, college, or skill..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEnrollments.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4 hover:border-indigo-300 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-base shrink-0">
                      {(item.facultyName || 'Faculty').split(' ').map(n => n ? n[0] : '').join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-slate-900 text-base">{item.facultyName}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                          {item.skillLevel}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.certificationStatus === 'PRACTICALLY_VERIFIED'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {item.certificationStatus.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {item.department} • {item.collegeName} • Subject: <strong>{item.subject}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end lg:self-auto">
                    <button
                      onClick={() => handleIncrementAttendance(item.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      + Record Today Attendance
                    </button>
                    <select
                      value={item.assessmentStatus}
                      onChange={(e) => handleUpdateEnrollmentStatus(item.id, e.target.value as any)}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      <option value="NOT_STARTED">Assessment: Not Started</option>
                      <option value="IN_PROGRESS">Assessment: In Progress</option>
                      <option value="PASSED">Assessment: Passed & Verified ✓</option>
                      <option value="REQUIRES_RETEST">Requires Practical Retest</option>
                    </select>
                  </div>
                </div>

                {/* Structured Training Meta Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Training Program</span>
                    <span className="font-bold text-slate-800">{item.trainingProgramName}</span>
                    <span className="text-[10px] text-slate-500 block">Trainer: {item.trainerName} ({item.trainerCompany})</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Target Skill</span>
                    <span className="font-bold text-indigo-700">{item.targetSkill}</span>
                    <span className="text-[10px] text-slate-500 block">Mode: {item.mode} • Batch: {item.batch}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Timing & Location</span>
                    <span className="font-bold text-slate-800">{item.classTiming}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{item.classLocation}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Attendance & Progress</span>
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 mb-1">
                      <span>Attendance: {item.attendancePercent}%</span>
                      <span>Progress: {item.courseProgressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.courseProgressPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. CLASS SCHEDULE CALENDAR                                            */}
      {/* ===================================================================== */}
      {trainingTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Interactive Training Classes & Calendar</span>
            </h2>
            <p className="text-xs text-slate-500">
              Live schedule of corporate lab sessions, hands-on microservices workshops, and offline invigilated vivas across regional colleges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {schedules.map((sc) => (
              <div key={sc.id} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex flex-col items-center leading-none">
                      <span className="text-[9px] uppercase">{sc.date.split('-')[1]}</span>
                      <span className="text-sm font-black font-mono">{sc.date.split('-')[2]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">{sc.courseName}</h4>
                      <p className="text-xs text-slate-500">{sc.facultyName} • {sc.collegeName}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    sc.status === 'COMPLETED'
                      ? 'bg-slate-100 text-slate-600'
                      : sc.status === 'IN_SESSION'
                      ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {sc.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Timing & Mode</span>
                    <span className="font-bold text-slate-700">{sc.time} ({sc.mode})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Trainer</span>
                    <span className="font-bold text-slate-700">{sc.trainerName}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{sc.location} • {sc.trainerCompany}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. STUDENT BOOTCAMPS                                                  */}
      {/* ===================================================================== */}
      {trainingTab === 'train-students' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>Industry-Led Student Bootcamps</span>
            </h2>
            <p className="text-xs text-slate-500">
              Practical software engineering cohorts. Students learn by writing production code, participating in sprint reviews, and defending live applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Full Stack Production Sprint (Cohort 4)</h3>
                  <p className="text-xs text-slate-500">45 Enrolled Students • SSBN & JNTUA</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Active Lab
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focuses on React 18, PostgreSQL indexing, and building multi-tenant SaaS applications with real JWT authentication.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Duration: 6 Weeks</span>
                <span className="font-bold text-indigo-600">Next Code Defense: Sept 18</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Agri-IoT & Telemetry Engineering</h3>
                  <p className="text-xs text-slate-500">30 Enrolled Students • AIC-SKU Partnered</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                  Hardware Lab
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students construct solar-powered telemetry nodes transmitting ground soil moisture and temperature data over LoRaWAN packets.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Duration: 4 Weeks</span>
                <span className="font-bold text-indigo-600">Next Field Calibration: Sept 22</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. OFFLINE LABS & 5. ONLINE ENTERPRISE TRACKS                         */}
      {/* ===================================================================== */}
      {(trainingTab === 'offline-programs' || trainingTab === 'online-programs') && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
          <Building2 className="w-10 h-10 text-indigo-600 mx-auto" />
          <h3 className="font-black text-slate-900 text-lg">
            {trainingTab === 'offline-programs' ? 'Rayalaseema Physical Lab Infrastructure' : 'Virtual Enterprise Cloud Sandboxes'}
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            {trainingTab === 'offline-programs'
              ? 'Physical workstations deployed at SSBN Autonomous College (Lab 2), JNTUA Central Innovation Hall, and AIC-SKU Innovation Hub.'
              : 'Containerized Linux virtual machines running Docker and PostgreSQL with automated test execution suites.'}
          </p>
        </div>
      )}
    </div>
  );
};
