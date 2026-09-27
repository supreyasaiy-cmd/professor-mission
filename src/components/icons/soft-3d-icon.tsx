"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  BookOpenText,
  Bookmark,
  Brain,
  BriefcaseBusiness,
  ChartBar,
  ChartNoAxesColumnIncreasing,
  Check,
  CircleCheck,
  ClipboardList,
  Compass,
  Flame,
  FlaskConical,
  Gauge,
  GraduationCap,
  House,
  Languages,
  Layers3,
  Lightbulb,
  LoaderCircle,
  LockKeyhole,
  MessageSquareText,
  MessagesSquare,
  MousePointer2,
  NotebookPen,
  Palette,
  PenTool,
  RotateCcw,
  Save,
  SearchCheck,
  Send,
  Settings,
  Sparkles,
  Star,
  Target,
  Clock3,
  TrendingUp,
  Trophy,
  Workflow,
  X,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
import { soft3DIconRegistry } from "./icon-registry";
import type { MetallicIconTone, Soft3DIconName, Soft3DIconSize } from "./icon-types";

const sizeClasses: Record<Soft3DIconSize, { box: string; image: number; line: string; stroke: number }> = {
  xs: { box: "h-6 w-6", image: 32, line: "h-4 w-4", stroke: 2.7 },
  nav: { box: "h-7 w-7", image: 42, line: "h-6 w-6", stroke: 2.35 },
  navLg: { box: "h-9 w-9", image: 56, line: "h-8 w-8", stroke: 2.25 },
  sm: { box: "h-8 w-8", image: 48, line: "h-6 w-6", stroke: 2.35 },
  md: { box: "h-12 w-12", image: 72, line: "h-9 w-9", stroke: 2.2 },
  brand: { box: "h-10 w-10", image: 72, line: "h-8 w-8", stroke: 2.2 },
  lg: { box: "h-20 w-20", image: 112, line: "h-14 w-14", stroke: 2 },
  xl: { box: "h-32 w-32 sm:h-40 sm:w-40", image: 180, line: "h-24 w-24 sm:h-28 sm:w-28", stroke: 1.8 },
};

/* drop-shadow() takes exactly one shadow, so a two-layer --elev-* token is
   invalid here and silently renders nothing. Active icons get a tone-matched
   glow instead, which is what reads on dark anyway. */
const compactIconMap: Record<Soft3DIconName, LucideIcon> = {
  navigationHome: House,
  navigationLearn: GraduationCap,
  navigationPractice: FlaskConical,
  navigationReview: RotateCcw,
  navigationProgress: ChartNoAxesColumnIncreasing,
  navigationSettings: Settings,
  brandMission: Compass,
  skillUxUi: MousePointer2,
  skillProductDesign: Layers3,
  skillCreativeThinking: Sparkles,
  skillArtDirection: Palette,
  skillUxWriting: MessageSquareText,
  skillGraphicDesign: PenTool,
  skillIelts: BookOpenText,
  skillEnglishWork: BriefcaseBusiness,
  skillCommunication: MessagesSquare,
  skillCriticalThinking: Brain,
  skillDesignOps: Workflow,
  skillUxResearch: SearchCheck,
  skillStockInvesting: TrendingUp,
  skillThaiTax: BadgeDollarSign,
  skillDataAnalysis: ChartBar,
  skillProjectManagement: ClipboardList,
  actionHint: Lightbulb,
  actionTranslation: Languages,
  actionSubmit: Send,
  actionNext: ArrowRight,
  actionPrevious: ArrowLeft,
  actionZoom: ZoomIn,
  actionSave: Save,
  actionBookmark: Bookmark,
  actionNote: NotebookPen,
  statusXp: Trophy,
  statusStreak: Flame,
  statusCorrect: Check,
  statusIncorrect: X,
  statusReviewDue: Clock3,
  statusCompleted: CircleCheck,
  statusInProgress: LoaderCircle,
  statusLocked: LockKeyhole,
  statusMastered: Star,
  statusLevelUp: Sparkles,
  statusGoal: Target,
  statusAccuracy: Gauge,
};

const compactToneClasses: Record<MetallicIconTone, string> = {
  silver: "text-[#aab4c2]",
  blue: "text-[#8fb4ff]",
  mint: "text-[#7fe3c4]",
  violet: "text-[#b3c4ff]",
  champagne: "text-[#ffb55c]",
  graphite: "text-[#9aa5b3]",
};

export function Soft3DIcon({
  name,
  size = "md",
  alt,
  decorative = false,
  active = false,
  className = "",
}: {
  name: Soft3DIconName;
  size?: Soft3DIconSize;
  alt?: string;
  decorative?: boolean;
  active?: boolean;
  className?: string;
}) {
  const icon = soft3DIconRegistry[name];
  const sizeConfig = sizeClasses[size];
  const accessibleAlt = decorative ? "" : (alt ?? icon.alt);
  const LineIcon = compactIconMap[name];

  return (
    <span
      aria-hidden={decorative}
      aria-label={decorative ? undefined : accessibleAlt}
      role={decorative ? undefined : "img"}
      className={`relative inline-grid shrink-0 place-items-center ${sizeConfig.box} ${compactToneClasses[icon.tone]} ${
        active ? "opacity-100" : "opacity-70"
      } ${className}`}
    >
      <LineIcon aria-hidden="true" className={sizeConfig.line} strokeWidth={sizeConfig.stroke} />
    </span>
  );
}
