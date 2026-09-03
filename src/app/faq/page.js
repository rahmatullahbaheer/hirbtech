import React from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import JsonLd, { getFaqSchema } from '@/components/JsonLd';
import { faqs } from '@/data/faq';

export const metadata = {
  title: "Frequently Asked Questions | RB-Tech",
  description: "Find answers to common questions about RB-Tech services, software development cost, app timelines, AI solutions, maintenance, and cloud deployment."
};

export default function FAQPage() {
  const breadcrumbItems = [
    { name: "FAQ", path: "/faq" }
  ];

  const faqSchema = getFaqSchema(faqs);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <JsonLd data={faqSchema} />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Knowledge Base
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Everything you need to know about working with RB-Tech, from our technology stack and agile sprint workflow to pricing models and maintenance SLAs.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <FAQAccordion />
      </div>

      <CTASection
        title="Have a Question Not Answered Here?"
        subtitle="Get in touch with our team for direct technical answers."
        primaryCtaText="Start Your Project"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
