import { learningPaths } from "@/data/learning-paths";
import type {
  ContentVerification,
  CurriculumModule,
  Difficulty,
  LearningLesson,
  LearningPath,
  LessonMiniCheck,
  LessonPracticalExample,
  LessonSection,
  LessonVisualMedia,
  VocabularyItem,
} from "@/types/skillquest";

type UxLessonSeed = {
  titleEn: string;
  titleTh: string;
  summaryTh: string;
  professionalLevel: Difficulty;
  estimatedMinutes: number;
  objectives: string[];
  sections: LessonSection[];
  examples: LessonPracticalExample[];
  visualMedia?: LessonVisualMedia[];
  mistakes: string[];
  mistakesTh: string[];
  junior: string;
  senior: string;
  juniorTh: string;
  seniorTh: string;
  vocabulary: Array<[string, string, string, string]>;
  keyTakeaway: string;
  keyTakeawayTh: string;
  miniCheck: LessonMiniCheck;
  relatedQuestionIds: string[];
  references: string[];
};

const uxModulesBase = [
  {
    id: "ux-ui-foundations",
    titleEn: "UX/UI Foundations",
    titleTh: "พื้นฐาน UX/UI",
    descriptionTh: "เข้าใจบทบาทของ UX, UI และวิธีคิดพื้นฐานก่อนเริ่มออกแบบ",
    lessons: ["Understand UX, Understand UI", "Design Thinking", "Empathy Map", "Core UX Principles"],
  },
  {
    id: "ux-research",
    titleEn: "UX Research",
    titleTh: "การวิจัยผู้ใช้",
    descriptionTh: "เรียนรู้วิธีเก็บข้อมูลเชิงตัวเลขและเชิงคุณภาพโดยไม่สับสนประเภทของงานวิจัย",
    lessons: ["Quantitative Research", "Qualitative Research", "User Interview", "Persona", "Usability Testing"],
  },
  {
    id: "product-structure",
    titleEn: "Product Structure",
    titleTh: "โครงสร้างผลิตภัณฑ์",
    descriptionTh: "จัดระบบข้อมูล เส้นทาง และ flow เพื่อให้ผู้ใช้ไปถึงเป้าหมายได้ชัดขึ้น",
    lessons: ["User Journey Map", "UX vs Marketing", "Competitive Analysis", "Minimum Viable Product", "Information Architecture", "Sitemap", "User Flow"],
  },
  {
    id: "wireframe-responsive-design",
    titleEn: "Wireframe and Responsive Design",
    titleTh: "Wireframe และ Responsive Design",
    descriptionTh: "แปลงความคิดเป็นโครงหน้าจอที่ยืดหยุ่นได้ทั้ง desktop, tablet และ mobile",
    lessons: ["Three Types of Wireframes", "Desktop Wireframe", "Mobile Wireframe", "Responsive Design", "Frame, Grid and the 8-Point Rule", "Design Challenge"],
  },
  {
    id: "figma-ui-design",
    titleEn: "Figma and UI Design",
    titleTh: "Figma และ UI Design",
    descriptionTh: "ฝึกเครื่องมือและระบบ UI ที่ช่วยให้ออกแบบได้เป็นระเบียบและส่งต่อง่าย",
    lessons: [
      "Welcome to Figma",
      "From Wireframe to User Interface",
      "Auto Layout",
      "Style, Group and Component",
      "Variants and Component Properties",
      "Design System",
      "Design Tokens",
      "Variables",
      "Plugins for Design and Portfolio",
    ],
  },
  {
    id: "ux-writing-product-systems",
    titleEn: "UX Writing and Product Systems",
    titleTh: "UX Writing และระบบผลิตภัณฑ์",
    descriptionTh: "เขียนข้อความในผลิตภัณฑ์และทำงานกับระบบจริง เช่น backoffice, handoff และทีมพัฒนา",
    lessons: [
      "Introduction to UX Writing",
      "Button Labels and Microcopy",
      "Error, Empty and Success States",
      "System and Backoffice Design",
      "Working with Developers",
      "Design Handoff",
      "Team Coordination",
    ],
  },
  {
    id: "presenting-your-work",
    titleEn: "Presenting Your Work",
    titleTh: "การนำเสนองาน",
    descriptionTh: "สื่อสารเหตุผล รับ feedback และจัดพอร์ตให้เล่าเส้นทางการคิดได้ดี",
    lessons: [
      "Prototype for Presentation",
      "Pitching Your Project",
      "Receiving Feedback and Critique",
      "Finding Design Resources",
      "Writing a UX/UI Case Study",
      "Creating a UX/UI Portfolio",
      "Job Interview and Career Preparation",
      "AI and UX/UI Design",
    ],
  },
  {
    id: "capstone-mission",
    titleEn: "Capstone Mission",
    titleTh: "โปรเจกต์สรุปหลักสูตร",
    descriptionTh: "เชื่อมทุกขั้นตอนเป็นโปรเจกต์ UX/UI หนึ่งชิ้นที่นำเสนอและต่อยอดเป็น portfolio ได้",
    lessons: ["Capstone Project Flow"],
  },
] satisfies Omit<CurriculumModule, "number" | "lessonIds">[] & { lessons: string[] }[];

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function lessonId(moduleId: string, title: string) {
  return `ux-ui-${moduleId}-${slugify(title)}`;
}

export const curriculumModules: CurriculumModule[] = uxModulesBase.map((module, index) => ({
  id: module.id,
  number: index + 1,
  titleEn: module.titleEn,
  titleTh: module.titleTh,
  descriptionTh: module.descriptionTh,
  lessonIds: module.lessons.map((title) => lessonId(module.id, title)),
}));

const expandedPathTopics = {
  designops: [
    "What is DesignOps?",
    "Mapping a Design Workflow",
    "Managing Design Requests",
    "Prioritisation",
    "Capacity Planning",
    "Design Review",
    "File Organisation",
    "Documentation",
    "Tool Stack Management",
    "Knowledge Management",
    "Design System Governance",
    "Component Contribution",
    "Design Token Operations",
    "Designer Onboarding",
    "Career Framework",
    "DesignOps Metrics",
    "Cycle Time and Bottlenecks",
    "Communicating DesignOps Impact",
  ],
  "ux-research": [
    "UX Researcher Career Map",
    "UX Research Foundations",
    "Research Question vs Business Question",
    "Research Ethics and Privacy",
    "Research Planning",
    "Participant Recruitment",
    "Qualitative Research",
    "Quantitative Research",
    "User Interviews",
    "Interview Script and Moderator Guide",
    "Observation",
    "Diary Studies",
    "Usability Testing",
    "Usability Test Plan",
    "Survey Design",
    "Card Sorting",
    "Tree Testing",
    "Research Analysis",
    "Affinity Mapping",
    "Insight vs Observation",
    "Research Synthesis to Opportunity",
    "Research Reports",
    "Research Repository",
    "Stakeholder Research Readout",
    "Mixed Methods Research",
    "Research Ops Basics",
    "Portfolio Research Case Study",
    "Research Impact",
  ],
  "ux-research-method": [
    "UX Research Method Overview",
    "Method Selection Matrix",
    "Generative vs Evaluative Research",
    "Qualitative vs Quantitative Methods",
    "User Interview Method",
    "Contextual Inquiry",
    "Survey Method",
    "Usability Testing Method",
    "Card Sorting Method",
    "Tree Testing Method",
    "Diary Study Method",
    "Concept Testing Method",
    "Research Sample Size",
    "Bias and Research Quality",
    "Synthesis Methods",
    "Research Method Portfolio",
  ],
  "agile-ux-ui": [
    "UX/UI Design in Agile Overview",
    "Agile Mindset for Designers",
    "Sprint Planning for UX/UI",
    "Discovery and Delivery Balance",
    "Design Backlog and Prioritisation",
    "User Story Mapping",
    "Design Spikes",
    "Lean Wireframes for Sprint Teams",
    "Prototype Before Development",
    "Design Critique in Agile Teams",
    "Handoff with Acceptance Criteria",
    "Working with Product Owner and Developers",
    "QA for UX/UI Details",
    "Design Debt",
    "Release Learning Loop",
    "Agile UX/UI Portfolio Case",
  ],
  "design-system": [
    "Design System Overview",
    "Foundation Tokens",
    "Color, Typography and Spacing Scales",
    "Component Anatomy",
    "Button and Form Components",
    "States and Interaction Patterns",
    "Accessibility in Design Systems",
    "Figma Components and Variants",
    "Design Tokens to Code",
    "Documentation That Teams Use",
    "Governance and Contribution Model",
    "Adoption and Team Training",
    "Design System Metrics",
    "Managing Component Debt",
    "Design System Portfolio Case",
  ],
  "product-owner": [
    "Product Owner Career Map",
    "Business Goals to Product Outcomes",
    "Backlog, Epic and User Story",
    "Prioritisation with Impact and Effort",
    "Stakeholder Alignment",
    "Agile Sprint Rituals",
    "Requirement Analysis",
    "Banking and Insurance Domain Basics",
    "Product Roadmap",
    "Acceptance Criteria",
    "Release and QA Readiness",
    "Communicating Product Decisions",
  ],
  "product-analytics": [
    "Data Analyst Career Map",
    "Product Analytics Career Map",
    "North Star Metric",
    "Product KPI Tree",
    "Event Tracking Plan",
    "GA4 and Event Taxonomy",
    "SQL Thinking for Product",
    "SQL Select, Filter and Group",
    "Dashboard Design for Decisions",
    "Looker Studio Dashboard Basics",
    "Funnel Analysis",
    "Cohort and Retention",
    "A/B Testing Basics",
    "Experiment Readout",
    "Data Quality Checks",
    "Python Analysis Thinking",
    "Insight Storytelling",
    "Working with Data Engineers",
    "Executive Metrics Readout",
    "Analytics Interview Story Bank",
    "Portfolio Analytics Case Study",
  ],
  "ai-product-workflow": [
    "AI Career Leverage Map",
    "Prompting for Product Thinking",
    "AI Research Assistant Workflow",
    "AI UX Writing Workflow",
    "AI Design Critique Workflow",
    "AI Frontend Prototype Workflow",
    "Design System Memory",
    "AI Output QA Checklist",
    "Safe Use of Company Data",
    "Human Judgment with AI",
    "Shipping a Small AI-assisted Project",
  ],
  "career-portfolio": [
    "High-income Career Skill Map",
    "Portfolio Case Study Structure",
    "Problem, Process and Outcome",
    "Writing Design Rationale",
    "Showing Business Impact",
    "Presenting to Stakeholders",
    "Interview Story Bank",
    "Salary Conversation Preparation",
    "LinkedIn and Resume Evidence",
    "30-day Career Sprint",
  ],
  "cx-communication": [
    "Mastering Communication and CX Overview",
    "Understanding Trusted Customer Experience",
    "Crisis, Confidence and Conversion",
    "Problem Solving and Persuasion Techniques",
    "Crisis Communication and SWAT Case",
    "Customer Satisfaction Metrics: CSAT, Loyalty and Growth",
    "Building High-Impact CX Teams",
    "Customer Ecosystem 360",
    "CX Tools and Frameworks",
    "Voice of Customer System",
    "Service Recovery Playbook",
    "The Art of Communication",
    "Executive CX Storytelling",
    "CX Portfolio and Case Practice",
  ],
  "stock-investing": [
    "Saving vs Investing",
    "Risk and Return",
    "Time Horizon",
    "Emergency Fund",
    "Investor Risk Profile",
    "What is a Stock?",
    "Exchange and Broker",
    "Bid and Offer",
    "Market and Limit Orders",
    "Reading a Business",
    "Financial Statements",
    "Business Risks",
    "Valuation Basics",
    "Diversification",
    "Asset Allocation",
    "Position Sizing",
    "Dollar-cost Averaging",
    "Rebalancing",
    "Behavioural Biases",
    "Scam and Fraud Awareness",
  ],
  "thai-tax-personal-finance": [
    "Tax Fundamentals",
    "Understanding the Tax Year",
    "Income, Expenses, Deductions and Allowances",
    "Withholding Tax Fundamentals",
    "Employment Income",
    "Freelance Income",
    "Business and Rental Income",
    "Interest and Dividend Income",
    "Foreign-sourced Income Overview",
    "Progressive Tax Concept",
    "Tax Withheld vs Tax Payable",
    "P.N.D. 90 and P.N.D. 91 Overview",
    "Filing Documents",
    "Online Filing Workflow",
    "Record Keeping",
    "Freelance Tax Checklist",
    "Common Filing Mistakes",
    "Tax Scam Awareness",
    "When to Consult a Tax Professional",
    "Archived Tax Year Example",
  ],
} as const;

const expandedModules: Record<string, CurriculumModule[]> = Object.fromEntries(
  Object.entries(expandedPathTopics).map(([pathId, topics]) => [
    pathId,
    topics.map((topic, index) => ({
      id: `${pathId}-${slugify(topic)}`,
      number: index + 1,
      titleEn: topic,
      titleTh: `${topic} สำหรับการเรียนรู้แบบใช้งานจริง`,
      descriptionTh: `บทเรียนเรื่อง ${topic} พร้อมคำอธิบายไทย ตัวอย่าง และแบบฝึกหัดที่เกี่ยวข้อง`,
      lessonIds: [`${pathId}-${slugify(topic)}`],
    })),
  ]),
);

const educationalDisclaimer = {
  en: "Educational content only. This is not personalised financial advice or an official tax calculation.",
  th: "เนื้อหานี้ใช้เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการเงินส่วนบุคคลหรือการคำนวณภาษีอย่างเป็นทางการ",
};

const careerDisclaimer = {
  en: "Educational career content only. Salary and role expectations change by company, industry, seniority, portfolio quality, and market timing. This is not a salary guarantee.",
  th: "เนื้อหานี้ใช้เพื่อการเรียนรู้ด้านอาชีพเท่านั้น เงินเดือนและคุณสมบัติเปลี่ยนตามบริษัท อุตสาหกรรม ระดับประสบการณ์ คุณภาพ portfolio และตลาดงาน ไม่ใช่การรับประกันเงินเดือน",
};

const stockVerification: ContentVerification = {
  verificationStatus: "time-sensitive",
  lastVerifiedAt: "2026-07-25",
  officialSourceNames: ["The Securities and Exchange Commission, Thailand (SEC)", "The Stock Exchange of Thailand (SET)"],
  disclaimer: {
    en: "Educational content only. Uses fictional companies and practice portfolios. Not financial advice, not a recommendation, and not a Buy/Sell/Hold rating.",
    th: "เนื้อหานี้ใช้เพื่อการศึกษา ใช้บริษัทสมมติและพอร์ตฝึกหัด ไม่ใช่คำแนะนำการลงทุน ไม่ใช่คำแนะนำซื้อ/ขาย/ถือ",
  },
};

const taxVerification: ContentVerification = {
  jurisdiction: "TH",
  taxYear: 2025,
  lastVerifiedAt: "2026-07-25",
  verificationStatus: "time-sensitive",
  officialSourceNames: ["The Revenue Department of Thailand"],
  disclaimer: {
    en: "Educational content only. Not an official tax calculation. Check current Revenue Department information or consult a tax professional before filing.",
    th: "เนื้อหานี้ใช้เพื่อการศึกษา ไม่ใช่การคำนวณภาษีอย่างเป็นทางการ โปรดตรวจข้อมูลปัจจุบันจากกรมสรรพากรหรือปรึกษาผู้เชี่ยวชาญก่อนยื่นจริง",
  },
};

const archivedTaxVerification: ContentVerification = {
  jurisdiction: "TH",
  taxYear: 2022,
  lastVerifiedAt: "2026-07-25",
  verificationStatus: "archived",
  officialSourceNames: ["The Revenue Department of Thailand"],
  disclaimer: {
    en: "Archived tax-year example for learning only. Do not use this for current filing decisions.",
    th: "ตัวอย่างปีภาษีเก่าสำหรับการเรียนรู้เท่านั้น ห้ามใช้ตัดสินใจยื่นภาษีปีปัจจุบัน",
  },
};

function vocab(id: string, word: string, thaiMeaning: string, simpleDefinition: string, topic: string): VocabularyItem {
  return {
    id,
    word,
    thaiMeaning,
    partOfSpeech: "noun",
    simpleDefinition,
    exampleSentence: `${word} helps a design team make a clearer product decision.`,
    exampleTranslationTh: `${word} ช่วยให้ทีมออกแบบตัดสินใจเกี่ยวกับ product ได้ชัดขึ้น`,
    skill: "UX/UI Design",
    topic,
  };
}

function section(id: string, titleEn: string, bodyTh: string[], bullets?: string[]): LessonSection {
  return { id, titleEn, bodyTh, bullets };
}

function check(question: string, questionTh: string, correct: string, wrongA: string, wrongB: string, explanationTh: string): LessonMiniCheck {
  return {
    question,
    questionTh,
    choices: [
      { id: "a", text: correct, textTh: "ตัวเลือกนี้เชื่อมกับเหตุผลของผู้ใช้และการตัดสินใจจริง" },
      { id: "b", text: wrongA, textTh: "ตัวเลือกนี้ยังผิวเผินหรือเน้นความสวยมากเกินไป" },
      { id: "c", text: wrongB, textTh: "ตัวเลือกนี้ข้ามการทำความเข้าใจปัญหา" },
    ],
    correctChoiceId: "a",
    explanation: "The strongest answer connects the concept to a useful product decision.",
    explanationTh,
  };
}

