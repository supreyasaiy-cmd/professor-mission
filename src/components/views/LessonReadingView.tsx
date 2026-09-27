"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adjacentLessons, findLesson, findPathBySlug } from "@/data/lessons";
import type { LessonProgress, ProgressState, UserSettings, VocabularyItem } from "@/types/skillquest";
import { PageShell } from "../AppShell";
import { Soft3DIcon } from "../icons/soft-3d-icon";
import { Badge, EmptyState, FigmaGridCheatSheet, LessonBlock, LessonFlowCard, LessonReferences, LessonVideoCard, ProgressBar, StudyStep, VerificationBadges, VerificationNotice, VisualMediaPreview, VocabularyCard } from "../ui/primitives";
import { t } from "@/lib/ui-copy";
import { hasDistinctThaiText, questionsForPractice, showEnglish, showThai } from "@/lib/skillquest-logic";

export function LessonReadingView({
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
    return <EmptyState title="We could not find that lesson" description="Pick a lesson from the library and carry on." action="Browse courses" href="/learn" />;
  }

  const currentLesson = lesson;
  const currentPath = path;
  const state = progress.lessons?.[currentLesson.id];
  const adjacent = adjacentLessons(currentPath.id, currentLesson.slug);
  const miniCorrect = currentLesson.miniCheck ? miniChoice === currentLesson.miniCheck.correctChoiceId : false;
  const savedNote = state?.note ?? progress.savedNotes?.find((item) => item.lessonId === currentLesson.id)?.text ?? "";
  const readingSections = currentLesson.sections ?? [];
  const lessonDiagram = currentLesson.diagram ?? [];
  const lessonCommonMistakes = currentLesson.commonMistakes ?? [];
  const lessonCommonMistakesTh = currentLesson.commonMistakesTh ?? [];
  const visualCount = currentLesson.visualMedia?.length ?? 0;
  const videoCount = currentLesson.videos?.length ? 1 : 0;
  const hasDetailedLesson = readingSections.length >= 5;
  const hasFlowVisual = currentLesson.visualMedia?.some((media) => media.type === "flow") ?? false;
  const hasMistakeSection = readingSections.some((item) => item.id.includes("mistake") || item.id.includes("error"));
  const hasJudgmentSection = readingSections.some((item) => item.id.includes("judgment"));
  const shouldShowExampleFlow = lessonDiagram.length > 0 && !hasFlowVisual;
  const shouldShowCommonMistakes = lessonCommonMistakes.length > 0 && !hasMistakeSection;
  const shouldShowBetterJudgment = Boolean(!hasDetailedLesson || hasJudgmentSection);
  const afterVisualStep = readingSections.length + 2 + videoCount + visualCount;
  const sectionStartStep = 2 + videoCount;
  const contents = [
    { id: "lesson-brief", label: "Lesson Brief" },
    { id: "learning-objectives", label: "What you will get from this" },
    { id: "learning-flow", label: "Learning Flow" },
    ...(currentLesson.videos?.length ? [{ id: "watch-and-learn", label: "Watch it in action" }] : []),
    ...readingSections.map((item) => ({ id: item.id, label: item.titleEn })),
    ...(currentLesson.visualMedia?.length ? [{ id: "visual-model", label: "Visual Model" }] : []),
    ...(currentLesson.practicalExamples?.length || !hasDetailedLesson ? [{ id: "workplace-example", label: "How this looks at work" }] : []),
    { id: "mini-task", label: "Mini Task" },
    ...(currentLesson.references?.length ? [{ id: "lesson-references", label: "References" }] : []),
    ...(currentLesson.miniCheck ? [{ id: "mini-check", label: "Mini Check" }] : []),
  ];
  const lessonPracticeCount = questionsForPractice(currentPath.id, currentLesson).length;

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
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial sm:p-7 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{lesson.professionalLevel ?? lesson.difficulty}</Badge>
            <Badge>{lesson.estimatedMinutes ?? lesson.readingMinutes} {t(mode, "minRead")}</Badge>
            {currentLesson.videos?.length ? <Badge>{currentLesson.videos.length} {mode === "EN" ? (currentLesson.videos.length > 1 ? "videos" : "video") : t(mode, "videosLabel")}</Badge> : null}
            <Badge>{state?.completed ? t(mode, "statusCompleted") : state?.readingProgress ? t(mode, "statusInProgress") : t(mode, "statusNotStarted")}</Badge>
            {lessonPracticeCount > 0 ? <Badge icon="navigationPractice">{lessonPracticeCount} {t(mode, "questionsLabel")}</Badge> : null}
            {state?.bookmarked ? <Badge icon="actionBookmark">{t(mode, "bookmarked")}</Badge> : null}
            {currentLesson.contentVerification ? <VerificationBadges verification={currentLesson.contentVerification} /> : null}
          </div>

          <section className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-[var(--accent)]/25 bg-[var(--surface-3)] p-4 shadow-[var(--elev-1),_var(--rim)] sm:p-5">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0">
                <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{t(mode, "studyPlan")}</p>
                <h2 className="mt-2 text-balance font-display text-xl font-semibold leading-snug text-[var(--text-primary)]">
                  {state?.completed
                    ? adjacent.next
                      ? `${t(mode, "moveTo")} ${adjacent.next.titleEn ?? adjacent.next.title}`
                      : lessonPracticeCount > 0
                        ? t(mode, "planFinishPractice")
                        : t(mode, "planSectionDone")
                    : currentLesson.videos?.length
                      ? t(mode, "planWithVideo")
                      : t(mode, "planReadOnly")}
                </h2>
              </div>
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row md:flex-col">
                {!state?.completed ? (
                  <button type="button" className="button-primary w-full justify-center md:w-auto" onClick={markComplete}>
                    {t(mode, "markAsRead")}
                  </button>
                ) : adjacent.next ? (
                  <Link href={`/learn/${path.id}/${adjacent.next.slug}`} className="button-primary w-full justify-center md:w-auto">
                    {t(mode, "nextLesson")}
                  </Link>
                ) : lessonPracticeCount > 0 ? (
                  <a href={`/quiz?start=1&path=${path.id}&lesson=${lesson.id}`} className="button-primary w-full justify-center md:w-auto" onClick={() => onStartQuiz(path.id, lesson.id)}>
                    {t(mode, "startPractice")}
                  </a>
                ) : (
                  <Link href={`/learn/${path.id}`} className="button-primary w-full justify-center md:w-auto">
                    {t(mode, "courseMap")}
                  </Link>
                )}
              </div>
              <div className={`grid gap-2 md:col-span-2 ${currentLesson.videos?.length ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                <StudyStep label={t(mode, "stepRead")} description={t(mode, "stepReadHint")} />
                {currentLesson.videos?.length ? <StudyStep label={t(mode, "stepWatch")} description={t(mode, "stepWatchHint")} /> : null}
                <StudyStep label={t(mode, "stepSee")} description={t(mode, "stepSeeHint")} />
                <StudyStep label={t(mode, "stepApply")} description={t(mode, "stepApplyHint")} />
              </div>
            </div>
          </section>

          <section id="lesson-brief" className="mt-7 scroll-mt-28 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{t(mode, "lessonBrief")}</p>
            {/* There is no English lesson summary to switch to: `description`,
                `summaryTh` and `introductionTh` are all Thai on all 300
                lessons, so English mode has no source here. Left as Thai
                rather than faking a language switch that has no content
                behind it. */}
            <p className="mt-3 max-w-4xl text-base leading-8 text-[var(--text-secondary)]">{lesson.summaryTh ?? lesson.introductionTh}</p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{t(mode, "whyThisMatters")}</p>
              {showEnglish(mode) ? <p className="mt-2 font-subtitle text-sm font-semibold leading-6 text-[var(--text-primary)]">{lesson.keyTakeaway}</p> : null}
              {showThai(mode) && hasDistinctThaiText(lesson.keyTakeaway, lesson.keyTakeawayTh) ? (
                <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{lesson.keyTakeawayTh}</p>
              ) : null}
            </div>
          </section>

          {currentLesson.contentVerification ? <VerificationNotice verification={currentLesson.contentVerification} /> : null}

          <details className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 md:hidden">
            <summary className="flex min-h-11 cursor-pointer items-center font-display text-sm font-semibold text-[var(--text-primary)]">
              {t(mode, "contents")}
            </summary>
            <div className="mt-3 grid gap-2 text-sm text-[var(--text-secondary)]">
              {contents.map((item, index) => (
                <a key={item.id} href={`#${item.id}`} className="flex min-h-11 items-center gap-3 rounded-2xl bg-[var(--surface-2)] px-3 py-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-xs font-bold text-[var(--text-primary)]">{index + 1}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </details>

          <LessonBlock id="learning-objectives" title={t(mode, "objectives")} step={1}>
            <ul className="grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
              {lesson.objectives.map((objective) => (
                <li key={objective}>• {objective}</li>
              ))}
            </ul>
          </LessonBlock>

          <LessonFlowCard hasVideo={Boolean(currentLesson.videos?.length)} hasQuiz={lessonPracticeCount > 0} />

          {currentLesson.videos?.length ? (
            <LessonBlock id="watch-and-learn" title={t(mode, "watchIt")} step={2}>
              <div className="mt-4 grid gap-4">
                {currentLesson.videos.map((video) => (
                  <LessonVideoCard key={video.id} video={video} />
                ))}
              </div>
            </LessonBlock>
          ) : null}

          {currentLesson.sections?.map((item, index) => (
            <LessonBlock key={item.id} id={item.id} title={item.titleEn} step={sectionStartStep + index}>
              {item.bodyTh.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {item.bullets?.length ? (
                <ul className="grid gap-2">
                  {item.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
                </ul>
              ) : null}
            </LessonBlock>
          )) ?? (
            <LessonBlock title={t(mode, "plainTerms")} step={sectionStartStep}>
              {showEnglish(mode) ? <p>{lesson.explanation}</p> : null}
              {showThai(mode) ? <p>{lesson.explanationTh}</p> : null}
            </LessonBlock>
          )}

          {currentLesson.visualMedia?.map((media, index) => (
            <LessonBlock key={media.titleEn} id={index === 0 ? "visual-model" : undefined} title={media.titleEn} step={readingSections.length + 2 + videoCount + index}>
              <p className="font-subtitle">{media.descriptionTh}</p>
              {media.type === "figma-grid-cheat-sheet" ? <FigmaGridCheatSheet /> : <VisualMediaPreview media={media} />}
            </LessonBlock>
          ))}

          {currentLesson.practicalExamples?.length || !hasDetailedLesson ? (
            <LessonBlock id="workplace-example" title={t(mode, "atWork")} step={afterVisualStep}>
              {currentLesson.practicalExamples?.length ? (
                <div className="grid gap-3">
                  {currentLesson.practicalExamples.map((example) => (
                    <div key={example.titleEn} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
                      <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{example.titleEn}</p>
                      <p className="mt-2">{example.bodyTh}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {showEnglish(mode) ? <p>{lesson.workplaceExample}</p> : null}
                  {showThai(mode) && hasDistinctThaiText(lesson.workplaceExample, lesson.workplaceExampleTh) ? <p>{lesson.workplaceExampleTh}</p> : null}
                </>
              )}
            </LessonBlock>
          ) : null}

          {shouldShowExampleFlow ? (
            <LessonBlock title={t(mode, "exampleFlow")}>
              <div className="flex flex-wrap items-center gap-2">
                {lessonDiagram.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)]">{item}</span>
                    {index < lessonDiagram.length - 1 ? <span className="text-[var(--text-muted)]">→</span> : null}
                  </span>
                ))}
              </div>
            </LessonBlock>
          ) : null}

          {shouldShowCommonMistakes ? (
            <LessonBlock title={t(mode, "easyMistakes")}>
              <div className="grid gap-3 sm:grid-cols-2">
                <ul className="grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {lessonCommonMistakes.map((mistake) => <li key={mistake}>• {mistake}</li>)}
                </ul>
                {showThai(mode) ? (
                  <ul className="grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {lessonCommonMistakesTh.map((mistake) => <li key={mistake}>• {mistake}</li>)}
                  </ul>
                ) : null}
              </div>
            </LessonBlock>
          ) : null}

          {shouldShowBetterJudgment ? (
            <LessonBlock title={t(mode, "sharperJudgment")}>
              <div className="grid gap-3 sm:grid-cols-2">
                <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
                  {lesson.juniorVsSenior?.junior ?? lesson.juniorThinking}
                  {lesson.juniorVsSenior?.juniorTh ? <span className="mt-2 block">{lesson.juniorVsSenior.juniorTh}</span> : null}
                </p>
                <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 font-semibold text-[var(--text-primary)] sm:p-5">
                  {lesson.juniorVsSenior?.senior ?? lesson.seniorThinking}
                  {lesson.juniorVsSenior?.seniorTh ? <span className="mt-2 block font-medium text-[var(--text-secondary)]">{lesson.juniorVsSenior.seniorTh}</span> : null}
                </p>
              </div>
            </LessonBlock>
          ) : null}

          <LessonBlock title={t(mode, "wordsWorthKnowing")}>
            <div className="grid gap-3 sm:grid-cols-2">
              {(lesson.vocabulary ?? lesson.terminology).map((vocabulary) => (
                <VocabularyCard key={vocabulary.id} vocabulary={vocabulary} onSave={onSaveVocabulary} saved={progress.savedVocabulary?.some((item) => item.id === vocabulary.id)} />
              ))}
            </div>
          </LessonBlock>

          <LessonBlock id="mini-task" title={t(mode, "miniTask")}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-3)] p-4 sm:p-5">
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{t(mode, "tryBeforeQuiz")}</p>
              <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                เขียนคำตอบสั้น ๆ 2 บรรทัด: 1) หลักการสำคัญของบทนี้คืออะไร 2) ถ้าเอาไปใช้กับงานจริง คุณจะปรับ decision หรือ next step ตรงไหน
              </p>
              <p className="mt-3 font-subtitle text-sm font-semibold leading-7 text-[var(--text-primary)]">
                Prompt: Use “{lesson.relatedTopic}” to explain one clearer product, design, research, English, or data decision.
              </p>
            </div>
          </LessonBlock>

          {lesson.references?.length ? <LessonReferences references={lesson.references} /> : null}

          {lesson.miniCheck ? (
            <LessonBlock id="mini-check" title={t(mode, "quickCheck")} step={afterVisualStep + 5}>
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
                      miniChoice === choice.id ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--text-primary)]" : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    {choice.text}
                    {showThai(mode) && hasDistinctThaiText(choice.text, choice.textTh) ? <span className="block pt-1 text-xs font-medium text-[var(--text-secondary)]">{choice.textTh}</span> : null}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" className="button-primary disabled:cursor-not-allowed disabled:opacity-45" disabled={!miniChoice || miniSubmitted} onClick={submitMiniCheck}>
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

          <LessonBlock title={t(mode, "yourNote")}>
            <textarea
              key={`${lesson.id}-${savedNote}`}
              defaultValue={savedNote}
              onChange={(event) => setNoteDraft(event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--text-primary)] outline-none transition focus:border-[var(--border-strong)] focus:bg-[var(--surface-2)] focus:ring-2 focus:ring-[var(--border)]"
              placeholder="Write a short note in Thai or English..."
            />
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                className="grid min-h-12 min-w-12 place-items-center rounded-full border border-[var(--border)] bg-[var(--accent)] text-[var(--text-on-accent)] shadow-[var(--elev-2)] transition hover:bg-[var(--accent-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                onClick={() => onSaveNote(lesson.id, noteDraft || savedNote)}
                aria-label="Save note"
                title={t(mode, "saveNote")}
              >
                <Soft3DIcon name="actionNote" size="sm" decorative active />
              </button>
              <button
                type="button"
                className="grid min-h-12 min-w-12 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-primary)] shadow-[var(--elev-2)] transition hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
                onClick={saveAllVocabulary}
                aria-label="Save vocabulary"
                title={t(mode, "saveVocabulary")}
              >
                <Soft3DIcon name="actionSave" size="sm" decorative active />
              </button>
              <button type="button" className="button-ghost" onClick={addToReview}>
                Add to Review
              </button>
            </div>
          </LessonBlock>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:flex-wrap">
            <button type="button" className="button-ghost" onClick={toggleBookmark}>
              <Soft3DIcon name="actionBookmark" size="sm" decorative />
              {state?.bookmarked ? "Remove Bookmark" : "Bookmark Lesson"}
            </button>
            {adjacent.previous ? <Link href={`/learn/${path.id}/${adjacent.previous.slug}`} className="button-ghost">{t(mode, "previousLesson")}</Link> : null}
            {adjacent.next ? <Link href={`/learn/${path.id}/${adjacent.next.slug}`} className="button-ghost">{t(mode, "nextLesson")}</Link> : null}
            {lessonPracticeCount > 0 ? (
              <a href={`/quiz?start=1&path=${path.id}&lesson=${lesson.id}`} className="button-primary" onClick={() => onStartQuiz(path.id, lesson.id)}>
                Start Lesson Practice
              </a>
            ) : null}
          </div>
        </article>

        <aside className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial xl:sticky xl:top-28 xl:self-start">
          <p className="font-display text-sm font-bold text-[var(--text-primary)]">{t(mode, "readingProgress")}</p>
          <div className="mt-4">
            <ProgressBar value={state?.completed ? 100 : state?.readingProgress ?? 0} />
          </div>
          <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)]">
            <p>Completed: {state?.completed ? "Yes" : "No"}</p>
            <p>Bookmarked: {state?.bookmarked ? "Yes" : "No"}</p>
            <p>Review flag: {state?.reviewFlag ? "Added" : "Not added"}</p>
            <p>Saved words: {state?.savedVocabularyIds?.length ?? 0}</p>
          </div>
          <div className="mt-5 grid gap-2 border-t border-[var(--border)] pt-5">
            {!state?.completed ? (
              <button type="button" className="button-primary w-full" onClick={markComplete}>
                {t(mode, "markAsRead")}
              </button>
            ) : adjacent.next ? (
              <Link href={`/learn/${path.id}/${adjacent.next.slug}`} className="button-primary w-full">
                Next Lesson
              </Link>
            ) : null}
            {lessonPracticeCount > 0 ? (
              <a href={`/quiz?start=1&path=${path.id}&lesson=${lesson.id}`} className="button-ghost w-full" onClick={() => onStartQuiz(path.id, lesson.id)}>
                Start Practice
              </a>
            ) : null}
          </div>
          {currentLesson.sections?.length ? (
            <div className="mt-6 hidden border-t border-[var(--border)] pt-5 xl:block">
              <p className="font-display text-sm font-bold text-[var(--text-primary)]">{t(mode, "readInOrder")}</p>
              <div className="mt-3 grid gap-2">
                {contents.map((item, index) => (
                  <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 rounded-2xl bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-xs text-[var(--text-primary)]">{index + 1}</span>
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
