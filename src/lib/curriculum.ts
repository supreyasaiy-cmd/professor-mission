import { learningPaths } from "@/data/learning-paths";
import { coursePlan } from "@/data/lessons";
import type { LanguageMode, LearningPath } from "@/types/skillquest";

/**
 * Curriculum shape: which track a course belongs to, what order to take them
 * in, and roughly where it sits on a beginner-to-advanced line.
 *
 * The library used to render all 23 courses in data-file order with no
 * grouping, which gave no answer to "where do I start?". Tracks answer what
 * kind of work a course is for; `order` answers what to do first.
 */
export type TrackId = "foundation" | "craft" | "research" | "product" | "career" | "english" | "life";

export type Stage = 1 | 2 | 3;

export const tracks: Record<TrackId, { order: number; en: string; th: string; blurbEn: string; blurbTh: string }> = {
  foundation: { order: 1, en: "Start here", th: "เริ่มตรงนี้", blurbEn: "The thinking everything else builds on.", blurbTh: "วิธีคิดพื้นฐานที่เรื่องอื่นต่อยอดจากตรงนี้" },
  craft: { order: 2, en: "Design craft", th: "ฝีมือการออกแบบ", blurbEn: "Making the work itself better.", blurbTh: "ทำให้งานออกแบบดีขึ้นในมือเรา" },
  research: { order: 3, en: "Research", th: "งานวิจัยผู้ใช้", blurbEn: "Finding out what is actually true.", blurbTh: "หาคำตอบที่มีหลักฐานรองรับ" },
  product: { order: 4, en: "Product & data", th: "Product และข้อมูล", blurbEn: "Working with teams, metrics and delivery.", blurbTh: "ทำงานกับทีม ตัวเลข และการส่งมอบ" },
  career: { order: 5, en: "Career & communication", th: "อาชีพและการสื่อสาร", blurbEn: "Getting the work seen and valued.", blurbTh: "ทำให้งานของเราถูกมองเห็นและมีค่า" },
  english: { order: 6, en: "English for work", th: "อังกฤษเพื่อการทำงาน", blurbEn: "Study alongside anything else.", blurbTh: "เรียนคู่ไปกับสายอื่นได้เลย" },
  life: { order: 7, en: "Money & life", th: "เงินและชีวิต", blurbEn: "Useful outside the job too.", blurbTh: "ใช้ได้จริงนอกเหนือจากเรื่องงาน" },
};

/**
 * `order` is the recommended sequence within a track — lower comes first.
 * `stage` is how demanding the course is: 1 you can take cold, 2 expects some
 * working experience, 3 assumes you already do this for a living.
 */
const courseMeta: Record<string, { track: TrackId; order: number; stage: Stage }> = {
  "ux-ui": { track: "foundation", order: 1, stage: 1 },
  "critical-thinking": { track: "foundation", order: 2, stage: 1 },
  communication: { track: "foundation", order: 3, stage: 1 },

  "graphic-design": { track: "craft", order: 1, stage: 1 },
  "product-design": { track: "craft", order: 2, stage: 2 },
  "ux-writing": { track: "craft", order: 3, stage: 2 },
  "art-direction": { track: "craft", order: 4, stage: 2 },
  "creative-thinking": { track: "craft", order: 5, stage: 2 },
  "design-system": { track: "craft", order: 6, stage: 3 },

  "ux-research": { track: "research", order: 1, stage: 2 },
  "ux-research-method": { track: "research", order: 2, stage: 2 },

  "agile-ux-ui": { track: "product", order: 1, stage: 2 },
  designops: { track: "product", order: 2, stage: 3 },
  "product-owner": { track: "product", order: 3, stage: 3 },
  "product-analytics": { track: "product", order: 4, stage: 3 },
  "ai-product-workflow": { track: "product", order: 5, stage: 2 },

  "career-portfolio": { track: "career", order: 1, stage: 1 },
  "cx-communication": { track: "career", order: 2, stage: 3 },

  "english-work": { track: "english", order: 1, stage: 1 },
  toeic: { track: "english", order: 2, stage: 2 },
  ielts: { track: "english", order: 3, stage: 2 },

  "thai-tax-personal-finance": { track: "life", order: 1, stage: 1 },
  "stock-investing": { track: "life", order: 2, stage: 2 },
};

const fallbackMeta = { track: "craft" as TrackId, order: 99, stage: 2 as Stage };

export function metaForPath(pathId: string) {
  return courseMeta[pathId] ?? fallbackMeta;
}

export const stageLabels: Record<Stage, { en: string; th: string }> = {
  1: { en: "Start anywhere", th: "เริ่มได้เลย" },
  2: { en: "Some experience", th: "มีพื้นฐานมาบ้าง" },
  3: { en: "Going deep", th: "เจาะลึก" },
};

/** Courses grouped by track, each track in study order, courses in priority order. */
export function coursesByTrack() {
  const groups = new Map<TrackId, LearningPath[]>();
  for (const path of learningPaths) {
    const { track } = metaForPath(path.id);
    const list = groups.get(track) ?? [];
    list.push(path);
    groups.set(track, list);
  }

  return [...groups.entries()]
    .map(([id, paths]) => ({
      id,
      ...tracks[id],
      paths: paths.sort((a, b) => metaForPath(a.id).order - metaForPath(b.id).order),
    }))
    .sort((a, b) => a.order - b.order);
}

/** "12 days · about 35 min a day" */
export function planLabel(pathId: string, mode: LanguageMode) {
  const { days, minutesPerDay } = coursePlan(pathId);
  return mode === "EN"
    ? `${days} ${days === 1 ? "day" : "days"} · about ${minutesPerDay} min a day`
    : `${days} วัน · วันละประมาณ ${minutesPerDay} นาที`;
}
