'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingCard({ tier }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`glass-card rounded-2xl p-6 flex flex-col justify-between h-full relative transition-all ${
        tier.popular ? 'border-blue-500/50 shadow-xl shadow-blue-500/10' : 'hover:border-zinc-700'
      }`}
    >
      {tier.popular && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-md"
        >
          Popular Choice
        </motion.div>
      )}

      <div>
        {/* Tier Title & Audience */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{tier.title}</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">{tier.targetAudience}</p>
        </div>

        {/* Pricing Banner */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 mb-6">
          <span className="text-xs text-zinc-400 block mb-1">Pricing Model:</span>
          <span className="text-sm font-semibold text-blue-400">
            {tier.pricingDisplay}
          </span>
        </div>

        {/* Features Checklist */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Included Capabilities:</div>
          {tier.features.map((feat, idx) => (
            <div key={idx} className="flex items-start text-xs text-zinc-300">
              <Check className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-zinc-800/60">
        <Link
          href={`/contact?service=${encodeURIComponent(tier.title)}`}
          className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-semibold text-xs transition-all ${
            tier.popular
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
              : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white'
          }`}
        >
          <span>{tier.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-2" />
        </Link>
      </div>
    </motion.div>
  );
}
