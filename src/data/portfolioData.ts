import { StudentProjectItem } from '../types';

export const initialStudentProjects: StudentProjectItem[] = [
  {
    id: 'proj-kisan-mitra',
    title: 'Kisan Mitra AI - Regional Crop Disease Diagnostic & Telugu Voice Assistant',
    tagline: 'Multimodal agricultural problem solver delivering localized AI crop recommendations to farmers across Anantapur.',
    category: 'AI / ML',
    githubUrl: 'https://github.com/karthikpeetla/kisan-mitra-ai',
    liveUrl: 'https://kisan-mitra-demo.web.app',
    description: 'Built a responsive web application that enables local groundnut and tomato farmers in Rayalaseema to upload leaf photos or speak queries in Telugu. The system uses computer vision to detect leaf blight and generates localized organic treatment advisories.',
    myRole: 'Lead Frontend & API Architect — designed the React 19 interface, voice recording web audio pipeline, and integrated FastAPI backend.',
    skillsDemonstrated: ['React', 'Python', 'Web Audio API', 'Tailwind CSS', 'REST API Integration'],
    skills: ['React', 'Python', 'Web Audio API', 'Tailwind CSS', 'REST API Integration'],
    evidenceLevel: 'PRACTICAL_VERIFIED',
    verifiedBy: 'SkillBridge Practical Sandbox & Code Review',
    starsCount: 24,
    dateCompleted: 'July 2026'
  },
  {
    id: 'proj-anantapur-gigs',
    title: 'Anantapur Student Gigs - Micro-Opportunity Escrow & Skills Ledger',
    tagline: 'Hyperlocal gig platform matching college students with verified evening and weekend technical work in Anantapur.',
    category: 'Full Stack',
    githubUrl: 'https://github.com/karthikpeetla/anantapur-student-gigs',
    liveUrl: 'https://anantapur-gigs.web.app',
    description: 'Full-stack application supporting local shopkeepers, coaching centers, and startups in posting part-time technical tasks. Includes milestone verification, distance calculation using Google Maps Platform, and dispute logging.',
    myRole: 'Solo Full Stack Developer — designed PostgreSQL schema, Node.js REST routes, and responsive React frontend.',
    skillsDemonstrated: ['Node.js', 'SQL', 'React', 'Git', 'Google Maps API'],
    skills: ['Node.js', 'SQL', 'React', 'Git', 'Google Maps API'],
    evidenceLevel: 'PRACTICAL_VERIFIED',
    verifiedBy: 'Rayalaseema Tech Cluster Sandbox Audit',
    starsCount: 38,
    dateCompleted: 'June 2026'
  },
  {
    id: 'proj-code-defense-bench',
    title: 'Algorithmic Viva Sandbox & Visual Time Complexity Profiler',
    tagline: 'Interactive sandbox visualizing call stacks, recursion depth, and Big-O memory consumption for DSA learners.',
    category: 'Core CS' as any,
    githubUrl: 'https://github.com/karthikpeetla/algo-viva-profiler',
    liveUrl: 'https://algo-profiler-atp.vercel.app',
    description: 'A developer education tool built for SSBN Autonomous College peers to visualize how sorting algorithms execute step-by-step with live memory benchmarking.',
    myRole: 'Creator & Maintainer — authored canvas rendering engine and web worker thread separation for long-running algorithmic loops.',
    skillsDemonstrated: ['JavaScript', 'DSA', 'HTML & CSS', 'Canvas API', 'Git'],
    skills: ['JavaScript', 'DSA', 'HTML & CSS', 'Canvas API', 'Git'],
    evidenceLevel: 'ASSESSMENT_PASSED',
    verifiedBy: 'JNTUA Autonomous Coding Contest 2026',
    starsCount: 19,
    dateCompleted: 'April 2026'
  }
];
