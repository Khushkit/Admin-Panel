"use client";

import React, { useState } from "react";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
  name?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  onChange,
  disabled = false,
  label,
  labelPosition = "right",
  size = "md",
  className = "",
  name,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const sizeClasses = {
    sm: "w-8 h-4",
    md: "w-10 h-5",
    lg: "w-12 h-6",
  };

  const thumbSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const handleChange = () => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    
    onChange?.(!isChecked);
  };

  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </span>
    );
  };

  return (
    <label className={`inline-flex items-center gap-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      {labelPosition === "left" && renderLabel()}
      
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
        />
        <div
          className={`
            ${sizeClasses[size]} 
            rounded-full 
            ${isChecked ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'} 
            transition-colors duration-200 ease-in-out
            ${disabled ? 'opacity-50' : ''}
          `}
        />
        <div
          className={`
            absolute left-0.5 top-0.5
            ${thumbSizeClasses[size]}
            ${isChecked ? `translate-x-full ${size === 'sm' ? 'translate-x-[18px]' : size === 'md' ? 'translate-x-[22px]' : 'translate-x-[27px]'}` : 'translate-x-0'} 
            rounded-full bg-white 
            transform transition-transform duration-200 ease-in-out
            shadow-sm
          `}
        />
      </div>
      
      {labelPosition === "right" && renderLabel()}
    </label>
  );
};

export default Switch;
