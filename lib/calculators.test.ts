import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAge,
  calculateLoveMatch,
  calculateCompatibility,
  validateContactSubmission,
  getLoveMatchTier,
  isLeapYear,
} from './calculators';

test('leap year helper handles century and 400-year rules', () => {
  assert.equal(isLeapYear(2000), true);
  assert.equal(isLeapYear(2024), true);
  assert.equal(isLeapYear(1900), false);
  assert.equal(isLeapYear(2023), false);
});

test('age calculator handles leap day birth on non-leap reference year', () => {
  const ref = new Date(2026, 10, 23); // Nov 23, 2026
  const outcome = calculateAge('2000-02-29', ref);
  assert.equal(outcome.ok, true);
  if (outcome.ok) {
    assert.equal(outcome.data.years, 26);
    assert.equal(outcome.data.months, 8);
    assert.equal(outcome.data.days, 25);
    assert.equal(outcome.data.dayOfBirth, 'Tuesday');
    assert.equal(outcome.data.isLeapDayBirth, true);
    assert.equal(outcome.data.nextBirthdayDate, '2027-02-28');
    assert.equal(outcome.data.daysUntilNextBirthday, 97);
    assert.equal(outcome.data.totalHours, outcome.data.totalDays * 24);
  }
});

test('age calculator handles exact birthday today', () => {
  const ref = new Date(2026, 4, 15); // May 15, 2026
  const outcome = calculateAge('1996-05-15', ref);
  assert.equal(outcome.ok, true);
  if (outcome.ok) {
    assert.equal(outcome.data.years, 30);
    assert.equal(outcome.data.months, 0);
    assert.equal(outcome.data.days, 0);
    assert.equal(outcome.data.isBirthdayToday, true);
    assert.equal(outcome.data.daysUntilNextBirthday, 0);
  }
});

test('age calculator rejects future dates and impossible calendar dates', () => {
  const ref = new Date(2026, 10, 23);
  const future = calculateAge('2027-01-01', ref);
  assert.equal(future.ok, false);

  const invalidLeap = calculateAge('2023-02-29', ref);
  assert.equal(invalidLeap.ok, false);

  const empty = calculateAge('', ref);
  assert.equal(empty.ok, false);
});

test('love match calculator is strictly deterministic and order-independent', () => {
  const a = calculateLoveMatch('Clara', 'Julian', 'Female', 'Male');
  const b = calculateLoveMatch('Julian', 'Clara', 'Male', 'Female');
  const c = calculateLoveMatch('  clara ', 'JULIAN');

  assert.equal(a.ok, true);
  assert.equal(b.ok, true);
  assert.equal(c.ok, true);

  if (a.ok && b.ok && c.ok) {
    assert.equal(a.data.percentage, b.data.percentage);
    assert.equal(a.data.percentage, c.data.percentage);
    assert.equal(a.data.tierTitle, b.data.tierTitle);
    assert.ok(a.data.percentage > 0 && a.data.percentage <= 100);
  }

  const pairs: [string, string][] = [
    ['Clara', 'Julian'],
    ['Elena', 'Marcus'],
    ['Sophia', 'Liam'],
    ['Maya', 'Noah'],
    ['Aria', 'Lucas'],
    ['Nora', 'Ethan'],
    ['Chloe', 'Oliver'],
    ['Hannah', 'Leo'],
    ['Zoe', 'Daniel'],
    ['Grace', 'Henry'],
  ];
  const scores = pairs.map(([p1, p2]) => {
    const res = calculateLoveMatch(p1, p2);
    assert.equal(res.ok, true);
    return res.ok ? res.data.percentage : -1;
  });
  const uniqueScores = new Set(scores);
  assert.ok(uniqueScores.size >= 6, `Expected well-distributed scores, got ${scores.join(', ')}`);
  assert.ok(
    scores.filter((s) => s === 0).length <= 1,
    `Expected no zero clustering, got ${scores.join(', ')}`
  );
});

test('love match tier messages match exact score boundaries', () => {
  assert.equal(getLoveMatchTier(100).tierTitle, 'Perfect Match!');
  assert.equal(getLoveMatchTier(90).tierTitle, 'Perfect Match!');
  assert.equal(getLoveMatchTier(89).tierTitle, 'Beautiful Connection!');
  assert.equal(getLoveMatchTier(75).tierTitle, 'Beautiful Connection!');
  assert.equal(getLoveMatchTier(74).tierTitle, 'Sweet Possibility!');
  assert.equal(getLoveMatchTier(60).tierTitle, 'Sweet Possibility!');
  assert.equal(getLoveMatchTier(59).tierTitle, 'A Little Mystery!');
  assert.equal(getLoveMatchTier(40).tierTitle, 'A Little Mystery!');
  assert.equal(getLoveMatchTier(39).tierTitle, 'Every Story Is Different!');
  assert.equal(getLoveMatchTier(0).tierTitle, 'Every Story Is Different!');
});

test('compatibility calculator is symmetric, transparent, and computes accurate age gap', () => {
  const ref = new Date(2026, 10, 23);
  const first = calculateCompatibility(
    {
      person1Name: 'Clara',
      person1BirthDate: '1996-05-14',
      person2Name: 'Julian',
      person2BirthDate: '1994-11-02',
    },
    ref
  );
  const swapped = calculateCompatibility(
    {
      person1Name: 'Julian',
      person1BirthDate: '1994-11-02',
      person2Name: 'Clara',
      person2BirthDate: '1996-05-14',
    },
    ref
  );

  assert.equal(first.ok, true);
  assert.equal(swapped.ok, true);

  if (first.ok && swapped.ok) {
    assert.equal(first.data.overallPercentage, swapped.data.overallPercentage);
    assert.equal(first.data.nameMatchScore, swapped.data.nameMatchScore);
    assert.equal(first.data.ageCompatibilityScore, swapped.data.ageCompatibilityScore);
    assert.equal(first.data.ageDifference.years, 1);
    assert.equal(first.data.ageDifference.months, 6);
    assert.equal(first.data.ageDifference.days, 12);
    assert.equal(first.data.ageDifference.olderPerson, 'person2');
    assert.equal(swapped.data.ageDifference.olderPerson, 'person1');
    const expectedOverall = Math.round(
      first.data.nameMatchScore * 0.55 + first.data.ageCompatibilityScore * 0.45
    );
    assert.equal(first.data.overallPercentage, expectedOverall);
  }
});

test('contact submission validation rejects invalid inputs and sanitizes HTML brackets', () => {
  const bad = validateContactSubmission({
    name: 'A',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Short',
  });
  assert.equal(bad.ok, false);
  if (!bad.ok) {
    assert.ok(bad.fieldErrors?.name);
    assert.ok(bad.fieldErrors?.email);
    assert.ok(bad.fieldErrors?.subject);
    assert.ok(bad.fieldErrors?.message);
  }

  const good = validateContactSubmission({
    name: '<b>Maya</b>',
    email: 'Maya@Example.com',
    subject: 'Feedback on Blaze',
    message: 'Really love the clean rose design and accurate leap year calculations.',
  });
  assert.equal(good.ok, true);
  if (good.ok) {
    assert.equal(good.data.name, 'bMaya/b');
    assert.equal(good.data.email, 'maya@example.com');
  }
});
