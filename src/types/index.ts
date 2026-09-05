export type UserRole = 'student' | 'industry' | 'institute' | 'startup';

export type EvidenceLevel =
  | 'SELF_DECLARED'
  | 'CERTIFICATE_UPLOADED'
  | 'CERTIFICATE_VERIFIED'
  | 'ASSESSMENT_PASSED'
  | 'PRACTICAL_VERIFIED'
  | 'VIVA_DEFENSE'
  | 'OFFLINE_VERIFIED'
  | 'INDUSTRY_VERIFIED'
  | 'REAL_PERFORMANCE';

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'PENDING'
  | 'ASSESSED'
  | 'PRACTICALLY_VERIFIED'
  | 'OFFLINE_VERIFIED'
  | 'INDUSTRY_VERIFIED';

export type FreshnessStatus = 'CURRENT' | 'VERIFIED' | 'REVALIDATION_DUE' | 'EXPIRED';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Core CS' | 'Tools' | 'Emerging Tech' | 'Soft Skills';
  currentLevel: 'None' | 'Basic' | 'Intermediate' | 'Advanced';
  requiredLevel: 'Basic' | 'Intermediate' | 'Advanced';
  gapPercentage: number; // 0 to 100
  gapSeverity: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  evidenceLevel: EvidenceLevel;
  evidenceConfidence: 'LOW' | 'MEDIUM' | 'HIGH';
  status: VerificationStatus;
  lastVerifiedDate?: string;
  revalidationDueDate?: string;
  freshness: FreshnessStatus;
  practicalProjectsCompleted: number;
  vivaScore?: number; // out of 100
  offlineCenterName?: string;
  certificatesCount: number;
  description: string;
}

export interface CareerNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'FOUNDATION' | 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'PROBLEM_SOLVING' | 'TOOLS' | 'PROJECTS' | 'PRACTICAL_ASSESSMENT' | 'VIVA_DEFENSE' | 'OFFLINE_VERIFIED' | 'INTERNSHIP' | 'JOB';
  status: 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED' | 'RECOMMENDED';
  progress: number;
  skills: string[];
  evidenceState: EvidenceLevel;
  description: string;
  recommendedLearningId?: string;
  targetAssessmentId?: string;
}

export interface LearningResource {
  id: string;
  title: string;
  skill: string;
  category?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  mode: 'Online' | 'Offline' | 'Hybrid';
  type: 'FREE_ONLINE' | 'PAID_ONLINE' | 'GOVERNMENT' | 'PRIVATE' | 'OFFLINE_CENTRE' | 'PRACTICAL_TRAINING' | 'YOUTUBE';
  provider: string;
  isGovernment: boolean;
  duration: string;
  rating: number;
  reviewsCount: number;
  price: string;
  isFree: boolean;
  location?: string;
  practicalTraining: boolean;
  industryAlignment: number; // percentage
  verificationStatus: string;
  whyRecommended: string;
  skillGapAddressed: string;
  completed?: boolean;
  industryRecognition?: string;
  capstoneProject?: string;
  hasVerifiedCredential?: boolean;
  targetAssessmentId?: string;
  careerRelevanceScore?: number;
  syllabus: string[];
  channelName?: string;
  views?: string;
  publishedDate?: string;
  officialDocUrl?: string;
  youtubeId?: string;
}

export interface AssessmentItem {
  id: string;
  title: string;
  skill: string;
  type: 'APTITUDE' | 'TECHNICAL' | 'PRACTICAL_CODING' | 'VIVA' | 'OFFLINE_VERIFIED';
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  integrityFeatures: string[];
  passed?: boolean;
  score?: number;
  dateAttempted?: string;
  offlineCenterAvailable: boolean;
}

