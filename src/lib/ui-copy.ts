import type { LanguageMode } from "@/types/skillquest";

/**
 * Interface chrome in both languages.
 *
 * Before this existed, chrome was written straight into the JSX — which meant
 * the app shell was Thai-only while every Learn and Lesson heading was
 * English-only. Whichever mode you picked, roughly half the interface ignored
 * it. Keeping the pairs together makes a missing translation a type error
 * rather than something you only notice on screen.
 *
 * Voice: speak to the reader, keep it short, no system vocabulary.
 */
export const uiCopy = {
  // App shell
  myProgress: { en: "My progress", th: "ความก้าวหน้าของฉัน" },
  notesAndWords: { en: "Notes & vocabulary", th: "โน้ตและคำศัพท์" },
  languageAndGoals: { en: "Language & goals", th: "ภาษาและเป้าหมาย" },
  settings: { en: "Settings", th: "ตั้งค่า" },
  goBack: { en: "Go back", th: "ย้อนกลับ" },

  // Library / course
  courseLibrary: { en: "Course library", th: "คลังคอร์ส" },
  allCourses: { en: "All courses", th: "คอร์สทั้งหมด" },
  courseProgress: { en: "Course progress", th: "ความคืบหน้าของคอร์ส" },
  lessons: { en: "lessons", th: "บทเรียน" },
  lessonsDone: { en: "done", th: "เรียนแล้ว" },
  readInOrder: { en: "Read in order", th: "อ่านเรียงตามลำดับ" },
  continueLesson: { en: "Continue lesson", th: "เรียนต่อ" },
  startPractice: { en: "Start practice", th: "เริ่มฝึก" },
  courseMap: { en: "Course map", th: "แผนที่คอร์ส" },
  next: { en: "Next", th: "ต่อไป" },
  completed: { en: "completed", th: "เรียนจบแล้ว" },

  // Lesson
  studyPlan: { en: "Study plan", th: "แผนการเรียน" },
  lessonBrief: { en: "Lesson brief", th: "สรุปบทเรียน" },
  whyThisMatters: { en: "Why this matters", th: "ทำไมเรื่องนี้ถึงสำคัญ" },
  contents: { en: "Contents", th: "หัวข้อในบทนี้" },
  markAsRead: { en: "Mark as read", th: "อ่านจบแล้ว" },
  readingProgress: { en: "Reading progress", th: "อ่านไปแล้ว" },
  previousLesson: { en: "Previous lesson", th: "บทก่อนหน้า" },
  nextLesson: { en: "Next lesson", th: "บทถัดไป" },
  tryBeforeQuiz: { en: "Try this before the quiz", th: "ลองทำก่อนเริ่มควิซ" },
  bookmarked: { en: "Bookmarked", th: "บันทึกไว้แล้ว" },

  // Lesson sections
  objectives: { en: "What you will get from this", th: "บทนี้ให้อะไรกับคุณ" },
  watchIt: { en: "Watch it in action", th: "ดูตัวอย่างจริง" },
  plainTerms: { en: "In plain terms", th: "อธิบายแบบง่าย ๆ" },
  atWork: { en: "How this looks at work", th: "เจอแบบนี้ตอนทำงานจริง" },
  exampleFlow: { en: "Example flow", th: "ตัวอย่างขั้นตอน" },
  easyMistakes: { en: "Easy mistakes to make", th: "จุดที่พลาดกันบ่อย" },
  sharperJudgment: { en: "Sharper judgment", th: "คิดให้คมขึ้น" },
  wordsWorthKnowing: { en: "Words worth knowing", th: "ศัพท์ที่ควรรู้" },
  miniTask: { en: "Mini task", th: "โจทย์สั้น ๆ" },
  quickCheck: { en: "Quick check", th: "เช็กความเข้าใจ" },
  yourNote: { en: "Your note", th: "โน้ตของคุณ" },
  saveNote: { en: "Save note", th: "บันทึกโน้ต" },
  saveVocabulary: { en: "Save this word", th: "เก็บคำนี้ไว้" },

  // Study plan prompts
  planWithVideo: { en: "Watch the examples, read the lesson, then try the check.", th: "ดูตัวอย่างก่อน แล้วค่อยอ่านบทเรียน จบด้วยการเช็กความเข้าใจ" },
  planReadOnly: { en: "Read this lesson, then mark it as read.", th: "อ่านบทเรียนนี้ให้จบ แล้วกดว่าอ่านแล้ว" },
  planFinishPractice: { en: "Finish with a short practice round.", th: "ปิดท้ายด้วยการฝึกสั้น ๆ สักรอบ" },
  planSectionDone: { en: "This part of the course is done.", th: "ส่วนนี้ของคอร์สเรียนจบแล้ว" },
  moveTo: { en: "Move to", th: "ไปต่อที่" },

  // Study steps
  stepRead: { en: "Read", th: "อ่าน" },
  stepReadHint: { en: "Core idea", th: "แก่นของเรื่อง" },
  stepWatch: { en: "Watch", th: "ดู" },
  stepWatchHint: { en: "Video", th: "วิดีโอ" },
  stepSee: { en: "See", th: "ดูภาพ" },
  stepSeeHint: { en: "Visual", th: "ภาพประกอบ" },
  stepApply: { en: "Apply", th: "ลองใช้" },
  stepApplyHint: { en: "Check", th: "เช็กความเข้าใจ" },

  // Status badges
  minRead: { en: "min read", th: "นาที" },
  statusCompleted: { en: "completed", th: "เรียนจบแล้ว" },
  statusInProgress: { en: "in progress", th: "กำลังเรียน" },
  statusNotStarted: { en: "not started", th: "ยังไม่เริ่ม" },
  videosLabel: { en: "videos", th: "วิดีโอ" },
  questionsLabel: { en: "questions", th: "คำถาม" },
  lessonsDoneShort: { en: "done", th: "เรียนแล้ว" },
  catCoreSkill: { en: "Core skill", th: "ทักษะหลัก" },
  catCareerTrack: { en: "Career track", th: "สายอาชีพ" },
  catLifeSkills: { en: "Life skills", th: "ทักษะชีวิต" },
} as const;

export type UiCopyKey = keyof typeof uiCopy;

/**
 * Pick the wording for the current mode. TH + EN shows Thai for chrome —
 * repeating a four-word label in two languages is noise, and the Thai reader
 * is the one this mode is for. Body content still shows both.
 */
export function t(mode: LanguageMode, key: UiCopyKey) {
  return mode === "EN" ? uiCopy[key].en : uiCopy[key].th;
}
