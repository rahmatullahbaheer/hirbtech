'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { blogPosts, blogCategories } from '@/data/blog';
import { ArrowRight, Calendar, Clock, User, Search } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbItems = [
    { name: "Blog", path: "/blog" }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Engineering & Software Insights
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          RB-Tech Tech Blog
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Practical guides, architectural analysis, technology comparisons, and technical insights written by RB-Tech software engineers.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-6">
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles (e.g. SaaS, Flutter, AI, cost)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-zinc-400 text-sm">
            No articles found matching your criteria.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between h-full group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-semibold">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-zinc-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 flex items-center">
                  <Calendar className="w-3 h-3 mr-1 text-zinc-400" />
                  {post.publishDate}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 group/link"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <CTASection />
    </div>
  );
}
