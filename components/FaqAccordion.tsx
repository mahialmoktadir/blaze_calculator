'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How accurate is the Age Calculator for leap years and varying month lengths?',
    answer:
      'Every calculation accounts for exact calendar month lengths (28, 29, 30, and 31 days) as well as full Gregorian leap-year rules (divisible by 4, excluding non-400 centuries). If you were born on February 29, your exact days lived, next celebration date, and countdown remain completely accurate.',
  },
  {
    question: 'Why does the Love Match Calculator always return the same score for two names?',
    answer:
      'Instead of generating a random number that changes on every refresh, Blaze Calculator uses a deterministic, order-independent algorithm. Entering "Clara" and "Julian" produces the exact same percentage as "Julian" and "Clara" — every single time. It is designed purely for fun and entertainment.',
  },
  {
    question: 'How is the Compatibility Calculator score computed?',
    answer:
      'The Compatibility Calculator transparently combines two clear signals: 55% from your deterministic Name Match score and 45% from your Age Compatibility score, which considers exact calendar age difference and seasonal alignment. It is intended for playful reflection, not scientific relationship analysis.',
  },
  {
    question: 'Do you store my birth date, names, or results in a database?',
    answer:
      'No. Blaze Calculator operates without a database or user tracking profiles. Your inputs are validated strictly to compute your results and are never saved, sold, or shared with third parties.',
  },
  {
    question: 'Can I copy, share, or print my calculator results?',
    answer:
      'Yes. Every calculator includes dedicated Copy Results, Share Results (using the native Web Share API where supported), and Print buttons formatted with clean print stylesheets.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#F2DCE5] rounded-2xl border border-[#F2DCE5] bg-white dark:divide-[#3A1E2B] dark:border-[#3A1E2B] dark:bg-[#221219]">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#FFF8FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D94F79] dark:hover:bg-[#2A1620]"
            >
              <span className="font-sans text-base font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-[#D94F79] transition-transform duration-200 dark:text-[#F48FB1] ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-6 pb-5 pr-12 text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
