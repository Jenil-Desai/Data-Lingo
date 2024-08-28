import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

interface StatisticsCardProps {
  color: colors;
  chartName: string;
  chartData: number[];
  chartColor: string;
  title: string;
  description: string;
  categories: number[] | string[];
}

export function StatisticsChart({ color, chartName, chartData, chartColor, title, description, categories }: StatisticsCardProps) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm" placeholder={undefined}>
      <CardHeader variant="gradient" color={color} floated={false} shadow={false} placeholder={undefined}>
        <Chart
          type="line"
          height={220}
          series={[
            {
              name: chartName,
              data: chartData,
            },
          ]}
          options={{
            chart: {
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                style: {
                  colors: chartColor,
                  fontSize: "13px",
                  fontFamily: "inherit",
                  fontWeight: 300,
                },
              },
              categories: categories,
            },
            yaxis: {
              labels: {
                style: {
                  colors: chartColor,
                  fontSize: "13px",
                  fontFamily: "inherit",
                  fontWeight: 300,
                },
              },
            },
            grid: {
              show: true,
              borderColor: "#dddddd",
              strokeDashArray: 5,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              padding: {
                top: 5,
                right: 20,
              },
            },
            fill: {
              opacity: 0.8,
            },
            tooltip: {
              theme: "dark",
            },
            colors: [chartColor],
            stroke: {
              lineCap: "round",
            },
            markers: {
              size: 5,
            },
          }}
        />
      </CardHeader>
      <CardBody className="px-6 pt-0" placeholder={undefined}>
        <Typography variant="h6" color="blue-gray" placeholder={undefined}>
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600" placeholder={undefined}>
          {description}
        </Typography>
      </CardBody>
      {/* {footer && (
        // <CardFooter className="border-t border-blue-gray-50 px-6 py-5" placeholder={undefined}>
        //   {footer}
        // </CardFooter>
      )} */}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf(["white", "blue-gray", "gray", "brown", "deep-orange", "orange", "amber", "yellow", "lime", "light-green", "green", "teal", "cyan", "light-blue", "blue", "indigo", "deep-purple", "purple", "pink", "red"]),
  chartName: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
  chartColor: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
