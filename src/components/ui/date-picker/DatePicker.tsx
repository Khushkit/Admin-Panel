"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface DatePickerProps {
  selectedDate?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: string;
  className?: string;
  inputClassName?: string;
  calendarClassName?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showClearButton?: boolean;
  showTodayButton?: boolean;
  label?: string;
  labelClassName?: string;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const DatePicker = ({
  selectedDate,
  onChange,
  placeholder = 'Select date',
  format = 'MM/DD/YYYY',
  className = '',
  inputClassName = '',
  calendarClassName = '',
  disabled = false,
  minDate,
  maxDate,
  showClearButton = true,
  showTodayButton = true,
  label,
  labelClassName = '',
  error,
  id,
  name,
  required = false,
}: DatePickerProps) => {
  const [selected, setSelected] = useState<Date | undefined>(selectedDate);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(selected || new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  
  const datePickerRef = useRef<HTMLDivElement>(null);
  const uniqueId = id || `date-picker-${Math.random().toString(36).substring(2, 11)}`;

  useEffect(() => {
    // Update selected date if prop changes
    if (selectedDate !== selected) {
      setSelected(selectedDate);
      if (selectedDate) {
        setCurrentMonth(new Date(selectedDate));
      }
    }
  }, [selectedDate]);

  // Handle outside click to close the date picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format date to string
  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    
    let formattedDate = format;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    formattedDate = formattedDate.replace('DD', day);
    formattedDate = formattedDate.replace('MM', month);
    formattedDate = formattedDate.replace('YYYY', year.toString());
    
    return formattedDate;
  };

  // Get the days in a month
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Check if a date is outside the allowed range
  const isDateOutOfRange = (date: Date): boolean => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) {
      return true;
    }
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) {
      return true;
    }
    return false;
  };

  // Check if two dates are the same day
  const isSameDay = (date1: Date | undefined, date2: Date | undefined): boolean => {
    if (!date1 || !date2) return false;
    
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Generate month grid
  const generateMonthGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Previous month days to fill in the calendar
    const daysFromPrevMonth = firstDayOfMonth;
    const prevMonthDays = [];
    
    if (daysFromPrevMonth > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
      
      for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
        prevMonthDays.push({
          date: new Date(prevMonthYear, prevMonth, i),
          currentMonth: false,
        });
      }
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        currentMonth: true,
      });
    }
    
    // Next month days to fill out the calendar
    const totalDaysDisplayed = 42; // 6 rows of 7 days
    const daysFromNextMonth = totalDaysDisplayed - prevMonthDays.length - currentMonthDays.length;
    const nextMonthDays = [];
    
    if (daysFromNextMonth > 0) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;
      
      for (let i = 1; i <= daysFromNextMonth; i++) {
        nextMonthDays.push({
          date: new Date(nextMonthYear, nextMonth, i),
          currentMonth: false,
        });
      }
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  // Set the date to today
  const goToToday = () => {
    const today = new Date();
    setSelected(today);
    setCurrentMonth(today);
    onChange?.(today);
    setIsOpen(false);
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (disabled || isDateOutOfRange(date)) return;
    
    setSelected(date);
    onChange?.(date);
    setIsOpen(false);
  };

  // Clear selected date
  const handleClear = () => {
    setSelected(undefined);
    onChange?.(undefined as any);
  };

  // Format month and year for display in header
  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Month grid
  const monthGrid = generateMonthGrid();

  return (
    <div className={`relative w-full ${className}`} ref={datePickerRef}>
      {label && (
        <label 
          htmlFor={uniqueId}
          className={`block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={uniqueId}
          name={name}
          type="text"
          className={`
            w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
            dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300
            ${disabled ? 'bg-gray-100 cursor-not-allowed dark:bg-gray-800' : 'bg-white cursor-pointer dark:bg-gray-900'}
            ${error ? 'border-red-500 dark:border-red-500' : ''}
            ${inputClassName}
          `}
          placeholder={placeholder}
          value={formatDate(selected)}
          onClick={() => !disabled && setIsOpen(true)}
          readOnly
          disabled={disabled}
          required={required}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg 
            className={`h-5 w-5 text-gray-400 ${disabled ? 'opacity-50' : 'cursor-pointer'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {isOpen && (
        <div className={`
          absolute z-10 mt-1 w-72 rounded-md bg-white shadow-lg dark:bg-gray-900 dark:border dark:border-gray-600
          ${calendarClassName}
        `}>
          {/* Calendar header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-600">
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              onClick={goToPrevMonth}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {formatMonthYear(currentMonth)}
            </div>
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              onClick={goToNextMonth}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Day names */}
          <div className="grid grid-cols-7 gap-0 border-b border-gray-200 dark:border-gray-600">
            {dayNames.map(day => (
              <div 
                key={day} 
                className="h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                {day.slice(0, 1)}
              </div>
            ))}
          </div>
          
          {/* Days grid */}
          <div className="grid grid-cols-7 gap-0">
            {monthGrid.map(({ date, currentMonth: isCurrentMonth }, index) => {
              const isToday = isSameDay(date, new Date());
              const isSelected = isSameDay(date, selected);
              const isOutOfRange = isDateOutOfRange(date);
              const isHovered = hoveredDate && isSameDay(date, hoveredDate);
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  onMouseEnter={() => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                  disabled={isOutOfRange}
                  className={`
                    h-10 w-full flex items-center justify-center text-sm font-medium
                    ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
                    ${isSelected ? 'bg-primary-500 text-white hover:bg-primary-600' : ''}
                    ${isToday && !isSelected ? 'border border-primary-500' : ''}
                    ${isHovered && !isSelected && !isOutOfRange ? 'bg-gray-100 dark:bg-gray-700' : ''}
                    ${isOutOfRange ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    focus:outline-none
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          
          {/* Footer with actions */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-600">
            {showClearButton && (
              <button
                type="button"
                className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
            {showTodayButton && (
              <button
                type="button"
                className="text-sm text-primary-500 hover:text-primary-700 focus:outline-none"
                onClick={goToToday}
              >
                Today
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
