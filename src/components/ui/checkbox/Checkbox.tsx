"use client";

import React, { useState, useEffect } from 'react';

export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'filled';
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
}

const Checkbox = ({
  id,
  checked,
  defaultChecked = false,
  onChange,
  label,
  labelPosition = 'right',
  disabled = false,
  indeterminate = false,
  size = 'md',
  variant = 'default',
  className = '',
  labelClassName = '',
  children,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    checked !== undefined ? checked : defaultChecked
  );

  const checkboxRef = React.useRef<HTMLInputElement>(null);

  // Update internal state when checked prop changes
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  // Set indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = e.target.checked;
    
    if (checked === undefined) {
      setIsChecked(newCheckedState);
    }
    
    onChange?.(newCheckedState);
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-6 w-6';
      case 'md':
      default:
        return 'h-5 w-5';
    }
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-gray-300 dark:border-gray-400';
      case 'filled':
        return 'bg-gray-100 dark:bg-gray-700';
      case 'default':
      default:
        return 'border border-gray-300 dark:border-gray-400';
    }
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const checkboxClasses = `
    ${getSizeClasses()}
    ${getVariantClasses()}
    rounded
    text-primary-500
    focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    dark:text-primary-400 dark:focus:ring-primary-400 dark:focus:ring-offset-0 dark:ring-offset-gray-800
    ${disabled ? 'opacity-60 cursor-not-allowed dark:opacity-50' : 'cursor-pointer'}
    ${className}
  `;

  const labelClasses = `
    text-gray-700 dark:text-gray-100
    ${disabled ? 'opacity-60 cursor-not-allowed dark:opacity-50' : 'cursor-pointer'}
    ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
    ${labelClassName}
  `;

  const checkboxWithLabel = (
    <div className={`flex items-center ${labelPosition === 'left' ? 'flex-row-reverse justify-end' : 'justify-start'} dark:bg-transparent`}>
      <input
        ref={checkboxRef}
        type="checkbox"
        id={checkboxId}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={checkboxClasses}
      />
      {label && (
        <label 
          htmlFor={checkboxId} 
          className={`${labelClasses} ${labelPosition === 'left' ? 'mr-2' : 'ml-2'}`}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );

  return checkboxWithLabel;
};

export default Checkbox;
