export type LearningPathName =
  | "UX/UI Design"
  | "Product Design"
  | "Creative Thinking"
  | "Art Direction"
  | "UX Writing"
  | "Graphic Design"
  | "English for Work"
  | "IELTS Preparation"
  | "Communication"
  | "Critical Thinking"
  | "DesignOps"
  | "UX Researcher"
  | "UX Research Method"
  | "UX/UI Design on Agile Way"
  | "Design System"
  | "Product Owner"
  | "Product Data Analyst"
  | "AI Product Workflow"
  | "Career Portfolio"
  | "Communication & CX Mastery"
  | "Stock Investing"
  | "Thai Tax & Personal Finance";

export type Difficulty =
  | "Beginner"
  | "Junior"
  | "Mid-level"
  | "Senior"
  | "Lead"
  | "B1"
  | "B2"
  | "C1";

export type LanguageMode = "TH" | "EN" | "TH_EN";

export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type IeltsMode = "learn" | "exam";

export type IeltsTargetBand = "5.0" | "5.5" | "6.0" | "6.5" | "7.0" | "7.5" | "8.0+";

export interface LearningPath {
  id: string;
  name: LearningPathName;
  nameTh: string;
  description: string;
  descriptionTh: string;
  currentLevel: Difficulty;
  currentGoal: string;
  currentGoalTh: string;
  accent: string;
}

export interface Choice {
  id: string;
  text: string;
  textTh?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  thaiMeaning: string;
  partOfSpeech: string;
  simpleDefinition: string;
  exampleSentence: string;
  exampleTranslationTh: string;
  skill: string;
  topic: string;
  saved?: boolean;
}

export type LessonStatus = "not-started" | "in-progress" | "completed" | "ready-for-practice" | "review-recommended";

export interface CurriculumModule {
  id: string;
  number: number;
  titleEn: string;
  titleTh: string;
  descriptionTh: string;
  lessonIds: string[];
}

export type ContentVerification = {
  jurisdiction?: "TH";
  taxYear?: number;
  lastVerifiedAt?: string;
  verificationStatus: "evergreen" | "time-sensitive" | "needs-review" | "archived";
  officialSourceNames?: string[];
  disclaimer?: {
    en: string;
    th: string;
  };
};

export interface LessonChapter {
  id: string;
  slug: string;
  number: number;
  title: string;
  titleTh: string;
  description: string;
  difficulty: Difficulty;
  readingMinutes: number;
  relatedTopic: string;
  hasPractice: boolean;
}

export interface LessonMiniCheck {
  question: string;
  questionTh: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  explanationTh: string;
}

export interface LessonSection {
  id: string;
  titleEn: string;
  bodyTh: string[];
  bullets?: string[];
}

export interface LessonPracticalExample {
  titleEn: string;
  bodyTh: string;
}

export interface LessonVisualMedia {
  type: "diagram" | "figma-grid-cheat-sheet" | "flow" | "image";
  titleEn: string;
  descriptionTh: string;
  src?: string;
  altEn?: string;
  altTh?: string;
  width?: number;
  height?: number;
  items?: string[];
}

export interface JuniorVsSeniorThinking {
  junior: string;
  senior: string;
  juniorTh: string;
  seniorTh: string;
}

export interface LearningLesson extends LessonChapter {
  learningPathId: string;
  moduleId?: string;
  titleEn?: string;
  summaryTh?: string;
  professionalLevel?: Difficulty;
  estimatedMinutes?: number;
  sections?: LessonSection[];
  practicalExamples?: LessonPracticalExample[];
  visualMedia?: LessonVisualMedia[];
  juniorVsSenior?: JuniorVsSeniorThinking;
  vocabulary?: VocabularyItem[];
  personalNoteEnabled?: boolean;
  miniKnowledgeCheck?: LessonMiniCheck;
  relatedQuestionIds?: string[];
  references?: string[];
  completionStatus?: LessonStatus;
  category?: "Career & Design" | "Money & Life";
  contentVerification?: ContentVerification;
  placeholder?: boolean;
  introductionTh: string;
  objectives: string[];
  explanation: string;
  explanationTh: string;
  terminology: VocabularyItem[];
  workplaceExample: string;
  workplaceExampleTh: string;
  diagram?: string[];
  commonMistakes?: string[];
  commonMistakesTh?: string[];
  juniorThinking?: string;
  seniorThinking?: string;
  keyTakeaway: string;
  keyTakeawayTh: string;
  miniCheck?: LessonMiniCheck;
}

export interface QuestionImageAsset {
  id: string;
  src: string;
  altEn: string;
  altTh: string;
  captionEn?: string;
  captionTh?: string;
  label?: string;
  width: number;
  height: number;
}

export interface QuestionMedia {
  type: "single-image" | "image-comparison";
  images: QuestionImageAsset[];
  displayMode?: "contain" | "cover";
  allowZoom?: boolean;
}

export interface Question {
  id: string;
  learningPathId?: string;
  lessonId?: string;
  chapterId?: string;
  topicId?: string;
  learningPath: LearningPathName;
  skill: string;
  skillTh?: string;
  topic: string;
  topicTh?: string;
  difficulty: Difficulty;
  question: string;
  questionTh?: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  explanationTh?: string;
  incorrectFeedback: Record<string, string>;
  incorrectFeedbackTh?: Record<string, string>;
  practicalExample: string;
  practicalExampleTh?: string;
  keyTakeaway: string;
  keyTakeawayTh?: string;
  hint: string;
  hintTh?: string;
  vocabulary?: VocabularyItem[];
  media?: QuestionMedia;
  contentVerification?: ContentVerification;
}

export interface AnswerRecord {
  questionId: string;
  selectedChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
}

export interface ReviewItem {
  questionId: string;
  totalAttempts: number;
  incorrectAttempts: number;
  lastAnsweredAt: string;
  nextReviewAt: string;
}

export interface ProgressState {
  totalXP: number;
  dailyGoal: number;
  currentStreak: number;
  completedQuestionIds: string[];
  answers: AnswerRecord[];
  reviewQueue: ReviewItem[];
  savedVocabulary: VocabularyItem[];
  lessons: Record<string, LessonProgress>;
  savedNotes: SavedNote[];
  activePathId?: string;
}

export interface SavedNote {
  lessonId: string;
  text: string;
  savedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  startedAt?: string;
  lastOpenedAt?: string;
  readingProgress: number;
  completed: boolean;
  reviewFlag: boolean;
  bookmarked?: boolean;
  miniCheckCorrect?: boolean;
  savedVocabularyIds: string[];
  note?: string;
}

export interface QuizSessionState {
  pathId: string;
  lessonId?: string;
  chapterId?: string;
  topicId?: string;
  questionIds: string[];
  currentIndex: number;
  answers: AnswerRecord[];
  completed: boolean;
}

export interface UserSettings {
  languageMode: LanguageMode;
  currentEnglishLevel: EnglishLevel;
  targetEnglishLevel: EnglishLevel;
  ieltsTargetBand: IeltsTargetBand;
  ieltsMode: IeltsMode;
}
