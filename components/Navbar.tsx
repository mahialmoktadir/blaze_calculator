'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/age-calculator', label: 'Age Calculator' },
  { href: '/love-match', label: 'Love Match' },
  { href: '/compatibility', label: 'Compatibility' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, mounted, toggleTheme } = useTheme();
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const mobileOpen = mobileOpenPath === pathname;

  const toggleMobileMenu = () => {
    setMobileOpenPath((prev) => (prev === pathname ? null : pathname));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F2DCE5] bg-[#FFF8FB]/92 backdrop-blur-md transition-colors dark:border-[#3A1E2B] dark:bg-[#160B10]/92">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[#542B3C] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] focus-visible:ring-offset-2 dark:text-[#F7E8EF] dark:focus-visible:ring-offset-[#160B10]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D94F79] text-white shadow-sm shadow-[#D94F79]/25">
            <Flame className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight whitespace-nowrap">
            BLAZE CALCULATOR
          </span>
        </Link>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#160B10] ${
                  active
                    ? 'text-[#D94F79] dark:text-[#F48FB1]'
                    : 'text-[#542B3C]/80 hover:text-[#D94F79] dark:text-[#E7CEDB]/85 dark:hover:text-[#F48FB1]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#D94F79] dark:bg-[#F48FB1]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Mobile Menu */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            title={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F2DCE5] bg-white text-[#8F3155] transition-colors hover:border-[#D94F79]/40 hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:border-[#3A1E2B] dark:bg-[#24131B] dark:text-[#F4A6C1] dark:hover:bg-[#321A25]"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <Link
            href="/contact"
            className="hidden h-10 shrink-0 items-center justify-center rounded-xl bg-[#D94F79] px-4 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-[#C13E67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] focus-visible:ring-offset-2 sm:inline-flex dark:bg-[#D94F79] dark:hover:bg-[#E26189] dark:focus-visible:ring-offset-[#160B10]"
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F2DCE5] bg-white text-[#542B3C] transition-colors hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] lg:hidden dark:border-[#3A1E2B] dark:bg-[#24131B] dark:text-[#F7E8EF] dark:hover:bg-[#321A25]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="border-t border-[#F2DCE5] bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden dark:border-[#3A1E2B] dark:bg-[#1E0F16]"
        >
          <div className="flex flex-col gap-1">
            {[
              ...NAV_LINKS,
              { href: '/contact', label: 'Contact' },
              { href: '/privacy-policy', label: 'Privacy Policy' },
            ].map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-medium transition-colors ${
                    active
                      ? 'bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]'
                      : 'text-[#542B3C] hover:bg-[#FFF8FB] hover:text-[#D94F79] dark:text-[#E7CEDB] dark:hover:bg-[#2A1520] dark:hover:text-[#F48FB1]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
