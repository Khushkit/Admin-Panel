"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface SearchProps {
  id?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  clearable?: boolean;
  autoFocus?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'minimal';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
  icon?: React.ReactNode;
  submitOnInput?: boolean;
  debounceTime?: number;
  renderSuggestions?: (value: string) => React.ReactNode;
  minCharacters?: number;
}

const Search = ({
  id,
  placeholder = 'Search...',
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  onClear,
  clearable = true,
  autoFocus = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  size = 'md',
  variant = 'outlined',
  rounded = 'full',
  className = '',
  inputClassName = '',
  iconClassName = '',
  buttonClassName = '',
  icon,
  submitOnInput = false,
  debounceTime = 300,
  renderSuggestions,
  minCharacters = 1,
}: SearchProps) => {
  const [inputValue, setInputValue] = useState(value !== undefined ? value : defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const searchId = id || `search-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
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
      setInputValue(value);
    }
  }, [value]);
  
  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Clean up debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // If value is not controlled externally
    if (value === undefined) {
      setInputValue(newValue);
    }
    
    // Set suggestions visibility based on input length
    setShowSuggestions(!!renderSuggestions && newValue.length >= minCharacters);
    
    // Handle onChange with debounce
    if (onChange) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      debounceTimerRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceTime);
    }
    
    // Submit on input change if enabled
    if (submitOnInput && onSubmit && newValue.length >= minCharacters) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      debounceTimerRef.current = setTimeout(() => {
        onSubmit(newValue);
      }, debounceTime);
    }
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (onSubmit && inputValue && inputValue.length >= minCharacters) {
      onSubmit(inputValue);
    }
  };
  
  const handleClear = () => {
    if (value === undefined) {
      setInputValue('');
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    if (onChange) {
      onChange('');
    }
    
    if (onClear) {
      onClear();
    }
    
    setShowSuggestions(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };
  
  // Get size classes for the input
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 text-sm';
      case 'lg':
        return 'h-12 text-lg';
      case 'md':
      default:
        return 'h-10';
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
        return 'bg-gray-100 dark:bg-gray-700 border-transparent';
      case 'minimal':
        return 'bg-transparent border-transparent focus-within:bg-white dark:focus-within:bg-gray-800';
      case 'outlined':
      default:
        return 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600';
    }
  };
  
  // Default search icon
  const defaultIcon = (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );
  
  // Loading spinner
  const loadingSpinner = (
    <svg 
      className="animate-spin w-5 h-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <div 
      ref={searchRef}
      className={`relative ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <form 
        onSubmit={handleSubmit} 
        className={`
          relative flex items-center overflow-hidden border transition-colors
          focus-within:ring-1 focus-within:ring-primary-500 dark:focus-within:ring-primary-400
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          ${getVariantClasses()}
          ${getRoundedClasses()}
          ${fullWidth ? 'w-full' : ''}
        `}
      >
        {/* Search Icon */}
        <div className={`
          absolute left-3 flex items-center justify-center text-gray-500 dark:text-gray-400
          ${iconClassName}
        `}>
          {loading ? loadingSpinner : (icon || defaultIcon)}
        </div>
        
        {/* Input */}
        <input
          ref={inputRef}
          id={searchId}
          type="text"
          className={`
            w-full bg-transparent outline-none px-10
            text-gray-700 dark:text-gray-300
            placeholder-gray-400 dark:placeholder-gray-500
            disabled:cursor-not-allowed
            ${getSizeClasses()}
            ${inputClassName}
          `}
          placeholder={placeholder}
          value={value !== undefined ? value : inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          role="searchbox"
          aria-label={placeholder}
        />
        
        {/* Clear button */}
        {clearable && (value !== undefined ? value : inputValue) && (
          <button
            type="button"
            className={`
              absolute right-3 flex items-center justify-center p-1
              text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
              focus:outline-none
              ${buttonClassName}
            `}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </form>
      
      {/* Suggestions */}
      {renderSuggestions && showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          {renderSuggestions(value !== undefined ? value : inputValue)}
        </div>
      )}
    </div>
  );
};

export default Search;
