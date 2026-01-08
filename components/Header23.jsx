"use client";

import React from "react";
import Link from "next/link";
import Iridescence from "./Iridescence";
import { Button } from "./ui/button";
import { GetStartedButton } from "./ui/get-started-button";

export function Header23() {
  return (
    <div className="p-2 md:p-4">
      <section 
        id="relume" 
        className="relative px-[5%] flex items-center justify-center min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-2rem)] overflow-hidden rounded-3xl"
      >
      <Iridescence
        color={[0.5, 0.7, 0.95]}
        mouseReact={false}
        amplitude={0.1}
        speed={0.2}
      />
      
      <div className="container relative z-10">
        <div className="mx-auto text-center">
          <div className="mx-auto w-full max-w-[65rem]">
            <h1 className="mb-5 text-white md:mb-6">
              Låt AI och automation ta ditt företag till nästa nivå.
            </h1>
          </div>
          <div className="mx-auto w-full max-w-lg">
            <p className="text-white opacity-90">
              Vi bygger digitala verktyg som arbetar för dig. Med AI och
              automation frigör du timmar varje vecka och får mer tid för
              innovation, kunder och tillväxt.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              <Link href="/kontakt">
                <GetStartedButton>Boka möte</GetStartedButton>
              </Link>
              <Link href="/vad-vi-gor">
                <Button variant="link-alt" className="text-white">Läs mer</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
