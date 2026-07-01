import React, { useEffect } from "react";

// Track configuration IDs
export const ANALYTICS_CONFIG = {
  gtmId: "GTM-XXXXXXX",
  gaId: "G-XXXXXXXXXX",
  metaPixelId: "XXXXXXXXXXXXXXXX",
  clarityId: "xxxxxxxxxx",
  merchantId: "XXXXXXXXX"
};

/**
 * AnalyticsProvider Component
 * Programmatically initializes standard tracking engines at runtime.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    // 1. Google Tag Manager (GTM)
    if (ANALYTICS_CONFIG.gtmId && !window.hasOwnProperty("dataLayer")) {
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.gtmId}');
      `;
      document.head.appendChild(gtmScript);
      
      // GTM NoScript Fallback
      const gtmNoScript = document.createElement("noscript");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.gtmId}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      gtmNoScript.appendChild(iframe);
      document.body.appendChild(gtmNoScript);
    }

    // 2. Google Analytics (GA4)
    if (ANALYTICS_CONFIG.gaId) {
      const gaScript = document.createElement("script");
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.gaId}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaInitScript = document.createElement("script");
      gaInitScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${ANALYTICS_CONFIG.gaId}', { 'anonymize_ip': true });
      `;
      document.head.appendChild(gaInitScript);
    }

    // 3. Meta Pixel
    if (ANALYTICS_CONFIG.metaPixelId) {
      const pixelScript = document.createElement("script");
      pixelScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${ANALYTICS_CONFIG.metaPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(pixelScript);

      const pixelNoScript = document.createElement("noscript");
      const img = document.createElement("img");
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      img.src = `https://www.facebook.com/tr?id=${ANALYTICS_CONFIG.metaPixelId}&ev=PageView&noscript=1`;
      pixelNoScript.appendChild(img);
      document.body.appendChild(pixelNoScript);
    }

    // 4. Microsoft Clarity
    if (ANALYTICS_CONFIG.clarityId) {
      const clarityScript = document.createElement("script");
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${ANALYTICS_CONFIG.clarityId}");
      `;
      document.head.appendChild(clarityScript);
    }

  }, []);

  return <>{children}</>;
}

/**
 * Event Tracking Helper Utility
 * Can be called throughout the app to fire rich custom tracking analytics (e.g. Lead, Contact).
 */
export function trackCustomEvent(eventName: string, params: object = {}) {
  if (typeof window === "undefined") return;

  // Track on Google Analytics
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }

  // Track on Meta Pixel
  const fbq = (window as any).fbq;
  if (typeof fbq === "function") {
    fbq("track", eventName, params);
  }

  console.log(`[Analytics] Event tracked: ${eventName}`, params);
}

/**
 * Sends and registers pages with Bing/Yandex indexer index engines using IndexNow.
 */
export async function pingIndexNow(url: string) {
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        host: "augustodev.com",
        key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // IndexNow Verification key
        keyLocation: "https://augustodev.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.txt",
        urlList: [url]
      })
    });
    console.log(`[IndexNow] Ping status for ${url}:`, response.status);
  } catch (err) {
    console.error("[IndexNow] Error pinging:", err);
  }
}
