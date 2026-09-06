import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
  Zap,
  Phone,
  Mail,
  FolderGit2,
  Check,
  X,
  ChevronDown,
  Bookmark,
  Calendar,
  Send,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { initialStudentDirectory } from '../../data/studentProjectsData';
import { StudentPublicProfileModal } from '../modals/StudentPublicProfileModal';
import { FastRecruitmentRequirement, StudentDirectoryItem } from '../../types';

interface IndustryTalentModuleProps {
  onOpenDefineModal: () => void;
}

export const IndustryTalentModule: React.FC<IndustryTalentModuleProps> = ({ onOpenDefineModal }) => {
  const {
    fastRequirements,
    candidateComparisons,
    toggleCandidateShortlist,
    hireCandidate,
    sendMail,
    showToast,
    openChatWithUser
  } = useApp();

  type TalentTab = 'discover' | 'search' | 'fast-match' | 'shortlist' | 'saved';
  const [talentSubTab, setTalentSubTab] = useState<TalentTab>('fast-match');

  // Fast Match Selected Requirement
  const [selectedReqId, setSelectedReqId] = useState<string>(fastRequirements[0]?.id || 'fast-req-1');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentDirectoryItem | null>(null);
  const [savedCandidateIds, setSavedCandidateIds] = useState<string[]>([]);

  // Advanced Search Engine Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('ALL');
  const [selectedDegree, setSelectedDegree] = useState('ALL');
  const [selectedSkill, setSelectedSkill] = useState('ALL');
  const [minSkillLevel, setMinSkillLevel] = useState<'ANY' | 'Basic' | 'Intermediate' | 'Advanced'>('ANY');
  const [evidenceFilter, setEvidenceFilter] = useState<'ALL' | 'OFFLINE_VERIFIED' | 'PRACTICAL_TEST_PASSED' | 'CERTIFICATE'>('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState<'ALL' | 'IMMEDIATE' | 'PART_TIME' | 'INTERNSHIP'>('ALL');
  const [minReadiness, setMinReadiness] = useState<number>(0);
  const [projectOnly, setProjectOnly] = useState(false);

  // Invite Modal State
  const [inviteCandidate, setInviteCandidate] = useState<{ id: string; name: string; type: 'INTERVIEW' | 'PROJECT' | 'INTERNSHIP' } | null>(null);
  const [inviteNotes, setInviteNotes] = useState('');
  const [inviteDate, setInviteDate] = useState('2026-09-25');

  const selectedRequirement = fastRequirements.find((r) => r.id === selectedReqId) || fastRequirements[0] || {
    id: 'fast-req-1',
    roleTitle: 'Junior Full Stack Developer',
    companyName: 'Rayalaseema Tech Systems',
    hiringUrgency: 'IMMEDIATE',
    location: 'Anantapur / Hybrid',
    stipendOrSalary: '₹22,000 / month',
    skillsRequired: [
      { skillName: 'HTML & CSS', minEvidenceLevel: 'PRACTICAL_TEST_PASSED', isRequired: true },
      { skillName: 'JavaScript', minEvidenceLevel: 'PRACTICAL_TEST_PASSED', isRequired: true },
      { skillName: 'React', minEvidenceLevel: 'PRACTICAL_TEST_PASSED', isRequired: true },
      { skillName: 'Git', minEvidenceLevel: 'VERIFIED_PROJECT', isRequired: false }
    ]
  };

  const candidatesForReq = (candidateComparisons && candidateComparisons[selectedRequirement.id]) || [];

  const toggleSaveCandidate = (candId: string) => {
    setSavedCandidateIds(prev =>
      prev.includes(candId) ? prev.filter(id => id !== candId) : [...prev, candId]
    );
    showToast(savedCandidateIds.includes(candId) ? 'Removed from saved candidates' : 'Candidate saved to talent bookmarks!');
  };

  const handleSendInvite = () => {
    if (!inviteCandidate) return;
    sendMail({
      recipient: inviteCandidate.name,
      recipientRole: 'Student Candidate',
      subject: `Industry ${inviteCandidate.type} Invitation: ${selectedRequirement.roleTitle}`,
      body: `Dear ${inviteCandidate.name},\n\nWe were impressed by your verified SkillBridge profile. We would like to formally invite you for a ${inviteCandidate.type.toLowerCase()} opportunity for our role "${selectedRequirement.roleTitle}".\n\nProposed Date: ${inviteDate}\nNotes: ${inviteNotes || 'We look forward to discussing your practical software project.'}\n\nPlease reply in SkillBridge Mailbox to confirm your attendance.`,
      category: 'INDUSTRY',
      priority: 'HIGH'
    });
    setInviteCandidate(null);
    setInviteNotes('');
    showToast(`Official ${inviteCandidate.type} invitation dispatched to ${inviteCandidate.name}!`);
  };

  const handleRequestOfflineVerification = (candName: string, skillName: string) => {
    sendMail({
      recipient: candName,
      recipientRole: 'Student Candidate',
      subject: `Recruiter Request: Offline Invigilated Assessment for ${skillName}`,
      body: `Hello ${candName},\n\nA corporate recruiter reviewing your profile for "${selectedRequirement.roleTitle}" has requested offline proctored verification for ${skillName}.\n\nYou can book an invigilated lab slot at the SkillBridge Assessment Centre Anantapur via your Assessment tab.`,
      category: 'ASSESSMENT',
      priority: 'URGENT'
    });
    showToast(`Verification request for ${skillName} sent to ${candName}`);
  };

  // Filtered Students for the Search Engine
  const filteredStudents = useMemo(() => {
    return (initialStudentDirectory || []).filter(student => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (student.name || '').toLowerCase().includes(q);
        const matchesId = (student.id || '').toLowerCase().includes(q);
        const matchesCollege = (student.college || '').toLowerCase().includes(q);
        const matchesGoal = (student.careerGoal || student.targetCareer || '').toLowerCase().includes(q);
        const matchesSkills = (student.verifiedSkills || []).some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesId && !matchesCollege && !matchesGoal && !matchesSkills) return false;
      }
      if (selectedCollege !== 'ALL' && student.college !== selectedCollege) return false;
      if (selectedDegree !== 'ALL' && student.degree !== selectedDegree) return false;
      if (selectedSkill !== 'ALL' && !(student.verifiedSkills || []).includes(selectedSkill)) return false;
      if (minReadiness > 0 && (student.readinessScore || 0) < minReadiness) return false;
      if (projectOnly && !student.projectTitle) return false;
      if (evidenceFilter === 'OFFLINE_VERIFIED' && student.evidenceLevel !== 'OFFLINE_VERIFIED') return false;
      if (evidenceFilter === 'PRACTICAL_TEST_PASSED' && student.evidenceLevel !== 'PRACTICAL_VERIFIED' && student.evidenceLevel !== 'OFFLINE_VERIFIED') return false;
      return true;
    });
  }, [searchQuery, selectedCollege, selectedDegree, selectedSkill, minReadiness, projectOnly, evidenceFilter]);

  // Unique lists for filter dropdowns
  const uniqueColleges = Array.from(new Set((initialStudentDirectory || []).map(s => s.college).filter(Boolean)));
  const uniqueDegrees = Array.from(new Set((initialStudentDirectory || []).map(s => s.degree).filter(Boolean)));
  const allSkills = Array.from(new Set((initialStudentDirectory || []).flatMap(s => s.verifiedSkills || [])));

  return (
    <div className="space-y-6">
      {/* Talent Top Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'fast-match', label: 'Fast Match Engine', icon: Zap },
            { id: 'discover', label: 'Discover Talent', icon: Sparkles },
            { id: 'search', label: 'Recruiter Search Engine', icon: Search },
            { id: 'shortlist', label: 'Shortlisted Pool', icon: Award },
            { id: 'saved', label: `Saved (${savedCandidateIds.length})`, icon: Bookmark }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = talentSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTalentSubTab(tab.id as TalentTab)}
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

        <button
          onClick={onOpenDefineModal}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post Fast Requirement</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 1. FAST MATCH ENGINE SUB-TAB                                          */}
      {/* ===================================================================== */}
      {talentSubTab === 'fast-match' && (
        <div className="space-y-6">
          {/* Active Requirement Selector */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Active Company Requirement:
              </span>
              <span className="text-xs text-indigo-600 font-semibold">
                {fastRequirements.length} active roles configured
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {fastRequirements.map((req) => (
                <button
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedReqId === req.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{req.roleTitle}</span>
                  <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] uppercase ${
                    selectedReqId === req.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {req.hiringUrgency}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Requirement Snapshot Card */}
          <div className="bg-indigo-50/70 rounded-3xl p-6 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg font-black text-indigo-950">{selectedRequirement.roleTitle}</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-900 text-[10px] font-extrabold uppercase">
                  {selectedRequirement.hiringUrgency}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {selectedRequirement.stipendOrSalary}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {selectedRequirement.companyName} • {selectedRequirement.location} • Minimum Level: {selectedRequirement.experienceLevel || 'Entry-Level'}
              </p>
              
              <div className="pt-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Required Minimum Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedRequirement.skillsRequired || []).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-indigo-700 text-xs font-bold border border-indigo-200/80 shadow-2xs">
                      {s.skillName} • <span className="text-[10px] font-normal text-slate-500">{s.minEvidenceLevel}</span>
                      {s.isRequired && <span className="text-rose-500 ml-1 font-black">*</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-indigo-100 text-center shrink-0 min-w-[160px] shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block">Matched Pool</span>
              <span className="text-3xl font-black text-indigo-900 font-mono">{candidatesForReq.length}</span>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Pre-screened candidates</span>
            </div>
          </div>

          {/* Deep Candidate Comparison Feed */}
          <div className="space-y-4">
            {candidatesForReq.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-900 text-base">No Direct Matches Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try broadening the skill thresholds or switch to Recruiter Search Engine to browse the entire student directory.
                </p>
              </div>
            ) : (
              candidatesForReq.map((cand: any) => {
                const candName = cand.candidateName || cand.studentName || 'Candidate';
                const candId = cand.id || cand.studentId || 'cand-id';
                const isShort = cand.shortlisted ?? cand.isShortlisted ?? false;
                const isHired = cand.hired ?? cand.isHired ?? false;
                const isSaved = savedCandidateIds.includes(candId);
                const matchPercent = cand.readinessScore ?? Math.round(((cand.matchedCount || 1) / (cand.totalRequiredCount || 1)) * 100);
                
                // Determine eligibility verdict based on match criteria
                const isEligible = matchPercent >= 80;
                const isPartiallyEligible = matchPercent >= 50 && matchPercent < 80;
                const eligibilityLabel = isEligible ? '🟢 ELIGIBLE' : isPartiallyEligible ? '🟡 PARTIALLY ELIGIBLE' : '🔴 NOT YET ELIGIBLE';
                const eligibilityBadgeColor = isEligible ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : isPartiallyEligible ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-rose-50 text-rose-800 border-rose-200';

                const skillsList = cand.skillsEvaluation || cand.skillMatches || [];
                const matchedSkills = skillsList.filter((s: any) => s.studentHasSkill || s.status === 'PASS').map((s: any) => s.skill || s.skillName);
                const missingSkills = skillsList.filter((s: any) => !s.studentHasSkill && s.status !== 'PASS').map((s: any) => s.skill || s.skillName);
                const joinDate = cand.earliestJoinDate || cand.availability || 'Immediate Availability';

                return (
                  <div key={candId} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-5 hover:border-indigo-300 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                          {candName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-black text-slate-900 text-lg">{candName}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${eligibilityBadgeColor}`}>
                              {eligibilityLabel}
                            </span>
                            {cand.offlineCenterVerified && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-indigo-600" />
                                <span>Offline Verified</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">
                            {cand.degree} • {cand.institution || cand.college}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons Toolbar */}
                      <div className="flex items-center gap-2 flex-wrap self-end lg:self-auto">
                        <button
                          onClick={() => toggleSaveCandidate(candId)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isSaved ? 'bg-amber-50 text-amber-600 border-amber-300' : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save candidate'}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>

                        <button
                          onClick={() => toggleCandidateShortlist(selectedRequirement.id, candId)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            isShort
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {isShort ? 'Shortlisted ✓' : 'Shortlist'}
                        </button>

                        <button
                          onClick={() => setInviteCandidate({ id: candId, name: candName, type: 'INTERVIEW' })}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Invite</span>
                        </button>

                        <button
                          onClick={() => openChatWithUser({ id: candId, name: candName, role: 'Student Candidate', org: cand.institution })}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>Contact</span>
                        </button>

                        <button
                          onClick={() => hireCandidate(selectedRequirement.id, candId)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-xs cursor-pointer ${
                            isHired ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {isHired ? 'Offered / Hired ✓' : 'Release Offer'}
                        </button>
                      </div>
                    </div>

                    {/* Requirement Satisfaction Analysis (Why Eligible / Missing) */}
                    <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">Requirement Satisfaction Breakdown:</span>
                        <span className="font-black text-indigo-700 font-mono text-sm">{matchPercent}% Match Readiness</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Satisfied Requirements ({matchedSkills.length}):</span>
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {matchedSkills.map((sk: string, idx: number) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 font-bold text-[11px]">
                                {sk} ✓
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            <span>Missing Skills ({missingSkills.length}):</span>
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {missingSkills.length === 0 ? (
                              <span className="text-[11px] text-slate-500 italic">None — Meets all minimum requirements</span>
                            ) : (
                              missingSkills.map((sk: string, idx: number) => (
                                <span key={idx} className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-[11px] border border-rose-200">
                                  {sk}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Evidence Verification Details */}
                      <div className="grid sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/60">
                        {skillsList.map((sm: any, sIdx: number) => {
                          const skillName = sm.skill || sm.skillName || 'Skill';
                          const status = sm.status || (sm.matchesRequirement ? 'PASS' : 'REVIEW');
                          const evidence = sm.evidenceLevel || sm.candidateEvidence || 'VERIFIED';
                          return (
                            <div key={sIdx} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
                              <div>
                                <span className="font-bold text-slate-800 block">{skillName}</span>
                                <span className="text-[10px] text-slate-500">{evidence.toString().replace(/_/g, ' ')}</span>
                              </div>
                              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${
                                status === 'PASS' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {status}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Secondary Action Toolbar: Verification Request & Inspect Evidence */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs text-slate-600">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-700">Availability: <strong className="text-indigo-600">{joinDate}</strong></span>
                          <span>•</span>
                          <span className="text-slate-500">Live Project: <strong>{cand.projectTitle || 'Kisan Mitra AI'}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRequestOfflineVerification(candName, matchedSkills[0] || 'Core Skills')}
                            className="text-xs font-bold text-slate-600 hover:text-indigo-600 underline cursor-pointer"
                          >
                            Request Offline Test
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            onClick={() => {
                              const std = (initialStudentDirectory || []).find(s => s.name === candName) || {
                                id: candId,
                                name: candName,
                                college: cand.institution || 'SSBN Autonomous College',
                                degree: cand.degree || 'B.Sc Computer Science',
                                year: 'Final Year',
                                verifiedSkills: matchedSkills,
                                readinessScore: matchPercent,
                                projectTitle: cand.projectTitle || 'Capstone Full Stack Systems',
                                projectUrl: 'https://github.com/skillbridge/project-demo',
                                evidenceLevel: cand.offlineCenterVerified ? 'OFFLINE_VERIFIED' : 'PRACTICAL_TEST_PASSED',
                                careerGoal: selectedRequirement.roleTitle,
                                badges: ['Code Sandbox Defense', 'Proctored Exam']
                              };
                              setSelectedStudentForModal(std as any);
                            }}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect Full Evidence Dossier</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. DISCOVER TALENT SUB-TAB                                            */}
      {/* ===================================================================== */}
      {talentSubTab === 'discover' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Rayalaseema Collegiate Talent Pool</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">Discover Pre-Screened Student Engineers</h2>
            <p className="text-xs text-slate-500 max-w-2xl">
              Every candidate below has completed invigilated code sandboxes, architectural viva defense, or offline proctored assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(initialStudentDirectory || []).map((student) => (
              <div key={student.id} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between hover:border-indigo-300 transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {student.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-tight">{student.name}</h4>
                        <p className="text-[11px] text-slate-500">{student.degree}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200 shrink-0">
                      {student.readinessScore}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{student.college}</span>
                  </p>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Verified Skill Badges:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(student.verifiedSkills || []).slice(0, 4).map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800 block">Live Capstone Project:</span>
                    <span className="text-indigo-700 font-medium truncate block">{student.projectTitle}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleSaveCandidate(student.id)}
                    className="text-xs font-bold text-slate-500 hover:text-indigo-600 cursor-pointer"
                  >
                    {savedCandidateIds.includes(student.id) ? 'Saved ★' : 'Save'}
                  </button>

                  <button
                    onClick={() => setSelectedStudentForModal(student)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. RECRUITER MULTI-PARAMETER SEARCH ENGINE                            */}
      {/* ===================================================================== */}
      {talentSubTab === 'search' && (
        <div className="space-y-6">
          {/* Multi-parameter Search Filter Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Multi-Parameter Candidate Search Engine</span>
              </h3>
              <span className="text-xs text-slate-500">
                Found <strong>{filteredStudents.length}</strong> matching candidates
              </span>
            </div>

            {/* Keyword Query Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, ID, career goal, college, or technology..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Structured Select Filters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Campus</label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ALL">All Campuses</option>
                  {uniqueColleges.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Degree</label>
                <select
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ALL">All Degrees</option>
                  {uniqueDegrees.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Verified Skill</label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ALL">All Skills</option>
                  {allSkills.map((sk) => (
                    <option key={sk} value={sk}>{sk}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Evidence Level</label>
                <select
                  value={evidenceFilter}
                  onChange={(e) => setEvidenceFilter(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="ALL">Any Evidence</option>
                  <option value="OFFLINE_VERIFIED">Offline Proctored</option>
                  <option value="PRACTICAL_TEST_PASSED">Practical Sandbox Passed</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Min Readiness</label>
                <select
                  value={minReadiness}
                  onChange={(e) => setMinReadiness(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value={0}>Any Score</option>
                  <option value={70}>70%+ Ready</option>
                  <option value={80}>80%+ Ready</option>
                  <option value={90}>90%+ Ready</option>
                </select>
              </div>
            </div>

            {/* Quick Action Toggle Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-semibold text-[11px]">Quick Filters:</span>
              <button
                onClick={() => setProjectOnly(!projectOnly)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                  projectOnly ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Has Live GitHub Project
              </button>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCollege('ALL');
                  setSelectedDegree('ALL');
                  setSelectedSkill('ALL');
                  setEvidenceFilter('ALL');
                  setMinReadiness(0);
                  setProjectOnly(false);
                }}
                className="text-xs font-semibold text-rose-600 hover:underline ml-auto cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Search Results List */}
          <div className="space-y-3">
            {filteredStudents.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
                <p className="text-sm font-bold text-slate-800">No candidates match the specified parameters.</p>
                <p className="text-xs text-slate-500">Try loosening the skill or campus filters above.</p>
              </div>
            ) : (
              filteredStudents.map((st) => (
                <div key={st.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-300 transition-all">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {st.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">{st.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {st.readinessScore}% Ready
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">ID: {st.id}</span>
                      </div>
                      <p className="text-xs text-slate-500">{st.degree} • {st.college}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(st.verifiedSkills || []).map((sk, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => toggleSaveCandidate(st.id)}
                      className={`p-2 rounded-xl border text-xs cursor-pointer ${
                        savedCandidateIds.includes(st.id) ? 'bg-amber-50 text-amber-600 border-amber-300' : 'bg-white text-slate-500 border-slate-200'
                      }`}
                      title="Save candidate"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => setInviteCandidate({ id: st.id, name: st.name, type: 'INTERVIEW' })}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Invite
                    </button>
                    <button
                      onClick={() => setSelectedStudentForModal(st)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Dossier
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. SHORTLISTED CANDIDATES                                             */}
      {/* ===================================================================== */}
      {talentSubTab === 'shortlist' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Shortlisted Candidate Pool</span>
            </h2>
            <p className="text-xs text-slate-500">
              Candidates marked with a shortlist badge across active requirements. You can schedule interview rounds or release direct hiring offers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {candidatesForReq.filter((c: any) => c.shortlisted ?? c.isShortlisted).length === 0 ? (
              <div className="col-span-2 bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
                <Award className="w-8 h-8 text-amber-400 mx-auto" />
                <h3 className="font-bold text-slate-900 text-sm">No Shortlisted Candidates for Current Role</h3>
                <p className="text-xs text-slate-500">
                  Switch to Fast Match or Recruiter Search and click "Shortlist" on promising profiles.
                </p>
              </div>
            ) : (
              candidatesForReq.filter((c: any) => c.shortlisted ?? c.isShortlisted).map((cand: any) => (
                <div key={cand.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{cand.candidateName || cand.studentName}</h4>
                      <p className="text-xs text-slate-500">{cand.degree} • {cand.institution}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                      Shortlisted
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => toggleCandidateShortlist(selectedRequirement.id, cand.id)}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => hireCandidate(selectedRequirement.id, cand.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Release Offer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. SAVED CANDIDATES                                                   */}
      {/* ===================================================================== */}
      {talentSubTab === 'saved' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-indigo-600" />
              <span>Saved Candidate Bookmarks</span>
            </h2>
            <p className="text-xs text-slate-500">
              Profiles saved for future recruitment cycles, campus drives, and apprentice cohorts.
            </p>
          </div>

          <div className="space-y-3">
            {savedCandidateIds.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
                <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-900 text-sm">No Saved Candidates</h3>
                <p className="text-xs text-slate-500">Click the bookmark icon on any candidate to save them here.</p>
              </div>
            ) : (
              savedCandidateIds.map((id) => {
                const std = (initialStudentDirectory || []).find(s => s.id === id);
                if (!std) return null;
                return (
                  <div key={id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{std.name}</h4>
                      <p className="text-xs text-slate-500">{std.degree} • {std.college}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveCandidate(id)}
                        className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => setSelectedStudentForModal(std)}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        View Dossier
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Candidate Public Profile Modal */}
      {selectedStudentForModal && (
        <StudentPublicProfileModal
          student={selectedStudentForModal}
          isOpen={!!selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}

      {/* Invite to Interview / Project Modal */}
      {inviteCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">
                Invite {inviteCandidate.name}
              </h3>
              <button onClick={() => setInviteCandidate(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Dispatches an authenticated invitation to the candidate's SkillBridge Mailbox and WhatsApp SMS alert.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Invitation Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['INTERVIEW', 'PROJECT', 'INTERNSHIP'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setInviteCandidate({ ...inviteCandidate, type: t })}
                      className={`py-1.5 rounded-xl font-bold border transition-colors cursor-pointer ${
                        inviteCandidate.type === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposed Date</label>
                <input
                  type="date"
                  value={inviteDate}
                  onChange={(e) => setInviteDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Custom Recruiter Notes</label>
                <textarea
                  rows={3}
                  value={inviteNotes}
                  onChange={(e) => setInviteNotes(e.target.value)}
                  placeholder="e.g. We would like you to present your Capstone project architecture during a 30-minute video discussion."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setInviteCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Official Invitation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
