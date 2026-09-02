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
  // 1. JSON-LD EmploymentAgency Schema
  const jsonLdAgency = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": "https://emploisdubai.com/#agency",
    name: "Emplois Dubaï",
    alternateName: ["Emplois Dubai", "Portail Emplois Dubaï", "Mise en Relation Dubaï"],
    url: "https://emploisdubai.com",
    logo: "https://emploisdubai.com/favicon.ico",
    image: "https://emploisdubai.com/hero-dubai-night.jpg",
    description:
      "Portail leader de mise en relation et d'opportunités d'emploi à Dubaï (Émirats Arabes Unis). Mise en relation ciblée entre candidats et recruteurs partenaires vérifiés.",
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
      telephone: CONTACT_CONFIG.phone || "+971-4-000-0000",
      contactType: "Support & Mise en relation",
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
      name: "Secteurs d'Opportunités à Dubaï",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mise en relation Chauffeur Privé VIP Dubaï",
            description: "Opportunités et mise en relation pour chauffeurs privés et VIP à Dubaï.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mise en relation Hôtellerie & Restauration Dubaï",
            description: "Opportunités ciblées dans la restauration et l'hôtellerie à Dubaï.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mise en relation Sécurité & Vigilance Dubaï",
            description: "Mise en contact pour postes de sécurité et surveillance à Dubaï.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mise en relation Import-Export & Logistique Dubaï",
            description: "Mise en relation avec des partenaires commerciaux et logistiques aux Émirats.",
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
        name: "Comment fonctionne la mise en relation avec Emplois Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour accéder aux opportunités à Dubaï, il vous suffit de remplir notre formulaire de mise en relation en ligne. Notre équipe transmet votre profil à des recruteurs partenaires aux Émirats Arabes Unis.",
        },
      },
      {
        "@type": "Question",
        name: "Comment sont gérés les visas de travail et de résidence à Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les visas de travail et permis de résidence sont traités et pris en charge directement par les employeurs partenaires selon la réglementation officielle du Ministère du Travail (MOHRE) des Émirats Arabes Unis.",
        },
      },
      {
        "@type": "Question",
        name: "Des options de logement sont-elles proposées par les employeurs à Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "De nombreuses offres de nos employeurs partenaires incluent des options de logement ou des indemnités d'hébergement. Les conditions exactes sont communiquées directement par l'employeur recruteur.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les secteurs d'activité qui recrutent à Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les principaux secteurs avec de fortes opportunités à Dubaï sont : les chauffeurs privés VIP, l'hôtellerie et la restauration de luxe, la sécurité, l'import-export et logistique, les métiers du BTP, ainsi que le personnel de maison.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il parler couramment anglais pour travailler à Dubaï ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Des notions d'anglais sont un atout, mais nos partenaires proposent également des postes accessibles aux francophones avec un accompagnement adapté.",
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