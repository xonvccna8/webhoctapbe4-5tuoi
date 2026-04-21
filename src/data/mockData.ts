import { AiSummary, ChildProfile, Lesson, ParentInsight, Reward, SkillProgress, World } from '../types';

export const childProfiles: ChildProfile[] = [
  { id: 'lan', name: 'Lan', age: 4, avatar: '🐰', favoriteTheme: 'forest', status: 'active' },
  { id: 'minh', name: 'Minh', age: 5, avatar: '🐻', favoriteTheme: 'space', status: 'ready' },
];

export const worlds: World[] = [
  { id: 'forest', nameVi: 'Rừng Số', descriptionVi: 'Đếm quả, tìm số và mở đường cho bạn nhỏ', palette: ['#7c5cff', '#56cfe1'], theme: 'forest', lessonIds: ['count-fruit', 'compare-baskets', 'patterns-leaves'] },
  { id: 'city', nameVi: 'Thành phố So Sánh', descriptionVi: 'Chọn nhóm nhiều hơn, ít hơn, bằng nhau', palette: ['#ff9f43', '#ff6b6b'], theme: 'city', lessonIds: ['more-fish', 'shape-shadow'] },
  { id: 'garden', nameVi: 'Vườn Cộng Trừ', descriptionVi: 'Thêm vào, bớt đi và tìm kết quả bằng hình ảnh', palette: ['#49d69d', '#8bd450'], theme: 'garden', lessonIds: ['add-apples', 'subtract-balloons', 'picture-math'] },
];

export const skills: SkillProgress[] = [
  { id: 'number-recognition', labelVi: 'Nhận biết số', status: 'practicing', accuracy: 0.78, speed: 0.68, domain: 'numbers' },
  { id: 'counting', labelVi: 'Đếm đúng', status: 'stable', accuracy: 0.88, speed: 0.74, domain: 'counting' },
  { id: 'quantity-match', labelVi: 'Ghép số với lượng', status: 'practicing', accuracy: 0.71, speed: 0.63, domain: 'quantity-match' },
  { id: 'compare-more-less', labelVi: 'Nhiều hơn / ít hơn', status: 'stable', accuracy: 0.84, speed: 0.79, domain: 'compare' },
  { id: 'shape-recognition', labelVi: 'Nhận biết hình', status: 'mastered', accuracy: 0.94, speed: 0.88, domain: 'shapes' },
  { id: 'pattern-recognition', labelVi: 'Mẫu lặp', status: 'new', accuracy: 0.54, speed: 0.58, domain: 'patterns' },
  { id: 'add-within-10', labelVi: 'Cộng trong 10', status: 'practicing', accuracy: 0.66, speed: 0.61, domain: 'addition' },
  { id: 'sub-within-10', labelVi: 'Trừ trong 10', status: 'new', accuracy: 0.51, speed: 0.5, domain: 'subtraction' },
  { id: 'combine-groups', labelVi: 'Gộp nhóm', status: 'new', accuracy: 0.49, speed: 0.47, domain: 'addition' },
  { id: 'more-less-compare', labelVi: 'So sánh lượng', status: 'practicing', accuracy: 0.67, speed: 0.65, domain: 'compare' },
];

export const lessons: Lesson[] = [
  { id: 'count-fruit', titleVi: 'Đếm trái cây', worldId: 'forest', skillId: 'counting', type: 'count', difficulty: 1, scene: 'forest', objects: ['🍎', '🍐', '🍓'] },
  { id: 'compare-baskets', titleVi: 'Giỏ nào nhiều hơn?', worldId: 'city', skillId: 'compare-more-less', type: 'compare', difficulty: 2, scene: 'market', objects: ['🧺', '🍊', '🍇'] },
  { id: 'patterns-leaves', titleVi: 'Xếp lá theo mẫu', worldId: 'forest', skillId: 'pattern-recognition', type: 'mixed', difficulty: 2, scene: 'garden', objects: ['🍃', '🌸', '🍃'] },
  { id: 'shape-shadow', titleVi: 'Ghép hình bóng', worldId: 'city', skillId: 'shape-recognition', type: 'shape', difficulty: 1, scene: 'atelier', objects: ['⚪', '🔺', '⬛'] },
  { id: 'add-apples', titleVi: 'Thêm táo vào giỏ', worldId: 'garden', skillId: 'add-within-10', type: 'add', difficulty: 3, scene: 'basket', objects: ['🍎'] },
  { id: 'subtract-balloons', titleVi: 'Bóng bay bay mất', worldId: 'garden', skillId: 'sub-within-10', type: 'subtract', difficulty: 3, scene: 'sky', objects: ['🎈'] },
  { id: 'picture-math', titleVi: 'Bài toán tranh ảnh', worldId: 'garden', skillId: 'combine-groups', type: 'mixed', difficulty: 4, scene: 'pond', objects: ['🐟', '⭐'] },
  { id: 'more-fish', titleVi: 'Nhóm cá nào nhiều hơn?', worldId: 'city', skillId: 'more-less-compare', type: 'compare', difficulty: 2, scene: 'pond', objects: ['🐟', '🐠', '🫧'] },
];

export const rewards: Reward[] = [
  { id: 'sticker-forest', titleVi: 'Nhãn dán Rừng Số', icon: '✨', earned: true },
  { id: 'sticker-stars', titleVi: 'Bộ sao lấp lánh', icon: '⭐', earned: false },
  { id: 'sticker-bunny', titleVi: 'Bạn Thỏ Thông Minh', icon: '🐰', earned: false },
  { id: 'sticker-rocket', titleVi: 'Tên lửa siêu tốc', icon: '🚀', earned: false },
];

export const parentInsights: ParentInsight[] = [
  { titleVi: 'Hôm nay đã học', valueVi: 'Đếm, so sánh, cộng trong 5', detailVi: 'Con hoàn thành 3 hoạt động ngắn với nhịp học tốt.' },
  { titleVi: 'Điểm mạnh', valueVi: 'Nhận biết hình', detailVi: 'Con ghép hình bóng rất nhanh và chính xác.' },
  { titleVi: 'Cần luyện thêm', valueVi: 'Trừ trong 10', detailVi: 'Con cần thêm bài “bớt đi” với đồ vật thật và chuyển động.' },
  { titleVi: 'Mức cộng/trừ tốt nhất', valueVi: 'Trong 5', detailVi: 'Con đã hiểu ý nghĩa “thêm vào” khá vững, đang mở rộng lên 10.' },
];

export const aiSummary: AiSummary = {
  summaryVi: 'Hôm nay bé học tốt khi nhiệm vụ có hình ảnh rõ và thao tác kéo-thả. Bé cần thêm luyện tập với “bớt đi” và bài toán cộng/trừ trong 10.',
  strengthsVi: ['Đếm nhanh và đúng', 'Nhận biết hình rất tốt', 'Hoàn thành nhiệm vụ ngắn tập trung'],
  strugglesVi: ['Trừ trong 10 còn chậm', 'Đôi lúc chọn nhầm đáp án khi có nhiều hình'],
  nextLessonVi: 'Bài “Bóng bay bay mất” để luyện bớt đi bằng hình ảnh',
  homeActivityVi: 'Ở nhà, bố mẹ có thể cho bé đếm 5 quả cam rồi bớt đi 1 quả bằng đồ vật thật.',
  mascotNoteVi: 'Thỏ Miu sẽ nhắc bé bằng hình ảnh vui và khen con thật nhẹ nhàng.',
};