export interface OfflineAssessmentBooking {
  id: string;
  assessmentId: string;
  skillName: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  fee: string;
  duration: string;
  instructions: string[];
  whatToBring: string[];
  status: 'CONFIRMED' | 'ATTENDED' | 'PASSED' | 'PENDING';
  candidateName: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  industry: string;
  location: string;
  workMode: 'Remote' | 'On-Site' | 'Hybrid';
  type: 'INTERNSHIP' | 'FULL_TIME' | 'PART_TIME';
  duration?: string;
  stipendOrSalary: string;
  deadline: string;
  matchScore: number; // 0 to 100
  eligibilityStatus: 'ELIGIBLE' | 'PARTIALLY_ELIGIBLE' | 'NOT_YET_ELIGIBLE';
  requiredSkills: { skill: string; met: boolean }[];
  missingSkills: string[];
  trainingPathAvailable: boolean;
  applied?: boolean;
  saved?: boolean;
  description: string;
  responsibilities: string[];
  perks: string[];
  isVerifiedCompany: boolean;
}

export interface TrainForJobRoute {
  jobId: string;
  jobTitle: string;
  companyName: string;
  targetSkills: string[];
  steps: {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    skill: string;
    type: 'LEARNING' | 'PROJECT' | 'PRACTICAL_ASSESSMENT' | 'VIVA' | 'OFFLINE_VERIFY' | 'INTERVIEW_ELIGIBLE';
    completed: boolean;
  }[];
  overallProgress: number;
  isInterviewReady: boolean;
}

export interface ScholarshipItem {
  id: string;
  title: string;
  provider: string;
  category: 'GOVERNMENT' | 'PRIVATE' | 'CSR' | 'MERIT' | 'NEED_BASED' | 'SKILL_DEVELOPMENT';
  benefitAmount: string;
  educationRequirement: string;
  incomeLimit?: string;
  locationScope: string;
  deadline: string;
  eligibilityStatus: 'ELIGIBLE' | 'PARTIALLY_ELIGIBLE' | 'NOT_ELIGIBLE';
  requirements: { label: string; met: boolean }[];
  missingRequirementDesc?: string;
  whyRecommended: string;
  requiredDocuments: string[];
  applied?: boolean;
  saved?: boolean;
}

export interface InstitutionItem {
  id: string;
  name: string;
  code?: string;
  type: 'College' | 'University' | 'Training Centre' | 'Skill Institute';
  location: string;
  mode: 'Offline' | 'Hybrid' | 'Online';
  industryAlignment: number; // percentage
  practicalTraining: boolean;
  rating: number;
  coursesCount: number;
  featuredCourse: string;
  duration: string;
  fees: string;
  facultyHighlights: string;
  facilities: string[];
  studentOutcomes: string;
  industryPartners: string[];
  demandVsCoverage: {
    skill: string;
    industryDemand: 'HIGH' | 'MEDIUM' | 'CRITICAL';
    institutionCoverage: 'HIGH' | 'MEDIUM' | 'LOW';
    recommendation: string;
  }[];
  establishedYear?: number;
  verificationStatus?: 'VERIFIED_OFFICIAL' | 'INSTITUTION_REPORTED' | 'NOT_YET_VERIFIED' | 'DATA_NOT_AVAILABLE';
  website?: string;
  contactPhone?: string;
  infrastructureDetails?: string;
  coursesList?: {
    name: string;
    duration: string;
    mode: string;
    eligibility: string;
    feePerYear: string;
    feeStatus: 'VERIFIED' | 'ESTIMATED' | 'DATA_NOT_AVAILABLE';
  }[];
  syllabusStructure?: {
    semesterOrYear: string;
    coreSubjects: string[];
    practicalLabs: string[];
    electiveTracks: string[];
  }[];
  curriculumIntelligence?: {
    skill: string;
    industryRequirement: string;
    institutionAlignment: 'STRONGLY_ALIGNED' | 'PARTIALLY_ALIGNED' | 'NEEDS_UPDATING' | 'INSUFFICIENT_DATA';
    evidenceAndGaps: string;
  }[];
  placementStats?: {
    verified: boolean;
    placementPercentage?: number;
    medianSalary?: string;
    highestSalary?: string;
    batchYear?: string;
    dataSource: string;
    notes?: string;
  };
  recruitingCompanies?: {
    name: string;
    roles: string[];
    verifiedHireCount?: number;
    status: 'VERIFIED' | 'REPORTED' | 'NOT_VERIFIED';
  }[];
  specialCourses?: {
    title: string;
    type: string;
    duration: string;
    provider: string;
  }[];
  practicalLearningHighlights?: {
    labName: string;
    equipmentDetails: string;
    projectsSupported: string;
  }[];
  categorizedReviews?: {
    id: string;
    category: 'TEACHING' | 'FACULTY' | 'LABS' | 'INFRASTRUCTURE' | 'PLACEMENTS';
    reviewerType: 'VERIFIED_STUDENT' | 'VERIFIED_ALUMNI' | 'FORMER_STUDENT' | 'UNVERIFIED';
    rating: number;
    title: string;
    comment: string;
    date: string;
  }[];
  feeBreakdown?: {
    tuitionFee: string;
    admissionFee: string;
    examFee: string;
    hostelFee: string;
    feeTransparencyStatus: 'OFFICIAL_PUBLISHED' | 'INSTITUTION_REPORTED' | 'STUDENT_REPORTED' | 'DATA_NOT_AVAILABLE';
  };
}

