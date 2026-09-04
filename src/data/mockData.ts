import {
  StudentProfile,
  SkillItem,
  CareerNode,
  LearningResource,
  AssessmentItem,
  OpportunityItem,
  TrainForJobRoute,
  ScholarshipItem,
  InstitutionItem,
  StartupIdea,
  MentorItem,
  SuccessJourneyItem,
  AchievementItem,
  MailMessage,
  AppNotification,
  TechnologyTrend
} from '../types';

export const initialStudentProfile: StudentProfile = {
  name: 'Karthik Peetla',
  degree: 'B.Sc. Computer Science Honours',
  institution: 'Sri Sai Baba National Degree College (DEMO INSTITUTION)',
  location: 'Anantapur, Andhra Pradesh',
  targetCareer: 'Full Stack Developer',
  careerReadiness: 72,
  readinessBreakdown: {
    skills: 75,
    assessment: 80,
    practical: 65,
    experience: 55,
    communication: 72,
    industryAlignment: 78
  },
  privacySettings: {
    profileVisibility: 'PUBLIC',
    certificateVisibility: true,
    employerAccess: true,
    contactSharing: false,
    mentorCommunication: true,
    startupParticipation: true
  },
  startupExperiences: []
};

export const initialSkills: SkillItem[] = [
  {
    id: 'skill-react',
    name: 'React',
    category: 'Frontend',
    currentLevel: 'Basic',
    requiredLevel: 'Advanced',
    gapPercentage: 35,
    gapSeverity: 'High',
    evidenceLevel: 'CERTIFICATE_VERIFIED',
    evidenceConfidence: 'MEDIUM',
    status: 'PENDING',
    lastVerifiedDate: '2026-06-15',
    revalidationDueDate: '2026-10-15',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 1,
    vivaScore: 68,
    certificatesCount: 1,
    description: 'Modern component-based frontend library, hooks, state management and virtual DOM.'
  },
  {
    id: 'skill-nodejs',
    name: 'Node.js',
    category: 'Backend',
    currentLevel: 'None',
    requiredLevel: 'Intermediate',
    gapPercentage: 80,
    gapSeverity: 'Critical',
    evidenceLevel: 'SELF_DECLARED',
    evidenceConfidence: 'LOW',
    status: 'UNVERIFIED',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 0,
    certificatesCount: 0,
    description: 'Server-side runtime environment for executing scalable asynchronous JavaScript backend services.'
  },
  {
    id: 'skill-dsa',
    name: 'DSA',
    category: 'Core CS',
    currentLevel: 'Basic',
    requiredLevel: 'Intermediate',
    gapPercentage: 40,
    gapSeverity: 'Medium',
    evidenceLevel: 'ASSESSMENT_PASSED',
    evidenceConfidence: 'MEDIUM',
    status: 'ASSESSED',
    lastVerifiedDate: '2026-07-20',
    revalidationDueDate: '2026-11-20',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 2,
    vivaScore: 74,
    certificatesCount: 1,
    description: 'Data structures, algorithmic time/space complexities, problem solving patterns.'
  },
  {
    id: 'skill-git',
    name: 'Git',
    category: 'Tools',
    currentLevel: 'Basic',
    requiredLevel: 'Intermediate',
    gapPercentage: 45,
    gapSeverity: 'Medium',
    evidenceLevel: 'SELF_DECLARED',
    evidenceConfidence: 'LOW',
    status: 'UNVERIFIED',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 1,
    certificatesCount: 0,
    description: 'Distributed version control, branching workflows, pull requests and merge resolution.'
  },
  {
    id: 'skill-python',
    name: 'Python',
    category: 'Backend',
    currentLevel: 'Advanced',
    requiredLevel: 'Intermediate',
    gapPercentage: 0,
    gapSeverity: 'None',
    evidenceLevel: 'INDUSTRY_VERIFIED',
    evidenceConfidence: 'HIGH',
    status: 'INDUSTRY_VERIFIED',
    lastVerifiedDate: '2026-05-10',
    revalidationDueDate: '2026-12-10',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 4,
    vivaScore: 92,
    offlineCenterName: 'SkillBridge Assessment Centre Anantapur',
    certificatesCount: 2,
    description: 'Object-oriented programming, data processing, backend APIs, and automation scripts.'
  },
  {
    id: 'skill-sql',
    name: 'SQL',
    category: 'Database',
    currentLevel: 'Intermediate',
    requiredLevel: 'Intermediate',
    gapPercentage: 10,
    gapSeverity: 'Low',
    evidenceLevel: 'OFFLINE_VERIFIED',
    evidenceConfidence: 'HIGH',
    status: 'OFFLINE_VERIFIED',
    lastVerifiedDate: '2026-04-18',
    revalidationDueDate: '2026-10-18',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 3,
    vivaScore: 88,
    offlineCenterName: 'Anantapur Testing Node',
    certificatesCount: 2,
    description: 'Relational data modeling, complex joins, indexing, transactions and query optimization.'
  },
  {
    id: 'skill-javascript',
    name: 'JavaScript',
    category: 'Frontend',
    currentLevel: 'Intermediate',
    requiredLevel: 'Intermediate',
    gapPercentage: 15,
    gapSeverity: 'Low',
    evidenceLevel: 'PRACTICAL_VERIFIED',
    evidenceConfidence: 'HIGH',
    status: 'PRACTICALLY_VERIFIED',
    lastVerifiedDate: '2025-09-20',
    revalidationDueDate: '2026-09-20',
    freshness: 'REVALIDATION_DUE',
    practicalProjectsCompleted: 3,
    vivaScore: 85,
    certificatesCount: 2,
    description: 'ES6+ syntax, asynchronous promises, DOM manipulation, event loop and modular design.'
  },
  {
    id: 'skill-html-css',
    name: 'HTML & CSS',
    category: 'Frontend',
    currentLevel: 'Advanced',
    requiredLevel: 'Intermediate',
    gapPercentage: 0,
    gapSeverity: 'None',
    evidenceLevel: 'INDUSTRY_VERIFIED',
    evidenceConfidence: 'HIGH',
    status: 'INDUSTRY_VERIFIED',
    lastVerifiedDate: '2026-03-12',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 5,
    vivaScore: 95,
    certificatesCount: 2,
    description: 'Semantic markup, accessible responsive design, modern flexbox and grid layouts.'
  },
  {
    id: 'skill-genai',
    name: 'Generative AI',
    category: 'Emerging Tech',
    currentLevel: 'Intermediate',
    requiredLevel: 'Basic',
    gapPercentage: 0,
    gapSeverity: 'None',
    evidenceLevel: 'PRACTICAL_VERIFIED',
    evidenceConfidence: 'HIGH',
    status: 'PRACTICALLY_VERIFIED',
    lastVerifiedDate: '2026-08-05',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 2,
    vivaScore: 89,
    certificatesCount: 1,
    description: 'LLM integration, prompt engineering, agent orchestration and RAG pipelines.'
  },
  {
    id: 'skill-c',
    name: 'C Programming',
    category: 'Core CS',
    currentLevel: 'Intermediate',
    requiredLevel: 'Basic',
    gapPercentage: 0,
    gapSeverity: 'None',
    evidenceLevel: 'OFFLINE_VERIFIED',
    evidenceConfidence: 'HIGH',
    status: 'OFFLINE_VERIFIED',
    lastVerifiedDate: '2026-02-14',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 3,
    vivaScore: 91,
    certificatesCount: 1,
    description: 'Memory allocation, pointers, low-level data structures and algorithmic efficiency.'
  },
  {
    id: 'skill-java',
    name: 'Java',
    category: 'Backend',
    currentLevel: 'Intermediate',
    requiredLevel: 'Intermediate',
    gapPercentage: 10,
    gapSeverity: 'Low',
    evidenceLevel: 'ASSESSMENT_PASSED',
    evidenceConfidence: 'MEDIUM',
    status: 'ASSESSED',
    lastVerifiedDate: '2026-04-02',
    freshness: 'CURRENT',
    practicalProjectsCompleted: 2,
    vivaScore: 80,
    certificatesCount: 1,
    description: 'OOP architecture, collections framework, multithreading and exception handling.'
  }
];

