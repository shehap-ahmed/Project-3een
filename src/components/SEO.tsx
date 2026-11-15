import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogType?: 'website' | 'article';
  ogImage?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = 'Project 3een';
const DEFAULT_IMAGE_PATH = '/learnarabic-logo_1.png';

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function getSiteOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return 'https://project-3een.vercel.app';
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  noindex = false,
  nofollow = false,
  ogType = 'website',
  ogImage,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    const origin = getSiteOrigin();
    const rawPath = canonicalPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
    const normalizedPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
    const canonicalUrl = `${origin}${normalizedPath}`;
    const imageUrl = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : `${origin}${ogImage}`
      : `${origin}${DEFAULT_IMAGE_PATH}`;

    document.title = title;

    upsertMetaTag('name', 'description', description);
    if (keywords) {
      upsertMetaTag('name', 'keywords', keywords);
    }

    const robotsContent = noindex
      ? `noindex, ${nofollow ? 'nofollow' : 'follow'}`
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    upsertMetaTag('name', 'robots', robotsContent);

    if (!noindex) {
      upsertCanonicalLink(canonicalUrl);
    } else {
      const existingCanonical = document.head.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }
    }

    // Open Graph
    upsertMetaTag('property', 'og:type', ogType);
    upsertMetaTag('property', 'og:site_name', SITE_NAME);
    upsertMetaTag('property', 'og:locale', 'en_US');
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:image', imageUrl);
    upsertMetaTag('property', 'og:image:alt', `${SITE_NAME} – Learn Arabic Online`);

    // Twitter Cards
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', imageUrl);
    upsertMetaTag('name', 'twitter:image:alt', `${SITE_NAME} – Learn Arabic Online`);

    // Structured Data (JSON-LD)
    const existingScripts = document.head.querySelectorAll('script[type="application/ld+json"][data-seo-jsonld="true"]');
    existingScripts.forEach((node) => node.remove());

    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      const payload = Array.isArray(structuredData)
        ? { '@context': 'https://schema.org', '@graph': structuredData }
        : structuredData;
      script.textContent = JSON.stringify(payload);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonicalPath, noindex, nofollow, ogType, ogImage, structuredData]);

  return null;
}
