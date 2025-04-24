"use client";

import React from "react";
import { DonutChart } from "@/components/charts/donut/DonutChart";

const DonutChartPage = () => {
  const data = [
    { label: "Desktop", value: 65, color: "#3b82f6" },
    { label: "Mobile", value: 25, color: "#10b981" },
    { label: "Tablet", value: 10, color: "#f59e0b" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Donut Chart</h2>
      <div className="flex justify-center">
        <DonutChart
          data={data}
          size={300}
          thickness={40}
          showLabels={true}
          showLegend={true}
          showValues={true}
          showTotal={true}
          title="Device Distribution"
          animation={true}
          animationDuration={1000}
        />
      </div>
    </div>
  );
};

export default DonutChartPage;
