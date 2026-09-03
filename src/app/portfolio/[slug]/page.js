import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { portfolioProjects } from '@/data/portfolio';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { CheckCircle2, ArrowRight, Layers, Cpu, Code2, Server, Check, ArrowLeft } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rbtech.dev";

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${project.name} Case Study | RB-Tech`,
    description: project.shortDescription,
    alternates: {
      canonical: `${siteUrl}/portfolio/${project.slug}`
    },
    openGraph: {
      title: `${project.name} Case Study | RB-Tech`,
      description: project.shortDescription,
      url: `${siteUrl}/portfolio/${project.slug}`
    }
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Portfolio", path: "/portfolio" },
    { name: project.name, path: `/portfolio/${project.slug}` }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Header */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-zinc-800 space-y-6 relative overflow-hidden">
        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            {project.category}
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            Engineering Case Study
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {project.name}
        </h1>

        <p className="text-lg text-zinc-300 max-w-3xl leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="pt-2 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left main column */}
        <div className="lg:col-span-8 space-y-12">

          {/* Section 1: Project Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Project Overview</h2>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800/80">
              {project.overview}
            </p>
          </section>

          {/* Section 2: Challenge */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">The Challenge</h2>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800/80">
              {project.challenge}
            </p>
          </section>

          {/* Section 3: Solution */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Engineering Solution</h2>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800/80">
              {project.solution}
            </p>
          </section>

          {/* Section 4: Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Key Features Delivered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start text-xs text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2.5 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Architecture & Technology */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">System Architecture</h2>
            <div className="p-6 rounded-2xl glass-card border border-zinc-800 space-y-3">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </section>

          {/* Section 6: Development Process */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Development Lifecycle</h2>
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800/80">
              {project.development}
            </p>
          </section>

          {/* Section 7: Results */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Verified Outcomes</h2>
            <div className="space-y-3">
              {project.results.map((res, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 flex items-start text-xs text-zinc-200">
                  <Check className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Visual Screenshots Preview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Application Preview</h2>
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-8 text-center space-y-4">
              <div className="w-full h-48 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-500 font-mono text-xs">
                [{project.name} UI Screenshot & Architecture Layout]
              </div>
              <p className="text-xs text-zinc-400">
                Interactive production layout for {project.name} ({project.category})
              </p>
            </div>
          </section>

        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-zinc-800 space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              Project Summary
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-zinc-500 block">Product Category</span>
                <span className="text-white font-semibold">{project.category}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Core Stack</span>
                <span className="text-blue-400 font-semibold">{project.technologies.join(', ')}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Client Deliverable</span>
                <span className="text-white font-semibold">Production Software & IP Transfer</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30"
              >
                <span>Build Similar Product</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/portfolio"
                className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl font-semibold text-xs text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Back to Portfolio</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      <CTASection />
    </div>
  );
}
