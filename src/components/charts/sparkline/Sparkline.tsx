"use client";

import React, { useState, useEffect } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  showDots?: boolean;
  showFirstAndLast?: boolean;
  showHighAndLow?: boolean;
  showTooltip?: boolean;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
  animated?: boolean;
  animationDuration?: number;
  lineType?: 'straight' | 'curved';
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 120,
  height = 40,
  color = "#3b82f6",
  fillColor,
  strokeWidth = 2,
  showDots = false,
  showFirstAndLast = false,
  showHighAndLow = false,
  showTooltip = true,
  showValue = false,
  valueFormatter = (value: number) => value.toString(),
  className = "",
  animated = true,
  animationDuration = 800,
  lineType = 'straight',
}) => {
  const [isClient, setIsClient] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(animated ? 0 : 1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Find min and max values
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1;
  
  // Padding to prevent dots and line from being cut off
  const padding = strokeWidth + 2;
  
  // Scale y values to fit within the height
  const yScale = (v: number) => {
    return height - padding - ((v - minValue) / range) * (height - padding * 2);
  };

  // Calculate responsive size based on screen width
  const getResponsiveSize = () => {
    // Only adjust width, keep height as is for proper aspect ratio
    const baseWidth = width;
    
    if (windowWidth < 640) { // Small mobile
      return {
        width: Math.min(baseWidth, windowWidth * 0.8),
        height: height
      };
    } else if (windowWidth < 768) { // Mobile
      return {
        width: Math.min(baseWidth, windowWidth * 0.6),
        height: height
      };
    }
    
    return { width: baseWidth, height: height };
  };

  const responsiveSize = getResponsiveSize();

  useEffect(() => {
    setIsClient(true);
    
    // Handle window resize for responsiveness
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Handle animation
    if (animated && svgRef) {
      const path = svgRef.querySelector('path');
      if (path) {
        setPathLength(path.getTotalLength());
        
        let start: number | null = null;
        
        const animateSparkline = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / animationDuration, 1);
          setAnimationProgress(progress);
          
          if (progress < 1) {
            requestAnimationFrame(animateSparkline);
          }
        };
        
        requestAnimationFrame(animateSparkline);
      }
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [animated, animationDuration, svgRef]);

  // Generate path d attribute
  const getLinePath = () => {
    if (data.length === 0) return "";
    // Handle single data point case
    if (data.length === 1) {
      const y = yScale(data[0]);
      return `M 0,${y} L ${responsiveSize.width},${y}`;
    }
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * responsiveSize.width;
      const y = yScale(value);
      return { x, y };
    });
    
    if (lineType === 'curved' && data.length > 2) {
      // Generate a smooth curve using cubic bezier curves
      let path = `M${points[0].x},${points[0].y}`;
      
      for (let i = 0; i < points.length - 1; i++) {
        const x1 = points[i].x;
        const y1 = points[i].y;
        const x2 = points[i + 1].x;
        const y2 = points[i + 1].y;
        
        // Calculate control points
        const controlPointX1 = x1 + (x2 - x1) / 3;
        const controlPointX2 = x1 + 2 * (x2 - x1) / 3;
        
        path += ` C${controlPointX1},${y1} ${controlPointX2},${y2} ${x2},${y2}`;
      }
      
      return path;
    } else {
      // Simple straight line segments
      return points.map((point, i) => 
        (i === 0 ? 'M' : 'L') + point.x + ',' + point.y
      ).join(' ');
    }
  };
  
  // Generate fill path (for area under line)
  const getFillPath = () => {
    if (!fillColor || data.length === 0) return "";
    
    const linePath = getLinePath();
    const lastPoint = `L ${responsiveSize.width},${responsiveSize.height} L 0,${responsiveSize.height} Z`;
    
    return linePath + lastPoint;
  };
  
  // Handle mouse movement for tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!showTooltip || data.length === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Calculate which data point is closest
    // Handle single data point case
    if (data.length === 1) {
      setActiveIndex(0);
      return;
    }
    
    const index = Math.round((mouseX / responsiveSize.width) * (data.length - 1));
    const boundedIndex = Math.max(0, Math.min(data.length - 1, index));
    
    setActiveIndex(boundedIndex);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // Get dot positions for rendering
  const getDotPositions = () => {
    const positions: { index: number; x: number; y: number; value: number }[] = [];
    
    // Handle empty data case
    if (data.length === 0) return positions;
    
    // Handle single data point case
    if (data.length === 1) {
      positions.push({
        index: 0,
        x: responsiveSize.width / 2,
        y: yScale(data[0]),
        value: data[0]
      });
      return positions;
    }
    
    // Always include hovered point
    if (activeIndex !== null) {
      const x = (activeIndex / (data.length - 1)) * responsiveSize.width;
      const y = yScale(data[activeIndex]);
      positions.push({ index: activeIndex, x, y, value: data[activeIndex] });
    }
    
    // Add first and last points if requested
    if (showFirstAndLast && data.length > 0) {
      // First point
      positions.push({ 
        index: 0, 
        x: 0, 
        y: yScale(data[0]), 
        value: data[0] 
      });
      
      // Last point (if more than one point)
      if (data.length > 1) {
        const lastIndex = data.length - 1;
        positions.push({ 
          index: lastIndex, 
          x: responsiveSize.width, 
          y: yScale(data[lastIndex]), 
          value: data[lastIndex] 
        });
      }
    }
    
    // Add highest and lowest points if requested
    if (showHighAndLow && data.length > 1) {
      // Find indices of min and max values (first occurrence)
      const maxIndex = data.indexOf(maxValue);
      const minIndex = data.indexOf(minValue);
      
      // Only add if they're not already included (first/last)
      if ((maxIndex > 0 && maxIndex < data.length - 1) || (!showFirstAndLast && (maxIndex === 0 || maxIndex === data.length - 1))) {
        positions.push({ 
          index: maxIndex, 
          x: (maxIndex / (data.length - 1)) * responsiveSize.width, 
          y: yScale(maxValue), 
          value: maxValue 
        });
      }
      
      if ((minIndex > 0 && minIndex < data.length - 1) || (!showFirstAndLast && (minIndex === 0 || minIndex === data.length - 1))) {
        positions.push({
          index: minIndex, 
          x: (minIndex / (data.length - 1)) * responsiveSize.width, 
          y: yScale(minValue), 
          value: minValue 
        });
      }
    }
    
    // Add all points if showDots is true
    if (showDots) {
      data.forEach((value, index) => {
        // Check if this point is already included
        if (!positions.some(pos => pos.index === index)) {
          positions.push({
            index,
            x: (index / (data.length - 1)) * responsiveSize.width,
            y: yScale(value),
            value
          });
        }
      });
    }
    
    return positions;
  };
  
  // Render all data points
  const renderDataPoints = () => {
    if (!showDots) return null;
    
    const positions = getDotPositions();
    
    return positions.map((pos, i) => (
      <circle
        key={`dot-${pos.index}`}
        cx={pos.x}
        cy={pos.y}
        r={strokeWidth}
        fill={color}
        className="transition-opacity duration-300"
        style={{ opacity: animationProgress }}
      />
    ));
  };
  
  // Render special points (first, last, min, max)
  const renderSpecialPoints = () => {
    if (!showFirstAndLast && !showHighAndLow) return null;
    
    const positions = getDotPositions();
    
    return positions.map((pos, i) => (
      <circle
        key={`special-dot-${pos.index}`}
        cx={pos.x}
        cy={pos.y}
        r={strokeWidth + 1}
        fill={color}
        className="transition-opacity duration-300"
        style={{ opacity: animationProgress }}
      />
    ));
  };

  // Render tooltip
  const renderTooltip = () => {
    if (!showTooltip || activeIndex === null || data.length === 0) return null;
    
    // Handle single data point case
    let x, y;
    if (data.length === 1) {
      x = responsiveSize.width / 2;
      y = yScale(data[0]);
    } else {
      x = (activeIndex / (data.length - 1)) * responsiveSize.width;
      y = yScale(data[activeIndex]);
    }
    const value = data[activeIndex];
    
    // Position tooltip above the point
    // Adjust tooltip position to ensure it stays in view
    const tooltipX = Math.min(Math.max(0, x > responsiveSize.width / 2 ? x - 40 : x), responsiveSize.width - 50);
    const tooltipY = Math.max(0, y - 35);
    
    // Adjust tooltip content for mobile
    const formattedValue = valueFormatter(value);
    const displayValue = windowWidth < 640 && formattedValue.length > 8 
      ? formattedValue.substring(0, 7) + '…'
      : formattedValue;
    
    return (
      <g>
        <foreignObject
          x={tooltipX}
          y={tooltipY}
          width="80"
          height="30"
          style={{ overflow: 'visible' }}
        >
          <div
            className="px-2 py-1 text-xs bg-gray-800 text-white rounded shadow pointer-events-none"
            style={{ position: 'absolute' }}
            title={formattedValue}
          >
            {displayValue}
          </div>
        </foreignObject>
      </g>
    );
  };

  if (!isClient) {
    return (
      <div className="inline-block h-10 w-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded">
        <span className="sr-only">Loading chart...</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg 
        width={responsiveSize.width} 
        height={responsiveSize.height} 
        ref={(el) => setSvgRef(el)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-visible"
      >
        {/* Fill area under the line */}
        {fillColor && (
          <path
            d={getFillPath()}
            fill={fillColor}
            opacity={0.2}
            style={{
              clipPath: animated 
                ? `inset(0 ${100 - (animationProgress * 100)}% 0 0)` 
                : undefined
            }}
          />
        )}
        
        {/* Main line */}
        <path
          d={getLinePath()}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={animated ? {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength - (pathLength * animationProgress),
            transition: 'stroke-dashoffset 0.1s ease'
          } : undefined}
        />
        
        {/* Data points */}
        {getDotPositions().map((point, i) => (
          <circle
            key={`dot-${point.index}-${i}`}
            cx={point.x}
            cy={point.y}
            r={activeIndex === point.index ? strokeWidth + 1 : strokeWidth}
            fill={activeIndex === point.index ? color : "white"}
            stroke={color}
            strokeWidth={1.5}
            opacity={activeIndex !== null && activeIndex !== point.index ? 0.7 : 1}
            className="transition-all duration-150"
          />
        ))}
        
        {/* Tooltip */}
        {renderTooltip()}
      </svg>
      
      {/* Value display */}
      {showValue && (
        <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {valueFormatter(data[data.length - 1])}
        </div>
      )}
    </div>
  );
};

export default Sparkline;