"use client";

import Link from "next/link";
import { findPathBySlug, lessonsForPath, moduleMinutes, modulesForPath } from "@/data/lessons";
import { planLabel } from "@/lib/curriculum";
import type { LearningLesson, ProgressState, UserSettings } from "@/types/skillquest";
import { PageShell } from "../AppShell";
import { Badge, EmptyState, ProgressBar } from "../ui/primitives";
import { t } from "@/lib/ui-copy";
import { levelForPathProgress, progressToneForPath, questionsForPractice } from "@/lib/skillquest-logic";

export function LearningPathDetailView({ progress, settings, learningPathSlug }: { progress: ProgressState; settings: UserSettings; learningPathSlug?: string }) {
  const mode = settings.languageMode;
  const path = learningPathSlug ? findPathBySlug(learningPathSlug) : undefined;

  if (!path) {
    return <EmptyState title="We could not find that course" description="Pick one from the library and carry on." action="Browse courses" href="/learn" />;
  }

  const pathLessons = lessonsForPath(path.id);
  const completed = pathLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
  const modules = modulesForPath(path.id);
  // A module layer only earns its heading when it actually groups lessons.
  // Where every module holds one lesson, the course is really a flat list.
  const isFlatCourse = modules.length > 1 && modules.every((module) => module.lessonIds.length <= 1);
  const inProgress = pathLessons.find((lesson) => {
    const state = progress.lessons?.[lesson.id];
    return state && !state.completed && state.readingProgress > 0;
  });
  const nextLesson = inProgress ?? pathLessons[completed] ?? pathLessons[0];
  const pathPracticeCount = questionsForPractice(path.id).length;
  const pathPercent = Math.round((completed / Math.max(pathLessons.length, 1)) * 100);
  const pathLevel = levelForPathProgress(path, progress);

  return (
    <PageShell
      eyebrow="Learning Path"
      title={path.name}
      summary={path.description}
    >
      <div className="mb-5 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex min-w-0 gap-4">
            <div className="min-w-0">
              <p className="font-subtitle text-sm font-semibold text-[var(--text-secondary)]">{completed}/{pathLessons.length} {t(mode, "lessons")}</p>
              {/* The whole commitment, stated up front. */}
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">{planLabel(path.id, mode)}</p>
              <h2 className="mt-2 text-balance font-display text-2xl font-semibold leading-tight text-[var(--text-primary)]">
                {nextLesson ? `Continue: ${nextLesson.titleEn ?? nextLesson.title}` : `${pathLevel} reading track`}
              </h2>
              <p className="font-subtitle mt-2 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                Read the lesson first, then practice only when a real question set is available.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            {nextLesson ? (
              <Link href={`/learn/${path.id}/${nextLesson.slug}`} className="button-primary justify-center">
                {t(mode, "continueLesson")}
              </Link>
            ) : null}
            {pathPracticeCount > 0 ? (
              <Link href={`/quiz?start=1&path=${path.id}`} className="button-ghost justify-center">
                {t(mode, "startPractice")}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={pathPercent} tone={progressToneForPath(path.id)} />
          <div className="mt-2 flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
            <span>{t(mode, "courseProgress")}</span>
            <span>{pathPercent}%</span>
          </div>
        </div>
      </div>

      {modules.length ? (
        <div className={isFlatCourse ? "grid gap-3" : "grid gap-5"}>
          {modules.map((module) => {
            const moduleLessons = module.lessonIds.map((lessonId) => pathLessons.find((lesson) => lesson.id === lessonId)).filter((lesson): lesson is LearningLesson => Boolean(lesson));
            const moduleCompleted = moduleLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
            return (
              <section
                key={module.id}
                className={
                  isFlatCourse
                    ? "contents"
                    : "rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial sm:p-6"
                }
              >
                {/* On 11 of the 23 courses every module wraps exactly one
                    lesson, and its title and generated Thai blurb simply
                    restate that lesson — so the heading printed the same words
                    three times and showed a "0/1 completed" counter. Where the
                    module layer carries no grouping, it is not rendered. */}
                {isFlatCourse ? null : (
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {mode === "EN" ? `Day ${module.number}` : `วันที่ ${module.number}`}
                      {" "}<span className="ml-2 normal-case tracking-normal text-[var(--text-muted)]">
                        ≈{moduleMinutes(path.id, module.lessonIds)} {mode === "EN" ? "min" : "นาที"}
                      </span>
                    </p>
                    <h2 className="mt-2 text-balance font-display text-2xl font-semibold leading-tight tracking-normal text-[var(--text-primary)] sm:text-3xl">{mode === "EN" ? module.titleEn : module.titleTh}</h2>
                    <p className="font-subtitle mt-2 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">{module.descriptionTh}</p>
                  </div>
                  <Badge icon="statusCompleted">{moduleCompleted}/{moduleLessons.length} {t(mode, "completed")}</Badge>
                </div>
                )}
                <div className={isFlatCourse ? "contents" : "mt-5 grid gap-3"}>
                  {moduleLessons.map((lesson) => {
                    const state = progress.lessons?.[lesson.id];
                    const lessonPracticeCount = questionsForPractice(path.id, lesson).length;
                    const status = state?.completed ? "Done" : state?.reviewFlag ? "Review" : state?.readingProgress ? "Continue" : "Start";
                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${path.id}/${lesson.slug}`}
                        className="group grid gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:bg-[var(--surface-2)] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-sm font-bold text-[var(--text-primary)] shadow-[var(--rim)]">{lesson.number}</span>
                        <span className="min-w-0">
                          <span className="block truncate font-display text-lg font-semibold tracking-normal text-[var(--text-primary)]">{lesson.titleEn ?? lesson.title}</span>
                          <span className="font-subtitle mt-1 block line-clamp-1 text-sm leading-6 text-[var(--text-secondary)]">{lesson.summaryTh ?? lesson.titleTh}</span>
                        </span>
                        <span className="flex flex-wrap items-center gap-2 sm:justify-end">
                          <span className="rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] shadow-[var(--rim)]">{lesson.estimatedMinutes ?? lesson.readingMinutes} {t(mode, "minRead")}</span>
                          {lessonPracticeCount > 0 ? <span className="rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] shadow-[var(--rim)]">{lessonPracticeCount} Q</span> : null}
                          <span className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-[var(--text-on-accent)]">{status}</span>
                        </span>
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
            const lessonPracticeCount = questionsForPractice(path.id, lesson).length;
            const status = state?.completed ? "Done" : state?.reviewFlag ? "Review" : state?.readingProgress ? "Continue" : "Start";
            return (
              <article key={lesson.id} className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>Chapter {lesson.number}</Badge>
                      <Badge>{lesson.difficulty}</Badge>
                      <Badge>{lesson.readingMinutes} {t(mode, "minRead")}</Badge>
                      <Badge>{status}</Badge>
                      {lessonPracticeCount > 0 ? <Badge icon="navigationPractice">{lessonPracticeCount} questions</Badge> : null}
                    </div>
                    <h2 className="mt-4 text-balance font-display text-2xl font-bold text-[var(--text-primary)]">{lesson.title}</h2>
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
