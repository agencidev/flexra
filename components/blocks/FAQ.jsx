"use client";

import { useState, useEffect } from "react";
import { GetStartedButton } from "../ui/get-started-button";

const defaultFaqItems = [
  {
    question: "Vad erbjuder Flexra?",
    answer: "Vi erbjuder AI-driven automation och systemintegration för företag. Vi hjälper er identifiera de bästa automatiseringsmöjligheterna, rekommenderar rätt verktyg och guider er genom hela implementationsprocessen.",
    meta: "Allmänt"
  },
  {
    question: "Behöver jag teknisk kompetens för att jobba med er?",
    answer: "Nej, ingen teknisk expertis krävs från din sida. Vi förenklar det komplexa automationslandskapet och ger tydliga rekommendationer så att ditt team tryggt kan använda och hantera systemen.",
    meta: "Teknik"
  },
  {
    question: "Vilka typer av företag passar era tjänster för?",
    answer: "Våra tjänster passar SME:s och medelstora företag inom alla branscher som vill effektivisera sina processer, förbättra kundupplevelsen och automatisera arbetsflöden med AI-driven automation.",
    meta: "Målgrupp"
  },
  {
    question: "Kan ni garantera att automation ökar vår produktivitet?",
    answer: "Resultaten beror på flera faktorer, men vi baserar våra rekommendationer på beprövade strategier. Vi fokuserar på mätbar ROI och kontinuerlig optimering för att säkerställa verkliga förbättringar.",
    meta: "Resultat"
  },
  {
    question: "Vilka processer kan automatiseras?",
    answer: "Vi hjälper er automatisera leadgenerering, kundkommunikation, säljuppföljningar, datainmatning, rapportering, schemaläggning och andra administrativa eller repetitiva uppgifter.",
    meta: "Process"
  },
  {
    question: "Kommer automation ersätta våra anställda?",
    answer: "Nej, automation är designad för att stärka och frigöra ditt team genom att hantera repetitiva uppgifter. Det ger medarbetarna möjlighet att arbeta mer strategiskt och kreativt.",
    meta: "Team"
  }
];

// CSS animation styles injected once
const FAQ_STYLES_ID = "faq-animation-styles";

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(FAQ_STYLES_ID)) return;

  const style = document.createElement("style");
  style.id = FAQ_STYLES_ID;
  style.innerHTML = `
    @keyframes faq-fade-up {
      from {
        opacity: 0;
        transform: translateY(24px);
        filter: blur(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
    }
    .faq-fade-up {
      animation: faq-fade-up 0.7s cubic-bezier(0.22, 0.68, 0, 1) forwards;
    }
    .faq-fade-up-delay-1 { animation-delay: 0.1s; }
    .faq-fade-up-delay-2 { animation-delay: 0.2s; }
    .faq-fade-up-delay-3 { animation-delay: 0.3s; }
    .faq-fade-up-delay-4 { animation-delay: 0.4s; }
    .faq-fade-up-delay-5 { animation-delay: 0.5s; }
    .faq-item-initial {
      opacity: 0;
      transform: translateY(24px);
      filter: blur(8px);
    }
    @media (prefers-reduced-motion: reduce) {
      .faq-fade-up {
        animation: none;
        opacity: 1;
        transform: none;
        filter: none;
      }
      .faq-item-initial {
        opacity: 1;
        transform: none;
        filter: none;
      }
    }
  `;
  document.head.appendChild(style);
}

function FAQItem({ item, isOpen, onToggle, index }) {
  const buttonId = `faq-trigger-${index}`;
  const panelId = `faq-panel-${index}`;

  const setGlow = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  };

  const clearGlow = (e) => {
    const target = e.currentTarget;
    target.style.removeProperty("--glow-x");
    target.style.removeProperty("--glow-y");
  };

  return (
    <li
      className={`
        group relative overflow-hidden rounded-3xl border border-gray-200
        bg-white/70 backdrop-blur-xl
        shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]
        transition-all duration-500
        hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]
        focus-within:-translate-y-0.5
        faq-item-initial faq-fade-up faq-fade-up-delay-${Math.min(index + 1, 5)}
      `}
      onMouseMove={setGlow}
      onMouseLeave={clearGlow}
    >
      {/* Glow effect */}
      <div
        className={`
          pointer-events-none absolute inset-0 transition-opacity duration-500
          ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
        style={{
          background: `radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0, 0, 0, 0.03), transparent 70%)`
        }}
      />

      <button
        type="button"
        id={buttonId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="relative flex w-full items-start gap-5 px-7 py-6 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
      >
        {/* Plus icon */}
        <span
          className={`
            relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full
            border border-gray-200 bg-gray-50/80
            transition-all duration-500 group-hover:scale-105
          `}
        >
          {/* Ping effect when open */}
          <span
            className={`
              pointer-events-none absolute inset-0 rounded-full border border-gray-300
              ${isOpen ? "animate-ping opacity-20" : "opacity-0"}
            `}
          />
          <svg
            className={`relative h-5 w-5 text-gray-700 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="text-lg font-medium leading-tight text-gray-900">
              {item.question}
            </h3>
            {item.meta && (
              <span className="inline-flex w-fit items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-500 sm:ml-auto">
                {item.meta}
              </span>
            )}
          </div>

          {/* Answer panel */}
          <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={`
              overflow-hidden text-base leading-relaxed transition-[max-height,opacity] duration-500 ease-out
              ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
              text-gray-600
            `}
          >
            <p className="pr-2 pb-1">{item.answer}</p>
          </div>
        </div>
      </button>
    </li>
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
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    injectStyles();
    // Small delay to ensure styles are injected before animation starts
    const timer = setTimeout(() => setHasAnimated(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const bgClass = background === "white" ? "bg-white" : "bg-[#f8f8f6]";

  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${bgClass}`}>
      <div className="container">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header - centered */}
          <header className={`text-center max-w-2xl mx-auto ${hasAnimated ? "faq-fade-up" : "faq-item-initial"}`}>
            <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-white text-gray-600 border border-gray-200 mb-6 uppercase tracking-[0.2em]">
              {badge}
            </span>
            <h2 className="mb-4">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </header>

          {/* FAQ Items - centered vertical list */}
          <ul className="space-y-4 max-w-3xl mx-auto w-full">
            {items.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </ul>

          {/* CTA - centered */}
          <div className={`text-center ${hasAnimated ? "faq-fade-up" : "faq-item-initial"}`} style={{ animationDelay: "0.6s" }}>
            <GetStartedButton dark>{ctaText}</GetStartedButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
