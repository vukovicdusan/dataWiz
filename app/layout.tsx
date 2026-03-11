import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const titilium = Titillium_Web({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataWiz",
  description:
    "Welcome to DataWiz, where data meets insight and transforms your digital world.",
  verification: {
    other: { "facebook-domain-verification": "xr5b757smcignim4zuexkq0b2guxko" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Cookiebot */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="dd7e32ed-af68-45ca-9674-a44996d2d53c"
          data-consentmode="disabled"
          type="text/javascript"
          async
        ></script>

        {/* Default Consent  */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                personalization_storage: 'denied',
                functionality_storage: 'denied',
                security_storage: 'granted'
              });
            `,
          }}
        />

        {/* Consent listener + GTM loader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        function loadGTM() {
          if (window.__gtmLoaded) return;
          window.__gtmLoaded = true;

          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5C5RQSK');
        }

        function applyCookiebotConsent() {
          if (!window.Cookiebot || !window.Cookiebot.consent) return;

          var C = window.Cookiebot.consent;

          gtag("consent", "update", {
            analytics_storage: C.statistics ? "granted" : "denied",
            ad_storage: C.marketing ? "granted" : "denied",
            ad_user_data: C.marketing ? "granted" : "denied",
            ad_personalization: C.marketing ? "granted" : "denied",
            personalization_storage: C.preferences ? "granted" : "denied",
            functionality_storage: C.preferences ? "granted" : "denied"
          });

          loadGTM();
        }

        window.addEventListener("CookiebotOnLoad", applyCookiebotConsent);
        window.addEventListener("CookiebotOnConsentReady", applyCookiebotConsent);
        window.addEventListener("CookiebotOnAccept", applyCookiebotConsent);
        window.addEventListener("CookiebotOnDecline", applyCookiebotConsent);
      })();
    `,
          }}
        />
      </head>

      <body className={`${titilium.className} bg-primaryBg`}>
        <Header />
        <main className="overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
