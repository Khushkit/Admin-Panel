"use client";

import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  showFirstLastButtons?: boolean;
  showPrevNextButtons?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "rounded" | "simple";
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = "",
  showFirstLastButtons = true,
  showPrevNextButtons = true,
  size = "md",
  variant = "default",
}) => {
  // Generate page numbers to display based on current page and sibling count
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    
    // Minimum and maximum page numbers to show
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    // Whether to show dots
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    // Always show first page
    pageNumbers.push(1);
    
    // Add left dots if needed
    if (shouldShowLeftDots) {
      pageNumbers.push("...");
    } else if (leftSiblingIndex > 1) {
      // If we're not showing dots, but the left sibling is greater than 1,
      // add page 2
      pageNumbers.push(2);
    }
    
    // Add page numbers between dots
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Add right dots if needed
    if (shouldShowRightDots) {
      pageNumbers.push("...");
    } else if (rightSiblingIndex < totalPages - 1) {
      // If we're not showing dots, but the right sibling is less than totalPages - 1,
      // add the second to last page
      pageNumbers.push(totalPages - 1);
    }
    
    // Always show last page if it's different from first page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 min-w-8 text-xs";
      case "lg":
        return "h-12 min-w-12 text-base";
      case "md":
      default:
        return "h-10 min-w-10 text-sm";
    }
  };

  // Get variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case "rounded":
        return "rounded-full";
      case "simple":
        return "rounded-md border-0 bg-transparent";
      case "default":
      default:
        return "rounded-md";
    }
  };

  // Base button classes
  const getButtonBaseClasses = () => {
    return `flex items-center justify-center ${getSizeClasses()} ${getVariantClasses()}`;
  };

  // Classes for number buttons
  const getPageButtonClasses = (isActive: boolean) => {
    const baseClasses = getButtonBaseClasses();
    
    if (variant === "simple") {
      return `${baseClasses} ${
        isActive
          ? "font-semibold text-primary-600 dark:text-primary-400"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      }`;
    }
    
    return `${baseClasses} ${
      isActive
        ? "bg-primary-600 text-white dark:bg-primary-600"
        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
    }`;
  };

  // Classes for navigation buttons
  const getNavButtonClasses = (disabled: boolean) => {
    const baseClasses = getButtonBaseClasses();
    
    if (variant === "simple") {
      return `${baseClasses} ${
        disabled
          ? "text-gray-300 cursor-not-allowed dark:text-gray-600"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      }`;
    }
    
    return `${baseClasses} ${
      disabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300 dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700"
        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
    }`;
  };
  
  // Simple checks
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // For simple variant, only show prev/next
  const renderSimpleVariant = () => {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={getNavButtonClasses(isFirstPage)}
          aria-label="Previous page"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={getNavButtonClasses(isLastPage)}
          aria-label="Next page"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  if (variant === "simple") {
    return renderSimpleVariant();
  }

  return (
    <nav className={`flex items-center justify-center ${className}`}>
      <ul className="flex flex-wrap items-center gap-1 md:gap-2">
        {/* First Page Button */}
        {showFirstLastButtons && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              disabled={isFirstPage}
              className={getNavButtonClasses(isFirstPage)}
              aria-label="Go to first page"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </li>
        )}

        {/* Previous Button */}
        {showPrevNextButtons && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={isFirstPage}
              className={getNavButtonClasses(isFirstPage)}
              aria-label="Previous page"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </li>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="px-2 text-gray-600 dark:text-gray-400">...</span>
              </li>
            );
          }

          const isActive = pageNumber === currentPage;
          return (
            <li key={`page-${pageNumber}`}>
              <button
                onClick={() => onPageChange(pageNumber as number)}
                className={getPageButtonClasses(isActive)}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        {showPrevNextButtons && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={isLastPage}
              className={getNavButtonClasses(isLastPage)}
              aria-label="Next page"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}

        {/* Last Page Button */}
        {showFirstLastButtons && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={isLastPage}
              className={getNavButtonClasses(isLastPage)}
              aria-label="Go to last page"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
