"use client";

import React from 'react';

export interface RadioButtonProps {
  id?: string;
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'filled';
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
}

const RadioButton = ({
  id,
  name,
  value,
  checked,
  defaultChecked = false,
  onChange,
  label,
  labelPosition = 'right',
  disabled = false,
  size = 'md',
  variant = 'default',
  className = '',
  labelClassName = '',
  children,
}: RadioButtonProps) => {
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
        return 'border-2 border-gray-300 dark:border-gray-600';
      case 'filled':
        return 'bg-gray-100 dark:bg-gray-800';
      case 'default':
      default:
        return 'border border-gray-300 dark:border-gray-600';
    }
  };

  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  const radioClasses = `
    ${getSizeClasses()}
    ${getVariantClasses()}
    rounded-full
    text-primary-500
    focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    dark:text-primary-400 dark:focus:ring-primary-400 dark:focus:ring-offset-gray-800
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const labelClasses = `
    text-gray-700 dark:text-gray-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
    ${labelClassName}
  `;

  const radioWithLabel = (
    <div className={`flex items-center ${labelPosition === 'left' ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        className={radioClasses}
      />
      {label && (
        <label 
          htmlFor={radioId} 
          className={`${labelClasses} ${labelPosition === 'left' ? 'mr-2' : 'ml-2'}`}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );

  return radioWithLabel;
};

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'filled';
  className?: string;
}

export const RadioGroup = ({
  name,
  value,
  defaultValue,
  onChange,
  options,
  orientation = 'vertical',
  size = 'md',
  variant = 'default',
  className = '',
}: RadioGroupProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div 
      className={`flex ${orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-6'} ${className}`}
      role="radiogroup"
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          checked={value === option.value}
          defaultChecked={defaultValue === option.value}
          onChange={handleChange}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default RadioButton;
