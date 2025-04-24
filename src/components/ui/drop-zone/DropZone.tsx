"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';

export interface DropZoneProps {
  onDrop: (files: File[]) => void;
  accept?: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  minSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
  activeClassName?: string;
  disabledClassName?: string;
  children?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  showPreview?: boolean;
  previewClassName?: string;
  onError?: (error: { type: string; message: string }) => void;
}

const DropZone = ({
  onDrop,
  accept = [],
  multiple = true,
  maxFiles = 0, // 0 means unlimited
  maxSize = 0, // 0 means unlimited
  minSize = 0,
  disabled = false,
  className = '',
  activeClassName = '',
  disabledClassName = '',
  children,
  label = 'Drag & drop files here, or click to select files',
  icon,
  showPreview = false,
  previewClassName = '',
  onError
}: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const defaultIcon = (
    <svg 
      className="w-12 h-12 text-gray-400" 
      aria-hidden="true" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 20 16"
    >
      <path 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
      />
    </svg>
  );

  const handleError = useCallback((type: string, message: string) => {
    if (onError) {
      onError({ type, message });
    }
  }, [onError]);

  const validateFile = useCallback((file: File): boolean => {
    // Check file type if accept array is not empty
    if (accept.length > 0) {
      const fileType = file.type;
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      
      const isAcceptableType = accept.some(type => {
        // Check if it's a mime type (contains '/')
        if (type.includes('/')) {
          return fileType === type || 
                 (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '/')));
        }
        // Check if it's a file extension
        return type.toLowerCase() === fileExt;
      });

      if (!isAcceptableType) {
        handleError('accept', `File type ${fileType} is not accepted`);
        return false;
      }
    }

    // Check file size
    if (maxSize > 0 && file.size > maxSize) {
      handleError('maxSize', `File size ${file.size} exceeds maximum size of ${maxSize} bytes`);
      return false;
    }

    if (minSize > 0 && file.size < minSize) {
      handleError('minSize', `File size ${file.size} is less than minimum size of ${minSize} bytes`);
      return false;
    }

    return true;
  }, [accept, maxSize, minSize, handleError]);

  const handleFiles = useCallback((newFiles: File[]) => {
    if (disabled) return;

    // Validate max files
    if (maxFiles > 0 && (files.length + newFiles.length) > maxFiles) {
      handleError('maxFiles', `Maximum number of files exceeded (${maxFiles})`);
      return;
    }

    // Filter valid files
    const validFiles = newFiles.filter(validateFile);
    
    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onDrop(updatedFiles);
    }
  }, [disabled, maxFiles, files, validateFile, multiple, onDrop, handleError]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isDragging) {
      setIsDragging(true);
    }
  }, [disabled, isDragging]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!disabled) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    }
  }, [disabled, handleFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const fileList = Array.from(selectedFiles);
      handleFiles(fileList);
    }
  }, [handleFiles]);

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const removeFile = useCallback((index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onDrop(newFiles);
  }, [files, onDrop]);

  // Generate previews for files
  useEffect(() => {
    if (!showPreview) return;

    // Create preview URLs
    const fileURLs = files.map(file => {
      // Only create previews for images
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return '';
    });
    
    setPreviews(fileURLs);
    
    // Clean up URLs on unmount
    return () => {
      fileURLs.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [files, showPreview]);

  // Determine the appropriate class names
  const dropzoneClasses = `
    ${className} 
    ${isDragging ? activeClassName : ''} 
    ${disabled ? disabledClassName : ''}
  `;

  const baseClassName = `
    flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg
    ${isDragging 
      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-10' 
      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'}
    ${disabled 
      ? 'opacity-60 cursor-not-allowed' 
      : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'}
    transition-all duration-200 ease-in-out
    ${dropzoneClasses}
  `;

  return (
    <div className="flex flex-col w-full">
      <div
        className={baseClassName}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        aria-disabled={disabled}
      >
        {icon || defaultIcon}

        <div className="mt-3 text-center">
          {children || (
            <>
              <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                {label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {accept.length > 0 && `Accepted files: ${accept.join(', ')}`}
                {maxSize > 0 && ` • Max size: ${(maxSize / (1024 * 1024)).toFixed(2)} MB`}
                {maxFiles > 0 && ` • Max files: ${maxFiles}`}
              </p>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept.join(',')}
          multiple={multiple}
          onChange={handleFileInputChange}
          disabled={disabled}
        />
      </div>

      {/* File preview section */}
      {showPreview && files.length > 0 && (
        <div className={`mt-4 ${previewClassName}`}>
          <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Selected files ({files.length})
          </h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {files.map((file, index) => (
              <div 
                key={`${file.name}-${index}`} 
                className="relative border rounded-lg overflow-hidden"
              >
                {file.type.startsWith('image/') && previews[index] ? (
                  <div className="relative h-24 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={previews[index]}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="p-2 text-xs truncate">{file.name}</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-1 right-1 bg-gray-900 bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
