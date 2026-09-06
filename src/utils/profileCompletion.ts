import { StudentProfile, SkillItem, StudentProjectItem, AchievementItem } from '../types';

export interface ProfileCheckArea {
  id: string;
  label: string;
  isComplete: boolean;
  hint?: string;
}

export interface ProfileCompletionStatus {
  percentage: number;
  isComplete: boolean;
  areas: ProfileCheckArea[];
  incompleteAreas: ProfileCheckArea[];
  completedCount: number;
  totalCount: number;
}

/**
 * Dynamically evaluates completion across 7 core dimensions:
 * 1. Personal Details
 * 2. Education
 * 3. Skills
 * 4. Certificates
 * 5. Projects
 * 6. Experience
 * 7. Career Goal
 */
export function calculateProfileCompletion(
  profile: StudentProfile,
  skills: SkillItem[] = [],
  studentProjects: StudentProjectItem[] = [],
  achievements: AchievementItem[] = []
): ProfileCompletionStatus {
  const hasPersonalDetails = Boolean(
    profile.name &&
    profile.name.trim().length > 0 &&
    profile.location &&
    profile.location.trim().length > 0
  );

  const hasEducation = Boolean(
    profile.degree &&
    profile.degree.trim().length > 0 &&
    profile.institution &&
    profile.institution.trim().length > 0
  );

  const hasSkills = Boolean(
    skills &&
    skills.filter((s) => s.currentLevel && s.currentLevel !== 'None').length >= 3
  );

  const hasCertificates = Boolean(
    achievements.some((a) => (a.unlocked ?? a.verified) || a.category === 'SKILL_VERIFICATION') ||
    skills.some((s) => s.evidenceLevel === 'CERTIFICATE_VERIFIED' || (s.certificatesCount || 0) > 0)
  );

  const hasProjects = Boolean(
    studentProjects && studentProjects.length >= 1
  );

  const hasExperience = Boolean(
    profile.startupExperiences && profile.startupExperiences.length > 0
  );

  const hasCareerGoal = Boolean(
    profile.targetCareer && profile.targetCareer.trim().length > 0
  );

  const areas: ProfileCheckArea[] = [
    { id: 'personal', label: 'Personal Details', isComplete: hasPersonalDetails, hint: 'Name, location, contact' },
    { id: 'education', label: 'Education', isComplete: hasEducation, hint: 'Degree and institution' },
    { id: 'skills', label: 'Skills', isComplete: hasSkills, hint: 'At least 3 assessed skills' },
    { id: 'certificates', label: 'Certificates', isComplete: hasCertificates, hint: 'Skill certifications or badges' },
    { id: 'projects', label: 'Projects', isComplete: hasProjects, hint: 'At least 1 verified project' },
    { id: 'experience', label: 'Experience', isComplete: hasExperience, hint: 'Startup, internship or work proof' },
    { id: 'careerGoal', label: 'Career Goal', isComplete: hasCareerGoal, hint: 'Target role specified' }
  ];

  const completedCount = areas.filter((a) => a.isComplete).length;
  const totalCount = areas.length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const isComplete = completedCount === totalCount && percentage === 100;
  const incompleteAreas = areas.filter((a) => !a.isComplete);

  return {
    percentage,
    isComplete,
    areas,
    incompleteAreas,
    completedCount,
    totalCount
  };
}
