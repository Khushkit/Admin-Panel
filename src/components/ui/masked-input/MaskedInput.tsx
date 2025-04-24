"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface MaskedInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  mask: string;
  placeholder?: string;
  className?: string;
  maskChar?: string;
  formatChars?: Record<string, string>;
  type?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  alwaysShowMask?: boolean;
}

const DEFAULT_FORMAT_CHARS = {
  '9': '[0-9]',      // Digit
  'a': '[A-Za-z]',   // Letter
  '*': '[A-Za-z0-9]' // Alphanumeric
};

export const MaskedInput: React.FC<MaskedInputProps> = ({
  value = '',
  onChange,
  onBlur,
  mask,
  placeholder = '',
  className = '',
  maskChar = '_',
  formatChars = DEFAULT_FORMAT_CHARS,
  type = 'text',
  id,
  name,
  required = false,
  disabled = false,
  readOnly = false,
  error,
  label,
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  alwaysShowMask = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [formattedValue, setFormattedValue] = useState('');
  const [caretPosition, setCaretPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Format the value according to the mask
  const formatValue = (val: string): string => {
    let formatted = '';
    let valueIndex = 0;
    
    for (let i = 0; i < mask.length; i++) {
      const maskChar = mask[i];
      // Use type assertion to tell TypeScript this is a valid key
      const formatChar = formatChars[maskChar as keyof typeof formatChars];
      
      if (formatChar) {
        // This is a mask character
        if (valueIndex < val.length) {
          const valueChar = val[valueIndex];
          const regexPattern = new RegExp(formatChar);
          
          if (regexPattern.test(valueChar)) {
            formatted += valueChar;
            valueIndex++;
          } else {
            // Skip invalid characters
            valueIndex++;
            i--; // Try this mask position again
          }
        } else {
          // No more value characters
          if (isFocused || alwaysShowMask) {
            formatted += maskChar;
          }
        }
      } else {
        // This is a literal character in the mask
        formatted += maskChar;
        
        // If the value has this literal character, skip it
        if (valueIndex < val.length && val[valueIndex] === maskChar) {
          valueIndex++;
        }
      }
    }
    
    return formatted;
  };

  // Extract raw value from formatted value
  const extractValue = (formatted: string): string => {
    let extracted = '';
    let maskIndex = 0;
    
    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i];
      const maskChar = mask[maskIndex];
      
      if (formatChars[maskChar as keyof typeof formatChars]) {
        // This position corresponds to a mask character
        if (char !== maskChar) {
          extracted += char;
        }
      }
      
      maskIndex++;
    }
    
    return extracted;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formatted = formatValue(newValue);
    setFormattedValue(formatted);
    
    const rawValue = extractValue(formatted);
    setInputValue(rawValue);
    
    if (onChange) {
      onChange(rawValue);
    }
    
    // Save caret position for later restoration
    if (inputRef.current) {
      setCaretPosition(inputRef.current.selectionStart || 0);
    }
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    
    // Format the value when focused
    const formatted = formatValue(inputValue);
    setFormattedValue(formatted);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    // If not showing mask always, remove mask characters when not focused
    if (!alwaysShowMask) {
      const formatted = formatValue(inputValue);
      setFormattedValue(formatted);
    }
    
    if (onBlur) {
      onBlur(e);
    }
  };

  // Update formatted value when value prop changes
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
      const formatted = formatValue(value);
      setFormattedValue(formatted);
    }
  }, [value, mask, formatChars]);

  // Restore caret position after render
  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.setSelectionRange(caretPosition, caretPosition);
    }
  }, [formattedValue, caretPosition, isFocused]);

  return (
    <div className={`masked-input ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 ${required ? 'required' : ''} ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        value={formattedValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={`
          w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700
          focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
          dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${inputClassName}
        `}
      />
      
      {error && (
        <p className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</p>
      )}
    </div>
  );
};

// Predefined masks for common formats
export const MaskPresets = {
  Phone: '(999) 999-9999',
  SSN: '999-99-9999',
  CreditCard: '9999 9999 9999 9999',
  Date: '99/99/9999',
  Time: '99:99',
  Currency: '$9,999,999.99',
  Percentage: '99.99%',
  Email: 'aaaaaaaaaaaaaaaaaaaaaaa@aaa.aaa',
  ZipCode: '99999-9999',
  IPAddress: '999.999.999.999'
};

// Convenience components for common mask types
export const PhoneInput: React.FC<Omit<MaskedInputProps, 'mask'>> = (props) => (
  <MaskedInput {...props} mask={MaskPresets.Phone} placeholder={props.placeholder || '(___) ___-____'} />
);

export const DateInput: React.FC<Omit<MaskedInputProps, 'mask'>> = (props) => (
  <MaskedInput {...props} mask={MaskPresets.Date} placeholder={props.placeholder || '__/__/____'} />
);

export const CreditCardInput: React.FC<Omit<MaskedInputProps, 'mask'>> = (props) => (
  <MaskedInput {...props} mask={MaskPresets.CreditCard} placeholder={props.placeholder || '____ ____ ____ ____'} />
);

export const SSNInput: React.FC<Omit<MaskedInputProps, 'mask'>> = (props) => (
  <MaskedInput {...props} mask={MaskPresets.SSN} placeholder={props.placeholder || '___-__-____'} />
);

export const ZipCodeInput: React.FC<Omit<MaskedInputProps, 'mask'>> = (props) => (
  <MaskedInput {...props} mask={MaskPresets.ZipCode} placeholder={props.placeholder || '_____-____'} />
);

export default MaskedInput;
