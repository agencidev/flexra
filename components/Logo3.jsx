"use client";

import React from "react";
import Image from "next/image";

const logos = [
  { src: "/ab-karl-hedin-logo.webp", alt: "AB Karl Hedin", width: 851, height: 186 },
  { src: "/rms-logo.webp", alt: "RMS", width: 2048, height: 760 },
  { src: "/varubud-logo.webp", alt: "Varubud", width: 300, height: 114 },
  { src: "/landrins-bil-logo.webp", alt: "Landrins Bil", width: 1249, height: 174 },
  { src: "/biltjanst-logo.webp", alt: "Biltjänst", width: 400, height: 106 },
  { src: "/therooftopguide-logo.svg", alt: "The Rooftop Guide", width: 1050, height: 232 },
];

export function Logo3() {
  return (
    <section id="relume" className="py-12 md:py-16 lg:py-20 px-[5%]">
      <div className="container">
        <div className="mb-8 w-full max-w-lg mx-auto md:mb-10 lg:mb-12">
          <h1 className="text-center text-base font-bold leading-[1.2] md:text-md md:leading-[1.2]">
            Betrodd av växande organisationer
          </h1>
        </div>
        
        {/* Logo slider with fade edges */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex items-center">
            {/* First set of logos */}
            <div className="flex shrink-0 animate-logo-scroll items-center">
              {logos.map((logo, index) => (
                <Image
                  key={`logo-1-${index}`}
                  className={`mx-12 md:mx-16 max-h-10 max-w-[120px] md:max-w-[150px] shrink-0 object-contain ${logo.className || ''}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="(min-width: 768px) 150px, 120px"
                />
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex shrink-0 animate-logo-scroll items-center">
              {logos.map((logo, index) => (
                <Image
                  key={`logo-2-${index}`}
                  className={`mx-12 md:mx-16 max-h-10 max-w-[120px] md:max-w-[150px] shrink-0 object-contain ${logo.className || ''}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="(min-width: 768px) 150px, 120px"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
