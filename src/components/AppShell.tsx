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

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const isReviewPage = pathname === "/review";

  return (
    <div className={`min-h-screen overflow-x-hidden text-[var(--text-primary)] ${isReviewPage ? "bg-[#03130c]" : "bg-[var(--background)]"}`}>
      <div className={`pointer-events-none fixed inset-0 overflow-hidden ${isReviewPage ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute left-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,#ff9bd5_0%,rgba(255,155,213,0)_68%)] opacity-50 blur-2xl" />
        <div className="absolute right-[-12rem] top-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,#83e8ff_0%,rgba(131,232,255,0)_68%)] opacity-55 blur-2xl" />
        <div className="absolute bottom-[-18rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,#ddff56_0%,rgba(221,255,86,0)_68%)] opacity-35 blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-[1600px]">
        <header className="sticky top-0 z-[90] px-3 pt-3 sm:px-4 lg:hidden">
          <div className="flex min-h-16 items-center justify-between rounded-full border border-[var(--border)] bg-white/86 px-3 shadow-[0_14px_34px_rgba(23,23,23,0.09)] backdrop-blur-2xl">
            <div className="flex min-w-0 items-center gap-3">
              <ProfileMenu pathname={pathname} align="left" />
              <Link href="/" className="min-w-0 rounded-full px-1">
                <span className="block truncate font-display text-sm font-extrabold tracking-tight">✦ Professor Mission ✦</span>
              </Link>
            </div>
            <div className="h-12 w-12 shrink-0" aria-hidden="true" />
          </div>
        </header>

        <header className="sticky top-0 z-[90] hidden px-6 pt-5 lg:block">
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between rounded-full border border-[var(--border)] bg-white/72 px-4 shadow-[0_18px_48px_rgba(23,23,23,0.08)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <ProfileMenu pathname={pathname} align="left" />
              <Link href="/" className="rounded-full px-1">
                <span>
                  <span className="block font-display text-sm font-extrabold tracking-tight">✦ Professor Mission ✦</span>
                </span>
              </Link>
            </div>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const showLabel = isActive || hoveredHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    onBlur={() => setHoveredHref(null)}
                    onFocus={() => setHoveredHref(item.href)}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    onMouseLeave={() => setHoveredHref(null)}
                    className={`group relative inline-flex min-h-10 items-center overflow-hidden rounded-full text-sm font-semibold transition-all duration-300 ${
                      showLabel
                        ? "w-28 justify-center bg-[#171717] px-4 text-white shadow-[0_10px_24px_rgba(23,23,23,0.15)]"
                        : "w-14 justify-center px-2 text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)] focus-visible:bg-white focus-visible:text-[var(--text-primary)]"
                    }`}
                  >
                    {!showLabel ? <Soft3DIcon name={item.icon} size="navLg" decorative shadow={false} active={false} /> : null}
                    <span
                      aria-hidden="true"
                      className={`whitespace-nowrap text-sm transition-all duration-200 ${
                        showLabel ? "max-w-20 opacity-100" : "max-w-0 opacity-0"
                      }`}
                    >
                      {item.label}
                    </span>
	                    {isActive ? <span className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#d9f4ff,#c7c9ff,#e5dcff)]" /> : null}
	                  </Link>
                );
              })}
            </nav>

            <div className="h-11 w-11" aria-hidden="true" />
          </div>
        </header>

        <main className="w-full pb-[calc(5.75rem+env(safe-area-inset-bottom))] lg:pb-10">{children}</main>

        <nav className="fixed bottom-2 left-3 right-3 z-[90] grid grid-cols-4 rounded-[1.45rem] border border-[var(--border)] bg-white/88 p-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] shadow-[0_12px_34px_rgba(23,23,23,0.12)] backdrop-blur-2xl sm:left-4 sm:right-4 lg:hidden" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const showLabel = isActive || hoveredHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                onBlur={() => setHoveredHref(null)}
                onFocus={() => setHoveredHref(item.href)}
                onMouseEnter={() => setHoveredHref(item.href)}
                onMouseLeave={() => setHoveredHref(null)}
                className={`group relative flex min-h-11 items-center justify-center overflow-hidden rounded-[1.1rem] px-1 text-[12px] font-semibold leading-none transition ${
                  showLabel
                    ? "bg-[#171717] text-white"
                    : "text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive ? <span className="absolute top-1 h-1 w-5 rounded-full bg-[linear-gradient(90deg,#d9f4ff,#c7c9ff,#e5dcff)]" /> : null}
                {!showLabel ? <Soft3DIcon name={item.icon} size="navLg" decorative shadow={false} active={false} /> : null}
                <span
                  aria-hidden="true"
                  className={`whitespace-nowrap transition-all duration-200 ${
                    showLabel ? "max-h-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
	                  {item.label}
	                </span>
	              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function ProfileMenu({ pathname, align = "right" }: { pathname: string; align?: "left" | "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function closeMenu({ restoreFocus = false } = {}) {
    setIsOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => buttonRef.current?.focus());
  }

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
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
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="profile-menu"
        onClick={() => setIsOpen((current) => !current)}
        className="grid h-12 w-12 place-items-center rounded-full border border-[var(--border)] bg-white shadow-[0_12px_30px_rgba(23,23,23,0.12)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-black"
      >
        <span className="sr-only">Open profile menu</span>
        <Soft3DIcon name="brandMission" size="brand" decorative shadow={false} priority className="translate-y-px" />
      </button>

      {isOpen ? (
        <div
          id="profile-menu"
          role="menu"
          aria-label="Profile menu"
          className={`absolute top-14 z-50 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-white p-2 shadow-[0_24px_70px_rgba(23,23,23,0.16)] ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          <div className="border-b border-[var(--border)] px-3 py-3">
            <p className="font-display text-sm font-extrabold text-[var(--text-primary)]">✦ Professor Mission ✦</p>
            <p className="text-xs leading-5 text-[var(--text-secondary)]">พื้นที่เรียนรู้และติดตามเป้าหมายของฉัน</p>
          </div>
          <div className="py-2">
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
      ) : null}
    </div>
  );
}

export function PageShell({ children, eyebrow, title, summary }: { children: ReactNode; eyebrow: string; title: string; summary: string }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mb-8 max-w-3xl">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">{eyebrow}</p>
        <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">{summary}</p>
      </div>
      {children}
    </section>
  );
}

export function StatCard({ label, value, icon }: { label: string; value: string; icon: Soft3DIconName }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-white/80 p-5 shadow-editorial backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
        <span className="grid h-9 w-9 place-items-center">
          <Soft3DIcon name={icon} size="sm" decorative shadow={false} active />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
