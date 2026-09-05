import { FastRecruitmentRequirement, FastMatchCandidateComparison } from '../types';

export const initialFastRecruitmentRequirements: FastRecruitmentRequirement[] = [
  {
    id: 'fast-req-1',
    companyName: 'Rayalaseema Digital Media',
    roleTitle: 'Immediate Junior Web Assistant',
    urgency: 'IMMEDIATE_48H',
    stipendOrSalary: '₹12,000 / month',
    location: 'Sapthagiri Circle, Anantapur (Hybrid)',
    workMode: 'Hybrid',
    description: 'We need a junior web builder immediately to assist with local business landing pages and client website updates. No complex backend or heavy framework mastery needed — just clean HTML, CSS, basic JavaScript DOM manipulation, and Git discipline.',
    requiredSkills: [
      { skill: 'HTML & CSS', isRequired: true, minEvidenceLevel: 'CERTIFICATE_VERIFIED' },
      { skill: 'JavaScript', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skill: 'Git', isRequired: true, minEvidenceLevel: 'SELF_DECLARED' },
      { skill: 'React', isRequired: false, minEvidenceLevel: 'PRACTICAL_VERIFIED' }
    ],
    exactSkills: [
      { skillName: 'HTML & CSS', isRequired: true, minEvidenceLevel: 'CERTIFICATE_VERIFIED' },
      { skillName: 'JavaScript', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skillName: 'Git', isRequired: true, minEvidenceLevel: 'SELF_DECLARED' },
      { skillName: 'React', isRequired: false, minEvidenceLevel: 'PRACTICAL_VERIFIED' }
    ]
  },
  {
    id: 'fast-req-2',
    companyName: 'NovaSoft Cloud Labs (DEMO)',
    roleTitle: 'React Frontend Intern (Sprint Batch)',
    urgency: '7_DAYS',
    stipendOrSalary: '₹15,000 / month',
    location: 'Bengaluru / Anantapur Remote',
    workMode: 'Remote',
    description: 'Looking for an energetic student intern who can build UI component cards and connect REST API JSON endpoints. Practical code defense or project evidence required.',
    requiredSkills: [
      { skill: 'React', isRequired: true, minEvidenceLevel: 'PRACTICAL_VERIFIED' },
      { skill: 'JavaScript', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skill: 'HTML & CSS', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skill: 'Git', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' }
    ],
    exactSkills: [
      { skillName: 'React', isRequired: true, minEvidenceLevel: 'PRACTICAL_VERIFIED' },
      { skillName: 'JavaScript', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skillName: 'HTML & CSS', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skillName: 'Git', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' }
    ]
  },
  {
    id: 'fast-req-3',
    companyName: 'Anantapur Digital Infrastructure Hub',
    roleTitle: 'Hardware & IT Support Associate (Weekend)',
    urgency: 'PART_TIME',
    stipendOrSalary: '₹600 / day (Sat-Sun)',
    location: 'Collectorate Road, Anantapur',
    workMode: 'On-Site',
    description: 'Weekend technical assistant for lab workstation maintenance, LAN cabling, and OS patching for regional educational centers.',
    requiredSkills: [
      { skill: 'Computer Hardware & Servicing', isRequired: true, minEvidenceLevel: 'PRACTICAL_VERIFIED' },
      { skill: 'Operating Systems', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skill: 'Networking Basics', isRequired: false, minEvidenceLevel: 'SELF_DECLARED' }
    ],
    exactSkills: [
      { skillName: 'Computer Hardware & Servicing', isRequired: true, minEvidenceLevel: 'PRACTICAL_VERIFIED' },
      { skillName: 'Operating Systems', isRequired: true, minEvidenceLevel: 'ASSESSMENT_PASSED' },
      { skillName: 'Networking Basics', isRequired: false, minEvidenceLevel: 'SELF_DECLARED' }
    ]
  }
];

export const initialCandidateComparisons: Record<string, FastMatchCandidateComparison[]> = {
  'fast-req-1': [
    {
      id: 'cand-karthik',
      candidateName: 'Karthik Peetla (You)',
      degree: 'B.Sc. CS Hons',
      institution: 'SSBN Autonomous College, Anantapur',
      skillsEvaluation: [
        { skill: 'HTML & CSS', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true },
        { skill: 'JavaScript', studentHasSkill: true, evidenceLevel: 'ASSESSMENT_PASSED', matchesRequirement: true },
        { skill: 'Git', studentHasSkill: true, evidenceLevel: 'SELF_DECLARED', matchesRequirement: true },
        { skill: 'React', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true }
      ],
      matchedCount: 4,
      totalRequiredCount: 4,
      is100PercentMatch: true,
      availability: 'Immediate (Part-Time / Evening)',
      expectedStipend: '₹10,000 - ₹12,000 / mo',
      shortlisted: false,
      hired: false
    },
    {
      id: 'cand-ananya',
      candidateName: 'Ananya Sharma',
      degree: 'B.Tech CSE',
      institution: 'JNTUA College of Engineering, Anantapur',
      skillsEvaluation: [
        { skill: 'HTML & CSS', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true },
        { skill: 'JavaScript', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true },
        { skill: 'Git', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true },
        { skill: 'React', studentHasSkill: false, evidenceLevel: 'SELF_DECLARED', matchesRequirement: false }
      ],
      matchedCount: 3,
      totalRequiredCount: 4,
      is100PercentMatch: false,
      availability: 'Within 7 Days',
      expectedStipend: '₹14,000 / mo',
      shortlisted: true,
      hired: false
    },
    {
      id: 'cand-saiteja',
      candidateName: 'Sai Teja V.',
      degree: 'Diploma in Computer Engg',
      institution: 'Government Polytechnic, Anantapur',
      skillsEvaluation: [
        { skill: 'HTML & CSS', studentHasSkill: true, evidenceLevel: 'CERTIFICATE_VERIFIED', matchesRequirement: true },
        { skill: 'JavaScript', studentHasSkill: true, evidenceLevel: 'ASSESSMENT_PASSED', matchesRequirement: true },
        { skill: 'Git', studentHasSkill: false, evidenceLevel: 'SELF_DECLARED', matchesRequirement: false },
        { skill: 'React', studentHasSkill: false, evidenceLevel: 'SELF_DECLARED', matchesRequirement: false }
      ],
      matchedCount: 2,
      totalRequiredCount: 4,
      is100PercentMatch: false,
      availability: 'Immediate',
      expectedStipend: '₹8,000 / mo',
      shortlisted: false,
      hired: false
    }
  ],
  'fast-req-2': [
    {
      id: 'cand-karthik',
      candidateName: 'Karthik Peetla (You)',
      degree: 'B.Sc. CS Hons',
      institution: 'SSBN Autonomous College, Anantapur',
      skillsEvaluation: [
        { skill: 'React', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true },
        { skill: 'JavaScript', studentHasSkill: true, evidenceLevel: 'ASSESSMENT_PASSED', matchesRequirement: true },
        { skill: 'HTML & CSS', studentHasSkill: true, evidenceLevel: 'ASSESSMENT_PASSED', matchesRequirement: true },
        { skill: 'Git', studentHasSkill: true, evidenceLevel: 'SELF_DECLARED', matchesRequirement: false } // needs assessment passed
      ],
      matchedCount: 3,
      totalRequiredCount: 4,
      is100PercentMatch: false,
      availability: 'Immediate',
      expectedStipend: '₹12,000 - ₹15,000 / mo',
      shortlisted: false,
      hired: false
    },
    {
      id: 'cand-bhavana',
      candidateName: 'Bhavana Reddy',
      degree: 'B.Tech CSE',
      institution: 'SRIT Rotarypuram, Anantapur',
      skillsEvaluation: [
        { skill: 'React', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true },
        { skill: 'JavaScript', studentHasSkill: true, evidenceLevel: 'ASSESSMENT_PASSED', matchesRequirement: true },
        { skill: 'HTML & CSS', studentHasSkill: true, evidenceLevel: 'ASSESSMENT_PASSED', matchesRequirement: true },
        { skill: 'Git', studentHasSkill: true, evidenceLevel: 'PRACTICAL_VERIFIED', matchesRequirement: true }
      ],
      matchedCount: 4,
      totalRequiredCount: 4,
      is100PercentMatch: true,
      availability: 'Immediate',
      expectedStipend: '₹15,000 / mo',
      shortlisted: true,
      hired: false
    }
  ]
};
