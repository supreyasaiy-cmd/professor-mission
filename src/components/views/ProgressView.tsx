"use client";

import { useMemo } from "react";
import { learningPaths } from "@/data/learning-paths";
import type { ProgressState, UserSettings } from "@/types/skillquest";
import { PageShell, StatCard } from "../AppShell";
import { learningPathIconMap } from "../icons/icon-registry";
import { Soft3DIcon } from "../icons/soft-3d-icon";
import { ProgressBar } from "../ui/primitives";
import { learningStreak, progressForPath, progressToneForPath, textByMode } from "@/lib/skillquest-logic";

export function ProgressView({ progress, settings }: { progress: ProgressState; settings: UserSettings }) {
  const mode = settings.languageMode;
  const currentStreak = learningStreak(progress);
  const accuracy = useMemo(() => {
    const correct = progress.answers.filter((answer) => answer.isCorrect).length;
    if (!progress.answers.length) return 0;
    return Math.round((correct / progress.answers.length) * 100);
  }, [progress.answers]);

  return (
    <PageShell
      eyebrow="Progress"
      title="How far you've come"
      summary="Everything is saved on this device, so it will be here waiting next time you open the app."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={textByMode(mode, "Total XP", "XP ทั้งหมด")} value={String(progress.totalXP)} icon="statusXp" />
        <StatCard label={textByMode(mode, "Current streak", "เรียนต่อเนื่อง")} value={`${currentStreak} วัน`} icon="statusStreak" />
        <StatCard label={textByMode(mode, "Accuracy", "ความแม่นยำ")} value={`${accuracy}%`} icon="statusAccuracy" />
        <StatCard label={textByMode(mode, "Review queue", "คิวทบทวน")} value={String(progress.reviewQueue.length)} icon="statusReviewDue" />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {learningPaths.map((path) => (
          <div key={path.id} className="rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Soft3DIcon name={learningPathIconMap[path.name]} size="sm" decorative active />
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
