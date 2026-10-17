import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Final CTA Banner */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-blue-900/40">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Have a project in mind?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Let&apos;s turn your software ideas into high-performing digital reality.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 flex items-center whitespace-nowrap"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-purple-950/40 p-0.5 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-900/30">
                <Image
                  src="/logo.png"
                  alt="RB-Tech Logo"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight group-hover:text-purple-400 transition-colors">RB-Tech</span>
            </Link>

            <p className="text-sm font-semibold text-blue-400">
              Build. Scale. Succeed.
            </p>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              RB-Tech is a software development company building modern websites, web applications, mobile apps, desktop software, SaaS platforms, e-commerce solutions, APIs and AI-powered products.
            </p>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/web-development" className="hover:text-blue-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/web-app-development" className="hover:text-blue-400 transition-colors">
                  Web Apps
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development" className="hover:text-blue-400 transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services/desktop-app-development" className="hover:text-blue-400 transition-colors">
                  Desktop Apps
                </Link>
              </li>
              <li>
                <Link href="/services/saas-development" className="hover:text-blue-400 transition-colors">
                  SaaS Platforms
                </Link>
              </li>
              <li>
                <Link href="/services/ai-development" className="hover:text-blue-400 transition-colors">
                  AI Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About RB-Tech
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-400 transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-blue-400 transition-colors">
                  Development Process
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing & Scope
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Tech Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="hover:text-blue-400 transition-colors">
                  Project Scope Estimator
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors text-zinc-500">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <div>
            © {new Date().getFullYear()} RB-Tech. All rights reserved. Build. Scale. Succeed.
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
