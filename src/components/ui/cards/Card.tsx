"use client";

import React from 'react';
import Link from 'next/link';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  href?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card = ({
  title,
  subtitle,
  children,
  headerAction,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  bordered = true,
  shadow = 'md',
  rounded = 'md',
  href,
  onClick,
  hoverEffect = false,
}: CardProps) => {
  // Shadow classes
  const getShadowClasses = () => {
    switch (shadow) {
      case 'none':
        return '';
      case 'sm':
        return 'shadow-sm';
      case 'lg':
        return 'shadow-lg';
      case 'md':
      default:
        return 'shadow';
    }
  };

  // Rounded classes
  const getRoundedClasses = () => {
    switch (rounded) {
      case 'none':
        return '';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'full':
        return 'rounded-xl';
      default:
        return 'rounded-md';
    }
  };

  // Base classes
  const baseClasses = `rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 ${getShadowClasses()} ${getRoundedClasses()} ${hoverEffect ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : ''} ${className}`;

  // Card content
  const cardContent = (
    <>
      {/* Card Header */}
      {(title || headerAction) && (
        <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 ${headerClassName}`}>
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Card Body */}
      <div className={`p-4 ${bodyClassName}`}>{children}</div>

      {/* Card Footer */}
      {footer && (
        <div className={`p-4 border-t border-gray-200 dark:border-gray-600 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </>
  );

  // Render as a link if href is provided
  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {cardContent}
      </Link>
    );
  }

  // Render as a button if onClick is provided
  if (onClick) {
    return (
      <button className={`w-full text-left ${baseClasses}`} onClick={onClick}>
        {cardContent}
      </button>
    );
  }

  // Default render as a div
  return <div className={baseClasses}>{cardContent}</div>;
};

export default Card;
