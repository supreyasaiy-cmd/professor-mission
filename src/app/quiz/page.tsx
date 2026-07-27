import { SkillQuestApp } from "@/components/SkillQuestApp";

type QuizPageProps = {
  searchParams?: Promise<{
    lesson?: string;
    path?: string;
    choice?: string;
    index?: string;
    submitted?: string;
    start?: string;
  }>;
};

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const params = await searchParams;
  const initialQuizStart = params?.start === "1"
    ? {
        choiceId: params.choice,
        currentIndex: params.index ? Number(params.index) : undefined,
        lessonId: params.lesson,
        pathId: params.path,
        submitted: params.submitted === "1",
      }
    : undefined;

  return <SkillQuestApp initialView="quiz" initialQuizStart={initialQuizStart} />;
}
