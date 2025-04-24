"use client";

import React, { useEffect, useState, useRef } from "react";

interface RadarDataPoint {
  axis: string;
  value: number;
}

interface RadarChartDataset {
  label: string;
  data: RadarDataPoint[];
  color: string;
  fill?: boolean;
  fillOpacity?: number;
}

interface RadarChartProps {
  datasets: RadarChartDataset[];
  size?: number;
  className?: string;
  showLabels?: boolean;
  showLegend?: boolean;
  showAxis?: boolean;
  levels?: number;
  maxValue?: number;
  title?: string;
  animation?: boolean;
  animationDuration?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  datasets,
  size = 300,
  className = "",
  showLabels = true,
  showLegend = true,
  showAxis = true,
  levels = 5,
  maxValue: propMaxValue,
  title,
  animation = true,
  animationDuration = 1000,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [hoveredDataset, setHoveredDataset] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(animation ? 0 : 1);
  const [windowWidth, setWindowWidth] = useState(1200);
  const svgRef = useRef<SVGSVGElement>(null);

  // Find the maximum value in the datasets if not provided as prop
  const maxValue = propMaxValue !== undefined
    ? propMaxValue
    : Math.max(...datasets.flatMap(dataset => dataset.data.map(d => d.value)));

  // Get all unique axes from all datasets
  const allAxes = Array.from(
    new Set(datasets.flatMap(dataset => dataset.data.map(d => d.axis)))
  );

  // Calculate responsive size based on screen width
  const getResponsiveSize = () => {
    const baseSize = size;
    
    if (windowWidth < 640) { // Small mobile
      return Math.min(baseSize, windowWidth * 0.9);
    } else if (windowWidth < 768) { // Mobile
      return Math.min(baseSize, windowWidth * 0.7);
    } else if (windowWidth < 1024) { // Tablet
      return Math.min(baseSize, windowWidth * 0.5);
    }
    
    return baseSize;
  };

  const responsiveSize = getResponsiveSize();
  const centerX = responsiveSize / 2;
  const centerY = responsiveSize / 2;
  const radius = responsiveSize * 0.4; // Leaving some space for labels

