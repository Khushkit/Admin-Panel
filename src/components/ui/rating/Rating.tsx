"use client";

import React, { useState } from "react";

export interface RatingProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  precision?: 0.5 | 1;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactNode;
  filledIcon?: React.ReactNode;
  halfFilledIcon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  activeColor?: string;
  inactiveColor?: string;
  hoverColor?: string;
  showValue?: boolean;
  label?: string;
}

const Rating: React.FC<RatingProps> = ({
  value: initialValue = 0,
  max = 5,
  size = "md",
  readOnly = false,
  precision = 1,
  onChange,
  emptyIcon,
  filledIcon,
  halfFilledIcon,
  className = "",
  iconClassName = "",
  activeColor = "text-amber-400",
  inactiveColor = "text-gray-300 dark:text-gray-600",
  hoverColor = "text-amber-300",
  showValue = false,
  label,
}) => {
  const [value, setValue] = useState(initialValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  // Generate an array of values to map over (e.g. [1, 2, 3, 4, 5])
  const items = Array.from({ length: max }, (_, index) => index + 1);

  // Get display value based on current hover state or actual value
  const displayValue = hoverValue !== null ? hoverValue : value;

  // Handle mouse hover
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, item: number) => {
    if (readOnly) return;

    // If precision is 0.5, calculate if we should show a half star
    if (precision === 0.5) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const percent = (event.clientX - left) / width;
      
      setHoverValue(percent <= 0.5 ? item - 0.5 : item);
    } else {
      setHoverValue(item);
    }
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(null);
  };

  const handleClick = (newValue: number) => {
    if (readOnly) return;
    setValue(newValue);
    onChange?.(newValue);
  };

  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4";
      case "lg":
        return "h-8 w-8";
      case "md":
      default:
        return "h-6 w-6";
    }
  };

  // Get icon based on value
  const getIcon = (itemValue: number) => {
    if (emptyIcon && filledIcon && halfFilledIcon) {
      if (displayValue >= itemValue) {
        return filledIcon;
      } else if (displayValue + 0.5 >= itemValue && precision === 0.5) {
        return halfFilledIcon;
      } else {
        return emptyIcon;
      }
    }

    return (
      <svg 
        fill="currentColor" 
        viewBox="0 0 24 24" 
        className={`${getSizeClasses()} ${iconClassName}`}
      >
        {displayValue >= itemValue ? (
          // Filled star
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        ) : displayValue + 0.5 >= itemValue && precision === 0.5 ? (
          // Half-filled star
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        ) : (
          // Empty star
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        )}
      </svg>
    );
  };

  // Get the color class based on interaction state
  const getIconColorClass = (itemValue: number) => {
    if (displayValue >= itemValue) {
      return activeColor;
    } else if (displayValue + 0.5 >= itemValue && precision === 0.5) {
      return activeColor;
    } else if (hoverValue !== null && !readOnly) {
      return inactiveColor;
    } else {
      return inactiveColor;
    }
  };

  return (
    <div className={className}>
      {label && (
        <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </div>
      )}
      
      <div className="flex items-center">
        <div className="flex items-center">
          {items.map((item) => (
            <div
              key={item}
              onMouseMove={(event) => handleMouseMove(event, item)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(
                precision === 0.5 && hoverValue === item - 0.5 ? item - 0.5 : item
              )}
              className={`${readOnly ? "cursor-default" : "cursor-pointer"} ${
                hoverValue !== null && hoverValue >= item && !readOnly ? hoverColor : getIconColorClass(item)
              }`}
              role={readOnly ? undefined : "button"}
              aria-label={readOnly ? `Rating: ${value} out of ${max}` : `Rate ${item} out of ${max}`}
            >
              {getIcon(item)}
            </div>
          ))}
        </div>
        
        {showValue && (
          <div className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {value}
            {max && <span className="text-gray-400 dark:text-gray-500">/{max}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
