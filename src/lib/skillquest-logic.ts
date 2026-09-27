import { learningPaths } from "@/data/learning-paths";
import { lessonsForPath } from "@/data/lessons";
import { questions } from "@/data/questions";
import { defaultProgress } from "@/lib/storage";
import type { LanguageMode, LearningLesson, LearningPath, ProgressState, Question, QuizSessionState, VocabularyItem } from "@/types/skillquest";

export type View = "home" | "learn" | "learn-path" | "lesson" | "quiz" | "review" | "progress" | "settings";

export type InitialQuizStart = { choiceId?: string; currentIndex?: number; lessonId?: string; pathId?: string; submitted?: boolean };

export type ReviewFilter = "due" | "recent" | "frequent" | "ielts" | "ux-writing";

export const languageLabels: Record<LanguageMode, string> = {
  TH: "TH",
  EN: "EN",
  TH_EN: "TH + EN",
};

export function showThai(mode: LanguageMode) {
  return mode === "TH" || mode === "TH_EN";
}

export function showEnglish(mode: LanguageMode) {
  return mode === "EN" || mode === "TH_EN";
}

export function textByMode(mode: LanguageMode, english: string, thai?: string) {
  if (mode === "EN") return english;
  return thai ?? english;
}

export function hasDistinctThaiText(english?: string, thai?: string) {
  if (!thai) return false;
  return thai.trim().toLocaleLowerCase() !== (english ?? "").trim().toLocaleLowerCase();
}

export function questionVocabulary(question: Question): VocabularyItem[] {
  if (question.vocabulary?.length) return question.vocabulary;
  return [
    {
      id: `vocab-${question.id}-term`,
      word: question.skill,
      thaiMeaning: question.skillTh ?? "คำศัพท์วิชาชีพที่ควรเข้าใจจากบริบทของคำถาม",
      partOfSpeech: "noun",
      simpleDefinition: `A professional concept used in ${question.learningPath}.`,
      exampleSentence: `This question uses ${question.skill} in a workplace situation.`,
      exampleTranslationTh: `คำถามนี้ใช้คำว่า ${question.skill} ในสถานการณ์การทำงานจริง`,
      skill: question.skill,
      topic: question.topic,
    },
  ];
}

export function progressForPath(path: LearningPath, progress: ProgressState) {
  const pathQuestions = questions.filter((question) => question.learningPath === path.name);
  const pathLessons = lessonsForPath(path.id);
  const completed = pathQuestions.filter((question) => progress.completedQuestionIds.includes(question.id)).length;
  const completedLessons = pathLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
  const total = pathQuestions.length + pathLessons.length;
  if (!total) return 0;
  return Math.min(100, Math.round(((completed + completedLessons) / total) * 100));
}

export function levelForPathProgress(path: LearningPath, progress: ProgressState) {
  const percent = progressForPath(path, progress);
  return levelForPathPercent(path, percent);
}

export function levelForPathPercent(path: LearningPath, percent: number) {
  if (path.currentLevel === "B1" || path.currentLevel === "B2" || path.currentLevel === "C1") {
    if (percent >= 85) return "B2";
    if (percent >= 50) return path.currentLevel;
    return "B1";
  }
  if (percent >= 85) return "Mid-level";
  if (percent >= 45) return "Junior";
  if (percent > 0) return "Beginner";
  return path.currentLevel;
}

export function learningActivityDates(progress: ProgressState) {
  const dates = [
    ...progress.answers.map((answer) => answer.answeredAt),
    ...Object.values(progress.lessons ?? {}).flatMap((lesson) => [lesson.startedAt, lesson.lastOpenedAt]).filter((date): date is string => Boolean(date)),
  ];

  return Array.from(new Set(dates.map((date) => new Date(date).toDateString())));
}

