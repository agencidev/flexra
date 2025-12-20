import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Calendar, Quote } from "lucide-react";
import { Navbar1 } from "../../../components/Navbar1";
import { Footer1 } from "../../../components/Footer1";
import { CaseStudyMetrics, CaseStudyTechStack, CaseStudyGallery, DeviceMockup } from "../../../components/blocks";
import { getCaseStudyBySlug, getRelatedCaseStudies, getAllCaseStudies } from "../../../lib/case-studies";
import { GetStartedButton } from "../../../components/ui/get-started-button";
import { Button } from "../../../components/ui/button";

/**
 * Enkel markdown-parser för case study-innehåll
 * Hanterar: h2, h3, listor, fetstil, och paragrafer
 */
function parseMarkdown(content) {
  if (!content) return null;

  const elements = [];
  const lines = content.split("\n");
  let currentList = [];
  let listType = null;
  let currentParagraph = [];
  let elementIndex = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={elementIndex++} className="text-gray-600 leading-relaxed my-4">
            {parseInlineMarkdown(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={elementIndex++} className="list-disc pl-6 my-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-600">{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={elementIndex++} className="list-decimal pl-6 my-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-600">{parseInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      flushList();
      flushParagraph();
      continue;
    }

    if (trimmedLine.startsWith("## ")) {
      flushList();
      flushParagraph();
      elements.push(
        <h2 key={elementIndex++} className="mt-10 mb-4">
          {trimmedLine.replace("## ", "")}
        </h2>
      );
      continue;
    }

    if (trimmedLine.startsWith("### ")) {
      flushList();
      flushParagraph();
      elements.push(
        <h3 key={elementIndex++} className="mt-8 mb-3">
          {trimmedLine.replace("### ", "")}
        </h3>
      );
      continue;
    }

    if (trimmedLine.startsWith("- ")) {
      flushParagraph();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      currentList.push(trimmedLine.replace("- ", ""));
      continue;
    }

    if (trimmedLine.match(/^\d+\. /)) {
      flushParagraph();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      currentList.push(trimmedLine.replace(/^\d+\. /, ""));
      continue;
    }

    flushList();
    currentParagraph.push(trimmedLine);
  }

  flushList();
  flushParagraph();

  return elements;
}

function parseInlineMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-medium text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/**
 * Tar bort första rubriken om den matchar sektionsnamnet
 * Förhindrar dubbla rubriker (mallen + innehållet)
 */
function stripLeadingHeading(content, sectionKeywords = []) {
  if (!content) return content;

  const lines = content.split("\n");
  const firstLine = lines[0]?.trim() || "";

  // Kolla om första raden är en h2 eller h3
  if (firstLine.startsWith("## ") || firstLine.startsWith("### ")) {
    const headingText = firstLine.replace(/^#+ /, "").toLowerCase();

    // Kolla om rubriken matchar något av nyckelorden
    const matches = sectionKeywords.some(keyword =>
      headingText.includes(keyword.toLowerCase())
    );

    if (matches) {
      // Ta bort första raden och eventuella tomma rader efter
      let startIndex = 1;
      while (startIndex < lines.length && lines[startIndex].trim() === "") {
        startIndex++;
      }
      return lines.slice(startIndex).join("\n");
    }
  }

  return content;
}

// Generera metadata dynamiskt för SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case study hittades inte"
    };
  }

  // Använd SEO-specifika fält från AITable om de finns, annars fallback
  const seoTitle = caseStudy.metaTitle || `${caseStudy.title} | Case Study`;
  const seoDescription = caseStudy.metaDescription || caseStudy.excerpt || `Läs hur vi hjälpte ${caseStudy.client} med ${caseStudy.category?.toLowerCase()}.`;
  const seoKeywords = caseStudy.keywords || `case study, ${caseStudy.industry}, ${caseStudy.category}, automation, AI, ${caseStudy.client}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    robots: caseStudy.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: `/case-studies/${caseStudy.slug}`
    },
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url: `/case-studies/${caseStudy.slug}`,
      siteName: "Flexra",
      locale: "sv_SE",
      images: caseStudy.heroImage ? [{
        url: caseStudy.heroImage,
        width: 1200,
        height: 630,
        alt: caseStudy.title
      }] : [],
      publishedTime: caseStudy.date,
      section: caseStudy.category
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: caseStudy.heroImage ? [caseStudy.heroImage] : []
    }
  };
}

// Generera statiska paths för alla publicerade case studies
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();

  return caseStudies.map((cs) => ({
    slug: cs.slug
  }));
}

// Revalidera varje timme
export const revalidate = 3600;

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = await getRelatedCaseStudies(slug, 3);

  // JSON-LD strukturerad data för sökmotorer (CreativeWork/CaseStudy-liknande)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://flexra.se/case-studies/${caseStudy.slug}`,
    headline: caseStudy.title,
    description: caseStudy.metaDescription || caseStudy.excerpt,
    image: caseStudy.heroImage || undefined,
    datePublished: caseStudy.date,
    dateModified: caseStudy.date,
    inLanguage: "sv-SE",
    author: {
      "@type": "Organization",
      name: "Flexra",
      url: "https://flexra.se"
    },
    publisher: {
      "@type": "Organization",
      name: "Flexra",
      url: "https://flexra.se",
      logo: {
        "@type": "ImageObject",
        url: "https://flexra.se/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://flexra.se/case-studies/${caseStudy.slug}`
    },
    about: {
      "@type": "Organization",
      name: caseStudy.client,
      industry: caseStudy.industry
    },
    keywords: caseStudy.keywords || `${caseStudy.category}, ${caseStudy.industry}, automation`
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD strukturerad data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
        }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar1 />

        <div className="px-[5%] pt-28 md:pt-32 pb-16 md:pb-24">
          <div className="container max-w-5xl mx-auto">
            {/* Tillbaka-länk */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Alla case studies
            </Link>

            {/* Kategori-badge */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full ${caseStudy.categoryColor || "bg-pink-100"} text-gray-800`}>
                {caseStudy.category}
              </span>
            </div>

            {/* Titel - responsiv storlek enligt styleguide 14.4 */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              {caseStudy.title}
            </h1>

            {/* Kund och metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              {caseStudy.clientLogo && (
                <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden">
                  <Image
                    src={caseStudy.clientLogo}
                    alt={caseStudy.client}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>{caseStudy.client}</span>
              </div>
              {caseStudy.industry && (
                <span className="text-gray-400">•</span>
              )}
              {caseStudy.industry && (
                <span>{caseStudy.industry}</span>
              )}
              {caseStudy.date && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{caseStudy.date}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics + DeviceMockup kombinerat för webbprojekt */}
      {(caseStudy.desktopScreenshot || caseStudy.mobileScreenshot) ? (
        <section className="px-[5%] -mt-8 relative">
          <div className="container max-w-5xl mx-auto">
            {/* Metrics överst med högre z-index */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="relative z-20">
                <CaseStudyMetrics metrics={caseStudy.metrics} />
              </div>
            )}
            {/* DeviceMockup under metrics med negativ margin för överlapp */}
            <div className="relative z-10 -mt-8 md:-mt-12">
              <DeviceMockup
                desktopImage={caseStudy.desktopScreenshot}
                mobileImage={caseStudy.mobileScreenshot}
                websiteUrl={caseStudy.websiteUrl}
                alt={`${caseStudy.client} webbplats`}
              />
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Metrics Section (utan webbprojekt) */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <section className="px-[5%] -mt-8 relative z-10">
              <div className="container max-w-5xl mx-auto">
                <CaseStudyMetrics metrics={caseStudy.metrics} />
              </div>
            </section>
          )}

          {/* Hero Image (för icke-webbprojekt) */}
          {caseStudy.heroImage && (
            <section className="px-[5%] py-12 md:py-16">
              <div className="container max-w-5xl mx-auto">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src={caseStudy.heroImage}
                    alt={caseStudy.title}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Content + Sidebar */}
      <section className="px-[5%] py-12 md:py-16">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Utmaning */}
              {caseStudy.challenge && (
                <div className="mb-12">
                  <h2 className="mb-6">Utmaningen</h2>
                  <div className="prose prose-lg max-w-none">
                    {parseMarkdown(stripLeadingHeading(caseStudy.challenge, ["utmaning", "challenge"]))}
                  </div>
                </div>
              )}

              {/* Lösning */}
              {caseStudy.solution && (
                <div className="mb-12">
                  <h2 className="mb-6">Vår lösning</h2>
                  <div className="prose prose-lg max-w-none">
                    {parseMarkdown(stripLeadingHeading(caseStudy.solution, ["lösning", "solution", "vår lösning"]))}
                  </div>
                </div>
              )}

              {/* Resultat */}
              {caseStudy.results && (
                <div className="mb-12">
                  <h2 className="mb-6">Resultaten</h2>
                  <div className="prose prose-lg max-w-none">
                    {parseMarkdown(stripLeadingHeading(caseStudy.results, ["resultat", "results"]))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Kundinformation */}
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h4 className="mb-4">Om kunden</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Företag</p>
                        <p className="font-medium">{caseStudy.client}</p>
                      </div>
                    </div>
                    {caseStudy.industry && (
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 text-gray-400 mt-0.5 flex items-center justify-center">
                          <span className="text-lg">🏢</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bransch</p>
                          <p className="font-medium">{caseStudy.industry}</p>
                        </div>
                      </div>
                    )}
                    {caseStudy.category && (
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 text-gray-400 mt-0.5 flex items-center justify-center">
                          <span className="text-lg">⚡</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Lösningstyp</p>
                          <p className="font-medium">{caseStudy.category}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                {caseStudy.techStack && (
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h4 className="mb-4">Verktyg som användes</h4>
                    <CaseStudyTechStack tools={caseStudy.techStack} />
                  </div>
                )}

                {/* CTA */}
                <div className="p-6 bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl">
                  <h4 className="mb-2">Vill du uppnå liknande resultat?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Vi hjälper dig att automatisera och effektivisera dina processer.
                  </p>
                  <Link href="/kontakt" className="block">
                    <GetStartedButton dark className="w-full">Kontakta oss</GetStartedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="px-[5%] py-16 bg-gray-50">
          <div className="container max-w-5xl mx-auto">
            <h2 className="mb-8">Screenshots</h2>
            <CaseStudyGallery images={caseStudy.gallery} />
          </div>
        </section>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="px-[5%] py-10 md:py-14">
          <div className="container max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-gray-200 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              "{caseStudy.testimonial}"
            </blockquote>
            {(caseStudy.testimonialAuthor || caseStudy.testimonialRole) && (
              <div>
                {caseStudy.testimonialAuthor && (
                  <p className="font-medium text-gray-900">{caseStudy.testimonialAuthor}</p>
                )}
                {caseStudy.testimonialRole && (
                  <p className="text-sm text-gray-500">{caseStudy.testimonialRole}</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-[5%] py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Redo att ta nästa steg?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Låt oss diskutera hur vi kan hjälpa ditt företag att uppnå liknande resultat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <GetStartedButton>Boka ett möte</GetStartedButton>
            </Link>
            <Link href="/case-studies">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Se fler case studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="px-[5%] py-16 md:py-24">
          <div className="container">
            <h2 className="mb-8">Relaterade case studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCaseStudies.map((related) => (
                <Link
                  key={related.id || related.slug}
                  href={`/case-studies/${related.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={related.heroImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"}
                        alt={related.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${related.categoryColor || "bg-pink-100"} text-gray-800`}>
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>{related.client}</span>
                        {related.industry && (
                          <>
                            <span>•</span>
                            <span>{related.industry}</span>
                          </>
                        )}
                      </div>
                      <h5 className="mb-3 group-hover:text-gray-600 transition-colors">
                        {related.title}
                      </h5>
                      <p className="text-gray-600 text-sm flex-1">
                        {related.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer1 />
    </div>
  );
}
