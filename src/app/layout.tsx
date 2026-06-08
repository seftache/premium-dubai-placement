import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emplois Dubaï | Votre Carrière d'Exception à Dubaï",
  description:
    "Conciergerie privée de recrutement à Dubaï. Visa, logement, emploi premium — une prise en charge intégrale pour votre réussite aux Émirats Arabes Unis.",
  keywords: [
    "recrutement Dubaï",
    "emploi Dubaï",
    "visa Dubaï",
    "travailler à Dubaï",
    "carrière Émirats",
    "placement premium",
    "conciergerie recrutement",
  ],
  openGraph: {
    title: "Emplois Dubaï | Votre Carrière d'Exception à Dubaï",
    description:
      "Conciergerie privée de recrutement à Dubaï. Visa, logement, emploi premium.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-brand-black text-white" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