export interface FeeReportItem {
  id: string;
  institutionId: string;
  institutionName: string;
  course?: string;
  academicYear?: string;
  officiallyStatedAmount?: string;
  prescribedFee?: string;
  amountRequestedOrCollected?: string;
  demandedFee?: string;
  differenceAmount?: string;
  excessAmount?: string;
  category?: 'EXTRA_UNAUTHORIZED_FEE' | 'DONATION_DEMAND' | 'DELAYED_SCHOLARSHIP' | 'EXAM_FEE_IRREGULARITY' | 'OTHER';
  studentName?: string;
  isAnonymous?: boolean;
  rollNumber?: string;
  date?: string;
  description: string;
  receiptFileName?: string;
  status: 'REPORT_SUBMITTED' | 'UNDER_REVIEW' | 'INSTITUTION_RESPONSE_REQUESTED' | 'VERIFIED_DISCREPANCY' | 'UNABLE_TO_VERIFY' | 'REFERRED_TO_COMMITTEE' | 'RESOLVED';
  statusNotes?: string;
  createdAt: string;
}

export interface StudentProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'AI / ML' | 'Mobile' | 'Systems';
  githubUrl: string;
  liveUrl?: string;
  previewImage?: string;
  description: string;
  myRole: string;
  skillsDemonstrated: string[];
  skills?: string[]; // Canonical alias matching skillsDemonstrated
  evidenceLevel: EvidenceLevel;
  verifiedBy?: string;
  starsCount?: number;
  dateCompleted: string;
}

export interface FastRecruitmentRequirement {
  id: string;
  companyName: string;
  roleTitle: string;
  urgency: 'IMMEDIATE_48H' | '7_DAYS' | '15_DAYS' | 'INTERNSHIP' | 'PART_TIME';
  stipendOrSalary: string;
  location: string;
  workMode: 'Remote' | 'On-Site' | 'Hybrid';
  requiredSkills: {
    skill: string;
    isRequired: boolean;
    minEvidenceLevel: EvidenceLevel;
  }[];
  exactSkills?: {
    skillName: string;
    isRequired: boolean;
    minEvidenceLevel: EvidenceLevel;
  }[];
  department?: string;
  totalMatchedCandidates?: number;
  createdAt?: string;
  description: string;
}

