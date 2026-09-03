import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import JsonLd, { getServiceSchema } from '@/components/JsonLd';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Code2 } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rbtech.dev";

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found"
    };
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: `${siteUrl}/services/${service.slug}`
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `${siteUrl}/services/${service.slug}`
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Services", path: "/services" },
    { name: service.shortTitle, path: `/services/${service.slug}` }
  ];

  const serviceSchema = getServiceSchema(siteUrl, service);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <JsonLd data={serviceSchema} />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Header for Service */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-zinc-800 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <span>Target Intent: {service.targetIntent}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {service.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
          {service.overview}
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            href="#inquire"
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 flex items-center"
          >
            <span>{service.ctaText}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link
            href="/portfolio"
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all"
          >
            View Related Case Studies
          </Link>
        </div>
      </div>

      {/* Key Deliverables & Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Scope & Benefits */}
        <div className="lg:col-span-7 space-y-10">

          {/* Capabilities Checklist */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Code2 className="w-5 h-5 text-blue-400 mr-2.5" />
              Service Capabilities & Scope
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start text-xs text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advantages / Benefits */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Zap className="w-5 h-5 text-blue-400 mr-2.5" />
              Why Choose RB-Tech for {service.shortTitle}
            </h2>
            <div className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl glass-card border border-zinc-800 flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Tech Stack */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              Primary Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-blue-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: In-Page Contact Inquiry Form */}
        <div id="inquire" className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1">
                Request a {service.shortTitle} Proposal
              </h3>
              <p className="text-xs text-zinc-400">
                Fill out the form below to receive a custom scope and technical estimation.
              </p>
            </div>
            <ContactForm defaultService={service.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
