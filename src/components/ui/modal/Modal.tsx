"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  preventScroll?: boolean;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  centered?: boolean;
  hideHeader?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  showCloseButton = true,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  preventScroll = true,
  footer,
  className = '',
  contentClassName = '',
  overlayClassName = '',
  headerClassName = '',
  footerClassName = '',
  centered = false,
  hideHeader = false,
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle mounting on client-side only
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

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

  // Prevent background scrolling when modal is open
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

  // Focus trap inside modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, [isOpen]);

  // Handle outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Get size classes for the modal
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case 'full':
        return 'max-w-full m-4';
      default:
        return 'max-w-md';
    }
  };

  // Don't render anything on the server
  if (!isMounted) return null;

  // Don't render if the modal is closed
  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 flex ${centered ? 'items-center' : 'items-start'} justify-center overflow-y-auto bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 backdrop-blur-sm ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className={`relative my-8 w-full ${getSizeClasses()} rounded-lg bg-white dark:bg-gray-900 shadow-lg ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Modal Header */}
        {!hideHeader && (
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 ${headerClassName}`}>
            {title && <h3 id="modal-title" className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
            {showCloseButton && (
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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

        {/* Modal Body */}
        <div className={`p-6 ${contentClassName}`}>{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className={`flex justify-end p-4 border-t border-gray-200 dark:border-gray-600 ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Use portal to render modal at the body level
  return createPortal(modalContent, document.body);
};

export default Modal;
