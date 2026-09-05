import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  MapPin,
  Building,
  UserPlus,
  Mail,
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Lock,
  UserCheck,
  UserX,
  Flag,
  Share2,
  Send,
  Plus
} from 'lucide-react';
import { StudentDirectoryItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface StudentPublicProfileModalProps {
  student: StudentDirectoryItem | null;
  onClose: () => void;
  onInviteToProject?: (student: StudentDirectoryItem) => void;
  onInviteToStartup?: (student: StudentDirectoryItem) => void;
}

export const StudentPublicProfileModal: React.FC<StudentPublicProfileModalProps> = ({
  student,
  onClose,
  onInviteToProject,
  onInviteToStartup
}) => {
  const { sendMail, showToast, startOrOpenConversation, setActiveTab: setAppActiveTab } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'achievements'>('overview');
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [isConnected, setIsConnected] = useState(student?.isConnected || false);
  const [isFollowed, setIsFollowed] = useState(student?.isFollowed || false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate behavior or profile claim');

  if (!student) return null;

  const handleConnect = () => {
    setIsConnected(!isConnected);
    showToast(
      !isConnected
        ? `Connection request sent to ${student.name}!`
        : `Disconnected from ${student.name}`
    );
  };

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    showToast(!isFollowed ? `Now following ${student.name}` : `Unfollowed ${student.name}`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgSubject.trim() || !msgBody.trim()) return;

    sendMail({
      recipient: student.name,
      recipientRole: `Student • ${student.targetCareer}`,
      recipientHandle: student.studentId,
      subject: msgSubject,
      body: msgBody,
      category: 'COMMUNITY',
      priority: 'NORMAL'
    });

    setIsMessageOpen(false);
    setMsgSubject('');
    setMsgBody('');
    showToast(`Direct message sent to ${student.name} via internal mailbox!`);
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReportOpen(false);
    showToast(`Report submitted for ${student.name}. Our community safety team will review it.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-7 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={
                  student.avatar ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                }
                alt={student.name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-lg shrink-0"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-slate-900 text-white" title="Active on SkillBridge">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{student.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Evidence Verified
                </span>
              </div>

              <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                {student.targetCareer} • {student.course}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {student.college}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {student.location}
                </span>
                <span>•</span>
                <span className="font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded text-[11px]">
                  ID: {student.studentId}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Strip */}
          <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-4 border-t border-white/10">
            <button
              onClick={handleConnect}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isConnected
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isConnected ? 'Connected' : 'Connect'}</span>
            </button>

            <button
              onClick={() => {
                startOrOpenConversation({
                  participantName: student.name,
                  participantRole: 'student',
                  participantOrg: student.college,
                  initialMessage: `Hi ${student.name}, I was impressed by your verified ${student.targetCareer} portfolio and projects on SkillBridge!`
                });
                onClose();
                setAppActiveTab('messages');
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>

            <button
              onClick={() => {
                setMsgSubject(`Collaboration Inquiry from SkillBridge`);
                setMsgBody(`Hi ${student.name},\n\nI noticed your verified projects and skills in ${student.verifiedSkills.slice(0, 3).join(', ')}. Would love to discuss collaborating!`);
                setIsMessageOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Formal Mail</span>
            </button>

            <button
              onClick={handleFollow}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isFollowed ? 'Following' : 'Follow'}</span>
            </button>

            {onInviteToProject && (
              <button
                onClick={() => onInviteToProject(student)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Invite to Project</span>
              </button>
            )}

            {onInviteToStartup && (
              <button
                onClick={() => onInviteToStartup(student)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Invite to Startup</span>
              </button>
            )}

            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={() => setIsReportOpen(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                title="Report profile"
              >
                <Flag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Sub-tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 shrink-0 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Bio' },
            { id: 'projects', label: `Projects (${student.portfolioProjects.length})` },
            { id: 'skills', label: `Skills (${student.verifiedSkills.length} Verified)` },
            { id: 'achievements', label: `Achievements & Awards (${student.achievements.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Bio & Availability */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    About {student.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    Availability: {student.availability}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{student.bio}</p>
              </div>

              {/* Grid: Academic & Readiness */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold">
                    <BookOpen className="w-4 h-4" />
                    <span>Education & Degree</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{student.degree}</p>
                  <p className="text-xs text-slate-600">{student.college}</p>
                  <p className="text-[11px] text-slate-500 pt-1">Course: {student.course}</p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>Career Readiness Score</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">{student.careerReadiness}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${student.careerReadiness}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Target Goal: <strong>{student.targetCareer}</strong> • {student.experienceYears}
                  </p>
                </div>
              </div>

              {/* Collaboration Interests */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700">Collaboration & Project Interests</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(student.collaborationInterests || []).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      {item}
                    </span>
                  ))}
                  {(student.startupInterests || []).map((item, idx) => (
                    <span
                      key={`st-${idx}`}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100"
                    >
                      🚀 {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Privacy Shield Notice */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Contact Privacy Protected by SkillBridge AI</p>
                  <p className="text-slate-600">
                    Personal phone numbers and direct email addresses remain strictly private until mutual connection is established and contact permissions are granted. You can message this student directly via the SkillBridge internal mailbox.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Demonstrated Project Repositories
                </h3>
                <span className="text-xs text-slate-500">
                  {student.portfolioProjects.length} Verified Repositories
                </span>
              </div>

              <div className="grid gap-4">
                {(student.portfolioProjects || []).map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Code Defense Verified
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {(proj.skills || []).map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {proj.githubUrl && (
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-3 text-xs">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View Public Commits</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Skills ({(student.verifiedSkills || []).length})
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(student.verifiedSkills || []).map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-900">{skill}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Assessed & Passed
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {(student.unverifiedSkills || []).length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
                    Self-Declared Skills (Awaiting Assessment)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(student.unverifiedSkills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-700">Formal Certifications</h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {(student.certifications || []).map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Verified Milestones & Honors
              </h3>
              <div className="grid gap-3">
                {(student.achievements || []).map((ach, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{ach}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Authenticated via institutional verification or hackathon committee records.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Compose Direct Message Modal */}
        {isMessageOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span>Message {student.name}</span>
                </h4>
                <button
                  onClick={() => setIsMessageOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g. Invitation to collaborate on KisanCare project"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    placeholder="Write a professional message..."
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsMessageOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {isReportOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-rose-700 flex items-center gap-2">
                  <Flag className="w-4 h-4 text-rose-600" />
                  <span>Report Profile</span>
                </h4>
                <button
                  onClick={() => setIsReportOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleReport} className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Help us maintain honest data integrity. What is the issue with this profile?
                </p>

                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                >
                  <option>Fabricated project or certificate claim</option>
                  <option>Impersonation of another student</option>
                  <option>Spam or inappropriate communication</option>
                  <option>Commercial marketing / non-academic recruitment</option>
                </select>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl cursor-pointer"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
