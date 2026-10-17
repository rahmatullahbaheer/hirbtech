'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioProjects, portfolioCategories } from '@/data/portfolio';
import PortfolioCard from './PortfolioCard';

export default function PortfolioGrid({ limit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedCategory);

  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <div className="space-y-8">
      {/* Category Filter Buttons */}
      {!limit && (
        <div className="flex items-center justify-center flex-wrap gap-2">
          {portfolioCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'text-white'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activePortfolioTab"
                    className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Dynamic Filter Grid with AnimatePresence */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {displayProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
