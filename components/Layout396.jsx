"use client";

import React from "react";

export function Layout396() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {/* Card 1 - Pink */}
          <div className="flex flex-col justify-between rounded-3xl p-8 md:p-10 min-h-[400px]" style={{ backgroundColor: '#fce7f3' }}>
            <div>
              <h3>
                Arbeta smartare, inte hårdare
              </h3>
            </div>
            <p className="text-gray-600 mt-auto">
              Automation tar över det repetitiva och låter ditt team fokusera
              på strategi.
            </p>
          </div>

          {/* Card 2 - Yellow */}
          <div className="flex flex-col justify-between rounded-3xl p-8 md:p-10 min-h-[400px]" style={{ backgroundColor: '#fef9c3' }}>
            <div>
              <h3>
                Rätt data, rätt beslut
              </h3>
            </div>
            <p className="text-gray-600 mt-auto">
              Ren och konsistent data är grunden för verklig insikt och
              tillväxt.
            </p>
          </div>

          {/* Card 3 - Lime */}
          <div className="flex flex-col justify-between rounded-3xl p-8 md:p-10 min-h-[400px]" style={{ backgroundColor: '#ecfccb' }}>
            <div>
              <h3>
                Väx utan att öka kostnaderna
              </h3>
            </div>
            <p className="text-gray-600 mt-auto">
              Intelligenta system skalas med din organisation utan extra
              resurser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
