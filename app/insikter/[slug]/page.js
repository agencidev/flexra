"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Share2, Bookmark, Linkedin, Twitter } from "lucide-react";
import { Navbar1 } from "../../../components/Navbar1";
import { Footer1 } from "../../../components/Footer1";
import { posts } from "../../../components/Blog37";

export default function BlogPostPage() {
  const params = useParams();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artikeln hittades inte</h1>
          <Link href="/insikter" className="text-gray-600 hover:text-gray-900">
            ← Tillbaka till insikter
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with dark background */}
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

      {/* Article Header */}
      <article className="px-[5%] py-8 md:py-12">
        <div className="container max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author info */}
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

          {/* Share buttons */}
          <div className="flex items-center gap-3 pb-8 border-b border-gray-200">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              <Linkedin className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Featured Image */}
          <div className="my-8 md:my-12 rounded-2xl overflow-hidden relative aspect-[2/1]">
            <Image
              src={post.image.replace("w=600&h=400", "w=1200&h=600")}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-8 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                return (
                  <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\. /)) {
                const items = paragraph.split('\n').filter(item => item.match(/^\d\. /));
                return (
                  <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item.replace(/^\d\. /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-gray-600 leading-relaxed my-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
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

          {/* Author Card */}
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
                <p className="font-semibold text-lg">{post.author}</p>
                <p className="text-gray-600 text-sm mt-1">
                  Expert inom AI och automation med över 10 års erfarenhet av att hjälpa 
                  företag att effektivisera sina processer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="px-[5%] py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Relaterade artiklar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Link 
                key={index}
                href={`/insikter/${relatedPost.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${relatedPost.categoryColor}`}>
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-3 group-hover:text-gray-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer1 />
    </div>
  );
}
