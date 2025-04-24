"use client";

import React from "react";
import { Sparkline } from "@/components/charts/sparkline/Sparkline";

const SparklineChartPage = () => {
  // Generate sample data for different sparklines
  const generateData = (length: number, trend: 'up' | 'down' | 'volatile') => {
    const data = [];
    let value = 50;
    
    for (let i = 0; i < length; i++) {
      switch (trend) {
        case 'up':
          value += Math.random() * 5 - 1; // Mostly up
          break;
        case 'down':
          value -= Math.random() * 5 - 1; // Mostly down
          break;
        case 'volatile':
          value += Math.random() * 10 - 5; // More volatile
          break;
      }
      
      // Keep values in a reasonable range
      value = Math.max(10, Math.min(90, value));
      data.push(value);
    }
    
    return data;
  };
  
  const upTrendData = generateData(20, 'up');
  const downTrendData = generateData(20, 'down');
  const volatileData = generateData(20, 'volatile');
  const fewPointsData = [30, 50, 25, 60, 70];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Sparkline Charts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">Upward Trend</h3>
          <Sparkline
            data={upTrendData}
            width={200}
            height={60}
            color="#3b82f6"
            fillColor="#3b82f680"
            strokeWidth={2}
            showDots={false}
            showFirstAndLast={true}
            showHighAndLow={true}
            showTooltip={true}
            showValue={true}
            valueFormatter={(value) => `${value.toFixed(1)}`}
            animated={true}
            lineType="curved"
          />
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">Downward Trend</h3>
          <Sparkline
            data={downTrendData}
            width={200}
            height={60}
            color="#ef4444"
            fillColor="#ef444480"
            strokeWidth={2}
            showDots={false}
            showFirstAndLast={true}
            showHighAndLow={true}
            showTooltip={true}
            showValue={true}
            valueFormatter={(value) => `${value.toFixed(1)}`}
            animated={true}
            lineType="curved"
          />
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">Volatile Data</h3>
          <Sparkline
            data={volatileData}
            width={200}
            height={60}
            color="#f59e0b"
            fillColor="#f59e0b80"
            strokeWidth={2}
            showDots={true}
            showFirstAndLast={false}
            showHighAndLow={true}
            showTooltip={true}
            showValue={true}
            valueFormatter={(value) => `${value.toFixed(1)}`}
            animated={true}
            lineType="straight"
          />
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">Few Data Points</h3>
          <Sparkline
            data={fewPointsData}
            width={200}
            height={60}
            color="#10b981"
            fillColor="#10b98180"
            strokeWidth={3}
            showDots={true}
            showFirstAndLast={true}
            showHighAndLow={false}
            showTooltip={true}
            showValue={true}
            valueFormatter={(value) => `${value.toFixed(0)}`}
            animated={true}
            lineType="straight"
          />
        </div>
      </div>
    </div>
  );
};

export default SparklineChartPage;
