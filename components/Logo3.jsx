"use client";

import React from "react";

const logos = [
  { src: "/67161e62c6b981f635e078f2_ab-karl-hedin-logo.png", alt: "AB Karl Hedin" },
  { src: "/RMS_Logotyp_2col-scaled-1-2048x760.png", alt: "RMS" },
  { src: "/varubud-logo.png", alt: "Varubud" },
  { src: "/imi-go-blue-1200x630-1-1.png", alt: "IMI", className: "scale-150" },
  { src: "/landrins_bil_eskilstuna_25954_21031215034789_klicket_se.png", alt: "Landrins Bil" },
  { src: "/207704985-origpic-3b5838.png", alt: "Partner" },
  { src: "/BiltjL.png", alt: "Biltjänst" },
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
                <img
                  key={`logo-1-${index}`}
                  className={`mx-12 md:mx-16 max-h-10 max-w-[120px] md:max-w-[150px] shrink-0 object-contain ${logo.className || ''}`}
                  src={logo.src}
                  alt={logo.alt}
                />
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex shrink-0 animate-logo-scroll items-center">
              {logos.map((logo, index) => (
                <img
                  key={`logo-2-${index}`}
                  className={`mx-12 md:mx-16 max-h-10 max-w-[120px] md:max-w-[150px] shrink-0 object-contain ${logo.className || ''}`}
                  src={logo.src}
                  alt={logo.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
