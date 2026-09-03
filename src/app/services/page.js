import React from 'react';
import ServiceGrid from '@/components/ServiceGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { services } from '@/data/services';

export const metadata = {
  title: "Software Development Services",
  description: "RB-Tech provides full-cycle software development services including web development, web apps, mobile apps, desktop software, SaaS, e-commerce, AI solutions, APIs, and UI/UX design."
};

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: "Services", path: "/services" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Our Engineering Expertise
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Software Development Services
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Explore RB-Tech&apos;s full range of custom software development services. We build scalable digital products tailored around your specific business requirements and workflows.
        </p>
      </div>

      {/* Services Grid */}
      <ServiceGrid services={services} />

      {/* CTA */}
      <CTASection
        title="Need a Custom Software Solution?"
        subtitle="Contact our engineering team to discuss your project requirements and receive a comprehensive proposal."
        primaryCtaText="Start Your Project"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
