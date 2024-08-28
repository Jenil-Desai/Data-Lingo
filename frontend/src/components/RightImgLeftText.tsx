import { Typography, Button } from "@material-tailwind/react";

interface RightImageLeftText {
  imageSrc: string;
  title: string;
  description: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction: {
    label: string;
    onClick: () => void;
  };
}

function RightImageLeftText({ imageSrc, title, description, primaryAction, secondaryAction }: RightImageLeftText) {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center py-8 px-4 md:px-12 lg:px-24">
      <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
        <img src={imageSrc} alt={title} className="w-3/4 h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="w-full md:w-1/2 md:pr-8">
        <Typography variant="h2" className="text-2xl md:text-3xl font-bold text-blue-gray-900" children={title} placeholder={undefined}></Typography>
        <Typography variant="lead" className="mt-4 text-base md:text-lg text-blue-gray-700" children={description} placeholder={undefined}></Typography>
        <div className="mt-6 flex gap-4">
          <Button size="sm" variant="gradient" onClick={primaryAction.onClick} children={primaryAction.label} placeholder={undefined}></Button>
          <Button size="sm" variant="outlined" color="blue-gray" onClick={secondaryAction.onClick} children={secondaryAction.label} placeholder={undefined}></Button>
        </div>
      </div>
    </div>
  );
}

export default RightImageLeftText;
