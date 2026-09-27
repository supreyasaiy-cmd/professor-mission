"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { learningPaths } from "@/data/learning-paths";
import { lessonsForPath } from "@/data/lessons";
import { defaultMotivationalQuote, getRandomQuote, type MotivationalQuote } from "@/data/motivational-quotes";
import { defaultProgress, defaultSettings, loadProgress, loadSession, loadSettings, saveProgress, saveLessonNote, saveSettings, saveSession, saveVocabularyItem, upsertLessonProgress, upsertReviewItem } from "@/lib/storage";
import type { AnswerRecord, LessonProgress, ProgressState, Question, QuizSessionState, UserSettings, VocabularyItem } from "@/types/skillquest";
import { HomeView } from "./views/HomeView";
import { LearningLibraryView } from "./views/LearningLibraryView";
import { LearningPathDetailView } from "./views/LearningPathDetailView";
import { LessonReadingView } from "./views/LessonReadingView";
import { ProgressView } from "./views/ProgressView";
import { QuizView } from "./views/QuizView";
import { ReviewView } from "./views/ReviewView";
import { SettingsView } from "./views/SettingsView";
import { createSession, createSessionFromStart, getTodayAnswered, learningStreak, type InitialQuizStart, type View } from "@/lib/skillquest-logic";

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
  const currentStreak = learningStreak(progress);

  const startQuiz = useCallback((pathId = activePath.id, lessonId?: string) => {
    const lesson = lessonId ? lessonsForPath(pathId).find((item) => item.id === lessonId) : undefined;
    const newSession = createSession(pathId, lesson, progress);
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
    const sessionWillComplete = session.currentIndex + 1 >= session.questionIds.length;
    const lessonQuizAccuracy = Math.round((updatedSession.answers.filter((item) => item.isCorrect).length / Math.max(updatedSession.answers.length, 1)) * 100);
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
      lessons: session.lessonId
        ? upsertLessonProgress(current.lessons ?? {}, session.lessonId, {
            completed: sessionWillComplete ? lessonQuizAccuracy >= 60 : (current.lessons?.[session.lessonId]?.completed ?? false),
            lastOpenedAt: answer.answeredAt,
            readingProgress: sessionWillComplete ? 100 : Math.max(current.lessons?.[session.lessonId]?.readingProgress ?? 0, 85),
            reviewFlag: sessionWillComplete ? lessonQuizAccuracy < 60 : (current.lessons?.[session.lessonId]?.reviewFlag ?? false),
          })
        : current.lessons,
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

  // dailyGoal lives on progress rather than settings, so it needs its own
  // updater to be editable from the Settings screen.
  function updateDailyGoal(dailyGoal: number) {
    setProgress((current) => {
      const next = { ...current, dailyGoal };
      saveProgress(next);
      return next;
    });
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
    return <LearningPathDetailView progress={progress} settings={settings} learningPathSlug={learningPathSlug} />;
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
    return <SettingsView settings={settings} progress={progress} onUpdateSettings={updateSettings} onUpdateDailyGoal={updateDailyGoal} />;
  }

  return (
    <HomeView
      progress={progress}
      settings={settings}
      activePath={activePath}
      todayAnswered={todayAnswered}
      dueReview={dueReview}
      currentStreak={currentStreak}
      hasSession={Boolean(session && !session.completed)}
      heroQuote={heroQuote}
      onStartQuiz={startQuiz}
    />
  );
}
