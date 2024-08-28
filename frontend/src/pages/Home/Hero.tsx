import React from "react";
import { Button, Typography, Input } from "@material-tailwind/react";

function Hero() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpen(false));
  }, []);

  return (
    <>
      <header className="bg-white p-8">
        <div className="grid mt-16 h-full w-full place-items-stretch bg-center bg-contain bg-no-repeat mb-20">
          <div className="container mx-auto px-4 text-center">
            <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary" placeholder={undefined}>
              Exciting News! Introducing our latest innovation
            </Typography>
            <Typography variant="h1" color="blue-gray" className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl" placeholder={undefined}>
              Revolutionize Your Database Management with <span className="text-blue-gray-500 leading-snug ">Ease</span> and <span className="leading-snug text-blue-gray-500">Precision</span>.
            </Typography>
            <Typography variant="lead" className="mx-auto w-full !text-gray-500 lg:text-lg text-base" placeholder={undefined}>
              Experience the future of database interaction. Simplify complex tasks and boost productivity like never before.
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Input color="gray" label="Enter your email" size="lg" crossOrigin={undefined} />
                <Button color="gray" className="w-full px-4 md:w-[12rem]" placeholder={undefined}>
                  get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Hero;
