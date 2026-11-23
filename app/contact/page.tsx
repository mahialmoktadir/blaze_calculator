import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import ContactFormClient from '@/components/ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Blaze regarding BLAZE CALCULATOR feedback, suggestions, or questions.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">Get in Touch</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#542B3C] dark:text-[#F7E8EF]">
            Contact Blaze
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
            Have an idea for a new Rose Edition calculator, spotted a calendar edge case, or just
            want to share feedback? Send a note using the form.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3.5 rounded-2xl border border-[#F2DCE5] bg-white p-4 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                  Direct Support
                </p>
                <p className="mt-0.5 text-xs text-[#987887] dark:text-[#C5A4B4]">
                  hello@blazecalculator.example
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-[#F2DCE5] bg-white p-4 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
                <Clock className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                  Typical Response
                </p>
                <p className="mt-0.5 text-xs text-[#987887] dark:text-[#C5A4B4]">
                  Within 1–2 business days for inquiries and bug reports.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-[#F2DCE5] bg-white p-4 dark:border-[#3A1E2B] dark:bg-[#221219]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
                  Privacy Respected
                </p>
                <p className="mt-0.5 text-xs text-[#987887] dark:text-[#C5A4B4]">
                  Read our{' '}
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-[#D94F79] hover:underline dark:text-[#F48FB1]"
                  >
                    Privacy Policy
                  </Link>{' '}
                  for full details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}
