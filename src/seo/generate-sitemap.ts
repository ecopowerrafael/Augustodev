import fs from "fs";
import path from "path";
import { SEO_CONFIG } from "./seoConfig";

const PUBLIC_DIR = path.join(process.cwd(), "public");

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const currentDate = new Date().toISOString().split("T")[0];

/**
 * Generates the main sitemap index: /sitemap.xml
 */
function generateSitemapIndex() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <sitemap>
      <loc>${SEO_CONFIG.domain}/sitemap-pages.xml</loc>
      <lastmod>${currentDate}</lastmod>
   </sitemap>
   <sitemap>
      <loc>${SEO_CONFIG.domain}/sitemap-products.xml</loc>
      <lastmod>${currentDate}</lastmod>
   </sitemap>
   <sitemap>
      <loc>${SEO_CONFIG.domain}/sitemap-images.xml</loc>
      <lastmod>${currentDate}</lastmod>
   </sitemap>
   <sitemap>
      <loc>${SEO_CONFIG.domain}/sitemap-videos.xml</loc>
      <lastmod>${currentDate}</lastmod>
   </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml.trim(), "utf8");
  console.log("✔ Generated: sitemap.xml");
}

/**
 * Generates pages sitemap: /sitemap-pages.xml
 */
function generatePagesSitemap() {
  const urls = SEO_CONFIG.pages.map(page => {
    // If the path already has a slash, clean up duplicate slashes
    const pagePath = page.path.startsWith("/") ? page.path : `/${page.path}`;
    const cleanUrl = page.path === "/" ? SEO_CONFIG.domain : `${SEO_CONFIG.domain}${pagePath}`;
    return `   <url>
      <loc>${cleanUrl}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
   </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-pages.xml"), xml.trim(), "utf8");
  console.log("✔ Generated: sitemap-pages.xml");
}

/**
 * Generates products sitemap: /sitemap-products.xml
 */
function generateProductsSitemap() {
  const urls = SEO_CONFIG.products.map(prod => {
    const prodPath = prod.path.startsWith("/") ? prod.path : `/${prod.path}`;
    return `   <url>
      <loc>${SEO_CONFIG.domain}${prodPath}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${prod.changefreq}</changefreq>
      <priority>${prod.priority}</priority>
   </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-products.xml"), xml.trim(), "utf8");
  console.log("✔ Generated: sitemap-products.xml");
}

/**
 * Generates images sitemap: /sitemap-images.xml
 */
function generateImagesSitemap() {
  const imagesXml = SEO_CONFIG.images.map(img => {
    return `  <url>
    <loc>${SEO_CONFIG.domain}/</loc>
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imagesXml}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-images.xml"), xml.trim(), "utf8");
  console.log("✔ Generated: sitemap-images.xml");
}

/**
 * Generates videos sitemap: /sitemap-videos.xml
 */
function generateVideosSitemap() {
  const videosXml = SEO_CONFIG.videos.map(vid => {
    return `  <url>
    <loc>${vid.loc}</loc>
    <video:video>
      <video:thumbnail_loc>${vid.thumbnail_loc}</video:thumbnail_loc>
      <video:title>${escapeXml(vid.title)}</video:title>
      <video:description>${escapeXml(vid.description)}</video:description>
      <video:content_loc>${vid.content_loc}</video:content_loc>
      <video:duration>${vid.duration}</video:duration>
      <video:publication_date>${vid.publication_date}</video:publication_date>
    </video:video>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videosXml}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-videos.xml"), xml.trim(), "utf8");
  console.log("✔ Generated: sitemap-videos.xml");
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

// Execute sitemap generators
console.log("🚀 Starting Automatic SEO Sitemap Generation...");
generateSitemapIndex();
generatePagesSitemap();
generateProductsSitemap();
generateImagesSitemap();
generateVideosSitemap();
console.log("🎉 SEO Sitemaps Generated Successfully!");