const seedLessons: Record<string, UxLessonSeed> = {
  "Understand UX, Understand UI": {
    titleEn: "Understand UX, Understand UI",
    titleTh: "เข้าใจ UX และ UI",
    summaryTh: "UX คือประสบการณ์และเหตุผลของการใช้งาน ส่วน UI คือหน้าตาและการโต้ตอบที่ผู้ใช้เห็น",
    professionalLevel: "Beginner",
    estimatedMinutes: 8,
    objectives: ["Explain UX and UI in simple English.", "Separate user experience problems from visual interface problems.", "Use UX/UI language in a design review."],
    sections: [
      section("meaning", "What It Means", [
        "UX หรือ User Experience คือภาพรวมของประสบการณ์ผู้ใช้ ตั้งแต่เขาต้องการอะไร เจอปัญหาอะไร เข้าใจ flow ไหม และทำงานสำเร็จหรือไม่",
        "UI หรือ User Interface คือสิ่งที่ผู้ใช้สัมผัสบนหน้าจอ เช่น ปุ่ม สี ตัวอักษร ระยะห่าง icon และ state ต่าง ๆ",
        "สองอย่างนี้ทำงานร่วมกัน UI ที่สวยแต่ flow สับสนยังไม่ใช่ UX ที่ดี และ UX ที่คิดมาดีแต่ UI อ่านยากก็ยังใช้งานลำบาก",
      ]),
      section("why", "Why It Matters", [
        "เมื่อแยก UX กับ UI ได้ คุณจะอธิบายงานได้แม่นขึ้น เช่น ปัญหานี้ต้องแก้ flow, label, hierarchy หรือ interaction state",
        "ในการทำงานจริง ทีมไม่ได้ต้องการแค่คำว่า “สวยขึ้น” แต่ต้องการเหตุผลว่า design ช่วยให้ผู้ใช้ไปต่อได้อย่างไร",
      ]),
      section("how", "How It Works", [
        "เริ่มจากถามว่า user goal คืออะไร จากนั้นดูว่า flow, information, content และ visual treatment ช่วยหรือขัดขวาง goal นั้น",
        "ถ้าผู้ใช้ไม่รู้จะกดอะไร นั่นอาจเป็น UX + UI problem พร้อมกัน เพราะทั้งลำดับความคิดและการแสดงผลยังไม่ชัด",
      ], ["UX asks: can users complete the goal?", "UI asks: can users see, understand, and interact with the screen clearly?"]),
    ],
    examples: [
      { titleEn: "Checkout Example", bodyTh: "ถ้าผู้ใช้ถึงหน้าจ่ายเงินแล้วเพิ่งรู้ว่าสินค้าหมด ปัญหาหลักคือ UX flow เพราะระบบควรบอกก่อน แต่ UI error state ก็ยังต้องชัดเพื่อช่วย recover" },
    ],
    visualMedia: [
      {
        type: "image",
        titleEn: "UX and UI Relationship",
        descriptionTh: "ภาพนี้ช่วยให้เห็นว่า UX และ UI ซ้อนกันตรงจุดที่ผู้ใช้ทำ action ได้สำเร็จ ไม่ใช่แยกกันคนละโลก",
        src: "/lesson-images/ux-ui-relationship.svg",
        altEn: "A clean diagram showing UX as goals and flow, UI as screen and states, and the overlap as a clear action.",
        altTh: "ไดอะแกรมแสดงความสัมพันธ์ของ UX, UI และจุดร่วมที่ทำให้ผู้ใช้ทำงานสำเร็จ",
        width: 1200,
        height: 760,
        items: ["User goal", "Flow decision", "Interface state", "Successful action"],
      },
    ],
    mistakes: ["Calling every design problem a UI problem.", "Polishing colors before checking whether the flow makes sense."],
    mistakesTh: ["เรียกทุกปัญหาว่า UI ทั้งที่บางอย่างเป็น flow หรือ information problem", "ปรับสีและความสวยก่อนตรวจว่าผู้ใช้เข้าใจทางไปต่อไหม"],
    junior: "Make the screen look modern.",
    senior: "Make the experience clear, then use the interface to support that clarity.",
    juniorTh: "โฟกัสว่าหน้าจอดูทันสมัยหรือยัง",
    seniorTh: "โฟกัสว่าประสบการณ์ชัดไหม แล้วค่อยใช้ UI สนับสนุนความชัดนั้น",
    vocabulary: [
      ["User Experience", "ประสบการณ์รวมของผู้ใช้", "The full experience a user has while trying to complete a goal.", "UX/UI Foundations"],
      ["User Interface", "หน้าจอและส่วนโต้ตอบที่ผู้ใช้เห็น", "The visible and interactive parts of a digital product.", "UX/UI Foundations"],
      ["Interaction State", "สถานะขององค์ประกอบเมื่อผู้ใช้โต้ตอบ", "How an interface element responds to user action.", "UX/UI Foundations"],
    ],
    keyTakeaway: "UX gives the reason. UI makes the reason visible and usable.",
    keyTakeawayTh: "UX คือเหตุผลของประสบการณ์ ส่วน UI ทำให้เหตุผลนั้นมองเห็นและใช้งานได้จริง",
    miniCheck: check("Which statement best separates UX and UI?", "ข้อใดแยก UX และ UI ได้ชัดที่สุด?", "UX focuses on the experience; UI focuses on the interface users see and use.", "UI is always more important because users see it first.", "UX and UI mean exactly the same thing.", "คำตอบที่ดีต้องเห็นว่าทั้งสองเรื่องต่างบทบาทกัน แต่ทำงานร่วมกัน"),
    relatedQuestionIds: ["ux-01", "ux-02", "img-ux-checkout-stock"],
    references: ["Nielsen Norman Group usability principles", "WCAG readability and interaction guidance"],
  },
  "Design Thinking": {
    titleEn: "Design Thinking",
    titleTh: "Design Thinking",
    summaryTh: "Design Thinking คือวิธีคิดแก้ปัญหาโดยเริ่มจากผู้ใช้ ทดลองเร็ว และเรียนรู้จาก feedback",
    professionalLevel: "Beginner",
    estimatedMinutes: 9,
    objectives: ["Name the main design thinking stages.", "Use the process without treating it as a rigid checklist.", "Connect exploration to practical design decisions."],
    sections: [
      section("meaning", "What It Means", ["Design Thinking คือกรอบการทำงานที่ช่วยให้ทีมเข้าใจปัญหา สร้างทางเลือก ทดลอง และปรับจาก feedback", "โดยทั่วไปมักพูดถึง Empathize, Define, Ideate, Prototype และ Test แต่ในการทำงานจริงอาจวนกลับไปกลับมาได้"]),
      section("why", "Why It Matters", ["มันช่วยให้ทีมไม่กระโดดไป solution เร็วเกินไป", "สำหรับ junior designer วิธีนี้ช่วยให้ถามคำถามได้ดีขึ้น และอธิบายได้ว่าทำไมจึงเลือก direction หนึ่ง"]),
      section("how", "How It Works", ["เริ่มจากทำความเข้าใจผู้ใช้ แล้วนิยามปัญหาให้ชัด จากนั้นสร้างไอเดียหลายทาง ทดลองด้วย prototype และ test เพื่อเรียนรู้", "ขั้นตอนสำคัญไม่ใช่จำชื่อ stage แต่คือการใช้ evidence ลดการเดา"]),
    ],
    examples: [{ titleEn: "Booking Flow Example", bodyTh: "ถ้าผู้ใช้จองคลาสไม่ได้ ทีมอาจเริ่มจาก interview และ analytics เพื่อ define ว่าปัญหาอยู่ที่ calendar, pricing หรือ confirmation ไม่ใช่รีบ redesign ทั้งหน้า" }],
    visualMedia: [
      {
        type: "image",
        titleEn: "Design Thinking Loop",
        descriptionTh: "กระบวนการมักวนซ้ำ เพราะ feedback ใหม่อาจทำให้ต้องนิยามปัญหาใหม่ ไม่ใช่เดินเป็นเส้นตรงครั้งเดียวจบ",
        src: "/lesson-images/design-thinking-loop.svg",
        altEn: "A loop diagram of empathize, define, ideate, prototype, and test around learning and improvement.",
        altTh: "ไดอะแกรมวงจร Design Thinking ที่วนจากเข้าใจผู้ใช้ไปจนถึงทดสอบและปรับปรุง",
        width: 1200,
        height: 760,
        items: ["Empathize", "Define", "Ideate", "Prototype", "Test"],
      },
    ],
    mistakes: ["Treating the process as a poster, not a working method.", "Ideating before the problem is clear."],
    mistakesTh: ["ใช้ Design Thinking เป็นคำสวย ๆ แต่ไม่ได้ช่วยตัดสินใจจริง", "คิด solution ก่อนเข้าใจปัญหา"],
    junior: "I followed the five steps, so the design is correct.",
    senior: "I used the process to reduce uncertainty and choose the next useful test.",
    juniorTh: "ทำครบห้าขั้นตอนแล้วจึงคิดว่างานถูกต้อง",
    seniorTh: "ใช้กระบวนการเพื่อลดความไม่แน่ใจและเลือกสิ่งที่ควรทดสอบต่อ",
    vocabulary: [
      ["Prototype", "ต้นแบบสำหรับทดลอง", "A simple version used to test an idea before building fully.", "Design Thinking"],
      ["Iteration", "การปรับซ้ำจาก feedback", "A repeated improvement cycle based on learning.", "Design Thinking"],
    ],
    keyTakeaway: "Design Thinking is useful when it helps the team learn before committing.",
    keyTakeawayTh: "Design Thinking มีคุณค่าเมื่อช่วยให้ทีมเรียนรู้ก่อนตัดสินใจลงทุนทำจริง",
    miniCheck: check("What is the strongest reason to prototype early?", "เหตุผลที่ดีที่สุดในการทำ prototype เร็วคืออะไร?", "To learn whether the idea works before investing too much time.", "To make the design look finished for stakeholders.", "To avoid talking to users.", "Prototype ที่ดีช่วยให้เรียนรู้เร็วและลดความเสี่ยงก่อนสร้างจริง"),
    relatedQuestionIds: ["ux-01", "creative-03"],
    references: ["Design Council Double Diamond", "IDEO human-centered design methods"],
  },
  "Quantitative vs Qualitative Research": {
    titleEn: "Quantitative vs Qualitative Research",
    titleTh: "Quantitative และ Qualitative Research",
    summaryTh: "Quantitative ใช้ข้อมูลตัวเลข ส่วน Qualitative ใช้ข้อมูลเชิงเหตุผล ความรู้สึก และบริบท เช่น interview",
    professionalLevel: "Junior",
    estimatedMinutes: 10,
    objectives: ["Separate quantitative and qualitative methods correctly.", "Explain why interviews are qualitative research.", "Choose a method based on the question you need to answer."],
    sections: [
      section("meaning", "What It Means", ["Quantitative Research คือการวิจัยที่ตอบด้วยตัวเลข เช่น survey scale, analytics, conversion rate, task success rate หรือ behavioral metrics", "Qualitative Research คือการวิจัยที่ช่วยอธิบายเหตุผลและบริบท เช่น user interview, observation, usability test notes และ open-ended feedback", "User Interview โดยทั่วไปเป็น qualitative method ไม่ใช่ quantitative method"]),
      section("why", "Why It Matters", ["ถ้าจัดประเภทผิด ทีมอาจเลือกวิธีผิด เช่น อยากรู้เหตุผลแต่ดูแค่กราฟ หรืออยากวัดขนาดปัญหาแต่คุยกับคนแค่สองคน", "นักออกแบบที่ดีใช้ทั้งสองแบบร่วมกันเพื่อเห็นทั้ง what และ why"]),
      section("how", "How It Works", ["ใช้ quantitative เมื่ออยากรู้ว่าเกิดขึ้นมากแค่ไหน หรือ pattern ใหญ่เป็นอย่างไร", "ใช้ qualitative เมื่ออยากรู้ว่าทำไมผู้ใช้คิด รู้สึก หรือทำแบบนั้น"]),
    ],
    examples: [{ titleEn: "Research Question Example", bodyTh: "ถ้าถามว่า “ผู้ใช้กี่เปอร์เซ็นต์ drop ที่หน้า checkout” ให้ดู analytics ถ้าถามว่า “ทำไมเขาไม่มั่นใจตอน checkout” ให้ใช้ interview หรือ usability testing" }],
    visualMedia: [
      {
        type: "image",
        titleEn: "What vs Why",
        descriptionTh: "ใช้ตัวเลขเพื่อเห็นขนาดของปัญหา และใช้คำพูดหรือพฤติกรรมเพื่อเข้าใจเหตุผลที่อยู่ข้างหลังตัวเลข",
        src: "/lesson-images/research-methods.svg",
        altEn: "A split visual comparing quantitative research as charts and qualitative research as conversation bubbles.",
        altTh: "ภาพเปรียบเทียบ quantitative research เป็นกราฟ และ qualitative research เป็นบทสนทนาเพื่อหาคำอธิบาย",
        width: 1200,
        height: 760,
        items: ["Quantitative: surveys, analytics, metrics", "Qualitative: interviews, observation, usability notes"],
      },
    ],
    mistakes: ["Calling interviews quantitative research.", "Using only one method and pretending it answers every question."],
    mistakesTh: ["จัด interview เป็น quantitative research ซึ่งไม่ถูกต้องโดยทั่วไป", "ใช้ method เดียวแล้วคิดว่าตอบได้ทุกคำถาม"],
    junior: "We interviewed five people, so we have quantitative data.",
    senior: "Interviews gave us qualitative insight; now we can measure how common it is.",
    juniorTh: "คิดว่าคุยกับคน 5 คนแล้วเป็นข้อมูลเชิงปริมาณ",
    seniorTh: "รู้ว่า interview ให้ insight เชิงคุณภาพ แล้ววางแผนวัดต่อว่าปัญหาพบบ่อยแค่ไหน",
    vocabulary: [
      ["Quantitative Research", "การวิจัยเชิงปริมาณ", "Research based on numerical data and measurable patterns.", "UX Research"],
      ["Qualitative Research", "การวิจัยเชิงคุณภาพ", "Research based on behavior, reasons, language, and context.", "UX Research"],
      ["Behavioral Metric", "ตัวชี้วัดจากพฤติกรรม", "A number that describes what users actually do.", "UX Research"],
    ],
    keyTakeaway: "Use numbers to see scale. Use qualitative methods to understand meaning.",
    keyTakeawayTh: "ใช้ตัวเลขเพื่อเห็นขนาดของปัญหา ใช้วิธีเชิงคุณภาพเพื่อเข้าใจความหมายและเหตุผล",
    miniCheck: check("Which method is usually qualitative?", "method ใดโดยทั่วไปเป็น qualitative?", "User Interview", "Conversion rate analysis", "A 1,000-person rating survey", "Interview ช่วยเข้าใจเหตุผลและบริบท จึงจัดเป็น qualitative method โดยทั่วไป"),
    relatedQuestionIds: ["ux-03"],
    references: ["Nielsen Norman Group UX research methods", "Research method selection matrices"],
  },
  "User Interview": {
    titleEn: "User Interview",
    titleTh: "User Interview",
    summaryTh: "User Interview คือการคุยกับผู้ใช้เพื่อเข้าใจเป้าหมาย ปัญหา บริบท และเหตุผลที่อยู่หลังพฤติกรรม",
    professionalLevel: "Junior",
    estimatedMinutes: 10,
    objectives: ["Prepare open-ended interview questions.", "Avoid leading questions.", "Turn interview notes into patterns."],
    sections: [
      section("meaning", "What It Means", ["User Interview คือ qualitative research method ที่ช่วยให้ทีมเข้าใจเรื่องราวและเหตุผลของผู้ใช้", "คำตอบที่ได้ไม่ควรถูกใช้แทนตัวเลขใหญ่ แต่ใช้เพื่อหา insight, language, pain point และ hypothesis"]),
      section("why", "Why It Matters", ["Interview ช่วยให้เห็นสิ่งที่ analytics ไม่บอก เช่น ความไม่มั่นใจ ความกลัว ความเข้าใจผิด หรือบริบทการทำงานจริง", "สำหรับ B1 English learner ให้จำ pattern ง่าย ๆ: Ask about past behavior, not imaginary preference"]),
      section("how", "How It Works", ["ถามจากประสบการณ์จริง เช่น “ครั้งล่าสุดที่คุณ...” แทน “คุณจะใช้ feature นี้ไหม”", "ฟังคำตอบแล้วถาม follow-up เช่น “What happened next?” หรือ “Why was that difficult?”"]),
    ],
    examples: [{ titleEn: "Good Question", bodyTh: "แทนที่จะถามว่า “คุณชอบ dashboard แบบนี้ไหม” ให้ถามว่า “ครั้งล่าสุดที่คุณต้องดูความก้าวหน้าการเรียน คุณมองหาอะไรเป็นอย่างแรก”" }],
    visualMedia: [{ type: "flow", titleEn: "Interview Flow", descriptionTh: "บทสัมภาษณ์ที่ดีค่อย ๆ ไล่จากบริบทไปสู่ปัญหาและตัวอย่างจริง", items: ["Warm-up", "Recent behavior", "Pain point", "Workaround", "Wrap-up"] }],
    mistakes: ["Asking leading questions.", "Treating one strong quote as proof for all users."],
    mistakesTh: ["ถามนำจนผู้ใช้ตอบตามที่เราอยากได้ยิน", "ใช้ quote เดียวเป็นหลักฐานแทนผู้ใช้ทั้งหมด"],
    junior: "Do you like this feature?",
    senior: "Tell me about the last time you tried to solve this problem.",
    juniorTh: "ถามความชอบแบบกว้าง ๆ",
    seniorTh: "ถามเหตุการณ์จริงล่าสุดเพื่อเข้าใจพฤติกรรมและบริบท",
    vocabulary: [
      ["Leading Question", "คำถามนำ", "A question that pushes the participant toward a desired answer.", "User Interview"],
      ["Follow-up Question", "คำถามต่อยอด", "A question asked to clarify or deepen an answer.", "User Interview"],
    ],
    keyTakeaway: "Good interviews explore real behavior, not polite opinions.",
    keyTakeawayTh: "Interview ที่ดีสำรวจพฤติกรรมจริง ไม่ใช่แค่ความคิดเห็นที่ผู้ใช้ตอบให้สุภาพ",
    miniCheck: check("Which interview question is strongest?", "คำถาม interview ใดแข็งแรงที่สุด?", "Tell me about the last time you had this problem.", "Would you use our beautiful new feature?", "Do you agree that this design is easier?", "คำถามที่ดีควรเปิดให้เล่าเหตุการณ์จริงและไม่ชี้นำคำตอบ"),
    relatedQuestionIds: ["ux-03"],
    references: ["User interview moderation guides", "Qualitative research note synthesis"],
  },
  "Persona": {
    titleEn: "Persona",
    titleTh: "Persona",
    summaryTh: "Persona คือภาพแทนกลุ่มผู้ใช้ที่ช่วยให้ทีมจำ goal, behavior และ pain point สำคัญได้ชัดขึ้น",
    professionalLevel: "Junior",
    estimatedMinutes: 8,
    objectives: ["Explain what a persona is for.", "Avoid fake demographic personas.", "Use persona details to guide design decisions."],
    sections: [
      section("meaning", "What It Means", ["Persona ไม่ใช่ตัวละครสวย ๆ ใน slide แต่เป็นเครื่องมือสรุป pattern ของผู้ใช้", "Persona ที่ดีควรมี goal, behavior, pain point, context และ quote ที่สะท้อน insight"]),
      section("why", "Why It Matters", ["ทีมมักคุยกันง่ายขึ้นเมื่อมีผู้ใช้เป้าหมายที่ชัด", "Persona ช่วยป้องกันการออกแบบจากความชอบส่วนตัวของทีม"]),
      section("how", "How It Works", ["สร้างจาก research ไม่ใช่จินตนาการล้วน", "ใช้ persona ถามกลับเวลาตัดสินใจ เช่น feature นี้ช่วย goal ของ persona ไหม หรือเพิ่มภาระให้เขา"]),
    ],
    examples: [{ titleEn: "Learning App Persona", bodyTh: "เช่น “Junior designer ที่ทำงานเต็มเวลา มีเวลาเรียนวันละ 15 นาที ต้องการคำอธิบายไทยแต่ต้องจำศัพท์อังกฤษได้” รายละเอียดนี้ช่วยกำหนด lesson length และ bilingual support" }],
    visualMedia: [{ type: "diagram", titleEn: "Useful Persona Ingredients", descriptionTh: "Persona ควรรวมสิ่งที่มีผลต่อ design decision ไม่ใช่ข้อมูลตกแต่ง", items: ["Goal", "Context", "Pain point", "Behavior", "Motivation"] }],
    mistakes: ["Adding random age and hobbies that do not affect design.", "Creating a persona without research evidence."],
    mistakesTh: ["ใส่อายุ งานอดิเรก หรือรูปภาพที่ไม่ช่วยตัดสินใจ", "สร้าง persona จากการเดาโดยไม่มี evidence"],
    junior: "Our persona is 25 and likes minimal design.",
    senior: "Our persona studies after work and needs short lessons with clear examples.",
    juniorTh: "โฟกัสข้อมูลผิวเผินที่ไม่ช่วยออกแบบ",
    seniorTh: "โฟกัสบริบทและพฤติกรรมที่มีผลต่อ product decision",
    vocabulary: [
      ["Persona", "ภาพแทนกลุ่มผู้ใช้", "A research-informed profile that summarizes a user group.", "Persona"],
      ["Pain Point", "ปัญหาหรือความติดขัดของผู้ใช้", "A difficulty that blocks or frustrates the user.", "Persona"],
    ],
    keyTakeaway: "A persona is useful only when it changes design decisions.",
    keyTakeawayTh: "Persona มีประโยชน์เมื่อมันช่วยให้ทีมตัดสินใจออกแบบต่างจากเดิมอย่างมีเหตุผล",
    miniCheck: check("Which persona detail is most useful for product design?", "รายละเอียด persona แบบใดมีประโยชน์ต่อ product design มากที่สุด?", "The user studies in short sessions after work and forgets new vocabulary easily.", "The user likes blue shirts.", "The user has a random favorite movie.", "ข้อมูลที่ดีต้องมีผลต่อการออกแบบประสบการณ์จริง"),
    relatedQuestionIds: ["ux-03"],
    references: ["Persona research synthesis", "Jobs-to-be-done interview notes"],
  },
  "User Journey Map": {
    titleEn: "User Journey Map",
    titleTh: "User Journey Map",
    summaryTh: "Journey Map แสดงประสบการณ์ของผู้ใช้ตามเวลา ตั้งแต่ก่อนเริ่ม ระหว่างใช้งาน จนถึงหลังจบงาน",
    professionalLevel: "Junior",
    estimatedMinutes: 9,
    objectives: ["Map user stages across time.", "Identify pain points and opportunities.", "Use journey maps to improve product flow."],
    sections: [
      section("meaning", "What It Means", ["User Journey Map คือแผนภาพที่เล่าว่าผู้ใช้ผ่าน stage ใดบ้าง ทำอะไร คิดอะไร รู้สึกอย่างไร และติดตรงไหน", "มันไม่ได้แสดงแค่ screen แต่แสดงประสบการณ์ก่อนและหลัง screen ด้วย"]),
      section("why", "Why It Matters", ["ช่วยให้ทีมเห็นปัญหาที่เกิดก่อนผู้ใช้เข้าหน้าจอ เช่น ความคาดหวังจาก marketing หรือความกลัวก่อนสมัคร", "Journey Map ทำให้ opportunity ชัดขึ้น เพราะเห็นว่าควรช่วยผู้ใช้ที่ stage ไหน"]),
      section("how", "How It Works", ["กำหนด persona และ scenario ก่อน แล้วแบ่ง stage เช่น Discover, Compare, Start, Use, Review", "ในแต่ละ stage ใส่ action, thought, feeling, pain point และ opportunity"]),
    ],
    examples: [{ titleEn: "Learning Journey", bodyTh: "ผู้เรียนอาจเริ่มจากอยากอัปสกิล เห็นบทเรียน เลือก path ทำ quiz ผิด แล้วกลับมา review จุดสำคัญคือระบบควรทำให้ความผิดพลาดรู้สึกปลอดภัยและมีทางไปต่อ" }],
    visualMedia: [{ type: "flow", titleEn: "Journey Stages", descriptionTh: "ดูทั้งก่อน ระหว่าง และหลังใช้งาน เพื่อไม่แก้แค่หน้าจอเดียว", items: ["Discover", "Choose", "Practice", "Review", "Apply"] }],
    mistakes: ["Mapping company process instead of user experience.", "Adding emotions without evidence."],
    mistakesTh: ["วาดขั้นตอนของบริษัทแทนประสบการณ์ของผู้ใช้", "ใส่อารมณ์ของผู้ใช้โดยไม่มีหลักฐาน"],
    junior: "The journey is the same as our app menu.",
    senior: "The journey includes user thoughts before and after each screen.",
    juniorTh: "คิดว่า journey คือเมนูในแอป",
    seniorTh: "เห็น journey เป็นประสบการณ์ตามเวลาที่รวมความคิดและบริบทของผู้ใช้",
    vocabulary: [
      ["Journey Stage", "ช่วงของประสบการณ์ผู้ใช้", "A period in the user's experience over time.", "User Journey"],
      ["Opportunity", "โอกาสในการปรับปรุงประสบการณ์", "A design chance to reduce pain or support the user.", "User Journey"],
    ],
    keyTakeaway: "Journey maps reveal where the experience breaks, not only where screens look weak.",
    keyTakeawayTh: "Journey Map ช่วยให้เห็นว่าประสบการณ์ขาดตรงไหน ไม่ใช่แค่หน้าจอไหนยังไม่สวย",
    miniCheck: check("What should a journey map include?", "Journey Map ควรมีอะไร?", "Stages, user actions, thoughts, pain points, and opportunities.", "Only final UI screens.", "Only business team tasks.", "Journey Map ที่ดีเล่าประสบการณ์ของผู้ใช้ตามเวลา"),
    relatedQuestionIds: ["ux-01", "img-ux-checkout-stock"],
    references: ["Service design journey mapping", "UX research synthesis methods"],
  },
  "Information Architecture, Sitemap and User Flow": {
    titleEn: "Information Architecture, Sitemap and User Flow",
    titleTh: "Information Architecture, Sitemap และ User Flow",
    summaryTh: "IA จัดโครงสร้างข้อมูล Sitemap แสดงหน้าและความสัมพันธ์ ส่วน User Flow แสดงลำดับการกระทำเพื่อไปถึงเป้าหมาย",
    professionalLevel: "Junior",
    estimatedMinutes: 11,
    objectives: ["Explain IA, sitemap, and user flow separately.", "Choose the right tool for a structure problem.", "Improve navigation based on user expectations."],
    sections: [
      section("meaning", "What It Means", ["Information Architecture หรือ IA คือการจัดกลุ่มและตั้งชื่อข้อมูลให้ผู้ใช้หาเจอ", "Sitemap คือภาพรวมของหน้าและลำดับชั้นใน product หรือ website", "User Flow คือเส้นทางการกระทำ เช่น จากเลือกสินค้า ไป cart ไป payment ไป confirmation"]),
      section("why", "Why It Matters", ["ถ้า IA ไม่ดี ผู้ใช้จะไปผิดที่แม้ UI สวย", "ถ้า sitemap ไม่ชัด ทีมอาจสร้างหน้าเกินหรือซ้ำ", "ถ้า user flow ไม่ดี ผู้ใช้อาจเจอ friction หรือ error ช้าเกินไป"]),
      section("how", "How It Works", ["เริ่มจาก content และ task สำคัญ จัดกลุ่มด้วยภาษาที่ผู้ใช้เข้าใจ แล้ววาด sitemap เพื่อเห็นโครงสร้าง", "หลังจากนั้นวาด user flow สำหรับ task สำคัญเพื่อดูว่าผู้ใช้ต้องผ่านขั้นตอนใดบ้าง"]),
    ],
    examples: [{ titleEn: "Invoice Navigation", bodyTh: "ถ้าผู้ใช้หา invoice ใน Settings บ่อย อาจแปลว่า IA ไม่ตรง mental model ควรพิจารณา grouping เช่น Billing > Invoices > Payment methods" }],
    visualMedia: [{ type: "flow", titleEn: "Structure to Flow", descriptionTh: "โครงสร้างและ flow เป็นคนละมุม แต่ต้องต่อกันได้", items: ["Information Architecture", "Sitemap", "User Flow", "Screen decisions"] }],
    mistakes: ["Using sitemap and user flow as the same document.", "Naming sections with internal company language."],
    mistakesTh: ["ใช้ sitemap กับ user flow แทนกันทั้งที่ตอบคนละคำถาม", "ตั้งชื่อหมวดด้วยภาษาภายในบริษัทที่ผู้ใช้ไม่เข้าใจ"],
    junior: "I put everything under Settings because it is easier.",
    senior: "I grouped items by user expectation and task frequency.",
    juniorTh: "รวมทุกอย่างไว้ใต้ Settings เพราะทำง่าย",
    seniorTh: "จัดกลุ่มตามความคาดหวังและความถี่ของ task ผู้ใช้",
    vocabulary: [
      ["Information Architecture", "โครงสร้างข้อมูล", "How information is grouped, named, and organized.", "Product Structure"],
      ["Sitemap", "แผนผังหน้า", "A map of pages and hierarchy.", "Product Structure"],
      ["User Flow", "เส้นทางการทำงานของผู้ใช้", "The steps a user takes to complete a task.", "Product Structure"],
    ],
    keyTakeaway: "IA organizes meaning. Sitemap shows structure. User flow shows action.",
    keyTakeawayTh: "IA จัดความหมาย Sitemap แสดงโครงสร้าง User Flow แสดงลำดับการกระทำ",
    miniCheck: check("Which document best shows steps to complete checkout?", "เอกสารใดเหมาะกับการแสดงขั้นตอน checkout?", "User Flow", "A color palette", "A brand moodboard", "User Flow ใช้ดูขั้นตอนและ decision point ของ task"),
    relatedQuestionIds: ["ux-03", "ux-01"],
    references: ["Card sorting and tree testing", "Navigation design heuristics"],
  },
  "Three Types of Wireframes": {
    titleEn: "Three Types of Wireframes",
    titleTh: "Wireframe สามประเภท",
    summaryTh: "Wireframe มีหลายระดับ ตั้งแต่หยาบเพื่อคิด flow ไปจนละเอียดเพื่อเตรียม UI และ handoff",
    professionalLevel: "Beginner",
    estimatedMinutes: 8,
    objectives: ["Describe low, mid, and high-fidelity wireframes.", "Choose fidelity based on project stage.", "Use wireframes to discuss structure before visual polish."],
    sections: [
      section("meaning", "What It Means", ["Low-fidelity wireframe ใช้คิดเร็ว รายละเอียดน้อย เหมาะกับการทดลองหลายทาง", "Mid-fidelity wireframe เริ่มมี layout, content priority และ interaction คร่าว ๆ", "High-fidelity wireframe ใกล้ UI มากขึ้น แต่ยังเน้น structure และ behavior มากกว่าสี/brand เต็มรูปแบบ"]),
      section("why", "Why It Matters", ["การเลือก fidelity ผิดทำให้เสียเวลา เช่น ทำงานละเอียดเกินไปก่อนรู้ว่า flow ถูกไหม", "Wireframe ช่วยให้ทีมคุยเรื่องลำดับข้อมูลและ task โดยไม่ติดกับความชอบเรื่องสี"]),
      section("how", "How It Works", ["เริ่ม low-fi เพื่อ explore หลายทาง จากนั้นเลือก direction และเพิ่มรายละเอียดเป็น mid-fi", "ใช้ high-fi เมื่อ content, flow และ key state เริ่มนิ่ง"]),
    ],
    examples: [{ titleEn: "Profile Setup", bodyTh: "ถ้ากำลังออกแบบ onboarding ควรเริ่ม low-fi เพื่อทดลองว่าถามข้อมูลกี่ขั้น แล้วค่อยทำ mid-fi เพื่อดู label, input และ progress indicator" }],
    visualMedia: [{ type: "diagram", titleEn: "Wireframe Fidelity", descriptionTh: "ยิ่ง fidelity สูง ยิ่งใช้เวลามาก จึงควรใช้ให้เหมาะกับคำถามที่ต้องตอบ", items: ["Low-fi: idea", "Mid-fi: structure", "High-fi: detailed behavior"] }],
    mistakes: ["Making high-fidelity screens before choosing the flow.", "Using lorem ipsum for important product decisions."],
    mistakesTh: ["ทำหน้าจอละเอียดมากก่อนเลือก flow", "ใช้ lorem ipsum ในจุดที่เนื้อหามีผลต่อ decision"],
    junior: "A wireframe must look beautiful.",
    senior: "A wireframe must answer the right structural question for this stage.",
    juniorTh: "คิดว่า wireframe ต้องสวยก่อน",
    seniorTh: "มองว่า wireframe ต้องตอบคำถามด้านโครงสร้างให้ถูกเวลา",
    vocabulary: [
      ["Low-fidelity", "ความละเอียดต่ำ", "A rough version used for fast exploration.", "Wireframe"],
      ["Fidelity", "ระดับความใกล้เคียงงานจริง", "The level of detail and realism in a design artifact.", "Wireframe"],
    ],
    keyTakeaway: "Wireframe fidelity should match the decision you need to make.",
    keyTakeawayTh: "ระดับความละเอียดของ wireframe ควรตรงกับการตัดสินใจที่ต้องทำในช่วงนั้น",
    miniCheck: check("When is low-fidelity wireframing most useful?", "Low-fidelity wireframe เหมาะที่สุดเมื่อใด?", "When exploring several layout or flow options quickly.", "When preparing final visual design tokens.", "When replacing usability testing.", "Low-fi เหมาะกับการคิดเร็วและเปรียบเทียบหลายทาง"),
    relatedQuestionIds: ["ux-02"],
    references: ["Wireframing fidelity guidance", "Lean UX prototyping methods"],
  },
  "Responsive Design": {
    titleEn: "Responsive Design",
    titleTh: "Responsive Design",
    summaryTh: "Responsive Design คือการออกแบบให้เนื้อหาและ interaction ปรับตัวตามขนาดหน้าจอ โดยยังใช้งานได้ดี",
    professionalLevel: "Junior",
    estimatedMinutes: 9,
    objectives: ["Explain responsive design beyond resizing.", "Plan mobile, tablet, and desktop layouts.", "Avoid layouts that create overflow or unreadable Thai text."],
    sections: [
      section("meaning", "What It Means", ["Responsive Design ไม่ใช่แค่ย่อ desktop ให้เล็กลง แต่คือการจัดลำดับ content, spacing และ interaction ให้เหมาะกับพื้นที่", "บน mobile ควรเป็น single reading column, touch target ชัด และข้อความไทยมี line-height สบายตา"]),
      section("why", "Why It Matters", ["ผู้ใช้เรียนและทำ quiz ได้หลายอุปกรณ์ ถ้า layout ล้นหรือปุ่มเล็กเกินไป การเรียนจะสะดุด", "Responsive ที่ดีช่วยให้ผู้ใช้โฟกัสกับเนื้อหา ไม่ต้องแก้ปัญหาหน้าจอเอง"]),
      section("how", "How It Works", ["คิดเป็น breakpoint และ content priority เช่น desktop มี sidebar ได้ แต่ mobile ควรซ่อนเป็น collapsible contents", "ตรวจ long Thai text, button labels และ navigation เสมอ"]),
    ],
    examples: [{ titleEn: "Lesson Page Example", bodyTh: "บน desktop อาจมีสารบัญข้างซ้ายและ note panel ข้างขวา แต่บน mobile ควรเหลือ column เดียวและให้สารบัญเป็นปุ่มเปิดปิด" }],
    visualMedia: [{ type: "diagram", titleEn: "Responsive Content Priority", descriptionTh: "layout เปลี่ยนได้ แต่ลำดับการเรียนต้องยังชัด", items: ["Mobile: one column", "Tablet: wider cards", "Desktop: reading column + sidebar"] }],
    mistakes: ["Shrinking desktop into mobile without changing structure.", "Testing only English text and missing Thai wrapping issues."],
    mistakesTh: ["ย่อ desktop ลงมือถือโดยไม่จัดโครงสร้างใหม่", "ทดสอบแต่ภาษาอังกฤษจนพลาดปัญหาตัดบรรทัดภาษาไทย"],
    junior: "If it fits on my laptop, it is done.",
    senior: "I test content, controls, and reading rhythm across key widths.",
    juniorTh: "ดูแค่จอ laptop ตัวเอง",
    seniorTh: "ทดสอบเนื้อหา control และจังหวะการอ่านหลายขนาดหน้าจอ",
    vocabulary: [
      ["Breakpoint", "จุดเปลี่ยน layout", "A screen width where layout rules change.", "Responsive Design"],
      ["Touch Target", "พื้นที่กดบนหน้าจอสัมผัส", "The tappable area for an interactive control.", "Responsive Design"],
    ],
    keyTakeaway: "Responsive design protects the learning experience across real devices.",
    keyTakeawayTh: "Responsive design ช่วยรักษาประสบการณ์การเรียนให้ดีบนอุปกรณ์จริง",
    miniCheck: check("What is a strong responsive design decision?", "ข้อใดคือการตัดสินใจ responsive ที่ดี?", "Use one reading column on mobile and move secondary panels below.", "Keep the desktop sidebar squeezed into mobile.", "Reduce all text until it fits.", "mobile ควรจัดลำดับใหม่ให้ใช้งานสบาย ไม่ใช่แค่บีบทุกอย่าง"),
    relatedQuestionIds: ["ux-02", "uxw-04"],
    references: ["Responsive design layout principles", "Mobile touch target guidelines"],
  },
  "Frame, Grid and the 8-Point Rule": {
    titleEn: "Frame, Grid and the 8-Point Rule",
    titleTh: "Frame, Grid และกฎ 8 จุด",
    summaryTh: "Frame คือพื้นที่งาน Grid คือระบบจัดแนว และ 8-Point Rule ช่วยให้ spacing มีจังหวะสม่ำเสมอ",
    professionalLevel: "Junior",
    estimatedMinutes: 12,
    objectives: ["Set up practical Figma layout grids.", "Use the 8-point rule as a starting rhythm.", "Understand that grid values are starting points, not universal rules."],
    sections: [
      section("meaning", "What It Means", ["Frame คือขอบเขตของหน้าจอหรือ component ใน Figma", "Grid ช่วยวาง content ให้เป็นระบบ เช่น column, margin และ gutter", "8-Point Rule คือการใช้ spacing ที่หารด้วย 8 เช่น 8, 16, 24, 32 เพื่อให้ layout มีจังหวะสม่ำเสมอ"]),
      section("why", "Why It Matters", ["Grid ช่วยให้ทีมออกแบบ responsive ได้ง่ายขึ้น เพราะเห็นว่าพื้นที่ content ควรขยายหรือย่ออย่างไร", "แต่ค่า grid ไม่มีสูตรเดียวที่ถูกทุกงาน ต้องปรับตาม content, brand, device และข้อจำกัดจริง"]),
      section("how", "How It Works", ["เริ่มจาก frame size แล้วเลือกจำนวน columns ตามอุปกรณ์ เช่น desktop 12, tablet 8, mobile 4", "margin คือพื้นที่ขอบนอก gutter คือช่องว่างระหว่าง columns", "ค่าด้านล่างเป็น starting points ไม่ใช่ universal rules ให้ใช้เป็นจุดเริ่มแล้วปรับจากงานจริง"]),
    ],
    examples: [{ titleEn: "Figma Setup", bodyTh: "ถ้าทำ landing page desktop อาจเริ่มที่ 12 columns margin 100 gutter 20 แต่ถ้า content แน่นมากอาจลด margin หรือปรับ gutter เพื่อให้ line length อ่านง่าย" }],
    visualMedia: [{ type: "figma-grid-cheat-sheet", titleEn: "Figma Grid Cheat Sheet", descriptionTh: "ค่าเหล่านี้เป็นจุดเริ่มต้นสำหรับลองใน Figma ไม่ใช่กฎตายตัว ต้องปรับตามเนื้อหาและอุปกรณ์จริง" }],
    mistakes: ["Treating a grid preset as a universal law.", "Using spacing values randomly without rhythm."],
    mistakesTh: ["ใช้ preset grid เป็นกฎตายตัวกับทุกงาน", "ใส่ spacing แบบสุ่มจน layout ไม่มีจังหวะ"],
    junior: "I used 12 columns, so the layout is correct.",
    senior: "I used the grid to support content width, rhythm, and responsive behavior.",
    juniorTh: "คิดว่าใช้ 12 columns แล้วถูกเสมอ",
    seniorTh: "ใช้ grid เพื่อช่วยเรื่องความกว้างเนื้อหา จังหวะ และการปรับตามหน้าจอ",
    vocabulary: [
      ["Frame", "พื้นที่งานหรือขอบเขตหน้าจอ", "A design container in Figma.", "Grid"],
      ["Gutter", "ช่องว่างระหว่าง column", "The space between grid columns.", "Grid"],
      ["Margin", "พื้นที่ขอบนอกของ grid", "The outer space between content columns and the frame edge.", "Grid"],
    ],
    keyTakeaway: "Use grids as helpful starting systems, then adjust for real content.",
    keyTakeawayTh: "ใช้ grid เป็นระบบตั้งต้นที่ช่วยจัดงาน แล้วปรับตามเนื้อหาจริงเสมอ",
    miniCheck: check("What is the best way to use the grid values in this lesson?", "ควรใช้ค่า grid ในบทนี้อย่างไร?", "Use them as starting points and adjust for real content.", "Use the same values for every product forever.", "Ignore content length and only follow columns.", "ค่า grid เป็นจุดเริ่ม ไม่ใช่กฎสากล"),
    relatedQuestionIds: ["img-graphic-hierarchy", "ux-02"],
    references: ["Figma layout grid documentation", "8-point spacing systems"],
  },
  "Auto Layout": {
    titleEn: "Auto Layout",
    titleTh: "Auto Layout",
    summaryTh: "Auto Layout ช่วยให้ frame หรือ component ปรับขนาดและ spacing ตาม content ได้เป็นระบบ",
    professionalLevel: "Junior",
    estimatedMinutes: 10,
    objectives: ["Explain what Auto Layout does.", "Use direction, gap, padding, and resizing rules.", "Prepare components that behave predictably."],
    sections: [
      section("meaning", "What It Means", ["Auto Layout คือระบบใน Figma ที่ช่วยจัดวาง item ภายใน frame ตาม direction, gap, padding และ resizing rules", "มันช่วยให้ปุ่ม การ์ด navigation และ list ปรับตัวตามข้อความหรือจำนวน item ได้ดีขึ้น"]),
      section("why", "Why It Matters", ["ถ้า component ไม่ใช้ Auto Layout มักพังเมื่อข้อความยาว โดยเฉพาะภาษาไทยหรือ label สองภาษา", "Auto Layout ทำให้ handoff กับ developer ชัดขึ้น เพราะ layout behavior มีเหตุผลมากกว่าแค่ตำแหน่งแบบ absolute"]),
      section("how", "How It Works", ["กำหนด direction เป็น horizontal หรือ vertical แล้วตั้ง gap และ padding", "เลือก resizing เช่น hug contents, fixed width หรือ fill container ให้ตรงกับ behavior ที่ต้องการ"]),
    ],
    examples: [{ titleEn: "Button Example", bodyTh: "ปุ่มที่มี icon + text ควรใช้ Auto Layout พร้อม gap 8 และ padding แนวนอน เช่น 16 หรือ 20 เพื่อให้ label ยาวขึ้นแล้วยังสมดุล" }],
    visualMedia: [{ type: "diagram", titleEn: "Auto Layout Controls", descriptionTh: "คิด Auto Layout เป็นกติกาการจัดวาง ไม่ใช่แค่ปุ่มลัดใน Figma", items: ["Direction", "Gap", "Padding", "Resizing", "Alignment"] }],
    mistakes: ["Using fixed frames for text-heavy components.", "Ignoring Thai text expansion."],
    mistakesTh: ["ใช้ frame fixed กับ component ที่ข้อความเปลี่ยนเยอะ", "ไม่เผื่อข้อความไทยที่ยาวกว่าอังกฤษ"],
    junior: "I manually moved each item until it looked right.",
    senior: "I defined layout rules so the component survives real content.",
    juniorTh: "เลื่อน item ทีละชิ้นจนดูพอดี",
    seniorTh: "ตั้งกติกา layout ให้ component รองรับข้อมูลจริงได้",
    vocabulary: [
      ["Hug Contents", "ขนาดพอดีกับเนื้อหา", "A resizing behavior where the frame fits its content.", "Auto Layout"],
      ["Fill Container", "ขยายเต็มพื้นที่ container", "A resizing behavior where an item uses available space.", "Auto Layout"],
    ],
    keyTakeaway: "Auto Layout turns visual placement into reusable behavior.",
    keyTakeawayTh: "Auto Layout เปลี่ยนการวางของให้กลายเป็น behavior ที่นำกลับมาใช้ซ้ำได้",
    miniCheck: check("Why is Auto Layout useful for bilingual UI?", "ทำไม Auto Layout มีประโยชน์กับ UI สองภาษา?", "It helps components adapt when text length changes.", "It automatically writes better Thai copy.", "It replaces usability testing.", "ข้อความสองภาษามีความยาวต่างกัน Auto Layout จึงช่วยให้ component ปรับตัวได้"),
    relatedQuestionIds: ["uxw-04", "ux-02"],
    references: ["Figma Auto Layout documentation", "Component responsive behavior patterns"],
  },
  "Working with Developers": {
    titleEn: "Working with Developers",
    titleTh: "การทำงานกับ Developer",
    summaryTh: "การทำงานกับ developer ที่ดีคือการส่งต่อเหตุผล state และข้อจำกัดให้ชัด ไม่ใช่ส่งภาพสวยอย่างเดียว",
    professionalLevel: "Junior",
    estimatedMinutes: 11,
    objectives: ["Prepare design details developers need.", "Explain states and responsive behavior clearly.", "Collaborate without treating handoff as the end of design."],
    sections: [
      section("meaning", "What It Means", ["Designer และ developer ร่วมกันสร้าง product จริง Designer ต้องอธิบาย behavior, edge cases, content rules และ priority ให้ชัด", "Developer ไม่ได้ต้องการแค่ mockup แต่ต้องรู้ว่าเมื่อ loading, error, empty, long text และ mobile เกิดขึ้น หน้าจอควรทำอะไร"]),
      section("why", "Why It Matters", ["Handoff ที่ไม่ชัดทำให้งานจริงผิดจาก design หรือเกิดคำถามซ้ำระหว่าง build", "การคุยกับ developer เร็วช่วยเจอข้อจำกัด เช่น data ยังไม่มี, component ใช้ซ้ำได้ไหม หรือ animation หนักเกินไปไหม"]),
      section("how", "How It Works", ["เตรียม component states, responsive rules, copy, spacing tokens และ interaction notes", "ใช้ภาษาง่าย เช่น “ถ้าข้อความยาว ให้ wrap 2 lines แล้ว truncate ต่อ” แทนคำกว้าง ๆ ว่า “ทำให้สวย”"]),
    ],
    examples: [{ titleEn: "Handoff Note Example", bodyTh: "สำหรับ quiz answer card ให้ระบุ default, selected, correct, incorrect, disabled และ focus state พร้อมตัวอย่างข้อความไทยยาว เพื่อให้ developer ทดสอบ layout ได้จริง" }],
    visualMedia: [{ type: "flow", titleEn: "Design to Build Flow", descriptionTh: "handoff ที่ดีเป็นบทสนทนาต่อเนื่อง ไม่ใช่ส่งไฟล์แล้วจบ", items: ["Design intent", "States", "Responsive rules", "Edge cases", "QA feedback"] }],
    mistakes: ["Only sending a beautiful final frame.", "Forgetting loading, empty, error, and long text states."],
    mistakesTh: ["ส่งแต่ frame สวย ๆ โดยไม่อธิบาย behavior", "ลืม state สำคัญและข้อความยาว"],
    junior: "The developer can inspect the file and guess the rest.",
    senior: "I document the important behavior and discuss trade-offs early.",
    juniorTh: "คิดว่า developer ดูไฟล์แล้วเดาเองได้",
    seniorTh: "บันทึก behavior สำคัญและคุย trade-off ตั้งแต่เนิ่น ๆ",
    vocabulary: [
      ["Design Handoff", "การส่งต่องานออกแบบให้ทีมพัฒนา", "The process of sharing design intent, specs, and behavior for implementation.", "Developer Collaboration"],
      ["Edge Case", "กรณีพิเศษที่อาจทำให้ UI พัง", "A less common situation the product still needs to handle.", "Developer Collaboration"],
      ["State", "สถานะของ UI", "A condition of the interface such as loading, selected, error, or disabled.", "Developer Collaboration"],
    ],
    keyTakeaway: "Good handoff explains behavior, not only appearance.",
    keyTakeawayTh: "handoff ที่ดีอธิบายพฤติกรรมของหน้าจอ ไม่ใช่แค่หน้าตา",
    miniCheck: check("What should a designer include for a developer handoff?", "Designer ควรใส่อะไรใน handoff ให้ developer?", "States, responsive rules, content examples, and interaction notes.", "Only a final screenshot.", "Only color inspiration.", "Developer ต้องการข้อมูลที่ช่วยสร้าง product จริงและทดสอบ edge case ได้"),
    relatedQuestionIds: ["ux-02", "uxw-04"],
    references: ["Design QA checklists", "Component state documentation"],
  },
};