export interface FastMatchCandidateComparison {
  id: string;
  candidateName: string;
  degree: string;
  institution: string;
  skillsEvaluation: {
    skill: string;
    studentHasSkill: boolean;
    evidenceLevel: EvidenceLevel;
    matchesRequirement: boolean;
  }[];
  matchedCount: number;
  totalRequiredCount: number;
  is100PercentMatch: boolean;
  availability: string;
  expectedStipend: string;
  shortlisted?: boolean;
  hired?: boolean;
}

export interface StartupTeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  verifiedSkills: string[];
  evidenceLevel?: EvidenceLevel;
  joinedAt: string;
  isFounder?: boolean;
  status?: 'ACTIVE' | 'CONTRIBUTING' | 'ALUMNI';
}

export interface StartupOpenRole {
  id: string;
  roleTitle: string;
  department?: string;
  skillsRequired: string[];
  spotsAvailable: number;
  description: string;
  matchPercent?: number;
  applicantsCount?: number;
}

export interface StartupApplicant {
  id: string;
  startupId: string;
  studentName: string;
  avatar?: string;
  roleApplied: string;
  matchScore: number;
  verifiedSkills: string[];
  evidenceLevel: EvidenceLevel;
  intro: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedDate: string;
  projectsCount?: number;
}

export interface StartupReadinessFactor {
  factor: string;
  status: 'DONE' | 'WARNING' | 'MISSING';
  detail: string;
}

export interface StartupFundingScheme {
  id: string;
  title: string;
  provider: string;
  category: 'GOVERNMENT' | 'INCUBATOR' | 'ACCELERATOR' | 'CSR' | 'INSTITUTION' | 'INVESTOR' | 'INFRASTRUCTURE';
  amount: string;
  stageTarget: string;
  eligibility: string;
  deadline: string;
  verificationBadge: 'GOVERNMENT_VERIFIED' | 'PENDING_VERIFICATION' | 'DEMO_DATA' | 'EXPIRED' | 'NOT_VERIFIED';
  applicationLink?: string;
  applied?: boolean;
  description: string;
  keyPerks: string[];
}

export interface CandidateTalentProfile {
  id: string;
  name: string;
  college: string;
  degree: string;
  roleTitle: string;
  verifiedSkills: string[];
  evidenceLevel: EvidenceLevel;
  practicalProjectsCount: number;
  experienceSnippet: string;
  availability: string;
  matchScore?: number;
  matchReason?: string;
  avatar?: string;
  location: string;
}

export interface StartupIdea {
  id: string;
  founderName: string;
  founderRole: string;
  founderAvatar?: string;
  institution?: string;
  ideaTitle: string;
  problem: string;
  solution: string;
  category: 'AI / ML' | 'Agritech' | 'Healthtech' | 'Edtech' | 'Fintech' | 'SaaS' | 'CleanTech';
  stage: 'IDEA' | 'VALIDATED' | 'TEAM_BUILDING' | 'PROTOTYPE' | 'PILOT' | 'FUNDRAISING' | 'GROWING' | 'Idea' | 'Prototype' | 'Early Stage' | 'MVP Built';
  location: string;
  workMode?: 'Remote' | 'On-Site' | 'Hybrid';
  teamCountCurrent: number;
  teamCountTarget: number;
  teamMembers: StartupTeamMember[];
  openRoles?: StartupOpenRole[];
  applicants?: StartupApplicant[];
  skillsNeeded: string[];
  fundingNeeded: string;
  visibility: 'Public' | 'Private' | 'Invite Only';
  likesCount: number;
  isLiked?: boolean;
  isSupported?: boolean;
  eligibilityCriteria: {
    requiredSkill: string;
    minEvidence: string;
  }[];
  userJoinStatus: 'NONE' | 'REQUESTED' | 'ACCEPTED' | 'NOT_ELIGIBLE';
  createdAt: string;
  targetUsers?: string;
  businessModel?: string;
  technologyStack?: string[];
  resourcesNeeded?: string[];
  mentorRequirement?: string;
  industrySupportNeeded?: string;
  governmentSupportNeeded?: string;
  expectedImpact?: string;
  readinessScore: number;
  readinessFactors: StartupReadinessFactor[];
  verificationStatus: 'GOVERNMENT_VERIFIED' | 'INCUBATOR_VERIFIED' | 'DEMO_PROTOTYPE' | 'PENDING_VERIFICATION' | 'SELF_DECLARED';
  milestoneProgress?: number;
  studentFriendly?: boolean;
}

