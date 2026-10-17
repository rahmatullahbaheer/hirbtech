import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { ShieldCheck, Code2, Zap, Layers, Eye, Users } from 'lucide-react';

export const metadata = {
  title: "About RB-Tech | Software Development Company",
  description: "Learn about RB-Tech, a software development company building modern websites, web applications, mobile apps, desktop software, SaaS platforms, and AI solutions."
};

export default function AboutPage() {
  const breadcrumbItems = [
    { name: "About", path: "/about" }
  ];

  const coreValues = [
    {
      title: "Technical Integrity",
      description: "We write clean, well-tested, and maintainable software architecture. No quick hacks or unmaintained technical debt.",
      icon: Code2
    },
    {
      title: "Full Transparency",
      description: "Clear sprint milestones, direct developer access, and upfront scope alignment without hidden costs.",
      icon: Eye
    },
    {
      title: "High Performance",
      description: "Sub-second load times, lightweight bundle footprints, and responsive user experiences optimized across all screen sizes.",
      icon: Zap
    },
    {
      title: "100% IP Ownership",
      description: "Upon project completion, our clients retain complete ownership of all intellectual property, source code repositories, and credentials.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-zinc-800 space-y-6 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <span>Engineering Craftsmanship</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About RB-Tech
        </h1>

        <p className="text-xl font-semibold text-blue-400">
          Build. Scale. Succeed.
        </p>

        <p className="text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          RB-Tech is a software development company building modern websites, web applications, mobile apps, desktop software, SaaS platforms, e-commerce solutions, APIs and AI-powered products.
        </p>
      </div>

      {/* Mission & Engineering Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Our Approach
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Engineered for Business Outcomes
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We believe that digital products should solve real business challenges rather than serve as superficial tech demonstrations. By combining modern frameworks like Next.js, React, Node.js, Python, and React Native with robust database architecture, we build reliable tools that move your operations forward.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            From early-stage MVPs for venture startups to enterprise internal workflow automation, our engineering practices prioritize security, WCAG accessibility, and continuous deployment capability.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
            What We Build
          </h3>
          <ul className="space-y-2.5 text-xs text-zinc-300">
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5" />
              Responsive Corporate Websites & Headless E-commerce
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5" />
              Interactive Single-Page & Server-Rendered Web Applications
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5" />
              Cross-Platform iOS & Android Mobile Apps (React Native / Flutter)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5" />
              Desktop Software for Windows, macOS & Linux (Electron)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5" />
              Multi-Tenant SaaS Platforms with Billing Integration
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5" />
              Practical Artificial Intelligence & RAG Search Pipelines
            </li>
          </ul>
        </div>
      </div>

      {/* Core Engineering Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Values & Standards
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Our Core Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) => {
            const IconComp = val.icon;
            return (
              <div key={val.title} className="glass-card rounded-2xl p-6 space-y-3 border border-zinc-800">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{val.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
