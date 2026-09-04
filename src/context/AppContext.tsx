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
  MentorItem,
  AchievementItem,
  MailMessage,
  AppNotification,
  TechnologyTrend
} from '../types';
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
  initialMentors,
  initialAchievements,
  initialMailMessages,
  initialNotifications,
  initialTechnologyTrends
} from '../data/mockData';

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
  joinStartupTeam: (id: string) => boolean;
  createStartupIdea: (idea: Partial<StartupIdea>) => void;
  requestMentorship: (mentorId: string) => void;
  addTrendToCareerMap: (trendId: string) => void;
  addTechTrendToCareerMap: (trendId: string) => void;
  markMailAsRead: (id: string) => void;
  deleteMail: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  revalidateSkill: (skillId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [profile, setProfile] = useState<StudentProfile>(initialStudentProfile);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [careerNodes, setCareerNodes] = useState<CareerNode[]>(initialCareerNodes);
  const [learningResources, setLearningResources] = useState<LearningResource[]>(initialLearningResources);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(initialAssessments);
  const [offlineBookings, setOfflineBookings] = useState<OfflineAssessmentBooking[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(initialOpportunities);
  const [trainForJobRoute, setTrainForJobRoute] = useState<TrainForJobRoute>(initialTrainForJobRoute);
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>(initialScholarships);
  const [institutions] = useState<InstitutionItem[]>(initialInstitutions);
  const [startupIdeas, setStartupIdeas] = useState<StartupIdea[]>(initialStartupIdeas);
  const [mentors, setMentors] = useState<MentorItem[]>(initialMentors);
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements);
  const [mailMessages, setMailMessages] = useState<MailMessage[]>(initialMailMessages);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [techTrends, setTechTrends] = useState<TechnologyTrend[]>(initialTechnologyTrends);

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

  const joinStartupTeam = (id: string): boolean => {
    const startup = startupIdeas.find((s) => s.id === id);
    if (!startup) return false;

    // Check Student eligibility against criteria
    // Student has Python (INDUSTRY_VERIFIED) and React (CERTIFICATE_VERIFIED or better)
    const meetsCriteria = true; // Karthik meets the AI Agriculture Assistant criteria!

    if (meetsCriteria) {
      setStartupIdeas((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                userJoinStatus: 'ACCEPTED',
                teamCountCurrent: s.teamCountCurrent + 1
              }
            : s
        )
      );

      // Add to Student Profile experiences!
      const newExp = {
        role: 'React Frontend Developer',
        startupName: startup.ideaTitle,
        duration: 'Current (4 Months Commitment)',
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
        description: `Joined ${startup.ideaTitle} founded by ${startup.founderName} as React Frontend Engineer.`,
        issuer: 'SkillBridge Startup Network',
        verified: true
      };
      setAchievements((prev) => [newAch, ...prev]);

      // Add welcome letter in Mailbox
      const mail: MailMessage = {
        id: `mail-start-${Date.now()}`,
        sender: `${startup.founderName} (${startup.ideaTitle})`,
        senderRole: 'Startup Founder',
        subject: `Welcome to the Team! You are officially on board as React Developer`,
        preview: `We reviewed your verified Python & React credentials and are thrilled to welcome you to ${startup.ideaTitle}.`,
        body: `Hi Karthik,\n\nI reviewed your SkillBridge profile, your verified credentials in Python and your practical React work.\n\nWe would love to have you on board as our React Frontend Developer for ${startup.ideaTitle}! Your task will be building the farmer-facing Telugu voice interface and crop pest advisory screen.\n\nThis experience has been credited directly to your SkillBridge Passport, Portfolio, and Career Map. Let's build something impactful together!`,
        timestamp: 'Just now',
        category: 'STARTUP',
        isRead: false,
        priority: 'HIGH',
        actionLabel: 'View Portfolio',
        actionView: 'portfolio'
      };
      setMailMessages((prev) => [mail, ...prev]);

      fireConfetti();
      showToast(`Accepted into ${startup.ideaTitle}! Experience added to Profile & Portfolio.`);
      return true;
    }
    return false;
  };

  const createStartupIdea = (idea: Partial<StartupIdea>) => {
    const newId = `startup-${Date.now()}`;
    const fullIdea: StartupIdea = {
      id: newId,
      founderName: profile.name,
      founderRole: 'Founder / Student Innovator',
      ideaTitle: idea.ideaTitle || 'New Innovation',
      problem: idea.problem || '',
      solution: idea.solution || '',
      category: idea.category || 'AI / ML',
      stage: idea.stage || 'Idea',
      location: idea.location || profile.location,
      teamCountCurrent: 1,
      teamCountTarget: idea.teamCountTarget || 4,
      skillsNeeded: idea.skillsNeeded || ['React', 'Backend'],
      fundingNeeded: idea.fundingNeeded || 'Grant Stage',
      visibility: idea.visibility || 'Public',
      likesCount: 1,
      isLiked: false,
      isSupported: false,
      eligibilityCriteria: [
        { requiredSkill: 'React', minEvidence: 'PRACTICAL_VERIFIED' }
      ],
      userJoinStatus: 'ACCEPTED',
      createdAt: 'Just now'
    };

    setStartupIdeas((prev) => [fullIdea, ...prev]);
    showToast('Your startup idea has been published to the Innovation Feed!');
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

  const deleteMail = (id: string) => {
    setMailMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Message deleted.');
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
        startupIdeas,
        mentors,
        achievements,
        mailMessages,
        notifications,
        techTrends,
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
        createStartupIdea,
        requestMentorship,
        addTrendToCareerMap,
        addTechTrendToCareerMap: addTrendToCareerMap,
        markMailAsRead,
        deleteMail,
        markNotificationAsRead,
        revalidateSkill
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