seedLessons["Quantitative Research"] = seedLessons["Quantitative vs Qualitative Research"];
seedLessons["Qualitative Research"] = seedLessons["Quantitative vs Qualitative Research"];
seedLessons["Information Architecture"] = seedLessons["Information Architecture, Sitemap and User Flow"];
seedLessons["Sitemap"] = seedLessons["Information Architecture, Sitemap and User Flow"];
seedLessons["User Flow"] = seedLessons["Information Architecture, Sitemap and User Flow"];

function makePlaceholderContent(title: string, moduleTitle: string): Pick<
  UxLessonSeed,
  "summaryTh" | "professionalLevel" | "estimatedMinutes" | "objectives" | "sections" | "examples" | "visualMedia" | "mistakes" | "mistakesTh" | "junior" | "senior" | "juniorTh" | "seniorTh" | "vocabulary" | "keyTakeaway" | "keyTakeawayTh" | "miniCheck" | "relatedQuestionIds" | "references"
> {
  if (title === "Capstone Project Flow") {
    return {
      summaryTh: "Capstone Mission เชื่อมทุกทักษะจาก research ไปจนถึง portfolio case study เป็น project flow เดียว",
      professionalLevel: "Junior",
      estimatedMinutes: 12,
      objectives: ["Connect the full UX/UI process.", "Prepare a project story for presentation.", "Turn process evidence into a portfolio case study."],
      sections: [
        section("capstone-flow", "Connected Project Flow", [
          "โปรเจกต์สรุปนี้เริ่มจาก research แล้วค่อย define problem, สร้าง persona, วาด journey, จัด sitemap และ user flow",
          "หลังจากนั้นจึงทำ wireframe, responsive UI, components, prototype, usability test, developer handoff, presentation และ portfolio case study",
          "เป้าหมายไม่ใช่ทำทุก deliverable ให้เยอะที่สุด แต่ทำให้ทุกชิ้นเชื่อมกันด้วยเหตุผลเดียวกัน",
        ]),
      ],
      examples: [{ titleEn: "Portfolio Story", bodyTh: "ใน case study ให้เล่าว่า insight จาก research เปลี่ยน user flow อย่างไร แล้ว component และ responsive UI สนับสนุน flow นั้นอย่างไร" }],
      visualMedia: [{ type: "flow", titleEn: "Capstone Mission Flow", descriptionTh: "ใช้ flow นี้เป็นแกนของ project ตั้งแต่ต้นจนถึง portfolio", items: ["Research", "Define the problem", "Persona", "User Journey", "Sitemap", "User Flow", "Wireframe", "Responsive UI", "Components", "Prototype", "Usability Test", "Developer Handoff", "Presentation", "Portfolio Case Study"] }],
      mistakes: ["Showing final screens without explaining how decisions were made."],
      mistakesTh: ["โชว์หน้าจอสุดท้ายโดยไม่เล่าว่า decision เกิดจากอะไร"],
      junior: "I show every artifact I made.",
      senior: "I show the evidence and decisions that shaped the solution.",
      juniorTh: "โชว์ทุกไฟล์ที่ทำ",
      seniorTh: "เล่าหลักฐานและ decision ที่ทำให้ solution ดีขึ้น",
      vocabulary: [["Case Study", "เรื่องเล่าโปรเจกต์ที่อธิบายปัญหา กระบวนการ และผลลัพธ์", "A structured story of a design project.", "Capstone Mission"]],
      keyTakeaway: "A strong capstone connects research, decisions, design, testing, handoff, and portfolio storytelling.",
      keyTakeawayTh: "Capstone ที่ดีเชื่อม research, decision, design, testing, handoff และ portfolio story เข้าด้วยกัน",
      miniCheck: check("What makes a capstone case study stronger?", "อะไรทำให้ capstone case study แข็งแรงขึ้น?", "Showing how evidence changed design decisions.", "Showing only polished final screens.", "Adding more pages without explaining why.", "case study ที่ดีต้องเล่าเหตุผลและผลของ decision"),
      relatedQuestionIds: ["ux-01", "ux-02", "ux-03"],
      references: ["UX case study structure", "Portfolio presentation critique checklist"],
    };
  }
  return {
    summaryTh: `${title} คือหัวข้อสำคัญใน ${moduleTitle} ที่ช่วยให้ผู้เรียนตัดสินใจและอธิบายงาน UX/UI ได้เป็นระบบมากขึ้น`,
    professionalLevel: "Junior",
    estimatedMinutes: 7,
    objectives: [`Understand the role of ${title}.`, "Connect the topic to a real UX/UI workflow.", "Use the concept in a focused practice activity."],
    sections: [
      section("what-it-means", "What It Means", [
        `${title} คือทักษะหรือแนวคิดที่ช่วยให้ทีมออกแบบมองเห็นโครงสร้าง เหตุผล และผลกระทบของงานได้ชัดขึ้น`,
        `ในบริบทของ ${moduleTitle} หัวข้อนี้ไม่ได้มีไว้จำศัพท์ แต่มีไว้ช่วยเลือกวิธีทำงานที่เหมาะกับปัญหาและข้อจำกัดจริง`,
      ]),
      section("how-to-use-it", "How To Use It", [
        "เริ่มจากระบุเป้าหมายของผู้ใช้หรือทีมก่อน จากนั้นใช้หัวข้อนี้เป็นเครื่องมือถามว่าอะไรควรชัดขึ้น ลดความเสี่ยงตรงไหน และต้องสื่อสารอะไรต่อ",
        "เวลานำไปใช้ในการทำงาน ให้เขียน decision, reason และ expected outcome สั้น ๆ เพื่อให้คนอื่นตรวจทานได้",
      ]),
      section("what-to-check", "What To Check", [
        "ตรวจว่าคุณไม่ได้ใช้คำศัพท์นี้แบบลอย ๆ แต่เชื่อมกับ user goal, content, layout, interaction หรือ handoff จริง",
        "ถ้ายังอธิบายไม่ได้ว่าหัวข้อนี้ช่วยตัดสินใจอะไร ให้กลับไปดูตัวอย่างและลองเขียนสถานการณ์งานจริงหนึ่งประโยค",
      ]),
    ],
    examples: [{ titleEn: "Workplace Example", bodyTh: `ในการรีวิวงาน สามารถใช้ ${title} เพื่ออธิบายว่า decision นี้ช่วยผู้ใช้หรือทีมอย่างไร เช่น ลดความสับสน ทำให้ flow ชัดขึ้น หรือทำให้ developer build ได้แม่นขึ้น` }],
    visualMedia: [{ type: "flow", titleEn: "Decision Flow", descriptionTh: "อ่านจากซ้ายไปขวาเพื่อเชื่อม concept กับการตัดสินใจจริง", items: ["Context", "User goal", title, "Decision", "Outcome"] }],
    mistakes: ["Treating the topic as a vocabulary word instead of a working skill."],
    mistakesTh: ["จำหัวข้อเป็นคำศัพท์ แต่ยังไม่เชื่อมกับการทำงานจริง"],
    junior: "I know the term.",
    senior: "I know when and why to use the method.",
    juniorTh: "รู้จักคำศัพท์",
    seniorTh: "รู้ว่าใช้เมื่อไรและเพื่อแก้ปัญหาอะไร",
    vocabulary: [[title, `คำศัพท์หลักของบท ${title}`, `A professional UX/UI concept in ${moduleTitle}.`, moduleTitle]],
    keyTakeaway: `${title} becomes useful when it supports a clear design decision.`,
    keyTakeawayTh: `${title} จะมีประโยชน์เมื่อช่วยให้ตัดสินใจออกแบบได้ชัดขึ้น`,
    miniCheck: check(`What is the best way to study ${title}?`, `ควรเรียน ${title} อย่างไรให้ใช้ได้จริง?`, "Connect it to a real design decision.", "Memorize the word only.", "Skip examples and practice.", "การเรียน UX/UI ควรเชื่อมกับ decision และตัวอย่างจริง"),
    relatedQuestionIds: ["ux-01", "ux-02", "ux-03"],
    references: ["Supreya Atipongchai curriculum roadmap"],
  };
}