export interface MentorItem {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  skills: string[];
  topics: string[];
  experienceYears: number;
  location: string;
  availability: string;
  verified: boolean;
  avatarUrl?: string;
  sessionsCompleted: number;
  rating: number;
  requested?: boolean;
}

export interface SuccessJourneyItem {
  id: string;
  studentName: string;
  initialBackground: string;
  targetRole: string;
  currentCompany: string;
  currentPackage: string;
  journeySteps: string[];
  keyAdvice: string;
  location: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'SKILL_VERIFICATION' | 'ASSESSMENT' | 'PROJECT' | 'INTERNSHIP' | 'STARTUP' | 'HACKATHON' | 'AWARD';
  date: string;
  skillAssociated?: string;
  evidenceConfidence: 'LOW' | 'MEDIUM' | 'HIGH';
  evidenceBadges: string[];
  description: string;
  issuer: string;
  verified: boolean;
}

export interface MailAttachment {
  name: string;
  size: string;
  type: string;
}

export interface MailReply {
  id: string;
  sender: string;
  senderRole: string;
  senderHandle?: string;
  body: string;
  timestamp: string;
  attachments?: MailAttachment[];
}

export interface MailMessage {
  id: string;
  folder?: 'inbox' | 'sent' | 'drafts' | 'starred' | 'important' | 'archived' | 'trash';
  sender: string;
  senderRole: string;
  senderHandle?: string;
  senderAvatar?: string;
  senderVerified?: boolean;
  recipient?: string;
  recipientRole?: string;
  recipientHandle?: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  category: 'APPLICATIONS' | 'INDUSTRY' | 'INSTITUTE' | 'ASSESSMENT' | 'LEARNING' | 'CAREER' | 'MENTORSHIP' | 'STARTUP' | 'SCHOLARSHIP' | 'SYSTEM' | 'LOCAL_JOB' | 'PODCAST';
  isRead: boolean;
  isStarred?: boolean;
  isImportant?: boolean;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  actionLabel?: string;
  actionView?: string;
  attachments?: MailAttachment[];
  replies?: MailReply[];
}

export interface SkillBridgeContact {
  id: string;
  name: string;
  handle: string; // internal privacy handle e.g. @ananya.mentor
  role: string;
  category: 'STUDENT' | 'MENTOR' | 'INDUSTRY' | 'RECRUITER' | 'INSTITUTE' | 'STARTUP_FOUNDER' | 'COLLABORATOR' | 'TRAINER' | 'PODCAST_GUEST' | 'EVENT_ORGANIZER';
  organization: string;
  location: string;
  skills?: string[];
  verified: boolean;
  verificationBadge: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'BLOCKED';
  bio: string;
  availability: string;
  mutualInterests?: string[];
  lastActive?: string;
}

