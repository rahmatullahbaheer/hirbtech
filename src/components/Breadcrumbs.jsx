import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-zinc-400 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-blue-400 transition-colors"
            title="Return to Home"
          >
            <Home className="w-4 h-4 mr-1" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path || index} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-zinc-600 mx-1 flex-shrink-0" />
              {isLast ? (
                <span className="text-zinc-100 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-blue-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
