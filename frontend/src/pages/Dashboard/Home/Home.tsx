import { ChatBubbleBottomCenterTextIcon, LinkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { ScaleIcon } from "@heroicons/react/16/solid";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import StatisticsChart from "../../../components/StatisticsChart";
import { StatisticsCard } from "../../../components/StatisticsCard";
import { useAuth } from "../../../hooks/UseAuth";
import PlanStatusCard from "../../../components/PlanStatusCard";
import DatabaseConnectionsCard from "../../../components/DatabaseConnectionCard";
import QueryUsageCard from "../../../components/QueryUsageCard";
import { ErrorAlert } from "../../../components/ErrorAlert";
import { errrorAlert } from "../../../store/atoms";

export default function Home() {
  const [stats, setStats] = useState({ queryUsedTillNow: 0, totalQueryPercentageChange: 0, connectionUsed: 0, connectionLimit: 0, totalChats: 0, chatLimit: 0, dailyQuery: 0, currentPlan: "Starter", queryLimit: 0, expiryDay: "", remDays: 0, queryExecutionOverTime: [], databaseUsage: [] });
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/user/stats", {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch((error) => {
        setErrorAlert({ vis: true, msg: error.response.data.error });
      });
  }, []);

  return (
    <div className="w-full h-full mt-4 md:mt-0">
      <ErrorAlert />
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 w-full">
        <StatisticsCard
          icon={React.createElement(QuestionMarkCircleIcon, { className: "w-6 h-6 text-white" })}
          title={"Total Queries Executed"}
          value={stats.queryUsedTillNow}
          footer={
            <Typography className="font-normal text-blue-gray-600" placeholder={undefined}>
              <strong className={stats.totalQueryPercentageChange > 0 ? "text-green-500" : "text-red-500"}>{`${stats.totalQueryPercentageChange > 0 ? "+" : "-"}${stats.totalQueryPercentageChange ? stats.totalQueryPercentageChange : 0}%`}</strong>
              &nbsp;since last month
            </Typography>
          }
        />
        <StatisticsCard
          icon={React.createElement(LinkIcon, { className: "w-6 h-6 text-white" })}
          title={"Database Connections"}
          value={stats.connectionUsed}
          footer={
            <Typography className="font-normal text-blue-gray-600" placeholder={undefined}>
              <strong className={stats.connectionLimit / 2 > stats.connectionUsed ? "text-green-500" : "text-red-500"}>{stats.connectionLimit - stats.connectionUsed}</strong>
              &nbsp;Remaining Connection
            </Typography>
          }
        />
        <StatisticsCard
          icon={React.createElement(ChatBubbleBottomCenterTextIcon, { className: "w-6 h-6 text-white" })}
          title={"Chats"}
          value={stats.totalChats}
          footer={
            <Typography className="font-normal text-blue-gray-600" placeholder={undefined}>
              <strong className="text-green-500">{stats.chatLimit - stats.totalChats}</strong>
              &nbsp;Remaining Chats
            </Typography>
          }
        />
        <StatisticsCard
          icon={React.createElement(ScaleIcon, { className: "w-6 h-6 text-white" })}
          title={"Daily Query Usage"}
          value={stats.dailyQuery}
          footer={
            <Typography className="font-normal text-blue-gray-600" placeholder={undefined}>
              <strong className="text-green-500">{stats.queryLimit - stats.dailyQuery}</strong>
              &nbsp;Query Left
            </Typography>
          }
        />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsChart color="white" chartName="Queries Executed" chartData={stats.queryExecutionOverTime} chartColor="#4CAF50" title="Query Execution Over Time" description="Track the number of SQL queries you’ve executed over the past months." categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
        <StatisticsChart color="white" chartName="Database Usage" chartData={stats.databaseUsage} chartColor="#FF9800" title="Database Usage Distribution" description="Analyze which databases are most frequently used in your queries." categories={["MySQL", "PostgreSQL", "Oracle"]} />
        <StatisticsChart color="white" chartName="Chat Activity" chartData={[8, 12, 7, 10, 14, 11, 13]} chartColor="#2196F3" title="Chat Activity and Query Success Rate" description="Monitor your chat activity and the success rate of SQL queries within them." categories={["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]} />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <PlanStatusCard planName={`${stats.currentPlan.replaceAll(`"`, "")} Plan`} expiryDate={stats.expiryDay} remainingDays={stats.remDays} />
        <DatabaseConnectionsCard totalConnections={stats.connectionLimit} connectionsUsed={stats.connectionUsed} />
        <QueryUsageCard dailyQueryLimit={stats.queryLimit} queriesUsedToday={stats.dailyQuery} />
      </div>
    </div>
  );
}
