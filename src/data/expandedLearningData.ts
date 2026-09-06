import { LearningResource } from '../types';

export interface ModernLearningResource extends LearningResource {
  subdomain:
    | 'Prompt Engineering & AI'
    | 'AI Agents & Automation'
    | 'Cybersecurity & Cloud'
    | 'Quantum Computing'
    | 'Data & Analytics'
    | 'UI/UX & Product Design'
    | 'VFX, Graphics & Video Editing'
    | 'Digital Marketing & Social Media'
    | 'Hardware, Embedded & Robotics'
    | 'Web & Mobile Development';
  prerequisites: string[];
  capstoneProject: string;
}

export const modernLearningResources: ModernLearningResource[] = [
  {
    id: 'lr-prompt-eng',
    title: 'Enterprise Prompt Engineering & LLM Context Optimization',
    skill: 'Prompt Engineering',
    level: 'Beginner',
    mode: 'Online',
    type: 'FREE_ONLINE',
    provider: 'OpenAI & SkillBridge Academy (DEMO)',
    isGovernment: false,
    duration: '14 Hours',
    rating: 4.9,
    reviewsCount: 3420,
    price: 'Free',
    isFree: true,
    practicalTraining: true,
    industryAlignment: 95,
    verificationStatus: 'Proctored Quiz & Hands-on Sandbox',
    whyRecommended: 'Master few-shot prompting, structured JSON schema enforcement, and zero-shot reasoning chains.',
    skillGapAddressed: 'Prompt latency, hallucination suppression, system prompt security',
    syllabus: [
      'Tokenization, Temperature & Top-P Hyperparameters',
      'System, User & Assistant Turn Strategies',
      'Function Calling & Tool Invocation Specs',
      'Prompt Injection Defence & Guardrail Engineering'
    ],
    subdomain: 'Prompt Engineering & AI',
    prerequisites: ['Basic text editing', 'Curiosity about Generative AI'],
    capstoneProject: 'Interactive Customer Support Agent Prompt Specification with 100% JSON compliance'
  },
  {
    id: 'lr-ai-agents',
    title: 'Building Autonomous AI Agents & LangChain Workflows',
    skill: 'AI Agents',
    level: 'Intermediate',
    mode: 'Online',
    type: 'PRACTICAL_TRAINING',
    provider: 'DeepLearning.AI Partner Track (DEMO)',
    isGovernment: false,
    duration: '28 Hours',
    rating: 4.8,
    reviewsCount: 2890,
    price: '₹1,499',
    isFree: false,
    practicalTraining: true,
    industryAlignment: 98,
    verificationStatus: 'Code Defense & GitHub PR Review',
    whyRecommended: 'Construct autonomous swarms that search web APIs, draft reports, and execute database queries.',
    skillGapAddressed: 'ReAct loops, long-term memory retrieval, human-in-the-loop approvals',
    syllabus: [
      'Reasoning and Acting (ReAct) Agent Architecture',
      'Tool Calling with OpenAPI Schemas',
      'Vector Stores & Hybrid Lexical/Semantic RAG',
      'Multi-Agent Collaboration with LangGraph'
    ],
    subdomain: 'AI Agents & Automation',
    prerequisites: ['Python intermediate', 'Basic REST API comprehension'],
    capstoneProject: 'Autonomous Financial Research Agent with live SEC / Stock market API integration'
  },
  {
    id: 'lr-cyber-soc',
    title: 'Certified Cyber Defense & SOC Analyst Immersion',
    skill: 'Cybersecurity',
    level: 'Intermediate',
    mode: 'Hybrid',
    type: 'PAID_ONLINE',
    provider: 'CyberDefenders Consortium (DEMO)',
    isGovernment: false,
    duration: '45 Hours',
    rating: 4.9,
    reviewsCount: 1980,
    price: '₹2,499',
    isFree: false,
    practicalTraining: true,
    industryAlignment: 94,
    verificationStatus: 'Proctored CTF & Lab Defense',
    whyRecommended: 'Prepare for frontline blue-team security operations with real simulated packet captures.',
    skillGapAddressed: 'Log analysis in Splunk, Wireshark PCAP triage, MITRE ATT&CK mapping',
    syllabus: [
      'TCP/IP Protocol Suite & Wireshark Deep Packet Inspection',
      'Windows & Linux Event Log Forensics',
      'SIEM Alert Correlation & Splunk Query Language (SPL)',
      'Ransomware Incident Triage & Containment Protocols'
    ],
    subdomain: 'Cybersecurity & Cloud',
    prerequisites: ['Basic Linux command line', 'Fundamental networking knowledge'],
    capstoneProject: 'Investigate a simulated APT intrusion attack PCAP and compile an incident response report'
  },
  {
    id: 'lr-quantum-comp',
    title: 'Foundations of Quantum Computing & Qiskit Algorithms',
    skill: 'Quantum Computing',
    level: 'Advanced',
    mode: 'Online',
    type: 'GOVERNMENT',
    provider: 'IIT Madras & National Quantum Mission (DEMO)',
    isGovernment: true,
    duration: '40 Hours',
    rating: 4.7,
    reviewsCount: 940,
    price: 'Free',
    isFree: true,
    practicalTraining: true,
    industryAlignment: 90,
    verificationStatus: 'NPTEL Proctored Examination',
    whyRecommended: 'Official Government initiative under National Quantum Mission to build deep-tech capability.',
    skillGapAddressed: 'Qubit superposition, quantum gates, entanglement algorithms',
    syllabus: [
      'Linear Algebra & Dirac Ket/Bra Notation for Quantum States',
      'Single and Multi-Qubit Quantum Logic Gates',
      'Deutsch-Jozsa and Grover Search Algorithms',
      'Running Quantum Circuits on IBM Cloud Real Quantum Processors'
    ],
    subdomain: 'Quantum Computing',
    prerequisites: ['Linear algebra', 'Python basic programming'],
    capstoneProject: 'Simulate Shor factoring and Grover search on 5-qubit quantum simulator'
  },
  {
    id: 'lr-uiux-figma',
    title: 'Modern UI/UX Design Systems & Micro-Interactions',
    skill: 'UI/UX Design',
    level: 'Beginner',
    mode: 'Online',
    type: 'FREE_ONLINE',
    provider: 'Figma Community Guild & SkillBridge (DEMO)',
    isGovernment: false,
    duration: '22 Hours',
    rating: 4.9,
    reviewsCount: 5120,
    price: 'Free',
    isFree: true,
    practicalTraining: true,
    industryAlignment: 96,
    verificationStatus: 'Interactive Prototype Portfolio Review',
    whyRecommended: 'Learn atomic design systems, WCAG accessibility, and responsive typography scales.',
    skillGapAddressed: 'Auto-layout constraints, design tokens, component variants',
    syllabus: [
      'Design Thinking & User Journey Persona Creation',
      'Figma Auto-Layout, Variables & Component Variants',
      'Design Tokens: Spacing, Colors & Mathematical Typography Ratios',
      'Prototyping Advanced Micro-Interactions & Smart Animate'
    ],
    subdomain: 'UI/UX & Product Design',
    prerequisites: ['No coding required', 'A keen eye for visual aesthetics'],
    capstoneProject: 'Complete 12-screen bilingual mobile banking app with light/dark theme design tokens'
  },
  {
    id: 'lr-vfx-motion',
    title: 'After Effects & Blender 3D VFX Production Masterclass',
    skill: 'VFX & Video Editing',
    level: 'Intermediate',
    mode: 'Hybrid',
    type: 'PRACTICAL_TRAINING',
    provider: 'Visual Effects Creators Guild (DEMO)',
    isGovernment: false,
    duration: '36 Hours',
    rating: 4.8,
    reviewsCount: 1420,
    price: '₹1,200',
    isFree: false,
    practicalTraining: true,
    industryAlignment: 92,
    verificationStatus: 'Showreel Review by Senior VFX Supervisors',
    whyRecommended: 'Build industry-grade commercial video edits, kinetic typography, and 3D camera projections.',
    skillGapAddressed: 'Rotoscoping, 3D camera tracking, color grading in DaVinci',
    syllabus: [
      'Adobe Premiere Pro Timeline Architecture & Pacing',
      'After Effects Compositing, Green Screen Keying & Tracking',
      'Blender 3D Modeling, Lighting & Camera Integration',
      'DaVinci Resolve Color Science & ACES Color Grading'
    ],
    subdomain: 'VFX, Graphics & Video Editing',
    prerequisites: ['Computer with dedicated GPU recommended'],
    capstoneProject: '30-second commercial promo with live-action footage composite and 3D motion graphics'
  },
  {
    id: 'lr-hardware-iot',
    title: 'Hands-on IoT Hardware & ESP32 Microcontrollers Lab',
    skill: 'Hardware & IoT',
    level: 'Intermediate',
    mode: 'Offline',
    type: 'PRACTICAL_TRAINING',
    provider: 'Anantapur Physical Skill Centre - AIC SKU (DEMO)',
    isGovernment: true,
    duration: '30 Hours (Weekend Physical Lab)',
    rating: 4.9,
    reviewsCount: 880,
    price: '₹800 (Subsidized)',
    isFree: false,
    practicalTraining: true,
    industryAlignment: 96,
    verificationStatus: 'In-Person Hardware Defense & Oscilloscope Test',
    whyRecommended: 'Physical lab access in Anantapur with breadboards, sensors, soldering, and LoRa gateways.',
    skillGapAddressed: 'GPIO wiring, I2C/SPI bus debugging, low-power sleep modes',
    syllabus: [
      'Microcontroller Architecture & Breadboard Electronics',
      'Interfacing Analog & Digital Sensors (DHT22, Soil, Ultrasonic)',
      'MQTT Wireless Telemetry to Cloud IoT Dashboards',
      'Soldering & KiCad PCB Schematic Capture'
    ],
    subdomain: 'Hardware, Embedded & Robotics',
    prerequisites: ['Basic electrical concepts (Voltage, Current, Resistance)'],
    capstoneProject: 'Solar-powered agricultural soil moisture telemetry node with local LoRaWAN transmission'
  },
  {
    id: 'lr-digital-marketing',
    title: 'Performance Marketing, Google Ads & Technical SEO',
    skill: 'Digital Marketing',
    level: 'Beginner',
    mode: 'Online',
    type: 'FREE_ONLINE',
    provider: 'Google Digital Garage Partner (DEMO)',
    isGovernment: false,
    duration: '18 Hours',
    rating: 4.7,
    reviewsCount: 4200,
    price: 'Free',
    isFree: true,
    practicalTraining: true,
    industryAlignment: 91,
    verificationStatus: 'Google Certified Professional Badge',
    whyRecommended: 'Master real ad auction algorithms, quality scores, negative keywords, and technical SEO schema markup.',
    skillGapAddressed: 'ROAS calculations, landing page A/B testing, GA4 events',
    syllabus: [
      'Search Engine Architecture & Crawlability Auditing',
      'Google Search & Performance Max Campaign Setup',
      'Meta Ad Manager Pixel Tracking & Custom Audiences',
      'Conversion Rate Optimization (CRO) & Funnel Analytics'
    ],
    subdomain: 'Digital Marketing & Social Media',
    prerequisites: ['Basic internet and web navigation skills'],
    capstoneProject: 'Build and launch a live simulated Google Ads campaign with negative keyword list and landing page audit'
  }
];

export const expandedLearningList = modernLearningResources;
