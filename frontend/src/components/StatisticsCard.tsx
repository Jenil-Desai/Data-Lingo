import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer }: StatisticsCard) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm w-full" placeholder={undefined}>
      <CardHeader variant="gradient" color={color} floated={false} shadow={false} className="absolute grid h-12 w-12 place-items-center" placeholder={undefined}>
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right" placeholder={undefined}>
        <Typography variant="small" className="font-normal text-blue-gray-600" placeholder={undefined}>
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4" placeholder={undefined}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

interface StatisticsCard {
  color: "white" | "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow" | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue" | "indigo" | "deep-purple" | "purple" | "pink" | "red";
  icon: JSX.Element;
  title: string;
  value: string | number;
  footer?: JSX.Element;
}

StatisticsCard.defaultProps = {
  color: "blue-gray",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf(["white", "blue-gray", "gray", "brown", "deep-orange", "orange", "amber", "yellow", "lime", "light-green", "green", "teal", "cyan", "light-blue", "blue", "indigo", "deep-purple", "purple", "pink", "red"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
