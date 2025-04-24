"use client";

import React, { useState, useEffect } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProgressBar from "@/components/ui/progress-bar/ProgressBar";

const ProgressBarPage = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simulate download progress
  useEffect(() => {
    const timer = setInterval(() => {
      setDownloadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Simulate upload progress with a delay
  useEffect(() => {
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          // Random increment between 5 and 15
          return prevProgress + Math.floor(Math.random() * 10) + 5;
        });
      }, 1500);

      return () => {
        clearInterval(timer);
      };
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Progress Bar" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Progress Bars */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Basic Progress Bars
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Simple progress indicators with different values.
            </p>
          </div>

          <div className="space-y-6">
            <ProgressBar value={25} />
            <ProgressBar value={50} />
            <ProgressBar value={75} />
            <ProgressBar value={100} />
          </div>
        </div>

        {/* Progress Bar Variants */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Progress Bar Variants
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Different color variants for various statuses.
            </p>
          </div>

          <div className="space-y-6">
            <ProgressBar value={70} variant="primary" />
            <ProgressBar value={70} variant="success" />
            <ProgressBar value={70} variant="warning" />
            <ProgressBar value={70} variant="danger" />
            <ProgressBar value={70} variant="info" />
          </div>
        </div>

        {/* Progress Bars with Labels */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Progress Bars with Labels
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Progress bars with descriptive labels and values.
            </p>
          </div>

          <div className="space-y-6">
            <ProgressBar value={30} label="Basic Task" showValue />
            <ProgressBar 
              value={45} 
              label="Project Completion" 
              showValue 
              variant="success" 
            />
            <ProgressBar 
              value={80} 
              label="Storage Usage" 
              showValue 
              variant="warning" 
            />
            <ProgressBar 
              value={65} 
              max={200} 
              label="Custom Max Value" 
              showValue 
            />
          </div>
        </div>

        {/* Styled Progress Bars */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Styled Progress Bars
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Striped and animated progress bars.
            </p>
          </div>

          <div className="space-y-6">
            <ProgressBar 
              value={40} 
              label="Striped" 
              striped 
              variant="primary" 
            />
            <ProgressBar 
              value={60} 
              label="Animated" 
              animated 
              variant="info" 
            />
            <ProgressBar 
              value={75} 
              label="Striped & Animated" 
              striped 
              animated 
              variant="success" 
            />
            <ProgressBar 
              value={50} 
              height={16} 
              label="Custom Height" 
              variant="primary" 
            />
          </div>
        </div>

        {/* Live Progress Example */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Live Progress Example
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Interactive progress bars showing simulated file operations.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Downloading project_files.zip
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {downloadProgress < 100 
                      ? `${downloadProgress}% - ${Math.round(downloadProgress * 1.2)} MB / 120 MB` 
                      : "Download complete"}
                  </p>
                </div>
                {downloadProgress < 100 ? (
                  <span className="text-xs font-medium text-blue-500 dark:text-blue-400">
                    Downloading...
                  </span>
                ) : (
                  <span className="text-xs font-medium text-green-500 dark:text-green-400">
                    Complete
                  </span>
                )}
              </div>
              <ProgressBar 
                value={downloadProgress} 
                height={8} 
                variant={downloadProgress < 100 ? "primary" : "success"} 
                animated={downloadProgress < 100}
              />
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Uploading presentation.pptx
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {uploadProgress < 100 
                      ? `${uploadProgress}% - ${Math.round(uploadProgress * 0.45)} MB / 45 MB` 
                      : "Upload complete"}
                  </p>
                </div>
                {uploadProgress === 0 ? (
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Waiting...
                  </span>
                ) : uploadProgress < 100 ? (
                  <span className="text-xs font-medium text-blue-500 dark:text-blue-400">
                    Uploading...
                  </span>
                ) : (
                  <span className="text-xs font-medium text-green-500 dark:text-green-400">
                    Complete
                  </span>
                )}
              </div>
              <ProgressBar 
                value={uploadProgress} 
                height={8} 
                variant={uploadProgress === 0 ? "info" : uploadProgress < 100 ? "primary" : "success"} 
                animated={uploadProgress > 0 && uploadProgress < 100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarPage;
