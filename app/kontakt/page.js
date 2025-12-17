"use client";

import { PageLayout } from "../../components/PageLayout";
import { ContactForm } from "../../components/blocks/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+46 (0)707-55 91 17",
    href: "tel:+46707559117",
  },
  {
    icon: Mail,
    label: "E-post",
    value: "info@flexra.se",
    href: "mailto:info@flexra.se",
  },
  {
    icon: MapPin,
    label: "Adress",
    value: "Smedjegatan 33, 623 20 Eskilstuna",
    href: "https://maps.google.com/?q=Smedjegatan+33,+Eskilstuna",
  },
  {
    icon: Clock,
    label: "Öppettider",
    value: "Mån-Fre 09:00-17:00",
    href: null,
  },
];

export default function KontaktPage() {
  return (
    <PageLayout
      title="Låt oss prata om ditt nästa projekt"
      subtitle="Kontakt"
    >
      {/* Contact Info Cards */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactDetails.map((detail, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#fce7f3" }}
                >
                  <detail.icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-gray-500 mb-1">{detail.label}</p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-gray-900 font-medium hover:underline"
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-gray-900 font-medium">{detail.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm
        title="Skicka ett meddelande"
        subtitle="Berätta om ditt projekt eller ställ en fråga. Vi återkommer inom 24 timmar."
        badge="Kontakta oss"
        contactInfo={[
          { label: "E-post", value: "info@flexra.se", href: "mailto:info@flexra.se" },
          { label: "Telefon", value: "+46 (0)707-55 91 17", href: "tel:+46707559117" },
        ]}
        features={[
          "Svar inom 24 timmar",
          "Kostnadsfri rådgivning",
          "Ingen bindningstid",
        ]}
        background="gray"
      />

      {/* Google Maps */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Hitta hit
            </p>
            <h2 className="mb-6">Besök oss</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vi finns på Smedjegatan 33 i Eskilstuna. Välkommen att boka ett möte!
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-gray-100">
            <iframe
              src="https://www.google.com/maps?q=Smedjegatan+33,+623+20+Eskilstuna,+Sweden&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Flexra kontor på Google Maps"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f8f8f6]">
        <div className="container">
          <div
            className="rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <h2 className="text-white mb-6 max-w-2xl mx-auto">
              Föredrar du att ringa?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Vi finns tillgängliga på telefon vardagar mellan 09:00-17:00.
            </p>
            <a
              href="tel:+46707559117"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +46 (0)707-55 91 17
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
