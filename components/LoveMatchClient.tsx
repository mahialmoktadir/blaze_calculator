'use client';

import React, { useState, useRef } from 'react';
import { Heart, AlertCircle, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  type LoveMatchResult,
  type GenderOption,
  formatLoveMatchSummary,
  validateNameInput,
} from '@/lib/calculators';
import AnimatedCounter from './AnimatedCounter';
import ResultActions from './ResultActions';

const GENDER_OPTIONS: { value: GenderOption; label: string }[] = [
  { value: '', label: 'Optional (Skip)' },
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

export default function LoveMatchClient() {
  const [person1Name, setPerson1Name] = useState('');
  const [person1Gender, setPerson1Gender] = useState<GenderOption>('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2Gender, setPerson2Gender] = useState<GenderOption>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoveMatchResult | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = validateNameInput(person1Name, 'Person 1 name');
    const v2 = validateNameInput(person2Name, 'Person 2 name');
    const nextErrors: Record<string, string> = {};
    if (!v1.ok) nextErrors.person1Name = v1.error;
    if (!v2.ok) nextErrors.person2Name = v2.error;

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setFormError(Object.values(nextErrors)[0]);
      setResult(null);
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/love-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person1Name,
          person2Name,
          person1Gender,
          person2Gender,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFieldErrors(json.fieldErrors || {});
        setFormError(json.error || 'Please check both names and try again.');
        setResult(null);
      } else {
        setResult(json.data as LoveMatchResult);
        window.setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    } catch {
      setFormError('A network error occurred. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPerson1Name('');
    setPerson1Gender('');
    setPerson2Name('');
    setPerson2Gender('');
    setFieldErrors({});
    setFormError(null);
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="no-print rounded-2xl border border-[#F2DCE5] bg-white p-6 shadow-sm shadow-[#D94F79]/5 sm:p-8 dark:border-[#3A1E2B] dark:bg-[#221219] dark:shadow-none"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Person 1 */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
              Person 1
            </legend>
            <div>
              <label
                htmlFor="love-p1-name"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Full or First Name
              </label>
              <input
                id="love-p1-name"
                name="person1Name"
                type="text"
                maxLength={60}
                placeholder="e.g., Clara"
                value={person1Name}
                onChange={(e) => {
                  setPerson1Name(e.target.value);
                  if (fieldErrors.person1Name) {
                    setFieldErrors((prev) => ({ ...prev, person1Name: '' }));
                  }
                }}
                aria-invalid={fieldErrors.person1Name ? 'true' : 'false'}
                required
                className={`mt-1.5 block w-full min-h-[46px] rounded-xl border bg-[#FFF8FB] px-4 py-2.5 text-base text-[#542B3C] placeholder:text-[#987887]/70 focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:placeholder:text-[#9C7D8D] ${
                  fieldErrors.person1Name
                    ? 'border-rose-500'
                    : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
                }`}
              />
              {fieldErrors.person1Name && (
                <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
                  {fieldErrors.person1Name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="love-p1-gender"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Gender <span className="font-normal text-[#987887]">(Optional)</span>
              </label>
              <select
                id="love-p1-gender"
                name="person1Gender"
                value={person1Gender}
                onChange={(e) => setPerson1Gender(e.target.value as GenderOption)}
                className="mt-1.5 block w-full min-h-[46px] rounded-xl border border-[#F2DCE5] bg-[#FFF8FB] px-4 py-2.5 text-sm text-[#542B3C] focus:border-[#D94F79] focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:border-[#462635] dark:bg-[#1A0D13] dark:text-[#F7E8EF]"
              >
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value || 'skip'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          {/* Person 2 */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
              Person 2
            </legend>
            <div>
              <label
                htmlFor="love-p2-name"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Full or First Name
              </label>
              <input
                id="love-p2-name"
                name="person2Name"
                type="text"
                maxLength={60}
                placeholder="e.g., Julian"
                value={person2Name}
                onChange={(e) => {
                  setPerson2Name(e.target.value);
                  if (fieldErrors.person2Name) {
                    setFieldErrors((prev) => ({ ...prev, person2Name: '' }));
                  }
                }}
                aria-invalid={fieldErrors.person2Name ? 'true' : 'false'}
                required
                className={`mt-1.5 block w-full min-h-[46px] rounded-xl border bg-[#FFF8FB] px-4 py-2.5 text-base text-[#542B3C] placeholder:text-[#987887]/70 focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:placeholder:text-[#9C7D8D] ${
                  fieldErrors.person2Name
                    ? 'border-rose-500'
                    : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
                }`}
              />
              {fieldErrors.person2Name && (
                <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
                  {fieldErrors.person2Name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="love-p2-gender"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Gender <span className="font-normal text-[#987887]">(Optional)</span>
              </label>
              <select
                id="love-p2-gender"
                name="person2Gender"
                value={person2Gender}
                onChange={(e) => setPerson2Gender(e.target.value as GenderOption)}
                className="mt-1.5 block w-full min-h-[46px] rounded-xl border border-[#F2DCE5] bg-[#FFF8FB] px-4 py-2.5 text-sm text-[#542B3C] focus:border-[#D94F79] focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:border-[#462635] dark:bg-[#1A0D13] dark:text-[#F7E8EF]"
              >
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value || 'skip'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>

        {formError && (
          <div
            role="alert"
            className="mt-5 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-200"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[#F2DCE5] pt-6 sm:flex-row sm:items-center dark:border-[#3A1E2B]">
          <p className="text-xs text-[#987887] dark:text-[#C5A4B4]">
            Consistent &amp; order-independent: swapping Person 1 and Person 2 yields the same
            match score.
          </p>
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
                <Heart className="h-4 w-4" aria-hidden="true" />
                Calculate Love Match
              </>
            )}
          </button>
        </div>
      </form>

      {/* Result Card */}
      <div ref={resultsRef}>
        <AnimatePresence mode="wait">
        {result ? (
          <motion.section
            key={`${result.person1Name}-${result.person2Name}-${result.percentage}`}
            aria-label="Love Match Result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="print-card rounded-2xl border border-[#F2DCE5] bg-gradient-to-b from-[#FFF0F5] via-white to-[#FFF8FB] p-6 text-center shadow-sm shadow-[#D94F79]/10 sm:p-10 dark:border-[#3D212E] dark:from-[#2C1621] dark:via-[#221219] dark:to-[#1A0D13]">
              {/* Pair Header */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-lg font-medium text-[#542B3C] sm:text-xl dark:text-[#F7E8EF]">
                <span>
                  {result.person1Name}
                  {result.person1Gender ? (
                    <span className="ml-1.5 text-xs font-normal text-[#987887] dark:text-[#C5A4B4]">
                      ({result.person1Gender})
                    </span>
                  ) : null}
                </span>
                <Heart
                  className="h-5 w-5 fill-[#D94F79] text-[#D94F79] dark:fill-[#F48FB1] dark:text-[#F48FB1]"
                  aria-hidden="true"
                />
                <span>
                  {result.person2Name}
                  {result.person2Gender ? (
                    <span className="ml-1.5 text-xs font-normal text-[#987887] dark:text-[#C5A4B4]">
                      ({result.person2Gender})
                    </span>
                  ) : null}
                </span>
              </div>

              {/* Pulsing Heart + Animated Percentage */}
              <div className="mx-auto mt-7 flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 border-[#F8DCE7] bg-white shadow-inner dark:border-[#4A2536] dark:bg-[#1A0D13]">
                <Heart
                  className="animate-heart-pulse h-8 w-8 fill-[#D94F79] text-[#D94F79] dark:fill-[#F48FB1] dark:text-[#F48FB1]"
                  aria-hidden="true"
                />
                <div className="mt-1 font-serif text-4xl font-bold text-[#8F3155] sm:text-5xl dark:text-[#F7E8EF]">
                  <AnimatedCounter value={result.percentage} suffix="%" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mx-auto mt-7 max-w-md">
                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-[#F8DCE7] dark:bg-[#3A1E2B]"
                  role="progressbar"
                  aria-valuenow={result.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Love match percentage"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: result.percentage / 100 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full rounded-full bg-gradient-to-r from-[#D94F79] to-[#8F3155] dark:from-[#F48FB1] dark:to-[#D94F79]"
                  />
                </div>
              </div>

              {/* Tier Heading & Message */}
              <h2 className="mt-6 font-serif text-3xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                {result.tierTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#542B3C]/85 sm:text-base dark:text-[#E7CEDB]">
                {result.message}
              </p>
              <p className="mt-2 text-xs text-[#987887] dark:text-[#C5A4B4]">
                {result.harmonyNote}
              </p>

              {/* Entertainment Notice */}
              <div className="mx-auto mt-7 flex max-w-lg items-center justify-center gap-2 rounded-xl border border-[#F2DCE5] bg-[#FFF8FB] px-4 py-3 text-xs text-[#8F3155] dark:border-[#3A1E2B] dark:bg-[#1A0D13] dark:text-[#D5B2C3]">
                <Info className="h-4 w-4 shrink-0 text-[#D94F79]" aria-hidden="true" />
                <span>
                  For entertainment purposes only. Scores are deterministic and identical regardless
                  of name order.
                </span>
              </div>
            </div>

            <ResultActions
              shareTitle="BLAZE CALCULATOR — Love Match Result"
              summaryText={formatLoveMatchSummary(result)}
              onReset={handleReset}
            />
          </motion.section>
        ) : (
          <motion.div
            key="love-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-[#F2DCE5] bg-white/70 p-8 text-center dark:border-[#3A1E2B] dark:bg-[#221219]/60"
          >
            <Heart
              className="mx-auto h-7 w-7 text-[#D94F79]/75 dark:text-[#F48FB1]/75"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-medium text-[#542B3C] dark:text-[#F7E8EF]">
              Enter two names above to reveal your consistent Love Match percentage.
            </p>
            <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
              For entertainment purposes only — never randomized on refresh.
            </p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
