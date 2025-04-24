"use client";

import React from "react";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";

const BreadcrumbPage = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Breadcrumb Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Breadcrumb */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Breadcrumb
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              A simple breadcrumb navigation with default settings.
            </p>
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800 dark:border dark:border-gray-700">
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'UI Elements', href: '#' },
                  { label: 'Breadcrumbs', active: true }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Custom Separator */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Separator
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Breadcrumbs can use different separators between items.
            </p>
            <div className="flex flex-col gap-4">
              <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800 dark:border dark:border-gray-700">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  separator=">"
                />
              </div>
              <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800 dark:border dark:border-gray-700">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  separator={
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  }
                />
              </div>
              <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800 dark:border dark:border-gray-700">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  separator="|"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styling */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Styling
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Breadcrumbs can be customized with different colors and styles.
            </p>
            <div className="flex flex-col gap-4">
              <div className="p-4 border-l-4 border-primary-500 rounded-md bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-primary-600 dark:text-primary-400"
                  itemClassName="text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  activeItemClassName="text-primary-700 font-semibold dark:text-primary-300"
                  separatorClassName="text-primary-400 dark:text-primary-600"
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-6 dark:border-gray-700">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-gray-600 dark:text-gray-300"
                  itemClassName="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                  activeItemClassName="text-gray-900 font-semibold dark:text-white"
                  separatorClassName="text-gray-400 dark:text-gray-600"
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-6 dark:border-gray-700">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  itemClassName="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                  activeItemClassName="text-gray-900 font-semibold dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* With Icons */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Breadcrumb with Icons
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Add icons to breadcrumbs for better visual cues.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-6 dark:border-gray-700">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li className="flex items-center">
                    <Link 
                      href="/"
                      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300 dark:hover:text-white/90 text-sm font-medium"
                    >
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
                    <Link 
                      href="#"
                      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300 dark:hover:text-white/90 text-sm font-medium"
                    >
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        <path d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V4a1 1 0 011-1z" />
                      </svg>
                      UI Elements
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
                    <span 
                      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white/90 text-sm font-medium"
                      aria-current="page"
                    >
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Breadcrumbs
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Responsive Breadcrumb */}
        <div className="rounded-sm border border-stroke bg-white dark:bg-gray-900 p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Responsive Breadcrumb
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300">
              Breadcrumbs that adapt to different screen sizes.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-6 dark:border-gray-700">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1 md:space-x-2">
                  <li className="flex items-center">
                    <Link 
                      href="/"
                      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300 dark:hover:text-white/90 text-sm font-medium"
                    >
                      <span className="hidden md:inline">Home</span>
                      <svg className="h-5 w-5 md:hidden" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-1 text-gray-400 dark:text-gray-600 md:mx-2">/</span>
                    <Link 
                      href="#"
                      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300 dark:hover:text-white/90 text-sm font-medium"
                    >
                      <span className="hidden md:inline">Components</span>
                      <span className="md:hidden">Comp</span>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-1 text-gray-400 dark:text-gray-600 md:mx-2">/</span>
                    <Link 
                      href="#"
                      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300 dark:hover:text-white/90 text-sm font-medium"
                    >
                      <span className="hidden md:inline">UI Elements</span>
                      <span className="md:hidden">UI</span>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-1 text-gray-400 dark:text-gray-600 md:mx-2">/</span>
                    <span 
                      className="text-gray-900 dark:text-white/90 text-sm font-medium"
                      aria-current="page"
                    >
                      Breadcrumbs
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Background Variants */}
        <div className="col-span-1 xl:col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Background Variants
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Breadcrumbs with different background styles for various UI contexts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md bg-primary-500 p-4">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-white"
                  itemClassName="text-white/80 hover:text-white"
                  activeItemClassName="text-white font-semibold"
                  separatorClassName="text-white/50"
                />
              </div>
              <div className="rounded-md bg-success-500 p-4">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-white"
                  itemClassName="text-white/80 hover:text-white"
                  activeItemClassName="text-white font-semibold"
                  separatorClassName="text-white/50"
                />
              </div>
              <div className="rounded-md bg-info-500 p-4">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-white"
                  itemClassName="text-white/80 hover:text-white"
                  activeItemClassName="text-white font-semibold"
                  separatorClassName="text-white/50"
                />
              </div>
              <div className="rounded-md bg-warning-500 p-4">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-white"
                  itemClassName="text-white/80 hover:text-white"
                  activeItemClassName="text-white font-semibold"
                  separatorClassName="text-white/50"
                />
              </div>
              <div className="rounded-md bg-danger-500 p-4">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-white"
                  itemClassName="text-white/80 hover:text-white"
                  activeItemClassName="text-white font-semibold"
                  separatorClassName="text-white/50"
                />
              </div>
              <div className="rounded-md bg-gray-800 p-4">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'UI Elements', href: '#' },
                    { label: 'Breadcrumbs', active: true }
                  ]}
                  className="text-white"
                  itemClassName="text-white/80 hover:text-white"
                  activeItemClassName="text-white font-semibold"
                  separatorClassName="text-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbPage;
