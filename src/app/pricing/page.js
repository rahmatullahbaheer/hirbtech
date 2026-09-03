import React from 'react';
import PricingCard from '@/components/PricingCard';
import ProjectEstimator from '@/components/ProjectEstimator';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { pricingTiers } from '@/data/pricing';

export const metadata = {
  title: "Pricing & Scope | RB-Tech",
  description: "Transparent pricing models for websites, web applications, mobile apps, custom software, SaaS platforms, and enterprise solutions."
};

export default function PricingPage() {
  const breadcrumbItems = [
    { name: "Pricing", path: "/pricing" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Transparent Investment
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Pricing & Development Packages
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          We provide custom pricing proposals based on your exact project scope, database complexity, platform targets, and functional requirements.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>

      {/* Interactive Estimator Tool */}
      <div className="pt-8">
        <ProjectEstimator />
      </div>

      <CTASection
        title="Need a Bespoke Quotation?"
        subtitle="Contact us directly to review your functional requirements doc or RFQ."
        primaryCtaText="Request a Quote"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
