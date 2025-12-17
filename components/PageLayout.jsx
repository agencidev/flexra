"use client";

import React from "react";
import { Navbar1 } from "./Navbar1";
import { Footer1 } from "./Footer1";

export function PageLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen">
      {/* Hero section with dark background */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Navbar1 />
        <div className="px-[5%] pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container">
            <p className="text-sm uppercase tracking-wider text-white/60 mb-4">
              {subtitle}
            </p>
            <h1 className="max-w-4xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="bg-white">
        {children}
      </main>

      <Footer1 />
    </div>
  );
}
