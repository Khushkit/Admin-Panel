"use client";

import React, { useState, useRef, useEffect } from "react";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  onChange?: (id: string) => void;
  variant?: "default" | "pills" | "underlined" | "bordered";
  fullWidth?: boolean;
  className?: string;
  tabClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  onChange,
  variant = "default",
  fullWidth = false,
  className = "",
  tabClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || (items[0]?.id || ""));
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeTabIndex = items.findIndex((item) => item.id === activeTab);
    if (activeTabIndex >= 0) {
      const tabElement = tabsRef.current[activeTabIndex];
      if (tabElement) {
        setIndicatorStyle({
          left: tabElement.offsetLeft,
          width: tabElement.offsetWidth,
        });
      }
    }
  }, [activeTab, items]);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  const getTabListClasses = () => {
    const baseClasses = "flex items-center";
    const variantClasses = {
      default: "border-b border-gray-200 dark:border-gray-700",
      pills: "space-x-2",
      underlined: "border-b border-gray-200 dark:border-gray-700",
      bordered: "border border-gray-200 dark:border-gray-700 rounded-lg p-1",
    };
    const widthClasses = fullWidth ? "w-full" : "";
    
    return `${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`;
  };

  const getTabClasses = (isActive: boolean, isDisabled: boolean = false) => {
    const baseClasses = "relative px-4 py-2 text-sm font-medium focus:outline-none transition-colors duration-200";
    
    const disabledClasses = isDisabled 
      ? "cursor-not-allowed text-gray-400 dark:text-gray-600" 
      : "cursor-pointer";
    
    const variantSpecificClasses = {
      default: `${isActive 
        ? "text-primary-600 dark:text-primary-400" 
        : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
      }`,
      pills: `${isActive 
        ? "bg-primary-600 text-white dark:bg-primary-500" 
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      } rounded-full`,
      underlined: `${isActive 
        ? "text-primary-600 dark:text-primary-400" 
        : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
      }`,
      bordered: `${isActive 
        ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm" 
        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
      } rounded-md`,
    };
    
    const widthClasses = fullWidth ? "flex-1 text-center" : "";
    
    return `${baseClasses} ${disabledClasses} ${variantSpecificClasses[variant]} ${widthClasses} ${tabClassName}`;
  };

  const renderTabIndicator = () => {
    if (variant !== "underlined") return null;
    
    return (
      <div 
        className="absolute bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    );
  };

  return (
    <div className="w-full">
      <div className={getTabListClasses()}>
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => (tabsRef.current[index] = el)}
            className={getTabClasses(activeTab === item.id, item.disabled)}
            onClick={() => !item.disabled && handleTabClick(item.id)}
            disabled={item.disabled}
            role="tab"
            aria-selected={activeTab === item.id}
            tabIndex={activeTab === item.id ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
        {renderTabIndicator()}
      </div>
      <div className="mt-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${activeTab === item.id ? "block" : "hidden"}`}
            role="tabpanel"
            aria-labelledby={item.id}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
