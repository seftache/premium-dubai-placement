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
