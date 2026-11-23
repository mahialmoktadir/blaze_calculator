import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import LoveMatchClient from '@/components/LoveMatchClient';

export const metadata: Metadata = {
  title: 'Love Match Calculator',
  description:
    'Discover a consistent, order-independent Love Match percentage between two names with charming Rose Edition results.',
};

export default function LoveMatchPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">
          <Heart className="h-4 w-4" aria-hidden="true" />
          <span>Deterministic &amp; Symmetric</span>
          <span aria-hidden="true">·</span>
          <span>For Entertainment</span>
        </div>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#542B3C] sm:text-5xl dark:text-[#F7E8EF]">
          Love Match Calculator
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
          Enter two names to reveal a playful, consistent match score from 0% to 100%. The same
          pair always returns the exact same score — no matter which name comes first.
        </p>
      </div>

      <div className="mt-9">
        <LoveMatchClient />
      </div>

      <aside className="no-print mt-14 border-t border-[#F2DCE5] pt-10 dark:border-[#3A1E2B]">
        <h2 className="font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
          Explore More Calculators
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/compatibility"
            className="group flex items-center justify-between rounded-2xl border border-[#F2DCE5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#D94F79]/40 dark:border-[#3A1E2B] dark:bg-[#221219]"
          >
            <div>
              <p className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Compatibility Calculator
              </p>
              <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
                Add birth dates to see Name Match, Age Score, and exact age difference.
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-[#D94F79] transition-transform group-hover:translate-x-1 dark:text-[#F48FB1]"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/age-calculator"
            className="group flex items-center justify-between rounded-2xl border border-[#F2DCE5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#D94F79]/40 dark:border-[#3A1E2B] dark:bg-[#221219]"
          >
            <div>
              <p className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Age Calculator
              </p>
              <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
                Exact years, months, days, lived stats, and live birthday countdown.
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
