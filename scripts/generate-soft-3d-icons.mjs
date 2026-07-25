import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "public/icons/3d");
mkdirSync(outDir, { recursive: true });

const palettes = {
  coral: ["#ff8f9a", "#ff5f78", "#ffd0a5"],
  pink: ["#ff9bd5", "#c26cff", "#ffcd70"],
  peach: ["#ffcd70", "#ff8f9a", "#dfff65"],
  lime: ["#ddff56", "#66f4c0", "#6ce7ff"],
  mint: ["#8affb6", "#66f4c0", "#83e8ff"],
  cyan: ["#78e7ff", "#718cff", "#c26cff"],
  blue: ["#83e8ff", "#718cff", "#78e7ff"],
  violet: ["#c26cff", "#9e86ff", "#ff9bd5"],
  silver: ["#ffffff", "#c9d2e5", "#9e86ff"],
  yellow: ["#f4e982", "#ffcd70", "#ff8fd7"],
};

const icons = [
  ["navigation-home", "home", "cyan"],
  ["navigation-learn", "cards", "lime"],
  ["navigation-practice", "brain", "pink"],
  ["navigation-review", "loop", "mint"],
  ["navigation-progress", "chart", "peach"],
  ["navigation-settings", "gear", "violet"],
  ["brand-mission", "star", "cyan"],
  ["skill-ux-ui", "cursor-window", "cyan"],
  ["skill-product-design", "layers", "lime"],
  ["skill-creative-thinking", "bulb", "pink"],
  ["skill-art-direction", "eye", "violet"],
  ["skill-ux-writing", "bubble-pencil", "mint"],
  ["skill-graphic-design", "shapes", "yellow"],
  ["skill-ielts", "book-a", "silver"],
  ["skill-english-work", "chat", "blue"],
  ["skill-communication", "double-chat", "peach"],
  ["skill-critical-thinking", "brain-glass", "violet"],
  ["skill-data-analysis", "chart", "mint"],
  ["skill-project-management", "checklist", "coral"],
  ["action-hint", "bulb", "yellow"],
  ["action-translation", "chat", "cyan"],
  ["action-submit", "arrow", "blue"],
  ["action-next", "arrow", "lime"],
  ["action-previous", "arrow-left", "silver"],
  ["action-zoom", "magnify", "cyan"],
  ["action-save", "bookmark", "violet"],
  ["action-bookmark", "bookmark", "pink"],
  ["action-note", "note", "peach"],
  ["status-xp", "star", "yellow"],
  ["status-streak", "flame", "peach"],
  ["status-correct", "check", "mint"],
  ["status-incorrect", "cross", "coral"],
  ["status-review-due", "loop", "pink"],
  ["status-completed", "check", "lime"],
  ["status-in-progress", "spark", "cyan"],
  ["status-locked", "lock", "silver"],
  ["status-mastered", "crown", "violet"],
  ["status-level-up", "star", "pink"],
  ["status-goal", "target", "lime"],
  ["status-accuracy", "target", "cyan"],
];

function shell(name, palette, shape) {
  const [a, b, c] = palettes[palette];
  return `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(165 112) rotate(52) scale(430)">
      <stop stop-color="${c}"/>
      <stop offset=".47" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </radialGradient>
    <linearGradient id="shine" x1="114" y1="68" x2="300" y2="294" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" stop-opacity=".82"/>
      <stop offset=".55" stop-color="#fff" stop-opacity=".18"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="42" y="56" width="428" height="432" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="26" stdDeviation="25" flood-color="#171717" flood-opacity=".18"/>
      <feDropShadow dx="-12" dy="-10" stdDeviation="16" flood-color="#ffffff" flood-opacity=".35"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    ${shape}
    <ellipse cx="184" cy="126" rx="76" ry="34" fill="url(#shine)" opacity=".72" transform="rotate(-25 184 126)"/>
    <circle cx="150" cy="112" r="18" fill="#fff" opacity=".68"/>
  </g>
</svg>`;
}

