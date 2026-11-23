import type { Metadata } from 'next';
import Link from 'next/link';
import { Flame, ArrowRight, ShieldCheck, Sparkles, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Blaze Calculator — a modern, privacy-friendly Rose Edition platform combining exact age calculation, Love Match, and Compatibility tools.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">Our Story</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#542B3C] sm:text-5xl dark:text-[#F7E8EF]">
          About Blaze Calculator
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#542B3C]/90 sm:text-lg dark:text-[#E7CEDB]">
          Blaze Calculator is a modern and user-friendly platform designed to make everyday
          calculations more enjoyable. From calculating your exact age to exploring fun love matches
          and compatibility, everything is available in one beautiful place.
        </p>
      </div>

      {/* Principles */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#F2DCE5] bg-white p-6 dark:border-[#3A1E2B] dark:bg-[#221219]">
          <Calendar className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
            Exact Math
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
            Our Age Calculator respects every leap year and calendar month length, giving you
            dependable milestones down to the exact day and hour.
          </p>
        </div>

        <div className="rounded-2xl border border-[#F2DCE5] bg-white p-6 dark:border-[#3A1E2B] dark:bg-[#221219]">
          <Sparkles className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
            Honest &amp; Playful
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
            Our Love Match and Compatibility tools use transparent, deterministic formulas and
            clearly state that they are built for enjoyment and reflection.
          </p>
        </div>

        <div className="rounded-2xl border border-[#F2DCE5] bg-white p-6 dark:border-[#3A1E2B] dark:bg-[#221219]">
          <ShieldCheck className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
            Privacy First
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
            We never ask for accounts and we never archive your birth dates or names in a database.
            Every calculation runs statelessly.
          </p>
        </div>
      </div>

      {/* Methodology Note */}
      <section className="mt-12 rounded-2xl border border-[#F2DCE5] bg-white p-7 sm:p-9 dark:border-[#3A1E2B] dark:bg-[#221219]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
            <Flame className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
            Crafted by Blaze — Rose Edition
          </h2>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#987887] sm:text-base dark:text-[#C5A4B4]">
          Most utility calculators treat design as an afterthought. Blaze Calculator brings together
          editorial typography (Playfair Display and DM Sans), a soft Rose and Blush palette, full
          keyboard accessibility, and responsive mobile-first layouts so checking a birthday
          countdown or sharing a fun match score feels calm and polished on every screen.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/age-calculator"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#D94F79] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C13E67] dark:hover:bg-[#E26189]"
          >
            Try Age Calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#F2DCE5] bg-[#FFF8FB] px-5 py-2.5 text-sm font-semibold text-[#542B3C] transition-colors hover:bg-[#FFF0F5] dark:border-[#3A1E2B] dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:hover:bg-[#2D1722]"
          >
            Contact Blaze
          </Link>
        </div>
      </section>
    </div>
  );
}