export const initialCareerNodes: CareerNode[] = [
  {
    id: 'node-foundation',
    title: 'FOUNDATION',
    subtitle: 'HTML, CSS & JavaScript Core',
    type: 'FOUNDATION',
    status: 'COMPLETED',
    progress: 100,
    skills: ['HTML & CSS', 'JavaScript'],
    evidenceState: 'INDUSTRY_VERIFIED',
    description: 'Verified mastery of semantic web building blocks and asynchronous browser environments.'
  },
  {
    id: 'node-frontend',
    title: 'FRONTEND',
    subtitle: 'React Component Architecture',
    type: 'FRONTEND',
    status: 'IN_PROGRESS',
    progress: 65,
    skills: ['React'],
    evidenceState: 'CERTIFICATE_VERIFIED',
    description: 'Identified 35% gap to reach Advanced production-grade capability. Complete practical defense.',
    recommendedLearningId: 'lr-react-fund',
    targetAssessmentId: 'assess-react-practical'
  },
  {
    id: 'node-backend',
    title: 'BACKEND',
    subtitle: 'Node.js & Express API Services',
    type: 'BACKEND',
    status: 'RECOMMENDED',
    progress: 20,
    skills: ['Node.js'],
    evidenceState: 'SELF_DECLARED',
    description: 'Critical gap: Zero verified backend runtime evidence. Needed for Full Stack eligibility.',
    recommendedLearningId: 'lr-node-backend',
    targetAssessmentId: 'assess-backend'
  },
  {
    id: 'node-database',
    title: 'DATABASE',
    subtitle: 'Relational SQL & Schema Design',
    type: 'DATABASE',
    status: 'COMPLETED',
    progress: 90,
    skills: ['SQL'],
    evidenceState: 'OFFLINE_VERIFIED',
    description: 'Passed offline practical examination at Anantapur Testing Node.'
  },
  {
    id: 'node-problem-solving',
    title: 'PROBLEM SOLVING',
    subtitle: 'Data Structures & Algorithms',
    type: 'PROBLEM_SOLVING',
    status: 'IN_PROGRESS',
    progress: 60,
    skills: ['DSA'],
    evidenceState: 'ASSESSMENT_PASSED',
    description: 'Intermediate mastery needed for competitive technical industry screening.'
  },
  {
    id: 'node-tools',
    title: 'TOOLS & COLLAB',
    subtitle: 'Git & Professional GitHub Workflow',
    type: 'TOOLS',
    status: 'IN_PROGRESS',
    progress: 55,
    skills: ['Git'],
    evidenceState: 'SELF_DECLARED',
    description: 'Missing verified pull request collaboration and branch conflict resolution proof.'
  },
  {
    id: 'node-projects',
    title: 'PROJECT PORTFOLIO',
    subtitle: 'End-to-End Deployed Applications',
    type: 'PROJECTS',
    status: 'IN_PROGRESS',
    progress: 70,
    skills: ['React', 'Python', 'SQL', 'Generative AI'],
    evidenceState: 'PRACTICAL_VERIFIED',
    description: 'Two live deployed projects verified with public repositories and architecture walkthroughs.'
  },
  {
    id: 'node-practical-assessment',
    title: 'PRACTICAL ASSESSMENT',
    subtitle: 'Live Code Sandbox Verification',
    type: 'PRACTICAL_ASSESSMENT',
    status: 'IN_PROGRESS',
    progress: 65,
    skills: ['React', 'Python'],
    evidenceState: 'PRACTICAL_VERIFIED',
    description: 'Real-time timed coding challenges with behavioral edge case evaluation.'
  },
  {
    id: 'node-viva',
    title: 'VIVA / DEFENSE',
    subtitle: 'Code Cross-Questioning Oral Review',
    type: 'VIVA_DEFENSE',
    status: 'IN_PROGRESS',
    progress: 50,
    skills: ['React', 'Python', 'SQL'],
    evidenceState: 'VIVA_DEFENSE',
    description: 'Demonstrate deep conceptual rationale behind architectural choices.'
  },
  {
    id: 'node-offline-verification',
    title: 'OFFLINE VERIFICATION',
    subtitle: 'Invigilated Assessment Centre',
    type: 'OFFLINE_VERIFIED',
    status: 'RECOMMENDED',
    progress: 30,
    skills: ['Python', 'SQL'],
    evidenceState: 'OFFLINE_VERIFIED',
    description: 'Proctored physical testing centre evidence providing top-tier industry trust.'
  },
  {
    id: 'node-internship',
    title: 'INDUSTRY INTERNSHIP',
    subtitle: 'Demonstrated Team Performance',
    type: 'INTERNSHIP',
    status: 'RECOMMENDED',
    progress: 0,
    skills: ['Full Stack Developer'],
    evidenceState: 'INDUSTRY_VERIFIED',
    description: 'Complete 3-month stipend internship with verified company mentor sign-off.'
  },
  {
    id: 'node-job',
    title: 'FULL-TIME JOB',
    subtitle: 'Full Stack Software Engineer',
    type: 'JOB',
    status: 'LOCKED',
    progress: 0,
    skills: ['Full Stack Developer'],
    evidenceState: 'REAL_PERFORMANCE',
    description: 'Target career outcome unlocked at 85%+ verified capability score.'
  }
];

