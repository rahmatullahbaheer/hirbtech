import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import JsonLd, { getArticleSchema } from '@/components/JsonLd';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rbtech.dev";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishDate
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` }
  ];

  const articleSchema = getArticleSchema(siteUrl, post);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <JsonLd data={articleSchema} />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Article Header */}
      <div className="space-y-6 border-b border-zinc-800 pb-8">
        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            {post.category}
          </span>
          <span className="text-xs text-zinc-400 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-zinc-300 font-medium">
              <User className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {post.publishDate}
            </span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>All Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Body */}
      <article className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-sm leading-relaxed">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-2xl font-bold text-white pt-6 border-t border-zinc-800/60 mt-8">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg font-bold text-blue-400 pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n- ');
            return (
              <ul key={idx} className="space-y-2 pl-4 list-disc text-zinc-300">
                {listItems.map((li, liIdx) => (
                  <li key={liIdx}>{li.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </article>

      {/* CTA Section */}
      <CTASection
        title="Need Technical Guidance for Your Project?"
        subtitle="Discuss software architecture, tech selection, or MVP scope with RB-Tech engineers."
        primaryCtaText="Start Your Project"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