export interface LocalPartTimeJob {
  id: string;
  title: string;
  employer: string;
  employerHandle?: string;
  employerLogo?: string;
  category: 'TECHNICAL' | 'CREATIVE' | 'MEDIA' | 'COMMUNICATION' | 'EVENTS' | 'RETAIL' | 'EDUCATION' | 'FIELD_WORK' | 'BUSINESS' | 'LOCAL_SERVICES';
  location: string;
  distanceKm: number;
  requiredSkills: string[];
  experienceRequired: string;
  workType: 'Part-time' | 'Weekend' | 'Evening' | 'Flexible';
  workingHours: string;
  duration: string;
  salaryRate: string;
  salaryFrequency: 'per hour' | 'per day' | 'per week' | 'per month' | 'project-based';
  vacancies: number;
  postedDate: string;
  deadline: string;
  verificationStatus: 'Employer Verified' | 'Pending Verification' | 'Not Verified' | 'DEMO OPPORTUNITY';
  description: string;
  responsibilities: string[];
  matchScore: number;
  matchReasons: string[];
  missingSkills: string[];
  whyRecommendation: string;
  applicationState?: 'Applied' | 'Viewed' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected' | 'Withdrawn';
  isSaved?: boolean;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  guest: string;
  guestRole: string;
  guestBio: string;
  guestHandle: string;
  topic: string;
  category: 'ENTREPRENEURSHIP' | 'CAREER' | 'TECHNICAL_TRADES' | 'AI_AND_TECH' | 'COLLEGE_TO_CAREER' | 'CREATIVE';
  duration: string;
  episodeNumber: number;
  releaseDate: string;
  viewsOrListens: string;
  thumbnail: string;
  audioDurationMinutes: number;
  keyTakeaways: string[];
  relatedCareers: string[];
  skillsDiscussed?: string[];
  resources: { title: string; link: string }[];
  isDemo: boolean;
}

export interface OfflineMeetup {
  id: string;
  title: string;
  guest: string;
  guestRole: string;
  guestBio?: string;
  topic: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  totalSeats: number;
  seatsRemaining: number;
  organizer: string;
  organizerVerification: 'Organizer Verified' | 'Institute Partner' | 'Pending Verification' | 'DEMO EVENT';
  registered: boolean;
  description: string;
  agenda: string[];
}

export interface LiveInteractionSession {
  id: string;
  title: string;
  guest: string;
  guestRole: string;
  guestHandle: string;
  scheduledDate: string;
  scheduledTime: string;
  countdownHours: number;
  status: 'UPCOMING' | 'LIVE_NOW' | 'RECORDING_AVAILABLE';
  registered: boolean;
  questionsSubmitted: { id: string; studentName: string; question: string; votes: number }[];
  recordingUrl?: string;
  keyLessons?: string[];
  resources?: string[];
  relatedCareers?: string[];
  isDemo: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'ASSESSMENT' | 'LEARNING' | 'OPPORTUNITY' | 'STARTUP' | 'SCHOLARSHIP' | 'EVIDENCE';
  isRead: boolean;
  targetView?: string;
}

export interface TechnologyTrend {
  id: string;
  name: string;
  category: string;
  industryDemand: 'CRITICAL' | 'HIGH' | 'SURGING';
  growthRate: string;
  relevanceToStudentGoal: string;
  learningRoute: string[];
  addedToCareerMap?: boolean;
}

export interface StudentProfile {
  name: string;
  degree: string;
  institution: string;
  location: string;
  targetCareer: string;
  careerReadiness: number;
  readinessBreakdown: {
    skills: number;
    assessment: number;
    practical: number;
    experience: number;
    communication: number;
    industryAlignment: number;
  };
  privacySettings: {
    profileVisibility: 'PUBLIC' | 'VERIFIED_RECRUITERS_ONLY' | 'PRIVATE';
    certificateVisibility: boolean;
    employerAccess: boolean;
    contactSharing: boolean;
    mentorCommunication: boolean;
    startupParticipation: boolean;
  };
  startupExperiences: {
    role: string;
    startupName: string;
    duration: string;
    skillsDemonstrated: string[];
    evidenceStatus: string;
  }[];
}

export interface EcosystemMapItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'LOCAL_JOB' | 'INSTITUTION' | 'STARTUP' | 'MEETUP_HUB';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  city: string;
  distanceKm: number;
  rating?: number;
  tags: string[];
  description: string;
  actionText: string;
  compensationOrType?: string;
  hoursOrTiming?: string;
  contactOrHandle?: string;
  statusBadge?: string;
}

