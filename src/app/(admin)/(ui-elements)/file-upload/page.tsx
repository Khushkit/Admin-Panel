"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FileUpload from "@/components/ui/file-upload/FileUpload";
import Card from "@/components/ui/cards/Card";

const FileUploadPage = () => {
  const [basicFiles, setBasicFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  return (
    <>
      <PageBreadcrumb pageTitle="File Upload Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic File Upload */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic File Upload
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A simple file upload component with progress tracking and status indicators.
              </p>
              <FileUpload
                onUpload={(files) => setBasicFiles(files)}
                multiple={true}
                simulateUpload={true}
                uploadDelay={2000}
              />
            </div>
          </div>
        </Card>

        {/* Image Upload with Preview */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Image Upload
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload only image files with validation and file size restrictions.
              </p>
              <FileUpload
                onUpload={(files) => setImageFiles(files)}
                accept={['.jpg', '.jpeg', '.png', '.gif', 'image/*']}
                multiple={true}
                maxSize={5 * 1024 * 1024} // 5MB
                label="Upload images (max 5MB)"
                simulateUpload={true}
                uploadDelay={2500}
              />
            </div>
          </div>
        </Card>

        {/* Document Upload */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Document Upload
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload document files with a limit on the number of files.
              </p>
              <FileUpload
                onUpload={(files) => setDocumentFiles(files)}
                accept={['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']}
                multiple={true}
                maxFiles={3}
                maxSize={10 * 1024 * 1024} // 10MB
                label="Upload documents (PDF, Word, Excel, PowerPoint)"
                simulateUpload={true}
                uploadDelay={3000}
              />
            </div>
          </div>
        </Card>

        {/* Manual Upload */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Manual Upload Control
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A file upload component that lets users manually start the upload process.
              </p>
              <FileUpload
                onUpload={(files) => setBasicFiles(files)}
                multiple={true}
                simulateUpload={true}
                uploadDelay={1500}
                autoUpload={false}
                label="Select files to upload (click 'Start Upload' when ready)"
              />
            </div>
          </div>
        </Card>

        {/* Single File Upload */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Single File Upload
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                File upload component that only accepts a single file at a time.
              </p>
              <FileUpload
                onUpload={(files) => setBasicFiles(files)}
                multiple={false}
                simulateUpload={true}
                uploadDelay={2000}
                label="Upload a single file"
              />
            </div>
          </div>
        </Card>

        {/* Upload with Error Handling */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Upload with Error Simulation
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This upload has a higher chance of simulating errors to demonstrate error handling.
              </p>
              <FileUpload
                onUpload={(files) => setBasicFiles(files)}
                multiple={true}
                simulateUpload={true}
                uploadDelay={1000}
                label="Upload files (some may fail)"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Note: This example simulates random upload failures for demonstration purposes.
                Failed uploads can be retried by clicking the retry button.
              </div>
            </div>
          </div>
        </Card>

        {/* File Upload in a Form */}
        <Card className="xl:col-span-2 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              File Upload in a Form
            </h4>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="flex flex-col gap-5">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Example of integrating file upload within a form.
                  </p>
                  <FileUpload
                    onUpload={(files) => setBasicFiles(files)}
                    multiple={true}
                    simulateUpload={true}
                    uploadDelay={2000}
                    label="Upload project files"
                    maxFiles={5}
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 flex flex-col">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="project-name"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="Enter project name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Description
                    </label>
                    <textarea
                      id="project-description"
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="Describe your project"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="project-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      id="project-category"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <option value="">Select a category</option>
                      <option value="design">Design</option>
                      <option value="development">Development</option>
                      <option value="marketing">Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="public-project"
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800"
                    />
                    <label htmlFor="public-project" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Make this project public
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      Submit Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FileUploadPage;
