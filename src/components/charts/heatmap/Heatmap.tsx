"use client";

import React, { useState, useEffect, useRef } from "react";

interface HeatmapCell {
  x: number;
  y: number;
  value: number;
}

interface HeatmapProps {
  data: HeatmapCell[];
  xLabels: string[];
  yLabels: string[];
  width?: number;
  height?: number;
  colorRange?: string[];
  showTooltip?: boolean;
  showLegend?: boolean;
  title?: string;
  subtitle?: string;
  cellRadius?: number;
  cellGap?: number;
  className?: string;
  minValue?: number;
  maxValue?: number;
  animation?: boolean;
  gridLines?: boolean;
  formatValue?: (value: number) => string;
  onCellClick?: (cell: HeatmapCell) => void;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  xLabels,
  yLabels,
  width = 600,
  height = 400,
  colorRange = ["#f5f5ff", "#4338ca"],
  showTooltip = true,
  showLegend = true,
  title,
  subtitle,
  cellRadius = 2,
  cellGap = 2,
  className = "",
  minValue: propMinValue,
  maxValue: propMaxValue,
  animation = true,
  gridLines = true,
  formatValue = (value: number) => value.toString(),
  onCellClick,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    cell: HeatmapCell;
  } | null>(null);
  const [animatedCells, setAnimatedCells] = useState<number[]>([]);
  const [windowWidth, setWindowWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute min and max values if not provided
  const minValue =
    propMinValue !== undefined
      ? propMinValue
      : Math.min(...data.map((cell) => cell.value));
  const maxValue =
    propMaxValue !== undefined
      ? propMaxValue
      : Math.max(...data.map((cell) => cell.value));

  // Calculate responsive dimensions based on screen width and container size
  const getResponsiveDimensions = () => {
    if (!isClient) return { width, height };
    
    // Base width and height from props
    let responsiveWidth = width;
    let responsiveHeight = height;
    
    // Adjust for mobile and smaller screens
    if (windowWidth < 640) { // Small mobile
      responsiveWidth = Math.min(windowWidth - 40, responsiveWidth);
      // Keep aspect ratio but reduce height proportionally
      const aspectRatio = width / height;
      responsiveHeight = responsiveWidth / aspectRatio;
    } else if (windowWidth < 768) { // Mobile
      responsiveWidth = Math.min(windowWidth - 60, responsiveWidth);
      const aspectRatio = width / height;
      responsiveHeight = responsiveWidth / aspectRatio;
    } else if (windowWidth < 1024) { // Tablet
      responsiveWidth = Math.min(windowWidth - 80, responsiveWidth);
    }
    
    return { width: responsiveWidth, height: responsiveHeight };
  };

  const responsiveDimensions = getResponsiveDimensions();
  const responsiveWidth = responsiveDimensions.width;
  const responsiveHeight = responsiveDimensions.height;

  // Layout calculations with responsive dimensions
  const responsiveMarginTop = title ? Math.max(40, responsiveHeight * 0.15) : Math.max(30, responsiveHeight * 0.1);
  const responsiveMarginRight = showLegend ? Math.max(60, responsiveWidth * 0.12) : 25;
  const responsiveMarginBottom = Math.max(30, responsiveHeight * 0.15);
  const responsiveMarginLeft = Math.max(40, responsiveWidth * 0.1);

  const responsiveInnerWidth = responsiveWidth - responsiveMarginLeft - responsiveMarginRight;
  const responsiveInnerHeight = responsiveHeight - responsiveMarginTop - responsiveMarginBottom;

  const responsiveCellWidth = responsiveInnerWidth / xLabels.length;
  const responsiveCellHeight = responsiveInnerHeight / yLabels.length;

  useEffect(() => {
    setIsClient(true);
    
    // Handle window resize for responsiveness
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animate cells appearing one by one
    if (animation) {
      const interval = setInterval(() => {
        setAnimatedCells((prev) => {
          if (prev.length >= data.length) {
            clearInterval(interval);
            return prev;
          }
          return [...prev, prev.length];
        });
      }, 20);

      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
      };
    } else {
      setAnimatedCells(data.map((_, i) => i));
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [animation, data.length]);

  // Get color for cell value using linear interpolation
  const getColor = (value: number) => {
    if (colorRange.length === 1) return colorRange[0];
    
    // Normalize value to 0-1 range
    const normalizedValue = Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));
    
    // For specific gradient points in the color range
    if (colorRange.length > 2) {
      const segmentLength = 1 / (colorRange.length - 1);
      const segmentIndex = Math.min(
        colorRange.length - 2,
        Math.floor(normalizedValue / segmentLength)
      );
      const segmentRatio = (normalizedValue - segmentIndex * segmentLength) / segmentLength;
      
      return interpolateColor(
        colorRange[segmentIndex],
        colorRange[segmentIndex + 1],
        segmentRatio
      );
    }
    
    // Simple two-color interpolation
    return interpolateColor(colorRange[0], colorRange[1], normalizedValue);
  };

  // Color interpolation function
  const interpolateColor = (colorA: string, colorB: string, ratio: number) => {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b];
    };
    
    const [rA, gA, bA] = hexToRgb(colorA);
    const [rB, gB, bB] = hexToRgb(colorB);
    
    const r = Math.round(rA + (rB - rA) * ratio);
    const g = Math.round(gA + (gB - gA) * ratio);
    const b = Math.round(bA + (bB - bA) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Event handlers for interactivity
  const handleCellMouseEnter = (
    e: React.MouseEvent,
    cell: HeatmapCell
  ) => {
    if (!showTooltip) return;
    
    const rect = (e.target as SVGRectElement).getBoundingClientRect();
    const svgRect = (e.currentTarget as SVGElement).parentElement?.getBoundingClientRect();
    
    if (svgRect) {
      setTooltip({
        visible: true,
        x: rect.x - svgRect.x + rect.width / 2,
        y: rect.y - svgRect.y,
        cell,
      });
    }
  };

  const handleCellMouseLeave = () => {
    if (tooltip) {
      setTooltip({ ...tooltip, visible: false });
    }
  };

  const handleCellClick = (cell: HeatmapCell) => {
    if (onCellClick) {
      onCellClick(cell);
    }
  };

  // Render functions for different components of the heatmap
  const renderCells = () => {
    return data.map((cell, index) => {
      const isVisible = animatedCells.includes(index);
      // Use responsive dimensions for positioning and sizing
      const x = responsiveMarginLeft + cell.x * responsiveCellWidth;
      const y = responsiveMarginTop + cell.y * responsiveCellHeight;
      const cellColor = getColor(cell.value);
      
      // Adjust radius for smaller cells on mobile
      const adjustedRadius = windowWidth < 640 ? Math.min(cellRadius, 1) : cellRadius;
      const adjustedGap = windowWidth < 640 ? Math.min(cellGap, 1) : cellGap;
      
      return (
        <rect
          key={`cell-${cell.x}-${cell.y}`}
          x={x + adjustedGap / 2}
          y={y + adjustedGap / 2}
          width={responsiveCellWidth - adjustedGap}
          height={responsiveCellHeight - adjustedGap}
          rx={adjustedRadius}
          ry={adjustedRadius}
          fill={isVisible ? cellColor : "transparent"}
          opacity={isVisible ? 1 : 0}
          className="transition-opacity duration-300"
          style={{ cursor: onCellClick ? "pointer" : "default" }}
          onMouseEnter={(e) => handleCellMouseEnter(e, cell)}
          onMouseLeave={handleCellMouseLeave}
          onClick={() => handleCellClick(cell)}
        >
          <title>{formatValue(cell.value)}</title>
        </rect>
      );
    });
  };

  const renderGridLines = () => {
    if (!gridLines) return null;
    
    const horizontalLines = yLabels.map((_, i) => (
      <line
        key={`h-line-${i}`}
        x1={responsiveMarginLeft}
        y1={responsiveMarginTop + i * responsiveCellHeight}
        x2={responsiveWidth - responsiveMarginRight}
        y2={responsiveMarginTop + i * responsiveCellHeight}
        stroke="currentColor"
        className="text-gray-200 dark:text-gray-700"
        strokeWidth="1"
      />
    ));

    const verticalLines = xLabels.map((_, i) => (
      <line
        key={`v-line-${i}`}
        x1={responsiveMarginLeft + i * responsiveCellWidth}
        y1={responsiveMarginTop}
        x2={responsiveMarginLeft + i * responsiveCellWidth}
        y2={responsiveHeight - responsiveMarginBottom}
        stroke="currentColor"
        className="text-gray-200 dark:text-gray-700"
        strokeWidth="1"
      />
    ));

    return (
      <>
        {horizontalLines}
        {verticalLines}
      </>
    );
  };

  const renderXLabels = () => {
    return xLabels.map((label, i) => {
      // Truncate label if needed for small screens
      let displayLabel = label;
      if (windowWidth < 640 && label.length > 3) {
        displayLabel = label.slice(0, 3);
      } else if (windowWidth < 768 && label.length > 5) {
        displayLabel = label.slice(0, 5);
      }
      
      // Adjust label positioning
      const labelX = responsiveMarginLeft + i * responsiveCellWidth + responsiveCellWidth / 2;
      const labelY = responsiveHeight - responsiveMarginBottom / 2;
      
      // Skip some labels on mobile to avoid overcrowding
      const skipLabels = windowWidth < 640 && xLabels.length > 10 && i % 2 !== 0;
      if (skipLabels) return null;
      
      return (
        <text
          key={`x-label-${i}`}
          x={labelX}
          y={labelY}
          textAnchor="middle"
          className={`${windowWidth < 640 ? 'text-[0.65rem]' : 'text-xs'} fill-gray-600 dark:fill-gray-400`}
        >
          {displayLabel}
          {displayLabel !== label && <title>{label}</title>}
        </text>
      );
    });
  };

  const renderYLabels = () => {
    return yLabels.map((label, i) => {
      // Truncate label if needed for small screens
      let displayLabel = label;
      if (windowWidth < 640 && label.length > 5) {
        displayLabel = label.slice(0, 5) + '...';
      } else if (windowWidth < 768 && label.length > 10) {
        displayLabel = label.slice(0, 10) + '...';
      }
      
      // Adjust label positioning
      const labelX = responsiveMarginLeft / 2;
      const labelY = responsiveMarginTop + i * responsiveCellHeight + responsiveCellHeight / 2;
      
      // Skip some labels on mobile to avoid overcrowding
      const skipLabels = windowWidth < 640 && yLabels.length > 10 && i % 2 !== 0;
      if (skipLabels) return null;
      
      return (
        <text
          key={`y-label-${i}`}
          x={labelX}
          y={labelY}
          textAnchor="end"
          alignmentBaseline="middle"
          className={`${windowWidth < 640 ? 'text-[0.65rem]' : 'text-xs'} fill-gray-600 dark:fill-gray-400`}
        >
          {displayLabel}
          {displayLabel !== label && <title>{label}</title>}
        </text>
      );
    });
  };

  const renderLegend = () => {
    if (!showLegend) return null;

    // Make legend responsive based on chart size
    const legendWidth = Math.max(20, responsiveWidth * 0.05);
    const legendHeight = Math.min(150, responsiveHeight * 0.5);
    const gradientId = "heatmap-gradient";
    const legendX = responsiveWidth - responsiveMarginRight / 2 - legendWidth / 2;
    const legendY = responsiveMarginTop;

    // Generate color steps for the legend
    const colorSteps = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      colorSteps.push(
        <stop key={`stop-${i}`} offset={`${i * 10}%`} stopColor={getColor(maxValue - t * (maxValue - minValue))} />
      );
    }

    // Generate legend value labels - reduce number of labels on small screens
    const numLabels = windowWidth < 640 ? 3 : 5;
    const legendLabels = [];
    for (let i = 0; i <= numLabels; i++) {
      const t = i / numLabels;
      const value = maxValue - t * (maxValue - minValue);
      
      // Format value and truncate if needed
      const formattedValue = formatValue(value);
      const displayValue = windowWidth < 640 && formattedValue.length > 4 ?
        formattedValue.substring(0, 4) : formattedValue;
      
      legendLabels.push(
        <text
          key={`legend-label-${i}`}
          x={legendX + legendWidth + 5}
          y={legendY + t * legendHeight}
          textAnchor="start"
          alignmentBaseline="middle"
          className={`${windowWidth < 640 ? 'text-[0.65rem]' : 'text-xs'} fill-gray-600 dark:fill-gray-400`}
        >
          {displayValue}
          {displayValue !== formattedValue && <title>{formattedValue}</title>}
        </text>
      );
    }

    return (
      <>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            {colorSteps}
          </linearGradient>
        </defs>
        <rect
          x={legendX}
          y={legendY}
          width={legendWidth}
          height={legendHeight}
          fill={`url(#${gradientId})`}
          rx={2}
          ry={2}
        />
        {legendLabels}
      </>
    );
  };

  const renderTooltip = () => {
    if (!showTooltip || !tooltip || !tooltip.visible) return null;

    // Get tooltip content and position
    const cell = tooltip.cell;
    
    // Adjust tooltip position for mobile
    const tooltipX = Math.min(Math.max(20, tooltip.x - 75), responsiveWidth - 100);
    const tooltipY = Math.max(20, tooltip.y - 60);
    const tooltipWidth = windowWidth < 640 ? 120 : 150;
    
    return (
      <foreignObject
        x={tooltipX}
        y={tooltipY}
        width={tooltipWidth}
        height="60"
        style={{ overflow: "visible" }}
      >
        <div
          className="bg-gray-800 text-white text-xs rounded py-2 px-3 shadow-lg pointer-events-none"
          style={{
            position: "relative",
            zIndex: 10000,
          }}
        >
          <p className="font-medium">
            {xLabels[cell.x]} × {yLabels[cell.y]}
          </p>
          <p>Value: {formatValue(cell.value)}</p>
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "calc(50% - 6px)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #1f2937", // matches bg-gray-800
            }}
          ></div>
        </div>
      </foreignObject>
    );
  };

  if (!isClient) {
    return (
      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md">
        <span className="sr-only">Loading heatmap...</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`} ref={containerRef}>
      {title && (
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
          {subtitle}
        </p>
      )}
      <div className="relative overflow-auto">
        <svg width={responsiveWidth} height={responsiveHeight}>
          {renderGridLines()}
          {renderCells()}
          {renderXLabels()}
          {renderYLabels()}
          {renderLegend()}
          {renderTooltip()}
        </svg>
      </div>
    </div>
  );
};

export default Heatmap;