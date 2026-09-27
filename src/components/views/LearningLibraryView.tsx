"use client";

import Link from "next/link";
import { lessonsForPath } from "@/data/lessons";
import type { ProgressState, UserSettings } from "@/types/skillquest";
import { PageShell } from "../AppShell";
import { Badge, LibraryModePill, ProgressBar } from "../ui/primitives";
import { t } from "@/lib/ui-copy";
import { categoryAccent, categoryForPath, levelForPathProgress, progressToneForPath } from "@/lib/skillquest-logic";
import { coursesByTrack, metaForPath, planLabel, stageLabels } from "@/lib/curriculum";

export function LearningLibraryView({ progress, settings }: { progress: ProgressState; settings: UserSettings }) {
  const mode = settings.languageMode;
  return (
    <PageShell
      eyebrow="Learn Mode"
      title="Read it first, then test yourself"
      summary="Concepts, examples, vocabulary and your own notes — all in one place, at your own pace."
    >
      <div className="mb-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-3)] p-4 shadow-editorial sm:mb-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{t(mode, "courseLibrary")}</p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold leading-[1.18] tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Pick one course. Continue from the next useful lesson.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-2 text-center">
            <LibraryModePill label="Read" caption="Concept" />
            <LibraryModePill label="Try" caption="Example" />
            <LibraryModePill label="Apply" caption="Practice" />
          </div>
        </div>
      </div>

      {coursesByTrack().map((track) => (
        <section key={track.id} className="mt-7 first:mt-0">
          {/* Courses are grouped by the kind of work they are for and ordered
              within each group by what is worth doing first. The library used
              to be 23 cards in data-file order, which answered neither. */}
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">{mode === "EN" ? track.en : track.th}</h2>
            <p className="text-sm text-[var(--text-muted)]">{mode === "EN" ? track.blurbEn : track.blurbTh}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {track.paths.map((path) => {
          const pathLessons = lessonsForPath(path.id);
          const completed = pathLessons.filter((lesson) => progress.lessons?.[lesson.id]?.completed).length;
          const inProgress = pathLessons.find((lesson) => {
            const state = progress.lessons?.[lesson.id];
            return state && !state.completed && state.readingProgress > 0;
          });
          const currentLesson = inProgress ?? pathLessons[completed] ?? pathLessons[0];
          const percent = Math.round((completed / Math.max(pathLessons.length, 1)) * 100);
          const level = levelForPathProgress(path, progress);
          const category = categoryForPath(path.id);
          const safetyLabel = path.id === "stock-investing" ? "Not Financial Advice" : path.id === "thai-tax-personal-finance" ? "Not an Official Tax Calculation" : null;

          return (
            <article key={path.id} className="group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-3)] p-4 shadow-[var(--elev-2)] transition duration-200 hover:border-[var(--border-strong)] hover:shadow-[var(--elev-3)] sm:p-5">
              {/* The rule is keyed to category, not to the path's own stored
                  gradient: all 23 of those were variations on the same
                  indigo-violet, so the colour carried no information. Now the
                  edge tells you which kind of track you are looking at. */}
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: categoryAccent(category) }} />
              <div
                className="absolute right-[-3.5rem] top-[-3.5rem] h-28 w-28 rounded-full opacity-[0.14] blur-xl transition duration-200 group-hover:opacity-25"
                style={{ background: categoryAccent(category) }}
              />
              <div className="relative grid min-h-[13.25rem] content-between gap-4">
                {/* No icon tile here — the course name is the identifier, and
                    the tile was decoration competing with it. The category
                    rule along the card's top edge already carries the colour. */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{category === "Career Track" ? t(mode, "catCareerTrack") : category === "Life Skills" ? t(mode, "catLifeSkills") : t(mode, "catCoreSkill")}</Badge>
                    {safetyLabel ? <Badge icon="statusGoal">{safetyLabel}</Badge> : null}
                  </div>
                  <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-[1.16] tracking-normal text-[var(--text-primary)]">{path.name}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)]">{level}</span>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                      {mode === "EN" ? stageLabels[metaForPath(path.id).stage].en : stageLabels[metaForPath(path.id).stage].th}
                    </span>
                  </div>
                  {/* How much of a commitment this is, before you open it. */}
                  <p className="mt-2 text-xs text-[var(--text-muted)]">{planLabel(path.id, mode)}</p>
                </div>

                <div>
                  <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-3">
                    <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{t(mode, "next")}</p>
                    <p className="font-subtitle mt-1 line-clamp-1 text-sm font-semibold leading-6 text-[var(--text-secondary)]">{currentLesson?.titleEn ?? currentLesson?.title ?? "Overview"}</p>
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={percent} tone={progressToneForPath(path.id)} />
                  </div>
                  <div className="mt-2 flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                    <span>{completed}/{pathLessons.length} {t(mode, "lessonsDoneShort")}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/learn/${path.id}/${currentLesson?.slug ?? ""}`} className="button-primary flex-1">
                      {t(mode, "continueLesson")}
                    </Link>
                    <Link href={`/learn/${path.id}`} className="button-ghost flex-1">
                      {t(mode, "courseMap")}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
