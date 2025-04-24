"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface TextareaProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  labelPosition?: 'top' | 'floating';
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  rows?: number;
  cols?: number;
  autoGrow?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  resizable?: boolean;
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'underlined';
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  successClassName?: string;
  helperTextClassName?: string;
  containerClassName?: string;
  charCountClassName?: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  spellCheck?: boolean;
  minHeight?: string;
  maxHeight?: string;
}

const Textarea = ({
  id,
  name,
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
  rows = 3,
  cols,
  autoGrow = false,
  maxLength,
  showCharCount = false,
  resizable = true,
  fullWidth = false,
  rounded = 'md',
  variant = 'outlined',
  className = '',
  textareaClassName = '',
  labelClassName = '',
  errorClassName = '',
  successClassName = '',
  helperTextClassName = '',
  containerClassName = '',
  charCountClassName = '',
  autoFocus = false,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  spellCheck,
  minHeight,
  maxHeight,
}: TextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [charCount, setCharCount] = useState(
    (value || defaultValue || '').length
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  // Update local value when prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
      setCharCount(value.length);
    }
  }, [value]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Adjust height for auto-grow
  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      adjustHeight();
    }
  }, [inputValue, autoGrow]);

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // If maxLength is defined, ensure value doesn't exceed it
    if (maxLength !== undefined && newValue.length > maxLength) {
      return;
    }
    
    if (value === undefined) {
      // If value is not controlled
      setInputValue(newValue);
    }
    
    setCharCount(newValue.length);
    
    if (onChange) onChange(e);
    
    if (autoGrow) {
      adjustHeight();
    }
  };

  // Adjust textarea height for auto-grow
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to shrink if content is removed
    textarea.style.height = 'auto';
    
    // Set height based on scrollHeight
    let newHeight = textarea.scrollHeight;
    
    // Apply min/max constraints
    if (minHeight && parseInt(minHeight) > newHeight) {
      newHeight = parseInt(minHeight);
    }
    
    if (maxHeight && parseInt(maxHeight) < newHeight) {
      newHeight = parseInt(maxHeight);
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
    
    textarea.style.height = newHeight + 'px';
  };

  // Get container classes
  const getContainerClasses = () => {
    let classes = 'relative';
    
    if (fullWidth) {
      classes += ' w-full';
    }
    
    return `${classes} ${containerClassName}`;
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

  // Get textarea classes
  const getTextareaClasses = () => {
    return `
      block border w-full py-2 px-3 transition-all duration-200 
      focus:outline-none focus:ring-1
      text-gray-700 dark:text-gray-300
      disabled:opacity-70 disabled:cursor-not-allowed
      ${getRoundedClasses()}
      ${getVariantClasses()}
      ${getStateClasses()}
      ${!resizable ? 'resize-none' : ''}
      ${readOnly ? 'bg-gray-50 dark:bg-gray-900' : ''}
      ${textareaClassName}
    `;
  };

  // Get floating label styles
  const getFloatingLabelClasses = () => {
    if (labelPosition !== 'floating') return '';
    
    const baseClasses = 'absolute text-gray-500 duration-200 transform scale-75 top-1.5 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 left-3 peer-focus:top-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-focus:scale-75';
    
    const colorClasses = error 
      ? 'text-red-500 dark:text-red-400 peer-focus:text-red-500 dark:peer-focus:text-red-400' 
      : success 
        ? 'text-green-500 dark:text-green-400 peer-focus:text-green-500 dark:peer-focus:text-green-400'
        : 'peer-focus:text-primary-500 dark:peer-focus:text-primary-400';
    
    return `${baseClasses} ${colorClasses} ${labelClassName}`;
  };

  return (
    <div className={getContainerClasses()}>
      {/* Label for top position */}
      {label && labelPosition !== 'floating' && (
        <label 
          htmlFor={textareaId}
          className={`
            block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1
            ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
            ${labelClassName}
          `}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id={textareaId}
          name={name}
          value={value !== undefined ? value : inputValue}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          spellCheck={spellCheck}
          className={`
            ${getTextareaClasses()}
            ${labelPosition === 'floating' ? 'peer' : ''}
          `}
          style={{
            minHeight: minHeight,
            maxHeight: maxHeight,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${textareaId}-error` 
              : success 
                ? `${textareaId}-success` 
                : helperText 
                  ? `${textareaId}-helper` 
                  : maxLength && showCharCount
                    ? `${textareaId}-char-count`
                    : undefined
          }
        />

        {/* Floating Label */}
        {label && labelPosition === 'floating' && (
          <label 
            htmlFor={textareaId}
            className={getFloatingLabelClasses()}
          >
            {label}{required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
      </div>

      {/* Helper text area - error, success, helper, char count */}
      <div className="flex justify-between items-start mt-1">
        <div className="flex-1">
          {/* Error Message */}
          {error && (
            <p 
              id={`${textareaId}-error`} 
              className={`text-sm text-red-600 dark:text-red-400 ${errorClassName}`}
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {!error && success && (
            <p 
              id={`${textareaId}-success`} 
              className={`text-sm text-green-600 dark:text-green-400 ${successClassName}`}
            >
              {success}
            </p>
          )}

          {/* Helper Text */}
          {!error && !success && helperText && (
            <p 
              id={`${textareaId}-helper`} 
              className={`text-sm text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
            >
              {helperText}
            </p>
          )}
        </div>

        {/* Character Count */}
        {showCharCount && maxLength !== undefined && (
          <p 
            id={`${textareaId}-char-count`}
            className={`text-xs text-gray-500 dark:text-gray-400 ml-2 ${charCountClassName}`}
          >
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
