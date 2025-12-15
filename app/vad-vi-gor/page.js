"use client";

import { PageLayout } from "../../components/PageLayout";
import Image from "next/image";

const tools = [
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
    description: "Snabb och skalbar hosting för moderna webbapplikationer med automatisk deployment."
  },
  {
    name: "Supabase",
    logo: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
    description: "Open source-databas med realtidsfunktioner och inbyggd autentisering."
  },
  {
    name: "Next.js",
    logo: "https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png",
    description: "React-ramverk för produktionsklara applikationer med optimal prestanda."
  },
  {
    name: "Tailwind CSS",
    logo: "https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png",
    description: "Utility-first CSS för snabb och konsekvent design utan att lämna HTML."
  },
  {
    name: "Claude",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png",
    description: "Avancerad AI-assistent för intelligent automation och beslutstöd."
  }
];

export default function VadViGorPage() {
  return (
    <PageLayout 
      title="Vi bygger digitala verktyg som arbetar för dig"
      subtitle="Vad vi gör"
    >
      {/* Hero Section */}
      <section className="px-[5%] py-20 md:py-32 bg-[#f8f8f6] relative overflow-hidden">
        {/* Gradient blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-lime-200/60 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <span className="inline-block px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 mb-8">
              AI & Automation
            </span>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Möt nästa generations<br />
              <span className="italic font-normal text-lime-600">digitala verktyg</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Vi bygger smarta AI-lösningar och automatiserar processer så att ditt team kan fokusera på det som verkligen spelar roll.
            </p>
            
            {/* CTA Button */}
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Boka demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                AI och automation för moderna företag
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Vi hjälper företag att frigöra tid och resurser genom att automatisera 
                repetitiva processer och implementera AI-lösningar som faktiskt fungerar.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Vårt fokus ligger på att skapa verktyg som integreras sömlöst i din 
                befintliga arbetsmiljö och ger mätbara resultat från dag ett.
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-xl font-semibold mb-3">Processautomation</h3>
                <p className="text-gray-600">
                  Automatisera repetitiva arbetsflöden och frigör tid för det som verkligen spelar roll.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-xl font-semibold mb-3">AI-integration</h3>
                <p className="text-gray-600">
                  Implementera AI-lösningar som förstärker ditt teams kapacitet och beslutsfattande.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-xl font-semibold mb-3">Systemintegration</h3>
                <p className="text-gray-600">
                  Koppla samman dina verktyg och system för ett sömlöst informationsflöde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-[5%] py-16 md:py-24 bg-[#f8f8f6]">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 bg-lime-100 text-lime-800 text-sm font-medium rounded-full mb-4">
              Vår tech stack
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Verktyg vi <span className="italic font-normal text-gray-500">arbetar med</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vi använder moderna och beprövade teknologier för att bygga skalbara lösningar som håller över tid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative gradient blob */}
          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-lime-200/50 rounded-full blur-3xl"></div>
            </div>
            <div className="relative text-center">
              <p className="text-gray-500 text-sm">
                ...och fler verktyg beroende på projektets behov
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Cards Section */}
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Snabb implementation</h3>
              <p className="text-gray-600 text-sm">
                Från idé till produktion på veckor, inte månader. Vi levererar fungerande lösningar snabbt.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Skalbar arkitektur</h3>
              <p className="text-gray-600 text-sm">
                Bygg för framtiden med lösningar som växer med ditt företag utan teknisk skuld.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Säkerhet i fokus</h3>
              <p className="text-gray-600 text-sm">
                Best practices för säkerhet och dataskydd är inbyggt från start i alla våra lösningar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="px-[5%] py-16 md:py-24 bg-[#f8f8f6]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-full border border-gray-200 mb-6">
              Integrationer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Enkelt att integrera<br />
              <span className="italic font-normal text-gray-500">med era system</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
              Koppla ihop våra lösningar med era befintliga system för att ta automatiseringen till nästa nivå.
            </p>
            
            {/* Checkmarks */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600">Trigga workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600">Synka data</span>
              </div>
            </div>
          </div>

          {/* Floating Integration Logos */}
          <div className="relative h-[300px] md:h-[350px] max-w-3xl mx-auto">
            {/* Slack */}
            <div className="absolute left-[5%] top-[30%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
                alt="Slack"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, 40px"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            
            {/* Salesforce */}
            <div className="absolute left-[22%] top-[5%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg"
                alt="Salesforce"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, 40px"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            
            {/* Zendesk */}
            <div className="absolute left-[42%] top-[0%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/zendesk-1.svg"
                alt="Zendesk"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, 40px"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            
            {/* HubSpot */}
            <div className="absolute right-[10%] top-[10%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/hubspot.svg"
                alt="HubSpot"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, 40px"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            
            {/* WhatsApp */}
            <div className="absolute left-[30%] top-[55%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/whatsapp-icon.svg"
                alt="WhatsApp"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, 40px"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            
            {/* Microsoft Teams */}
            <div className="absolute left-[50%] top-[45%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg"
                alt="Microsoft Teams"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, 40px"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            
            {/* Google Meet */}
            <div className="absolute right-[5%] top-[40%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/google-meet-icon.svg"
                alt="Google Meet"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, 40px"
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Utforska integrationer
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
