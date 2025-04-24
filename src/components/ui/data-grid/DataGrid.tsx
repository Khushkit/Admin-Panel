"use client";

import React, { useState, useEffect } from 'react';

export interface Column<T = any> {
  key: string;
  header: React.ReactNode;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface DataGridProps<T = any> {
  columns: Column<T>[];
  data: T[];
  rowKey?: string | ((row: T) => string);
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: T, index: number) => void;
  emptyText?: React.ReactNode;
  loading?: boolean;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  cellClassName?: string | ((value: any, row: T, index: number, column: Column<T>) => string);
  selectable?: boolean;
  onSelectChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
}

const DataGrid = <T extends Record<string, any> = any>({
  columns,
  data,
  rowKey = 'id',
  pagination = false,
  pageSize = 10,
  onRowClick,
  emptyText = 'No data available',
  loading = false,
  bordered = false,
  striped = false,
  hoverable = true,
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
  selectable = false,
  onSelectChange,
}: DataGridProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Reset current page when data or pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length, pageSize]);

  // Get row key
  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    }
    return row[rowKey] || index.toString();
  };

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const keyA = a[sortConfig.key];
      const keyB = b[sortConfig.key];

      if (keyA === keyB) return 0;
      
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      return typeof keyA === 'string' && typeof keyB === 'string'
        ? keyA.localeCompare(keyB) * direction
        : (keyA > keyB ? 1 : -1) * direction;
    });
  }, [data, sortConfig]);

  // Handle sort
  const requestSort = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: 'asc' });
    } else if (sortConfig.direction === 'asc') {
      setSortConfig({ key, direction: 'desc' });
    } else {
      setSortConfig(null);
    }
  };

  // Handle row selection
  const handleSelectChange = (key: React.Key, checked: boolean) => {
    const newSelectedRowKeys = checked
      ? [...selectedRowKeys, key]
      : selectedRowKeys.filter(k => k !== key);
    
    setSelectedRowKeys(newSelectedRowKeys);
    
    if (onSelectChange) {
      const selectedRows = data.filter((row, index) => 
        newSelectedRowKeys.includes(getRowKey(row, index))
      );
      onSelectChange(newSelectedRowKeys, selectedRows);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = data.map((row, index) => getRowKey(row, index));
      setSelectedRowKeys(allKeys);
      if (onSelectChange) {
        onSelectChange(allKeys, [...data]);
      }
    } else {
      setSelectedRowKeys([]);
      if (onSelectChange) {
        onSelectChange([], []);
      }
    }
  };

  // Pagination logic
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  const totalPages = pagination ? Math.ceil(data.length / pageSize) : 1;

  const getClassName = (type: 'row' | 'cell', row?: T, index?: number, column?: Column<T>, value?: any): string => {
    if (type === 'row') {
      if (typeof rowClassName === 'function' && row !== undefined && index !== undefined) {
        return rowClassName(row, index);
      }
      return rowClassName as string;
    }
    
    if (type === 'cell') {
      if (typeof cellClassName === 'function' && row !== undefined && index !== undefined && column !== undefined && value !== undefined) {
        return cellClassName(value, row, index, column);
      }
      return cellClassName as string;
    }
    
    return '';
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Data Table */}
      <div className={`w-full overflow-x-auto ${loading ? 'opacity-60' : ''}`}>
        <table className={`w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''} ${className}`}>
          <thead className={`bg-gray-50 dark:bg-gray-800 ${headerClassName}`}>
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <input 
                    type="checkbox" 
                    checked={selectedRowKeys.length === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th 
                  key={index}
                  style={{ width: column.width }}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <button 
                        onClick={() => requestSort(column.key)}
                        className="ml-1 focus:outline-none"
                      >
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700`}>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);
                const isSelected = selectedRowKeys.includes(key);
                
                return (
                  <tr 
                    key={key}
                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                    className={`
                      ${onRowClick ? 'cursor-pointer' : ''}
                      ${striped && rowIndex % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                      ${hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : ''}
                      ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                      ${getClassName('row', row, rowIndex)}
                    `}
                  >
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={(e) => handleSelectChange(key, e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                      </td>
                    )}
                    {columns.map((column, colIndex) => {
                      const value = row[column.key];
                      const cellContent = column.render ? column.render(value, row, rowIndex) : value;
                      
                      return (
                        <td 
                          key={`${key}-${colIndex}`} 
                          className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 ${getClassName('cell', row, rowIndex, column, value)}`}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                  {loading ? (
                    <div className="flex justify-center">
                      <svg className="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : (
                    emptyText
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Next
            </button>
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{Math.min((currentPage - 1) * pageSize + 1, data.length)}</span>{' '}
                to <span className="font-medium">{Math.min(currentPage * pageSize, data.length)}</span>{' '}
                of <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  let pageNumber;
                  
                  // Calculate page numbers to display
                  if (totalPages <= 5) {
                    pageNumber = index + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + index;
                  } else {
                    pageNumber = currentPage - 2 + index;
                  }
                  
                  // Show ellipsis if necessary
                  if (totalPages > 5) {
                    if (pageNumber === 1 && currentPage > 3) {
                      return (
                        <React.Fragment key={index}>
                          <button
                            onClick={() => setCurrentPage(1)}
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            1
                          </button>
                          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            ...
                          </span>
                        </React.Fragment>
                      );
                    } 
                    
                    if (pageNumber === totalPages && currentPage < totalPages - 2) {
                      return (
                        <React.Fragment key={index}>
                          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            ...
                          </span>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            {totalPages}
                          </button>
                        </React.Fragment>
                      );
                    }
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                        currentPage === pageNumber
                          ? 'z-10 border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
