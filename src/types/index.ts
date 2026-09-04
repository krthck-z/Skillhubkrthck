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
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  mode: 'Online' | 'Offline' | 'Hybrid';
  type: 'FREE_ONLINE' | 'PAID_ONLINE' | 'GOVERNMENT' | 'PRIVATE' | 'OFFLINE_CENTRE' | 'PRACTICAL_TRAINING';
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
  syllabus: string[];
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
}

export interface StartupIdea {
  id: string;
  founderName: string;
  founderRole: string;
  founderAvatar?: string;
  ideaTitle: string;
  problem: string;
  solution: string;
  category: 'AI / ML' | 'Agritech' | 'Healthtech' | 'Edtech' | 'Fintech' | 'SaaS' | 'CleanTech';
  stage: 'Idea' | 'Prototype' | 'Early Stage' | 'MVP Built';
  location: string;
  teamCountCurrent: number;
  teamCountTarget: number;
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

export interface MailMessage {
  id: string;
  sender: string;
  senderRole: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  category: 'APPLICATIONS' | 'INDUSTRY' | 'INSTITUTE' | 'ASSESSMENT' | 'LEARNING' | 'CAREER' | 'MENTORSHIP' | 'STARTUP' | 'SCHOLARSHIP' | 'SYSTEM';
  isRead: boolean;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  actionLabel?: string;
  actionView?: string;
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
