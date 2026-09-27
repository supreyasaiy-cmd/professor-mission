"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Soft3DIcon } from "./icons/soft-3d-icon";
import type { Soft3DIconName } from "./icons/icon-types";
import { uiCopy, type UiCopyKey } from "@/lib/ui-copy";

const navItems = [
  { href: "/", label: "Home", icon: "navigationHome" },
  { href: "/learn", label: "Learn", icon: "navigationLearn" },
  { href: "/quiz", label: "Practice", icon: "navigationPractice" },
  { href: "/review", label: "Review", icon: "navigationReview" },
] satisfies { href: string; label: string; icon: Soft3DIconName }[];

/** These four were hardcoded Thai, so they stayed Thai even in English mode. */
const profileItems = [
  { href: "/progress", key: "myProgress", icon: "navigationProgress" },
  { href: "/review", key: "notesAndWords", icon: "actionNote" },
  { href: "/settings", key: "languageAndGoals", icon: "actionTranslation" },
  { href: "/settings", key: "settings", icon: "navigationSettings" },
] satisfies { href: string; key: UiCopyKey; icon: Soft3DIconName }[];

const navRootPaths = new Set(navItems.map((item) => item.href));

function getBackHref(pathname: string) {
  if (navRootPaths.has(pathname)) return null;

  if (pathname.startsWith("/learn/")) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 2) return `/${segments.slice(0, -1).join("/")}`;
    return "/learn";
  }

  if (pathname === "/progress" || pathname === "/settings") return "/";

  return "/";
}

function PrimaryNavLink({
  item,
  isActive,
  showLabel,
  onShow,
  onHide,
  variant,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
  showLabel: boolean;
  onShow: () => void;
  onHide: () => void;
  variant: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";
  const mobileSizeClass = showLabel ? "flex-[1.68]" : "flex-[0.72]";

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      onBlur={onHide}
      onFocus={onShow}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
      className={`group relative grid shrink-0 place-items-center overflow-hidden rounded-full font-semibold leading-none outline-none transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
        isDesktop ? "h-10" : `h-12 min-w-0 ${mobileSizeClass}`
      } ${
        showLabel
          ? `${isDesktop ? "w-28" : ""} on-accent bg-[var(--accent)] text-[var(--text-on-accent)] shadow-[var(--elev-2)]`
          : `${isDesktop ? "w-14" : ""} text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] focus-visible:bg-[var(--surface-2)]`
      }`}
    >
      {isActive ? (
        <span className="pointer-events-none absolute top-[7px] left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-[var(--text-on-accent)]/45 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-8 group-focus-visible:w-8" />
      ) : null}

      <span
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showLabel ? "scale-75 opacity-0 blur-[1px]" : "scale-100 opacity-100 blur-0"
        }`}
      >
        <Soft3DIcon name={item.icon} size="navLg" decorative active={isActive} />
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center whitespace-nowrap px-2 text-center text-sm transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          showLabel ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-2 scale-95 opacity-0 blur-[1px]"
        }`}
      >
        {item.label}
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const isReviewPage = pathname === "/review";
  const backHref = getBackHref(pathname);
  const showBackButton = Boolean(backHref);
  const showRootTitle = navRootPaths.has(pathname);

  return (
    <div className={`min-h-screen overflow-x-hidden text-[var(--text-primary)] bg-[var(--background)]`}>
      {/* Ambient light, not decoration: two low-alpha sources on the mint/amber
          axis so the ground reads as lit rather than flat. The two-axis grid
          that used to sit here was removed — nothing on this page is a
          measurement surface, so it was pure ornament. */}
      <div className={`pointer-events-none fixed inset-0 overflow-hidden ${isReviewPage ? "opacity-60" : "opacity-100"}`}>
        <div className="absolute left-[-14rem] top-[-16rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(127,227,196,0.13)_0%,rgba(127,227,196,0)_70%)] blur-3xl" />
        <div className="absolute right-[-12rem] top-[6rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(143,180,255,0.10)_0%,rgba(143,180,255,0)_70%)] blur-3xl" />
        <div className="absolute bottom-[-20rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,181,92,0.07)_0%,rgba(255,181,92,0)_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-[1600px]">
        <header className="sticky top-0 z-[90] px-3 py-3 sm:px-4 lg:hidden">
          <div className="flex min-h-[4.25rem] items-center justify-between rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 shadow-[var(--elev-2)] backdrop-blur-2xl">
            <div className={showBackButton ? "grid h-14 w-14 shrink-0 place-items-center" : "hidden"}>
              {showBackButton && backHref ? <BackIconLink href={backHref} /> : null}
            </div>
            <div className="min-w-0 flex-1">
              {showRootTitle ? <HeaderRootTitle /> : null}
            </div>
            <ProfileMenu pathname={pathname} align="right" />
          </div>
        </header>

        <header className="sticky top-0 z-[90] hidden px-6 py-5 lg:block">
          <div className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-5 shadow-[var(--elev-3)] backdrop-blur-2xl">
            <div className={showBackButton ? "flex h-14 w-[13rem] shrink-0 items-center" : "flex h-14 min-w-[13rem] shrink-0 items-center"}>
              {showBackButton && backHref ? <BackIconLink href={backHref} /> : null}
              {showRootTitle ? <HeaderRootTitle /> : null}
            </div>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const showLabel = isActive || hoveredHref === item.href;
                return (
                  <PrimaryNavLink
                    key={item.href}
                    item={item}
                    isActive={isActive}
                    showLabel={showLabel}
                    onShow={() => setHoveredHref(item.href)}
                    onHide={() => setHoveredHref(null)}
                    variant="desktop"
                  />
                );
              })}
            </nav>

            <ProfileMenu pathname={pathname} align="right" />
          </div>
        </header>

        <main className="w-full overflow-x-hidden pb-[calc(7.25rem+env(safe-area-inset-bottom))] lg:pb-12">{children}</main>

        <nav className="fixed bottom-2 left-3 right-3 z-[90] flex h-[3.65rem] items-center gap-1 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] shadow-[var(--elev-3)] backdrop-blur-2xl sm:left-4 sm:right-4 lg:hidden" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const showLabel = isActive;
            return (
              <PrimaryNavLink
                key={item.href}
                item={item}
                isActive={isActive}
                showLabel={showLabel}
                onShow={() => setHoveredHref(item.href)}
                onHide={() => setHoveredHref(null)}
                variant="mobile"
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function HeaderRootTitle() {
  return (
    <Link href="/" className="flex h-14 min-w-0 items-center gap-2 rounded-full px-0 text-left sm:gap-4">
      <svg className="h-8 w-16 shrink-0 text-[var(--text-primary)] sm:h-9 sm:w-24" viewBox="0 0 112 44" fill="none" aria-hidden="true">
        <path d="M7 21.5C23.5 24.8 41.7 26.2 62.5 23.4C72.7 22 82.4 19.5 93 17" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M82 9C88 11.5 95.2 15.8 101.5 21.2C94.3 25.1 87.8 29.8 81.8 35.2" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="block min-w-0 whitespace-nowrap font-display text-sm font-semibold tracking-normal text-[var(--text-primary)] sm:text-lg">Supreya&apos;s Class room</span>
    </Link>
  );
}

function BackIconLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label={uiCopy.goBack.en}
      className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--elev-2)] transition duration-200 hover:bg-[var(--surface-2)] hover:shadow-[var(--elev-2)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
    >
      <Soft3DIcon name="actionPrevious" size="sm" decorative className="pointer-events-none" />
    </Link>
  );
}

