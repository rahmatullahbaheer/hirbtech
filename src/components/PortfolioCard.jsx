'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';

export default function PortfolioCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      <div className="space-y-4">
        {/* Category Pill Badge */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            {project.category}
          </span>
          <span className="text-xs text-zinc-400 font-mono">Case Study</span>
        </div>

        {/* Project Name */}
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA Link */}
      <div className="pt-5 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400">
          Client Result Delivered
        </span>

        <Link
          href={`/portfolio/${project.slug}`}
          className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 group/link"
        >
          <span>View Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
