import type { AnswerRecord, LessonProgress, ProgressState, QuizSessionState, ReviewItem, SavedNote, UserSettings, VocabularyItem } from "@/types/skillquest";

const progressKey = "skillquest-progress";
const sessionKey = "skillquest-session";
const settingsKey = "skillquest-settings";

export const defaultProgress: ProgressState = {
  totalXP: 420,
  dailyGoal: 10,
  currentStreak: 4,
  completedQuestionIds: [],
  answers: [],
  reviewQueue: [],
  savedVocabulary: [],
  lessons: {},
  savedNotes: [],
};

export const defaultSettings: UserSettings = {
  languageMode: "TH_EN",
  currentEnglishLevel: "B1",
  targetEnglishLevel: "B2",
  ieltsTargetBand: "7.0",
  ieltsMode: "learn",
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultProgress;
  const raw = window.localStorage.getItem(progressKey);
  if (!raw) return defaultProgress;

  try {
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressState) {
  window.localStorage.setItem(progressKey, JSON.stringify(progress));
}

export function loadSession(): QuizSessionState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(sessionKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as QuizSessionState;
  } catch {
    return null;
  }
}

export function saveSession(session: QuizSessionState) {
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(sessionKey);
}

export function loadSettings(): UserSettings {
  if (typeof window === "undefined") return defaultSettings;
  const raw = window.localStorage.getItem(settingsKey);
  if (!raw) return defaultSettings;

  try {
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: UserSettings) {
  window.localStorage.setItem(settingsKey, JSON.stringify(settings));
}

export function saveVocabularyItem(items: VocabularyItem[], vocabulary: VocabularyItem): VocabularyItem[] {
  if (items.some((item) => item.id === vocabulary.id)) return items;
  return [...items, { ...vocabulary, saved: true }];
}

export function upsertLessonProgress(
  lessons: Record<string, LessonProgress>,
  lessonId: string,
  updates: Partial<LessonProgress>,
): Record<string, LessonProgress> {
  const existing = lessons[lessonId] ?? {
    lessonId,
    readingProgress: 0,
    completed: false,
    reviewFlag: false,
    savedVocabularyIds: [],
  };

  return {
    ...lessons,
    [lessonId]: {
      ...existing,
      ...updates,
      lessonId,
    },
  };
}

export function saveLessonNote(notes: SavedNote[], lessonId: string, text: string): SavedNote[] {
  const trimmed = text.trim();
  if (!trimmed) return notes.filter((note) => note.lessonId !== lessonId);
  const note = { lessonId, text: trimmed, savedAt: new Date().toISOString() };
  return notes.some((item) => item.lessonId === lessonId)
    ? notes.map((item) => (item.lessonId === lessonId ? note : item))
    : [...notes, note];
}

export function nextReviewDate(isCorrect: boolean) {
  const date = new Date();
  date.setDate(date.getDate() + (isCorrect ? 3 : 1));
  return date.toISOString();
}

export function upsertReviewItem(queue: ReviewItem[], answer: AnswerRecord): ReviewItem[] {
  if (answer.isCorrect) return queue;

  const existing = queue.find((item) => item.questionId === answer.questionId);
  if (!existing) {
    return [
      ...queue,
      {
        questionId: answer.questionId,
        totalAttempts: 1,
        incorrectAttempts: 1,
        lastAnsweredAt: answer.answeredAt,
        nextReviewAt: nextReviewDate(false),
      },
    ];
  }

  return queue.map((item) =>
    item.questionId === answer.questionId
      ? {
          ...item,
          totalAttempts: item.totalAttempts + 1,
          incorrectAttempts: item.incorrectAttempts + 1,
          lastAnsweredAt: answer.answeredAt,
          nextReviewAt: nextReviewDate(false),
        }
      : item,
  );
}
