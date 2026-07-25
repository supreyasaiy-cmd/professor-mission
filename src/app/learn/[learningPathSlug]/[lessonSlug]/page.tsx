import { SkillQuestApp } from "@/components/SkillQuestApp";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ learningPathSlug: string; lessonSlug: string }>;
}) {
  const { learningPathSlug, lessonSlug } = await params;
  return <SkillQuestApp initialView="lesson" learningPathSlug={learningPathSlug} lessonSlug={lessonSlug} />;
}
