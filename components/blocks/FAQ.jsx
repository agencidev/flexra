"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GetStartedButton } from "../ui/get-started-button";

const defaultFaqItems = [
  {
    question: "Vad erbjuder Flexra?",
    answer: "Vi erbjuder AI-driven automation och systemintegration för företag. Vi hjälper er identifiera de bästa automatiseringsmöjligheterna, rekommenderar rätt verktyg och guider er genom hela implementationsprocessen."
  },
  {
    question: "Behöver jag teknisk kompetens för att jobba med er?",
    answer: "Nej, ingen teknisk expertis krävs från din sida. Vi förenklar det komplexa automationslandskapet och ger tydliga rekommendationer så att ditt team tryggt kan använda och hantera systemen."
  },
  {
    question: "Vilka typer av företag passar era tjänster för?",
    answer: "Våra tjänster passar SME:s och medelstora företag inom alla branscher som vill effektivisera sina processer, förbättra kundupplevelsen och automatisera arbetsflöden med AI-driven automation."
  },
  {
    question: "Kan ni garantera att automation ökar vår produktivitet?",
    answer: "Resultaten beror på flera faktorer, men vi baserar våra rekommendationer på beprövade strategier. Vi fokuserar på mätbar ROI och kontinuerlig optimering för att säkerställa verkliga förbättringar."
  },
  {
    question: "Vilka processer kan automatiseras?",
    answer: "Vi hjälper er automatisera leadgenerering, kundkommunikation, säljuppföljningar, datainmatning, rapportering, schemaläggning och andra administrativa eller repetitiva uppgifter."
  },
  {
    question: "Kommer automation ersätta våra anställda?",
    answer: "Nej, automation är designad för att stärka och frigöra ditt team genom att hantera repetitiva uppgifter. Det ger medarbetarna möjlighet att arbeta mer strategiskt och kreativt."
  }
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-6 pb-4 text-gray-600">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQ({
  items = defaultFaqItems,
  title = "Vanliga frågor",
  subtitle = "Här besvarar vi de vanligaste frågorna om våra tjänster och hur vi kan hjälpa ditt företag.",
  badge = "FAQ",
  ctaText = "Har du fler frågor?",
  background = "gray"
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const bgClass = background === "white" ? "bg-white" : "bg-[#f8f8f6]";

  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${bgClass}`}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - header */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white text-gray-600 border border-gray-200 mb-6">
              {badge}
            </span>
            <h2 className="mb-6">{title}</h2>
            <p className="text-gray-600 mb-8 max-w-md">{subtitle}</p>
            <GetStartedButton dark>{ctaText}</GetStartedButton>
          </div>

          {/* Right column - FAQ items */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
