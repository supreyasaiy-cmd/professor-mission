"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { questions } from "@/data/questions";
import type { LearningLesson, LearningPath, UserSettings, VocabularyItem } from "@/types/skillquest";
import { Soft3DIcon } from "../icons/soft-3d-icon";
import type { Soft3DIconName } from "../icons/icon-types";
import { levelForPathPercent, progressToneForPath, textByMode, type ProgressTone } from "@/lib/skillquest-logic";

export function LibraryModePill({ label, caption }: { label: string; caption: string }) {
  return (
    <span className="rounded-full bg-[var(--surface)] px-2 py-2">
      <span className="block font-display text-sm font-semibold text-[var(--text-primary)]">{label}</span>
      <span className="font-subtitle block text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{caption}</span>
    </span>
  );
}

export function StudyStep({ label, description }: { label: string; description: string }) {
  return (
    <span className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-2.5 text-center sm:px-3 sm:py-3 sm:text-left">
      <span className="block font-display text-sm font-semibold leading-5 text-[var(--text-primary)]">{label}</span>
      <span className="font-subtitle mt-0.5 block text-[11px] font-semibold leading-4 text-[var(--text-secondary)] sm:text-xs">{description}</span>
    </span>
  );
}

export function LessonFlowCard({ hasVideo, hasQuiz }: { hasVideo: boolean; hasQuiz: boolean }) {
  const steps = [
    { label: "Understand", body: "อ่านหลักการและคำศัพท์สำคัญให้รู้ว่า concept นี้ใช้แก้ปัญหาอะไร", active: true },
    { label: "Example", body: hasVideo ? "ดูวิดีโอและ visual model เพื่อเห็นภาพจากของจริง" : "ดู visual model และ workplace example เพื่อเชื่อมกับงานจริง", active: true },
    { label: "Think", body: "หยุดคิดตามว่า decision ไหนควรเปลี่ยน ถ้าใช้บทเรียนนี้กับงานของคุณ", active: true },
    { label: "Mini Task", body: "เขียนคำตอบสั้น ๆ ก่อนเช็คความเข้าใจ เพื่อไม่ให้จำแค่ศัพท์", active: true },
    { label: "Quiz", body: hasQuiz ? "ไปทำโจทย์สั้น ๆ พร้อม feedback และเก็บข้อผิดเข้าหน้า Review" : "บทนี้ยังไม่มี quiz เฉพาะ ให้ทวนด้วย mini check ก่อน", active: hasQuiz },
  ];

  return (
    <section id="learning-flow" className="scroll-mt-28 mt-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">Learning Flow</p>
          <h2 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">เรียนเป็นลำดับ ไม่ใช่อ่านผ่าน ๆ</h2>
        </div>
        <span className="font-subtitle text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Learn · Practice · Review</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step.label} className={`rounded-2xl border p-3 ${step.active ? "border-[var(--border)] bg-[var(--surface-2)]" : "border-dashed border-[var(--border)] bg-[var(--surface-2)]"}`}>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--surface)] font-display text-xs font-bold text-[var(--text-primary)]">{index + 1}</span>
              <p className="font-display text-sm font-semibold text-[var(--text-primary)]">{step.label}</p>
            </div>
            <p className="font-subtitle mt-2 text-xs leading-6 text-[var(--text-secondary)]">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VocabularyCard({ vocabulary, onSave, saved = false }: { vocabulary: VocabularyItem; onSave?: (vocabulary: VocabularyItem) => void; saved?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 shadow-[var(--elev-2)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-[var(--text-primary)]">{vocabulary.word}</p>
          <p className="font-subtitle mt-1 text-sm leading-7 text-[var(--text-secondary)]">{vocabulary.thaiMeaning}</p>
        </div>
        {onSave ? (
          <button
            type="button"
            onClick={() => onSave(vocabulary)}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-[var(--border)] ${
              saved
                ? "border-[var(--correct)]/50 bg-[var(--correct-wash)] text-[var(--correct)]"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--elev-2)] hover:bg-[var(--surface-2)]"
            }`}
            aria-label={saved ? `Saved ${vocabulary.word}` : `Save ${vocabulary.word}`}
            title={saved ? "Saved" : "Save"}
          >
            <Soft3DIcon name={saved ? "statusCompleted" : "actionSave"} size="sm" decorative active={saved} />
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

export function VisualMediaPreview({ media }: { media: NonNullable<LearningLesson["visualMedia"]>[number] }) {
  if (media.src) {
    return (
      <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--elev-3)]">
        <div className="relative aspect-[1200/760] w-full bg-[var(--surface)]">
          <Image
            src={media.src}
            alt={media.altTh ?? media.altEn ?? media.titleEn}
            fill
            className="object-contain"
            sizes="(min-width: 1280px) 760px, (min-width: 768px) 82vw, 100vw"
          />
        </div>
        {media.items?.length ? (
          <figcaption className="grid gap-2 border-t border-[var(--border)] bg-[var(--surface-2)] p-4 sm:flex sm:flex-wrap">
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

  const items = media.items ?? [];
  const isFlow = media.type === "flow";

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-3)] p-4 shadow-[var(--elev-3)] sm:p-5">
      <div className={`grid gap-3 ${isFlow ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="group relative min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 shadow-[var(--elev-2)]">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] font-display text-xs font-semibold text-[var(--text-primary)]">
                {isFlow ? index + 1 : "•"}
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold leading-6 text-[var(--text-primary)]">{item}</p>
                {isFlow && index < items.length - 1 ? (
                  <p className="font-subtitle mt-1 text-xs leading-5 text-[var(--text-muted)]">Then continue to the next decision.</p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LessonVideoCard({ video }: { video: NonNullable<LearningLesson["videos"]>[number] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--elev-2)]">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.55fr)] lg:items-stretch">
        <div className="relative aspect-video w-full bg-[var(--surface-3)] lg:aspect-auto lg:h-full lg:min-h-[18.5rem]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            title={video.titleEn}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="grid content-start gap-3 bg-[var(--surface-3)] p-4 sm:p-5">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">Watch First</p>
            <h3 className="mt-2 text-balance font-display text-lg font-semibold leading-snug text-[var(--text-primary)]">{video.titleEn}</h3>
            <p className="font-subtitle mt-1 text-xs font-semibold leading-5 text-[var(--text-secondary)]">
              {video.sourceName}
              {video.durationLabel ? ` · ${video.durationLabel}` : ""}
            </p>
          </div>

          <p className="font-subtitle text-sm leading-7 text-[var(--text-secondary)]">{video.whyWatchTh}</p>

          <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-2)] p-3">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">Try Next</p>
            <p className="font-subtitle mt-1 text-sm leading-7 text-[var(--text-secondary)]">{video.afterWatchPromptTh}</p>
          </div>

          <a href={video.watchUrl} target="_blank" rel="noreferrer" className="font-subtitle inline-flex min-h-10 items-center text-sm font-semibold text-[var(--text-primary)] underline-offset-4 hover:underline">
            Open on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

export const gridCheatSheet = {
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

export function FigmaGridCheatSheet() {
  const [device, setDevice] = useState<keyof typeof gridCheatSheet>("Desktop");
  const presets = gridCheatSheet[device];
  const previewColumns = presets[0].columns;

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] p-4 shadow-[var(--elev-3)]">
      <div className="flex flex-wrap gap-2">
        {(["Desktop", "Tablet", "Mobile"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setDevice(item)}
            className={`min-h-10 rounded-full border px-4 text-sm font-bold transition ${
              device === item ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--text-on-accent)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"
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
              <p className="font-display text-sm font-bold text-[var(--text-primary)]">{device} preset {index + 1}</p>
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
          <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">Visual Preview</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <div className="grid h-44 gap-1" style={{ gridTemplateColumns: `repeat(${previewColumns}, minmax(0, 1fr))` }}>
              {Array.from({ length: previewColumns }).map((_, index) => (
                <div key={index} className="rounded-md bg-[var(--accent)]/25" />
              ))}
            </div>
          </div>
          <p className="font-subtitle mt-3 text-xs leading-6 text-[var(--text-secondary)]">Preview นี้แสดงจำนวน column โดยประมาณ เพื่อช่วยให้เห็น rhythm ของ grid ก่อนนำไปปรับใน Figma</p>
        </div>
      </div>
    </div>
  );
}

export function LessonReferences({ references }: { references: string[] }) {
  const uniqueReferences = Array.from(new Set(references)).filter(Boolean);

  if (!uniqueReferences.length) return null;

  return (
    <LessonBlock id="lesson-references" title="References">
      <details className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <summary className="flex min-h-11 cursor-pointer list-none items-center font-display text-sm font-semibold text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
          Source notes and further reading
        </summary>
        <p className="font-subtitle mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          แหล่งข้อมูลเหล่านี้ใช้เป็นฐานในการสรุปบทเรียน ให้ใช้เพื่อเรียนรู้แนวคิดหลัก แล้วตรวจบริบทจริงของบริษัทหรือโปรเจกต์ก่อนนำไปใช้เสมอ
        </p>
        <div className="mt-4 grid gap-2">
          {uniqueReferences.map((reference) => {
            const isUrl = reference.startsWith("http://") || reference.startsWith("https://");
            const label = isUrl ? reference.replace(/^https?:\/\//, "").replace(/\/$/, "") : reference;

            return isUrl ? (
              <a
                key={reference}
                href={reference}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-semibold leading-6 text-[var(--text-primary)] transition hover:shadow-[var(--elev-2)]"
              >
                {label}
              </a>
            ) : (
              <div key={reference} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-semibold leading-6 text-[var(--text-primary)]">
                {reference}
              </div>
            );
          })}
        </div>
      </details>
    </LessonBlock>
  );
}

export function LessonBlock({ id, title, step, children }: { id?: string; title: string; step?: number; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 mt-6 min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-4 shadow-[var(--elev-2)] sm:p-5">
      <div className="flex items-center gap-3">
        {step ? <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-xs font-semibold text-[var(--text-primary)]">{step}</span> : null}
        <h2 className="min-w-0 text-balance font-display text-lg font-semibold tracking-normal text-[var(--text-primary)]">{title}</h2>
      </div>
      <div className="mt-3 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">{children}</div>
    </section>
  );
}

export function Badge({ children, icon }: { children: React.ReactNode; icon?: Soft3DIconName }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 text-xs font-semibold text-[var(--text-secondary)]">
      {icon ? <Soft3DIcon name={icon} size="xs" decorative /> : null}
      {children}
    </span>
  );
}

export function VerificationBadges({ verification }: { verification: NonNullable<LearningLesson["contentVerification"]> }) {
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

export function VerificationNotice({ verification }: { verification: NonNullable<LearningLesson["contentVerification"]> }) {
  return (
    <div className="mt-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-start gap-3">
        <Soft3DIcon name={verification.verificationStatus === "archived" ? "statusLocked" : "statusGoal"} size="sm" decorative active />
        <div>
          <p className="font-display text-sm font-bold text-[var(--text-primary)]">
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

/**
 * The level track: progress as discrete notches rather than a continuous fill.
 * Lessons and questions are countable units, so the meter counts too — a
 * half-lit segment reads as "partway through this one", which a smooth bar
 * cannot say. `variant="rainbow"` keeps its call sites working and maps to the
 * warm tone used for goal/streak metrics.
 */

export const levelTrackCells = 12;

export function ProgressBar({ value, variant = "solid", tone = "blue" }: { value: number; variant?: "solid" | "rainbow"; tone?: ProgressTone }) {
  const clamped = Math.max(0, Math.min(100, value));
  const exact = (clamped / 100) * levelTrackCells;
  const full = Math.floor(exact);
  const hasPartial = exact - full >= 0.15 && full < levelTrackCells;

  return (
    <div
      className="level-track"
      data-tone={variant === "rainbow" || tone === "champagne" ? "warm" : "cool"}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {Array.from({ length: levelTrackCells }, (_, index) => (
        <span
          key={index}
          className="level-track-cell"
          data-filled={index < full ? "true" : index === full && hasPartial ? "partial" : "false"}
        />
      ))}
    </div>
  );
}

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
      <p className="font-subtitle text-xs text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

export function ProgressSummaryRow({ icon, label, value }: { icon: Soft3DIconName; label: string; value: string }) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
      <span className="flex min-w-0 items-center gap-3 text-sm font-medium text-[var(--text-secondary)]">
        <Soft3DIcon name={icon} size="sm" decorative active />
        <span className="truncate">{label}</span>
      </span>
      <span className="shrink-0 font-display text-sm font-bold text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

export function EmptyState({ title, description, action, href }: { title: string; description: string; action: string; href: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-8 text-center shadow-editorial">
      <h2 className="mt-5 text-xl font-bold text-[var(--text-primary)]">{title}</h2>
      <p className="font-subtitle mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
      <Link href={href} className="button-primary mx-auto mt-5 w-fit">
        {action}
      </Link>
    </div>
  );
}

export function PracticeLaunchCard({ path, progress, reviewCount, settings, onStartQuiz }: { path: LearningPath; progress: number; reviewCount: number; settings: UserSettings; onStartQuiz: (pathId: string) => void }) {
  const mode = settings.languageMode;
  const questionCount = questions.filter((question) => question.learningPath === path.name).length;
  const hasQuestions = questionCount > 0;
  const level = levelForPathPercent(path, progress);

  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-[var(--text-primary)] shadow-[var(--elev-3),_var(--rim)] backdrop-blur-2xl transition duration-200 hover:-translate-y-1 hover:bg-[var(--surface-2)] sm:p-5">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(127,227,196,0.18)_0%,rgba(127,227,196,0)_72%)] opacity-90 blur-2xl" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow">Practice Set · {level}</p>
          <h2 className="mt-2 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)]">{path.name}</h2>
        </div>
      </div>
      <p className="font-subtitle mt-3 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">{textByMode(mode, path.currentGoal, path.currentGoalTh)}</p>
      <a href={hasQuestions ? `/quiz?start=1&path=${path.id}` : `/learn/${path.id}`} onClick={() => hasQuestions ? onStartQuiz(path.id) : undefined} className="mt-4 flex min-h-12 w-full items-center justify-center on-accent gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--text-on-accent)] shadow-[var(--elev-2)] transition group-hover:scale-[1.01] hover:bg-[var(--accent-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
        {hasQuestions ? "Start Practice" : "Open Course"}
        <Soft3DIcon name="actionNext" size="sm" decorative />
      </a>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
          <strong className="font-display text-[var(--text-primary)]">{questionCount}</strong> questions
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
          <strong className="font-display text-[var(--text-primary)]">{reviewCount}</strong> review
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
          {level}
        </span>
      </div>
      <div className="mt-5">
        <ProgressBar value={progress} tone={progressToneForPath(path.id)} />
        <div className="mt-2 flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
          <span>Readiness</span>
          <span>{progress}%</span>
        </div>
      </div>
    </article>
  );
}
