"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import DropZone from '@/components/ui/drop-zone/DropZone';

export interface FileUploadProps {
  onUpload?: (files: File[]) => void;
  onDelete?: (fileIndex: number) => void;
  accept?: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  label?: string;
  showFileList?: boolean;
  className?: string;
  fileListClassName?: string;
  // Mock upload functionality - in a real app, these would be actual API handlers
  simulateUpload?: boolean;
  uploadDelay?: number; // simulated upload time in ms
  autoUpload?: boolean;
}

export interface FileWithStatus extends File {
  id: string;
  progress: number;
  status: 'queued' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
}

const FileUpload = ({
  onUpload,
  onDelete,
  accept = [],
  multiple = true,
  maxFiles = 0,
  maxSize = 0,
  disabled = false,
  label = 'Drag & drop files here, or click to select files',
  showFileList = true,
  className = '',
  fileListClassName = '',
  simulateUpload = true,
  uploadDelay = 2000,
  autoUpload = true,
}: FileUploadProps) => {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const uploadTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      Object.values(uploadTimeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  // Handle drop zone errors
  const handleError = ({ type, message }: { type: string; message: string }) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  // Convert regular files to files with status
  const convertToFilesWithStatus = (newFiles: File[]): FileWithStatus[] => {
    return newFiles.map(file => ({
      ...file,
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      progress: 0,
      status: 'queued',
    }));
  };

  // Handle file drop
  const handleDrop = useCallback((droppedFiles: File[]) => {
    // If maxFiles is set and exceeded, limit the number of files
    const filesToProcess = maxFiles > 0 && multiple
      ? droppedFiles.slice(0, maxFiles - files.length)
      : droppedFiles;
    
    if (filesToProcess.length === 0) return;
    
    const filesWithStatus = convertToFilesWithStatus(filesToProcess);
    
    // Update state with new files
    setFiles(prevFiles => {
      const updatedFiles = multiple ? [...prevFiles, ...filesWithStatus] : filesWithStatus;
      
      // Automatically trigger upload for the new files if autoUpload is true
      if (autoUpload) {
        filesWithStatus.forEach(file => simulateFileUpload(file));
      }
      
      if (onUpload) {
        onUpload(updatedFiles);
      }
      
      return updatedFiles;
    });
  }, [files, maxFiles, multiple, autoUpload, onUpload, simulateUpload]);

  // Simulate file upload with progress
  const simulateFileUpload = useCallback((file: FileWithStatus) => {
    if (!simulateUpload) return;
    
    // Update file status to uploading
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === file.id ? { ...f, status: 'uploading' } : f
      )
    );
    
    let progress = 0;
    const interval = 100; // Update progress every 100ms
    const incrementPerInterval = (interval / uploadDelay) * 100;
    
    const progressInterval = setInterval(() => {
      progress += incrementPerInterval;
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        progress = 100;
        
        // Simulate potential failure (10% chance)
        const shouldFail = Math.random() < 0.1;
        
        setFiles(prevFiles => 
          prevFiles.map(f => 
            f.id === file.id 
              ? { 
                  ...f, 
                  progress: 100, 
                  status: shouldFail ? 'error' : 'success',
                  errorMessage: shouldFail ? 'Failed to upload file' : undefined 
                } 
              : f
          )
        );
      } else {
        setFiles(prevFiles => 
          prevFiles.map(f => 
            f.id === file.id ? { ...f, progress } : f
          )
        );
      }
    }, interval);
    
    uploadTimeoutsRef.current[file.id] = progressInterval as unknown as NodeJS.Timeout;
    
    return () => clearInterval(progressInterval);
  }, [simulateUpload, uploadDelay]);

  // Start upload for all queued files
  const startUpload = useCallback(() => {
    const queuedFiles = files.filter(file => file.status === 'queued');
    queuedFiles.forEach(file => simulateFileUpload(file));
  }, [files, simulateFileUpload]);

  // Retry uploading a failed file
  const retryUpload = useCallback((fileId: string) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === fileId ? { ...f, progress: 0, status: 'queued', errorMessage: undefined } : f
      )
    );
    
    const fileToRetry = files.find(f => f.id === fileId);
    if (fileToRetry) {
      simulateFileUpload(fileToRetry);
    }
  }, [files, simulateFileUpload]);

  // Delete a file from the list
  const deleteFile = useCallback((fileId: string) => {
    const fileIndex = files.findIndex(f => f.id === fileId);
    
    if (fileIndex !== -1) {
      // Clear any ongoing upload simulation
      if (uploadTimeoutsRef.current[fileId]) {
        clearTimeout(uploadTimeoutsRef.current[fileId]);
        delete uploadTimeoutsRef.current[fileId];
      }
      
      setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
      
      if (onDelete) {
        onDelete(fileIndex);
      }
    }
  }, [files, onDelete]);

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on file type
  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (file.type.startsWith('image/')) {
      return (
        <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    
    switch (extension) {
      case 'pdf':
        return (
          <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'xls':
      case 'xlsx':
        return (
          <svg className="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'zip':
      case 'rar':
      case '7z':
        return (
          <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <DropZone
        onDrop={handleDrop}
        accept={accept}
        multiple={multiple}
        maxFiles={maxFiles}
        maxSize={maxSize}
        disabled={disabled}
        label={label}
        onError={handleError}
      />

      {errorMessage && (
        <div className="mt-2 p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      {!autoUpload && files.some(file => file.status === 'queued') && (
        <div className="mt-3">
          <button
            type="button"
            onClick={startUpload}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Start Upload
          </button>
        </div>
      )}

      {showFileList && files.length > 0 && (
        <div className={`mt-4 ${fileListClassName}`}>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Files ({files.length})
          </h4>
          <ul className="space-y-3">
            {files.map((file) => (
              <li 
                key={file.id} 
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center ml-4">
                  {/* Progress indicator */}
                  {file.status === 'uploading' && (
                    <div className="w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-3">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Status indicator */}
                  {file.status === 'success' && (
                    <span className="flex items-center text-green-600 dark:text-green-400 mr-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}

                  {file.status === 'error' && (
                    <div className="flex items-center">
                      <span className="text-red-600 dark:text-red-400 mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        onClick={() => retryUpload(file.id)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Retry upload"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => deleteFile(file.id)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    title="Remove file"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
