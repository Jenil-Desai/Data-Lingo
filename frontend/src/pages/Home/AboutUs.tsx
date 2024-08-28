import ThreeCard from "../../components/ThreeCard";

export default function AboutUs() {
  return (
    <ThreeCard
      sectionName={"About Us"}
      sectionText1={"Who We Are"}
      sectionText2={"Learn more about our mission, vision, and values that drive our company."}
      card1={{
        name: "Our Mission",
        text: "Empowering schools with innovative tools to enhance learning and streamline management.",
        imagePath: "/images/Mission.jpeg",
      }}
      card2={{
        name: "Our Vision",
        text: "To lead the digital transformation in education, fostering growth and success for every school.",
        imagePath: "/images/Vision.jpeg",
      }}
      card3={{
        name: "Our Values",
        text: "We are committed to innovation, integrity, and inclusivity in everything we do & think for betterment.",
        imagePath: "/images/Values.jpeg",
      }}
    />
  );
}
