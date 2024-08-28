import { Card, CardBody, Avatar, IconButton, Typography } from "@material-tailwind/react";

interface TeamCardPropsType {
  img: string;
  name: string;
  title: string;
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
  };
}

function TeamCard({ img, name, title, socialLinks }: TeamCardPropsType) {
  return (
    <Card className="rounded-lg bg-[#FAFAFA] w-full transform transition-transform duration-300 hover:scale-105" shadow={false} placeholder={undefined}>
      <CardBody className="text-center" placeholder={undefined}>
        <Avatar src={img} alt={name} variant="circular" size="xxl" className="mx-auto mb-6 object-top transition-transform transform duration-150 hover:rotate-3" placeholder={undefined} />
        <Typography variant="h5" color="blue-gray" className="!font-medium text-lg" placeholder={undefined}>
          {name}
        </Typography>
        <Typography color="blue-gray" className="mb-2 !text-base !font-semibold text-gray-600" placeholder={undefined}>
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-1.5">
          <a href={socialLinks.github}>
            <IconButton variant="text" color="gray" placeholder={undefined}>
              <i className="fa-brands fa-github text-lg" />
            </IconButton>
          </a>
          <a href={socialLinks.linkedin}>
            <IconButton variant="text" color="gray" placeholder={undefined}>
              <i className="fa-brands fa-linkedin text-lg" />
            </IconButton>
          </a>
          <a href={socialLinks.instagram}>
            <IconButton variant="text" color="gray" placeholder={undefined}>
              <i className="fa-brands fa-instagram text-lg" />
            </IconButton>
          </a>
        </div>
      </CardBody>
    </Card>
  );
}

const members = [
  {
    img: "https://avatars.githubusercontent.com/u/126967976?s=400&u=506b2d309a8efdfcf77ba767dd959a627465ae03&v=4",
    name: "Jenil Desai",
    title: "Full Stack Developer",
    socialLinks: {
      github: "https://github.com/Jenil-Desai",
      linkedin: "https://www.linkedin.com/in/desaijenil/",
      instagram: "https://www.instagram.com/jenxl_09/",
    },
  },
];

export function Team() {
  return (
    <section className="min-h-full py-8 px-8 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-28">
          <Typography variant="h6" color="blue-gray" className="text-lg" placeholder={undefined}>
            Meet the Team
          </Typography>
          <Typography variant="h1" color="blue-gray" className="my-2 !text-2xl lg:!text-4xl" placeholder={undefined}>
            Behind the Success: Our Dedicated Team
          </Typography>
          <Typography variant="lead" className="mx-auto w-full !text-gray-500 max-w-4xl" placeholder={undefined}>
            From visionary leadership to creative talent, and technical wizards, each team member plays a pivotal role in delivering the exceptional service and innovative solutions.
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:flex justify-between">
          {members.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
