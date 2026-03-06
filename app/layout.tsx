import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GtmRouteTracker from "@/components/GTMRouteTracker";

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
      {/* <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function (w, d) {
  var CONFIG = {
    cbid: "dd7e32ed-af68-45ca-9674-a44996d2d53c",
    gtmId: "GTM-5C5RQSK",
    loadGtmOn: ["statistics", "marketing"]
  };

  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };

  w.__gtmLoaded = false;
  w.__lastConsentState = "";

  function hasAnyRequiredConsent(consent) {
    return CONFIG.loadGtmOn.some(function (key) {
      return !!consent[key];
    });
  }

  function loadGTM() {
    if (w.__gtmLoaded || !CONFIG.gtmId) return;
    w.__gtmLoaded = true;

    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js"
      });
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!="dataLayer" ? "&l="+l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j,f);
    })(w,d,"script","dataLayer",CONFIG.gtmId);
  }

  function updateConsentFromCookiebot() {
    if (!w.Cookiebot || !w.Cookiebot.consent) return false;

    var C = w.Cookiebot.consent;

    var state = JSON.stringify({
      preferences: !!C.preferences,
      statistics: !!C.statistics,
      marketing: !!C.marketing
    });

    if (state === w.__lastConsentState) return true;
    w.__lastConsentState = state;

    w.gtag("consent", "update", {
      functionality_storage: C.preferences ? "granted" : "denied",
      personalization_storage: C.preferences ? "granted" : "denied",
      analytics_storage: C.statistics ? "granted" : "denied",
      ad_storage: C.marketing ? "granted" : "denied",
      ad_user_data: C.marketing ? "granted" : "denied",
      ad_personalization: C.marketing ? "granted" : "denied",
      security_storage: "granted"
    });

    if (hasAnyRequiredConsent(C)) {
      loadGTM();
    }

    return true;
  }

  w.gtag("consent", "default", {
    functionality_storage: "denied",
    personalization_storage: "denied",
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    security_storage: "granted"
  });

  var cb = d.createElement("script");
  cb.id = "Cookiebot";
  cb.src = "https://consent.cookiebot.com/uc.js";
  cb.async = true;
  cb.type = "text/javascript";
  cb.setAttribute("data-cbid", CONFIG.cbid);
  cb.setAttribute("data-consentmode", "disabled");
  d.head.appendChild(cb);

  w.addEventListener("CookiebotOnConsentReady", updateConsentFromCookiebot);
  w.addEventListener("CookiebotOnAccept", updateConsentFromCookiebot);
  w.addEventListener("CookiebotOnDecline", updateConsentFromCookiebot);
})(window, document);
            `,
          }}
        />
      </head> */}

      <body className={`${titilium.className} bg-primaryBg`}>
        {/* <GtmRouteTracker /> */}
        <Header />
        <main className="overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
