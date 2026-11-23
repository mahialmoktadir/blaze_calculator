import React from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#F2DCE5] bg-white text-[#542B3C] dark:border-[#3A1E2B] dark:bg-[#1A0D13] dark:text-[#E7CEDB]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-[#542B3C] dark:text-[#F7E8EF]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D94F79] text-white">
                <Flame className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-semibold tracking-tight">
                BLAZE CALCULATOR
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
              A refined, privacy-first suite of everyday and relationship calculators — crafted to
              make exact age milestones, love matches, and compatibility insights effortless to
              explore.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-sm font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#987887] dark:text-[#C5A4B4]">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#D94F79] dark:hover:text-[#F48FB1]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-[#D94F79] dark:hover:text-[#F48FB1]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-[#D94F79] dark:hover:text-[#F48FB1]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-[#D94F79] dark:hover:text-[#F48FB1]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculator Links */}
          <div className="md:col-span-4">
            <h3 className="font-sans text-sm font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
              Calculators
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#987887] dark:text-[#C5A4B4]">
              <li>
                <Link
                  href="/age-calculator"
                  className="transition-colors hover:text-[#D94F79] dark:hover:text-[#F48FB1]"
                >
                  Age Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/love-match"
                  className="transition-colors hover:text-[#D94F79] dark:hover:text-[#F48FB1]"
                >
                  Love Match Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/compatibility"
                  className="transition-colors hover:text-[#D94F79] dark:hover:text-[#F48FB1]"
                >
                  Compatibility Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#F2DCE5] pt-6 text-xs text-[#987887] sm:flex-row sm:items-center dark:border-[#3A1E2B] dark:text-[#B996A7]">
          <p>© 2026 Blaze Calculator. All Rights Reserved.</p>
          <p>Designed &amp; Developed by Blaze.</p>
        </div>
      </div>
    </footer>
  );
}