export const initialLearningResources: LearningResource[] = [
  {
    id: 'lr-react-fund',
    title: 'React 19 & Modern Hooks Mastery',
    skill: 'React',
    level: 'Intermediate',
    mode: 'Online',
    type: 'FREE_ONLINE',
    provider: 'OpenWeb Dev Academy (DEMO)',
    isGovernment: false,
    duration: '18 Hours',
    rating: 4.8,
    reviewsCount: 1240,
    price: 'Free',
    isFree: true,
    practicalTraining: true,
    industryAlignment: 94,
    verificationStatus: 'Evidence-Accredited Course',
    whyRecommended: 'Your Career Map identified a 35% React capability gap for Full Stack Developer target.',
    skillGapAddressed: 'React state lifecycle, memoization, custom hooks, context architecture',
    syllabus: [
      'Component Architecture & Prop Drilling Prevention',
      'useEffect Dependency Traps & StrictMode Cleanups',
      'Complex State with useReducer & Context',
      'Performance Profiling with React DevTools'
    ]
  },
  {
    id: 'lr-gov-fullstack',
    title: 'National Advanced Web Development Mission',
    skill: 'React',
    level: 'Intermediate',
    mode: 'Online',
    type: 'GOVERNMENT',
    provider: 'Public Digital Skills Initiative (DEMO PROGRAM)',
    isGovernment: true,
    duration: '6 Weeks',
    rating: 4.7,
    reviewsCount: 3820,
    price: 'Free (Subsidized)',
    isFree: true,
    practicalTraining: true,
    industryAlignment: 89,
    verificationStatus: 'Govt. Recognized Courseware',
    whyRecommended: 'Subsidized public curriculum with direct offline exam eligibility.',
    skillGapAddressed: 'Accessible frontend systems, WCAG AA compliance, state management',
    syllabus: [
      'Semantic Standards & Screen Reader Optimization',
      'React Design System Principles',
      'API Integration & Error Boundary Handling'
    ]
  },
  {
    id: 'lr-offline-anantapur',
    title: 'Full Stack Intensive Physical Bootlab',
    skill: 'React',
    level: 'Intermediate',
    mode: 'Offline',
    type: 'OFFLINE_CENTRE',
    provider: 'ABC Skill Development Centre (DEMO PROVIDER)',
    isGovernment: false,
    duration: '4 Months',
    rating: 4.6,
    reviewsCount: 420,
    price: '₹18,000',
    isFree: false,
    location: 'Court Road, Anantapur',
    practicalTraining: true,
    industryAlignment: 84,
    verificationStatus: 'Authorized Testing Node',
    whyRecommended: 'Local Anantapur physical centre with physical hardware lab and in-person mentors.',
    skillGapAddressed: 'Full stack project deployment, live server setup, offline mock vivas',
    syllabus: [
      'Hands-on Lab Coding (Daily 3 Hours)',
      'Backend Node.js & Express REST APIs',
      'Database Modeling with PostgreSQL & MongoDB',
      'Weekly In-Person Mock Technical Interviews'
    ]
  },
  {
    id: 'lr-node-backend',
    title: 'Production Node.js & Microservices Architecture',
    skill: 'Node.js',
    level: 'Beginner',
    mode: 'Online',
    type: 'PAID_ONLINE',
    provider: 'EngineersGuild Online (DEMO)',
    isGovernment: false,
    duration: '24 Hours',
    rating: 4.9,
    reviewsCount: 910,
    price: '₹1,499',
    isFree: false,
    practicalTraining: true,
    industryAlignment: 96,
    verificationStatus: 'Industry Endorsed',
    whyRecommended: 'Directly addresses your Critical 80% Node.js gap required by Junior Full Stack listings.',
    skillGapAddressed: 'Express router design, JWT authentication, streaming APIs, middleware chains',
    syllabus: [
      'Node Event Loop, Libuv & Non-blocking I/O',
      'Building Scalable RESTful Services with Express',
      'Authentication with JWT & Refresh Tokens',
      'Connecting Relational Databases with Connection Pooling'
    ]
  },
  {
    id: 'lr-git-collab',
    title: 'Git Team Workflows & Open Source Collaboration',
    skill: 'Git',
    level: 'Beginner',
    mode: 'Online',
    type: 'FREE_ONLINE',
    provider: 'FOSS Foundation India (DEMO)',
    isGovernment: false,
    duration: '8 Hours',
    rating: 4.9,
    reviewsCount: 2150,
    price: 'Free',
    isFree: true,
    practicalTraining: true,
    industryAlignment: 92,
    verificationStatus: 'Open Source Certified',
    whyRecommended: 'Qualifies you for Junior React Intern listings currently missing Git prerequisite.',
    skillGapAddressed: 'Branching strategies, interactive rebase, squashing, pull request reviews',
    syllabus: [
      'Git Under the Hood: Blobs, Trees & Commits',
      'Feature Branching & Trunk-Based Development',
      'Resolving 3-way Merge Conflicts',
      'Automating Workflows with GitHub Actions'
    ]
  },
  {
    id: 'lr-dsa-patterns',
    title: 'Algorithmic Problem Solving for Engineering Interviews',
    skill: 'DSA',
    level: 'Intermediate',
    mode: 'Online',
    type: 'PRACTICAL_TRAINING',
    provider: 'AlgoCore Institute (DEMO)',
    isGovernment: false,
    duration: '32 Hours',
    rating: 4.8,
    reviewsCount: 1650,
    price: '₹999',
    isFree: false,
    practicalTraining: true,
    industryAlignment: 91,
    verificationStatus: 'Proctored Coding System',
    whyRecommended: 'Closes your 40% DSA gap for Tier-1 technology product screenings.',
    skillGapAddressed: 'Sliding window, binary search on answer, tree traversals, dynamic programming',
    syllabus: [
      'Time & Space Complexity Proofs',
      'Two Pointers & Sliding Window Paradigms',
      'Graph Traversals: BFS, DFS & Topological Sort',
      'Top 50 Practical Industry Interview Problems'
    ]
  }
];

