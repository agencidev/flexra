"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * CaseStudyGallery
 *
 * Bildgalleri med lightbox för screenshots.
 * Används på case study-sidor för att visa projektbilder.
 */

export function CaseStudyGallery({ images = [], className = "" }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const goToPrevious = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setLightboxIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => {
          const imageUrl = typeof image === "string" ? image : image.url;
          const imageAlt = typeof image === "string" ? `Screenshot ${index + 1}` : (image.alt || `Screenshot ${index + 1}`);

          return (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-video overflow-hidden rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Stäng"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Föregående"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={typeof images[lightboxIndex] === "string" ? images[lightboxIndex] : images[lightboxIndex].url}
              alt={typeof images[lightboxIndex] === "string" ? `Screenshot ${lightboxIndex + 1}` : (images[lightboxIndex].alt || `Screenshot ${lightboxIndex + 1}`)}
              width={1920}
              height={1080}
              className="object-contain w-full h-auto max-h-[90vh] rounded-lg"
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Nästa"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CaseStudyGallery;
