"use client";

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  separatorClassName?: string;
}

const Breadcrumb = ({
  items,
  separator = '/',
  className = '',
  listClassName = '',
  itemClassName = '',
  activeItemClassName = '',
  separatorClassName = '',
}: BreadcrumbProps) => {
  // Default classes for styling
  const defaultClasses = {
    container: 'flex items-center space-x-2',
    list: 'flex items-center space-x-2',
    item: 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium',
    activeItem: 'text-gray-900 dark:text-white text-sm font-medium',
    separator: 'text-gray-400 dark:text-gray-400',
  };

  return (
    <nav className={`${defaultClasses.container} ${className}`} aria-label="Breadcrumb">
      <ol className={`${defaultClasses.list} ${listClassName}`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className={`mx-2 ${defaultClasses.separator} ${separatorClassName}`}>
                {separator}
              </span>
            )}
            
            {item.href && !item.active ? (
              <Link 
                href={item.href}
                className={`${defaultClasses.item} ${itemClassName}`}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={`${item.active ? defaultClasses.activeItem : defaultClasses.item} ${item.active ? activeItemClassName : itemClassName}`}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
