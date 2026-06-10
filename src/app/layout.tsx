import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://emploisdubai.com"),
  title: "Emplois Dubaï | Recrutement & Placement Premium à Dubaï",
  description:
    "Trouvez votre emploi de prestige à Dubaï. Accompagnement complet, visa de résidence garanti, logement inclus. Spécialiste import-export, logistique, hôtellerie luxe et BTP. La conciergerie recrutement qui transforme votre carrière aux Émirats.",
  keywords: [
    "emplois dubaï",
    "import export dubaï",
    "recrutement dubaï",
    "emploi dubaï",
    "visa dubaï",
    "travailler à dubaï",
    "carrière Émirats",
    "placement premium",
    "conciergerie recrutement",
    "emploi import export dubaï",
    "emploi logistique dubaï",
    "travail dubaï",
    "emploi émirats arabes unis",
    "offre emploi dubaï",
    "recruteur dubaï",
  ],
  authors: [{ name: "Emplois Dubaï", url: "https://emploisdubai.com" }],
  creator: "Emplois Dubaï",
  publisher: "Emplois Dubaï",
  alternates: {
    canonical: "https://emploisdubai.com",
    languages: {
      "fr-FR": "https://emploisdubai.com",
    },
  },
  category: "Emploi, Recrutement, Import-Export, Dubaï",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "90euDLv1fDzw44lMI_0WjCOZdHO9JkbN2JcTZrmTics",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://emploisdubai.com",
    title: "Emplois Dubaï | Recrutement & Placement Premium à Dubaï",
    description:
      "Trouvez votre emploi de prestige à Dubaï. Visa, logement, carrière. Tous secteurs : import-export, hôtellerie, BTP, luxe. Placement garanti.",
    siteName: "Emplois Dubaï",
    images: [
      {
        url: "https://emploisdubai.com/hero-dubai-night.jpg",
        width: 1200,
        height: 630,
        alt: "Emplois Dubaï - Recrutement Premium, Import-Export, Logistique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@EmploisDubai",
    creator: "@EmploisDubai",
    title: "Emplois Dubaï | Recrutement & Placement Premium à Dubaï",
    description:
      "Votre carrière de prestige à Dubaï commence ici. Visa, logement, opportunités uniques. Import-export, hôtellerie, BTP.",
    images: ["https://emploisdubai.com/hero-dubai-night.jpg"],
  },
  appleWebApp: {
    capable: true,
    title: "Emplois Dubaï",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Données structurées JSON-LD pour l'organisation (branding Google)
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "Emplois Dubaï",
    url: "https://emploisdubai.com",
    logo: "https://emploisdubai.com/logo.png",
    image: "https://emploisdubai.com/hero-dubai-night.jpg",
    description:
      "Agence de recrutement premium à Dubaï spécialisée dans l'import-export, la logistique, l'hôtellerie de luxe et le BTP. Visa et logement inclus.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubaï",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-XX-XXX-XXXX",
      contactType: "Recrutement",
      availableLanguage: ["French", "English", "Arabic"],
    },
    sameAs: [
      "https://www.linkedin.com/company/emplois-dubai",
      "https://twitter.com/EmploisDubai",
      "https://www.facebook.com/EmploisDubai",
      "https://www.instagram.com/EmploisDubai",
    ],
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Emplois Dubaï",
    url: "https://emploisdubai.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://emploisdubai.com/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fr" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col bg-brand-black text-white"
        suppressHydrationWarning
      >
        <LocalBusinessSchema />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-51J03FB3S6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-51J03FB3S6');
          `}
        </Script>

        {/* JSON-LD pour le Knowledge Graph de Google */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdOrganization)}
        </Script>
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdWebSite)}
        </Script>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}