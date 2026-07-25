import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public/icons/3d");

const icons = {
  "brand-mission": {
    tone: "blue",
    category: "hero",
    paths: [
      `<path d="M256 118L287 207L381 207L305 261L334 350L256 296L178 350L207 261L131 207L225 207Z" fill="none" stroke="url(#line)" stroke-width="24" stroke-linejoin="round"/>`,
      `<path d="M256 176V338M176 256H336M205 205L307 307M307 205L205 307" fill="none" stroke="url(#accent)" stroke-width="16" stroke-linecap="round"/>`,
      `<circle cx="256" cy="256" r="42" fill="url(#inner)" stroke="url(#edge)" stroke-width="8"/>`,
    ],
  },
  "navigation-home": {
    tone: "silver",
    category: "navigation",
    paths: [
      `<path d="M150 260L256 164L362 260" fill="none" stroke="url(#line)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M184 246V354H328V246" fill="none" stroke="url(#line)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M226 354V292H286V354" fill="none" stroke="url(#accent)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "navigation-learn": {
    tone: "silver",
    category: "navigation",
    paths: [
      `<path d="M150 160H236C263 160 280 177 280 204V356C268 344 251 338 228 338H150Z" fill="none" stroke="url(#line)" stroke-width="28" stroke-linejoin="round"/>`,
      `<path d="M362 160H276C249 160 232 177 232 204V356C244 344 261 338 284 338H362Z" fill="none" stroke="url(#line)" stroke-width="28" stroke-linejoin="round"/>`,
      `<path d="M194 214H236M318 214H352M194 264H236M318 264H352" stroke="url(#accent)" stroke-width="16" stroke-linecap="round"/>`,
    ],
  },
  "navigation-practice": {
    tone: "silver",
    category: "navigation",
    paths: [
      `<path d="M188 152H324M212 152V222L168 338C160 360 176 382 200 382H312C336 382 352 360 344 338L300 222V152" fill="none" stroke="url(#line)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M202 306H310" stroke="url(#accent)" stroke-width="22" stroke-linecap="round"/>`,
      `<circle cx="234" cy="256" r="13" fill="url(#accent)"/><circle cx="282" cy="256" r="13" fill="url(#accent)"/>`,
    ],
  },
  "navigation-review": {
    tone: "silver",
    category: "navigation",
    paths: [
      `<path d="M336 192C312 166 274 154 236 162C184 174 150 222 158 276C166 334 219 374 276 362C312 356 340 332 354 300" fill="none" stroke="url(#line)" stroke-width="28" stroke-linecap="round"/>`,
      `<path d="M336 150V208H278" fill="none" stroke="url(#line)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M218 252L252 286L306 224" fill="none" stroke="url(#accent)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "navigation-progress": {
    tone: "mint",
    category: "navigation",
    paths: [
      `<path d="M154 358H360" stroke="url(#line)" stroke-width="26" stroke-linecap="round"/>`,
      `<rect x="176" y="276" width="42" height="82" rx="16" fill="none" stroke="url(#line)" stroke-width="24"/>`,
      `<rect x="236" y="226" width="42" height="132" rx="16" fill="none" stroke="url(#line)" stroke-width="24"/>`,
      `<rect x="296" y="174" width="42" height="184" rx="16" fill="none" stroke="url(#accent)" stroke-width="24"/>`,
    ],
  },
  "navigation-settings": {
    tone: "graphite",
    category: "navigation",
    paths: [
      `<path d="M256 154V132M256 380V358M358 256H380M132 256H154M328 184L344 168M168 344L184 328M328 328L344 344M168 168L184 184" stroke="url(#line)" stroke-width="22" stroke-linecap="round"/>`,
      `<circle cx="256" cy="256" r="86" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<circle cx="256" cy="256" r="32" fill="none" stroke="url(#accent)" stroke-width="22"/>`,
    ],
  },
  "skill-ux-ui": {
    tone: "blue",
    category: "learningPath",
    paths: [
      `<rect x="150" y="154" width="212" height="178" rx="28" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M150 210H362M212 332V378M300 332V378M198 378H314" stroke="url(#line)" stroke-width="22" stroke-linecap="round"/>`,
      `<path d="M224 252L274 286L242 296L230 336Z" fill="url(#accent)" stroke="url(#edge)" stroke-width="8" stroke-linejoin="round"/>`,
    ],
  },
  "skill-product-design": {
    tone: "blue",
    category: "learningPath",
    paths: [
      `<rect x="162" y="152" width="188" height="228" rx="34" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M206 222H306M206 274H282M206 326H256" stroke="url(#line)" stroke-width="18" stroke-linecap="round"/>`,
      `<path d="M308 154L350 196M350 196L308 238M350 196H278" stroke="url(#accent)" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "skill-creative-thinking": {
    tone: "violet",
    category: "learningPath",
    paths: [
      `<path d="M256 142C211 142 178 176 178 218C178 250 198 274 224 288V326H288V288C314 274 334 250 334 218C334 176 301 142 256 142Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M224 366H288M236 326H276" stroke="url(#line)" stroke-width="22" stroke-linecap="round"/>`,
      `<path d="M150 168L166 184M362 168L346 184M142 260H164M348 260H370" stroke="url(#accent)" stroke-width="18" stroke-linecap="round"/>`,
    ],
  },
  "skill-art-direction": {
    tone: "champagne",
    category: "learningPath",
    paths: [
      `<rect x="154" y="176" width="204" height="144" rx="28" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M198 320L176 378M314 320L336 378M214 378H298" stroke="url(#line)" stroke-width="22" stroke-linecap="round"/>`,
      `<path d="M206 250L246 214L276 244L306 204" fill="none" stroke="url(#accent)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "skill-ux-writing": {
    tone: "mint",
    category: "learningPath",
    paths: [
      `<path d="M164 164H348V304H246L192 358V304H164Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M208 218H304M208 264H280" stroke="url(#line)" stroke-width="18" stroke-linecap="round"/>`,
      `<path d="M298 346L350 294L372 316L320 368L288 378Z" fill="none" stroke="url(#accent)" stroke-width="18" stroke-linejoin="round"/>`,
    ],
  },
  "skill-graphic-design": {
    tone: "violet",
    category: "learningPath",
    paths: [
      `<rect x="164" y="162" width="116" height="116" rx="26" fill="none" stroke="url(#line)" stroke-width="24"/>`,
      `<rect x="232" y="234" width="116" height="116" rx="26" fill="none" stroke="url(#line)" stroke-width="24"/>`,
      `<path d="M170 356H344M344 164L304 204" stroke="url(#accent)" stroke-width="22" stroke-linecap="round"/>`,
    ],
  },
  "skill-ielts": {
    tone: "blue",
    category: "learningPath",
    paths: [
      `<path d="M168 152H332C346 152 356 162 356 176V360H186C176 360 168 352 168 342Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M212 210H316M212 258H300M212 306H276" stroke="url(#line)" stroke-width="18" stroke-linecap="round"/>`,
      `<path d="M314 152V232L286 214L258 232V152" fill="none" stroke="url(#accent)" stroke-width="20" stroke-linejoin="round"/>`,
    ],
  },
  "skill-english-work": {
    tone: "mint",
    category: "learningPath",
    paths: [
      `<rect x="154" y="184" width="204" height="142" rx="26" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M154 220L256 282L358 220" fill="none" stroke="url(#line)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M190 154H322M216 358H296" stroke="url(#accent)" stroke-width="22" stroke-linecap="round"/>`,
    ],
  },
  "skill-communication": {
    tone: "champagne",
    category: "learningPath",
    paths: [
      `<path d="M154 174H308V286H226L182 326V286H154Z" fill="none" stroke="url(#line)" stroke-width="24" stroke-linejoin="round"/>`,
      `<path d="M230 246H358V344H296L260 378V344H230Z" fill="none" stroke="url(#accent)" stroke-width="22" stroke-linejoin="round"/>`,
      `<path d="M196 224H268M274 294H328" stroke="url(#line)" stroke-width="16" stroke-linecap="round"/>`,
    ],
  },
  "skill-critical-thinking": {
    tone: "graphite",
    category: "learningPath",
    paths: [
      `<path d="M166 260C184 198 218 162 256 162C294 162 328 198 346 260C328 322 294 358 256 358C218 358 184 322 166 260Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<circle cx="256" cy="260" r="46" fill="none" stroke="url(#line)" stroke-width="22"/>`,
      `<path d="M304 210L350 164M336 164H350V178" stroke="url(#accent)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "skill-data-analysis": {
    tone: "blue",
    category: "learningPath",
    paths: [
      `<path d="M164 350H354" stroke="url(#line)" stroke-width="24" stroke-linecap="round"/>`,
      `<path d="M192 320V270M256 320V214M320 320V170" stroke="url(#line)" stroke-width="26" stroke-linecap="round"/>`,
      `<path d="M174 220L230 250L278 198L350 224" fill="none" stroke="url(#accent)" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "skill-project-management": {
    tone: "graphite",
    category: "learningPath",
    paths: [
      `<rect x="160" y="168" width="192" height="206" rx="30" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M210 216H306M210 266H306M210 316H276" stroke="url(#line)" stroke-width="18" stroke-linecap="round"/>`,
      `<path d="M184 216L196 228L218 204M184 266L196 278L218 254" stroke="url(#accent)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "action-hint": {
    tone: "champagne",
    category: "action",
    paths: [
      `<path d="M256 150C213 150 182 181 182 220C182 250 201 273 226 286V324H286V286C311 273 330 250 330 220C330 181 299 150 256 150Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M228 362H284M236 324H276" stroke="url(#accent)" stroke-width="20" stroke-linecap="round"/>`,
    ],
  },
  "action-translation": {
    tone: "blue",
    category: "action",
    paths: [
      `<path d="M154 184H286M220 148V184M188 184C202 240 239 274 286 292M258 184C244 232 214 270 166 294" stroke="url(#line)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M282 360L324 252L366 360M300 322H348" stroke="url(#accent)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "action-submit": {
    tone: "blue",
    category: "action",
    paths: [
      `<path d="M150 256L362 158L288 362L246 284Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M246 284L362 158" stroke="url(#accent)" stroke-width="20" stroke-linecap="round"/>`,
    ],
  },
  "action-next": {
    tone: "silver",
    category: "action",
    paths: [
      `<path d="M166 256H338" stroke="url(#line)" stroke-width="30" stroke-linecap="round"/>`,
      `<path d="M276 190L342 256L276 322" fill="none" stroke="url(#accent)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "action-previous": {
    tone: "silver",
    category: "action",
    paths: [
      `<path d="M346 256H174" stroke="url(#line)" stroke-width="30" stroke-linecap="round"/>`,
      `<path d="M236 190L170 256L236 322" fill="none" stroke="url(#accent)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "action-zoom": {
    tone: "graphite",
    category: "action",
    paths: [
      `<circle cx="222" cy="222" r="64" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M268 268L348 348" stroke="url(#line)" stroke-width="28" stroke-linecap="round"/>`,
      `<path d="M222 190V254M190 222H254" stroke="url(#accent)" stroke-width="18" stroke-linecap="round"/>`,
    ],
  },
  "action-save": {
    tone: "mint",
    category: "action",
    paths: [
      `<rect x="162" y="150" width="188" height="222" rx="28" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M206 150V226H306V150M212 320H300" stroke="url(#line)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M256 264V330M226 298L256 330L286 298" stroke="url(#accent)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "action-bookmark": {
    tone: "violet",
    category: "action",
    paths: [
      `<path d="M184 148H328C342 148 352 158 352 172V372L256 318L160 372V172C160 158 170 148 184 148Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M220 214H292" stroke="url(#accent)" stroke-width="20" stroke-linecap="round"/>`,
    ],
  },
  "action-note": {
    tone: "champagne",
    category: "action",
    paths: [
      `<path d="M166 152H326L352 178V360H166Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M326 152V188H352M206 224H304M206 272H292M206 320H260" stroke="url(#line)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M302 322L350 274" stroke="url(#accent)" stroke-width="18" stroke-linecap="round"/>`,
    ],
  },
  "status-xp": {
    tone: "blue",
    category: "status",
    paths: [
      `<path d="M176 166H336L318 284C312 326 286 356 256 356C226 356 200 326 194 284Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M194 198H152V230C152 256 170 274 198 278M318 198H360V230C360 256 342 274 314 278" stroke="url(#line)" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M230 236L256 210L282 236M256 210V304" stroke="url(#accent)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "status-streak": {
    tone: "champagne",
    category: "status",
    paths: [
      `<path d="M258 378C198 354 172 316 178 270C184 226 218 204 232 160C272 192 318 224 332 274C346 324 318 360 258 378Z" fill="none" stroke="url(#line)" stroke-width="26" stroke-linejoin="round"/>`,
      `<path d="M258 338C230 324 218 302 224 276C228 258 242 246 250 226C274 250 292 272 292 300C292 322 280 334 258 338Z" fill="none" stroke="url(#accent)" stroke-width="20" stroke-linejoin="round"/>`,
    ],
  },
  "status-correct": {
    tone: "mint",
    category: "status",
    paths: [
      `<path d="M166 266L226 326L350 188" fill="none" stroke="url(#accent)" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<circle cx="256" cy="256" r="112" fill="none" stroke="url(#line)" stroke-width="20"/>`,
    ],
  },
  "status-incorrect": {
    tone: "champagne",
    category: "status",
    paths: [
      `<circle cx="256" cy="256" r="112" fill="none" stroke="url(#line)" stroke-width="20"/>`,
      `<path d="M196 196L316 316M316 196L196 316" stroke="url(#accent)" stroke-width="32" stroke-linecap="round"/>`,
    ],
  },
  "status-review-due": {
    tone: "violet",
    category: "status",
    paths: [
      `<path d="M336 190C310 164 272 153 236 162C187 174 154 219 158 270C162 329 214 372 272 362C306 356 334 335 350 306" fill="none" stroke="url(#line)" stroke-width="26" stroke-linecap="round"/>`,
      `<path d="M334 150V206H278" fill="none" stroke="url(#line)" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M256 214V274M256 322H256" stroke="url(#accent)" stroke-width="26" stroke-linecap="round"/>`,
    ],
  },
  "status-completed": {
    tone: "mint",
    category: "status",
    paths: [
      `<rect x="160" y="158" width="192" height="202" rx="30" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M204 260L242 298L312 220" fill="none" stroke="url(#accent)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "status-in-progress": {
    tone: "blue",
    category: "status",
    paths: [
      `<path d="M256 150C198 150 150 198 150 256C150 314 198 362 256 362C314 362 362 314 362 256" fill="none" stroke="url(#line)" stroke-width="26" stroke-linecap="round"/>`,
      `<path d="M326 184H362V148M256 202V262L306 292" fill="none" stroke="url(#accent)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "status-locked": {
    tone: "graphite",
    category: "status",
    paths: [
      `<rect x="166" y="236" width="180" height="134" rx="28" fill="none" stroke="url(#line)" stroke-width="26"/>`,
      `<path d="M206 236V202C206 172 228 150 256 150C284 150 306 172 306 202V236" fill="none" stroke="url(#line)" stroke-width="26" stroke-linecap="round"/>`,
      `<path d="M256 286V322" stroke="url(#accent)" stroke-width="24" stroke-linecap="round"/>`,
    ],
  },
  "status-mastered": {
    tone: "violet",
    category: "status",
    paths: [
      `<path d="M256 138L294 222L386 232L318 294L336 384L256 338L176 384L194 294L126 232L218 222Z" fill="none" stroke="url(#line)" stroke-width="24" stroke-linejoin="round"/>`,
      `<path d="M218 258L248 288L306 226" fill="none" stroke="url(#accent)" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "status-level-up": {
    tone: "blue",
    category: "status",
    paths: [
      `<path d="M256 358V154M190 220L256 154L322 220" fill="none" stroke="url(#accent)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<path d="M172 358H340M198 306H314M224 254H288" stroke="url(#line)" stroke-width="22" stroke-linecap="round"/>`,
    ],
  },
  "status-goal": {
    tone: "mint",
    category: "status",
    paths: [
      `<circle cx="256" cy="256" r="106" fill="none" stroke="url(#line)" stroke-width="24"/>`,
      `<circle cx="256" cy="256" r="48" fill="none" stroke="url(#line)" stroke-width="22"/>`,
      `<circle cx="256" cy="256" r="12" fill="url(#accent)"/>`,
      `<path d="M304 208L354 158M326 158H354V186" stroke="url(#accent)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
    ],
  },
  "status-accuracy": {
    tone: "blue",
    category: "status",
    paths: [
      `<path d="M160 332C176 254 216 196 256 196C296 196 336 254 352 332" fill="none" stroke="url(#line)" stroke-width="26" stroke-linecap="round"/>`,
      `<path d="M194 332H318" stroke="url(#line)" stroke-width="24" stroke-linecap="round"/>`,
      `<path d="M256 256L322 204" stroke="url(#accent)" stroke-width="24" stroke-linecap="round"/>`,
      `<circle cx="256" cy="256" r="12" fill="url(#accent)"/>`,
    ],
  },
};

const tones = {
  silver: ["#fefefe", "#dce1e6", "#9ba5ae", "#eef4f8"],
  blue: ["#ffffff", "#dcecf7", "#8fa5b7", "#9fd8ff"],
  mint: ["#ffffff", "#dcece8", "#8ba199", "#a7ead4"],
  violet: ["#ffffff", "#e5e2ef", "#9288a8", "#c9b9ff"],
  champagne: ["#ffffff", "#ebe3d6", "#a19380", "#f2d7a8"],
  graphite: ["#ffffff", "#d5dae0", "#717b86", "#aeb7c1"],
};

const surfaceByCategory = {
  navigation: "circle",
  action: "squircle",
  status: "circle",
  learningPath: "squircle",
  hero: "circle",
};

function surface(kind) {
  if (kind === "squircle") {
    return `<rect x="78" y="78" width="356" height="356" rx="104" fill="url(#metal)"/><rect x="82" y="82" width="348" height="348" rx="100" fill="none" stroke="url(#rim)" stroke-width="10"/>`;
  }
  return `<circle cx="256" cy="256" r="178" fill="url(#metal)"/><circle cx="256" cy="256" r="173" fill="none" stroke="url(#rim)" stroke-width="10"/>`;
}

function svg(name, icon) {
  const [light, mid, dark, accent] = tones[icon.tone];
  const surfaceKind = surfaceByCategory[icon.category];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="metal" x1="138" y1="76" x2="384" y2="438" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="0.28" stop-color="${mid}"/>
      <stop offset="0.56" stop-color="#f7f9fa"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="rim" x1="104" y1="92" x2="406" y2="424" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.52" stop-color="#c8cdd2"/>
      <stop offset="1" stop-color="#6f7780"/>
    </linearGradient>
    <linearGradient id="line" x1="150" y1="132" x2="360" y2="376" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fbfcfc"/>
      <stop offset="0.48" stop-color="#c8ced4"/>
      <stop offset="1" stop-color="#737d87"/>
    </linearGradient>
    <linearGradient id="accent" x1="156" y1="136" x2="356" y2="374" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.45" stop-color="${accent}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="inner" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(212 170) rotate(52) scale(260)">
      <stop stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="0.48" stop-color="${mid}" stop-opacity="0.78"/>
      <stop offset="1" stop-color="${dark}" stop-opacity="0.62"/>
    </radialGradient>
    <filter id="shadow" x="46" y="52" width="420" height="420" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="15" dy="20" stdDeviation="17" flood-color="#171717" flood-opacity="0.18"/>
    </filter>
    <filter id="soft" x="104" y="104" width="304" height="304" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="5" dy="8" stdDeviation="5" flood-color="#171717" flood-opacity="0.16"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    ${surface(surfaceKind)}
    <path d="M152 118C190 92 328 88 372 126" stroke="white" stroke-width="18" stroke-linecap="round" opacity="0.46"/>
    <path d="M102 288C138 390 252 442 354 394" stroke="white" stroke-width="8" stroke-linecap="round" opacity="0.18"/>
  </g>
  <g filter="url(#soft)">
    ${icon.paths.join("\n    ")}
  </g>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const [name, icon] of Object.entries(icons)) {
  writeFileSync(join(outDir, `${name}.svg`), svg(name, icon));
}
