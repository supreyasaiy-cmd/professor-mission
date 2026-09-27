"use client";

import Link from "next/link";
import { learningPaths } from "@/data/learning-paths";
import { findLessonById } from "@/data/lessons";
import { clearSession } from "@/lib/storage";
import type { LearningPath, ProgressState, Question, QuizSessionState, UserSettings, VocabularyItem } from "@/types/skillquest";
import { PageShell } from "../AppShell";
import { QuestionMedia } from "../QuestionMedia";
import { Soft3DIcon } from "../icons/soft-3d-icon";
import { Badge, Metric, PracticeLaunchCard, ProgressBar, VerificationNotice, VocabularyCard } from "../ui/primitives";
import { getQuestion, hasDistinctThaiText, progressForPath, questionVocabulary, questionsForPractice, reviewCountForPath, showEnglish, showThai, textByMode } from "@/lib/skillquest-logic";

export function QuizView({
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
    const practiceReadyPaths = learningPaths.filter((path) => questionsForPractice(path.id).length > 0);

    return (
      <PageShell
        eyebrow="Practice Mode"
        title="Train one decision at a time."
        summary="Answer, read the feedback, and anything you miss goes straight to Review."
      >
        <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-[var(--text-primary)] shadow-editorial backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,#d9f4ff_0%,rgba(217,244,255,0)_68%)] opacity-75 blur-2xl" />
          <div className="pointer-events-none absolute bottom-[-9rem] left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(143,180,255,0.16)_0%,rgba(143,180,255,0)_70%)] opacity-70 blur-2xl" />
          <div className="pointer-events-none absolute left-[-7rem] top-1/3 h-52 w-52 rounded-full bg-[radial-gradient(circle,#ddffef_0%,rgba(221,255,239,0)_72%)] opacity-60 blur-2xl" />
          <div className="relative mb-4 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">Quiz Launchpad</p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold leading-[1.18] tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Choose a ready set. Practice with real questions.
              </h2>
            </div>
            <div className="font-subtitle rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-secondary)] shadow-[var(--elev-1),_var(--rim)]">
              {practiceReadyPaths.length} ready sets · Feedback after every answer
            </div>
          </div>
          <div className="relative grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {practiceReadyPaths.map((path) => (
              <PracticeLaunchCard key={path.id} path={path} progress={progressForPath(path, progress)} reviewCount={reviewCountForPath(path, progress)} settings={settings} onStartQuiz={onStartQuiz} />
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
        summary="Here is what you picked up, and a good place to go next."
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
            <div className="grid h-28 w-28 place-items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent-wash)] text-3xl font-semibold text-[var(--accent)] shadow-[var(--elev-1)]">
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
                <Soft3DIcon name="navigationReview" size="sm" decorative />
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
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-5">
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
  if (!currentQuestion) {
    return (
      <PageShell
        eyebrow="Practice Mode"
        title="No questions for this course yet"
        summary="The lessons are ready to read. Questions will show up here as soon as they are written."
      >
        <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial">
          <Link href={`/learn/${session.pathId}`} className="button-primary w-fit">
            Open Course
          </Link>
        </div>
      </PageShell>
    );
  }
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
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-2 shadow-[var(--elev-4),_var(--rim)] backdrop-blur-2xl sm:p-4">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-4 shadow-editorial sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{currentQuestion.skill}</Badge>
            <Badge>{textByMode(mode, currentQuestion.topic, currentQuestion.topicTh)}</Badge>
            <Badge>{currentQuestion.difficulty}</Badge>
            {isExam ? <Badge icon="skillIelts">Exam Practice</Badge> : null}
          </div>
          {isExam ? (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--accent-warm-wash)] p-4 text-sm leading-7 text-[var(--text-primary)]">
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
              {showEnglish(mode) ? <h2 className="text-balance font-display text-2xl font-bold leading-tight text-[var(--text-primary)] sm:text-3xl">{currentQuestion.question}</h2> : null}
              {revealThai ? <p className="font-subtitle mt-4 text-base leading-8 text-[var(--text-secondary)]">{currentQuestion.questionTh ?? currentQuestion.explanationTh ?? currentQuestion.question}</p> : null}
            </div>
            {showThai(mode) ? (
              <button type="button" onClick={onToggleTranslations} className="button-ghost shrink-0">
                <Soft3DIcon name="actionTranslation" size="sm" decorative />
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
                  className={`min-h-14 cursor-pointer rounded-2xl border px-4 py-3 text-left text-sm leading-6 shadow-[var(--elev-1)] transition focus-within:ring-2 focus-within:ring-black ${
                    isCorrect
                      ? "border-[var(--accent)] bg-[var(--correct-wash)] text-[var(--text-primary)]"
                      : isWrong
                        ? "border-[var(--wrong)] bg-[var(--wrong-wash)] text-[var(--text-primary)]"
                        : isSelected
                          ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--text-primary)]"
                          : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] hover:shadow-[var(--elev-2)]"
                  }`}
                >
                  <input className="sr-only" disabled={submitted} name="choice" required type="radio" value={choice.id} defaultChecked={isSelected} />
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-xs font-bold uppercase">
                      {isCorrect ? <Soft3DIcon name="statusCorrect" size="xs" decorative /> : isWrong ? <Soft3DIcon name="statusIncorrect" size="xs" decorative /> : choice.id}
                    </span>
                    <span>
                      {showEnglish(mode) ? <span className="block">{choice.text}</span> : null}
                      {(canShowThai || (submitted && showThai(mode))) && hasDistinctThaiText(choice.text, choice.textTh) ? (
                        <span className="mt-1 block text-[var(--text-secondary)]">{choice.textTh}</span>
                      ) : null}
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
                    <span className="font-display font-bold text-[var(--text-primary)]">{vocabulary.word}</span> = {vocabulary.thaiMeaning}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {showHint && !submitted && !isExam ? (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-primary)]">
              <Soft3DIcon name="actionHint" size="sm" decorative className="mb-2" />
              {textByMode(mode, currentQuestion.hint, currentQuestion.hintTh)}
            </div>
          ) : null}

          {submitted ? (
            <div className="mt-5 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2">
                <Soft3DIcon name={answer?.isCorrect ? "statusCorrect" : "statusIncorrect"} size="sm" decorative />
                <h3 className="font-semibold text-[var(--text-primary)]">{answer?.isCorrect ? textByMode(mode, "Correct", "ตอบถูก") : textByMode(mode, "Review this idea", "ควรทบทวนแนวคิดนี้")}</h3>
              </div>
              <p className="font-subtitle mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {textByMode(mode, "Recommended answer", "คำตอบที่แนะนำ")}: <span className="font-semibold text-[var(--text-primary)]">{correctChoice?.text}</span>
              </p>
              {showThai(mode) && hasDistinctThaiText(correctChoice?.text, correctChoice?.textTh) ? <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{correctChoice?.textTh}</p> : null}
              {!answer?.isCorrect ? (
                <p className="mt-3 text-sm leading-6 text-[var(--wrong)]">
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
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{textByMode(mode, "Practical workplace example", "ตัวอย่างการใช้งานจริง")}</p>
                {showEnglish(mode) ? <p className="font-subtitle mt-2 text-sm leading-6 text-[var(--text-secondary)]">{currentQuestion.practicalExample}</p> : null}
                {showThai(mode) && hasDistinctThaiText(currentQuestion.practicalExample, currentQuestion.practicalExampleTh) ? <p className="font-subtitle mt-2 text-sm leading-7 text-[var(--text-secondary)]">{currentQuestion.practicalExampleTh}</p> : null}
              </div>
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{textByMode(mode, "Important vocabulary", "คำศัพท์สำคัญ")}</p>
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

          <div className="sticky bottom-20 mt-6 flex flex-col gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] p-3 shadow-[var(--elev-3)] backdrop-blur-xl sm:static sm:flex-row sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
            {!submitted ? (
              <>
                <button type="button" onClick={onShowHint} disabled={isExam} className="button-ghost disabled:cursor-not-allowed disabled:opacity-45">
                  <Soft3DIcon name="actionHint" size="sm" decorative />
                  Hint
                </button>
                <button type="submit" form={quizFormId} disabled={!selectedChoice} onClick={() => selectedChoice ? onSubmit(currentQuestion) : undefined} className="button-primary disabled:cursor-not-allowed disabled:opacity-45">
                  Submit Answer
                  <Soft3DIcon name="actionSubmit" size="sm" decorative />
                </button>
              </>
            ) : (
              <a href={nextQuestionHref} onClick={onNext} className="button-primary">
                {session.currentIndex + 1 >= session.questionIds.length ? "Finish Session" : "Next Question"}
                <Soft3DIcon name="actionNext" size="sm" decorative />
              </a>
            )}
          </div>
        </section>

        <aside className="hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-[var(--text-primary)] shadow-[var(--elev-3)] xl:block">
          <p className="font-display text-sm font-bold text-[var(--text-primary)]">{textByMode(mode, "Session focus", "โฟกัสของเซสชัน")}</p>
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
