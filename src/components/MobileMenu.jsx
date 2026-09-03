'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';

export default function MobileMenu({ isOpen, onClose }) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 animate-in fade-in duration-200">
      {/* Header top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <Link href="/" onClick={onClose} className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-purple-950/40 p-0.5 border border-purple-500/30 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="RB-Tech Logo"
              width={28}
              height={28}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">RB-Tech</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close Mobile Navigation Menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Menu scroll area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        <nav className="flex flex-col space-y-3">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-900"
          >
            Home
          </Link>

          {/* Services Collapsible Accordion */}
          <div className="border-b border-zinc-900 py-2">
            <button
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="flex items-center justify-between w-full text-lg font-medium text-zinc-200 hover:text-purple-400 py-1"
            >
              <span>Services</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${servicesExpanded ? 'rotate-180 text-purple-400' : 'text-zinc-500'}`} />
            </button>
            {servicesExpanded && (
              <div className="pl-4 mt-2 space-y-2 border-l-2 border-purple-600/30 my-2">
                <Link
                  href="/services"
                  onClick={onClose}
                  className="block text-sm font-semibold text-purple-400 hover:underline py-1"
                >
                  All Services Overview →
                </Link>
                {services.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    onClick={onClose}
                    className="block text-sm text-zinc-400 hover:text-white py-1"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            onClick={onClose}
            className="text-lg font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-900"
          >
            Portfolio
          </Link>
          <Link
            href="/process"
            onClick={onClose}
            className="text-lg font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-900"
          >
            Process
          </Link>
          <Link
            href="/pricing"
            onClick={onClose}
            className="text-lg font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-900"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="text-lg font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-900"
          >
            About
          </Link>
          <Link
            href="/blog"
            onClick={onClose}
            className="text-lg font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-900"
          >
            Blog
          </Link>
          <Link
            href="/faq"
            onClick={onClose}
            className="text-lg font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-900"
          >
            FAQ
          </Link>
        </nav>

        {/* Action Button */}
        <div className="pt-6">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-600/30"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
