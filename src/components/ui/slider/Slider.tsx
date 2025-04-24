"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface SliderProps {
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'top' | 'left';
  showValue?: boolean;
  valuePosition?: 'top' | 'right';
  showTicks?: boolean;
  tickCount?: number;
  tickValues?: number[];
  marks?: { value: number; label: string }[];
  range?: boolean;
  rangeValues?: [number, number];
  onRangeChange?: (values: [number, number]) => void;
  onRangeChangeComplete?: (values: [number, number]) => void;
  thumbSize?: 'sm' | 'md' | 'lg';
  trackHeight?: 'sm' | 'md' | 'lg';
  trackColor?: string;
  thumbColor?: string;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  tickClassName?: string;
  markClassName?: string;
  formatValue?: (value: number) => string;
  orientation?: 'horizontal' | 'vertical';
  height?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

const Slider = ({
  id,
  name,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 0,
  onChange,
  onChangeComplete,
  disabled = false,
  label,
  labelPosition = 'top',
  showValue = false,
  valuePosition = 'top',
  showTicks = false,
  tickCount,
  tickValues,
  marks,
  range = false,
  rangeValues,
  onRangeChange,
  onRangeChangeComplete,
  thumbSize = 'md',
  trackHeight = 'md',
  trackColor,
  thumbColor,
  className = '',
  trackClassName = '',
  thumbClassName = '',
  labelClassName = '',
  valueClassName = '',
  tickClassName = '',
  markClassName = '',
  formatValue,
  orientation = 'horizontal',
  height = '200px',
  required = false,
  error,
  helperText,
  containerClassName = '',
  errorClassName = '',
  helperTextClassName = '',
}: SliderProps) => {
  // Initialize controlled or uncontrolled value state
  const [internalValue, setInternalValue] = useState<number | [number, number]>(
    range
      ? rangeValues !== undefined
        ? rangeValues
        : [defaultValue, (max - min) / 2 + min]
      : value !== undefined
        ? value
        : defaultValue
  );
  
  // Track whether thumb is being dragged
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<'start' | 'end' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const startThumbRef = useRef<HTMLDivElement>(null);
  const endThumbRef = useRef<HTMLDivElement>(null);
  const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;
  
  // If external value changes, update internal state
  useEffect(() => {
    if (range) {
      if (rangeValues !== undefined) {
        setInternalValue(rangeValues);
      }
    } else if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value, rangeValues, range]);

  // Get actual value(s)
  const getValues = useCallback(() => {
    if (range) {
      return Array.isArray(internalValue) ? internalValue : [min, internalValue as number];
    }
    return !Array.isArray(internalValue) ? internalValue : internalValue[0];
  }, [internalValue, min, range]);
  
  // Calculate percentage from value
  const valueToPercent = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);
  
  // Calculate value from percentage
  const percentToValue = useCallback((percent: number) => {
    const rawValue = ((percent / 100) * (max - min)) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  }, [min, max, step]);
  
  // Format display value
  const displayValue = useCallback((val: number) => {
    if (formatValue) {
      return formatValue(val);
    }
    return val.toString();
  }, [formatValue]);
  
  // Calculate ticks positions
  const calculateTicks = useCallback(() => {
    if (!showTicks) return [];
    
    if (tickValues) {
      return tickValues.map(tickValue => ({
        value: tickValue,
        percent: valueToPercent(tickValue)
      }));
    }
    
    const count = tickCount || 5;
    return Array.from({ length: count }).map((_, index) => {
      const tickValue = min + ((max - min) / (count - 1)) * index;
      return {
        value: tickValue,
        percent: valueToPercent(tickValue)
      };
    });
  }, [showTicks, tickValues, tickCount, min, max, valueToPercent]);
  
  // Handle track click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const track = trackRef.current;
    if (!track) return;
    
    const rect = track.getBoundingClientRect();
    
    let percent;
    if (orientation === 'horizontal') {
      percent = ((e.clientX - rect.left) / rect.width) * 100;
    } else {
      percent = 100 - ((e.clientY - rect.top) / rect.height) * 100;
    }
    
    const distToStart = Math.abs(percent - valueToPercent((range ? (getValues() as [number, number])[0] : internalValue as number)));
    const distToEnd = Math.abs(percent - valueToPercent((range ? (getValues() as [number, number])[1] : internalValue as number)));
    
    const newValue = percentToValue(percent);
    
    if (range) {
      const values = getValues() as [number, number];
      
      // Determine which thumb to move based on proximity
      if (distToStart <= distToEnd) {
        handleValueChange([newValue, values[1]], 'start');
        setActiveThumb('start');
      } else {
        handleValueChange([values[0], newValue], 'end');
        setActiveThumb('end');
      }
    } else {
      handleValueChange(newValue, null);
    }
    
    if (!range && onChangeComplete) {
      onChangeComplete(newValue);
    } else if (range && onRangeChangeComplete) {
      const values = getValues() as [number, number];
      const [startValue, endValue] = values;
      onRangeChangeComplete([
        distToStart <= distToEnd ? newValue : startValue,
        distToStart <= distToEnd ? endValue : newValue
      ]);
    }
  };
  
  // Handle value change
  const handleValueChange = (newValue: number | [number, number], thumb: 'start' | 'end' | null) => {
    if (disabled) return;
    
    if (range) {
      const [startValue, endValue] = newValue as [number, number];
      
      // Ensure start value is not greater than end value
      let adjustedStart = startValue;
      let adjustedEnd = endValue;
      
      if (thumb === 'start' && startValue > endValue) {
        adjustedStart = endValue;
      } else if (thumb === 'end' && endValue < startValue) {
        adjustedEnd = startValue;
      }
      
      setInternalValue([adjustedStart, adjustedEnd]);
      
      if (onRangeChange) {
        onRangeChange([adjustedStart, adjustedEnd]);
      }
    } else {
      setInternalValue(newValue as number);
      
      if (onChange) {
        onChange(newValue as number);
      }
    }
  };
  
  // Start dragging
  const startDragging = (
    e: React.MouseEvent | React.TouchEvent,
    thumb: 'start' | 'end' | null
  ) => {
    if (disabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); console.log('Dragging started for thumb:', thumb);
    setActiveThumb(thumb);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', stopDragging);
  };
  
  // Stop dragging
  const stopDragging = () => {
    setIsDragging(false);
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', stopDragging);
    
    if (range && onRangeChangeComplete) {
      onRangeChangeComplete(getValues() as [number, number]);
    } else if (!range && onChangeComplete) {
      onChangeComplete(getValues() as number);
    }
    
    setActiveThumb(null);
  };
  
  // Handle mouse movement during drag
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    
    let percent;
    if (orientation === 'horizontal') {
      percent = ((e.clientX - rect.left) / rect.width) * 100;
    } else {
      percent = 100 - ((e.clientY - rect.top) / rect.height) * 100;
    }
    
    percent = Math.min(100, Math.max(0, percent));
    const newValue = percentToValue(percent); console.log('Mouse move new value:', newValue);
    
    if (range) {
      const values = getValues() as [number, number];
      
      if (activeThumb === 'start') {
        handleValueChange([newValue, values[1]], 'start');
      } else if (activeThumb === 'end') {
        handleValueChange([values[0], newValue], 'end');
      }
    } else {
      handleValueChange(newValue, null);
    }
  };
  
  // Handle touch movement during drag
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !trackRef.current || !e.touches[0]) return;
    
    e.preventDefault(); // Prevent scrolling while dragging
    
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const touch = e.touches[0];
    
    let percent;
    if (orientation === 'horizontal') {
      percent = ((touch.clientX - rect.left) / rect.width) * 100;
    } else {
      percent = 100 - ((touch.clientY - rect.top) / rect.height) * 100;
    }
    
    percent = Math.min(100, Math.max(0, percent));
    const newValue = percentToValue(percent); console.log('Touch move new value:', newValue);
    
    if (range) {
      const values = getValues() as [number, number];
      
      if (activeThumb === 'start') {
        handleValueChange([newValue, values[1]], 'start');
      } else if (activeThumb === 'end') {
        handleValueChange([values[0], newValue], 'end');
      }
    } else {
      handleValueChange(newValue, null);
    }
  };
  
  // Get thumb size class
  const getThumbSizeClass = () => {
    switch (thumbSize) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-6 h-6';
      case 'md':
      default:
        return 'w-4 h-4';
    }
  };
  
  // Get track height class
  const getTrackHeightClass = () => {
    if (orientation === 'horizontal') {
      switch (trackHeight) {
        case 'sm':
          return 'h-1';
        case 'lg':
          return 'h-3';
        case 'md':
        default:
          return 'h-2';
      }
    } else {
      switch (trackHeight) {
        case 'sm':
          return 'w-1';
        case 'lg':
          return 'w-3';
        case 'md':
        default:
          return 'w-2';
      }
    }
  };
  
  // Calculate styles based on values and orientation
  const getStyles = () => {
    const values = getValues();
    
    if (range) {
      const [startValue, endValue] = values as [number, number];
      const startPercent = valueToPercent(startValue);
      const endPercent = valueToPercent(endValue);
      
      if (orientation === 'horizontal') {
        return {
          track: {
            background: `linear-gradient(to right, 
              #e5e7eb 0%, 
              #e5e7eb ${startPercent}%, 
              ${trackColor || 'var(--color-primary-500)'} ${startPercent}%, 
              ${trackColor || 'var(--color-primary-500)'} ${endPercent}%, 
              #e5e7eb ${endPercent}%, 
              #e5e7eb 100%)`
          },
          startThumb: {
            left: `${startPercent}%`
          },
          endThumb: {
            left: `${endPercent}%`
          }
        };
      } else {
        return {
          track: {
            background: `linear-gradient(to top, 
              #e5e7eb 0%, 
              #e5e7eb ${startPercent}%, 
              ${trackColor || 'var(--color-primary-500)'} ${startPercent}%, 
              ${trackColor || 'var(--color-primary-500)'} ${endPercent}%, 
              #e5e7eb ${endPercent}%, 
              #e5e7eb 100%)`
          },
          startThumb: {
            bottom: `${startPercent}%`
          },
          endThumb: {
            bottom: `${endPercent}%`
          }
        };
      }
    } else {
      const valuePercent = valueToPercent(values as number);
      
      if (orientation === 'horizontal') {
        return {
          track: {
            background: `linear-gradient(to right, 
              ${trackColor || 'var(--color-primary-500)'} 0%, 
              ${trackColor || 'var(--color-primary-500)'} ${valuePercent}%, 
              #e5e7eb ${valuePercent}%, 
              #e5e7eb 100%)`
          },
          thumb: {
            left: `${valuePercent}%`
          }
        };
      } else {
        return {
          track: {
            background: `linear-gradient(to top, 
              ${trackColor || 'var(--color-primary-500)'} 0%, 
              ${trackColor || 'var(--color-primary-500)'} ${valuePercent}%, 
              #e5e7eb ${valuePercent}%, 
              #e5e7eb 100%)`
          },
          thumb: {
            bottom: `${valuePercent}%`
          }
        };
      }
    }
  };
  
  const styles = getStyles();
  const ticks = calculateTicks();
  const values = getValues();
  
  return (
    <div 
      className={`
        relative
        ${orientation === 'vertical' ? 'h-full' : 'w-full'}
        ${containerClassName}
      `}
      style={orientation === 'vertical' ? { height } : undefined}
    >
      {/* Label */}
      {label && (
        <label 
          htmlFor={sliderId}
          className={`
            block text-sm font-medium text-gray-700 dark:text-gray-300
            ${labelPosition === 'left' ? 'mb-0 mr-3' : 'mb-2'}
            ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
            ${labelClassName}
          `}
        >
          {label}
        </label>
      )}
      
      <div 
        className={`
          ${labelPosition === 'left' ? 'flex items-center' : ''}
          ${orientation === 'vertical' ? 'h-full' : ''}
        `}
      >
        {/* Slider Container */}
        <div 
          className={`
            relative
            ${orientation === 'horizontal' ? 'w-full py-4' : 'h-full px-4'}
            ${className}
          `}
        >
          {/* Value Display (Top) */}
          {showValue && valuePosition === 'top' && (
            <div 
              className={`
                mb-2 text-sm text-gray-700 dark:text-gray-300
                ${orientation === 'horizontal' ? 'w-full text-center' : 'absolute -left-8'}
                ${valueClassName}
              `}
            >
              {range 
                ? `${displayValue((values as [number, number])[0])} - ${displayValue((values as [number, number])[1])}`
                : displayValue(values as number)
              }
            </div>
          )}
          
          {/* Track */}
          <div
            ref={trackRef}
            className={`
              ${orientation === 'horizontal' ? 'w-full' : 'h-full'}
              ${getTrackHeightClass()}
              rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer relative border-b border-dashed border-gray-500
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${trackClassName}
            `}
            style={styles.track}
            onClick={disabled ? undefined : handleTrackClick}
            aria-disabled={disabled}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={range 
              ? undefined 
              : values as number
            }
            aria-valuetext={range 
              ? `${(values as [number, number])[0]} to ${(values as [number, number])[1]}`
              : (values as number).toString()
            }
            id={sliderId}
            aria-orientation={orientation}
          >
            {/* Ticks */}
            {showTicks && ticks.map((tick, index) => (
              <div 
                key={index}
                className={`
                  absolute bg-gray-400 dark:bg-gray-500
                  ${orientation === 'horizontal' 
                    ? 'w-0.5 h-1.5 -translate-x-1/2 top-full mt-1' 
                    : 'h-0.5 w-1.5 -translate-y-1/2 left-full ml-1'
                  }
                  ${tickClassName}
                `}
                style={
                  orientation === 'horizontal' 
                    ? { left: `${tick.percent}%` } 
                    : { bottom: `${tick.percent}%` }
                }
              />
            ))}
            
            {/* Marks */}
            {marks && marks.map((mark, index) => (
              <div 
                key={index}
                className={`
                  absolute
                  ${orientation === 'horizontal' 
                    ? '-translate-x-1/2 top-full mt-4' 
                    : '-translate-y-1/2 left-full ml-4'
                  }
                  ${markClassName}
                `}
                style={
                  orientation === 'horizontal' 
                    ? { left: `${valueToPercent(mark.value)}%` } 
                    : { bottom: `${valueToPercent(mark.value)}%` }
                }
              >
                <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {mark.label}
                </div>
              </div>
            ))}
            
            {/* Thumbs */}
            {range ? (
              <>
                <div
                  ref={startThumbRef}
                  className={`
                    absolute ${getThumbSizeClass()} bg-white dark:bg-gray-200 rounded-full shadow-md 
                    border-2 border-primary-500 cursor-grab transform 
                    ${orientation === 'horizontal' ? '-translate-x-1/2 -translate-y-1/2 top-1/2' : '-translate-x-1/2 translate-y-1/2 left-1/2'}
                    ${activeThumb === 'start' ? 'cursor-grabbing z-20' : 'z-10'}
                    ${disabled ? 'cursor-not-allowed' : ''}
                    ${thumbClassName}
                  `}
                  style={{
                    ...styles.startThumb,
                    backgroundColor: thumbColor || undefined
                  }}
                  onMouseDown={(e) => startDragging(e, 'start')}
                  onTouchStart={(e) => startDragging(e, 'start')}
                  tabIndex={disabled ? -1 : 0}
                  role="slider"
                  aria-valuemin={min}
                  aria-valuemax={(values as [number, number])[1]}
                  aria-valuenow={(values as [number, number])[0]}
                  aria-orientation={orientation}
                />
                <div
                  ref={endThumbRef}
                  className={`
                    absolute ${getThumbSizeClass()} bg-white dark:bg-gray-200 rounded-full shadow-md 
                    border-2 border-primary-500 cursor-grab transform 
                    ${orientation === 'horizontal' ? '-translate-x-1/2 -translate-y-1/2 top-1/2' : '-translate-x-1/2 translate-y-1/2 left-1/2'}
                    ${activeThumb === 'end' ? 'cursor-grabbing z-20' : 'z-10'}
                    ${disabled ? 'cursor-not-allowed' : ''}
                    ${thumbClassName}
                  `}
                  style={{
                    ...styles.endThumb,
                    backgroundColor: thumbColor || undefined
                  }}
                  onMouseDown={(e) => startDragging(e, 'end')}
                  onTouchStart={(e) => startDragging(e, 'end')}
                  tabIndex={disabled ? -1 : 0}
                  role="slider"
                  aria-valuemin={(values as [number, number])[0]}
                  aria-valuemax={max}
                  aria-valuenow={(values as [number, number])[1]}
                  aria-orientation={orientation}
                />
              </>
            ) : (
              <div
                className={`
                  absolute ${getThumbSizeClass()} bg-white dark:bg-gray-200 rounded-full shadow-md 
                  border-2 border-primary-500 cursor-grab transform 
                  ${orientation === 'horizontal' ? '-translate-x-1/2 -translate-y-1/2 top-1/2' : '-translate-x-1/2 translate-y-1/2 left-1/2'}
                  ${isDragging ? 'cursor-grabbing' : ''}
                  ${disabled ? 'cursor-not-allowed' : ''}
                  ${thumbClassName}
                `}
                style={{
                  ...styles.thumb,
                  backgroundColor: thumbColor || undefined
                }}
                onMouseDown={(e) => startDragging(e, null)}
                onTouchStart={(e) => startDragging(e, null)}
                tabIndex={disabled ? -1 : 0}
              />
            )}
          </div>
          
          {/* Value Display (Right) */}
          {showValue && valuePosition === 'right' && (
            <div 
              className={`
                ml-4 text-sm text-gray-700 dark:text-gray-300
                ${valueClassName}
              `}
            >
              {range 
                ? `${displayValue((values as [number, number])[0])} - ${displayValue((values as [number, number])[1])}`
                : displayValue(values as number)
              }
            </div>
          )}
        </div>
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
      
      {/* Helper Text */}
      {!error && helperText && (
        <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${helperTextClassName}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Slider;
