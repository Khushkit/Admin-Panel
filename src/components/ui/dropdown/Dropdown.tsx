"use client";
import type React from "react";
import { useEffect, useRef, forwardRef } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((
  { isOpen, onClose, children, className = "" },
  ref
) => {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const dropdownElement = ref && 'current' in ref ? ref.current : innerRef.current;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownElement &&
        !dropdownElement.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, ref]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref || innerRef}
      className={`absolute z-[9999] mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
      style={{ maxWidth: '100vw' }}
    >
      {children}
    </div>
  );
});
