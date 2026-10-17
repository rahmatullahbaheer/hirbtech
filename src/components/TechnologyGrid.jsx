'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { technologies } from '@/data/technologies';

export default function TechnologyGrid() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");

  const activeCategoryData = technologies.find(c => c.category === selectedCategory) || technologies[0];

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {technologies.map((cat) => {
          const isSelected = selectedCategory === cat.category;
          return (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeTechTab"
                  className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.category}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Animated Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeCategoryData.items.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3 hover:border-blue-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                  {selectedCategory}
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {tech.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
