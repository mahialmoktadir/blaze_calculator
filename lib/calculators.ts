export type GenderOption = '' | 'Female' | 'Male' | 'Non-binary' | 'Prefer not to say';

export interface DateParts {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
}

export interface AgeResult {
  birthDate: string;
  formattedBirthDate: string;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  remainingDaysAfterWeeks: number;
  totalMonths: number;
  totalHours: number;
  daysUntilNextBirthday: number;
  nextBirthdayDate: string;
  formattedNextBirthday: string;
  dayOfBirth: string;
  isBirthdayToday: boolean;
  isLeapDayBirth: boolean;
}

export interface LoveMatchResult {
  person1Name: string;
  person2Name: string;
  person1Gender?: string;
  person2Gender?: string;
  percentage: number;
  tierTitle: string;
  message: string;
  harmonyNote: string;
}

export interface AgeDifference {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  olderPerson: 'person1' | 'person2' | 'same';
  summary: string;
}

export interface CompatibilityResult {
  person1Name: string;
  person2Name: string;
  person1BirthDate: string;
  person2BirthDate: string;
  overallPercentage: number;
  nameMatchScore: number;
  ageCompatibilityScore: number;
  seasonalBonus: number;
  ageDifference: AgeDifference;
  tierTitle: string;
  description: string;
  personalizedSummary: string;
  formulaNote: string;
}

export interface ValidationErrorResult {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string>;
}

export type CalculationOutcome<T> = { ok: true; data: T } | ValidationErrorResult;

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const ALLOWED_GENDERS = new Set<string>([
  '',
  'Female',
  'Male',
  'Non-binary',
  'Prefer not to say',
]);

export function sanitizeText(input: unknown, maxLength = 80): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
  return 31;
}

export function parseIsoDate(dateStr: string): DateParts | null {
  const trimmed = dateStr.trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) return null;
  const maxDay = daysInMonth(year, month);
  if (day < 1 || day > maxDay) return null;

  return { year, month, day };
}

