import { StudentDirectoryItem, ProjectHubItem } from '../types';

export const initialStudentDirectory: StudentDirectoryItem[] = [
  {
    id: 'stud-1',
    studentId: 'SB-2026-AP-9941',
    name: 'Karthik Peetla',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Sc. Computer Science Honours',
    course: 'Computer Science & Software Development',
    college: 'Sri Sai Baba National Degree College (Autonomous), Anantapur',
    location: 'Anantapur, Andhra Pradesh',
    targetCareer: 'Full Stack Developer',
    careerReadiness: 78,
    verifiedSkills: ['React', 'Python', 'SQL', 'Git', 'Tailwind CSS'],
    unverifiedSkills: ['Docker', 'Node.js'],
    assessmentPassedCount: 3,
    projectsCount: 3,
    portfolioProjects: [
      {
        title: 'KisanCare Voice Assistant',
        description: 'Offline-capable mobile web tool for Rayalaseema groundnut farmers with voice pest diagnostics.',
        skills: ['React', 'Web Audio API', 'Tailwind', 'PWA'],
        githubUrl: 'https://github.com/karthikpeetla/kisancare-voice'
      },
      {
        title: 'Anantapur Local Grocery Portal',
        description: 'Inventory synchronizer and micro-order delivery tracking for local shopkeepers.',
        skills: ['Python', 'Flask', 'SQL', 'REST APIs']
      }
    ],
    achievements: ['Gold Medalist in Regional Web Hackathon 2026', 'Verified React Defense Passed', 'SkillBridge Peer Mentor'],
    certifications: ['SkillBridge Practical React Certified', 'Python for Data Science (NPTEL)', 'Git Advanced Workflows'],
    collaborationInterests: ['Agritech', 'Full Stack SaaS', 'Local Community Tools'],
    projectInterests: ['Web Development', 'AI Assistants', 'PWA Prototyping'],
    startupInterests: ['Agritech Startups', 'Student SaaS'],
    availability: 'Immediate (15+ hrs/wk)',
    experienceYears: '1 year academic project experience',
    bio: 'Dedicated developer focused on high-utility tools for local communities. Passionate about modern React, sandboxed code defense, and rapid prototyping.',
    isConnected: true,
    isFollowed: false,
    contactPermission: false
  },
  {
    id: 'stud-2',
    studentId: 'SB-2026-AP-8124',
    name: 'Harshita Sen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Tech Artificial Intelligence & Data Science',
    course: 'AI & Machine Learning Engineering',
    college: 'JNTUA College of Engineering, Anantapur',
    location: 'JNTU Campus, Anantapur',
    targetCareer: 'AI/ML Engineer',
    careerReadiness: 84,
    verifiedSkills: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'Pandas', 'Data Science'],
    unverifiedSkills: ['Kubernetes', 'MLOps'],
    assessmentPassedCount: 4,
    projectsCount: 4,
    portfolioProjects: [
      {
        title: 'Satellite Drought Predictor',
        description: 'Thermal vegetation index processor identifying water stress across Anantapur district mandals.',
        skills: ['Python', 'PyTorch', 'GeoPandas', 'OpenCV'],
        githubUrl: 'https://github.com/harshitasen/drought-ai'
      }
    ],
    achievements: ['1st Place Smart India Hackathon Regional', 'Top 5% NPTEL AI Deep Learning'],
    certifications: ['Deep Learning Specialization', 'SkillBridge ML Defense Verified'],
    collaborationInterests: ['AI for Agriculture', 'Healthcare Diagnostics', 'Computer Vision'],
    projectInterests: ['PyTorch Models', 'Edge AI', 'FastAPI Microservices'],
    startupInterests: ['Agritech AI', 'Healthtech'],
    availability: 'Part-Time (8-10 hrs/wk)',
    experienceYears: '2 years research & prototyping',
    bio: 'AI researcher and developer building localized prediction models. Eager to partner with frontend devs and agriculture specialists.',
    isConnected: false,
    isFollowed: true,
    contactPermission: false
  },
  {
    id: 'stud-3',
    studentId: 'SB-2026-AP-7732',
    name: 'Ravi Teja Varma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Tech Electronics & Communication',
    course: 'Embedded Systems & IoT',
    college: 'Srinivasa Ramanujan Institute of Technology (SRIT), Rotarypuram',
    location: 'Rotarypuram, Anantapur',
    targetCareer: 'IoT & Hardware Systems Engineer',
    careerReadiness: 76,
    verifiedSkills: ['C', 'C++', 'Arduino', 'ESP32', 'Sensors & Circuit Design', 'MQTT'],
    unverifiedSkills: ['Rust', 'PCB Layout Design'],
    assessmentPassedCount: 2,
    projectsCount: 3,
    portfolioProjects: [
      {
        title: 'Solar Soil Moisture Telemetry Unit',
        description: 'Ultra low-power ESP32 sensor beacon transmitting soil nitrate levels over LoRa to solar pumps.',
        skills: ['C++', 'ESP32', 'LoRaWAN', 'Hardware Prototyping']
      }
    ],
    achievements: ['Best Hardware Prototype Award 2026', 'T-Hub Student Fellow'],
    certifications: ['Embedded C Professional', 'IoT Edge Sensor Certification'],
    collaborationInterests: ['Smart Agriculture', 'Renewable Energy Telemetry', 'Drone Sensors'],
    projectInterests: ['Firmware Development', 'Hardware Integration'],
    startupInterests: ['Agri-Hardware', 'Green Energy'],
    availability: 'Immediate (15+ hrs/wk)',
    experienceYears: '1.5 years embedded lab experience',
    bio: 'Hardware tinkerer bridging the gap between physical soil sensors and cloud telemetry. Looking for full-stack developers to build mobile dashboards.',
    isConnected: false,
    isFollowed: false,
    contactPermission: false
  },
  {
    id: 'stud-4',
    studentId: 'SB-2026-AP-6619',
    name: 'Ananya Reddy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Tech Computer Science',
    course: 'Cloud Computing & Distributed Systems',
    college: 'G. Pulla Reddy Engineering College (Autonomous)',
    location: 'Kurnool / Anantapur Region',
    targetCareer: 'Cloud & DevOps Engineer',
    careerReadiness: 81,
    verifiedSkills: ['Linux', 'Docker', 'AWS Basics', 'Python', 'Git', 'Networking'],
    unverifiedSkills: ['Kubernetes', 'Terraform'],
    assessmentPassedCount: 3,
    projectsCount: 2,
    portfolioProjects: [
      {
        title: 'Zero-Downtime Microservice Pipeline',
        description: 'Automated GitHub Actions CI/CD deploying containerized APIs with health checks and rollback.',
        skills: ['Docker', 'GitHub Actions', 'Linux Bash', 'Nginx']
      }
    ],
    achievements: ['AWS Certified Cloud Practitioner', 'SkillBridge Linux Viva Defense Passed'],
    certifications: ['AWS Cloud Practitioner', 'Docker Foundations'],
    collaborationInterests: ['DevOps Pipelines', 'Cloud Scaling', 'Cybersecurity'],
    projectInterests: ['Microservices', 'Automation', 'Containers'],
    startupInterests: ['Enterprise SaaS', 'Developer Tools'],
    availability: 'Part-Time (8-10 hrs/wk)',
    experienceYears: '1 year cloud lab practice',
    bio: 'Cloud architecture enthusiast focusing on automated deployments and container security.',
    isConnected: false,
    isFollowed: false,
    contactPermission: false
  },
  {
    id: 'stud-5',
    studentId: 'SB-2026-AP-5402',
    name: 'Vikas Rao',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Com Computer Applications & Marketing',
    course: 'Digital Product Management & Local Business',
    college: 'Government College for Men (Autonomous), Anantapur',
    location: 'Anantapur Town',
    targetCareer: 'Product Manager & Growth Lead',
    careerReadiness: 72,
    verifiedSkills: ['Product Strategy', 'Market Research', 'UX Wireframing', 'SQL Basics', 'Business Development'],
    unverifiedSkills: ['Growth Hacking', 'Financial Modeling'],
    assessmentPassedCount: 2,
    projectsCount: 2,
    portfolioProjects: [
      {
        title: 'Rayalaseema Silk Weavers Market Study',
        description: 'Customer journey mapping and unit economics analysis for direct weaver-to-consumer digital collective.',
        skills: ['User Interviews', 'Market Modeling', 'Figma Wireframes']
      }
    ],
    achievements: ['District Youth Business Pitch Winner', 'AP Innovation Society Student Ambassador'],
    certifications: ['Product Management Fundamentals', 'Google Digital Marketing'],
    collaborationInterests: ['Direct-to-Consumer', 'Agritech Supply Chains', 'Social Enterprise'],
    projectInterests: ['Customer Research', 'Go-to-Market', 'Product Roadmapping'],
    startupInterests: ['E-Commerce Platforms', 'Rural Logistics'],
    availability: 'Immediate (15+ hrs/wk)',
    experienceYears: '1 year grassroots business fieldwork',
    bio: 'Combines commercial acumen with user empathy. Experienced in talking directly to rural merchants, farmers, and weavers to validate demand before writing code.',
    isConnected: true,
    isFollowed: true,
    contactPermission: false
  },
  {
    id: 'stud-6',
    studentId: 'SB-2026-AP-4890',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Tech Information Technology',
    course: 'Software Engineering & Databases',
    college: 'GATES Institute of Technology, Gooty',
    location: 'Gooty, Anantapur District',
    targetCareer: 'Backend & Database Engineer',
    careerReadiness: 79,
    verifiedSkills: ['Java', 'Spring Boot', 'SQL', 'PostgreSQL', 'RESTful APIs', 'Database Normalization'],
    unverifiedSkills: ['Kafka', 'Redis'],
    assessmentPassedCount: 3,
    projectsCount: 3,
    portfolioProjects: [
      {
        title: 'Hospital Blood Bank Matching Engine',
        description: 'ACID-compliant relational database engine handling emergency donor requests across Rayalaseema.',
        skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker']
      }
    ],
    achievements: ['Academic Topper in DBMS Course', 'Hackathon Finalist at JNTUA'],
    certifications: ['Oracle Certified Associate Java SE', 'PostgreSQL Database Performance'],
    collaborationInterests: ['Healthcare Platforms', 'Fintech APIs', 'High-Integrity Backends'],
    projectInterests: ['Spring Boot Backends', 'Relational Schemas', 'API Gateways'],
    startupInterests: ['Healthtech', 'Enterprise Backends'],
    availability: 'Weekends Only',
    experienceYears: '1.5 years backend architecture training',
    bio: 'Strict backend practitioner who loves relational database schemas, transaction integrity, and performant REST APIs.',
    isConnected: false,
    isFollowed: false,
    contactPermission: false
  },
  {
    id: 'stud-7',
    studentId: 'SB-2026-AP-3921',
    name: 'Mohammed Arshad',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Tech Computer Science',
    course: 'Cybersecurity & Network Defense',
    college: 'PVKK Institute of Technology, Anantapur',
    location: 'Rudrampeta, Anantapur',
    targetCareer: 'Cybersecurity Analyst',
    careerReadiness: 75,
    verifiedSkills: ['Networking', 'Linux', 'OWASP Top 10', 'Wireshark', 'Python Scripting'],
    unverifiedSkills: ['Penetration Testing', 'SIEM Tools'],
    assessmentPassedCount: 2,
    projectsCount: 2,
    portfolioProjects: [
      {
        title: 'Vulnerability Scanner for Web Endpoints',
        description: 'Automated Python security crawler testing SQL injection, CSRF tokens, and security headers.',
        skills: ['Python', 'Network Sockets', 'OWASP Standards']
      }
    ],
    achievements: ['Reported 2 Responsible Disclosures', 'Cyber Defense Club Coordinator'],
    certifications: ['CompTIA Security+ Prep', 'Cisco Certified Support Technician'],
    collaborationInterests: ['Security Auditing', 'Safe Payment Integrations', 'Network Hardening'],
    projectInterests: ['Pen-testing tools', 'Security Scripts'],
    startupInterests: ['Fintech Security', 'Privacy-First Platforms'],
    availability: 'Part-Time (8-10 hrs/wk)',
    experienceYears: '1 year ethical hacking & network labs',
    bio: 'Ethical hacker and security researcher ensuring web applications and APIs are protected against data leaks.',
    isConnected: false,
    isFollowed: false,
    contactPermission: false
  },
  {
    id: 'stud-8',
    studentId: 'SB-2026-AP-2211',
    name: 'Sai Pranavi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    degree: 'B.Sc. Mathematics & Statistics',
    course: 'Data Analysis & Quantitative Research',
    college: 'Sri Krishnadevaraya University (SKU), Anantapur',
    location: 'SKU Campus, Anantapur',
    targetCareer: 'Data Analyst & BI Specialist',
    careerReadiness: 77,
    verifiedSkills: ['SQL', 'Python', 'Tableau', 'Excel Advanced', 'Statistical Modeling'],
    unverifiedSkills: ['PowerBI', 'R Programming'],
    assessmentPassedCount: 3,
    projectsCount: 2,
    portfolioProjects: [
      {
        title: 'District Rainfall & Yield Predictive Dashboard',
        description: 'Interactive analytics tool visualizing 10-year crop output vs monsoon anomalies in Anantapur mandals.',
        skills: ['Python', 'SQL', 'Tableau', 'Statistical Regression']
      }
    ],
    achievements: ['Best Quantitative Thesis Paper', 'SkillBridge Data Analytics Verified'],
    certifications: ['Google Data Analytics Professional', 'SQL for Data Science'],
    collaborationInterests: ['Agricultural Data', 'Socio-economic Research', 'BI Dashboards'],
    projectInterests: ['Data Cleaning', 'Dashboarding', 'Exploratory Analysis'],
    startupInterests: ['Data Intelligence', 'Civic Tech'],
    availability: 'Immediate (15+ hrs/wk)',
    experienceYears: '1 year statistical computing',
    bio: 'Data analyst turning complex spreadsheets and relational tables into clear executive dashboards.',
    isConnected: false,
    isFollowed: true,
    contactPermission: false
  }
];

