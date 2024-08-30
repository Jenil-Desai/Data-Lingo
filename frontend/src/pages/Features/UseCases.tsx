import React from "react";
import { Typography } from "@material-tailwind/react";

export function UseCases() {
  const useCases = [
    {
      title: "Data-Driven Decision Making",
      description: "Empower your team to easily generate and analyze SQL queries from natural language to make informed business decisions without needing deep technical expertise.",
      image: "/images/data-driven.jpeg",
    },
    {
      title: "Customer Support Analytics",
      description: "Analyze customer support interactions and generate insights with automated query generation to improve response times and customer satisfaction.",
      image: "/images/support-analytics.jpeg",
    },
    {
      title: "Financial Reporting",
      description: "Simplify complex financial data retrieval by converting natural language queries into SQL, making financial reports and analyses more accessible.",
      image: "/images/financial-reporting.jpeg",
    },
    {
      title: "E-Commerce Insights",
      description: "Enhance e-commerce strategies by converting product and sales queries into actionable SQL queries, providing detailed insights into customer behavior and sales performance.",
      image: "/images/ecommerce-insights.jpeg",
    },
    {
      title: "Healthcare Data Management",
      description: "Streamline access to patient data and medical records with natural language queries, improving the efficiency of healthcare data management and reporting.",
      image: "/images/healthcare-data.jpeg",
    },
    {
      title: "Academic Research",
      description: "Assist researchers in querying academic databases using natural language, simplifying the process of gathering and analyzing research data.",
      image: "/images/academic-research.jpeg",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="mb-12 text-center" placeholder={undefined}>
          Use Cases
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <img src={useCase.image} alt={useCase.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <Typography variant="h5" className="mb-2" placeholder={undefined}>
                  {useCase.title}
                </Typography>
                <Typography className="text-gray-600" placeholder={undefined}>
                  {useCase.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
