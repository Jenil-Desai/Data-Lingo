import ThreeCard from "../../components/ThreeCard";

export default function Pricing() {
  return (
    <ThreeCard
      sectionName={"Pricing"}
      sectionText1={"Choose the Plan That's Right for You"}
      sectionText2={"Flexible pricing plans to meet your needs."}
      card1={{
        name: "Essential Tools",
        text: "Get started with the core features you need to manage your school efficiently.",
        imagePath: "/images/BasicPlan.jpeg",
      }}
      card2={{
        name: "Enhanced Features",
        text: "Unlock advanced tools and customization options for a more tailored experience.",
        imagePath: "/images/PlusPlan.jpeg",
      }}
      card3={{
        name: "Complete Solution",
        text: "Access the full suite of features with priority support and comprehensive analytics.",
        imagePath: "/images/PremiumPlan.jpeg",
      }}
    />
  );
}