export const initialAssessments: AssessmentItem[] = [
  {
    id: 'assess-react-practical',
    title: 'React Practical Component Defense',
    skill: 'React',
    type: 'PRACTICAL_CODING',
    durationMinutes: 45,
    totalQuestions: 8,
    passingScore: 75,
    difficulty: 'Intermediate',
    description: 'Build and debug state synchronization, cleanup timers in useEffect, and answer viva follow-ups.',
    integrityFeatures: [
      'Timed dynamic question variants',
      'Live code execution & sandboxed test runner',
      'Follow-up architectural viva cross-questions',
      'Behavioral code integrity telemetry'
    ],
    offlineCenterAvailable: true
  },
  {
    id: 'assess-node-backend',
    title: 'Node.js REST API & Async Runtime Assessment',
    skill: 'Node.js',
    type: 'TECHNICAL',
    durationMinutes: 40,
    totalQuestions: 15,
    passingScore: 70,
    difficulty: 'Intermediate',
    description: 'Evaluates asynchronous error handling, middleware routing, and SQL connection pools.',
    integrityFeatures: [
      'Dynamic question shuffling',
      'Anti-copy timer constraints',
      'Code reasoning explanation check'
    ],
    offlineCenterAvailable: true
  },
  {
    id: 'assess-git-practical',
    title: 'Git Version Control & Branch Defense',
    skill: 'Git',
    type: 'PRACTICAL_CODING',
    durationMinutes: 30,
    totalQuestions: 6,
    passingScore: 70,
    difficulty: 'Beginner',
    description: 'Resolve merge conflicts, cherry-pick commits, and draft clean pull request descriptions.',
    integrityFeatures: [
      'Simulated terminal environment',
      'Git commit log verification'
    ],
    offlineCenterAvailable: false
  },
  {
    id: 'assess-python-verified',
    title: 'Python Core & Advanced Systems Assessment',
    skill: 'Python',
    type: 'OFFLINE_VERIFIED',
    durationMinutes: 90,
    totalQuestions: 25,
    passingScore: 80,
    difficulty: 'Advanced',
    description: 'Proctored physical testing centre exam with live coding and invigilator oral review.',
    integrityFeatures: [
      'Biometric ID verification at centre',
      'Invigilated closed-environment terminal',
      'Oral viva cross-questioning by senior examiner'
    ],
    passed: true,
    score: 92,
    dateAttempted: '2026-05-10',
    offlineCenterAvailable: true
  }
];

export const initialOfflineBookings: any[] = [];

export const initialOpportunities: OpportunityItem[] = [
  {
    id: 'opp-react-intern',
    title: 'Junior React Frontend Intern',
    companyName: 'NovaSoft Cloud Labs (DEMO COMPANY)',
    industry: 'Software & Cloud',
    location: 'Bengaluru (Hybrid)',
    workMode: 'Hybrid',
    type: 'INTERNSHIP',
    duration: '3 Months',
    stipendOrSalary: '₹15,000 / month',
    deadline: '25 September 2026',
    matchScore: 87,
    eligibilityStatus: 'PARTIALLY_ELIGIBLE',
    requiredSkills: [
      { skill: 'JavaScript', met: true },
      { skill: 'HTML & CSS', met: true },
      { skill: 'React', met: true },
      { skill: 'Git', met: false }
    ],
    missingSkills: ['Git'],
    trainingPathAvailable: true,
    isVerifiedCompany: true,
    description: 'Join our design engineering squad to build accessible customer-facing web consoles using React 19.',
    responsibilities: [
      'Implement responsive UI components from Figma design specs',
      'Optimize web performance metrics and Core Web Vitals',
      'Collaborate via Git pull requests with senior frontend leads'
    ],
    perks: ['Pre-placement offer (PPO) review', 'Flexible hybrid hours', 'SkillBridge verified certification stipend']
  },
  {
    id: 'opp-ai-intern',
    title: 'AI & Automation Engineering Intern',
    companyName: 'Agrismart Technologies (DEMO COMPANY)',
    industry: 'AI / Agritech',
    location: 'Hyderabad (Remote)',
    workMode: 'Remote',
    type: 'INTERNSHIP',
    duration: '4 Months',
    stipendOrSalary: '₹18,000 / month',
    deadline: '30 September 2026',
    matchScore: 92,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Python', met: true },
      { skill: 'Generative AI', met: true },
      { skill: 'SQL', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    description: 'Work on predictive crop yield intelligence models and LLM-assisted regional language farmer query assistants.',
    responsibilities: [
      'Write clean Python data wrangling pipelines',
      'Integrate GenAI APIs for multimodal query synthesis',
      'Test inference latency and validate ground-truth accuracy'
    ],
    perks: ['Work on real farmer community impact', '100% remote work stipend', 'Direct mentorship from ML leads']
  },
  {
    id: 'opp-fullstack-dev',
    title: 'Junior Full Stack Developer',
    companyName: 'CloudScale Systems (DEMO COMPANY)',
    industry: 'Enterprise Software',
    location: 'Bengaluru (On-Site)',
    workMode: 'On-Site',
    type: 'FULL_TIME',
    stipendOrSalary: '₹6.5 - ₹8.0 LPA',
    deadline: '15 October 2026',
    matchScore: 71,
    eligibilityStatus: 'NOT_YET_ELIGIBLE',
    requiredSkills: [
      { skill: 'JavaScript', met: true },
      { skill: 'SQL', met: true },
      { skill: 'React', met: true },
      { skill: 'Node.js', met: false },
      { skill: 'Git', met: false }
    ],
    missingSkills: ['Node.js', 'Git'],
    trainingPathAvailable: true,
    isVerifiedCompany: true,
    description: 'Fast-growing cloud orchestration product company seeking disciplined junior developers with verified evidence.',
    responsibilities: [
      'Develop robust REST API endpoints in Node.js/Express',
      'Construct high-throughput database queries in PostgreSQL',
      'Maintain reliable React components with unit test coverage'
    ],
    perks: ['Health insurance coverage', 'Annual learning grant ₹25,000', 'Provident fund & performance bonus']
  },
  {
    id: 'opp-part-time-tech',
    title: 'Computer & Hardware Systems Technician',
    companyName: 'Anantapur Digital Support Hub (DEMO)',
    industry: 'IT & Hardware Services',
    location: 'Anantapur (On-Site)',
    workMode: 'On-Site',
    type: 'PART_TIME',
    duration: 'Flexible (Evening 4 PM - 8 PM)',
    stipendOrSalary: '₹8,000 / month',
    deadline: 'Rolling Admission',
    matchScore: 89,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'C Programming', met: true },
      { skill: 'Computer Science Fundamentals', met: true },
      { skill: 'Python', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    description: 'Earn while you learn! Perfect for college students in Anantapur seeking evening technical income.',
    responsibilities: [
      'Diagnose operating system issues, drivers, and network connectivity',
      'Assist local institutional computer labs with routine software maintenance',
      'Document support logs and guide college staff on technical workflows'
    ],
    perks: ['Evening shift that does not collide with college hours', 'Centrally located in Anantapur', 'Certificate of practical technical service']
  },
  {
    id: 'opp-part-time-web',
    title: 'Web Developer Assistant',
    companyName: 'Rayalaseema Digital Media (DEMO)',
    industry: 'Digital Marketing & Web',
    location: 'Anantapur (Hybrid)',
    workMode: 'Hybrid',
    type: 'PART_TIME',
    duration: '15 Hours / Week',
    stipendOrSalary: '₹9,500 / month',
    deadline: '28 September 2026',
    matchScore: 94,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'HTML & CSS', met: true },
      { skill: 'JavaScript', met: true },
      { skill: 'SQL', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    description: 'Maintain customer landing pages, configure local business forms, and optimize database inquiries.',
    responsibilities: [
      'Update responsive landing pages for regional businesses',
      'Integrate simple contact form webhooks and SQL logging',
      'Perform monthly mobile responsiveness checks'
    ],
    perks: ['Flexible weekly hour distribution', 'Direct customer interaction experience', 'Immediate monthly compensation']
  }
];

export const initialTrainForJobRoute: TrainForJobRoute = {
  jobId: 'opp-fullstack-dev',
  jobTitle: 'Junior Full Stack Developer',
  companyName: 'CloudScale Systems (DEMO COMPANY)',
  targetSkills: ['Node.js', 'Git', 'React', 'SQL', 'Backend Architecture'],
  overallProgress: 35,
  isInterviewReady: false,
  steps: [
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Node.js Core & REST API Fundamentals',
      description: 'Complete verified learning module on asynchronous Express routes and middleware.',
      skill: 'Node.js',
      type: 'LEARNING',
      completed: false
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Git Branching & Collaborative Workflow',
      description: 'Demonstrate clean feature branch pull request and conflict resolution.',
      skill: 'Git',
      type: 'LEARNING',
      completed: false
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'Full Stack Integration Capstone Project',
      description: 'Build and deploy a React + Node.js + SQL application with authenticated routes.',
      skill: 'Full Stack',
      type: 'PROJECT',
      completed: false
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Practical Coding Assessment',
      description: 'Solve timed backend debugging scenarios and API performance optimizations.',
      skill: 'Node.js',
      type: 'PRACTICAL_ASSESSMENT',
      completed: false
    },
    {
      id: 'step-5',
      stepNumber: 5,
      title: 'Architecture Viva & Defense',
      description: 'Defend database schema choices, indexing tradeoffs, and state management.',
      skill: 'Full Stack',
      type: 'VIVA',
      completed: false
    },
    {
      id: 'step-6',
      stepNumber: 6,
      title: 'Offline Center Verification',
      description: 'Take the proctored test at SkillBridge Assessment Centre Anantapur.',
      skill: 'Node.js & React',
      type: 'OFFLINE_VERIFY',
      completed: false
    },
    {
      id: 'step-7',
      stepNumber: 7,
      title: 'Guaranteed Company Technical Interview',
      description: 'Direct fast-track interview slot with CloudScale Systems engineering leads.',
      skill: 'Career Outcome',
      type: 'INTERVIEW_ELIGIBLE',
      completed: false
    }
  ]
};