  useEffect(() => {
    setIsClient(true);
    
    // Handle window resize for responsiveness
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Handle animation
    if (animation) {
      let start: number | null = null;
      
      const animateRadar = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / animationDuration, 1);
        setAnimationProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animateRadar);
        }
      };
      
      requestAnimationFrame(animateRadar);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [animation, animationDuration]);

  // Calculate coordinates of a point on the chart
  const getCoordinates = (angleInDegrees: number, value: number) => {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    const scaledValue = (value / maxValue) * radius * animationProgress;
    return {
      x: centerX + scaledValue * Math.cos(angleInRadians),
      y: centerY + scaledValue * Math.sin(angleInRadians),
    };
  };

  // Calculate coordinates for axis labels
  const getAxisLabelPosition = (angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    
    // Adjust label distance based on screen size to prevent cut-off
    const labelDistance = windowWidth < 640 
      ? radius + 5  // Smallest distance on mobile
      : windowWidth < 768
      ? radius + 10 // Small distance on tablets
      : radius + 20 // Standard distance on larger screens
      
    let x = centerX + labelDistance * Math.cos(angleInRadians);
    let y = centerY + labelDistance * Math.sin(angleInRadians);
    
    // Ensure labels stay within svg bounds
    x = Math.max(10, Math.min(responsiveSize - 10, x));
    y = Math.max(10, Math.min(responsiveSize - 10, y));
    
    return { x, y };
  };

  // Calculate the path data for a dataset
  const getPolygonPoints = (dataset: RadarChartDataset) => {
    return allAxes
      .map((axis, i) => {
        const dataPoint = dataset.data.find(d => d.axis === axis);
        const value = dataPoint ? dataPoint.value : 0;
        const angleInDegrees = (i * 360) / allAxes.length;
        const { x, y } = getCoordinates(angleInDegrees, value);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Generate grid level circles
  const renderGridLevels = () => {
    return Array.from({ length: levels }).map((_, i) => {
      const levelRadius = (radius * (i + 1)) / levels;
      return (
        <circle
          key={`level-${i}`}
          cx={centerX}
          cy={centerY}
          r={levelRadius}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="1"
        />
      );
    });
  };

  // Generate axes lines
  const renderAxes = () => {
    if (!showAxis) return null;
    
    return allAxes.map((_, i) => {
      const angleInDegrees = (i * 360) / allAxes.length;
      const { x, y } = getCoordinates(angleInDegrees, maxValue);
      return (
        <line
          key={`axis-${i}`}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke="currentColor"
          className="text-gray-300 dark:text-gray-600"
          strokeWidth="1"
        />
      );
    });
  };

  // Generate axis labels
  const renderAxisLabels = () => {
    if (!showLabels) return null;
    
    return allAxes.map((axis, i) => {
      const angleInDegrees = (i * 360) / allAxes.length;
      const { x, y } = getAxisLabelPosition(angleInDegrees);
      
      // For very small screens, move labels closer to avoid cutoff
      const adjustedX = windowWidth < 500 ? 
        centerX + (x - centerX) * 0.85 : x;
      const adjustedY = windowWidth < 500 ? 
        centerY + (y - centerY) * 0.85 : y;
      
      // Adjust text-anchor based on position in the circle
      let textAnchor = "middle";
      if (x < centerX - 10) textAnchor = "end";
      else if (x > centerX + 10) textAnchor = "start";
      
      // Adjust vertical alignment
      let dy = "0.3em";
      if (y < centerY - 10) dy = "0em";
      else if (y > centerY + 10) dy = "0.6em";
      
      // Truncate long axis labels on smaller screens
      let displayAxis = axis;
      if (windowWidth < 640 && axis.length > 5) {
        displayAxis = axis.slice(0, 4) + '…';
      } else if (windowWidth < 768 && axis.length > 8) {
        displayAxis = axis.slice(0, 7) + '…';
      }
      
      // Adjust text size based on screen size
      const textSizeClass = windowWidth < 640 ? "text-xxs" : "text-xs";
      
      return (
        <text
          key={`label-${i}`}
          x={adjustedX}
          y={adjustedY}
          textAnchor={textAnchor}
          dy={dy}
          className={`${textSizeClass} fill-gray-600 dark:fill-gray-400`}
        >
          {displayAxis}
          <title>{axis}</title>
        </text>
      );
    });
  };

  // Render polygon for each dataset
  const renderDatasets = () => {
    return datasets.map((dataset, datasetIndex) => {
      const isHovered = hoveredDataset === datasetIndex;
      const opacity = hoveredDataset === null || isHovered ? 1 : 0.3;
      
      return (
        <g
          key={`dataset-${datasetIndex}`}
          className="transition-opacity duration-300"
          style={{ opacity }}
          onMouseEnter={() => setHoveredDataset(datasetIndex)}
          onMouseLeave={() => setHoveredDataset(null)}
        >
          {/* Fill area */}
          {dataset.fill && (
            <polygon
              points={getPolygonPoints(dataset)}
              fill={dataset.color}
              fillOpacity={dataset.fillOpacity || 0.2}
              stroke="none"
            />
          )}
          
          {/* Outline */}
          <polygon
            points={getPolygonPoints(dataset)}
            fill="none"
            stroke={dataset.color}
            strokeWidth={isHovered ? 3 : 2}
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {allAxes.map((axis, axisIndex) => {
            const dataPoint = dataset.data.find(d => d.axis === axis);
            const value = dataPoint ? dataPoint.value : 0;
            const angleInDegrees = (axisIndex * 360) / allAxes.length;
            const { x, y } = getCoordinates(angleInDegrees, value);
            
            return (
              <circle
                key={`point-${datasetIndex}-${axisIndex}`}
                cx={x}
                cy={y}
                r={isHovered ? 5 : 4}
                fill={dataset.color}
                stroke="white"
                strokeWidth="1"
              />
            );
          })}
        </g>
      );
    });
  };

  // Render the legend
  const renderLegend = () => {
    if (!showLegend) return null;
    
    // Responsive grid columns based on screen size
    const gridCols = windowWidth < 640 ? 1 : 2;
    
    return (
      <div className={`mt-4 grid grid-cols-${gridCols} gap-2 max-w-full overflow-hidden`}>
        {datasets.map((dataset, i) => {
          // Truncate long labels on small screens
          let displayLabel = dataset.label;
          if (windowWidth < 640 && displayLabel.length > 7) {
            displayLabel = displayLabel.slice(0, 6) + '…';
          } else if (windowWidth < 768 && displayLabel.length > 10) {
            displayLabel = displayLabel.slice(0, 9) + '…';
          }
          
          return (
            <div
              key={`legend-${i}`}
              className="flex items-center"
              onMouseEnter={() => setHoveredDataset(i)}
              onMouseLeave={() => setHoveredDataset(null)}
            >
              <div
                className="w-3 h-3 mr-2 flex-shrink-0"
                style={{ backgroundColor: dataset.color }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate" title={dataset.label}>
                {displayLabel}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  if (!isClient) {
    return (
      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md">
        <span className="sr-only">Loading chart...</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {title && (
        <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      )}
      <div className="relative" style={{ width: responsiveSize, height: responsiveSize }}>
        <svg 
          ref={svgRef}
          width={responsiveSize} 
          height={responsiveSize} 
          viewBox={`0 0 ${responsiveSize} ${responsiveSize}`}
          className="overflow-visible"
        >
          {renderGridLevels()}
          {renderAxes()}
          {renderDatasets()}
          {renderAxisLabels()}
        </svg>
      </div>
      {renderLegend()}
    </div>
  );
};

export default RadarChart;
