"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@/icons";

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 dark:text-gray-400 ${
            isOpen ? "rotate-180 transform" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pb-4 pt-2 text-gray-600 dark:text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  className = "",
  bordered = false,
}) => {
  return (
    <div
      className={`rounded-lg ${
        bordered ? "border border-gray-200 dark:border-gray-700 p-4" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Accordion;