export const initialScholarships: ScholarshipItem[] = [
  {
    id: 'sch-skill-dev',
    title: 'National Skill Development Assistance Program',
    provider: 'Public Youth Empowerment Council (DEMO PROGRAM)',
    category: 'GOVERNMENT',
    benefitAmount: 'Up to ₹15,000 for verified course fees',
    educationRequirement: 'Undergraduate student in Science / Technology / Arts',
    incomeLimit: 'Family income under ₹3.5 Lakhs / year',
    locationScope: 'Andhra Pradesh & Nationwide',
    deadline: '30 September 2026',
    eligibilityStatus: 'PARTIALLY_ELIGIBLE',
    requirements: [
      { label: 'Undergraduate student enrolled in recognized degree college', met: true },
      { label: 'Enrolled in accredited STEM or Computer Science degree', met: true },
      { label: 'Active Career Map with identified skill gaps', met: true },
      { label: 'Family Income Certificate uploaded for current fiscal year', met: false }
    ],
    missingRequirementDesc: 'Upload your verified Family Income Certificate to finalize eligibility.',
    whyRecommended: 'Can fully subsidize your offline bootlab or advanced certification testing fees.',
    requiredDocuments: ['College Bonafide Certificate', 'Income Certificate', 'Aadhaar / ID Card', 'Latest Semester Marks Card']
  },
  {
    id: 'sch-ap-merit',
    title: 'Rayalaseema Tech Innovation Merit Award',
    provider: 'Regional Tech Founders Alliance (DEMO)',
    category: 'CSR',
    benefitAmount: '₹25,000 one-time financial grant + laptop assistance',
    educationRequirement: 'B.Sc. / BCA / B.Tech Computer Science student in Rayalaseema region',
    locationScope: 'Anantapur, Kurnool, Kadapa, Chittoor, Tirupati',
    deadline: '10 October 2026',
    eligibilityStatus: 'ELIGIBLE',
    requirements: [
      { label: 'Resident or studying in Rayalaseema district (Anantapur verified)', met: true },
      { label: 'Overall academic score above 70% in college coursework', met: true },
      { label: 'At least 2 verified practical coding achievements', met: true }
    ],
    whyRecommended: 'You match all geographical and academic prerequisites.',
    requiredDocuments: ['College ID', 'Semester Grade Sheet', 'SkillBridge Verified Skill Passport']
  },
  {
    id: 'sch-csr-girls-boys',
    title: 'Future Systems Engineer Fellowship',
    provider: 'Apex Global Foundation CSR (DEMO)',
    category: 'PRIVATE',
    benefitAmount: '₹30,000 / year stipend during graduation',
    educationRequirement: 'Final or Pre-final year undergraduate students',
    locationScope: 'All India',
    deadline: '20 October 2026',
    eligibilityStatus: 'ELIGIBLE',
    requirements: [
      { label: 'Final/Pre-final year student in recognized undergraduate program', met: true },
      { label: 'Passed at least one offline verified skill assessment (Python passed)', met: true },
      { label: 'Active participation in startup or open-source initiatives', met: true }
    ],
    whyRecommended: 'Your offline verified Python assessment at Anantapur fulfills key eligibility.',
    requiredDocuments: ['SkillBridge Assessment Scorecard', 'College Recommendation Letter', 'Bank Passbook Copy']
  }
];

