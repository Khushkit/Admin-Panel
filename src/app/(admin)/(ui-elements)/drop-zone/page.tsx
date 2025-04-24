"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DropZone from "@/components/ui/drop-zone/DropZone";

const DropZonePage = () => {
  const [basicFiles, setBasicFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Format bytes to human-readable format
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Handle drop zone errors
  const handleError = ({ type, message }: { type: string; message: string }) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Drop Zone Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Drop Zone */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Drop Zone
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A simple drag and drop zone for uploading files with no restrictions.
            </p>
            <DropZone
              onDrop={(files) => setBasicFiles(files)}
              multiple={true}
            />
            {basicFiles.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Uploaded Files ({basicFiles.length})
                </h5>
                <ul className="space-y-2">
                  {basicFiles.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      {file.name} - {formatBytes(file.size)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Image Drop Zone */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Image Drop Zone with Preview
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drop zone that accepts only image files and shows previews.
            </p>
            <DropZone
              onDrop={(files) => setImageFiles(files)}
              accept={['.jpg', '.jpeg', '.png', '.gif', 'image/*']}
              multiple={true}
              maxSize={5 * 1024 * 1024} // 5MB
              label="Drag & drop images here, or click to select"
              showPreview={true}
              onError={handleError}
            />
            {errorMessage && (
              <div className="mt-2 p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400 rounded-md text-sm">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Document Drop Zone */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Document Drop Zone
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drop zone that accepts only document files with file restrictions.
            </p>
            <DropZone
              onDrop={(files) => setDocumentFiles(files)}
              accept={['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', 'application/pdf']}
              multiple={true}
              maxFiles={3}
              maxSize={10 * 1024 * 1024} // 10MB
              label="Upload documents (PDF, Word, Excel, PowerPoint)"
              icon={
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              onError={handleError}
            />
            {documentFiles.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Uploaded Documents ({documentFiles.length}/3)
                </h5>
                <ul className="space-y-2">
                  {documentFiles.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {file.name} - {formatBytes(file.size)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Disabled Drop Zone */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Disabled Drop Zone
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drop zone in a disabled state.
            </p>
            <DropZone
              onDrop={(files) => {}}
              disabled={true}
              label="This drop zone is disabled"
            />
          </div>
        </div>

        {/* Styled Drop Zone */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Styled Drop Zone
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drop zone with custom styling and behavior.
            </p>
            <DropZone
              onDrop={(files) => setBasicFiles(files)}
              multiple={true}
              className="border-primary-300 dark:border-primary-700 rounded-xl"
              activeClassName="bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 border-primary-500"
              disabledClassName="bg-gray-200 dark:bg-gray-900"
              label="Drop files here or click to upload"
              icon={
                <div className="p-3 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 rounded-full mb-2">
                  <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              }
            />
          </div>
        </div>

        {/* Single File Uploader */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Single File Uploader
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drop zone that only accepts a single file at a time.
            </p>
            <DropZone
              onDrop={(files) => setBasicFiles(files)}
              multiple={false}
              label="Drop a single file here or click to upload"
              showPreview={true}
            />
          </div>
        </div>

        {/* Real-World Example */}
        <div className="col-span-1 xl:col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Profile Photo Upload Example
          </h4>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Use the drop zone below to upload a profile photo. Only image files are accepted.
                </p>
                <DropZone
                  onDrop={(files) => {
                    if (files.length > 0) {
                      setImageFiles([files[0]]);
                    }
                  }}
                  multiple={false}
                  accept={['.jpg', '.jpeg', '.png', 'image/*']}
                  maxSize={2 * 1024 * 1024} // 2MB
                  label="Upload profile photo"
                  showPreview={false}
                  onError={handleError}
                  className="border-gray-300 dark:border-gray-600"
                />
                {errorMessage && (
                  <div className="mt-2 p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400 rounded-md text-sm">
                    {errorMessage}
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Allowed formats: JPG, PNG. Max size: 2MB
                </p>
              </div>
            </div>
            
            <div className="md:w-2/3 flex flex-col">
              <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Profile Information
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropZonePage;
