"use client";

import React, { useEffect, useRef, useState } from "react";

interface DonutChartData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  size?: number;
  thickness?: number;
  className?: string;
  showLabels?: boolean;
  showLegend?: boolean;
  showValues?: boolean;
  showTotal?: boolean;
  centerContent?: React.ReactNode;
  title?: string;
  animation?: boolean;
  animationDuration?: number;
}

// Add CSS for animation
const animationStyle = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  thickness = 40,
  className = "",
  showLabels = true,
  showLegend = true,
  showValues = true,
  showTotal = true,
  centerContent,
  title,
  animation = true,
  animationDuration = 1000,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const center = size / 2;

  // Handle window resize for responsiveness
  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust size based on screen width for responsiveness
  const getResponsiveSize = () => {
    const baseSize = size;
    
    if (windowWidth < 640) { // Small mobile
      return Math.min(baseSize, windowWidth * 0.8);
    } else if (windowWidth < 768) { // Mobile
      return Math.min(baseSize, windowWidth * 0.6);
    } else if (windowWidth < 1024) { // Tablet
      return Math.min(baseSize, windowWidth * 0.5);
    }
    
    return baseSize;
  };

  const responsiveSize = getResponsiveSize();
  const responsiveRadius = responsiveSize / 2;
  const responsiveInnerRadius = responsiveRadius - (thickness * responsiveSize / size);
  const responsiveCenter = responsiveSize / 2;

  // Helper function to create SVG arc path
  const describeArc = (x: number, y: number, outerRadius: number, innerRadius: number, startAngle: number, endAngle: number) => {
    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    const x1 = x + innerRadius * Math.cos(startAngleRad);
    const y1 = y + innerRadius * Math.sin(startAngleRad);
    
    const x2 = x + outerRadius * Math.cos(startAngleRad);
    const y2 = y + outerRadius * Math.sin(startAngleRad);
    
    const x3 = x + outerRadius * Math.cos(endAngleRad);
    const y3 = y + outerRadius * Math.sin(endAngleRad);
    
    const x4 = x + innerRadius * Math.cos(endAngleRad);
    const y4 = y + innerRadius * Math.sin(endAngleRad);
    
    return `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
      Z
    `;
  };

  const renderDonutSegments = () => {
    let segments: React.ReactNode[] = [];
    let currentAngle = 0;

    data.forEach((item, index) => {
      const percentage = item.value / total;
      const angle = 360 * percentage;
      
      // Calculate segment coordinates
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const midAngle = startAngle + (angle / 2);
      const midAngleRad = (midAngle - 90) * (Math.PI / 180);
      
      const isHovered = hoveredSegment === index;
      const scale = isHovered ? 1.05 : 1;
      
      // Create arc path for the donut segment
      const arcPath = describeArc(
        responsiveCenter,
        responsiveCenter,
        responsiveRadius,
        responsiveInnerRadius,
        startAngle,
        endAngle
      );
      
      segments.push(
        <g
          key={`segment-${index}`}
          transform={`scale(${scale})`}
          onMouseEnter={() => setHoveredSegment(index)}
          onMouseLeave={() => setHoveredSegment(null)}
          style={{ 
            transformOrigin: `${responsiveCenter}px ${responsiveCenter}px`,
            transition: "transform 0.2s ease-out" 
          }}
        >
          <path
            d={arcPath}
            fill={item.color}
            stroke="white"
            strokeWidth="1"
            style={{
              opacity: animation ? 0 : 1,
              animation: animation ? `fadeIn ${animationDuration}ms ease-out forwards` : "none"
            }}
          />
          {isHovered && (
            <title>
              {item.label}: {(percentage * 100).toFixed(1)}% ({item.value})
            </title>
          )}
        </g>
      );
      
      // Add labels if enabled
      if (showLabels) {
        const labelRadius = responsiveRadius + 20;
        const labelX = responsiveCenter + labelRadius * Math.cos(midAngleRad);
        const labelY = responsiveCenter + labelRadius * Math.sin(midAngleRad);
        
        // Determine text anchor based on position
        const textAnchor = 
          labelX < responsiveCenter - 5 ? "end" : 
          labelX > responsiveCenter + 5 ? "start" : 
          "middle";
        
        // Truncate label for smaller screens
        let displayLabel = item.label;
        if (windowWidth < 640 && displayLabel.length > 10) {
          displayLabel = displayLabel.substring(0, 10) + '...';
        }
        
        segments.push(
          <g 
            key={`label-${index}`}
            style={{
              opacity: hoveredSegment === null || hoveredSegment === index ? 1 : 0.6,
              transition: "opacity 0.2s ease-out"
            }}
          >
            <text
              x={labelX}
              y={labelY}
              dy="0.35em"
              textAnchor={textAnchor}
              className="text-xs font-medium fill-gray-700 dark:fill-gray-300"
            >
              {displayLabel}
              {showValues && ` (${(percentage * 100).toFixed(1)}%)`}
            </text>
          </g>
        );
      }
      
      currentAngle += angle;
    });

    return segments;
  };

  const renderLegend = () => {
    if (!showLegend) return null;

    // Responsive grid layout based on screen size
    const gridColumns = windowWidth < 640 ? 1 : 2;

    return (
      <div className="mt-4 grid gap-2 text-sm max-w-full overflow-hidden"
           style={{ gridTemplateColumns: gridColumns === 1 ? '1fr' : '1fr 1fr' }}>
        {data.map((item, index) => {
          // Truncate label for small screens
          let displayLabel = item.label;
          if (windowWidth < 640 && displayLabel.length > 12) {
            displayLabel = displayLabel.slice(0, 12) + '...';
          }
          
          return (
            <div
              key={index}
              className="flex items-center"
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div
                className="w-3 h-3 rounded-sm mr-2 flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="truncate text-gray-700 dark:text-gray-300" title={item.label}>
                {displayLabel}
              </span>
              {showValues && (
                <span className="ml-1 text-gray-500 dark:text-gray-400 text-xs">
                  ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCenterContent = () => {
    if (centerContent) {
      return (
        <foreignObject
          x={responsiveCenter - responsiveInnerRadius}
          y={responsiveCenter - responsiveInnerRadius}
          width={responsiveInnerRadius * 2}
          height={responsiveInnerRadius * 2}
          className="overflow-visible"
        >
          <div className="flex items-center justify-center h-full w-full">
            {centerContent}
          </div>
        </foreignObject>
      );
    }

    if (showTotal) {
      // Adjust text size based on chart size
      const fontSize = responsiveSize < 150 ? 'text-sm' : responsiveSize < 200 ? 'text-base' : 'text-lg';
      
      return (
        <text
          x={responsiveCenter}
          y={responsiveCenter}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`${fontSize} font-bold fill-gray-800 dark:fill-white`}
        >
          {total.toLocaleString()}
        </text>
      );
    }

    return null;
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
      <style>{animationStyle}</style>
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
          {renderDonutSegments()}
          {renderCenterContent()}
        </svg>
      </div>
      {renderLegend()}
    </div>
  );
};

export default DonutChart;
