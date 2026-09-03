'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Layout, Smartphone, Monitor, Database, Cloud, Cpu, Code, ShoppingCart, Key, Sparkles, Wrench } from 'lucide-react';

const iconMap = {
  Globe,
  Layout,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  Cpu,
  Code,
  ShoppingCart,
  Key,
  Sparkles,
  Wrench
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      {/* Background Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="space-y-4 relative z-10">
        {/* Header Icon & Title */}
        <div className="flex items-start space-x-3.5">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/30 transition-all duration-300 flex-shrink-0"
          >
            <IconComponent className="w-6 h-6" />
          </motion.div>

          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            <span className="inline-block mt-1 text-[11px] font-semibold text-blue-400/90 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
              {service.shortTitle}
            </span>
          </div>
        </div>

        {/* Overview description */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
          {service.overview}
        </p>

        {/* Capabilities Checklist */}
        <div className="pt-2 space-y-2 border-t border-zinc-800/80">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Key Capabilities:
          </div>
          <div className="space-y-1.5">
            {service.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mr-2 flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA Link */}
      <div className="pt-5 mt-4 border-t border-zinc-800/80 flex items-center justify-between relative z-10">
        <span className="text-[11px] font-mono text-zinc-400">
          {service.techStack.slice(0, 2).join(' • ')}
        </span>

        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 group/link"
        >
          <span>{service.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
