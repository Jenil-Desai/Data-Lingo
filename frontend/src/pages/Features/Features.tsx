import PageHeader from "../../components/PageHeader";
import { BenefitsSection } from "./BenefitsSection";
import { CoreFeatures } from "./CoreFeatures";
import { ScreenshotsDemo } from "./ScreenshotsDemo";
import { UseCases } from "./UseCases";

export default function Features() {
  return (
    <div>
      <PageHeader title="Explore Our Features" description="Discover the powerful features designed to help you achieve your goals efficiently and effectively." />
      <CoreFeatures />
      <BenefitsSection />
      <UseCases />
      <ScreenshotsDemo />
    </div>
  );
}
