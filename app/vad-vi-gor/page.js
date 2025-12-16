"use client";

import { PageLayout } from "../../components/PageLayout";
import { Button } from "../../components/ui/button";
import { GetStartedButton } from "../../components/ui/get-started-button";
import Image from "next/image";
import Link from "next/link";
import { Zap, RefreshCw, Shield, Check } from "lucide-react";
import { FAQ } from "../../components/blocks/FAQ";

const tools = [
  {
    name: "Vercel",
    logo: "/logos/vercel.webp",
    url: "https://vercel.com",
    description: "Snabb och skalbar hosting för moderna webbapplikationer med automatisk deployment."
  },
  {
    name: "Supabase",
    logo: "/logos/supabase.webp",
    url: "https://supabase.com",
    description: "Open source-databas med realtidsfunktioner och inbyggd autentisering."
  },
  {
    name: "Next.js",
    logo: "/logos/nextjs.svg",
    url: "https://nextjs.org",
    description: "React-ramverk för produktionsklara applikationer med optimal prestanda."
  },
  {
    name: "Tailwind CSS",
    logo: "/logos/tailwind.svg",
    url: "https://tailwindcss.com",
    description: "Utility-first CSS för snabb och konsekvent design utan att lämna HTML."
  },
  {
    name: "Claude",
    logo: "/logos/anthropic.webp",
    url: "https://anthropic.com",
    description: "Avancerad AI-assistent för intelligent automation och beslutstöd."
  }
];

const integrations = [
  { name: "Slack", logo: "/logos/slack.svg", url: "https://slack.com" },
  { name: "Teams", logo: "/logos/teams.svg", url: "https://microsoft.com/teams" },
  { name: "Salesforce", logo: "/logos/salesforce.svg", url: "https://salesforce.com" },
  { name: "HubSpot", logo: "/logos/hubspot.svg", url: "https://hubspot.com" },
  { name: "Fortnox", logo: "/logos/fortnox.svg", url: "https://fortnox.se" },
  { name: "Monitor", logo: "/logos/monitor.svg", url: "https://monitor.se" },
  { name: "Visma", logo: "/logos/visma.svg", url: "https://visma.se" },
  { name: "Zapier", logo: "/logos/zapier.svg", url: "https://zapier.com" },
  { name: "Notion", logo: "/logos/notion.svg", url: "https://notion.so" },
  { name: "Gmail", logo: "/logos/gmail.svg", url: "https://gmail.com" },
  { name: "Outlook", logo: "/logos/outlook.svg", url: "https://outlook.com" },
  { name: "Sheets", logo: "/logos/sheets.svg", url: "https://sheets.google.com" },
  { name: "Trello", logo: "/logos/trello.svg", url: "https://trello.com" },
  { name: "Jira", logo: "/logos/jira.svg", url: "https://atlassian.com/jira" },
  { name: "Asana", logo: "/logos/asana.svg", url: "https://asana.com" },
  { name: "Zendesk", logo: "/logos/zendesk.svg", url: "https://zendesk.com" },
  { name: "WhatsApp", logo: "/logos/whatsapp.svg", url: "https://whatsapp.com" },
  { name: "Google Meet", logo: "/logos/googlemeet.svg", url: "https://meet.google.com" }
];

const services = [
  {
    title: "Processautomation",
    description: "Automatisera repetitiva arbetsflöden och frigör tid för det som verkligen spelar roll.",
    color: "#fce7f3"
  },
  {
    title: "AI-integration",
    description: "Implementera AI-lösningar som förstärker ditt teams kapacitet och beslutsfattande.",
    color: "#fef9c3"
  },
  {
    title: "Systemintegration",
    description: "Koppla samman dina verktyg och system för ett sömlöst informationsflöde.",
    color: "#ecfccb"
  }
];

const features = [
  {
    icon: Zap,
    title: "Snabb implementation",
    description: "Från idé till produktion på veckor, inte månader. Vi levererar fungerande lösningar snabbt.",
    color: "#fce7f3"
  },
  {
    icon: RefreshCw,
    title: "Skalbar arkitektur",
    description: "Bygg för framtiden med lösningar som växer med ditt företag utan teknisk skuld.",
    color: "#fef9c3"
  },
  {
    icon: Shield,
    title: "Säkerhet i fokus",
    description: "Best practices för säkerhet och dataskydd är inbyggt från start i alla våra lösningar.",
    color: "#ecfccb"
  }
];

export default function VadViGorPage() {
  return (
    <PageLayout 
      title="Vi bygger digitala verktyg som arbetar för dig"
      subtitle="Vad vi gör"
    >
      {/* Hero Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-[65rem] mx-auto">
            {/* Badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 mb-8">
              AI & Automation
            </span>
            
            {/* Heading */}
            <h2 className="mb-6">
              Möt nästa generations digitala verktyg
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              Vi bygger smarta AI-lösningar och automatiserar processer så att ditt team kan fokusera på det som verkligen spelar roll.
            </p>
            
            {/* CTA Button */}
            <GetStartedButton dark>Boka demo</GetStartedButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 md:mb-16 lg:mb-20">
            <h2 className="max-w-4xl">
              AI och automation för moderna företag – vi hjälper er frigöra tid genom smarta lösningar.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-3xl p-8 md:p-10 min-h-[250px]"
                style={{ backgroundColor: service.color }}
              >
                <h5>{service.title}</h5>
                <p className="text-gray-600 mt-auto">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f8f8f6]">
        <div className="container">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-lime-100 text-lime-800 mb-4">
              Vår tech stack
            </span>
            <h2 className="mb-4">
              Verktyg vi arbetar med
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vi använder moderna och beprövade teknologier för att bygga skalbara lösningar som håller över tid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tools.map((tool, index) => (
              <Link
                key={index}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h5 className="mb-2">{tool.name}</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              ...och fler verktyg beroende på projektets behov
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col">
                <div
                  className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                </div>
                <h5 className="mb-2">{feature.title}</h5>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f8f8f6]">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white text-gray-600 border border-gray-200 mb-6">
              Integrationer
            </span>
            <h2 className="mb-4">
              Enkelt att integrera med era system
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              Koppla ihop våra lösningar med era befintliga system för att ta automatiseringen till nästa nivå.
            </p>
            
            {/* Checkmarks */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600">Trigga workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600">Synka data</span>
              </div>
            </div>
          </div>

          {/* Integration Logos Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto">
            {integrations.map((integration, index) => (
              <Link
                key={index}
                href={integration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Image
                    src={integration.logo}
                    alt={integration.name}
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">{integration.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <GetStartedButton dark>Utforska integrationer</GetStartedButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ background="white" />
    </PageLayout>
  );
}
