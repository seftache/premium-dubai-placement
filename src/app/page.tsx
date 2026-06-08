import { HeroSection } from "@/components/HeroSection";
import { ProcedureSection } from "@/components/ProcedureSection";
import { ImportExportCarousel } from "@/components/ImportExportCarousel";
import { ServicesPreview } from "@/components/ServicesPreview";
import { SharedBackgroundLayout, SharedBackgroundLayoutMarina } from "@/components/SharedBackgroundLayout";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <SharedBackgroundLayout>
        <ProcedureSection />
      </SharedBackgroundLayout>

      <ImportExportCarousel />

      <SharedBackgroundLayoutMarina>
        <ServicesPreview />
        <PricingSection />
      </SharedBackgroundLayoutMarina>
    </>
  );
}

