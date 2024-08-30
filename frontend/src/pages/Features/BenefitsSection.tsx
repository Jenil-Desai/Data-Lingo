import { Typography } from "@material-tailwind/react";

export function BenefitsSection() {
  const benefits = [
    {
      title: "Increase Efficiency",
      description: "Reduce manual work and increase productivity with streamlined processes.",
      image: "/images/efficiency.jpeg",
    },
    {
      title: "Enhance Security",
      description: "Keep your data secure with state-of-the-art security features and regular updates.",
      image: "/images/security.jpeg",
    },
    {
      title: "Cost-Effective Solutions",
      description: "Save money with our flexible pricing plans designed to fit any budget and scale with your needs.",
      image: "/images/cost-effectiveness.jpeg",
    },
    {
      title: "User-Friendly Interface",
      description: "Enjoy an intuitive and easy-to-navigate interface that simplifies complex tasks and improves user experience.",
      image: "/images/user-friendly.jpeg",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="mb-12 text-center" placeholder={undefined}>
          Benefits
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg shadow-md">
              <img src={benefit.image} alt={benefit.title} className="w-full md:w-1/2 rounded-lg" />
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <Typography variant="h5" className="mb-2" placeholder={undefined}>
                  {benefit.title}
                </Typography>
                <Typography className="text-gray-600" placeholder={undefined}>
                  {benefit.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
