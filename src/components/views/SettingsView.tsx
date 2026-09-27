"use client";

import type { LanguageMode, ProgressState, UserSettings } from "@/types/skillquest";
import { PageShell } from "../AppShell";
import { Soft3DIcon } from "../icons/soft-3d-icon";
import { languageLabels, showThai } from "@/lib/skillquest-logic";

const englishLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const bands = ["5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0+"] as const;
const goalOptions = [5, 10, 15, 20] as const;

/** A card of related settings. One border, one heading, no nesting. */
function SettingsGroup({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial sm:p-6">
      <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
      <p className="font-subtitle mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{hint}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/**
 * A selectable option. The check mark matters: selection used to be signalled
 * by background tint alone, which is invisible to anyone who cannot separate
 * the two colours.
 */
function OptionTile({
  href,
  selected,
  label,
  hint,
  onSelect,
}: {
  href: string;
  selected: boolean;
  label: string;
  hint?: string;
  onSelect: () => void;
}) {
  return (
    <a
      href={href}
      aria-current={selected ? "true" : undefined}
      onPointerDown={onSelect}
      onClick={onSelect}
      className={`relative block min-h-16 rounded-[var(--radius-md)] border px-4 py-3 pr-10 text-left transition ${
        selected
          ? "border-[var(--accent)]/60 bg-[var(--accent-wash)] text-[var(--text-primary)]"
          : "border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-4)]"
      }`}
    >
      <span className="block font-display text-base font-semibold">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs leading-snug">{hint}</span> : null}
      {selected ? (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent)]">
          <Soft3DIcon name="statusCorrect" size="xs" decorative active />
        </span>
      ) : null}
    </a>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
      <select
        className="min-h-12 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-3)] px-4 text-[var(--text-primary)] transition hover:border-[var(--border-strong)] focus:border-[var(--accent)] focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SettingsView({
  settings,
  progress,
  onUpdateSettings,
  onUpdateDailyGoal,
}: {
  settings: UserSettings;
  progress: ProgressState;
  onUpdateSettings: (settings: UserSettings) => void;
  onUpdateDailyGoal: (goal: number) => void;
}) {
  const th = showThai(settings.languageMode);

  return (
    <PageShell
      eyebrow="Settings"
      title="Set things up the way you like"
      summary={
        th
          ? "ปรับภาษาและเป้าหมายให้เข้ากับจังหวะของคุณ เปลี่ยนตอนไหนก็ได้ ทุกอย่างเก็บไว้ในเครื่องนี้เท่านั้น"
          : "Tune the language and goals to fit your pace. Change anything whenever you like — it all stays on this device."
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <SettingsGroup
          title={th ? "ภาษาที่อยากเห็น" : "Language you want to see"}
          hint={
            th
              ? "ค่าเริ่มต้นคือ TH + EN จะได้อ่านศัพท์วิชาชีพเป็นอังกฤษ พร้อมคำอธิบายไทยควบคู่กันไป"
              : "TH + EN is the default, so you get the professional terms in English with Thai explanations alongside."
          }
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {(["TH", "EN", "TH_EN"] as LanguageMode[]).map((mode) => (
              <OptionTile
                key={mode}
                href={`/settings?languageMode=${mode}`}
                selected={settings.languageMode === mode}
                label={languageLabels[mode]}
                hint={
                  mode === "TH"
                    ? th ? "ไทยเป็นหลัก" : "Thai first"
                    : mode === "EN"
                      ? th ? "อังกฤษล้วน" : "English only"
                      : th ? "อังกฤษ + ไทยช่วย" : "English + Thai support"
                }
                onSelect={() => onUpdateSettings({ ...settings, languageMode: mode })}
              />
            ))}
          </div>
        </SettingsGroup>

        {/* The daily goal drives the meter on Home and the streak, but there
            was no way to change it from anywhere in the app. */}
        <SettingsGroup
          title={th ? "เป้าหมายต่อวัน" : "Your daily goal"}
          hint={
            th
              ? "จะตอบกี่ข้อต่อวันถึงจะพอดีกับชีวิตคุณ เริ่มน้อย ๆ แล้วค่อยขยับขึ้นก็ได้"
              : "How many questions a day fits your life? Start small — you can always raise it later."
          }
        >
          <div className="grid grid-cols-4 gap-2">
            {goalOptions.map((goal) => {
              const selected = progress.dailyGoal === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onUpdateDailyGoal(goal)}
                  className={`min-h-16 rounded-[var(--radius-md)] border transition ${
                    selected
                      ? "border-[var(--accent)]/60 bg-[var(--accent-wash)]"
                      : "border-[var(--border)] bg-[var(--surface-3)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-4)]"
                  }`}
                >
                  <span className={`t-figure block text-2xl ${selected ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>{goal}</span>
                  <span className="mt-1 block text-[11px] text-[var(--text-muted)]">{th ? "ข้อ" : "a day"}</span>
                </button>
              );
            })}
          </div>
        </SettingsGroup>

        <SettingsGroup
          title={th ? "ระดับภาษาอังกฤษ" : "Your English level"}
          hint={
            th
              ? "บอกไว้คร่าว ๆ พอ ใช้ปรับความยากของศัพท์และความยาวบทอ่านให้เหมาะกับคุณ ไม่ใช่ผลสอบทางการ"
              : "A rough self-estimate is enough. We use it to pitch vocabulary and passage length — it is not an official test result."
          }
        >
          <div className="grid gap-4">
            <SelectField
              label={th ? "ตอนนี้อยู่ประมาณ" : "Where you are now"}
              value={settings.currentEnglishLevel}
              options={englishLevels}
              onChange={(value) => onUpdateSettings({ ...settings, currentEnglishLevel: value as UserSettings["currentEnglishLevel"] })}
            />
            <SelectField
              label={th ? "อยากไปให้ถึง" : "Where you want to get to"}
              value={settings.targetEnglishLevel}
              options={englishLevels}
              onChange={(value) => onUpdateSettings({ ...settings, targetEnglishLevel: value as UserSettings["targetEnglishLevel"] })}
            />
          </div>
        </SettingsGroup>

        <SettingsGroup
          title={th ? "การเตรียมสอบ IELTS" : "IELTS preparation"}
          hint={
            th
              ? "ตั้งเป้า band ไว้เป็นเป้าส่วนตัว แล้วเลือกว่าอยากค่อย ๆ เรียน หรืออยากซ้อมแบบจับเวลา"
              : "Set a band as a personal target, then choose whether you would rather learn steadily or practise under exam conditions."
          }
        >
          <div className="grid gap-4">
            <SelectField
              label={th ? "เป้า band" : "Target band"}
              value={settings.ieltsTargetBand}
              options={bands}
              onChange={(value) => onUpdateSettings({ ...settings, ieltsTargetBand: value as UserSettings["ieltsTargetBand"] })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {(["learn", "exam"] as const).map((ieltsMode) => (
                <OptionTile
                  key={ieltsMode}
                  href={`/settings?ieltsMode=${ieltsMode}`}
                  selected={settings.ieltsMode === ieltsMode}
                  label={ieltsMode === "learn" ? (th ? "ค่อย ๆ เรียน" : "Learn mode") : th ? "ซ้อมแบบสอบจริง" : "Exam practice"}
                  hint={
                    ieltsMode === "learn"
                      ? th ? "เน้นเข้าใจ ไม่เร่ง" : "Understanding first, no rush"
                      : th ? "จับเวลา เหมือนสอบ" : "Timed, like the real thing"
                  }
                  onSelect={() => onUpdateSettings({ ...settings, ieltsMode })}
                />
              ))}
            </div>
          </div>
        </SettingsGroup>
      </div>
    </PageShell>
  );
}