// Student Discovery & Public Profile
export interface StudentDirectoryItem {
  id: string;
  studentId: string; // e.g. "SB-2026-AP-8841"
  name: string;
  avatar?: string;
  degree: string;
  course: string;
  college: string;
  location: string;
  targetCareer: string;
  careerReadiness: number;
  verifiedSkills: string[];
  unverifiedSkills: string[];
  assessmentPassedCount: number;
  projectsCount: number;
  portfolioProjects: {
    title: string;
    description: string;
    skills: string[];
    githubUrl?: string;
    liveUrl?: string;
  }[];
  achievements: string[];
  certifications: string[];
  collaborationInterests: string[];
  projectInterests: string[];
  startupInterests: string[];
  availability: 'Immediate (15+ hrs/wk)' | 'Part-Time (8-10 hrs/wk)' | 'Weekends Only' | 'Busy';
  experienceYears: string;
  bio: string;
  isConnected?: boolean;
  connectionStatus?: 'NOT_CONNECTED' | 'REQUEST_SENT' | 'CONNECTED';
  isFollowed?: boolean;
  isBlocked?: boolean;
  contactPermission?: boolean;
  email?: string;
  phone?: string;
}

// =============================================================================
// DIRECT MESSAGES & REAL-TIME CHAT
// =============================================================================
export type ConversationType =
  | 'STUDENT_STUDENT'
  | 'STUDENT_COMPANY'
  | 'STUDENT_MENTOR'
  | 'STUDENT_INSTITUTION'
  | 'PROJECT_TEAM'
  | 'STARTUP_TEAM';

export interface ChatMessageAttachment {
  type: 'PROJECT_INVITE' | 'OPPORTUNITY_SHARE' | 'CODE_SNIPPET' | 'DOCUMENT';
  title: string;
  subtitle?: string;
  metadata?: Record<string, any>;
  linkTab?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  senderRole: string; // e.g. "Student", "HR Lead", "Faculty Mentor"
  isMe: boolean;
  text: string;
  timestamp: string;
  attachment?: ChatMessageAttachment;
  isRead?: boolean;
}

export interface ChatConversation {
  id: string;
  type: ConversationType;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantOrg: string;
  participantAvatar?: string;
  onlineStatus: 'ONLINE' | 'AWAY' | 'OFFLINE';
  lastSeen?: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
  relatedProjectId?: string;
  relatedOpportunityId?: string;
}

// =============================================================================
// INDUSTRY HIRING CATEGORIES & VERIFICATION SOURCES
// =============================================================================
export type IndustryHiringCategory =
  | 'MNC'
  | 'NATIONAL'
  | 'REGIONAL'
  | 'LOCAL'
  | 'STARTUP'
  | 'MSME'
  | 'INDUSTRY_SPECIFIC';

export type CompanyCategory = IndustryHiringCategory;

export type VerificationSourceLabel =
  | 'VERIFIED'
  | 'PUBLIC_SOURCE'
  | 'COMPANY_POSTED'
  | 'DEMO_DATA';

export interface IndustryHiringOpportunity {
  id: string;
  companyName: string;
  companyLogo?: string;
  category: IndustryHiringCategory;
  roleTitle: string;
  department: string;
  location: string;
  workMode: 'On-Site' | 'Remote' | 'Hybrid';
  requiredSkills: string[];
  preferredSkills?: string[];
  minimumSkillLevel: 'Basic' | 'Intermediate' | 'Advanced';
  experienceRequired: string;
  eligibility: string;
  stipendOrSalary: string;
  isSalaryVerified: boolean;
  deadline: string;
  matchPercentage: number;
  missingSkills: string[];
  verificationStatus: VerificationSourceLabel;
  description: string;
  responsibilities: string[];
  openingsCount: number;
  applied?: boolean;
  saved?: boolean;
  hiringFlowSteps?: string[];
}

