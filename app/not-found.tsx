import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
        <Heart className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-5 text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">Error 404</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#542B3C] sm:text-5xl dark:text-[#F7E8EF]">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
        The page you were looking for could not be found. Return home or jump directly into one of
        our Rose Edition calculators.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[#D94F79] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C13E67] dark:hover:bg-[#E26189]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>
        <Link
          href="/age-calculator"
          className="inline-flex min-h-[46px] items-center rounded-xl border border-[#F2DCE5] bg-white px-5 py-2.5 text-sm font-semibold text-[#542B3C] transition-colors hover:bg-[#FFF0F5] dark:border-[#3A1E2B] dark:bg-[#221219] dark:text-[#F7E8EF] dark:hover:bg-[#321A25]"
        >
          Age Calculator
        </Link>
        <Link
          href="/love-match"
          className="inline-flex min-h-[46px] items-center rounded-xl border border-[#F2DCE5] bg-white px-5 py-2.5 text-sm font-semibold text-[#542B3C] transition-colors hover:bg-[#FFF0F5] dark:border-[#3A1E2B] dark:bg-[#221219] dark:text-[#F7E8EF] dark:hover:bg-[#321A25]"
        >
          Love Match
        </Link>
      </div>
    </div>
  );
}
