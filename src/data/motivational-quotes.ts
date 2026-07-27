export interface MotivationalQuote {
  id: string;
  english: string;
  thai: string;
}

export const motivationalQuotes: MotivationalQuote[] = [
  {
    id: "little-lot",
    english: "Learn a little, grow a lot.",
    thai: "ค่อย ๆ เรียนรู้ทีละนิด แต่เติบโตได้อีกมากนะ",
  },
  {
    id: "small-progress",
    english: "Small progress is still progress.",
    thai: "ถึงจะก้าวเล็ก ๆ แต่มันก็ยังเป็นความก้าวหน้านะ",
  },
  {
    id: "not-perfect",
    english: "You do not need to be perfect to improve.",
    thai: "เราไม่จำเป็นต้องสมบูรณ์แบบ แค่ดีขึ้นกว่าเดิมก็เก่งมากแล้ว",
  },
  {
    id: "mistakes-mastering",
    english: "Mistakes are part of mastering a skill.",
    thai: "ความผิดพลาดคือส่วนหนึ่งของการเก่งขึ้นเสมอ",
  },
  {
    id: "effort-confidence",
    english: "Today’s effort becomes tomorrow’s confidence.",
    thai: "ความพยายามของวันนี้ จะกลายเป็นความมั่นใจของวันพรุ่งนี้",
  },
  {
    id: "gentle-practice",
    english: "Gentle practice can still create powerful change.",
    thai: "ฝึกแบบนุ่มนวลก็สร้างการเปลี่ยนแปลงที่ยิ่งใหญ่ได้นะ",
  },
  {
    id: "show-up",
    english: "Every time you show up, your future self gets stronger.",
    thai: "ทุกครั้งที่เราเริ่มฝึก ตัวเราในอนาคตก็แข็งแรงขึ้นอีกนิด",
  },
  {
    id: "curious-mind",
    english: "A curious mind turns every question into a doorway.",
    thai: "ใจที่อยากรู้อยากเห็น จะเปลี่ยนทุกคำถามให้เป็นประตูบานใหม่",
  },
  {
    id: "steady-growth",
    english: "Growth feels quiet before it becomes visible.",
    thai: "การเติบโตอาจเงียบ ๆ ก่อนที่เราจะเริ่มมองเห็นมันชัดเจน",
  },
  {
    id: "try-again",
    english: "Trying again is a skill, too.",
    thai: "การลองใหม่อีกครั้ง ก็เป็นทักษะที่น่าภูมิใจเหมือนกันนะ",
  },
  {
    id: "learning-compounds",
    english: "What you learn today quietly compounds.",
    thai: "สิ่งที่เรียนวันนี้จะค่อย ๆ สะสมเป็นพลังให้เราในวันต่อไป",
  },
  {
    id: "one-clear-step",
    english: "One clear step is enough to begin.",
    thai: "แค่ก้าวที่ชัดเจนหนึ่งก้าว ก็เพียงพอสำหรับการเริ่มต้นแล้ว",
  },
];

export const defaultMotivationalQuote = motivationalQuotes[0];

export function getDailyQuote(date: Date) {
  const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;

  for (const character of dayKey) {
    hash = (hash * 31 + character.charCodeAt(0)) % motivationalQuotes.length;
  }

  return motivationalQuotes[hash] ?? defaultMotivationalQuote;
}

export function getRandomQuote(previousId?: string) {
  if (motivationalQuotes.length <= 1) return defaultMotivationalQuote;

  const randomValue =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
      : Math.random();

  let index = Math.floor(randomValue * motivationalQuotes.length);

  if (motivationalQuotes[index]?.id === previousId) {
    index = (index + 1) % motivationalQuotes.length;
  }

  return motivationalQuotes[index] ?? defaultMotivationalQuote;
}
