import PageHeader from "../../components/PageHeader";
import LeftImageRightText from "../../components/LeftImgRightText";
import RightImageLeftText from "../../components/RightImgLeftText";
import Team from "./Team";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="About Us" description="Discover the journey of innovation and determination that led to the creation of this AI-powered solution, crafted to revolutionize how you interact with data." />
      <LeftImageRightText imageSrc="/images/OurStory.jpeg" title="Our Story" description="The story of this project began with a deep passion for web development and a desire to create something truly impactful. As a dedicated learner, I, Jenil Desai, set out to build my first AI-powered application. The vision was simple: to grow and refine my skills by developing a product that could evolve into a powerful tool for users everywhere." primaryAction={{ label: "Get Started", onClick: () => navigate("/signup") }} secondaryAction={{ label: "Contact Us", onClick: () => navigate("/contact-us") }} />
      <RightImageLeftText imageSrc="/images/OurMission.jpeg" title="Our Mission" description="My mission is clear: to take this AI-powered project from its humble beginnings as a learning experiment to an enterprise-level product. By focusing on continuous improvement and user satisfaction, I aim to create a solution that not only meets the needs of its users but also sets new standards in innovation and efficiency." primaryAction={{ label: "Get Started", onClick: () => navigate("/signup") }} secondaryAction={{ label: "Contact Us", onClick: () => navigate("/contact-us") }} />
      <Team />
    </>
  );
}
