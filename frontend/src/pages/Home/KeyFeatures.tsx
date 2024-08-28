import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function KeyFeatures() {
  return (
    <section className="lg:py-28 py-10 px-8">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase" placeholder={undefined}>
          Key Features
        </Typography>
        <Typography color="blue-gray" className="mb-4 !text-2xl font-bold lg:!text-4xl" placeholder={undefined}>
          Elevate Your Data Management Experience
        </Typography>
        <Typography variant="lead" className="mx-auto max-w-lg !text-gray-500" placeholder={undefined}>
          Unlock the full potential of your data with our advanced, user-friendly platform designed for efficiency and precision.
        </Typography>
      </div>
      <div className="mb-8 container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 bg-gray-100/50 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
          <CardBody className="text-center" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-medium" placeholder={undefined}>
              Intelligent Query Generation
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500" placeholder={undefined}>
              Leverage AI to effortlessly convert natural language into precise SQL queries tailored to your database schema.
            </Typography>
            <img src="/images/Mobile.png" alt="AI-powered Query Generation" className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center transition-transform duration-300 hover:scale-110" />
          </CardBody>
        </Card>
        <Card className="col-span-2 bg-gray-100/50 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
          <CardBody className="text-center" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-medium" placeholder={undefined}>
              Seamless Database Integration
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500" placeholder={undefined}>
              Connect to multiple databases with ease, enabling smooth data retrieval, updates, and analysis.
            </Typography>
            <img src="/images/Laptop.png" alt="Database Integration" className="w-full lg:h-[380px] md:h-[300px] h-[220px] lg:translate-y-16 translate-y-10 object-cover object-center transition-transform duration-300 hover:scale-110" />
          </CardBody>
        </Card>
      </div>
      <div className="container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-2 bg-gray-100/50 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
          <CardBody className="text-center" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-medium" placeholder={undefined}>
              Real-Time Data Insights
            </Typography>
            <Typography className="text-center max-w-sm mx-auto text-base font-normal leading-7 !text-gray-500" placeholder={undefined}>
              Gain actionable insights with real-time analytics and reporting tools designed for accuracy and speed.
            </Typography>
            <img src="/images/Laptop.png" alt="Real-Time Analytics" className="w-full xl:h-[355px] lg:h-[380px] md:h-[300px] h-[180px] lg:translate-y-6 translate-y-10 object-cover object-top transition-transform duration-300 hover:scale-110" />
          </CardBody>
        </Card>
        <Card className="col-span-1 bg-gray-100/50 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
          <CardBody className="text-center" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" className="mb-2 font-medium" placeholder={undefined}>
              Customizable Workflows
            </Typography>
            <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500" placeholder={undefined}>
              Adapt your workflows with flexible tools that cater to your specific data management needs.
            </Typography>
            <img src="/images/Mobile.png" alt="Customizable Workflows" className="w-full xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-cover object-center transition-transform duration-300 hover:scale-110" />
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
