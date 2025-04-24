"use client";

import React from "react";
import { Heatmap } from "@/components/charts/heatmap/Heatmap";

const HeatmapChartPage = () => {
  // Generate sample data for the heatmap
  const generateData = () => {
    const data = [];
    const rows = 10;
    const cols = 12;
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Create some patterns in the data
        let value = Math.sin(x / 2) * Math.cos(y / 2) * 50 + 50;
        // Add some randomness
        value += Math.random() * 15;
        
        data.push({
          x,
          y,
          value: Math.round(value),
        });
      }
    }
    
    return data;
  };
  
  const data = generateData();
  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Heatmap Chart</h2>
      <div className="flex justify-center">
        <Heatmap
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          width={600}
          height={400}
          colorRange={["#f5f5ff", "#4338ca"]}
          showTooltip={true}
          showLegend={true}
          title="Monthly Performance Heatmap"
          subtitle="Performance metrics across categories"
          cellRadius={2}
          cellGap={2}
          animation={true}
          gridLines={true}
          formatValue={(value) => `${value.toFixed(0)}`}
        />
      </div>
    </div>
  );
};

export default HeatmapChartPage;
