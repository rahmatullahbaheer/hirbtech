'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Globe, Smartphone, Tag, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { webProjects, mobileProjects } from '@/data/projects';
import Link from 'next/link';

const TABS = [
  { id: 'web', label: 'Web Projects', icon: Globe, count: webProjects.length },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone, count: mobileProjects.length },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project }) {
  const hasPdf = Boolean(project.pdf);

  return (
    <motion.div
      variants={cardVariants}
      className="relative group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1"
    >
      {/* Color accent top bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border"
              style={{
                background: `${project.color}18`,
                borderColor: `${project.color}30`,
              }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-base leading-tight">{project.title}</h3>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: `${project.color}18`, color: project.color }}
              >
                {project.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 text-xs flex-shrink-0">
            <Calendar className="w-3 h-3" />
            {project.year}
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Platform badges (mobile only) */}
        {project.platform && (
          <div className="flex gap-2 mb-4">
            {project.platform.map((p) => (
              <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700">
                {p === 'Android' ? '🤖' : '🍎'} {p}
              </span>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
              {t}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: project.color }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {project.status}
          </span>

          {hasPdf ? (
            <a
              href={project.pdf}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`,
                boxShadow: `0 4px 14px ${project.color}30`,
              }}
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-500 bg-zinc-800/60 border border-zinc-700">
              <Download className="w-3.5 h-3.5" />
              PDF Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('web');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'mobile' || tab === 'web') setActiveTab(tab);
  }, [searchParams]);
  const projects = activeTab === 'web' ? webProjects : mobileProjects;

  return (
    <div className="min-h-screen bg-[#0b0f19]">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 tracking-wide uppercase">
              <Tag className="w-3.5 h-3.5" />
              Our Work
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Projects &{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Case Studies
              </span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Browse our portfolio of delivered web platforms and mobile applications.
              Download the full project PDF for in-depth technical details and outcomes.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span><span className="font-bold text-white">{webProjects.length}</span> Web Projects</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-600" />
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-400" />
                <span><span className="font-bold text-white">{mobileProjects.length}</span> Mobile Apps</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-600" />
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>All PDFs available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 p-1.5 bg-zinc-900/80 border border-zinc-800 rounded-2xl w-fit mx-auto mb-12 backdrop-blur-sm">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
                    transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Project Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Have a Project in Mind?</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
              Let's discuss your requirements and build something exceptional together.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-105 active:scale-95"
              >
                Start Your Project
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/estimator"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-zinc-300 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                Get a Free Estimate
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
