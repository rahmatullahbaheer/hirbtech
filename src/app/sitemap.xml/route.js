import { services } from '@/data/services';
import { portfolioProjects } from '@/data/portfolio';
import { blogPosts } from '@/data/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rbtech.dev";

export async function GET() {
  const staticPages = [
    "",
    "/services",
    "/portfolio",
    "/about",
    "/process",
    "/pricing",
    "/blog",
    "/contact",
    "/faq",
    "/estimator",
    "/privacy",
    "/terms"
  ];

  const servicePages = services.map(s => `/services/${s.slug}`);
  const portfolioPages = portfolioProjects.map(p => `/portfolio/${p.slug}`);
  const blogPages = blogPosts.map(b => `/blog/${b.slug}`);

  const allPages = [...staticPages, ...servicePages, ...portfolioPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${page === "" ? "daily" : "weekly"}</changefreq>
      <priority>${page === "" ? "1.0" : page.startsWith("/services") ? "0.9" : "0.8"}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
