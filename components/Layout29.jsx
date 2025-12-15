"use client";

import React from "react";
import { Clock, Scale, Target, Trophy, Calendar, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Spara tid & pengar",
    description: "Automatisera rutinuppgifter och minska driftskostnader med upp till 60% medan ditt team fokuserar på strategiska initiativ som driver verkligt affärsvärde.",
    color: "#fce7f3" // pink
  },
  {
    icon: Scale,
    title: "Skala enkelt",
    description: "Hantera ökad arbetsbelastning utan att anställa ytterligare personal. Våra AI-lösningar växer med ditt företag och anpassar sig till förändrade behov sömlöst.",
    color: "#fef9c3" // yellow
  },
  {
    icon: Target,
    title: "Förbättra precisionen",
    description: "Eliminera mänskliga fel i databehandling och beslutsfattande med AI-system som upprätthåller 99,9% noggrannhet i repetitiva uppgifter och analyser.",
    color: "#ecfccb" // lime
  },
  {
    icon: Trophy,
    title: "Få konkurrensfördelar",
    description: "Ligg steget före konkurrenterna genom att utnyttja banbrytande AI-teknik som ger dig snabbare insikter och bättre kundupplevelser.",
    color: "#fce7f3" // pink
  },
  {
    icon: Calendar,
    title: "24/7 tillgänglighet",
    description: "Erbjud dygnet-runt-service till dina kunder med AI-system som aldrig sover, vilket säkerställer konsekvent support och engagemang hela tiden.",
    color: "#fef9c3" // yellow
  },
  {
    icon: BarChart3,
    title: "Datadriven insikt",
    description: "Fatta smartare affärsbeslut med AI-driven analys som avslöjar dolda mönster, förutser framtida trender och ger handlingsbara rekommendationer.",
    color: "#ecfccb" // lime
  }
];

export function Layout29() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      {/* Bottom radial gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(252, 231, 243, 0.7) 0%, rgba(254, 249, 195, 0.5) 50%, transparent 100%)'
        }}
      />
      <div className="container">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="max-w-4xl">
            Upplev konkurrensfördelarna med AI-tekik, från kostnadsbesparingar till ökad produktivitet och accelererad tillväxt.
          </h2>
        </div>

        {/* Features Grid */}
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
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