export const initialProjectHub: ProjectHubItem[] = [
  {
    id: 'proj-agri-ai',
    title: 'AI Agriculture Assistant (KisanSetu)',
    tagline: 'Multi-lingual groundnut disease detection & fair-market price alert system',
    problem: 'Farmers in Rayalaseema suffer up to 35% crop losses from late leaf-spot fungi because extension officers are unavailable during peak outbreaks, and local traders exploit price information asymmetries.',
    description: 'A mobile-optimized, offline-first progressive web application combining edge image classification of groundnut leaves with live Anantapur Agricultural Market Committee (APMC) price feeds in Telugu.',
    category: 'Agritech',
    stage: 'DEVELOPMENT',
    skillsRequired: ['Python', 'Machine Learning', 'React', 'Tailwind CSS', 'FastAPI', 'Telugu Translation'],
    rolesRequired: ['ML Engineer', 'Frontend PWA Developer', 'Agriculture Student / Domain Expert', 'Growth & Field Tester'],
    expectedDuration: '3 Months (Target: Kharif Harvest Demo)',
    locationMode: 'Hybrid',
    availabilityNeeded: '10-12 hrs/week',
    teamSizeMax: 5,
    visibility: 'PUBLIC',
    creatorName: 'Harshita Sen',
    creatorRole: 'ML Lead (JNTUA)',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    teamMembers: [
      {
        id: 'stud-2',
        name: 'Harshita Sen',
        role: 'ML & Model Architecture',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 45,
        tasksCompleted: 8,
        isLead: true
      },
      {
        id: 'stud-1',
        name: 'Karthik Peetla',
        role: 'Frontend & PWA Sandbox',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 35,
        tasksCompleted: 6,
        isLead: false
      },
      {
        id: 'stud-5',
        name: 'Vikas Rao',
        role: 'Field Validation & Farmer Testing',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 20,
        tasksCompleted: 3,
        isLead: false
      }
    ],
    tasks: [
      {
        id: 'task-1',
        title: 'Train MobileNetV3 model on 1,200 labeled Anantapur groundnut leaf images',
        assignedToName: 'Harshita Sen',
        status: 'DONE',
        priority: 'HIGH',
        dueDate: '2026-08-20'
      },
      {
        id: 'task-2',
        title: 'Implement offline IndexedDB caching for farmer diagnostic history',
        assignedToName: 'Karthik Peetla',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: '2026-09-12'
      },
      {
        id: 'task-3',
        title: 'Conduct village testing with 15 farmers in Singanamala mandal',
        assignedToName: 'Vikas Rao',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: '2026-09-25'
      },
      {
        id: 'task-4',
        title: 'Integrate APMC daily wholesale mandi price API scraper',
        assignedToName: 'Karthik Peetla',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: '2026-09-30'
      }
    ],
    milestones: [
      { id: 'm1', title: 'Curate Leaf Dataset & Model Benchmark (>90% accuracy)', targetDate: 'August 2026', completed: true },
      { id: 'm2', title: 'Functional PWA Prototype with Telugu Voice Prompts', targetDate: 'September 2026', completed: false },
      { id: 'm3', title: 'Pilot with 50 Farmers & AP Innovation Society Presentation', targetDate: 'October 2026', completed: false }
    ],
    discussions: [
      {
        id: 'disc-1',
        authorName: 'Harshita Sen',
        authorRole: 'ML Lead',
        message: 'Quantized the ONNX model down to 4.2 MB! It runs directly inside browser web assembly in 180ms without needing an active 4G connection.',
        timestamp: 'Yesterday at 4:15 PM'
      },
      {
        id: 'disc-2',
        authorName: 'Karthik Peetla',
        authorRole: 'Frontend Dev',
        message: 'Awesome! Hooked it into the camera capture stream. Added audio read-out in Telugu for diagnostic recommendations.',
        timestamp: 'Yesterday at 6:30 PM'
      },
      {
        id: 'disc-3',
        authorName: 'Vikas Rao',
        authorRole: 'Field Tester',
        message: 'Met with farmers in Singanamala today. They requested high-contrast buttons because bright sunlight makes screens hard to read in the fields.',
        timestamp: 'Today at 10:00 AM'
      }
    ],
    files: [
      { id: 'f1', name: 'anantapur_crop_pest_taxonomy.pdf', size: '1.4 MB', uploadedBy: 'Harshita Sen', timestamp: 'Aug 14', type: 'PDF' },
      { id: 'f2', name: 'kisan_setu_architecture_v1.png', size: '420 KB', uploadedBy: 'Karthik Peetla', timestamp: 'Aug 22', type: 'IMAGE' },
      { id: 'f3', name: 'farmer_survey_questions_telugu.docx', size: '95 KB', uploadedBy: 'Vikas Rao', timestamp: 'Sep 02', type: 'DOC' }
    ],
    skillsDemonstrated: ['React', 'PWA', 'FastAPI', 'PyTorch', 'REST APIs', 'UI/UX Design'],
    githubRepoUrl: 'https://github.com/skillbridge-builders/kisansetu-ai',
    liveDemoUrl: 'https://kisansetu-preview.web.app',
    isUserMember: true,
    userRole: 'Frontend & PWA Specialist',
    syncedToProfile: false,
    createdAt: '2026-08-01'
  },
  {
    id: 'proj-health-net',
    title: 'Rayalaseema Emergency Blood & Bed Sync',
    tagline: 'Real-time blood stock verification & ICU availability protocol across district hospitals',
    problem: 'During medical emergencies, patient families spend critical hours making panic phone calls to disparate blood banks across Anantapur and Kurnool without verified stock data.',
    description: 'A verified database and SMS/web coordination platform connecting licensed hospital blood centers with authenticated student blood donors.',
    category: 'Healthtech',
    stage: 'PROTOTYPE',
    skillsRequired: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Docker', 'SMS Gateway'],
    rolesRequired: ['Backend Java Developer', 'Frontend UI Engineer', 'Hospital Liaison / Nursing Student'],
    expectedDuration: '2 Months',
    locationMode: 'Remote',
    availabilityNeeded: '8-10 hrs/week',
    teamSizeMax: 4,
    visibility: 'PUBLIC',
    creatorName: 'Sneha Patel',
    creatorRole: 'Backend Lead (GATES)',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    teamMembers: [
      {
        id: 'stud-6',
        name: 'Sneha Patel',
        role: 'Backend & Database Architecture',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 60,
        tasksCompleted: 7,
        isLead: true
      },
      {
        id: 'stud-7',
        name: 'Mohammed Arshad',
        role: 'Security & Token Authentication',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 40,
        tasksCompleted: 5,
        isLead: false
      }
    ],
    tasks: [
      {
        id: 't-h-1',
        title: 'Design PostgreSQL schema with row-level locks to prevent double-reservation of blood units',
        assignedToName: 'Sneha Patel',
        status: 'DONE',
        priority: 'HIGH',
        dueDate: '2026-08-15'
      },
      {
        id: 't-h-2',
        title: 'Implement hospital authentication with two-factor OTP verification',
        assignedToName: 'Mohammed Arshad',
        status: 'DONE',
        priority: 'HIGH',
        dueDate: '2026-08-28'
      },
      {
        id: 't-h-3',
        title: 'Build responsive emergency requester UI dashboard',
        assignedToName: 'Unassigned',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: '2026-09-18'
      }
    ],
    milestones: [
      { id: 'mh1', title: 'Database schema & API specification', targetDate: 'August 2026', completed: true },
      { id: 'mh2', title: 'Government Medical College Hospital simulation testing', targetDate: 'September 2026', completed: false }
    ],
    discussions: [
      {
        id: 'dh-1',
        authorName: 'Sneha Patel',
        authorRole: 'Backend Lead',
        message: 'Completed the transactional reservation API. When a hospital reserves 2 units of O-negative, it locks for 45 minutes.',
        timestamp: '3 days ago'
      }
    ],
    files: [
      { id: 'fh1', name: 'blood_bank_db_schema_v2.sql', size: '18 KB', uploadedBy: 'Sneha Patel', timestamp: 'Aug 16', type: 'SQL' }
    ],
    skillsDemonstrated: ['Java', 'Spring Boot', 'PostgreSQL', 'Security', 'REST APIs'],
    githubRepoUrl: 'https://github.com/skillbridge-builders/rayalaseema-blood-sync',
    isUserMember: false,
    syncedToProfile: false,
    createdAt: '2026-08-10'
  },
  {
    id: 'proj-iot-water',
    title: 'Smart Borewell & Tank Fluoride Monitor',
    tagline: 'Solar IoT beacon checking fluoride and TDS levels in rural groundwater',
    problem: 'Groundwater in certain mandals of Anantapur has high fluoride levels (>1.5 mg/L), leading to fluorosis. Villagers have no cheap real-time indicator of water safety.',
    description: 'Hardware telemetry unit with electrical conductivity and optical ion sensors that updates an open public map of village water quality.',
    category: 'IoT / Hardware',
    stage: 'PROTOTYPE',
    skillsRequired: ['C++', 'Arduino', 'Sensors', 'MQTT', 'Python', 'React'],
    rolesRequired: ['Hardware Firmware Prototyper', 'Cloud Telemetry Backend', 'Frontend Map Visualizer'],
    expectedDuration: '4 Months',
    locationMode: 'On-Site',
    availabilityNeeded: '12 hrs/week',
    teamSizeMax: 4,
    visibility: 'PUBLIC',
    creatorName: 'Ravi Teja Varma',
    creatorRole: 'Embedded Lead (SRIT)',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    teamMembers: [
      {
        id: 'stud-3',
        name: 'Ravi Teja Varma',
        role: 'Hardware Firmware & Sensor Calibrator',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 70,
        tasksCompleted: 6,
        isLead: true
      },
      {
        id: 'stud-8',
        name: 'Sai Pranavi',
        role: 'Water Quality Trend Analyst',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 30,
        tasksCompleted: 4,
        isLead: false
      }
    ],
    tasks: [
      {
        id: 'ti-1',
        title: 'Calibrate analog fluoride sensor probe against laboratory titration standard',
        assignedToName: 'Ravi Teja Varma',
        status: 'DONE',
        priority: 'HIGH',
        dueDate: '2026-08-22'
      },
      {
        id: 'ti-2',
        title: 'Compile statistical distribution of fluoride in 8 Anantapur mandals',
        assignedToName: 'Sai Pranavi',
        status: 'DONE',
        priority: 'MEDIUM',
        dueDate: '2026-08-30'
      }
    ],
    milestones: [
      { id: 'mi-1', title: 'Proof of concept breadboard sensor calibrated', targetDate: 'August 2026', completed: true },
      { id: 'mi-2', title: 'Solar-cased field enclosure test at Dharmavaram', targetDate: 'October 2026', completed: false }
    ],
    discussions: [
      {
        id: 'di-1',
        authorName: 'Ravi Teja Varma',
        authorRole: 'Embedded Lead',
        message: 'The solar panel maintains 3.7V LiPo charge even on overcast days. Ready to hook up to GSM transmitter.',
        timestamp: '4 days ago'
      }
    ],
    files: [
      { id: 'fi-1', name: 'water_sensor_schematic.pdf', size: '890 KB', uploadedBy: 'Ravi Teja Varma', timestamp: 'Aug 20', type: 'PDF' }
    ],
    skillsDemonstrated: ['C++', 'IoT', 'Sensors', 'MQTT', 'Statistical Modeling'],
    githubRepoUrl: 'https://github.com/skillbridge-builders/smart-fluoride-monitor',
    isUserMember: false,
    syncedToProfile: false,
    createdAt: '2026-08-05'
  },
  {
    id: 'proj-artisan-market',
    title: 'Dharmavaram Silk & Artisan Direct Exchange',
    tagline: 'Direct-from-weaver decentralized storefront with authenticated GI tag provenance',
    problem: 'Master silk weavers in Dharmavaram lose 40% margin to multi-tiered middlemen and counterfeit non-pure silks flood e-commerce.',
    description: 'An authenticated online showcase verifying each saree with genuine handloom cooperative credentials, QR provenance tracing, and direct UPI settlement.',
    category: 'Full Stack',
    stage: 'COMPLETED',
    skillsRequired: ['React', 'Node.js', 'SQL', 'QR Code Generation', 'Payment Gateway'],
    rolesRequired: ['Full Stack Lead', 'Weaver Liaison', 'Product Catalog Specialist'],
    expectedDuration: '3 Months',
    locationMode: 'Hybrid',
    availabilityNeeded: 'Completed',
    teamSizeMax: 3,
    visibility: 'PUBLIC',
    creatorName: 'Karthik Peetla',
    creatorRole: 'Full Stack Builder',
    creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    teamMembers: [
      {
        id: 'stud-1',
        name: 'Karthik Peetla',
        role: 'Full Stack Architecture & Checkout UI',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 65,
        tasksCompleted: 12,
        isLead: true
      },
      {
        id: 'stud-5',
        name: 'Vikas Rao',
        role: 'Cooperative Onboarding & Catalog Photography',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        contributionPercent: 35,
        tasksCompleted: 8,
        isLead: false
      }
    ],
    tasks: [
      { id: 'ta-1', title: 'Deploy verified weaver portfolio and product catalog with high-res photos', assignedToName: 'Vikas Rao', status: 'DONE', priority: 'HIGH', dueDate: '2026-07-10' },
      { id: 'ta-2', title: 'Build instant QR generation linking each saree to loom cooperative certificate', assignedToName: 'Karthik Peetla', status: 'DONE', priority: 'HIGH', dueDate: '2026-07-25' },
      { id: 'ta-3', title: 'Integrate UPI payment intents with direct cooperative account settlement', assignedToName: 'Karthik Peetla', status: 'DONE', priority: 'HIGH', dueDate: '2026-08-05' }
    ],
    milestones: [
      { id: 'ma-1', title: '5 Master Weavers Onboarded in Dharmavaram', targetDate: 'July 2026', completed: true },
      { id: 'ma-2', title: 'Live Transactions & Provenance QR Verification Active', targetDate: 'August 2026', completed: true },
      { id: 'ma-3', title: 'Transferred to Artisan Cooperative Administration', targetDate: 'August 2026', completed: true }
    ],
    discussions: [
      {
        id: 'da-1',
        authorName: 'Vikas Rao',
        authorRole: 'Weaver Liaison',
        message: 'The cooperative president in Dharmavaram was thrilled with the QR code provenance cards! First 8 direct customer orders shipped seamlessly.',
        timestamp: 'Aug 18, 2026'
      },
      {
        id: 'da-2',
        authorName: 'Karthik Peetla',
        authorRole: 'Full Stack Lead',
        message: 'All automated payment webhooks validated with 100% success rate. Project is marked completed and verified.',
        timestamp: 'Aug 20, 2026'
      }
    ],
    files: [
      { id: 'fa-1', name: 'dharmavaram_cooperative_mou.pdf', size: '2.1 MB', uploadedBy: 'Vikas Rao', timestamp: 'Jul 04', type: 'PDF' },
      { id: 'fa-2', name: 'handloom_qr_architecture.png', size: '310 KB', uploadedBy: 'Karthik Peetla', timestamp: 'Jul 15', type: 'IMAGE' }
    ],
    skillsDemonstrated: ['React', 'TypeScript', 'Node.js', 'SQL', 'Payment Gateways', 'QR Generation'],
    githubRepoUrl: 'https://github.com/karthikpeetla/dharmavaram-direct-artisan',
    liveDemoUrl: 'https://dharmavaram-silk.web.app',
    isUserMember: true,
    userRole: 'Lead Full Stack Architect',
    syncedToProfile: true,
    createdAt: '2026-06-15'
  }
];
