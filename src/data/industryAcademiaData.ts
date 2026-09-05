import {
  ChatConversation,
  IndustryHiringOpportunity,
  FacultyOpportunityItem,
  CurriculumAlignmentAnalysis
} from '../types';

export const initialChatConversations: ChatConversation[] = [
  {
    id: 'conv-student-ananya',
    type: 'STUDENT_STUDENT',
    participantId: 'student-ananya-sharma',
    participantName: 'Ananya Sharma',
    participantRole: 'Final Year CSE Scholar',
    participantOrg: 'JNTUA College of Engineering, Anantapur',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    onlineStatus: 'ONLINE',
    unreadCount: 1,
    lastMessage: 'Hey Karthik! Have you submitted your code defense for the React Viva? The reviewer checked API caching today.',
    lastMessageTime: '10:42 AM',
    messages: [
      {
        id: 'msg-1',
        senderId: 'student-ananya-sharma',
        senderName: 'Ananya Sharma',
        senderRole: 'Student',
        isMe: false,
        text: 'Hi Karthik! Saw your Kisan Mitra AI project demo in the Project Hub. Impressive work on the Telugu voice model integration!',
        timestamp: 'Yesterday 4:15 PM',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: 'karthik-peetla',
        senderName: 'Karthik Peetla',
        senderRole: 'Student (You)',
        isMe: true,
        text: 'Thanks Ananya! We are optimizing latency for low-bandwidth 2G connections across rural Rayalaseema right now.',
        timestamp: 'Yesterday 4:30 PM',
        isRead: true
      },
      {
        id: 'msg-3',
        senderId: 'student-ananya-sharma',
        senderName: 'Ananya Sharma',
        senderRole: 'Student',
        isMe: false,
        text: 'Hey Karthik! Have you submitted your code defense for the React Viva? The reviewer checked API caching today.',
        timestamp: '10:42 AM',
        isRead: false,
        attachment: {
          type: 'PROJECT_INVITE',
          title: 'Algorithmic Viva Sandbox',
          subtitle: 'Ananya invited you to collaborate on Canvas complexity profiler',
          linkTab: 'projects'
        }
      }
    ]
  },
  {
    id: 'conv-company-novasoft',
    type: 'STUDENT_COMPANY',
    participantId: 'company-novasoft',
    participantName: 'Suresh Varma',
    participantRole: 'Technical Talent Acquisition Lead',
    participantOrg: 'NovaSoft Cloud Labs (DEMO)',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    onlineStatus: 'ONLINE',
    unreadCount: 1,
    lastMessage: 'Your Skill Passport showed 100% match on React Hooks and Git defense. Are you available for a 20-minute technical review tomorrow?',
    lastMessageTime: '09:15 AM',
    messages: [
      {
        id: 'msg-ns-1',
        senderId: 'company-novasoft',
        senderName: 'Suresh Varma',
        senderRole: 'HR Lead',
        isMe: false,
        text: 'Hello Karthik, I reviewed your SkillBridge verified passport via the 48H Fast Match recruiter queue.',
        timestamp: 'Yesterday 2:10 PM',
        isRead: true
      },
      {
        id: 'msg-ns-2',
        senderId: 'company-novasoft',
        senderName: 'Suresh Varma',
        senderRole: 'HR Lead',
        isMe: false,
        text: 'Your Skill Passport showed 100% match on React Hooks and Git defense. Are you available for a 20-minute technical review tomorrow?',
        timestamp: '09:15 AM',
        isRead: false,
        attachment: {
          type: 'OPPORTUNITY_SHARE',
          title: 'React Frontend Intern (Sprint Batch)',
          subtitle: 'Stipend: ₹15,000 / month • Remote / Hybrid',
          linkTab: 'opportunities'
        }
      }
    ]
  },
  {
    id: 'conv-mentor-rajesh',
    type: 'STUDENT_MENTOR',
    participantId: 'mentor-rajesh-reddy',
    participantName: 'Dr. Rajesh Reddy',
    participantRole: 'Senior Cloud & AI Architect / Adjunct Professor',
    participantOrg: 'Ex-AWS / JNTUA Mentor Network',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    onlineStatus: 'AWAY',
    unreadCount: 0,
    lastMessage: 'Remember: In Rayalaseema, tech solutions must operate resiliently offline. Keep your SQLite local cache enabled.',
    lastMessageTime: 'Sep 4, 6:30 PM',
    messages: [
      {
        id: 'msg-rr-1',
        senderId: 'karthik-peetla',
        senderName: 'Karthik Peetla',
        senderRole: 'Student (You)',
        isMe: true,
        text: 'Sir, I had a doubt regarding the architectural viva. Should we explain IndexedDB or SQLite for offline mobile sync?',
        timestamp: 'Sep 4, 5:45 PM',
        isRead: true
      },
      {
        id: 'msg-rr-2',
        senderId: 'mentor-rajesh-reddy',
        senderName: 'Dr. Rajesh Reddy',
        senderRole: 'Mentor',
        isMe: false,
        text: 'Remember: In Rayalaseema, tech solutions must operate resiliently offline. Keep your SQLite local cache enabled.',
        timestamp: 'Sep 4, 6:30 PM',
        isRead: true
      }
    ]
  },
  {
    id: 'conv-institution-ssbn',
    type: 'STUDENT_INSTITUTION',
    participantId: 'inst-ssbn-placement',
    participantName: 'Prof. K. Venkateswarlu',
    participantRole: 'Dean of Placements & Industry Relations',
    participantOrg: 'SSBN Autonomous College, Anantapur',
    participantAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    onlineStatus: 'OFFLINE',
    unreadCount: 0,
    lastMessage: 'Your NAAC digital skill evidence export has been validated for your final semester credits.',
    lastMessageTime: 'Sep 3, 11:20 AM',
    messages: [
      {
        id: 'msg-inst-1',
        senderId: 'inst-ssbn-placement',
        senderName: 'Prof. K. Venkateswarlu',
        senderRole: 'Dean of Placements',
        isMe: false,
        text: 'Karthik, please ensure your practical assessment certificates for Python and Database Normalization are submitted before the 15th.',
        timestamp: 'Sep 2, 10:00 AM',
        isRead: true
      },
      {
        id: 'msg-inst-2',
        senderId: 'karthik-peetla',
        senderName: 'Karthik Peetla',
        senderRole: 'Student (You)',
        isMe: true,
        text: 'Sir, I have uploaded the proctored scorecards and completed the oral viva today.',
        timestamp: 'Sep 3, 9:30 AM',
        isRead: true
      },
      {
        id: 'msg-inst-3',
        senderId: 'inst-ssbn-placement',
        senderName: 'Prof. K. Venkateswarlu',
        senderRole: 'Dean of Placements',
        isMe: false,
        text: 'Your NAAC digital skill evidence export has been validated for your final semester credits.',
        timestamp: 'Sep 3, 11:20 AM',
        isRead: true
      }
    ]
  },
  {
    id: 'conv-team-kisan',
    type: 'PROJECT_TEAM',
    participantId: 'team-kisan-mitra',
    participantName: 'Kisan Mitra AI Team',
    participantRole: '4 Active Collaborators',
    participantOrg: 'AIC-SKU Incubated Project',
    participantAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    onlineStatus: 'ONLINE',
    unreadCount: 0,
    lastMessage: 'Meghana: Audio transcription dataset for groundnut leaf disease has been uploaded to the shared repository.',
    lastMessageTime: '11:15 AM',
    messages: [
      {
        id: 'msg-tm-1',
        senderId: 'sai-teja',
        senderName: 'Sai Teja',
        senderRole: 'Backend Lead',
        isMe: false,
        text: 'FastAPI endpoint for crop disease diagnosis is responding in under 320ms now.',
        timestamp: '10:00 AM',
        isRead: true
      },
      {
        id: 'msg-tm-2',
        senderId: 'meghana-rao',
        senderName: 'Meghana Rao',
        senderRole: 'Agronomist Researcher',
        isMe: false,
        text: 'Audio transcription dataset for groundnut leaf disease has been uploaded to the shared repository.',
        timestamp: '11:15 AM',
        isRead: true
      }
    ]
  }
];

