import React from "react";
import { Typography } from "@material-tailwind/react";
import { MegaphoneIcon, ChatBubbleBottomCenterTextIcon, CircleStackIcon } from "@heroicons/react/20/solid";

export function CoreFeatures() {
  const features = [
    { icon: <MegaphoneIcon className="h-12 w-12 text-teal-500" />, title: "Natural Language Querying", description: "Effortlessly convert your thoughts into precise SQL queries using simple, everyday language. No SQL expertise is required." },
    { icon: <CircleStackIcon className="h-12 w-12 text-teal-500" />, title: "Database Integration", description: "Seamlessly connect to multiple databases, enabling you to interact with your data across various platforms directly from the chat interface." },
    { icon: <ChatBubbleBottomCenterTextIcon className="h-12 w-12 text-teal-500" />, title: "Interactive Query Interface", description: "Engage with an intuitive chat-based interface that allows you to generate and refine queries in real-time, with instant feedback and results displayed in a tabular format." },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <Typography variant="h2" className="mb-12" placeholder={undefined}>
          Core Features
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg shadow-md">
              {feature.icon}
              <Typography variant="h5" className="mt-4 mb-2" placeholder={undefined}>
                {feature.title}
              </Typography>
              <Typography className="text-gray-600" placeholder={undefined}>
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
