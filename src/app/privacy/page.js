import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: "Privacy Policy | RB-Tech",
  description: "Read RB-Tech's privacy policy regarding data collection, protection, lead handling, and user privacy."
};

export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: "Privacy Policy", path: "/privacy" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>

      <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-6">
        <p>
          At RB-Tech, accessible from https://rbtech.dev, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document outlines the types of information collected and how it is protected.
        </p>

        <h2 className="text-xl font-bold text-white pt-4">1. Information We Collect</h2>
        <p>
          When you submit a contact request or use our interactive project estimator, we collect personal information you voluntarily provide, including your name, email address, phone number, company name, and project description.
        </p>

        <h2 className="text-xl font-bold text-white pt-4">2. How We Use Your Information</h2>
        <p>
          We use the information collected solely to evaluate your software requirements, respond to your inquiries, prepare custom development proposals, and maintain business communication.
        </p>

        <h2 className="text-xl font-bold text-white pt-4">3. Data Security & Confidentiality</h2>
        <p>
          We implement industry-standard administrative and technical safeguards to protect your personal information against unauthorized access, disclosure, or misuse. All non-public project discussions are treated as confidential.
        </p>

        <h2 className="text-xl font-bold text-white pt-4">4. No Data Selling</h2>
        <p>
          RB-Tech does not sell, rent, trade, or transfer your personal data to third parties for marketing purposes.
        </p>
      </div>
    </div>
  );
}
