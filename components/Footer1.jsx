"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Vad vi gör", href: "/vad-vi-gor" },
  { label: "Om Flexra", href: "/om-flexra" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Insikter", href: "/insikter" },
  { label: "Villkor", href: "/villkor" },
  { label: "Integritetspolicy", href: "/integritetspolicy" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer1() {
  return (
    <div className="p-2 md:p-4">
      <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20 rounded-3xl text-white" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="container">
          {/* Top section - tagline and navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 pb-16 md:pb-20 lg:pb-24">
            {/* Left side - Tagline */}
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                AI och automation som<br />
                <span className="italic font-normal text-white/70">inte står i vägen.</span>
              </h2>
            </div>

            {/* Right side - Navigation links in 3 columns */}
            <div className="lg:border-l lg:border-white/20 lg:pl-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {navLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="group flex items-center justify-between py-3 border-b border-white/20 hover:border-white/40 transition-colors"
                  >
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Large logo text */}
          <div className="py-8 md:py-12">
            <h1 className="text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter text-white">
              Flexra
            </h1>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-6 border-t border-white/20">
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Alla rättigheter förbehållna.
            </p>
            <p className="text-xs text-white/50 mt-2 md:mt-0">
              © {new Date().getFullYear()} Flexra Consulting AB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
