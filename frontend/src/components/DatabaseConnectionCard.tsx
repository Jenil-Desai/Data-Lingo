import React from "react";
import { Card, Typography, Progress } from "@material-tailwind/react";
import TooltipWithHelperIcon from "./TooltipWithHelperIcon";

interface DatabaseConnectionsCardProps {
  totalConnections: number;
  connectionsUsed: number;
}

export function DatabaseConnectionsCard({ totalConnections, connectionsUsed }: DatabaseConnectionsCardProps) {
  const connectionsRemaining = totalConnections - connectionsUsed;
  const usagePercentage = (connectionsUsed / totalConnections) * 100;

  return (
    <Card className="w-full max-w-md p-6 bg-white hover:shadow-lg border border-blue-gray-100 rounded-xl" placeholder={undefined}>
      <Typography variant="h5" color="blue-gray" className="mb-4 flex justify-between" placeholder={undefined}>
        {"Database Connections"} <TooltipWithHelperIcon title={"Connection Info"} desc={""} />
      </Typography>
      <div className="flex justify-between mb-2">
        <Typography variant="small" color="gray" placeholder={undefined}>
          Total Connections: {totalConnections}
        </Typography>
        <Typography variant="small" color="gray" placeholder={undefined}>
          Connections Used: {connectionsUsed}
        </Typography>
      </div>
      <div className="flex justify-between mb-4">
        <Typography variant="small" color="gray" placeholder={undefined}>
          Connections Remaining: {connectionsRemaining}
        </Typography>
      </div>
      <Progress value={usagePercentage} color="green" className="h-2" placeholder={undefined} />
      <Typography variant="small" color="gray" className="mt-2 text-right" placeholder={undefined}>
        {usagePercentage.toFixed(0)}% Used
      </Typography>
    </Card>
  );
}

export default DatabaseConnectionsCard;
