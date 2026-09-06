import {
  FacultyMemberItem,
  FacultyTrainingEnrollment,
  FacultyClassScheduleItem,
  StudentInterventionRecord,
  SyllabusGapItem
} from '../types';

export const initialFacultyMembers: FacultyMemberItem[] = [
  {
    id: 'fac-1',
    name: 'Dr. P. Ravindra Reddy',
    facultyId: 'FAC-CSE-0104',
    collegeName: 'SSBN Autonomous Degree College, Anantapur',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor & HOD',
    qualification: 'Ph.D. in Computer Science (SKU), M.Tech (JNTUA)',
    experienceYears: 14,
    subjectsTaught: ['Database Management Systems (DBMS)', 'Python Programming', 'Data Structures & Algorithms'],
    skills: [
      { skillName: 'Database Design & SQL', proficiencyScore: 88, level: 'STRONG', lastVerifiedDate: '2026-08-15', evidenceSource: 'Proctored Offline Defense', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Python Backend & Scripting', proficiencyScore: 82, level: 'STRONG', lastVerifiedDate: '2026-07-20', evidenceSource: 'Industry Immersion Track', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Cloud & Docker Architecture', proficiencyScore: 48, level: 'NEEDS_IMPROVEMENT', lastVerifiedDate: '2026-05-10', evidenceSource: 'Self Evaluation', isCurriculumRequired: false, isIndustryDemand: true },
      { skillName: 'Generative AI & LLM Pipelines', proficiencyScore: 62, level: 'DEVELOPING', lastVerifiedDate: '2026-08-01', evidenceSource: 'FDP Certification', isCurriculumRequired: false, isIndustryDemand: true }
    ],
    recommendedSkillsToDevelop: ['Docker & Kubernetes Containerization', 'Microservices API Design', 'Vector Database Indexing'],
    certifications: [
      'AWS Certified Solutions Architect - Associate',
      'NPTEL Elite Silver: Database Management Systems',
      'AICTE-ATAL FDP on Deep Learning Foundations'
    ],
    completedCoursesCount: 8,
    pendingCoursesCount: 1,
    industryTrainingCompleted: ['CloudScale Systems 4-Week Immersion', 'TCS Academic Liaison DBMS Lab'],
    facultyInternshipsCompleted: ['AP Agro-Industrial Data Pipeline Internship (2025)'],
    fdpParticipationCount: 6,
    attendancePercentage: 96,
    overallPerformanceRating: 4.8,
    performanceStatus: 'EXCELLING',
    offlineVerificationStatus: 'PRACTICALLY_VERIFIED',
    offlineTestRecords: [
      {
        id: 'off-test-1',
        skillName: 'Database Design & SQL Performance',
        testDate: '2026-08-15',
        evaluatorName: 'Dr. Sudhakar Rao',
        evaluatorOrg: 'CloudScale Systems Corporate Directorate',
        testType: 'LAB_PRACTICAL',
        scorePercent: 92,
        verdict: 'PASS',
        feedbackNotes: 'Exemplary query optimization defense; demonstrated live EXPLAIN query plan analysis on 10M-row table.'
      }
    ],
    subjectMetrics: [
      {
        subjectCode: 'CS-301',
        subjectName: 'Database Management Systems',
        semester: 'Semester 3 (2026)',
        studentsEnrolled: 120,
        studentsPassed: 106,
        studentsFailed: 14,
        passPercentage: 88.3,
        trend: 'IMPROVING',
        averageScore: 74
      },
      {
        subjectCode: 'CS-102',
        subjectName: 'Python Programming Lab',
        semester: 'Semester 1 (2026)',
        studentsEnrolled: 110,
        studentsPassed: 101,
        studentsFailed: 9,
        passPercentage: 91.8,
        trend: 'IMPROVING',
        averageScore: 78
      }
    ],
    complaints: []
  },
  {
    id: 'fac-2',
    name: 'Mrs. K. Sailaja Rani',
    facultyId: 'FAC-CSE-0219',
    collegeName: 'SSBN Autonomous Degree College, Anantapur',
    department: 'Computer Applications (BCA)',
    designation: 'Assistant Professor',
    qualification: 'M.C.A., M.Phil (Computer Science), (Ph.D. Ongoing)',
    experienceYears: 8,
    subjectsTaught: ['Web Technologies', 'Java & Object Oriented Programming', 'Operating Systems'],
    skills: [
      { skillName: 'HTML, CSS & JavaScript Fundamentals', proficiencyScore: 84, level: 'STRONG', lastVerifiedDate: '2026-06-18', evidenceSource: 'Curriculum Defense', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Java & OOP Design', proficiencyScore: 76, level: 'STRONG', lastVerifiedDate: '2026-05-12', evidenceSource: 'NPTEL Proctored Exam', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Modern React & Component State', proficiencyScore: 54, level: 'DEVELOPING', lastVerifiedDate: '2026-08-10', evidenceSource: 'Online Boot Camp', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Git Version Control & CI/CD', proficiencyScore: 42, level: 'NEEDS_IMPROVEMENT', lastVerifiedDate: '2026-04-05', evidenceSource: 'Self Evaluation', isCurriculumRequired: true, isIndustryDemand: true }
    ],
    recommendedSkillsToDevelop: ['React 18 & State Architecture', 'Git Collaboration & Pull Request Review', 'RESTful API Integration'],
    certifications: [
      'Oracle Certified Professional: Java SE Programmer',
      'Infosys Springboard Full Stack Educator Certificate'
    ],
    completedCoursesCount: 5,
    pendingCoursesCount: 2,
    industryTrainingCompleted: ['NovaSoft Frontend Educator Workshop'],
    facultyInternshipsCompleted: [],
    fdpParticipationCount: 4,
    attendancePercentage: 93,
    overallPerformanceRating: 4.4,
    performanceStatus: 'SATISFACTORY',
    offlineVerificationStatus: 'PENDING_OFFLINE_TEST',
    offlineTestRecords: [
      {
        id: 'off-test-2',
        skillName: 'Modern React & Component State',
        testDate: '2026-09-20',
        evaluatorName: 'Pending Industry Examiner Appointment',
        evaluatorOrg: 'SkillBridge Verification Directorate',
        testType: 'LAB_PRACTICAL',
        scorePercent: 0,
        verdict: 'RETEST_RECOMMENDED',
        feedbackNotes: 'Scheduled for in-person coding assessment at SSBN Computer Lab 2.'
      }
    ],
    subjectMetrics: [
      {
        subjectCode: 'CA-204',
        subjectName: 'Web Technologies & Scripting',
        semester: 'Semester 4 (2026)',
        studentsEnrolled: 95,
        studentsPassed: 78,
        studentsFailed: 17,
        passPercentage: 82.1,
        trend: 'STABLE',
        averageScore: 68
      }
    ],
    complaints: [
      {
        id: 'comp-1',
        category: 'CURRICULUM_DELIVERY',
        filedByRole: 'STUDENT_REP',
        dateReported: '2026-08-12',
        summary: 'Syllabus relies heavily on static HTML/CSS theory without practical hands-on React workshop sessions.',
        evidenceNotes: 'Students requested 2 weekly lab hours dedicated to modern frontend frameworks.',
        status: 'UNDER_REVIEW',
        resolutionDecision: 'HOD approved 4 Saturday lab workshops led by industry-certified guest mentor.'
      }
    ]
  },
  {
    id: 'fac-3',
    name: 'Dr. M. Sreenivasulu',
    facultyId: 'FAC-IT-0089',
    collegeName: 'SSBN Autonomous Degree College, Anantapur',
    department: 'Electronics & Computer Science',
    designation: 'Professor & Dean of Academics',
    qualification: 'Ph.D. (JNTUA), M.Tech (Embedded Systems), B.Tech (ECE)',
    experienceYears: 21,
    subjectsTaught: ['Microcontrollers & IoT', 'Computer Networks', 'Embedded C'],
    skills: [
      { skillName: 'Embedded C & Microcontrollers', proficiencyScore: 94, level: 'STRONG', lastVerifiedDate: '2026-07-14', evidenceSource: 'Proctored Offline Defense', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Computer Networking (TCP/IP & Routing)', proficiencyScore: 86, level: 'STRONG', lastVerifiedDate: '2026-08-22', evidenceSource: 'Cisco Certified Instructor', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'IoT Cloud Protocols (MQTT & REST)', proficiencyScore: 78, level: 'STRONG', lastVerifiedDate: '2026-08-05', evidenceSource: 'Industry Project Defense', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Industrial Modbus & RS485 Fieldbus', proficiencyScore: 72, level: 'DEVELOPING', lastVerifiedDate: '2026-06-11', evidenceSource: 'MSME Consultancy Track', isCurriculumRequired: false, isIndustryDemand: true }
    ],
    recommendedSkillsToDevelop: ['Edge AI / TinyML on Microcontrollers', '5G NR Protocols', 'Cybersecurity for OT/ICS'],
    certifications: [
      'Cisco CCNA Certified Network Associate',
      'Texas Instruments IoT Educator Fellow',
      'AICTE National Master Trainer Credential'
    ],
    completedCoursesCount: 12,
    pendingCoursesCount: 0,
    industryTrainingCompleted: ['Srinivasa Solar Rural Automation Telemetry Immersion', 'Qualcomm IoT Faculty Series'],
    facultyInternshipsCompleted: ['Rayalaseema Coldchain Sensor Network R&D'],
    fdpParticipationCount: 11,
    attendancePercentage: 98,
    overallPerformanceRating: 4.9,
    performanceStatus: 'EXCELLING',
    offlineVerificationStatus: 'PRACTICALLY_VERIFIED',
    offlineTestRecords: [
      {
        id: 'off-test-3',
        skillName: 'IoT Cloud Protocols & Embedded C',
        testDate: '2026-07-14',
        evaluatorName: 'Er. C. Harikrishna',
        evaluatorOrg: 'AP Electronics & Semiconductor Mission',
        testType: 'LAB_PRACTICAL',
        scorePercent: 96,
        verdict: 'PASS',
        feedbackNotes: 'Built complete working telemetry node streaming agricultural soil moisture metrics with zero packet drop.'
      }
    ],
    subjectMetrics: [
      {
        subjectCode: 'EC-402',
        subjectName: 'Microcontrollers & IoT Systems',
        semester: 'Semester 4 (2026)',
        studentsEnrolled: 60,
        studentsPassed: 56,
        studentsFailed: 4,
        passPercentage: 93.3,
        trend: 'IMPROVING',
        averageScore: 81
      }
    ],
    complaints: []
  },
  {
    id: 'fac-4',
    name: 'Mr. B. Vamsi Krishna',
    facultyId: 'FAC-COMM-0312',
    collegeName: 'SSBN Autonomous Degree College, Anantapur',
    department: 'Commerce & Computer Applications',
    designation: 'Assistant Professor',
    qualification: 'M.Com, M.B.A (Finance), UGC-NET Qualified',
    experienceYears: 5,
    subjectsTaught: ['Financial Accounting & Tally Prime', 'E-Commerce Applications', 'Business Data Analytics'],
    skills: [
      { skillName: 'Tally Prime & GST Accounting', proficiencyScore: 90, level: 'STRONG', lastVerifiedDate: '2026-07-28', evidenceSource: 'Tally Certified Educator', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Advanced Excel & Financial Modeling', proficiencyScore: 80, level: 'STRONG', lastVerifiedDate: '2026-06-30', evidenceSource: 'NPTEL Proctored Exam', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'SQL for Business Analytics', proficiencyScore: 45, level: 'NEEDS_IMPROVEMENT', lastVerifiedDate: '2026-04-15', evidenceSource: 'Self Evaluation', isCurriculumRequired: true, isIndustryDemand: true },
      { skillName: 'Power BI & Visual Dashboards', proficiencyScore: 50, level: 'DEVELOPING', lastVerifiedDate: '2026-08-18', evidenceSource: 'Online Certificate', isCurriculumRequired: false, isIndustryDemand: true }
    ],
    recommendedSkillsToDevelop: ['Postgres SQL Queries for Financial Auditing', 'Power BI Automated Reporting', 'Python for Finance Automation'],
    certifications: [
      'Tally Essential Comprehensive Certified',
      'Microsoft Certified: Excel Associate'
    ],
    completedCoursesCount: 4,
    pendingCoursesCount: 2,
    industryTrainingCompleted: ['Anantapur District Commercial Tax Accountants Workshop'],
    facultyInternshipsCompleted: [],
    fdpParticipationCount: 3,
    attendancePercentage: 91,
    overallPerformanceRating: 4.2,
    performanceStatus: 'REQUIRES_DEVELOPMENT',
    offlineVerificationStatus: 'PENDING_OFFLINE_TEST',
    offlineTestRecords: [],
    subjectMetrics: [
      {
        subjectCode: 'COM-201',
        subjectName: 'Computerized Accounting & Tally',
        semester: 'Semester 2 (2026)',
        studentsEnrolled: 88,
        studentsPassed: 74,
        studentsFailed: 14,
        passPercentage: 84.0,
        trend: 'STABLE',
        averageScore: 66
      }
    ],
    complaints: []
  }
];

export const initialFacultyTrainingEnrollments: FacultyTrainingEnrollment[] = [
  {
    id: 'fte-1',
    facultyId: 'fac-1',
    facultyName: 'Dr. P. Ravindra Reddy',
    collegeName: 'SSBN Autonomous College, Anantapur',
    department: 'Computer Science',
    subject: 'Database Systems & Cloud Systems',
    currentSkills: ['SQL', 'Query Optimization', 'Python'],
    targetSkill: 'Docker & Kubernetes Containerization',
    skillLevel: 'INTERMEDIATE',
    trainingProgramName: 'Cloud-Native Enterprise Systems Immersion Track',
    trainerName: 'Dr. Sudhakar Rao',
    trainerCompany: 'CloudScale Systems Labs',
    batch: 'Batch 2026-A (Rayalaseema)',
    classTiming: 'Saturdays 10:00 AM - 1:00 PM',
    classLocation: 'Hybrid / CloudScale Virtual Lab Pod 4',
    mode: 'ONLINE',
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    attendancePercent: 94,
    courseProgressPercent: 78,
    assessmentStatus: 'IN_PROGRESS',
    certificationStatus: 'PENDING_OFFLINE_TEST'
  },
  {
    id: 'fte-2',
    facultyId: 'fac-2',
    facultyName: 'Mrs. K. Sailaja Rani',
    collegeName: 'SSBN Autonomous College, Anantapur',
    department: 'Computer Applications',
    subject: 'Web Technologies',
    currentSkills: ['HTML', 'CSS', 'JavaScript'],
    targetSkill: 'React 18 & State Machine Architecture',
    skillLevel: 'INTERMEDIATE',
    trainingProgramName: 'Modern Full Stack Educator Bootcamp',
    trainerName: 'Suresh Varma',
    trainerCompany: 'NovaSoft Cloud Labs',
    batch: 'Batch 2026-Web-B',
    classTiming: 'Fridays & Saturdays 3:00 PM - 5:30 PM',
    classLocation: 'SSBN Central Computer Lab 2',
    mode: 'OFFLINE',
    startDate: '2026-08-15',
    endDate: '2026-10-15',
    attendancePercent: 90,
    courseProgressPercent: 65,
    assessmentStatus: 'IN_PROGRESS',
    certificationStatus: 'PENDING_OFFLINE_TEST'
  },
  {
    id: 'fte-3',
    facultyId: 'fac-3',
    facultyName: 'Dr. M. Sreenivasulu',
    collegeName: 'SSBN Autonomous College, Anantapur',
    department: 'Electronics & IoT',
    subject: 'Microcontrollers & IoT',
    currentSkills: ['Embedded C', 'Microcontrollers', 'Sensors'],
    targetSkill: 'Edge AI & Low-Power LoRa Telemetry',
    skillLevel: 'ADVANCED',
    trainingProgramName: 'Agricultural IoT & Edge Telemetry Fellowship',
    trainerName: 'Er. C. Harikrishna',
    trainerCompany: 'Srinivasa Solar & Rural Automation (MSME)',
    batch: 'Batch 2026-Agri-1',
    classTiming: 'Wednesdays 2:00 PM - 5:00 PM',
    classLocation: 'AIC-SKU Krishi Innovation Center',
    mode: 'OFFLINE',
    startDate: '2026-07-01',
    endDate: '2026-09-15',
    attendancePercent: 100,
    courseProgressPercent: 100,
    assessmentStatus: 'PASSED',
    certificationStatus: 'PRACTICALLY_VERIFIED'
  }
];

export const initialFacultyClassSchedules: FacultyClassScheduleItem[] = [
  {
    id: 'fcs-1',
    date: '2026-09-12',
    time: '10:00 AM - 1:00 PM',
    facultyName: 'Dr. P. Ravindra Reddy',
    collegeName: 'SSBN Autonomous College',
    courseName: 'Kubernetes Pod Deployment & Cluster Networking',
    trainerName: 'Dr. Sudhakar Rao',
    trainerCompany: 'CloudScale Systems',
    location: 'Virtual Lab Pod 4',
    mode: 'ONLINE',
    status: 'UPCOMING'
  },
  {
    id: 'fcs-2',
    date: '2026-09-13',
    time: '3:00 PM - 5:30 PM',
    facultyName: 'Mrs. K. Sailaja Rani',
    collegeName: 'SSBN Autonomous College',
    courseName: 'Hands-on React Custom Hooks & Async Fetching',
    trainerName: 'Suresh Varma',
    trainerCompany: 'NovaSoft Cloud Labs',
    location: 'SSBN Lab 2, Anantapur',
    mode: 'OFFLINE',
    status: 'UPCOMING'
  },
  {
    id: 'fcs-3',
    date: '2026-09-10',
    time: '2:00 PM - 5:00 PM',
    facultyName: 'Dr. M. Sreenivasulu',
    collegeName: 'SSBN Autonomous College',
    courseName: 'LoRa Gateway Field Calibration & RSSI Testing',
    trainerName: 'Er. C. Harikrishna',
    trainerCompany: 'Srinivasa Solar Automation',
    location: 'AIC-SKU Innovation Lab',
    mode: 'OFFLINE',
    status: 'COMPLETED'
  },
  {
    id: 'fcs-4',
    date: '2026-09-16',
    time: '11:00 AM - 1:00 PM',
    facultyName: 'Mr. B. Vamsi Krishna',
    collegeName: 'SSBN Autonomous College',
    courseName: 'SQL Window Functions for Bank Reconciliation',
    trainerName: 'K. Prasad Reddy',
    trainerCompany: 'Rayalaseema FinTech Consortium',
    location: 'Commerce Lab 1',
    mode: 'OFFLINE',
    status: 'UPCOMING'
  }
];

export const initialStudentInterventions: StudentInterventionRecord[] = [
  {
    id: 'int-1',
    studentId: 'st-003',
    studentName: 'B. Rajesh Naik',
    riskBand: 'NEEDS_INTERVENTION',
    flagReason: 'Failed Database SQL Lab viva; attendance below 70% in Semester 4.',
    interventionType: 'ACADEMIC_COUNSELLING',
    assignedFacultyName: 'Dr. P. Ravindra Reddy',
    dateCreated: '2026-08-28',
    status: 'UNDER_SUPPORT',
    actionNotes: 'Conducted 1:1 diagnostic meeting. Student has limited home PC access; assigned priority evening slot in College Central Lab.'
  },
  {
    id: 'int-2',
    studentId: 'st-007',
    studentName: 'G. Mounika',
    riskBand: 'AT_RISK',
    flagReason: 'Missing verified GitHub portfolio projects; placement readiness score stalled at 52%.',
    interventionType: 'LAB_VIVA_COACHING',
    assignedFacultyName: 'Mrs. K. Sailaja Rani',
    dateCreated: '2026-09-02',
    status: 'IDENTIFIED',
    actionNotes: 'Paired with peer mentor Ananya Sharma on Project Hub to complete capstone code defense.'
  },
  {
    id: 'int-3',
    studentId: 'st-012',
    studentName: 'V. Sai Tharun',
    riskBand: 'DEVELOPING',
    flagReason: 'Needs offline practical defense for Python API and REST endpoint integration.',
    interventionType: 'COURSE_REMEDIATION',
    assignedFacultyName: 'Dr. P. Ravindra Reddy',
    dateCreated: '2026-08-18',
    status: 'MONITORING',
    actionNotes: 'Enrolled in Saturday 4-hour Python sandbox clinic. Scored 82% on practice re-test.'
  }
];

export const initialSyllabusGaps: SyllabusGapItem[] = [
  {
    id: 'gap-1',
    subjectOrDomain: 'Web Technologies & Frontend Engineering',
    coveredInCurrentSyllabus: ['HTML5 Syntax', 'CSS Selectors & Float layout', 'Basic JavaScript DOM manipulation'],
    partiallyCovered: ['Client-side validation', 'AJAX XMLHttpRequest'],
    missingSkills: ['React 18 Component Architecture', 'Tailwind CSS Utility Design', 'State Management', 'Vite & Modern Build Tools'],
    outdatedTechnologies: ['Adobe Dreamweaver', 'CSS Tables', 'Old IE hacks'],
    missingPracticalExposure: ['Zero Git version control in college exams', 'No live hosted URLs required'],
    missingProjects: ['Single-page portfolio website', 'Dynamic API-driven dashboard'],
    missingIndustryTraining: ['Industry code review standards', 'Mobile responsive cross-device testing'],
    recommendation: {
      suggestedModule: 'Modern React & Component Engineering 30-Hour Lab',
      duration: '4 Weeks (30 Hours)',
      skillLevel: 'Intermediate',
      practicalComponent: 'Mandatory GitHub classroom repository with CI deployment to Vercel/Netlify',
      capstoneProject: 'Local merchant e-commerce storefront with cart & checkout',
      assessmentType: 'Invigilated live code defense with examiner inspection',
      industryTrainerPartner: 'NovaSoft Cloud Labs & SkillBridge Verified Recruiter Pool',
      certificationOutcome: 'SkillBridge Certified Frontend Associate'
    }
  },
  {
    id: 'gap-2',
    subjectOrDomain: 'Cloud Infrastructure & DevOps',
    coveredInCurrentSyllabus: ['Client-Server architecture overview', 'Operating systems memory management'],
    partiallyCovered: ['Virtualization conceptual slides', 'LAN/WAN network topologies'],
    missingSkills: ['Docker Containerization', 'Kubernetes Pod orchestration', 'CI/CD Pipelines (GitHub Actions)', 'Cloud AWS/GCP essentials'],
    outdatedTechnologies: ['Local bare-metal FTP server deployments', 'Manual script restarts without supervisors'],
    missingPracticalExposure: ['No access to cloud sandboxes or CLI terminal terminals'],
    missingProjects: ['Multi-container Docker Compose application', 'Automated testing and continuous delivery pipeline'],
    missingIndustryTraining: ['Production incident response', 'Cloud cost budgeting & security IAM'],
    recommendation: {
      suggestedModule: 'Docker & Cloud Native Microservices 40-Hour Track',
      duration: '6 Weeks (40 Hours)',
      skillLevel: 'Advanced',
      practicalComponent: 'Hands-on terminal labs deploying containers on Linux VPS',
      capstoneProject: 'Microservices architecture with Redis cache and PostgreSQL db',
      assessmentType: 'Timed scenario break-fix test in isolated container network',
      industryTrainerPartner: 'CloudScale Systems Corporate Directorate',
      certificationOutcome: 'CloudScale Certified DevOps Practitioner'
    }
  },
  {
    id: 'gap-3',
    subjectOrDomain: 'Applied Artificial Intelligence & Data Pipelines',
    coveredInCurrentSyllabus: ['Classical search algorithms (BFS/DFS)', 'Propositional logic theory', 'Basic Python loops and lists'],
    partiallyCovered: ['Linear Regression formula derivations', 'K-Means clustering on toy datasets'],
    missingSkills: ['Transformer LLM Integration (Gemini / OpenAI SDKs)', 'Retrieval-Augmented Generation (RAG)', 'Vector DBs (Chroma/Pinecone)', 'Prompt Engineering'],
    outdatedTechnologies: ['Prolog programming language for expert systems', 'Old desktop Weka GUI tools'],
    missingPracticalExposure: ['No hands-on API token management or embeddings generation'],
    missingProjects: ['Vernacular conversational assistant for Rayalaseema agricultural farmers', 'Document QA system'],
    missingIndustryTraining: ['AI safety, prompt injection defense, and hallucinations mitigation'],
    recommendation: {
      suggestedModule: 'Generative AI & LLM Systems Engineering 36-Hour Bootcamp',
      duration: '5 Weeks (36 Hours)',
      skillLevel: 'Intermediate',
      practicalComponent: 'Building full-stack AI web apps with Google GenAI SDK and streaming responses',
      capstoneProject: 'Kisan Mitra AI Telugu crop disease voice & image assistant',
      assessmentType: 'Oral architectural viva defense explaining token economics and RAG latency',
      industryTrainerPartner: 'AIC-SKU Krishi Innovation Hub & SkillBridge AI Labs',
      certificationOutcome: 'SkillBridge Certified GenAI Application Developer'
    }
  }
];

export const companyIntelligenceData = {
  companyName: 'Rayalaseema Tech Systems (DEMO)',
  industry: 'Enterprise Software, Cloud Engineering & Agri-IoT',
  location: 'Anantapur IT Hub, Near JNTUA Campus, Andhra Pradesh',
  headquarters: 'Anantapur / Secondary Office: Hitec City, Hyderabad',
  establishedYear: 2021,
  companySize: '50-150 Employees',
  employeeStrength: '94 Full-time Engineers & 22 Apprentices',
  offices: [
    'Collectorate Road Innovation Centre, Anantapur',
    'Tech Park Phase 2, Madhapur, Hyderabad',
    'Koramangala 4th Block, Bengaluru (R&D Office)'
  ],
  annualTurnover: 'Confidential / Not Disclosed (Private Limited)',
  businessAreas: [
    'Cloud-Native SaaS Development',
    'Rural Telemetry & Agricultural IoT Gateways',
    'Corporate University Training & Talent Incubators'
  ],
  technologiesUsed: [
    'React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL',
    'Docker', 'Kubernetes', 'MQTT', 'LoRaWAN', 'Google Cloud Platform'
  ],
  departments: [
    'Core Platform Engineering',
    'Field IoT & Sensor Systems',
    'Recruitment & Talent Operations',
    'University Partnerships & CSR'
  ],
  industrySpecialization: 'High-availability software with resilient offline caching for tier-2 & tier-3 regions',
  academicPartnerships: [
    { college: 'SSBN Autonomous College, Anantapur', status: 'Active MoU (2024-2027)', focus: 'Curriculum & Placement Fast Match' },
    { college: 'JNTUA College of Engineering, Anantapur', status: 'Active Research MoU', focus: 'AI & Cloud CoE' },
    { college: 'Sri Krishnadevaraya University (SKU)', status: 'Incubator Partner', focus: 'AgriTech Hardware Fellowships' }
  ],
  startupCollaborations: [
    'Kisan Mitra AI (AIC-SKU Incubated)',
    'Anantapur Student Gigs Escrow'
  ],
  trainingProgramsSponsored: 6,
  projectsSponsoredCount: 14,
  internshipsReleasedCount: 38,
  fullTimeHiresCount: 26,
  csrAcademicGrants: '₹4,50,000 distributed in student hardware kits and rural lab workstations (2025-26)'
};
