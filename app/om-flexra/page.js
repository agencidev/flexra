"use client";

import { PageLayout } from "../../components/PageLayout";
import Image from "next/image";
import { Lightbulb, Target, Cog, Rocket } from "lucide-react";
import Link from "next/link";
import { GetStartedButton } from "../../components/ui/get-started-button";

const processSteps = [
  {
    icon: Lightbulb,
    title: "Analys & Upptäckt",
    description:
      "Vi börjar med att förstå dina affärsmål, processer och utmaningar för att identifiera var automation kan ge störst effekt.",
    color: "#fce7f3",
  },
  {
    icon: Target,
    title: "Strategi & Planering",
    description:
      "En skräddarsydd plan skapas med tydliga automationsmöjligheter, integrationspunkter och mätbara resultat för din verksamhet.",
    color: "#fef9c3",
  },
  {
    icon: Cog,
    title: "Implementation & Optimering",
    description:
      "Vi designar, bygger och driftsätter automationssystem som integreras sömlöst i era befintliga arbetsflöden.",
    color: "#ecfccb",
  },
  {
    icon: Rocket,
    title: "Uppföljning & Tillväxt",
    description:
      "Efter lansering följer vi kontinuerligt upp prestanda, optimerar arbetsflöden och skalar systemen i takt med att er verksamhet växer.",
    color: "#e0e7ff",
  },
];

const testimonials = [
  {
    quote:
      "Flexra hjälpte oss att automatisera vår fakturahantering. Vi sparar nu 15 timmar i veckan och kan fokusera på att växa verksamheten istället.",
    author: "Anna Lindberg",
    role: "VD",
    company: "Bygg & Montage AB",
  },
  {
    quote:
      "Implementeringen gick smidigt och resultatet överträffade våra förväntningar. ROI:n var nästan omedelbar.",
    author: "Marcus Eriksson",
    role: "Operativ chef",
    company: "TechStart Sweden",
  },
  {
    quote:
      "Äntligen ett team som förstår både teknik och affär. De levererade exakt det vi behövde, utan onödig komplexitet.",
    author: "Sofia Andersson",
    role: "Grundare",
    company: "E-handel Nordic",
  },
];

const team = [
  {
    name: "Erik Lindqvist",
    role: "VD & Grundare",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Anna Bergström",
    role: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Marcus Holm",
    role: "AI Specialist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
];

export default function OmFlexraPage() {
  return (
    <PageLayout
      title="Vi tror på teknik som förenklar, inte komplicerar"
      subtitle="Om Flexra"
    >
      {/* Intro Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="mb-6">Vår historia</h2>
              <p className="text-gray-600 mb-6">
                Flexra grundades med en enkel vision: att göra avancerad
                teknologi tillgänglig för alla företag, oavsett storlek. Vi såg
                hur många organisationer kämpade med ineffektiva processer och
                missade möjligheter att utnyttja AI och automation.
              </p>
              <p className="text-gray-600 mb-8">
                Efter att ha byggt automationssystem för egna bolag och kunder
                vi arbetat med, talade resultaten för sig själva. Effektiviteten
                ökade. Försäljningen steg. Arbetsbördan minskade. Det var då vi
                insåg att detta inte bara var framtiden – det är nu.
              </p>
              <p className="text-gray-600">
                Idag hjälper vi företag över hela Sverige att transformera sina
                arbetsflöden och frigöra tid för det som verkligen spelar roll –
                att skapa värde för sina kunder.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Flexra team arbetar tillsammans"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - "Så här jobbar vi" */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="mb-6">Så här jobbar vi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="rounded-3xl p-8 md:p-10 lg:p-12"
                style={{
                  backgroundColor: step.color,
                  border: step.borderColor
                    ? `2px solid ${step.borderColor}`
                    : "none",
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center mb-6">
                  <step.icon
                    className="w-7 h-7 text-gray-700"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f8f8f6]">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Kundröster
            </p>
            <h2 className="mb-6">Vad våra kunder säger</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-medium text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Teamet
            </p>
            <h2 className="mb-6">Möt teamet</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vi är ett dedikerat team av experter som brinner för att hjälpa
              företag växa genom smart automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div
            className="rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <h2 className="text-white mb-6 max-w-2xl mx-auto">
              Redo att ta nästa steg?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Låt oss prata om hur vi kan hjälpa ert företag att spara tid och
              öka effektiviteten med smart automation.
            </p>
            <Link href="/kontakt">
              <GetStartedButton>Boka ett möte</GetStartedButton>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
