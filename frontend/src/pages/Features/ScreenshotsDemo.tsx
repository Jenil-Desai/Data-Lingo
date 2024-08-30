import React from "react";
import { Typography } from "@material-tailwind/react";

export function ScreenshotsDemo() {
  const screenshots = [
    { src: "/images/screenshot1.jpeg", caption: "Dashboard Overview" },
    { src: "/images/screenshot2.jpeg", caption: "Chat Interface" },
    { src: "/images/screenshot3.jpeg", caption: "Profile Management" },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <Typography variant="h2" className="mb-12" placeholder={undefined}>
          Screenshots
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={screenshot.src} alt={screenshot.caption} className="rounded-lg shadow-lg mb-4" />
              <Typography className="text-gray-600" placeholder={undefined}>
                {screenshot.caption}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
