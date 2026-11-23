'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}
