import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://emploisdubai.com"),
  title: "Emplois Dubaï | Agence de Recrutement & Offres d'Emploi à Dubaï",
  description:
    "Emplois Dubaï : Agence N°1 de recrutement & placement premium à Dubaï. Trouvez votre emploi de prestige aux Émirats Arabes Unis. Visa de résidence garanti, logement inclus et accompagnement sur-mesure.",
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
    "visa travail dubaï",
    "emploi chauffeur dubaï",
    "emploi hôtellerie dubaï",
    "emploi import export dubaï",
    "emploi btp dubaï",
    "trouver un travail à dubaï",
    "placement dubaï",
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
  category: "Emploi, Recrutement, Placement, Dubaï",
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
    title: "Emplois Dubaï | Agence de Recrutement & Placement Premium à Dubaï",
    description:
      "Trouvez votre emploi de prestige à Dubaï. Agence N°1 de recrutement : offres d'emploi, visa de résidence garanti, logement et accompagnement intégral.",
    siteName: "Emplois Dubaï",
    images: [
      {
        url: "https://emploisdubai.com/hero-dubai-night.jpg",
        width: 1200,
        height: 630,
        alt: "Emplois Dubaï - Agence de Recrutement et Offres d'Emploi à Dubaï",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@EmploisDubai",
    creator: "@EmploisDubai",
    title: "Emplois Dubaï | Recrutement & Placement Premium à Dubaï",
    description:
      "Votre carrière de prestige à Dubaï commence ici. Offres d'emploi, visa de résidence, logement inclus. Secteurs : Hôtellerie, Chauffeur, BTP, Import-Export.",
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
  // 1. JSON-LD EmploymentAgency Schema
  const jsonLdAgency = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": "https://emploisdubai.com/#agency",
    name: "Emplois Dubaï",
    alternateName: ["Emplois Dubai", "Agence Emplois Dubaï", "Recrutement Dubaï"],
    url: "https://emploisdubai.com",
    logo: "https://emploisdubai.com/favicon.ico",
    image: "https://emploisdubai.com/hero-dubai-night.jpg",
    description:
      "Agence leader en recrutement et placement premium à Dubaï (Émirats Arabes Unis). Accompagnement complet : offres d'emploi sur-mesure, obtention du visa de résidence, logement garanti.",
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubaï Marina",
      addressRegion: "Dubaï",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.0772,
      longitude: 55.1330,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+225-05-45-74-57-49",
      contactType: "Recrutement & Support",
      availableLanguage: ["French", "English", "Arabic"],
      areaServed: ["FR", "BE", "CH", "CA", "CI", "SN", "CM", "AE"],
    },
    sameAs: [
      "https://www.linkedin.com/company/emplois-dubai",
      "https://twitter.com/EmploisDubai",
      "https://www.facebook.com/EmploisDubai",
      "https://www.instagram.com/EmploisDubai",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Secteurs de Recrutement à Dubaï",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emplois Chauffeur Privé VIP Dubaï",
            description: "Placement de chauffeurs privés et VIP à Dubaï.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emplois Hôtellerie & Restauration Dubaï",
            description: "Recrutement dans la restauration de luxe et les hôtels 5 étoiles à Dubaï.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emplois Sécurité & Vigilance Dubaï",
            description: "Postes de sécurité, surveillance et agents qualifiés à Dubaï.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emplois Import-Export & Logistique Dubaï",
            description: "Opportunités dans le commerce international et la logistique aux Émirats.",
          },
        },
      ],
    },
  };

  // 2. JSON-LD WebSite Schema with SearchAction
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

  // 3. JSON-LD FAQ Schema for Google Rich Snippets
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment trouver un emploi à Dubaï avec l'agence Emplois Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour trouver un emploi à Dubaï, il vous suffit de remplir notre formulaire de candidature en ligne. Notre équipe analyse votre profil sous 48h et vous met en relation avec des recruteurs partenaires aux Émirats Arabes Unis.",
        },
      },
      {
        "@type": "Question",
        name: "Le visa de travail et de résidence à Dubaï est-il garanti ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, notre conciergerie de recrutement prend en charge l'intégralité des démarches administratives pour vous délivrer votre visa de résidence et votre permis de travail officiels aux Émirats.",
        },
      },
      {
        "@type": "Question",
        name: "Le logement est-il inclus dans les offres d'emploi à Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, la majorité de nos contrats de placement premium incluent un logement sécurisé et équipé dès votre arrivée à Dubaï, ainsi qu'un accueil VIP à l'aéroport.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les secteurs d'activité qui recrutent à Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les principaux secteurs en fort recrutement à Dubaï sont : les chauffeurs privés VIP, l'hôtellerie et la restauration de luxe, la sécurité, l'import-export et logistique, les métiers du BTP, ainsi que le personnel de maison.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il parler couramment anglais pour travailler à Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Des notions d'anglais sont un atout, mais nous disposons de nombreux postes accessibles aux francophones avec un accompagnement personnalisé en français.",
        },
      },
    ],
  };

  // 4. JSON-LD BreadcrumbList Schema
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
          id="schema-agency"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdAgency)}
        </Script>
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdWebSite)}
        </Script>
        <Script
          id="schema-faq"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdFAQ)}
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