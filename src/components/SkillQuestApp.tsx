"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { learningPaths } from "@/data/learning-paths";
import { adjacentLessons, findLesson, findLessonById, findPathBySlug, lessonsForPath, modulesForPath } from "@/data/lessons";
import { defaultMotivationalQuote, getRandomQuote, type MotivationalQuote } from "@/data/motivational-quotes";
import { questions } from "@/data/questions";
import {
  clearSession,
  defaultProgress,
  defaultSettings,
  loadProgress,
  loadSession,
  loadSettings,
  saveProgress,
  saveLessonNote,
  saveSettings,
  saveSession,
  saveVocabularyItem,
  upsertLessonProgress,
  upsertReviewItem,
} from "@/lib/storage";
import type { AnswerRecord, LanguageMode, LearningLesson, LearningPath, LessonProgress, ProgressState, Question, QuizSessionState, UserSettings, VocabularyItem } from "@/types/skillquest";
import { PageShell, StatCard } from "./AppShell";
import { QuestionMedia } from "./QuestionMedia";
import { learningPathIconMap } from "./icons/icon-registry";
import { Soft3DIcon } from "./icons/soft-3d-icon";
import type { Soft3DIconName } from "./icons/icon-types";

type View = "home" | "learn" | "learn-path" | "lesson" | "quiz" | "review" | "progress" | "settings";
type InitialQuizStart = { choiceId?: string; currentIndex?: number; lessonId?: string; pathId?: string; submitted?: boolean };

const languageLabels: Record<LanguageMode, string> = {
  TH: "TH",
  EN: "EN",
  TH_EN: "TH + EN",
};

function showThai(mode: LanguageMode) {
  return mode === "TH" || mode === "TH_EN";
}

function showEnglish(mode: LanguageMode) {
  return mode === "EN" || mode === "TH_EN";
}

function textByMode(mode: LanguageMode, english: string, thai?: string) {
  if (mode === "EN") return english;
  return thai ?? english;
}

