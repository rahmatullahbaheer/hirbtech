const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rbtech.dev";

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin/

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
