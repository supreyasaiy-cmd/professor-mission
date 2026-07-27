"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Soft3DIcon } from "./icons/soft-3d-icon";
import type { Soft3DIconName } from "./icons/icon-types";

const navItems = [
  { href: "/", label: "Home", icon: "navigationHome" },
  { href: "/learn", label: "Learn", icon: "navigationLearn" },
  { href: "/quiz", label: "Practice", icon: "navigationPractice" },
  { href: "/review", label: "Review", icon: "navigationReview" },
] satisfies { href: string; label: string; icon: Soft3DIconName }[];

const profileItems = [
  { href: "/progress", label: "ความก้าวหน้าของฉัน", icon: "navigationProgress" },
  { href: "/review", label: "โน้ตและคำศัพท์", icon: "actionNote" },
  { href: "/settings", label: "ภาษาและเป้าหมายการเรียน", icon: "actionTranslation" },
  { href: "/settings", label: "ตั้งค่า", icon: "navigationSettings" },
] satisfies { href: string; label: string; icon: Soft3DIconName }[];

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

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      onBlur={onHide}
      onFocus={onShow}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
      className={`group relative grid shrink-0 place-items-center overflow-hidden rounded-full font-semibold leading-none outline-none transition-[width,background-color,color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        isDesktop ? "h-10" : "h-11 min-w-0"
      } ${
        showLabel
          ? `${isDesktop ? "w-28" : "w-full"} bg-[#171717] text-white shadow-[0_10px_24px_rgba(23,23,23,0.16)]`
          : `${isDesktop ? "w-14" : "w-full"} text-[var(--text-muted)] hover:bg-white/80 hover:text-[var(--text-primary)] focus-visible:bg-white/80`
      }`}
    >
      {isActive ? (
        <span className="pointer-events-none absolute top-[7px] left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#d9f4ff,#c7c9ff,#e5dcff)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-8 group-focus-visible:w-8" />
      ) : null}

      <span
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showLabel ? "scale-75 opacity-0 blur-[1px]" : "scale-100 opacity-100 blur-0"
        }`}
      >
        <Soft3DIcon name={item.icon} size="navLg" decorative shadow={false} active={isActive} />
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center whitespace-nowrap px-2 text-center text-sm transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showLabel ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-1 scale-95 opacity-0 blur-[1px]"
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
    <div className={`min-h-screen overflow-x-hidden text-[var(--text-primary)] ${isReviewPage ? "bg-[#03130c]" : "bg-[var(--background)]"}`}>
      <div className={`pointer-events-none fixed inset-0 overflow-hidden ${isReviewPage ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute left-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,#ff9bd5_0%,rgba(255,155,213,0)_68%)] opacity-50 blur-2xl" />
        <div className="absolute right-[-12rem] top-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,#83e8ff_0%,rgba(131,232,255,0)_68%)] opacity-55 blur-2xl" />
        <div className="absolute bottom-[-18rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,#ddff56_0%,rgba(221,255,86,0)_68%)] opacity-35 blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-[1600px]">
        <header className="sticky top-0 z-[90] px-3 py-3 sm:px-4 lg:hidden">
          <div className="flex min-h-[4.25rem] items-center justify-between rounded-full border border-[var(--border)] bg-white/88 px-4 shadow-[0_10px_28px_rgba(23,23,23,0.075)] backdrop-blur-2xl">
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
          <div className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between rounded-full border border-[var(--border)] bg-white/78 px-5 shadow-[0_12px_34px_rgba(23,23,23,0.07)] backdrop-blur-2xl">
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

        <main className="w-full pb-[calc(5.75rem+env(safe-area-inset-bottom))] lg:pb-10">{children}</main>

        <nav className="fixed bottom-2 left-3 right-3 z-[90] grid grid-cols-4 gap-1 rounded-[1.35rem] border border-[var(--border)] bg-white/88 p-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] shadow-[0_12px_34px_rgba(23,23,23,0.12)] backdrop-blur-2xl sm:left-4 sm:right-4 lg:hidden" aria-label="Primary navigation">
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
    <Link href="/" className="flex h-14 min-w-0 items-center gap-3 rounded-full px-1 text-left sm:gap-4">
      <svg className="h-8 w-20 shrink-0 text-[var(--text-primary)] sm:h-9 sm:w-24" viewBox="0 0 112 44" fill="none" aria-hidden="true">
        <path d="M7 21.5C23.5 24.8 41.7 26.2 62.5 23.4C72.7 22 82.4 19.5 93 17" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M82 9C88 11.5 95.2 15.8 101.5 21.2C94.3 25.1 87.8 29.8 81.8 35.2" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="block truncate font-display text-base font-semibold tracking-normal text-[var(--text-primary)] sm:text-lg">Supreya&apos;s Class room</span>
    </Link>
  );
}

function BackIconLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="Go back"
      className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[0_8px_18px_rgba(23,23,23,0.07)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_24px_rgba(23,23,23,0.1)] focus:outline-none focus:ring-2 focus:ring-black/70 focus:ring-offset-2 focus:ring-offset-white"
    >
      <Soft3DIcon name="actionPrevious" size="sm" decorative shadow={false} className="pointer-events-none" />
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
        className="grid h-14 w-14 cursor-pointer list-none place-items-center rounded-full border border-[var(--border-strong)] bg-white shadow-[0_8px_22px_rgba(23,23,23,0.11)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_12px_28px_rgba(23,23,23,0.13)] focus:outline-none focus:ring-2 focus:ring-black [&::-webkit-details-marker]:hidden"
      >
        <span className="sr-only">Open profile menu</span>
        <Soft3DIcon name="brandMission" size="brand" decorative shadow={false} priority className="pointer-events-none translate-y-px" />
      </summary>

      <div
        id="profile-menu"
        role="menu"
        aria-label="Profile menu"
        className={`absolute top-[4.5rem] z-50 hidden w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-white p-2 shadow-[0_18px_48px_rgba(23,23,23,0.13)] group-open:block ${
          align === "left" ? "left-0" : "right-0"
        }`}
      >
        <div className="py-1">
          {profileItems.map((item, index) => {
            const isActive = pathname === item.href && index !== 1;
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                role="menuitem"
                onClick={() => closeMenu()}
                className={`flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition ${
                  isActive ? "bg-[var(--surface)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Soft3DIcon name={item.icon} size="sm" decorative shadow={false} active={isActive} />
                {item.label}
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
    <section className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mb-8 max-w-3xl">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">{eyebrow}</p>
        <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="font-subtitle mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">{summary}</p>
      </div>
      {children}
    </section>
  );
}

export function StatCard({ label, value, icon }: { label: string; value: string; icon: Soft3DIconName }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white/80 p-5 shadow-editorial backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="font-subtitle text-sm font-medium text-[var(--text-secondary)]">{label}</p>
        <span className="grid h-9 w-9 place-items-center">
          <Soft3DIcon name={icon} size="sm" decorative shadow={false} active />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
