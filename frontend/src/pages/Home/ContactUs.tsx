import ThreeCard from "../../components/ThreeCard";

export default function ContactUs() {
  return (
    <ThreeCard
      sectionName={"Contact Us"}
      sectionText1={"Get in Touch with Us"}
      sectionText2={"We’re here to help with any questions or inquiries."}
      card1={{
        name: "Support",
        text: "We’re here to assist you with any technical difficulties or questions you may have.",
        imagePath: "/images/Support.jpeg",
      }}
      card2={{
        name: "Sales",
        text: "Our team is here to help you find the best solution tailored to your school's needs.",
        imagePath: "/images/Sales.jpeg",
      }}
      card3={{
        name: "General Inquiries",
        text: "Reach out to us for any general information or inquiries about our platform.",
        imagePath: "/images/GeneralInquiry.jpeg",
      }}
    />
  );
}
