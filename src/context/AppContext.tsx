import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  StudentProfile,
  SkillItem,
  CareerNode,
  LearningResource,
  AssessmentItem,
  OfflineAssessmentBooking,
  OpportunityItem,
  TrainForJobRoute,
  ScholarshipItem,
  InstitutionItem,
  StartupIdea,
  StartupTeamMember,
  StartupOpenRole,
  StartupApplicant,
  StartupFundingScheme,
  CandidateTalentProfile,
  MentorItem,
  AchievementItem,
  MailMessage,
  AppNotification,
  TechnologyTrend,
  SkillBridgeContact,
  LocalPartTimeJob,
  PodcastEpisode,
  OfflineMeetup,
  LiveInteractionSession,
  FeeReportItem,
  StudentProjectItem,
  FastRecruitmentRequirement,
  FastMatchCandidateComparison,
  ProjectHubItem,
  ChatConversation,
  ChatMessage,
  ChatMessageAttachment,
  ConversationType,
  IndustryHiringOpportunity,
  FacultyOpportunityItem,
  StudentDirectoryItem
} from '../types';
import { initialProjectHub, initialStudentDirectory } from '../data/studentProjectsData';
import {
  initialChatConversations,
  initialIndustryHiringOpportunities,
  initialFacultyOpportunities
} from '../data/industryAcademiaData';
import {
  initialStudentProfile,
  initialSkills,
  initialCareerNodes,
  initialLearningResources,
  initialAssessments,
  initialOpportunities,
  initialTrainForJobRoute,
  initialScholarships,
  initialInstitutions,
  initialStartupIdeas,
  initialFundingSchemes,
  initialCandidateTalents,
  initialMentors,
  initialAchievements,
  initialMailMessages,
  initialNotifications,
  initialTechnologyTrends
} from '../data/mockData';
import {
  initialAnantapurInstitutions,
  initialFeeReports
} from '../data/institutionsData';
import { initialStudentProjects } from '../data/portfolioData';
import {
  initialFastRecruitmentRequirements,
  initialCandidateComparisons
} from '../data/fastRecruitmentData';
import {
  initialSkillBridgeContacts,
  initialLocalPartTimeJobs,
  initialPodcastEpisodes,
  initialOfflineMeetups,
  initialLiveSessions,
  initialVerifiedFreeLearning,
  initialExtendedMailMessages
} from '../data/ecosystemData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  skills: SkillItem[];
  careerNodes: CareerNode[];
  learningResources: LearningResource[];
  assessments: AssessmentItem[];
  offlineBookings: OfflineAssessmentBooking[];
  opportunities: OpportunityItem[];
  trainForJobRoute: TrainForJobRoute;
  scholarships: ScholarshipItem[];
  institutions: InstitutionItem[];
  startupIdeas: StartupIdea[];
  fundingSchemes: StartupFundingScheme[];
  candidateTalents: CandidateTalentProfile[];
  mentors: MentorItem[];
  achievements: AchievementItem[];
  mailMessages: MailMessage[];
  notifications: AppNotification[];
  techTrends: TechnologyTrend[];
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAskAIOpen: boolean;
  setIsAskAIOpen: (open: boolean) => void;
  activeOfflineModalSkill: string | null;
  setActiveOfflineModalSkill: (skill: string | null) => void;
  activeAssessmentModalItem: AssessmentItem | null;
  setActiveAssessmentModalItem: (item: AssessmentItem | null) => void;
  selectedOpportunityModal: OpportunityItem | null;
  setSelectedOpportunityModal: (opp: OpportunityItem | null) => void;
  isTrainJobModalOpen: boolean;
  setIsTrainJobModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Actions
  setTargetCareer: (career: string) => void;
  updatePrivacySetting: (key: keyof StudentProfile['privacySettings'], val: any) => void;
  startLearning: (id: string) => void;
  completeLearning: (id: string) => void;
  passAssessment: (assessmentId: string, score: number) => void;
  bookOfflineAssessment: (booking: Omit<OfflineAssessmentBooking, 'id' | 'status'>) => void;
  verifyOfflineAssessmentSuccess: (skillName: string) => void;
  applyToOpportunity: (id: string) => void;
  toggleSaveOpportunity: (id: string) => void;
  advanceTrainJobStep: (stepId: string) => void;
  applyToScholarship: (id: string) => void;
  toggleLikeStartup: (id: string) => void;
  toggleSupportStartup: (id: string) => void;
  joinStartupTeam: (id: string, role?: string, intro?: string) => boolean;
  applyToStartupRole: (startupId: string, roleTitle: string, intro: string) => void;
  handleStartupApplicantAction: (startupId: string, applicantId: string, action: 'ACCEPT' | 'REJECT') => void;
  applyStartupFundingScheme: (schemeId: string) => void;
  inviteTalentToTeam: (startupId: string, talentId: string, roleTitle: string) => void;
  verifyStartupMilestone: (startupId: string, milestoneName: string, notes?: string) => void;
  createStartupIdea: (idea: Partial<StartupIdea>) => void;
  requestMentorship: (mentorId: string) => void;
  addTrendToCareerMap: (trendId: string) => void;
  addTechTrendToCareerMap: (trendId: string) => void;
  markMailAsRead: (id: string) => void;
  deleteMail: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  revalidateSkill: (skillId: string) => void;

  // Ecosystem Extensions
  contacts: SkillBridgeContact[];
  localJobs: LocalPartTimeJob[];
  podcasts: PodcastEpisode[];
  offlineMeetups: OfflineMeetup[];
  liveSessions: LiveInteractionSession[];
  
  // Mailbox Operations
  sendMail: (mail: {
    recipient: string;
    recipientRole?: string;
    recipientHandle?: string;
    subject: string;
    body: string;
    category?: MailMessage['category'];
    priority?: 'NORMAL' | 'HIGH' | 'URGENT';
    attachments?: { name: string; size: string; type: string }[];
  }) => void;
  replyMail: (mailId: string, replyBody: string, replyAll?: boolean) => void;
  forwardMail: (mailId: string, toRecipient: string, forwardNote?: string) => void;
  toggleStarMail: (id: string) => void;
  toggleImportantMail: (id: string) => void;
  markMailUnread: (id: string) => void;
  archiveMail: (id: string) => void;
  trashMail: (id: string) => void;
  restoreMail: (id: string) => void;
  emptyTrash: () => void;

  // Contacts
  requestContact: (contactId: string, message?: string) => void;
  updateContactStatus: (contactId: string, status: 'ACCEPTED' | 'DECLINED' | 'BLOCKED') => void;

  // Local Jobs
  applyLocalJob: (jobId: string, pitch?: string) => void;
  toggleSaveLocalJob: (jobId: string) => void;
  withdrawLocalJob: (jobId: string) => void;

  // Podcasts & Meetups
  registerMeetup: (meetupId: string) => void;
  registerLiveSession: (sessionId: string) => void;
  submitLiveQuestion: (sessionId: string, question: string) => void;

  // Fee Reporting & Institutions
  feeReports: FeeReportItem[];
  submitFeeReport: (report: Omit<FeeReportItem, 'id' | 'status' | 'createdAt'>) => void;

  // Portfolio Projects
  studentProjects: StudentProjectItem[];
  addStudentProject: (project: Omit<StudentProjectItem, 'id'>) => void;

  // Fast Recruitment
  fastRequirements: FastRecruitmentRequirement[];
  addFastRequirement: (req: Omit<FastRecruitmentRequirement, 'id'>) => void;
  candidateComparisons: Record<string, FastMatchCandidateComparison[]>;
  toggleCandidateShortlist: (reqId: string, candidateId: string) => void;
  hireCandidate: (reqId: string, candidateId: string) => void;

  // Collaborative Project Hub
  hubProjects: ProjectHubItem[];
  setHubProjects: React.Dispatch<React.SetStateAction<ProjectHubItem[]>>;

  // Messages & Real-Time Direct Chat
  chatConversations: ChatConversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendChatMessage: (conversationId: string, text: string, attachment?: ChatMessageAttachment) => void;
  openChatWithUser: (user: { id: string; name: string; role: string; org?: string; avatar?: string; type?: ConversationType }) => void;
  inviteToProjectInChat: (conversationId: string, projectTitle: string, note?: string) => void;
  shareOpportunityInChat: (conversationId: string, opportunityTitle: string, subtitle?: string) => void;
  markConversationAsRead: (conversationId: string) => void;
  unreadChatCount: number;

  // Industry Hiring
  industryHiringOpportunities: IndustryHiringOpportunity[];
  applyToIndustryOpportunity: (oppId: string) => void;
  toggleSaveIndustryOpportunity: (oppId: string) => void;

  // Faculty & Academia Collaboration
  facultyOpportunities: FacultyOpportunityItem[];
  applyToFacultyOpportunity: (oppId: string) => void;

  // Student Directory & Connection States
  studentDirectory: StudentDirectoryItem[];
  toggleStudentConnection: (studentId: string) => void;
  inviteStudentToProject: (studentId: string, projectId: string, note: string) => void;
  inviteStudentToStartup: (studentId: string, startupId: string, roleTitle: string, note: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [profile, setProfile] = useState<StudentProfile>(initialStudentProfile);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [careerNodes, setCareerNodes] = useState<CareerNode[]>(initialCareerNodes);
  const [learningResources, setLearningResources] = useState<LearningResource[]>([
    ...initialLearningResources,
    ...initialVerifiedFreeLearning
  ]);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(initialAssessments);
  const [offlineBookings, setOfflineBookings] = useState<OfflineAssessmentBooking[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(initialOpportunities);
  const [trainForJobRoute, setTrainForJobRoute] = useState<TrainForJobRoute>(initialTrainForJobRoute);
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>(initialScholarships);
  const [institutions] = useState<InstitutionItem[]>(initialAnantapurInstitutions);
  const [feeReports, setFeeReports] = useState<FeeReportItem[]>(initialFeeReports);
  const [studentProjects, setStudentProjects] = useState<StudentProjectItem[]>(initialStudentProjects);
  const [fastRequirements, setFastRequirements] = useState<FastRecruitmentRequirement[]>(initialFastRecruitmentRequirements);
  const [candidateComparisons, setCandidateComparisons] = useState<Record<string, FastMatchCandidateComparison[]>>(initialCandidateComparisons);
  const [startupIdeas, setStartupIdeas] = useState<StartupIdea[]>(initialStartupIdeas);
  const [fundingSchemes, setFundingSchemes] = useState<StartupFundingScheme[]>(initialFundingSchemes);
  const [candidateTalents, setCandidateTalents] = useState<CandidateTalentProfile[]>(initialCandidateTalents);
  const [mentors, setMentors] = useState<MentorItem[]>(initialMentors);
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements);
  const [mailMessages, setMailMessages] = useState<MailMessage[]>(initialExtendedMailMessages);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [techTrends, setTechTrends] = useState<TechnologyTrend[]>(initialTechnologyTrends);

  // New Ecosystem States
  const [contacts, setContacts] = useState<SkillBridgeContact[]>(initialSkillBridgeContacts);
  const [localJobs, setLocalJobs] = useState<LocalPartTimeJob[]>(initialLocalPartTimeJobs);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(initialPodcastEpisodes);
  const [offlineMeetups, setOfflineMeetups] = useState<OfflineMeetup[]>(initialOfflineMeetups);
  const [liveSessions, setLiveSessions] = useState<LiveInteractionSession[]>(initialLiveSessions);
  const [hubProjects, setHubProjects] = useState<ProjectHubItem[]>(initialProjectHub);

  // Messages, Industry Hiring, Faculty, and Directory States
  const [chatConversations, setChatConversations] = useState<ChatConversation[]>(initialChatConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialChatConversations[0]?.id || null);
  const [industryHiringOpportunities, setIndustryHiringOpportunities] = useState<IndustryHiringOpportunity[]>(initialIndustryHiringOpportunities);
  const [facultyOpportunities, setFacultyOpportunities] = useState<FacultyOpportunityItem[]>(initialFacultyOpportunities);
  const [studentDirectory, setStudentDirectory] = useState<StudentDirectoryItem[]>(initialStudentDirectory);

  const unreadChatCount = chatConversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  // Modals & Triggers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [activeOfflineModalSkill, setActiveOfflineModalSkill] = useState<string | null>(null);
  const [activeAssessmentModalItem, setActiveAssessmentModalItem] = useState<AssessmentItem | null>(null);
  const [selectedOpportunityModal, setSelectedOpportunityModal] = useState<OpportunityItem | null>(null);
  const [isTrainJobModalOpen, setIsTrainJobModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const updatePrivacySetting = (key: keyof StudentProfile['privacySettings'], val: any) => {
    setProfile((prev) => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [key]: val
      }
    }));
    showToast(`Privacy setting updated: ${String(key)}`);
  };

  const startLearning = (id: string) => {
    showToast('Learning module active. Practice sandbox and AI Doubt Assistant loaded.');
  };

  const completeLearning = (id: string) => {
    setLearningResources((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: true } : item))
    );
    const item = learningResources.find((r) => r.id === id);
    if (item) {
      showToast(`Completed: ${item.title}! Ready for Practical Assessment.`);
      
      // Send message to mailbox
      const newMail: MailMessage = {
        id: `mail-learn-${Date.now()}`,
        sender: 'SkillBridge Learning System',
        senderRole: 'Courseware Verification',
        subject: `Completed: ${item.title}`,
        preview: `You have completed all curriculum units for ${item.skill}. Take the practical assessment to verify capability.`,
        body: `Hello Karthik,\n\nYou have successfully completed "${item.title}" provided by ${item.provider}.\n\nNext Step in Core SkillBridge Loop:\nTake the practical assessment to convert course completion into verified evidence.`,
        timestamp: 'Just now',
        category: 'LEARNING',
        isRead: false,
        priority: 'NORMAL',
        actionLabel: 'Take Assessment',
        actionView: 'assessments'
      };
      setMailMessages((prev) => [newMail, ...prev]);
    }
  };

  const passAssessment = (assessmentId: string, score: number) => {
    setAssessments((prev) =>
      prev.map((a) =>
        a.id === assessmentId
          ? { ...a, passed: true, score, dateAttempted: new Date().toISOString().split('T')[0] }
          : a
      )
    );

    const assessment = assessments.find((a) => a.id === assessmentId);
    const skillName = assessment?.skill || 'React';

    // Update Skill Item
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name.toLowerCase() === skillName.toLowerCase()) {
          return {
            ...s,
            gapPercentage: Math.max(0, s.gapPercentage - 20),
            gapSeverity: s.gapPercentage - 20 <= 15 ? 'Low' : 'Medium',
            evidenceLevel: 'PRACTICAL_VERIFIED',
            evidenceConfidence: 'MEDIUM',
            status: 'PRACTICALLY_VERIFIED',
            vivaScore: score,
            lastVerifiedDate: new Date().toISOString().split('T')[0],
            practicalProjectsCompleted: s.practicalProjectsCompleted + 1
          };
        }
        return s;
      })
    );

    // Update Career Nodes
    setCareerNodes((prev) =>
      prev.map((n) => {
        if (n.skills.includes(skillName)) {
          return {
            ...n,
            progress: Math.min(100, n.progress + 25),
            evidenceState: 'PRACTICAL_VERIFIED'
          };
        }
        return n;
      })
    );

    // Increase overall career readiness
    setProfile((prev) => ({
      ...prev,
      careerReadiness: Math.min(100, prev.careerReadiness + 5),
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        assessment: Math.min(100, prev.readinessBreakdown.assessment + 8),
        practical: Math.min(100, prev.readinessBreakdown.practical + 10)
      }
    }));

    // Add Achievement
    const newAch: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: `${skillName} Practical Coding & Viva Defense`,
      category: 'ASSESSMENT',
      date: 'Today',
      skillAssociated: skillName,
      evidenceConfidence: 'MEDIUM',
      evidenceBadges: [`Score: ${score}%`, 'Sandbox Passed', 'Viva Defended'],
      description: `Passed proctored online sandbox assessment with code architecture defense.`,
      issuer: 'SkillBridge Assessment Engine',
      verified: true
    };
    setAchievements((prev) => [newAch, ...prev]);

    // Send Mailbox update
    const mail: MailMessage = {
      id: `mail-assess-${Date.now()}`,
      sender: 'SkillBridge Assessment Engine',
      senderRole: 'Examination Evaluator',
      subject: `Assessment Passed: ${skillName} (${score}%)`,
      preview: `You scored ${score}% in ${skillName}. You are now eligible to book Verified Offline Assessment.`,
      body: `Congratulations Karthik!\n\nYou have cleared the online practical coding & viva defense for ${skillName} with a score of ${score}%.\n\nOffline Verification is now unlocked for you. Passing an offline invigilated test will elevate your credential to HIGH confidence industry level.`,
      timestamp: 'Just now',
      category: 'ASSESSMENT',
      isRead: false,
      priority: 'HIGH',
      actionLabel: 'Book Offline Test',
      actionView: 'assessments'
    };
    setMailMessages((prev) => [mail, ...prev]);

    fireConfetti();
    showToast(`Passed ${skillName} assessment with ${score}%! Offline Verification unlocked.`);
  };

  const bookOfflineAssessment = (bookingData: Omit<OfflineAssessmentBooking, 'id' | 'status'>) => {
    const bookingId = `booking-${Date.now()}`;
    const newBooking: OfflineAssessmentBooking = {
      ...bookingData,
      id: bookingId,
      status: 'CONFIRMED'
    };

    setOfflineBookings((prev) => [newBooking, ...prev]);

    // Add confirmation mail
    const mail: MailMessage = {
      id: `mail-book-${Date.now()}`,
      sender: 'SkillBridge Offline Testing Directorate',
      senderRole: 'Proctored Centre Coordinator',
      subject: `Booking Confirmed: Offline Assessment for ${bookingData.skillName}`,
      preview: `Your proctored offline slot at ${bookingData.venue} is confirmed for ${bookingData.date} at ${bookingData.time}.`,
      body: `Hello ${bookingData.candidateName},\n\nYour verified offline physical assessment has been successfully booked.\n\nDetails:\n- Skill: ${bookingData.skillName}\n- Date: ${bookingData.date}\n- Time: ${bookingData.time}\n- Venue: ${bookingData.venue}, ${bookingData.city}\n- Duration: ${bookingData.duration}\n- Fee Paid: ${bookingData.fee}\n\nInstructions & What to Bring:\n- Bring valid College Photo ID or Government ID\n- Arrive 15 minutes before slot time\n- Centre provides proctored offline hardware environment\n\nPassing this in-person examination will elevate your evidence trust to OFFLINE VERIFIED (High Confidence).`,
      timestamp: 'Just now',
      category: 'ASSESSMENT',
      isRead: false,
      priority: 'HIGH',
      actionLabel: 'View Booking',
      actionView: 'assessments'
    };
    setMailMessages((prev) => [mail, ...prev]);

    // Update notification
    const notif: AppNotification = {
      id: `notif-book-${Date.now()}`,
      title: 'Offline Assessment Booked',
      message: `${bookingData.skillName} booked on ${bookingData.date} at ${bookingData.venue}`,
      timestamp: 'Just now',
      category: 'ASSESSMENT',
      isRead: false,
      targetView: 'assessments'
    };
    setNotifications((prev) => [notif, ...prev]);

    fireConfetti();
    showToast(`Offline Assessment Booked! Confirmation sent to your Mailbox.`);
  };

  const verifyOfflineAssessmentSuccess = (skillName: string) => {
    // Elevate skill to OFFLINE_VERIFIED with HIGH confidence
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name.toLowerCase() === skillName.toLowerCase()) {
          return {
            ...s,
            gapPercentage: 0,
            gapSeverity: 'None',
            evidenceLevel: 'OFFLINE_VERIFIED',
            evidenceConfidence: 'HIGH',
            status: 'OFFLINE_VERIFIED',
            lastVerifiedDate: new Date().toISOString().split('T')[0],
            offlineCenterName: 'SkillBridge Assessment Centre Anantapur',
            freshness: 'CURRENT'
          };
        }
        return s;
      })
    );

    // Update Career Node
    setCareerNodes((prev) =>
      prev.map((n) => {
        if (n.type === 'OFFLINE_VERIFIED' || n.skills.includes(skillName)) {
          return {
            ...n,
            progress: 100,
            status: 'COMPLETED',
            evidenceState: 'OFFLINE_VERIFIED'
          };
        }
        return n;
      })
    );

    // Update Offline Bookings
    setOfflineBookings((prev) =>
      prev.map((b) => (b.skillName.toLowerCase() === skillName.toLowerCase() ? { ...b, status: 'PASSED' } : b))
    );

    // Recalculate Readiness
    setProfile((prev) => ({
      ...prev,
      careerReadiness: Math.min(100, prev.careerReadiness + 12),
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        skills: 90,
        assessment: 95,
        practical: 88,
        industryAlignment: 90
      }
    }));

    // Add Top-tier Achievement
    const newAch: AchievementItem = {
      id: `ach-off-${Date.now()}`,
      title: `${skillName} Proctored Offline Verification`,
      category: 'SKILL_VERIFICATION',
      date: 'Today',
      skillAssociated: skillName,
      evidenceConfidence: 'HIGH',
      evidenceBadges: ['Invigilated In-Person Exam', 'Score: 94%', 'SkillBridge Centre Anantapur'],
      description: `Completed physical closed-network testing with oral architectural defense before certified examiners.`,
      issuer: 'SkillBridge Assessment Directorate',
      verified: true
    };
    setAchievements((prev) => [newAch, ...prev]);

    // Update Opportunities eligibility dynamically!
    setOpportunities((prev) =>
      prev.map((opp) => {
        const updatedSkills = opp.requiredSkills.map((req) =>
          req.skill.toLowerCase() === skillName.toLowerCase() ? { ...req, met: true } : req
        );
        const unmet = updatedSkills.filter((r) => !r.met).map((r) => r.skill);
        const isEligible = unmet.length === 0;
        return {
          ...opp,
          requiredSkills: updatedSkills,
          missingSkills: unmet,
          eligibilityStatus: isEligible
            ? 'ELIGIBLE'
            : unmet.length === 1
            ? 'PARTIALLY_ELIGIBLE'
            : 'NOT_YET_ELIGIBLE',
          matchScore: isEligible ? Math.max(opp.matchScore, 95) : opp.matchScore + 8
        };
      })
    );

    // Mailbox notification
    const mail: MailMessage = {
      id: `mail-pass-off-${Date.now()}`,
      sender: 'SkillBridge Assessment Board',
      senderRole: 'Chief Examination Controller',
      subject: `OFFLINE EXAM PASSED: ${skillName} Proctored Score: 94%`,
      preview: `Exceptional performance! Your ${skillName} evidence is now verified with HIGH confidence.`,
      body: `Dear Karthik Peetla,\n\nWe are proud to certify that you have passed the Proctored In-Person Physical Assessment for ${skillName} conducted at SkillBridge Assessment Centre, Anantapur.\n\nYour Skill Passport now displays OFFLINE VERIFIED status with HIGH confidence. Companies searching for verified ${skillName} candidates will see your authenticated credentials at the top of their talent feed.`,
      timestamp: 'Just now',
      category: 'ASSESSMENT',
      isRead: false,
      priority: 'URGENT',
      actionLabel: 'View Skill Passport',
      actionView: 'skills'
    };
    setMailMessages((prev) => [mail, ...prev]);

    fireConfetti();
    showToast(`Offline Assessment Passed! ${skillName} is now OFFLINE VERIFIED (High Confidence).`);
  };

  const applyToOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, applied: true } : o))
    );
    const opp = opportunities.find((o) => o.id === id);
    if (opp) {
      showToast(`Applied to ${opp.title} at ${opp.companyName}! Application tracked in Mailbox.`);
      
      const mail: MailMessage = {
        id: `mail-app-${Date.now()}`,
        sender: opp.companyName,
        senderRole: 'Recruitment & University Relations',
        subject: `Application Received: ${opp.title}`,
        preview: `Your verified application and Skill Passport have been delivered to the hiring manager.`,
        body: `Dear Karthik,\n\nThank you for applying for the position of "${opp.title}" at ${opp.companyName}.\n\nYour SkillBridge profile and authenticated credentials (including your proctored offline assessments) have been transmitted directly to our technical review team.\n\nWe will update you within 3 business days regarding next interview scheduling.`,
        timestamp: 'Just now',
        category: 'APPLICATIONS',
        isRead: false,
        priority: 'HIGH'
      };
      setMailMessages((prev) => [mail, ...prev]);
    }
  };

  const toggleSaveOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, saved: !o.saved } : o))
    );
    showToast('Saved opportunities updated.');
  };

  const advanceTrainJobStep = (stepId: string) => {
    setTrainForJobRoute((prev) => {
      const updatedSteps = prev.steps.map((s) => (s.id === stepId ? { ...s, completed: true } : s));
      const completedCount = updatedSteps.filter((s) => s.completed).length;
      const progress = Math.round((completedCount / updatedSteps.length) * 100);
      const isReady = completedCount === updatedSteps.length;

      if (isReady && !prev.isInterviewReady) {
        fireConfetti();
        // Send Interview Eligibility letter
        const mail: MailMessage = {
          id: `mail-interview-${Date.now()}`,
          sender: 'CloudScale Systems (DEMO COMPANY)',
          senderRole: 'VP of Engineering',
          subject: 'GUARANTEED INTERVIEW UNLOCKED: Junior Full Stack Developer',
          preview: 'Congratulations! You have completed all 7 steps of the "Train For This Job" verified pathway.',
          body: `Dear Karthik Peetla,\n\nYou have successfully completed every required milestone for CloudScale Systems "Train For This Job" curriculum.\n\nYou have demonstrated Node.js fundamentals, Git workflows, capstone deployment, practical coding defense, and offline proctored verification.\n\nAs promised, you are now officially scheduled for our Priority Engineering Interview Slot.\n\nDate: 28 September 2026 at 11:00 AM\nFormat: Direct technical interview with Engineering Lead.`,
          timestamp: 'Just now',
          category: 'INDUSTRY',
          isRead: false,
          priority: 'URGENT',
          actionLabel: 'View Schedule',
          actionView: 'opportunities'
        };
        setMailMessages((m) => [mail, ...m]);
        showToast('TRAIN FOR THIS JOB COMPLETED! Guaranteed Company Interview Unlocked!');
      }

      return {
        ...prev,
        steps: updatedSteps,
        overallProgress: progress,
        isInterviewReady: isReady
      };
    });
  };

  const applyToScholarship = (id: string) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: true } : s))
    );
    const sch = scholarships.find((s) => s.id === id);
    if (sch) {
      showToast(`Scholarship Application Submitted for: ${sch.title}`);
      const mail: MailMessage = {
        id: `mail-sch-${Date.now()}`,
        sender: sch.provider,
        senderRole: 'Scholarship Grants Committee',
        subject: `Application Acknowledgment: ${sch.title}`,
        preview: `Your financial assistance application has been received and queued for merit verification.`,
        body: `Dear Karthik,\n\nWe have received your application for "${sch.title}" (${sch.benefitAmount}).\n\nYour verified academic credentials and SkillBridge assessment records from Sri Sai Baba National Degree College have been verified.\n\nEvaluation results will be released before ${sch.deadline}.`,
        timestamp: 'Just now',
        category: 'SCHOLARSHIP',
        isRead: false,
        priority: 'NORMAL'
      };
      setMailMessages((prev) => [mail, ...prev]);
    }
  };

  const toggleLikeStartup = (id: string) => {
    setStartupIdeas((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              isLiked: !s.isLiked,
              likesCount: s.isLiked ? s.likesCount - 1 : s.likesCount + 1
            }
          : s
      )
    );
  };

  const toggleSupportStartup = (id: string) => {
    setStartupIdeas((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isSupported: !s.isSupported } : s))
    );
    showToast('Startup supported!');
  };

  const joinStartupTeam = (id: string, roleTitle?: string, intro?: string): boolean => {
    const startup = startupIdeas.find((s) => s.id === id);
    if (!startup) return false;

    const assignedRole = roleTitle || 'React Frontend Developer';

    const newMember: StartupTeamMember = {
      id: `tm-user-${Date.now()}`,
      name: profile.name,
      role: assignedRole,
      verifiedSkills: ['React', 'Python', 'SQL', 'Git'],
      evidenceLevel: 'PRACTICAL_VERIFIED',
      joinedAt: 'Today',
      status: 'ACTIVE'
    };

    setStartupIdeas((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              userJoinStatus: 'ACCEPTED',
              teamCountCurrent: (s.teamMembers || []).some((m) => m.name === profile.name)
                ? s.teamCountCurrent
                : (s.teamCountCurrent || 0) + 1,
              teamMembers: (s.teamMembers || []).some((m) => m.name === profile.name)
                ? s.teamMembers
                : [...(s.teamMembers || []), newMember],
              openRoles: (s.openRoles || []).map((r) =>
                r.roleTitle.toLowerCase() === assignedRole.toLowerCase() && r.spotsAvailable > 0
                  ? { ...r, spotsAvailable: r.spotsAvailable - 1 }
                  : r
              )
            }
          : s
      )
    );

    // Add to Student Profile experiences!
    const newExp = {
      role: assignedRole,
      startupName: startup.ideaTitle,
      duration: 'Active (4 Months Commitment)',
      skillsDemonstrated: ['React', 'Python', 'Git', 'Agile Teamwork'],
      evidenceStatus: 'STARTUP VERIFIED'
    };

    setProfile((prev) => ({
      ...prev,
      careerReadiness: Math.min(100, prev.careerReadiness + 8),
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        experience: Math.min(100, prev.readinessBreakdown.experience + 25),
        skills: Math.min(100, prev.readinessBreakdown.skills + 5)
      },
      startupExperiences: [newExp, ...prev.startupExperiences]
    }));

    // Add Achievement
    const newAch: AchievementItem = {
      id: `ach-start-${Date.now()}`,
      title: `Core Team Member: ${startup.ideaTitle}`,
      category: 'STARTUP',
      date: 'Today',
      skillAssociated: 'React & Python',
      evidenceConfidence: 'HIGH',
      evidenceBadges: ['Startup Verified', 'Agile Team Collaboration', 'Real User Product'],
      description: `Joined ${startup.ideaTitle} founded by ${startup.founderName} as ${assignedRole}.`,
      issuer: 'SkillBridge Startup Network',
      verified: true
    };
    setAchievements((prev) => [newAch, ...prev]);

    // Add welcome letter in Mailbox
    const mail: MailMessage = {
      id: `mail-start-${Date.now()}`,
      sender: `${startup.founderName} (${startup.ideaTitle})`,
      senderRole: 'Startup Founder',
      subject: `Welcome to the Team! You are officially on board as ${assignedRole}`,
      preview: `We reviewed your verified Python & React credentials and are thrilled to welcome you to ${startup.ideaTitle}.`,
      body: `Hi ${profile.name},\n\nI reviewed your SkillBridge profile, verified credentials in Python and practical React work.\n\nWe would love to have you on board as our ${assignedRole} for ${startup.ideaTitle}! ${intro ? `Your application notes: "${intro}" were great.` : ''}\n\nThis experience has been credited directly to your SkillBridge Passport, Portfolio, and Career Map. Let's build something impactful together!`,
      timestamp: 'Just now',
      category: 'STARTUP',
      isRead: false,
      priority: 'HIGH',
      actionLabel: 'View Portfolio',
      actionView: 'portfolio'
    };
    setMailMessages((prev) => [mail, ...prev]);

    fireConfetti();
    showToast(`Joined ${startup.ideaTitle} as ${assignedRole}! Credited to Skill Passport.`);
    return true;
  };

  const applyToStartupRole = (startupId: string, roleTitle: string, intro: string) => {
    const startup = startupIdeas.find((s) => s.id === startupId);
    if (!startup) return;

    const newApplicant: StartupApplicant = {
      id: `app-${Date.now()}`,
      startupId,
      studentName: profile.name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      roleApplied: roleTitle,
      matchScore: 94,
      verifiedSkills: ['React', 'Python', 'SQL', 'Git'],
      evidenceLevel: 'PRACTICAL_VERIFIED',
      intro: intro || 'Passionate about this domain and ready to commit 15 hours/week.',
      status: 'PENDING',
      appliedDate: 'Just now',
      projectsCount: 3
    };

    setStartupIdeas((prev) =>
      prev.map((s) =>
        s.id === startupId
          ? {
              ...s,
              userJoinStatus: 'REQUESTED',
              applicants: [newApplicant, ...(s.applicants || [])],
              openRoles: (s.openRoles || []).map((r) =>
                r.roleTitle.toLowerCase() === roleTitle.toLowerCase()
                  ? { ...r, applicantsCount: (r.applicantsCount || 0) + 1 }
                  : r
              )
            }
          : s
      )
    );

    // Founder receives notification email
    const mail: MailMessage = {
      id: `mail-app-${Date.now()}`,
      sender: 'SkillBridge Startup Desk',
      senderRole: 'Venture System',
      subject: `Application Received: ${roleTitle} at ${startup.ideaTitle}`,
      preview: `Your verified SkillBridge profile was forwarded to founder ${startup.founderName}.`,
      body: `Your application for ${roleTitle} at ${startup.ideaTitle} has been submitted with your verified Skill Passport credentials (Python: Industry Verified, React: Certificate Verified). Founder ${startup.founderName} will review your application in their Startup Management dashboard.`,
      timestamp: 'Just now',
      category: 'STARTUP',
      isRead: false,
      priority: 'NORMAL',
      actionLabel: 'View Startups',
      actionView: 'startups'
    };
    setMailMessages((prev) => [mail, ...prev]);

    showToast(`Applied for ${roleTitle} at ${startup.ideaTitle} with Verified Passport!`);
  };

  const handleStartupApplicantAction = (
    startupId: string,
    applicantId: string,
    action: 'ACCEPT' | 'REJECT'
  ) => {
    const startup = startupIdeas.find((s) => s.id === startupId);
    if (!startup) return;

    const applicant = (startup.applicants || []).find((a) => a.id === applicantId);

    if (action === 'ACCEPT' && applicant) {
      const newMember: StartupTeamMember = {
        id: `tm-${Date.now()}`,
        name: applicant.studentName,
        role: applicant.roleApplied,
        avatar: applicant.avatar,
        verifiedSkills: applicant.verifiedSkills,
        evidenceLevel: applicant.evidenceLevel,
        joinedAt: 'Today',
        status: 'ACTIVE'
      };

      setStartupIdeas((prev) =>
        prev.map((s) =>
          s.id === startupId
            ? {
                ...s,
                teamCountCurrent: (s.teamCountCurrent || 0) + 1,
                teamMembers: [...(s.teamMembers || []), newMember],
                applicants: (s.applicants || []).map((a) =>
                  a.id === applicantId ? { ...a, status: 'ACCEPTED' } : a
                )
              }
            : s
        )
      );

      fireConfetti();
      showToast(`${applicant.studentName} accepted into ${startup.ideaTitle}!`);
    } else {
      setStartupIdeas((prev) =>
        prev.map((s) =>
          s.id === startupId
            ? {
                ...s,
                applicants: (s.applicants || []).map((a) =>
                  a.id === applicantId ? { ...a, status: 'REJECTED' } : a
                )
              }
            : s
        )
      );
      showToast('Applicant status updated.');
    }
  };

  const applyStartupFundingScheme = (schemeId: string) => {
    setFundingSchemes((prev) =>
      prev.map((sc) => (sc.id === schemeId ? { ...sc, applied: true } : sc))
    );
    const scheme = fundingSchemes.find((s) => s.id === schemeId);
    if (scheme) {
      const mail: MailMessage = {
        id: `mail-fund-${Date.now()}`,
        sender: `${scheme.provider} (Incubation Desk)`,
        senderRole: 'Government / Incubator Body',
        subject: `Application Received: ${scheme.title}`,
        preview: `Your venture application dossier has been received by the regional evaluation panel.`,
        body: `Dear Founder,\n\nWe have received your application for "${scheme.title}".\n\nYour verified SkillBridge venture profile and student co-founder evidence badges have been forwarded to the screening committee.\n\nEvaluation timeline: 2 to 3 weeks. Shortlisted collegiate founders will be invited for an online screening viva pitch.`,
        timestamp: 'Just now',
        category: 'STARTUP',
        isRead: false,
        priority: 'HIGH',
        actionLabel: 'Check Inbox',
        actionView: 'mailbox'
      };
      setMailMessages((prev) => [mail, ...prev]);
      fireConfetti();
      showToast(`Application submitted to ${scheme.title}!`);
    }
  };

  const inviteTalentToTeam = (startupId: string, talentId: string, roleTitle: string) => {
    const startup = startupIdeas.find((s) => s.id === startupId);
    const talent = candidateTalents.find((t) => t.id === talentId);
    if (!startup || !talent) return;

    showToast(`Team invitation sent to ${talent.name} for ${roleTitle}!`);
  };

  const verifyStartupMilestone = (startupId: string, milestoneName: string, notes?: string) => {
    setStartupIdeas((prev) =>
      prev.map((s) =>
        s.id === startupId
          ? {
              ...s,
              milestoneProgress: Math.min(100, (s.milestoneProgress || 0) + 15),
              readinessScore: Math.min(100, (s.readinessScore || 0) + 6)
            }
          : s
      )
    );

    const ach: AchievementItem = {
      id: `ach-milestone-${Date.now()}`,
      title: `Milestone Verified: ${milestoneName}`,
      category: 'STARTUP',
      date: 'Today',
      skillAssociated: 'Startup Execution',
      evidenceConfidence: 'HIGH',
      evidenceBadges: ['Incubator Verified', 'Milestone Defense Passed'],
      description: `Completed milestone "${milestoneName}" with verified evidence. ${notes || ''}`,
      issuer: 'SkillBridge Venture Sandbox',
      verified: true
    };
    setAchievements((prev) => [ach, ...prev]);

    fireConfetti();
    showToast(`Milestone "${milestoneName}" verified and added to Venture Passport!`);
  };

  const createStartupIdea = (idea: Partial<StartupIdea>) => {
    const newId = `startup-${Date.now()}`;
    const fullIdea: StartupIdea = {
      id: newId,
      founderName: profile.name,
      founderRole: 'Founder / Student Innovator',
      founderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      institution: profile.institution,
      ideaTitle: idea.ideaTitle || 'New Student Innovation',
      problem: idea.problem || '',
      solution: idea.solution || '',
      category: idea.category || 'AI / ML',
      stage: idea.stage || 'IDEA',
      location: idea.location || profile.location,
      workMode: idea.workMode || 'Hybrid',
      teamCountCurrent: 1,
      teamCountTarget: idea.teamCountTarget || 4,
      teamMembers: [
        {
          id: `tm-${Date.now()}`,
          name: profile.name,
          role: 'Founder & Vision Lead',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          verifiedSkills: ['Product Design', 'React', 'Python'],
          evidenceLevel: 'PRACTICAL_VERIFIED',
          joinedAt: 'Today',
          isFounder: true,
          status: 'ACTIVE'
        }
      ],
      openRoles: (idea.skillsNeeded && idea.skillsNeeded.length > 0
        ? idea.skillsNeeded
        : ['Frontend React Developer', 'Backend API Specialist']
      ).map((skill, idx) => ({
        id: `role-${Date.now()}-${idx}`,
        roleTitle: `${skill} Specialist`,
        department: 'Core Team',
        skillsRequired: [skill],
        spotsAvailable: 1,
        description: `Build scalable features and collaborate on practical architecture for ${idea.ideaTitle || 'the startup'}.`,
        matchPercent: 88,
        applicantsCount: 0
      })),
      applicants: [],
      skillsNeeded: idea.skillsNeeded || ['React', 'Backend'],
      fundingNeeded: idea.fundingNeeded || '₹5,00,000 (Student Seed Grant)',
      visibility: idea.visibility || 'Public',
      likesCount: 1,
      isLiked: false,
      isSupported: false,
      eligibilityCriteria: [
        { requiredSkill: 'React', minEvidence: 'PRACTICAL_VERIFIED' }
      ],
      userJoinStatus: 'ACCEPTED',
      createdAt: 'Just now',
      targetUsers: idea.targetUsers || 'Students and local community users',
      businessModel: idea.businessModel || 'Freemium software with tiered service model',
      technologyStack: idea.technologyStack || ['React', 'TypeScript', 'Tailwind', 'Node.js'],
      resourcesNeeded: idea.resourcesNeeded || ['Incubation desk', 'Cloud credits', 'Testing devices'],
      mentorRequirement: idea.mentorRequirement || 'Senior Technical Architect & Domain Specialist',
      industrySupportNeeded: idea.industrySupportNeeded || 'Pilot enterprise validation partner',
      governmentSupportNeeded: idea.governmentSupportNeeded || 'Student Innovation Fellowship Grant',
      expectedImpact: idea.expectedImpact || 'Empower 1,000+ local users in year one',
      readinessScore: 68,
      readinessFactors: [
        { factor: 'Problem Clarity', status: 'DONE', detail: idea.problem ? 'Documented user pain point.' : 'Initial draft.' },
        { factor: 'Solution Architecture', status: 'DONE', detail: idea.solution ? 'Technical approach formulated.' : 'Draft architecture.' },
        { factor: 'Team Completeness', status: 'WARNING', detail: 'Founder in place; seeking verified student co-builders.' },
        { factor: 'Working Prototype', status: 'WARNING', detail: 'Repository initialized; UI & logic in progress.' },
        { factor: 'Validation Evidence', status: 'MISSING', detail: 'User interviews scheduled for validation.' },
        { factor: 'Funding Strategy', status: 'DONE', detail: 'Targeting student innovation grants.' }
      ],
      verificationStatus: 'PENDING_VERIFICATION',
      milestoneProgress: 25,
      studentFriendly: true
    };

    setStartupIdeas((prev) => [fullIdea, ...prev]);
    fireConfetti();
    showToast('Your startup idea has been published with full Ecosystem tools!');
  };

  const requestMentorship = (mentorId: string) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === mentorId ? { ...m, requested: true } : m))
    );
    const m = mentors.find((men) => men.id === mentorId);
    if (m) {
      showToast(`Mentorship session requested with ${m.name}`);
      const mail: MailMessage = {
        id: `mail-mentor-${Date.now()}`,
        sender: m.name,
        senderRole: `${m.title}, ${m.company}`,
        subject: `Mentorship Request Received`,
        preview: `Thank you for reaching out Karthik! I will review your Career Map and confirm a 1:1 slot.`,
        body: `Hello Karthik,\n\nI have received your mentorship request through SkillBridge AI. I will inspect your verified Skill Passport and Career Map milestones beforehand so we can have a productive architectural viva review.\n\nExpect a calendar invitation for this Saturday.`,
        timestamp: 'Just now',
        category: 'MENTORSHIP',
        isRead: false,
        priority: 'NORMAL'
      };
      setMailMessages((prev) => [mail, ...prev]);
    }
  };

  const addTrendToCareerMap = (trendId: string) => {
    setTechTrends((prev) =>
      prev.map((t) => (t.id === trendId ? { ...t, addedToCareerMap: true } : t))
    );
    const trend = techTrends.find((t) => t.id === trendId);
    if (trend) {
      showToast(`Added "${trend.name}" to your Career Map!`);
      // Add node to career map
      const newNode: CareerNode = {
        id: `node-${trend.id}`,
        title: trend.name.toUpperCase(),
        subtitle: `Emerging Technology: ${trend.category}`,
        type: 'PROJECTS',
        status: 'RECOMMENDED',
        progress: 10,
        skills: [trend.name],
        evidenceState: 'SELF_DECLARED',
        description: trend.relevanceToStudentGoal
      };
      setCareerNodes((prev) => [...prev, newNode]);
    }
  };

  const markMailAsRead = (id: string) => {
    setMailMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const markMailUnread = (id: string) => {
    setMailMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: false } : m))
    );
    showToast('Marked as unread.');
  };

  const toggleStarMail = (id: string) => {
    setMailMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    );
  };

  const toggleImportantMail = (id: string) => {
    setMailMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isImportant: !m.isImportant } : m))
    );
  };

  const archiveMail = (id: string) => {
    setMailMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, folder: 'archived' } : m))
    );
    showToast('Message archived.');
  };

  const trashMail = (id: string) => {
    setMailMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, folder: 'trash' } : m))
    );
    showToast('Moved to Trash.');
  };

  const restoreMail = (id: string) => {
    setMailMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, folder: 'inbox' } : m))
    );
    showToast('Restored to Inbox.');
  };

  const emptyTrash = () => {
    setMailMessages((prev) => prev.filter((m) => m.folder !== 'trash'));
    showToast('Trash emptied.');
  };

  const deleteMail = (id: string) => {
    setMailMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Message deleted permanently.');
  };

  const sendMail = (newMail: {
    recipient: string;
    recipientRole?: string;
    recipientHandle?: string;
    subject: string;
    body: string;
    category?: MailMessage['category'];
    priority?: 'NORMAL' | 'HIGH' | 'URGENT';
    attachments?: { name: string; size: string; type: string }[];
  }) => {
    const msg: MailMessage = {
      id: `mail-sent-${Date.now()}`,
      folder: 'sent',
      sender: profile.name,
      senderRole: 'Student Candidate',
      senderHandle: '@karthik.patel',
      senderVerified: true,
      recipient: newMail.recipient,
      recipientRole: newMail.recipientRole || 'SkillBridge Contact',
      recipientHandle: newMail.recipientHandle || '@contact.user',
      subject: newMail.subject,
      preview: newMail.body.slice(0, 80) + '...',
      body: newMail.body,
      timestamp: 'Just now',
      category: newMail.category || 'SYSTEM',
      isRead: true,
      priority: newMail.priority || 'NORMAL',
      attachments: newMail.attachments || []
    };

    setMailMessages((prev) => [msg, ...prev]);
    showToast(`Message sent to ${newMail.recipient} via SkillBridge Mailbox!`);
  };

  const replyMail = (mailId: string, replyBody: string) => {
    setMailMessages((prev) =>
      prev.map((m) => {
        if (m.id === mailId) {
          const newReply = {
            id: `reply-${Date.now()}`,
            sender: profile.name,
            senderRole: 'Student Candidate',
            senderHandle: '@karthik.patel',
            body: replyBody,
            timestamp: 'Just now'
          };
          return {
            ...m,
            isRead: true,
            replies: [...(m.replies || []), newReply]
          };
        }
        return m;
      })
    );
    showToast('Reply sent successfully.');
  };

  const forwardMail = (mailId: string, toRecipient: string, forwardNote: string = '') => {
    const original = mailMessages.find((m) => m.id === mailId);
    if (!original) return;

    const fwdMsg: MailMessage = {
      id: `mail-fwd-${Date.now()}`,
      folder: 'sent',
      sender: profile.name,
      senderRole: 'Student Candidate',
      senderHandle: '@karthik.patel',
      recipient: toRecipient,
      subject: `Fwd: ${original.subject}`,
      preview: (forwardNote || original.preview).slice(0, 80),
      body: `${forwardNote ? forwardNote + '\n\n---------- Forwarded message ---------\n' : ''}${original.body}`,
      timestamp: 'Just now',
      category: original.category,
      isRead: true,
      priority: original.priority,
      attachments: original.attachments
    };

    setMailMessages((prev) => [fwdMsg, ...prev]);
    showToast(`Forwarded to ${toRecipient}.`);
  };

  // Contact System Actions
  const requestContact = (contactId: string, message?: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, status: 'PENDING' } : c))
    );
    const target = contacts.find((c) => c.id === contactId);
    if (target) {
      // Send an automated introductory message into mailbox
      const reqMail: MailMessage = {
        id: `mail-req-${Date.now()}`,
        folder: 'sent',
        sender: profile.name,
        senderRole: 'Student Candidate',
        senderHandle: '@karthik.patel',
        recipient: target.name,
        recipientRole: target.role,
        recipientHandle: target.handle,
        subject: `Connection Request: ${profile.name} (${profile.targetCareer})`,
        preview: message || `Hi ${target.name}, I would like to connect through SkillBridge.`,
        body: message || `Dear ${target.name},\n\nI came across your profile in the SkillBridge People & Mentor directory. As an aspiring ${profile.targetCareer} with verified skills in Python and React, I would value the opportunity to connect.\n\nThank you,\n${profile.name}`,
        timestamp: 'Just now',
        category: 'MENTORSHIP',
        isRead: true,
        priority: 'NORMAL'
      };
      setMailMessages((prev) => [reqMail, ...prev]);
      showToast(`Connection request sent to ${target.name} via internal handle ${target.handle}!`);
    }
  };

  const updateContactStatus = (contactId: string, status: 'ACCEPTED' | 'DECLINED' | 'BLOCKED') => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, status } : c))
    );
    showToast(`Contact status updated to ${status}.`);
  };

  // Local Jobs Actions
  const applyLocalJob = (jobId: string, pitch?: string) => {
    setLocalJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicationState: 'Applied' } : j))
    );
    const job = localJobs.find((j) => j.id === jobId);
    if (job) {
      fireConfetti();
      // Generate immediate employer confirmation in Mailbox inbox
      const confMail: MailMessage = {
        id: `mail-job-${Date.now()}`,
        folder: 'inbox',
        sender: job.employer,
        senderRole: 'Hiring Coordinator',
        senderHandle: job.employerHandle || '@employer.desk',
        senderVerified: job.verificationStatus === 'Employer Verified',
        recipient: profile.name,
        recipientHandle: '@karthik.patel',
        subject: `Application Received: ${job.title}`,
        preview: `Thank you for applying to ${job.employer}. Your SkillBridge passport is under review.`,
        body: `Dear ${profile.name},\n\nWe have received your application for the ${job.title} role (${job.workingHours}, ${job.salaryRate}).\n\nYour SkillBridge verified match score is ${job.matchScore}%. Our hiring supervisor will inspect your verified test defense and contact you for schedule confirmation.\n\n${pitch ? `Your Submitted Note:\n"${pitch}"\n\n` : ''}Best regards,\n${job.employer} Team`,
        timestamp: 'Just now',
        category: 'LOCAL_JOB',
        isRead: false,
        isStarred: true,
        isImportant: true,
        priority: 'HIGH',
        actionLabel: 'View Application',
        actionView: 'local-jobs'
      };
      setMailMessages((prev) => [confMail, ...prev]);
      showToast(`Applied for "${job.title}"! Confirmation sent to your Mailbox.`);
    }
  };

  const toggleSaveLocalJob = (jobId: string) => {
    setLocalJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isSaved: !j.isSaved } : j))
    );
  };

  const withdrawLocalJob = (jobId: string) => {
    setLocalJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicationState: 'Withdrawn' } : j))
    );
    showToast('Application withdrawn.');
  };

  // Podcasts & Meetups Actions
  const registerMeetup = (meetupId: string) => {
    const meetup = offlineMeetups.find((m) => m.id === meetupId);
    if (!meetup) return;

    if (meetup.registered) {
      setOfflineMeetups((prev) =>
        prev.map((m) =>
          m.id === meetupId
            ? { ...m, registered: false, seatsRemaining: m.seatsRemaining + 1 }
            : m
        )
      );
      showToast(`Cancelled registration for "${meetup.title}".`);
    } else {
      if (meetup.seatsRemaining <= 0) {
        showToast('Sorry, this meetup is completely booked.');
        return;
      }
      setOfflineMeetups((prev) =>
        prev.map((m) =>
          m.id === meetupId
            ? { ...m, registered: true, seatsRemaining: Math.max(0, m.seatsRemaining - 1) }
            : m
        )
      );
      fireConfetti();
      // Generate Entry Pass ticket email in Mailbox
      const passMail: MailMessage = {
        id: `mail-meetup-${Date.now()}`,
        folder: 'inbox',
        sender: meetup.organizer,
        senderRole: 'Event Registration Desk',
        senderHandle: '@meetup.desk',
        senderVerified: true,
        recipient: profile.name,
        recipientHandle: '@karthik.patel',
        subject: `Your Entry Pass: ${meetup.title}`,
        preview: `Confirmed! Present this pass at ${meetup.venue} on ${meetup.date}.`,
        body: `Hello ${profile.name},\n\nYour seat has been officially confirmed for:\nEvent: ${meetup.title}\nGuest: ${meetup.guest}\nDate & Time: ${meetup.date} (${meetup.time})\nVenue: ${meetup.venue}, ${meetup.city}\nPass ID: SB-MEET-${Date.now().toString().slice(-6)}\n\nPlease bring your college student ID. Arrive 15 minutes before scheduled start time.`,
        timestamp: 'Just now',
        category: 'PODCAST',
        isRead: false,
        isStarred: true,
        isImportant: true,
        priority: 'HIGH',
        attachments: [
          { name: `Entry_Pass_${meetup.id}.pdf`, size: '142 KB', type: 'application/pdf' }
        ]
      };
      setMailMessages((prev) => [passMail, ...prev]);
      showToast(`Seat Confirmed for "${meetup.title}"! Entry pass delivered to Mailbox.`);
    }
  };

  const registerLiveSession = (sessionId: string) => {
    setLiveSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, registered: !s.registered } : s))
    );
    showToast('Registration preference updated for live interaction session.');
  };

  const submitLiveQuestion = (sessionId: string, question: string) => {
    setLiveSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const newQ = {
            id: `q-${Date.now()}`,
            studentName: profile.name,
            question,
            votes: 1
          };
          return {
            ...s,
            questionsSubmitted: [newQ, ...s.questionsSubmitted]
          };
        }
        return s;
      })
    );
    showToast('Your question has been submitted for speaker review!');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const revalidateSkill = (skillId: string) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === skillId
          ? {
              ...s,
              freshness: 'CURRENT',
              lastVerifiedDate: new Date().toISOString().split('T')[0],
              revalidationDueDate: '2027-09-04'
            }
          : s
      )
    );
    showToast('Skill successfully revalidated with fresh evidence check.');
  };

  const setTargetCareer = (career: string) => {
    setProfile((prev) => ({
      ...prev,
      targetCareer: career
    }));
  };

  const submitFeeReport = (report: Omit<FeeReportItem, 'id' | 'status' | 'createdAt'>) => {
    const newReport: FeeReportItem = {
      ...report,
      id: `fee-rep-${Date.now()}`,
      status: 'REPORT_SUBMITTED',
      statusNotes: 'Report received and registered in transparency ledger. Preliminary document validation in progress.',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setFeeReports((prev) => [newReport, ...prev]);
    showToast('Fee discrepancy report filed. Status: REPORT SUBMITTED for objective review.');
  };

  const addStudentProject = (project: Omit<StudentProjectItem, 'id'>) => {
    const newProj: StudentProjectItem = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setStudentProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${newProj.title}" added to your verified portfolio!`);
  };

  const addFastRequirement = (req: Omit<FastRecruitmentRequirement, 'id'>) => {
    const newReq: FastRecruitmentRequirement = {
      ...req,
      id: `fast-req-${Date.now()}`
    };
    setFastRequirements((prev) => [newReq, ...prev]);
    showToast(`Fast recruitment role "${newReq.roleTitle}" published!`);
  };

  const toggleCandidateShortlist = (reqId: string, candidateId: string) => {
    setCandidateComparisons((prev) => {
      const list = prev[reqId] || [];
      return {
        ...prev,
        [reqId]: list.map((c) =>
          c.id === candidateId ? { ...c, shortlisted: !c.shortlisted } : c
        )
      };
    });
    showToast('Candidate shortlist status updated.');
  };

  const hireCandidate = (reqId: string, candidateId: string) => {
    setCandidateComparisons((prev) => {
      const list = prev[reqId] || [];
      return {
        ...prev,
        [reqId]: list.map((c) =>
          c.id === candidateId ? { ...c, hired: true, shortlisted: true } : c
        )
      };
    });
    showToast('Candidate Fast Hired! Direct interview offer dispatched.');
  };

  const sendChatMessage = (conversationId: string, text: string, attachment?: ChatMessageAttachment) => {
    if (!text.trim() && !attachment) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'karthik-peetla',
      senderName: profile.name,
      senderRole: 'Student (You)',
      isMe: true,
      text: text.trim(),
      timestamp: 'Just now',
      attachment,
      isRead: true
    };
    setChatConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text.trim() || (attachment ? attachment.title : 'Attachment shared'),
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  const markConversationAsRead = (conversationId: string) => {
    setChatConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map(m => ({ ...m, isRead: true }))
        };
      }
      return c;
    }));
  };

  const openChatWithUser = (user: { id: string; name: string; role: string; org?: string; avatar?: string; type?: ConversationType }) => {
    const existing = chatConversations.find(c => c.participantId === user.id);
    if (!existing) {
      const newConv: ChatConversation = {
        id: `conv-${user.id}-${Date.now()}`,
        type: user.type || 'STUDENT_STUDENT',
        participantId: user.id,
        participantName: user.name,
        participantRole: user.role,
        participantOrg: user.org || 'SkillBridge Network',
        participantAvatar: user.avatar,
        onlineStatus: 'ONLINE',
        unreadCount: 0,
        lastMessage: 'Conversation started',
        lastMessageTime: 'Just now',
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: user.id,
            senderName: user.name,
            senderRole: user.role,
            isMe: false,
            text: `Hi Karthik! Thanks for connecting on SkillBridge. How can we collaborate?`,
            timestamp: 'Just now',
            isRead: true
          }
        ]
      };
      setChatConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    } else {
      setActiveConversationId(existing.id);
    }
    setActiveTab('messages');
  };

  const inviteToProjectInChat = (conversationId: string, projectTitle: string, note?: string) => {
    sendChatMessage(conversationId, note || `I would like to invite you to collaborate on ${projectTitle}!`, {
      type: 'PROJECT_INVITE',
      title: projectTitle,
      subtitle: 'Click to view project details in Project Hub',
      linkTab: 'projects'
    });
    showToast(`Project invitation sent to chat!`);
  };

  const shareOpportunityInChat = (conversationId: string, opportunityTitle: string, subtitle?: string) => {
    sendChatMessage(conversationId, `Check out this verified opportunity: ${opportunityTitle}`, {
      type: 'OPPORTUNITY_SHARE',
      title: opportunityTitle,
      subtitle: subtitle || 'Verified by SkillBridge',
      linkTab: 'opportunities'
    });
    showToast(`Opportunity shared to conversation!`);
  };

  const applyToIndustryOpportunity = (oppId: string) => {
    setIndustryHiringOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return { ...opp, applied: true };
      }
      return opp;
    }));
    showToast(`Application submitted! Recruiter will review your verified Skill Passport.`);
  };

  const toggleSaveIndustryOpportunity = (oppId: string) => {
    setIndustryHiringOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return { ...opp, saved: !opp.saved };
      }
      return opp;
    }));
  };

  const applyToFacultyOpportunity = (oppId: string) => {
    setFacultyOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return { ...opp, applied: true };
      }
      return opp;
    }));
    showToast(`Faculty nomination submitted! Academic relations liaison will contact your institution.`);
  };

  const toggleStudentConnection = (studentId: string) => {
    setStudentDirectory(prev => prev.map(st => {
      if (st.id === studentId) {
        const current = st.connectionStatus || (st.isConnected ? 'CONNECTED' : 'NOT_CONNECTED');
        let next: 'NOT_CONNECTED' | 'REQUEST_SENT' | 'CONNECTED' = 'REQUEST_SENT';
        if (current === 'NOT_CONNECTED') next = 'REQUEST_SENT';
        else if (current === 'REQUEST_SENT') next = 'CONNECTED';
        else next = 'NOT_CONNECTED';
        
        showToast(
          next === 'REQUEST_SENT'
            ? `Connection request sent to ${st.name}`
            : next === 'CONNECTED'
            ? `Connected with ${st.name}! You can now message them.`
            : `Disconnected from ${st.name}`
        );
        return {
          ...st,
          isConnected: next === 'CONNECTED',
          connectionStatus: next
        };
      }
      return st;
    }));
  };

  const inviteStudentToProject = (studentId: string, projectId: string, note: string) => {
    const student = studentDirectory.find(s => s.id === studentId);
    const project = hubProjects.find(p => p.id === projectId);
    if (!student || !project) return;
    openChatWithUser({
      id: student.id,
      name: student.name,
      role: student.course || student.targetCareer,
      org: student.college,
      avatar: student.avatar,
      type: 'STUDENT_STUDENT'
    });
    setTimeout(() => {
      inviteToProjectInChat(
        chatConversations.find(c => c.participantId === student.id)?.id || chatConversations[0]?.id,
        project.title,
        note
      );
    }, 100);
    showToast(`Invited ${student.name} to ${project.title}`);
  };

  const inviteStudentToStartup = (studentId: string, startupId: string, roleTitle: string, note: string) => {
    const student = studentDirectory.find(s => s.id === studentId);
    const startup = startupIdeas.find(s => s.id === startupId);
    if (!student || !startup) return;
    openChatWithUser({
      id: student.id,
      name: student.name,
      role: student.course || student.targetCareer,
      org: student.college,
      avatar: student.avatar,
      type: 'STUDENT_STUDENT'
    });
    setTimeout(() => {
      sendChatMessage(
        chatConversations.find(c => c.participantId === student.id)?.id || chatConversations[0]?.id,
        note || `We would like to invite you to join ${startup.title} as ${roleTitle}!`,
        {
          type: 'PROJECT_INVITE',
          title: `${startup.title} — ${roleTitle}`,
          subtitle: 'Startup Co-founder / Core Team Invite',
          linkTab: 'startups'
        }
      );
    }, 100);
    showToast(`Sent startup invitation to ${student.name}`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        profile,
        setProfile,
        skills,
        careerNodes,
        learningResources,
        assessments,
        offlineBookings,
        opportunities,
        trainForJobRoute,
        scholarships,
        institutions,
        feeReports,
        submitFeeReport,
        studentProjects,
        addStudentProject,
        fastRequirements,
        addFastRequirement,
        candidateComparisons,
        toggleCandidateShortlist,
        hireCandidate,
        hubProjects,
        setHubProjects,
        startupIdeas,
        fundingSchemes,
        candidateTalents,
        mentors,
        achievements,
        mailMessages,
        notifications,
        techTrends,
        contacts,
        localJobs,
        podcasts,
        offlineMeetups,
        liveSessions,
        isSearchOpen,
        setIsSearchOpen,
        isAskAIOpen,
        setIsAskAIOpen,
        activeOfflineModalSkill,
        setActiveOfflineModalSkill,
        activeAssessmentModalItem,
        setActiveAssessmentModalItem,
        selectedOpportunityModal,
        setSelectedOpportunityModal,
        isTrainJobModalOpen,
        setIsTrainJobModalOpen,
        toastMessage,
        showToast,
        setTargetCareer,
        updatePrivacySetting,
        startLearning,
        completeLearning,
        passAssessment,
        bookOfflineAssessment,
        verifyOfflineAssessmentSuccess,
        applyToOpportunity,
        toggleSaveOpportunity,
        advanceTrainJobStep,
        applyToScholarship,
        toggleLikeStartup,
        toggleSupportStartup,
        joinStartupTeam,
        applyToStartupRole,
        handleStartupApplicantAction,
        applyStartupFundingScheme,
        inviteTalentToTeam,
        verifyStartupMilestone,
        createStartupIdea,
        requestMentorship,
        addTrendToCareerMap,
        addTechTrendToCareerMap: addTrendToCareerMap,
        markMailAsRead,
        markMailUnread,
        toggleStarMail,
        toggleImportantMail,
        archiveMail,
        trashMail,
        restoreMail,
        emptyTrash,
        deleteMail,
        sendMail,
        replyMail,
        forwardMail,
        requestContact,
        updateContactStatus,
        applyLocalJob,
        toggleSaveLocalJob,
        withdrawLocalJob,
        registerMeetup,
        registerLiveSession,
        submitLiveQuestion,
        markNotificationAsRead,
        revalidateSkill,

        // Messages & Real-Time Chat
        chatConversations,
        activeConversationId,
        setActiveConversationId,
        sendChatMessage,
        openChatWithUser,
        inviteToProjectInChat,
        shareOpportunityInChat,
        markConversationAsRead,
        unreadChatCount,

        // Industry Hiring
        industryHiringOpportunities,
        applyToIndustryOpportunity,
        toggleSaveIndustryOpportunity,

        // Faculty & Academia Opportunities
        facultyOpportunities,
        applyToFacultyOpportunity,

        // Student Directory & Connections
        studentDirectory,
        toggleStudentConnection,
        inviteStudentToProject,
        inviteStudentToStartup
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
