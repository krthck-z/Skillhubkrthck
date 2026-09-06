export interface DailyUpdateItem {
  id: string;
  type: 'TECH_NEWS' | 'JOB_MARKET' | 'SKILL_TREND' | 'INDUSTRY_BULLETIN';
  badge: string;
  badgeColor: string;
  headline: string;
  summary: string;
  impact: string;
  relatedSkills: string[];
  date: string;
  source: string;
  region: string;
  relevanceScore: number;
  actionLabel?: string;
  actionTab?: string;
}

export const dailyUpdatesList: DailyUpdateItem[] = [
  {
    id: 'update-1',
    type: 'TECH_NEWS',
    badge: 'AI INFRASTRUCTURE',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    headline: 'Agentic Workflows & Autonomous Code Synthesis Reach Production Maturity in Indian SaaS',
    summary: 'Enterprises across Bengaluru, Hyderabad, and Pune are pivoting from pure conversational chat interfaces to multi-agent task execution swarms that trigger microservice APIs and query relational databases autonomously.',
    impact: 'Engineers who demonstrate function-calling, prompt evaluation sandboxes, and vector database retrieval are seeing a 40% uptick in interview shortlists.',
    relatedSkills: ['Python', 'TypeScript', 'LangChain', 'Vector DBs', 'API Gateways'],
    date: 'Today, 09:30 AM',
    source: 'TechCircle & NASSCOM Industry Report',
    region: 'National / Bengaluru Hub',
    relevanceScore: 96,
    actionLabel: 'Explore Agentic Courses',
    actionTab: 'learning'
  },
  {
    id: 'update-2',
    type: 'JOB_MARKET',
    badge: 'FAST HIRING DRIVE',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    headline: 'Rayalaseema Tech Cluster Releases 45 Verified Junior Openings with Fast 48h Offer Turnaround',
    summary: 'Eight regional software development centers and smart agritech startups in Anantapur and Kurnool have opened pre-screened talent hiring drives bypassing conventional 4-round paper resumes.',
    impact: 'Direct interview conversion rate exceeds 85% for candidates with SkillBridge Verified Evidence Tier 2 or 3.',
    relatedSkills: ['React 19', 'Node.js', 'PostgreSQL', 'Git Workflow', 'REST APIs'],
    date: 'Today, 08:15 AM',
    source: 'Rayalaseema IT Associates (RITA) Bulletin',
    region: 'Anantapur, AP',
    relevanceScore: 98,
    actionLabel: 'View Matched Roles',
    actionTab: 'opportunities'
  },
  {
    id: 'update-3',
    type: 'SKILL_TREND',
    badge: 'SURGING DEMAND',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    headline: 'Practical Viva & Live Code Defenses Overtake Theoretical Multiple Choice Exams',
    summary: 'Recruiters report a 60% drop in hiring false positives when replacing algorithmic MCQs with interactive code defense walkthroughs and audited Git repository commits.',
    impact: 'Completing an offline assessment at SSBN or JNTUA proctored nodes grants instant priority placement badges.',
    relatedSkills: ['Code Defense', 'System Design', 'Debugging', 'Live Viva', 'Clean Architecture'],
    date: 'Yesterday, 04:45 PM',
    source: 'SkillBridge Employer Consortium',
    region: 'All Campuses',
    relevanceScore: 93,
    actionLabel: 'Book Offline Assessment',
    actionTab: 'assessments'
  },
  {
    id: 'update-4',
    type: 'INDUSTRY_BULLETIN',
    badge: 'ACADEMIA-INDUSTRY MoU',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    headline: 'AIC-SKU & SSBN Degree College Finalize 100-Student Incubation & Capstone Cohort',
    summary: 'A tripartite agreement enables final-year students from Autonomous Degree colleges in Rayalaseema to build sponsored industry problem statements with startup stipends and faculty mentorship.',
    impact: 'Enrolled student teams gain direct access to incubation lab equipment, cloud credits, and angel investor demo days.',
    relatedSkills: ['AgriTech', 'IoT Sensors', 'Full Stack SaaS', 'Mobile Apps', 'Telemetry'],
    date: 'September 5, 2026',
    source: 'University Academic Council Press Release',
    region: 'Anantapur / SKU Campus',
    relevanceScore: 91,
    actionLabel: 'Inspect Project Hub',
    actionTab: 'projects'
  },
  {
    id: 'update-5',
    type: 'JOB_MARKET',
    badge: 'EMERGING SECTOR',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    headline: 'DGCA Certified Drone Pilots and Precision Agriculture Specialists in High Demand Across AP & Telangana',
    summary: 'State agricultural modernization initiatives and private drone logistics firms have announced 300+ seasonal and full-time vacancies for certified remote pilots equipped with multispectral NDVI camera knowledge.',
    impact: 'Starting stipends range from ₹25,000 to ₹38,000 per month for diploma, science, and engineering graduates with RPC licenses.',
    relatedSkills: ['DGCA RPC License', 'Multispectral Imagery', 'GIS Mapping', 'Flight Safety', 'Sensor Telemetry'],
    date: 'September 4, 2026',
    source: 'Civil Aviation & AP Drones Corporation',
    region: 'Andhra Pradesh & Telangana',
    relevanceScore: 89,
    actionLabel: 'Inspect Drone Career',
    actionTab: 'career-map'
  },
  {
    id: 'update-6',
    type: 'TECH_NEWS',
    badge: 'HARDWARE & GREEN TECH',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    headline: 'Micro-Grid Solar Inverters & Battery Management Systems Surge in Rayalaseema Renewable Belt',
    summary: 'With Anantapur hosting one of Asia’s largest ultra-mega solar parks, demand for electrical technicians with SCADA telemetry and embedded microcontroller skills has tripled over Q3 2026.',
    impact: 'Cross-disciplinary electronics and computer science graduates can transition with a 3-week micro-credential.',
    relatedSkills: ['SCADA', 'Embedded C', 'Solar PV', 'Battery Telemetry', 'Modbus Protocols'],
    date: 'September 3, 2026',
    source: 'Renewable Energy World & AP Transco',
    region: 'Rayalaseema Solar Corridor',
    relevanceScore: 88,
    actionLabel: 'View Solar Pathway',
    actionTab: 'career-map'
  }
];
