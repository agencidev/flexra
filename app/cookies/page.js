"use client";

import { PageLayout } from "../../components/PageLayout";
import { showCookiePreferences } from "../../components/CookieConsent";

export default function CookiesPage() {
  return (
    <PageLayout title="Cookie Policy" subtitle="Cookies">
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-gray-600 mb-8">Senast uppdaterad: December 2024</p>

            <div className="prose prose-gray max-w-none space-y-8">
              {/* Introduktion */}
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Vad är cookies?</h2>
                <p className="text-gray-600 mb-4">
                  Cookies är små textfiler som lagras på din enhet (dator, surfplatta
                  eller mobiltelefon) när du besöker en webbplats. De används för att
                  webbplatsen ska fungera korrekt, för att förbättra användarupplevelsen
                  och för att samla in statistik om hur webbplatsen används.
                </p>
                <p className="text-gray-600">
                  Denna cookie policy förklarar vilka cookies vi använder, varför vi
                  använder dem och hur du kan hantera dina cookie-inställningar.
                </p>
              </div>

              {/* Kategorier */}
              <div>
                <h2 className="text-2xl font-bold mb-4">2. Typer av cookies vi använder</h2>
                <p className="text-gray-600 mb-4">
                  Vi använder följande kategorier av cookies på vår webbplats:
                </p>

                {/* Nödvändiga */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Nödvändiga cookies (Obligatoriska)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Dessa cookies är nödvändiga för att webbplatsen ska fungera
                    korrekt. De möjliggör grundläggande funktioner som sidnavigering
                    och åtkomst till säkra områden. Webbplatsen kan inte fungera
                    ordentligt utan dessa cookies.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Cookie
                          </th>
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Syfte
                          </th>
                          <th className="py-2 font-semibold text-gray-900">
                            Varaktighet
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-mono">cc_cookie</td>
                          <td className="py-2 pr-4">
                            Lagrar dina cookie-preferenser
                          </td>
                          <td className="py-2">6 månader</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytiska */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Analytiska cookies (Valfria)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Dessa cookies hjälper oss att förstå hur besökare använder
                    webbplatsen genom att samla in och rapportera information
                    anonymt. Informationen används för att förbättra webbplatsens
                    innehåll och funktionalitet.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Cookie
                          </th>
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Tjänst
                          </th>
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Syfte
                          </th>
                          <th className="py-2 font-semibold text-gray-900">
                            Varaktighet
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-mono">_ga</td>
                          <td className="py-2 pr-4">Google Analytics</td>
                          <td className="py-2 pr-4">
                            Särskiljer användare och sessioner
                          </td>
                          <td className="py-2">2 år</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-mono">_gid</td>
                          <td className="py-2 pr-4">Google Analytics</td>
                          <td className="py-2 pr-4">Särskiljer användare</td>
                          <td className="py-2">24 timmar</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-mono">_gat</td>
                          <td className="py-2 pr-4">Google Analytics</td>
                          <td className="py-2 pr-4">
                            Begränsar antalet förfrågningar
                          </td>
                          <td className="py-2">1 minut</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Funktionella */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Funktionella cookies (Valfria)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Dessa cookies gör det möjligt för webbplatsen att erbjuda
                    förbättrad funktionalitet och anpassning. De kan sättas av oss
                    eller av tredjepartsleverantörer vars tjänster vi har lagt till
                    på våra sidor.
                  </p>
                  <p className="text-gray-600">
                    Exempel på funktioner som kan påverkas om du avaktiverar dessa
                    cookies:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Språkinställningar</li>
                    <li>UI-preferenser</li>
                    <li>Formulärförifyllning</li>
                  </ul>
                </div>

                {/* Marknadsföring */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">
                    Marknadsföringscookies (Valfria)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Dessa cookies används för att spåra besökare över webbplatser.
                    Syftet är att visa annonser som är relevanta och engagerande för
                    den enskilda användaren.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Cookie
                          </th>
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Tjänst
                          </th>
                          <th className="py-2 pr-4 font-semibold text-gray-900">
                            Syfte
                          </th>
                          <th className="py-2 font-semibold text-gray-900">
                            Varaktighet
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-mono">_fbp</td>
                          <td className="py-2 pr-4">Meta (Facebook)</td>
                          <td className="py-2 pr-4">
                            Levererar annonser och mäter effektivitet
                          </td>
                          <td className="py-2">3 månader</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-mono">_fbc</td>
                          <td className="py-2 pr-4">Meta (Facebook)</td>
                          <td className="py-2 pr-4">
                            Spårar klick från Facebook-annonser
                          </td>
                          <td className="py-2">3 månader</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Hantera cookies */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  3. Hur du hanterar cookies
                </h2>
                <p className="text-gray-600 mb-4">
                  Du kan när som helst ändra dina cookie-inställningar genom att
                  klicka på knappen nedan:
                </p>
                <button
                  onClick={showCookiePreferences}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors mb-6"
                >
                  Ändra cookie-inställningar
                </button>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Hantera cookies via webbläsaren
                </h3>
                <p className="text-gray-600 mb-4">
                  Du kan också hantera cookies direkt i din webbläsare. Här är
                  instruktioner för de vanligaste webbläsarna:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/sv/kb/rensa-kakor-och-webbplatsdata-firefox"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/sv-se/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/sv-se/microsoft-edge/ta-bort-cookies-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  <strong>Observera:</strong> Om du blockerar eller raderar cookies
                  kan vissa delar av webbplatsen sluta fungera korrekt.
                </p>
              </div>

              {/* Tredjepartscookies */}
              <div>
                <h2 className="text-2xl font-bold mb-4">4. Tredjepartscookies</h2>
                <p className="text-gray-600 mb-4">
                  Vi använder tjänster från tredje part som kan sätta egna cookies
                  på din enhet. Vi har ingen kontroll över dessa cookies och du bör
                  läsa respektive leverantörs integritetspolicy för mer information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      Google Analytics - Googles integritetspolicy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/privacy/policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      Meta (Facebook) - Metas datapolicy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Uppdateringar */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. Uppdateringar av denna policy
                </h2>
                <p className="text-gray-600">
                  Vi kan komma att uppdatera denna cookie policy för att
                  återspegla ändringar i vår användning av cookies eller av andra
                  operativa, juridiska eller regulatoriska skäl. Vi rekommenderar
                  att du regelbundet granskar denna sida för att hålla dig
                  informerad om vår användning av cookies.
                </p>
              </div>

              {/* Kontakt */}
              <div>
                <h2 className="text-2xl font-bold mb-4">6. Kontakta oss</h2>
                <p className="text-gray-600 mb-4">
                  Om du har frågor om vår användning av cookies eller denna
                  policy, kontakta oss:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">
                    FLEXRA Consulting AB
                  </p>
                  <p className="text-gray-600">Org.nr: 559117-3678</p>
                  <p className="text-gray-600">
                    E-post:{" "}
                    <a
                      href="mailto:info@flexra.se"
                      className="text-black underline hover:no-underline"
                    >
                      info@flexra.se
                    </a>
                  </p>
                </div>
              </div>

              {/* Relaterade dokument */}
              <div>
                <h2 className="text-2xl font-bold mb-4">7. Relaterade dokument</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <a
                      href="/integritetspolicy"
                      className="text-black underline hover:no-underline"
                    >
                      Integritetspolicy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/villkor"
                      className="text-black underline hover:no-underline"
                    >
                      Användarvillkor
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
