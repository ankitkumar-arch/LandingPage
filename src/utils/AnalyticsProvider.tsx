"use client";
import React, { useEffect } from "react";
import Script from "next/script";

interface AnalyticsProviderProps {
  gtagId?: string;
  gtmId?: string;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ gtagId, gtmId }) => {
  useEffect(() => {
    if (gtagId && typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", gtagId);
    }
  }, [gtagId]);

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {/* Google Analytics (Gtag.js) */}
      {gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtagId}');
            `}
          </Script>
        </>
      )}
    </>
  );
};

export default AnalyticsProvider;
