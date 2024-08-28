import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

export function DbSupport() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container !mx-auto text-center place-content-center grid">
        <Typography color="blue-gray" variant="lead" className="!font-semibold lg:!text-lg !text-base" placeholder={undefined}>
          Extensive Database Support
        </Typography>
        <Typography variant="h1" color="blue-gray" className="my-4 !text-2xl !leading-snug lg:!text-3xl" placeholder={undefined}>
          Trusted by Top-tier Databases
        </Typography>
        <Typography variant="lead" className="mx-auto max-w-5xl !text-gray-500 lg:px-8 mb-10" placeholder={undefined}>
          Our platform seamlessly integrates with the most reliable and widely-used databases, ensuring optimal performance and security for your data management needs.
        </Typography>
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-6">
            <Card shadow={false} className="bg-[#FAFAFA] px-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
              <CardBody placeholder={undefined}>
                <img src="/images/logo-postgresql.png" alt="PostgreSQL" className="w-40" />
                <Typography variant="small" className="font-normal text-gray-500" placeholder={undefined}>
                  PostgreSQL
                </Typography>
              </CardBody>
            </Card>
            <Card shadow={false} className="bg-[#FAFAFA] px-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
              <CardBody placeholder={undefined}>
                <img src="/images/logo-oracle.png" alt="Oracle" className="w-40" />
                <Typography variant="small" className="font-normal text-gray-500" placeholder={undefined}>
                  Oracle
                </Typography>
              </CardBody>
            </Card>
          </div>
          <Card shadow={false} className="bg-[#FAFAFA] lg:px-10 justify-center max-w-[18rem] lg:max-w-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
            <CardBody className="text-center" placeholder={undefined}>
              <img src="/images/logo-mysql.png" alt="MySQL" className="w-40 mx-auto" />
              <Typography variant="small" className="font-normal text-gray-500 mb-4" placeholder={undefined}>
                MySQL
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-normal lg:max-w-[16rem]" placeholder={undefined}>
                &quot;Our integration with this platform has transformed the way we handle data across multiple database systems, with unparalleled efficiency and security.&quot;
              </Typography>
            </CardBody>
          </Card>
          <div className="flex flex-col items-center justify-center gap-6">
            <Card shadow={false} className="bg-[#FAFAFA] px-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
              <CardBody placeholder={undefined}>
                <img src="/images/logo-mongodb.png" alt="MongoDB" className="w-40" />
                <Typography variant="small" className="font-normal text-gray-500" placeholder={undefined}>
                  MongoDB (Comming Soon)
                </Typography>
              </CardBody>
            </Card>
            <Card shadow={false} className="bg-[#FAFAFA] px-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" placeholder={undefined}>
              <CardBody placeholder={undefined}>
                <img src="/images/logo-mssql.svg" alt="SQL Server" className="w-40" />
                <Typography variant="small" className="font-normal text-gray-500" placeholder={undefined}>
                  SQL Server (Comming Soon)
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <Button className="mt-6 mx-auto flex" variant="outlined" placeholder={undefined}>
        Explore Supported Databases
      </Button>
    </section>
  );
}

export default DbSupport;
