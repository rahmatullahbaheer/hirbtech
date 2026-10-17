import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ServiceGrid from '@/components/ServiceGrid';
import TechnologyGrid from '@/components/TechnologyGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import PortfolioGrid from '@/components/PortfolioGrid';
import FAQAccordion from '@/components/FAQAccordion';
import ProjectEstimator from '@/components/ProjectEstimator';
import CTASection from '@/components/CTASection';
import { services } from '@/data/services';
import { ArrowRight, CheckCircle2, Shield, Zap, Layers, Cpu, Eye, MessageSquareQuote } from 'lucide-react';

export default function Home() {
  const whyChooseUs = [
    {
      title: "Business-focused",
      description: "Solutions designed around actual business requirements rather than forcing workflows into generic software templates.",
      icon: Zap
    },
    {
      title: "Modern technology",
      description: "We build maintainable architectures using modern frameworks like Next.js, React, TypeScript, Node.js, and Python.",
      icon: Layers
    },
    {
      title: "Performance-focused",
      description: "Sub-second load times and lightweight digital experiences engineered for optimal Core Web Vitals performance.",
      icon: Cpu
    },
    {
      title: "Scalable",
      description: "Containerized and modular cloud architectures designed to handle growing user volume effortlessly.",
      icon: Shield
    },
    {
      title: "Transparent",
      description: "Clear milestone updates, direct developer communication, and regular staging environment reviews.",
      icon: Eye
    },
    {
      title: "Long-term support",
      description: "Dedicated post-launch technical retainers, security updates, and continuous feature updates.",
      icon: MessageSquareQuote
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

        {/* Section 1: Digital Solutions Built Around Your Business */}
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <span>Tailored Product Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Digital Solutions Built Around Your Business
          </h2>
          <p className="text-base text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Every business operates differently. Whether you need a high-converting marketing website, an offline-capable mobile app, a multi-tenant SaaS platform, or a secure AI application, RB-Tech delivers custom digital products built to your exact specifications.
          </p>
        </section>

        {/* Section 2: Our Development Services */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                Full-Service Engineering
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Our Development Services
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Explore All 12 Services</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <ServiceGrid services={services} limit={6} />
        </section>

        {/* Section 3: Technologies We Work With */}
        <section className="space-y-8 bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-8 lg:p-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Modern Tech Stack
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Technologies We Work With
            </h2>
            <p className="text-sm text-zinc-400">
              We select field-tested frameworks and proven database technologies to guarantee speed, stability, and maintainability.
            </p>
          </div>

          <TechnologyGrid />
        </section>

        {/* Section 4: How We Build Your Product */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Agile Methodology
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              How We Build Your Product
            </h2>
            <p className="text-sm text-zinc-400">
              A structured 7-stage software development workflow ensuring clear scope alignment, rigorous testing, and on-time delivery.
            </p>
          </div>

          <ProcessTimeline />
        </section>

        {/* Section 5: Featured Work */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                Selected Case Studies
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Featured Work
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <PortfolioGrid limit={3} />
        </section>

        {/* Section 6: Why Choose RB-Tech */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Engineering Excellence
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Why Choose RB-Tech
            </h2>
            <p className="text-sm text-zinc-400">
              We focus on product quality, maintainable code, and real business results without empty hype or unsupported statistical claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass-card rounded-2xl p-6 space-y-3 border border-zinc-800 hover:border-blue-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7: Project Estimator */}
        <section>
          <ProjectEstimator />
        </section>

        {/* Section 8: Frequently Asked Questions */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Clear Answers
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400">
              Got questions about custom software, timelines, pricing, or our tech stack? Find answers below.
            </p>
          </div>

          <FAQAccordion limit={6} />

          <div className="text-center pt-2">
            <Link
              href="/faq"
              className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              <span>View All FAQs →</span>
            </Link>
          </div>
        </section>

        {/* Section 9: Start Your Project CTA */}
        <CTASection
          title="Start Your Project with RB-Tech"
          subtitle="Ready to build a web application, mobile app, custom software, or AI solution? Get in touch with our team today."
          primaryCtaText="Start Your Project"
          primaryCtaLink="/contact"
        />

      </div>
    </div>
  );
}
