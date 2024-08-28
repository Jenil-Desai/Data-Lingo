import { Typography, Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

interface PricingCardProps {
  title: string;
  desc: string;
  price: string[];
  options: { icon: JSX.Element; info: string }[];
}

function PricingCard({ title, desc, price, options }: PricingCardProps) {
  return (
    <Card variant="gradient" color="white" placeholder={undefined}>
      <CardHeader floated={false} shadow={false} color="transparent" className="p-6" placeholder={undefined}>
        <Typography variant="h6" color="blue-gray" className="font-bold mb-1" placeholder={undefined}>
          {title}
        </Typography>
        <Typography variant="small" className="text-gray-500" placeholder={undefined}>
          {desc}
        </Typography>
        <Typography variant="h3" color="blue-gray" className="mt-4 flex gap-1 text-4xl" placeholder={undefined}>
          {price[0]}
          {price[1]}
          <Typography as="span" color="blue-gray" className="self-end opacity-70 text-lg font-bold" placeholder={undefined}>
            /{price[2]}
          </Typography>
        </Typography>
      </CardHeader>
      <CardBody className="pt-0" placeholder={undefined}>
        <ul className="flex flex-col gap-3 mb-6">
          {options.map((option, key) => (
            <li key={key} className="flex items-center gap-3 text-gray-700">
              {option.icon}
              <Typography variant="small" className="text-inherit" placeholder={undefined}>
                {option.info}
              </Typography>
            </li>
          ))}
        </ul>
        <Button fullWidth variant="gradient" color="gray" placeholder={undefined}>
          Get Started
        </Button>
      </CardBody>
    </Card>
  );
}

export function PricingSection() {
  const cards = [
    {
      title: "Starter",
      desc: "Ideal for new users to explore the basics of Data Lingo with limited features.",
      price: ["$", "0", "month"],
      options: [
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 1 Connection" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 5 Chats" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 10 Queries Per Day" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Email Support" },
        { icon: <MinusCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Query Result Export" },
      ],
    },
    {
      title: "Essential",
      desc: "A step up for users needing more functionality and moderate usage.",
      price: ["$", "15", "month"],
      options: [
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 3 Connection" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 20 Chats" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 30 Queries Per Day" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Standard Support" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Query Result Export" },
      ],
    },
    {
      title: "Professional",
      desc: "Designed for users who need advanced features and higher usage limits.",
      price: ["$", "30", "year"],
      options: [
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 10 Connection" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 50 Chats" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 100 Queries Per Day" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Priority Support" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Query Result Export" },
      ],
    },
    {
      title: "Enterprise",
      desc: "Comprehensive solution for businesses requiring unlimited access and premium support.",
      price: ["$", "60", "year"],
      options: [
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Unlimited Connection" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Unlimited Chats" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Up To 500 Queries Per Day" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "VIP Support" },
        { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Query Result Export" },
      ],
    },
  ];

  return (
    <section className="py-24 px-8" id="pricing-section">
      <div className="container mx-auto text-center">
        <Typography color="blue-gray" className="mb-4 font-bold text-lg" placeholder={undefined}>
          Pricing Plans
        </Typography>
        <Typography variant="h1" color="blue-gray" className="mb-4 leading-snug lg:text-4xl text-2xl max-w-2xl mx-auto" placeholder={undefined}>
          Invest in a plan that matches your ambitions.
        </Typography>
        <Typography variant="lead" className="mb-10 text-gray-500 max-w-xl mx-auto" placeholder={undefined}>
          Compare our plans and choose the one that best fits your business needs.
        </Typography>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 justify-center">
          {cards.map(({ title, desc, options, price }, key) => (
            <PricingCard key={key} title={title} desc={desc} price={price} options={options} />
          ))}
        </div>
        <Typography variant="small" className="mt-10 text-gray-500" placeholder={undefined}>
          Enjoy free updates and support with every package.
        </Typography>
      </div>
    </section>
  );
}

export default PricingSection;
