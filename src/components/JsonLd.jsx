import React from 'react';

export default function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getOrganizationSchema(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RB-Tech",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "RB-Tech is a software development company building modern websites, web applications, mobile apps, desktop software, SaaS platforms, e-commerce solutions, APIs and AI-powered products.",
    "slogan": "Build. Scale. Succeed.",
    "knowsAbout": [
      "Web Development",
      "Web Application Development",
      "Mobile App Development",
      "Desktop Application Development",
      "Custom Software Solutions",
      "SaaS Development",
      "AI Application Development",
      "API Integration",
      "UI/UX Design",
      "Cloud Deployment & DevOps"
    ]
  };
}

export function getServiceSchema(siteUrl, service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "Organization",
      "name": "RB-Tech",
      "url": siteUrl
    },
    "description": service.seoDescription,
    "areaServed": "Global",
    "url": `${siteUrl}/services/${service.slug}`
  };
}

export function getFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(siteUrl, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.path}`
    }))
  };
}

export function getArticleSchema(siteUrl, post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author || "RB-Tech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RB-Tech",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": post.publishDate,
    "url": `${siteUrl}/blog/${post.slug}`
  };
}
