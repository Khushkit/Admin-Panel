"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Tooltip from "@/components/ui/tooltip/Tooltip";

const TooltipPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tooltip" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Tooltips */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Basic Tooltips
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Simple tooltips with different positions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip content="Top tooltip">
              <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
                Hover me (Top)
              </button>
            </Tooltip>

            <Tooltip content="Right tooltip" position="right">
              <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
                Hover me (Right)
              </button>
            </Tooltip>

            <Tooltip content="Bottom tooltip" position="bottom">
              <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
                Hover me (Bottom)
              </button>
            </Tooltip>

            <Tooltip content="Left tooltip" position="left">
              <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
                Hover me (Left)
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Tooltip with Rich Content */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Rich Content Tooltips
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tooltips with formatted content and multiple lines.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip 
              content={
                <div className="space-y-1">
                  <p className="font-medium">User Profile</p>
                  <p className="text-xs">John Doe</p>
                  <p className="text-xs">john.doe@example.com</p>
                </div>
              }
            >
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                JD
              </div>
            </Tooltip>

            <Tooltip
              content={
                <div className="space-y-2">
                  <div className="font-medium">Project Status</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs">Completed: 8 tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-xs">In Progress: 3 tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="text-xs">Pending: 5 tasks</span>
                    </div>
                  </div>
                </div>
              }
              position="bottom"
              contentClassName="w-56"
            >
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                Project Status
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Tooltip without Arrow */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Tooltip without Arrow
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Simple tooltips without directional arrows.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip content="Top tooltip without arrow" arrow={false}>
              <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                No Arrow
              </button>
            </Tooltip>

            <Tooltip
              content="With delayed appearance"
              arrow={false}
              delay={1000}
            >
              <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Delayed (1s)
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Icon Tooltips */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Icon Tooltips
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tooltips displayed on icon hover.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <Tooltip content="Settings">
              <div className="cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                </svg>
              </div>
            </Tooltip>

            <Tooltip content="Notifications">
              <div className="cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </div>
            </Tooltip>

            <Tooltip content="User Profile">
              <div className="cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
            </Tooltip>

            <Tooltip content="Help">
              <div className="cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Interactive Example */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Practical Examples
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tooltips used in common UI components.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Form Example */}
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Form Field Tooltips
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500"
                      placeholder="Enter username"
                    />
                    <Tooltip content="Username must be 4-12 characters long and can only contain letters, numbers, and underscores.">
                      <div className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500"
                      placeholder="Enter password"
                    />
                    <Tooltip 
                      content={
                        <div className="space-y-1">
                          <p className="font-medium">Password requirements:</p>
                          <ul className="ml-4 list-disc text-xs">
                            <li>At least 8 characters</li>
                            <li>One uppercase letter</li>
                            <li>One lowercase letter</li>
                            <li>One number</li>
                            <li>One special character</li>
                          </ul>
                        </div>
                      }
                      position="left"
                    >
                      <div className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Example */}
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Dashboard Cards
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Revenue
                    </h5>
                    <Tooltip content="Total revenue this month">
                      <div className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    $24,543
                  </p>
                  <div className="mt-1 flex items-center text-xs">
                    <span className="text-green-500">↑ 12.5%</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">vs last month</span>
                  </div>
                </div>
                
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Users
                    </h5>
                    <Tooltip content="Active users this month">
                      <div className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    1,240
                  </p>
                  <div className="mt-1 flex items-center text-xs">
                    <span className="text-green-500">↑ 8.2%</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">vs last month</span>
                  </div>
                </div>
                
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Conversion
                    </h5>
                    <Tooltip 
                      content="Conversion rate from visitor to customer"
                      position="bottom"
                    >
                      <div className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    5.2%
                  </p>
                  <div className="mt-1 flex items-center text-xs">
                    <span className="text-red-500">↓ 1.1%</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">vs last month</span>
                  </div>
                </div>
                
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Avg Order
                    </h5>
                    <Tooltip 
                      content="Average order value per transaction"
                      position="bottom"
                    >
                      <div className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    $92.38
                  </p>
                  <div className="mt-1 flex items-center text-xs">
                    <span className="text-green-500">↑ 3.7%</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">vs last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipPage;
