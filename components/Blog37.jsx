"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export const posts = [
  {
    slug: "designa-foretagskulturer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-pink-200",
    title: "Designa företagskulturer",
    description: "Utforska hur du sätter medarbetarna i centrum av din företagskultur för att driva framgång och lojalitet.",
    date: "12 dec 2025",
    author: "Erik Lindqvist",
    content: `Att designa en stark företagskultur handlar om mer än att bara sätta upp värderingar på väggen. Det handlar om att skapa en miljö där medarbetarna känner sig sedda, hörda och uppskattade.

I denna artikel utforskar vi hur du kan sätta medarbetarna i centrum av din företagskultur för att driva framgång och lojalitet. Vi tittar på konkreta strategier och verktyg som hjälper dig att bygga en kultur som attraherar och behåller talanger.

## Varför företagskultur spelar roll

En stark företagskultur är grunden för framgångsrika organisationer. Den påverkar allt från medarbetarengagemang till kundnöjdhet och i slutändan företagets resultat.

## Praktiska steg för att förbättra kulturen

1. **Lyssna aktivt** - Skapa kanaler för feedback och agera på den
2. **Var transparent** - Dela information öppet och ärligt
3. **Fira framgångar** - Uppmärksamma både stora och små vinster
4. **Investera i utveckling** - Ge medarbetarna möjlighet att växa

## Slutsats

Att bygga en stark företagskultur tar tid, men det är en investering som betalar sig mångfalt.`
  },
  {
    slug: "leda-hybrida-team-val",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-yellow-200",
    title: "Leda hybrida team väl",
    description: "Lär dig hur du framgångsrikt hanterar en arbetsstyrka som blandar kontor och distansarbete.",
    date: "10 dec 2025",
    author: "Anna Bergström",
    content: `Hybridarbete har blivit den nya normen för många organisationer. Men att leda team som arbetar både på kontoret och på distans kräver nya färdigheter och verktyg.

## Utmaningar med hybridarbete

- Kommunikation kan bli ojämn
- Risk för "vi och dem"-mentalitet
- Svårare att bygga teamkänsla

## Strategier för framgång

### Skapa tydliga strukturer
Etablera tydliga rutiner för möten, kommunikation och samarbete som fungerar oavsett var medarbetarna befinner sig.

### Investera i rätt verktyg
Använd digitala verktyg som möjliggör sömlöst samarbete mellan kontor och distans.

### Var medveten om inkludering
Se till att distansarbetare inte hamnar utanför viktiga diskussioner och beslut.`
  },
  {
    slug: "arbetsfloden-for-effektivitet",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-lime-200",
    title: "Arbetsflöden för effektivitet",
    description: "Upptäck hur automation kan förenkla dagliga operationer och öka den övergripande produktiviteten.",
    date: "8 dec 2025",
    author: "Marcus Holm",
    content: `Automation är nyckeln till att frigöra tid för det som verkligen spelar roll. Genom att automatisera repetitiva uppgifter kan ditt team fokusera på strategiskt arbete.

## Identifiera rätt processer

Inte alla processer lämpar sig för automation. Börja med att kartlägga:

- Repetitiva uppgifter som tar mycket tid
- Processer med hög felfrekvens
- Uppgifter som kräver data från flera system

## Vanliga automationsmöjligheter

1. **Fakturahantering** - Automatisk inläsning och matchning
2. **Rapportering** - Schemalagda rapporter som genereras automatiskt
3. **Onboarding** - Automatiserade välkomstflöden för nya medarbetare
4. **Kundservice** - Chatbots för vanliga frågor

## Mät resultaten

Följ upp effekten av dina automationer genom att mäta tidsbesparingar och kvalitetsförbättringar.`
  },
  {
    slug: "ai-i-vardagen",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-pink-200",
    title: "AI i vardagen",
    description: "Se hur artificiell intelligens blir en naturlig del av moderna arbetsplatser.",
    date: "5 dec 2025",
    author: "Erik Lindqvist",
    content: `AI är inte längre science fiction - det är ett verktyg som redan används på arbetsplatser världen över. Men hur kan du börja använda AI i din organisation?

## Praktiska AI-användningsområden

### Textgenerering och redigering
AI-verktyg kan hjälpa till att skriva utkast, sammanfatta dokument och förbättra texter.

### Dataanalys
Analysera stora datamängder snabbare och hitta mönster som annars skulle missas.

### Kundinteraktion
Chatbots och virtuella assistenter kan hantera rutinfrågor dygnet runt.

## Kom igång med AI

1. Identifiera ett specifikt problem att lösa
2. Välj rätt verktyg för uppgiften
3. Börja smått och skala upp
4. Utbilda teamet i hur verktygen fungerar`
  },
  {
    slug: "framtidens-arbetsplats",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-yellow-200",
    title: "Framtidens arbetsplats",
    description: "Hur teknologi formar morgondagens kontor och arbetsmiljöer.",
    date: "3 dec 2025",
    author: "Anna Bergström",
    content: `Arbetsplatsen genomgår en transformation. Teknologi, förändrade förväntningar och nya arbetssätt formar hur vi kommer att arbeta i framtiden.

## Trender att hålla koll på

### Flexibla arbetsytor
Kontoret blir en plats för samarbete snarare än individuellt arbete.

### AI-assistenter
Varje medarbetare får tillgång till AI-verktyg som förstärker deras kapacitet.

### Hållbarhet i fokus
Miljömedvetna val blir en självklar del av arbetsplatsdesignen.

## Förbered din organisation

Börja redan nu med att experimentera med nya arbetssätt och teknologier för att vara redo för framtiden.`
  },
  {
    slug: "datadriven-strategi",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-lime-200",
    title: "Datadriven strategi",
    description: "Använd data för att fatta bättre beslut och driva tillväxt i din organisation.",
    date: "1 dec 2025",
    author: "Marcus Holm",
    content: `Data är den nya oljan, sägs det. Men det räcker inte att samla data - du måste också kunna använda den för att fatta bättre beslut.

## Bygg en datadriven kultur

### Tillgängliggör data
Se till att rätt personer har tillgång till rätt data vid rätt tidpunkt.

### Utbilda i dataanalys
Ge medarbetarna verktyg och kunskap för att tolka och använda data.

### Fatta beslut baserat på fakta
Skapa processer där data är en naturlig del av beslutsfattandet.

## Vanliga misstag att undvika

- Samla data utan syfte
- Ignorera datakvalitet
- Övertolka korrelationer som kausalitet`
  },
  {
    slug: "teambuilding-pa-distans",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-pink-200",
    title: "Teambuilding på distans",
    description: "Skapa starka team även när alla arbetar hemifrån.",
    date: "28 nov 2025",
    author: "Erik Lindqvist",
    content: `Att bygga teamkänsla på distans är utmanande men fullt möjligt. Det kräver bara lite mer kreativitet och medvetenhet.

## Aktiviteter som fungerar digitalt

- Virtuella fikapauser
- Online-spel och quiz
- Digitala workshops
- Gemensamma lunchträffar via video

## Tips för framgång

1. Gör det frivilligt men uppmuntra deltagande
2. Variera aktiviteterna
3. Respektera olika tidszoner
4. Följ upp och be om feedback`
  },
  {
    slug: "automatisera-ratt-processer",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-yellow-200",
    title: "Automatisera rätt processer",
    description: "Identifiera vilka arbetsflöden som ger störst effekt vid automation.",
    date: "25 nov 2025",
    author: "Anna Bergström",
    content: `Alla processer är inte värda att automatisera. Nyckeln är att identifiera de som ger störst effekt med minst ansträngning.

## Kriterier för automation

### Hög volym
Processer som utförs ofta ger störst tidsbesparing.

### Regelbaserade
Uppgifter med tydliga regler är lättare att automatisera.

### Tidskrävande
Processer som tar lång tid manuellt ger stor effekt.

## Prioriteringsmatris

Använd en enkel matris med "effekt" och "komplexitet" för att prioritera vilka processer du ska automatisera först.`
  },
  {
    slug: "ledarskap-i-forandring",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-lime-200",
    title: "Ledarskap i förändring",
    description: "Navigera din organisation genom digital transformation.",
    date: "22 nov 2025",
    author: "Marcus Holm",
    content: `Digital transformation kräver ett nytt typ av ledarskap. Som ledare måste du kunna navigera osäkerhet och inspirera till förändring.

## Egenskaper hos framgångsrika ledare

- **Anpassningsbarhet** - Förmåga att snabbt ändra kurs
- **Kommunikation** - Tydlig och frekvent kommunikation
- **Empati** - Förståelse för medarbetarnas oro
- **Vision** - En tydlig bild av vart ni är på väg

## Hantera motstånd

Förändring möter alltid motstånd. Nyckeln är att:

1. Lyssna på oron
2. Förklara varför förändringen behövs
3. Involvera medarbetarna i processen
4. Fira tidiga framgångar`
  },
  {
    slug: "mat-det-som-spelar-roll",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-pink-200",
    title: "Mät det som spelar roll",
    description: "Fokusera på rätt KPI:er för att driva verklig affärsnytta.",
    date: "20 nov 2025",
    author: "Erik Lindqvist",
    content: `Det är lätt att drunkna i data och mäta allt som går att mäta. Men nyckeln till framgång är att fokusera på de mätvärden som verkligen driver affärsnytta.

## Välj rätt KPI:er

### Koppla till affärsmål
Varje KPI ska kunna kopplas till ett övergripande affärsmål.

### Var specifik
Undvik vaga mätvärden - var så specifik som möjligt.

### Gör dem påverkbara
Mät saker som teamet faktiskt kan påverka.

## Vanliga misstag

- Mäta för mycket
- Fokusera på "vanity metrics"
- Glömma att agera på insikterna
- Inte uppdatera KPI:er när verksamheten förändras`
  }
];

export function Blog37() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      {/* Header with navigation */}
      <div className="px-[5%] mb-10 md:mb-12">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                Blogg och artiklar
              </p>
              <h2>Senaste insikter och trender</h2>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Föregående"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Nästa"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards - same style as Logo3 */}
      <div className="px-[5%]">
        <div className="container">
          <div className="relative overflow-hidden">
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div 
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-6 pb-4 px-2" style={{ width: 'max-content' }}>
                {posts.map((post, index) => (
                  <Link 
                    key={index}
                    href={`/insikter/${post.slug}`}
                    className="block w-[320px] md:w-[380px] flex-shrink-0 rounded-3xl overflow-hidden group transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: post.categoryColor.includes('pink') ? '#fce7f3' : post.categoryColor.includes('yellow') ? '#fef9c3' : '#ecfccb' }}
                  >
                    {/* Image */}
                    <div className="p-4 pb-0">
                      <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 380px, 320px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${post.categoryColor} text-gray-800 mb-3`}>
                        {post.category}
                      </span>
                      <h5 className="mb-2">{post.title}</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