seedLessons["Capstone Project Flow"] = {
  titleEn: "Capstone Project Flow",
  titleTh: "โปรเจกต์สรุปหลักสูตร",
  ...makePlaceholderContent("Capstone Project Flow", "Capstone Mission"),
};

function makeUxLesson(module: (typeof uxModulesBase)[number], moduleIndex: number, title: string, lessonIndex: number, absoluteIndex: number): LearningLesson {
  const seed = seedLessons[title];
  const placeholder = false;
  const content = seed ?? {
    titleEn: title,
    titleTh: `${title} สำหรับงาน UX/UI`,
    ...makePlaceholderContent(title, module.titleEn),
  };
  const id = lessonId(module.id, title);
  const slug = slugify(title);
  const terminology = content.vocabulary.map(([word, thaiMeaning, definition, topic], index) =>
    vocab(`${id}-vocab-${index + 1}`, word, thaiMeaning, definition, topic),
  );

  return {
    id,
    slug,
    moduleId: module.id,
    learningPathId: "ux-ui",
    number: absoluteIndex,
    title,
    titleEn: content.titleEn,
    titleTh: content.titleTh,
    description: content.sections[0]?.bodyTh[0] ?? content.summaryTh,
    summaryTh: content.summaryTh,
    difficulty: content.professionalLevel,
    professionalLevel: content.professionalLevel,
    readingMinutes: content.estimatedMinutes,
    estimatedMinutes: content.estimatedMinutes,
    relatedTopic: title,
    hasPractice: true,
    introductionTh: content.summaryTh,
    objectives: content.objectives,
    sections: content.sections,
    practicalExamples: content.examples,
    visualMedia: content.visualMedia,
    commonMistakes: content.mistakes,
    commonMistakesTh: content.mistakesTh,
    juniorThinking: content.junior,
    seniorThinking: content.senior,
    juniorVsSenior: {
      junior: content.junior,
      senior: content.senior,
      juniorTh: content.juniorTh,
      seniorTh: content.seniorTh,
    },
    explanation: content.sections.map((item) => `${item.titleEn}: ${item.bodyTh.join(" ")}`).join("\n\n"),
    explanationTh: content.sections.map((item) => item.bodyTh.join(" ")).join("\n\n"),
    terminology,
    vocabulary: terminology,
    workplaceExample: content.examples[0]?.bodyTh ?? content.summaryTh,
    workplaceExampleTh: content.examples[0]?.bodyTh ?? content.summaryTh,
    diagram: content.visualMedia?.[0]?.items,
    keyTakeaway: content.keyTakeaway,
    keyTakeawayTh: content.keyTakeawayTh,
    miniCheck: content.miniCheck,
    miniKnowledgeCheck: content.miniCheck,
    relatedQuestionIds: content.relatedQuestionIds,
    references: content.references,
    completionStatus: "ready-for-practice",
    personalNoteEnabled: true,
    placeholder,
  };
}

const uxLessons = uxModulesBase.flatMap((module, moduleIndex) => {
  const previousCount = uxModulesBase.slice(0, moduleIndex).reduce((sum, item) => sum + item.lessons.length, 0);
  return module.lessons.map((title, lessonIndex) => makeUxLesson(module, moduleIndex, title, lessonIndex, previousCount + lessonIndex + 1));
});

const pathChapterTitles: Record<string, string[]> = {
  "product-design": ["Product Outcomes", "Problem Framing", "Prioritization", "Trade-offs", "Product Metrics"],
  "creative-thinking": ["Insight to Idea", "Divergent Thinking", "Concept Selection", "Idea Critique", "Creative Rationale"],
  "art-direction": ["Mood and Tone", "Visual References", "Composition", "Campaign System", "Creative Consistency"],
  "ux-writing": ["Button Labels", "Error Messages", "Empty States", "Microcopy Tone", "Content Patterns"],
  "graphic-design": ["Layout Basics", "Typography", "Composition", "Color Contrast", "Visual Hierarchy"],
  "english-work": ["Clear Updates", "Meeting Language", "Email Tone", "Giving Feedback", "Explaining Decisions"],
  ielts: ["Task 1 Overview", "Task 2 Position", "Reading Keywords", "Listening Distractors", "Speaking Examples"],
  communication: ["Concise Updates", "Active Listening", "Tone Control", "Stakeholder Alignment", "Difficult Messages"],
  "critical-thinking": ["Assumptions", "Evidence Quality", "Root Cause", "Decision Criteria", "Argument Structure"],
};

const pathLessonGuides: Record<
  string,
  {
    focus: string;
    outcome: string;
    practice: string;
    mistake: string;
    vocab: string;
    visualItems: string[];
  }
> = {
  "product-design": {
    focus: "เชื่อม user need, business goal และ product constraint เพื่อเลือกสิ่งที่ควรทำก่อน",
    outcome: "อธิบายได้ว่า design decision หนึ่งช่วย product outcome อะไรและ trade-off คืออะไร",
    practice: "เขียน problem, user segment, success metric และ decision ที่เลือกในรูปแบบสั้น ๆ ก่อนเสนอทีม",
    mistake: "เริ่มจาก feature หรือหน้าจอทันที โดยยังไม่ชัดว่าผลลัพธ์ที่ต้องการคืออะไร",
    vocab: "Product Decision",
    visualItems: ["User need", "Business goal", "Constraint", "Trade-off", "Outcome"],
  },
  "creative-thinking": {
    focus: "เปลี่ยน insight ให้เป็น concept ที่ชัด มีเหตุผล และมีมุมมองสร้างสรรค์ที่ต่อยอดได้",
    outcome: "เล่าได้ว่า idea มาจาก insight อะไร ไม่ใช่แค่รู้สึกว่าน่าสนใจ",
    practice: "เริ่มจาก observation แล้วเขียน insight, tension, concept และ reason เป็นลำดับ",
    mistake: "เลือก idea ที่ดูแปลกที่สุด แต่ไม่เชื่อมกับปัญหาหรือความรู้สึกของผู้ใช้",
    vocab: "Creative Concept",
    visualItems: ["Observation", "Insight", "Tension", "Concept", "Rationale"],
  },
  "art-direction": {
    focus: "จัด mood, tone, composition, reference และ visual system ให้สื่อสารทิศทางเดียวกัน",
    outcome: "อธิบายได้ว่างานภาพควรรู้สึกอย่างไรและทำไม visual choice นั้นจึงเหมาะกับโจทย์",
    practice: "เลือก reference 3 ชิ้น แล้วแยก color, composition, type, material และ emotion ก่อนทำ direction",
    mistake: "รวมภาพสวยจำนวนมากโดยไม่มีเกณฑ์ว่าอะไรใช่หรือไม่ใช่ direction",
    vocab: "Visual Direction",
    visualItems: ["Mood", "Reference", "Composition", "System", "Consistency"],
  },
  "ux-writing": {
    focus: "เขียนข้อความใน interface ให้ผู้ใช้รู้ว่าเกิดอะไรขึ้น ต้องทำอะไรต่อ และรู้สึกมั่นใจ",
    outcome: "เลือกคำที่ชัด เฉพาะเจาะจง และเหมาะกับสถานการณ์ของผู้ใช้",
    practice: "เขียน copy แบบ action + object + result เช่น Save changes, Try again, View details",
    mistake: "ใช้คำกว้าง ๆ เช่น Submit, Confirm หรือ Continue โดยไม่บอกผลลัพธ์หลังคลิก",
    vocab: "Interface Copy",
    visualItems: ["User context", "Action", "Object", "Result", "Tone"],
  },
  "graphic-design": {
    focus: "จัด layout, typography, spacing, contrast และ hierarchy ให้ผู้อ่านสแกนสารสำคัญได้เร็ว",
    outcome: "มองงานภาพแล้วอธิบายได้ว่าอะไรควรเด่นก่อน หลัง และเพราะอะไร",
    practice: "ตรวจ size, weight, alignment, whitespace และ contrast ก่อนเพิ่ม decoration",
    mistake: "ทำทุกอย่างให้เด่นพร้อมกันจน hierarchy หาย",
    vocab: "Visual Hierarchy",
    visualItems: ["Content", "Hierarchy", "Grid", "Contrast", "Clarity"],
  },
  "english-work": {
    focus: "สื่อสารภาษาอังกฤษในที่ทำงานให้ชัด สุภาพ กระชับ และ actionable",
    outcome: "เขียน update, email, feedback หรือเหตุผลของ decision ให้คนอ่านรู้สถานะ งานต่อไป และสิ่งที่ต้องการจากเขา",
    practice: "ใช้โครง Context + Status + Action + Next step เช่น “Quick update: the draft is ready. I need feedback on the flow by Friday.”",
    mistake: "เขียนยาวแต่ไม่บอกสถานะ สิ่งที่ต้องการ หรือ deadline ที่ชัดเจน",
    vocab: "Workplace Clarity",
    visualItems: ["Context", "Status", "Action", "Owner", "Next step"],
  },
  ielts: {
    focus: "ฝึก strategy สำหรับข้อสอบ IELTS โดยแยก task type, keyword, structure และ time control",
    outcome: "ตอบได้เป็นระบบมากขึ้น โดยรู้ว่าข้อสอบกำลังวัดทักษะอะไร",
    practice: "อ่านโจทย์ก่อนหา keyword, วาง structure สั้น ๆ แล้วค่อยตอบเพื่อไม่หลุดประเด็น",
    mistake: "รีบตอบจากคำที่คุ้น โดยไม่ดู requirement ของ task หรือ distractor",
    vocab: "Exam Strategy",
    visualItems: ["Task", "Keywords", "Structure", "Time", "Review"],
  },
  communication: {
    focus: "ทำให้การสื่อสารกับทีมชัดขึ้นผ่าน context, tone, listening และ alignment",
    outcome: "พูดหรือเขียนแล้วอีกฝ่ายรู้ว่าประเด็นคืออะไร ต้องตัดสินใจอะไร และจะไปต่ออย่างไร",
    practice: "เริ่มด้วย main point หนึ่งประโยค แล้วตามด้วย reason, evidence และ ask ที่ชัดเจน",
    mistake: "พูดรายละเอียดเยอะ แต่ไม่บอกว่าอยากให้ผู้ฟังช่วยตัดสินใจหรือทำอะไร",
    vocab: "Alignment",
    visualItems: ["Main point", "Reason", "Evidence", "Ask", "Agreement"],
  },
  "critical-thinking": {
    focus: "ประเมินสมมติฐาน หลักฐาน เหตุผล และเกณฑ์การตัดสินใจก่อนสรุป",
    outcome: "แยกได้ว่าอะไรคือ fact, assumption, interpretation และ decision",
    practice: "ถามว่าเรารู้อะไรจริง ยังเดาอะไรอยู่ และหลักฐานแบบไหนจะเปลี่ยน decision",
    mistake: "เลือกคำตอบที่ถูกใจเร็วเกินไปโดยยังไม่ตรวจคุณภาพหลักฐาน",
    vocab: "Reasoning",
    visualItems: ["Question", "Evidence", "Assumption", "Criteria", "Decision"],
  },
};

function guideForPath(path: LearningPath) {
  return pathLessonGuides[path.id] ?? {
    focus: `เข้าใจ ${path.name} ผ่านสถานการณ์ทำงานจริง`,
    outcome: "อธิบาย concept เป็นภาษาง่ายและใช้ตัดสินใจได้",
    practice: "เขียน context, decision และ reason ก่อนทำแบบฝึกหัด",
    mistake: "จำคำศัพท์โดยไม่เชื่อมกับสถานการณ์จริง",
    vocab: path.name,
    visualItems: ["Context", "Concept", "Decision", "Example", "Practice"],
  };
}

const specificLessonCopy: Record<string, Partial<ReturnType<typeof guideForPath>>> = {
  "english-work:Clear Updates": {
    focus: "เขียน status update ภาษาอังกฤษให้คนอ่านเข้าใจเร็วว่าเสร็จแล้ว ติดอะไร และต้องการอะไรต่อ",
    outcome: "อัปเดตงานได้แบบสั้น สุภาพ และมี next step ชัดเจน",
    practice: "ใช้โครง: Quick update + current status + blocker/decision needed + deadline",
    mistake: "บอกแค่ว่า “I’m working on it” โดยไม่บอกความคืบหน้า ความเสี่ยง หรือเวลาที่จะส่งต่อ",
    vocab: "Status Update",
    visualItems: ["Quick update", "Progress", "Blocker", "Decision needed", "Next step"],
  },
  "english-work:Meeting Language": {
    focus: "ใช้ภาษาอังกฤษใน meeting เพื่อขอ clarification, เสนอความเห็น และสรุป action item ได้อย่างมั่นใจ",
    outcome: "พูดสั้นและสุภาพโดยไม่หลุดจากประเด็นการประชุม",
    practice: "เตรียม phrase เช่น “Could you clarify…?”, “My concern is…”, “The next action is…”",
    mistake: "เงียบเมื่อไม่เข้าใจ เพราะกลัวถามผิด ทำให้ action item หลังประชุมไม่ชัด",
    vocab: "Meeting Phrase",
    visualItems: ["Clarify", "Suggest", "Concern", "Decision", "Action item"],
  },
  "english-work:Email Tone": {
    focus: "เลือก tone อีเมลให้สุภาพ ชัด และเหมาะกับความเร่งด่วน",
    outcome: "เขียนอีเมลที่มี subject, context, request และ deadline ครบ",
    practice: "ใช้โครง Subject + why it matters + what I need + by when",
    mistake: "เขียนสุภาพมากจน request ไม่ชัด หรือสั้นเกินไปจนดูแข็ง",
    vocab: "Email Tone",
    visualItems: ["Subject", "Context", "Request", "Deadline", "Thanks"],
  },
};

