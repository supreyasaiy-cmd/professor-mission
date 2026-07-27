import type { LearningPathName } from "@/types/skillquest";
import type { MetallicIconCategory, MetallicIconTone, Soft3DIconName } from "./icon-types";

type IconDefinition = {
  src: string;
  alt: string;
  category: MetallicIconCategory;
  tone: MetallicIconTone;
};

export const soft3DIconRegistry: Record<Soft3DIconName, IconDefinition> = {
  navigationHome: { src: "/icons/3d/navigation-home.svg", alt: "Home", category: "navigation", tone: "silver" },
  navigationLearn: { src: "/icons/3d/navigation-learn.svg", alt: "Learn", category: "navigation", tone: "silver" },
  navigationPractice: { src: "/icons/3d/navigation-practice.svg", alt: "Practice", category: "navigation", tone: "silver" },
  navigationReview: { src: "/icons/3d/navigation-review.svg", alt: "Review", category: "navigation", tone: "silver" },
  navigationProgress: { src: "/icons/3d/navigation-progress.svg", alt: "Progress", category: "navigation", tone: "mint" },
  navigationSettings: { src: "/icons/3d/navigation-settings.svg", alt: "Settings", category: "navigation", tone: "graphite" },
  brandMission: { src: "/icons/3d/brand-mission-cutout.png?v=uploaded-star-2", alt: "Professor Mission", category: "hero", tone: "blue" },
  skillUxUi: { src: "/icons/3d/skill-ux-ui.svg", alt: "UX/UI Design", category: "learningPath", tone: "blue" },
  skillProductDesign: { src: "/icons/3d/skill-product-design.svg", alt: "Product Design", category: "learningPath", tone: "blue" },
  skillCreativeThinking: { src: "/icons/3d/skill-creative-thinking.svg", alt: "Creative Thinking", category: "learningPath", tone: "violet" },
  skillArtDirection: { src: "/icons/3d/skill-art-direction.svg", alt: "Art Direction", category: "learningPath", tone: "champagne" },
  skillUxWriting: { src: "/icons/3d/skill-ux-writing.svg", alt: "UX Writing", category: "learningPath", tone: "mint" },
  skillGraphicDesign: { src: "/icons/3d/skill-graphic-design.svg", alt: "Graphic Design", category: "learningPath", tone: "violet" },
  skillIelts: { src: "/icons/3d/skill-ielts.svg", alt: "IELTS Preparation", category: "learningPath", tone: "blue" },
  skillEnglishWork: { src: "/icons/3d/skill-english-work.svg", alt: "English for Work", category: "learningPath", tone: "mint" },
  skillCommunication: { src: "/icons/3d/skill-communication.svg", alt: "Communication", category: "learningPath", tone: "champagne" },
  skillCriticalThinking: { src: "/icons/3d/skill-critical-thinking.svg", alt: "Critical Thinking", category: "learningPath", tone: "graphite" },
  skillDesignOps: { src: "/icons/3d/skill-designops.svg", alt: "DesignOps", category: "learningPath", tone: "graphite" },
  skillUxResearch: { src: "/icons/3d/skill-ux-research.svg", alt: "UX Research", category: "learningPath", tone: "blue" },
  skillStockInvesting: { src: "/icons/3d/skill-stock-investing.svg", alt: "Stock Investing", category: "learningPath", tone: "mint" },
  skillThaiTax: { src: "/icons/3d/skill-thai-tax.svg", alt: "Thai Tax and Personal Finance", category: "learningPath", tone: "champagne" },
  skillDataAnalysis: { src: "/icons/3d/skill-data-analysis.svg", alt: "Data Analysis", category: "learningPath", tone: "blue" },
  skillProjectManagement: { src: "/icons/3d/skill-project-management.svg", alt: "Project Management", category: "learningPath", tone: "graphite" },
  actionHint: { src: "/icons/3d/action-hint.svg", alt: "Hint", category: "action", tone: "champagne" },
  actionTranslation: { src: "/icons/3d/action-translation.svg", alt: "Translation", category: "action", tone: "blue" },
  actionSubmit: { src: "/icons/3d/action-submit.svg", alt: "Submit", category: "action", tone: "blue" },
  actionNext: { src: "/icons/3d/action-next.svg", alt: "Next", category: "action", tone: "silver" },
  actionPrevious: { src: "/icons/3d/action-previous.svg", alt: "Previous", category: "action", tone: "silver" },
  actionZoom: { src: "/icons/3d/action-zoom.svg", alt: "Zoom", category: "action", tone: "graphite" },
  actionSave: { src: "/icons/3d/action-save.svg", alt: "Save", category: "action", tone: "mint" },
  actionBookmark: { src: "/icons/3d/action-bookmark.svg", alt: "Bookmark", category: "action", tone: "violet" },
  actionNote: { src: "/icons/3d/action-note.svg", alt: "Note", category: "action", tone: "champagne" },
  statusXp: { src: "/icons/3d/status-xp.svg", alt: "XP", category: "status", tone: "blue" },
  statusStreak: { src: "/icons/3d/status-streak.svg", alt: "Streak", category: "status", tone: "champagne" },
  statusCorrect: { src: "/icons/3d/status-correct.svg", alt: "Correct", category: "status", tone: "mint" },
  statusIncorrect: { src: "/icons/3d/status-incorrect.svg", alt: "Incorrect", category: "status", tone: "champagne" },
  statusReviewDue: { src: "/icons/3d/status-review-due.svg", alt: "Review due", category: "status", tone: "violet" },
  statusCompleted: { src: "/icons/3d/status-completed.svg", alt: "Completed", category: "status", tone: "mint" },
  statusInProgress: { src: "/icons/3d/status-in-progress.svg", alt: "In progress", category: "status", tone: "blue" },
  statusLocked: { src: "/icons/3d/status-locked.svg", alt: "Locked", category: "status", tone: "graphite" },
  statusMastered: { src: "/icons/3d/status-mastered.svg", alt: "Mastered", category: "status", tone: "violet" },
  statusLevelUp: { src: "/icons/3d/status-level-up.svg", alt: "Level up", category: "status", tone: "blue" },
  statusGoal: { src: "/icons/3d/status-goal.svg", alt: "Goal", category: "status", tone: "mint" },
  statusAccuracy: { src: "/icons/3d/status-accuracy.svg", alt: "Accuracy", category: "status", tone: "blue" },
};

export const learningPathIconMap: Record<LearningPathName, Soft3DIconName> = {
  "UX/UI Design": "skillUxUi",
  "Product Design": "skillProductDesign",
  "Creative Thinking": "skillCreativeThinking",
  "Art Direction": "skillArtDirection",
  "UX Writing": "skillUxWriting",
  "Graphic Design": "skillGraphicDesign",
  "IELTS Preparation": "skillIelts",
  "English for Work": "skillEnglishWork",
  Communication: "skillCommunication",
  "Critical Thinking": "skillCriticalThinking",
  DesignOps: "skillDesignOps",
  "UX Research": "skillUxResearch",
  "Product Owner": "skillProjectManagement",
  "Product Analytics": "skillDataAnalysis",
  "AI Product Workflow": "skillProjectManagement",
  "Career Portfolio": "skillProductDesign",
  "Stock Investing": "skillStockInvesting",
  "Thai Tax & Personal Finance": "skillThaiTax",
};