export const initialInstitutions: InstitutionItem[] = [
  {
    id: 'inst-sai-baba',
    name: 'Sri Sai Baba National Degree College',
    type: 'College',
    location: 'Anantapur, Andhra Pradesh',
    mode: 'Offline',
    industryAlignment: 82,
    practicalTraining: true,
    rating: 4.5,
    coursesCount: 14,
    featuredCourse: 'B.Sc. Computer Science Honours (3/4 Year)',
    duration: '3 Years',
    fees: 'Government Regulated Nominal Fee',
    facultyHighlights: 'Experienced core computing faculty with dedicated algorithmic labs.',
    facilities: ['Computer Science Laboratory', 'Library & Digital Repository', 'Seminar Hall', 'Skill Development Cell'],
    studentOutcomes: '78% alumni transitioned to IT services, regional startups, and higher education.',
    industryPartners: ['Rayalaseema Tech Cluster (DEMO)', 'SkillBridge Verified Network'],
    demandVsCoverage: [
      {
        skill: 'React',
        industryDemand: 'HIGH',
        institutionCoverage: 'LOW',
        recommendation: 'Incorporate modern frontend single-page application framework into semester elective.'
      },
      {
        skill: 'Node.js',
        industryDemand: 'HIGH',
        institutionCoverage: 'LOW',
        recommendation: 'Upgrade traditional web programming lab to cover REST APIs and server-side JS.'
      },
      {
        skill: 'Python & SQL',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Maintain strong curriculum benchmark; expand to cloud-hosted database schemas.'
      },
      {
        skill: 'DSA & Algorithms',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'MEDIUM',
        recommendation: 'Organize weekly competitive coding contests on proctored sandboxes.'
      }
    ]
  },
  {
    id: 'inst-abc-skill',
    name: 'ABC Skill Development Centre (DEMO PROVIDER)',
    type: 'Training Centre',
    location: 'Anantapur, Andhra Pradesh',
    mode: 'Offline',
    industryAlignment: 88,
    practicalTraining: true,
    rating: 4.6,
    coursesCount: 6,
    featuredCourse: 'Full Stack Engineering Bootlab',
    duration: '4 Months',
    fees: '₹18,000 (Scholarship eligible)',
    facultyHighlights: 'Industry practitioners delivering weekend architectural masterclasses.',
    facilities: ['High-speed Fiber Lab', 'Mock Interview Defense Room', 'Physical Testing Terminal'],
    studentOutcomes: 'Direct pipeline to regional startups and Bengaluru entry-level tech openings.',
    industryPartners: ['NovaSoft Cloud Labs (DEMO)', 'CloudScale Systems (DEMO)'],
    demandVsCoverage: [
      {
        skill: 'React & Node.js',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Course structure is tightly aligned with current hiring demands.'
      },
      {
        skill: 'Git & Deployment',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'All students mandated to deliver 3 live deployed public web apps.'
      }
    ]
  },
  {
    id: 'inst-bengaluru-hub',
    name: 'Bengaluru Advanced Technology Institute (DEMO)',
    type: 'Skill Institute',
    location: 'Bengaluru, Karnataka',
    mode: 'Hybrid',
    industryAlignment: 95,
    practicalTraining: true,
    rating: 4.8,
    coursesCount: 18,
    featuredCourse: 'Cloud-Native & Distributed Systems Accelerator',
    duration: '6 Months',
    fees: '₹35,000 (Installments available)',
    facultyHighlights: 'Former senior staff engineers from prominent SaaS tech leaders.',
    facilities: ['Cloud Sandbox Credits', '24/7 Hacker Lounge', 'Venture Capital Connect Desk'],
    studentOutcomes: '91% placement rate with average entry compensation of 7.2 LPA.',
    industryPartners: ['Apex Global Systems (DEMO)', 'FinTech Next Labs (DEMO)'],
    demandVsCoverage: [
      {
        skill: 'Cloud Native & GenAI',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'HIGH',
        recommendation: 'Benchmark syllabus with emerging frontier AI engineering standards.'
      }
    ]
  }
];

export const initialStartupIdeas: StartupIdea[] = [
  {
    id: 'startup-agri-ai',
    founderName: 'Suresh Reddy',
    founderRole: 'Agronomist & Entrepreneur',
    ideaTitle: 'AI Agriculture Assistant (Kisan Mitra)',
    problem: 'Smallholder farmers in semi-arid Rayalaseema struggle with unpredictable pest outbreaks and lack localized soil crop advisory.',
    solution: 'Offline-first smartphone application that analyzes smartphone leaf images with lightweight vision models and provides regional Telugu voice guidance.',
    category: 'Agritech',
    stage: 'Prototype',
    location: 'Anantapur / Hyderabad',
    teamCountCurrent: 3,
    teamCountTarget: 5,
    skillsNeeded: ['React', 'Python', 'ML / Vision Models', 'Telugu Localization'],
    fundingNeeded: '₹5,00,000 (Grant Stage)',
    visibility: 'Public',
    likesCount: 38,
    isLiked: false,
    isSupported: false,
    eligibilityCriteria: [
      { requiredSkill: 'Python', minEvidence: 'INDUSTRY_VERIFIED' },
      { requiredSkill: 'React', minEvidence: 'CERTIFICATE_VERIFIED' }
    ],
    userJoinStatus: 'NONE',
    createdAt: '2 days ago'
  },
  {
    id: 'startup-mesh-edu',
    founderName: 'Pooja Sharma',
    founderRole: 'Student Innovator',
    ideaTitle: 'EduReach Offline Peer Mesh',
    problem: 'Students in rural colleges with frequent internet disruptions miss out on collaborative coding and assignment synchronization.',
    solution: 'Peer-to-peer Wi-Fi Direct and Bluetooth low-energy packet mesh network that syncs code repositories without active cellular internet.',
    category: 'Edtech',
    stage: 'Idea',
    location: 'Bengaluru',
    teamCountCurrent: 2,
    teamCountTarget: 4,
    skillsNeeded: ['Node.js', 'JavaScript', 'Networking / WebSockets', 'PWA'],
    fundingNeeded: '₹2,50,000 (Incubation)',
    visibility: 'Public',
    likesCount: 24,
    isLiked: false,
    isSupported: false,
    eligibilityCriteria: [
      { requiredSkill: 'JavaScript', minEvidence: 'PRACTICAL_VERIFIED' }
    ],
    userJoinStatus: 'NONE',
    createdAt: '4 days ago'
  },
  {
    id: 'startup-gig-bridge',
    founderName: 'Anil Kumar',
    founderRole: 'Product Builder',
    ideaTitle: 'CampusGig Local Work Exchange',
    problem: 'College students need verified skill-based part-time income to sustain tuition, while local small businesses lack affordable tech assistance.',
    solution: 'Skill-verified micro-task escrow marketplace connecting local shops with nearby college coders and designers.',
    category: 'SaaS',
    stage: 'MVP Built',
    location: 'Anantapur',
    teamCountCurrent: 4,
    teamCountTarget: 6,
    skillsNeeded: ['React', 'SQL', 'Payment Gateway Integration'],
    fundingNeeded: '₹8,00,000 (Angel Seed)',
    visibility: 'Public',
    likesCount: 52,
    isLiked: true,
    isSupported: true,
    eligibilityCriteria: [
      { requiredSkill: 'SQL', minEvidence: 'OFFLINE_VERIFIED' }
    ],
    userJoinStatus: 'NONE',
    createdAt: '1 week ago'
  }
];

