"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  preventScroll?: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
}

const Drawer = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = '300px',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  preventScroll = true,
  title,
  footer,
  className = '',
  contentClassName = '',
  overlayClassName = '',
  headerClassName = '',
  footerClassName = '',
  showCloseButton = true,
}: DrawerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle mounting on client-side only
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle animation and open/close state
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Small delay to ensure animation works properly
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && closeOnEsc) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (preventScroll) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preventScroll]);

  // Focus trap inside drawer
  useEffect(() => {
    if (!isOpen || !drawerRef.current || isAnimating) return;

    const focusableElements = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, [isOpen, isAnimating]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Get position-specific styles
  const getPositionStyles = () => {
    const styles: Record<string, string> = {};
    const translateValues: Record<string, string> = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      top: 'translateY(-100%)',
      bottom: 'translateY(100%)',
    };

    switch (position) {
      case 'left':
        styles.top = '0';
        styles.left = '0';
        styles.bottom = '0';
        styles.width = size;
        break;
      case 'right':
        styles.top = '0';
        styles.right = '0';
        styles.bottom = '0';
        styles.width = size;
        break;
      case 'top':
        styles.top = '0';
        styles.left = '0';
        styles.right = '0';
        styles.height = size;
        break;
      case 'bottom':
        styles.bottom = '0';
        styles.left = '0';
        styles.right = '0';
        styles.height = size;
        break;
      default:
        break;
    }

    return {
      containerStyles: styles,
      transform: isOpen ? 'translate(0, 0)' : translateValues[position],
    };
  };

  // Don't render anything on the server
  if (!isMounted) return null;

  // Don't render if the drawer is closed and not animating
  if (!isOpen && !isAnimating) return null;

  const { containerStyles, transform } = getPositionStyles();

  const drawerContent = (
    <div 
      className={`fixed inset-0 z-50 ${overlayClassName}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div className={`
        absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `} />
      
      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={`
          absolute bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out
          ${className}
        `}
        style={{
          ...containerStyles,
          transform,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        {(title || showCloseButton) && (
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
            {title && (
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-100 hover:text-gray-500 rounded-lg p-1.5 inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={onClose}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Drawer Content */}
        <div className={`p-4 overflow-y-auto ${contentClassName}`}>
          {children}
        </div>

        {/* Drawer Footer */}
        {footer && (
          <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Use portal to render drawer at the body level
  return createPortal(drawerContent, document.body);
};

export default Drawer;
