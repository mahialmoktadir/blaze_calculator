import React from 'react';
import Link from 'next/link';
import {
  Cake,
  Heart,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  SlidersHorizontal,
  Share2,
  Moon,
  Sparkles,
} from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';

const CALCULATOR_CARDS = [
  {
    title: 'Age Calculator',
    description:
      'Discover your exact age in years, months, and days, along with total weeks and hours lived, day of birth, and a live birthday countdown.',
    cta: 'Calculate Age',
    href: '/age-calculator',
    icon: Cake,
    meta: 'Leap-year accurate · Live countdown',
  },
  {
    title: 'Love Match',
    description:
      'Enter two names to reveal a playful, consistent match percentage between 0% and 100% that stays identical regardless of name order.',
    cta: 'Find Your Match',
    href: '/love-match',
    icon: Heart,
    meta: 'Deterministic · Order-independent',
  },
  {
    title: 'Compatibility Calculator',
    description:
      'Combine names and dates of birth for a transparent Overall Compatibility score, Name Match score, Age Compatibility, and exact age difference.',
    cta: 'Check Compatibility',
    href: '/compatibility',
    icon: HeartHandshake,
    meta: 'Transparent formula · Detailed summary',
  },
];

const WHY_CHOOSE = [
  {
    num: '01.',
    title: 'True Calendar Precision',
    body: 'Every date calculation honors exact month lengths and Gregorian leap-year rules — including February 29 birthdays.',
  },
  {
    num: '02.',
    title: 'Consistent, Deterministic Math',
    body: 'Love Match and Compatibility results never jump randomly on refresh and remain identical whichever name is entered first.',
  },
  {
    num: '03.',
    title: 'Private by Default',
    body: 'Zero accounts, zero database storage, and zero tracking profiles. Your dates and names stay strictly in your current session.',
  },
  {
    num: '04.',
    title: 'Crafted for Calm Clarity',
    body: 'Balanced typography, instant validation, print-friendly layouts, and a matching Dark Rose theme keep every screen effortless.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose a Calculator',
    body: 'Start with the Age Calculator, Love Match, or the full Compatibility Calculator depending on what you want to explore.',
  },
  {
    step: '02',
    title: 'Enter Your Details',
    body: 'Real-time and server-side validation catch invalid or future dates immediately so every result is trustworthy.',
  },
  {
    step: '03',
    title: 'Copy, Share, or Print',
    body: 'Save your animated result summary in one click via clipboard copy, native Web Share, or a clean print-ready layout.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#F2DCE5] bg-gradient-to-b from-[#FFF0F5] via-[#FFF8FB] to-[#FFF8FB] dark:border-[#3A1E2B] dark:from-[#26121C] dark:via-[#160B10] dark:to-[#160B10]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-22 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Hero Copy */}
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">
                Blaze Calculator · Rose Edition
              </p>
              <h1
                className="mt-3 max-w-xl font-serif font-semibold tracking-tight text-[#542B3C] dark:text-[#F7E8EF]"
                style={{ fontSize: 'clamp(2.35rem, 4.4vw, 3.85rem)', lineHeight: 1.08 }}
              >
                Numbers with a Touch of Love.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#987887] sm:text-lg dark:text-[#C5A4B4]">
                Discover your age, explore your connections, and uncover your compatibility — all
                in one beautiful place.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/age-calculator"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#D94F79] px-7 py-3 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-[#D94F79]/25 transition-colors hover:bg-[#C13E67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] focus-visible:ring-offset-2 dark:hover:bg-[#E26189] dark:focus-visible:ring-offset-[#160B10]"
                >
                  Start Calculating
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#calculators"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#F2DCE5] bg-white px-7 py-3 text-sm font-semibold text-[#542B3C] whitespace-nowrap transition-colors hover:border-[#D94F79]/40 hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:border-[#3D212E] dark:bg-[#221219] dark:text-[#F7E8EF] dark:hover:bg-[#321A25]"
                >
                  Explore Calculators
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-[#987887] dark:text-[#B996A7]">
                <span>Exact leap-year accuracy</span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span>Deterministic scoring</span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span>No sign-up required</span>
              </div>
            </div>

            {/* Hero Editorial Graphic Composition (Pure CSS + Lucide, zero external broken URLs) */}
            <div className="flex items-stretch lg:col-span-5">
              <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#F2DCE5] bg-white p-6 shadow-md shadow-[#D94F79]/8 sm:p-8 dark:border-[#3D212E] dark:bg-[#221219] dark:shadow-none">
                {/* Soft rose ambient corner glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#F8DCE7]/70 blur-2xl dark:bg-[#8F3155]/25"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-[#FFF0F5] blur-2xl dark:bg-[#D94F79]/15"
                />

                <div className="relative space-y-5">
                  <div className="flex items-center justify-between border-b border-[#F2DCE5] pb-4 dark:border-[#3A1E2B]">
                    <div>
                      <p className="text-xs font-medium text-[#987887] dark:text-[#C5A4B4]">
                        Blaze Suite Preview
                      </p>
                      <p className="mt-0.5 font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                        Three Refined Calculators
                      </p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Specimen Row 1: Age */}
                  <Link
                    href="/age-calculator"
                    className="group flex items-center justify-between rounded-2xl bg-[#FFF8FB] p-4 transition-colors hover:bg-[#FFF0F5] dark:bg-[#1A0D13] dark:hover:bg-[#2B1520]"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#D94F79] shadow-xs dark:bg-[#2A1520] dark:text-[#F48FB1]">
                        <Cake className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs text-[#987887] dark:text-[#C5A4B4]">Exact Age</p>
                        <p className="font-serif text-base font-semibold tabular-nums text-[#542B3C] dark:text-[#F7E8EF]">
                          26y · 8m · 25d
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#D94F79] group-hover:underline dark:text-[#F48FB1]">
                      Open
                    </span>
                  </Link>

                  {/* Specimen Row 2: Love Match */}
                  <Link
                    href="/love-match"
                    className="group flex items-center justify-between rounded-2xl bg-[#FFF8FB] p-4 transition-colors hover:bg-[#FFF0F5] dark:bg-[#1A0D13] dark:hover:bg-[#2B1520]"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#D94F79] shadow-xs dark:bg-[#2A1520] dark:text-[#F48FB1]">
                        <Heart
                          className="animate-heart-pulse h-4 w-4 fill-[#D94F79] dark:fill-[#F48FB1]"
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <p className="text-xs text-[#987887] dark:text-[#C5A4B4]">Love Match</p>
                        <p className="font-serif text-base font-semibold tabular-nums text-[#542B3C] dark:text-[#F7E8EF]">
                          92% — Perfect Match!
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#D94F79] group-hover:underline dark:text-[#F48FB1]">
                      Open
                    </span>
                  </Link>

                  {/* Specimen Row 3: Compatibility */}
                  <Link
                    href="/compatibility"
                    className="group flex items-center justify-between rounded-2xl bg-[#FFF8FB] p-4 transition-colors hover:bg-[#FFF0F5] dark:bg-[#1A0D13] dark:hover:bg-[#2B1520]"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#D94F79] shadow-xs dark:bg-[#2A1520] dark:text-[#F48FB1]">
                        <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs text-[#987887] dark:text-[#C5A4B4]">Compatibility</p>
                        <p className="font-serif text-base font-semibold tabular-nums text-[#542B3C] dark:text-[#F7E8EF]">
                          Name + Age Harmony
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#D94F79] group-hover:underline dark:text-[#F48FB1]">
                      Open
                    </span>
                  </Link>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-[#F2DCE5] pt-4 text-xs text-[#987887] dark:border-[#3A1E2B] dark:text-[#B996A7]">
                  <span>Instant validation &amp; shareable summaries</span>
                  <span className="font-medium text-[#8F3155] dark:text-[#F4A6C1]">100% Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Cards Section */}
      <section
        id="calculators"
        aria-labelledby="calculators-heading"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">
            Signature Calculators
          </p>
          <h2
            id="calculators-heading"
            className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#542B3C] sm:text-4xl dark:text-[#F7E8EF]"
          >
            Choose Where to Begin
          </h2>
          <p className="mt-3 text-base text-[#987887] dark:text-[#C5A4B4]">
            Each calculator is built with careful validation, transparent logic, and shareable
            results.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CALCULATOR_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.href}
                className="group flex flex-col justify-between rounded-2xl border border-[#F2DCE5] bg-white p-7 shadow-sm shadow-[#D94F79]/6 transition-all duration-200 hover:-translate-y-1 hover:border-[#D94F79]/40 hover:shadow-md hover:shadow-[#D94F79]/12 dark:border-[#3A1E2B] dark:bg-[#221219] dark:shadow-none dark:hover:border-[#D94F79]/50"
              >
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F5] text-[#D94F79] transition-colors group-hover:bg-[#D94F79] group-hover:text-white dark:bg-[#341A26] dark:text-[#F48FB1] dark:group-hover:bg-[#D94F79] dark:group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                    {card.description}
                  </p>
                </div>

                <div className="mt-7 pt-5 border-t border-[#F2DCE5]/80 dark:border-[#3A1E2B]">
                  <p className="text-xs text-[#987887] dark:text-[#B996A7]">{card.meta}</p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#D94F79] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#C13E67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] focus-visible:ring-offset-2 dark:hover:bg-[#E26189] dark:focus-visible:ring-offset-[#221219]"
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Choose Blaze Calculator */}
      <section className="border-y border-[#F2DCE5] bg-white dark:border-[#3A1E2B] dark:bg-[#1C0E15]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">
                Thoughtful Engineering
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#542B3C] dark:text-[#F7E8EF]">
                Why Choose Blaze Calculator?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                Built to feel calm, accurate, and genuinely dependable — without cluttered ads,
                random gimmicks, or invasive tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-8">
              {WHY_CHOOSE.map((item) => (
                <div
                  key={item.num}
                  className="border-t border-[#F2DCE5] pt-5 dark:border-[#3A1E2B]"
                >
                  <span className="font-serif text-lg font-semibold text-[#D94F79] dark:text-[#F48FB1]">
                    {item.num}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">Simple Workflow</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#542B3C] sm:text-4xl dark:text-[#F7E8EF]">
            How It Works
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-[#F2DCE5] bg-white p-6 dark:border-[#3A1E2B] dark:bg-[#221219]"
            >
              <span className="font-serif text-2xl font-bold text-[#D94F79] dark:text-[#F48FB1]">
                {item.step}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Overview (Asymmetric Bento Grid) */}
      <section className="border-t border-[#F2DCE5] bg-[#FFF0F5]/55 dark:border-[#3A1E2B] dark:bg-[#1C0E15]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">
              Platform Capabilities
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#542B3C] sm:text-4xl dark:text-[#F7E8EF]">
              Features Overview
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12">
            <div className="rounded-2xl border border-[#F2DCE5] bg-white p-7 md:col-span-7 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <CalendarCheck
                className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-serif text-2xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Real-Time &amp; Server-Side Date Validation
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                Every input is validated instantly as you type and verified again on the server.
                Future birth dates, impossible calendar dates (like February 29 on non-leap years),
                and blank entries are caught gracefully with clear guidance.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F2DCE5] bg-white p-7 md:col-span-5 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <SlidersHorizontal
                className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-serif text-2xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Transparent Scoring
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                No black-box gimmicks. Compatibility shows the exact Name Match weight (55%), Age
                Compatibility weight (45%), and calendar difference side by side.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F2DCE5] bg-white p-7 md:col-span-4 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <Share2 className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Copy, Share &amp; Print
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                Share results via the Web Share API, copy formatted text summaries, or print clean
                keepsakes with dedicated print styles.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F2DCE5] bg-white p-7 md:col-span-4 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <Moon className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Light &amp; Dark Rose Modes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                Switch seamlessly between airy Blush White and deep Velvet Rose dark mode while
                preserving readable contrast across every card.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F2DCE5] bg-white p-7 md:col-span-4 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <ShieldCheck
                className="h-5 w-5 text-[#D94F79] dark:text-[#F48FB1]"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                Privacy-First Architecture
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                Everything calculates statelessly without saving personal details to a database or
                relying on external tracking scripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">Questions</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#542B3C] sm:text-4xl dark:text-[#F7E8EF]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#F2DCE5] bg-gradient-to-r from-[#FFF0F5] via-[#FFF8FB] to-[#F8DCE7]/50 px-6 py-12 text-center sm:px-12 sm:py-16 dark:border-[#3D212E] dark:from-[#2C1621] dark:via-[#221219] dark:to-[#2A141F]">
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-semibold tracking-tight text-[#542B3C] sm:text-4xl dark:text-[#F7E8EF]">
            Ready to Explore Your Numbers?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-[#987887] dark:text-[#C5A4B4]">
            Jump straight into any Blaze calculator — accurate, private, and crafted with warmth.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/age-calculator"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#D94F79] px-7 py-3 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-[#D94F79]/25 transition-colors hover:bg-[#C13E67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:hover:bg-[#E26189]"
            >
              Calculate Age
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/love-match"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-[#F2DCE5] bg-white px-6 py-3 text-sm font-semibold text-[#542B3C] whitespace-nowrap transition-colors hover:border-[#D94F79]/40 hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:border-[#462635] dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:hover:bg-[#321A25]"
            >
              Try Love Match
            </Link>
            <Link
              href="/compatibility"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-[#F2DCE5] bg-white px-6 py-3 text-sm font-semibold text-[#542B3C] whitespace-nowrap transition-colors hover:border-[#D94F79]/40 hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:border-[#462635] dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:hover:bg-[#321A25]"
            >
              Check Compatibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
