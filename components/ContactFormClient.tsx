'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, RotateCcw } from 'lucide-react';
import { validateContactSubmission } from '@/lib/calculators';
import { useToast } from './ToastProvider';

interface Receipt {
  referenceId: string;
  name: string;
  subject: string;
}

export default function ContactFormClient() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateContactSubmission({ name, email, subject, message });
    if (!check.ok) {
      setFieldErrors(check.fieldErrors || {});
      setFormError(check.error);
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFieldErrors(json.fieldErrors || {});
        setFormError(json.error || 'Please verify all fields and try again.');
      } else {
        setReceipt(json.data as Receipt);
        showToast('Your message has been sent to Blaze.');
      }
    } catch {
      setFormError('Unable to submit right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setFieldErrors({});
    setFormError(null);
    setReceipt(null);
  };

  if (receipt) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[#F2DCE5] bg-white p-8 text-center shadow-sm dark:border-[#3A1E2B] dark:bg-[#221219]"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0F5] text-[#D94F79] dark:bg-[#341A26] dark:text-[#F48FB1]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-serif text-2xl font-semibold text-[#542B3C] dark:text-[#F7E8EF]">
          Thank you, {receipt.name}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#987887] dark:text-[#C5A4B4]">
          We received your message regarding &ldquo;{receipt.subject}&rdquo; and logged reference{' '}
          <span className="font-semibold text-[#8F3155] dark:text-[#F4A6C1]">
            {receipt.referenceId}
          </span>
          .
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#FFF0F5] px-5 py-2.5 text-sm font-semibold text-[#8F3155] transition-colors hover:bg-[#F8DCE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:bg-[#341A26] dark:text-[#F4A6C1] dark:hover:bg-[#442232]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[#F2DCE5] bg-white p-6 shadow-sm shadow-[#D94F79]/5 sm:p-8 dark:border-[#3A1E2B] dark:bg-[#221219] dark:shadow-none"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
          >
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            maxLength={80}
            placeholder="Clara Bennett"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: '' }));
            }}
            aria-invalid={fieldErrors.name ? 'true' : 'false'}
            required
            className={`mt-1.5 block w-full min-h-[46px] rounded-xl border bg-[#FFF8FB] px-4 py-2.5 text-base text-[#542B3C] placeholder:text-[#987887]/70 focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:placeholder:text-[#9C7D8D] ${
              fieldErrors.name
                ? 'border-rose-500'
                : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
            }`}
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            maxLength={120}
            placeholder="clara@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
            }}
            aria-invalid={fieldErrors.email ? 'true' : 'false'}
            required
            className={`mt-1.5 block w-full min-h-[46px] rounded-xl border bg-[#FFF8FB] px-4 py-2.5 text-base text-[#542B3C] placeholder:text-[#987887]/70 focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:placeholder:text-[#9C7D8D] ${
              fieldErrors.email
                ? 'border-rose-500'
                : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={120}
          placeholder="Feature idea or question"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (fieldErrors.subject) setFieldErrors((prev) => ({ ...prev, subject: '' }));
          }}
          aria-invalid={fieldErrors.subject ? 'true' : 'false'}
          required
          className={`mt-1.5 block w-full min-h-[46px] rounded-xl border bg-[#FFF8FB] px-4 py-2.5 text-base text-[#542B3C] placeholder:text-[#987887]/70 focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:placeholder:text-[#9C7D8D] ${
            fieldErrors.subject
              ? 'border-rose-500'
              : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
          }`}
        />
        {fieldErrors.subject && (
          <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
            {fieldErrors.subject}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[#542B3C] dark:text-[#E7CEDB]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={1500}
          placeholder="Share your feedback, report a date edge case, or suggest a new calculator..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: '' }));
          }}
          aria-invalid={fieldErrors.message ? 'true' : 'false'}
          required
          className={`mt-1.5 block w-full rounded-xl border bg-[#FFF8FB] px-4 py-3 text-base text-[#542B3C] placeholder:text-[#987887]/70 focus:outline-none focus:ring-2 focus:ring-[#D94F79]/30 dark:bg-[#1A0D13] dark:text-[#F7E8EF] dark:placeholder:text-[#9C7D8D] ${
            fieldErrors.message
              ? 'border-rose-500'
              : 'border-[#F2DCE5] focus:border-[#D94F79] dark:border-[#462635] dark:focus:border-[#F48FB1]'
          }`}
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs font-medium text-rose-700 dark:text-rose-300">
            {fieldErrors.message}
          </p>
        )}
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

      <div className="mt-6 flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#D94F79] px-7 py-3 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-[#D94F79]/25 transition-colors hover:bg-[#C13E67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto dark:hover:bg-[#E26189] dark:focus-visible:ring-offset-[#221219]"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
