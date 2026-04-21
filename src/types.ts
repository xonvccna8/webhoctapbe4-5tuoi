export type ChildStatus = 'active' | 'ready';
export type SkillStatus = 'new' | 'practicing' | 'stable' | 'mastered';
export type LessonType = 'count' | 'compare' | 'mixed' | 'shape' | 'add' | 'subtract';
export type LessonScene = 'forest' | 'market' | 'garden' | 'atelier' | 'basket' | 'sky' | 'pond';
export type SkillDomain = 'numbers' | 'counting' | 'quantity-match' | 'compare' | 'shapes' | 'patterns' | 'addition' | 'subtraction';

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  favoriteTheme: string;
  status: ChildStatus;
}

export interface World {
  id: string;
  nameVi: string;
  descriptionVi: string;
  palette: [string, string];
  theme: string;
  lessonIds: string[];
}

export interface SkillProgress {
  id: string;
  labelVi: string;
  status: SkillStatus;
  accuracy: number;
  speed: number;
  domain: SkillDomain;
}

export interface Lesson {
  id: string;
  titleVi: string;
  worldId: string;
  skillId: string;
  type: LessonType;
  difficulty: number;
  scene: LessonScene;
  objects: string[];
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
