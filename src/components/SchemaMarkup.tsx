export function FAQSchema({ data }: { data: Array<{question: string, answer: string}> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })
      }}
    />
  );
}

export function JobPostingSchema({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": data.title,
          "description": data.description || "Recrutement de serveurs qualifiés pour les meilleurs restaurants et hôtels de Dubaï",
          "datePosted": new Date().toISOString().split('T')[0],
          "validThrough": data.validThrough || "2026-12-31",
          "employmentType": data.employmentType || "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": data.hiringOrganization || "Emplois Dubaï",
            "sameAs": "https://emploisdubai.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dubaï",
              "addressCountry": "AE"
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": data.salaryCurrency || "AED",
            "value": {
              "@type": "QuantitativeValue",
              "value": data.salary || 4000,
              "unitText": "MONTH"
            }
          }
        })
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EmploymentAgency",
          "name": "Emplois Dubaï",
          "description": "Conciergerie privée de recrutement à Dubaï. Placement Premium, Visa et Logement.",
          "url": "https://emploisdubai.com",
          "image": "https://emploisdubai.com/hero-dubai-night.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dubaï",
            "addressCountry": "AE"
          },
          "priceRange": "$$$",
          "telephone": "+971526252539"
        })
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{name: string, item: string}> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((breadcrumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": breadcrumb.name,
            "item": breadcrumb.item
          }))
        })
      }}
    />
  );
}

export function HowToSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Comment obtenir un visa de travail pour Dubaï",
          "description": "Processus complet d'obtention de visa résident emploi aux EAU.",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Obtenir une offre d'emploi",
              "text": "Trouvez un employeur sponsor via l'agence Emplois Dubaï."
            },
            {
              "@type": "HowToStep",
              "name": "Visa d'entrée (Pink Visa)",
              "text": "L'employeur demande l'autorisation d'entrée valable 60 jours."
            },
            {
              "@type": "HowToStep",
              "name": "Examen médical à Dubaï",
              "text": "Prise de sang et radio des poumons obligatoires sur place."
            },
            {
              "@type": "HowToStep",
              "name": "Emirates ID",
              "text": "Enregistrement biométrique pour la carte d'identité émiratie."
            }
          ]
        })
      }}
    />
  );
}
