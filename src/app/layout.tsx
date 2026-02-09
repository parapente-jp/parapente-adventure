import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { siteConfig } from "@/data/site-config";
import { SeasonProvider } from "@/context/SeasonContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Baptême Parapente Orcières Champsaur`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "parapente",
    "baptême parapente",
    "vol biplace",
    "Orcières Merlette",
    "Champsaur",
    "Hautes-Alpes",
    "parapente été",
    "parapente hiver",
    "parapente ski",
    "vol tandem",
    "Jean-Philippe Gayon",
  ],
  authors: [{ name: siteConfig.owner.name }],
  creator: siteConfig.owner.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: `${siteConfig.name} | Baptême Parapente Orcières Champsaur`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Baptême Parapente Orcières Champsaur`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: siteConfig.name,
              description: siteConfig.description,
              telephone: `+33${siteConfig.phone.replace(/\s/g, "").substring(1)}`,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig.location.city,
                addressRegion: siteConfig.location.region,
                postalCode: siteConfig.location.department,
                addressCountry: "FR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 44.6883,
                longitude: 6.3333,
              },
              priceRange: "85€ - 150€",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
              sameAs: [],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Baptêmes de Parapente",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Vol Découverte Été",
                      description: "Vol d'environ 15 minutes",
                    },
                    price: "95",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Vol Découverte Hiver",
                      description: "Vol d'environ 12 minutes avec décollage à ski",
                    },
                    price: "85",
                    priceCurrency: "EUR",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <SeasonProvider>
          <LanguageProvider>
            <CartProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </CartProvider>
          </LanguageProvider>
        </SeasonProvider>
      </body>
    </html>
  );
}