export const initialMentors: MentorItem[] = [
  {
    id: 'mentor-1',
    name: 'Radhika Nair',
    title: 'Staff Frontend Architect',
    company: 'NovaSoft Global (DEMO)',
    industry: 'Software & Cloud',
    skills: ['React', 'TypeScript', 'Frontend Architecture', 'Career Navigation'],
    topics: ['System Design for UI', 'Cracking First Tech Role', 'Transition from Tier-3 College'],
    experienceYears: 11,
    location: 'Bengaluru',
    availability: 'Available for 1:1 Viva Review (2 Slots Left)',
    verified: true,
    sessionsCompleted: 48,
    rating: 4.9
  },
  {
    id: 'mentor-2',
    name: 'Venkatesh Babu',
    title: 'Lead Cloud & Backend Engineer',
    company: 'FinScale Technologies (DEMO)',
    industry: 'Fintech & Cloud',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Microservices'],
    topics: ['High Concurrency APIs', 'Database Optimization', 'Preparing for Engineering Vivas'],
    experienceYears: 9,
    location: 'Hyderabad',
    availability: 'Weekend Mock Interviews',
    verified: true,
    sessionsCompleted: 34,
    rating: 4.8
  },
  {
    id: 'mentor-3',
    name: 'Dr. Meera Chandrasekhar',
    title: 'Director of AI Research',
    company: 'DeepAgri Labs (DEMO)',
    industry: 'AI & Data Science',
    skills: ['Python', 'Generative AI', 'DSA', 'Research Papers'],
    topics: ['Building AI Startups', 'Practical Machine Learning', 'Research to Product'],
    experienceYears: 14,
    location: 'Chennai / Remote',
    availability: 'Bi-weekly Mentorship Sessions',
    verified: true,
    sessionsCompleted: 62,
    rating: 5.0
  }
];

export const initialSuccessJourneys: SuccessJourneyItem[] = [
  {
    id: 'journey-anand',
    studentName: 'Anand R.',
    initialBackground: 'B.Sc. Computer Science from SSBN College, Anantapur',
    targetRole: 'Full Stack Software Engineer',
    currentCompany: 'NovaSoft Cloud Labs (DEMO)',
    currentPackage: '₹8.4 LPA',
    journeySteps: [
      'Started with basic C & Python in degree college with no prior industrial exposure',
      'Used SkillBridge Career Map to identify missing React, Node.js and Git foundations',
      'Completed verified online learning and took physical proctored assessment in Anantapur',
      'Joined an Agritech student startup as React Developer to prove team collaboration',
      'Skill Passport evidence reached HIGH confidence, unlocking direct company interview slot'
    ],
    keyAdvice: 'Do not collect hollow certificates. Book the offline verified test and join a real student startup team. That evidence is unbeatable.',
    location: 'Anantapur → Bengaluru'
  },
  {
    id: 'journey-sneha',
    studentName: 'Sneha Latha',
    initialBackground: 'BCA from Regional Govt College, Kurnool',
    targetRole: 'Data & Backend Specialist',
    currentCompany: 'FinScale Enterprise (DEMO)',
    currentPackage: '₹7.8 LPA',
    journeySteps: [
      'Mastered SQL and Python through offline verified testing',
      'Earned ₹8,500/month as part-time Computer Technician while studying',
      'Completed "Train For This Job" route for FinScale entry opening',
      'Cleared oral architecture defense with flying colors'
    ],
    keyAdvice: 'SkillBridge part-time jobs allowed me to support my family while developing verified software credentials.',
    location: 'Kurnool → Hyderabad'
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-python-offline',
    title: 'Python Proctored Offline Certification',
    category: 'SKILL_VERIFICATION',
    date: '10 May 2026',
    skillAssociated: 'Python',
    evidenceConfidence: 'HIGH',
    evidenceBadges: ['Invigilated Exam Passed', 'Score: 92%', 'Oral Viva Defended', 'Physical Centre Verified'],
    description: 'Successfully completed proctored practical examination and code oral defense at SkillBridge Assessment Centre Anantapur.',
    issuer: 'SkillBridge Assessment Board',
    verified: true
  },
  {
    id: 'ach-sql-practical',
    title: 'Relational Database Design & Query Defense',
    category: 'ASSESSMENT',
    date: '18 April 2026',
    skillAssociated: 'SQL',
    evidenceConfidence: 'HIGH',
    evidenceBadges: ['Complex Joins Verified', 'Score: 88%', 'Offline Testing Node'],
    description: 'Designed normalized schemas, optimized indexing strategies, and defended query plans under timed live constraints.',
    issuer: 'National Technology Testing Node',
    verified: true
  },
  {
    id: 'ach-genai-app',
    title: 'Farmer Voice Advisory AI Prototype',
    category: 'PROJECT',
    date: '05 August 2026',
    skillAssociated: 'Generative AI',
    evidenceConfidence: 'HIGH',
    evidenceBadges: ['Code Repository Public', 'API Latency Benchmarked', 'Architecture Reviewed'],
    description: 'Engineered multilingual query assistant synthesizing crop advisory prompts with verified accuracy.',
    issuer: 'SkillBridge Project Verification Board',
    verified: true
  }
];

