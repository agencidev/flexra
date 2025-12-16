"use client";

import { PageLayout } from "../../components/PageLayout";

export default function IntegritetspolicyPage() {
  return (
    <PageLayout
      title="Integritetspolicy"
      subtitle="Dataskydd"
    >
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-gray-600 mb-8">
              Senast uppdaterad: December 2024
            </p>

            <div className="prose prose-gray max-w-none space-y-8">
              {/* Introduktion */}
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Introduktion</h2>
                <p className="text-gray-600 mb-4">
                  FLEXRA Consulting AB, org.nr 559117-3678 (&quot;Flexra&quot;, &quot;vi&quot;, &quot;oss&quot; eller &quot;vår&quot;),
                  värnar om din personliga integritet. Denna integritetspolicy förklarar hur vi
                  samlar in, använder, lagrar och skyddar dina personuppgifter i enlighet med
                  EU:s dataskyddsförordning (GDPR) och den svenska dataskyddslagen (2018:218).
                </p>
                <p className="text-gray-600">
                  Vi är personuppgiftsansvariga för behandlingen av dina personuppgifter som
                  beskrivs i denna policy.
                </p>
              </div>

              {/* Vilka uppgifter vi samlar in */}
              <div>
                <h2 className="text-2xl font-bold mb-4">2. Vilka personuppgifter samlar vi in?</h2>
                <p className="text-gray-600 mb-4">
                  Vi samlar in följande kategorier av personuppgifter:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Kontaktuppgifter</h3>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                  <li>Namn</li>
                  <li>E-postadress</li>
                  <li>Telefonnummer</li>
                  <li>Företagsnamn och titel</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Tekniska uppgifter</h3>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                  <li>IP-adress</li>
                  <li>Webbläsartyp och version</li>
                  <li>Enhetsinformation</li>
                  <li>Besöksbeteende på webbplatsen</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Kommunikationsuppgifter</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Meddelanden du skickar till oss via kontaktformulär</li>
                  <li>E-postkorrespondens</li>
                </ul>
              </div>

              {/* Hur vi samlar in uppgifter */}
              <div>
                <h2 className="text-2xl font-bold mb-4">3. Hur samlar vi in personuppgifter?</h2>
                <p className="text-gray-600 mb-4">
                  Vi samlar in personuppgifter på följande sätt:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Direkt från dig</strong> – när du fyller i kontaktformulär, skickar e-post eller kontaktar oss på annat sätt</li>
                  <li><strong>Automatiskt</strong> – genom cookies och liknande tekniker när du besöker vår webbplats</li>
                  <li><strong>Från tredje part</strong> – i förekommande fall från affärspartners eller offentliga register</li>
                </ul>
              </div>

              {/* Rättslig grund */}
              <div>
                <h2 className="text-2xl font-bold mb-4">4. Rättslig grund för behandling</h2>
                <p className="text-gray-600 mb-4">
                  Vi behandlar dina personuppgifter baserat på följande rättsliga grunder enligt GDPR:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse mb-4">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 pr-4 font-semibold text-gray-900">Ändamål</th>
                        <th className="py-3 font-semibold text-gray-900">Rättslig grund</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Besvara förfrågningar och kommunicera med dig</td>
                        <td className="py-3">Berättigat intresse</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Leverera avtalade tjänster</td>
                        <td className="py-3">Fullgörande av avtal</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Skicka nyhetsbrev och marknadsföring</td>
                        <td className="py-3">Samtycke</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Förbättra våra tjänster och webbplats</td>
                        <td className="py-3">Berättigat intresse</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Uppfylla rättsliga skyldigheter</td>
                        <td className="py-3">Rättslig förpliktelse</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dina rättigheter */}
              <div>
                <h2 className="text-2xl font-bold mb-4">5. Dina rättigheter</h2>
                <p className="text-gray-600 mb-4">
                  Enligt GDPR och svensk dataskyddslagstiftning har du följande rättigheter:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Rätt till tillgång</strong> – Du har rätt att få bekräftelse på om vi behandlar dina personuppgifter och i så fall få tillgång till dessa</li>
                  <li><strong>Rätt till rättelse</strong> – Du har rätt att få felaktiga personuppgifter rättade</li>
                  <li><strong>Rätt till radering</strong> – Du har rätt att under vissa förutsättningar få dina personuppgifter raderade (&quot;rätten att bli bortglömd&quot;)</li>
                  <li><strong>Rätt till begränsning</strong> – Du har rätt att begära att behandlingen av dina personuppgifter begränsas</li>
                  <li><strong>Rätt till dataportabilitet</strong> – Du har rätt att få ut dina personuppgifter i ett strukturerat, maskinläsbart format</li>
                  <li><strong>Rätt att invända</strong> – Du har rätt att invända mot behandling som baseras på berättigat intresse</li>
                  <li><strong>Rätt att återkalla samtycke</strong> – Om behandlingen baseras på samtycke har du rätt att när som helst återkalla detta</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  För att utöva dina rättigheter, kontakta oss på <a href="mailto:info@flexra.se" className="text-black underline hover:no-underline">info@flexra.se</a>.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold mb-4">6. Cookies och spårningstekniker</h2>
                <p className="text-gray-600 mb-4">
                  Vår webbplats använder cookies för att förbättra din upplevelse. Cookies är
                  små textfiler som lagras på din enhet.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Typer av cookies vi använder:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Nödvändiga cookies</strong> – Krävs för att webbplatsen ska fungera korrekt</li>
                  <li><strong>Analytiska cookies</strong> – Hjälper oss förstå hur besökare använder webbplatsen</li>
                  <li><strong>Funktionella cookies</strong> – Möjliggör förbättrad funktionalitet och personalisering</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Du kan hantera dina cookie-inställningar via din webbläsare. Observera att
                  blockering av vissa cookies kan påverka webbplatsens funktionalitet.
                </p>
              </div>

              {/* Lagring och säkerhet */}
              <div>
                <h2 className="text-2xl font-bold mb-4">7. Lagring och säkerhet</h2>
                <p className="text-gray-600 mb-4">
                  Vi lagrar dina personuppgifter endast så länge det är nödvändigt för de
                  ändamål för vilka de samlades in, eller så länge vi är skyldiga enligt lag.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-3">Lagringsperioder:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Kontaktförfrågningar: 2 år efter senaste kontakt</li>
                  <li>Kunduppgifter: 7 år efter avslutat uppdrag (bokföringskrav)</li>
                  <li>Nyhetsbrev: Tills du avregistrerar dig</li>
                  <li>Tekniska uppgifter: 26 månader</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att
                  skydda dina personuppgifter mot obehörig åtkomst, förlust eller förstöring.
                </p>
              </div>

              {/* Delning av uppgifter */}
              <div>
                <h2 className="text-2xl font-bold mb-4">8. Delning av personuppgifter</h2>
                <p className="text-gray-600 mb-4">
                  Vi säljer aldrig dina personuppgifter. Vi kan dela dina uppgifter med:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Tjänsteleverantörer</strong> – Som hjälper oss leverera våra tjänster (t.ex. webbhotell, e-postleverantörer)</li>
                  <li><strong>Myndigheter</strong> – När vi är skyldiga enligt lag</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Alla våra tjänsteleverantörer är bundna av databehandlingsavtal och får
                  endast behandla uppgifter enligt våra instruktioner.
                </p>
              </div>

              {/* Överföring till tredje land */}
              <div>
                <h2 className="text-2xl font-bold mb-4">9. Överföring till tredje land</h2>
                <p className="text-gray-600 mb-4">
                  I vissa fall kan dina personuppgifter överföras till länder utanför EU/EES.
                  När så sker säkerställer vi att lämpliga skyddsåtgärder finns på plats,
                  såsom:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>EU-kommissionens standardavtalsklausuler</li>
                  <li>Beslut om adekvat skyddsnivå</li>
                  <li>Bindande företagsregler</li>
                </ul>
              </div>

              {/* Barn */}
              <div>
                <h2 className="text-2xl font-bold mb-4">10. Barns personuppgifter</h2>
                <p className="text-gray-600">
                  Våra tjänster riktar sig inte till barn under 13 år. Vi samlar inte
                  medvetet in personuppgifter från barn under denna ålder. Om du är
                  vårdnadshavare och upptäcker att ditt barn har lämnat personuppgifter
                  till oss, kontakta oss så raderar vi uppgifterna.
                </p>
              </div>

              {/* Ändringar */}
              <div>
                <h2 className="text-2xl font-bold mb-4">11. Ändringar i denna policy</h2>
                <p className="text-gray-600">
                  Vi kan komma att uppdatera denna integritetspolicy. Vid väsentliga
                  ändringar informerar vi dig via e-post eller genom ett meddelande på
                  vår webbplats. Vi rekommenderar att du regelbundet granskar denna
                  policy för att hålla dig informerad.
                </p>
              </div>

              {/* Klagomål */}
              <div>
                <h2 className="text-2xl font-bold mb-4">12. Klagomål</h2>
                <p className="text-gray-600 mb-4">
                  Om du anser att vår behandling av dina personuppgifter strider mot
                  dataskyddslagstiftningen har du rätt att lämna in ett klagomål till
                  tillsynsmyndigheten:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Integritetsskyddsmyndigheten (IMY)</p>
                  <p className="text-gray-600">Box 8114, 104 20 Stockholm</p>
                  <p className="text-gray-600">
                    <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-black underline hover:no-underline">
                      www.imy.se
                    </a>
                  </p>
                  <p className="text-gray-600">
                    E-post: <a href="mailto:imy@imy.se" className="text-black underline hover:no-underline">imy@imy.se</a>
                  </p>
                </div>
              </div>

              {/* Kontakt */}
              <div>
                <h2 className="text-2xl font-bold mb-4">13. Kontakta oss</h2>
                <p className="text-gray-600 mb-4">
                  Vid frågor om denna integritetspolicy eller hur vi behandlar dina
                  personuppgifter, kontakta oss:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Flexra Consulting AB</p>
                  <p className="text-gray-600">
                    E-post: <a href="mailto:info@flexra.se" className="text-black underline hover:no-underline">info@flexra.se</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
