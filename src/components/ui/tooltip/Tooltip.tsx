"use client";

import React, { useState, useRef, useEffect } from "react";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  arrow?: boolean;
  delay?: number;
  className?: string;
  contentClassName?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  arrow = true,
  delay = 300,
  className = "",
  contentClassName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate tooltip position
  const calculatePosition = () => {
    if (!tooltipRef.current || !targetRef.current) return { top: 0, left: 0 };

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const positions = {
      top: {
        top: targetRect.top - tooltipRect.height - 10,
        left: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
      },
      right: {
        top: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
        left: targetRect.right + 10,
      },
      bottom: {
        top: targetRect.bottom + 10,
        left: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
      },
      left: {
        top: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
        left: targetRect.left - tooltipRect.width - 10,
      },
    };

    // Check if tooltip is out of viewport and adjust if needed
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const pos = positions[position];

    // Ensure tooltip is not cut off at the top
    if (pos.top < 0) {
      pos.top = 0;
    }

    // Ensure tooltip is not cut off at the bottom
    if (pos.top + tooltipRect.height > viewport.height) {
      pos.top = viewport.height - tooltipRect.height - 10;
    }

    // Ensure tooltip is not cut off at the left
    if (pos.left < 0) {
      pos.left = 10;
    }

    // Ensure tooltip is not cut off at the right
    if (pos.left + tooltipRect.width > viewport.width) {
      pos.left = viewport.width - tooltipRect.width - 10;
    }

    return pos;
  };

  // Get arrow position
  const getArrowClass = () => {
    const positions = {
      top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-t-[6px] border-l-[6px] border-r-[6px] border-transparent border-t-current",
      right: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-r-[6px] border-t-[6px] border-b-[6px] border-transparent border-r-current",
      bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-b-[6px] border-l-[6px] border-r-[6px] border-transparent border-b-current",
      left: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-l-[6px] border-t-[6px] border-b-[6px] border-transparent border-l-current",
    };

    return positions[position];
  };

  // Show tooltip with delay
  const showTooltip = () => {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  // Hide tooltip
  const hideTooltip = () => {
    clearTimeout(timeoutRef.current!);
    setIsVisible(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update tooltip position when it becomes visible
  useEffect(() => {
    if (isVisible && tooltipRef.current && targetRef.current) {
      const pos = calculatePosition();
      if (pos.top !== undefined && pos.left !== undefined) {
        tooltipRef.current.style.top = `${pos.top}px`;
        tooltipRef.current.style.left = `${pos.left}px`;
      }
    }
  }, [isVisible]);

  return (
    <>
      <div
        className={`inline-block ${className}`}
        ref={targetRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-50 max-w-xs text-sm pointer-events-none ${contentClassName}`}
          role="tooltip"
        >
          <div className="relative rounded-md bg-gray-900 px-2 py-1 text-white shadow-md dark:bg-gray-700">
            {content}
            {arrow && (
              <div
                className={`absolute h-0 w-0 text-gray-900 dark:text-gray-700 ${getArrowClass()}`}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Tooltip;