export const initialIndustryHiringOpportunities: IndustryHiringOpportunity[] = [
  // 1. MNC
  {
    id: 'ind-mnc-1',
    companyName: 'EPAM Systems Educational Partner',
    category: 'MNC',
    roleTitle: 'Junior Software Engineer (Cloud Java & React)',
    department: 'Global Delivery Unit',
    location: 'Hyderabad / Bengaluru (Hybrid)',
    workMode: 'Hybrid',
    requiredSkills: ['Java', 'Spring Boot', 'React', 'SQL', 'Git'],
    preferredSkills: ['Docker', 'Cloud Fundamentals'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: '0-1 Years / 2025 & 2026 Batch',
    eligibility: 'B.Tech / B.Sc / MCA with minimum 65% aggregate & verified practical coding clearance',
    stipendOrSalary: '₹6,50,000 / annum (Post-training)',
    isSalaryVerified: true,
    deadline: '2026-10-15',
    matchPercentage: 82,
    missingSkills: ['Spring Boot'],
    verificationStatus: 'VERIFIED',
    description: 'Direct campus & off-campus hiring track for regional engineering candidates with validated GitHub code artifacts and clean viva defense on OOP design principles.',
    responsibilities: [
      'Develop robust backend APIs using Java Spring Boot ecosystem',
      'Implement responsive UI web interfaces with React & modern state managers',
      'Participate in daily agile standups and code reviews with global teams'
    ],
    openingsCount: 35,
    hiringFlowSteps: [
      'SkillBridge Verified Profile Shortlist',
      'Automated Algorithmic Sandbox Challenge',
      'System Architecture Oral Defense',
      'HR & Offer Rollout'
    ]
  },
  {
    id: 'ind-mnc-2',
    companyName: 'Virtusa Digital Engineering Hub',
    category: 'MNC',
    roleTitle: 'Full Stack Associate (Node.js & TypeScript)',
    department: 'FinTech Practice Group',
    location: 'Hyderabad / Chennai',
    workMode: 'Hybrid',
    requiredSkills: ['JavaScript', 'Node.js', 'React', 'SQL', 'Git'],
    preferredSkills: ['TypeScript', 'GraphQL'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: 'Fresher / Final Year Students',
    eligibility: 'Degree / B.Tech across all disciplines with verified Node.js server defense',
    stipendOrSalary: '₹5,75,000 / annum',
    isSalaryVerified: true,
    deadline: '2026-10-30',
    matchPercentage: 90,
    missingSkills: [],
    verificationStatus: 'PUBLIC_SOURCE',
    description: 'Pooled regional recruitment through Rayalaseema engineering colleges. Fast-tracks candidates with practical assessment score >= 80%.',
    responsibilities: [
      'Write unit-tested TypeScript services and RESTful APIs',
      'Collaborate with QA automation leads on CI/CD pipelines',
      'Ensure security compliance across financial microservices'
    ],
    openingsCount: 20,
    hiringFlowSteps: [
      'SkillBridge Direct Match Verification',
      'Practical Coding Sandbox (90 mins)',
      'Technical Interview',
      'Placement Letter'
    ]
  },

  // 2. NATIONAL COMPANIES
  {
    id: 'ind-nat-1',
    companyName: 'NovaSoft Cloud Labs (DEMO)',
    category: 'NATIONAL',
    roleTitle: 'React Frontend Intern (Sprint Batch)',
    department: 'Enterprise UX Engineering',
    location: 'Bengaluru / Anantapur Remote',
    workMode: 'Remote',
    requiredSkills: ['React', 'JavaScript', 'HTML & CSS', 'Git'],
    preferredSkills: ['Tailwind CSS', 'Redux Toolkit'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: 'Students / 0 Years',
    eligibility: 'Pre-final and Final year degree & engineering students with responsive CSS proof',
    stipendOrSalary: '₹15,000 / month stipend',
    isSalaryVerified: true,
    deadline: '2026-09-25',
    matchPercentage: 100,
    missingSkills: [],
    verificationStatus: 'DEMO_DATA',
    description: 'Looking for fast, disciplined front-end builders to convert Figma wireframes into pixel-perfect React components. Immediate recruiter callback.',
    responsibilities: [
      'Build reusable React components with clean Tailwind utility styling',
      'Connect JSON endpoints and manage asynchronous loading/error states',
      'Write clear commit messages and submit clean pull requests'
    ],
    openingsCount: 6,
    hiringFlowSteps: [
      '1-Click Application via SkillBridge',
      '20-Min Component Build Test',
      'Technical Viva via Video',
      'Offer Issued in 48 Hours'
    ]
  },
  {
    id: 'ind-nat-2',
    companyName: 'Zoho Regional Learning & Tech Cluster',
    category: 'NATIONAL',
    roleTitle: 'Technical Support & Cloud Deployment Associate',
    department: 'Customer Infrastructure & SaaS Support',
    location: 'Tirupati / Rayalaseema Node',
    workMode: 'On-Site',
    requiredSkills: ['Linux', 'Networking Basics', 'SQL', 'Python'],
    preferredSkills: ['Bash Scripting', 'REST APIs'],
    minimumSkillLevel: 'Basic',
    experienceRequired: 'Freshers welcome',
    eligibility: 'Any graduate with strong analytical ability and Linux command-line certification',
    stipendOrSalary: '₹4,20,000 / annum',
    isSalaryVerified: true,
    deadline: '2026-10-20',
    matchPercentage: 75,
    missingSkills: ['Linux'],
    verificationStatus: 'COMPANY_POSTED',
    description: 'Zoho rural & tier-2 hiring initiative designed to recruit local talent from Andhra Pradesh institutions without bias toward pedigree.',
    responsibilities: [
      'Diagnose customer cloud configurations and database queries',
      'Automate repetitive operational checks using Python scripts',
      'Provide concise, accurate technical communication to business clients'
    ],
    openingsCount: 15,
    hiringFlowSteps: [
      'SkillBridge Profile Assessment',
      'Written Problem Solving Test',
      'Hands-on Lab Diagnostic',
      'Final Interview'
    ]
  },

  // 3. REGIONAL COMPANIES
  {
    id: 'ind-reg-1',
    companyName: 'Andhra FinTech Labs',
    category: 'REGIONAL',
    roleTitle: 'Junior Full Stack Developer (Node & React)',
    department: 'Core Banking API Infrastructure',
    location: 'Visakhapatnam & Vijayawada (Hybrid)',
    workMode: 'Hybrid',
    requiredSkills: ['Node.js', 'React', 'SQL', 'Git'],
    preferredSkills: ['Redis', 'PostgreSQL'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: '0-1 Years',
    eligibility: 'B.Sc Computer Science, BCA, B.Tech students with verified SQL normalization evidence',
    stipendOrSalary: '₹22,000 / month (Internship) → ₹4.8 LPA',
    isSalaryVerified: true,
    deadline: '2026-09-30',
    matchPercentage: 92,
    missingSkills: [],
    verificationStatus: 'VERIFIED',
    description: 'Regional state fintech partner developing rural banking kiosks and cooperative society accounting platforms across Andhra Pradesh.',
    responsibilities: [
      'Build ACID-compliant PostgreSQL transaction queries',
      'Design idempotent Express middleware for payment webhooks',
      'Build responsive operator dashboards in React'
    ],
    openingsCount: 8,
    hiringFlowSteps: [
      'SkillBridge Evidence Verification',
      'SQL Query Practical Sandbox',
      'Virtual Viva Defense',
      'Immediate Onboarding'
    ]
  },
  {
    id: 'ind-reg-2',
    companyName: 'Rayalaseema Tech Cluster',
    category: 'REGIONAL',
    roleTitle: 'Python Data & IoT Associate',
    department: 'Smart Agriculture & Water Automation',
    location: 'Anantapur / Tirupati',
    workMode: 'On-Site',
    requiredSkills: ['Python', 'SQL', 'IoT / Microcontrollers', 'Git'],
    preferredSkills: ['FastAPI', 'MQTT'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: '0 Years / Fresh Graduate',
    eligibility: 'Engineering / Science graduates with verified Python practical defense',
    stipendOrSalary: '₹20,000 / month',
    isSalaryVerified: true,
    deadline: '2026-10-10',
    matchPercentage: 85,
    missingSkills: ['IoT / Microcontrollers'],
    verificationStatus: 'COMPANY_POSTED',
    description: 'Regional consortium working with Anantapur groundnut & pomegranate farmers deploying automated drip controllers and weather station nodes.',
    responsibilities: [
      'Write sensor data ingestion scripts using Python and MQTT',
      'Maintain SQLite local buffers for rural nodes with intermittent connectivity',
      'Conduct field testing at regional farm research stations'
    ],
    openingsCount: 5,
    hiringFlowSteps: [
      'SkillBridge Portfolio Review',
      'Hardware / Sensor Practical Test',
      'Technical Interview',
      'Offer'
    ]
  },

  // 4. LOCAL COMPANIES
  {
    id: 'ind-loc-1',
    companyName: 'Rayalaseema Digital Media',
    category: 'LOCAL',
    roleTitle: 'Immediate Junior Web Assistant (48H Fast Match)',
    department: 'Commercial Web Production',
    location: 'Sapthagiri Circle, Anantapur',
    workMode: 'Hybrid',
    requiredSkills: ['HTML & CSS', 'JavaScript', 'Git'],
    preferredSkills: ['Tailwind CSS', 'WordPress'],
    minimumSkillLevel: 'Basic',
    experienceRequired: 'None (Students Welcome)',
    eligibility: 'Open to all local degree & diploma students with practical markup defense',
    stipendOrSalary: '₹12,000 / month',
    isSalaryVerified: true,
    deadline: '2026-09-18',
    matchPercentage: 100,
    missingSkills: [],
    verificationStatus: 'COMPANY_POSTED',
    description: 'Urgent hiring for local web design firm creating e-commerce & storefront sites for Anantapur, Dharmavaram, and Kadiri merchants.',
    responsibilities: [
      'Assemble responsive landing pages from client asset folders',
      'Test cross-browser mobile layouts on real budget Android handsets',
      'Coordinate with client business owners for product image updates'
    ],
    openingsCount: 3,
    hiringFlowSteps: [
      'Direct Match Verification',
      'Practical HTML/CSS 30-min Test',
      'Offer within 48 Hours'
    ]
  },
  {
    id: 'ind-loc-2',
    companyName: 'Anantapur Digital Infrastructure Hub',
    category: 'LOCAL',
    roleTitle: 'Computer Lab Technician & Networking Assistant',
    department: 'District Center Operations',
    location: 'Collectorate Road, Anantapur',
    workMode: 'On-Site',
    requiredSkills: ['Hardware Troubleshooting', 'Operating Systems', 'LAN Cabling'],
    preferredSkills: ['Linux CLI', 'Printer Servicing'],
    minimumSkillLevel: 'Basic',
    experienceRequired: '0-1 Years / Diploma or Degree',
    eligibility: 'Passionate hardware enthusiast with demonstrated physical assembly capability',
    stipendOrSalary: '₹600 / day (Part-time weekend or full-time ₹14,000/mo)',
    isSalaryVerified: true,
    deadline: '2026-09-22',
    matchPercentage: 70,
    missingSkills: ['LAN Cabling'],
    verificationStatus: 'VERIFIED',
    description: 'Manage 120 client desktop nodes across district online examination centers and university testing labs in Anantapur.',
    responsibilities: [
      'Maintain gigabit switch routing and crimp RJ-45 patch cords',
      'Deploy standardized Windows/Linux system images via PXE boot',
      'Troubleshoot power supplies and RAM seating under strict deadlines'
    ],
    openingsCount: 4,
    hiringFlowSteps: [
      'SkillBridge Offline Verification Check',
      'Hands-on Motherboard Diagnosis',
      'Immediate Joining'
    ]
  },

  // 5. STARTUPS
  {
    id: 'ind-stp-1',
    companyName: 'Kisan Mitra AI (AIC-SKU Incubated)',
    category: 'STARTUP',
    roleTitle: 'Full Stack Agri-Tech Developer Fellow',
    department: 'Product & Field AI Systems',
    location: 'SK University Campus, Anantapur',
    workMode: 'Hybrid',
    requiredSkills: ['Python', 'FastAPI', 'React', 'Git'],
    preferredSkills: ['Computer Vision (YOLO)', 'Telugu NLP'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: 'Student Entrepreneur / Active Project Builder',
    eligibility: 'Passionate student coder with demonstrated Git portfolio projects',
    stipendOrSalary: '₹16,000 / month + Equity pool grant',
    isSalaryVerified: true,
    deadline: '2026-10-05',
    matchPercentage: 95,
    missingSkills: [],
    verificationStatus: 'VERIFIED',
    description: 'Join a high-growth startup funded by AP Innovation Society and NABARD building vernacular crop diagnostic voice assistants.',
    responsibilities: [
      'Maintain lightweight FastAPI microservices for rural image diagnostics',
      'Optimize Web Audio API streaming for low-spec smartphones',
      'Participate in farmer feedback focus groups at SKU Krishi Vigyan Kendra'
    ],
    openingsCount: 2,
    hiringFlowSteps: [
      'SkillBridge Project Hub Review',
      'Live Code Pairing Session (45 mins)',
      'Founder Fit Conversation',
      'Fellowship Grant Issued'
    ]
  },
  {
    id: 'ind-stp-2',
    companyName: 'Anantapur Student Gigs Escrow',
    category: 'STARTUP',
    roleTitle: 'Backend Node.js & Database Architect',
    department: 'Core Financial Engine',
    location: 'Sapthagiri Colony / Remote',
    workMode: 'Remote',
    requiredSkills: ['Node.js', 'SQL', 'Git', 'REST APIs'],
    preferredSkills: ['Stripe / Razorpay SDK', 'WebSockets'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: 'Self-taught or Degree Student',
    eligibility: 'Student engineer who has built and deployed a working database application',
    stipendOrSalary: '₹14,000 / month',
    isSalaryVerified: true,
    deadline: '2026-09-28',
    matchPercentage: 88,
    missingSkills: [],
    verificationStatus: 'DEMO_DATA',
    description: 'Peer-to-peer student freelancing and micro-task escrow platform matching local business shopkeepers with campus student developers.',
    responsibilities: [
      'Develop tamper-proof escrow milestone transition state machines',
      'Build secure JWT authentication and password hashing pipelines',
      'Maintain Postgres schema migrations with complete rollback scripts'
    ],
    openingsCount: 2,
    hiringFlowSteps: [
      'SkillBridge Verified Evidence Check',
      'Architecture Viva on ACID Guarantees',
      'Immediate Offer'
    ]
  },

  // 6. MSMEs
  {
    id: 'ind-msme-1',
    companyName: 'Srinivasa Solar & Rural Automation (MSME)',
    category: 'MSME',
    roleTitle: 'Solar Inverter IoT & Telemetry Assistant',
    department: 'Field Engineering & Renewable Systems',
    location: 'Industrial Estate, Tadipatri / Anantapur',
    workMode: 'On-Site',
    requiredSkills: ['Electronics Basics', 'Python', 'RS485 Modbus'],
    preferredSkills: ['C / C++', 'Solar MPPT Controllers'],
    minimumSkillLevel: 'Basic',
    experienceRequired: 'Diploma / Degree in EEE, ECE, or CS',
    eligibility: 'Students with hands-on electrical safety and microcontroller experience',
    stipendOrSalary: '₹15,000 / month',
    isSalaryVerified: true,
    deadline: '2026-10-12',
    matchPercentage: 65,
    missingSkills: ['RS485 Modbus', 'Electronics Basics'],
    verificationStatus: 'COMPANY_POSTED',
    description: 'Certified MSME manufacturer deploying 5HP to 10HP solar water pumps and rooftop IoT telemetry across Rayalaseema agricultural belts.',
    responsibilities: [
      'Wire RS485 communication lines from solar inverters to GSM dataloggers',
      'Test cloud telemetry transmission using Python scripts',
      'Inspect battery bank voltage levels and inverter efficiency parameters'
    ],
    openingsCount: 4,
    hiringFlowSteps: [
      'SkillBridge Verification Review',
      'Tadipatri Plant Practical Lab Test',
      'Offer'
    ]
  },

  // 7. INDUSTRY-SPECIFIC
  {
    id: 'ind-spec-1',
    companyName: 'Rayalaseema Agro-Coldchain Logistics',
    category: 'INDUSTRY_SPECIFIC',
    roleTitle: 'Cold Storage IoT & Temperature Compliance Monitor',
    department: 'Post-Harvest Industrial Quality',
    location: 'Gooty Road Cold Storage Hub, Anantapur',
    workMode: 'On-Site',
    requiredSkills: ['Python', 'SQL', 'Temperature Sensors', 'Data Logging'],
    preferredSkills: ['Alert Dispatch via WhatsApp API'],
    minimumSkillLevel: 'Intermediate',
    experienceRequired: '0-1 Years',
    eligibility: 'B.Sc / B.Tech students interested in coldchain food preservation tech',
    stipendOrSalary: '₹18,000 / month',
    isSalaryVerified: true,
    deadline: '2026-10-18',
    matchPercentage: 78,
    missingSkills: ['Temperature Sensors'],
    verificationStatus: 'VERIFIED',
    description: 'Specialized industrial cold storage monitoring sweet oranges, mangoes, and groundnuts with strict temperature telemetry and compliance logs.',
    responsibilities: [
      'Calibrate industrial RTD and DHT temperature/humidity probes across 6 chambers',
      'Build automated daily summary spreadsheets using Python openpyxl',
      'Configure SMS/WhatsApp emergency alerts if temperature deviates by >1.5°C'
    ],
    openingsCount: 3,
    hiringFlowSteps: [
      'SkillBridge Direct Match Check',
      'On-site Chamber Calibration Test',
      'Offer'
    ]
  }
];

export const initialFacultyOpportunities: FacultyOpportunityItem[] = [
  {
    id: 'fac-opp-1',
    type: 'FACULTY_INTERNSHIP',
    title: 'Summer Industry Immersion Fellowship in Cloud Native Architectures',
    hostOrganization: 'CloudScale Systems Labs',
    hostType: 'Industry Enterprise',
    location: 'Hyderabad (Hybrid - 3 weeks on-site, 3 weeks remote)',
    mode: 'Hybrid',
    duration: '6 Weeks (Summer Vacation)',
    stipendOrGrant: '₹40,000 Total Honorarium + Guest House Accommodation',
    eligibility: 'Assistant Professors / Associate Professors in CSE, IT, MCA with >= 2 years teaching experience',
    departmentScope: ['Computer Science', 'Information Technology', 'MCA'],
    focusDomains: ['Microservices', 'Kubernetes Orchestration', 'CI/CD Pipelines', 'Kafka Event Streaming'],
    keyOutcomes: [
      'Direct co-development on production SaaS enterprise codebase',
      'Creation of 2 industry-aligned practical laboratory problem sets for student curriculum',
      'Joint industrial co-teaching certificate recognized by AICTE / UGC'
    ],
    applicationDeadline: '2026-11-15',
    seatsAvailable: 8,
    verificationStatus: 'VERIFIED',
    description: 'Designed under National Education Policy (NEP) mandate to bridge faculty classroom pedagogy with live enterprise software engineering.',
    coordinators: 'Dr. Sudhakar Rao (VP Engineering) & Prof. Anjineyulu (Academic Liaison)'
  },
  {
    id: 'fac-opp-2',
    type: 'FDP',
    title: 'Faculty Development Program on Practical Machine Learning & LLM Integration',
    hostOrganization: 'JNTUA & Virtusa Center of Excellence',
    hostType: 'University COE',
    location: 'JNTUA Campus, Anantapur',
    mode: 'On-Site',
    duration: '2 Weeks (Intensive Hands-on)',
    stipendOrGrant: 'Sponsored under TEQIP-III (Free Registration + TA/DA)',
    eligibility: 'Faculty members of all AICTE approved engineering and degree colleges',
    departmentScope: ['CSE', 'ECE', 'Data Science', 'Mathematics'],
    focusDomains: ['PyTorch Foundations', 'Transformer Architectures', 'RAG Pipelines', 'Edge AI on Raspberry Pi'],
    keyOutcomes: [
      'AICTE Recognized FDP completion credential for CAS promotional credits',
      'Access to cloud GPU cluster for student research projects',
      'Curriculum modernization syllabus blueprint for 2026-27 academic year'
    ],
    applicationDeadline: '2026-10-10',
    seatsAvailable: 40,
    verificationStatus: 'VERIFIED',
    description: 'Empowers degree and engineering college professors to teach modern GenAI and computer vision using open-source tools instead of outdated theoretical slides.',
    coordinators: 'Prof. C. Shoba Bindu (Director of R&D, JNTUA)'
  },
  {
    id: 'fac-opp-3',
    type: 'RESEARCH_COLLABORATION',
    title: 'Joint R&D: Vernacular Voice & Vision Diagnostics for Dryland Agriculture',
    hostOrganization: 'ICAR - Central Research Institute & AIC-SKU',
    hostType: 'Research Lab',
    location: 'SK University, Anantapur',
    mode: 'Hybrid',
    duration: '12 Months Collaborative Grant',
    stipendOrGrant: '₹6,50,000 Seed Research Grant per faculty team',
    eligibility: 'Ph.D. holders or senior faculty with published papers in signal processing, CV, or agriculture',
    departmentScope: ['Computer Science', 'Agronomy', 'Electronics'],
    focusDomains: ['Telugu ASR', 'Groundnut Foliar Disease Classification', 'Edge Computing in Microclimates'],
    keyOutcomes: [
      'Joint Scopus/SCI Q1 journal publication',
      'Patenting of localized low-cost leaf scanner device',
      'Direct inclusion of 10 student undergraduate research assistants'
    ],
    applicationDeadline: '2026-11-01',
    seatsAvailable: 3,
    verificationStatus: 'PUBLIC_SOURCE',
    description: 'Interdisciplinary research bridging computer science departments of Rayalaseema colleges with dryland agricultural scientists.',
    coordinators: 'Dr. K. Venugopal Rao (Chief Scientist, Dryland Agronomy)'
  },
  {
    id: 'fac-opp-4',
    type: 'CONSULTANCY',
    title: 'Industry Consultancy: SQL Optimization & Inventory Automation for AP Oil Seeds Fed',
    hostOrganization: 'AP State Agro-Industrial Development Board',
    hostType: 'Government Body',
    location: 'Anantapur District Operations',
    mode: 'Hybrid',
    duration: '3 Months Deliverable Track',
    stipendOrGrant: '₹1,20,000 Institutional Consultancy Fee (60% to faculty, 40% to college)',
    eligibility: 'Faculty with expertise in Database Management Systems and ERP integrations',
    departmentScope: ['Computer Science', 'Commerce & Management Information Systems'],
    focusDomains: ['PostgreSQL Performance Tuning', 'Weighbridge Automated Data Ingestion', 'Reconciliation Auditing'],
    keyOutcomes: [
      'Real-world institutional consultancy revenue recorded for NAAC Criterion 3',
      'Case study published for business school curriculum',
      'Implementation of real-time inventory ledger across 4 district godowns'
    ],
    applicationDeadline: '2026-10-25',
    seatsAvailable: 2,
    verificationStatus: 'VERIFIED',
    description: 'Direct academia-industry consultancy solving long-standing queuing and data loss bottlenecks at groundnut procurement centers.',
    coordinators: 'District Agricultural Officer & JNTUA Consultancy Cell'
  },
  {
    id: 'fac-opp-5',
    type: 'GUEST_LECTURE',
    title: 'Industry Expert Guest Lecture Exchange Program (Semester 1, 2026)',
    hostOrganization: 'SkillBridge Verified Industry Alliance',
    hostType: 'Industry Enterprise',
    location: 'College Classrooms (Anantapur, Gooty, Hindupur)',
    mode: 'Hybrid',
    duration: '1-Day Intensive Session (4 Hours)',
    stipendOrGrant: '₹8,000 Honorarium per session funded by SkillBridge Industry CSR',
    eligibility: 'Colleges requesting senior corporate architects for viva & seminar defense',
    departmentScope: ['All Technical & Science Streams'],
    focusDomains: ['Modern Software Delivery in 2026', 'Cybersecurity in FinTech', 'Embedded C in Automotive'],
    keyOutcomes: [
      'Over 200+ students exposed to authentic corporate expectations',
      'Immediate campus recruitment scouting by visiting speakers',
      'College NAAC Criterion 2 (Teaching-Learning) compliance documentation'
    ],
    applicationDeadline: '2026-12-01',
    seatsAvailable: 15,
    verificationStatus: 'COMPANY_POSTED',
    description: 'Connects corporate senior leaders with rural degree colleges for authentic industry insights and practical mentorship.',
    coordinators: 'SkillBridge Academic Board'
  }
];

export const sampleCurriculumAlignments: Record<string, CurriculumAlignmentAnalysis> = {
  'Full Stack Developer-inst-1': {
    careerGoal: 'Full Stack Developer',
    institutionId: 'inst-1',
    institutionName: 'Sri Sai Baba National (SSBN) Autonomous Degree College',
    industryRequiredSkills: [
      { skill: 'React & Component State', demandLevel: 'CRITICAL' },
      { skill: 'Node.js & REST APIs', demandLevel: 'CRITICAL' },
      { skill: 'SQL & Database Normalization', demandLevel: 'CRITICAL' },
      { skill: 'Git & Version Control', demandLevel: 'HIGH' },
      { skill: 'Docker & Cloud Deployment', demandLevel: 'MODERATE' }
    ],
    taughtInCurriculum: [
      { skill: 'SQL & Database Normalization', semester: 'Semester 3', courseName: 'DBMS Theory & Lab' },
      { skill: 'Core Web Concepts (HTML/CSS/JS)', semester: 'Semester 4', courseName: 'Web Technologies Lab' },
      { skill: 'Object-Oriented Programming (Java)', semester: 'Semester 2', courseName: 'Data Structures with Java' }
    ],
    practicalExposureScore: 78,
    projectsOfferedCount: 2,
    industryTrainingIncluded: true,
    verdict: 'PARTIAL_ALIGNMENT',
    verdictSummary: 'Strong foundation in SQL and core computing, but modern component frameworks (React) and Git workflows require SkillBridge supplementary modules.',
    strengths: [
      'Thorough laboratory sessions on relational database schemas and 3NF normalization',
      'Active autonomous curriculum with semester revision cycles',
      'APSSDC tie-up for student web development hackathons'
    ],
    gapsIdentified: [
      'Modern single-page application frameworks (React/Vue) not in core syllabi; only basic vanilla JS covered',
      'Version control (Git/GitHub) treated as extracurricular rather than graded lab component',
      'REST API design and asynchronous event loops need dedicated project drills'
    ],
    recommendedBridgeActions: [
      'Complete SkillBridge React Practical Sandbox (8 hours)',
      'Push at least 1 verified full-stack project with viva defense to Digital Passport',
      'Participate in Rayalaseema 48H Fast Match for junior web roles'
    ]
  },
  'Full Stack Developer-inst-2': {
    careerGoal: 'Full Stack Developer',
    institutionId: 'inst-2',
    institutionName: 'JNTUA College of Engineering, Anantapur',
    industryRequiredSkills: [
      { skill: 'Data Structures & Algorithms', demandLevel: 'CRITICAL' },
      { skill: 'React / Frontend Architecture', demandLevel: 'CRITICAL' },
      { skill: 'Node.js / Express or Spring Boot', demandLevel: 'CRITICAL' },
      { skill: 'Cloud & Containerization (Docker)', demandLevel: 'HIGH' },
      { skill: 'Git & Agile Team Workflows', demandLevel: 'HIGH' }
    ],
    taughtInCurriculum: [
      { skill: 'Data Structures & Algorithms', semester: 'Semester 3', courseName: 'Advanced DSA Lab (C++)' },
      { skill: 'Database Management Systems', semester: 'Semester 4', courseName: 'DBMS & Query Optimization' },
      { skill: 'Full Stack Web Development', semester: 'Semester 5', courseName: 'Professional Elective: Modern Web' },
      { skill: 'Operating Systems & Linux', semester: 'Semester 4', courseName: 'OS Internals & Unix Shell' }
    ],
    practicalExposureScore: 88,
    projectsOfferedCount: 4,
    industryTrainingIncluded: true,
    verdict: 'STRONG_ALIGNMENT',
    verdictSummary: 'Comprehensive engineering curriculum strongly aligned with corporate software requirements; students only need practical viva defenses to prove execution.',
    strengths: [
      'Mandatory mini-projects in Semesters 5 and 6 reviewed by industry guest mentors',
      'NBA accredited curriculum with high laboratory credit weighting',
      'Active coding culture with institutional GitHub organization'
    ],
    gapsIdentified: [
      'Docker and cloud containerization covered theoretically without live AWS/GCP sandbox deployments',
      'Asynchronous microservice testing requires supplementary drills'
    ],
    recommendedBridgeActions: [
      'Submit Digital Student Portfolio with live demo URLs',
      'Register for CloudScale Systems verified recruitment track'
    ]
  }
};
