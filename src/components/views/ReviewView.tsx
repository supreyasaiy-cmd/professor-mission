"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { learningPaths } from "@/data/learning-paths";
import { findPathBySlug, lessonsForPath } from "@/data/lessons";
import type { ProgressState, Question, UserSettings } from "@/types/skillquest";
import { Soft3DIcon } from "../icons/soft-3d-icon";
import { Badge, VocabularyCard } from "../ui/primitives";
import { getQuestion, pathIdForQuestion, textByMode, type ReviewFilter } from "@/lib/skillquest-logic";

export function ReviewView({
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
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>("due");
  const [reviewNowIso, setReviewNowIso] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setReviewNowIso(new Date().toISOString());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const reviewQuestions = progress.reviewQueue
    .map((item) => ({ item, question: getQuestion(item.questionId) }))
    .filter((entry): entry is { item: NonNullable<typeof entry.item>; question: Question } => Boolean(entry.question));
  const reviewLessons = learningPaths.flatMap((path) =>
    lessonsForPath(path.id)
      .filter((lesson) => progress.lessons?.[lesson.id]?.reviewFlag)
      .map((lesson) => ({ path, lesson })),
  );
  const latestAnsweredAt = reviewQuestions.reduce((latest, entry) => (entry.item.lastAnsweredAt > latest ? entry.item.lastAnsweredAt : latest), "");
  const filterOptions = [
    { id: "due", label: "ครบกำหนด" },
    { id: "recent", label: "เพิ่งตอบผิด" },
    { id: "frequent", label: "ผิดบ่อย" },
    { id: "ielts", label: "IELTS" },
    { id: "ux-writing", label: "UX Writing" },
  ] satisfies { id: ReviewFilter; label: string }[];
  const filteredReviewQuestions = reviewQuestions.filter(({ item, question }) => {
    if (activeFilter === "due") return !reviewNowIso || item.nextReviewAt <= reviewNowIso;
    if (activeFilter === "recent") return item.lastAnsweredAt === latestAnsweredAt;
    if (activeFilter === "frequent") return item.incorrectAttempts > 1;
    if (activeFilter === "ielts") return question.learningPath === "IELTS Preparation";
    return question.learningPath === "UX Writing";
  });
  const filteredReviewLessons = reviewLessons.filter(({ path }) => {
    if (activeFilter === "ielts") return path.name === "IELTS Preparation";
    if (activeFilter === "ux-writing") return path.name === "UX Writing";
    if (activeFilter === "frequent") return false;
    return true;
  });
  const hasFilteredItems = filteredReviewQuestions.length > 0 || filteredReviewLessons.length > 0;

  return (
    <section className="relative isolate mx-auto w-full max-w-[1600px] overflow-hidden bg-[var(--surface-1)] px-4 py-8 text-[var(--text-primary)] shadow-[var(--elev-1),_var(--rim)] sm:px-6 sm:py-10 lg:rounded-[var(--radius-lg)] lg:px-8 lg:py-14">
      <ReviewBackgroundArt />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--correct)]/80">Review Queue</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.02] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Turn mistakes into stronger judgment.
          </h1>
          <p className="font-subtitle mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            Incorrect answers and useful vocabulary are saved locally for later review.
          </p>
        </div>

        {reviewQuestions.length === 0 && reviewLessons.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-white/18 bg-[var(--surface-2)] p-8 text-center shadow-[var(--elev-4)] backdrop-blur-xl">
            <h2 className="mt-5 text-xl font-bold text-[var(--text-primary)]">Nothing to review yet</h2>
            <p className="font-subtitle mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              Anything you miss in practice lands here, along with the point worth another look.
            </p>
            <a href="/quiz?start=1" className="button-primary mt-5">
              Start Quiz
            </a>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
            <aside className="rounded-3xl border border-white/18 bg-white/10 p-4 shadow-[var(--elev-4)] backdrop-blur-xl">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{textByMode(mode, "Filters", "ตัวกรอง")}</p>
              <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={activeFilter === filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`rounded-full border px-3 py-2 text-left text-xs font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--correct)] focus:ring-offset-2 focus:ring-offset-[var(--surface-1)] ${
                      activeFilter === filter.id
                        ? "border-[var(--correct)]/55 bg-[var(--accent-wash)] text-[var(--correct)] shadow-[var(--elev-2)]"
                        : "border-white/16 bg-white/8 text-[var(--text-secondary)] hover:border-white/28 hover:bg-white/14 hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </aside>
            <div className="space-y-4">
              {!hasFilteredItems ? (
                <div className="rounded-[var(--radius-card)] border border-white/18 bg-[var(--surface-2)] p-6 text-center shadow-[var(--elev-4)] backdrop-blur-xl">
                  <Soft3DIcon name="statusCompleted" size="sm" decorative active className="mx-auto" />
                  <h2 className="mt-3 font-display text-lg font-semibold text-[var(--text-primary)]">Nothing here right now</h2>
                  <p className="font-subtitle mt-2 text-sm leading-6 text-[var(--text-secondary)]">Try a different filter, or start a fresh round of practice.</p>
                </div>
              ) : null}
              {filteredReviewLessons.map(({ path, lesson }) => (
                <article key={lesson.id} className="rounded-[var(--radius-card)] border border-white/18 bg-[var(--surface-2)] p-5 shadow-[var(--elev-4)] backdrop-blur-xl">
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
                    <button type="button" onClick={() => onClearReviewItem(lesson.id)} className="button-ghost">
                      Mark Reviewed
                    </button>
                  </div>
                </article>
              ))}
              {filteredReviewQuestions.map(({ item, question }) => (
                <article key={question.id} className="rounded-[var(--radius-card)] border border-white/18 bg-[var(--surface-2)] p-5 shadow-[var(--elev-4)] backdrop-blur-xl">
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
                    <button type="button" onClick={() => onClearReviewItem(question.id)} className="button-ghost">
                      Mark Reviewed
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <section className="mt-6 rounded-[var(--radius-card)] border border-white/18 bg-white/10 p-5 shadow-[var(--elev-4)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Soft3DIcon name="actionBookmark" size="sm" decorative />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{textByMode(mode, "Saved Vocabulary", "คำศัพท์ที่บันทึกไว้")}</h2>
          </div>
          {progress.savedVocabulary?.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {progress.savedVocabulary.map((vocabulary) => (
                <VocabularyCard key={vocabulary.id} vocabulary={vocabulary} saved />
              ))}
            </div>
          ) : (
            <p className="font-subtitle mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {textByMode(mode, "Save useful words from quiz feedback and they will appear here.", "กดบันทึกคำศัพท์จาก feedback แล้วคำศัพท์จะมาแสดงที่นี่")}
            </p>
          )}
        </section>
        <section className="mt-6 rounded-[var(--radius-card)] border border-white/18 bg-[var(--surface-2)] p-5 shadow-[var(--elev-4)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Soft3DIcon name="actionNote" size="sm" decorative />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Your notes</h2>
          </div>
          {progress.savedNotes?.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {progress.savedNotes.map((note) => {
                const lesson = learningPaths.flatMap((path) => lessonsForPath(path.id)).find((item) => item.id === note.lessonId);
                const path = lesson ? findPathBySlug(lesson.learningPathId) : undefined;
                return (
                  <article key={note.lessonId} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="font-subtitle text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{lesson?.title ?? "Lesson note"}</p>
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

/**
 * Review is where mistakes get reread, so the surface stays quiet: a single
 * cool wash instead of the seven opaque decorative solids that used to float
 * here at fixed offsets — they collided with the headline and the empty state
 * at most viewport widths.
 */

export function ReviewBackgroundArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(127,227,196,0.10),transparent_28rem),linear-gradient(180deg,var(--surface-1)_0%,var(--background)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/35 to-transparent" />
    </div>
  );
}
