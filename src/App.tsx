import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Heart, Home, Mic, Settings2, Sparkles, Star } from 'lucide-react';
import { childProfiles, lessons, parentInsights, rewards, skills, worlds } from './data/mockData';
import { useLocalProgress, useRecentEvents } from './hooks/useProgress';
import { summarizeProgress } from './services/personalization';

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[28px] border border-white/70 bg-white/80 shadow-soft backdrop-blur-xl ${className}`}>{children}</div>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">{children}</span>;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-black text-slate-900 md:text-2xl">{title}</h2>
      {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-3 h-2 rounded-full bg-slate-100">
      <div className="h-2 rounded-full bg-brand-500 transition-all" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  );
}

function ChildBadge({ profile }: { profile: (typeof childProfiles)[number] }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${profile.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
      {profile.status === 'active' ? 'Đang học' : 'Sẵn sàng'}
    </span>
  );
}

function HomePage() {
  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden p-4 md:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8%] top-10 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute right-[-6%] top-36 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <Card className="overflow-hidden border-white/80 bg-[linear-gradient(135deg,#fff7fd_0%,#f3f7ff_45%,#fff6e7_100%)] p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <Badge>Phiêu lưu Toán học mầm non</Badge>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">Học Toán bằng hình ảnh cho bé 4–5 tuổi</h1>
              <p className="max-w-xl text-base text-slate-600 md:text-lg">
                Thiết kế riêng cho trẻ chưa đọc tốt: chạm, kéo, nghe, nhìn và được khích lệ nhẹ nhàng bằng tiếng Việt.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/child" className="rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 px-5 py-3 font-semibold text-white shadow-soft transition hover:scale-[1.02]">
                  Bắt đầu ngay
                </Link>
                <Link to="/parent" className="rounded-full bg-white px-5 py-3 font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50">
                  Xem góc phụ huynh
                </Link>
              </div>
            </div>
            <motion.div animate={{ y: [0, -12, 0], rotate: [0, 6, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4.5, repeat: Infinity }} className="text-8xl md:text-[8rem]">
              🐰
            </motion.div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['Học vui', 'Mỗi bài ngắn, nhiều hình ảnh'],
              ['Tương tác', 'Chạm, chọn, kéo và phản hồi ngay'],
              ['Dịu nhẹ', 'Thân thiện cho bé 4–5 tuổi'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-white/80">
                <div className="font-bold text-slate-900">{title}</div>
                <div className="mt-1 text-sm text-slate-500">{detail}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-4">
          <Card className="border-white/80 bg-gradient-to-br from-white to-fuchsia-50 p-5"><div className="flex items-center gap-3"><Sparkles className="text-fuchsia-500" /><div><div className="font-bold">6 thế giới chủ đề</div><div className="text-sm text-slate-500">Đếm, so sánh, hình khối, cộng trừ trong 10</div></div></div></Card>
          <Card className="border-white/80 bg-gradient-to-br from-white to-rose-50 p-5"><div className="flex items-center gap-3"><Heart className="text-rose-500" /><div><div className="font-bold">Khuyến khích không áp lực</div><div className="text-sm text-slate-500">Luôn có nhịp học ngắn, vui và an toàn</div></div></div></Card>
          <Card className="border-white/80 bg-gradient-to-br from-white to-emerald-50 p-5"><div className="flex items-center gap-3"><Mic className="text-emerald-500" /><div><div className="font-bold">Giọng kể thân thiện</div><div className="text-sm text-slate-500">Thiết kế cho tương tác nghe-nhìn thay vì chữ</div></div></div></Card>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {worlds.map((w) => (
          <Card key={w.id} className="overflow-hidden p-5 transition hover:-translate-y-1">
            <div className="h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${w.palette[0]}, ${w.palette[1]})` }} />
            <div className="mt-4 text-2xl font-black text-slate-900">{w.nameVi}</div>
            <div className="mt-2 text-sm text-slate-600">{w.descriptionVi}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {w.lessonIds.slice(0, 3).map((lessonId) => (
                <span key={lessonId} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{lessonId}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChildHub() {
  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <Card className="border-white/80 bg-gradient-to-br from-white to-sky-50 p-5 md:p-6">
        <div className="flex items-center justify-between">
          <SectionTitle title="Chọn bé" subtitle="Hồ sơ demo có lưu trạng thái bằng localStorage" />
          <Link to="/parent" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">Phụ huynh</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {childProfiles.map((c) => (
            <Link key={c.id} to={`/child/${c.id}`} className="rounded-[28px] border border-white/70 bg-gradient-to-br from-white to-slate-50 p-6 shadow-soft transition hover:-translate-y-2 hover:shadow-xl">
              <div className="flex items-start justify-between"><div className="text-6xl drop-shadow-sm">{c.avatar}</div><ChildBadge profile={c} /></div>
              <div className="mt-4 text-2xl font-black text-slate-900">{c.name}</div>
              <div className="text-sm text-slate-500">{c.age} tuổi · thích {c.favoriteTheme}</div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ChildDashboard() {
  const { id } = useParams();
  const child = childProfiles.find((x) => x.id === id) ?? childProfiles[0];
  const { progress, setProgress, resetProgress } = useLocalProgress(child.id);
  const { events, setEvents, clearEvents } = useRecentEvents<{ skillId: string; success: boolean; speed: 'slow' | 'steady' | 'fast'; attempts: number }>(child.id);
  const ai = summarizeProgress(child, lessons, worlds, skills, progress, events);
  const nextLessonName = ai.nextLessonVi.split(' trong thế giới ')[0];
  const currentLesson = lessons.find((lesson) => lesson.titleVi === nextLessonName) ?? lessons[progress % lessons.length];
  const currentWorld = worlds.find((w) => w.id === currentLesson.worldId)!;
  const focusSkills = useMemo(() => [...skills].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3), []);
  const recentSuccessCount = events.filter((event) => event.success).length;
  const bestSkillLabel = focusSkills[0]?.labelVi ?? 'Nhiệm vụ trực quan';
  const achievements = [
    { title: 'Khởi đầu tốt', detail: 'Hoàn thành bài học đầu tiên', unlocked: progress >= 20 },
    { title: 'Bạn chăm chỉ', detail: 'Có ít nhất 3 lần làm đúng gần đây', unlocked: recentSuccessCount >= 3 },
    { title: 'Nhà sưu tập', detail: 'Mở khóa ít nhất 1 phần thưởng', unlocked: rewards.some((reward) => reward.earned) },
  ];
  const addProgress = (delta: number) => {
    setProgress((p) => Math.min(p + delta, 100));
    setEvents((prev) => [{ skillId: currentLesson.skillId, success: true, speed: 'steady' as const, attempts: 1 }, ...prev].slice(0, 8));
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-white/80 bg-gradient-to-br from-white to-fuchsia-50 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge>Chào {child.name}</Badge>
              <h1 className="mt-3 text-3xl font-black md:text-5xl">Hôm nay mình học gì nào?</h1>
              <p className="mt-2 max-w-xl text-slate-600">Bé được gợi ý nhiệm vụ vừa sức, đổi theo mức tiến bộ gần nhất.</p>
            </div>
            <div className="text-7xl">{child.avatar}</div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-brand-50 p-5"><div className="text-sm text-brand-700">Lộ trình</div><div className="text-2xl font-black">{progress}%</div></div>
            <div className="rounded-3xl bg-amber-50 p-5"><div className="text-sm text-amber-700">Bài tiếp theo</div><div className="font-black">{ai.nextLessonVi}</div></div>
            <div className="rounded-3xl bg-emerald-50 p-5"><div className="text-sm text-emerald-700">Thế giới</div><div className="font-black">{currentWorld.nameVi}</div></div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5">
            <div className="font-black text-slate-900">Tóm tắt thông minh</div>
            <div className="mt-2 text-sm text-slate-600">{ai.summaryVi}</div>
            <div className="mt-3 text-sm font-semibold text-brand-700">{ai.mascotNoteVi}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4"><div className="text-xs text-slate-500">Bài tốt nhất</div><div className="mt-1 font-black">{bestSkillLabel}</div></div>
              <div className="rounded-2xl bg-white p-4"><div className="text-xs text-slate-500">Đúng gần đây</div><div className="mt-1 font-black">{recentSuccessCount} lần</div></div>
              <div className="rounded-2xl bg-white p-4"><div className="text-xs text-slate-500">Tiến độ</div><div className="mt-1 font-black">{progress}%</div></div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/game/${currentLesson.id}`} className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-white shadow-soft">
              Chơi ngay <ArrowRight className="inline" size={16} />
            </Link>
            <button onClick={() => addProgress(7)} className="rounded-full bg-white px-5 py-3 font-semibold text-slate-700 ring-1 ring-slate-200">
              Hoàn thành nhanh
            </button>
            <button
              onClick={() => {
                const ok = window.confirm('Bạn có muốn reset tiến trình của bé này không?');
                if (!ok) return;
                resetProgress();
                clearEvents();
              }}
              className="rounded-full bg-rose-50 px-5 py-3 font-semibold text-rose-700 ring-1 ring-rose-200"
            >
              Reset tiến trình
            </button>
          </div>
        </Card>

        <Card className="border-white/80 bg-gradient-to-br from-white to-emerald-50 p-6">
          <SectionTitle title="Phần thưởng của bé" subtitle="Khơi gợi động lực bằng sưu tập sticker" />
          <div className="mt-5 space-y-4">
            {rewards.map((r) => (
              <div key={r.id} className={`flex items-center justify-between rounded-3xl p-4 ${r.earned ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{r.icon}</div>
                  <div>
                    <div className="font-bold">{r.titleVi}</div>
                    <div className="text-sm text-slate-500">{r.earned ? 'Đã mở khóa' : 'Cần thêm 1–2 bài nữa'}</div>
                  </div>
                </div>
                {r.earned ? <CheckCircle2 className="text-emerald-500" /> : <Star className="text-slate-300" />}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {focusSkills.map((skill) => (
          <Card key={skill.id} className="p-5">
            <div className="text-sm text-slate-500">{skill.labelVi}</div>
            <div className="mt-2 text-2xl font-black">{Math.round(skill.accuracy * 100)}%</div>
            <ProgressBar value={skill.accuracy} />
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {achievements.map((achievement) => (
          <Card key={achievement.title} className={`p-5 ${achievement.unlocked ? 'bg-emerald-50/80' : 'bg-slate-50/80'}`}>
            <div className="text-lg font-black">{achievement.title}</div>
            <div className="mt-2 text-sm text-slate-600">{achievement.detail}</div>
            <div className={`mt-3 text-sm font-semibold ${achievement.unlocked ? 'text-emerald-700' : 'text-slate-400'}`}>{achievement.unlocked ? 'Đã mở khóa' : 'Chưa mở khóa'}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GamePage() {
  const { id } = useParams();
  const lesson = lessons.find((x) => x.id === id) ?? lessons[0];
  const { setProgress } = useLocalProgress();
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [celebrate, setCelebrate] = useState(false);
  const [shake, setShake] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const answer =
    lesson.id === 'more-fish'
      ? '🐟'
      : lesson.id === 'subtract-balloons'
        ? '🎈'
        : lesson.id === 'patterns-leaves'
          ? '🍃 🌸 🍃'
          : lesson.id === 'picture-math'
            ? '🐟 ⭐'
            : lesson.id === 'combine-groups'
              ? '5'
              : lesson.type === 'count'
                ? String(lesson.objects.length)
                : lesson.type === 'shape'
                  ? lesson.objects[1]
                  : lesson.objects[0];
  const choices =
    lesson.id === 'more-fish'
      ? ['🐟', '🐠', '🫧']
      : lesson.id === 'subtract-balloons'
        ? ['🎈', '💨', '☁️']
        : lesson.id === 'patterns-leaves'
          ? ['🍃 🌸 🍃', '🌸 🍃 🌸', '🍃 🍃 🌸']
          : lesson.id === 'picture-math'
            ? ['🐟 ⭐', '🐟🐟', '⭐ ⭐']
            : lesson.id === 'combine-groups'
              ? ['5', '3', '8']
              : lesson.type === 'shape'
                ? ['⚪', '🔺', '⬛']
                : lesson.type === 'count'
                  ? ['1', String(lesson.objects.length), '5']
                  : ['1', '2', '3'];
  const steps = useMemo(
    () => [
      { title: 'Quan sát', desc: 'Bé nhìn hình và nghe cô kể.' },
      { title: 'Chạm / kéo', desc: 'Bé thao tác với đồ vật trực quan.' },
      { title: 'Khen thưởng', desc: 'Miu xuất hiện và tặng sticker.' },
    ],
    [],
  );
  const helpText =
    lesson.id === 'more-fish'
      ? 'Bé hãy tìm nhóm cá nhiều hơn để giúp bạn cá bơi tới đích.'
      : lesson.id === 'subtract-balloons'
        ? 'Hãy chọn quả bóng còn lại sau khi một vài quả bay đi nhé.'
        : lesson.id === 'patterns-leaves'
          ? 'Bé hãy chọn đúng mẫu lá – hoa – lá để tiếp tục con đường trong vườn nhé.'
          : lesson.id === 'picture-math'
            ? 'Hãy gộp đúng hai nhóm đồ vật để tìm kết quả cuối cùng.'
            : lesson.id === 'combine-groups'
              ? 'Hãy gộp 2 nhóm lại và chọn số lượng cuối cùng.'
              : 'Hãy chạm vào một đáp án nhé.';
  const pickAnswer = (choice: string) => {
    setSelected(choice);
    const correct = choice === answer;
    setStatus(correct ? 'correct' : 'wrong');
    if (correct) {
      setCelebrate(true);
      setProgress((p) => Math.min(p + 8, 100));
      if (soundOn) {
        console.info('ding-dong');
      }
      window.setTimeout(() => setCelebrate(false), 1200);
    } else {
      setShake(true);
      if (soundOn) {
        console.info('boop');
      }
      window.setTimeout(() => setShake(false), 300);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className={`p-6 md:p-8 ${shake ? 'animate-pulse ring-2 ring-rose-200' : ''}`}>
          <Badge>Màn chơi</Badge>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">{lesson.titleVi}</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Chọn đáp án đúng bằng hình hoặc số. Màn này đã có bước tương tác cơ bản để bé luyện tập thật sự.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {lesson.objects.map((o) => (
              <motion.button key={o} whileHover={{ scale: 1.05 }} onClick={() => pickAnswer(o)} className={`rounded-3xl p-6 text-center text-6xl shadow-soft ${selected === o ? 'bg-brand-100 ring-2 ring-brand-400' : 'bg-white'}`}>
                {o}
              </motion.button>
            ))}
          </div>
          <div className={`mt-4 rounded-3xl p-4 text-sm ${lesson.id === 'more-fish' ? 'bg-cyan-50 text-cyan-800' : lesson.id === 'subtract-balloons' ? 'bg-rose-50 text-rose-800' : lesson.id === 'patterns-leaves' ? 'bg-emerald-50 text-emerald-800' : lesson.id === 'picture-math' ? 'bg-amber-50 text-amber-800' : lesson.id === 'combine-groups' ? 'bg-violet-50 text-violet-800' : 'bg-slate-50 text-slate-600'}`}>{helpText}</div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {choices.map((choice) => (
              <button key={choice} onClick={() => pickAnswer(choice)} className={`rounded-2xl px-4 py-3 text-lg font-black ring-1 transition ${selected === choice ? 'bg-brand-500 text-white ring-brand-500' : 'bg-white text-slate-800 ring-slate-200'}`}>
                {choice}
              </button>
            ))}
          </div>
          <div className={`mt-5 rounded-3xl p-4 text-sm font-semibold ${status === 'correct' ? 'bg-emerald-50 text-emerald-700' : status === 'wrong' ? 'bg-rose-50 text-rose-700' : 'bg-slate-50 text-slate-600'}`}>
            {status === 'correct' ? 'Đúng rồi! Bé giỏi lắm.' : status === 'wrong' ? 'Gần đúng rồi, thử lại nhé!' : helpText}
          </div>
          {celebrate ? <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 rounded-3xl bg-amber-50 p-4 text-center text-2xl font-black text-amber-700">🎉 Tuyệt vời! 🎉</motion.div> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setProgress((p) => Math.min(p + 8, 100))} className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-white shadow-soft">
              Tiếp tục
            </button>
            <button onClick={() => setSoundOn((value) => !value)} className="rounded-full bg-white px-5 py-3 font-semibold text-slate-700 ring-1 ring-slate-200">
              {soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
            </button>
            <Link to="/child" className="rounded-full bg-white px-5 py-3 font-semibold text-slate-700 ring-1 ring-slate-200">
              Đổi bài khác
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle title="Cách chơi" subtitle="Dành cho bé chưa đọc tốt" />
          <div className="mt-5 space-y-4">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex gap-4 rounded-3xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white font-black">{idx + 1}</div>
                <div>
                  <div className="font-bold">{step.title}</div>
                  <div className="text-sm text-slate-500">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl bg-brand-50 p-5">
            <div className="font-black text-brand-700">Miu nhắc bé</div>
            <div className="mt-2 text-sm text-slate-600">“Con nhìn thật kỹ rồi chạm vào hình đúng nha!”</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ParentPage() {
  const [selectedChildId, setSelectedChildId] = useState(childProfiles[0].id);
  const parentChild = childProfiles.find((child) => child.id === selectedChildId) ?? childProfiles[0];
  const ai = summarizeProgress(parentChild, lessons, worlds, skills, 72);
  const { events } = useRecentEvents<{ skillId: string; success: boolean; speed: 'slow' | 'steady' | 'fast'; attempts: number }>(parentChild.id);
  const successCount = events.filter((event) => event.success).length;
  const retryCount = events.filter((event) => !event.success).length;
  const recentEvents = [
    { label: 'Đúng nhanh', detail: `${successCount} lần gần đây` },
    { label: 'Cần nhắc lại', detail: `${retryCount} lần gần đây` },
    { label: 'Gợi ý tiếp theo', detail: ai.nextLessonVi },
  ];
  const sessionNotes = events.slice(0, 3).map((event, index) => ({
    label: `Lượt ${index + 1}`,
    detail: `${event.success ? 'Đúng' : 'Sai'} · ${event.speed === 'fast' ? 'rất nhanh' : event.speed === 'steady' ? 'ổn định' : 'cần chậm lại'}`,
  }));
  const dailyTimeline = [
    { label: 'Sáng', value: successCount > 0 ? 72 : 36 },
    { label: 'Chiều', value: successCount > 1 ? 81 : 48 },
    { label: 'Tối', value: successCount > 2 ? 66 : 42 },
  ];
  const weeklyTrend = [
    { day: 'T2', value: 44 },
    { day: 'T3', value: 58 },
    { day: 'T4', value: 52 },
    { day: 'T5', value: 68 },
    { day: 'T6', value: 74 },
    { day: 'T7', value: 81 },
    { day: 'CN', value: 76 },
  ];

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-500">Chọn bé xem báo cáo</span>
        {childProfiles.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChildId(child.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${selectedChildId === child.id ? 'bg-brand-500 text-white ring-brand-500' : 'bg-white text-slate-700 ring-slate-200'}`}
          >
            {child.name}
          </button>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {parentInsights.map((item) => (
            <Card key={item.titleVi} className="p-5">
              <div className="text-sm font-semibold text-brand-600">{item.titleVi}</div>
              <div className="mt-2 text-2xl font-black">{item.valueVi}</div>
              <div className="mt-2 text-sm text-slate-600">{item.detailVi}</div>
            </Card>
          ))}
        </div>
        <div className="grid gap-6">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-brand-600"><BookOpen size={18} /><span className="text-sm font-semibold">AI tóm tắt phụ huynh</span></div>
            <div className="mt-3 text-lg font-semibold text-slate-900">{ai.summaryVi}</div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div><b>Điểm mạnh:</b> {ai.strengthsVi.join(' · ')}</div>
              <div><b>Cần luyện:</b> {ai.strugglesVi.join(' · ')}</div>
              <div><b>Bài tiếp theo:</b> {ai.nextLessonVi}</div>
              <div><b>Hoạt động tại nhà:</b> {ai.homeActivityVi}</div>
            </div>
            <div className="mt-4 rounded-3xl bg-brand-50 p-4 text-sm font-semibold text-brand-700">{ai.mascotNoteVi}</div>
          </Card>
          <Card className="p-5">
            <SectionTitle title="Xu hướng tuần này" subtitle="Điểm số tiến bộ mô phỏng theo ngày" />
            <div className="mt-4 flex items-end gap-3 rounded-3xl bg-slate-50 p-4">
              {weeklyTrend.map((item) => (
                <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-36 w-full items-end rounded-2xl bg-white p-2 shadow-inner">
                    <div className="w-full rounded-xl bg-brand-500 transition-all" style={{ height: `${item.value}%` }} />
                  </div>
                  <div className="text-xs font-semibold text-slate-500">{item.day}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <SectionTitle title="Trong ngày" subtitle="Phân bố nhịp học mô phỏng" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {dailyTimeline.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div className="mt-2 text-2xl font-black">{item.value}%</div>
                  <ProgressBar value={item.value / 100} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <SectionTitle title="Gần đây" subtitle="Tóm tắt hoạt động học gần nhất" />
            <div className="mt-4 space-y-3">
              {recentEvents.map((event) => (
                <div key={event.label} className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-bold">{event.label}</div>
                  <div className="text-sm text-slate-500">{event.detail}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <SectionTitle title="Phiên gần nhất" subtitle="Chi tiết các lượt chơi gần đây" />
            <div className="mt-4 space-y-3">
              {sessionNotes.length ? sessionNotes.map((note) => (
                <div key={note.label} className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-bold">{note.label}</div>
                  <div className="text-sm text-slate-500">{note.detail}</div>
                </div>
              )) : <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Chưa có lượt chơi nào.</div>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <Card className="p-6 md:p-8">
        <SectionTitle title="Cài đặt" subtitle="Ưu tiên trải nghiệm dịu, rõ và dễ dùng cho gia đình Việt Nam" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5"><div className="font-bold">Âm thanh</div><div className="text-sm text-slate-500">Giọng kể, hiệu ứng nhẹ và nhắc bằng âm thanh.</div></div>
          <div className="rounded-3xl bg-slate-50 p-5"><div className="font-bold">Giảm chuyển động</div><div className="text-sm text-slate-500">Hỗ trợ khi bé nhạy cảm với animation.</div></div>
        </div>
      </Card>
    </div>
  );
}

function Shell() {
  return (
    <div className="min-h-screen text-slate-800">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-black"><span className="text-3xl">🐰</span><span>Math Adventure</span></Link>
          <nav className="flex gap-2 text-sm font-semibold">
            <Link to="/" className="rounded-full px-3 py-2 hover:bg-slate-100"><Home size={16} className="inline" /> Trang chủ</Link>
            <Link to="/child" className="rounded-full px-3 py-2 hover:bg-slate-100">Bé</Link>
            <Link to="/parent" className="rounded-full px-3 py-2 hover:bg-slate-100">Phụ huynh</Link>
            <Link to="/settings" className="rounded-full px-3 py-2 hover:bg-slate-100"><Settings2 size={16} className="inline" /> Cài đặt</Link>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/child" element={<ChildHub />} />
          <Route path="/child/:id" element={<ChildDashboard />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 text-xs text-slate-500 md:px-6 lg:px-8">Demo premium cho preschool math Việt Nam · tối ưu cho tablet, mobile trước.</footer>
    </div>
  );
}

export default function App() {
  return <Shell />;
}
