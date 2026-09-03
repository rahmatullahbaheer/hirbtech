import React from 'react';
import ProcessTimeline from '@/components/ProcessTimeline';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: "Development Process | RB-Tech",
  description: "Learn about RB-Tech's 7-step software development lifecycle: Discovery, Strategy, UX/UI Design, Development, Testing, Launch, and Maintenance Support."
};

export default function ProcessPage() {
  const breadcrumbItems = [
    { name: "Process", path: "/process" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          How We Engineer Software
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Our Development Process
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          RB-Tech follows a structured 7-stage engineering methodology designed to minimize risks, ensure transparent communication, and deliver high-quality digital products on schedule.
        </p>
      </div>

      <ProcessTimeline />

      <CTASection
        title="Ready to Begin Phase 01?"
        subtitle="Schedule a initial technical discovery call with an RB-Tech software architect."
        primaryCtaText="Start Your Project"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