function makePathLesson(path: LearningPath, title: string, index: number): LearningLesson {
  const slug = slugify(title);
  const topic = title;
  const id = `${path.id}-${slug}`;
  const guide = { ...guideForPath(path), ...specificLessonCopy[`${path.id}:${title}`] };
  const terminology = [
    vocab(`${id}-concept`, guide.vocab, `คำศัพท์หลักเรื่อง ${guide.vocab}`, `A practical concept used in ${path.name}.`, topic),
    vocab(`${id}-pattern`, "Next step", "ขั้นตอนต่อไปที่ชัดเจน", "The action someone should take after reading or listening.", topic),
  ];

  return {
    id,
    slug,
    learningPathId: path.id,
    number: index + 1,
    title,
    titleEn: title,
    titleTh: `${title} สำหรับการทำงานจริง`,
    description: guide.focus,
    summaryTh: guide.focus,
    difficulty: index < 3 ? path.currentLevel : "Junior",
    professionalLevel: index < 3 ? path.currentLevel : "Junior",
    readingMinutes: 7,
    estimatedMinutes: 7,
    relatedTopic: topic,
    hasPractice: true,
    introductionTh: guide.focus,
    objectives: [`Explain ${title} in simple English.`, "Apply the lesson to a realistic workplace situation.", "Write one clearer sentence, decision, or next step."],
    sections: [
      section("what-it-means", "What It Means", [
        `${title} ในสาย ${path.name} คือทักษะที่ช่วยให้การทำงานชัดขึ้น ไม่ใช่แค่คำศัพท์ที่ต้องจำ`,
        guide.focus,
      ]),
      section("why-it-matters", "Why It Matters", [
        guide.outcome,
        "ในการทำงานจริง ความชัดเจนช่วยลดการถามซ้ำ ลดการตัดสินใจผิด และทำให้ทีมเดินต่อได้เร็วขึ้น",
      ]),
      section("how-to-use-it", "How To Use It", [
        guide.practice,
        "หลังเขียนหรือพูดเสร็จ ให้ตรวจว่าคนอ่านรู้ context, decision, owner และ next step หรือยัง",
      ]),
    ],
    practicalExamples: [{ titleEn: "Workplace Example", bodyTh: `สถานการณ์ฝึก: คุณต้องใช้ ${title} เพื่ออธิบายงานให้ทีมเข้าใจเร็วขึ้น ลองเขียนเป็น 2 ประโยค: ประโยคแรกบอก context และประโยคที่สองบอก next step ที่ต้องการ` }],
    visualMedia: [{ type: "flow", titleEn: "Workplace Thinking Flow", descriptionTh: "ใช้ flow นี้ตรวจว่าบทเรียนถูกนำไปใช้กับงานจริงครบหรือยัง", items: guide.visualItems }],
    explanation: `${title} helps make ${path.name} decisions clearer and easier to act on.`,
    explanationTh: guide.focus,
    terminology,
    vocabulary: terminology,
    workplaceExample: `Use ${title} to make a decision, update, or explanation easier to act on.`,
    workplaceExampleTh: guide.practice,
    diagram: guide.visualItems,
    commonMistakes: [guide.mistake],
    commonMistakesTh: [guide.mistake],
    juniorThinking: "I know the topic name.",
    seniorThinking: "I can use the topic to make the next action clearer.",
    juniorVsSenior: {
      junior: "I know the topic name.",
      senior: "I can use the topic to make the next action clearer.",
      juniorTh: "รู้ชื่อหัวข้อ",
      seniorTh: "ใช้หัวข้อนี้ทำให้ decision หรือ next step ชัดขึ้นได้",
    },
    keyTakeaway: `${title} is useful when it makes the next decision or action clearer.`,
    keyTakeawayTh: `${title} มีประโยชน์เมื่อทำให้ decision หรือ action ต่อไปชัดขึ้น`,
    miniCheck: check(`Which behavior shows good use of ${title}?`, `พฤติกรรมแบบใดแสดงว่าเข้าใจ ${title} ได้ดี?`, "Explain the decision with a clear reason.", "Use the term to sound advanced.", "Skip examples and move directly to visuals.", "แนวคิดที่ดีควรช่วยให้ตัดสินใจเรื่องงานได้จริง"),
    miniKnowledgeCheck: check(`Which behavior shows good use of ${title}?`, `พฤติกรรมแบบใดแสดงว่าเข้าใจ ${title} ได้ดี?`, "Explain the decision with a clear reason.", "Use the term to sound advanced.", "Skip examples and move directly to visuals.", "แนวคิดที่ดีควรช่วยให้ตัดสินใจเรื่องงานได้จริง"),
    relatedQuestionIds: [],
    references: ["Supreya Atipongchai learning library"],
    personalNoteEnabled: true,
  };
}

function expandedSeedAlias(pathId: string, title: string) {
  if (pathId === "ux-research" && title === "UX Research Foundations") return "Choosing a Research Method";
  if (pathId === "ux-research" && title === "User Interviews") return "Writing Neutral Interview Questions";
  if (pathId === "thai-tax-personal-finance" && title === "Income, Expenses, Deductions and Allowances") return title;
  if (pathId === "thai-tax-personal-finance" && title === "Filing Documents") return "Preparing Documents for Filing";
  return title;
}

function pathVerification(pathId: string, title: string): ContentVerification | undefined {
  if (pathId === "stock-investing") return stockVerification;
  if (pathId === "thai-tax-personal-finance") return title === "Archived Tax Year Example" ? archivedTaxVerification : taxVerification;
  if (["ux-research-method", "agile-ux-ui", "design-system", "product-owner", "product-analytics", "ai-product-workflow", "career-portfolio", "cx-communication"].includes(pathId)) {
    return {
      verificationStatus: "time-sensitive",
      lastVerifiedAt: "2026-07-27",
      officialSourceNames: ["Jobsdb Thailand", "Adecco Thailand Salary Guide", "Robert Walters Thailand Salary Survey"],
      disclaimer: careerDisclaimer,
    };
  }
  return { verificationStatus: "evergreen", disclaimer: educationalDisclaimer };
}

