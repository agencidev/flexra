"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * BlogGrid - Återanvändbar blogg-grid komponent
 *
 * @example
 * <BlogGrid
 *   posts={posts}
 *   columns={3}
 *   limit={6}
 *   showAuthor={true}
 *   background="white"
 * />
 */
export function BlogGrid({
  posts = [],
  columns = 3,
  limit,
  showAuthor = true,
  showDate = true,
  showDescription = true,
  background = "white",
  title,
  subtitle,
  badge
}) {
  // Applicera limit om specificerad
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  // Grid-kolumner baserat på prop
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  };

  const bgClass = background === "white" ? "bg-white" : "bg-[#f8f8f6]";

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${bgClass}`}>
      <div className="container">
        {/* Header (optional) */}
        {(badge || title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {badge && (
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200 mb-6">
                {badge}
              </span>
            )}
            {title && <h2 className="mb-4">{title}</h2>}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${gridCols[columns] || gridCols[3]} gap-8`}>
          {displayPosts.map((post, index) => (
            <Link
              key={post.slug || index}
              href={`/insikter/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full">
                {/* Bild */}
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={post.image || "/blog/placeholder.jpg"}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes={columns === 1
                        ? "100vw"
                        : columns === 2
                          ? "(min-width: 768px) 50vw, 100vw"
                          : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      }
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Innehåll */}
                <div className="p-6">
                  {/* Kategori och datum */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${post.categoryColor || "bg-pink-100"}`}
                    >
                      {post.category || "Insikter"}
                    </span>
                    {showDate && post.date && (
                      <span className="text-xs text-gray-500">{post.date}</span>
                    )}
                  </div>

                  {/* Titel */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Beskrivning */}
                  {showDescription && post.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>
                  )}

                  {/* Författare */}
                  {showAuthor && post.author && (
                    <p className="text-xs text-gray-500">Av {post.author}</p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogGrid;
