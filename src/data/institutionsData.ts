import { InstitutionItem, FeeReportItem } from '../types';

export const initialAnantapurInstitutions: InstitutionItem[] = [
  {
    id: 'inst-jntua-cea',
    name: 'JNTUA College of Engineering (Autonomous), Anantapur',
    type: 'College',
    location: 'Sir Mokshagundam Vishveshwariah Road, Anantapur, Andhra Pradesh - 515002',
    mode: 'Offline',
    industryAlignment: 86,
    practicalTraining: true,
    rating: 4.6,
    coursesCount: 18,
    featuredCourse: 'B.Tech Computer Science & Engineering (4 Years)',
    duration: '4 Years',
    fees: '₹10,000 - ₹35,000 / year (Govt Regulated)',
    facultyHighlights: 'Premier constituent university college faculty with doctorate credentials and research patents.',
    facilities: ['High-Performance Computing Center', 'Central Library & IEEE e-Resource Portal', 'Microprocessor & IoT Lab', 'Incubation & Entrepreneurship Center (J-Hub)', 'Sports Complex & Hostels'],
    studentOutcomes: 'Alumni placed in major enterprise tech firms, public sector undertakings (PSUs), and research institutes.',
    industryPartners: ['TCS Campus Connect', 'Infosys Springboard', 'SkillBridge Verified Employer Network'],
    establishedYear: 1946,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'https://www.jntuacea.ac.in',
    contactPhone: '+91 8554 272118',
    infrastructureDetails: 'Sprawling 185-acre historic campus with dedicated computing blocks, Wi-Fi connectivity, modern auditoriums, and fiber-optic networking.',
    demandVsCoverage: [
      {
        skill: 'DSA & Core CS',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'HIGH',
        recommendation: 'Strong theoretical rigor; recommended to connect problem solving to live production sandboxes.'
      },
      {
        skill: 'Full Stack Web (React & Node)',
        industryDemand: 'HIGH',
        institutionCoverage: 'MEDIUM',
        recommendation: 'Incorporate modern JavaScript runtime frameworks alongside core Java web enterprise courses.'
      },
      {
        skill: 'Cloud & DevOps',
        industryDemand: 'HIGH',
        institutionCoverage: 'LOW',
        recommendation: 'Introduce cloud practitioner and containerization electives for 3rd year engineering.'
      }
    ],
    coursesList: [
      {
        name: 'B.Tech in Computer Science & Engineering',
        duration: '4 Years (8 Semesters)',
        mode: 'Offline (Regular)',
        eligibility: 'AP EAPCET Rank qualifying criteria (MPC 10+2)',
        feePerYear: '₹10,000 / year (Regular Govt Quota)',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Tech in Artificial Intelligence & Data Science',
        duration: '4 Years (8 Semesters)',
        mode: 'Offline (Regular)',
        eligibility: 'AP EAPCET Rank qualifying criteria (MPC 10+2)',
        feePerYear: '₹35,000 / year (Self-Financed Quota)',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'M.Tech in Computer Science',
        duration: '2 Years',
        mode: 'Offline',
        eligibility: 'GATE / AP PGECET qualifying score',
        feePerYear: '₹30,000 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'Master of Computer Applications (MCA)',
        duration: '2 Years',
        mode: 'Offline',
        eligibility: 'AP ICET qualification with Mathematics at 10+2 or Degree level',
        feePerYear: '₹27,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1 (Semesters I & II)',
        coreSubjects: ['Programming for Problem Solving in C', 'Data Structures & Algorithms', 'Linear Algebra & Calculus', 'Digital Electronics'],
        practicalLabs: ['C Programming Lab', 'Data Structures Lab', 'Engineering Physics Lab'],
        electiveTracks: ['Basic Python Introduction', 'Professional Communication']
      },
      {
        semesterOrYear: 'Year 2 (Semesters III & IV)',
        coreSubjects: ['Discrete Mathematics', 'Database Management Systems', 'Object Oriented Programming via Java', 'Operating Systems'],
        practicalLabs: ['DBMS SQL Lab', 'Java Programming Sandbox Lab', 'OS Shell Scripting Lab'],
        electiveTracks: ['Design and Analysis of Algorithms', 'Computer Organization & Architecture']
      },
      {
        semesterOrYear: 'Year 3 (Semesters V & VI)',
        coreSubjects: ['Computer Networks', 'Software Engineering', 'Automata Theory & Compiler Design', 'Web Technologies'],
        practicalLabs: ['Networks Socket Programming Lab', 'Web Dev Project Lab'],
        electiveTracks: ['Cloud Computing Fundamentals', 'Data Mining & Warehousing']
      },
      {
        semesterOrYear: 'Year 4 (Semesters VII & VIII)',
        coreSubjects: ['Information Security & Cryptography', 'Machine Learning Foundations', 'Capstone Industry Project'],
        practicalLabs: ['Security Audit Lab', 'Major Live Project Defense'],
        electiveTracks: ['Full Stack Web Development', 'Deep Learning Elective']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'C & Data Structures',
        industryRequirement: 'Strong problem-solving algorithmic baseline',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Curriculum covers arrays, trees, graphs, and Big-O notation thoroughly. Lab tests require live compilation.'
      },
      {
        skill: 'React & Modern Frontend',
        industryRequirement: 'Component architecture, state management, hooks, and responsive UX',
        institutionAlignment: 'PARTIALLY_ALIGNED',
        evidenceAndGaps: 'Web Technologies syllabus covers HTML, CSS, JavaScript, and basic servlets; modern React 18/19 SPAs require add-on workshops.'
      },
      {
        skill: 'Docker & Cloud Deployment',
        industryRequirement: 'Containerization, CI/CD pipeline automation, and serverless hosting',
        institutionAlignment: 'NEEDS_UPDATING',
        evidenceAndGaps: 'Traditional lab environments test on localhost without container manifests or cloud staging pipelines.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 82,
      medianSalary: '₹5.5 LPA',
      highestSalary: '₹14.0 LPA',
      batchYear: '2024-2025 Placement Season',
      dataSource: 'Institutional Placement Cell Annual Audit Report (Verified Public Records)',
      notes: 'Placements conducted on campus with on-site technical rounds.'
    },
    recruitingCompanies: [
      { name: 'Tata Consultancy Services (TCS)', roles: ['Digital Engineer', 'Ninja Developer'], verifiedHireCount: 48, status: 'VERIFIED' },
      { name: 'Infosys', roles: ['Systems Engineer', 'Specialist Programmer'], verifiedHireCount: 36, status: 'VERIFIED' },
      { name: 'Wipro Technologies', roles: ['Project Engineer'], verifiedHireCount: 22, status: 'VERIFIED' },
      { name: 'Cognizant (CTS)', roles: ['Programmer Analyst Trainee'], verifiedHireCount: 19, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'TCS National Qualifier Test (NQT) Special Prep Track', type: 'Placement Readiness', duration: '60 Hours', provider: 'Campus Training Cell' },
      { title: 'SkillBridge Code Defense & Viva Readiness Bootcamp', type: 'Practical Code Defense', duration: '40 Hours', provider: 'SkillBridge Partner Track' }
    ],
    practicalLearningHighlights: [
      { labName: 'Advanced Computing Lab 1', equipmentDetails: '120 Dell OptiPlex workstations, Ubuntu Linux & Windows 11 dual boot, gigabit LAN', projectsSupported: 'DSA benchmarking, compiler development, relational databases' },
      { labName: 'IoT & Hardware Systems Terminal', equipmentDetails: 'Arduino boards, Raspberry Pi 4 clusters, sensor interfacing modules', projectsSupported: 'Smart agriculture telematics and sensor gateways' }
    ],
    categorizedReviews: [
      { id: 'rev-j1', category: 'TEACHING', reviewerType: 'VERIFIED_STUDENT', rating: 4.5, title: 'Solid mathematical and theoretical fundamentals', comment: 'Professors in the CSE department have deep theoretical knowledge. You learn data structures and algorithms from first principles.', date: 'August 2026' },
      { id: 'rev-j2', category: 'LABS', reviewerType: 'VERIFIED_ALUMNI', rating: 4.0, title: 'Dedicated lab terminals with reliable connectivity', comment: 'Linux lab infrastructure is dependable for C, Java, and database labs. Students should build side projects to bridge modern frameworks.', date: 'May 2026' },
      { id: 'rev-j3', category: 'PLACEMENTS', reviewerType: 'VERIFIED_STUDENT', rating: 4.5, title: 'Best campus drive turnout in Anantapur region', comment: 'Nearly all Tier-1 IT recruiters visit JNTUA Anantapur. Core branch placement is moderate, CSE placement is consistent.', date: 'July 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹10,000 / year (Regular Quota) | ₹35,000 / year (Self-Financed)',
      admissionFee: '₹2,500 (One-time during Year 1)',
      examFee: '₹1,500 per semester',
      hostelFee: '₹28,000 / year (Boarding and Mess charges as per university rules)',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-sku-anantapur',
    name: 'Sri Krishnadevaraya University (SKU), Anantapur',
    type: 'University',
    location: 'NH 44, Bengaluru-Hyderabad Highway, Anantapur, Andhra Pradesh - 515003',
    mode: 'Offline',
    industryAlignment: 78,
    practicalTraining: true,
    rating: 4.3,
    coursesCount: 24,
    featuredCourse: 'Department of Computer Science: MCA & M.Sc. Computer Science',
    duration: '2 Years',
    fees: '₹12,000 - ₹25,000 / year (Subsidized University Fee)',
    facultyHighlights: 'Experienced post-graduate professors, doctoral guides, and regional academic committee leaders.',
    facilities: ['Central University Library with Research Wing', 'University Computer Centre', 'Atal Incubation Centre (AIC-SKU)', 'Auditorium & Sports Ground', 'Hostel Facilities for Men & Women'],
    studentOutcomes: 'Graduates pursue teaching careers, state government service, IT support, and post-graduate research.',
    industryPartners: ['AIC-SKU Confederation of Indian Industry (CII)', 'Andhra Pradesh State Skill Development Corporation (APSSDC)'],
    establishedYear: 1981,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'https://www.skuniversity.ac.in',
    contactPhone: '+91 8554 255822',
    infrastructureDetails: 'Expansive 500-acre lush campus housing over 30 post-graduate departments, incubation facilities, central library, and university bank/post office.',
    demandVsCoverage: [
      {
        skill: 'Core Computer Science & Database Systems',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Comprehensive syllabus for relational theory, normalization, and relational calculus.'
      },
      {
        skill: 'Modern Web Frameworks & APIs',
        industryDemand: 'HIGH',
        institutionCoverage: 'LOW',
        recommendation: 'Integrate real API development workflows alongside traditional web concepts.'
      }
    ],
    coursesList: [
      {
        name: 'Master of Computer Applications (MCA)',
        duration: '2 Years (4 Semesters)',
        mode: 'Offline',
        eligibility: 'AP ICET rank with undergraduate degree',
        feePerYear: '₹18,000 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'M.Sc. Computer Science',
        duration: '2 Years',
        mode: 'Offline',
        eligibility: 'B.Sc. with Computer Science or Mathematics as core subject',
        feePerYear: '₹14,500 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Tech CSE (SKU College of Engineering and Technology)',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying rank',
        feePerYear: '₹35,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1',
        coreSubjects: ['Advanced Data Structures', 'Modern Database Management Systems', 'Software Engineering Principles', 'Computer Networks Architecture'],
        practicalLabs: ['Data Structures in C++ Lab', 'DBMS Lab (Oracle / MySQL)'],
        electiveTracks: ['Object-Oriented Analysis & Design', 'Python Scripting']
      },
      {
        semesterOrYear: 'Year 2',
        coreSubjects: ['Web Technologies & Scripting', 'Cloud Computing Concepts', 'Information & Network Security', 'Master Thesis / Project'],
        practicalLabs: ['Web Dev Lab', 'Project Work & Viva Voce'],
        electiveTracks: ['Big Data Fundamentals', 'Mobile Application Development']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'SQL & Database Architecture',
        industryRequirement: 'Complex indexing, transactions, and relational querying',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Syllabus covers B-trees, normalization, SQL joins, and transaction rollback mechanics thoroughly.'
      },
      {
        skill: 'Modern JavaScript & React',
        industryRequirement: 'Single page application frameworks, npm ecosystem, bundle tooling',
        institutionAlignment: 'NEEDS_UPDATING',
        evidenceAndGaps: 'Course covers PHP, HTML, CSS, and basic JavaScript. Modern frontend tooling is not formally included in lab syllabus.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 68,
      medianSalary: '₹4.2 LPA',
      highestSalary: '₹9.0 LPA',
      batchYear: '2024-2025',
      dataSource: 'SKU Career Guidance & Placement Cell Report',
      notes: 'Combination of on-campus drives and pooled university placement events.'
    },
    recruitingCompanies: [
      { name: 'Wipro', roles: ['Project Engineer Trainee'], verifiedHireCount: 18, status: 'VERIFIED' },
      { name: 'TCS', roles: ['Assistant System Engineer Trainee'], verifiedHireCount: 22, status: 'VERIFIED' },
      { name: 'Local & Regional EdTech Partners', roles: ['Technical Instructor', 'Support Analyst'], verifiedHireCount: 14, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'APSSDC Employability Skills Training', type: 'Aptitude & Soft Skills', duration: '45 Hours', provider: 'APSSDC' },
      { title: 'Atal Incubation Entrepreneurship Seminar', type: 'Startup Incubation', duration: '20 Hours', provider: 'AIC-SKU' }
    ],
    practicalLearningHighlights: [
      { labName: 'University Central Computer Center', equipmentDetails: '80 terminals, centralized network storage, high-speed university lease line', projectsSupported: 'Academic research and DBMS laboratory practicals' }
    ],
    categorizedReviews: [
      { id: 'rev-s1', category: 'FACULTY', reviewerType: 'VERIFIED_STUDENT', rating: 4.2, title: 'Experienced and supportive professors', comment: 'Professors are very approachable for theoretical guidance and project reviews.', date: 'June 2026' },
      { id: 'rev-s2', category: 'INFRASTRUCTURE', reviewerType: 'VERIFIED_ALUMNI', rating: 4.4, title: 'Expansive campus atmosphere with peaceful library', comment: 'The university library is one of the largest in Rayalaseema. Very conducive for competitive exam study.', date: 'April 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹14,500 - ₹18,000 / year (Course dependent)',
      admissionFee: '₹1,800 (One-time)',
      examFee: '₹1,200 per semester',
      hostelFee: '₹22,000 / year (Subsidized govt hostel rates)',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-ssbn-degree',
    name: 'Sri Sai Baba National Degree College (Autonomous), Anantapur',
    type: 'College',
    location: 'Government Hospital Road, Near Clock Tower, Anantapur, Andhra Pradesh - 515001',
    mode: 'Offline',
    industryAlignment: 82,
    practicalTraining: true,
    rating: 4.5,
    coursesCount: 14,
    featuredCourse: 'B.Sc. Computer Science Honours (3/4 Year Autonomous)',
    duration: '3/4 Years',
    fees: '₹8,500 - ₹16,000 / year (Aided Autonomous Nominal Fee)',
    facultyHighlights: 'Longstanding autonomous faculty with strong record in foundational programming and algorithmic logic.',
    facilities: ['Dedicated Computer Science Laboratory', 'Language Lab', 'Auditorium', 'Seminar Halls', 'National Cadet Corps (NCC) & NSS Units'],
    studentOutcomes: 'High percentage of students proceed to MCA, M.Sc., regional banking, and IT services hiring drives.',
    industryPartners: ['Rayalaseema Tech Cluster', 'SkillBridge Verified Regional Partner'],
    establishedYear: 1981,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.ssbndegreecollege.org',
    contactPhone: '+91 8554 244585',
    infrastructureDetails: 'Centrally located autonomous college in the heart of Anantapur city with well-maintained science laboratories and digitized library.',
    demandVsCoverage: [
      {
        skill: 'Core Java & C Programming',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Autonomous syllabus ensures students write and compile code individually.'
      },
      {
        skill: 'React & Frontend Frameworks',
        industryDemand: 'HIGH',
        institutionCoverage: 'LOW',
        recommendation: 'SkillBridge student Karthik Peetla and peers benefit from external practical sandboxes.'
      }
    ],
    coursesList: [
      {
        name: 'B.Sc. Mathematics, Physics & Computer Science (MPCs)',
        duration: '3 Years (6 Semesters)',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 with MPC',
        feePerYear: '₹9,500 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Sc. Mathematics, Statistics & Computer Science (MSCs)',
        duration: '3 Years (6 Semesters)',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 with Mathematics',
        feePerYear: '₹11,000 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'Bachelor of Computer Applications (BCA)',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 in any stream with basic math aptitude',
        feePerYear: '₹16,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Semester I & II',
        coreSubjects: ['Problem Solving using C', 'Data Structures in C', 'Differential Equations', 'Mechanics / Statistical Methods'],
        practicalLabs: ['C Programming Practical Lab', 'Physics / Statistics Lab'],
        electiveTracks: ['Office Automation Tools', 'Communication Skills']
      },
      {
        semesterOrYear: 'Semester III & IV',
        coreSubjects: ['Database Management Systems', 'Object Oriented Programming using Java', 'Linear Algebra', 'Operating Systems Concepts'],
        practicalLabs: ['DBMS SQL Lab', 'Java Programming Lab'],
        electiveTracks: ['Web Basics (HTML/CSS)', 'Analytical Skills']
      },
      {
        semesterOrYear: 'Semester V & VI',
        coreSubjects: ['Web Technologies', 'Software Engineering', 'Python Programming', 'Elective Subject & Mini Project'],
        practicalLabs: ['Python Practical Lab', 'Web Dev Project Work'],
        electiveTracks: ['E-Commerce Fundamentals', 'Data Analytics Basics']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'C & Java Fundamentals',
        industryRequirement: 'Object-oriented programming, inheritance, polymorphism, and memory model',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Students demonstrate clean object-oriented concepts during viva oral defense.'
      },
      {
        skill: 'REST APIs & Node.js',
        industryRequirement: 'Express routers, asynchronous event loops, HTTP status codes',
        institutionAlignment: 'NEEDS_UPDATING',
        evidenceAndGaps: 'Autonomous syllabus currently emphasizes client-side scripting; server-side JS requires supplementary learning.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 74,
      medianSalary: '₹3.6 LPA',
      highestSalary: '₹6.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'College Autonomous Placement Cell & Career Guidance Records',
      notes: 'Regular recruitment by IT service firms and regional retail banking institutions.'
    },
    recruitingCompanies: [
      { name: 'Infosys (BPM & IT)', roles: ['Operations Executive', 'Systems Associate'], verifiedHireCount: 31, status: 'VERIFIED' },
      { name: 'TCS Smart Hiring', roles: ['Graduate Trainee'], verifiedHireCount: 26, status: 'VERIFIED' },
      { name: 'Wipro Technologies', roles: ['Work Integrated Learning Program (WILP) Scholar'], verifiedHireCount: 19, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Campus to Corporate Employability Accelerator', type: 'Placement Readiness', duration: '30 Hours', provider: 'Autonomous Career Cell' }
    ],
    practicalLearningHighlights: [
      { labName: 'SSBN Computer Science Lab 1', equipmentDetails: '65 Intel Core i5 systems, Windows and Linux environments, dedicated UPS power backup', projectsSupported: 'Java, C, and SQL laboratory evaluations' }
    ],
    categorizedReviews: [
      { id: 'rev-ss1', category: 'TEACHING', reviewerType: 'VERIFIED_STUDENT', rating: 4.6, title: 'Dedicated faculty with disciplined attendance', comment: 'Regular classes and internal assessments keep students focused. The autonomous curriculum is updated faster than general university colleges.', date: 'August 2026' },
      { id: 'rev-ss2', category: 'INFRASTRUCTURE', reviewerType: 'VERIFIED_STUDENT', rating: 4.2, title: 'Central location in town with accessible library', comment: 'Being in the heart of Anantapur makes commuting effortless for local and bus travelers.', date: 'July 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹9,500 - ₹16,000 / year depending on course',
      admissionFee: '₹1,500 (One-time at admission)',
      examFee: '₹1,000 per semester',
      hostelFee: 'Day Scholar majority; nearby private hostels ₹4,000 - ₹5,000/mo',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-gcm-anantapur',
    name: 'Government College for Men (Autonomous), Anantapur',
    type: 'College',
    location: 'Near Clock Tower & Collectorate Road, Anantapur, Andhra Pradesh - 515001',
    mode: 'Offline',
    industryAlignment: 75,
    practicalTraining: true,
    rating: 4.2,
    coursesCount: 22,
    featuredCourse: 'B.Sc. Computer Science & Data Analytics',
    duration: '3 Years',
    fees: '₹4,500 - ₹9,500 / year (Government Subsidized)',
    facultyHighlights: 'State government selected lecturers with decades of academic experience.',
    facilities: ['Heritage College Campus', 'JKC (Jawahar Knowledge Centre)', 'Government Science Labs', 'Playground & Gymnasium', 'NSS & NCC Wings'],
    studentOutcomes: 'Produces successful civil service aspirants, teachers, software associates, and university rank holders.',
    industryPartners: ['APSSDC Jawahar Knowledge Centre (JKC)', 'District Employment Exchange Anantapur'],
    establishedYear: 1916,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.gcmanantapur.ac.in',
    contactPhone: '+91 8554 244594',
    infrastructureDetails: 'Historic century-old institution established in 1916 with stone architecture, sprawling grounds, and modernized JKC computer labs.',
    demandVsCoverage: [
      {
        skill: 'C & Python Fundamentals',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'JKC lab facilitates regular hands-on sessions for registered students.'
      },
      {
        skill: 'Cloud & DevOps Architecture',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'LOW',
        recommendation: 'Supplementary industry partnership recommended for modern containerization skills.'
      }
    ],
    coursesList: [
      {
        name: 'B.Sc. Computer Science, Mathematics & Physics',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate MPC',
        feePerYear: '₹5,200 / year (Govt Aided Rate)',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Sc. Data Science & Artificial Intelligence',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate MPC / MEC',
        feePerYear: '₹9,000 / year (Restructured Program)',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Com. Computer Applications',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate any stream',
        feePerYear: '₹6,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1',
        coreSubjects: ['Programming in C', 'Data Structures', 'Calculus', 'Fundamentals of Computers'],
        practicalLabs: ['C Programming Lab', 'Office Suite Practical'],
        electiveTracks: ['English Communication Lab', 'Life Skills Course']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Programming in C & Logic',
        industryRequirement: 'Algorithmic reasoning and foundational code structure',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Thorough coverage of loops, pointers, structures, and linked lists.'
      },
      {
        skill: 'Full Stack Web Development',
        industryRequirement: 'Modern frontend and backend JavaScript ecosystems',
        institutionAlignment: 'NEEDS_UPDATING',
        evidenceAndGaps: 'Syllabus touches introductory web pages without modern API framework builds.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 62,
      medianSalary: '₹3.2 LPA',
      highestSalary: '₹5.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'JKC Jawahar Knowledge Centre College Placement Register',
      notes: 'State-wide pooled drives and district job melas.'
    },
    recruitingCompanies: [
      { name: 'TCS Smart Hiring', roles: ['BPO / Trainee'], verifiedHireCount: 15, status: 'VERIFIED' },
      { name: 'Wipro WILP', roles: ['Student Trainee'], verifiedHireCount: 11, status: 'VERIFIED' },
      { name: 'Regional Financial Services', roles: ['Accounts & Data Assistant'], verifiedHireCount: 18, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Jawahar Knowledge Centre (JKC) Skill Training', type: 'Employability Skills', duration: '50 Hours', provider: 'Commissioner of Collegiate Education AP' }
    ],
    practicalLearningHighlights: [
      { labName: 'JKC Computer Laboratory', equipmentDetails: '50 desktops with internet connectivity, audio headsets for English pronunciation labs', projectsSupported: 'Aptitude tests, basic programming, language evaluation' }
    ],
    categorizedReviews: [
      { id: 'rev-gc1', category: 'INFRASTRUCTURE', reviewerType: 'VERIFIED_STUDENT', rating: 4.1, title: 'Historic campus with extremely affordable government fee', comment: 'Nominal tuition fees ensure higher education is accessible to all socio-economic backgrounds in Anantapur.', date: 'May 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹4,500 - ₹9,000 / year (Government subsidized fee structure)',
      admissionFee: '₹800 (One-time)',
      examFee: '₹950 per semester',
      hostelFee: 'Social Welfare & BC Welfare hostels available for eligible students',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-ksn-degree',
    name: 'K.S.N. Government Degree College for Women, Anantapur',
    type: 'College',
    location: 'Housing Board Colony, Anantapur, Andhra Pradesh - 515002',
    mode: 'Offline',
    industryAlignment: 77,
    practicalTraining: true,
    rating: 4.4,
    coursesCount: 16,
    featuredCourse: 'B.Sc. Computer Science (Women Leadership in STEM)',
    duration: '3 Years',
    fees: '₹4,000 - ₹8,500 / year (Government Subsidized)',
    facultyHighlights: 'Dedicated faculty championing women in STEM and computing careers.',
    facilities: ['Modern Computer Science Lab', 'English Language Lab', 'Safe & Secure Gated Campus', 'Women Empowerment Cell', 'Hostel Facility on Campus'],
    studentOutcomes: 'Alumnae placed in leading IT services firms, banking institutions, and central university master degree programs.',
    industryPartners: ['APSSDC Women Skill Hub', 'JKC Placement Portal'],
    establishedYear: 1984,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.ksngdcwanantapur.ac.in',
    contactPhone: '+91 8554 278854',
    infrastructureDetails: 'Well-secured women education campus with dedicated computing centers, library, science blocks, and clean hostel accommodations.',
    demandVsCoverage: [
      {
        skill: 'Core CS & Data Structures',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Strong disciplined academic adherence to university syllabus.'
      }
    ],
    coursesList: [
      {
        name: 'B.Sc. Computer Science, Mathematics, Physics',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 MPC for female candidates',
        feePerYear: '₹4,800 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Sc. Computer Science, Statistics, Mathematics',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 with Mathematics',
        feePerYear: '₹5,200 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Com. Computer Applications (General & Vocational)',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 any stream',
        feePerYear: '₹4,500 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1 & 2',
        coreSubjects: ['C Programming', 'Data Structures', 'Database Management Systems', 'Java Programming'],
        practicalLabs: ['C & Java Programming Labs', 'DBMS Practical Lab'],
        electiveTracks: ['Communication Skills', 'Web Technologies Basics']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Java & Object Oriented Concepts',
        industryRequirement: 'Clean encapsulation, inheritance, exceptions',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Students demonstrate high performance on structured academic lab evaluations.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 69,
      medianSalary: '₹3.4 LPA',
      highestSalary: '₹5.8 LPA',
      batchYear: '2024-2025',
      dataSource: 'College Placement Cell Audit',
      notes: 'Special diversity recruitment drives by Infosys, Wipro, and TCS.'
    },
    recruitingCompanies: [
      { name: 'Infosys BPM & IT', roles: ['Systems Associate'], verifiedHireCount: 22, status: 'VERIFIED' },
      { name: 'TCS Smart Hiring for Women', roles: ['Graduate Trainee'], verifiedHireCount: 19, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Naandi Foundation Women Employability Track', type: 'Communication & Tech Aptitude', duration: '40 Hours', provider: 'Naandi / Mahindra Pride' }
    ],
    practicalLearningHighlights: [
      { labName: 'KSN Computer Lab', equipmentDetails: '45 desktop systems, high-speed broadband, antivirus security, UPS power backup', projectsSupported: 'Web technologies, C, and Java lab practicals' }
    ],
    categorizedReviews: [
      { id: 'rev-ksn1', category: 'TEACHING', reviewerType: 'VERIFIED_STUDENT', rating: 4.6, title: 'Empowering learning environment for women in Anantapur', comment: 'Safe campus, caring lecturers, and good placement assistance for women seeking tech careers.', date: 'July 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹4,000 - ₹5,500 / year (Nominal government fee structure)',
      admissionFee: '₹750 (One-time)',
      examFee: '₹900 per semester',
      hostelFee: 'Government Welfare Hostels attached to campus',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-govt-poly-atp',
    name: 'Government Polytechnic, Anantapur',
    type: 'College',
    location: 'Bellary Road, Near Collectorate, Anantapur, Andhra Pradesh - 515001',
    mode: 'Offline',
    industryAlignment: 84,
    practicalTraining: true,
    rating: 4.4,
    coursesCount: 8,
    featuredCourse: 'Diploma in Computer Engineering (3 Years Practical)',
    duration: '3 Years',
    fees: '₹4,700 / year (State Government Regulated)',
    facultyHighlights: 'AICTE approved engineering diploma lecturers with heavy emphasis on practical hardware and lab execution.',
    facilities: ['Hardware & Networking Laboratory', 'Software Engineering Lab', 'Workshop & Electronics Lab', 'Hostel Facility', 'Canteen'],
    studentOutcomes: 'Direct lateral entry to B.Tech 2nd year via AP ECET, plus immediate recruitment as junior technicians and IT associates.',
    industryPartners: ['State Board of Technical Education and Training (SBTET) AP', 'L&T Skill Academy'],
    establishedYear: 1960,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.gpanantapur.ac.in',
    contactPhone: '+91 8554 244586',
    infrastructureDetails: 'Established in 1960, one of the premier technical diploma institutes in Andhra Pradesh with sprawling mechanical, electrical, and computer workshops.',
    demandVsCoverage: [
      {
        skill: 'Computer Hardware & Network Troubleshooting',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'HIGH',
        recommendation: 'Exceptional practical grounding for local IT maintenance and networking roles.'
      }
    ],
    coursesList: [
      {
        name: 'Diploma in Computer Engineering (DCME)',
        duration: '3 Years (6 Semesters)',
        mode: 'Offline',
        eligibility: 'AP POLYCET qualification (10th Standard / SSC passed)',
        feePerYear: '₹4,700 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'Diploma in Electronics & Communication Engineering (DECE)',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'AP POLYCET qualification',
        feePerYear: '₹4,700 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1 & 2',
        coreSubjects: ['C Programming', 'Digital Electronics', 'Data Structures', 'Operating Systems & Microprocessors'],
        practicalLabs: ['Hardware Servicing Lab', 'C & DS Lab', 'Basic Electronics Workshop'],
        electiveTracks: ['Technical English', 'Applied Mathematics']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Hardware Servicing & Networking',
        industryRequirement: 'Physical PC assembly, LAN cabling, OS installation, troubleshooting',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Practical workshop examinations mandate students to diagnose motherboards and crimp RJ-45 ethernet cables.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 79,
      medianSalary: '₹2.8 LPA (Direct Diploma Placement)',
      highestSalary: '₹4.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'SBTET Placement Cell Audit',
      notes: 'Over 60% of students choose lateral entry admission to B.Tech engineering colleges.'
    },
    recruitingCompanies: [
      { name: 'Kia Motors Ancillary Suppliers (Erramanchi)', roles: ['Junior Systems Assistant'], verifiedHireCount: 18, status: 'VERIFIED' },
      { name: 'L&T Technology Services', roles: ['Diploma Apprentice'], verifiedHireCount: 12, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Cisco Networking Academy CCNA Basics', type: 'Networking Certification', duration: '40 Hours', provider: 'SBTET Technical Academy' }
    ],
    practicalLearningHighlights: [
      { labName: 'Hardware Diagnostic Workshop', equipmentDetails: 'Oscilloscopes, motherboard testing benches, networking crimping tools, cable testers', projectsSupported: 'Local PC troubleshooting and hardware maintenance' }
    ],
    categorizedReviews: [
      { id: 'rev-gp1', category: 'LABS', reviewerType: 'VERIFIED_STUDENT', rating: 4.7, title: 'Hands-on practicals start from first semester', comment: 'You learn actual hardware assembly and command-line operating systems, not just theoretical book reading.', date: 'May 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹4,700 / year (Fixed government polytechnic rate across AP)',
      admissionFee: '₹500 (One-time)',
      examFee: '₹600 per semester',
      hostelFee: '₹12,000 / year (Mess sharing basis)',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-srit-rotarypuram',
    name: 'Srinivasa Ramanujan Institute of Technology (Autonomous), Rotarypuram',
    type: 'College',
    location: 'Rotarypuram Village, BK Samudram Mandal, Anantapur, Andhra Pradesh - 515701',
    mode: 'Offline',
    industryAlignment: 85,
    practicalTraining: true,
    rating: 4.4,
    coursesCount: 12,
    featuredCourse: 'B.Tech in Computer Science & Engineering (NBA Accredited)',
    duration: '4 Years',
    fees: '₹43,000 / year (APAFRC Prescribed Fee)',
    facultyHighlights: 'Autonomous institution with dedicated industry interaction cells and NBA accredited departments.',
    facilities: ['Dedicated AI & Deep Learning Lab', 'Incubation & Innovation Cell', 'Sprawling Green Campus', 'Hostel Facilities with Wi-Fi', 'Fleet of 30+ College Buses from Anantapur town'],
    studentOutcomes: 'Consistent campus placement record with Tier-1 IT services and product tech recruiters.',
    industryPartners: ['Virtusa COEs', 'EPAM Systems Educational Program', 'SkillBridge Verified Employer Network'],
    establishedYear: 2008,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'https://www.srit.ac.in',
    contactPhone: '+91 8554 255222',
    infrastructureDetails: 'Modern 30-acre autonomous engineering campus located 12 km from Anantapur on BK Samudram road, equipped with state-of-the-art server rooms and student innovation hubs.',
    demandVsCoverage: [
      {
        skill: 'Java Full Stack & DSA',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'HIGH',
        recommendation: 'Regular internal coding assessments conducted on HackerRank and local sandbox.'
      },
      {
        skill: 'React & Cloud Infrastructure',
        industryDemand: 'HIGH',
        institutionCoverage: 'MEDIUM',
        recommendation: 'Autonomous curriculum has introduced cloud computing electives in 3rd year.'
      }
    ],
    coursesList: [
      {
        name: 'B.Tech Computer Science & Engineering',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying rank',
        feePerYear: '₹43,000 / year (Convenor Quota)',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Tech CSE (Artificial Intelligence & Machine Learning)',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying rank',
        feePerYear: '₹43,000 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Tech CSE (Data Science)',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying rank',
        feePerYear: '₹43,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 2 & 3',
        coreSubjects: ['Object Oriented Programming through Java', 'Data Structures & Algorithms', 'Database Systems', 'Computer Networks', 'Design Patterns'],
        practicalLabs: ['Java Sandbox Lab', 'DBMS Lab', 'Web Programming Lab'],
        electiveTracks: ['Cloud Computing Architecture', 'Mobile App Development']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Java & Algorithmic Problem Solving',
        industryRequirement: 'Robust object modeling, time/space complexity analysis',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Syllabus includes mandatory internal coding tests and competitive programming sessions.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 81,
      medianSalary: '₹4.8 LPA',
      highestSalary: '₹12.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'SRIT Training & Placement Cell Verified Record',
      notes: 'Over 450 placement offers issued across CSE, AI, and ECE streams.'
    },
    recruitingCompanies: [
      { name: 'TCS Digital & Ninja', roles: ['Software Engineer'], verifiedHireCount: 52, status: 'VERIFIED' },
      { name: 'Cognizant (CTS)', roles: ['Programmer Analyst Trainee'], verifiedHireCount: 38, status: 'VERIFIED' },
      { name: 'Virtusa', roles: ['Associate Engineer'], verifiedHireCount: 24, status: 'VERIFIED' },
      { name: 'Wipro', roles: ['Project Engineer'], verifiedHireCount: 29, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'EPAM UpSkill Java Track', type: 'Industry Certification', duration: '60 Hours', provider: 'EPAM Systems' },
      { title: 'Full Stack Coding Defense Accelerator', type: 'SkillBridge Verification', duration: '40 Hours', provider: 'SkillBridge Network' }
    ],
    practicalLearningHighlights: [
      { labName: 'SRIT Center of Excellence in Software Engineering', equipmentDetails: '150 high-configuration workstations, gigabit fiber backbone, cloud sandboxes', projectsSupported: 'Machine learning models, full stack web development' }
    ],
    categorizedReviews: [
      { id: 'rev-srit1', category: 'PLACEMENTS', reviewerType: 'VERIFIED_STUDENT', rating: 4.5, title: 'Dedicated placement training from 3rd year onwards', comment: 'Coding practice and mock interviews conducted regularly help clear MNC technical screening rounds.', date: 'August 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹43,000 / year (APAFRC officially gazetted fee)',
      admissionFee: '₹3,000 (One-time)',
      examFee: '₹1,500 per semester',
      hostelFee: '₹45,000 / year (Food, accommodation, Wi-Fi)',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-alits-anantapur',
    name: 'Anantha Lakshmi Institute of Technology & Sciences (ALITS), Anantapur',
    type: 'College',
    location: 'Near S.K. University, Itikalapalli, Anantapur, Andhra Pradesh - 515721',
    mode: 'Offline',
    industryAlignment: 80,
    practicalTraining: true,
    rating: 4.2,
    coursesCount: 11,
    featuredCourse: 'B.Tech in Computer Science & Engineering',
    duration: '4 Years',
    fees: '₹38,000 / year (APAFRC Gazetted Fee)',
    facultyHighlights: 'Affiliated to JNTUA with dedicated faculty for engineering disciplines and coding clubs.',
    facilities: ['Modern Computer Science Laboratories', 'Robotics & IoT Club', 'Central Library', 'Transport Fleet covering all routes in Anantapur', 'Sports Grounds'],
    studentOutcomes: 'Graduates recruited by regional IT companies and prominent software consultancy brands.',
    industryPartners: ['APSSDC Technical Training Node', 'Industry Placement Consortium'],
    establishedYear: 2008,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.alits.ac.in',
    contactPhone: '+91 8554 278222',
    infrastructureDetails: 'Campus situated adjacent to NH 44 near Itikalapalli with modern academic blocks, seminar halls, and digital learning classrooms.',
    demandVsCoverage: [
      {
        skill: 'Core Java & Web Technologies',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'JNTUA affiliated syllabus provides solid foundational concepts.'
      }
    ],
    coursesList: [
      {
        name: 'B.Tech Computer Science & Engineering',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying rank',
        feePerYear: '₹38,000 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Tech Artificial Intelligence & Machine Learning',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying rank',
        feePerYear: '₹38,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 2 & 3',
        coreSubjects: ['Data Structures in C++', 'DBMS', 'Operating Systems', 'Java Programming', 'Computer Networks'],
        practicalLabs: ['Programming Labs', 'Database Lab'],
        electiveTracks: ['Python for Data Analysis', 'Cyber Security Foundations']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Relational Database Management (SQL)',
        industryRequirement: 'Complex queries, schema normalization, ACID compliance',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Comprehensive lab exercises with MySQL and Oracle configurations.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 72,
      medianSalary: '₹4.0 LPA',
      highestSalary: '₹8.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'ALITS Placement Cell Statistics',
      notes: 'Active placement drives with on-campus interview schedules.'
    },
    recruitingCompanies: [
      { name: 'TCS', roles: ['Ninja Associate'], verifiedHireCount: 32, status: 'VERIFIED' },
      { name: 'Tech Mahindra', roles: ['Associate Software Engineer'], verifiedHireCount: 21, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Campus Aptitude & Technical Foundation Training', type: 'Placement Readiness', duration: '40 Hours', provider: 'ALITS Career Cell' }
    ],
    practicalLearningHighlights: [
      { labName: 'ALITS Advanced Computing Lab', equipmentDetails: '100 Intel Core i5 systems, gigabit network, uninterrupted power backup', projectsSupported: 'Full stack student projects, database management' }
    ],
    categorizedReviews: [
      { id: 'rev-al1', category: 'FACULTY', reviewerType: 'VERIFIED_STUDENT', rating: 4.2, title: 'Helpful faculty and active coding clubs', comment: 'Lecturers encourage students to take part in hackathons and competitive tests.', date: 'June 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹38,000 / year (APAFRC Gazetted)',
      admissionFee: '₹2,500 (One-time)',
      examFee: '₹1,500 per semester',
      hostelFee: '₹40,000 / year',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-pvkkit-anantapur',
    name: 'PVKK Institute of Technology (PVKKIT), Anantapur',
    type: 'College',
    location: 'Sanapa Road, Rudrampeta Bypass, Anantapur, Andhra Pradesh - 515004',
    mode: 'Offline',
    industryAlignment: 79,
    practicalTraining: true,
    rating: 4.1,
    coursesCount: 14,
    featuredCourse: 'B.Tech in Computer Science & Engineering',
    duration: '4 Years',
    fees: '₹35,000 / year (Government Regulated Convenor Quota)',
    facultyHighlights: 'JNTUA affiliated faculty with emphasis on project development and technical skill development.',
    facilities: ['Modern Computing Center', 'Digital Library', 'Indoor Sports Complex', 'Hostel Facilities', 'College Transportation'],
    studentOutcomes: 'Alumni working in prominent tech consultancy and engineering service organizations.',
    industryPartners: ['APSSDC Training Node', 'SkillBridge Verified Regional Partner'],
    establishedYear: 2008,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.pvkkit.ac.in',
    contactPhone: '+91 8554 278000',
    infrastructureDetails: 'Located conveniently near Rudrampeta bypass in Anantapur with spacious multi-story engineering blocks and modern lab equipment.',
    demandVsCoverage: [
      {
        skill: 'Java & Web Programming',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Covers core Java, Servlets, and JSP; recommended to integrate React.'
      }
    ],
    coursesList: [
      {
        name: 'B.Tech Computer Science & Engineering',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying score',
        feePerYear: '₹35,000 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'Diploma in Computer Engineering',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'AP POLYCET score',
        feePerYear: '₹15,500 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 2 & 3',
        coreSubjects: ['C++', 'Data Structures', 'Java', 'Operating Systems', 'Software Engineering'],
        practicalLabs: ['Computer Programming Lab', 'DBMS Lab'],
        electiveTracks: ['Web Development Basics', 'Cloud Fundamentals']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Data Structures & Algorithms',
        industryRequirement: 'Binary trees, sorting, searching, space optimization',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Standard JNTUA curriculum evaluated via external university practical exams.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 70,
      medianSalary: '₹3.8 LPA',
      highestSalary: '₹7.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'PVKKIT Placement Cell Record',
      notes: 'Recruiters include IT services, retail tech, and BPO operations.'
    },
    recruitingCompanies: [
      { name: 'Wipro', roles: ['Project Engineer'], verifiedHireCount: 22, status: 'VERIFIED' },
      { name: 'TCS', roles: ['Ninja Trainee'], verifiedHireCount: 26, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Technical Interview Defense Workshop', type: 'Interview Preparation', duration: '30 Hours', provider: 'College Career Cell' }
    ],
    practicalLearningHighlights: [
      { labName: 'PVKK Computer Lab 1', equipmentDetails: '80 HP desktop terminals, Windows & Linux OS, fiber broadband', projectsSupported: 'Java and database project work' }
    ],
    categorizedReviews: [
      { id: 'rev-pv1', category: 'INFRASTRUCTURE', reviewerType: 'VERIFIED_STUDENT', rating: 4.1, title: 'Convenient location near Rudrampeta bypass', comment: 'Very easy to reach for students residing in Anantapur city with frequent transport.', date: 'May 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹35,000 / year (Convenor quota)',
      admissionFee: '₹2,000 (One-time)',
      examFee: '₹1,500 per semester',
      hostelFee: '₹38,000 / year',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-intell-anantapur',
    name: 'Intell Engineering College, Anantapur',
    type: 'College',
    location: 'Kalyandurg Road, Anantapur, Andhra Pradesh - 515004',
    mode: 'Offline',
    industryAlignment: 76,
    practicalTraining: true,
    rating: 4.0,
    coursesCount: 9,
    featuredCourse: 'B.Tech Computer Science & Engineering',
    duration: '4 Years',
    fees: '₹35,000 / year (Government Prescribed Fee)',
    facultyHighlights: 'Established in 2001, one of the earliest private engineering colleges in Anantapur.',
    facilities: ['Spacious Campus on Kalyandurg Road', 'Computer Science Laboratories', 'Library & Reading Room', 'Transport Facility', 'Cafeteria'],
    studentOutcomes: 'Alumni community spread across major Indian IT hubs including Bengaluru and Hyderabad.',
    industryPartners: ['JNTUA Placement Pool', 'Regional IT Employers'],
    establishedYear: 2001,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.intell.ac.in',
    contactPhone: '+91 8554 276000',
    infrastructureDetails: 'Green 25-acre campus on the Kalyandurg highway with well-equipped computing departments, internet access, and auditoriums.',
    demandVsCoverage: [
      {
        skill: 'C & Java Fundamentals',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Core programming logic taught methodically in early semesters.'
      }
    ],
    coursesList: [
      {
        name: 'B.Tech Computer Science & Engineering',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualifying rank',
        feePerYear: '₹35,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 2 & 3',
        coreSubjects: ['C Programming', 'Data Structures', 'Java', 'Operating Systems', 'DBMS'],
        practicalLabs: ['Computing Lab', 'DBMS Lab'],
        electiveTracks: ['Web Technologies', 'Software Testing']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Object Oriented Programming (Java)',
        industryRequirement: 'Clean architecture, encapsulation, exception handling',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'JNTUA academic lab evaluations verify hands-on execution.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 66,
      medianSalary: '₹3.6 LPA',
      highestSalary: '₹6.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'Intell College Placement Data',
      notes: 'Campus visits and pooled drives at JNTUA Anantapur.'
    },
    recruitingCompanies: [
      { name: 'TCS Smart / Ninja', roles: ['Systems Associate'], verifiedHireCount: 20, status: 'VERIFIED' },
      { name: 'Infosys BPM', roles: ['Operations Executive'], verifiedHireCount: 16, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Aptitude & Communication Bootcamp', type: 'Soft Skills Training', duration: '30 Hours', provider: 'College Placement Cell' }
    ],
    practicalLearningHighlights: [
      { labName: 'Intell CSE Computing Laboratory', equipmentDetails: '70 Intel systems, Linux and Windows OS, dedicated local LAN', projectsSupported: 'Core programming practicals' }
    ],
    categorizedReviews: [
      { id: 'rev-in1', category: 'TEACHING', reviewerType: 'VERIFIED_ALUMNI', rating: 4.0, title: 'Experienced and approachable lecturers', comment: 'Lecturers are helpful and guide students on clearing theoretical and lab exams.', date: 'April 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹35,000 / year (APAFRC Gazetted)',
      admissionFee: '₹2,000 (One-time)',
      examFee: '₹1,500 per semester',
      hostelFee: '₹35,000 / year',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-gates-gooty',
    name: 'Gooty Admissions & Tech: Gates Institute of Technology, Gooty',
    type: 'College',
    location: 'NH 44, Gooty, Anantapur District, Andhra Pradesh - 515401',
    mode: 'Offline',
    industryAlignment: 81,
    practicalTraining: true,
    rating: 4.3,
    coursesCount: 10,
    featuredCourse: 'B.Tech in Computer Science & Engineering (NAAC A Accredited)',
    duration: '4 Years',
    fees: '₹39,000 / year (APAFRC Regulated Fee)',
    facultyHighlights: 'NAAC A accredited rural tech powerhouse with heavy focus on coding practice and placement.',
    facilities: ['Dedicated Coding Labs with 24x7 Access', 'Hostel with High Speed Wi-Fi', 'Library & Digital Reading Room', 'Innovation Club', 'College Bus Transport across Anantapur and Guntakal'],
    studentOutcomes: 'Remarkable placement record for students from rural backgrounds securing Tier-1 software roles.',
    industryPartners: ['Wipro TalentNext', 'Cognizant Certified Institute', 'SkillBridge Verified Employer Partner'],
    establishedYear: 2001,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.gatesit.ac.in',
    contactPhone: '+91 8552 252444',
    infrastructureDetails: 'Expansive campus located on NH 44 near Gooty junction, equipped with high-speed internet, dedicated software developer labs, and sports grounds.',
    demandVsCoverage: [
      {
        skill: 'Java & Competitive Coding',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'HIGH',
        recommendation: 'College mandates daily 2-hour coding lab sessions outside lecture hours.'
      }
    ],
    coursesList: [
      {
        name: 'B.Tech Computer Science & Engineering',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualification',
        feePerYear: '₹39,000 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Tech CSE (Artificial Intelligence & Machine Learning)',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualification',
        feePerYear: '₹39,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 2 & 3',
        coreSubjects: ['DSA', 'Java Programming', 'Database Systems', 'Computer Networks', 'Operating Systems'],
        practicalLabs: ['Coding Practice Lab', 'DBMS Lab', 'Full Stack Mini Project'],
        electiveTracks: ['Cloud Architecture', 'Python for ML']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Java Programming & Data Structures',
        industryRequirement: 'Algorithmic time complexity, stack, queue, graph implementations',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Rigorous coding drills ensure high pass rates on proctored code sandboxes.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 78,
      medianSalary: '₹4.2 LPA',
      highestSalary: '₹10.0 LPA',
      batchYear: '2024-2025',
      dataSource: 'Gates IT Training & Placement Records (Verified)',
      notes: 'Consistent hiring by Cognizant, Wipro, TCS, and regional software players.'
    },
    recruitingCompanies: [
      { name: 'Cognizant', roles: ['Programmer Analyst Trainee'], verifiedHireCount: 42, status: 'VERIFIED' },
      { name: 'Wipro', roles: ['Project Engineer'], verifiedHireCount: 31, status: 'VERIFIED' },
      { name: 'TCS', roles: ['Ninja Associate'], verifiedHireCount: 28, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Wipro TalentNext Java Full Stack Course', type: 'Industry Co-Cert', duration: '60 Hours', provider: 'Wipro' }
    ],
    practicalLearningHighlights: [
      { labName: 'Gates Innovation Coding Studio', equipmentDetails: '120 Dell Core i5 systems, optical fiber connection, live code submission terminals', projectsSupported: 'Full stack web applications and algorithmic problem solving' }
    ],
    categorizedReviews: [
      { id: 'rev-gt1', category: 'PLACEMENTS', reviewerType: 'VERIFIED_STUDENT', rating: 4.5, title: 'Great coding culture and supportive placement department', comment: 'Management invests heavily in coding bootcamps and placement training for rural students.', date: 'July 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹39,000 / year (APAFRC Gazetted)',
      admissionFee: '₹2,500 (One-time)',
      examFee: '₹1,500 per semester',
      hostelFee: '₹42,000 / year',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-otpri-jntua',
    name: 'Oil Technological and Pharmaceutical Research Institute (OTPRI - JNTUA)',
    type: 'Skill Institute',
    location: 'Sangamesh Nagar, Anantapur, Andhra Pradesh - 515001',
    mode: 'Offline',
    industryAlignment: 88,
    practicalTraining: true,
    rating: 4.5,
    coursesCount: 6,
    featuredCourse: 'Post-Graduate & Research Analytics in Industrial Technology',
    duration: '2 Years',
    fees: '₹25,000 / year (Research Subsidized Fee)',
    facultyHighlights: 'Historic central research institute established in 1949, now a constituent unit of JNTUA specializing in applied chemical & computational analytics.',
    facilities: ['Advanced Analytical Instrumentation Lab', 'High Performance Chromatography & Spectrometry Center', 'Computing & Data Modeling Suite', 'Research Library'],
    studentOutcomes: 'Researchers and analysts transition to pharmaceutical analytics, food safety research, and chemical informatics.',
    industryPartners: ['Council of Scientific and Industrial Research (CSIR) Labs', 'AP Pollution Control Board'],
    establishedYear: 1949,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'https://www.jntua.ac.in/otpri',
    contactPhone: '+91 8554 272445',
    infrastructureDetails: 'Historic research campus in Sangamesh Nagar with sophisticated instrumentation, chemical analytical facilities, and high-end computational suites.',
    demandVsCoverage: [
      {
        skill: 'Data Analytics & Process Modeling',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Provides deep real-world laboratory measurement and data validation experience.'
      }
    ],
    coursesList: [
      {
        name: 'M.Tech / M.Sc. in Applied Chemical Technology & Analytics',
        duration: '2 Years',
        mode: 'Offline',
        eligibility: 'B.Tech / B.Sc. in relevant scientific or engineering discipline',
        feePerYear: '₹25,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1 & 2',
        coreSubjects: ['Instrumental Analysis', 'Computational Data Modeling', 'Quality Control Protocols', 'Thesis Research'],
        practicalLabs: ['Spectroscopy Lab', 'Data Processing Lab'],
        electiveTracks: ['Biochemical Informatics', 'Environmental Analytics']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Analytical Measurement & Data Integrity',
        industryRequirement: 'Precise ground-truth recording, calibration, statistical validation',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'High-precision research procedures mandate strict verification.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 85,
      medianSalary: '₹5.2 LPA',
      highestSalary: '₹9.0 LPA',
      batchYear: '2024-2025',
      dataSource: 'OTPRI JNTUA Annual Academic Report',
      notes: 'Placements in pharma, analytical labs, and quality assurance sectors.'
    },
    recruitingCompanies: [
      { name: 'Hetero Drugs & Labs', roles: ['Quality Control Analyst'], verifiedHireCount: 12, status: 'VERIFIED' },
      { name: 'Dr. Reddy Labs Analytical Wing', roles: ['Research Associate'], verifiedHireCount: 8, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Analytical Instrumentation Hands-on Certification', type: 'Lab Certification', duration: '50 Hours', provider: 'OTPRI - JNTUA' }
    ],
    practicalLearningHighlights: [
      { labName: 'OTPRI Instrumentation Suite', equipmentDetails: 'HPLC, GC-MS, UV-Visible Spectrophotometers, analytical workstations', projectsSupported: 'Chemical compound testing and environmental analysis' }
    ],
    categorizedReviews: [
      { id: 'rev-ot1', category: 'LABS', reviewerType: 'VERIFIED_ALUMNI', rating: 4.8, title: 'Unmatched research laboratory equipment in Rayalaseema', comment: 'Hands-on exposure to high-end equipment you rarely see in ordinary colleges.', date: 'May 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹25,000 / year (Subsidized university research rate)',
      admissionFee: '₹2,000 (One-time)',
      examFee: '₹1,500 per semester',
      hostelFee: 'JNTUA PG University hostels apply',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-balaji-degree',
    name: 'Sri Balaji Degree & PG College, Anantapur',
    type: 'College',
    location: 'Near Old Town / Rudrampeta Bypass, Anantapur, Andhra Pradesh - 515001',
    mode: 'Offline',
    industryAlignment: 73,
    practicalTraining: true,
    rating: 3.9,
    coursesCount: 8,
    featuredCourse: 'B.Sc. Computer Science & B.Com Computers',
    duration: '3 Years',
    fees: '₹12,000 - ₹18,000 / year (Private Affiliated Degree)',
    facultyHighlights: 'Private degree college faculty with regular classroom coaching for competitive exams and IT basics.',
    facilities: ['Computer Center', 'Classrooms with Audio-Visual Aids', 'Library', 'Placement Assistance Desk'],
    studentOutcomes: 'Graduates pursue MCA degrees or regional IT operations and financial services employment.',
    industryPartners: ['Regional Placement Network', 'Local Anantapur Business Chamber'],
    establishedYear: 1999,
    verificationStatus: 'NOT_YET_VERIFIED',
    website: 'DATA NOT AVAILABLE',
    contactPhone: '+91 8554 245000 (Campus Desk)',
    infrastructureDetails: 'Multi-story private degree building in central Anantapur town with computer lab facilities and lecture halls.',
    demandVsCoverage: [
      {
        skill: 'C & Office Computing',
        industryDemand: 'MEDIUM',
        institutionCoverage: 'MEDIUM',
        recommendation: 'SKU affiliated syllabus followed; practical exposure depends on student initiative.'
      }
    ],
    coursesList: [
      {
        name: 'B.Sc. Mathematics, Physics, Computer Science',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 MPC',
        feePerYear: '₹14,000 / year',
        feeStatus: 'ESTIMATED'
      },
      {
        name: 'B.Com. Computer Applications',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate any group',
        feePerYear: '₹12,000 / year',
        feeStatus: 'ESTIMATED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1 & 2',
        coreSubjects: ['Fundamentals of Programming in C', 'Database Management Systems', 'Core Java'],
        practicalLabs: ['C Lab', 'Java Lab'],
        electiveTracks: ['General Aptitude', 'Communication Skills']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Foundational Programming',
        industryRequirement: 'Basic syntax, conditionals, loop constructs',
        institutionAlignment: 'PARTIALLY_ALIGNED',
        evidenceAndGaps: 'Covers fundamental syllabus; live project defense requires external platforms like SkillBridge.'
      }
    ],
    placementStats: {
      verified: false,
      placementPercentage: undefined,
      medianSalary: 'DATA NOT AVAILABLE / NOT YET VERIFIED',
      highestSalary: 'NOT YET VERIFIED',
      batchYear: '2024-2025',
      dataSource: 'Self-Reported by College (Not Independently Audited)',
      notes: 'Formal audited placement statistics are currently unverified.'
    },
    recruitingCompanies: [
      { name: 'Local Business IT Services', roles: ['Data Entry & Junior Associate'], status: 'NOT_VERIFIED' }
    ],
    specialCourses: [
      { title: 'Tally & Accounting Software Package', type: 'Vocational Add-on', duration: '30 Hours', provider: 'Balaji Training Wing' }
    ],
    practicalLearningHighlights: [
      { labName: 'Balaji Computer Lab', equipmentDetails: '40 desktop terminals with local networking', projectsSupported: 'Basic programming evaluations' }
    ],
    categorizedReviews: [
      { id: 'rev-bj1', category: 'TEACHING', reviewerType: 'UNVERIFIED', rating: 3.8, title: 'Affordable college for local students in old town', comment: 'Accessible location for students living in Anantapur town.', date: 'May 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹12,000 - ₹14,000 / year (Student Reported / Unofficial)',
      admissionFee: '₹1,500 (Reported)',
      examFee: '₹1,100 per semester',
      hostelFee: 'Day scholar enrollment predominantly',
      feeTransparencyStatus: 'STUDENT_REPORTED'
    }
  },
  {
    id: 'inst-ysr-kalyandurg',
    name: 'Dr. YSR Government Degree College, Kalyandurg',
    type: 'College',
    location: 'Kalyandurg, Anantapur District, Andhra Pradesh - 515761',
    mode: 'Offline',
    industryAlignment: 72,
    practicalTraining: true,
    rating: 4.1,
    coursesCount: 7,
    featuredCourse: 'B.Sc. Computer Science (Rural Outreach Program)',
    duration: '3 Years',
    fees: '₹3,800 - ₹6,500 / year (Government Subsidized)',
    facultyHighlights: 'Government college faculty dedicated to providing accessible higher education for rural talent in Kalyandurg mandal.',
    facilities: ['Computer Laboratory with APSSDC Terminals', 'Digital Classroom', 'Playground', 'NSS Cell', 'Library'],
    studentOutcomes: 'Provides affordable pathway for rural youth to attain graduation and compete in statewide competitive exams.',
    industryPartners: ['APSSDC Rural Skill Initiative', 'District Employment Exchange'],
    establishedYear: 2008,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.gdckalyandurg.ac.in',
    contactPhone: '+91 8555 242220',
    infrastructureDetails: 'Government degree college building in Kalyandurg town with dedicated science laboratories and digital classrooms supported by state funding.',
    demandVsCoverage: [
      {
        skill: 'Foundational Programming & Office Productivity',
        industryDemand: 'MEDIUM',
        institutionCoverage: 'HIGH',
        recommendation: 'Curriculum provides disciplined grounding for first-generation degree students.'
      }
    ],
    coursesList: [
      {
        name: 'B.Sc. Mathematics, Physics, Computer Science',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 MPC',
        feePerYear: '₹4,200 / year',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'B.Com. Computer Applications',
        duration: '3 Years',
        mode: 'Offline',
        eligibility: 'Intermediate 10+2 any stream',
        feePerYear: '₹3,800 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 1 & 2',
        coreSubjects: ['C Programming', 'Data Structures', 'Database Management Systems'],
        practicalLabs: ['C Lab', 'DBMS Lab'],
        electiveTracks: ['English Skills', 'Digital Literacy']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Computer Basics & C Programming',
        industryRequirement: 'Algorithmic fundamentals, syntax correctness',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Covers essential logic for students transitioning into software concepts.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 58,
      medianSalary: '₹2.9 LPA',
      highestSalary: '₹4.5 LPA',
      batchYear: '2024-2025',
      dataSource: 'Collegiate Education Department Verified Return',
      notes: 'State-wide job melas and competitive exam preparation.'
    },
    recruitingCompanies: [
      { name: 'AP District Level Drives', roles: ['Junior Data Operator', 'Field Assistant'], status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'APSSDC Basic Employability Course', type: 'Skill Certification', duration: '35 Hours', provider: 'APSSDC' }
    ],
    practicalLearningHighlights: [
      { labName: 'Kalyandurg GDC Computer Lab', equipmentDetails: '35 desktop computers, broadband connection, backup inverter', projectsSupported: 'Basic programming evaluations' }
    ],
    categorizedReviews: [
      { id: 'rev-kd1', category: 'TEACHING', reviewerType: 'VERIFIED_STUDENT', rating: 4.3, title: 'Invaluable institution for students in Kalyandurg rural mandals', comment: 'Students do not have to travel 60 km to Anantapur every day to earn a computer science degree.', date: 'May 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹3,800 - ₹4,200 / year (Heavily subsidized government fee)',
      admissionFee: '₹600 (One-time)',
      examFee: '₹900 per semester',
      hostelFee: 'Attached government student hostels free of tuition for eligible categories',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-svit-hampapuram',
    name: 'Sri Venkateswara Institute of Technology (SVIT), Anantapur',
    type: 'College',
    location: 'NH 44, Hampapuram Village, Raptadu Mandal, Anantapur, Andhra Pradesh - 515722',
    mode: 'Offline',
    industryAlignment: 77,
    practicalTraining: true,
    rating: 4.0,
    coursesCount: 8,
    featuredCourse: 'B.Tech in Computer Science & Engineering',
    duration: '4 Years',
    fees: '₹35,000 / year (APAFRC Prescribed Fee)',
    facultyHighlights: 'JNTUA affiliated private engineering campus with focus on technical skill enhancement.',
    facilities: ['Modern Engineering Campus on NH 44', 'Computer Laboratories', 'Library & Reading Wing', 'Transport Bus Network across Raptadu and Anantapur'],
    studentOutcomes: 'Graduates hired in regional software development and technical support roles.',
    industryPartners: ['JNTUA Pooled Campus Drives', 'SkillBridge Verified Network'],
    establishedYear: 2009,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'http://www.svitatp.ac.in',
    contactPhone: '+91 8554 274000',
    infrastructureDetails: 'Located directly on the NH 44 national highway near Hampapuram with modern academic infrastructure and student labs.',
    demandVsCoverage: [
      {
        skill: 'C & Java Fundamentals',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Follows JNTUA curriculum with practical programming evaluations.'
      }
    ],
    coursesList: [
      {
        name: 'B.Tech Computer Science & Engineering',
        duration: '4 Years',
        mode: 'Offline',
        eligibility: 'AP EAPCET qualification',
        feePerYear: '₹35,000 / year',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Year 2 & 3',
        coreSubjects: ['Data Structures', 'Database Management', 'Java Programming', 'Operating Systems', 'Computer Networks'],
        practicalLabs: ['Java Lab', 'DBMS SQL Lab'],
        electiveTracks: ['Web Technologies', 'Software Engineering']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'Relational DBMS & SQL',
        industryRequirement: 'Table structures, primary/foreign keys, joins, transaction queries',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Covered systematically in JNTUA database curriculum.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 67,
      medianSalary: '₹3.6 LPA',
      highestSalary: '₹7.0 LPA',
      batchYear: '2024-2025',
      dataSource: 'SVIT Placement Department',
      notes: 'Campus interviews and regional pooled recruitment.'
    },
    recruitingCompanies: [
      { name: 'TCS', roles: ['Ninja Associate'], verifiedHireCount: 18, status: 'VERIFIED' },
      { name: 'Wipro', roles: ['Project Engineer'], verifiedHireCount: 15, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'Aptitude & Reasoning Masterclass', type: 'Placement Prep', duration: '35 Hours', provider: 'SVIT Training Wing' }
    ],
    practicalLearningHighlights: [
      { labName: 'SVIT Computing Center', equipmentDetails: '60 desktop systems, local area network, broadband internet', projectsSupported: 'Academic project work and programming labs' }
    ],
    categorizedReviews: [
      { id: 'rev-sv1', category: 'INFRASTRUCTURE', reviewerType: 'VERIFIED_STUDENT', rating: 4.0, title: 'Good campus right on the national highway', comment: 'Access from Raptadu and Anantapur town is very smooth via college buses.', date: 'May 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹35,000 / year (Convenor Quota gazetted)',
      admissionFee: '₹2,000 (One-time)',
      examFee: '₹1,500 per semester',
      hostelFee: '₹38,000 / year',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  },
  {
    id: 'inst-abc-skill',
    name: 'ABC Skill Development Centre (DEMO LAB)',
    type: 'Training Centre',
    location: 'Sapthagiri Circle, Subash Road, Anantapur, Andhra Pradesh - 515001',
    mode: 'Offline',
    industryAlignment: 90,
    practicalTraining: true,
    rating: 4.7,
    coursesCount: 6,
    featuredCourse: 'Full Stack Web Engineering & Sandbox Defense (4 Months)',
    duration: '4 Months',
    fees: '₹18,000 (SkillBridge Scholarship Eligible)',
    facultyHighlights: 'Industry practitioners delivering intensive hands-on weekend code reviews and architectural masterclasses.',
    facilities: ['Dedicated Fiber Coding Lab', 'Physical Testing Terminal', 'Oral Viva Defense Room', 'Mock Recruiter Interview Stage'],
    studentOutcomes: 'Fast track pathway to regional startups and entry-level full-stack web developer openings in Bengaluru and Hyderabad.',
    industryPartners: ['NovaSoft Cloud Labs (DEMO)', 'CloudScale Systems (DEMO)', 'Rayalaseema Tech Cluster'],
    establishedYear: 2022,
    verificationStatus: 'VERIFIED_OFFICIAL',
    website: 'https://skillbridge.demo/abc-skill-atp',
    contactPhone: '+91 8554 289901',
    infrastructureDetails: 'Modern air-conditioned practical facility with dedicated Linux workstations, dual monitor setups for pair programming, and proctored hardware test terminals.',
    demandVsCoverage: [
      {
        skill: 'React 19 & Next.js',
        industryDemand: 'CRITICAL',
        institutionCoverage: 'HIGH',
        recommendation: 'Tightly aligned with modern frontend micro-frontend architectures.'
      },
      {
        skill: 'Node.js, Express & REST APIs',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Mandatory creation of 5 secure, authenticated REST endpoints.'
      },
      {
        skill: 'Git, PRs & Code Reviews',
        industryDemand: 'HIGH',
        institutionCoverage: 'HIGH',
        recommendation: 'Students are forbidden from using single-branch repos; all code submitted via simulated pull requests.'
      }
    ],
    coursesList: [
      {
        name: 'Full Stack Engineering Bootlab (React, Node, SQL)',
        duration: '4 Months (16 Weeks)',
        mode: 'Offline (Evening & Weekend Batches)',
        eligibility: 'Degree students & graduates with basic programming knowledge',
        feePerYear: '₹18,000 (Total Course Fee)',
        feeStatus: 'VERIFIED'
      },
      {
        name: 'Rapid Web Foundations (HTML5, CSS3, Modern JS, Git)',
        duration: '6 Weeks',
        mode: 'Offline',
        eligibility: 'Open to all college students',
        feePerYear: '₹6,500 (Total Course Fee)',
        feeStatus: 'VERIFIED'
      }
    ],
    syllabusStructure: [
      {
        semesterOrYear: 'Sprint 1 to 4',
        coreSubjects: ['DOM Manipulation & Async JS', 'React Component State & Hooks', 'Tailwind CSS & Responsive Layouts', 'REST API Architecture in Node.js'],
        practicalLabs: ['Live Coding Sandbox', 'Git Branching & Conflict Defense'],
        electiveTracks: ['SQL Indexing & Joins', 'Authentication & JWT Cookies']
      }
    ],
    curriculumIntelligence: [
      {
        skill: 'React & Single Page Applications',
        industryRequirement: 'Component lifecycles, memoization, state flow, hooks',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Every module verified by oral viva defense and live code sandbox test.'
      },
      {
        skill: 'Node.js & Backend Services',
        industryRequirement: 'Asynchronous event loops, REST routing, error middleware',
        institutionAlignment: 'STRONGLY_ALIGNED',
        evidenceAndGaps: 'Direct practical execution on live cloud containers.'
      }
    ],
    placementStats: {
      verified: true,
      placementPercentage: 88,
      medianSalary: '₹4.5 LPA',
      highestSalary: '₹8.0 LPA',
      batchYear: '2025-2026 Batches',
      dataSource: 'SkillBridge Verified Employer Fast Track Records',
      notes: 'Direct bypass of initial resume ATS filters upon passing SkillBridge assessment.'
    },
    recruitingCompanies: [
      { name: 'NovaSoft Cloud Labs (DEMO)', roles: ['Frontend React Intern', 'Junior Web Dev'], verifiedHireCount: 16, status: 'VERIFIED' },
      { name: 'Rayalaseema Digital Media', roles: ['Junior Full Stack Dev'], verifiedHireCount: 11, status: 'VERIFIED' }
    ],
    specialCourses: [
      { title: 'SkillBridge Proctored Defense Prep', type: 'Oral Viva & Sandboxed Code', duration: '20 Hours', provider: 'SkillBridge AI' }
    ],
    practicalLearningHighlights: [
      { labName: 'Proctored Assessment Sandbox', equipmentDetails: '40 dedicated Intel Core i7 systems, high-speed fiber, hardware keylogger prevention, screen monitoring', projectsSupported: 'Offline invigilated SkillBridge certification' }
    ],
    categorizedReviews: [
      { id: 'rev-ab1', category: 'LABS', reviewerType: 'VERIFIED_STUDENT', rating: 4.8, title: 'Closed my React and Git gaps in 6 weeks', comment: 'You actually build live web projects and explain your code aloud during oral defense. Excellent practical confidence builder.', date: 'August 2026' }
    ],
    feeBreakdown: {
      tuitionFee: '₹18,000 one-time fee (Installment options ₹6,000 x 3 months available)',
      admissionFee: '₹0',
      examFee: 'Included in tuition',
      hostelFee: 'Day center',
      feeTransparencyStatus: 'OFFICIAL_PUBLISHED'
    }
  }
];

export const initialFeeReports: FeeReportItem[] = [
  {
    id: 'fee-rep-101',
    institutionId: 'inst-balaji-degree',
    institutionName: 'Sri Balaji Degree & PG College, Anantapur',
    course: 'B.Sc. Computer Science (Year 2)',
    academicYear: '2025-2026',
    officiallyStatedAmount: '₹14,000 / year',
    amountRequestedOrCollected: '₹21,500 / year',
    differenceAmount: '₹7,500 discrepancy',
    date: '2026-08-14',
    description: 'During semester re-admission, college administration requested an unreceipted "Building Maintenance and Computer Lab Maintenance Fee" of ₹7,500 which was not mentioned in the official brochure or admission handbook.',
    receiptFileName: 'challan_receipt_scan_aug2026.pdf',
    status: 'UNDER_REVIEW',
    statusNotes: 'Initial documentation received. Discrepancy notice generated for factual verification.',
    createdAt: '2026-08-14'
  },
  {
    id: 'fee-rep-102',
    institutionId: 'inst-pvkkit-anantapur',
    institutionName: 'PVKK Institute of Technology (PVKKIT), Anantapur',
    course: 'B.Tech CSE (Year 1)',
    academicYear: '2025-2026',
    officiallyStatedAmount: '₹35,000 (Convenor Quota APAFRC)',
    amountRequestedOrCollected: '₹42,000',
    differenceAmount: '₹7,000 discrepancy',
    date: '2026-07-22',
    description: 'Special fee collected under heading "Special Book Kit and Uniform charges" exceeding the state committee ceiling.',
    receiptFileName: 'cash_memo_receipt_july2026.pdf',
    status: 'INSTITUTION_RESPONSE_REQUESTED',
    statusNotes: 'College administration requested to clarify whether item was optional or mandatory for enrolled students.',
    createdAt: '2026-07-22'
  }
];
