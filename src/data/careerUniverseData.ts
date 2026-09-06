export interface CareerUniverseItem {
  id: string;
  title: string;
  category:
    | 'Technology & AI'
    | 'Engineering & Hardware'
    | 'Creative & Media'
    | 'Business & Marketing'
    | 'Government & Defence'
    | 'Aviation & Logistics'
    | 'Hospitality & Tourism'
    | 'Agriculture & Environment'
    | 'Skilled Professions';
  description: string;
  matchScore: number;
  isPrimaryMatch?: boolean;
  matchReasons: string[];
  currentStrengths: string[];
  missingSkills: string[];
  requiredQualifications: string[];
  recommendedLearning: string[];
  recommendedCertifications: string[];
  relevantProjects: string[];
  relevantInternships: string[];
  relevantJobs: string[];
  nextBestAction: string;
  avgSalaryRange: string;
  industryDemand: 'CRITICAL' | 'HIGH' | 'SURGING' | 'STEADY';
}

export const careerUniverse: CareerUniverseItem[] = [
  {
    id: 'career-fullstack-dev',
    title: 'Full Stack Developer',
    category: 'Technology & AI',
    description: 'Architect and deploy modern web applications across responsive frontend, asynchronous API servers, and scalable cloud databases.',
    matchScore: 92,
    isPrimaryMatch: true,
    matchReasons: [
      'Strong declared interest in web engineering and distributed systems',
      'Demonstrated intermediate proficiency in React, TypeScript, and SQL',
      'Verified live deployed portfolio project (AgriTrade AI)',
      'Passed practical proctored viva on component architecture'
    ],
    currentStrengths: ['React 19 & Hooks', 'TypeScript ES6+', 'PostgreSQL & Relational Design', 'Agile Git Workflow'],
    missingSkills: ['Node.js Async Streams', 'Docker Container Orchestration', 'Automated Jest / Playwright Testing'],
    requiredQualifications: [
      'Bachelor’s in Computer Science, BCA, B.Tech, or equivalent verified portfolio',
      'Demonstrated code repositories with live demo links',
      'Fundamental understanding of HTTP, REST, and caching'
    ],
    recommendedLearning: [
      'Node.js & Express Production Microservices',
      'Docker for Full Stack Engineers',
      'Full Stack Testing with Vitest & Playwright'
    ],
    recommendedCertifications: [
      'SkillBridge Proctored Full Stack Developer Passport',
      'Meta Certified Frontend & Backend Developer',
      'AWS Certified Cloud Practitioner'
    ],
    relevantProjects: [
      'AgriTrade AI - Farmer Crop Market Price Discovery Platform',
      'FinPulse - Startup Payroll & Expense Tracking System'
    ],
    relevantInternships: [
      'Junior React Frontend Intern @ NovaSoft Cloud Labs',
      'Full Stack Engineering Intern @ FinPulse Tech Solutions'
    ],
    relevantJobs: [
      'Junior Full Stack Developer @ CloudScale Systems (₹6.5 - ₹8.0 LPA)',
      'Web Application Engineer @ Rayalaseema Tech Systems (₹5.0 - ₹7.0 LPA)'
    ],
    nextBestAction: 'Complete the Node.js backend practical challenge and deploy your API with Docker containerization to raise readiness from 78% to 90%.',
    avgSalaryRange: '₹5.5 LPA – ₹14.0 LPA',
    industryDemand: 'CRITICAL'
  },
  {
    id: 'career-ai-automation',
    title: 'AI Automation & Agents Engineer',
    category: 'Technology & AI',
    description: 'Design autonomous AI workflows, LLM orchestration pipelines, function-calling agent swarms, and enterprise workflow automations.',
    matchScore: 84,
    matchReasons: [
      'Active interest in Generative AI applications and LLM agent frameworks',
      'Verified Python coding assessment passed with 92% viva defense',
      'Hands-on prompt engineering and API integration demonstrated'
    ],
    currentStrengths: ['Python Systems', 'Prompt Engineering', 'REST API Integration', 'Data Parsing'],
    missingSkills: ['LangChain / LlamaIndex Orchestration', 'Vector Embeddings & RAG Optimization', 'Agent Safety Guardrails'],
    requiredQualifications: [
      'Degree in CS / IT / Engineering or verified portfolio of AI automations',
      'Experience with modern LLM SDKs and vector databases'
    ],
    recommendedLearning: [
      'Building Autonomous AI Agents with Python',
      'RAG & Vector Search with Pinecone & LangChain',
      'Generative AI for Enterprise Automation'
    ],
    recommendedCertifications: [
      'SkillBridge AI Agent Engineer Certification',
      'DeepLearning.AI LangChain Developer'
    ],
    relevantProjects: [
      'AgriTrade AI Multimodal Query Assistant',
      'Automated Resume Screening Agent Pipeline'
    ],
    relevantInternships: [
      'AI & Automation Engineering Intern @ Agrismart Technologies',
      'GenAI Solutions Trainee @ NovaSoft Labs'
    ],
    relevantJobs: [
      'AI Solutions Associate @ Cognizant Tech (₹6.0 - ₹9.0 LPA)',
      'Junior AI Automation Engineer @ MindTickle (₹7.0 - ₹11.0 LPA)'
    ],
    nextBestAction: 'Build a practical multi-agent customer query triage project with local vector retrieval.',
    avgSalaryRange: '₹6.0 LPA – ₹16.0 LPA',
    industryDemand: 'SURGING'
  },
  {
    id: 'career-ui-ux-designer',
    title: 'UI/UX Product Designer',
    category: 'Creative & Media',
    description: 'Transform user requirements into intuitive wireframes, responsive design systems, accessibility-audited prototypes, and component libraries.',
    matchScore: 78,
    matchReasons: [
      'Strong aesthetic appreciation for responsive layouts and clean negative space',
      'Hands-on Tailwind CSS component structuring experience',
      'Good empathy for regional user behavior and offline-first interfaces'
    ],
    currentStrengths: ['Tailwind CSS & Utility Design', 'Component Hierarchy', 'Visual Spacing Math'],
    missingSkills: ['Figma Auto-Layout & Variants', 'User Journey Mapping & Usability Testing', 'WCAG 2.1 Accessibility Audits'],
    requiredQualifications: [
      'Any Bachelor degree or proven Figma portfolio of case studies',
      'Portfolio showcasing problem statements, wireframes, and final interactive prototypes'
    ],
    recommendedLearning: [
      'Advanced Figma for Enterprise Design Systems',
      'User Research & Usability Testing Masterclass',
      'Design Tokens & Frontend Bridge'
    ],
    recommendedCertifications: [
      'Google UX Design Professional Certificate',
      'Interaction Design Foundation (IxDF) Certification'
    ],
    relevantProjects: [
      'E-Commerce Checkout Redesign for Low-Bandwidth Users',
      'SkillBridge Navigation Redesign Concept'
    ],
    relevantInternships: [
      'UI/UX Design Intern @ Rayalaseema Digital Media',
      'Product Design Fellow @ Freshworks Startup Incubator'
    ],
    relevantJobs: [
      'Associate UI/UX Designer @ Swiggy / Zomato (₹5.0 - ₹8.5 LPA)',
      'Junior Product Designer @ Zoho Corp (₹6.0 - ₹9.0 LPA)'
    ],
    nextBestAction: 'Publish a 3-page case study on Figma showing mobile-first redesign of a regional governance app.',
    avgSalaryRange: '₹4.5 LPA – ₹12.0 LPA',
    industryDemand: 'HIGH'
  },
  {
    id: 'career-cybersecurity-analyst',
    title: 'Cybersecurity & SOC Analyst',
    category: 'Technology & AI',
    description: 'Monitor enterprise networks, detect security breaches, conduct vulnerability assessments, and implement zero-trust defense architectures.',
    matchScore: 71,
    matchReasons: [
      'Strong analytical reasoning and core computer science fundamentals',
      'Basic networking and operating systems coursework completed'
    ],
    currentStrengths: ['Operating Systems Concepts', 'SQL Security Awareness', 'Terminal & Linux CLI'],
    missingSkills: ['Network Packet Analysis (Wireshark)', 'SIEM Log Monitoring (Splunk)', 'OWASP Top 10 Penetration Testing'],
    requiredQualifications: [
      'B.Tech / B.Sc in CS, IT, Electronics, or Cyber Forensics',
      'Familiarity with TCP/IP, firewalls, and incident response lifecycles'
    ],
    recommendedLearning: [
      'CompTIA Security+ Exam Preparation',
      'Hands-on SOC Analyst Training on TryHackMe',
      'Defensive Security & Incident Response'
    ],
    recommendedCertifications: [
      'CompTIA Security+ / CEH',
      'Cisco Certified CyberOps Associate'
    ],
    relevantProjects: ['Network Vulnerability Scanner Script', 'Log Anomaly Detector in Python'],
    relevantInternships: ['Junior Security Trainee @ QuickHeal Labs', 'Cyber Defense Intern @ State Police Tech Cell'],
    relevantJobs: ['SOC Analyst L1 @ Wipro / Infosys (₹4.2 - ₹6.5 LPA)', 'Information Security Associate @ HCL (₹4.8 - ₹7.0 LPA)'],
    nextBestAction: 'Complete the TryHackMe Pre-Security track and verify your Linux firewall configuration.',
    avgSalaryRange: '₹4.8 LPA – ₹11.5 LPA',
    industryDemand: 'CRITICAL'
  },
  {
    id: 'career-iot-embedded',
    title: 'Embedded Systems & IoT Hardware Engineer',
    category: 'Engineering & Hardware',
    description: 'Design microcontrollers, firmware in C/C++, sensor integrations, PCB schematics, and edge computing nodes for smart agriculture and industrial automation.',
    matchScore: 68,
    matchReasons: [
      'Demonstrated interest in regional hardware and AgriTech sensor telemetry',
      'Solid programming foundations adaptable to low-level C and microcontrollers'
    ],
    currentStrengths: ['Logical Circuit Fundamentals', 'Algorithm Optimization', 'Python Serial Scripting'],
    missingSkills: ['Embedded C / C++ for Microcontrollers', 'ESP32 / STM32 Hardware Architecture', 'PCB Schematic Design in KiCAD'],
    requiredQualifications: [
      'B.Tech / B.Sc in Electronics, Electrical, Computer Science, or Mechatronics',
      'Experience with hardware breadboards, oscilloscopes, and serial protocols (UART, I2C, SPI)'
    ],
    recommendedLearning: [
      'Mastering Embedded Systems with ARM Cortex-M',
      'IoT Sensor Networks with ESP32 & MQTT',
      'PCB Design Fundamentals with KiCad'
    ],
    recommendedCertifications: [
      'ARM Accredited Engineer',
      'SkillBridge Practical Hardware & IoT Passport'
    ],
    relevantProjects: ['Solar-Powered Soil Moisture Telemetry Node', 'Smart Warehouse Temperature & Humidity Logger'],
    relevantInternships: ['Hardware Engineering Trainee @ Anantapur Digital Hub', 'IoT Firmware Intern @ Stellantis / Bosch'],
    relevantJobs: ['Embedded Firmware Engineer @ L&T Tech Services (₹4.5 - ₹7.5 LPA)', 'Hardware Test Engineer @ Visteon (₹5.0 - ₹8.0 LPA)'],
    nextBestAction: 'Build an ESP32 sensor telemetry breadboard demo sending sensor data to an MQTT broker.',
    avgSalaryRange: '₹4.2 LPA – ₹10.5 LPA',
    industryDemand: 'HIGH'
  },
  {
    id: 'career-vfx-video-editor',
    title: 'VFX & Motion Graphics Specialist',
    category: 'Creative & Media',
    description: 'Produce high-impact visual effects, 3D animations, cinematic video editing, color grading, and commercial media for film, digital ad agencies, and gaming.',
    matchScore: 65,
    matchReasons: [
      'Creative visual design interest and media production aptitude',
      'Demonstrated understanding of digital rendering pipelines and visual pacing'
    ],
    currentStrengths: ['Visual Storytelling', 'Media Organization', 'Attention to Visual Detail'],
    missingSkills: ['Adobe Premiere Pro & After Effects', 'Blender / Maya 3D Modeling', 'DaVinci Resolve Color Grading'],
    requiredQualifications: [
      'Any degree or diploma in Visual Arts, Animation, Multimedia, or verified showreel',
      'A high-quality 60-second video showreel displaying rotoscoping, camera tracking, and compositing'
    ],
    recommendedLearning: [
      'Complete After Effects & Motion Design Masterclass',
      'Blender 4.0 3D Modeling & Visual FX',
      'Cinematic Editing & DaVinci Color Science'
    ],
    recommendedCertifications: [
      'Adobe Certified Professional in Visual Design',
      'SkillBridge Creative Media Showreel Verification'
    ],
    relevantProjects: ['Commercial Brand Motion Promo (30s)', 'VFX Clean Plate & CGI Integration Shot'],
    relevantInternships: ['Video Production Intern @ Rayalaseema Digital', 'Motion Graphics Trainee @ Tamada Media'],
    relevantJobs: ['Motion Graphic Designer @ Byju’s / Vedantu (₹4.0 - ₹6.5 LPA)', 'VFX Compositor @ Prasad Labs Hyderabad (₹4.5 - ₹7.0 LPA)'],
    nextBestAction: 'Create a 45-second kinetic typography and 3D product motion reel and upload to YouTube/Vimeo.',
    avgSalaryRange: '₹3.8 LPA – ₹9.0 LPA',
    industryDemand: 'STEADY'
  },
  {
    id: 'career-digital-marketing',
    title: 'Digital Marketing & Growth Strategist',
    category: 'Business & Marketing',
    description: 'Drive user acquisition, search engine optimization (SEO), performance marketing campaigns, data-driven analytics, and social media viral growth.',
    matchScore: 74,
    matchReasons: [
      'Good understanding of web analytics, conversion metrics, and content dissemination',
      'Analytical aptitude for testing variations and data-informed decision making'
    ],
    currentStrengths: ['Data Analysis & Spreadsheets', 'Content Structuring', 'Consumer Empathy'],
    missingSkills: ['Google Ads & Meta Ads Manager', 'Technical SEO Auditing', 'HubSpot / Mailchimp Marketing Automation'],
    requiredQualifications: [
      'Any Bachelor’s degree in Business, Commerce, Arts, Science, or Engineering',
      'Demonstrated portfolio of live campaign metrics or social audience growth'
    ],
    recommendedLearning: [
      'Google Search & Display Ads Certification Course',
      'Technical SEO & Content Strategy Masterclass',
      'Growth Marketing & Funnel Optimization'
    ],
    recommendedCertifications: [
      'Google Digital Marketing & E-commerce Professional',
      'HubSpot Inbound Marketing Certified'
    ],
    relevantProjects: ['College Tech Fest Organic Reach Campaign (20K Impressions)', 'Local Business Google Business Profile SEO Optimization'],
    relevantInternships: ['Growth Marketing Intern @ Agrismart Tech', 'Social Media Trainee @ Andhra Tourism Partner'],
    relevantJobs: ['Performance Marketing Associate @ Meesho (₹4.5 - ₹7.2 LPA)', 'SEO Specialist @ Merkle Sokrati (₹4.0 - ₹6.5 LPA)'],
    nextBestAction: 'Run a verified A/B copy test on a landing page and document conversion rate improvements.',
    avgSalaryRange: '₹3.6 LPA – ₹8.5 LPA',
    industryDemand: 'HIGH'
  },
  {
    id: 'career-aviation-pilot',
    title: 'Commercial Pilot & Aviation Systems Officer',
    category: 'Aviation & Logistics',
    description: 'Navigate commercial aircraft, manage cockpit avionics, oversee flight operations safety, air traffic communication, and airline logistics.',
    matchScore: 60,
    matchReasons: [
      'Physics and Mathematics background in senior secondary / degree level',
      'Strong spatial reasoning, situational awareness, and protocol discipline'
    ],
    currentStrengths: ['Discipline & Protocol Adherence', 'Mathematics & Spatial Acumen', 'Stress Management'],
    missingSkills: ['DGCA Commercial Pilot License (CPL) Theory', 'Radio Telephony Restricted (RTR-Aero)', 'Instrument Flying (IFR) & Multi-Engine Rating'],
    requiredQualifications: [
      '10+2 with Physics & Mathematics (minimum 50%) or equivalent degree',
      'Class 1 DGCA Medical Fitness Certificate',
      '200 hours of approved flying training at a DGCA-certified flying club'
    ],
    recommendedLearning: [
      'Air Navigation & Flight Planning Ground Studies',
      'Aviation Meteorology & Weather Radar Analysis',
      'Air Regulations & ATC Procedures (DGCA Syllabus)'
    ],
    recommendedCertifications: [
      'DGCA Commercial Pilot License (CPL)',
      'Radio Telephony Restricted License (WPC / MoC)'
    ],
    relevantProjects: ['Flight Simulator Instrument Landing Practice Logs', 'Cross-Country VFR Flight Planning Charting'],
    relevantInternships: ['Airport Operations Trainee @ GMR Hyderabad International', 'Flight Dispatch Assistant @ Indigo Airlines'],
    relevantJobs: ['First Officer (Junior Pilot) @ IndiGo / Air India (₹18.0 - ₹28.0 LPA)', 'Flight Dispatcher @ SpiceJet (₹4.5 - ₹7.0 LPA)'],
    nextBestAction: 'Book a DGCA Class 2 medical exam appointment and complete the Air Regulations ground theory primer.',
    avgSalaryRange: '₹15.0 LPA – ₹35.0 LPA',
    industryDemand: 'SURGING'
  },
  {
    id: 'career-hospitality-hotel-mgmt',
    title: 'Hospitality & Luxury Resort Manager',
    category: 'Hospitality & Tourism',
    description: 'Direct five-star hotel operations, luxury guest experiences, banquet events, food & beverage revenue management, and tourism ecosystem partnerships.',
    matchScore: 62,
    matchReasons: [
      'High social intelligence, verbal communication, and team coordination skills',
      'Interest in service economy excellence, event organization, and hospitality leadership'
    ],
    currentStrengths: ['Customer Communication', 'Event Coordination', 'Conflict Resolution'],
    missingSkills: ['Opera / PMS Hotel Management Software', 'Food & Beverage Cost Control', 'Revenue & Yield Management Strategies'],
    requiredQualifications: [
      'Degree or Diploma in Hotel Management (BHM / B.Sc Hospitality) or any Bachelor’s with service leadership experience',
      'Fluency in English, Hindi, and regional languages'
    ],
    recommendedLearning: [
      'Luxury Hospitality Front Office & Guest Experience Masterclass',
      'F&B Operations, Hygiene & HACCP Standards',
      'Hotel Revenue & Room Yield Management'
    ],
    recommendedCertifications: [
      'American Hotel & Lodging Educational Institute (AHLEI) Certification',
      'SkillBridge Hospitality Customer Excellence Certificate'
    ],
    relevantProjects: ['College 500-Guest International Conference Hospitality Logistics', 'Local Boutique Hotel Guest Satisfaction Survey & Action Plan'],
    relevantInternships: ['Hospitality Associate Intern @ Taj Falaknuma / Marriott Hyderabad', 'Guest Relations Trainee @ ITC Grand Chola'],
    relevantJobs: ['Management Trainee (Hotel Operations) @ Oberoi Group (₹4.2 - ₹6.0 LPA)', 'Guest Service Manager @ IHG Hotels (₹4.5 - ₹7.0 LPA)'],
    nextBestAction: 'Complete the Hotel Front Office Software simulation and obtain food safety certification.',
    avgSalaryRange: '₹3.8 LPA – ₹9.5 LPA',
    industryDemand: 'STEADY'
  },
  {
    id: 'career-agritech-specialist',
    title: 'Smart Agriculture & Drone Tech Specialist',
    category: 'Agriculture & Environment',
    description: 'Deploy precision farming technologies, agricultural drones for crop health mapping, automated micro-irrigation systems, and digital market linkage.',
    matchScore: 82,
    matchReasons: [
      'Deep regional grounding in Rayalaseema agricultural economy and farming challenges',
      'Demonstrated work on AgriTrade AI crop pricing discovery algorithms',
      'Knowledge of local farmer communication and multilingual workflows'
    ],
    currentStrengths: ['AgriTech Domain Understanding', 'Python Data Processing', 'Regional Farmer Field Empathy'],
    missingSkills: ['DGCA Drone Pilot Remote Certification (RPC)', 'Multispectral NDVI Imagery Analysis', 'Soil Sensor Calibration & Telemetry'],
    requiredQualifications: [
      'Degree in Agriculture, B.Sc, B.Tech, or Engineering with certified precision agriculture training',
      'DGCA Drone Pilot License (for aerial mapping roles)'
    ],
    recommendedLearning: [
      'Precision Agriculture & GIS Remote Sensing',
      'Agricultural Drone Operations & Crop Spraying',
      'Soil Health Sensors & Automated Drip Automation'
    ],
    recommendedCertifications: [
      'DGCA Remote Pilot Certificate (RPC)',
      'SkillBridge Regional AgriTech Certified Specialist'
    ],
    relevantProjects: ['AgriTrade AI - Farmer Crop Market Discovery', 'IoT Soil Moisture Automated Drip Trigger'],
    relevantInternships: ['AgriTech Solutions Intern @ Kisan Mitra Anantapur', 'Precision Farming Trainee @ ICRISAT Hyderabad'],
    relevantJobs: ['Precision Agriculture Associate @ DeHaat / AgroStar (₹4.5 - ₹7.0 LPA)', 'Agronomy Tech Specialist @ Coromandel International (₹4.2 - ₹6.8 LPA)'],
    nextBestAction: 'Enroll in the 5-day DGCA drone pilot flight simulation training at AIC-SKU incubator.',
    avgSalaryRange: '₹4.0 LPA – ₹9.0 LPA',
    industryDemand: 'HIGH'
  },
  {
    id: 'career-gov-civil-defence',
    title: 'Public Sector Tech & Defence Systems Officer',
    category: 'Government & Defence',
    description: 'Develop digital public infrastructure, cybersecurity for defence services, national satellite telemetry, and public sector administrative informatics.',
    matchScore: 69,
    matchReasons: [
      'Strong civic commitment to public infrastructure, digital governance, and national security',
      'Disciplined academic track record meeting state and central examination eligibilities'
    ],
    currentStrengths: ['Civic Ethics & General Studies', 'Analytical Aptitude', 'Technical Foundations'],
    missingSkills: ['UPSC / APPSC Technical Exam Syllabi', 'Govt E-Governance Standards (GeM, NIC)', 'DRDO / ISRO Specialized Engineering Topics'],
    requiredQualifications: [
      'Bachelor’s Degree in any discipline from a recognized university (UGC / AICTE accredited)',
      'Indian Citizenship with age requirements per examination notification'
    ],
    recommendedLearning: [
      'Digital India Architecture & E-Governance Systems',
      'National Security & Defence Technology Overview',
      'Public Administration & Cyber Law in India'
    ],
    recommendedCertifications: [
      'NIC Certified E-Governance Professional',
      'National Cyber Security Cadre Training'
    ],
    relevantProjects: ['Panchayat Digital Land Record Query Prototype', 'Offline Disaster Relief Coordination App'],
    relevantInternships: ['District Collectorate E-Governance Intern @ Anantapur NIC', 'Research Trainee @ AP Innovation Society'],
    relevantJobs: ['Scientist / Engineer ‘SC’ @ ISRO / DRDO (₹10.5 - ₹14.0 LPA)', 'Technical Officer @ Bharat Electronics Limited (BEL) (₹6.5 - ₹9.0 LPA)'],
    nextBestAction: 'Review the technical syllabus for DRDO / NIC Scientist B examination and practice previous year papers.',
    avgSalaryRange: '₹6.5 LPA – ₹14.0 LPA',
    industryDemand: 'STEADY'
  },
  {
    id: 'career-ev-battery-tech',
    title: 'Electric Vehicle & Battery Systems Specialist',
    category: 'Engineering & Hardware',
    description: 'Design and calibrate high-voltage battery management systems (BMS), thermal cooling circuits, inverter motor drives, and EV charging station telemetry.',
    matchScore: 79,
    matchReasons: [
      'Strong technical grounding in circuit design and microcontroller logic',
      'High growth sector in Andhra Pradesh with Kia and automotive tier-1 supplier plants nearby',
      'Transferable electrical and embedded programming foundations'
    ],
    currentStrengths: ['Circuit Analysis', 'Microcontroller Logic', 'Safety Protocols'],
    missingSkills: ['CAN-Bus Automotive Protocol', 'Lithium-Ion BMS Diagnostics', 'High-Voltage Safety Cert'],
    requiredQualifications: [
      'Diploma, B.Tech or B.Sc in Electrical, Electronics, Automobile or Mechanical Engineering',
      'High-voltage safety compliance certificate'
    ],
    recommendedLearning: [
      'Electric Vehicle Powertrain Architecture',
      'CAN-Bus Automotive Communication & Telemetry',
      'Battery Management System (BMS) Calibration'
    ],
    recommendedCertifications: [
      'SkillBridge Certified EV Powertrain Specialist',
      'Automotive Skills Development Council (ASDC) Level 5'
    ],
    relevantProjects: ['Arduino BMS Cell Voltage Balancer', 'Smart EV Charging Station IoT Logger'],
    relevantInternships: ['EV Diagnostic Trainee @ Rayalaseema Motors', 'Battery Pack Assembly Intern @ Amara Raja Batteries'],
    relevantJobs: ['EV Systems Engineer @ Ather Energy / Ola Electric (₹5.5 - ₹8.5 LPA)', 'Field Service Specialist @ Tata Power Solar & EV (₹4.2 - ₹6.5 LPA)'],
    nextBestAction: 'Complete the CAN-Bus automotive protocol sandbox and analyze battery cell telemetry logs.',
    avgSalaryRange: '₹4.5 LPA – ₹10.0 LPA',
    industryDemand: 'SURGING'
  },
  {
    id: 'career-solar-renewable-engineer',
    title: 'Solar PV & Renewable Energy Systems Engineer',
    category: 'Engineering & Hardware',
    description: 'Plan, install, and optimize utility-scale solar photovoltaic farms, rooftop solar arrays, grid tie-in inverters, and battery energy storage telemetry.',
    matchScore: 81,
    matchReasons: [
      'Rayalaseema is a major renewable energy hub with 5000+ MW active solar and wind installations',
      'High regional recruiter demand for technical supervisors and SCADA telemetry engineers'
    ],
    currentStrengths: ['Technical Design', 'Field Testing Aptitude', 'Data Analysis'],
    missingSkills: ['PVsyst Solar Modeling Software', 'SCADA Solar Farm Telemetry', 'Grid Synchronization Protocols'],
    requiredQualifications: [
      'Degree or Diploma in Electrical, Electronics, Instrumentation or Environmental Engineering',
      'Certification in Solar PV Design'
    ],
    recommendedLearning: [
      'Utility-Scale Solar PV Design & PVsyst',
      'SCADA Systems for Renewable Power Plants',
      'Grid Code & Inverter Synchronization'
    ],
    recommendedCertifications: [
      'Suryamitra Skill Development Program Certified',
      'SkillBridge Clean Energy Systems Passport'
    ],
    relevantProjects: ['Solar Irradiation IoT Logger & Cloud Dashboard', 'Automated Solar Panel Tilt Tracking Rig'],
    relevantInternships: ['Solar Site Operations Intern @ Anantapur Ultra Mega Solar Park', 'Renewable Trainee @ AP Transco'],
    relevantJobs: ['Solar Project Engineer @ Tata Power Renewables (₹5.0 - ₹7.5 LPA)', 'Renewable Plant Supervisor @ Adani Green Energy (₹4.8 - ₹7.2 LPA)'],
    nextBestAction: 'Learn PVsyst system sizing modeling to simulate annual kilowatt-hour energy generation.',
    avgSalaryRange: '₹4.5 LPA – ₹9.5 LPA',
    industryDemand: 'HIGH'
  },
  {
    id: 'career-supply-chain-logistics',
    title: 'Multimodal Supply Chain & Logistics Planner',
    category: 'Aviation & Logistics',
    description: 'Coordinate warehouse automation, cold-storage logistics for horticulture produce, GPS fleet telematics, and cross-dock freight distribution across South India.',
    matchScore: 76,
    matchReasons: [
      'Anantapur is strategically positioned along the Bengaluru-Hyderabad NH-44 freight corridor',
      'Surging requirement for warehouse operations and e-commerce fulfillment planners'
    ],
    currentStrengths: ['Process Optimization', 'Spreadsheet Modeling', 'Vendor Coordination'],
    missingSkills: ['Warehouse Management Systems (WMS)', 'Route Optimization Algorithms', 'Cold Chain Telematics'],
    requiredQualifications: [
      'Degree in Commerce, Management, Science, Logistics or Engineering',
      'Proficiency in ERP / WMS tools and spreadsheet data analysis'
    ],
    recommendedLearning: [
      'Modern Warehouse Management Systems (WMS)',
      'Supply Chain Analytics & Forecasting in Excel/Python',
      'Cold Chain Telematics & Food Safety Standards'
    ],
    recommendedCertifications: [
      'SkillBridge Certified Logistics & Supply Chain Planner',
      'APICS Certified Supply Chain Associate (CSCA)'
    ],
    relevantProjects: ['Horticulture Cold-Storage Transit Loss Estimator', 'Fleet Fuel & GPS Waypoint Tracker'],
    relevantInternships: ['Logistics Operations Intern @ Delhivery Anantapur Hub', 'Supply Chain Trainee @ Flipkart Fulfillment Center'],
    relevantJobs: ['Supply Chain Analyst @ Amazon Transportation Services (₹5.0 - ₹7.5 LPA)', 'Logistics Operations Lead @ Bluedart / DHL (₹4.2 - ₹6.8 LPA)'],
    nextBestAction: 'Review the Warehouse Management Systems (WMS) inventory cycle counting case study.',
    avgSalaryRange: '₹4.0 LPA – ₹8.5 LPA',
    industryDemand: 'HIGH'
  },
  {
    id: 'career-ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    category: 'Technology & AI',
    description: 'Design, train, and deploy deep learning models, computer vision systems, natural language processing pipelines, and production machine learning microservices.',
    matchScore: 89,
    matchReasons: [
      'Strong foundational proficiency in Python, linear algebra, and data structures',
      'Demonstrated interest in neural network architectures and model evaluation',
      'Completed practical code defense in predictive algorithms and data modeling'
    ],
    currentStrengths: ['Python Systems & NumPy', 'Data Preprocessing & EDA', 'REST API Integration', 'Git Architecture'],
    missingSkills: ['PyTorch / TensorFlow Deep Learning', 'MLOps & Model Serving (FastAPI / Docker)', 'Vector Databases & LLM Fine-Tuning'],
    requiredQualifications: [
      'B.Sc / B.Tech in Computer Science, Data Science, Mathematics, or equivalent verified portfolio',
      'Demonstrated machine learning GitHub repository with model weights and evaluation metrics',
      'Strong grasp of probability, calculus, and matrix operations'
    ],
    recommendedLearning: [
      'Practical Deep Learning with PyTorch & torchvision',
      'Production MLOps: Serving Models with Docker & Kubernetes',
      'Natural Language Processing with Transformers & Hugging Face'
    ],
    recommendedCertifications: [
      'SkillBridge Proctored Machine Learning Engineer Passport',
      'TensorFlow Developer Certificate',
      'AWS Certified Machine Learning - Specialty'
    ],
    relevantProjects: [
      'AgriTrade AI - Groundnut & Cotton Crop Pest Detection with ResNet-50',
      'Telugu Speech-to-Text Clinical Transcription Prototype'
    ],
    relevantInternships: [
      'Machine Learning Research Intern @ IIIT Hyderabad Robotics Lab',
      'Computer Vision Trainee @ NovaSoft Intelligence'
    ],
    relevantJobs: [
      'Junior ML Engineer @ MindTickle AI Labs (₹7.5 - ₹12.0 LPA)',
      'Data Science Associate @ Fractal Analytics (₹6.5 - ₹9.5 LPA)'
    ],
    nextBestAction: 'Build a containerized FastAPI endpoint serving an image classifier model and defense your architecture viva.',
    avgSalaryRange: '₹7.0 LPA – ₹18.0 LPA',
    industryDemand: 'CRITICAL'
  },
  {
    id: 'career-graphic-visual-designer',
    title: 'Graphic & Visual Designer',
    category: 'Creative & Media',
    description: 'Create compelling brand identities, visual communication systems, social marketing assets, typography layouts, packaging, and digital illustrations.',
    matchScore: 82,
    matchReasons: [
      'Strong eye for color harmony, typography hierarchy, and visual balance',
      'Demonstrated interest in digital branding, vector illustration, and print media',
      'Created marketing collateral for college fests and local enterprises'
    ],
    currentStrengths: ['Visual Hierarchy & Composition', 'Color Theory & Branding', 'Creative Typography', 'Raster & Vector Graphics'],
    missingSkills: ['Figma Design Systems & Components', 'Adobe Illustrator Vector Mastery', 'Motion Design & After Effects Basics'],
    requiredQualifications: [
      'Degree or Diploma in Graphic Design, Fine Arts, Visual Communication, or strong Behance/Dribbble portfolio',
      'Comprehensive portfolio showcasing real brand identities and editorial designs'
    ],
    recommendedLearning: [
      'Mastering Adobe Illustrator for Vector Art & Brand Guidelines',
      'Typography, Grid Systems & Editorial Layout Mastery',
      'Modern Motion Design for Social Media with After Effects'
    ],
    recommendedCertifications: [
      'Adobe Certified Professional in Visual Design',
      'SkillBridge Verified Graphic Design Portfolio Certificate'
    ],
    relevantProjects: [
      'Complete Brand Identity for Rayalaseema Organic Millet Cooperative',
      'College Annual Cultural Fest Poster & Merchandise Visual Identity System'
    ],
    relevantInternships: [
      'Graphic Design Intern @ Ogilvy Regional Studio',
      'Brand Designer Trainee @ Swiggy Creative Labs'
    ],
    relevantJobs: [
      'Visual Designer @ Zoho Design Studio (₹4.5 - ₹7.0 LPA)',
      'Brand Identity Specialist @ Dentsu Creative (₹4.8 - ₹7.5 LPA)'
    ],
    nextBestAction: 'Compile a Behance case study with before/after branding transformations for a regional enterprise.',
    avgSalaryRange: '₹4.0 LPA – ₹9.5 LPA',
    industryDemand: 'HIGH'
  },
  {
    id: 'career-mechanical-cad-engineer',
    title: 'Mechanical & CAD Systems Engineer',
    category: 'Engineering & Hardware',
    description: 'Design precision mechanical components, 3D CAD parametric models, automotive assemblies, manufacturing tooling, and robotic structural frames.',
    matchScore: 80,
    matchReasons: [
      'Aptitude for mechanical physics, geometric dimensioning, and kinematic mechanisms',
      'Interest in CAD 3D modeling, CNC machining, and additive manufacturing',
      'Practical coursework in engineering mechanics and strength of materials'
    ],
    currentStrengths: ['Spatial Reasoning & 3D Visualization', 'Engineering Mathematics', 'Technical Documentation'],
    missingSkills: ['SolidWorks / CATIA 3D Parametric Modeling', 'Geometric Dimensioning and Tolerancing (GD&T)', 'Finite Element Analysis (FEA / ANSYS)'],
    requiredQualifications: [
      'Degree or Diploma in Mechanical, Production, Automobile, or Mechatronics Engineering',
      'Proficiency in standard 3D CAD modeling software with technical drawings'
    ],
    recommendedLearning: [
      'SolidWorks CSWA & CSWP Professional Certification Track',
      'GD&T per ASME Y14.5 Standards for Manufacturing',
      'Introduction to Structural Analysis with ANSYS Mechanical'
    ],
    recommendedCertifications: [
      'Certified SolidWorks Professional (CSWP)',
      'SkillBridge CAD & Mechanical Systems Passport'
    ],
    relevantProjects: [
      'Automated Solar Tracking Rig Mechanism Design & 3D Assembly',
      'Lightweight Drone Airframe Structural Optimization in SolidWorks'
    ],
    relevantInternships: [
      'CAD Design Engineering Trainee @ Kia India Plant (Penukonda)',
      'Mechanical Tooling Intern @ Rayalaseema Heavy Machinery'
    ],
    relevantJobs: [
      'Mechanical Design Engineer @ Ather Energy (₹5.5 - ₹8.5 LPA)',
      'Junior CAD Specialist @ Mahindra & Mahindra (₹5.0 - ₹7.5 LPA)'
    ],
    nextBestAction: 'Model a multi-part mechanical assembly with technical manufacturing drawing sheets and GD&T annotations.',
    avgSalaryRange: '₹4.5 LPA – ₹10.0 LPA',
    industryDemand: 'HIGH'
  }
];
