export type SkillStatus = 'new' | 'practicing' | 'stable' | 'mastered';

export type CurriculumDomain =
  | 'numbers'
  | 'counting'
  | 'quantity-match'
  | 'compare'
  | 'sorting'
  | 'patterns'
  | 'shapes'
  | 'measurement'
  | 'addition'
  | 'subtraction';

export type LessonType = 'count' | 'compare' | 'shape' | 'add' | 'subtract' | 'mixed';

export interface ChildProfile {
  id: string;
  name: string;
  age: 4 | 5;
  avatar: string;
  favoriteTheme: string;
  status: 'ready' | 'active';
}

export interface SkillProgress {
  id: string;
  labelVi: string;
  status: SkillStatus;
  accuracy: number;
  speed: number;
  domain: CurriculumDomain;
}

export interface Lesson {
  id: string;
  titleVi: string;
  worldId: string;
  skillId: string;
  type: LessonType;
  difficulty: number;
  scene: string;
  objects: string[];
}

export interface World {
  id: string;
  nameVi: string;
  descriptionVi: string;
  palette: [string, string];
  theme: string;
  lessonIds: string[];
}

export interface Reward {
  id: string;
  titleVi: string;
  icon: string;
  earned: boolean;
}

export interface ParentInsight {
  titleVi: string;
  valueVi: string;
  detailVi: string;
}

export interface AiSummary {
  summaryVi: string;
  strengthsVi: string[];
  strugglesVi: string[];
  nextLessonVi: string;
  homeActivityVi: string;
  mascotNoteVi: string;
}

export interface PerformanceEvent {
  skillId: string;
  success: boolean;
  speed: 'slow' | 'steady' | 'fast';
  attempts: number;
}
