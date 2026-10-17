import React from 'react';
import PortfolioGrid from '@/components/PortfolioGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: "RB-Tech Portfolio | Websites, Apps & Software",
  description: "Explore RB-Tech's portfolio of web applications, mobile apps, desktop software, SaaS platforms, e-commerce stores, and AI solutions."
};

export default function PortfolioPage() {
  const breadcrumbItems = [
    { name: "Portfolio", path: "/portfolio" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Our Engineering Work
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Case Studies & Software Projects
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Browse our recent digital product engineering work across SaaS platforms, AI document processors, cross-platform mobile apps, desktop POS systems, and e-commerce stores.
        </p>
      </div>

      <PortfolioGrid />

      <CTASection
        title="Ready to Build Your Digital Product?"
        subtitle="Schedule a technical scope consultation with RB-Tech engineers."
        primaryCtaText="Start Your Project"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