export function learningStreak(progress: ProgressState) {
  const activityDates = new Set(learningActivityDates(progress));
  if (!activityDates.size) return 0;

  let streak = 0;
  const cursor = new Date();
  while (activityDates.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function reviewCountForPath(path: LearningPath, progress: ProgressState) {
  const pathQuestionIds = new Set(questions.filter((question) => question.learningPath === path.name).map((question) => question.id));
  const pathLessonIds = new Set(lessonsForPath(path.id).map((lesson) => lesson.id));
  const dueQuestions = progress.reviewQueue.filter((item) => pathQuestionIds.has(item.questionId)).length;
  const dueLessons = Object.values(progress.lessons ?? {}).filter((lesson) => pathLessonIds.has(lesson.lessonId) && lesson.reviewFlag).length;
  return dueQuestions + dueLessons;
}

export function categoryForPath(pathId: string) {
  if (["designops", "ux-research", "ux-research-method", "agile-ux-ui", "design-system", "product-owner", "product-analytics", "ai-product-workflow", "career-portfolio", "cx-communication"].includes(pathId)) {
    return "Career Track";
  }

  if (pathId === "stock-investing" || pathId === "thai-tax-personal-finance") {
    return "Life Skills";
  }

  return "Core Skill";
}

/**
 * Category accents. Three hues, each tied to what the track is for, so the
 * colour on a card is readable information rather than decoration.
 */

export function categoryAccent(category: string) {
  if (category === "Career Track") return "linear-gradient(90deg, #8fb4ff 0%, #7fe3c4 100%)";
  if (category === "Life Skills") return "linear-gradient(90deg, #ffb55c 0%, #ff8173 100%)";
  return "linear-gradient(90deg, #7fe3c4 0%, #b9f4a8 100%)";
}

export type ProgressTone = "blue" | "violet" | "mint" | "champagne" | "graphite";

export const pathProgressTones: Record<string, ProgressTone> = {
  "ux-ui": "blue",
  "product-design": "violet",
  "creative-thinking": "mint",
  "art-direction": "champagne",
  "ux-writing": "mint",
  "graphic-design": "blue",
  "english-work": "violet",
  ielts: "blue",
  communication: "champagne",
  "critical-thinking": "graphite",
  designops: "violet",
  "ux-research": "mint",
  "ux-research-method": "blue",
  "agile-ux-ui": "mint",
  "design-system": "violet",
  "product-owner": "blue",
  "product-analytics": "champagne",
  "ai-product-workflow": "violet",
  "career-portfolio": "mint",
  "cx-communication": "champagne",
  "stock-investing": "graphite",
  "thai-tax-personal-finance": "champagne",
};

export function progressToneForPath(pathId: string): ProgressTone {
  return pathProgressTones[pathId] ?? "graphite";
}

export function getTodayAnswered(progress: ProgressState) {
  const today = new Date().toDateString();
  return progress.answers.filter((answer) => new Date(answer.answeredAt).toDateString() === today).length;
}

export function getQuestion(id: string) {
  return questions.find((question) => question.id === id);
}

export function pathIdForQuestion(question: Question) {
  return learningPaths.find((path) => path.name === question.learningPath)?.id ?? learningPaths[0].id;
}

export function uniqueQuestions(items: Question[]) {
  const seen = new Set<string>();
  return items.filter((question) => {
    if (seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
}

export const practiceSessionQuestionCount = 7;

export function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

export function questionsForPractice(pathId: string, lesson?: LearningLesson, progress: ProgressState = defaultProgress) {
  const path = learningPaths.find((item) => item.id === pathId) ?? learningPaths[0];
  const pathQuestions = questions.filter((question) => question.learningPath === path.name);
  const explicitLessonQuestions = lesson?.relatedQuestionIds?.length
    ? lesson.relatedQuestionIds.map(getQuestion).filter((question): question is Question => Boolean(question))
    : [];
  const lessonQuestions = lesson
    ? pathQuestions.filter((question) => {
        const haystack = `${question.topic} ${question.skill} ${question.topicTh ?? ""} ${question.skillTh ?? ""}`.toLowerCase();
        return haystack.includes(lesson.relatedTopic.toLowerCase()) || question.lessonId === lesson.id || question.chapterId === lesson.id || question.topicId === lesson.slug;
      })
    : [];
  const candidates = uniqueQuestions([...explicitLessonQuestions, ...lessonQuestions, ...pathQuestions]);
  const attemptCounts = progress.answers.reduce<Record<string, number>>((counts, answer) => {
    counts[answer.questionId] = (counts[answer.questionId] ?? 0) + 1;
    return counts;
  }, {});
  const reviewIds = new Set(progress.reviewQueue.map((item) => item.questionId));
  const sessionSeed = progress.answers.length + progress.completedQuestionIds.length + progress.reviewQueue.length;

  return candidates
    .map((question, index) => {
      const attempts = attemptCounts[question.id] ?? 0;
      const isCompleted = progress.completedQuestionIds.includes(question.id);
      const isReview = reviewIds.has(question.id);
      const freshnessTieBreaker = stableHash(`${path.id}:${sessionSeed}:${question.id}`) / 1_000_000_000;

      return {
        question,
        index,
        score: attempts * 24 + (isCompleted ? 12 : 0) + (isReview ? 8 : 0) + freshnessTieBreaker,
      };
    })
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .slice(0, practiceSessionQuestionCount)
    .map((item) => item.question);
}

export function createSession(pathId: string, lesson?: LearningLesson, progress: ProgressState = defaultProgress): QuizSessionState {
  const path = learningPaths.find((item) => item.id === pathId) ?? learningPaths[0];
  const questionIds = questionsForPractice(path.id, lesson, progress).map((question) => question.id);

  return {
    pathId: path.id,
    lessonId: lesson?.id,
    chapterId: lesson?.id,
    topicId: lesson?.slug,
    questionIds,
    currentIndex: 0,
    answers: [],
    completed: false,
  };
}

export function createSessionFromStart(initialQuizStart?: InitialQuizStart) {
  if (!initialQuizStart) return null;
  const pathId = initialQuizStart.pathId ?? defaultProgress.activePathId ?? learningPaths[0].id;
  const lesson = initialQuizStart.lessonId ? lessonsForPath(pathId).find((item) => item.id === initialQuizStart.lessonId) : undefined;
  const session = createSession(pathId, lesson, defaultProgress);
  const currentIndex = Math.max(0, Math.min(session.questionIds.length - 1, initialQuizStart.currentIndex ?? 0));
  const question = getQuestion(session.questionIds[currentIndex]);
  const submittedAnswer = initialQuizStart.submitted && initialQuizStart.choiceId && question
    ? [{
        answeredAt: "1970-01-01T00:00:00.000Z",
        isCorrect: initialQuizStart.choiceId === question.correctChoiceId,
        questionId: question.id,
        selectedChoiceId: initialQuizStart.choiceId,
      }]
    : [];

  return {
    ...session,
    answers: submittedAnswer,
    currentIndex,
  };
}
