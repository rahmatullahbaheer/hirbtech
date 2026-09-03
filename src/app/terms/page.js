import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: "Terms of Service | RB-Tech",
  description: "Read RB-Tech's terms of service governing software development proposals, scope agreements, and website usage."
};

export default function TermsPage() {
  const breadcrumbItems = [
    { name: "Terms of Service", path: "/terms" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>

      <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-6">
        <p>
          By accessing and using the website located at https://rbtech.dev, you agree to comply with and be bound by the following Terms of Service.
        </p>

        <h2 className="text-xl font-bold text-white pt-4">1. Services & Non-Binding Guidance</h2>
        <p>
          All information, pricing tiers, and project estimator tools provided on this website are for informational and guidance purposes only. Binding commitments, scope definitions, deliverables, and guarantees are established solely through executed written contracts (Statements of Work / Master Services Agreements).
        </p>

        <h2 className="text-xl font-bold text-white pt-4">2. Intellectual Property</h2>
        <p>
          The content, brand logos, code snippets, visual designs, and media on this website are the intellectual property of RB-Tech. Client IP ownership for software engineering deliverables is governed by separate client contracts.
        </p>

        <h2 className="text-xl font-bold text-white pt-4">3. Limitation of Liability</h2>
        <p>
          RB-Tech shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use this website.
        </p>
      </div>
    </div>
  );
}
