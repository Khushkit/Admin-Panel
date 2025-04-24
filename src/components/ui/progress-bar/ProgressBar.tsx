"use client";

import React from "react";

export interface ProgressBarProps {
  value: number;
  max?: number;
  height?: number | string;
  label?: string;
  showValue?: boolean;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = 8,
  label,
  showValue = false,
  variant = "primary",
  animated = false,
  striped = false,
  className = "",
}) => {
  // Ensure value is between 0 and max
  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = (normalizedValue / max) * 100;

  // Variant-based styling
  const variantClasses = {
    primary: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
  };

  const baseClass = variantClasses[variant];
  
  // Get the height in proper format
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  // Stripe pattern (CSS)
  const stripePattern = striped
    ? "bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]"
    : "";

  // Animation class
  const animationClass = animated ? "animate-progress-bar" : "";

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {normalizedValue}/{max}
            </span>
          )}
        </div>
      )}

      <div
        className="w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        style={{ height: heightStyle }}
      >
        <div
          className={`rounded-full ${baseClass} ${stripePattern} ${animationClass}`}
          style={{ width: `${percentage}%`, height: "100%" }}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
