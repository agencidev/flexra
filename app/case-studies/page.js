"use client";

import { PageLayout } from "../../components/PageLayout";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const caseStudies = [
  {
    title: "Automatiserad fakturahantering för Byggbolaget AB",
    category: "Processautomation",
    description: "Minskade manuell hantering med 80% och sparade 40 timmar per månad.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "AI-driven kundservice för E-handelsföretaget",
    category: "AI-integration",
    description: "Implementerade chatbot som hanterar 60% av alla kundärenden automatiskt.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    title: "Systemintegration för Konsultfirman",
    category: "Integration",
    description: "Kopplade samman 5 olika system till ett enhetligt arbetsflöde.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  },
];

export default function CaseStudiesPage() {
  return (
    <PageLayout 
      title="Se hur vi hjälpt andra företag att växa"
      subtitle="Case studies"
    >
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <article 
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {study.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 group-hover:text-gray-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {study.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 group-hover:gap-2 transition-all">
                    Läs mer <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