function questionVocabulary(question: Question): VocabularyItem[] {
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

function progressForPath(path: LearningPath, progress: ProgressState) {
  const pathQuestions = questions.filter((question) => question.learningPath === path.name);
  const completed = pathQuestions.filter((question) => progress.completedQuestionIds.includes(question.id)).length;
  const base = path.questionsCompleted;
  const total = Math.max(pathQuestions.length + base, 1);
  return Math.min(100, Math.round(((completed + base) / total) * 100));
}

type ProgressTone = "blue" | "violet" | "mint" | "champagne" | "graphite";

const pathProgressTones: Record<string, ProgressTone> = {
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
  "product-owner": "blue",
  "product-analytics": "champagne",
  "ai-product-workflow": "violet",
  "career-portfolio": "mint",
  "stock-investing": "graphite",
  "thai-tax-personal-finance": "champagne",
};

function progressToneForPath(pathId: string): ProgressTone {
  return pathProgressTones[pathId] ?? "graphite";
}

function getTodayAnswered(progress: ProgressState) {
  const today = new Date().toDateString();
  return progress.answers.filter((answer) => new Date(answer.answeredAt).toDateString() === today).length;
}

function getQuestion(id: string) {
  return questions.find((question) => question.id === id);
}

function pathIdForQuestion(question: Question) {
  return learningPaths.find((path) => path.name === question.learningPath)?.id ?? learningPaths[0].id;
}

function createSession(pathId: string, lesson?: LearningLesson): QuizSessionState {
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
  const questionIds = (explicitLessonQuestions.length ? explicitLessonQuestions : lessonQuestions.length ? lessonQuestions : pathQuestions.length ? pathQuestions : questions).slice(0, 5).map((question) => question.id);

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

function createSessionFromStart(initialQuizStart?: InitialQuizStart) {
  if (!initialQuizStart) return null;
  const pathId = initialQuizStart.pathId ?? defaultProgress.activePathId ?? learningPaths[0].id;
  const lesson = initialQuizStart.lessonId ? lessonsForPath(pathId).find((item) => item.id === initialQuizStart.lessonId) : undefined;
  const session = createSession(pathId, lesson);
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

export function SkillQuestApp({
  initialView,
  initialQuizStart,
  initialSettingsPatch,
  learningPathSlug,
  lessonSlug,
}: {
  initialView: View;
  initialQuizStart?: InitialQuizStart;
  initialSettingsPatch?: Partial<UserSettings>;
  learningPathSlug?: string;
  lessonSlug?: string;
}) {
  const initialSettings = useMemo(() => ({ ...defaultSettings, ...initialSettingsPatch }), [initialSettingsPatch]);
  const initialSession = useMemo(() => createSessionFromStart(initialQuizStart), [initialQuizStart]);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [session, setSession] = useState<QuizSessionState | null>(initialSession);
  const [heroQuote, setHeroQuote] = useState<MotivationalQuote>(defaultMotivationalQuote);
  const [todayAnswered, setTodayAnswered] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedProgress = loadProgress();
      const savedSettings = { ...loadSettings(), ...initialSettingsPatch };
      setProgress(savedProgress);
      setSettings(savedSettings);
      setSession(initialSession ?? loadSession());
      setHeroQuote(getRandomQuote(defaultMotivationalQuote.id));
      setTodayAnswered(getTodayAnswered(savedProgress));
      setShowTranslations(savedSettings.languageMode !== "EN");
      setStorageReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialSession, initialSettingsPatch]);

  useEffect(() => {
    if (!storageReady) return;
    saveProgress(progress);
  }, [progress, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    if (session) saveSession(session);
  }, [session, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    saveSettings(settings);
  }, [settings, storageReady]);

  const activePath = learningPaths.find((path) => path.id === (session?.pathId ?? progress.activePathId)) ?? learningPaths[0];
  const dueReview = progress.reviewQueue.length;

  const startQuiz = useCallback((pathId = activePath.id, lessonId?: string) => {
    const lesson = lessonId ? lessonsForPath(pathId).find((item) => item.id === lessonId) : undefined;
    const newSession = createSession(pathId, lesson);
    const nextProgress = { ...progress, activePathId: pathId };
    setSelectedChoice("");
    setShowHint(false);
    setShowTranslations(settings.languageMode !== "EN");
    setSession(newSession);
    saveSession(newSession);
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }, [activePath.id, progress, settings.languageMode]);

  function submitAnswer(question: Question) {
    if (!selectedChoice || !session) return;
    const answer: AnswerRecord = {
      questionId: question.id,
      selectedChoiceId: selectedChoice,
      isCorrect: selectedChoice === question.correctChoiceId,
      answeredAt: new Date().toISOString(),
    };
    const isAnsweredToday = new Date(answer.answeredAt).toDateString() === new Date().toDateString();

    const updatedSession = { ...session, answers: [...session.answers, answer] };
    setSession(updatedSession);
    if (isAnsweredToday) {
      setTodayAnswered((current) => current + 1);
    }
    setProgress((current) => ({
      ...current,
      totalXP: current.totalXP + (answer.isCorrect ? 12 : 6),
      completedQuestionIds: Array.from(new Set([...current.completedQuestionIds, question.id])),
      answers: [...current.answers, answer],
      reviewQueue: upsertReviewItem(current.reviewQueue, answer),
    }));
  }

  function nextQuestion() {
    if (!session) return;
    const nextIndex = session.currentIndex + 1;
    setSelectedChoice("");
    setShowHint(false);
    setSession({
      ...session,
      currentIndex: nextIndex,
      completed: nextIndex >= session.questionIds.length,
    });
  }

  function clearReviewItem(questionId: string) {
    setProgress((current) => ({
      ...current,
      totalXP: current.totalXP + 8,
      reviewQueue: current.reviewQueue.filter((item) => item.questionId !== questionId),
      lessons: current.lessons?.[questionId]
        ? upsertLessonProgress(current.lessons, questionId, { reviewFlag: false })
        : current.lessons,
    }));
  }

  function updateSettings(nextSettings: UserSettings) {
    setSettings(nextSettings);
    saveSettings(nextSettings);
    setShowTranslations(nextSettings.languageMode !== "EN");
  }

  function saveVocabulary(vocabulary: VocabularyItem) {
    setProgress((current) => ({
      ...current,
      savedVocabulary: saveVocabularyItem(current.savedVocabulary ?? [], vocabulary),
    }));
  }

  const openLesson = useCallback(function openLesson(lessonId: string) {
    setProgress((current) => {
      const openedAt = new Date().toISOString();
      const existing = current.lessons?.[lessonId];
      return {
        ...current,
        lessons: upsertLessonProgress(current.lessons ?? {}, lessonId, {
          startedAt: existing?.startedAt ?? openedAt,
          lastOpenedAt: openedAt,
          readingProgress: Math.max(existing?.readingProgress ?? 0, 35),
        }),
      };
    });
  }, []);


  const updateLessonProgress = useCallback(function updateLessonProgress(lessonId: string, updates: Partial<LessonProgress>) {
    setProgress((current) => ({
      ...current,
      lessons: upsertLessonProgress(current.lessons ?? {}, lessonId, updates),
    }));
  }, []);

  const saveNote = useCallback(function saveNote(lessonId: string, note: string) {
    setProgress((current) => ({
      ...current,
      savedNotes: saveLessonNote(current.savedNotes ?? [], lessonId, note),
      lessons: upsertLessonProgress(current.lessons ?? {}, lessonId, { note }),
    }));
  }, []);

  if (initialView === "learn") {
    return <LearningLibraryView progress={progress} settings={settings} />;
  }

  if (initialView === "learn-path") {
    return <LearningPathDetailView progress={progress} learningPathSlug={learningPathSlug} />;
  }

  if (initialView === "lesson") {
    return (
      <LessonReadingView
        progress={progress}
        settings={settings}
        learningPathSlug={learningPathSlug}
        lessonSlug={lessonSlug}
        onSaveVocabulary={saveVocabulary}
        onSaveNote={saveNote}
        onOpenLesson={openLesson}
        onUpdateLessonProgress={updateLessonProgress}
        onStartQuiz={startQuiz}
      />
    );
  }

  if (initialView === "quiz") {
    return (
      <QuizView
        activePath={activePath}
        progress={progress}
        settings={settings}
        session={session}
        selectedChoice={selectedChoice}
        showHint={showHint}
        showTranslations={showTranslations}
        onSelectChoice={setSelectedChoice}
        onShowHint={() => setShowHint(true)}
        onToggleTranslations={() => setShowTranslations((current) => !current)}
        onStartQuiz={startQuiz}
        onSubmit={submitAnswer}
        onNext={nextQuestion}
        onSaveVocabulary={saveVocabulary}
      />
    );
  }

  if (initialView === "review") {
    return <ReviewView progress={progress} settings={settings} onStartQuiz={startQuiz} onClearReviewItem={clearReviewItem} />;
  }

  if (initialView === "progress") {
    return <ProgressView progress={progress} settings={settings} />;
  }

  if (initialView === "settings") {
    return <SettingsView settings={settings} onUpdateSettings={updateSettings} />;
  }

  return (
    <HomeView
      progress={progress}
      settings={settings}
      activePath={activePath}
      todayAnswered={todayAnswered}
      dueReview={dueReview}
      hasSession={Boolean(session && !session.completed)}
      heroQuote={heroQuote}
      onStartQuiz={startQuiz}
    />
  );
}

function HomeView({
  progress,
  settings,
  activePath,
  todayAnswered,
  dueReview,
  hasSession,
  heroQuote,
  onStartQuiz,
}: {
  progress: ProgressState;
  settings: UserSettings;
  activePath: LearningPath;
  todayAnswered: number;
  dueReview: number;
  hasSession: boolean;
  heroQuote: MotivationalQuote;
  onStartQuiz: (pathId?: string) => void;
}) {
  const mode = settings.languageMode;
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="relative mb-7 min-h-[21rem] overflow-hidden rounded-[2.25rem] px-4 py-12 text-center sm:min-h-[24rem] sm:px-8 sm:py-16 lg:min-h-[28rem] lg:py-20">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-62 saturate-[1.08] contrast-[1.05]"
          src="/media/home-hero-motion.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.78)_35%,rgba(233,233,231,0.68)_62%,rgba(233,233,231,0.82)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />
        <div className="pointer-events-none absolute left-1/2 top-4 h-36 w-36 -translate-x-1/2 rounded-full gradient-iridescent opacity-45 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        <div className="relative mx-auto grid min-h-[15rem] max-w-5xl content-center sm:min-h-[17rem] lg:min-h-[20rem]">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--text-secondary)] sm:text-sm">Class Room</p>
          <h1 className="mx-auto mt-6 max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.6] tracking-normal text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            {heroQuote.english}
          </h1>
          <p className="font-subtitle mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {heroQuote.thai}
          </p>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-white p-5 shadow-editorial sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-14 -top-10 h-72 w-72 rounded-full gradient-iridescent opacity-90 blur-[1px]" />
          <div className="pointer-events-none absolute right-8 top-16 hidden h-48 w-48 rotate-12 rounded-[3rem] border border-black/10 bg-white/35 backdrop-blur-md sm:block" />
          <div className="pointer-events-none absolute bottom-8 right-10 hidden h-32 w-56 -rotate-6 rounded-[2rem] bg-[var(--gradient-lime)] opacity-90 shadow-[0_22px_48px_rgba(23,23,23,0.14)] lg:block" />
          <div className="relative grid content-between gap-8 sm:min-h-[23rem] sm:gap-10 lg:max-w-[72%]">
            <div className="flex flex-wrap items-center gap-2">
              <Badge icon="statusInProgress">Dashboard</Badge>
              <Badge>{activePath.currentLevel}</Badge>
              <Badge icon="actionTranslation">{languageLabels[mode]}</Badge>
            </div>
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">Today&apos;s focus</p>
              <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-none tracking-tight text-[var(--text-primary)] sm:text-6xl">
                Learning
                <span className="block">Dashboard</span>
              </h2>
              <p className="font-subtitle mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
                Keep the Home screen clear: see your current level, daily goal, review queue, and the next practice action without browsing lessons here.
              </p>
              {showThai(mode) ? (
                <p className="font-subtitle mt-2 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                  หน้า Home เหลือเป็น Dashboard สำหรับดูภาพรวมและเริ่มฝึกต่อ ส่วนเนื้อหาบทเรียนอยู่ในหน้า Learn
                </p>
              ) : null}
            </div>
            <div>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <ProgressBar value={Math.min(Math.round((todayAnswered / Math.max(progress.dailyGoal, 1)) * 100), 100)} variant="rainbow" />
                  <div className="mt-2 flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                    <span>Daily goal</span>
                    <span>
                      {todayAnswered}/{progress.dailyGoal}
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)]">
                  {dueReview}
                  <span className="block text-xs font-medium text-[var(--text-muted)]">Due review</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={`/quiz?start=1&path=${activePath.id}`} onClick={() => onStartQuiz(activePath.id)} className="button-primary">
                  <Soft3DIcon name="navigationPractice" size="sm" decorative shadow={false} />
                  {hasSession ? "Resume Mission" : "Start Mission"}
                </a>
                <Link href="/review" className="button-ghost">
                  <Soft3DIcon name="navigationReview" size="sm" decorative shadow={false} />
                  Review Mistakes
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white/88 p-5 shadow-editorial">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {textByMode(mode, "My progress", "ความก้าวหน้าของฉัน")}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                {textByMode(mode, "Learning momentum", "ภาพรวมการเรียน")}
              </h2>
            </div>
            <Soft3DIcon name="statusLevelUp" size="lg" decorative priority active />
          </div>
          <div className="mt-6 grid gap-3">
            <ProgressSummaryRow icon="statusXp" label={textByMode(mode, "Current XP", "XP ปัจจุบัน")} value={String(progress.totalXP)} />
            <ProgressSummaryRow icon="statusMastered" label={textByMode(mode, "Current skill level", "ระดับทักษะปัจจุบัน")} value={activePath.currentLevel} />
            <ProgressSummaryRow icon="statusGoal" label={textByMode(mode, "Daily goal", "เป้าหมายวันนี้")} value={`${todayAnswered}/${progress.dailyGoal}`} />
            <ProgressSummaryRow icon="statusStreak" label={textByMode(mode, "Learning streak", "เรียนต่อเนื่อง")} value={`${progress.currentStreak} วัน`} />
            <ProgressSummaryRow icon="statusReviewDue" label={textByMode(mode, "Due for review", "รอทบทวน")} value={String(dueReview)} />
          </div>
          <Link href="/progress" className="button-primary mt-6 w-full">
            <Soft3DIcon name="navigationProgress" size="sm" decorative shadow={false} />
            View All Progress
          </Link>
        </section>
      </div>

      <section className="mt-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-white/88 p-5 shadow-editorial sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--text-muted)]">Learning levels</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Current level by lesson</h2>
          </div>
          <Link href="/learn" className="button-ghost w-full sm:w-auto">
            <Soft3DIcon name="navigationLearn" size="sm" decorative shadow={false} />
            Open Learn
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {learningPaths.map((path) => {
            const pathProgress = progressForPath(path, progress);
            return (
              <article key={path.id} className="grid min-h-28 grid-cols-[auto_1fr] gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-white)] p-4 shadow-[0_8px_22px_rgba(23,23,23,0.045)]">
                <span className="grid h-11 w-11 place-items-center">
                  <Soft3DIcon name={learningPathIconMap[path.name]} size="sm" decorative shadow={false} active />
                </span>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="truncate font-display text-base font-extrabold tracking-tight text-[var(--text-primary)]">{path.name}</h3>
                    <span className="shrink-0 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-extrabold text-[var(--text-primary)]">{path.currentLevel}</span>
                  </div>
                  <p className="font-subtitle mt-2 line-clamp-2 text-xs leading-5 text-[var(--text-secondary)]">{textByMode(mode, path.currentGoal, path.currentGoalTh)}</p>
                  <div className="mt-3">
                    <ProgressBar value={pathProgress} tone={progressToneForPath(path.id)} />
                    <div className="mt-1 flex justify-between text-[11px] font-semibold text-[var(--text-muted)]">
                      <span>Progress</span>
                      <span>{pathProgress}%</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function LearningLibraryView({ progress, settings }: { progress: ProgressState; settings: UserSettings }) {
  const mode = settings.languageMode;
  return (
    <PageShell
      eyebrow="Learn Mode"
      title="Build understanding before the quiz."
      summary="A calm reading library for concepts, examples, vocabulary, notes, and chapter progress."
    >
      <div className="mb-5 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[#fbfbf8] p-5 shadow-editorial sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--text-muted)]">Reading Library</p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Choose a path, read the chapter, collect useful words.
            </h2>
          </div>
          <div className="font-subtitle grid gap-2 rounded-[1.75rem] border border-[var(--border)] bg-white p-4 text-sm leading-6 text-[var(--text-secondary)]">
            <span><strong className="text-[var(--text-primary)]">Learn</strong> is for reading and sense-making.</span>
            <span><strong className="text-[var(--text-primary)]">Practice</strong> is where you answer under focus.</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path) => {
          const pathLessons = lessonsForPath(path.id);
          const completed = pathLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
          const inProgress = pathLessons.find((lesson) => {
            const state = progress.lessons?.[lesson.id];
            return state && !state.completed && state.readingProgress > 0;
          });
          const currentLesson = inProgress ?? pathLessons[completed] ?? pathLessons[0];
          const percent = Math.round((completed / Math.max(pathLessons.length, 1)) * 100);
          const category = path.id === "designops" || path.id === "ux-research" ? "Career & Design" : path.id === "stock-investing" || path.id === "thai-tax-personal-finance" ? "Money & Life" : null;
          const safetyLabel = path.id === "stock-investing" ? "Not Financial Advice" : path.id === "thai-tax-personal-finance" ? "Not an Official Tax Calculation" : null;

          return (
            <article key={path.id} className="group relative min-h-[24rem] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[#fffefb] p-5 shadow-[0_14px_36px_rgba(23,23,23,0.055)] transition hover:-translate-y-1 hover:border-[var(--border-strong)] sm:p-6">
              <div className="absolute inset-y-6 left-0 w-1.5 rounded-r-full bg-[linear-gradient(180deg,#cbd5dc,#f1eee5)]" />
              <div className={`absolute right-[-3rem] top-[-3rem] h-40 w-40 rounded-full bg-gradient-to-br ${path.accent} opacity-25 transition group-hover:scale-105`} />
              <div className="relative grid min-h-[21rem] content-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">Read Track · {path.currentLevel}</p>
                        {category ? <Badge>{category}</Badge> : null}
                        {safetyLabel ? <Badge icon="statusGoal">{safetyLabel}</Badge> : null}
                      </div>
                      <h2 className="mt-3 max-w-[13rem] text-balance font-display text-3xl font-extrabold leading-none tracking-tight text-[var(--text-primary)]">{path.name}</h2>
                    </div>
                    <Soft3DIcon name={learningPathIconMap[path.name]} size="lg" alt={path.name} priority active />
                  </div>
                  <p className="font-subtitle mt-5 text-sm leading-7 text-[var(--text-secondary)]">{textByMode(mode, path.description, path.descriptionTh)}</p>
                  <div className="mt-5 grid gap-2 rounded-2xl border border-[var(--border)] bg-white/70 p-3 text-xs font-semibold text-[var(--text-secondary)]">
                    <span>{pathLessons.length} reading chapters</span>
                    <span>{completed} chapters completed</span>
                    <span className="line-clamp-1">Next read: {currentLesson?.title ?? "Overview"}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <ProgressBar value={percent} tone={progressToneForPath(path.id)} />
                  <div className="mt-2 flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                    <span>Reading progress</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/learn/${path.id}/${currentLesson?.slug ?? ""}`} className="button-primary flex-1">
                      Open Reader
                    </Link>
                    <Link href={`/learn/${path.id}`} className="button-ghost flex-1">
                      Chapter Map
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

function LearningPathDetailView({ progress, learningPathSlug }: { progress: ProgressState; learningPathSlug?: string }) {
  const path = learningPathSlug ? findPathBySlug(learningPathSlug) : undefined;

  if (!path) {
    return <EmptyState title="Learning path not found" description="Choose a path from the library to continue reading." action="Open Library" href="/learn" />;
  }

  const pathLessons = lessonsForPath(path.id);
  const completed = pathLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
  const modules = modulesForPath(path.id);

  return (
    <PageShell
      eyebrow="Learning Path"
      title={path.name}
      summary={path.description}
    >
      <div className="mb-5 rounded-[var(--radius-card)] border border-[var(--border)] bg-white p-5 shadow-editorial">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-subtitle text-sm font-semibold text-[var(--text-secondary)]">{completed}/{pathLessons.length} chapters completed</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-[var(--text-primary)]">{path.currentLevel} reading track</h2>
          </div>
          <Soft3DIcon name={learningPathIconMap[path.name]} size="lg" decorative active />
        </div>
        <div className="mt-4">
          <ProgressBar value={Math.round((completed / Math.max(pathLessons.length, 1)) * 100)} tone={progressToneForPath(path.id)} />
        </div>
      </div>

      {modules.length ? (
        <div className="grid gap-5">
          {modules.map((module) => {
            const moduleLessons = module.lessonIds.map((lessonId) => pathLessons.find((lesson) => lesson.id === lessonId)).filter((lesson): lesson is LearningLesson => Boolean(lesson));
            const moduleCompleted = moduleLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
            return (
              <section key={module.id} className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white p-5 shadow-editorial sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--text-muted)]">Module {String(module.number).padStart(2, "0")}</p>
                    <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">{module.titleEn}</h2>
                    <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{module.descriptionTh}</p>
                  </div>
                  <Badge icon="statusCompleted">{moduleCompleted}/{moduleLessons.length} completed</Badge>
                </div>
                <div className="mt-5 grid gap-3">
                  {moduleLessons.map((lesson) => {
                    const state = progress.lessons?.[lesson.id];
                    const status = state?.completed ? "completed" : state?.reviewFlag ? "review-recommended" : state?.readingProgress ? "in-progress" : "ready-for-practice";
                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${path.id}/${lesson.slug}`}
                        className="group flex flex-col gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <Badge>Lesson {lesson.number}</Badge>
                            <Badge>{lesson.professionalLevel ?? lesson.difficulty}</Badge>
                            <Badge>{lesson.estimatedMinutes ?? lesson.readingMinutes} min</Badge>
                            <Badge icon="navigationPractice">Practice ready</Badge>
                            {state?.bookmarked ? <Badge icon="actionBookmark">Bookmarked</Badge> : null}
                          </span>
                          <span className="mt-3 block font-display text-xl font-extrabold text-[var(--text-primary)]">{lesson.titleEn ?? lesson.title}</span>
                          <span className="font-subtitle mt-1 block text-sm leading-7 text-[var(--text-secondary)]">{lesson.summaryTh ?? lesson.titleTh}</span>
                        </span>
                        <span className="shrink-0 text-sm font-extrabold text-[var(--text-primary)]">{status}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4">
          {pathLessons.map((lesson) => {
            const state = progress.lessons?.[lesson.id];
            const status = state?.completed ? "completed" : state?.reviewFlag ? "review-recommended" : state?.readingProgress ? "in-progress" : "not-started";
            return (
              <article key={lesson.id} className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white p-5 shadow-editorial">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>Chapter {lesson.number}</Badge>
                      <Badge>{lesson.difficulty}</Badge>
                      <Badge>{lesson.readingMinutes} min read</Badge>
                      <Badge>{status}</Badge>
                      {lesson.hasPractice ? <Badge icon="navigationPractice">Practice ready</Badge> : null}
                    </div>
                    <h2 className="mt-4 text-balance font-display text-2xl font-extrabold text-[var(--text-primary)]">{lesson.title}</h2>
                    <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{lesson.titleTh}</p>
                    <p className="font-subtitle mt-2 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">{lesson.description}</p>
                  </div>
                  <Link href={`/learn/${path.id}/${lesson.slug}`} className="button-primary shrink-0">
                    {state?.readingProgress ? "Continue Reading" : "Read Lesson"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}

function LessonReadingView({
  progress,
  settings,
  learningPathSlug,
  lessonSlug,
  onSaveVocabulary,
  onSaveNote,
  onOpenLesson,
  onUpdateLessonProgress,
  onStartQuiz,
}: {
  progress: ProgressState;
  settings: UserSettings;
  learningPathSlug?: string;
  lessonSlug?: string;
  onSaveVocabulary: (vocabulary: VocabularyItem) => void;
  onSaveNote: (lessonId: string, note: string) => void;
  onOpenLesson: (lessonId: string) => void;
  onUpdateLessonProgress: (lessonId: string, updates: Partial<LessonProgress>) => void;
  onStartQuiz: (pathId?: string, lessonId?: string) => void;
}) {
  const mode = settings.languageMode;
  const lesson = learningPathSlug && lessonSlug ? findLesson(learningPathSlug, lessonSlug) : undefined;
  const path = learningPathSlug ? findPathBySlug(learningPathSlug) : undefined;
  const [noteDraft, setNoteDraft] = useState("");
  const [miniChoice, setMiniChoice] = useState("");
  const [miniSubmitted, setMiniSubmitted] = useState(false);

  useEffect(() => {
    if (!lesson) return;
    const frame = window.requestAnimationFrame(() => {
      onOpenLesson(lesson.id);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lesson, onOpenLesson]);

  if (!lesson || !path) {
    return <EmptyState title="Lesson not found" description="Choose a lesson from the learning library to continue." action="Open Library" href="/learn" />;
  }

  const currentLesson = lesson;
  const currentPath = path;
  const state = progress.lessons?.[currentLesson.id];
  const adjacent = adjacentLessons(currentPath.id, currentLesson.slug);
  const miniCorrect = currentLesson.miniCheck ? miniChoice === currentLesson.miniCheck.correctChoiceId : false;
  const savedNote = state?.note ?? progress.savedNotes?.find((item) => item.lessonId === currentLesson.id)?.text ?? "";
  const readingSections = currentLesson.sections ?? [];
  const contents = [
    { id: "lesson-brief", label: "Lesson Brief" },
    { id: "learning-objectives", label: "Learning Objectives" },
    ...readingSections.map((item) => ({ id: item.id, label: item.titleEn })),
    ...(currentLesson.visualMedia?.length ? [{ id: "visual-model", label: "Visual Model" }] : []),
    { id: "workplace-example", label: "Workplace Example" },
    { id: "mini-check", label: "Mini Check" },
  ];

  function markComplete() {
    onUpdateLessonProgress(currentLesson.id, {
      completed: true,
      readingProgress: 100,
      lastOpenedAt: new Date().toISOString(),
    });
  }

  function addToReview() {
    onUpdateLessonProgress(currentLesson.id, {
      reviewFlag: true,
      lastOpenedAt: new Date().toISOString(),
    });
  }

  function toggleBookmark() {
    onUpdateLessonProgress(currentLesson.id, {
      bookmarked: !state?.bookmarked,
      lastOpenedAt: new Date().toISOString(),
    });
  }

  function saveAllVocabulary() {
    currentLesson.terminology.forEach(onSaveVocabulary);
    onUpdateLessonProgress(currentLesson.id, {
      savedVocabularyIds: Array.from(new Set([...(state?.savedVocabularyIds ?? []), ...currentLesson.terminology.map((item) => item.id)])),
    });
  }

  function submitMiniCheck() {
    if (!currentLesson.miniCheck || !miniChoice) return;
    setMiniSubmitted(true);
    onUpdateLessonProgress(currentLesson.id, {
      miniCheckCorrect: miniChoice === currentLesson.miniCheck.correctChoiceId,
      readingProgress: Math.max(state?.readingProgress ?? 0, 85),
    });
  }

  return (
    <PageShell
      eyebrow={`${path.name} · Chapter ${lesson.number}`}
      title={lesson.titleEn ?? lesson.title}
      summary={lesson.description}
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white p-5 shadow-editorial sm:p-7 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{lesson.professionalLevel ?? lesson.difficulty}</Badge>
            <Badge>{lesson.estimatedMinutes ?? lesson.readingMinutes} min read</Badge>
            <Badge>{state?.completed ? "completed" : state?.readingProgress ? "in-progress" : "not-started"}</Badge>
            <Badge icon="navigationPractice">Practice ready</Badge>
            {state?.bookmarked ? <Badge icon="actionBookmark">Bookmarked</Badge> : null}
            {currentLesson.contentVerification ? <VerificationBadges verification={currentLesson.contentVerification} /> : null}
          </div>

          <section id="lesson-brief" className="mt-7 scroll-mt-28 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--text-muted)]">Lesson Brief</p>
            <p className="mt-3 max-w-4xl text-base leading-8 text-[var(--text-secondary)]">{lesson.summaryTh ?? lesson.introductionTh}</p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-white p-4">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">Why this matters</p>
              {showEnglish(mode) ? <p className="mt-2 font-subtitle text-sm font-semibold leading-6 text-[var(--text-primary)]">{lesson.keyTakeaway}</p> : null}
              {showThai(mode) ? <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{lesson.keyTakeawayTh}</p> : null}
            </div>
          </section>

          {currentLesson.contentVerification ? <VerificationNotice verification={currentLesson.contentVerification} /> : null}

          <details className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 md:hidden">
            <summary className="cursor-pointer font-display text-sm font-extrabold text-[var(--text-primary)]">Contents</summary>
            <div className="mt-3 grid gap-2 text-sm text-[var(--text-secondary)]">
              {contents.map((item, index) => (
                <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-xs font-bold text-[var(--text-primary)]">{index + 1}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </details>

          <LessonBlock id="learning-objectives" title="Learning Objectives" step={1}>
            <ul className="grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
              {lesson.objectives.map((objective) => (
                <li key={objective}>• {objective}</li>
              ))}
            </ul>
          </LessonBlock>

          <LessonBlock title="Read In This Order" step={2}>
            <p className="font-subtitle text-sm leading-7 text-[var(--text-secondary)]">
              อ่านทีละส่วนตามลำดับนี้ก่อน แล้วค่อยดูภาพประกอบเพื่อจับ mental model จากนั้นปิดท้ายด้วยตัวอย่างงานจริงและ mini check
            </p>
          </LessonBlock>

          {currentLesson.sections?.map((item, index) => (
            <LessonBlock key={item.id} id={item.id} title={item.titleEn} step={index + 3}>
              {item.bodyTh.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {item.bullets?.length ? (
                <ul className="grid gap-2">
                  {item.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
                </ul>
              ) : null}
            </LessonBlock>
          )) ?? (
            <LessonBlock title="Simple Explanation" step={3}>
              {showEnglish(mode) ? <p>{lesson.explanation}</p> : null}
              {showThai(mode) ? <p>{lesson.explanationTh}</p> : null}
            </LessonBlock>
          )}

          {currentLesson.visualMedia?.map((media, index) => (
            <LessonBlock key={media.titleEn} id={index === 0 ? "visual-model" : undefined} title={media.titleEn} step={(currentLesson.sections?.length ?? 1) + 3 + index}>
              <p className="font-subtitle">{media.descriptionTh}</p>
              {media.type === "figma-grid-cheat-sheet" ? <FigmaGridCheatSheet /> : <VisualMediaPreview media={media} />}
            </LessonBlock>
          ))}

          <LessonBlock id="workplace-example" title="Workplace Example" step={(currentLesson.sections?.length ?? 1) + 4}>
            {currentLesson.practicalExamples?.length ? (
              <div className="grid gap-3">
                {currentLesson.practicalExamples.map((example) => (
                  <div key={example.titleEn} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
                    <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">{example.titleEn}</p>
                    <p className="mt-2">{example.bodyTh}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {showEnglish(mode) ? <p>{lesson.workplaceExample}</p> : null}
                {showThai(mode) ? <p>{lesson.workplaceExampleTh}</p> : null}
              </>
            )}
          </LessonBlock>

          {lesson.diagram?.length ? (
            <LessonBlock title="Example Flow">
              <div className="flex flex-wrap items-center gap-2">
                {lesson.diagram.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)]">{item}</span>
                    {index < lesson.diagram!.length - 1 ? <span className="text-[var(--text-muted)]">→</span> : null}
                  </span>
                ))}
              </div>
            </LessonBlock>
          ) : null}

          {lesson.commonMistakes?.length ? (
            <LessonBlock title="Common Mistakes">
              <div className="grid gap-3 sm:grid-cols-2">
                <ul className="grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {lesson.commonMistakes.map((mistake) => <li key={mistake}>• {mistake}</li>)}
                </ul>
                {showThai(mode) ? (
                  <ul className="grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {lesson.commonMistakesTh?.map((mistake) => <li key={mistake}>• {mistake}</li>)}
                  </ul>
                ) : null}
              </div>
            </LessonBlock>
          ) : null}

          <LessonBlock title="Better Design Judgment">
            <div className="grid gap-3 sm:grid-cols-2">
              <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
                {lesson.juniorVsSenior?.junior ?? lesson.juniorThinking}
                {lesson.juniorVsSenior?.juniorTh ? <span className="mt-2 block">{lesson.juniorVsSenior.juniorTh}</span> : null}
              </p>
              <p className="rounded-2xl border border-[var(--border)] bg-white p-4 font-semibold text-[var(--text-primary)] sm:p-5">
                {lesson.juniorVsSenior?.senior ?? lesson.seniorThinking}
                {lesson.juniorVsSenior?.seniorTh ? <span className="mt-2 block font-medium text-[var(--text-secondary)]">{lesson.juniorVsSenior.seniorTh}</span> : null}
              </p>
            </div>
          </LessonBlock>

          <LessonBlock title="Professional Terminology">
            <div className="grid gap-3 sm:grid-cols-2">
              {(lesson.vocabulary ?? lesson.terminology).map((vocabulary) => (
                <VocabularyCard key={vocabulary.id} vocabulary={vocabulary} onSave={onSaveVocabulary} saved={progress.savedVocabulary?.some((item) => item.id === vocabulary.id)} />
              ))}
            </div>
          </LessonBlock>

          {lesson.miniCheck ? (
            <LessonBlock id="mini-check" title="Mini Knowledge Check" step={(currentLesson.sections?.length ?? 1) + 8}>
              <p className="font-semibold text-[var(--text-primary)]">{lesson.miniCheck.question}</p>
              {showThai(mode) ? <p>{lesson.miniCheck.questionTh}</p> : null}
              <div className="mt-4 grid gap-3">
                {lesson.miniCheck.choices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={miniSubmitted}
                    onClick={() => setMiniChoice(choice.id)}
                    className={`min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition ${
                      miniChoice === choice.id ? "border-[#171717] bg-[var(--surface)] text-[var(--text-primary)]" : "border-[var(--border)] bg-white text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    {choice.text}
                    {showThai(mode) ? <span className="block pt-1 text-xs font-medium text-[var(--text-secondary)]">{choice.textTh}</span> : null}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" className="button-primary" disabled={!miniChoice || miniSubmitted} onClick={submitMiniCheck}>
                  Check Answer
                </button>
                {miniSubmitted ? (
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {miniCorrect ? "Correct. " : "Not quite. "}
                    {showThai(mode) ? lesson.miniCheck.explanationTh : lesson.miniCheck.explanation}
                  </p>
                ) : null}
              </div>
            </LessonBlock>
          ) : null}

          <LessonBlock title="Personal Note">
            <textarea
              key={`${lesson.id}-${savedNote}`}
              defaultValue={savedNote}
              onChange={(event) => setNoteDraft(event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--text-primary)] outline-none transition focus:border-[var(--border-strong)] focus:bg-white focus:ring-2 focus:ring-black/10"
              placeholder="Write a short note in Thai or English..."
            />
            <div className="mt-3 flex flex-wrap gap-3">
              <button type="button" className="button-primary" onClick={() => onSaveNote(lesson.id, noteDraft || savedNote)}>
                Save Note
              </button>
              <button type="button" className="button-ghost" onClick={saveAllVocabulary}>
                Save Vocabulary
              </button>
              <button type="button" className="button-ghost" onClick={addToReview}>
                Add to Review
              </button>
            </div>
          </LessonBlock>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:flex-wrap">
            <button type="button" className="button-ghost" onClick={toggleBookmark}>
              <Soft3DIcon name="actionBookmark" size="sm" decorative shadow={false} />
              {state?.bookmarked ? "Remove Bookmark" : "Bookmark Lesson"}
            </button>
            {adjacent.previous ? <Link href={`/learn/${path.id}/${adjacent.previous.slug}`} className="button-ghost">Previous Lesson</Link> : null}
            {adjacent.next ? <Link href={`/learn/${path.id}/${adjacent.next.slug}`} className="button-ghost">Next Lesson</Link> : null}
            <button type="button" className="button-ghost" onClick={markComplete}>Mark as Read</button>
            <a href={`/quiz?start=1&path=${path.id}&lesson=${lesson.id}`} className="button-primary" onClick={() => onStartQuiz(path.id, lesson.id)}>
              Start Lesson Practice
            </a>
          </div>
        </article>

        <aside className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white/82 p-5 shadow-editorial xl:sticky xl:top-28 xl:self-start">
          <p className="font-display text-sm font-extrabold text-[var(--text-primary)]">Reading Progress</p>
          <div className="mt-4">
            <ProgressBar value={state?.completed ? 100 : state?.readingProgress ?? 0} />
          </div>
          <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)]">
            <p>Completed: {state?.completed ? "Yes" : "No"}</p>
            <p>Bookmarked: {state?.bookmarked ? "Yes" : "No"}</p>
            <p>Review flag: {state?.reviewFlag ? "Added" : "Not added"}</p>
            <p>Saved words: {state?.savedVocabularyIds?.length ?? 0}</p>
          </div>
          {currentLesson.sections?.length ? (
            <div className="mt-6 hidden border-t border-[var(--border)] pt-5 xl:block">
              <p className="font-display text-sm font-extrabold text-[var(--text-primary)]">Read in order</p>
              <div className="mt-3 grid gap-2">
                {contents.map((item, index) => (
                  <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 rounded-2xl bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-white hover:text-[var(--text-primary)]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs text-[var(--text-primary)]">{index + 1}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}

function QuizView({
  activePath,
  progress,
  settings,
  session,
  selectedChoice,
  showHint,
  showTranslations,
  onSelectChoice,
  onShowHint,
  onToggleTranslations,
  onStartQuiz,
  onSubmit,
  onNext,
  onSaveVocabulary,
}: {
  activePath: LearningPath;
  progress: ProgressState;
  settings: UserSettings;
  session: QuizSessionState | null;
  selectedChoice: string;
  showHint: boolean;
  showTranslations: boolean;
  onSelectChoice: (choiceId: string) => void;
  onShowHint: () => void;
  onToggleTranslations: () => void;
  onStartQuiz: (pathId?: string) => void;
  onSubmit: (question: Question) => void;
  onNext: () => void;
  onSaveVocabulary: (vocabulary: VocabularyItem) => void;
}) {
  const mode = settings.languageMode;
  if (!session) {
    return (
      <PageShell
        eyebrow="Practice Mode"
        title="Train one decision at a time."
        summary="A focused quiz space for answering, checking feedback, and sending weak spots to Review."
      >
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/72 p-4 text-[var(--text-primary)] shadow-[0_24px_70px_rgba(23,23,23,0.11),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,#d9f4ff_0%,rgba(217,244,255,0)_68%)] opacity-75 blur-2xl" />
          <div className="pointer-events-none absolute bottom-[-9rem] left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,#e5dcff_0%,rgba(229,220,255,0)_70%)] opacity-55 blur-2xl" />
          <div className="pointer-events-none absolute left-[-7rem] top-1/3 h-52 w-52 rounded-full bg-[radial-gradient(circle,#ddffef_0%,rgba(221,255,239,0)_72%)] opacity-60 blur-2xl" />
          <div className="relative mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--text-muted)]">Quiz Launchpad</p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Pick a path and enter a short practice round.
              </h2>
            </div>
            <div className="font-subtitle rounded-[1.75rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--text-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              Submit once · Learn from feedback · Review mistakes
            </div>
          </div>
          <div className="relative grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {learningPaths.slice(0, 6).map((path) => (
              <PracticeLaunchCard key={path.id} path={path} progress={progressForPath(path, progress)} settings={settings} onStartQuiz={onStartQuiz} />
            ))}
          </div>
        </section>
      </PageShell>
    );
  }

  if (session.completed) {
    const correct = session.answers.filter((answer) => answer.isCorrect).length;
    const incorrect = session.answers.length - correct;
    const accuracy = Math.round((correct / Math.max(session.answers.length, 1)) * 100);
    const sessionLesson = session.lessonId ? findLessonById(session.lessonId) : undefined;

    return (
      <PageShell
        eyebrow="Session Complete"
        title="Nice work. Here is what changed."
        summary="A useful finish should show progress and point to the next best action."
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500 text-3xl font-semibold shadow-[0_0_60px_rgba(105,101,255,0.35)]">
              {accuracy}%
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">{textByMode(mode, "Session Summary", "สรุปผลการทำแบบฝึกหัด")}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Metric label={textByMode(mode, "Answered", "ตอบแล้ว")} value={String(session.answers.length)} />
              <Metric label={textByMode(mode, "Correct", "ตอบถูก")} value={String(correct)} />
              <Metric label={textByMode(mode, "Review", "ต้องทบทวน")} value={String(incorrect)} />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/review" className="button-primary">
                <Soft3DIcon name="navigationReview" size="sm" decorative shadow={false} />
                Start Review
              </Link>
              <Link href="/" onClick={clearSession} className="button-ghost">
                Return Home
              </Link>
              {sessionLesson ? (
                <Link href={`/learn/${session.pathId}/${sessionLesson.slug}`} className="button-ghost">
                  Back to Lesson
                </Link>
              ) : null}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-semibold text-white">{textByMode(mode, "Questions to revisit", "ข้อที่ควรกลับมาทบทวน")}</h3>
            <div className="mt-4 space-y-3">
              {session.answers
                .filter((answer) => !answer.isCorrect)
                .map((answer) => getQuestion(answer.questionId))
                .filter((question): question is Question => Boolean(question))
                .map((question) => (
                  <div key={question.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-medium text-white">{question.topic}</p>
                    <p className="font-subtitle mt-1 text-sm text-[var(--text-secondary)]">{textByMode(mode, question.keyTakeaway, question.keyTakeawayTh)}</p>
                  </div>
                ))}
              {incorrect === 0 ? <p className="font-subtitle text-sm text-[var(--text-secondary)]">{textByMode(mode, "No mistakes in this session. Smooth run.", "เซสชันนี้ไม่มีข้อผิดพลาด เยี่ยมมาก")}</p> : null}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  const currentQuestion = getQuestion(session.questionIds[session.currentIndex]);
  if (!currentQuestion) return null;
  const isIelts = currentQuestion.learningPath === "IELTS Preparation";
  const isExam = isIelts && settings.ieltsMode === "exam";
  const canShowThai = showThai(mode) && showTranslations && !isExam;
  const answer = session.answers.find((item) => item.questionId === currentQuestion.id);
  const submitted = Boolean(answer);
  const revealThai = showThai(mode) && (showTranslations || submitted);
  const selected = answer?.selectedChoiceId ?? selectedChoice;
  const correctChoice = currentQuestion.choices.find((choice) => choice.id === currentQuestion.correctChoiceId);
  const selectedAnswer = currentQuestion.choices.find((choice) => choice.id === selected);
  const sessionLesson = session.lessonId ? findLessonById(session.lessonId) : undefined;
  const quizFormId = `quiz-answer-${currentQuestion.id}`;
  const nextQuestionHref = session.currentIndex + 1 >= session.questionIds.length
    ? "/review"
    : `/quiz?start=1&path=${session.pathId}&index=${session.currentIndex + 1}${session.lessonId ? `&lesson=${session.lessonId}` : ""}`;

  return (
    <PageShell
      eyebrow="Quiz Session"
      title={activePath.name}
      summary="One question at a time. Submit once, study the feedback, then continue."
    >
      <div className="rounded-[2.25rem] border border-white/70 bg-white/58 p-2 shadow-[0_24px_70px_rgba(23,23,23,0.1),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl sm:p-4">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white p-4 shadow-editorial sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{currentQuestion.skill}</Badge>
            <Badge>{textByMode(mode, currentQuestion.topic, currentQuestion.topicTh)}</Badge>
            <Badge>{currentQuestion.difficulty}</Badge>
            {isExam ? <Badge icon="skillIelts">Exam Practice</Badge> : null}
          </div>
          {isExam ? (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[#fff8dd] p-4 text-sm leading-7 text-[var(--text-primary)]">
              IELTS Exam Practice: คำแปลและคำใบ้จะถูกซ่อนไว้ระหว่างตอบ ผลลัพธ์เป็นเพียงการฝึก ไม่ใช่คะแนน IELTS อย่างเป็นทางการ
            </div>
          ) : null}
          {currentQuestion.contentVerification ? <VerificationNotice verification={currentQuestion.contentVerification} /> : null}
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>{textByMode(mode, "Question", "ข้อ")} {session.currentIndex + 1} / {session.questionIds.length}</span>
              <span>{Math.round(((session.currentIndex + 1) / session.questionIds.length) * 100)}%</span>
            </div>
            <ProgressBar value={((session.currentIndex + 1) / session.questionIds.length) * 100} />
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              {showEnglish(mode) ? <h2 className="text-balance font-display text-2xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-3xl">{currentQuestion.question}</h2> : null}
              {revealThai ? <p className="font-subtitle mt-4 text-base leading-8 text-[var(--text-secondary)]">{currentQuestion.questionTh ?? currentQuestion.explanationTh ?? currentQuestion.question}</p> : null}
            </div>
            {showThai(mode) ? (
              <button type="button" onClick={onToggleTranslations} className="button-ghost shrink-0">
                <Soft3DIcon name="actionTranslation" size="sm" decorative shadow={false} />
                {showTranslations ? "Hide Translation" : "Show Translation"}
              </button>
            ) : null}
          </div>
          {currentQuestion.media ? (
            <QuestionMedia media={currentQuestion.media} showEnglish={showEnglish(mode)} showThai={revealThai} />
          ) : null}
          <form id={quizFormId} action="/quiz" method="get" className="mt-6 grid gap-3">
            <input type="hidden" name="start" value="1" />
            <input type="hidden" name="path" value={session.pathId} />
            <input type="hidden" name="index" value={session.currentIndex} />
            <input type="hidden" name="submitted" value="1" />
            {session.lessonId ? <input type="hidden" name="lesson" value={session.lessonId} /> : null}
            {currentQuestion.choices.map((choice) => {
              const isSelected = selected === choice.id;
              const isCorrect = submitted && choice.id === currentQuestion.correctChoiceId;
              const isWrong = submitted && isSelected && !isCorrect;
              return (
                <label
                  key={choice.id}
                  aria-disabled={submitted}
                  onPointerDown={() => {
                    if (!submitted) onSelectChoice(choice.id);
                  }}
                  onClick={() => {
                    if (!submitted) onSelectChoice(choice.id);
                  }}
                  className={`min-h-14 cursor-pointer rounded-2xl border px-4 py-3 text-left text-sm leading-6 shadow-[0_0_0_rgba(23,23,23,0)] transition focus-within:ring-2 focus-within:ring-black ${
                    isCorrect
                      ? "border-[#66f4c0] bg-[#effff8] text-[var(--text-primary)]"
                      : isWrong
                        ? "border-[#ff9b8f] bg-[#fff4f1] text-[var(--text-primary)]"
                        : isSelected
                          ? "border-[#171717] bg-[var(--surface)] text-[var(--text-primary)]"
                          : "border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] hover:shadow-[0_10px_26px_rgba(23,23,23,0.08)]"
                  }`}
                >
                  <input className="sr-only" disabled={submitted} name="choice" required type="radio" value={choice.id} defaultChecked={isSelected} />
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-white text-xs font-bold uppercase">
                      {isCorrect ? <Soft3DIcon name="statusCorrect" size="xs" decorative shadow={false} /> : isWrong ? <Soft3DIcon name="statusIncorrect" size="xs" decorative shadow={false} /> : choice.id}
                    </span>
                    <span>
                      {showEnglish(mode) ? <span className="block">{choice.text}</span> : null}
                      {canShowThai || (submitted && showThai(mode)) ? <span className="mt-1 block text-[var(--text-secondary)]">{choice.textTh ?? choice.text}</span> : null}
                    </span>
                  </span>
                </label>
              );
            })}
          </form>

          {!submitted && revealThai ? (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">คำศัพท์ช่วยเหลือ</p>
              <div className="mt-2 space-y-1">
                {questionVocabulary(currentQuestion).slice(0, 3).map((vocabulary) => (
                  <p key={vocabulary.id} className="text-sm leading-7 text-[var(--text-secondary)]">
                    <span className="font-display font-extrabold text-[var(--text-primary)]">{vocabulary.word}</span> = {vocabulary.thaiMeaning}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {showHint && !submitted && !isExam ? (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-primary)]">
              <Soft3DIcon name="actionHint" size="sm" decorative shadow={false} className="mb-2" />
              {textByMode(mode, currentQuestion.hint, currentQuestion.hintTh)}
            </div>
          ) : null}

          {submitted ? (
            <div className="mt-5 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2">
                <Soft3DIcon name={answer?.isCorrect ? "statusCorrect" : "statusIncorrect"} size="sm" decorative shadow={false} />
                <h3 className="font-semibold text-[var(--text-primary)]">{answer?.isCorrect ? textByMode(mode, "Correct", "ตอบถูก") : textByMode(mode, "Review this idea", "ควรทบทวนแนวคิดนี้")}</h3>
              </div>
              <p className="font-subtitle mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {textByMode(mode, "Recommended answer", "คำตอบที่แนะนำ")}: <span className="font-semibold text-[var(--text-primary)]">{correctChoice?.text}</span>
              </p>
              {showThai(mode) ? <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{correctChoice?.textTh ?? correctChoice?.text}</p> : null}
              {!answer?.isCorrect ? (
                <p className="mt-3 text-sm leading-6 text-[#8f352c]">
                  {textByMode(mode, "Your answer", "คำตอบของคุณ")}: {selectedAnswer?.text}.{" "}
                  {textByMode(
                    mode,
                    currentQuestion.incorrectFeedback[selected] ?? "This option misses the main learning point.",
                    currentQuestion.incorrectFeedbackTh?.[selected] ?? "ตัวเลือกนี้ยังไม่ตรงกับประเด็นสำคัญของคำถาม",
                  )}
                </p>
              ) : null}
              {showThai(mode) ? <p className="font-subtitle mt-3 text-sm leading-7 text-[var(--text-secondary)]">{currentQuestion.explanationTh ?? currentQuestion.explanation}</p> : null}
              {showEnglish(mode) ? <p className="font-subtitle mt-3 text-sm leading-6 text-[var(--text-secondary)]">{currentQuestion.explanation}</p> : null}
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">{textByMode(mode, "Practical workplace example", "ตัวอย่างการใช้งานจริง")}</p>
                {showEnglish(mode) ? <p className="font-subtitle mt-2 text-sm leading-6 text-[var(--text-secondary)]">{currentQuestion.practicalExample}</p> : null}
                {showThai(mode) ? <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{currentQuestion.practicalExampleTh ?? currentQuestion.practicalExample}</p> : null}
              </div>
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">{textByMode(mode, "Important vocabulary", "คำศัพท์สำคัญ")}</p>
                <div className="mt-3 grid gap-3">
                  {questionVocabulary(currentQuestion).map((vocab) => (
                    <VocabularyCard key={vocab.id} vocabulary={vocab} onSave={onSaveVocabulary} />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold leading-7 text-[var(--text-primary)]">{textByMode(mode, "Key takeaway", "สิ่งสำคัญที่ควรจำ")}: {textByMode(mode, currentQuestion.keyTakeaway, currentQuestion.keyTakeawayTh)}</p>
              {sessionLesson ? (
                <Link href={`/learn/${session.pathId}/${sessionLesson.slug}`} className="button-ghost mt-4 w-fit">
                  Back to Lesson
                </Link>
              ) : null}
            </div>
          ) : null}

          <div className="sticky bottom-20 mt-6 flex flex-col gap-3 rounded-3xl border border-[var(--border)] bg-white/90 p-3 shadow-[0_16px_40px_rgba(23,23,23,0.12)] backdrop-blur-xl sm:static sm:flex-row sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
            {!submitted ? (
              <>
                <button type="button" onClick={onShowHint} disabled={isExam} className="button-ghost disabled:cursor-not-allowed disabled:opacity-45">
                  <Soft3DIcon name="actionHint" size="sm" decorative shadow={false} />
                  Hint
                </button>
                <button type="submit" form={quizFormId} onClick={() => selectedChoice ? onSubmit(currentQuestion) : undefined} className="button-primary">
                  Submit Answer
                  <Soft3DIcon name="actionSubmit" size="sm" decorative shadow={false} />
                </button>
              </>
            ) : (
              <a href={nextQuestionHref} onClick={onNext} className="button-primary">
                {session.currentIndex + 1 >= session.questionIds.length ? "Finish Session" : "Next Question"}
                <Soft3DIcon name="actionNext" size="sm" decorative shadow={false} />
              </a>
            )}
          </div>
        </section>

        <aside className="hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-white/76 p-5 text-[var(--text-primary)] shadow-[0_18px_48px_rgba(23,23,23,0.08)] xl:block">
          <p className="font-display text-sm font-extrabold text-[var(--text-primary)]">{textByMode(mode, "Session focus", "โฟกัสของเซสชัน")}</p>
          <div className="mt-4 space-y-4 text-sm text-[var(--text-secondary)]">
            <p>{textByMode(mode, "Practice time: 5-10 minutes", "เวลาแนะนำ: 5-10 นาที")}</p>
            <p>{textByMode(mode, "Mode: Multiple choice", "รูปแบบ: Multiple choice")}</p>
            <p>{textByMode(mode, "Review behavior: Incorrect answers enter the local review queue.", "ข้อที่ตอบผิดจะถูกเพิ่มเข้า Review Queue ในเครื่อง")}</p>
          </div>
        </aside>
      </div>
      </div>
    </PageShell>
  );
}

function ReviewView({
  progress,
  settings,
  onStartQuiz,
  onClearReviewItem,
}: {
  progress: ProgressState;
  settings: UserSettings;
  onStartQuiz: (pathId?: string) => void;
  onClearReviewItem: (questionId: string) => void;
}) {
  const mode = settings.languageMode;
  const reviewQuestions = progress.reviewQueue
    .map((item) => ({ item, question: getQuestion(item.questionId) }))
    .filter((entry): entry is { item: NonNullable<typeof entry.item>; question: Question } => Boolean(entry.question));
  const reviewLessons = learningPaths.flatMap((path) =>
    lessonsForPath(path.id)
      .filter((lesson) => progress.lessons?.[lesson.id]?.reviewFlag)
      .map((lesson) => ({ path, lesson })),
  );

  return (
    <section className="relative isolate mx-auto w-full max-w-[1600px] overflow-hidden bg-[#03130c] px-4 py-8 text-[#eaf7ea] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6 sm:py-10 lg:rounded-[2.5rem] lg:px-8 lg:py-14">
      <ReviewBackgroundArt />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[#b9f7cf]/80">Review Queue</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-[#f7fff8] sm:text-5xl lg:text-6xl">
            Turn mistakes into stronger judgment.
          </h1>
          <p className="font-subtitle mt-4 max-w-2xl text-base leading-8 text-[#c9d8cd]">
            Incorrect answers and useful vocabulary are saved locally for later review.
          </p>
        </div>

        {reviewQuestions.length === 0 && reviewLessons.length === 0 ? (
          <div className="rounded-[2rem] border border-white/18 bg-white/88 p-8 text-center shadow-[0_26px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <Soft3DIcon name="statusMastered" size="md" decorative shadow={false} active className="mx-auto" />
            <h2 className="mt-5 text-xl font-bold text-[var(--text-primary)]">No review items yet</h2>
            <p className="font-subtitle mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              Missed quiz answers will appear here with the learning point that needs another pass.
            </p>
            <a href="/quiz?start=1" className="button-primary mt-5">
              Start Quiz
            </a>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
            <aside className="rounded-3xl border border-white/18 bg-white/10 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <p className="text-sm font-semibold text-[#f7fff8]">{textByMode(mode, "Filters", "ตัวกรอง")}</p>
              <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                {["ครบกำหนด", "เพิ่งตอบผิด", "ผิดบ่อย", "IELTS", "UX Writing"].map((filter) => (
                  <span key={filter} className="rounded-full border border-white/16 bg-white/8 px-3 py-2 text-xs font-semibold text-[#c9d8cd]">
                    {filter}
                  </span>
                ))}
              </div>
            </aside>
            <div className="space-y-4">
              {reviewLessons.map(({ path, lesson }) => (
                <article key={lesson.id} className="rounded-[2rem] border border-white/18 bg-white/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{path.name}</Badge>
                    <Badge icon="actionNote">Lesson</Badge>
                    <Badge icon="statusReviewDue">review-recommended</Badge>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{lesson.title}</h2>
                  <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{lesson.keyTakeawayTh}</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/learn/${path.id}/${lesson.slug}`} className="button-primary">
                      Open Lesson
                    </Link>
                    <button type="button" onPointerDown={() => onClearReviewItem(lesson.id)} onClick={() => onClearReviewItem(lesson.id)} className="button-ghost">
                      Mark Reviewed
                    </button>
                  </div>
                </article>
              ))}
              {reviewQuestions.map(({ item, question }) => (
                <article key={question.id} className="rounded-[2rem] border border-white/18 bg-white/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{question.learningPath}</Badge>
                    <Badge>{question.difficulty}</Badge>
                    <Badge icon="statusReviewDue">{item.incorrectAttempts} {textByMode(mode, "mistake", "ครั้งที่ผิด")}</Badge>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{textByMode(mode, question.topic, question.topicTh)}</h2>
                  <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{textByMode(mode, question.keyTakeaway, question.keyTakeawayTh)}</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a href={`/quiz?start=1&path=${pathIdForQuestion(question)}`} onClick={() => onStartQuiz(pathIdForQuestion(question))} className="button-primary">
                      Practice Again
                    </a>
                    <button type="button" onPointerDown={() => onClearReviewItem(question.id)} onClick={() => onClearReviewItem(question.id)} className="button-ghost">
                      Mark Reviewed
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <section className="mt-6 rounded-[2rem] border border-white/18 bg-white/10 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Soft3DIcon name="actionBookmark" size="sm" decorative shadow={false} />
            <h2 className="text-lg font-semibold text-[#f7fff8]">{textByMode(mode, "Saved Vocabulary", "คำศัพท์ที่บันทึกไว้")}</h2>
          </div>
          {progress.savedVocabulary?.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {progress.savedVocabulary.map((vocabulary) => (
                <VocabularyCard key={vocabulary.id} vocabulary={vocabulary} saved />
              ))}
            </div>
          ) : (
            <p className="font-subtitle mt-3 text-sm leading-7 text-[#c9d8cd]">
              {textByMode(mode, "Save useful words from quiz feedback and they will appear here.", "กดบันทึกคำศัพท์จาก feedback แล้วคำศัพท์จะมาแสดงที่นี่")}
            </p>
          )}
        </section>
        <section className="mt-6 rounded-[2rem] border border-white/18 bg-white/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Soft3DIcon name="actionNote" size="sm" decorative shadow={false} />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Saved Notes</h2>
          </div>
          {progress.savedNotes?.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {progress.savedNotes.map((note) => {
                const lesson = learningPaths.flatMap((path) => lessonsForPath(path.id)).find((item) => item.id === note.lessonId);
                const path = lesson ? findPathBySlug(lesson.learningPathId) : undefined;
                return (
                  <article key={note.lessonId} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="font-subtitle text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{lesson?.title ?? "Lesson note"}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{note.text}</p>
                    {lesson && path ? (
                      <Link href={`/learn/${path.id}/${lesson.slug}`} className="mt-3 inline-flex text-sm font-bold text-[var(--text-primary)]">
                        Open Lesson
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="font-subtitle mt-3 text-sm leading-7 text-[var(--text-secondary)]">Save notes from lessons and they will appear here for review.</p>
          )}
        </section>
      </div>
    </section>
  );
}

function ReviewBackgroundArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(22,177,104,0.32),transparent_30rem),radial-gradient(circle_at_12%_70%,rgba(190,255,18,0.22),transparent_24rem),linear-gradient(180deg,#041a10_0%,#020b08_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(222,255,218,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(222,255,218,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />
      <div className="absolute left-[7%] top-[21rem] h-32 w-32 rotate-[-18deg] rounded-[1.4rem] border border-cyan-100/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(88,255,205,0.16)_45%,rgba(4,20,15,0.34))] shadow-[18px_24px_60px_rgba(0,0,0,0.34)] backdrop-blur-sm sm:h-44 sm:w-44" />
      <div className="absolute right-[6%] top-24 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_38%_28%,#e5ffd8_0%,#1ce37d_34%,#006638_76%)] shadow-[16px_24px_50px_rgba(0,0,0,0.3)] sm:h-36 sm:w-36" />
      <div className="absolute right-[13%] top-[20rem] h-28 w-44 rotate-[18deg] rounded-[999px_2rem_999px_2rem] border border-white/35 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(219,255,90,0.58),rgba(0,167,112,0.18))] shadow-[18px_24px_54px_rgba(0,0,0,0.28)]" />
      <div className="absolute bottom-[-4rem] left-[12%] h-48 w-72 rotate-[-10deg] rounded-[2rem] border border-lime-200/45 bg-[linear-gradient(135deg,rgba(220,255,50,0.78),rgba(15,190,89,0.32),rgba(2,16,12,0.28))] shadow-[20px_30px_80px_rgba(0,0,0,0.38)]" />
      <div className="absolute bottom-10 right-[-5rem] h-64 w-64 rotate-[14deg] rounded-[2.2rem] border border-cyan-100/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(37,201,255,0.28)_44%,rgba(0,43,58,0.58))] shadow-[20px_30px_80px_rgba(0,0,0,0.38)]" />
      <div className="absolute left-1/2 top-[17rem] h-28 w-28 -translate-x-1/2 rotate-45 border border-emerald-100/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(90,255,199,0.28),rgba(1,41,29,0.5))] shadow-[16px_24px_52px_rgba(0,0,0,0.32)]" />
    </div>
  );
}

function ProgressView({ progress, settings }: { progress: ProgressState; settings: UserSettings }) {
  const mode = settings.languageMode;
  const accuracy = useMemo(() => {
    const correct = progress.answers.filter((answer) => answer.isCorrect).length;
    return Math.round((correct / Math.max(progress.answers.length, 1)) * 100);
  }, [progress.answers]);

  return (
    <PageShell
      eyebrow="Progress"
      title="A calm view of your learning momentum."
      summary="This first version keeps progress locally and preserves it after refresh."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={textByMode(mode, "Total XP", "XP ทั้งหมด")} value={String(progress.totalXP)} icon="statusXp" />
        <StatCard label={textByMode(mode, "Current streak", "เรียนต่อเนื่อง")} value={`${progress.currentStreak} วัน`} icon="statusStreak" />
        <StatCard label={textByMode(mode, "Accuracy", "ความแม่นยำ")} value={`${accuracy}%`} icon="statusAccuracy" />
        <StatCard label={textByMode(mode, "Review queue", "คิวทบทวน")} value={String(progress.reviewQueue.length)} icon="statusReviewDue" />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {learningPaths.slice(0, 6).map((path) => (
          <div key={path.id} className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-editorial">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Soft3DIcon name={learningPathIconMap[path.name]} size="sm" decorative shadow={false} active />
                <h2 className="truncate font-semibold text-[var(--text-primary)]">{path.name}</h2>
              </div>
              <span className="shrink-0 text-sm text-[var(--text-muted)]">{progressForPath(path, progress)}%</span>
            </div>
            <div className="mt-4">
              <ProgressBar value={progressForPath(path, progress)} tone={progressToneForPath(path.id)} />
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function PracticeLaunchCard({ path, progress, settings, onStartQuiz }: { path: LearningPath; progress: number; settings: UserSettings; onStartQuiz: (pathId: string) => void }) {
  const mode = settings.languageMode;
  const questionCount = questions.filter((question) => question.learningPath === path.name).length;

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/72 p-4 text-[var(--text-primary)] shadow-[0_16px_42px_rgba(23,23,23,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/86 sm:p-5">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,#effcff_0%,rgba(239,252,255,0)_72%)] opacity-90 blur-2xl" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">Practice Set · {path.currentLevel}</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)]">{path.name}</h2>
        </div>
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[var(--border)] bg-white/84 shadow-[0_10px_24px_rgba(23,23,23,0.075)]">
          <Soft3DIcon name={learningPathIconMap[path.name]} size="md" decorative shadow={false} active />
        </span>
      </div>
      <p className="font-subtitle mt-4 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">{textByMode(mode, path.currentGoal, path.currentGoalTh)}</p>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-2xl border border-[var(--border)] bg-white/64 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <p className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Questions</p>
          <p className="mt-1 font-display text-xl font-extrabold text-[var(--text-primary)]">{questionCount || 5}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-white/64 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <p className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Review</p>
          <p className="mt-1 font-display text-xl font-extrabold text-[var(--text-primary)]">{path.questionsDueForReview}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-white/64 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <p className="font-subtitle text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Level</p>
          <p className="mt-1 truncate font-display text-sm font-extrabold text-[var(--text-primary)]">{path.currentLevel}</p>
        </div>
      </div>
      <div className="mt-5">
        <ProgressBar value={progress} tone={progressToneForPath(path.id)} />
        <div className="mt-2 flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
          <span>Readiness</span>
          <span>{progress}%</span>
        </div>
      </div>
      <a href={`/quiz?start=1&path=${path.id}`} onClick={() => onStartQuiz(path.id)} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(23,23,23,0.16)] transition group-hover:scale-[1.01] hover:bg-[#303030] focus:outline-none focus:ring-2 focus:ring-black/60">
        Start Practice
        <Soft3DIcon name="actionNext" size="sm" decorative shadow={false} />
      </a>
    </article>
  );
}

function SettingsView({ settings, onUpdateSettings }: { settings: UserSettings; onUpdateSettings: (settings: UserSettings) => void }) {
  const englishLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
  const bands = ["5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0+"] as const;

  return (
    <PageShell
      eyebrow="Settings"
      title="Language and learning goal settings"
      summary="These preferences are stored locally for this MVP. B1 is a self-estimated level, not an official test result."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5">
          <h2 className="text-xl font-semibold text-white">Language display mode</h2>
          <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">เลือกวิธีแสดงภาษาในแอป ค่าเริ่มต้นคือ TH + EN เพื่อให้เรียนคำศัพท์วิชาชีพเป็นภาษาอังกฤษพร้อมคำอธิบายไทย</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(["TH", "EN", "TH_EN"] as LanguageMode[]).map((mode) => (
              <a
                href={`/settings?languageMode=${mode}`}
                key={mode}
                onPointerDown={() => onUpdateSettings({ ...settings, languageMode: mode })}
                onClick={() => onUpdateSettings({ ...settings, languageMode: mode })}
                className={`block min-h-16 rounded-2xl border px-4 py-3 text-left transition ${
                  settings.languageMode === mode ? "border-blue-300/70 bg-blue-400/15 text-white" : "border-white/10 bg-black/20 text-[var(--text-secondary)] hover:bg-white/[0.06]"
                }`}
              >
                <span className="block font-display text-lg font-semibold">{languageLabels[mode]}</span>
                <span className="text-xs">{mode === "TH" ? "Thai first" : mode === "EN" ? "English only" : "English + Thai support"}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-semibold text-white">English learning preference</h2>
          <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">ใช้เพื่อปรับความยากของคำศัพท์ ความยาว passage และรายละเอียดคำใบ้ในอนาคต</p>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
              Current self-estimated level
              <select className="min-h-12 rounded-2xl border border-white/10 bg-[#121722] px-4 text-white" value={settings.currentEnglishLevel} onChange={(event) => onUpdateSettings({ ...settings, currentEnglishLevel: event.target.value as UserSettings["currentEnglishLevel"] })}>
                {englishLevels.map((level) => <option key={level}>{level}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
              Target English level
              <select className="min-h-12 rounded-2xl border border-white/10 bg-[#121722] px-4 text-white" value={settings.targetEnglishLevel} onChange={(event) => onUpdateSettings({ ...settings, targetEnglishLevel: event.target.value as UserSettings["targetEnglishLevel"] })}>
                {englishLevels.map((level) => <option key={level}>{level}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
              IELTS target band
              <select className="min-h-12 rounded-2xl border border-white/10 bg-[#121722] px-4 text-white" value={settings.ieltsTargetBand} onChange={(event) => onUpdateSettings({ ...settings, ieltsTargetBand: event.target.value as UserSettings["ieltsTargetBand"] })}>
                {bands.map((band) => <option key={band}>{band}</option>)}
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {(["learn", "exam"] as const).map((ieltsMode) => (
                <a
                  href={`/settings?ieltsMode=${ieltsMode}`}
                  key={ieltsMode}
                  onPointerDown={() => onUpdateSettings({ ...settings, ieltsMode })}
                  onClick={() => onUpdateSettings({ ...settings, ieltsMode })}
                  className={`block min-h-14 rounded-2xl border px-4 py-4 text-left text-sm transition ${
                    settings.ieltsMode === ieltsMode ? "border-violet-300/70 bg-violet-400/15 text-white" : "border-white/10 bg-black/20 text-[var(--text-secondary)]"
                  }`}
                >
                  {ieltsMode === "learn" ? "IELTS Learn Mode" : "IELTS Exam Practice"}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function VocabularyCard({ vocabulary, onSave, saved = false }: { vocabulary: VocabularyItem; onSave?: (vocabulary: VocabularyItem) => void; saved?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_10px_28px_rgba(23,23,23,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-extrabold text-[var(--text-primary)]">{vocabulary.word}</p>
          <p className="font-subtitle mt-1 text-sm leading-7 text-[var(--text-secondary)]">{vocabulary.thaiMeaning}</p>
        </div>
        {onSave ? (
          <button type="button" onClick={() => onSave(vocabulary)} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-white">
            {saved ? "Saved" : "Save"}
          </button>
        ) : null}
      </div>
      <p className="font-subtitle mt-2 text-xs text-[var(--text-muted)]">{vocabulary.partOfSpeech} • {vocabulary.skill}</p>
      <p className="font-subtitle mt-3 text-sm leading-6 text-[var(--text-secondary)]">{vocabulary.simpleDefinition}</p>
      <p className="mt-3 text-sm font-medium leading-6 text-[var(--text-primary)]">{vocabulary.exampleSentence}</p>
      <p className="font-subtitle mt-1 text-sm leading-7 text-[var(--text-secondary)]">{vocabulary.exampleTranslationTh}</p>
    </div>
  );
}

function VisualMediaPreview({ media }: { media: NonNullable<LearningLesson["visualMedia"]>[number] }) {
  if (media.src) {
    return (
      <figure className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-[0_18px_48px_rgba(23,23,23,0.08)]">
        <div className="relative aspect-[1200/760] w-full bg-[var(--surface)]">
          <Image
            src={media.src}
            alt={media.altTh ?? media.altEn ?? media.titleEn}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 760px, (min-width: 768px) 82vw, 100vw"
          />
        </div>
        {media.items?.length ? (
          <figcaption className="grid gap-2 border-t border-[var(--border)] bg-white p-4 sm:flex sm:flex-wrap">
            {media.items.map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-bold text-[var(--text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-primary)]" />
                {item}
              </span>
            ))}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        {media.items?.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-bold text-[var(--text-primary)]">{item}</span>
            {index < (media.items?.length ?? 0) - 1 ? <span className="text-[var(--text-muted)]">→</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

const gridCheatSheet = {
  Desktop: [
    { columns: 12, type: "Stretch", margin: 100, gutter: 20 },
    { columns: 12, type: "Stretch", margin: 32, gutter: 32 },
    { columns: 12, type: "Center", margin: 88, gutter: 16 },
  ],
  Tablet: [
    { columns: 8, type: "Stretch", margin: 88, gutter: 24 },
    { columns: 8, type: "Stretch", margin: 64, gutter: 16 },
    { columns: 8, type: "Stretch", margin: 32, gutter: 20 },
  ],
  Mobile: [
    { columns: 4, type: "Stretch", margin: 24, gutter: 16 },
    { columns: 4, type: "Stretch", margin: 24, gutter: 20 },
    { columns: 4, type: "Stretch", margin: 16, gutter: 16 },
  ],
};

function FigmaGridCheatSheet() {
  const [device, setDevice] = useState<keyof typeof gridCheatSheet>("Desktop");
  const presets = gridCheatSheet[device];
  const previewColumns = presets[0].columns;

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-4 shadow-[0_12px_34px_rgba(23,23,23,0.06)]">
      <div className="flex flex-wrap gap-2">
        {(["Desktop", "Tablet", "Mobile"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setDevice(item)}
            className={`min-h-10 rounded-full border px-4 text-sm font-extrabold transition ${
              device === item ? "border-[#171717] bg-[#171717] text-white" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
        ค่าเหล่านี้เป็น starting points สำหรับลองตั้งค่าใน Figma เท่านั้น ไม่ใช่กฎสากลที่ต้องใช้กับทุกโปรเจกต์ ให้ปรับตามเนื้อหา ขนาดจอ และข้อจำกัดจริงของงานเสมอ
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-3">
          {presets.map((preset, index) => (
            <div key={`${device}-${index}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="font-display text-sm font-extrabold text-[var(--text-primary)]">{device} preset {index + 1}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)] sm:grid-cols-4">
                <span><strong className="block text-[var(--text-primary)]">{preset.columns}</strong> Columns</span>
                <span><strong className="block text-[var(--text-primary)]">{preset.type}</strong> Type</span>
                <span><strong className="block text-[var(--text-primary)]">{preset.margin}px</strong> Margin</span>
                <span><strong className="block text-[var(--text-primary)]">{preset.gutter}px</strong> Gutter</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">Visual Preview</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="grid h-44 gap-1" style={{ gridTemplateColumns: `repeat(${previewColumns}, minmax(0, 1fr))` }}>
              {Array.from({ length: previewColumns }).map((_, index) => (
                <div key={index} className="rounded-md bg-[linear-gradient(180deg,#e9f7ff,#d8dde8)]" />
              ))}
            </div>
          </div>
          <p className="font-subtitle mt-3 text-xs leading-6 text-[var(--text-secondary)]">Preview นี้แสดงจำนวน column โดยประมาณ เพื่อช่วยให้เห็น rhythm ของ grid ก่อนนำไปปรับใน Figma</p>
        </div>
      </div>
    </div>
  );
}

function LessonBlock({ id, title, step, children }: { id?: string; title: string; step?: number; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 mt-8 border-t border-[var(--border)] pt-6">
      <div className="flex items-center gap-3">
        {step ? <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-xs font-extrabold text-[var(--text-primary)]">{step}</span> : null}
        <h2 className="font-display text-lg font-semibold tracking-normal text-[var(--text-primary)]">{title}</h2>
      </div>
      <div className="mt-3 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">{children}</div>
    </section>
  );
}

function Badge({ children, icon }: { children: React.ReactNode; icon?: Soft3DIconName }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 text-xs font-semibold text-[var(--text-secondary)]">
      {icon ? <Soft3DIcon name={icon} size="xs" decorative shadow={false} /> : null}
      {children}
    </span>
  );
}

function VerificationBadges({ verification }: { verification: NonNullable<LearningLesson["contentVerification"]> }) {
  const labels = ["Educational Content"];
  if (verification.disclaimer?.en.includes("financial advice")) labels.push("Not Financial Advice");
  if (verification.disclaimer?.en.includes("tax calculation")) labels.push("Not an Official Tax Calculation");
  if (verification.taxYear) labels.push(`Updated for Tax Year ${verification.taxYear}`);
  if (verification.verificationStatus === "needs-review") labels.push("Needs Verification");
  if (verification.verificationStatus === "archived") labels.push("Archived Content");
  if (verification.officialSourceNames?.some((name) => name.includes("SEC") || name.includes("SET"))) labels.push("Practice Data Only");

  return (
    <>
      {labels.map((label) => (
        <Badge key={label} icon={verification.verificationStatus === "archived" ? "statusLocked" : "statusGoal"}>{label}</Badge>
      ))}
    </>
  );
}

function VerificationNotice({ verification }: { verification: NonNullable<LearningLesson["contentVerification"]> }) {
  return (
    <div className="mt-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-start gap-3">
        <Soft3DIcon name={verification.verificationStatus === "archived" ? "statusLocked" : "statusGoal"} size="sm" decorative shadow={false} active />
        <div>
          <p className="font-display text-sm font-extrabold text-[var(--text-primary)]">
            {verification.verificationStatus === "archived" ? "Archived learning content" : "Educational verification note"}
          </p>
          <p className="font-subtitle mt-1 text-sm leading-7 text-[var(--text-secondary)]">{verification.disclaimer?.th}</p>
          {verification.officialSourceNames?.length ? (
            <p className="font-subtitle mt-2 text-xs font-semibold text-[var(--text-muted)]">
              Official sources to check: {verification.officialSourceNames.join(", ")}
              {verification.lastVerifiedAt ? ` · Last verified ${verification.lastVerifiedAt}` : ""}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const progressToneClasses: Record<ProgressTone, string> = {
  blue: "bg-[linear-gradient(90deg,#8cc8de_0%,#5f98b6_100%)]",
  violet: "bg-[linear-gradient(90deg,#b9a8d9_0%,#8b78b8_100%)]",
  mint: "bg-[linear-gradient(90deg,#9fd9c9_0%,#64ad9e_100%)]",
  champagne: "bg-[linear-gradient(90deg,#d9c8a5_0%,#aa9872_100%)]",
  graphite: "bg-[linear-gradient(90deg,#bfc5c8_0%,#7f898f_100%)]",
};

function ProgressBar({ value, variant = "solid", tone = "blue" }: { value: number; variant?: "solid" | "rainbow"; tone?: ProgressTone }) {
  const barClassName = variant === "rainbow" ? "gradient-iridescent" : progressToneClasses[tone];

  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-black/10">
      <div
        className={`h-full rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] transition-all duration-300 ${barClassName}`}
        style={{ width: `${Math.max(4, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
      <p className="font-subtitle text-xs text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 font-display text-2xl font-extrabold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

function ProgressSummaryRow({ icon, label, value }: { icon: Soft3DIconName; label: string; value: string }) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
      <span className="flex min-w-0 items-center gap-3 text-sm font-medium text-[var(--text-secondary)]">
        <Soft3DIcon name={icon} size="sm" decorative shadow={false} active />
        <span className="truncate">{label}</span>
      </span>
      <span className="shrink-0 font-display text-sm font-extrabold text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

function EmptyState({ title, description, action, href }: { title: string; description: string; action: string; href: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white p-8 text-center shadow-editorial">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/70 bg-[linear-gradient(135deg,#ffffff_0%,#d9dee4_52%,#9aa4ae_100%)] shadow-[0_10px_24px_rgba(23,23,23,0.12)]">
        <Soft3DIcon name="statusMastered" size="md" decorative shadow={false} active />
      </div>
      <h2 className="mt-5 text-xl font-bold text-[var(--text-primary)]">{title}</h2>
      <p className="font-subtitle mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
      <Link href={href} className="button-primary mx-auto mt-5 w-fit">
        {action}
      </Link>
    </div>
  );
}