function expandedTopicCopy(pathId: string, title: string) {
  const base = {
    summaryTh: `${title} คือบทเรียนแบบสั้นที่ช่วยให้เข้าใจ concept และนำไปใช้กับสถานการณ์ทำงานจริง`,
    what: `${title} คือแนวคิดพื้นฐานที่ช่วยให้ผู้เรียนจัดระบบความคิด เห็นคำศัพท์สำคัญ และตัดสินใจได้ชัดขึ้น`,
    why: "บทนี้สำคัญเพราะช่วยให้ผู้เรียนไม่จำคำศัพท์แบบแยกส่วน แต่เข้าใจว่าควรใช้แนวคิดนี้เมื่อไรและเพื่อแก้ปัญหาอะไร",
    how: "เริ่มจากอ่านสถานการณ์สมมติ ดูคำศัพท์หลัก แล้วตอบ mini check เพื่อเชื่อม concept กับ decision จริง",
    example: `ในสถานการณ์ฝึกหัด ผู้เรียนจะใช้ ${title} เพื่ออธิบายเหตุผลและเลือก next step ที่เหมาะสม`,
    mistake: "จำคำศัพท์ได้ แต่ยังไม่เชื่อมกับ decision หรือ risk ที่ต้องพิจารณา",
    takeaway: `${title} มีประโยชน์เมื่อช่วยให้เลือก action ต่อไปได้อย่างมีเหตุผล`,
    vocab: title.replace("?", ""),
  };

  const copy: Record<string, Partial<typeof base>> = {
    "What is DesignOps?": {
      summaryTh: "DesignOps คือการจัดระบบให้ทีม design ทำงานได้ลื่นขึ้น วัดผลได้ และลด friction ระหว่างคน งาน และเครื่องมือ",
      what: "DesignOps ไม่ใช่การควบคุม designer แต่คือการออกแบบระบบการทำงาน เช่น intake, review, documentation, design system governance และ metrics",
      why: "ถ้าไม่มี DesignOps ทีมอาจเสียเวลาหางาน หาไฟล์ รอ review หรือทำ component ซ้ำโดยไม่จำเป็น",
      how: "เริ่มจาก map workflow ปัจจุบัน หา bottleneck แล้วเลือก improvement ที่ลด friction ได้จริง",
      example: "ทีม design สมมติใช้ request form เดียวกัน กำหนด priority ชัด และมี review cadence ทำให้งานเร่งด่วนไม่กลืนงานสำคัญ",
      vocab: "DesignOps",
    },
    "Mapping a Design Workflow": {
      what: "Workflow map แสดงขั้นตอนตั้งแต่ request เข้ามา จนงานถูกออกแบบ review ส่งต่อ และวัดผล",
      why: "เมื่อเห็นขั้นตอนทั้งหมด ทีมจะมองเห็น bottleneck เช่น brief ไม่ชัด review ช้า หรือ handoff ซ้ำหลายรอบ",
      how: "เขียน stage, owner, input, output และ waiting time ของแต่ละขั้นตอน แล้วเลือกจุดที่ควรปรับก่อน",
      example: "workflow ของ campaign page อาจเริ่มจาก brief → intake → priority → design → review → handoff → QA",
      vocab: "Workflow Map",
    },
    "Managing Design Requests": {
      what: "Design request management คือการรับงานออกแบบอย่างมีระบบ เพื่อให้ brief, owner, deadline, impact และ priority ชัด",
      why: "ถ้า request กระจัดกระจาย ทีมจะเสียเวลาไล่ถามข้อมูลและจัดลำดับยาก",
      how: "ใช้ intake form ที่ถาม problem, audience, expected outcome, deadline และ decision maker",
      example: "แทนการส่ง chat ว่า “ช่วยทำ banner ด่วน” requester ต้องใส่ goal, channel, copy, asset และ launch date",
      vocab: "Design Intake",
    },
    "Design System Governance": {
      what: "Design system governance คือกติกาว่า component, pattern และ token จะถูกเสนอ ตรวจ และเผยแพร่อย่างไร",
      why: "ไม่มี governance ระบบจะรก มี component ซ้ำ และทีมไม่รู้ว่าอะไรคือ source of truth",
      how: "กำหนด contribution flow, reviewer, naming rules, version note และ deprecation process",
      example: "ถ้ามีปุ่ม variant ใหม่ designer ต้องอธิบาย use case, accessibility state และผลกระทบต่อ existing product",
      vocab: "Governance",
    },
    "Design System Overview": {
      summaryTh: "Design System คือระบบของ decision ที่ทำให้ UI ใช้ซ้ำได้ สม่ำเสมอ และส่งต่อให้ทีมทำงานเร็วขึ้น",
      what: "Design system รวม foundation, token, component, pattern, documentation และ governance ไม่ใช่แค่ไฟล์ Figma ที่มีปุ่มหลายแบบ",
      why: "เมื่อ product โตขึ้น ทีมจะเจอ UI ซ้ำ งานแก้ซ้ำ และ experience ไม่สม่ำเสมอ Design system ช่วยลดความสูญเสียเหล่านี้",
      how: "เริ่มจาก audit UI ที่มีอยู่ จัดกลุ่ม pattern ซ้ำ สร้าง token และ component ที่มี state ครบ ก่อนเขียน documentation ให้ทีมใช้จริง",
      example: "แทนที่แต่ละทีมจะทำ modal เอง ระบบกำหนด anatomy, spacing, state, accessibility และ usage guideline ไว้ชุดเดียว",
      mistake: "สร้าง component สวย ๆ โดยไม่มี naming, rule, owner หรือ process อัปเดต",
      takeaway: "Design system ที่ดีทำให้งานออกแบบเร็วขึ้นโดยไม่ลดคุณภาพ",
      vocab: "Design System",
    },
    "Foundation Tokens": {
      summaryTh: "Foundation tokens คือค่าพื้นฐาน เช่น color, spacing, radius, shadow และ typography ที่ทำให้ UI สม่ำเสมอ",
      what: "Token คือชื่อกลางของ decision เช่น color.background.surface หรือ spacing.4 ที่ design และ code ใช้สื่อสารกันได้",
      why: "ถ้าไม่มี token ทีมจะใช้สีและระยะตามสายตา ทำให้ product ดูไม่เป็นระบบและแก้ยาก",
      how: "เริ่มจากกลุ่มสี ขนาดตัวอักษร ระยะห่าง และ radius ที่ใช้จริง แล้วตั้งชื่อจากหน้าที่ ไม่ใช่แค่หน้าตา",
      example: "ใช้ color.text.secondary แทน grey-600 เพื่อให้รู้ว่าสีนี้ใช้กับ secondary text ไม่ใช่แค่รหัสสี",
      mistake: "ตั้ง token ตามสีเฉพาะ เช่น blue1, blue2, blue3 จนไม่รู้ว่าใช้กับอะไร",
      takeaway: "Token ที่ดีทำให้ทีมเปลี่ยนระบบได้โดยไม่ต้องแก้ทีละหน้าจอ",
      vocab: "Design Token",
    },
    "Component Anatomy": {
      summaryTh: "Component anatomy ช่วยแยกส่วนประกอบของ UI เพื่อให้ component ยืดหยุ่นแต่ยังควบคุมคุณภาพได้",
      what: "Anatomy ระบุส่วนประกอบ เช่น container, icon, label, helper text, action, state และ responsive behavior",
      why: "ถ้าไม่รู้ anatomy component จะถูกใช้นอกเงื่อนไขง่าย เช่น label ยาวแล้วแตก หรือ state ไม่ครบ",
      how: "เขียน anatomy พร้อม do/don't, content rule, spacing, min size และ edge case ที่ต้องรองรับ",
      example: "Card อาจมี media, title, description, metadata และ action โดยแต่ละส่วนมี rule ว่า optional หรือ required",
      mistake: "คิดว่า component คือภาพ static ทั้งที่ต้องรองรับ content จริงและ interaction หลายสถานะ",
      takeaway: "Anatomy ที่ชัดทำให้ component ใช้ง่ายและพังยากขึ้น",
      vocab: "Component Anatomy",
    },
    "Documentation That Teams Use": {
      summaryTh: "Documentation ที่ดีต้องช่วยให้ทีมตัดสินใจเร็ว ไม่ใช่เอกสารยาวที่ไม่มีใครเปิดอ่าน",
      what: "เอกสาร design system ควรมี purpose, anatomy, usage, states, accessibility, content guidance และตัวอย่างจริง",
      why: "ถ้า documentation ไม่ตอบคำถามตอนทำงาน ทีมจะกลับไปถามกันเองหรือสร้างของใหม่ซ้ำ",
      how: "เขียนแบบ decision-first: ใช้เมื่อไร ไม่ใช้เมื่อไร ต้องระวังอะไร และตัวอย่างที่ถูก/ผิดเป็นอย่างไร",
      example: "Button docs ควรบอก hierarchy, label rule, loading state, disabled state และ minimum touch target",
      mistake: "เขียนเอกสารเยอะมากแต่ไม่บอก decision rule ที่ทีมต้องใช้จริง",
      takeaway: "Documentation ที่ดีคือเครื่องมือทำงาน ไม่ใช่คู่มือโชว์ความครบ",
      vocab: "Documentation",
    },
    "Design System Portfolio Case": {
      summaryTh: "Portfolio design system ควรเล่าว่าคุณแก้ปัญหาความไม่สม่ำเสมอและ workflow ของทีมอย่างไร",
      what: "Case study ควรแสดง audit, component decisions, token logic, governance, adoption และผลลัพธ์ต่อทีม",
      why: "Hiring manager อยากเห็นว่าคุณคิดเป็นระบบและทำงานร่วมกับ designer/developer ได้ ไม่ใช่แค่ทำ UI kit สวย",
      how: "เล่าจาก problem → audit → principles → foundation → component → docs → adoption → impact",
      example: "หลังจัดระบบ form components ทีมลด design review issue เรื่อง spacing และ state ที่ไม่ครบลงใน sprint ถัดไป",
      mistake: "โชว์หน้า component เยอะ แต่ไม่อธิบายว่าระบบช่วย product หรือทีมอย่างไร",
      takeaway: "Design system case ที่ดีพิสูจน์ว่าคุณสร้าง scale ได้ ไม่ใช่แค่ screen เดี่ยว",
      vocab: "Design System Case Study",
    },
    "UX Researcher Career Map": {
      summaryTh: "UX Researcher เป็นบทบาทที่ช่วยให้ทีมเข้าใจผู้ใช้จากหลักฐานจริง แล้วแปลงสิ่งที่เรียนรู้เป็น product decision ที่ดีขึ้น",
      what: "UX Researcher ไม่ได้แค่สัมภาษณ์ผู้ใช้ แต่ต้องวางแผน research, เลือก method, ดูแล ethics, วิเคราะห์ pattern และสื่อสาร insight ให้ทีมตัดสินใจได้",
      why: "บทบาทนี้มีคุณค่าสูงเพราะลดความเสี่ยงของการสร้าง product จากสมมติฐานผิด และช่วยให้ทีมเห็นปัญหาผู้ใช้ชัดขึ้นก่อนลงทุนลงแรง",
      how: "ฝึกจาก 5 แกน: research question, method selection, participant quality, synthesis และ stakeholder readout",
      example: "ก่อน redesign onboarding researcher อาจตรวจ drop-off data, สัมภาษณ์ผู้ใช้ที่เลิกกลางทาง และทำ usability test เพื่อหาจุดที่ทำให้ไม่มั่นใจ",
      mistake: "คิดว่า research คือการถามว่าผู้ใช้ชอบอะไร แล้วเอาคำตอบเดียวไปตัดสินใจแทน pattern ที่มีหลักฐานรองรับ",
      takeaway: "UX Researcher ที่เก่งทำให้ทีมเรียนรู้เร็วขึ้นและตัดสินใจด้วยหลักฐานมากขึ้น",
      vocab: "UX Researcher",
    },
    "Research Question vs Business Question": {
      summaryTh: "Research question แปลงเป้าหมายธุรกิจให้เป็นคำถามที่เรียนรู้จากผู้ใช้ได้จริง",
      what: "Business question เช่น “ทำอย่างไรให้ conversion ดีขึ้น” ส่วน research question เช่น “ผู้ใช้ไม่มั่นใจขั้นตอนไหนก่อนสมัคร”",
      why: "คำถามที่ดีช่วยเลือก method ถูกและทำให้ research ไม่กว้างเกินไป",
      how: "เริ่มจาก business goal แล้วถามว่าเรายังไม่รู้อะไรเกี่ยวกับ user behavior, motivation หรือ barrier",
      example: "จาก goal เพิ่ม paid signup อาจตั้ง research question ว่า “ข้อมูลราคาแบบใดทำให้ผู้ใช้เข้าใจ value ชัดขึ้น”",
      vocab: "Research Question",
    },
    "Choosing a Research Method": {
      what: "การเลือก research method คือการจับคู่คำถามกับวิธีเรียนรู้ เช่น interview, usability test, survey, analytics หรือ tree testing",
      why: "method ผิดทำให้ได้ข้อมูลที่ตอบคำถามไม่ได้ เช่น อยากรู้ why แต่ใช้แค่ตัวเลข หรืออยากวัด scale แต่คุยกับคนน้อยมาก",
      how: "ถ้าต้องรู้เหตุผลใช้ qualitative ถ้าต้องรู้ขนาดหรือ pattern ใช้ quantitative ถ้าต้องดู task ใช้ usability testing",
      example: "ถ้าผู้ใช้หา invoice ไม่เจอ ใช้ tree testing ตรวจ IA และ interview เพื่อเข้าใจ mental model",
      vocab: "Research Method",
    },
    "Writing Neutral Interview Questions": {
      what: "Neutral interview questions คือคำถามที่ไม่ชี้นำให้ผู้ตอบเห็นด้วยกับเรา",
      why: "คำถามนำทำให้ insight บิดเบี้ยวและทีมมั่นใจผิด",
      how: "ถามจากพฤติกรรมจริง เช่น “เล่าครั้งล่าสุดที่...” แทน “คุณชอบ feature นี้ไหม”",
      example: "ถามว่า “ครั้งล่าสุดที่คุณยื่นเอกสารล่าช้า เกิดอะไรขึ้น” ดีกว่า “ระบบใหม่ของเราจะช่วยคุณได้ใช่ไหม”",
      vocab: "Neutral Question",
    },
    "Interview Script and Moderator Guide": {
      summaryTh: "Moderator guide ช่วยให้การสัมภาษณ์ไม่หลุดประเด็น ไม่ชี้นำ และเก็บข้อมูลเทียบกันได้ระหว่างผู้เข้าร่วมหลายคน",
      what: "เอกสารนี้รวม objective, participant profile, opening script, warm-up, core questions, probes และ closing question",
      why: "ถ้าไม่มี guide ผู้สัมภาษณ์อาจถามไม่เหมือนกันทุกคน หรือเผลอชี้นำจนข้อมูลไม่น่าเชื่อถือ",
      how: "เริ่มจาก research question แล้วแตกเป็นคำถามจากพฤติกรรมจริง พร้อม probe เช่น “เกิดอะไรขึ้นต่อ” หรือ “คุณตัดสินใจจากอะไร”",
      example: "สำหรับ onboarding flow อาจถามว่า “เล่าครั้งล่าสุดที่คุณสมัครบริการใหม่ แล้วรู้สึกไม่มั่นใจตรงไหนบ้าง”",
      mistake: "เขียนคำถามแบบให้ผู้ใช้ยืนยัน solution เช่น “คุณคิดว่าหน้านี้ดีขึ้นไหมถ้าเราเพิ่มปุ่มนี้”",
      takeaway: "Guide ที่ดีทำให้ interview มีวินัย แต่ยังเปิดพื้นที่ให้ผู้ใช้เล่าบริบทจริง",
      vocab: "Moderator Guide",
    },
    "Usability Test Plan": {
      summaryTh: "Usability test plan ทำให้ทีมรู้ว่าจะทดสอบ task ไหน กับใคร วัดอะไร และตัดสินผลอย่างไร",
      what: "Test plan ระบุ goal, participant, scenario, tasks, success criteria, observation note และ severity ของปัญหา",
      why: "การ test โดยไม่มี plan มักกลายเป็นการดูความเห็นทั่วไป ไม่ใช่หลักฐานว่าผู้ใช้ทำ task ได้หรือไม่ได้",
      how: "เลือก task สำคัญ 3-5 งาน เขียน scenario แบบเป็นธรรมชาติ แล้ววัด success, time, error และ confidence",
      example: "ให้ผู้ใช้ลองหา invoice ล่าสุด ดาวน์โหลดไฟล์ และส่งต่อให้ทีมบัญชี โดยไม่บอกว่าปุ่มอยู่ตรงไหน",
      mistake: "ถามว่า “คุณชอบหน้านี้ไหม” แทนการสังเกตว่าผู้ใช้ทำงานสำคัญสำเร็จหรือไม่",
      takeaway: "Usability test ที่ดีช่วยหา friction ก่อนปล่อยของจริง",
      vocab: "Usability Test Plan",
    },
    "Insight vs Observation": {
      what: "Observation คือสิ่งที่เห็นหรือได้ยิน ส่วน insight คือความหมายที่อธิบาย pattern หรือ tension หลัง observation",
      why: "ทีมที่แยกสองสิ่งนี้ได้จะไม่รีบสรุปจาก quote เดียว",
      how: "รวม observations หลายชิ้น หา pattern แล้วเขียน insight ที่เชื่อม user need กับ product opportunity",
      example: "Observation: ผู้ใช้ถามคำว่า refund 5 ครั้ง Insight: ผู้ใช้ไม่มั่นใจความเสี่ยงก่อนสมัคร paid plan",
      vocab: "Insight",
    },
    "Research Synthesis to Opportunity": {
      summaryTh: "Synthesis คือการเปลี่ยนข้อมูลดิบจาก research ให้เป็น pattern, insight และ opportunity ที่ทีมใช้ตัดสินใจได้",
      what: "การ synthesis รวม note, quote, behavior และ metric แล้วจัดกลุ่มเพื่อหา theme ที่มีผลต่อ user need หรือ business outcome",
      why: "ข้อมูล research จะมีค่ามากขึ้นเมื่อทีมเห็นว่า insight นำไปสู่ opportunity หรือ product decision อะไร",
      how: "เริ่มจาก affinity map หา pattern เขียน insight จากหลักฐาน แล้วแปลงเป็น opportunity statement เช่น “How might we...”",
      example: "จากหลาย interview พบว่าผู้ใช้ไม่รู้ว่าขั้นตอนสมัครเหลืออะไร จึงเกิด opportunity เรื่อง progress clarity",
      mistake: "เอา quote สวย ๆ มาใส่ deck โดยไม่สรุป pattern หรือความหมายเชิง decision",
      takeaway: "Synthesis ที่ดีทำให้ research ไม่จบที่รายงาน แต่กลายเป็นทิศทางการออกแบบ",
      vocab: "Synthesis",
    },
    "Stakeholder Research Readout": {
      summaryTh: "Research readout คือการเล่า insight ให้คนตัดสินใจเข้าใจเร็ว เชื่อมหลักฐานกับผลกระทบ และเห็น next step",
      what: "Readout ที่ดีมี context, method, key findings, evidence, severity, opportunity และ recommendation",
      why: "Stakeholder ไม่ได้ต้องการ transcript ทั้งหมด แต่ต้องการรู้ว่าเราควรตัดสินใจอะไรและเสี่ยงอะไรถ้าไม่ทำ",
      how: "จัดลำดับจาก decision ที่ต้องการตอบ แล้วใช้ quote, screenshot หรือ behavior clip เป็นหลักฐานสนับสนุน",
      example: "แทนการเล่าว่า interview มา 8 คน ให้สรุปว่า 6 จาก 8 คนติดที่ pricing term เดียวกันและทำให้ checkout ช้าลง",
      mistake: "ทำ presentation ยาวมากแต่ไม่มี recommendation หรือ owner ของ next step",
      takeaway: "Readout ที่ดีทำให้ research มีอิทธิพลต่อ roadmap และ design priority",
      vocab: "Research Readout",
    },
    "Portfolio Research Case Study": {
      summaryTh: "Research case study ที่ดีต้องเล่า problem, method, evidence, insight, decision และ impact ไม่ใช่แค่โชว์ deliverable",
      what: "Portfolio สำหรับ UX Researcher ควรแสดงว่าคุณตั้งคำถามดี เลือก method มีเหตุผล วิเคราะห์เป็น และช่วยทีมตัดสินใจได้",
      why: "Hiring manager มองหาหลักฐานของ thinking, rigor, communication และ collaboration มากกว่าจำนวนหน้ารายงาน",
      how: "ใช้โครง: business context → research question → method → participants → synthesis → insights → decisions → impact/learning",
      example: "เล่าว่า usability test พบ friction ใน claim flow แล้วทีมปรับ information hierarchy จน task completion ดีขึ้นในรอบถัดไป",
      mistake: "ใส่รูป sticky notes เยอะ แต่ไม่อธิบายว่าข้อมูลกลายเป็น decision หรือผลลัพธ์อย่างไร",
      takeaway: "Case study ที่ดีพิสูจน์ว่าคุณใช้ research เปลี่ยนการตัดสินใจของทีมได้",
      vocab: "Research Case Study",
    },
    "UX Research Method Overview": {
      summaryTh: "คอร์สนี้ช่วยเลือก research method ให้ตรงกับคำถาม ไม่เลือกจากความคุ้นเคยหรือความสะดวกอย่างเดียว",
      what: "Research method คือวิธีเก็บหลักฐานเพื่อเรียนรู้จากผู้ใช้ เช่น interview, survey, usability test, card sorting หรือ tree testing",
      why: "method ที่ดีทำให้ทีมตอบคำถามได้ตรงและลดความเสี่ยงของการสรุปผิด",
      how: "เริ่มจาก decision ที่ต้องตัดสินใจ แล้วถามว่าต้องรู้ why, what, how many, where หรือ can users do it",
      example: "ถ้าต้องรู้ว่าผู้ใช้ทำ task สำเร็จไหม ใช้ usability test ถ้าต้องรู้ว่าปัญหานี้เกิดกว้างแค่ไหน ค่อยใช้ survey",
      mistake: "ใช้ interview กับทุกอย่าง แม้คำถามต้องการตัวเลขหรือพฤติกรรมจริงใน product",
      takeaway: "เลือก method จากคำถาม ไม่ใช่จากความถนัดส่วนตัว",
      vocab: "Research Method",
    },
    "Method Selection Matrix": {
      summaryTh: "Method selection matrix ช่วยจับคู่คำถามกับวิธีวิจัยอย่างเป็นระบบ",
      what: "Matrix เปรียบเทียบ method ตามเป้าหมาย เช่น discover, evaluate, measure, prioritize และ validate",
      why: "ช่วยให้คุยกับ stakeholder ได้ง่ายว่าทำไมต้องใช้ method นี้และไม่ใช้ method อื่น",
      how: "วางแกนเป็น qualitative/quantitative และ generative/evaluative แล้วเลือก method ตาม evidence ที่ต้องการ",
      example: "Concept ใหม่อาจเริ่มด้วย interview เพื่อหา motivation แล้วตามด้วย survey เพื่อดู scale ของ pattern",
      mistake: "เลือก method เพราะทำเร็วที่สุด โดยไม่ดูว่าหลักฐานตอบคำถามได้ไหม",
      takeaway: "Matrix ทำให้ research planning ดูมืออาชีพและป้องกันการเลือก method ผิด",
      vocab: "Method Matrix",
    },
    "Generative vs Evaluative Research": {
      summaryTh: "Generative research ใช้ค้นหาโอกาส ส่วน evaluative research ใช้ตรวจว่าสิ่งที่ออกแบบไว้ทำงานดีไหม",
      what: "Generative เหมาะกับช่วงยังไม่รู้ problem ชัด ส่วน evaluative เหมาะกับการทดสอบ concept, prototype หรือ flow",
      why: "แยกสองแบบนี้ได้จะช่วยวาง research timing และ expectation ของทีมถูก",
      how: "ถามว่าตอนนี้ทีมต้อง discover problem ใหม่ หรือ evaluate solution ที่มีอยู่แล้ว",
      example: "ก่อนออกแบบ claim flow ใช้ generative interview หลังมี prototype ใช้ evaluative usability test",
      mistake: "เอา usability test ไปใช้ค้นหาปัญหากว้าง ๆ ทั้งที่ prototype บังคับกรอบคำตอบไว้แล้ว",
      takeaway: "Research timing ที่ดีเริ่มจากถามว่าทีมกำลังเรียนรู้อะไร",
      vocab: "Generative Research",
    },
    "UX/UI Design in Agile Overview": {
      summaryTh: "UX/UI ใน Agile คือการออกแบบให้พอดีกับจังหวะ sprint โดยยังรักษาคุณภาพของ user experience",
      what: "Designer ต้องเชื่อม discovery, backlog, prototype, handoff, QA และ learning loop ให้ทันการส่งมอบ product",
      why: "ถ้า design แยกจาก agile team งานจะมาช้า requirement ไม่ชัด และเกิด design debt ง่าย",
      how: "ทำงานล่วงหน้า 1-2 sprint สำหรับ discovery และทำงานร่วม sprint สำหรับ refinement, handoff และ QA",
      example: "ก่อน dev sprint เริ่ม designer เตรียม user flow, edge states, content rule และ acceptance criteria ให้พร้อม",
      mistake: "ทำ design ใหญ่จบทีเดียวโดยไม่ sync กับ sprint, risk และ technical constraint",
      takeaway: "Agile UX/UI ที่ดีคือเร็วขึ้นอย่างมีระบบ ไม่ใช่รีบจนข้าม UX thinking",
      vocab: "Agile UX",
    },
    "Sprint Planning for UX/UI": {
      summaryTh: "Sprint planning ช่วยให้ designer เห็น scope, dependency และ decision ที่ต้องเคลียร์ก่อนทีมเริ่มทำ",
      what: "UX/UI ต้องเตรียม design readiness เช่น flow, state, copy, data requirement และ acceptance criteria",
      why: "ถ้า design ยังไม่พร้อมตอน sprint เริ่ม ทีม dev จะรอ ถามซ้ำ หรือสร้าง solution เองโดยไม่มี UX rationale",
      how: "เช็คแต่ละ story ว่ามี user goal, edge case, component, content และ QA note ครบหรือยัง",
      example: "Story checkout ต้องมี loading, error, empty, success, validation และ responsive state ก่อน handoff",
      mistake: "เข้าประชุม sprint planning พร้อมแค่ภาพหน้าจอ แต่ไม่มี rule หรือ state ที่ทีมต้อง build",
      takeaway: "Design readiness ทำให้ sprint ลื่นขึ้นและลดงานแก้หลัง dev",
      vocab: "Design Readiness",
    },
    "Handoff with Acceptance Criteria": {
      summaryTh: "Handoff ที่ดีไม่ใช่แค่ส่ง Figma แต่ต้องบอกเงื่อนไขสำเร็จและพฤติกรรมที่ต้องเกิด",
      what: "Acceptance criteria ช่วยให้ designer, PO, developer และ QA เข้าใจตรงกันว่าฟีเจอร์นี้ควรทำงานอย่างไร",
      why: "ถ้าไม่มี criteria งานอาจถูก build ตามภาพนิ่ง แต่พลาด interaction, validation หรือ edge case สำคัญ",
      how: "เขียนเป็น checklist เช่น given/when/then หรือ bullet ที่ครอบคลุม state, content, responsive และ accessibility",
      example: "เมื่อผู้ใช้กรอก email ผิด ระบบต้องแสดง error message ใต้ช่อง input และไม่ล้างข้อมูลที่กรอกไว้",
      mistake: "handoff ด้วย link เดียวโดยไม่มี context, flow, state หรือ QA expectation",
      takeaway: "Handoff ที่ดีช่วยให้ design decision ไม่หายระหว่าง build",
      vocab: "Acceptance Criteria",
    },
    "Agile UX/UI Portfolio Case": {
      summaryTh: "Portfolio แบบ Agile UX/UI ควรเล่าว่าคุณออกแบบร่วมกับทีม ส่งงานเป็นรอบ และเรียนรู้จาก feedback อย่างไร",
      what: "Case study ควรมี sprint context, constraints, trade-offs, collaboration, design changes และ outcome หลัง release",
      why: "หลายบริษัทอยากเห็น designer ที่ทำงานจริงกับ product/dev ได้ ไม่ใช่แค่สร้าง final UI ที่สวย",
      how: "เล่าตาม timeline: problem → discovery → sprint decision → prototype → handoff → QA → release learning",
      example: "คุณอาจเล่าว่าทีมลด scope feature แต่ยังรักษา core user journey ได้ด้วย design trade-off แบบใด",
      mistake: "โชว์ final screen โดยไม่บอกข้อจำกัดหรือการตัดสินใจระหว่าง sprint",
      takeaway: "Agile portfolio ที่ดีแสดง collaboration และ judgment ในสถานการณ์จริง",
      vocab: "Agile Case Study",
    },
    "Product Owner Career Map": {
      summaryTh: "Product Owner เป็นบทบาทที่เชื่อม business, user, design และ engineering ให้ส่งมอบ product ที่มีผลลัพธ์จริง",
      what: "Product Owner ไม่ใช่แค่คนจด requirement แต่เป็นคนช่วยตัดสินใจว่าอะไรควรทำก่อน ทำเพื่อผลลัพธ์อะไร และทีมต้องเข้าใจงานอย่างไร",
      why: "บทบาทนี้มักมีความรับผิดชอบสูง เพราะต้องคุยกับ stakeholder, manage backlog, เข้าใจ domain และช่วย scrum team ส่งมอบงานได้จริง",
      how: "ฝึกจาก 4 แกน: business outcome, user problem, backlog clarity และ stakeholder communication",
      example: "ใน digital banking หรือ insurance PO ต้องแปลงเป้าหมายเช่นลด call center workload ให้เป็น feature, acceptance criteria และ release plan ที่ทีมทำต่อได้",
      mistake: "คิดว่า PO คือคนรับคำสั่งจาก business แล้วส่งต่อให้ developer โดยไม่ challenge scope หรือ priority",
      takeaway: "PO ที่เติบโตเร็วคือคนที่อธิบาย trade-off ได้ และทำให้ทีมเห็น outcome เดียวกัน",
      vocab: "Product Owner",
    },
    "Business Goals to Product Outcomes": {
      summaryTh: "งาน product รายได้ดีต้องแปลงเป้าหมายธุรกิจให้เป็น outcome ที่วัดได้ ไม่หยุดที่ feature list",
      what: "Business goal คือสิ่งที่องค์กรอยากได้ เช่น growth, retention, cost reduction ส่วน product outcome คือพฤติกรรมหรือผลลัพธ์ผู้ใช้ที่เปลี่ยนจริง",
      why: "ถ้าทีมเริ่มจาก feature อย่างเดียว งานจะเยอะขึ้นแต่ไม่รู้ว่าสำเร็จหรือไม่",
      how: "ถามว่า business อยากขยับ metric ใด ผู้ใช้ต้องเปลี่ยนพฤติกรรมอะไร และ product decision ใดช่วยให้เกิดสิ่งนั้น",
      example: "เป้าหมายลดงาน call center อาจแปลงเป็น outcome ว่า policyholder self-service claim status ได้โดยไม่โทรถาม",
      mistake: "เขียน roadmap เป็นรายการหน้าจอ โดยไม่มี outcome หรือ metric รองรับ",
      takeaway: "Outcome thinking ทำให้คุณคุยกับ manager, engineer และ stakeholder ด้วยภาษาธุรกิจได้ดีขึ้น",
      vocab: "Product Outcome",
    },
    "Backlog, Epic and User Story": {
      summaryTh: "Backlog ที่ดีทำให้ทีมเห็นภาพงาน ลำดับความสำคัญ และเงื่อนไขสำเร็จโดยไม่ต้องเดา",
      what: "Backlog คือรายการงานที่ต้องพิจารณา Epic คือกลุ่มงานใหญ่ User story คือชิ้นงานย่อยที่อธิบาย user, need และ value",
      why: "Senior PO/BA/Product Designer มักถูกคาดหวังให้เขียนงานที่ developer, QA และ stakeholder เข้าใจตรงกัน",
      how: "เขียน story ด้วยบริบท user, goal, business value, acceptance criteria, edge case และ dependency",
      example: "As a policyholder, I want to see claim status in the app so that I do not need to call support.",
      mistake: "เขียน user story เป็นคำสั่งทำ UI เช่น 'ทำปุ่มสีฟ้า' โดยไม่บอก goal หรือ acceptance criteria",
      takeaway: "Backlog clarity ลดงานวนซ้ำและทำให้คุณดูเป็นคนที่ทีมไว้ใจได้",
      vocab: "User Story",
    },
    "Prioritisation with Impact and Effort": {
      summaryTh: "การจัด priority คือทักษะเงินเดือนสูง เพราะช่วยเลือกงานที่คุ้มค่าที่สุดในเวลาจำกัด",
      what: "Prioritisation คือการเปรียบเทียบ impact, effort, risk, urgency และ strategic fit ก่อนเลือกสิ่งที่จะทำ",
      why: "ทีมที่ทำทุกอย่างพร้อมกันมักส่งงานช้าและไม่เห็นผลลัพธ์ชัด",
      how: "ใช้ impact-effort matrix หรือ scoring ง่าย ๆ แล้วบันทึกเหตุผลของ decision เพื่อให้ stakeholder เข้าใจ",
      example: "ถ้า feature A ลด call center ได้มากแต่ใช้ effort กลาง อาจมาก่อน feature B ที่สวยกว่าแต่ impact ต่ำ",
      mistake: "ให้ priority ตามคนเสียงดังที่สุด หรือ deadline ที่ไม่มีเหตุผล",
      takeaway: "คนที่จัด priority ได้ดีช่วยประหยัดเวลาและทรัพยากรขององค์กร",
      vocab: "Prioritisation",
    },
    "Product Analytics Career Map": {
      summaryTh: "Product Analytics เชื่อมข้อมูลผู้ใช้กับการตัดสินใจของ product เช่น growth, retention, funnel และ experiment",
      what: "Product Analyst หรือ Product Data Analyst ช่วยตอบว่าเกิดอะไรขึ้นกับผู้ใช้ ทำไม metric เปลี่ยน และควรทดลองอะไรต่อ",
      why: "งานนี้มีมูลค่าสูงเพราะช่วยให้ทีมตัดสินใจจาก evidence ไม่ใช่ความรู้สึก",
      how: "เริ่มจาก metric logic, event tracking, SQL thinking, dashboard design และ insight storytelling",
      example: "ถ้า signup drop หลังหน้า pricing analyst ต้องดู funnel, segment, device, traffic source และ behavior ก่อนเสนอ experiment",
      mistake: "ทำ dashboard เยอะมากแต่ไม่มีคำถามหรือ decision ที่ต้องตอบ",
      takeaway: "Analytics ที่ดีไม่ใช่แค่ chart สวย แต่ต้องเปลี่ยน decision ได้",
      vocab: "Product Analytics",
    },
    "Data Analyst Career Map": {
      summaryTh: "Data Analyst เป็นเส้นทางที่ใช้ข้อมูลช่วยธุรกิจตัดสินใจ ตั้งแต่ SQL, dashboard, metric, experiment ไปจนถึง storytelling",
      what: "Data Analyst ที่ทำงานกับ product ต้องเข้าใจข้อมูลผู้ใช้, event tracking, business context และการสื่อสาร insight ให้ทีมลงมือได้",
      why: "บทบาทนี้มีโอกาสเติบโตสูงเพราะหลายทีมต้องการคนที่แปลงข้อมูลจำนวนมากให้เป็นคำตอบที่ชัดและน่าเชื่อถือ",
      how: "ฝึกจาก 5 แกน: metric logic, SQL foundation, dashboard clarity, data quality และ insight storytelling",
      example: "เมื่อ retention ลดลง analyst ต้องแยก cohort, channel, feature usage และ user segment เพื่อหาว่าปัญหาเกิดกับกลุ่มไหน",
      mistake: "คิดว่างาน analyst คือทำกราฟอย่างเดียว โดยไม่ผูกกับคำถามธุรกิจหรือ decision ที่ต้องตอบ",
      takeaway: "Data Analyst ที่โดดเด่นคือคนที่ทำให้ข้อมูลกลายเป็น action ที่ทีมเชื่อและใช้ต่อได้",
      vocab: "Data Analyst",
    },
    "Product KPI Tree": {
      summaryTh: "KPI tree ช่วยแตก metric ใหญ่ให้เป็น metric ย่อย เพื่อหาว่าควรแก้จุดไหนของ product ก่อน",
      what: "KPI tree แสดงความสัมพันธ์ระหว่าง goal หลัก เช่น revenue หรือ active learners กับ drivers เช่น activation, retention, frequency และ conversion",
      why: "ถ้ามองแค่ metric ปลายทาง ทีมจะไม่รู้ว่าควรปรับ onboarding, content, pricing หรือ engagement",
      how: "เริ่มจาก North Star หรือ business goal แล้วแตกเป็น input metrics ที่ทีม product ขยับได้",
      example: "Learning completion อาจแตกเป็น lesson started, lesson completed, quiz attempted, answer accuracy และ review returned",
      mistake: "เลือก KPI หลายตัวโดยไม่รู้ว่าแต่ละตัวเชื่อมกันอย่างไร",
      takeaway: "KPI tree ช่วยเปลี่ยนตัวเลขใหญ่ให้เป็นพื้นที่ลงมือที่ชัดเจน",
      vocab: "KPI Tree",
    },
    "North Star Metric": {
      summaryTh: "North Star Metric ช่วยให้ทีม product โฟกัส value สำคัญที่ผู้ใช้ได้รับ ไม่ใช่แค่ activity ที่ดูเยอะ",
      what: "North Star Metric คือ metric หลักที่สะท้อน value ที่ product ส่งมอบให้ผู้ใช้และเชื่อมกับการเติบโตระยะยาว",
      why: "ถ้าไม่มี metric หลัก ทีมอาจ optimize หลายอย่างที่ไม่พา product ไปทางเดียวกัน",
      how: "เลือก metric ที่สะท้อน user value, วัดได้, ขยับได้จาก product action และไม่หลอกง่าย",
      example: "แอปเรียนรู้อาจใช้ weekly completed learning sessions มากกว่าแค่จำนวนเปิดแอป เพราะสะท้อนการเรียนจบจริง",
      mistake: "เลือก vanity metric เช่น page views โดยไม่รู้ว่า user ได้ value อะไร",
      takeaway: "Metric ที่ดีช่วยให้ product, design และ engineering ตัดสินใจไปทิศทางเดียวกัน",
      vocab: "North Star Metric",
    },
    "Event Tracking Plan": {
      summaryTh: "Event tracking plan คือเอกสารที่บอกว่าจะเก็บพฤติกรรมใด เพื่อวิเคราะห์ funnel และ product decision ได้",
      what: "Tracking plan ระบุ event name, trigger, property, owner และเหตุผลที่ต้องเก็บข้อมูล",
      why: "ถ้าไม่มี tracking plan ข้อมูลจะไม่สม่ำเสมอ dashboard จะผิด และ insight จะไม่น่าเชื่อถือ",
      how: "เริ่มจาก question ที่ต้องตอบ แล้วกำหนด event เฉพาะจุดที่จำเป็น เช่น quiz_started, answer_submitted, lesson_completed",
      example: "สำหรับ SkillQuest อาจ track path_id, question_id, is_correct และ language_mode เพื่อดูว่าบทเรียนใดทำให้ผู้เรียนติด",
      mistake: "เก็บทุกอย่างโดยไม่มี naming convention หรือไม่คุยกับ engineer ก่อนส่ง tracking requirement",
      takeaway: "Tracking ที่ดีทำให้ data analyst ทำงานเร็วขึ้นและลดความเสี่ยงของข้อมูลผิด",
      vocab: "Tracking Plan",
    },
    "GA4 and Event Taxonomy": {
      summaryTh: "Event taxonomy คือกติกาการตั้งชื่อ event และ property ให้ข้อมูลจาก analytics tool อ่านง่ายและใช้ซ้ำได้",
      what: "ในเครื่องมืออย่าง GA4 หรือ product analytics อื่น ๆ taxonomy ช่วยให้ event เช่น lesson_started หรือ quiz_completed มีรูปแบบเดียวกัน",
      why: "ชื่อ event ที่ไม่เป็นระบบทำให้ dashboard พัง วิเคราะห์ผิด และคุยกับ engineer ยาก",
      how: "กำหนด naming convention, required properties, owner และตัวอย่าง trigger ของแต่ละ event ก่อนเริ่ม implementation",
      example: "ใช้รูปแบบ object_action เช่น quiz_started, answer_submitted, lesson_completed พร้อม property path_id และ lesson_id",
      mistake: "ตั้งชื่อ event ตามอารมณ์แต่ละรอบ เช่น clickButton, button_clicked, clicked_start จนรวมข้อมูลไม่ได้",
      takeaway: "Taxonomy ที่ดีทำให้ข้อมูลสะอาดตั้งแต่ต้นทาง",
      vocab: "Event Taxonomy",
    },
    "SQL Select, Filter and Group": {
      summaryTh: "SQL พื้นฐานช่วยให้ analyst ดึงข้อมูลเองได้ เริ่มจาก SELECT, WHERE, GROUP BY และ ORDER BY",
      what: "คำสั่งเหล่านี้ใช้เลือกคอลัมน์ กรองข้อมูล จัดกลุ่ม และเรียงลำดับเพื่อหาคำตอบจาก dataset",
      why: "แม้ยังไม่เขียน SQL ขั้นสูงได้ การคิดแบบตารางช่วยให้เข้าใจว่าข้อมูลมาจากไหนและ metric คำนวณอย่างไร",
      how: "ฝึกตั้งคำถามเป็นตาราง เช่น ต้องใช้ user_id, event_name, event_time, path_id และคำนวณ count หรือ rate อะไร",
      example: "อยากรู้ quiz completion ตาม path ให้ group by path_id แล้วนับ session ที่ started และ completed",
      mistake: "ดู dashboard อย่างเดียวโดยไม่เข้าใจ logic หลัง metric",
      takeaway: "SQL thinking ทำให้คุณถามข้อมูลได้แม่นขึ้นและคุยกับ data engineer รู้เรื่องขึ้น",
      vocab: "SQL",
    },
    "Dashboard Design for Decisions": {
      summaryTh: "Dashboard ที่ดีต้องตอบคำถามธุรกิจหรือ product decision ไม่ใช่แค่รวมกราฟไว้เยอะ ๆ",
      what: "Dashboard for decisions คือหน้าสรุป metric ที่ช่วยให้ทีมเห็น status, trend, anomaly และ next action",
      why: "ผู้บริหารและทีม product ต้องการสัญญาณที่ชัด ไม่ใช่ข้อมูลดิบที่อ่านยาก",
      how: "จัด dashboard จาก question → metric → segment → interpretation → action โดยใช้ hierarchy ที่อ่านเร็ว",
      example: "dashboard retention ควรแยก cohort, acquisition channel และ feature usage เพื่อรู้ว่าจะทดลองอะไรต่อ",
      mistake: "ใช้สีและ chart หลายแบบจนสวยแต่ตอบไม่ได้ว่า metric ดีขึ้นหรือแย่ลงเพราะอะไร",
      takeaway: "Dashboard ที่ดีคือเครื่องมือประชุม ไม่ใช่โปสเตอร์ข้อมูล",
      vocab: "Decision Dashboard",
    },
    "Looker Studio Dashboard Basics": {
      summaryTh: "Looker Studio dashboard ที่ดีควรอ่านเร็ว มี hierarchy ชัด และตอบคำถามที่ทีมใช้ประชุมจริง",
      what: "Dashboard basics รวมการเลือก chart, scorecard, filter, date range, comparison และ annotation ให้เหมาะกับคำถาม",
      why: "Dashboard ที่ซับซ้อนเกินไปทำให้คนไม่ใช้ ส่วน dashboard ที่เรียบแต่ตอบ decision ได้จะมี impact มากกว่า",
      how: "วาง headline metrics ด้านบน ตามด้วย trend, funnel, segment และ insight note ที่บอกว่าต้องดูอะไร",
      example: "หน้า weekly learning dashboard อาจมี active learners, completed lessons, quiz accuracy และ due review segmented by path",
      mistake: "ใส่กราฟทุกอย่างที่มีข้อมูล แต่ไม่มีลำดับการอ่านหรือคำอธิบายว่า metric ไหนสำคัญ",
      takeaway: "Dashboard ที่ดีช่วยให้ทีมเห็นปัญหาและเลือก action ได้ในไม่กี่นาที",
      vocab: "Dashboard",
    },
    "Experiment Readout": {
      summaryTh: "Experiment readout คือการสรุปผลทดลองแบบซื่อสัตย์ ทั้งสิ่งที่ชนะ ไม่ชนะ และสิ่งที่ทีมควรเรียนรู้ต่อ",
      what: "Readout ควรมี hypothesis, variant, metric, sample caveat, result, interpretation และ recommendation",
      why: "A/B test ที่ดีไม่ได้มีค่าเฉพาะตอนชนะ แต่ช่วยลดความไม่แน่นอนและบันทึก learning ของทีม",
      how: "เริ่มจาก hypothesis เดิม เทียบผลกับ success metric แล้วแยก statistical result ออกจาก product interpretation",
      example: "ถ้าปุ่ม Start Practice เพิ่ม click แต่ completion ไม่เพิ่ม อาจแปลว่าข้อความดึงดูดขึ้นแต่คุณภาพ session ยังไม่ดีพอ",
      mistake: "ประกาศว่าชนะจากตัวเลขเล็ก ๆ โดยไม่ดู sample, duration หรือ guardrail metric",
      takeaway: "Experiment readout ที่ดีทำให้ทีมเรียนรู้และตัดสินใจรอบต่อไปแม่นขึ้น",
      vocab: "Experiment Readout",
    },
    "Portfolio Analytics Case Study": {
      summaryTh: "Analytics case study ที่ดีแสดงวิธีตั้งคำถาม ตรวจข้อมูล วิเคราะห์ และเล่า insight จนเกิด decision",
      what: "Portfolio สำหรับ Data/Product Analyst ควรแสดง problem framing, metric definition, data logic, analysis, recommendation และ impact",
      why: "Hiring manager อยากเห็นว่าคุณไม่ได้แค่ใช้ tool ได้ แต่คิดเป็น ตรวจความน่าเชื่อถือได้ และเล่าเรื่องจากข้อมูลได้",
      how: "ใช้โครง: business question → data source → metric logic → analysis → insight → recommendation → limitation",
      example: "วิเคราะห์ funnel ของ learning app แล้วพบว่าผู้ใช้หลุดหลัง feedback เพราะ explanation ยาวเกิน จึงเสนอทดลอง summary card",
      mistake: "โชว์ dashboard สวย แต่ไม่อธิบายว่าตัดสินใจอะไรจากข้อมูลนั้น",
      takeaway: "Case study ที่ดีทำให้คนเห็นทั้ง analytical thinking และ product judgment",
      vocab: "Analytics Case Study",
    },
    "Mastering Communication and CX Overview": {
      summaryTh: "คอร์สนี้รวม communication, crisis, persuasion และ customer experience เพื่อสร้าง trust และ satisfaction ที่วัดผลได้",
      what: "Communication & CX Mastery คือการออกแบบวิธีสื่อสารและระบบประสบการณ์ลูกค้าให้เข้าใจง่าย เชื่อถือได้ และแก้ปัญหาได้เร็ว",
      why: "ประสบการณ์ลูกค้าไม่ได้เกิดจาก service script อย่างเดียว แต่เกิดจากระบบคน เครื่องมือ metric และการสื่อสารในช่วงปกติและช่วงวิกฤต",
      how: "ฝึกจาก trust, crisis, persuasion, metrics, ecosystem, tools, team และ storytelling เพื่อเชื่อม CX กับ growth",
      example: "เมื่อบริการขัดข้อง ทีมต้องแจ้งสถานการณ์อย่างโปร่งใส ลดความกังวล แก้ปัญหา และตามผล satisfaction หลังเหตุการณ์",
      mistake: "มอง CX เป็นเรื่องคำพูดสวย ๆ โดยไม่เชื่อมกับ root cause, metric หรือ ownership",
      takeaway: "CX ที่ดีสร้างความไว้วางใจในวันที่ทุกอย่างราบรื่น และปกป้องความไว้วางใจในวันที่เกิดปัญหา",
      vocab: "Customer Experience",
    },
    "Understanding Trusted Customer Experience": {
      summaryTh: "Trusted CX คือประสบการณ์ที่ลูกค้ารู้สึกว่าแบรนด์เข้าใจ ซื่อสัตย์ และช่วยแก้ปัญหาได้จริง",
      what: "ความไว้วางใจเกิดจาก expectation ที่ชัด การทำตามสัญญา การสื่อสารตรงไปตรงมา และ service recovery ที่รับผิดชอบ",
      why: "ลูกค้าอาจให้อภัยปัญหาได้ถ้ารู้สึกว่าองค์กรโปร่งใสและจัดการอย่างจริงใจ แต่จะเสีย trust เร็วถ้ารู้สึกถูกทิ้ง",
      how: "ออกแบบ touchpoint ที่บอก status, next step, owner, timeline และช่องทางขอความช่วยเหลือให้ชัด",
      example: "หลังแจ้งเคลม ลูกค้าควรเห็นว่าเอกสารครบไหม ใครดูแล ขั้นตอนถัดไปคืออะไร และใช้เวลาประมาณเท่าไร",
      mistake: "สื่อสารด้วยคำกว้าง ๆ เช่น “กำลังดำเนินการ” โดยไม่บอก next step หรือเวลาโดยประมาณ",
      takeaway: "Trust เกิดจากความชัด ความสม่ำเสมอ และการรับผิดชอบต่อประสบการณ์ทั้งหมด",
      vocab: "Trusted CX",
    },
    "Crisis, Confidence and Conversion": {
      summaryTh: "ในช่วงวิกฤต การสื่อสารที่ดีต้องลดความกลัว เพิ่มความมั่นใจ และรักษาโอกาส conversion อย่างมีจริยธรรม",
      what: "Crisis communication ต้องให้ข้อมูลเร็ว ชัด ซื่อสัตย์ และบอก action ที่ลูกค้าทำได้ทันที",
      why: "ช่วงวิกฤตเป็นช่วงที่ trust เปราะบางที่สุด ถ้าสื่อสารผิดลูกค้าจะสับสน โกรธ หรือย้ายไปคู่แข่ง",
      how: "ใช้โครง acknowledge → explain what happened → say what we are doing → tell customer action → update cadence",
      example: "ถ้าระบบชำระเงินล่ม ให้บอกช่องทางสำรอง ระยะเวลาอัปเดต และยืนยันว่าข้อมูล/เงินปลอดภัยหรือไม่",
      mistake: "พยายามขายต่อทันทีโดยยังไม่ตอบความกังวลหลักของลูกค้า",
      takeaway: "Confidence มาก่อน conversion โดยเฉพาะในช่วงที่ลูกค้ากำลังไม่มั่นใจ",
      vocab: "Crisis Confidence",
    },
    "Problem Solving and Persuasion Techniques": {
      summaryTh: "การโน้มน้าวที่ดีเริ่มจากเข้าใจปัญหา ไม่ใช่รีบผลัก solution",
      what: "Persuasion ใน CX คือการช่วยให้ลูกค้าและ stakeholder เห็นเหตุผล ทางเลือก และผลลัพธ์ของแต่ละ decision",
      why: "ปัญหายากมักมี emotion, constraint และ trade-off ถ้าสื่อสารไม่ดี คนจะต่อต้านแม้ solution จะถูก",
      how: "ใช้ listen → reframe → options → evidence → recommendation → confirm next step",
      example: "เมื่อลูกค้าไม่พอใจค่าธรรมเนียม ให้ยอมรับความรู้สึก อธิบายเหตุผล เสนอทางเลือก และยืนยัน action ที่จะช่วยได้",
      mistake: "เถียงเพื่อชนะ แทนที่จะช่วยให้คู่สนทนารู้สึกว่าได้รับการเข้าใจและมีทางออก",
      takeaway: "Persuasion ที่ยั่งยืนคือการสร้างความเข้าใจ ไม่ใช่การกดดัน",
      vocab: "Persuasion",
    },
    "Crisis Communication and SWAT Case": {
      summaryTh: "SWAT case คือการจัดทีมเฉพาะกิจเพื่อรับมือเหตุการณ์เร่งด่วนที่กระทบลูกค้าและชื่อเสียงแบรนด์",
      what: "ทีม SWAT ควรมี owner, decision maker, customer message, operation status, legal/compliance check และ update rhythm",
      why: "ใน crisis เวลาช้าและข้อความไม่ตรงกันทำให้ความเสียหายเพิ่มขึ้นอย่างรวดเร็ว",
      how: "ตั้ง war room แยก severity กำหนด message source of truth และอัปเดตทีม front line ด้วย script เดียวกัน",
      example: "กรณีข้อมูลการสั่งซื้อแสดงผิด ทีม SWAT ต้องตรวจ root cause ระงับผลกระทบ แจ้งลูกค้า และสรุป prevention plan",
      mistake: "ให้แต่ละทีมตอบลูกค้าคนละแบบโดยไม่มี source of truth",
      takeaway: "Crisis ที่ดีต้องมีทั้ง speed, clarity และ ownership",
      vocab: "SWAT Case",
    },
    "Customer Satisfaction Metrics: CSAT, Loyalty and Growth": {
      summaryTh: "CSAT, loyalty และ growth ช่วยวัดว่า CX สร้างความพึงพอใจ ความไว้วางใจ และการเติบโตจริงหรือไม่",
      what: "CSAT วัดความพึงพอใจหลัง interaction ส่วน loyalty และ growth ดูพฤติกรรมระยะยาว เช่น retention, repeat usage และ referral",
      why: "การวัด CX จากความรู้สึกอย่างเดียวไม่พอ ต้องเชื่อมกับพฤติกรรมและผลลัพธ์ธุรกิจ",
      how: "จับคู่ metric กับ journey stage เช่น onboarding CSAT, support resolution, repeat purchase, churn และ referral",
      example: "หลัง service recovery อาจวัด CSAT ทันที และดูว่า customer กลับมาใช้งานหรือยกเลิกใน 30 วันถัดไป",
      mistake: "ดูคะแนนเฉลี่ยอย่างเดียวโดยไม่แยก segment หรือ root cause ของคะแนนต่ำ",
      takeaway: "Metric ที่ดีช่วยให้ CX team รู้ว่าควรแก้ตรงไหนและผลกระทบคืออะไร",
      vocab: "CSAT",
    },
    "Building High-Impact CX Teams": {
      summaryTh: "ทีม CX ที่มี impact ต้องเชื่อม customer insight กับ product, operations, marketing และ leadership",
      what: "High-impact CX team ไม่ใช่แค่รับเรื่องร้องเรียน แต่ต้องหา pattern, เสนอ improvement และผลักดันการแก้ root cause",
      why: "ถ้า CX ถูกแยกจากทีม product/operation ปัญหาเดิมจะกลับมาเรื่อย ๆ และทีม front line จะเหนื่อย",
      how: "กำหนด role, escalation path, insight cadence, service standard และ feedback loop กับทีมที่แก้ปัญหาได้จริง",
      example: "ทุกสัปดาห์ CX team สรุป top pain points พร้อม volume, severity, revenue risk และ owner ที่ควรแก้",
      mistake: "ให้ทีม CX รับอารมณ์ลูกค้าอย่างเดียว แต่ไม่มีอำนาจส่งต่อ root cause",
      takeaway: "CX team ที่ดีต้องมีทั้ง empathy และ operating system",
      vocab: "CX Team",
    },
    "Customer Ecosystem 360": {
      summaryTh: "Customer Ecosystem 360 ช่วยมองลูกค้ารอบด้าน ตั้งแต่ need, touchpoint, data, emotion, support และ business impact",
      what: "Ecosystem 360 รวม customer journey, channel, stakeholder, system, policy และ metric ที่เกี่ยวข้องกับประสบการณ์ลูกค้า",
      why: "ปัญหาลูกค้ามักไม่ได้เกิดจากหน้าจอเดียว แต่อาจเกิดจาก policy, backend, communication หรือ handoff ระหว่างทีม",
      how: "map touchpoint ทั้งก่อน ระหว่าง และหลังใช้บริการ แล้วเชื่อม pain point กับ owner และ metric",
      example: "ปัญหา refund ช้าอาจเกี่ยวกับ payment provider, policy approval, email status และ call center script พร้อมกัน",
      mistake: "แก้แค่ข้อความหน้าเว็บโดยไม่ดูระบบหลังบ้านที่ทำให้ลูกค้ารอจริง",
      takeaway: "มอง ecosystem ทำให้แก้ปัญหาลูกค้าได้ลึกกว่า touchpoint เดี่ยว",
      vocab: "Customer Ecosystem",
    },
    "CX Tools and Frameworks": {
      summaryTh: "CX tools และ frameworks ช่วยจัดระบบ insight, journey, service recovery และ metric ให้ทีมทำงานร่วมกันได้",
      what: "เครื่องมือสำคัญอาจรวม journey map, service blueprint, VOC dashboard, complaint taxonomy, root cause analysis และ playbook",
      why: "ถ้าไม่มี framework ทีมจะรับปัญหาเป็นรายเคส แต่ไม่เห็น pattern ที่ควรแก้ระดับระบบ",
      how: "เลือก tool จากคำถาม เช่น ต้องเข้าใจ journey ใช้ journey map ต้องหา root cause ใช้ 5 whys หรือ fishbone",
      example: "ใช้ service blueprint แยก frontstage/backstage เพื่อดูว่าปัญหาลูกค้าเกิดจากระบบหลังบ้านจุดไหน",
      mistake: "ใช้ framework เพื่อทำเอกสารสวย แต่ไม่เชื่อมกับ decision หรือ owner",
      takeaway: "Framework ที่ดีต้องช่วยให้ทีมเห็นปัญหาและลงมือแก้ได้เร็วขึ้น",
      vocab: "CX Framework",
    },
    "The Art of Communication": {
      summaryTh: "ศิลปะของการสื่อสารคือการทำให้คนรู้สึกได้รับการเข้าใจ พร้อมเห็นทางออกที่ชัดเจน",
      what: "การสื่อสารที่ดีมี tone, timing, structure, empathy, evidence และ next step ที่เหมาะกับสถานการณ์",
      why: "คำพูดเดียวกันอาจสร้าง trust หรือทำลาย trust ได้ ขึ้นอยู่กับจังหวะและวิธีวาง message",
      how: "ใช้ clear opening, acknowledge emotion, explain simply, offer options และ confirm next action",
      example: "แทนที่จะบอกว่า “ทำไม่ได้” ให้บอกว่า “ตอนนี้วิธีนี้ยังทำไม่ได้ เพราะ... ทางเลือกที่ช่วยได้คือ...”",
      mistake: "พูดถูกแต่แข็งเกินไป จนลูกค้ารู้สึกว่าองค์กรไม่เข้าใจปัญหาของเขา",
      takeaway: "Communication ที่ดีคือความชัดเจนที่มีความเป็นมนุษย์",
      vocab: "Communication",
    },
    "AI Career Leverage Map": {
      summaryTh: "AI ช่วยเพิ่ม leverage ให้คนทำงาน creative/product ได้ ถ้าใช้เป็น workflow ไม่ใช่ใช้แทน judgment",
      what: "AI career leverage คือการใช้ AI ช่วยงาน research, writing, planning, prototyping, QA และ documentation เพื่อเพิ่ม output ต่อเวลา",
      why: "ตลาดงานให้ค่ากับคนที่ใช้เครื่องมือใหม่ได้เร็ว แต่ยังคิดเป็น ตรวจเป็น และรับผิดชอบคุณภาพได้",
      how: "แยกงานเป็น research, structure, draft, critique, build และ verify แล้วเลือก prompt/tool ให้ตรงขั้นตอน",
      example: "ก่อนทำ portfolio page ใช้ AI ช่วยแตก outline, ตรวจ hierarchy, สร้าง checklist QA แล้วคุณเป็นคนเลือก decision สุดท้าย",
      mistake: "ส่ง output AI โดยไม่ตรวจ fact, brand tone, accessibility หรือ business context",
      takeaway: "AI ทำให้เร็วขึ้น แต่คุณค่าของคุณคือ judgment และ taste ที่เลือกสิ่งถูกต้อง",
      vocab: "AI Workflow",
    },
    "Prompting for Product Thinking": {
      summaryTh: "Prompt ที่ดีควรถามให้ AI ช่วยคิดเป็น product partner เช่น clarify goal, risk, user segment และ next decision",
      what: "Product prompting คือการเขียนคำสั่งที่ให้บริบท goal, user, constraints, output format และ criteria การตัดสินใจ",
      why: "ถ้า prompt กว้าง AI จะตอบกว้าง แต่ถ้ากำหนด decision ที่ต้องการ จะได้ output ที่ใช้ทำงานต่อได้",
      how: "ใช้โครง: role, context, goal, constraints, examples, output format, quality bar และ ask for questions if unclear",
      example: "You are a senior product designer. Review this checkout flow for user risk, missing states, and business trade-offs. Return findings by severity.",
      mistake: "ขอให้ AI 'ทำให้ดีขึ้น' โดยไม่บอกผู้ใช้ เป้าหมาย ข้อจำกัด หรือรูปแบบผลลัพธ์",
      takeaway: "Prompt ที่ดีทำให้คุณได้ thinking draft ที่ตรวจต่อได้ ไม่ใช่คำตอบสำเร็จรูป",
      vocab: "Prompt Context",
    },
    "AI Output QA Checklist": {
      summaryTh: "คนที่ใช้ AI เก่งต้องตรวจ output เป็น ไม่เชื่อทันที และรู้ว่าจุดไหนเสี่ยงต่อคุณภาพหรือข้อมูล",
      what: "AI QA checklist คือรายการตรวจ fact, logic, source, tone, accessibility, privacy, edge case และ implementation fit",
      why: "งานที่เกี่ยวกับลูกค้า ธุรกิจ หรือข้อมูลบริษัทมีความเสี่ยงสูงถ้าใช้ AI แบบไม่ตรวจ",
      how: "ตรวจด้วยคำถาม: ถูกไหม มีหลักฐานไหม ใช้กับบริบทเราได้ไหม มี bias ไหม ข้อมูลลับหลุดไหม และต้องให้คนไหน review",
      example: "ก่อนส่ง design recommendation ให้ stakeholder ตรวจว่าข้อเสนออิง user evidence หรือแค่ AI เดาจาก pattern ทั่วไป",
      mistake: "ใช้ AI สรุปข้อมูลลูกค้าหรือบริษัทโดยไม่ระวัง privacy และไม่ตรวจแหล่งที่มา",
      takeaway: "AI speed ต้องมาพร้อม human verification",
      vocab: "AI QA",
    },
    "High-income Career Skill Map": {
      summaryTh: "สายรายได้สูงมักไม่ได้มาจาก skill เดี่ยว แต่มาจากการรวม design, product, data, communication และ AI workflow",
      what: "Career skill map คือแผนที่ทักษะที่เชื่อมจากงานที่ทำวันนี้ไปสู่บทบาทที่รับผิดชอบสูงขึ้น เช่น Senior Product Designer, Product Owner หรือ Product Analyst",
      why: "การรู้แค่เครื่องมือไม่พอ งานเงินเดือนสูงมักต้องพิสูจน์ว่าเราตัดสินใจเป็น สื่อสารได้ และสร้างผลลัพธ์ได้",
      how: "จัด skill เป็น 5 กลุ่ม: craft, product thinking, data literacy, stakeholder communication และ delivery workflow",
      example: "จาก UX/UI junior สามารถขยับไป senior/product role ได้ด้วย case study ที่แสดง research, trade-off, metric และ handoff ไม่ใช่แค่หน้าจอสวย",
      mistake: "สะสมคอร์สจำนวนมากแต่ไม่มีหลักฐานผลงานที่เล่าว่าแก้ปัญหาอะไรและผลลัพธ์คืออะไร",
      takeaway: "เงินเดือนสูงขึ้นเมื่อคุณแสดงความรับผิดชอบที่สูงขึ้นผ่านหลักฐานจริง",
      vocab: "Career Skill Map",
    },
    "Portfolio Case Study Structure": {
      summaryTh: "Portfolio ที่พาไปสู่งานดีควรเล่า decision ไม่ใช่แค่โชว์ภาพ UI",
      what: "Case study structure คือโครงเล่า project จาก problem, role, process, decision, outcome และ reflection",
      why: "Hiring manager ต้องการเห็นวิธีคิดและความรับผิดชอบ ไม่ใช่แค่ final screen",
      how: "ใช้โครง: context → problem → constraints → process → key decisions → result → what I learned",
      example: "แทนการโชว์ dashboard เฉย ๆ ให้เล่าว่า metric ไหนตก คุณวิเคราะห์อะไร เปลี่ยน hierarchy อย่างไร และทีมตัดสินใจอะไรต่อ",
      mistake: "ใส่ภาพเยอะ แต่ไม่บอก role, constraint, trade-off หรือ impact",
      takeaway: "Case study ที่ดีทำให้คนจ้างเห็นว่าคุณคิดเหมือนคนทำงานจริง",
      vocab: "Case Study",
    },
    "Showing Business Impact": {
      summaryTh: "Business impact ทำให้ผลงาน design/product ดูมีมูลค่ากับองค์กร แม้ไม่มีตัวเลขสมบูรณ์ก็ยังเล่า evidence ได้",
      what: "Impact คือผลที่งานสร้าง เช่น ลดเวลา เพิ่ม completion ลด error ช่วยทีมส่งงานเร็วขึ้น หรือทำให้ decision ชัดขึ้น",
      why: "บทบาท senior/lead ต้องเชื่อมงานกับผลลัพธ์ ไม่ใช่พูดแค่ว่า UI ดีขึ้น",
      how: "ใช้ evidence 3 แบบ: quantitative metric, qualitative signal และ operational improvement",
      example: "ถ้าไม่มี conversion data อาจเล่าว่า usability test error ลดจาก 5 จุดเหลือ 1 จุด และ handoff checklist ลดคำถามจาก developer",
      mistake: "อ้าง impact เกินจริงหรือใช้ตัวเลขที่พิสูจน์ไม่ได้",
      takeaway: "เล่า impact อย่างซื่อสัตย์ ดีกว่าใส่ตัวเลขใหญ่แต่ไม่น่าเชื่อถือ",
      vocab: "Business Impact",
    },
    "Saving vs Investing": {
      summaryTh: "Saving เน้นความมั่นคงและสภาพคล่อง ส่วน Investing รับความเสี่ยงเพื่อโอกาสเติบโตในระยะยาว",
      what: "Saving คือเงินที่ต้องปลอดภัยและใช้ได้เมื่อจำเป็น Investing คือการนำเงินไปเสี่ยงในสินทรัพย์เพื่อหวังผลตอบแทน แต่มีโอกาสขาดทุน",
      why: "การแยกสองเรื่องนี้ช่วยไม่เอาเงินฉุกเฉินไปเสี่ยงกับตลาด",
      how: "เริ่มจาก emergency fund และเป้าหมายระยะสั้น ก่อนคิดเรื่องพอร์ตฝึกหัดหรือสินทรัพย์เสี่ยง",
      example: "บริษัทสมมติ Alpha Studio ใช้ใน simulation เท่านั้น ไม่ใช่หุ้นจริงหรือคำแนะนำซื้อขาย",
      mistake: "ลงทุนด้วยเงินที่ต้องใช้เร็ว ๆ นี้และคาดหวังผลตอบแทนแน่นอน",
      vocab: "Emergency Fund",
    },
    "Risk and Return": {
      what: "Risk คือความไม่แน่นอนของผลลัพธ์ Return คือผลตอบแทนที่อาจได้หรือเสีย",
      why: "ผลตอบแทนที่สูงขึ้นมักมาพร้อมความเสี่ยงที่ต้องเข้าใจ ไม่มีผลตอบแทนสูงที่รับประกันได้อย่างปลอดภัย",
      how: "ดู time horizon, volatility, concentration และความสามารถในการรับการขาดทุนก่อนตัดสินใจ",
      example: "ใน simulation พอร์ต A แกว่งน้อยกว่าแต่โตช้ากว่า พอร์ต B แกว่งมากกว่าและอาจขาดทุนหนักในบางปี",
      mistake: "เชื่อข้อความรับประกันผลตอบแทนสูงโดยไม่ตรวจสอบใบอนุญาตหรือแหล่งข้อมูล",
      vocab: "Risk Tolerance",
    },
    "Reading a Business": {
      what: "Reading a business คือการเข้าใจว่าบริษัทหารายได้อย่างไร มีต้นทุนอะไร ลูกค้าคือใคร และความเสี่ยงอยู่ตรงไหน",
      why: "ราคาไม่พอ ต้องเข้าใจคุณภาพและความเสี่ยงของธุรกิจด้วย",
      how: "อ่าน business model, revenue, margin, debt, competition และ management discussion จากข้อมูลที่เชื่อถือได้",
      example: "บริษัทสมมติ Northwind Snacks โตเร็วแต่พึ่งลูกค้ารายใหญ่หนึ่งราย นี่คือ business risk ที่ต้องสังเกต",
      vocab: "Business Model",
    },
    Diversification: {
      what: "Diversification คือการกระจายการลงทุนเพื่อลดผลกระทบจากสินทรัพย์หรือบริษัทเดียว",
      why: "ถ้าพอร์ตกระจุกตัว ความผิดพลาดเดียวอาจกระทบหนักเกินไป",
      how: "กระจายตาม asset class, sector, geography และ position size โดยเข้าใจว่าการกระจายไม่ได้รับประกันกำไร",
      example: "practice portfolio ที่มีหุ้นสมมติ 1 ตัว 90% เสี่ยงกว่าพอร์ตที่กระจายหลายกลุ่มธุรกิจ",
      vocab: "Diversification",
    },
    "Understanding the Tax Year": {
      summaryTh: "ปีภาษีไทยโดยทั่วไปอิงปีปฏิทิน แต่รายละเอียดการยื่นและเอกสารต้องตรวจข้อมูลปัจจุบันจากกรมสรรพากร",
      what: "Tax year คือช่วงเวลาที่ใช้รวมรายได้และข้อมูลเพื่อยื่นภาษี บุคคลธรรมดาไทยโดยทั่วไปเรียนตามปีปฏิทินในภาพรวม",
      why: "เข้าใจปีภาษีช่วยจัดเอกสาร รายได้ และภาษีหัก ณ ที่จ่ายให้ตรงช่วงเวลา",
      how: "แยกเอกสารตามปีรายได้ ตรวจ deadline และแบบฟอร์มปัจจุบันจากกรมสรรพากรก่อนยื่นจริง",
      example: "สถานการณ์สมมติ: รายได้ freelance เดือนธันวาคมควรถูกจัดเข้าปีภาษีตามวันที่ได้รับเงินจริงและหลักฐานที่เกี่ยวข้อง",
      mistake: "ใช้ deadline หรือ allowance จากบทความเก่าโดยไม่ตรวจปีภาษี",
      vocab: "Tax Year",
    },
    "Income, Expenses, Deductions and Allowances": {
      what: "Income คือรายได้ Expenses คือค่าใช้จ่ายที่เกี่ยวข้อง Deductions/Allowances คือรายการลดหย่อนหรือหักได้ตามเงื่อนไขของปีภาษี",
      why: "คำเหล่านี้เปลี่ยนผลลัพธ์ภาษีได้ แต่รายละเอียดปัจจุบันต้องดูตามปีภาษีและแหล่งทางการ",
      how: "จัดหมวดรายได้ เก็บหลักฐาน แล้วตรวจว่ารายการใดใช้ได้กับปีภาษีและสถานะของตน",
      example: "สถานการณ์สมมติ: พนักงานที่มี freelance เพิ่มควรแยกเอกสารเงินเดือน ใบหักภาษี ณ ที่จ่าย และค่าใช้จ่ายที่เกี่ยวข้อง",
      mistake: "คิดว่ารายการลดหย่อนของคนอื่นใช้กับตัวเองได้เสมอ",
      vocab: "Allowance",
    },
    "Withholding Tax Fundamentals": {
      what: "Withholding tax คือภาษีที่ถูกหักไว้ก่อนจ่ายเงิน ไม่ได้แปลว่าภาษีสุดท้ายจบแล้วเสมอไป",
      why: "หลายคนสับสนระหว่าง tax withheld กับ tax payable จึงควรเข้าใจว่าเงินที่ถูกหักคือเครดิตหรือข้อมูลสำหรับคำนวณปลายปี",
      how: "เก็บหนังสือรับรองการหักภาษี ณ ที่จ่าย และเทียบกับรายได้ที่ได้รับในปีภาษี",
      example: "freelancer สมมติได้รับค่าจ้างหลังถูกหักภาษี ณ ที่จ่าย ต้องเก็บเอกสารเพื่อใช้ประกอบการยื่น",
      vocab: "Withholding Tax",
    },
    "Preparing Documents for Filing": {
      what: "การเตรียมเอกสารคือการรวมหลักฐานรายได้ ภาษีที่ถูกหัก และรายการที่อาจใช้ประกอบการยื่น",
      why: "เอกสารดีช่วยลดความสับสนและทำให้ถามผู้เชี่ยวชาญได้ตรงจุด",
      how: "แยกโฟลเดอร์ตามปีภาษี เก็บใบรับรองเงินเดือน ใบหัก ณ ที่จ่าย หลักฐานรายได้ และเอกสารลดหย่อนที่เกี่ยวข้อง",
      example: "ก่อนยื่นจริง ให้ทำ checklist เอกสารและตรวจข้อมูลล่าสุดบนเว็บไซต์กรมสรรพากร",
      vocab: "Filing Document",
    },
  };

  return { ...base, ...copy[title] };
}

