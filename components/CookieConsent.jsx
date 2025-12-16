"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import {
  run,
  showPreferences,
  acceptCategory,
  reset,
  acceptedCategory,
} from "vanilla-cookieconsent";

// Google Consent Mode v2 - krävs sedan mars 2024 för EU-trafik
function initGoogleConsentMode() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Sätt default consent till denied (GDPR-krav)
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted", // Säkerhet är alltid tillåtet
  });
}

// Uppdatera Google Consent Mode baserat på användarens val
function updateGoogleConsent() {
  if (typeof window.gtag !== "function") return;

  const analyticsAccepted = acceptedCategory("analytics");
  const marketingAccepted = acceptedCategory("marketing");
  const functionalityAccepted = acceptedCategory("functionality");

  window.gtag("consent", "update", {
    analytics_storage: analyticsAccepted ? "granted" : "denied",
    ad_storage: marketingAccepted ? "granted" : "denied",
    ad_user_data: marketingAccepted ? "granted" : "denied",
    ad_personalization: marketingAccepted ? "granted" : "denied",
    functionality_storage: functionalityAccepted ? "granted" : "denied",
    personalization_storage: functionalityAccepted ? "granted" : "denied",
  });
}

export function CookieConsentBanner() {
  useEffect(() => {
    // Initiera Google Consent Mode INNAN cookie consent
    initGoogleConsentMode();

    run({
      // Callbacks för Google Consent Mode v2
      onFirstConsent: () => {
        updateGoogleConsent();
      },
      onConsent: () => {
        updateGoogleConsent();
      },
      onChange: () => {
        updateGoogleConsent();
      },

      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom left",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "left",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: false,
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
              { name: /^_gat/ },
              { name: "__utma" },
              { name: "__utmb" },
              { name: "__utmc" },
              { name: "__utmz" },
            ],
          },
        },
        functionality: {
          enabled: false,
        },
        marketing: {
          enabled: false,
          autoClear: {
            cookies: [
              { name: /^_fbp/ },
              { name: /^_fbc/ },
              { name: /^fr/ },
            ],
          },
        },
      },

      language: {
        default: "sv",
        translations: {
          sv: {
            consentModal: {
              title: "Vi använder cookies",
              description:
                'Vi använder cookies för att förbättra din upplevelse på vår webbplats. Vissa cookies är nödvändiga för att webbplatsen ska fungera, medan andra hjälper oss att förstå hur du använder sajten. Du kan läsa mer i vår <a href="/cookies">cookie policy</a> och <a href="/integritetspolicy">integritetspolicy</a>.',
              acceptAllBtn: "Acceptera alla",
              acceptNecessaryBtn: "Endast nödvändiga",
              showPreferencesBtn: "Hantera inställningar",
            },
            preferencesModal: {
              title: "Cookie-inställningar",
              acceptAllBtn: "Acceptera alla",
              acceptNecessaryBtn: "Endast nödvändiga",
              savePreferencesBtn: "Spara inställningar",
              closeIconLabel: "Stäng",
              serviceCounterLabel: "Tjänst(er)",
              sections: [
                {
                  title: "Cookie-användning",
                  description:
                    "Vi använder cookies för att säkerställa grundläggande funktioner på webbplatsen och för att förbättra din upplevelse. Du kan välja vilka kategorier av cookies du vill tillåta.",
                },
                {
                  title: "Nödvändiga cookies",
                  description:
                    "Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. De kan inte stängas av i våra system.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    caption: "Lista över nödvändiga cookies",
                    headers: {
                      name: "Namn",
                      description: "Beskrivning",
                      duration: "Varaktighet",
                    },
                    body: [
                      {
                        name: "cc_cookie",
                        description: "Lagrar dina cookie-preferenser",
                        duration: "6 månader",
                      },
                    ],
                  },
                },
                {
                  title: "Analytiska cookies",
                  description:
                    "Dessa cookies hjälper oss att förstå hur besökare använder webbplatsen genom att samla in och rapportera information anonymt.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    caption: "Lista över analytiska cookies",
                    headers: {
                      name: "Namn",
                      domain: "Tjänst",
                      description: "Beskrivning",
                      duration: "Varaktighet",
                    },
                    body: [
                      {
                        name: "_ga",
                        domain: "Google Analytics",
                        description:
                          "Används för att särskilja användare och sessioner",
                        duration: "2 år",
                      },
                      {
                        name: "_gid",
                        domain: "Google Analytics",
                        description: "Används för att särskilja användare",
                        duration: "24 timmar",
                      },
                      {
                        name: "_gat",
                        domain: "Google Analytics",
                        description:
                          "Används för att begränsa antalet förfrågningar",
                        duration: "1 minut",
                      },
                    ],
                  },
                },
                {
                  title: "Funktionella cookies",
                  description:
                    "Dessa cookies gör det möjligt att erbjuda förbättrad funktionalitet och anpassning, som språkinställningar och UI-preferenser.",
                  linkedCategory: "functionality",
                },
                {
                  title: "Marknadsföringscookies",
                  description:
                    "Dessa cookies används för att spåra besökare över webbplatser för att visa relevanta annonser. De kan sättas av våra annonspartners.",
                  linkedCategory: "marketing",
                  cookieTable: {
                    caption: "Lista över marknadsföringscookies",
                    headers: {
                      name: "Namn",
                      domain: "Tjänst",
                      description: "Beskrivning",
                      duration: "Varaktighet",
                    },
                    body: [
                      {
                        name: "_fbp",
                        domain: "Meta (Facebook)",
                        description:
                          "Används för att leverera annonser och mäta deras effektivitet",
                        duration: "3 månader",
                      },
                    ],
                  },
                },
                {
                  title: "Mer information",
                  description:
                    'För frågor om hur vi hanterar cookies, kontakta oss på <a href="mailto:info@flexra.se">info@flexra.se</a>. Läs mer i vår <a href="/cookies">cookie policy</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}

// Exportera funktioner för att öppna cookie-inställningar manuellt
export const showCookiePreferences = () => {
  showPreferences();
};

export const acceptAllCookies = () => {
  acceptCategory("all");
};

export const resetCookieConsent = () => {
  reset(true);
};
