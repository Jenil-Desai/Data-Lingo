import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import TooltipWithHelperIcon from "./TooltipWithHelperIcon";

interface PlanStatusCardProps {
  planName: string;
  expiryDate: string;
  remainingDays: number;
}

export function PlanStatusCard({ planName, expiryDate, remainingDays }: PlanStatusCardProps) {
  const navigate = useNavigate();

  // const planName = "Starter Plan";
  // const expiryDate = "2024-12-31";
  // const remainingDays = 30;

  return (
    <Card className="w-full max-w-md p-6 bg-white hover:shadow-lg border border-blue-gray-100 rounded-xl" placeholder={undefined}>
      <Typography variant="h5" color="blue-gray" className="mb-4 flex justify-between" placeholder={undefined}>
        {planName} <TooltipWithHelperIcon title="Plan Info" desc="" />
      </Typography>
      <Typography variant="small" color="gray" className="mb-2" placeholder={undefined}>
        Expiry Date: {expiryDate}
      </Typography>
      <Typography variant="small" color="gray" className="mb-4" placeholder={undefined}>
        Remaining Days: {remainingDays}
      </Typography>
      <Button variant="gradient" color="gray" placeholder={undefined} onClick={() => navigate("/pricing")}>
        Upgrade Plan
      </Button>
    </Card>
  );
}

export default PlanStatusCard;
