"use client";

import Link from "next/link";
import { lessonsForPath } from "@/data/lessons";
import { type MotivationalQuote } from "@/data/motivational-quotes";
import type { LearningPath, ProgressState, UserSettings } from "@/types/skillquest";
import { learningPathIconMap } from "../icons/icon-registry";
import { Soft3DIcon } from "../icons/soft-3d-icon";
import { Badge, ProgressBar, ProgressSummaryRow } from "../ui/primitives";
import { languageLabels, levelForPathProgress, progressForPath, progressToneForPath, showThai, textByMode } from "@/lib/skillquest-logic";

export function HomeView({
  progress,
  settings,
  activePath,
  todayAnswered,
  dueReview,
  currentStreak,
  hasSession,
  heroQuote,
  onStartQuiz,
}: {
  progress: ProgressState;
  settings: UserSettings;
  activePath: LearningPath;
  todayAnswered: number;
  dueReview: number;
  currentStreak: number;
  hasSession: boolean;
  heroQuote: MotivationalQuote;
  onStartQuiz: (pathId?: string) => void;
}) {
  const mode = settings.languageMode;
  const activeLevel = levelForPathProgress(activePath, progress);
  const activePathProgress = progressForPath(activePath, progress);

  // The single next step for the active path: whatever is part-read, else the
  // first lesson after the completed ones.
  const activeLessons = lessonsForPath(activePath.id);
  const completedCount = activeLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
  const inProgressLesson = activeLessons.find((lesson) => {
    const state = progress.lessons?.[lesson.id];
    return state && !state.completed && state.readingProgress > 0;
  });
  const continueLesson = inProgressLesson ?? activeLessons[completedCount] ?? activeLessons[0];
  const continueHref = continueLesson ? `/learn/${activePath.id}/${continueLesson.slug}` : `/learn/${activePath.id}`;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      {/* Hero: the quote is the thesis, so the footage sits under a dark scrim
          rather than fighting it. Heights cut by roughly a third — the old
          min-heights pushed the dashboard entirely below the fold on phones. */}
      <div className="relative mb-6 min-h-[13rem] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] px-5 py-9 text-center sm:min-h-[16rem] sm:px-8 sm:py-12 lg:min-h-[19rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45 saturate-[0.85]"
          src="/media/home-hero-motion.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(7,9,14,0.62)_0%,rgba(7,9,14,0.82)_55%,rgba(7,9,14,0.95)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
        <div className="relative mx-auto grid max-w-4xl content-center gap-4">
          <p className="eyebrow">Class Room</p>
          <h1 className="mx-auto max-w-3xl text-balance font-display text-[1.75rem] font-semibold leading-[1.28] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {heroQuote.english}
          </h1>
          <p className="font-subtitle mx-auto max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {heroQuote.thai}
          </p>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial sm:p-8 lg:p-10">
          {/* One light source, kept in the top-right corner and well clear of
              the heading. The old version put a hard-edged iridescent disc
              directly behind "Learning Dashboard". */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(127,227,196,0.22)_0%,rgba(127,227,196,0)_70%)] blur-2xl" />
          <div className="relative grid content-between gap-7 sm:min-h-[19rem] sm:gap-8 lg:max-w-[82%]">
            <div className="flex flex-wrap items-center gap-2">
              <Badge icon="statusInProgress">Dashboard</Badge>
              <Badge>{activeLevel}</Badge>
              <Badge icon="actionTranslation">{languageLabels[mode]}</Badge>
            </div>
            <div>
              <p className="eyebrow">Today&apos;s focus</p>
              <h2 className="mt-2.5 text-balance font-display text-3xl font-bold leading-[1.1] text-[var(--text-primary)] sm:text-[2.75rem]">
                Learning
                <span className="block">Dashboard</span>
              </h2>
              <p className="font-subtitle mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Keep the Home screen clear: see your current level, daily goal, review queue, and the next practice action without browsing lessons here.
              </p>
              {showThai(mode) ? (
                <p className="font-subtitle mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
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
                  <Soft3DIcon name="navigationPractice" size="sm" decorative />
                  {hasSession ? "Resume Mission" : "Start Mission"}
                </a>
                <Link href="/review" className="button-ghost">
                  <Soft3DIcon name="navigationReview" size="sm" decorative />
                  Review Mistakes
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {textByMode(mode, "My progress", "ความก้าวหน้าของฉัน")}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                {textByMode(mode, "Learning momentum", "ภาพรวมการเรียน")}
              </h2>
            </div>
          </div>
          {/* Daily goal, due review and skill level are already stated in the
              dashboard card to the left — repeating them here made the pair
              read as two versions of the same panel. What is left is the
              longitudinal view that the dashboard does not cover. */}
          <div className="mt-6 grid gap-3">
            <ProgressSummaryRow icon="statusXp" label={textByMode(mode, "Current XP", "XP ปัจจุบัน")} value={String(progress.totalXP)} />
            <ProgressSummaryRow icon="statusStreak" label={textByMode(mode, "Learning streak", "เรียนต่อเนื่อง")} value={textByMode(mode, `${currentStreak} days`, `${currentStreak} วัน`)} />
          </div>
          <Link href="/progress" className="button-primary mt-6 w-full">
            <Soft3DIcon name="navigationProgress" size="sm" decorative />
            View All Progress
          </Link>
        </section>
      </div>

      {/* One next step, not a catalogue. The full list of 23 paths lives on
          Learn — rendering it here as well contradicted this screen's own
          stated job ("without browsing lessons here") and pushed the daily
          actions far above a very long scroll. */}
      <section className="mt-5 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] shadow-editorial">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
          <p className="eyebrow">{textByMode(mode, "Pick up where you left off", "เรียนต่อจากที่ค้างไว้")}</p>
          <Link
            href="/learn"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--accent)] transition hover:text-[var(--text-primary)]"
          >
            {textByMode(mode, "All courses", "คอร์สทั้งหมด")}
            <Soft3DIcon name="actionNext" size="xs" decorative />
          </Link>
        </div>

        <Link
          href={continueHref}
          aria-label={`Continue ${activePath.name}`}
          className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-5 transition hover:bg-[var(--surface-3)] focus:outline-none focus-visible:bg-[var(--surface-3)]"
        >
          <span className="grid h-12 w-12 place-items-center">
            <Soft3DIcon name={learningPathIconMap[activePath.name]} size="sm" decorative active />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate font-display text-base font-semibold text-[var(--text-primary)]">{activePath.name}</span>
              <span className="shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] font-semibold text-[var(--text-muted)]">{activeLevel}</span>
            </span>
            <span className="mt-1 block truncate text-sm text-[var(--text-secondary)]">
              {continueLesson ? (continueLesson.titleEn ?? continueLesson.title) : textByMode(mode, "Open the course", "เปิดคอร์ส")}
            </span>
            <span className="mt-3 block">
              <ProgressBar value={activePathProgress} tone={progressToneForPath(activePath.id)} />
            </span>
          </span>
          <Soft3DIcon name="actionNext" size="sm" decorative className="transition duration-200 group-hover:translate-x-0.5" />
        </Link>
      </section>
    </section>
  );
}
