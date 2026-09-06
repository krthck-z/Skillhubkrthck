import { OpportunityItem } from '../types';

export interface ExpandedOpportunity extends OpportunityItem {
  careerDomain:
    | 'Technology & AI'
    | 'Hardware & Robotics'
    | 'Creative, Media & Design'
    | 'Marketing & Business'
    | 'Engineering & Manufacturing'
    | 'Aviation, Travel & Hospitality'
    | 'Logistics & Trades'
    | 'Agriculture & Agritech'
    | 'Government & Public Sector';
  isSampleDemo: boolean;
  applicationMode: 'DIRECT_APPLY' | 'FAST_MATCH' | 'PORTFOLIO_REVIEW' | 'EXAM_LINK';
  experienceRequired: string;
}

export const expandedOpportunitiesList: ExpandedOpportunity[] = [
  // ==========================================
  // 1. TECHNOLOGY & AI
  // ==========================================
  {
    id: 'opp-react-fullstack',
    title: 'Junior Full Stack Web Engineer',
    companyName: 'NovaSoft Cloud Labs (DEMO)',
    industry: 'Cloud & Web Platforms',
    careerDomain: 'Technology & AI',
    location: 'Bengaluru (Hybrid) / Anantapur',
    workMode: 'Hybrid',
    type: 'FULL_TIME',
    stipendOrSalary: '₹6.0 – ₹8.5 LPA',
    deadline: '15 October 2026',
    matchScore: 92,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'React', met: true },
      { skill: 'TypeScript', met: true },
      { skill: 'PostgreSQL', met: true },
      { skill: 'Git', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'FAST_MATCH',
    experienceRequired: '0 - 1 Year (Freshers with verified projects eligible)',
    description: 'Build enterprise dashboard modules, API microservices, and high-performance real-time frontends with React 19 and Node.js.',
    responsibilities: [
      'Write modular, well-tested TypeScript components and custom hooks',
      'Optimize database queries and REST APIs for sub-100ms response times',
      'Participate in proctored code reviews and continuous delivery pipelines'
    ],
    perks: ['Health insurance for family', 'Learning stipend of ₹30,000/yr', 'Flexible hybrid work schedule']
  },
  {
    id: 'opp-ai-agent-engineer',
    title: 'Prompt Engineer & AI Agents Trainee',
    companyName: 'Cortex Automation Hub (DEMO)',
    industry: 'Generative AI & Enterprise Automation',
    careerDomain: 'Technology & AI',
    location: 'Hyderabad / Remote',
    workMode: 'Remote',
    type: 'INTERNSHIP',
    duration: '6 Months',
    stipendOrSalary: '₹25,000 / month',
    deadline: '20 October 2026',
    matchScore: 88,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Python', met: true },
      { skill: 'Generative AI', met: true },
      { skill: 'Prompt Engineering', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'FAST_MATCH',
    experienceRequired: 'Freshers / Final Year Students',
    description: 'Design prompt templates, function-calling workflows, and autonomous multi-agent systems for enterprise client workflows.',
    responsibilities: [
      'Benchmark LLM inference outputs and evaluate retrieval accuracy',
      'Construct automated agent pipelines using Python and vector databases',
      'Implement safety guardrails and anti-hallucination checks'
    ],
    perks: ['High chance of Full-Time PPO (₹9.0 LPA)', '100% remote work flexibility', 'Access to top-tier GPU clusters']
  },
  {
    id: 'opp-cybersecurity-soc',
    title: 'Junior SOC Security Analyst',
    companyName: 'ShieldNet Cyber Solutions (DEMO)',
    industry: 'Cybersecurity & Defence',
    careerDomain: 'Technology & AI',
    location: 'Chennai (On-Site)',
    workMode: 'On-Site',
    type: 'FULL_TIME',
    stipendOrSalary: '₹5.5 – ₹7.2 LPA',
    deadline: '30 October 2026',
    matchScore: 75,
    eligibilityStatus: 'PARTIALLY_ELIGIBLE',
    requiredSkills: [
      { skill: 'Networking & TCP/IP', met: true },
      { skill: 'Linux Administration', met: true },
      { skill: 'SIEM Tools (Splunk)', met: false }
    ],
    missingSkills: ['SIEM Tools (Splunk)'],
    trainingPathAvailable: true,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: '0 - 2 Years',
    description: 'Monitor live network security alerts, perform packet inspection, detect malware intrusion vectors, and compile incident triage reports.',
    responsibilities: [
      'Triage 24/7 SIEM security alerts and correlate log anomalies',
      'Assist in vulnerability scanning and patch validation audits',
      'Document security incidents in alignment with ISO 27001 protocols'
    ],
    perks: ['Certification reimbursement for CompTIA / CEH', 'Shift allowances', 'Annual bonus']
  },

  // ==========================================
  // 2. HARDWARE, ROBOTICS & EMBEDDED
  // ==========================================
  {
    id: 'opp-iot-embedded-intern',
    title: 'Embedded Firmware & IoT Systems Intern',
    companyName: 'Rayalaseema Robotics & Sensors (DEMO)',
    industry: 'IoT & Industrial Hardware',
    careerDomain: 'Hardware & Robotics',
    location: 'Anantapur / Sri City (On-Site)',
    workMode: 'On-Site',
    type: 'INTERNSHIP',
    duration: '4 Months',
    stipendOrSalary: '₹14,000 / month',
    deadline: '28 October 2026',
    matchScore: 78,
    eligibilityStatus: 'PARTIALLY_ELIGIBLE',
    requiredSkills: [
      { skill: 'C / C++ Programming', met: true },
      { skill: 'Microcontroller Architecture (ESP32 / Arduino)', met: true },
      { skill: 'PCB Layout & Soldering', met: false }
    ],
    missingSkills: ['PCB Layout & Soldering'],
    trainingPathAvailable: true,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: 'B.Sc / B.Tech Electronics or CS Students',
    description: 'Develop sensor interface firmware for solar pump monitoring and precision agriculture telemetry nodes.',
    responsibilities: [
      'Flash and debug ESP32 firmware with FreeRTOS multitasking',
      'Test wireless RF and LoRaWAN long-range communications',
      'Measure power consumption using oscilloscopes to optimize battery life'
    ],
    perks: ['Hands-on lab hardware access', 'PPO review upon graduation', 'Travel allowance']
  },
  {
    id: 'opp-drone-robotics-tech',
    title: 'Drone Assembly & Flight Operations Technician',
    companyName: 'Garuda Aerospace Partner Labs (DEMO)',
    industry: 'Aerospace & Robotics',
    careerDomain: 'Hardware & Robotics',
    location: 'Anantapur District (Hybrid / Field)',
    workMode: 'Hybrid',
    type: 'APPRENTICESHIP',
    duration: '1 Year Government-Recognized Apprenticeship',
    stipendOrSalary: '₹16,500 / month + Field Allowance',
    deadline: '10 November 2026',
    matchScore: 70,
    eligibilityStatus: 'PARTIALLY_ELIGIBLE',
    requiredSkills: [
      { skill: 'Basic Electronics', met: true },
      { skill: 'Mechanical Assembly', met: true },
      { skill: 'DGCA Remote Pilot License', met: false }
    ],
    missingSkills: ['DGCA Remote Pilot License'],
    trainingPathAvailable: true,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: 'Diploma / Degree in Technical Trades or Engineering',
    description: 'Assemble multi-rotor agricultural drones, conduct pre-flight motor diagnostics, calibrate GPS telemetry, and assist rural crop surveying.',
    responsibilities: [
      'Assemble drone frames, BLDC motors, ESC controllers, and flight computers',
      'Conduct ground test calibrations and safe flight test logs',
      'Assist farmers in scheduled precision pesticide aerial spraying'
    ],
    perks: ['Subsidized DGCA Remote Pilot Certification training', 'Field travel stipend', 'Government NAPS certification']
  },

  // ==========================================
  // 3. CREATIVE, MEDIA & DESIGN
  // ==========================================
  {
    id: 'opp-uiux-freelance',
    title: 'Freelance UI/UX Mobile App Designer',
    companyName: 'PixelCraft Digital Studios (DEMO)',
    industry: 'Creative & Product Design',
    careerDomain: 'Creative, Media & Design',
    location: 'Remote',
    workMode: 'Remote',
    type: 'FREELANCE',
    duration: '2 Months (Contract)',
    stipendOrSalary: '₹40,000 / project milestone',
    deadline: '18 October 2026',
    matchScore: 82,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Figma', met: true },
      { skill: 'Wireframing & Prototyping', met: true },
      { skill: 'Mobile UI Standards', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'PORTFOLIO_REVIEW',
    experienceRequired: 'Verified portfolio of at least 2 mobile UI case studies',
    description: 'Design user flows, high-fidelity mockups, and interactive prototypes for a regional bilingual fintech mobile application.',
    responsibilities: [
      'Conduct user interviews with non-tech-savvy regional merchants',
      'Create clean component libraries with auto-layout in Figma',
      'Hand off developer-ready design tokens and asset exports'
    ],
    perks: ['Work at your own schedule', 'Milestone-based Escrow payments', 'Long-term retainer opportunity']
  },
  {
    id: 'opp-video-vfx-editor',
    title: 'Commercial Video Editor & Motion Graphics Trainee',
    companyName: 'Rayalaseema Media Network (DEMO)',
    industry: 'Digital Media & Entertainment',
    careerDomain: 'Creative, Media & Design',
    location: 'Anantapur / Hyderabad',
    workMode: 'On-Site',
    type: 'FULL_TIME',
    stipendOrSalary: '₹3.6 – ₹5.0 LPA',
    deadline: '25 October 2026',
    matchScore: 68,
    eligibilityStatus: 'PARTIALLY_ELIGIBLE',
    requiredSkills: [
      { skill: 'Premiere Pro', met: true },
      { skill: 'After Effects', met: false },
      { skill: 'Audio Mixing & Color Grading', met: false }
    ],
    missingSkills: ['After Effects', 'Audio Mixing & Color Grading'],
    trainingPathAvailable: true,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'PORTFOLIO_REVIEW',
    experienceRequired: 'Showreel / 1-minute video demo required',
    description: 'Edit corporate promotional videos, YouTube documentaries, and short-form Reels with motion graphics, captions, and sound design.',
    responsibilities: [
      'Assemble multi-camera video footage into engaging narrative cuts',
      'Apply dynamic titles, lower thirds, and animated infographic overlays',
      'Perform color correction and audio clean-up in Adobe Audition'
    ],
    perks: ['High-end Mac Studio workstation provided', 'Overtime allowances on shoot days', 'Festival incentives']
  },

  // ==========================================
  // 4. MARKETING, BUSINESS & COMMERCE
  // ==========================================
  {
    id: 'opp-digital-marketing-associate',
    title: 'Growth Marketing & Social Media Lead',
    companyName: 'AgroMart Logistics (DEMO)',
    industry: 'E-Commerce & Digital Marketing',
    careerDomain: 'Marketing & Business',
    location: 'Bengaluru / Hybrid',
    workMode: 'Hybrid',
    type: 'FULL_TIME',
    stipendOrSalary: '₹4.5 – ₹6.5 LPA',
    deadline: '22 October 2026',
    matchScore: 76,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Digital Marketing Fundamentals', met: true },
      { skill: 'Google Ads & Meta Ads Manager', met: true },
      { skill: 'SEO & Content Strategy', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: '0 - 2 Years',
    description: 'Scale organic and performance acquisition channels, optimize customer conversion funnels, and manage viral brand campaigns.',
    responsibilities: [
      'Manage targeted Google Search & Meta ad spend with strict ROAS benchmarks',
      'Publish keyword-rich technical blog content to rank in top search results',
      'Analyze Google Analytics 4 event data to reduce user bounce rates'
    ],
    perks: ['Performance-linked quarterly bonuses', 'Health insurance', 'Annual travel allowance']
  },

  // ==========================================
  // 5. AVIATION, TRAVEL & HOSPITALITY
  // ==========================================
  {
    id: 'opp-airline-operations-trainee',
    title: 'Airport Ground Operations & Dispatch Trainee',
    companyName: 'AirSouth Regional Aviation (DEMO)',
    industry: 'Aviation & Airport Logistics',
    careerDomain: 'Aviation, Travel & Hospitality',
    location: 'Hyderabad / Bengaluru International Airport',
    workMode: 'On-Site',
    type: 'FULL_TIME',
    stipendOrSalary: '₹3.8 – ₹5.2 LPA + Flight Concessions',
    deadline: '05 November 2026',
    matchScore: 65,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Fluent English & Regional Communication', met: true },
      { skill: 'Customer Problem Solving', met: true },
      { skill: 'Basic Aviation Regulations', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: 'Any Degree (B.Sc / B.A / B.Com / B.Tech / Aviation)',
    description: 'Manage passenger boarding reconciliation, baggage logistics coordination, aircraft turnaround timelines, and flight crew dispatch.',
    responsibilities: [
      'Verify passenger identification and ticketing records at departure gates',
      'Coordinate ramp operations between fuel crew, caterers, and baggage handlers',
      'Assist special needs passengers and uphold strict DGCA safety protocols'
    ],
    perks: ['Discounted domestic & international airline tickets for family', 'Uniform allowance', 'Airport medical cover']
  },
  {
    id: 'opp-hotel-luxury-associate',
    title: 'Front Office & Guest Relations Executive',
    companyName: 'Heritage Palace & Resorts (DEMO)',
    industry: 'Luxury Hospitality & Tourism',
    careerDomain: 'Aviation, Travel & Hospitality',
    location: 'Tirupati / Bengaluru (On-Site)',
    workMode: 'On-Site',
    type: 'FULL_TIME',
    stipendOrSalary: '₹3.5 – ₹4.8 LPA + Service Charge Share',
    deadline: '12 November 2026',
    matchScore: 66,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Guest Communication', met: true },
      { skill: 'Computer Operations & PMS', met: true },
      { skill: 'Professional Etiquette', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: 'Degree / Diploma in Hotel Management or any Graduate with excellent spoken communication',
    description: 'Deliver welcoming check-in experiences, manage VIP guest itineraries, resolve billing queries, and coordinate room service requests.',
    responsibilities: [
      'Warmly greet domestic and international luxury travelers upon arrival',
      'Operate property management software (Opera) for reservation room keys',
      'Liaise with housekeeping and banquet teams for customized requests'
    ],
    perks: ['Complimentary duty meals in 5-star cafeteria', 'Duty uniform provided', 'Monthly service charge tip pooling']
  },

  // ==========================================
  // 6. AGRICULTURE & PRECISION FARMING
  // ==========================================
  {
    id: 'opp-precision-agri-officer',
    title: 'Precision Agriculture Field Tech Officer',
    companyName: 'Kisan Mitra Agri-Tech AI (DEMO)',
    industry: 'Smart Agriculture & Biotechnology',
    careerDomain: 'Agriculture & Agritech',
    location: 'Anantapur District (Field & Hub)',
    workMode: 'Hybrid',
    type: 'FULL_TIME',
    stipendOrSalary: '₹4.2 – ₹6.0 LPA + Fuel Allowance',
    deadline: '15 November 2026',
    matchScore: 84,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Agriculture Science & Crop Lifecycles', met: true },
      { skill: 'Soil Moisture & Weather Telemetry', met: true },
      { skill: 'Farmer Communication (Telugu)', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'FAST_MATCH',
    experienceRequired: 'B.Sc Agriculture / Horticulture / Science / Rural Studies',
    description: 'Assist groundnut and horticulture farmers in Rayalaseema to deploy automated drip irrigation, soil health sensors, and pest prediction alerts.',
    responsibilities: [
      'Install and calibrate IoT soil sensors across cluster demonstration farms',
      'Explain mobile app advisory recommendations to village farmer cooperatives',
      'Collect crop health verification samples for laboratory spectral analysis'
    ],
    perks: ['Field motorcycle allowance & fuel card', 'Annual performance incentives', 'Direct community uplift impact']
  },

  // ==========================================
  // 7. GOVERNMENT, DEFENCE & PUBLIC SECTOR
  // ==========================================
  {
    id: 'opp-nic-egov-fellowship',
    title: 'National E-Governance Tech Fellowship',
    companyName: 'District Informatics Centre - NIC (DEMO FELLOWSHIP)',
    industry: 'Digital Public Infrastructure',
    careerDomain: 'Government & Public Sector',
    location: 'Anantapur Collectorate (On-Site)',
    workMode: 'On-Site',
    type: 'FELLOWSHIP',
    duration: '1 Year (Extendable to 2 Years)',
    stipendOrSalary: '₹35,000 / month (Stipend from Central Ministry)',
    deadline: '20 November 2026',
    matchScore: 78,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Database Management & SQL', met: true },
      { skill: 'Web Application Deployment', met: true },
      { skill: 'Public Systems Integrity', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: 'Graduates in CS / IT / Electronics / MCA with minimum 65% aggregate',
    description: 'Work directly alongside District Collectors and senior government informatics officers to digitize public welfare schemes, citizen grievance portals, and welfare DBT pipelines.',
    responsibilities: [
      'Maintain reliable uptime for village secretariat (Grama Sachivalayam) data APIs',
      'Audit cyber hygiene and firewall compliance across municipal computers',
      'Design public dashboards visualizing welfare scheme beneficiary delivery'
    ],
    perks: ['Official Government Fellowship Certificate signed by Ministry', 'High recommendation value for civil services / PSU exams', 'Full health coverage']
  },

  // ==========================================
  // 8. HACKATHONS, COMPETITIONS & SCHOLARSHIPS
  // ==========================================
  {
    id: 'opp-smart-india-hackathon',
    title: 'Smart India Hackathon 2026 (SIH-26044 National Track)',
    companyName: 'Ministry of Education & AICTE (DEMO EVENT)',
    industry: 'National Innovation Competition',
    careerDomain: 'Technology & AI',
    location: 'National Grand Finale (Host Institute)',
    workMode: 'Hybrid',
    type: 'HACKATHON',
    duration: '36-Hour Non-Stop Coding Grand Finale',
    stipendOrSalary: '₹1,00,000 Cash Prize Per Problem Statement',
    deadline: '30 September 2026',
    matchScore: 95,
    eligibilityStatus: 'ELIGIBLE',
    requiredSkills: [
      { skill: 'Full Stack Web Development', met: true },
      { skill: 'Problem Solving & Ideation', met: true },
      { skill: 'Live Prototype Deployment', met: true }
    ],
    missingSkills: [],
    trainingPathAvailable: false,
    isVerifiedCompany: true,
    isSampleDemo: true,
    applicationMode: 'DIRECT_APPLY',
    experienceRequired: 'Any Enrolled College Student Team (6 members with at least 1 female teammate)',
    description: 'Solve real-world government and industry challenge statement SIH26044: "SkillBridge AI - Bridging Academic Pedagogy with Industrial Execution".',
    responsibilities: [
      'Build end-to-end working MVP prototype under 36 hours',
      'Defend code integrity and architecture in front of Ministry judges',
      'Demonstrate tangible benefits for students, colleges, and employers'
    ],
    perks: ['Pre-placement interviews with sponsoring Fortune 500 tech companies', 'Incubation grant eligibility up to ₹10 Lakhs', 'National Winner Trophy']
  }
];
