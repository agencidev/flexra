import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Share2, Bookmark, Link2 } from "lucide-react";
import { Navbar1 } from "../../../components/Navbar1";
import { Footer1 } from "../../../components/Footer1";
import { getPostBySlug, getRelatedPosts, getAllPosts } from "../../../lib/posts";

/**
 * Enkel markdown-parser för blogginlägg
 * Hanterar: h2, h3, listor, fetstil, och paragrafer
 */
function parseMarkdown(content) {
  if (!content) return null;

  const elements = [];
  // Dela först på rader för att hantera varje rad separat
  const lines = content.split("\n");
  let currentList = [];
  let listType = null; // "ul" eller "ol"
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

    // Tom rad - avsluta paragraf
    if (trimmedLine === "") {
      flushList();
      flushParagraph();
      continue;
    }

    // H2 rubrik
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

    // H3 rubrik
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

    // Oordnad lista
    if (trimmedLine.startsWith("- ")) {
      flushParagraph();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      currentList.push(trimmedLine.replace("- ", ""));
      continue;
    }

    // Ordnad lista
    if (trimmedLine.match(/^\d+\. /)) {
      flushParagraph();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      currentList.push(trimmedLine.replace(/^\d+\. /, ""));
      continue;
    }

    // Vanlig text - lägg till i paragraf
    flushList();
    currentParagraph.push(trimmedLine);
  }

  // Töm eventuellt kvarvarande innehåll
  flushList();
  flushParagraph();

  return elements;
}

/**
 * Parser för inline markdown (fetstil, kursiv)
 */
function parseInlineMarkdown(text) {
  // Hantera **fetstil**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-medium">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// Generera metadata dynamiskt för SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel hittades inte"
    };
  }

  // Använd SEO-specifika fält med fallbacks
  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.description;

  return {
    // Använder template från layout.js: "%s | Flexra"
    title: seoTitle,
    description: seoDescription,
    keywords: post.keywords || "AI, automation, digitalisering, effektivisering, företag",
    authors: [{ name: post.author }],
    robots: post.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      // metadataBase från layout.js gör att relativa URLs fungerar
      canonical: post.canonicalUrl || `/insikter/${post.slug}`
    },
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      // Relativ URL - metadataBase gör den absolut
      url: `/insikter/${post.slug}`,
      images: post.image ? [{
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.imageAlt || post.title
      }] : [],
      publishedTime: post.date,
      authors: [post.author],
      section: post.category
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: post.image ? [post.image] : []
    }
  };
}

// Generera statiska paths för alla publicerade inlägg
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug
  }));
}

// Revalidera varje timme
export const revalidate = 3600;

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, 3);

  // JSON-LD strukturerad data för sökmotorer (Article schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.description,
    image: post.image || undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author
    },
    publisher: {
      "@type": "Organization",
      name: "Flexra",
      logo: {
        "@type": "ImageObject",
        url: "https://flexra.se/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://flexra.se/insikter/${post.slug}`
    },
    keywords: post.keywords || "AI, automation, digitalisering"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD strukturerad data (med XSS-skydd) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
        }}
      />

      {/* Header med mörk bakgrund */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar1 />
      </div>

      {/* Breadcrumb */}
      <div className="px-[5%] pt-8">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Hem</Link>
            <span>/</span>
            <Link href="/insikter" className="hover:text-gray-900">Insikter</Link>
          </div>
        </div>
      </div>

      {/* Artikelns header */}
      <article className="px-[5%] py-8 md:py-12">
        <div className="container max-w-4xl mx-auto">
          {/* Titel */}
          <h1 className="mb-6">
            {post.title}
          </h1>

          {/* Författarinfo */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt={post.author}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-gray-500">{post.date} · 5 min läsning</p>
            </div>
          </div>

          {/* Dela-knappar */}
          <div className="flex items-center gap-3 pb-8 border-b border-gray-200">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <Link2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Featured-bild */}
          {post.image && (
            <div className="my-8 md:my-12 rounded-2xl overflow-hidden relative aspect-[2/1]">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Artikelinnehåll */}
          <div className="prose prose-lg max-w-none">
            {post.content && parseMarkdown(post.content)}
          </div>

          {/* Taggar */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              {post.category}
            </span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              Automation
            </span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              Produktivitet
            </span>
          </div>

          {/* Författarkort */}
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt={post.author}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="mb-1">{post.author}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Expert inom AI och automation med över 10 års erfarenhet av att hjälpa
                  företag att effektivisera sina processer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Relaterade inlägg */}
      {relatedPosts.length > 0 && (
        <section className="px-[5%] py-16 bg-gray-50">
          <div className="container">
            <h2 className="mb-8">Relaterade artiklar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.slug || index}
                  href={`/insikter/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={relatedPost.image || "/blog/placeholder.jpg"}
                      alt={relatedPost.imageAlt || relatedPost.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${relatedPost.categoryColor || "bg-pink-100"}`}>
                      {relatedPost.category}
                    </span>
                    <h3 className="mt-3 group-hover:text-gray-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
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
