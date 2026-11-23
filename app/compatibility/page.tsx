import type { Metadata } from 'next';
import Link from 'next/link';
import { HeartHandshake, ArrowRight } from 'lucide-react';
import CompatibilityClient from '@/components/CompatibilityClient';

export const metadata: Metadata = {
  title: 'Compatibility Calculator',
  description:
    'Explore a transparent, deterministic compatibility breakdown combining Name Match, Age Compatibility, and exact calendar age difference.',
};

export default function CompatibilityPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">
          <HeartHandshake className="h-4 w-4" aria-hidden="true" />
          <span>Transparent Formula</span>
          <span aria-hidden="true">·</span>
          <span>Names &amp; Birth Dates</span>
        </div>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#542B3C] sm:text-5xl dark:text-[#F7E8EF]">
          Compatibility Calculator
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
          Compare two names and dates of birth to uncover your Overall Compatibility, Name Match
          Score, Age Compatibility Score, and exact calendar age difference.
        </p>
      </div>

      <div className="mt-9">
        <CompatibilityClient />
      </div>

      <aside className="no-print mt-14 border-t border-[#F2DCE5] pt-10 dark:border-[#3A1E2B]">
        <h2 className="font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
          Explore More Calculators
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/age-calculator"
            className="group flex items-center justify-between rounded-2xl border border-[#F2DCE5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#D94F79]/40 dark:border-[#3A1E2B] dark:bg-[#221219]"
          >
            <div>
              <p className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Age Calculator
              </p>
              <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
                Calculate exact age milestones and watch your live birthday countdown.
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-[#D94F79] transition-transform group-hover:translate-x-1 dark:text-[#F48FB1]"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/love-match"
            className="group flex items-center justify-between rounded-2xl border border-[#F2DCE5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#D94F79]/40 dark:border-[#3A1E2B] dark:bg-[#221219]"
          >
            <div>
              <p className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Love Match Calculator
              </p>
              <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
                Quick two-name love match percentage with order-independent consistency.
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-[#D94F79] transition-transform group-hover:translate-x-1 dark:text-[#F48FB1]"
              aria-hidden="true"
            />
          </Link>
        </div>
      </aside>
    </div>
  );
}