export function toIsoDate(parts: DateParts): string {
  const y = String(parts.year).padStart(4, '0');
  const m = String(parts.month).padStart(2, '0');
  const d = String(parts.day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatLongDate(parts: DateParts): string {
  return `${MONTHS[parts.month - 1]} ${parts.day}, ${parts.year}`;
}

export function datePartsToUtcMs(parts: DateParts): number {
  return Date.UTC(parts.year, parts.month - 1, parts.day);
}

export function getTodayParts(referenceDate: Date = new Date()): DateParts {
  return {
    year: referenceDate.getFullYear(),
    month: referenceDate.getMonth() + 1,
    day: referenceDate.getDate(),
  };
}

export function compareDateParts(a: DateParts, b: DateParts): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

/**
 * Exact calendar difference (years, months, days) between two valid dates where start <= end.
 */
export function diffCalendarDates(
  start: DateParts,
  end: DateParts
): { years: number; months: number; days: number; totalDays: number } {
  let years = end.year - start.year;
  let months = end.month - start.month;
  let days = end.day - start.day;

  if (days < 0) {
    months -= 1;
    const prevMonth = end.month === 1 ? 12 : end.month - 1;
    const prevMonthYear = end.month === 1 ? end.year - 1 : end.year;
    days += daysInMonth(prevMonthYear, prevMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round(
    (datePartsToUtcMs(end) - datePartsToUtcMs(start)) / 86_400_000
  );

  return { years, months, days, totalDays };
}

export function validateBirthDateInput(
  rawDate: unknown,
  referenceDate: Date = new Date()
): { ok: true; parts: DateParts; iso: string } | { ok: false; error: string } {
  if (typeof rawDate !== 'string' || !rawDate.trim()) {
    return { ok: false, error: 'Please select a valid date of birth.' };
  }

  const parts = parseIsoDate(rawDate);
  if (!parts) {
    return {
      ok: false,
      error: 'Please enter a valid calendar date (YYYY-MM-DD).',
    };
  }

  if (parts.year < 1900) {
    return {
      ok: false,
      error: 'Please choose a birth year from 1900 onward.',
    };
  }

  const today = getTodayParts(referenceDate);
  if (compareDateParts(parts, today) > 0) {
    return {
      ok: false,
      error: 'Date of birth cannot be in the future.',
    };
  }

  return { ok: true, parts, iso: toIsoDate(parts) };
}

export function validateNameInput(
  rawName: unknown,
  label = 'Name'
): { ok: true; value: string } | { ok: false; error: string } {
  const cleaned = sanitizeText(rawName, 60);
  if (!cleaned) {
    return { ok: false, error: `Please enter ${label.toLowerCase()}.` };
  }
  if (cleaned.length < 2) {
    return {
      ok: false,
      error: `${label} must be at least 2 characters long.`,
    };
  }
  if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(cleaned)) {
    return {
      ok: false,
      error: `${label} must include at least one letter.`,
    };
  }
  return { ok: true, value: cleaned };
}

function getBirthdayInYear(birth: DateParts, targetYear: number): DateParts {
  if (birth.month === 2 && birth.day === 29 && !isLeapYear(targetYear)) {
    // Non-leap years celebrate a Feb 29 birthday on Feb 28
    return { year: targetYear, month: 2, day: 28 };
  }
  return { year: targetYear, month: birth.month, day: birth.day };
}

export function calculateAge(
  rawBirthDate: unknown,
  referenceDate: Date = new Date()
): CalculationOutcome<AgeResult> {
  const validated = validateBirthDateInput(rawBirthDate, referenceDate);
  if (!validated.ok) {
    return {
      ok: false,
      error: validated.error,
      fieldErrors: { birthDate: validated.error },
    };
  }

  const birth = validated.parts;
  const today = getTodayParts(referenceDate);
  const diff = diffCalendarDates(birth, today);

  const totalWeeks = Math.floor(diff.totalDays / 7);
  const remainingDaysAfterWeeks = diff.totalDays % 7;
  const totalMonths = diff.years * 12 + diff.months;
  const totalHours = diff.totalDays * 24;

  const isLeapDayBirth = birth.month === 2 && birth.day === 29;
  const thisYearBirthday = getBirthdayInYear(birth, today.year);
  const cmpThisYear = compareDateParts(thisYearBirthday, today);

  const isBirthdayToday = cmpThisYear === 0;
  let nextBirthdayParts: DateParts;
  let daysUntilNextBirthday: number;

  if (isBirthdayToday) {
    nextBirthdayParts = getBirthdayInYear(birth, today.year + 1);
    daysUntilNextBirthday = 0;
  } else if (cmpThisYear > 0) {
    nextBirthdayParts = thisYearBirthday;
    daysUntilNextBirthday = Math.round(
      (datePartsToUtcMs(nextBirthdayParts) - datePartsToUtcMs(today)) / 86_400_000
    );
  } else {
    nextBirthdayParts = getBirthdayInYear(birth, today.year + 1);
    daysUntilNextBirthday = Math.round(
      (datePartsToUtcMs(nextBirthdayParts) - datePartsToUtcMs(today)) / 86_400_000
    );
  }

  const birthWeekdayIndex = new Date(datePartsToUtcMs(birth)).getUTCDay();
  const dayOfBirth = WEEKDAYS[birthWeekdayIndex];

  return {
    ok: true,
    data: {
      birthDate: validated.iso,
      formattedBirthDate: formatLongDate(birth),
      years: diff.years,
      months: diff.months,
      days: diff.days,
      totalDays: diff.totalDays,
      totalWeeks,
      remainingDaysAfterWeeks,
      totalMonths,
      totalHours,
      daysUntilNextBirthday,
      nextBirthdayDate: toIsoDate(nextBirthdayParts),
      formattedNextBirthday: formatLongDate(nextBirthdayParts),
      dayOfBirth,
      isBirthdayToday,
      isLeapDayBirth,
    },
  };
}

function normalizeNameForHash(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Deterministic, symmetric FNV-1a + letter-affinity score in [0, 100].
 * Always returns the same value regardless of (name1, name2) order.
 */
export function computeDeterministicNameScore(name1: string, name2: string): number {
  const n1 = normalizeNameForHash(name1);
  const n2 = normalizeNameForHash(name2);
  const sorted = [n1, n2].sort();
  const combined = `${sorted[0]}|${sorted[1]}`;

  // 32-bit FNV-1a hash
  let hash = 0x811c9dc5;
  for (let i = 0; i < combined.length; i++) {
    hash ^= combined.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }

  // Secondary mix for uniform unsigned 32-bit distribution across 0..100
  let mix = hash >>> 0;
  mix = (mix ^ (mix >>> 16)) >>> 0;
  mix = Math.imul(mix, 0x7feb352d) >>> 0;
  mix = (mix ^ (mix >>> 15)) >>> 0;
  mix = Math.imul(mix, 0x846ca68b) >>> 0;
  mix = (mix ^ (mix >>> 16)) >>> 0;

  // Compute shared unique character overlap ratio (0..1)
  const set1 = new Set(sorted[0].split(''));
  const set2 = new Set(sorted[1].split(''));
  let overlap = 0;
  for (const ch of set1) {
    if (set2.has(ch)) overlap += 1;
  }
  const unionSize = new Set([...set1, ...set2]).size || 1;
  const overlapBonus = Math.round((overlap / unionSize) * 14); // 0..14

  const base = (mix >>> 0) % 87; // strictly 0..86
  return Math.min(100, Math.max(0, base + overlapBonus));
}

export function getLoveMatchTier(percentage: number): {
  tierTitle: string;
  message: string;
  harmonyNote: string;
} {
  if (percentage >= 90) {
    return {
      tierTitle: 'Perfect Match!',
      message:
        'An effortless warmth radiates between these two names — rare harmony, shared rhythm, and unmistakable spark.',
      harmonyNote: 'Strongest letter resonance and balanced cadence.',
    };
  }
  if (percentage >= 75) {
    return {
      tierTitle: 'Beautiful Connection!',
      message:
        'A deeply promising pairing with complementary energy, bright chemistry, and plenty of room to grow together.',
      harmonyNote: 'Warm complementary rhythm with high affinity.',
    };
  }
  if (percentage >= 60) {
    return {
      tierTitle: 'Sweet Possibility!',
      message:
        'There is a gentle, endearing charm here — thoughtful conversations and shared moments can make this bloom.',
      harmonyNote: 'Gentle balance with playful shared undertones.',
    };
  }
  if (percentage >= 40) {
    return {
      tierTitle: 'A Little Mystery!',
      message:
        'Intriguing contrasts keep things interesting. Opposites often spark the most memorable chapters when met with curiosity.',
      harmonyNote: 'Contrasting letter patterns that invite discovery.',
    };
  }
  return {
    tierTitle: 'Every Story Is Different!',
    message:
      'Numbers never write the full story — genuine kindness, humor, and shared effort always outshine any playful score.',
    harmonyNote: 'Distinctive individual rhythms — write your own story.',
  };
}

export function calculateLoveMatch(
  rawName1: unknown,
  rawName2: unknown,
  rawGender1?: unknown,
  rawGender2?: unknown
): CalculationOutcome<LoveMatchResult> {
  const v1 = validateNameInput(rawName1, 'Person 1 name');
  const v2 = validateNameInput(rawName2, 'Person 2 name');

  const fieldErrors: Record<string, string> = {};
  if (!v1.ok) fieldErrors.person1Name = v1.error;
  if (!v2.ok) fieldErrors.person2Name = v2.error;

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: Object.values(fieldErrors)[0],
      fieldErrors,
    };
  }

  const g1 = sanitizeText(rawGender1 ?? '', 30);
  const g2 = sanitizeText(rawGender2 ?? '', 30);
  const safeG1 = ALLOWED_GENDERS.has(g1) ? g1 : '';
  const safeG2 = ALLOWED_GENDERS.has(g2) ? g2 : '';

  const name1 = (v1 as { ok: true; value: string }).value;
  const name2 = (v2 as { ok: true; value: string }).value;
  const percentage = computeDeterministicNameScore(name1, name2);
  const tier = getLoveMatchTier(percentage);

  return {
    ok: true,
    data: {
      person1Name: name1,
      person2Name: name2,
      person1Gender: safeG1 || undefined,
      person2Gender: safeG2 || undefined,
      percentage,
      tierTitle: tier.tierTitle,
      message: tier.message,
      harmonyNote: tier.harmonyNote,
    },
  };
}

export function calculateCompatibility(
  input: {
    person1Name: unknown;
    person1BirthDate: unknown;
    person2Name: unknown;
    person2BirthDate: unknown;
  },
  referenceDate: Date = new Date()
): CalculationOutcome<CompatibilityResult> {
  const n1 = validateNameInput(input.person1Name, 'Person 1 name');
  const n2 = validateNameInput(input.person2Name, 'Person 2 name');
  const d1 = validateBirthDateInput(input.person1BirthDate, referenceDate);
  const d2 = validateBirthDateInput(input.person2BirthDate, referenceDate);

  const fieldErrors: Record<string, string> = {};
  if (!n1.ok) fieldErrors.person1Name = n1.error;
  if (!n2.ok) fieldErrors.person2Name = n2.error;
  if (!d1.ok) fieldErrors.person1BirthDate = d1.error;
  if (!d2.ok) fieldErrors.person2BirthDate = d2.error;

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: Object.values(fieldErrors)[0],
      fieldErrors,
    };
  }

  const person1Name = (n1 as { ok: true; value: string }).value;
  const person2Name = (n2 as { ok: true; value: string }).value;
  const p1Date = (d1 as { ok: true; parts: DateParts; iso: string });
  const p2Date = (d2 as { ok: true; parts: DateParts; iso: string });

  const cmp = compareDateParts(p1Date.parts, p2Date.parts);
  let earlier = p1Date.parts;
  let later = p2Date.parts;
  let olderPerson: 'person1' | 'person2' | 'same' = 'same';

  if (cmp < 0) {
    earlier = p1Date.parts;
    later = p2Date.parts;
    olderPerson = 'person1';
  } else if (cmp > 0) {
    earlier = p2Date.parts;
    later = p1Date.parts;
    olderPerson = 'person2';
  }

  const diff = diffCalendarDates(earlier, later);

  // Transparent deterministic scoring:
  // 1) Name Match Score (0-100): symmetric deterministic name affinity
  const nameMatchScore = computeDeterministicNameScore(person1Name, person2Name);

  // 2) Age Compatibility Score (35-100):
  // Base starts at 100 and decreases smoothly by 2.6 pts per year of age difference (floor 35),
  // plus a deterministic seasonal harmony bonus (0-4 pts) based on circular calendar month distance.
  const exactYearGap = diff.totalDays / 365.2425;
  const baseAgeScore = Math.max(35, Math.round(100 - exactYearGap * 2.6));

  const monthGapRaw = Math.abs(p1Date.parts.month - p2Date.parts.month);
  const circularMonthGap = Math.min(monthGapRaw, 12 - monthGapRaw); // 0..6
  // Symmetric seasonal bonus: same season (0-1) or complementary opposite season (5-6) gets +4, 2 or 4 gets +2, 3 gets +1
  const seasonalBonus =
    circularMonthGap <= 1 || circularMonthGap >= 5
      ? 4
      : circularMonthGap === 2 || circularMonthGap === 4
        ? 2
        : 1;

  const ageCompatibilityScore = Math.min(100, baseAgeScore + seasonalBonus);

  // 3) Overall weighted score: 55% Name Match + 45% Age Compatibility
  const overallPercentage = Math.min(
    100,
    Math.max(0, Math.round(nameMatchScore * 0.55 + ageCompatibilityScore * 0.45))
  );

  const tier = getLoveMatchTier(overallPercentage);

  const gapParts: string[] = [];
  if (diff.years > 0) gapParts.push(`${diff.years} ${diff.years === 1 ? 'year' : 'years'}`);
  if (diff.months > 0) gapParts.push(`${diff.months} ${diff.months === 1 ? 'month' : 'months'}`);
  if (diff.days > 0 || gapParts.length === 0) {
    gapParts.push(`${diff.days} ${diff.days === 1 ? 'day' : 'days'}`);
  }
  const formattedGap = gapParts.join(', ');

  const ageSummary =
    olderPerson === 'same'
      ? `${person1Name} and ${person2Name} share the exact same birthday.`
      : olderPerson === 'person1'
        ? `${person1Name} is older by ${formattedGap}.`
        : `${person2Name} is older by ${formattedGap}.`;

  let description: string;
  if (overallPercentage >= 85) {
    description =
      'Both your name affinity and life-stage closeness align gracefully, creating an uplifting and natural sense of ease.';
  } else if (overallPercentage >= 70) {
    description =
      'A warm, well-balanced pairing where shared perspective and complementary rhythms reinforce each other naturally.';
  } else if (overallPercentage >= 55) {
    description =
      'A thoughtful blend of shared ground and fresh perspective — great conversations and mutual curiosity keep this connection bright.';
  } else {
    description =
      'A distinctive combination of individual paths and unique rhythms. Remember that real connections are shaped by care, trust, and time.';
  }

  const personalizedSummary = `${person1Name} & ${person2Name} achieved an overall score of ${overallPercentage}%, combining a ${nameMatchScore}% Name Match score with a ${ageCompatibilityScore}% Age Compatibility score. ${ageSummary}`;

  const formulaNote =
    'Transparent formula: Overall = round(55% × Name Match + 45% × Age Compatibility), where Age Compatibility starts at 100 and adjusts by 2.6 points per year of age difference (minimum 35) plus up to 4 points of calendar-season alignment.';

  return {
    ok: true,
    data: {
      person1Name,
      person2Name,
      person1BirthDate: p1Date.iso,
      person2BirthDate: p2Date.iso,
      overallPercentage,
      nameMatchScore,
      ageCompatibilityScore,
      seasonalBonus,
      ageDifference: {
        years: diff.years,
        months: diff.months,
        days: diff.days,
        totalDays: diff.totalDays,
        olderPerson,
        summary: ageSummary,
      },
      tierTitle: tier.tierTitle,
      description,
      personalizedSummary,
      formulaNote,
    },
  };
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContactSubmission(raw: {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}): CalculationOutcome<ContactSubmission> {
  const name = sanitizeText(raw.name, 80);
  const email = sanitizeText(raw.email, 120).toLowerCase();
  const subject = sanitizeText(raw.subject, 120);
  const message = sanitizeText(raw.message, 1500);

  const fieldErrors: Record<string, string> = {};

  if (!name || name.length < 2) {
    fieldErrors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }
  if (!subject || subject.length < 3) {
    fieldErrors.subject = 'Please provide a brief subject (at least 3 characters).';
  }
  if (!message || message.length < 10) {
    fieldErrors.message = 'Please write a message of at least 10 characters.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: Object.values(fieldErrors)[0],
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: { name, email, subject, message },
  };
}

export function formatAgeSummary(result: AgeResult): string {
  return [
    'BLAZE CALCULATOR — Age Summary',
    `Date of Birth: ${result.formattedBirthDate} (${result.dayOfBirth})`,
    `Exact Age: ${result.years} years, ${result.months} months, ${result.days} days`,
    `Total Lived: ${result.totalMonths.toLocaleString()} months | ${result.totalWeeks.toLocaleString()} weeks | ${result.totalDays.toLocaleString()} days | ${result.totalHours.toLocaleString()} hours`,
    result.isBirthdayToday
      ? 'Next Birthday: Today! Happy Birthday!'
      : `Next Birthday: ${result.formattedNextBirthday} (${result.daysUntilNextBirthday} days remaining)`,
  ].join('\n');
}

export function formatLoveMatchSummary(result: LoveMatchResult): string {
  return [
    'BLAZE CALCULATOR — Love Match Result',
    `${result.person1Name} + ${result.person2Name}: ${result.percentage}% — ${result.tierTitle}`,
    result.message,
    '(For entertainment purposes only)',
  ].join('\n');
}

export function formatCompatibilitySummary(result: CompatibilityResult): string {
  return [
    'BLAZE CALCULATOR — Compatibility Result',
    `${result.person1Name} & ${result.person2Name}`,
    `Overall Compatibility: ${result.overallPercentage}% (${result.tierTitle})`,
    `Name Match Score: ${result.nameMatchScore}% | Age Compatibility: ${result.ageCompatibilityScore}%`,
    `Age Difference: ${result.ageDifference.summary}`,
    '(Deterministic score for fun & reflection — not scientifically validated)',
  ].join('\n');
}
