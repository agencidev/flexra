import localFont from "next/font/local";
import "./globals.css";
import { CookieConsentBanner } from "../components/CookieConsent";

const spaceGrotesk = localFont({
  src: [
    {
      path: "./fonts/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = localFont({
  src: [
    {
      path: "./fonts/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://flexra.se"),
  title: {
    default: "Flexra - AI och Automation för moderna företag",
    template: "%s | Flexra"
  },
  description: "Vi bygger digitala verktyg som arbetar för dig. Med AI och automation frigör du timmar varje vecka. Expert på processautomation, AI-integration och digitalisering.",
  keywords: ["AI", "automation", "digitalisering", "processautomation", "AI-integration", "effektivisering", "företag", "Sverige"],
  authors: [{ name: "Flexra" }],
  creator: "Flexra",
  publisher: "Flexra",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://flexra.se",
    siteName: "Flexra",
    title: "Flexra - AI och Automation för moderna företag",
    description: "Vi bygger digitala verktyg som arbetar för dig. Med AI och automation frigör du timmar varje vecka.",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Flexra - AI och Automation"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexra - AI och Automation",
    description: "Vi bygger digitala verktyg som arbetar för dig.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    // google: "din-google-verification-kod",
    // yandex: "din-yandex-kod",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
