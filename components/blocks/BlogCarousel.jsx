"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * BlogCarousel - Horisontellt scrollande blogg-karusell
 *
 * @example
 * <BlogCarousel
 *   posts={posts}
 *   title="Senaste insikter och trender"
 *   badge="Blogg och artiklar"
 * />
 */
export function BlogCarousel({
  posts = [],
  title = "Senaste insikter och trender",
  badge = "Blogg och artiklar",
  background = "white"
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const bgClass = background === "white" ? "bg-white" : "bg-[#f8f8f6]";

  // Funktion för att mappa kategori till bakgrundsfärg
  const getCategoryBgColor = (categoryColor) => {
    if (categoryColor?.includes("pink")) return "#fce7f3";
    if (categoryColor?.includes("yellow")) return "#fef9c3";
    if (categoryColor?.includes("lime")) return "#ecfccb";
    return "#fce7f3";
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 md:py-24 lg:py-28 ${bgClass}`}>
      {/* Header med navigation */}
      <div className="px-[5%] mb-10 md:mb-12">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              {badge && (
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                  {badge}
                </p>
              )}
              {title && <h2>{title}</h2>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Föregående"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Nästa"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horisontellt scrollande kort */}
      <div className="px-[5%]">
        <div className="container">
          <div className="relative overflow-hidden">
            {/* Fade till höger */}
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide"
            >
              <div
                className="flex gap-6 pb-4 px-2"
                style={{ width: "max-content" }}
              >
                {posts.map((post, index) => (
                  <Link
                    key={post.slug || index}
                    href={`/insikter/${post.slug}`}
                    className="block w-[320px] md:w-[380px] flex-shrink-0 rounded-3xl overflow-hidden group transition-transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: getCategoryBgColor(post.categoryColor)
                    }}
                  >
                    {/* Bild */}
                    <div className="p-4 pb-0">
                      <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                        <Image
                          src={post.image || "/placeholder.jpg"}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 380px, 320px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Innehåll */}
                    <div className="p-6 pt-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${post.categoryColor || "bg-pink-200"} text-gray-800 mb-3`}
                      >
                        {post.category || "Insikter"}
                      </span>
                      <h5 className="mb-2">{post.title}</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {post.description}
                      </p>
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

export default BlogCarousel;
