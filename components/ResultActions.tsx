'use client';

import React from 'react';
import { Copy, Share2, Printer, RotateCcw } from 'lucide-react';
import { useToast } from './ToastProvider';

interface ResultActionsProps {
  shareTitle: string;
  summaryText: string;
  onReset: () => void;
}

export default function ResultActions({
  shareTitle,
  summaryText,
  onReset,
}: ResultActionsProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
        showToast('Results copied to your clipboard.');
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = summaryText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Results copied to your clipboard.');
      }
    } catch {
      showToast('Unable to copy automatically. Please select the results manually.', 'error');
    }
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share({
          title: shareTitle,
          text: summaryText,
        });
        showToast('Shared successfully.');
      } else {
        await handleCopy();
        showToast('Web Share not supported here — results copied to clipboard instead.', 'info');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      showToast('Could not open share sheet. Try copying instead.', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print flex flex-wrap items-center gap-2.5 pt-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#F2DCE5] bg-white px-4 py-2 text-sm font-medium text-[#542B3C] whitespace-nowrap transition-colors hover:border-[#D94F79]/40 hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:border-[#3D212E] dark:bg-[#24131B] dark:text-[#F7E8EF] dark:hover:bg-[#331B26]"
      >
        <Copy className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
        Copy Results
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#F2DCE5] bg-white px-4 py-2 text-sm font-medium text-[#542B3C] whitespace-nowrap transition-colors hover:border-[#D94F79]/40 hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:border-[#3D212E] dark:bg-[#24131B] dark:text-[#F7E8EF] dark:hover:bg-[#331B26]"
      >
        <Share2 className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
        Share Results
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#F2DCE5] bg-white px-4 py-2 text-sm font-medium text-[#542B3C] whitespace-nowrap transition-colors hover:border-[#D94F79]/40 hover:bg-[#FFF0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:border-[#3D212E] dark:bg-[#24131B] dark:text-[#F7E8EF] dark:hover:bg-[#331B26]"
      >
        <Printer className="h-4 w-4 text-[#D94F79] dark:text-[#F48FB1]" aria-hidden="true" />
        Print
      </button>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-transparent bg-[#FFF0F5] px-4 py-2 text-sm font-medium text-[#8F3155] whitespace-nowrap transition-colors hover:bg-[#F8DCE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94F79] dark:bg-[#341A26] dark:text-[#F4A6C1] dark:hover:bg-[#442232]"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset
      </button>
    </div>
  );
}
