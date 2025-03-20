"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding?: boolean;
      }) => void;
      destroyBadge?: () => void;
    };
  }
}

const CalendlyBadgeWidget = () => {
  useEffect(() => {
    const loadCalendlyCSS = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.type = "text/css";
      link.media = "print"; // Load as non-blocking
      link.onload = () => {
        link.media = "all"; // Apply after load
      };
      document.head.appendChild(link);
    };

    const loadCalendlyScript = () => {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.Calendly) {
          window.Calendly.initBadgeWidget({
            url: "https://calendly.com/thedatawiz/30-minute-call",
            text: "Schedule Free </br> Consultation!",
            color: "#2e68dd",
            textColor: "#ffffff",
            branding: undefined,
          });
        }
      };
    };

    // Load CSS and Script
    loadCalendlyCSS();
    loadCalendlyScript();

    return () => {
      if (window.Calendly && window.Calendly.destroyBadge) {
        window.Calendly.destroyBadge();
      }
    };
  }, []);

  return null;
};

export default CalendlyBadgeWidget;
