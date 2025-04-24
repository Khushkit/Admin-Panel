"use client";

import React from "react";
import { RadarChart } from "@/components/charts/radar/RadarChart";

const RadarChartPage = () => {
  const datasets = [
    {
      label: "Product A",
      data: [
        { axis: "Speed", value: 80 },
        { axis: "Reliability", value: 90 },
        { axis: "Comfort", value: 75 },
        { axis: "Safety", value: 95 },
        { axis: "Efficiency", value: 70 },
      ],
      color: "#3b82f6",
      fill: true,
      fillOpacity: 0.2,
    },
    {
      label: "Product B",
      data: [
        { axis: "Speed", value: 90 },
        { axis: "Reliability", value: 65 },
        { axis: "Comfort", value: 85 },
        { axis: "Safety", value: 75 },
        { axis: "Efficiency", value: 90 },
      ],
      color: "#10b981",
      fill: true,
      fillOpacity: 0.2,
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Radar Chart</h2>
      <div className="flex justify-center">
        <RadarChart
          datasets={datasets}
          size={400}
          showLabels={true}
          showLegend={true}
          showAxis={true}
          animation={true}
          animationDuration={1000}
          title="Product Comparison"
          levels={5}
        />
      </div>
    </div>
  );
};

export default RadarChartPage;
