"use client";

import React, { useState, useCallback } from 'react';

export interface TreeItemData {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  children?: TreeItemData[];
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  customContent?: React.ReactNode;
  data?: any; // Optional data that can be associated with the item
}

export interface TreeViewProps {
  items: TreeItemData[];
  defaultExpanded?: boolean;
  defaultSelected?: string | number | null;
  multiSelect?: boolean;
  showIcons?: boolean;
  dense?: boolean;
  variant?: 'default' | 'folder' | 'custom';
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  selectedClassName?: string;
  expandIconClassName?: string;
  disabledClassName?: string;
  contentContainerClassName?: string;
  onNodeSelect?: (item: TreeItemData, event: React.MouseEvent) => void;
  onNodeToggle?: (item: TreeItemData, expanded: boolean) => void;
}

const TreeView = ({
  items,
  defaultExpanded = false,
  defaultSelected = null,
  multiSelect = false,
  showIcons = true,
  dense = false,
  variant = 'default',
  className = '',
  itemClassName = '',
  labelClassName = '',
  iconClassName = '',
  selectedClassName = '',
  expandIconClassName = '',
  disabledClassName = '',
  contentContainerClassName = '',
  onNodeSelect,
  onNodeToggle,
}: TreeViewProps) => {
  // State for expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<Record<string | number, boolean>>(
    items.reduce((acc, item) => {
      if (item.expanded !== undefined) {
        acc[item.id] = item.expanded;
      } else {
        acc[item.id] = defaultExpanded;
      }
      
      if (item.children) {
        item.children.forEach(child => {
          if (child.expanded !== undefined) {
            acc[child.id] = child.expanded;
          } else {
            acc[child.id] = defaultExpanded;
          }
        });
      }
      
      return acc;
    }, {} as Record<string | number, boolean>)
  );

  // State for selected nodes
  const [selectedNodes, setSelectedNodes] = useState<Record<string | number, boolean>>(
    items.reduce((acc, item) => {
      if (item.selected) {
        acc[item.id] = true;
      } else if (defaultSelected === item.id) {
        acc[item.id] = true;
      }
      
      if (item.children) {
        item.children.forEach(child => {
          if (child.selected) {
            acc[child.id] = true;
          } else if (defaultSelected === child.id) {
            acc[child.id] = true;
          }
        });
      }
      
      return acc;
    }, {} as Record<string | number, boolean>)
  );

  // Toggle expanded state of a node
  const toggleNode = useCallback((id: string | number, item: TreeItemData) => {
    setExpandedNodes(prev => {
      const newState = {
        ...prev,
        [id]: !prev[id]
      };
      
      if (onNodeToggle) {
        onNodeToggle(item, !prev[id]);
      }
      
      return newState;
    });
  }, [onNodeToggle]);

  // Handle node selection
  const handleSelect = useCallback((item: TreeItemData, event: React.MouseEvent) => {
    if (item.disabled) return;
    
    setSelectedNodes(prev => {
      let newState = { ...prev };
      
      if (multiSelect && event.ctrlKey) {
        // Toggle selection for Ctrl+click
        newState[item.id] = !prev[item.id];
      } else if (multiSelect && event.shiftKey) {
        // For Shift+click, let's keep it simple and just select the current item
        newState[item.id] = true;
      } else {
        // Single selection (clear others)
        newState = { [item.id]: true };
      }
      
      if (onNodeSelect) {
        onNodeSelect(item, event);
      }
      
      return newState;
    });
  }, [multiSelect, onNodeSelect]);

  // Get icon based on variant
  const getItemIcon = (item: TreeItemData, isExpanded: boolean) => {
    if (item.icon) {
      return item.icon;
    }
    
    if (variant === 'folder') {
      if (item.children && item.children.length > 0) {
        return isExpanded ? (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
            <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        );
      }
      
      return (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    }
    
    return null;
  };

  // Get expand icon
  const getExpandIcon = (isExpanded: boolean) => {
    return isExpanded ? (
      <svg className={`w-5 h-5 text-gray-400 ${expandIconClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    ) : (
      <svg className={`w-5 h-5 text-gray-400 ${expandIconClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    );
  };

  // Render a tree item
  const renderTreeItem = (item: TreeItemData, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedNodes[item.id] || false;
    const isSelected = selectedNodes[item.id] || false;
    const isDisabled = item.disabled || false;
    
    return (
      <li key={item.id} className={`${itemClassName}`}>
        <div 
          className={`
            flex items-center 
            ${dense ? 'py-1' : 'py-2'} 
            ${isSelected 
              ? `bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 ${selectedClassName}` 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
            ${isDisabled 
              ? `opacity-50 cursor-not-allowed ${disabledClassName}` 
              : 'cursor-pointer'
            }
            px-2 rounded-md
          `}
          style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
          onClick={(e) => handleSelect(item, e)}
        >
          {/* Expand/Collapse button for nodes with children */}
          {hasChildren && (
            <span 
              className="inline-flex items-center justify-center w-6 h-6"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(item.id, item);
              }}
            >
              {getExpandIcon(isExpanded)}
            </span>
          )}
          
          {/* Indentation for nodes without children */}
          {!hasChildren && <span className="w-6" />}
          
          {/* Item icon */}
          {showIcons && (
            <span className={`mr-2 flex items-center ${iconClassName}`}>
              {getItemIcon(item, isExpanded)}
            </span>
          )}
          
          {/* Item content */}
          <div className={`flex-1 ${contentContainerClassName}`}>
            {/* Use custom content if provided */}
            {item.customContent ? (
              item.customContent
            ) : (
              <span className={`${labelClassName}`}>{item.label}</span>
            )}
          </div>
        </div>
        
        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <ul className="list-none">
            {item.children!.map(child => renderTreeItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className={`list-none p-0 ${className}`}>
      {items.map(item => renderTreeItem(item))}
    </ul>
  );
};

export default TreeView;