export const initialMailMessages: MailMessage[] = [
  {
    id: 'mail-1',
    sender: 'SkillBridge Assessment Board',
    senderRole: 'Assessment Directorate',
    subject: 'Your Python Offline Assessment Result is Verified',
    preview: 'Congratulations Karthik! You achieved 92% in the physical proctored examination at Anantapur.',
    body: 'Dear Karthik Peetla,\n\nWe are pleased to inform you that your proctored offline practical assessment in Python Programming (Attempted 10 May 2026 at SkillBridge Assessment Centre, Court Road, Anantapur) has been officially reviewed and authenticated.\n\nScore Breakdown:\n- Practical Code Sandbox: 94%\n- Invigilator Viva / Oral Defense: 90%\n- Overall Capability Score: 92%\n\nYour Skill Passport has been upgraded to INDUSTRY VERIFIED with HIGH evidence confidence. Multiple hiring companies have been notified of your verified credential.',
    timestamp: 'Yesterday at 4:30 PM',
    category: 'ASSESSMENT',
    isRead: false,
    priority: 'HIGH',
    actionLabel: 'View Skill Passport',
    actionView: 'skills'
  },
  {
    id: 'mail-2',
    sender: 'NovaSoft Cloud Labs (DEMO)',
    senderRole: 'University Talent Acquisition',
    subject: 'Invitation to Apply: Junior React Intern Opening',
    preview: 'Our engineering lead noticed your verified JavaScript and Python credentials on the SkillBridge ecosystem.',
    body: 'Hello Karthik,\n\nWe came across your verified student profile on SkillBridge AI. Your strong background in computer science and proctored offline credentials caught our attention.\n\nWe have an active opening for a Junior React Intern (₹15,000/month stipend). Your current match score is 87%. Once you close your Git prerequisite, your application will be fast-tracked to direct mentor interview.\n\nWe look forward to reviewing your portfolio.',
    timestamp: '2 days ago',
    category: 'INDUSTRY',
    isRead: true,
    priority: 'NORMAL',
    actionLabel: 'View Opportunity',
    actionView: 'opportunities'
  },
  {
    id: 'mail-3',
    sender: 'SkillBridge Career Engine',
    senderRole: 'AI Career Guidance',
    subject: 'Career Map Intelligence: Top 3 Missing Milestones for Full Stack Target',
    preview: 'Your current readiness is 72%. Complete React Fundamentals and Node.js to reach 85%+ readiness.',
    body: 'Hi Karthik,\n\nHere is your personalized weekly Career Map digest for your target goal: Full Stack Developer.\n\nKey Opportunities Awaiting You:\n- 3 Stipend Internships require verified React capability\n- CloudScale Systems has launched a "Train For This Job" route with guaranteed interview eligibility\n- Skill Development Assistance Scholarship (up to ₹15,000) requires income proof upload\n\nTake action today by beginning the React Practical Defense assessment or booking an offline test slot.',
    timestamp: '3 days ago',
    category: 'CAREER',
    isRead: true,
    priority: 'NORMAL',
    actionLabel: 'Open Career Map',
    actionView: 'career-map'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Offline Assessment Slots Open',
    message: 'Dates available for React & Full Stack testing at Anantapur Assessment Centre (12, 18, 25 September 2026).',
    timestamp: '10 mins ago',
    category: 'ASSESSMENT',
    isRead: false,
    targetView: 'assessments'
  },
  {
    id: 'notif-2',
    title: 'Startup Seeking React Developer',
    message: 'AI Agriculture Assistant (Kisan Mitra) founder posted an opening matching your profile.',
    timestamp: '1 hour ago',
    category: 'STARTUP',
    isRead: false,
    targetView: 'startups'
  },
  {
    id: 'notif-3',
    title: 'Skill Revalidation Notice',
    message: 'JavaScript verification is due for revalidation within 30 days to retain Current status.',
    timestamp: '1 day ago',
    category: 'EVIDENCE',
    isRead: true,
    targetView: 'skills'
  },
  {
    id: 'notif-4',
    title: 'Part-Time Work Available',
    message: 'New evening Computer Technician role opened in Anantapur paying ₹8,000/month.',
    timestamp: '2 days ago',
    category: 'OPPORTUNITY',
    isRead: true,
    targetView: 'opportunities'
  }
];

export const initialTechnologyTrends: TechnologyTrend[] = [
  {
    id: 'trend-genai',
    name: 'Generative AI & Agentic Systems',
    category: 'Frontier AI',
    industryDemand: 'CRITICAL',
    growthRate: '+142% Year-over-Year',
    relevanceToStudentGoal: 'High industry value when integrated into full stack web applications via REST and streaming.',
    learningRoute: [
      'Prompt Engineering & Structured Outputs',
      'Function Calling & Tool Orchestration',
      'Retrieval-Augmented Generation (RAG)',
      'Offline Inference with Lightweight Models'
    ],
    addedToCareerMap: true
  },
  {
    id: 'trend-nextjs',
    name: 'Next.js & React Server Components',
    category: 'Modern Web Architecture',
    industryDemand: 'HIGH',
    growthRate: '+88% Demand in Startups',
    relevanceToStudentGoal: 'Direct extension of your React foundation into enterprise full stack applications.',
    learningRoute: [
      'Server vs Client Component Boundaries',
      'Server Actions & Zero-API Data Fetching',
      'Edge Middleware & Caching Strategies'
    ],
    addedToCareerMap: false
  },
  {
    id: 'trend-rust',
    name: 'Rust for High-Performance Systems',
    category: 'Systems & WebAssembly',
    industryDemand: 'SURGING',
    growthRate: '+65% Adoption in Core Infrastructure',
    relevanceToStudentGoal: 'Complements your C foundation with memory-safe modern systems engineering.',
    learningRoute: [
      'Borrow Checker & Ownership Mechanics',
      'Safe Concurrency Patterns',
      'Compiling Rust to WebAssembly (Wasm) for Web'
    ],
    addedToCareerMap: false
  },
  {
    id: 'trend-cloud-native',
    name: 'Cloud-Native Docker & Kubernetes',
    category: 'DevOps & Cloud',
    industryDemand: 'HIGH',
    growthRate: '+74% in Backend Requirements',
    relevanceToStudentGoal: 'Essential for containerizing full stack applications for production Cloud Run/AWS deployment.',
    learningRoute: [
      'Dockerfile Optimization & Multi-stage Builds',
      'Container Ingress & Port Forwarding',
      'Kubernetes Pod Scheduling & Services'
    ],
    addedToCareerMap: false
  }
];
