import { AiSummary, ChildProfile, Lesson, PerformanceEvent, SkillProgress, World } from '../types';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function getNextLesson(child: ChildProfile, lessons: Lesson[], skills: SkillProgress[]) {
  const preferredDomain = skills
    .filter((skill) => skill.accuracy < 0.8)
    .sort((a, b) => a.accuracy - b.accuracy)[0]?.domain;

  const candidate = lessons.find((lesson) => {
    const skill = skills.find((item) => item.id === lesson.skillId);
    if (!skill) return false;
    if (skill.status === 'new' || skill.status === 'practicing') return true;
    return skill.domain === preferredDomain;
  });

  return candidate ?? lessons[0];
}

export function getFocusSkills(skills: SkillProgress[]) {
  return [...skills]
    .sort((a, b) => a.accuracy - b.accuracy || a.speed - b.speed)
    .slice(0, 3);
}

export function summarizeProgress(
  child: ChildProfile,
  lessons: Lesson[],
  worlds: World[],
  skills: SkillProgress[],
  progressValue: number,
  recentEvents: PerformanceEvent[] = [],
): AiSummary {
  const focusSkills = getFocusSkills(skills);
  const nextLesson = getNextLesson(child, lessons, skills);
  const nextWorld = worlds.find((world) => world.id === nextLesson.worldId) ?? worlds[0];

  const bestSkill = [...skills].sort((a, b) => b.accuracy - a.accuracy)[0];
  const improvingSkill = [...skills].sort((a, b) => b.speed - a.speed)[0];

  const eventSignal = recentEvents.length
    ? recentEvents.reduce(
        (acc, event) => {
          if (event.success) acc.success += 1;
          else acc.retry += 1;
          if (event.speed === 'fast') acc.fast += 1;
          return acc;
        },
        { success: 0, retry: 0, fast: 0 },
      )
    : { success: 0, retry: 0, fast: 0 };

  const strengthText = [
    `Mạnh nhất ở ${bestSkill?.labelVi ?? 'các bài trực quan'}`,
    `Tốc độ học tốt ở ${improvingSkill?.labelVi ?? 'nhiệm vụ ngắn'}`,
    eventSignal.success > 0 ? `Gần đây làm đúng ${eventSignal.success} lần` : 'Hợp với bài có tranh ảnh rõ ràng',
  ];

  const struggleText = [
    ...focusSkills
      .filter((skill) => skill.status !== 'mastered')
      .map((skill) => `${skill.labelVi} (${formatPercent(skill.accuracy)})`),
    eventSignal.retry > 0 ? `Cần thêm cơ hội thử lại: ${eventSignal.retry} lần` : 'Nên giữ nhịp học ngắn 5–7 phút',
  ].slice(0, 3);

  const gentleProgress = clamp(progressValue / 100, 0, 1);

  return {
    summaryVi: `${child.name} đang ở mức ${Math.round(gentleProgress * 100)}% lộ trình. Bé hợp với bài có hình ảnh lớn, khen ngay khi làm đúng và tăng dần độ khó một chút.`,
    strengthsVi: strengthText,
    strugglesVi: struggleText,
    nextLessonVi: `${nextLesson.titleVi} trong thế giới ${nextWorld.nameVi}`,
    homeActivityVi: `Ở nhà có thể chơi cùng ${child.name} với đồ vật thật: đếm 3–5 món, rồi so sánh nhiều hơn/ít hơn.`,
    mascotNoteVi: eventSignal.fast > 0
      ? 'Miu khen bé rất nhanh và có thể nâng thử thách lên một chút.'
      : 'Miu sẽ giữ nhịp chậm, dễ hiểu và luôn động viên bé từng bước.',
  };
}
