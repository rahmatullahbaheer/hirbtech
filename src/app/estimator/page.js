import React from 'react';
import ProjectEstimator from '@/components/ProjectEstimator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: "Project Scope Estimator | RB-Tech",
  description: "Calculate your software project scope, budget range, feature checklist, and development timeline with RB-Tech's interactive estimator."
};

export default function EstimatorPage() {
  const breadcrumbItems = [
    { name: "Project Estimator", path: "/estimator" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Interactive Calculator
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Project Estimator Tool
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Use this interactive 5-step calculator to select your desired product type, target budget, timeline, and feature checklist.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <ProjectEstimator />
      </div>
    </div>
  );
}
