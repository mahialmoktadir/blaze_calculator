'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  HeartHandshake,
  Heart,
  Calendar,
  AlertCircle,
  Loader2,
  Info,
  Scale,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  type CompatibilityResult,
  formatCompatibilitySummary,
  validateBirthDateInput,
  validateNameInput,
} from '@/lib/calculators';
import AnimatedCounter from './AnimatedCounter';
import ResultActions from './ResultActions';

export default function CompatibilityClient() {
  const [person1Name, setPerson1Name] = useState('');
  const [person1BirthDate, setPerson1BirthDate] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2BirthDate, setPerson2BirthDate] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const todayIso = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')}`;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n1 = validateNameInput(person1Name, 'Person 1 name');
    const n2 = validateNameInput(person2Name, 'Person 2 name');
    const d1 = validateBirthDateInput(person1BirthDate);
    const d2 = validateBirthDateInput(person2BirthDate);

    const nextErrors: Record<string, string> = {};
    if (!n1.ok) nextErrors.person1Name = n1.error;
    if (!n2.ok) nextErrors.person2Name = n2.error;
    if (!d1.ok) nextErrors.person1BirthDate = d1.error;
    if (!d2.ok) nextErrors.person2BirthDate = d2.error;

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
      const res = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person1Name,
          person1BirthDate,
          person2Name,
          person2BirthDate,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFieldErrors(json.fieldErrors || {});
        setFormError(json.error || 'Please check both profiles and try again.');
        setResult(null);
      } else {
        setResult(json.data as CompatibilityResult);
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
    setPerson1BirthDate('');
    setPerson2Name('');
    setPerson2BirthDate('');
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Person 1 */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
              Person 1
            </legend>
            <div>
              <label
                htmlFor="compat-p1-name"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Name
              </label>
              <input
                id="compat-p1-name"
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
                htmlFor="compat-p1-dob"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Date of Birth
              </label>
              <input
                id="compat-p1-dob"
                name="person1BirthDate"
                type="date"
                min="1900-01-01"
                max={todayIso}
                value={person1BirthDate}
                onChange={(e) => {
                  const val = e.target.value;
                  setPerson1BirthDate(val);
                  if (!val) {
                    setFieldErrors((prev) => ({ ...prev, person1BirthDate: '' }));
                  } else {
                    const check = validateBirthDateInput(val);
                    setFieldErrors((prev) => ({
                      ...prev,
                      person1BirthDate: check.ok ? '' : check.error,
                    }));
                  }
                }}
                aria-invalid={fieldErrors.person1BirthDate ? 'true' : 'false'}
                required
                className={`mt-1.5 block w-full min-h-[46px] rounded-xl border bg-[#FFF8FB] px-4 py-2.5 text-base text-[#542B3C] focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] ${
                  fieldErrors.person1BirthDate
                    ? 'border-rose-500'
                    : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
                }`}
              />
              {fieldErrors.person1BirthDate && (
                <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
                  {fieldErrors.person1BirthDate}
                </p>
              )}
            </div>
          </fieldset>

          {/* Person 2 */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
              Person 2
            </legend>
            <div>
              <label
                htmlFor="compat-p2-name"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Name
              </label>
              <input
                id="compat-p2-name"
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
                htmlFor="compat-p2-dob"
                className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
              >
                Date of Birth
              </label>
              <input
                id="compat-p2-dob"
                name="person2BirthDate"
                type="date"
                min="1900-01-01"
                max={todayIso}
                value={person2BirthDate}
                onChange={(e) => {
                  const val = e.target.value;
                  setPerson2BirthDate(val);
                  if (!val) {
                    setFieldErrors((prev) => ({ ...prev, person2BirthDate: '' }));
                  } else {
                    const check = validateBirthDateInput(val);
                    setFieldErrors((prev) => ({
                      ...prev,
                      person2BirthDate: check.ok ? '' : check.error,
                    }));
                  }
                }}
                aria-invalid={fieldErrors.person2BirthDate ? 'true' : 'false'}
                required
                className={`mt-1.5 block w-full min-h-[46px] rounded-xl border bg-[#FFF8FB] px-4 py-2.5 text-base text-[#542B3C] focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] ${
                  fieldErrors.person2BirthDate
                    ? 'border-rose-500'
                    : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
                }`}
              />
              {fieldErrors.person2BirthDate && (
                <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
                  {fieldErrors.person2BirthDate}
                </p>
              )}
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
            Combines Name Match (55%) and Calendar Age Compatibility (45%) deterministically.
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
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                Check Compatibility
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Area */}
      <div ref={resultsRef}>
        <AnimatePresence mode="wait">
        {result ? (
          <motion.section
            key={`${result.person1Name}-${result.person2Name}-${result.overallPercentage}`}
            aria-label="Compatibility Results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Overall Compatibility Hero Card */}
            <div className="print-card rounded-2xl border border-[#F2DCE5] bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF8FB] p-6 shadow-sm shadow-[#D94F79]/10 sm:p-9 dark:border-[#3D212E] dark:from-[#2C1621] dark:via-[#221219] dark:to-[#1A0D13]">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                <div className="flex flex-col items-center text-center md:col-span-4">
                  <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 border-[#F8DCE7] bg-white shadow-inner dark:border-[#4A2536] dark:bg-[#1A0D13]">
                    <Heart
                      className="animate-heart-pulse h-7 w-7 fill-[#D94F79] text-[#D94F79] dark:fill-[#F48FB1] dark:text-[#F48FB1]"
                      aria-hidden="true"
                    />
                    <div className="mt-1 font-serif text-4xl font-bold text-[#8F3155] sm:text-5xl dark:text-[#F7E8EF]">
                      <AnimatedCounter value={result.overallPercentage} suffix="%" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-medium text-[#8F3155] dark:text-[#F4A6C1]">
                    Overall Compatibility
                  </p>
                </div>

                <div className="md:col-span-8">
                  <p className="text-sm font-medium text-[#8F3155] dark:text-[#F4A6C1]">
                    {result.person1Name} &amp; {result.person2Name}
                  </p>
                  <h2 className="mt-1 font-serif text-3xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                    {result.tierTitle}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#542B3C]/85 dark:text-[#E7CEDB]">
                    {result.description}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
                    {result.personalizedSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Name Match Score */}
              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-6 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#987887] dark:text-[#C5A4B4]">
                    Name Match Score
                  </span>
                  <Heart className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
                </div>
                <div className="mt-3 font-serif text-3xl font-bold text-[#542B3C] dark:text-[#F7E8EF]">
                  <AnimatedCounter value={result.nameMatchScore} suffix="%" />
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F8DCE7] dark:bg-[#3A1E2B]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: result.nameMatchScore / 100 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full rounded-full bg-[#D94F79] dark:bg-[#F48FB1]"
                  />
                </div>
                <p className="mt-2.5 text-xs text-[#987887] dark:text-[#B996A7]">
                  55% weight in overall score
                </p>
              </div>

              {/* Age Compatibility Score */}
              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-6 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#987887] dark:text-[#C5A4B4]">
                    Age Compatibility Score
                  </span>
                  <Scale className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
                </div>
                <div className="mt-3 font-serif text-3xl font-bold text-[#542B3C] dark:text-[#F7E8EF]">
                  <AnimatedCounter value={result.ageCompatibilityScore} suffix="%" />
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F8DCE7] dark:bg-[#3A1E2B]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: result.ageCompatibilityScore / 100 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full rounded-full bg-[#8F3155] dark:bg-[#D94F79]"
                  />
                </div>
                <p className="mt-2.5 text-xs text-[#987887] dark:text-[#B996A7]">
                  45% weight · includes +{result.seasonalBonus} seasonal harmony
                </p>
              </div>

              {/* Age Difference */}
              <div className="print-card rounded-2xl border border-[#F2DCE5] bg-white p-6 dark:border-[#3A1E2B] dark:bg-[#221219]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#987887] dark:text-[#C5A4B4]">
                    Age Difference
                  </span>
                  <Calendar
                    className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 font-serif text-2xl font-bold tabular-nums text-[#542B3C] dark:text-[#F7E8EF]">
                  {result.ageDifference.years}y · {result.ageDifference.months}m ·{' '}
                  {result.ageDifference.days}d
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#542B3C]/85 dark:text-[#E7CEDB]">
                  {result.ageDifference.summary}
                </p>
                <p className="mt-1.5 text-xs tabular-nums text-[#987887] dark:text-[#B996A7]">
                  {result.ageDifference.totalDays.toLocaleString()} total days apart
                </p>
              </div>
            </div>

            {/* Transparent Formula & Disclaimer */}
            <div className="print-card rounded-2xl border border-[#F2DCE5] bg-[#FFF8FB] p-5 text-xs leading-relaxed text-[#8F3155] dark:border-[#3A1E2B] dark:bg-[#1D0F16] dark:text-[#D5B2C3]">
              <div className="flex items-start gap-2.5">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#D94F79] dark:text-[#F48FB1]"
                  aria-hidden="true"
                />
                <div className="space-y-1.5">
                  <p className="font-medium text-[#542B3C] dark:text-[#F7E8EF]">
                    Transparent Scoring &amp; Entertainment Notice
                  </p>
                  <p>{result.formulaNote}</p>
                  <p>
                    This calculator is designed for playful reflection and entertainment — it is not
                    a scientifically validated measure of relationship compatibility.
                  </p>
                </div>
              </div>
            </div>

            <ResultActions
              shareTitle="BLAZE CALCULATOR — Compatibility Result"
              summaryText={formatCompatibilitySummary(result)}
              onReset={handleReset}
            />
          </motion.section>
        ) : (
          <motion.div
            key="compat-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-[#F2DCE5] bg-white/70 p-8 text-center dark:border-[#3A1E2B] dark:bg-[#221219]/60"
          >
            <HeartHandshake
              className="mx-auto h-7 w-7 text-[#D94F79]/75 dark:text-[#F48FB1]/75"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-medium text-[#542B3C] dark:text-[#F7E8EF]">
              Enter both names and birth dates above to view a full compatibility breakdown.
            </p>
            <p className="mt-1 text-xs text-[#987887] dark:text-[#C5A4B4]">
              Displays Overall Compatibility, Name Match Score, Age Compatibility Score, and exact
              Age Difference.
            </p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
