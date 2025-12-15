"use client";

import React from "react";
import { Button } from "./ui/button";
import { GetStartedButton } from "./ui/get-started-button";

export function Cta7() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div 
        className="container rounded-3xl p-10 md:p-16"
        style={{ backgroundColor: '#fef9c3' }}
      >
        <div className="grid w-full grid-cols-1 items-center justify-between gap-6 md:grid-cols-[1fr_max-content] md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <div className="md:mr-12 lg:mr-0">
            <div className="w-full max-w-lg">
              <h2 className="mb-3 md:mb-4">
                Börja din transformation idag
              </h2>
              <p className="text-gray-600">
                Boka en genomgång och se hur AI kan skapa värde för din
                organisation.
              </p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-4">
            <GetStartedButton dark>Boka</GetStartedButton>
            <Button variant="outline">Läs mer</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
