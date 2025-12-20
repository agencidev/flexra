"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * DeviceMockup
 *
 * Visar en webbplats i både desktop- och mobilvy.
 * Mobilen överlappar laptopen för en mer dynamisk layout.
 * Stöder karusell när flera desktopbilder finns.
 */

export function DeviceMockup({
  desktopImage,
  desktopImages = [],
  mobileImage,
  websiteUrl,
  alt = "Webbplats mockup"
}) {
  // Kombinera desktopImage och desktopImages till en array
  const allDesktopImages = desktopImages.length > 0
    ? desktopImages
    : desktopImage ? [desktopImage] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = allDesktopImages.length > 1;
  const currentDesktopImage = allDesktopImages[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allDesktopImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allDesktopImages.length - 1 ? 0 : prev + 1));
  };

  // Om vi inte har bilder, visa ingenting
  if (!currentDesktopImage && !mobileImage) return null;

  return (
    <div className="relative">
      {/* Desktop/Laptop Frame - centrerad */}
      {currentDesktopImage && (
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Laptop Screen */}
          <div className="relative bg-gray-900 rounded-t-2xl p-2 pb-0 shadow-2xl">
            {/* Camera */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gray-700 rounded-full" />

            {/* Screen */}
            <div className="relative aspect-[16/10] bg-white rounded-t-xl overflow-hidden mt-3">
              <Image
                src={currentDesktopImage}
                alt={`${alt} - Desktop ${hasMultipleImages ? `(${currentIndex + 1}/${allDesktopImages.length})` : ''}`}
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 768px, 100vw"
                priority
              />

              {/* Karusell-navigering */}
              {hasMultipleImages && (
                <>
                  {/* Vänster pil */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
                    aria-label="Föregående bild"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {/* Höger pil */}
                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
                    aria-label="Nästa bild"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>

                  {/* Prickar för position */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {allDesktopImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Gå till bild ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Laptop Base */}
          <div className="relative h-5 bg-gray-800 rounded-b-lg">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-gray-600 rounded-t" />
          </div>
          <div className="h-2 bg-gray-700 rounded-b-xl mx-12" />

          {/* Mobile Frame - överlappar laptop i nedre högra hörnet */}
          {mobileImage && (
            <div className="absolute -bottom-8 -right-4 md:bottom-0 md:right-0 z-20 transform translate-x-1/4 translate-y-1/4">
              {/* Phone Frame */}
              <div className="relative w-28 md:w-40 lg:w-48 bg-gray-900 rounded-[1.75rem] md:rounded-[2.5rem] p-1.5 md:p-2.5 shadow-2xl ring-1 ring-gray-800">
                {/* Notch */}
                <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-14 md:w-20 h-5 md:h-6 bg-gray-900 rounded-full z-10" />

                {/* Screen */}
                <div className="relative aspect-[9/19] bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                  <Image
                    src={mobileImage}
                    alt={`${alt} - Mobil`}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 192px, 112px"
                  />
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-1.5 md:bottom-2.5 left-1/2 -translate-x-1/2 w-10 md:w-14 h-1 bg-gray-600 rounded-full" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Om bara mobil finns (utan desktop) */}
      {!currentDesktopImage && mobileImage && (
        <div className="flex justify-center">
          <div className="relative w-40 md:w-56 bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-3 shadow-2xl">
            <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-16 md:w-24 h-5 md:h-7 bg-gray-900 rounded-full z-10" />
            <div className="relative aspect-[9/19] bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <Image
                src={mobileImage}
                alt={`${alt} - Mobil`}
                fill
                className="object-cover object-top"
                sizes="224px"
              />
            </div>
            <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      )}

      {/* Caption */}
      {websiteUrl && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Besök webbplatsen:{" "}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 underline hover:no-underline"
          >
            {websiteUrl.replace(/^https?:\/\//, '')}
          </a>
        </p>
      )}
    </div>
  );
}

export default DeviceMockup;
