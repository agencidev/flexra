"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  { src: "/customers/rms-logo.webp", alt: "RMS", width: 2048, height: 760, url: "https://www.roadmobilityservices.com" },
  { src: "/customers/varubud-logo.webp", alt: "Varubud", width: 300, height: 114, url: "https://varubud.se" },
  { src: "/customers/landrins-bil-logo.webp", alt: "Landrins Bil", width: 1249, height: 174, url: "https://landrinsbil.se" },
  { src: "/customers/biltjanst-logo.webp", alt: "Biltjänst Serrander Bil", width: 400, height: 106, url: "https://serranderbil.se" },
  { src: "/therooftopguide-logo.svg", alt: "The Rooftop Guide", width: 1050, height: 232, url: "https://therooftopguide.com" },
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
                <Link
                  key={`logo-1-${index}`}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-12 md:mx-16 shrink-0 hover:opacity-70 transition-opacity"
                >
                  <Image
                    className={`max-h-10 max-w-[120px] md:max-w-[150px] object-contain ${logo.className || ''}`}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    sizes="(min-width: 768px) 150px, 120px"
                  />
                </Link>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex shrink-0 animate-logo-scroll items-center">
              {logos.map((logo, index) => (
                <Link
                  key={`logo-2-${index}`}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-12 md:mx-16 shrink-0 hover:opacity-70 transition-opacity"
                >
                  <Image
                    className={`max-h-10 max-w-[120px] md:max-w-[150px] object-contain ${logo.className || ''}`}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    sizes="(min-width: 768px) 150px, 120px"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
