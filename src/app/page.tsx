import { HeroSection } from "@/components/HeroSection";
import { AdBanner } from "@/components/AdBanner";
import { ProcedureSection } from "@/components/ProcedureSection";
import { ImportExportCarousel } from "@/components/ImportExportCarousel";
import { ServicesPreview } from "@/components/ServicesPreview";
import { SharedBackgroundLayout, SharedBackgroundLayoutMarina } from "@/components/SharedBackgroundLayout";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AdBanner />
      
      <SharedBackgroundLayout>
        <ProcedureSection />
      </SharedBackgroundLayout>

      <ImportExportCarousel />

      <SharedBackgroundLayoutMarina>
        <ServicesPreview />
        <PricingSection />
      </SharedBackgroundLayoutMarina>

      <FAQSection />
    </>
  );
}


