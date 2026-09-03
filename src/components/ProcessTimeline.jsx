'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '@/data/process';
import { CheckCircle2 } from 'lucide-react';

export default function ProcessTimeline() {
  return (
    <div className="relative border-l-2 border-zinc-800 ml-4 lg:ml-8 space-y-12 py-4">
      {processSteps.map((item, idx) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          className="relative pl-8 lg:pl-12 group"
        >
          {/* Timeline Dot Badge */}
          <motion.div
            whileHover={{ scale: 1.25, backgroundColor: "#2563eb" }}
            className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-zinc-950 border-2 border-blue-600 flex items-center justify-center text-xs font-mono font-bold text-blue-400 group-hover:text-white transition-all shadow-lg"
          >
            {item.step}
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl p-6 hover:border-blue-500/40 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
                Phase {item.step}
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-300">
              {item.shortDescription}
            </p>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {item.detail}
            </p>

            {/* Deliverables List */}
            <div className="pt-3 border-t border-zinc-800/80">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Phase Deliverables:
              </div>
              <div className="flex flex-wrap gap-2">
                {item.deliverables.map((del) => (
                  <span
                    key={del}
                    className="inline-flex items-center text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md"
                  >
                    <CheckCircle2 className="w-3 h-3 text-blue-400 mr-1.5 flex-shrink-0" />
                    {del}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
