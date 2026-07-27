import { SkillQuestApp } from "@/components/SkillQuestApp";
import type { LanguageMode, UserSettings } from "@/types/skillquest";

type SettingsPageProps = {
  searchParams?: Promise<{
    ieltsMode?: UserSettings["ieltsMode"];
    languageMode?: LanguageMode;
  }>;
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const params = await searchParams;
  const initialSettingsPatch = {
    ...(params?.languageMode ? { languageMode: params.languageMode } : {}),
    ...(params?.ieltsMode ? { ieltsMode: params.ieltsMode } : {}),
  };

  return <SkillQuestApp initialView="settings" initialSettingsPatch={initialSettingsPatch} />;
}
