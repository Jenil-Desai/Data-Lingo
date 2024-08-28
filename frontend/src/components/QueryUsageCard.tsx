import { Card, Typography, Progress } from "@material-tailwind/react";
import TooltipWithHelperIcon from "./TooltipWithHelperIcon";

interface QueryUsageCardProps {
  dailyQueryLimit: number;
  queriesUsedToday: number;
}

export function QueryUsageCard({ dailyQueryLimit, queriesUsedToday }: QueryUsageCardProps) {
  const queriesRemainingToday = dailyQueryLimit - queriesUsedToday;
  const resetTime = "12:00 AM";
  const usagePercentage = (queriesUsedToday / dailyQueryLimit) * 100;

  return (
    <Card className="w-full max-w-md p-6 bg-white hover:shadow-lg border border-blue-gray-100 rounded-xl" placeholder={undefined}>
      <Typography variant="h5" color="blue-gray" className="mb-4 flex justify-between" placeholder={undefined}>
        {"Query Usage"}
        <TooltipWithHelperIcon title="Query Info" desc="" />
      </Typography>
      <div className="flex justify-between mb-2">
        <Typography variant="small" color="gray" placeholder={undefined}>
          Daily Query Limit: {dailyQueryLimit}
        </Typography>
        <Typography variant="small" color="gray" placeholder={undefined}>
          Queries Used Today: {queriesUsedToday}
        </Typography>
      </div>
      <div className="flex justify-between mb-2">
        <Typography variant="small" color="gray" placeholder={undefined}>
          Queries Remaining Today: {queriesRemainingToday}
        </Typography>
        <Typography variant="small" color="gray" placeholder={undefined}>
          Reset Time: {resetTime}
        </Typography>
      </div>
      <Progress value={usagePercentage} color="amber" className="h-2" placeholder={undefined} />
      <Typography variant="small" color="gray" className="mt-2 text-right" placeholder={undefined}>
        {usagePercentage.toFixed(0)}% Used
      </Typography>
    </Card>
  );
}

export default QueryUsageCard;
