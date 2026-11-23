'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Cake,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
  Loader2,
  Sun,
  Hourglass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  type AgeResult,
  formatAgeSummary,
  validateBirthDateInput,
  parseIsoDate,
} from '@/lib/calculators';
import AnimatedCounter from './AnimatedCounter';
import ResultActions from './ResultActions';

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeLiveCountdown(nextBirthdayIso: string): CountdownParts {
  const parts = parseIsoDate(nextBirthdayIso);
  if (!parts) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const target = new Date(parts.year, parts.month - 1, parts.day, 0, 0, 0, 0);
  const diffMs = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function AgeCalculatorClient() {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AgeResult | null>(null);
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  const todayIso = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const nextBirthdayIso = result?.nextBirthdayDate ?? '';
  const isBirthdayToday = result?.isBirthdayToday ?? false;

  useEffect(() => {
    if (!nextBirthdayIso || isBirthdayToday) {
      return;
    }

    const update = () => {
      setCountdown(computeLiveCountdown(nextBirthdayIso));
    };
    const rafId = window.requestAnimationFrame(update);
    const timer = window.setInterval(update, 1000);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearInterval(timer);
    };
  }, [nextBirthdayIso, isBirthdayToday]);

  const activeCountdown = nextBirthdayIso && !isBirthdayToday ? countdown : null;

  const handleDateChange = (value: string) => {
    setBirthDate(value);
    if (!value) {
      setError(null);
      return;
    }
    const check = validateBirthDateInput(value);
    if (!check.ok) {
      setError(check.error);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientCheck = validateBirthDateInput(birthDate);
    if (!clientCheck.ok) {
      setError(clientCheck.error);
      setResult(null);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/age', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Could not calculate age. Please verify your birth date.');
        setResult(null);
      } else {
        setResult(json.data as AgeResult);
      }
    } catch {
      setError('A network error occurred. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setError(null);
    setResult(null);
    setCountdown(null);
  };

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="no-print rounded-2xl border border-[#F2DCE5] bg-white p-6 shadow-sm shadow-[#D94F79]/5 sm:p-8 dark:border-[#3A1E2B] dark:bg-[#221219] dark:shadow-none"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="age-dob-input"
              className="block text-sm font-semibold text-[#542B3C] dark:text-[#F7E8EF]"
            >
              Date of Birth
            </label>
            <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
              Select your birth date to calculate exact years, months, days, and next birthday.
            </p>
            <div className="relative mt-2.5">
              <input
                id="age-dob-input"
                name="birthDate"
                type="date"
                min="1900-01-01"
                max={todayIso}
                value={birthDate}
                onChange={(e) => handleDateChange(e.target.value)}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'age-dob-error' : undefined}
                required
                className={`block w-full min-h-[48px] rounded-xl border bg-[#FFF8FB] px-4 py-3 text-base text-[#542B3C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] ${
                  error
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#D94F79] px-7 py-3 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-[#D94F79]/25 transition-colors hover:bg-[#C13E67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto dark:hover:bg-[#E26189] dark:focus-visible:ring-offset-[#221219]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Calculating...
                </>
              ) : (
                <>
                  <Cake className="h-4 w-4" aria-hidden="true" />
                  Calculate Age
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div
            id="age-dob-error"
            role="alert"
            className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-200"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Results Area */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.section
            key={result.birthDate}
            aria-label="Age Calculation Results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Primary Exact Age Banner */}
            <div className="print-card rounded-2xl border border-[#F2DCE5] bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF8FB] p-6 shadow-sm shadow-[#D94F79]/8 sm:p-8 dark:border-[#3D212E] dark:from-[#2C1621] dark:via-[#221219] dark:to-[#1B0E14]">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-[#8F3155] dark:text-[#F4A6C1]">
                    Exact Age Breakdown · Born {result.formattedBirthDate}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-semibold text-[#542B3C] sm:text-3xl dark:text-[#F7E8EF]">
                    {result.isBirthdayToday
                      ? 'Happy Birthday Today!'
                      : 'Your Precise Life Milestone'}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#8F3155] dark:text-[#F4A6C1]">
                  <Sun className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
                  <span>Born on a {result.dayOfBirth}</span>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-5">
                <div className="rounded-xl border border-[#F2DCE5] bg-white p-4 text-center sm:p-6 dark:border-[#3D212E] dark:bg-[#1A0D13]">
                  <div className="font-serif text-3xl font-bold text-[#D94F79] sm:text-5xl dark:text-[#F48FB1]">
                    <AnimatedCounter value={result.years} />
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-[#987887] sm:text-sm dark:text-[#C5A4B4]">
                    {result.years === 1 ? 'Year' : 'Years'}
                  </div>
                </div>

                <div className="rounded-xl border border-[#F2DCE5] bg-white p-4 text-center sm:p-6 dark:border-[#3D212E] dark:bg-[#1A0D13]">
                  <div className="font-serif text-3xl font-bold text-[#D94F79] sm:text-5xl dark:text-[#F48FB1]">
                    <AnimatedCounter value={result.months} />
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-[#987887] sm:text-sm dark:text-[#C5A4B4]">
                    {result.months === 1 ? 'Month' : 'Months'}
                  </div>
                </div>

                <div className="rounded-xl border border-[#F2DCE5] bg-white p-4 text-center sm:p-6 dark:border-[#3D212E] dark:bg-[#1A0D13]">
                  <div className="font-serif text-3xl font-bold text-[#D94F79] sm:text-5xl dark:text-[#F48FB1]">
                    <AnimatedCounter value={result.days} />
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-[#987887] sm:text-sm dark:text-[#C5A4B4]">
                    {result.days === 1 ? 'Day' : 'Days'}
                  </div>
                </div>
              </div>

              {result.isLeapDayBirth && (
                <p className="mt-5 text-xs text-[#8F3155] dark:text-[#F4A6C1]">
                  Leap-day note: Because you were born on February 29, non-leap calendar years
                  track your birthday celebration on February 28 while preserving exact leap-year
                  day counts.
                </p>
              )}
            </div>

            {/* Detailed Lived Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-5 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <p className="text-xs font-medium text-[#987887] dark:text-[#C5A4B4]">
                  Total Days Lived
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-[#542B3C] dark:text-[#F7E8EF]">
                  <AnimatedCounter value={result.totalDays} />
                </p>
                <p className="mt-1 text-xs text-[#987887] dark:text-[#B996A7]">
                  Includes every leap day
                </p>
              </div>

              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-5 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <p className="text-xs font-medium text-[#987887] dark:text-[#C5A4B4]">
                  Total Weeks Lived
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-[#542B3C] dark:text-[#F7E8EF]">
                  <AnimatedCounter value={result.totalWeeks} />
                </p>
                <p className="mt-1 text-xs text-[#987887] dark:text-[#B996A7]">
                  Plus {result.remainingDaysAfterWeeks}{' '}
                  {result.remainingDaysAfterWeeks === 1 ? 'day' : 'days'}
                </p>
              </div>

              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-5 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <p className="text-xs font-medium text-[#987887] dark:text-[#C5A4B4]">
                  Total Months Lived
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-[#542B3C] dark:text-[#F7E8EF]">
                  <AnimatedCounter value={result.totalMonths} />
                </p>
                <p className="mt-1 text-xs text-[#987887] dark:text-[#B996A7]">
                  Complete calendar months
                </p>
              </div>

              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-5 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <p className="text-xs font-medium text-[#987887] dark:text-[#C5A4B4]">
                  Total Hours Lived
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-[#542B3C] dark:text-[#F7E8EF]">
                  <AnimatedCounter value={result.totalHours} />
                </p>
                <p className="mt-1 text-xs text-[#987887] dark:text-[#B996A7]">
                  24-hour calendar baseline
                </p>
              </div>
            </div>

            {/* Next Birthday & Live Countdown */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="print-card flex flex-col justify-between rounded-2xl border border-[#F2DCE5] bg-white p-6 lg:col-span-5 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
                    <Calendar className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[#987887] dark:text-[#C5A4B4]">
                      Next Birthday Date
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                      {result.formattedNextBirthday}
                    </p>
                    <p className="mt-1.5 text-sm text-[#8F3155] dark:text-[#F4A6C1]">
                      {result.isBirthdayToday
                        ? 'Your celebration is today!'
                        : `${result.daysUntilNextBirthday} ${
                            result.daysUntilNextBirthday === 1 ? 'day' : 'days'
                          } remaining`}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#F2DCE5] pt-4 text-xs text-[#987887] dark:border-[#3A1E2B] dark:text-[#C5A4B4]">
                  <span>Day of Birth</span>
                  <span className="font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                    {result.dayOfBirth}
                  </span>
                </div>
              </div>

              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-6 lg:col-span-7 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <div className="flex items-center gap-2.5">
                  <Hourglass
                    className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]"
                    aria-hidden="true"
                  />
                  <h3 className="font-sans text-sm font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                    Live Birthday Countdown
                  </h3>
                </div>

                {result.isBirthdayToday ? (
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#FFF0F5] p-5 text-[#8F3155] dark:bg-[#341A26] dark:text-[#F4A6C1]">
                    <Sparkles className="h-5 w-5 shrink-0 text-[#D94F79]" aria-hidden="true" />
                    <p className="text-sm font-medium">
                      Today is your birthday! Wishing you a radiant year ahead filled with warmth.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 grid grid-cols-4 gap-2.5 sm:gap-4">
                    {[
                      {
                        label: 'Days',
                        value: activeCountdown?.days ?? result.daysUntilNextBirthday,
                      },
                      { label: 'Hours', value: activeCountdown?.hours ?? 0 },
                      { label: 'Minutes', value: activeCountdown?.minutes ?? 0 },
                      { label: 'Seconds', value: activeCountdown?.seconds ?? 0 },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="rounded-xl bg-[#FFF8FB] px-2 py-3.5 text-center dark:bg-[#1A0D13]"
                      >
                        <div className="font-serif text-2xl font-bold tabular-nums text-[#D94F79] sm:text-3xl dark:text-[#F48FB1]">
                          {String(unit.value).padStart(2, '0')}
                        </div>
                        <div className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ResultActions
              shareTitle="BLAZE CALCULATOR — My Age Summary"
              summaryText={formatAgeSummary(result)}
              onReset={handleReset}
            />
          </motion.section>
        ) : (
          <motion.div
            key="age-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-[#F2DCE5] bg-white/70 p-8 text-center dark:border-[#3A1E2B] dark:bg-[#221219]/60"
          >
            <Clock
              className="mx-auto h-7 w-7 text-[#D94F79]/75 dark:text-[#F48FB1]/75"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-medium text-[#542B3C] dark:text-[#F7E8EF]">
              Enter your date of birth above to see your complete age breakdown.
            </p>
            <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
              Includes exact years, months, days, total lived statistics, weekday of birth, and a
              live birthday countdown.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
