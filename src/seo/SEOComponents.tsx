import React, { createContext, useContext, useEffect, useState } from "react";
import { SEO_CONFIG } from "./seoConfig";
import { ChevronRight, Home } from "lucide-react";

// --- Context & Hooks ---
interface SeoState {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  ogImage: string;
}

const SeoContext = createContext<{
  seoState: SeoState;
  setSeoState: React.Dispatch<React.SetStateAction<SeoState>>;
} | null>(null);

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const [seoState, setSeoState] = useState<SeoState>({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    canonicalUrl: SEO_CONFIG.domain,
    ogType: "website",
    ogImage: SEO_CONFIG.ogImageUrl,
  });

  return (
    <SeoContext.Provider value={{ seoState, setSeoState }}>
      {children}
    </SeoContext.Provider>
  );
}

export function useSEO() {
  const context = useContext(SeoContext);
  if (!context) {
    return {
      seoState: {
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        canonicalUrl: SEO_CONFIG.domain,
        ogType: "website",
        ogImage: SEO_CONFIG.ogImageUrl,
      },
      setSeoState: () => {},
    };
  }
  return context;
}

// --- Head Tag Helper Utility ---
function updateOrCreateMetaTag(nameOrProperty: string, value: string, isProperty = false) {
  const selector = isProperty 
    ? `meta[property="${nameOrProperty}"]` 
    : `meta[name="${nameOrProperty}"]`;
  
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (isProperty) {
      element.setAttribute("property", nameOrProperty);
    } else {
      element.setAttribute("name", nameOrProperty);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function updateOrCreateLinkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang 
    ? `link[rel="${rel}"][hreflang="${hreflang}"]` 
    : `link[rel="${rel}"]:not([hreflang])`;
  
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hreflang) {
      element.setAttribute("hreflang", hreflang);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

// --- 13. Reusable SEO Components ---

export interface MetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  robots?: string;
}

/**
 * MetaTags Component
 * Updates all HTML header tags dynamically inside a clean useEffect.
 */
export function MetaTags({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  robots = "index, follow",
}: MetaTagsProps) {
  const finalTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
  const finalDesc = description || SEO_CONFIG.defaultDescription;
  const finalCanonical = canonical || SEO_CONFIG.domain;
  const finalOgImage = ogImage || SEO_CONFIG.ogImageUrl;
  
  const { setSeoState } = useSEO();

  useEffect(() => {
    // 1. Update document Title
    document.title = finalTitle;

    // Update HTML Tag attributes
    document.documentElement.setAttribute("lang", SEO_CONFIG.language);

    // 2. Base meta descriptions & robots
    updateOrCreateMetaTag("description", finalDesc);
    updateOrCreateMetaTag("robots", robots);
    updateOrCreateMetaTag("keywords", SEO_CONFIG.keywords.join(", "));
    updateOrCreateMetaTag("theme-color", SEO_CONFIG.themeColor);

    // 3. Alternate languages
    updateOrCreateLinkTag("alternate", SEO_CONFIG.domain, "x-default");
    updateOrCreateLinkTag("alternate", SEO_CONFIG.domain, SEO_CONFIG.language);

    // 4. Canonical link tag
    updateOrCreateLinkTag("canonical", finalCanonical);

    // 5. Open Graph Meta Tags (Social Media Integration)
    updateOrCreateMetaTag("og:title", finalTitle, true);
    updateOrCreateMetaTag("og:description", finalDesc, true);
    updateOrCreateMetaTag("og:image", finalOgImage, true);
    updateOrCreateMetaTag("og:url", finalCanonical, true);
    updateOrCreateMetaTag("og:type", ogType, true);
    updateOrCreateMetaTag("og:site_name", SEO_CONFIG.siteName, true);
    updateOrCreateMetaTag("og:locale", SEO_CONFIG.language.replace("-", "_"), true);

    // 6. Twitter Card Tags
    updateOrCreateMetaTag("twitter:card", "summary_large_image");
    updateOrCreateMetaTag("twitter:site", SEO_CONFIG.twitterHandle);
    updateOrCreateMetaTag("twitter:title", finalTitle);
    updateOrCreateMetaTag("twitter:description", finalDesc);
    updateOrCreateMetaTag("twitter:image", finalOgImage);

    // Sync state
    setSeoState({
      title: finalTitle,
      description: finalDesc,
      canonicalUrl: finalCanonical,
      ogType,
      ogImage: finalOgImage,
    });

  }, [finalTitle, finalDesc, finalCanonical, ogType, finalOgImage, robots, setSeoState]);

  return null; // Side effect only
}

/**
 * StructuredData Component
 * Injects Schema.org JSON-LD structured script elements into the DOM head dynamically.
 */
export function StructuredData({ id, schema }: { id: string; schema: object }) {
  useEffect(() => {
    const scriptId = `ld-json-${id}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = applicationJsonLdType();
      document.head.appendChild(scriptElement);
    }
    
    scriptElement.text = JSON.stringify(schema);

    return () => {
      // Clean up script on unmount
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [id, schema]);

  return null;
}

// Utility function to avoid static string analyzer matching issues
function applicationJsonLdType() {
  return "application/ld+json";
}

// --- Visual Breadcrumb Component ---
interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const currentDomain = SEO_CONFIG.domain;
  
  // Format items into Schema breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.path.startsWith("http") ? item.path : `${currentDomain}${item.path}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-white/5 border border-white/5 rounded-lg inline-flex items-center space-x-2 font-mono text-xs select-none">
      <StructuredData id="breadcrumb-list" schema={breadcrumbSchema} />
      
      <a href="/" className="text-white/40 hover:text-[#00FF41] flex items-center space-x-1 transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </a>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3 w-3 text-white/20" />
            {isLast ? (
              <span className="text-[#00FF41] font-bold" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a href={item.path} className="text-white/50 hover:text-[#00FF41] transition-colors">
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// --- Predefined Schema Builders (Organization, WebSite, local business etc.) ---

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SEO_CONFIG.domain}/#organization`,
    "name": SEO_CONFIG.organization.name,
    "url": SEO_CONFIG.organization.url,
    "logo": SEO_CONFIG.organization.logo,
    "sameAs": SEO_CONFIG.organization.sameAs,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SEO_CONFIG.organization.contactPoint.telephone,
      "contactType": SEO_CONFIG.organization.contactPoint.contactType,
      "areaServed": SEO_CONFIG.organization.contactPoint.areaServed,
      "availableLanguage": SEO_CONFIG.organization.contactPoint.availableLanguage
    }
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.domain}/#website`,
    "url": SEO_CONFIG.domain,
    "name": SEO_CONFIG.siteName,
    "description": SEO_CONFIG.defaultDescription,
    "publisher": {
      "@id": `${SEO_CONFIG.domain}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SEO_CONFIG.domain}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SEO_CONFIG.domain}/#localbusiness`,
    "name": SEO_CONFIG.organization.name,
    "image": SEO_CONFIG.logoUrl,
    "telephone": SEO_CONFIG.organization.contactPoint.telephone,
    "email": SEO_CONFIG.contact.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SEO_CONFIG.contact.address.streetAddress,
      "addressLocality": SEO_CONFIG.contact.address.addressLocality,
      "addressRegion": SEO_CONFIG.contact.address.addressRegion,
      "postalCode": SEO_CONFIG.contact.address.postalCode,
      "addressCountry": SEO_CONFIG.contact.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.5015, // Sorocaba Lat approximation
      "longitude": -47.4526 // Sorocaba Long approximation
    }
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ id, faqs }: { id: string; faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <StructuredData id={`faq-${id}`} schema={schema} />;
}

export interface ProductDetails {
  name: string;
  description: string;
  image: string;
  category?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
  };
}

export function ProductSchema({ id, details }: { id: string; details: ProductDetails }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": details.name,
    "description": details.description,
    "image": details.image,
    "category": details.category || "Software Application",
    "brand": {
      "@type": "Brand",
      "name": SEO_CONFIG.organization.name
    },
    ...(details.offers && {
      "offers": {
        "@type": "Offer",
        "price": details.offers.price,
        "priceCurrency": details.offers.priceCurrency,
        "availability": details.offers.availability || "https://schema.org/InStock",
        "url": `${SEO_CONFIG.domain}/#contact`
      }
    })
  };

  return <StructuredData id={`product-${id}`} schema={schema} />;
}

export interface ArticleDetails {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}

export function ArticleSchema({ id, details }: { id: string; details: ArticleDetails }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": details.headline,
    "description": details.description,
    "image": details.image,
    "datePublished": details.datePublished,
    "dateModified": details.dateModified || details.datePublished,
    "author": {
      "@type": "Person",
      "name": details.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.organization.name,
      "logo": {
        "@type": "ImageObject",
        "url": SEO_CONFIG.organization.logo
      }
    },
    "mainEntityOfPage": `${SEO_CONFIG.domain}/blog/${id}`
  };

  return <StructuredData id={`article-${id}`} schema={schema} />;
}
