"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ArrowUpRight, X } from "lucide-react";
import { CaseStudyMetrics } from "../../components/blocks";

export default function CaseStudyList({
  caseStudies = [],
  categories = [],
  industries = []
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // Filtrera case studies baserat på sökning och filter
  const filteredCaseStudies = useMemo(() => {
    let filtered = [...caseStudies];

    // Sökfilter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(cs =>
        cs.title?.toLowerCase().includes(query) ||
        cs.excerpt?.toLowerCase().includes(query) ||
        cs.client?.toLowerCase().includes(query) ||
        cs.industry?.toLowerCase().includes(query)
      );
    }

    // Kategorifilter
    if (selectedCategory) {
      filtered = filtered.filter(cs => cs.category === selectedCategory);
    }

    // Branschfilter
    if (selectedIndustry) {
      filtered = filtered.filter(cs => cs.industry === selectedIndustry);
    }

    return filtered;
  }, [caseStudies, searchQuery, selectedCategory, selectedIndustry]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedIndustry("");
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedIndustry;

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        {/* Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Sökfält */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Sök case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
            </div>

            {/* Filter-dropdowns */}
            <div className="flex gap-3">
              {/* Kategori */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 rounded-full border border-gray-200 bg-white focus:outline-none focus:border-gray-400 cursor-pointer text-sm"
                >
                  <option value="">Alla kategorier</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Bransch */}
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 rounded-full border border-gray-200 bg-white focus:outline-none focus:border-gray-400 cursor-pointer text-sm"
                >
                  <option value="">Alla branscher</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Resultaträknare och rensa filter */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Visar {filteredCaseStudies.length} av {caseStudies.length} case studies
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Rensa filter
              </button>
            )}
          </div>
        </div>

        {/* Case Studies Grid */}
        {filteredCaseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id || caseStudy.slug}
                href={`/case-studies/${caseStudy.slug}`}
                className="group"
              >
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Bild */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={caseStudy.heroImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"}
                      alt={caseStudy.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Kategori-badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${caseStudy.categoryColor || "bg-pink-100"} text-gray-800`}>
                        {caseStudy.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Kund och bransch */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>{caseStudy.client}</span>
                      {caseStudy.industry && (
                        <>
                          <span>•</span>
                          <span>{caseStudy.industry}</span>
                        </>
                      )}
                    </div>

                    <h5 className="mb-3 group-hover:text-gray-600 transition-colors">
                      {caseStudy.title}
                    </h5>

                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {caseStudy.excerpt}
                    </p>

                    {/* Metrics preview (visa första 2) */}
                    {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                      <div className="flex gap-4 mb-4">
                        {caseStudy.metrics.slice(0, 2).map((metric, i) => (
                          <div key={i} className="text-center">
                            <span className="text-lg font-medium text-gray-900 block">{metric.value}</span>
                            <span className="text-xs text-gray-500">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Läs mer */}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 group-hover:gap-2 transition-all mt-auto">
                      Läs hela caset <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Inga case studies matchar din sökning.</p>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-900 underline hover:no-underline"
            >
              Rensa filter och visa alla
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