function expandedTopicVisual(pathId: string, title: string): LessonVisualMedia {
  if (
    pathId === "career-portfolio" ||
    title === "UX Researcher Career Map" ||
    title === "UX Research Method Overview" ||
    title === "Research Method Portfolio" ||
    title === "UX/UI Design in Agile Overview" ||
    title === "Agile UX/UI Portfolio Case" ||
    title === "Design System Overview" ||
    title === "Design System Portfolio Case" ||
    title === "Data Analyst Career Map" ||
    title === "Product Owner Career Map" ||
    title === "Product Analytics Career Map" ||
    title === "AI Career Leverage Map" ||
    title === "Mastering Communication and CX Overview" ||
    title === "CX Portfolio and Case Practice" ||
    title === "Portfolio Research Case Study" ||
    title === "Portfolio Analytics Case Study"
  ) {
    return {
      type: "image",
      titleEn: "Career Skill Map",
      descriptionTh: "ภาพนี้ช่วยให้เห็นว่าบทบาทรายได้สูงมักเกิดจากการรวม design, product, data, business และ communication ไม่ใช่ทักษะเดียวแยกขาด",
      src: "/lesson-images/career-product-map.svg",
      altEn: "A career skill map connecting design, product, data, and business into stronger career opportunities.",
      altTh: "แผนที่ทักษะอาชีพที่เชื่อม design, product, data และ business เข้ากับโอกาสเติบโต",
      width: 1200,
      height: 760,
      items: ["Design", "Product", "Data", "Business", "Career impact"],
    };
  }

  return {
    type: "flow",
    titleEn: "Visual Example",
    descriptionTh: "ตัวอย่างนี้เป็นภาพรวมเชิง concept เพื่อช่วยจำลำดับความคิด",
    items: ["Context", "Decision", "Risk", "Next step"],
  };
}

