"use client";

import React from 'react';

export interface TimelineItemProps {
  id: string | number;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  iconBackground?: string;
  date?: string;
  time?: string;
  connector?: boolean;
  position?: 'left' | 'right' | 'alternate';
  highlighted?: boolean;
  dashed?: boolean;
}

export interface TimelineProps {
  items: TimelineItemProps[];
  orientation?: 'horizontal' | 'vertical';
  align?: 'left' | 'right' | 'alternate';
  gap?: 'sm' | 'md' | 'lg';
  iconSize?: 'sm' | 'md' | 'lg';
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  lineColor?: string;
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  connectorClassName?: string;
  dateClassName?: string;
}

const Timeline = ({
  items,
  orientation = 'vertical',
  align = 'left',
  gap = 'md',
  iconSize = 'md',
  lineStyle = 'solid',
  lineColor,
  className = '',
  itemClassName = '',
  iconClassName = '',
  contentClassName = '',
  connectorClassName = '',
  dateClassName = '',
}: TimelineProps) => {
  // Get size-specific classes
  const getSizeClasses = () => {
    switch (iconSize) {
      case 'sm':
        return {
          icon: 'w-6 h-6',
          line: 'w-0.5',
          gap: gap === 'sm' ? 'space-y-4' : gap === 'lg' ? 'space-y-8' : 'space-y-6',
          horizontalGap: gap === 'sm' ? 'space-x-4' : gap === 'lg' ? 'space-x-8' : 'space-x-6',
        };
      case 'lg':
        return {
          icon: 'w-10 h-10',
          line: 'w-1',
          gap: gap === 'sm' ? 'space-y-6' : gap === 'lg' ? 'space-y-12' : 'space-y-8',
          horizontalGap: gap === 'sm' ? 'space-x-6' : gap === 'lg' ? 'space-x-12' : 'space-x-8',
        };
      case 'md':
      default:
        return {
          icon: 'w-8 h-8',
          line: 'w-0.5',
          gap: gap === 'sm' ? 'space-y-5' : gap === 'lg' ? 'space-y-10' : 'space-y-7',
          horizontalGap: gap === 'sm' ? 'space-x-5' : gap === 'lg' ? 'space-x-10' : 'space-x-7',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Get line style
  const getLineStyleClass = () => {
    switch (lineStyle) {
      case 'dashed':
        return 'border-dashed';
      case 'dotted':
        return 'border-dotted';
      case 'solid':
      default:
        return 'border-solid';
    }
  };

  const lineStyleClass = getLineStyleClass();

  // Render the timeline items based on orientation
  const renderItems = () => {
    return items.map((item, index) => {
      const isLast = index === items.length - 1;
      const showConnector = item.connector !== false && !isLast;
      const itemPosition = item.position || align;
      const contentAlign = itemPosition === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : itemPosition;
      
      // Get dynamic styles
      const iconBgColor = item.iconBackground || 'bg-primary-500 dark:bg-primary-400';
      const isHighlighted = item.highlighted;
      const isDashed = item.dashed;

      if (orientation === 'horizontal') {
        return (
          <div 
            key={item.id} 
            className={`flex flex-col items-center ${itemClassName}`}
          >
            {/* Icon */}
            <div 
              className={`relative flex items-center justify-center rounded-full 
                ${iconBgColor} ${sizeClasses.icon} ${iconClassName}`}
            >
              {item.icon || (
                <span className="text-white">{index + 1}</span>
              )}
            </div>
            
            {/* Connector */}
            {showConnector && (
              <div 
                className={`
                  h-full border-t-2 mt-4 
                  ${lineStyleClass} 
                  ${isDashed ? 'border-dashed' : ''}
                  ${isHighlighted ? 'border-primary-500 dark:border-primary-400' : 'border-gray-200 dark:border-gray-700'}
                  ${lineColor ? `border-${lineColor}` : ''}
                  ${connectorClassName}
                `}
              />
            )}
            
            {/* Content */}
            <div className={`mt-4 text-center ${contentClassName}`}>
              <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
              {item.subtitle && (
                <p className="text-gray-500 dark:text-gray-400">{item.subtitle}</p>
              )}
              {item.date && (
                <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${dateClassName}`}>
                  {item.date} {item.time && <span>{item.time}</span>}
                </p>
              )}
              {item.content && (
                <div className="mt-2">{item.content}</div>
              )}
            </div>
          </div>
        );
      }
      
      return (
        <div 
          key={item.id} 
          className={`
            relative flex 
            ${contentAlign === 'right' ? 'flex-row' : 'flex-row-reverse'}
            ${itemClassName}
          `}
        >
          {/* Timeline Line */}
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div 
              className={`
                relative z-10 flex items-center justify-center rounded-full 
                ${iconBgColor} ${sizeClasses.icon} ${iconClassName}
              `}
            >
              {item.icon || (
                <span className="text-white">{index + 1}</span>
              )}
            </div>
            
            {/* Connector */}
            {showConnector && (
              <div 
                className={`
                  ${sizeClasses.line} flex-grow 
                  border-l-2 h-full absolute top-${iconSize === 'lg' ? '10' : iconSize === 'sm' ? '6' : '8'}
                  ${lineStyleClass}
                  ${isDashed ? 'border-dashed' : ''}
                  ${isHighlighted ? 'border-primary-500 dark:border-primary-400' : 'border-gray-200 dark:border-gray-700'}
                  ${lineColor ? `border-${lineColor}` : ''}
                  ${connectorClassName}
                `}
              />
            )}
          </div>
          
          {/* Content */}
          <div className={`
            flex-1 
            ${contentAlign === 'right' ? 'ml-4' : 'mr-4'} 
            ${contentClassName}
          `}>
            <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
            {item.subtitle && (
              <p className="text-gray-500 dark:text-gray-400">{item.subtitle}</p>
            )}
            {item.date && (
              <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${dateClassName}`}>
                {item.date} {item.time && <span>{item.time}</span>}
              </p>
            )}
            {item.content && (
              <div className="mt-2">{item.content}</div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={`
      ${orientation === 'horizontal' ? 'flex' : ''}
      ${orientation === 'horizontal' ? sizeClasses.horizontalGap : sizeClasses.gap}
      ${className}
    `}>
      {renderItems()}
    </div>
  );
};

export default Timeline;