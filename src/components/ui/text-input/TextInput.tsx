"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface TextInputProps {
  id?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  labelPosition?: 'top' | 'left' | 'floating';
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'outlined' | 'filled' | 'underlined';
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  successClassName?: string;
  helperTextClassName?: string;
  containerClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  maxLength?: number;
  autoComplete?: string;
  spellCheck?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const TextInput = ({
  id,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  label,
  labelPosition = 'top',
  disabled = false,
  readOnly = false,
  required = false,
  error,
  success,
  helperText,
  prefix,
  suffix,
  size = 'md',
  fullWidth = false,
  rounded = 'md',
  variant = 'outlined',
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  successClassName = '',
  helperTextClassName = '',
  containerClassName = '',
  prefixClassName = '',
  suffixClassName = '',
  autoFocus = false,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  min,
  max,
  step,
  pattern,
  maxLength,
  autoComplete,
  spellCheck,
  icon,
  iconPosition = 'left',
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id || `text-input-${Math.random().toString(36).substr(2, 9)}`;

  // Update local value when prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      // If value is not controlled
      setInputValue(newValue);
    }
    if (onChange) onChange(e);
  };

  // Get container classes
  const getContainerClasses = () => {
    let classes = 'relative';
    
    if (fullWidth) {
      classes += ' w-full';
    }
    
    if (labelPosition === 'left') {
      classes += ' flex items-center';
    }
    
    return `${classes} ${containerClassName}`;
  };

  // Get input size classes
  const getInputSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1 px-2 text-sm';
      case 'lg':
        return 'py-3 px-4 text-lg';
      case 'md':
      default:
        return 'py-2 px-3';
    }
  };

  // Get rounded classes
  const getRoundedClasses = () => {
    switch (rounded) {
      case 'none':
        return 'rounded-none';
      case 'sm':
        return 'rounded-sm';
      case 'lg':
        return 'rounded-lg';
      case 'full':
        return 'rounded-full';
      case 'md':
      default:
        return 'rounded-md';
    }
  };

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'filled':
        return 'bg-gray-100 dark:bg-gray-700 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600 focus:bg-white dark:focus:bg-gray-800';
      case 'underlined':
        return 'border-t-0 border-l-0 border-r-0 border-b-2 rounded-none px-0 hover:border-primary-400 focus:border-primary-500';
      case 'outlined':
      default:
        return 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500';
    }
  };

  // Get state classes
  const getStateClasses = () => {
    if (disabled) {
      return 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-700';
    }
    
    if (error) {
      return 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400';
    }
    
    if (success) {
      return 'border-green-500 dark:border-green-400 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400';
    }
    
    return 'focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400';
  };

  // Get input classes
  const getInputClasses = () => {
    return `
      block border w-full transition-all duration-200 
      focus:outline-none focus:ring-1
      text-gray-700 dark:text-gray-300
      disabled:opacity-70 disabled:cursor-not-allowed
      ${getInputSizeClasses()}
      ${getRoundedClasses()}
      ${getVariantClasses()}
      ${getStateClasses()}
      ${icon && iconPosition === 'left' ? 'pl-10' : ''}
      ${icon && iconPosition === 'right' ? 'pr-10' : ''}
      ${prefix ? 'rounded-l-none' : ''}
      ${suffix ? 'rounded-r-none' : ''}
      ${readOnly ? 'bg-gray-50 dark:bg-gray-900' : ''}
      ${inputClassName}
    `;
  };

  // Get floating label styles
  const getFloatingLabelClasses = () => {
    if (labelPosition !== 'floating') return '';
    
    const baseClasses = 'absolute text-gray-500 duration-200 transform scale-75 top-1.5 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2';
    
    // Adjust position based on size
    let sizeClasses = '';
    switch (size) {
      case 'sm':
        sizeClasses = 'text-sm left-2 peer-focus:top-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1 peer-focus:scale-75';
        break;
      case 'lg':
        sizeClasses = 'text-lg left-3 peer-focus:top-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3 peer-focus:scale-75';
        break;
      case 'md':
      default:
        sizeClasses = 'left-3 peer-focus:top-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-focus:scale-75';
        break;
    }
    
    const colorClasses = error 
      ? 'text-red-500 dark:text-red-400 peer-focus:text-red-500 dark:peer-focus:text-red-400' 
      : success 
        ? 'text-green-500 dark:text-green-400 peer-focus:text-green-500 dark:peer-focus:text-green-400'
        : 'peer-focus:text-primary-500 dark:peer-focus:text-primary-400';
    
    return `${baseClasses} ${sizeClasses} ${colorClasses} ${labelClassName}`;
  };

  return (
    <div className={getContainerClasses()}>
      {/* Label for top or left position */}
      {label && labelPosition !== 'floating' && (
        <label 
          htmlFor={inputId}
          className={`
            block text-sm font-medium text-gray-700 dark:text-gray-300
            ${labelPosition === 'left' ? 'mr-3' : 'mb-1'}
            ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
            ${labelClassName}
          `}
        >
          {label}
        </label>
      )}

      <div className={`relative flex ${fullWidth ? 'w-full' : ''}`}>
        {/* Prefix */}
        {prefix && (
          <div className={`
            inline-flex items-center px-3 rounded-l-md border border-r-0 
            border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
            text-gray-500 dark:text-gray-400
            ${prefixClassName}
          `}>
            {prefix}
          </div>
        )}

        {/* Icon - Left Position */}
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">{icon}</span>
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type={type}
          value={value !== undefined ? value : inputValue}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={`
            ${getInputClasses()}
            ${labelPosition === 'floating' ? 'peer' : ''}
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          maxLength={maxLength}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${inputId}-error` 
              : success 
                ? `${inputId}-success` 
                : helperText 
                  ? `${inputId}-helper` 
                  : undefined
          }
        />

        {/* Floating Label */}
        {label && labelPosition === 'floating' && (
          <label 
            htmlFor={inputId}
            className={getFloatingLabelClasses()}
          >
            {label}{required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        {/* Icon - Right Position */}
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">{icon}</span>
          </div>
        )}

        {/* Suffix */}
        {suffix && (
          <div className={`
            inline-flex items-center px-3 rounded-r-md border border-l-0 
            border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
            text-gray-500 dark:text-gray-400
            ${suffixClassName}
          `}>
            {suffix}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p 
          id={`${inputId}-error`} 
          className={`mt-1 text-sm text-red-600 dark:text-red-400 ${errorClassName}`}
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Success Message */}
      {!error && success && (
        <p 
          id={`${inputId}-success`} 
          className={`mt-1 text-sm text-green-600 dark:text-green-400 ${successClassName}`}
        >
          {success}
        </p>
      )}

      {/* Helper Text */}
      {!error && !success && helperText && (
        <p 
          id={`${inputId}-helper`} 
          className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextInput;
