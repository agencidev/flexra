// Integration Builder Data
// System och automationsmål för Flexra

export const categoryLabels = {
  communication: "Kommunikation",
  crm: "CRM",
  accounting: "Ekonomi",
  payments: "Betalningar",
  ecommerce: "E-handel & CMS",
  storage: "Filhantering",
  scheduling: "Schemaläggning",
  procurement: "Inköp",
  management: "Ledning",
  "project-management": "Projekthantering",
  support: "Support",
  other: "Övrigt",
};

export const systems = [
  // Kommunikation
  {
    id: "slack",
    name: "Slack",
    logo: "/logos/slack.svg",
    category: "communication",
    description: "Teamkommunikation i realtid",
    supportedGoals: ["lead-notifications", "task-automation", "workflow-triggers", "report-generation", "inventory-alerts", "executive-dashboard", "budget-tracking", "team-analytics", "supplier-management", "customer-support", "purchase-orders"],
  },
  {
    id: "teams",
    name: "Teams",
    logo: "/logos/teams.svg",
    category: "communication",
    description: "Microsoft Teams för samarbete",
    supportedGoals: ["lead-notifications", "task-automation", "workflow-triggers", "report-generation", "inventory-alerts", "executive-dashboard", "budget-tracking", "team-analytics", "supplier-management", "customer-support", "purchase-orders"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    logo: "/logos/whatsapp.svg",
    category: "communication",
    description: "Direktmeddelanden för kundkontakt",
    supportedGoals: ["lead-notifications", "customer-support"],
  },
  {
    id: "gmail",
    name: "Gmail",
    logo: "/logos/gmail.svg",
    category: "communication",
    description: "E-post från Google",
    supportedGoals: ["lead-notifications", "auto-invoicing", "report-generation", "customer-support", "purchase-orders", "supplier-management", "inventory-alerts", "executive-dashboard", "budget-tracking", "team-analytics"],
  },
  {
    id: "outlook",
    name: "Outlook",
    logo: "/logos/outlook.svg",
    category: "communication",
    description: "E-post från Microsoft",
    supportedGoals: ["lead-notifications", "auto-invoicing", "report-generation", "customer-support", "purchase-orders", "supplier-management", "inventory-alerts", "executive-dashboard", "budget-tracking", "team-analytics", "sync-contacts"],
  },
  {
    id: "googlemeet",
    name: "Google Meet",
    logo: "/logos/googlemeet.svg",
    category: "communication",
    description: "Videomöten från Google",
    supportedGoals: ["workflow-triggers"],
  },
  {
    id: "telegram",
    name: "Telegram",
    logo: "/logos/telegram.svg",
    category: "communication",
    description: "Snabb och säker meddelandeapp",
    supportedGoals: ["lead-notifications", "customer-support", "inventory-alerts", "workflow-triggers"],
  },
  {
    id: "discord",
    name: "Discord",
    logo: "/logos/discord.svg",
    category: "communication",
    description: "Community-plattform för team och grupper",
    supportedGoals: ["lead-notifications", "team-analytics", "workflow-triggers", "customer-support"],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    logo: "/logos/linkedin.svg",
    category: "communication",
    description: "Professionellt nätverk för B2B",
    supportedGoals: ["lead-notifications", "sync-contacts", "workflow-triggers"],
  },

  // CRM
  {
    id: "salesforce",
    name: "Salesforce",
    logo: "/logos/salesforce.svg",
    category: "crm",
    description: "Världens ledande CRM-plattform",
    supportedGoals: ["sync-contacts", "lead-notifications", "task-automation", "report-generation", "customer-support", "executive-dashboard", "team-analytics"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    logo: "/logos/hubspot.svg",
    category: "crm",
    description: "CRM med marknadsföring och försäljning",
    supportedGoals: ["sync-contacts", "lead-notifications", "task-automation", "workflow-triggers", "report-generation", "customer-support", "team-analytics"],
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    logo: "/logos/pipedrive.svg",
    category: "crm",
    description: "Säljfokuserat CRM för små och medelstora företag",
    supportedGoals: ["sync-contacts", "lead-notifications", "task-automation", "workflow-triggers", "report-generation", "team-analytics"],
  },

  // Ekonomi
  {
    id: "fortnox",
    name: "Fortnox",
    logo: "/logos/fortnox.svg",
    category: "accounting",
    description: "Sveriges mest använda bokföringsprogram",
    supportedGoals: ["auto-invoicing", "sync-contacts", "report-generation", "data-backup", "purchase-orders", "supplier-management", "budget-tracking"],
  },
  {
    id: "monitor",
    name: "Monitor",
    logo: "/logos/monitor.svg",
    category: "accounting",
    description: "Komplett affärssystem för tillverkande företag",
    supportedGoals: ["auto-invoicing", "sync-contacts", "report-generation", "data-backup", "purchase-orders", "inventory-alerts", "budget-tracking"],
  },
  {
    id: "visma",
    name: "Visma",
    logo: "/logos/visma.svg",
    category: "accounting",
    description: "Ekonomisystem för växande företag",
    supportedGoals: ["auto-invoicing", "sync-contacts", "report-generation", "data-backup", "purchase-orders", "budget-tracking"],
  },

  // Betalningar
  {
    id: "stripe",
    name: "Stripe",
    logo: "/logos/stripe.svg",
    category: "payments",
    description: "Global betalningsplattform för e-handel",
    supportedGoals: ["auto-invoicing", "sync-contacts", "report-generation", "workflow-triggers"],
  },
  {
    id: "klarna",
    name: "Klarna",
    logo: "/logos/klarna.svg",
    category: "payments",
    description: "Svensk betallösning med delbetalning",
    supportedGoals: ["auto-invoicing", "sync-contacts", "report-generation", "workflow-triggers"],
  },
  {
    id: "swish",
    name: "Swish",
    logo: "/logos/swish.svg",
    category: "payments",
    description: "Sveriges populäraste mobilbetalning",
    supportedGoals: ["auto-invoicing", "workflow-triggers", "report-generation"],
  },

  // E-handel & CMS
  {
    id: "wordpress",
    name: "WordPress",
    logo: "/logos/wordpress.svg",
    category: "ecommerce",
    description: "Världens mest använda CMS",
    supportedGoals: ["sync-contacts", "lead-notifications", "workflow-triggers", "report-generation", "data-backup"],
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    logo: "/logos/woocommerce.svg",
    category: "ecommerce",
    description: "E-handelsplattform för WordPress",
    supportedGoals: ["sync-contacts", "auto-invoicing", "inventory-alerts", "workflow-triggers", "report-generation"],
  },
  {
    id: "shopify",
    name: "Shopify",
    logo: "/logos/shopify.svg",
    category: "ecommerce",
    description: "Komplett e-handelsplattform",
    supportedGoals: ["sync-contacts", "auto-invoicing", "inventory-alerts", "workflow-triggers", "report-generation", "customer-support"],
  },

  // AI & Chatbots
  {
    id: "copilot",
    name: "Microsoft Copilot",
    logo: "/logos/copilot.svg",
    category: "other",
    description: "AI-assistent från Microsoft",
    supportedGoals: ["task-automation", "report-generation", "workflow-triggers", "customer-support"],
  },
  {
    id: "chatbot",
    name: "Chatbot",
    logo: "/logos/chatbot.svg",
    category: "other",
    description: "Anpassad chatbot för kundservice",
    supportedGoals: ["customer-support", "lead-notifications", "workflow-triggers", "sync-contacts"],
  },

  // Filhantering
  {
    id: "googledrive",
    name: "Google Drive",
    logo: "/logos/googledrive.svg",
    category: "storage",
    description: "Molnlagring från Google",
    supportedGoals: ["data-backup", "workflow-triggers", "report-generation"],
  },
  {
    id: "onedrive",
    name: "OneDrive",
    logo: "/logos/onedrive.svg",
    category: "storage",
    description: "Microsofts molnlagring",
    supportedGoals: ["data-backup", "workflow-triggers", "report-generation"],
  },
  {
    id: "dropbox",
    name: "Dropbox",
    logo: "/logos/dropbox.svg",
    category: "storage",
    description: "Enkel fildelning och backup",
    supportedGoals: ["data-backup", "workflow-triggers"],
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    logo: "/logos/excel.svg",
    category: "storage",
    description: "Kalkylark från Microsoft",
    supportedGoals: ["sync-contacts", "report-generation", "data-backup", "inventory-alerts", "executive-dashboard", "budget-tracking", "team-analytics", "supplier-management"],
  },

  // Schemaläggning
  {
    id: "googlecalendar",
    name: "Google Calendar",
    logo: "/logos/googlecalendar.svg",
    category: "scheduling",
    description: "Kalender och schemaläggning",
    supportedGoals: ["workflow-triggers", "task-automation"],
  },
  {
    id: "calendly",
    name: "Calendly",
    logo: "/logos/calendly.svg",
    category: "scheduling",
    description: "Automatisk mötesbokning",
    supportedGoals: ["workflow-triggers", "lead-notifications", "sync-contacts"],
  },

  // Projekthantering
  {
    id: "notion",
    name: "Notion",
    logo: "/logos/notion.svg",
    category: "project-management",
    description: "All-in-one arbetsyta",
    supportedGoals: ["task-automation", "sync-contacts", "workflow-triggers", "executive-dashboard", "team-analytics", "report-generation"],
  },
  {
    id: "trello",
    name: "Trello",
    logo: "/logos/trello.svg",
    category: "project-management",
    description: "Visuell projekthantering med kort",
    supportedGoals: ["task-automation", "workflow-triggers", "team-analytics"],
  },
  {
    id: "jira",
    name: "Jira",
    logo: "/logos/jira.svg",
    category: "project-management",
    description: "Projekthantering för utvecklingsteam",
    supportedGoals: ["task-automation", "workflow-triggers", "report-generation", "team-analytics", "executive-dashboard"],
  },
  {
    id: "asana",
    name: "Asana",
    logo: "/logos/asana.svg",
    category: "project-management",
    description: "Arbetshantering för team",
    supportedGoals: ["task-automation", "workflow-triggers", "team-analytics", "report-generation"],
  },
  {
    id: "monday",
    name: "Monday.com",
    logo: "/logos/monday.svg",
    category: "project-management",
    description: "Flexibel arbetsplattform",
    supportedGoals: ["task-automation", "workflow-triggers", "team-analytics", "report-generation", "executive-dashboard"],
  },
  {
    id: "clickup",
    name: "ClickUp",
    logo: "/logos/clickup.svg",
    category: "project-management",
    description: "Allt-i-ett produktivitetsplattform",
    supportedGoals: ["task-automation", "workflow-triggers", "team-analytics", "report-generation"],
  },
  {
    id: "airtable",
    name: "Airtable",
    logo: "/logos/airtable.svg",
    category: "project-management",
    description: "Flexibel databas och kalkylark",
    supportedGoals: ["sync-contacts", "task-automation", "workflow-triggers", "report-generation", "data-backup", "inventory-alerts"],
  },

  // Support
  {
    id: "zendesk",
    name: "Zendesk",
    logo: "/logos/zendesk.svg",
    category: "support",
    description: "Kundservice och support",
    supportedGoals: ["customer-support", "sync-contacts", "report-generation", "team-analytics"],
  },
  {
    id: "freshdesk",
    name: "Freshdesk",
    logo: "/logos/freshdesk.svg",
    category: "support",
    description: "Molnbaserad kundsupport",
    supportedGoals: ["customer-support", "sync-contacts", "report-generation", "team-analytics", "workflow-triggers"],
  },
  {
    id: "intercom",
    name: "Intercom",
    logo: "/logos/intercom.svg",
    category: "support",
    description: "Kundkommunikation och livechatt",
    supportedGoals: ["customer-support", "sync-contacts", "lead-notifications", "workflow-triggers"],
  },

  // Övrigt
  {
    id: "zapier",
    name: "Zapier",
    logo: "/logos/zapier.svg",
    category: "other",
    description: "Koppla ihop 5000+ appar",
    supportedGoals: ["workflow-triggers", "sync-contacts", "task-automation", "lead-notifications", "auto-invoicing", "report-generation", "data-backup"],
  },
  {
    id: "sheets",
    name: "Google Sheets",
    logo: "/logos/sheets.svg",
    category: "other",
    description: "Kalkylark i molnet",
    supportedGoals: ["sync-contacts", "report-generation", "data-backup", "inventory-alerts", "executive-dashboard", "budget-tracking", "team-analytics", "supplier-management"],
  },
];

export const automationGoals = [
  {
    id: "sync-contacts",
    title: "Synkronisera kontakter",
    description: "Håll alla kontakter uppdaterade mellan system automatiskt",
    icon: "Users",
    outputSystems: ["hubspot", "salesforce", "pipedrive", "sheets", "excel", "fortnox", "outlook", "airtable"],
    benefits: [
      "Eliminera manuell dataöverföring",
      "Undvik dubbletter och felaktig data",
      "Spara 5+ timmar per vecka",
    ],
  },
  {
    id: "auto-invoicing",
    title: "Automatisk fakturering",
    description: "Skapa och skicka fakturor automatiskt baserat på triggers",
    icon: "Receipt",
    outputSystems: ["fortnox", "visma", "gmail", "outlook", "stripe", "klarna"],
    benefits: [
      "Fakturor skickas inom sekunder",
      "Minska försenade betalningar med 40%",
      "Full spårbarhet och rapportering",
    ],
  },
  {
    id: "lead-notifications",
    title: "Leadnotifieringar",
    description: "Få omedelbara notiser när nya leads kommer in",
    icon: "Bell",
    outputSystems: ["slack", "teams", "gmail", "outlook", "telegram", "discord"],
    benefits: [
      "Reagera på leads inom minuter",
      "Öka konvertering med upp till 50%",
      "Anpassade notiser per team",
    ],
  },
  {
    id: "task-automation",
    title: "Uppgiftsautomation",
    description: "Skapa uppgifter automatiskt baserat på händelser",
    icon: "CheckSquare",
    outputSystems: ["trello", "jira", "asana", "notion", "monday", "clickup", "airtable"],
    benefits: [
      "Inga uppgifter faller mellan stolarna",
      "Automatisk tilldelning till rätt person",
      "Spara tid på manuell uppföljning",
    ],
  },
  {
    id: "report-generation",
    title: "Automatiska rapporter",
    description: "Generera och skicka rapporter på schema",
    icon: "BarChart3",
    outputSystems: ["sheets", "excel", "gmail", "outlook", "slack", "teams", "googledrive", "onedrive"],
    benefits: [
      "Alltid uppdaterade rapporter",
      "Automatisk distribution till stakeholders",
      "Anpassningsbara dashboards",
    ],
  },
  {
    id: "customer-support",
    title: "Kundsupport-automation",
    description: "Automatisera supportärenden och kundkommunikation",
    icon: "HeadphonesIcon",
    outputSystems: ["zendesk", "freshdesk", "intercom", "slack", "teams", "gmail", "outlook", "whatsapp", "telegram"],
    benefits: [
      "Snabbare svarstider",
      "Automatisk kategorisering av ärenden",
      "24/7 initial respons",
    ],
  },
  {
    id: "workflow-triggers",
    title: "Workflow-triggers",
    description: "Starta arbetsflöden automatiskt baserat på händelser",
    icon: "Workflow",
    outputSystems: ["zapier", "slack", "teams", "notion", "monday", "airtable"],
    benefits: [
      "Eliminera manuella steg",
      "Reagera i realtid på förändringar",
      "Skala processer utan extra personal",
    ],
  },
  {
    id: "data-backup",
    title: "Databackup & synk",
    description: "Säkerhetskopiera och synkronisera viktig affärsdata",
    icon: "Database",
    outputSystems: ["sheets", "excel", "googledrive", "onedrive", "dropbox", "fortnox", "visma", "airtable"],
    benefits: [
      "Aldrig förlora viktig data",
      "Automatisk backup på schema",
      "Enkel återställning vid behov",
    ],
  },
  // Inköp
  {
    id: "purchase-orders",
    title: "Inköpsorder-automation",
    description: "Automatisera skapande och godkännande av inköpsorder",
    icon: "ShoppingCart",
    outputSystems: ["fortnox", "monitor", "visma", "gmail", "outlook", "slack", "teams", "sheets", "excel"],
    benefits: [
      "Snabbare inköpsprocess",
      "Automatiska godkännandeflöden",
      "Full spårbarhet på alla inköp",
    ],
  },
  {
    id: "supplier-management",
    title: "Leverantörshantering",
    description: "Håll koll på leverantörer, avtal och priser automatiskt",
    icon: "Truck",
    outputSystems: ["sheets", "excel", "fortnox", "slack", "teams", "gmail", "outlook", "airtable"],
    benefits: [
      "Centraliserad leverantörsdata",
      "Automatiska påminnelser vid avtalsförnyelse",
      "Bättre förhandlingsunderlag",
    ],
  },
  {
    id: "inventory-alerts",
    title: "Lagernotifieringar",
    description: "Få automatiska varningar när lagernivåer är låga",
    icon: "Package",
    outputSystems: ["slack", "teams", "gmail", "outlook", "telegram", "sheets", "excel", "airtable"],
    benefits: [
      "Undvik lagerbrist",
      "Automatiska beställningsförslag",
      "Optimera lagernivåer",
    ],
  },
  // Ledning
  {
    id: "executive-dashboard",
    title: "Ledningsdashboard",
    description: "Automatiska KPI-rapporter och dashboards för ledningen",
    icon: "LayoutDashboard",
    outputSystems: ["sheets", "excel", "slack", "teams", "gmail", "outlook", "notion", "monday"],
    benefits: [
      "Realtidsöversikt över verksamheten",
      "Automatiska vecko/månadsrapporter",
      "Datadrivna beslut",
    ],
  },
  {
    id: "budget-tracking",
    title: "Budgetuppföljning",
    description: "Automatisk uppföljning av budget mot utfall",
    icon: "PiggyBank",
    outputSystems: ["sheets", "excel", "fortnox", "visma", "slack", "teams", "gmail", "outlook"],
    benefits: [
      "Tidiga varningar vid avvikelser",
      "Automatiska prognoser",
      "Förenklad månadsavstämning",
    ],
  },
  {
    id: "team-analytics",
    title: "Teamanalys",
    description: "Samla in och visualisera teamets prestationer automatiskt",
    icon: "TrendingUp",
    outputSystems: ["sheets", "excel", "slack", "teams", "notion", "monday", "gmail", "outlook", "jira"],
    benefits: [
      "Objektiv prestationsmätning",
      "Identifiera flaskhalsar",
      "Fira framgångar automatiskt",
    ],
  },
];

// Hjälpfunktion för att hämta system efter ID
export function getSystemById(id) {
  return systems.find((s) => s.id === id);
}

// Hjälpfunktion för att hämta mål efter ID
export function getGoalById(id) {
  return automationGoals.find((g) => g.id === id);
}

// Hjälpfunktion för att hämta tillgängliga mål för ett system
export function getAvailableGoals(systemId) {
  const system = getSystemById(systemId);
  if (!system) return [];
  return automationGoals.filter((goal) => system.supportedGoals.includes(goal.id));
}

// Hjälpfunktion för att hämta output-system för ett mål
export function getOutputSystems(goalId) {
  const goal = getGoalById(goalId);
  if (!goal) return [];
  return goal.outputSystems.map((id) => getSystemById(id)).filter(Boolean);
}

// Gruppera system efter kategori
export function getSystemsByCategory() {
  const grouped = {};
  for (const system of systems) {
    if (!grouped[system.category]) {
      grouped[system.category] = [];
    }
    grouped[system.category].push(system);
  }
  return grouped;
}
