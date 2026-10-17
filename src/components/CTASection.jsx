'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection({
  title = "Ready to Turn Your Vision into Software?",
  subtitle = "Discuss your project requirements with RB-Tech's software engineers and receive a tailored development proposal.",
  primaryCtaText = "Start Your Project",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Request Project Estimate",
  secondaryCtaLink = "/estimator"
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="relative my-16 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-zinc-900 to-indigo-950 border border-blue-800/40 p-8 sm:p-12 text-center shadow-2xl shadow-blue-950/40"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
      />
      
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Let&apos;s Build Together</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href={primaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href={secondaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all"
            >
              <span>{secondaryCtaText}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
