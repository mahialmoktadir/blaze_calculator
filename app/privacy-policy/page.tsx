import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read Blaze Calculator’s privacy-first commitment: stateless calculations, no database storage of personal birth dates or names, and zero ad tracking.',
};

const POLICY_SECTIONS = [
  {
    title: '1. Zero Personal Data Storage',
    body: 'Blaze Calculator is architected to run without a user database. Dates of birth, names, and optional gender selections entered into our Age Calculator, Love Match Calculator, or Compatibility Calculator are processed strictly to compute your immediate result and are never stored, logged into profiles, or sold.',
  },
  {
    title: '2. Stateless Server Validation',
    body: 'When you submit a calculation or contact form, inputs are validated on the server to guard against malformed dates or unsafe characters. Once the response is returned to your browser, calculation inputs are discarded from memory.',
  },
  {
    title: '3. Local Theme Preference Only',
    body: 'To remember whether you prefer Light Rose or Dark Rose mode between visits, Blaze Calculator saves a single non-identifying preference ("light" or "dark") in your browser’s localStorage. No advertising cookies or cross-site tracking scripts are used.',
  },
  {
    title: '4. Clipboard & Web Share Actions',
    body: 'Clicking "Copy Results" or "Share Results" only acts on your explicit click, placing the formatted summary into your device clipboard or native share dialog. Blaze Calculator never accesses your clipboard or contacts in the background.',
  },
  {
    title: '5. Contact Inquiries',
    body: 'Information submitted through the Contact page is validated safely so we can respond to feedback or feature requests. Please avoid sending sensitive personal, financial, or health records through the contact form.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-sm font-medium text-[#D94F79] dark:text-[#F48FB1]">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span>Effective 2026</span>
          <span aria-hidden="true">·</span>
          <span>Privacy-Friendly by Design</span>
        </div>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#542B3C] sm:text-5xl dark:text-[#F7E8EF]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
          Your milestones and personal details belong to you. Here is how Blaze Calculator keeps
          every session lightweight, transparent, and private.
        </p>
      </div>

      <div className="mt-10 divide-y divide-[#F2DCE5] rounded-2xl border border-[#F2DCE5] bg-white px-6 py-2 sm:px-8 dark:divide-[#3A1E2B] dark:border-[#3A1E2B] dark:bg-[#221219]">
        {POLICY_SECTIONS.map((section) => (
          <section key={section.title} className="py-6">
            <h2 className="font-serif text-xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
              {section.title}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#987887] sm:text-base dark:text-[#C5A4B4]">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-[#987887] dark:text-[#C5A4B4]">
        Have a question about privacy on Blaze Calculator? Reach out via our{' '}
        <Link
          href="/contact"
          className="font-semibold text-[#D94F79] underline-offset-4 hover:underline dark:text-[#F48FB1]"
        >
          Contact page
        </Link>
        .
      </p>
    </div>
  );
}
