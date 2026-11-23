'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type ToastKind = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  showToast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, kind: ToastKind = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, kind }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 3600);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="no-print pointer-events-none fixed bottom-5 right-5 z-50 flex max-w-sm flex-col gap-2.5"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              role="status"
              className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[#F2DCE5] bg-white px-4 py-3 text-sm text-[#542B3C] shadow-lg shadow-[#D94F79]/10 dark:border-[#462635] dark:bg-[#26141D] dark:text-[#F7E8EF] dark:shadow-black/30"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  toast.kind === 'error'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                    : toast.kind === 'info'
                      ? 'bg-[#FFF0F5] text-[#8F3155] dark:bg-[#3A1E2B] dark:text-[#F4A6C1]'
                      : 'bg-[#FFF0F5] text-[#D94F79] dark:bg-[#3A1E2B] dark:text-[#F48FB1]'
                }`}
              >
                {toast.kind === 'error' ? (
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                ) : toast.kind === 'info' ? (
                  <Info className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Check className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
              <span className="flex-1 font-medium leading-snug">{toast.message}</span>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#987887] transition-colors hover:bg-[#FFF0F5] hover:text-[#542B3C] dark:text-[#C5A4B4] dark:hover:bg-[#3A1E2B] dark:hover:text-white"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
