"use client";

import React from "react";
import Link from "next/link";
import { GetStartedButton } from "./ui/get-started-button";
import Image from "next/image";

export function Layout442() {
  return (
    <div className="px-2 md:px-4">
      <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28 rounded-3xl overflow-hidden">
        <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-20">
          <div>
            <h2 className="text-text-alternative">
              Den lilla partnern som genererar stora resultat
            </h2>
          </div>
          <div className="mx-[7.5%] md:mt-48">
            <p className="text-text-alternative">
              Vi hjälper företag att se möjligheter där andra ser bara rutiner.
              Med djup kunskap om AI och automation skapar vi lösningar som
              fungerar i verkligheten.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Link href="/kontakt">
                <GetStartedButton>Kontakta</GetStartedButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/customers/imi-go-blue.webp"
          alt="Bakgrundsbild"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      </section>
    </div>
  );
}