function makeExpandedLesson(path: LearningPath, title: string, index: number): LearningLesson {
  const alias = expandedSeedAlias(path.id, title);
  const copy = expandedTopicCopy(path.id, alias);
  const id = `${path.id}-${slugify(title)}`;
  const verification = pathVerification(path.id, title);
  const terminology = [
    vocab(`${id}-vocab-main`, copy.vocab, `คำศัพท์หลักของ ${title}`, `A key concept used in ${path.name}.`, title),
    vocab(`${id}-vocab-context`, "Scenario", "สถานการณ์สมมติสำหรับฝึกคิด", "A fictional practice situation used for learning.", title),
  ];

  return {
    id,
    slug: slugify(title),
    moduleId: `${path.id}-${slugify(title)}`,
    learningPathId: path.id,
    number: index + 1,
    title,
    titleEn: alias,
    titleTh: `${title} สำหรับการเรียนรู้แบบใช้งานจริง`,
    description: copy.summaryTh,
    summaryTh: copy.summaryTh,
    difficulty: path.currentLevel,
    professionalLevel: path.currentLevel,
    readingMinutes: 8,
    estimatedMinutes: 8,
    relatedTopic: title,
    hasPractice: true,
    introductionTh: copy.summaryTh,
    objectives: [`Explain ${copy.vocab} in simple English.`, "Apply the concept to a fictional practice scenario.", "Identify one common mistake before practice."],
    sections: [
      section("what-it-means", "What It Means", [copy.what]),
      section("why-it-matters", "Why It Matters", [copy.why]),
      section("how-it-works", "How It Works", [copy.how]),
    ],
    practicalExamples: [{ titleEn: "Practice Scenario", bodyTh: copy.example }],
    visualMedia: [expandedTopicVisual(path.id, alias)],
    commonMistakes: [copy.mistake],
    commonMistakesTh: [copy.mistake],
    juniorThinking: `I know the term ${copy.vocab}.`,
    seniorThinking: "I can explain when this concept changes a decision.",
    juniorVsSenior: {
      junior: `I know the term ${copy.vocab}.`,
      senior: "I can explain when this concept changes a decision.",
      juniorTh: "จำคำศัพท์ได้",
      seniorTh: "เชื่อมคำศัพท์กับ decision, risk และสถานการณ์จริงได้",
    },
    explanation: copy.what,
    explanationTh: copy.what,
    terminology,
    vocabulary: terminology,
    workplaceExample: copy.example,
    workplaceExampleTh: copy.example,
    diagram: ["Context", "Decision", "Risk", "Next step"],
    keyTakeaway: copy.takeaway,
    keyTakeawayTh: copy.takeaway,
    miniCheck: check(`What is the safest way to use ${copy.vocab}?`, `ควรใช้ ${copy.vocab} อย่างไรให้ปลอดภัยและมีเหตุผล?`, "Use it with a clear scenario, evidence, and limits.", "Treat it as a guaranteed answer.", "Skip official or regulated sources.", "คำตอบที่ดีต้องเห็นบริบท ข้อจำกัด และไม่อ้างผลลัพธ์เกินจริง"),
    miniKnowledgeCheck: check(`What is the safest way to use ${copy.vocab}?`, `ควรใช้ ${copy.vocab} อย่างไรให้ปลอดภัยและมีเหตุผล?`, "Use it with a clear scenario, evidence, and limits.", "Treat it as a guaranteed answer.", "Skip official or regulated sources.", "คำตอบที่ดีต้องเห็นบริบท ข้อจำกัด และไม่อ้างผลลัพธ์เกินจริง"),
    relatedQuestionIds: [`${path.id}-q-${slugify(title)}`],
    references: verification?.officialSourceNames ?? ["Supreya Atipongchai curriculum"],
    completionStatus: "ready-for-practice",
    contentVerification: verification,
    personalNoteEnabled: true,
    placeholder: false,
    category: path.id === "stock-investing" || path.id === "thai-tax-personal-finance" ? "Money & Life" : "Career & Design",
  };
}

const supportingLessons = learningPaths
  .filter((path) => path.id !== "ux-ui")
  .flatMap((path) =>
    expandedPathTopics[path.id as keyof typeof expandedPathTopics]
      ? expandedPathTopics[path.id as keyof typeof expandedPathTopics].map((title, index) => makeExpandedLesson(path, title, index))
      : (pathChapterTitles[path.id] ?? [path.name]).map((title, index) => makePathLesson(path, title, index)),
  );

export const lessons: LearningLesson[] = [...uxLessons, ...supportingLessons];

export function lessonsForPath(pathId: string) {
  return lessons.filter((lesson) => lesson.learningPathId === pathId);
}

export function modulesForPath(pathId: string) {
  if (pathId === "ux-ui") return curriculumModules;
  return expandedModules[pathId] ?? [];
}

export function findPathBySlug(slug: string) {
  return learningPaths.find((path) => path.id === slug);
}

export function findLesson(pathSlug: string, lessonSlug: string) {
  return lessons.find((lesson) => lesson.learningPathId === pathSlug && lesson.slug === lessonSlug);
}

export function findLessonById(lessonId: string) {
  return lessons.find((lesson) => lesson.id === lessonId);
}

export function adjacentLessons(pathSlug: string, lessonSlug: string) {
  const pathLessons = lessonsForPath(pathSlug);
  const index = pathLessons.findIndex((lesson) => lesson.slug === lessonSlug);
  return {
    previous: index > 0 ? pathLessons[index - 1] : undefined,
    next: index >= 0 && index < pathLessons.length - 1 ? pathLessons[index + 1] : undefined,
  };
}
