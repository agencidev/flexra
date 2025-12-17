"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Filter, ChevronDown } from "lucide-react";

/**
 * BlogListWithSearch - Blogg-lista med sökning, filtrering och pagination
 *
 * @example
 * <BlogListWithSearch posts={posts} postsPerPage={18} />
 */
export function BlogListWithSearch({
  posts = [],
  postsPerPage = 18,
  showAuthor = true,
  showDate = true,
  showDescription = true
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [visibleCount, setVisibleCount] = useState(postsPerPage);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extrahera unika kategorier
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map(post => post.category))];
    return ["Alla", ...cats];
  }, [posts]);

  // Filtrera posts baserat på sökning och kategori
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Sökfilter
      const matchesSearch = searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());

      // Kategorifilter
      const matchesCategory = selectedCategory === "Alla" ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // Posts att visa (med pagination)
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  // Ladda fler
  const loadMore = () => {
    setVisibleCount(prev => prev + postsPerPage);
  };

  // Rensa filter
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Alla");
    setVisibleCount(postsPerPage);
  };

  // Har aktiva filter
  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "Alla";

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
      <div className="container">
        {/* Sök och filter */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Sökfält */}
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Sök artiklar..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(postsPerPage);
                }}
                className="block w-full pl-11 pr-10 py-3 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Kategorifilter - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleCount(postsPerPage);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Kategorifilter - Mobile */}
            <div className="md:hidden relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-full bg-gray-50 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedCategory}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 overflow-hidden">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setVisibleCount(postsPerPage);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-gray-100 font-medium"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Aktiva filter och resultaträknare */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              {filteredPosts.length === posts.length ? (
                <span>Visar {Math.min(visibleCount, filteredPosts.length)} av {filteredPosts.length} artiklar</span>
              ) : (
                <span>{filteredPosts.length} {filteredPosts.length === 1 ? "träff" : "träffar"}</span>
              )}
            </p>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Rensa filter
              </button>
            )}
          </div>
        </div>

        {/* Resultat */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Inga artiklar hittades</h3>
            <p className="text-gray-500 mb-4">
              Prova att söka med andra ord eller rensa filtren
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Visa alla artiklar
            </button>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.map((post, index) => (
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
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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

            {/* Load more */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Visa fler artiklar
                  <ChevronDown className="h-4 w-4" />
                </button>
                <p className="mt-3 text-sm text-gray-500">
                  {filteredPosts.length - visibleCount} {filteredPosts.length - visibleCount === 1 ? "artikel" : "artiklar"} kvar
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default BlogListWithSearch;
