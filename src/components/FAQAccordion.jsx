'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { faqs } from '@/data/faq';

export default function FAQAccordion({ limit }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayFaqs = limit ? filteredFaqs.slice(0, limit) : filteredFaqs;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      {!limit && (
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. mobile apps, pricing, AI)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      )}

      {/* Accordion Items */}
      <div className="space-y-3">
        {displayFaqs.length === 0 ? (
          <div className="text-center py-8 text-zinc-400 text-sm">
            No matching questions found for &quot;{searchQuery}&quot;.
          </div>
        ) : (
          displayFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="glass-card rounded-2xl border border-zinc-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between space-x-4 hover:bg-zinc-900/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white flex items-center">
                    <HelpCircle className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-blue-400' : 'text-zinc-400'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/40">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
