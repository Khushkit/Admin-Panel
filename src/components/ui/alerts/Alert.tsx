"use client";

import React, { useState } from 'react';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  message: string | React.ReactNode;
  dismissible?: boolean;
  icon?: React.ReactNode;
  bordered?: boolean;
  rounded?: boolean;
  className?: string;
  closeClassName?: string;
  onClose?: () => void;
}

const Alert = ({
  type = 'info',
  title,
  message,
  dismissible = false,
  icon,
  bordered = false,
  rounded = true,
  className = '',
  closeClassName = '',
  onClose,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // Alert type styles
  const getAlertTypeClasses = () => {
    switch (type) {
      case 'success':
        return `bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-400 ${bordered ? 'border-success-300 dark:border-success-800' : ''}`;
      case 'warning':
        return `bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400 ${bordered ? 'border-warning-300 dark:border-warning-800' : ''}`;
      case 'danger':
        return `bg-danger-50 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400 ${bordered ? 'border-danger-300 dark:border-danger-800' : ''}`;
      case 'info':
      default:
        return `bg-info-50 text-info-700 dark:bg-info-900/30 dark:text-info-400 ${bordered ? 'border-info-300 dark:border-info-800' : ''}`;
    }
  };

  // Default icons for different alert types
  const getDefaultIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
        );
      case 'danger':
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z" clipRule="evenodd"></path>
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        p-4 mb-4 flex items-start
        ${bordered ? 'border' : ''}
        ${rounded ? 'rounded-md' : ''}
        ${getAlertTypeClasses()}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getDefaultIcon()}</div>
        <div className="ml-2">
          {title && <h3 className="text-base font-semibold">{title}</h3>}
          <div className={`${title ? 'mt-1' : ''} text-sm`}>{message}</div>
        </div>
      </div>

      {dismissible && (
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center rounded-md focus:ring-2 focus:ring-opacity-50 ${closeClassName}`}
          aria-label="Close"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
