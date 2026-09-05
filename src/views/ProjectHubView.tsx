import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  MessageSquare,
  FileText,
  Upload,
  Check,
  Award,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Github,
  ExternalLink,
  Target,
  Send,
  X,
  Share2,
  Trash2,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectHubItem, ProjectStage, StudentDirectoryItem } from '../types';
import { StudentPublicProfileModal } from '../components/modals/StudentPublicProfileModal';
import { initialStudentDirectory } from '../data/studentProjectsData';

interface ProjectHubViewProps {
  onOpenStudentProfile?: (student: StudentDirectoryItem) => void;
}

export const ProjectHubView: React.FC<ProjectHubViewProps> = ({ onOpenStudentProfile }) => {
  const {
    studentProjects,
    addStudentProject,
    achievements,
    profile,
    showToast,
    fireConfetti,
    setActiveTab
  } = useApp();

  // Selected active project for workspace
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-agri-ai');
  const [workspaceTab, setWorkspaceTab] = useState<'overview' | 'tasks' | 'team' | 'milestones' | 'discussions' | 'files'>('overview');

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Create Project Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectHubItem['category']>('AI / ML');
  const [newStage, setNewStage] = useState<ProjectStage>('IDEA');
  const [newSkills, setNewSkills] = useState('React, Python, FastAPI');
  const [newRoles, setNewRoles] = useState('Frontend Lead, ML Prototyper');
  const [newDuration, setNewDuration] = useState('3 Months');
  const [newLocationMode, setNewLocationMode] = useState<'Remote' | 'On-Site' | 'Hybrid'>('Hybrid');
  const [newAvailability, setNewAvailability] = useState('10 hrs/week');
  const [newTeamSize, setNewTeamSize] = useState(4);
  const [newVisibility, setNewVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');

  // Task Form State inside Workspace
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(profile.name);
  const [newTaskPriority, setNewTaskPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-09-30');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Discussion state
  const [newComment, setNewComment] = useState('');

  // File upload state (simulated)
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');

  // Invite student modal state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedInviteStudent, setSelectedInviteStudent] = useState<string>(initialStudentDirectory[1]?.id || '');
  const [inviteRole, setInviteRole] = useState('Frontend Collaborator');

  // Public Profile Modal
  const [inspectStudent, setInspectStudent] = useState<StudentDirectoryItem | null>(null);

  // Project data stored in component state (synced with initial data)
  const { hubProjects, setHubProjects } = useApp() as any;

  // Fallback if not yet bound
  const projectsList: ProjectHubItem[] = hubProjects || [];
  const selectedProject = projectsList.find((p) => p.id === selectedProjectId) || projectsList[0];

  // Filtered projects
  const filteredProjects = projectsList.filter((proj) => {
    if (categoryFilter !== 'ALL' && proj.category !== categoryFilter) return false;
    if (stageFilter !== 'ALL' && proj.stage !== stageFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = proj.title.toLowerCase().includes(q);
      const matchTag = proj.tagline.toLowerCase().includes(q);
      const matchSkills = proj.skillsRequired.some((s) => s.toLowerCase().includes(q));
      const matchProb = proj.problem.toLowerCase().includes(q);
      return matchTitle || matchTag || matchSkills || matchProb;
    }
    return true;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProjectItem: ProjectHubItem = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      tagline: newTagline || newTitle,
      problem: newProblem || 'Addressing critical local domain challenge in Rayalaseema.',
      description: newDescription || newProblem,
      category: newCategory,
      stage: newStage,
      skillsRequired: newSkills.split(',').map((s) => s.trim()),
      rolesRequired: newRoles.split(',').map((r) => r.trim()),
      expectedDuration: newDuration,
      locationMode: newLocationMode,
      availabilityNeeded: newAvailability,
      teamSizeMax: newTeamSize,
      visibility: newVisibility,
      creatorName: profile.name,
      creatorRole: 'Founder / Lead Builder',
      creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      teamMembers: [
        {
          id: 'stud-1',
          name: profile.name,
          role: 'Project Lead',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          contributionPercent: 100,
          tasksCompleted: 1,
          isLead: true
        }
      ],
      tasks: [
        {
          id: `task-${Date.now()}-1`,
          title: 'Draft project architecture and data schema',
          assignedToName: profile.name,
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          dueDate: '2026-09-20'
        }
      ],
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Core MVP Architecture & Scope', targetDate: 'September 2026', completed: false },
        { id: `m-${Date.now()}-2`, title: 'Field Pilot & Beta Testing', targetDate: 'October 2026', completed: false }
      ],
      discussions: [
        {
          id: `disc-${Date.now()}`,
          authorName: profile.name,
          authorRole: 'Project Lead',
          message: 'Initiated collaboration workspace on SkillBridge. Looking for team members to join!',
          timestamp: 'Just now'
        }
      ],
      files: [],
      skillsDemonstrated: newSkills.split(',').map((s) => s.trim()),
      isUserMember: true,
      userRole: 'Lead',
      syncedToProfile: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setHubProjects([newProjectItem, ...projectsList]);
    setSelectedProjectId(newProjectItem.id);
    setIsCreateModalOpen(false);
    showToast(`Project "${newTitle}" created! Team workspace is now live.`);
    fireConfetti();
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !newTaskTitle.trim()) return;

    const task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignedToName: newTaskAssignee,
      status: 'TODO' as const,
      priority: newTaskPriority,
      dueDate: newTaskDueDate
    };

    const updated = projectsList.map((p) => {
      if (p.id === selectedProject.id) {
        return {
          ...p,
          tasks: [...p.tasks, task]
        };
      }
      return p;
    });

    setHubProjects(updated);
    setNewTaskTitle('');
    setIsAddTaskOpen(false);
    showToast('Task added to project board!');
  };

  const handleToggleTaskStatus = (taskId: string) => {
    if (!selectedProject) return;

    const updated = projectsList.map((p) => {
      if (p.id === selectedProject.id) {
        const nextTasks = p.tasks.map((t) => {
          if (t.id === taskId) {
            const nextStatus = t.status === 'TODO' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'DONE' : 'TODO';
            return { ...t, status: nextStatus };
          }
          return t;
        });
        return { ...p, tasks: nextTasks };
      }
      return p;
    });

    setHubProjects(updated);
  };

  const handleSendDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !newComment.trim()) return;

    const disc = {
      id: `disc-${Date.now()}`,
      authorName: profile.name,
      authorRole: selectedProject.userRole || 'Team Member',
      message: newComment,
      timestamp: 'Just now'
    };

    const updated = projectsList.map((p) => {
      if (p.id === selectedProject.id) {
        return { ...p, discussions: [...p.discussions, disc] };
      }
      return p;
    });

    setHubProjects(updated);
    setNewComment('');
    showToast('Comment posted in project discussion stream.');
  };

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !uploadFileName.trim()) return;

    const file = {
      id: `f-${Date.now()}`,
      name: uploadFileName,
      size: '1.2 MB',
      uploadedBy: profile.name,
      timestamp: 'Today',
      type: uploadFileName.endsWith('.pdf') ? 'PDF' : uploadFileName.endsWith('.sql') ? 'SQL' : 'DOC'
    };

    const updated = projectsList.map((p) => {
      if (p.id === selectedProject.id) {
        return { ...p, files: [...p.files, file] };
      }
      return p;
    });

    setHubProjects(updated);
    setUploadFileName('');
    setIsUploadOpen(false);
    showToast('File uploaded to project repository.');
  };

  const handleInviteStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const targetStudent = initialStudentDirectory.find((s) => s.id === selectedInviteStudent);
    if (!targetStudent) return;

    const updated = projectsList.map((p) => {
      if (p.id === selectedProject.id) {
        const alreadyIn = p.teamMembers.some((m) => m.name === targetStudent.name);
        if (alreadyIn) return p;

        const newMember = {
          id: targetStudent.id,
          name: targetStudent.name,
          role: inviteRole,
          avatar: targetStudent.avatar,
          contributionPercent: 15,
          tasksCompleted: 0
        };
        return { ...p, teamMembers: [...p.teamMembers, newMember] };
      }
      return p;
    });

    setHubProjects(updated);
    setIsInviteOpen(false);
    showToast(`Invited ${targetStudent.name} as ${inviteRole}!`);
  };

  // PART 7: Sync Completed Project to Portfolio, Resume, Achievements & Evidence
  const handleSyncToProfile = (project: ProjectHubItem) => {
    // 1. Add to student portfolio
    addStudentProject({
      title: project.title,
      tagline: project.tagline,
      category: project.category === 'AI / ML' ? 'AI / ML' : 'Full Stack',
      githubUrl: project.githubRepoUrl || 'https://github.com/skillbridge-builders/project',
      liveUrl: project.liveDemoUrl,
      description: project.description,
      myRole: project.userRole || 'Lead Builder',
      skillsDemonstrated: project.skillsDemonstrated || project.skillsRequired,
      evidenceLevel: 'INDUSTRY_VERIFIED',
      verifiedBy: 'SkillBridge Project Review Board',
      starsCount: 42,
      dateCompleted: new Date().toISOString().split('T')[0]
    });

    // 2. Mark project synced
    const updated = projectsList.map((p) => {
      if (p.id === project.id) {
        return { ...p, syncedToProfile: true, stage: 'COMPLETED' as ProjectStage };
      }
      return p;
    });
    setHubProjects(updated);

    showToast(`🎉 "${project.title}" synced to your Portfolio, Resume & ⭐ Achievements!`);
    fireConfetti();
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              Collaborative Project Hub
            </span>
            <span className="text-xs text-slate-400">
              • Team Building & Proof-of-Capability
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Build Real Projects with Student Teams
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Move beyond tutorial code. Form interdisciplinary teams with fellow students across Anantapur, coordinate tasks, record milestones, and automatically export completed builds into recruiter-ready portfolio evidence.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>

            <button
              onClick={() => setActiveTab('discover')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Find Collaborators</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Project List & Project Workspace */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Project Directory (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-600" />
              <span>Active Projects</span>
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {filteredProjects.length} Projects
            </span>
          </div>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, skill..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {['ALL', 'Agritech', 'Healthtech', 'Full Stack', 'AI / ML'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards List */}
          <div className="space-y-3">
            {filteredProjects.map((proj) => {
              const isSelected = selectedProject?.id === proj.id;
              const completedTasks = proj.tasks.filter((t) => t.status === 'DONE').length;
              const taskProgress = proj.tasks.length > 0 ? Math.round((completedTasks / proj.tasks.length) * 100) : 0;

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-600 shadow-xs ring-1 ring-indigo-600'
                      : 'bg-white border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {proj.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        proj.stage === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : proj.stage === 'DEVELOPMENT'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {proj.stage}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {proj.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{proj.teamMembers.length}/{proj.teamSizeMax} Members</span>
                    </div>
                    <span className="font-semibold text-slate-700">{taskProgress}% Done</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Workspace (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          
          {selectedProject ? (
            <div>
              {/* Workspace Header */}
              <div className="p-6 sm:p-7 border-b border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                        {selectedProject.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        Stage: {selectedProject.stage}
                      </span>
                      {selectedProject.syncedToProfile && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Synced to Portfolio
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {selectedProject.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {selectedProject.stage !== 'COMPLETED' ? (
                      <button
                        onClick={() => handleSyncToProfile(selectedProject)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        title="Exports this project into your Portfolio, Resume, and Achievement stars"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Sync Completed to Profile</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Achievement
                      </span>
                    )}

                    <button
                      onClick={() => setIsInviteOpen(true)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Invite Member</span>
                    </button>
                  </div>
                </div>

                {/* Stage Progression Bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                    <span>LIFECYCLE PROGRESSION</span>
                    <span className="text-indigo-600 font-extrabold">{selectedProject.stage}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {['IDEA', 'TEAM_BUILDING', 'DEVELOPMENT', 'PROTOTYPE', 'TESTING', 'PILOT', 'COMPLETED'].map((st, sIdx) => {
                      const stages = ['IDEA', 'TEAM_BUILDING', 'DEVELOPMENT', 'PROTOTYPE', 'TESTING', 'PILOT', 'COMPLETED'];
                      const currentIdx = stages.indexOf(selectedProject.stage);
                      const isPast = sIdx <= currentIdx;
                      return (
                        <div
                          key={st}
                          className={`h-2 rounded-full transition-all ${
                            isPast ? 'bg-indigo-600' : 'bg-slate-100'
                          }`}
                          title={`Stage: ${st}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Workspace Tabs */}
                <div className="flex border-b border-slate-200 gap-4 overflow-x-auto text-xs font-bold pt-2">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'tasks', label: `Tasks (${selectedProject.tasks.length})` },
                    { id: 'team', label: `Team (${selectedProject.teamMembers.length})` },
                    { id: 'milestones', label: `Milestones (${selectedProject.milestones.length})` },
                    { id: 'discussions', label: `Discussions (${selectedProject.discussions.length})` },
                    { id: 'files', label: `Files (${selectedProject.files.length})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setWorkspaceTab(tab.id as any)}
                      className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                        workspaceTab === tab.id
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Workspace Content */}
              <div className="p-6 sm:p-7 space-y-6">
                
                {/* SUBTAB 1: OVERVIEW */}
                {workspaceTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Problem Statement
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                        {selectedProject.problem}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Solution & Implementation Scope
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                        <span className="text-xs font-bold text-slate-500">Skills Required</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.skillsRequired.map((sk, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                        <span className="text-xs font-bold text-slate-500">Open Team Roles</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.rolesRequired.map((role, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Duration: <strong>{selectedProject.expectedDuration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>Mode: <strong>{selectedProject.locationMode}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Commitment: <strong>{selectedProject.availabilityNeeded}</strong></span>
                      </div>
                    </div>

                    {selectedProject.githubRepoUrl && (
                      <div className="pt-2 flex items-center gap-4 text-xs">
                        <a
                          href={selectedProject.githubRepoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Public GitHub Repository</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 2: TASKS */}
                {workspaceTab === 'tasks' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Sprint Board & Task Backlog
                      </h3>
                      <button
                        onClick={() => setIsAddTaskOpen(true)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Task</span>
                      </button>
                    </div>

                    <div className="grid gap-3">
                      {selectedProject.tasks.map((t) => (
                        <div
                          key={t.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all flex items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => handleToggleTaskStatus(t.id)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 mt-0.5 ${
                                t.status === 'DONE'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : t.status === 'IN_PROGRESS'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                              }`}
                              title="Click to toggle status (TODO -> IN_PROGRESS -> DONE)"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <div>
                              <p className={`text-xs font-bold ${t.status === 'DONE' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {t.title}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                                <span>Assigned: <strong>{t.assignedToName}</strong></span>
                                <span>•</span>
                                <span>Due: {t.dueDate}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                t.priority === 'HIGH'
                                  ? 'bg-rose-100 text-rose-800'
                                  : t.priority === 'MEDIUM'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {t.priority}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                                t.status === 'DONE'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : t.status === 'IN_PROGRESS'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {t.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Task Modal */}
                    {isAddTaskOpen && (
                      <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">Add Task to Project</h4>
                            <button onClick={() => setIsAddTaskOpen(false)} className="p-1 rounded-lg text-slate-400 cursor-pointer">
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <form onSubmit={handleAddTask} className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Task Title</label>
                              <input
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                required
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                                placeholder="E.g. Connect Redis cache to live session API"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Assignee</label>
                                <select
                                  value={newTaskAssignee}
                                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                                >
                                  {selectedProject.teamMembers.map((m) => (
                                    <option key={m.id} value={m.name}>{m.name}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                                <select
                                  value={newTaskPriority}
                                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                                >
                                  <option value="LOW">Low</option>
                                  <option value="MEDIUM">Medium</option>
                                  <option value="HIGH">High</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                              <input
                                type="date"
                                value={newTaskDueDate}
                                onChange={(e) => setNewTaskDueDate(e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                              />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => setIsAddTaskOpen(false)}
                                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-xl cursor-pointer"
                              >
                                Create Task
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 3: TEAM */}
                {workspaceTab === 'team' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Interdisciplinary Team Roster
                      </h3>
                      <button
                        onClick={() => setIsInviteOpen(true)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Invite Student</span>
                      </button>
                    </div>

                    <div className="grid gap-3">
                      {selectedProject.teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={member.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                              alt={member.name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-slate-900">{member.name}</h4>
                                {member.isLead && (
                                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                                    Project Lead
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">{member.role}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <div className="text-right">
                              <span className="font-bold text-slate-900">{member.contributionPercent}%</span>
                              <p className="text-[10px] text-slate-400">Contribution</p>
                            </div>

                            <button
                              onClick={() => {
                                const st = initialStudentDirectory.find((s) => s.name === member.name);
                                if (st) setInspectStudent(st);
                              }}
                              className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB 4: MILESTONES */}
                {workspaceTab === 'milestones' && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Project Milestones & Deliverables
                    </h3>

                    <div className="space-y-3">
                      {selectedProject.milestones.map((m) => (
                        <div
                          key={m.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`p-1.5 rounded-full ${m.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                              <CheckCircle2 className="w-4 h-4" />
                            </span>
                            <div>
                              <p className={`text-xs font-bold ${m.completed ? 'text-slate-900' : 'text-slate-700'}`}>
                                {m.title}
                              </p>
                              <span className="text-[11px] text-slate-400">Target: {m.targetDate}</span>
                            </div>
                          </div>

                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${m.completed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'}`}>
                            {m.completed ? 'COMPLETED' : 'PENDING'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB 5: DISCUSSIONS */}
                {workspaceTab === 'discussions' && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Team Discussion Stream
                    </h3>

                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {selectedProject.discussions.map((disc) => (
                        <div key={disc.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{disc.authorName}</span>
                              <span className="text-slate-500">• {disc.authorRole}</span>
                            </div>
                            <span className="text-slate-400">{disc.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed pt-0.5">
                            {disc.message}
                          </p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendDiscussion} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a message to your team..."
                        className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </form>
                  </div>
                )}

                {/* SUBTAB 6: FILES */}
                {workspaceTab === 'files' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Project Artifacts & Architecture Docs
                      </h3>
                      <button
                        onClick={() => setIsUploadOpen(true)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </button>
                    </div>

                    <div className="grid gap-3">
                      {selectedProject.files.map((file) => (
                        <div
                          key={file.id}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{file.name}</p>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                <span>{file.size}</span>
                                <span>•</span>
                                <span>Uploaded by {file.uploadedBy}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => showToast(`Downloading ${file.name}...`)}
                            className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>

                    {isUploadOpen && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <h4 className="text-xs font-bold text-slate-800">Attach Document / Architecture File</h4>
                        <input
                          type="text"
                          value={uploadFileName}
                          onChange={(e) => setUploadFileName(e.target.value)}
                          placeholder="File name (e.g. system_architecture_v2.pdf)"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsUploadOpen(false)}
                            className="px-3 py-1 text-xs text-slate-600 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleUploadFile}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              Select a project from the left to view workspace.
            </div>
          )}

        </div>
      </div>

      {/* CREATE PROJECT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Create Collaborative Project</h3>
                <p className="text-xs text-slate-500">Initiate a team build and recruit fellow student specialists.</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="E.g. Rayalaseema Groundnut Pest AI Diagnostics"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">One-line Tagline</label>
                  <input
                    type="text"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    placeholder="E.g. Offline-first PWA for regional farmers in Telugu"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="AI / ML">AI / ML</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Agritech">Agritech</option>
                    <option value="Healthtech">Healthtech</option>
                    <option value="IoT / Hardware">IoT / Hardware</option>
                    <option value="Edtech">Edtech</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="IDEA">Idea Stage</option>
                    <option value="TEAM_BUILDING">Team Building</option>
                    <option value="DEVELOPMENT">Development</option>
                    <option value="PROTOTYPE">Prototype Built</option>
                    <option value="TESTING">Testing</option>
                    <option value="PILOT">Pilot</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Problem Statement</label>
                  <textarea
                    rows={2}
                    value={newProblem}
                    onChange={(e) => setNewProblem(e.target.value)}
                    placeholder="What specific issue or market pain point does this solve?"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    placeholder="E.g. React, Python, FastAPI, UI/UX"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Roles Needed</label>
                  <input
                    type="text"
                    value={newRoles}
                    onChange={(e) => setNewRoles(e.target.value)}
                    placeholder="E.g. Frontend Developer, ML Researcher, Domain Expert"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={newLocationMode}
                    onChange={(e) => setNewLocationMode(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="Hybrid">Hybrid (Anantapur meetups)</option>
                    <option value="Remote">100% Remote</option>
                    <option value="On-Site">On-Site Campus Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Team Size Cap</label>
                  <input
                    type="number"
                    min={2}
                    max={8}
                    value={newTeamSize}
                    onChange={(e) => setNewTeamSize(parseInt(e.target.value) || 4)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Launch Project Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVITE MEMBER MODAL */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Invite Student to Project</h4>
              <button onClick={() => setIsInviteOpen(false)} className="p-1 rounded-lg text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteStudent} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={selectedInviteStudent}
                  onChange={(e) => setSelectedInviteStudent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                >
                  {initialStudentDirectory.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} — {st.targetCareer} ({st.college.split(',')[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Role</label>
                <input
                  type="text"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  required
                  placeholder="E.g. Frontend Developer, ML Researcher"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-xl cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLIC PROFILE MODAL */}
      {inspectStudent && (
        <StudentPublicProfileModal
          student={inspectStudent}
          onClose={() => setInspectStudent(null)}
          onInviteToProject={(st) => {
            setInspectStudent(null);
            setSelectedInviteStudent(st.id);
            setIsInviteOpen(true);
          }}
        />
      )}

    </div>
  );
};