function blobPath(kind) {
  const fill = `fill="url(#g)"`;
  const white = `fill="#fff" opacity=".84"`;
  const soft = `fill="#fff" opacity=".42"`;
  const cut = `fill="#fff" opacity=".72"`;
  const base = `<path d="M112 250c0-92 62-160 151-160 88 0 153 66 153 158 0 96-68 174-160 174-89 0-144-75-144-172Z" ${fill}/>`;
  const pill = (x, y, w, h, r = 28) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${white}/>`;
  switch (kind) {
    case "home":
      return `<path d="M116 244 256 126l140 118v142c0 31-25 56-56 56H172c-31 0-56-25-56-56V244Z" ${fill}/><path d="M196 268c0-13 11-24 24-24h72c13 0 24 11 24 24v118H196V268Z" ${soft}/><path d="M150 244 256 154l106 90" stroke="#fff" stroke-opacity=".68" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "cards":
      return `<rect x="126" y="126" width="244" height="170" rx="44" ${fill}/><rect x="158" y="192" width="244" height="170" rx="44" ${fill} opacity=".76"/><rect x="110" y="224" width="244" height="170" rx="44" ${fill}/>${pill(160,270,122,24,12)}${pill(160,316,154,20,10)}`;
    case "brain":
      return `<path d="M173 142c-43 0-78 35-78 78 0 21 8 40 22 54-8 13-12 28-12 44 0 47 38 85 85 85 27 0 51-13 66-33 15 20 39 33 66 33 47 0 85-38 85-85 0-16-4-31-12-44 14-14 22-33 22-54 0-43-35-78-78-78-27 0-51 14-65 35-14-21-38-35-65-35h-36Z" ${fill}/><path d="M190 220c39-29 92 4 66 54 36-18 80 8 77 50" stroke="#fff" stroke-opacity=".58" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "loop":
      return `${base}<path d="M331 182c-24-25-59-40-97-35-61 8-104 64-96 125 8 60 63 103 123 96 39-5 71-30 87-63" stroke="#fff" stroke-opacity=".74" stroke-width="34" stroke-linecap="round"/><path d="M332 135v75h-75" stroke="#fff" stroke-opacity=".74" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "chart":
      return `${base}<rect x="160" y="290" width="46" height="72" rx="23" ${cut}/><rect x="230" y="228" width="46" height="134" rx="23" ${cut}/><rect x="300" y="178" width="46" height="184" rx="23" ${cut}/>`;
    case "gear":
      return `${base}<path d="M256 164v42M256 306v42M164 256h42M306 256h42M191 191l30 30M291 291l30 30M321 191l-30 30M221 291l-30 30" stroke="#fff" stroke-opacity=".72" stroke-width="34" stroke-linecap="round"/><circle cx="256" cy="256" r="54" ${soft}/>`;
    case "star":
      return `<path d="M256 88 304 200l120 16-88 78 22 118-102-60-102 60 22-118-88-78 120-16 48-112Z" ${fill}/>`;
    case "cursor-window":
      return `<rect x="100" y="130" width="286" height="222" rx="48" ${fill}/>${pill(145,180,126,22,11)}${pill(145,230,190,18,9)}<path d="M260 252 388 384l-70 15-35 61-82-164c-12-24 35-61 59-44Z" fill="#fff" opacity=".84"/>`;
    case "layers":
      return `<path d="M256 98 402 178 256 258 110 178 256 98Z" ${fill}/><path d="M110 252 256 332l146-80" stroke="#fff" stroke-opacity=".58" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/><path d="M110 326 256 406l146-80" stroke="#fff" stroke-opacity=".48" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "bulb":
      return `<path d="M256 88c-69 0-124 52-124 116 0 42 22 74 51 98 18 15 31 36 31 60h84c0-24 13-45 31-60 29-24 51-56 51-98 0-64-55-116-124-116Z" ${fill}/><rect x="207" y="344" width="98" height="74" rx="28" ${fill}/><path d="M224 210c18-26 45-39 81-30" stroke="#fff" stroke-opacity=".62" stroke-width="28" stroke-linecap="round"/>`;
    case "eye":
      return `<path d="M78 256s60-104 178-104 178 104 178 104-60 104-178 104S78 256 78 256Z" ${fill}/><circle cx="256" cy="256" r="62" ${soft}/><circle cx="276" cy="236" r="22" fill="#fff" opacity=".76"/>`;
    case "bubble-pencil":
      return `<path d="M122 126h256c35 0 64 29 64 64v96c0 35-29 64-64 64h-94l-82 62 16-62h-96c-35 0-64-29-64-64v-96c0-35 29-64 64-64Z" ${fill}/><path d="M184 264 292 156l54 54-108 108-68 14 14-68Z" ${soft}/>`;
    case "shapes":
      return `<rect x="102" y="104" width="168" height="168" rx="48" ${fill}/><circle cx="314" cy="214" r="88" ${fill} opacity=".86"/><path d="M188 292h194c25 0 45 20 45 45s-20 45-45 45H188c-25 0-45-20-45-45s20-45 45-45Z" ${fill} opacity=".78"/>`;
    case "book-a":
      return `<path d="M132 112h92c36 0 64 28 64 64v220h-92c-36 0-64-28-64-64V112Z" ${fill}/><path d="M288 176c0-36 28-64 64-64h28v284h-92V176Z" ${fill} opacity=".78"/><path d="M210 304l42-114 42 114m-66-36h48" stroke="#fff" stroke-opacity=".72" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "chat":
      return `<path d="M120 144h272c35 0 64 29 64 64v82c0 35-29 64-64 64H278l-76 58 14-58h-96c-35 0-64-29-64-64v-82c0-35 29-64 64-64Z" ${fill}/>${pill(150,222,92,24,12)}${pill(266,222,96,24,12)}${pill(150,280,170,20,10)}`;
    case "double-chat":
      return `<path d="M108 124h218c31 0 56 25 56 56v64c0 31-25 56-56 56h-64l-70 52 13-52h-97c-31 0-56-25-56-56v-64c0-31 25-56 56-56Z" ${fill}/><path d="M222 224h182c31 0 56 25 56 56v52c0 31-25 56-56 56h-64l-58 44 10-44h-70c-31 0-56-25-56-56v-52c0-31 25-56 56-56Z" ${fill} opacity=".72"/>`;
    case "brain-glass":
      return `${blobPath("brain")}<circle cx="322" cy="314" r="54" fill="#fff" opacity=".56"/><path d="M360 352l54 54" stroke="#fff" stroke-opacity=".78" stroke-width="30" stroke-linecap="round"/>`;
    case "arrow":
      return `${base}<path d="M170 256h160M284 190l72 66-72 66" stroke="#fff" stroke-opacity=".78" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "arrow-left":
      return `${base}<path d="M342 256H182M228 190l-72 66 72 66" stroke="#fff" stroke-opacity=".78" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "magnify":
      return `${base}<circle cx="232" cy="232" r="78" ${soft}/><path d="M292 292l78 78" stroke="#fff" stroke-opacity=".78" stroke-width="36" stroke-linecap="round"/>`;
    case "bookmark":
      return `<path d="M156 104h200c29 0 52 23 52 52v260l-152-76-152 76V156c0-29 23-52 52-52Z" ${fill}/><path d="M196 172h120" stroke="#fff" stroke-opacity=".58" stroke-width="28" stroke-linecap="round"/>`;
    case "note":
      return `<rect x="122" y="98" width="268" height="316" rx="48" ${fill}/>${pill(170,174,170,24,12)}${pill(170,236,130,20,10)}${pill(170,292,154,20,10)}`;
    case "check":
      return `${base}<path d="M166 266l58 58 132-142" stroke="#fff" stroke-opacity=".82" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "cross":
      return `${base}<path d="M194 194l124 124M318 194 194 318" stroke="#fff" stroke-opacity=".78" stroke-width="42" stroke-linecap="round"/>`;
    case "flame":
      return `<path d="M264 74c50 60 22 102 72 144 32 27 54 65 54 112 0 79-62 134-134 134s-134-55-134-134c0-61 36-104 82-140 32-25 44-62 60-116Z" ${fill}/><path d="M250 300c-23 27-16 76 23 76 31 0 54-24 54-55 0-24-13-42-31-56-10 24-25 30-46 35Z" ${soft}/>`;
    case "lock":
      return `<rect x="128" y="220" width="256" height="176" rx="48" ${fill}/><path d="M178 220v-42c0-44 35-80 78-80s78 36 78 80v42" stroke="url(#g)" stroke-width="42" stroke-linecap="round"/><circle cx="256" cy="302" r="24" ${soft}/>`;
    case "crown":
      return `<path d="M110 180 194 270l62-140 62 140 84-90-26 212H136L110 180Z" ${fill}/><circle cx="256" cy="128" r="34" ${fill}/>`;
    case "spark":
      return `<path d="M256 82c26 92 82 148 174 174-92 26-148 82-174 174-26-92-82-148-174-174 92-26 148-82 174-174Z" ${fill}/><path d="M372 82c10 38 32 60 70 70-38 10-60 32-70 70-10-38-32-60-70-70 38-10 60-32 70-70Z" ${fill} opacity=".7"/>`;
    case "target":
      return `${base}<circle cx="256" cy="256" r="98" ${soft}/><circle cx="256" cy="256" r="52" fill="#fff" opacity=".68"/><circle cx="256" cy="256" r="18" fill="url(#g)"/>`;
    case "checklist":
      return `<rect x="116" y="96" width="280" height="328" rx="54" ${fill}/><path d="M178 190l24 24 50-56M178 276l24 24 50-56M178 362l24 24 50-56" stroke="#fff" stroke-opacity=".72" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/><path d="M288 192h56M288 278h56M288 364h56" stroke="#fff" stroke-opacity=".5" stroke-width="24" stroke-linecap="round"/>`;
    default:
      return base;
  }
}

for (const [file, shape, palette] of icons) {
  writeFileSync(join(outDir, `${file}.svg`), shell(file, palette, blobPath(shape)));
}