// =============================================================================
// ACADEMIA / FACULTY OPPORTUNITIES
// =============================================================================
export type FacultyOpportunityType =
  | 'FACULTY_INTERNSHIP'
  | 'INDUSTRIAL_TRAINING'
  | 'FDP'
  | 'CONSULTANCY'
  | 'RESEARCH_COLLABORATION'
  | 'INDUSTRY_MENTORSHIP'
  | 'GUEST_LECTURE'
  | 'WORKSHOP'
  | 'INNOVATION_CHALLENGE';

export interface FacultyOpportunityItem {
  id: string;
  type: FacultyOpportunityType;
  title: string;
  hostOrganization: string; // Industry partner or University
  hostType: 'Industry Enterprise' | 'Research Lab' | 'Government Body' | 'University COE';
  location: string;
  mode: 'On-Site' | 'Hybrid' | 'Virtual';
  duration: string;
  stipendOrGrant?: string;
  eligibility: string; // e.g. "Assistant / Associate Professors in CSE / ECE"
  departmentScope: string[];
  focusDomains: string[];
  keyOutcomes: string[];
  applicationDeadline: string;
  seatsAvailable: number;
  verificationStatus: VerificationSourceLabel;
  applied?: boolean;
  description: string;
  coordinators: string;
}

// =============================================================================
// CURRICULUM ALIGNMENT INTELLIGENCE
// =============================================================================
export type AlignmentVerdict =
  | 'STRONG_ALIGNMENT'
  | 'PARTIAL_ALIGNMENT'
  | 'NEEDS_ADDITIONAL_LEARNING'
  | 'INSUFFICIENT_DATA';

export interface CurriculumAlignmentAnalysis {
  careerGoal: string;
  institutionId: string;
  institutionName: string;
  industryRequiredSkills: { skill: string; demandLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' }[];
  taughtInCurriculum: { skill: string; semester: string; courseName: string }[];
  practicalExposureScore: number; // 0 to 100
  projectsOfferedCount: number;
  industryTrainingIncluded: boolean;
  verdict: AlignmentVerdict;
  verdictSummary: string;
  strengths: string[];
  gapsIdentified: string[];
  recommendedBridgeActions: string[];
}

// Project Hub & Collaborative Workspace
export type ProjectStage =
  | 'IDEA'
  | 'TEAM_BUILDING'
  | 'DEVELOPMENT'
  | 'PROTOTYPE'
  | 'TESTING'
  | 'PILOT'
  | 'COMPLETED';

export interface ProjectTaskItem {
  id: string;
  title: string;
  assignedToName: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}

export interface ProjectMilestoneItem {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
}

export interface ProjectDiscussionItem {
  id: string;
  authorName: string;
  authorRole: string;
  message: string;
  timestamp: string;
}

export interface ProjectFileItem {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  timestamp: string;
  type: string;
}

export interface ProjectHubItem {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  description: string;
  category: 'AI / ML' | 'Full Stack' | 'Agritech' | 'Healthtech' | 'Edtech' | 'IoT / Hardware' | 'Mobile';
  stage: ProjectStage;
  skillsRequired: string[];
  rolesRequired: string[];
  expectedDuration: string;
  locationMode: 'Remote' | 'On-Site' | 'Hybrid';
  availabilityNeeded: string;
  teamSizeMax: number;
  visibility: 'PUBLIC' | 'PRIVATE';
  creatorName: string;
  creatorRole: string;
  creatorAvatar?: string;
  teamMembers: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    contributionPercent: number;
    tasksCompleted: number;
    isLead?: boolean;
  }[];
  tasks: ProjectTaskItem[];
  milestones: ProjectMilestoneItem[];
  discussions: ProjectDiscussionItem[];
  files: ProjectFileItem[];
  skillsDemonstrated: string[];
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  isUserMember?: boolean;
  userRole?: string;
  syncedToProfile?: boolean;
  createdAt: string;
}
