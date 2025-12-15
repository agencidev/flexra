"use client";

import { PageLayout } from "../../components/PageLayout";

export default function VillkorPage() {
  return (
    <PageLayout 
      title="Användarvillkor och integritetspolicy"
      subtitle="Villkor"
    >
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Användarvillkor</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Senast uppdaterad: December 2025
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">1. Allmänt</h3>
              <p className="text-gray-600 mb-4">
                Dessa villkor gäller för användning av Flexra Consulting AB:s tjänster 
                och webbplats. Genom att använda våra tjänster godkänner du dessa villkor.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">2. Tjänster</h3>
              <p className="text-gray-600 mb-4">
                Flexra erbjuder konsulttjänster inom AI och automation. Specifika villkor 
                för varje uppdrag regleras i separata avtal.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">3. Integritet</h3>
              <p className="text-gray-600 mb-4">
                Vi värnar om din integritet och behandlar personuppgifter i enlighet med 
                GDPR. Vi samlar endast in uppgifter som är nödvändiga för att leverera 
                våra tjänster.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">4. Cookies</h3>
              <p className="text-gray-600 mb-4">
                Vår webbplats använder cookies för att förbättra användarupplevelsen. 
                Du kan när som helst ändra dina cookie-inställningar i din webbläsare.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">5. Ansvarsbegränsning</h3>
              <p className="text-gray-600 mb-4">
                Flexra ansvarar inte för indirekta skador eller följdskador som kan 
                uppstå vid användning av våra tjänster, utöver vad som följer av 
                tvingande lag.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">6. Kontakt</h3>
              <p className="text-gray-600 mb-4">
                Vid frågor om dessa villkor, kontakta oss på info@flexra.se
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
