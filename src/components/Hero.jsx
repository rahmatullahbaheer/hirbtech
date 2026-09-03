'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Terminal, Code2, Globe, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('architecture');

  const serviceLabels = [
    { label: "Websites", href: "/services/web-development" },
    { label: "Web Apps", href: "/services/web-app-development" },
    { label: "Mobile Apps", href: "/services/mobile-app-development" },
    { label: "Desktop Apps", href: "/services/desktop-app-development" },
    { label: "SaaS", href: "/services/saas-development" },
    { label: "AI", href: "/services/ai-development" }
  ];

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-grid-pattern">
      {/* Animated Glowing Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.28, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/3 right-10 w-[320px] h-[320px] bg-indigo-600/15 blur-[110px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Floating Pill Badge with Animated Logo Icon */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide shadow-lg shadow-purple-900/20"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-5 h-5 rounded-md overflow-hidden bg-purple-900/60 p-0.5  flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src="/logo.png"
                  alt="RB Logo Icon"
                 fill
                  className="object-contain"
                />
              </motion.div>
              <span>Full-Cycle Software Engineering</span>
            </motion.div>

            {/* Main Animated H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              We Build Digital Products That{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-teal-300">
                Move Your Business Forward.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              From high-converting websites to powerful web apps, mobile applications, SaaS platforms and AI solutions, RB-Tech turns ideas into reliable digital products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-sm text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all"
                >
                  <span>Explore Our Services</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Supporting Service Labels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-zinc-800/80"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Core Development Expertise:
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {serviceLabels.map((s, idx) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={s.href}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-purple-500/40 text-xs font-medium text-zinc-300 hover:text-purple-400 transition-all block"
                    >
                      {s.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Code & Architecture Terminal Card with Animated Logo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Animated Brand Logo Badge (Floating Top Left) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                filter: [
                  "drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))",
                  "drop-shadow(0 0 22px rgba(168, 85, 247, 0.8))",
                  "drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="absolute -top-6 -left-6 z-30 p-2.5 rounded-2xl bg-zinc-950/90 border border-purple-500/40 shadow-2xl flex items-center space-x-2 backdrop-blur-xl cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-purple-950/80 p-0.5 border border-purple-400/50 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="RB-Tech Brand Logo"
                fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="pr-1">
                <span className="text-[11px] font-bold text-white block leading-none">RB-Tech</span>
                <span className="text-[9px] font-mono text-purple-400">Software Co.</span>
              </div>
            </motion.div>

            {/* Floating Top Right Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-5 -right-4 z-20 px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-lg shadow-purple-600/40 flex items-center space-x-1.5 border border-purple-400/30"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Production Ready</span>
            </motion.div>

            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-2xl shadow-black/80 backdrop-blur-xl pt-7">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* Tab buttons */}
                <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-[11px]">
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-2.5 py-0.5 rounded font-mono transition-colors ${
                      activeTab === 'architecture' ? 'bg-purple-600 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    architecture.js
                  </button>
                  <button
                    onClick={() => setActiveTab('deploy')}
                    className={`px-2.5 py-0.5 rounded font-mono transition-colors ${
                      activeTab === 'deploy' ? 'bg-purple-600 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    deploy.config
                  </button>
                </div>
              </div>

              {/* Terminal Code Body */}
              <AnimatePresence mode="wait">
                {activeTab === 'architecture' ? (
                  <motion.div
                    key="arch"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-xs text-zinc-300 space-y-2 bg-zinc-950 p-4 rounded-xl border border-zinc-800/60 overflow-x-auto"
                  >
                    <div className="text-purple-400">const<span className="text-white"> RBTech </span>=<span className="text-purple-400"> require</span>(<span className="text-emerald-400">&apos;rb-tech/engineering&apos;</span>);</div>
                    <div className="text-zinc-500">&#47;&#47; Initialize robust enterprise architecture</div>
                    <div><span className="text-purple-400">export async function</span> <span className="text-yellow-400">buildProduct</span>(clientVision) &#123;</div>
                    <div className="pl-4">
                      <span className="text-purple-400">return await</span> RBTech.<span className="text-purple-400">deploy</span>(&#123;
                    </div>
                    <div className="pl-8 text-zinc-300">
                      quality: <span className="text-emerald-400">&apos;Production-Ready&apos;</span>,
                    </div>
                    <div className="pl-8 text-zinc-300">
                      architecture: [<span className="text-emerald-400">&apos;Next.js&apos;</span>, <span className="text-emerald-400">&apos;Node.js&apos;</span>, <span className="text-emerald-400">&apos;PostgreSQL&apos;</span>],
                    </div>
                    <div className="pl-8 text-zinc-300">
                      security: <span className="text-emerald-400">&apos;WCAG & Enterprise Compliant&apos;</span>,
                    </div>
                    <div className="pl-8 text-zinc-300">
                      performance: <span className="text-emerald-400">&apos;Sub-Second LCP&apos;</span>
                    </div>
                    <div className="pl-4">&#125;);</div>
                    <div>&#125;</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="deploy"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-xs text-zinc-300 space-y-2 bg-zinc-950 p-4 rounded-xl border border-zinc-800/60 overflow-x-auto"
                  >
                    <div className="text-zinc-500">&#47;&#47; Continuous Deployment Pipeline</div>
                    <div className="text-emerald-400">✓ Linting & Static Type Check Passed</div>
                    <div className="text-emerald-400">✓ Unit & Integration Tests Passed</div>
                    <div className="text-emerald-400">✓ Core Web Vitals Performance 99/100</div>
                    <div className="text-purple-400">STATUS: Deployed to Global CDN Edge Network</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feature highlight badges */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center space-x-2.5"
                >
                  <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-zinc-200">Fast Performance</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/30 flex items-center space-x-2.5"
                >
                  <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-zinc-200">Secure & Scalable</span>
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
