import { SkillQuestApp } from "@/components/SkillQuestApp";

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ learningPathSlug: string }>;
}) {
  const { learningPathSlug } = await params;
  return <SkillQuestApp initialView="learn-path" learningPathSlug={learningPathSlug} />;
}
