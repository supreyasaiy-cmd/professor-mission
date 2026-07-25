"use client";

import Image from "next/image";
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
import { useState } from "react";
import { soft3DIconRegistry } from "./icon-registry";
import type { MetallicIconCategory, MetallicIconTone, Soft3DIconName, Soft3DIconSize } from "./icon-types";

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

const categoryClasses: Record<MetallicIconCategory, string> = {
  navigation: "brightness-[0.96] contrast-[1.03] saturate-[0.72]",
  action: "brightness-[0.98] contrast-[1.02] saturate-[0.78]",
  status: "brightness-[1.01] contrast-[1.04] saturate-[0.84]",
  learningPath: "brightness-[1.02] contrast-[1.04] saturate-[0.9]",
  hero: "brightness-[1.03] contrast-[1.05] saturate-[0.92]",
};

const inactiveCategoryClasses: Record<MetallicIconCategory, string> = {
  navigation: "opacity-75 grayscale-[0.18] saturate-[0.45]",
  action: "opacity-82 grayscale-[0.12] saturate-[0.55]",
  status: "opacity-90 grayscale-0",
  learningPath: "opacity-95 grayscale-0",
  hero: "opacity-100 grayscale-0",
};

const activeToneClasses: Record<MetallicIconTone, string> = {
  silver: "drop-shadow-[0_7px_11px_rgba(70,82,96,0.18)]",
  blue: "drop-shadow-[0_7px_12px_rgba(96,142,178,0.22)]",
  mint: "drop-shadow-[0_7px_12px_rgba(92,148,132,0.18)]",
  violet: "drop-shadow-[0_7px_12px_rgba(124,116,158,0.2)]",
  champagne: "drop-shadow-[0_7px_12px_rgba(154,130,94,0.18)]",
  graphite: "drop-shadow-[0_7px_12px_rgba(54,62,72,0.18)]",
};

const fallbackToneClasses: Record<MetallicIconTone, string> = {
  silver: "from-white via-[#d8dde2] to-[#8d98a3]",
  blue: "from-white via-[#dcecf5] to-[#8a9cad]",
  mint: "from-white via-[#dcebe7] to-[#879c96]",
  violet: "from-white via-[#e4e1ef] to-[#938aa8]",
  champagne: "from-white via-[#ebe4d7] to-[#a09788]",
  graphite: "from-white via-[#d2d6da] to-[#747d86]",
};

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
  silver: "text-[#737c85]",
  blue: "text-[#5e8faf]",
  mint: "text-[#5e9b8a]",
  violet: "text-[#8278a7]",
  champagne: "text-[#998b73]",
  graphite: "text-[#5f6871]",
};

export function Soft3DIcon({
  name,
  size = "md",
  alt,
  decorative = false,
  shadow = true,
  priority = false,
  active = false,
  className = "",
}: {
  name: Soft3DIconName;
  size?: Soft3DIconSize;
  alt?: string;
  decorative?: boolean;
  shadow?: boolean;
  priority?: boolean;
  active?: boolean;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const icon = soft3DIconRegistry[name];
  const sizeConfig = sizeClasses[size];
  const accessibleAlt = decorative ? "" : (alt ?? icon.alt);
  const imageStateClass = active ? "opacity-100 grayscale-0" : inactiveCategoryClasses[icon.category];
  const imageShadowClass = shadow ? (active ? activeToneClasses[icon.tone] : "drop-shadow-[0_6px_9px_rgba(23,23,23,0.1)]") : "";
  const isCompactSize = size === "xs" || size === "sm" || size === "nav" || size === "navLg";
  const CompactIcon = compactIconMap[name];

  if (isCompactSize) {
    return (
      <span
        aria-hidden={decorative}
        aria-label={decorative ? undefined : accessibleAlt}
        role={decorative ? undefined : "img"}
        className={`relative inline-grid shrink-0 place-items-center ${sizeConfig.box} ${compactToneClasses[icon.tone]} ${
          active ? "opacity-100" : "opacity-80"
        } ${className}`}
      >
        <CompactIcon
          aria-hidden="true"
          className={`${sizeConfig.line} [filter:drop-shadow(1px_2px_1.5px_rgba(23,23,23,0.18))]`}
          strokeWidth={sizeConfig.stroke}
        />
        <span className="pointer-events-none absolute left-[24%] top-[18%] h-1/4 w-1/2 rounded-full bg-white/45 blur-[3px]" />
      </span>
    );
  }

  if (hasError) {
    return (
      <span
        aria-hidden={decorative}
        aria-label={decorative ? undefined : accessibleAlt}
        role={decorative ? undefined : "img"}
        className={`inline-grid shrink-0 place-items-center rounded-full border border-black/10 bg-gradient-to-br ${fallbackToneClasses[icon.tone]} ${sizeConfig.box} ${shadow ? "shadow-[0_8px_18px_rgba(23,23,23,0.12)]" : ""} ${className}`}
      >
        <span className="h-1/2 w-1/2 rounded-full bg-white/45 shadow-inner" />
      </span>
    );
  }

  return (
    <span className={`relative inline-block shrink-0 ${sizeConfig.box} ${className}`}>
      <Image
        src={icon.src}
        alt={accessibleAlt}
        width={sizeConfig.image}
        height={sizeConfig.image}
        className={`h-full w-full object-contain transition duration-200 ${categoryClasses[icon.category]} ${imageStateClass} ${imageShadowClass}`}
        sizes={`${sizeConfig.image}px`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setHasError(true)}
        unoptimized
      />
    </span>
  );
}
