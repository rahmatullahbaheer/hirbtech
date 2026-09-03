import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto font-mono text-3xl font-extrabold shadow-lg shadow-blue-500/20">
        404
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
        Page Not Found
      </h1>

      <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
        The requested URL or resource could not be found. Explore our software development services or return to the home page.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center shadow-lg shadow-blue-600/30"
        >
          <Home className="w-4 h-4 mr-2" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/services"
          className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}
