import { Typography } from "@material-tailwind/react";

interface PageHeaderProps {
  title: string;
  description: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative w-full py-10 bg-white text-black">
      <div className="container mx-auto text-center px-4">
        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-blue-gray-900" children={title} placeholder={undefined}></Typography>
        <Typography variant="lead" className="mt-2 mb-6 text-lg md:text-xl max-w-2xl mx-auto text-blue-gray-700" children={description} placeholder={undefined}></Typography>
        <div className="flex justify-center mt-4">
          <div className="border-t-4 border-blue-gray-900 w-16 animate-pulse"></div>
        </div>
      </div>
      <div className="absolute inset-0 border-t-4 border-blue-gray-100"></div>
      <div className="absolute inset-0 border-b-4 border-blue-gray-100"></div>
    </div>
  );
}

export default PageHeader;
