"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  subLabel?: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  id?: string;
  name?: string;
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
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'outlined' | 'filled' | 'underlined';
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  maxItems?: number;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  successClassName?: string;
  helperTextClassName?: string;
  containerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  selectedOptionClassName?: string;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  maxHeight?: string;
  icon?: React.ReactNode;
  groupBy?: (option: SelectOption) => string;
}

const Select = ({
  id,
  name,
  value,
  defaultValue,
  placeholder = 'Select an option',
  label,
  labelPosition = 'top',
  disabled = false,
  readOnly = false,
  required = false,
  error,
  success,
  helperText,
  options = [],
  size = 'md',
  fullWidth = false,
  rounded = 'md',
  variant = 'outlined',
  clearable = false,
  searchable = false,
  multiple = false,
  maxItems,
  className = '',
  selectClassName = '',
  labelClassName = '',
  errorClassName = '',
  successClassName = '',
  helperTextClassName = '',
  containerClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  selectedOptionClassName = '',
  autoFocus = false,
  onChange,
  onFocus,
  onBlur,
  maxHeight = '250px',
  icon,
  groupBy,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    value !== undefined 
      ? (multiple ? (Array.isArray(value) ? value : [value]) : value)
      : defaultValue !== undefined
        ? (multiple ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : defaultValue)
        : (multiple ? [] : '')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update local value when prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(multiple ? (Array.isArray(value) ? value : [value]) : value);
    }
  }, [value, multiple]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Scroll to selected option when dropdown opens
  useEffect(() => {
    if (isOpen && dropdownRef.current && !multiple) {
      const selectedOption = dropdownRef.current.querySelector('[aria-selected="true"]');
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, multiple]);

  // Handle option select
  const handleOptionSelect = (optionValue: string) => {
    if (disabled || readOnly) return;

    let newValue: string | string[];

    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      
      if (currentValues.includes(optionValue)) {
        // Remove if already selected
        newValue = currentValues.filter(v => v !== optionValue);
      } else {
        // Add if not selected
        if (maxItems && currentValues.length >= maxItems) {
          // If max items reached, replace the last one
          newValue = [...currentValues.slice(0, maxItems - 1), optionValue];
        } else {
          newValue = [...currentValues, optionValue];
        }
      }
    } else {
      newValue = optionValue;
      setIsOpen(false);
    }

    setSelectedValue(newValue);
    
    if (onChange) {
      onChange(multiple ? newValue.join(',') : newValue.toString());
    }
    
    setSearchTerm('');
    
    if (!multiple && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (disabled || readOnly) return;
    
    const newValue = multiple ? [] : '';
    setSelectedValue(newValue);
    
    if (onChange) {
      onChange(multiple ? '' : '');
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (disabled || readOnly) return;
    
    setIsOpen(!isOpen);
    
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle key down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
    } else if (e.key === 'Enter') {
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  // Filter options based on search term
  const filteredOptions = searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.subLabel && option.subLabel.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : options;

  // Group options if groupBy function is provided
  const groupedOptions = groupBy
    ? filteredOptions.reduce((acc, option) => {
        const groupKey = groupBy(option);
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(option);
        return acc;
      }, {} as Record<string, SelectOption[]>)
    : null;

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

  // Get select size classes
  const getSelectSizeClasses = () => {
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
        return 'bg-gray-100 dark:bg-gray-700 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600 focus-within:bg-white dark:focus-within:bg-gray-800';
      case 'underlined':
        return 'border-t-0 border-l-0 border-r-0 border-b-2 rounded-none px-0 hover:border-primary-400 focus-within:border-primary-500';
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
      return 'border-red-500 dark:border-red-400 focus-within:border-red-500 dark:focus-within:border-red-400 focus-within:ring-red-500 dark:focus-within:ring-red-400';
    }
    
    if (success) {
      return 'border-green-500 dark:border-green-400 focus-within:border-green-500 dark:focus-within:border-green-400 focus-within:ring-green-500 dark:focus-within:ring-green-400';
    }
    
    return 'focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-primary-500 dark:focus-within:ring-primary-400';
  };

  // Get select classes
  const getSelectClasses = () => {
    return `
      relative flex items-center justify-between cursor-pointer border w-full transition-all duration-200 
      focus-within:outline-none focus-within:ring-1
      text-gray-700 dark:text-gray-300
      disabled:opacity-70 disabled:cursor-not-allowed
      ${getSelectSizeClasses()}
      ${getRoundedClasses()}
      ${getVariantClasses()}
      ${getStateClasses()}
      ${readOnly ? 'bg-gray-50 dark:bg-gray-900 cursor-default' : ''}
      ${selectClassName}
    `;
  };

  // Get dropdown position
  const getDropdownPosition = () => {
    if (!selectRef.current) return { top: '100%', left: '0' };
    
    const rect = selectRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = Math.min(parseInt(maxHeight), filteredOptions.length * 40); // 40px per option as an estimate
    
    if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
      // Show above if there's not enough space below but enough space above
      return { bottom: '100%', left: '0' };
    }
    
    return { top: '100%', left: '0' };
  };

  // Get floating label styles
  const getFloatingLabelClasses = () => {
    if (labelPosition !== 'floating') return '';
    
    const baseClasses = 'absolute text-gray-500 duration-200 transform scale-75 top-1.5 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus-within:px-2 left-3 peer-focus-within:top-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-focus-within:scale-75';
    
    const colorClasses = error 
      ? 'text-red-500 dark:text-red-400 peer-focus-within:text-red-500 dark:peer-focus-within:text-red-400' 
      : success 
        ? 'text-green-500 dark:text-green-400 peer-focus-within:text-green-500 dark:peer-focus-within:text-green-400'
        : 'peer-focus-within:text-primary-500 dark:peer-focus-within:text-primary-400';
    
    return `${baseClasses} ${colorClasses} ${labelClassName}`;
  };

  // Get selected option label
  const getSelectedOptionLabel = () => {
    if (multiple) {
      const selectedOptions = Array.isArray(selectedValue) 
        ? selectedValue.map(val => options.find(opt => opt.value === val))
        : [];
      
      if (selectedOptions.length === 0) return placeholder;
      
      // If searchable and open, show search input
      if (searchable && isOpen) return null;
      
      // Return a count if there are many selections
      if (selectedOptions.length > 2) {
        return `${selectedOptions.length} items selected`;
      }
      
      // Return a comma-separated list of labels
      return selectedOptions
        .filter(Boolean)
        .map(opt => opt?.label)
        .join(', ');
    } else {
      // Single select
      const selectedOption = options.find(opt => opt.value === selectedValue);
      
      if (!selectedOption) return placeholder;
      
      // If searchable and open, show search input
      if (searchable && isOpen) return null;
      
      return selectedOption.label;
    }
  };

  return (
    <div className={getContainerClasses()}>
      {/* Label for top or left position */}
      {label && labelPosition !== 'floating' && (
        <label 
          htmlFor={selectId}
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

      <div 
        ref={selectRef}
        className={`
          relative
          ${fullWidth ? 'w-full' : ''}
        `}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div 
          className={`
            ${getSelectClasses()}
            ${labelPosition === 'floating' ? 'peer' : ''}
          `}
          onClick={toggleDropdown}
          role="combobox"
          aria-controls={`${selectId}-listbox`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${selectId}-label` : undefined}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          aria-required={required}
        >
          {/* Custom Icon */}
          {icon && (
            <div className="flex-shrink-0 mr-2 text-gray-500 dark:text-gray-400">
              {icon}
            </div>
          )}

          {/* Selected Value/Placeholder/Search Input */}
          <div className="flex-grow overflow-hidden">
            {searchable && isOpen ? (
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={placeholder}
                onClick={(e) => e.stopPropagation()}
                autoComplete="off"
                name={name}
                id={selectId}
              />
            ) : (
              <div className={`truncate ${!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0) ? 'text-gray-400 dark:text-gray-500' : ''}`}>
                {getSelectedOptionLabel()}
              </div>
            )}
          </div>

          {/* Clear Button */}
          {clearable && (selectedValue && (!Array.isArray(selectedValue) || selectedValue.length > 0)) && !disabled && !readOnly && (
            <button
              type="button"
              className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              onClick={handleClear}
              aria-label="Clear selection"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Dropdown indicator */}
          <div className="flex-shrink-0 ml-2 text-gray-400 dark:text-gray-500">
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Floating Label */}
          {label && labelPosition === 'floating' && (
            <label 
              id={`${selectId}-label`}
              htmlFor={selectId}
              className={getFloatingLabelClasses()}
            >
              {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div 
            ref={dropdownRef}
            className={`
              absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-y-auto
              ${dropdownClassName}
            `}
            style={{ 
              maxHeight, 
              ...getDropdownPosition(),
            }}
            id={`${selectId}-listbox`}
            role="listbox"
            aria-multiselectable={multiple}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options available
              </div>
            ) : groupedOptions ? (
              // Grouped options
              Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <div key={group}>
                  <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
                    {group}
                  </div>
                  {groupOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`
                        px-3 py-2 cursor-pointer flex items-center justify-between
                        ${option.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                        ${Array.isArray(selectedValue) 
                          ? selectedValue.includes(option.value) ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 ' + selectedOptionClassName : ''
                          : selectedValue === option.value ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 ' + selectedOptionClassName : ''
                        }
                        ${optionClassName}
                      `}
                      role="option"
                      aria-selected={
                        Array.isArray(selectedValue) 
                          ? selectedValue.includes(option.value) 
                          : selectedValue === option.value
                      }
                      aria-disabled={option.disabled}
                      onClick={() => !option.disabled && handleOptionSelect(option.value)}
                    >
                      <div className="flex items-center">
                        {/* Multiple select checkbox */}
                        {multiple && (
                          <div className="mr-2">
                            <div className={`
                              w-4 h-4 border rounded flex items-center justify-center
                              ${Array.isArray(selectedValue) && selectedValue.includes(option.value)
                                ? 'bg-primary-500 border-primary-500'
                                : 'border-gray-300 dark:border-gray-600'
                              }
                            `}>
                              {Array.isArray(selectedValue) && selectedValue.includes(option.value) && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Option icon */}
                        {option.icon && (
                          <div className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {option.icon}
                          </div>
                        )}
                        
                        {/* Option text */}
                        <div>
                          <div className="text-gray-800 dark:text-gray-200">
                            {option.label}
                          </div>
                          {option.subLabel && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {option.subLabel}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Selected indicator for single select */}
                      {!multiple && selectedValue === option.value && (
                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              // Flat options list
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`
                    px-3 py-2 cursor-pointer flex items-center justify-between
                    ${option.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    ${Array.isArray(selectedValue) 
                      ? selectedValue.includes(option.value) ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 ' + selectedOptionClassName : ''
                      : selectedValue === option.value ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 ' + selectedOptionClassName : ''
                    }
                    ${optionClassName}
                  `}
                  role="option"
                  aria-selected={
                    Array.isArray(selectedValue) 
                      ? selectedValue.includes(option.value) 
                      : selectedValue === option.value
                  }
                  aria-disabled={option.disabled}
                  onClick={() => !option.disabled && handleOptionSelect(option.value)}
                >
                  <div className="flex items-center">
                    {/* Multiple select checkbox */}
                    {multiple && (
                      <div className="mr-2">
                        <div className={`
                          w-4 h-4 border rounded flex items-center justify-center
                          ${Array.isArray(selectedValue) && selectedValue.includes(option.value)
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-gray-300 dark:border-gray-600'
                          }
                        `}>
                          {Array.isArray(selectedValue) && selectedValue.includes(option.value) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Option icon */}
                    {option.icon && (
                      <div className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {option.icon}
                      </div>
                    )}
                    
                    {/* Option text */}
                    <div>
                      <div className="text-gray-800 dark:text-gray-200">
                        {option.label}
                      </div>
                      {option.subLabel && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {option.subLabel}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Selected indicator for single select */}
                  {!multiple && selectedValue === option.value && (
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p 
          className={`mt-1 text-sm text-red-600 dark:text-red-400 ${errorClassName}`}
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Success Message */}
      {!error && success && (
        <p 
          className={`mt-1 text-sm text-green-600 dark:text-green-400 ${successClassName}`}
        >
          {success}
        </p>
      )}

      {/* Helper Text */}
      {!error && !success && helperText && (
        <p 
          className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
