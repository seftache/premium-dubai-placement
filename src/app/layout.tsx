import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Maintenance } from "@/components/Maintenance";
import { CONTACT_CONFIG } from "@/lib/contact";
import Script from "next/script";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://emploisdubai.com"),
  title: "Emplois Dubaï | Portail d'Offres d'Emploi & Mise en Relation à Dubaï",
  description:
    "Emplois Dubaï : portail de mise en relation entre candidats et recruteurs partenaires aux Émirats Arabes Unis. Déposez votre profil et consultez les opportunités.",
  keywords: [
    "emplois dubaï",
    "emploi dubaï",
    "recrutement dubaï",
    "offres d'emploi dubaï",
    "travailler à dubaï",
    "travail dubaï",
    "agence de recrutement dubaï",
    "cabinet de recrutement dubaï",
    "recruteur dubaï",
    "opportunités dubaï",
    "emploi chauffeur dubaï",
    "emploi hôtellerie dubaï",
    "emploi import export dubaï",
    "emploi btp dubaï",
    "trouver un travail à dubaï",
    "mise en relation dubaï",
    "carrière émirats arabes unis",
  ],
  authors: [{ name: "Emplois Dubaï", url: "https://emploisdubai.com" }],
  creator: "Emplois Dubaï",
  publisher: "Emplois Dubaï",
  alternates: {
    canonical: "https://emploisdubai.com",
    languages: {
      "fr": "https://emploisdubai.com",
      "fr-FR": "https://emploisdubai.com",
    },
  },
  category: "Emploi, Recrutement, Mise en relation, Dubaï",
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
  other: {
    "google-adsense-account": "ca-pub-6307209882135887",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://emploisdubai.com",
    title: "Emplois Dubaï | Portail d'Offres d'Emploi & Mise en Relation à Dubaï",
    description:
      "Portail de mise en relation avec des recruteurs et partenaires vérifiés à Dubaï. Déposez votre profil et accédez à des opportunités ciblées.",
    siteName: "Emplois Dubaï",
    images: [
      {
        url: "https://emploisdubai.com/hero-dubai-night.jpg",
        width: 1200,
        height: 630,
        alt: "Emplois Dubaï - Portail d'Offres d'Emploi et Mise en Relation à Dubaï",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@EmploisDubai",
    creator: "@EmploisDubai",
    title: "Emplois Dubaï | Portail d'Offres d'Emploi & Mise en Relation à Dubaï",
    description:
      "Mise en relation avec des recruteurs partenaires à Dubaï. Secteurs : Hôtellerie, Chauffeur, BTP, Import-Export.",
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
  // 1. JSON-LD WebSite Schema with SearchAction
  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://emploisdubai.com/#website",
    name: "Emplois Dubaï",
    url: "https://emploisdubai.com",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: "Emplois Dubaï",
      url: "https://emploisdubai.com",
    },
  };

  // 2. JSON-LD BreadcrumbList Schema
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil - Emplois Dubaï",
        item: "https://emploisdubai.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nos Secteurs d'Emploi",
        item: "https://emploisdubai.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Postuler aux Offres",
        item: "https://emploisdubai.com/candidature",
      },
    ],
  };

  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        {/* AdSense Account tag */}
        <meta name="google-adsense-account" content="ca-pub-6307209882135887" />
      </head>
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

        {/* JSON-LD Schemas pour Google Search Engine */}
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdWebSite)}
        </Script>
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdBreadcrumb)}
        </Script>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}