function ProfileMenu({ pathname, align = "right" }: { pathname: string; align?: "left" | "right" }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  function closeMenu({ restoreFocus = false } = {}) {
    if (detailsRef.current) detailsRef.current.open = false;
    if (restoreFocus) window.requestAnimationFrame(() => summaryRef.current?.focus());
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (detailsRef.current?.open && !detailsRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if ((event.key === "Escape" || event.key === "Esc") && detailsRef.current?.open) {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <details ref={detailsRef} className="group relative z-10 shrink-0">
      <summary
        ref={summaryRef}
        aria-haspopup="menu"
        aria-controls="profile-menu"
        className="grid h-14 w-14 cursor-pointer list-none place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--elev-2)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--elev-2)] focus:outline-none focus:ring-2 focus:ring-black [&::-webkit-details-marker]:hidden"
      >
        <span className="sr-only">Open profile menu</span>
        <Soft3DIcon name="brandMission" size="sm" decorative className="pointer-events-none" />
      </summary>

      <div
        id="profile-menu"
        role="menu"
        aria-label="Profile menu"
        className={`absolute top-[4.5rem] z-50 hidden w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-2 shadow-[var(--elev-3)] group-open:block ${
          align === "left" ? "left-0" : "right-0"
        }`}
      >
        <div className="py-1">
          {profileItems.map((item, index) => {
            const isActive = pathname === item.href && index !== 1;
            return (
              <Link
                key={`${item.href}-${item.key}`}
                href={item.href}
                role="menuitem"
                onClick={() => closeMenu()}
                className={`flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition ${
                  isActive ? "bg-[var(--surface)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Soft3DIcon name={item.icon} size="sm" decorative active={isActive} />
                {uiCopy[item.key].en}
              </Link>
            );
          })}
        </div>
      </div>
    </details>
  );
}

export function PageShell({ children, eyebrow, title, summary }: { children: ReactNode; eyebrow: string; title: string; summary: string }) {
  return (
    <section className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 py-5 sm:px-6 sm:py-9 lg:px-8 lg:py-12">
      <div className="mb-6 min-w-0 max-w-3xl sm:mb-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-full text-balance break-words font-display text-2xl font-semibold leading-[1.18] tracking-tight text-[var(--text-primary)] sm:text-5xl sm:leading-[1.16] lg:text-6xl">{title}</h1>
        <p className="font-subtitle mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">{summary}</p>
      </div>
      {children}
    </section>
  );
}

export function StatCard({ label, value, icon }: { label: string; value: string; icon: Soft3DIconName }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-5 shadow-editorial backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="font-subtitle text-sm font-medium text-[var(--text-secondary)]">{label}</p>
        <span className="grid h-9 w-9 place-items-center">
          <Soft3DIcon name={icon} size="sm" decorative active />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
