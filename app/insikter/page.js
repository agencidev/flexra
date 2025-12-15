"use client";

import { PageLayout } from "../../components/PageLayout";
import Link from "next/link";

const posts = [
  {
    slug: "designa-foretagskulturer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-pink-100",
    title: "Designa företagskulturer",
    description: "Utforska hur du sätter medarbetarna i centrum av din företagskultur för att driva framgång och lojalitet.",
    date: "12 dec 2025",
    author: "Erik Lindqvist"
  },
  {
    slug: "leda-hybrida-team-val",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-yellow-100",
    title: "Leda hybrida team väl",
    description: "Lär dig hur du framgångsrikt hanterar en arbetsstyrka som blandar kontor och distansarbete.",
    date: "10 dec 2025",
    author: "Anna Bergström"
  },
  {
    slug: "arbetsfloden-for-effektivitet",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-lime-100",
    title: "Arbetsflöden för effektivitet",
    description: "Upptäck hur automation kan förenkla dagliga operationer och öka den övergripande produktiviteten.",
    date: "8 dec 2025",
    author: "Marcus Holm"
  },
  {
    slug: "ai-i-vardagen",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-pink-100",
    title: "AI i vardagen",
    description: "Se hur artificiell intelligens blir en naturlig del av moderna arbetsplatser.",
    date: "5 dec 2025",
    author: "Erik Lindqvist"
  },
  {
    slug: "framtidens-arbetsplats",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-yellow-100",
    title: "Framtidens arbetsplats",
    description: "Hur teknologi formar morgondagens kontor och arbetsmiljöer.",
    date: "3 dec 2025",
    author: "Anna Bergström"
  },
  {
    slug: "datadriven-strategi",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-lime-100",
    title: "Datadriven strategi",
    description: "Använd data för att fatta bättre beslut och driva tillväxt i din organisation.",
    date: "1 dec 2025",
    author: "Marcus Holm"
  },
];

export default function InsikterPage() {
  return (
    <PageLayout 
      title="Senaste insikter och trender inom AI och automation"
      subtitle="Insikter"
    >
      <section className="px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link 
                key={index}
                href={`/insikter/${post.slug}`}
                className="group"
              >
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${post.categoryColor}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {post.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Av {post.author}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
