"use client";

import Image from "next/image";

/**
 * CaseStudyTechStack
 *
 * Visar tech stack med loggor från /public/logos/.
 * Återanvänder loggor från IntegrationBuilder.
 */

// Mappar system-ID till namn och logga
const techLogos = {
  // CRM
  salesforce: { name: "Salesforce", logo: "/logos/salesforce.svg" },
  hubspot: { name: "HubSpot", logo: "/logos/hubspot.svg" },
  pipedrive: { name: "Pipedrive", logo: "/logos/pipedrive.svg" },

  // Ekonomi
  fortnox: { name: "Fortnox", logo: "/logos/fortnox.svg" },
  monitor: { name: "Monitor ERP", logo: "/logos/monitor.svg" },
  visma: { name: "Visma", logo: "/logos/visma.svg" },

  // Kommunikation
  slack: { name: "Slack", logo: "/logos/slack.svg" },
  teams: { name: "Microsoft Teams", logo: "/logos/teams.svg" },
  whatsapp: { name: "WhatsApp", logo: "/logos/whatsapp.svg" },
  gmail: { name: "Gmail", logo: "/logos/gmail.svg" },
  outlook: { name: "Outlook", logo: "/logos/outlook.svg" },
  discord: { name: "Discord", logo: "/logos/discord.svg" },
  linkedin: { name: "LinkedIn", logo: "/logos/linkedin.svg" },

  // Lagring
  "google-drive": { name: "Google Drive", logo: "/logos/google-drive.svg" },
  onedrive: { name: "OneDrive", logo: "/logos/onedrive.svg" },
  dropbox: { name: "Dropbox", logo: "/logos/dropbox.svg" },
  "google-sheets": { name: "Google Sheets", logo: "/logos/google-sheets.svg" },
  excel: { name: "Excel", logo: "/logos/excel.svg" },

  // Projekthantering
  notion: { name: "Notion", logo: "/logos/notion.svg" },
  trello: { name: "Trello", logo: "/logos/trello.svg" },
  jira: { name: "Jira", logo: "/logos/jira.svg" },
  asana: { name: "Asana", logo: "/logos/asana.svg" },
  monday: { name: "Monday.com", logo: "/logos/monday.svg" },
  clickup: { name: "ClickUp", logo: "/logos/clickup.svg" },
  airtable: { name: "Airtable", logo: "/logos/airtable.svg" },

  // Support
  zendesk: { name: "Zendesk", logo: "/logos/zendesk.svg" },
  freshdesk: { name: "Freshdesk", logo: "/logos/freshdesk.svg" },
  intercom: { name: "Intercom", logo: "/logos/intercom.svg" },

  // Betalningar
  stripe: { name: "Stripe", logo: "/logos/stripe.svg" },
  klarna: { name: "Klarna", logo: "/logos/klarna.svg" },
  swish: { name: "Swish", logo: "/logos/swish.svg" },

  // Automation
  zapier: { name: "Zapier", logo: "/logos/zapier.svg" },
  make: { name: "Make", logo: "/logos/make.svg" },
  n8n: { name: "n8n", logo: "/logos/n8n.svg" },

  // AI
  openai: { name: "OpenAI", logo: "/logos/openai.svg" },
  anthropic: { name: "Anthropic", logo: "/logos/anthropic.webp" },
  gemini: { name: "Gemini", logo: "/logos/gemini.svg" },
  perplexity: { name: "Perplexity", logo: "/logos/perplexity.svg" },

  // E-handel
  shopify: { name: "Shopify", logo: "/logos/shopify.svg" },
  woocommerce: { name: "WooCommerce", logo: "/logos/woocommerce.svg" },

  // Schemaläggning
  calendly: { name: "Calendly", logo: "/logos/calendly.svg" },
  "google-calendar": { name: "Google Calendar", logo: "/logos/google-calendar.svg" },
};

export function CaseStudyTechStack({ tools = "", className = "" }) {
  if (!tools) return null;

  // Splitta på komma och filtrera tomma
  const toolIds = tools.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);

  if (toolIds.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {toolIds.map((toolId) => {
        const tool = techLogos[toolId];

        if (!tool) {
          // Fallback för okända verktyg - visa bara text
          return (
            <div
              key={toolId}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100"
            >
              <span className="text-sm text-gray-700 capitalize">{toolId}</span>
            </div>
          );
        }

        return (
          <div
            key={toolId}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors"
          >
            <div className="relative w-5 h-5 flex-shrink-0">
              <Image
                src={tool.logo}
                alt={tool.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm text-gray-700">{tool.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CaseStudyTechStack;
