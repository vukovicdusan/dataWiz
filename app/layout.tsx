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

          /* 1) Always set denied default immediately */
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'denied',
            security_storage: 'granted',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 1500
          });

          (function () {
            var GTM_ID = 'GTM-5C5RQSK';
            var gtmLoaded = false;
            var gtmLoadScheduled = false;
            var lastAppliedConsentKey = null;

            function getCookie(name) {
              var match = document.cookie.match(
                new RegExp(
                  "(?:^|;\\s*)" +
                    name.replace(/[.*+?^\${}()|[\]\\]/g, "\\$&") +
                    "=([^;]*)"
                )
              );
              return match ? decodeURIComponent(match[1]) : null;
            }


            function readCookiebotConsentCookie() {
              var raw = getCookie('CookieConsent');

              var consent = {
                hasResponse: false,
                preferences: false,
                statistics: false,
                marketing: false
              };

              if (!raw) return consent;

              consent.hasResponse = true;
              consent.preferences = /(?:^|[,{])preferences:true(?:[},]|$)/.test(raw);
              consent.statistics  = /(?:^|[,{])statistics:true(?:[},]|$)/.test(raw);
              consent.marketing   = /(?:^|[,{])marketing:true(?:[},]|$)/.test(raw);

              return consent;
            }

            function getConsentKey(consent) {
              return [
                consent.hasResponse,
                consent.preferences,
                consent.statistics,
                consent.marketing
              ].join('|');
            }

            function pushConsentUpdateFromCookie() {
              var c = readCookiebotConsentCookie();
              if (!c.hasResponse) return c;

              var consentKey = getConsentKey(c);
              if (consentKey === lastAppliedConsentKey) return c;

              lastAppliedConsentKey = consentKey;

              gtag('consent', 'update', {
                ad_storage:            c.marketing   ? 'granted' : 'denied',
                analytics_storage:     c.statistics  ? 'granted' : 'denied',
                functionality_storage: c.preferences ? 'granted' : 'denied',
                security_storage:      'granted',
                ad_user_data:          c.marketing   ? 'granted' : 'denied',
                ad_personalization:    c.marketing   ? 'granted' : 'denied'
              });

              return c;
            }

            function shouldLoadGTM(c) {
              return c.hasResponse;
              /* If you only want GTM when at least one optional category is granted, use this instead:
              return c.marketing || c.statistics || c.preferences;
              */
            }

            function loadGTM() {
              if (gtmLoaded) return;

              gtmLoadScheduled = false;
              gtmLoaded = true;

              (function(w,d,s,l,i){
                w[l] = w[l] || [];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });

                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l !== 'dataLayer' ? '&l=' + l : '';

                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', GTM_ID);
            }

            function updateConsentAndMaybeLoadGTM() {
              var c = pushConsentUpdateFromCookie();

              /* Never load GTM until CookieConsent cookie exists */
              if (!c.hasResponse) return;

              /* Queue consent update first, then load GTM */
              if (shouldLoadGTM(c)) {
                if (gtmLoaded || gtmLoadScheduled) return;
                gtmLoadScheduled = true;
                setTimeout(loadGTM, 0);
              }
            }

            /* Returning visitor or freshly submitted consent now ready */
            window.addEventListener('CookiebotOnConsentReady', function () {
              updateConsentAndMaybeLoadGTM();
            });

            /* Fresh accept */
            window.addEventListener('CookiebotOnAccept', function () {
              updateConsentAndMaybeLoadGTM();
            });

            /* Fresh decline */
            window.addEventListener('CookiebotOnDecline', function () {
              updateConsentAndMaybeLoadGTM();
            });

            /* Extra safety check in case consent cookie already exists before events are observed */
            if (getCookie('CookieConsent')) {
              updateConsentAndMaybeLoadGTM();
            }
          })();`,
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
