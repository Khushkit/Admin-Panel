"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Popover from "@/components/ui/popover/Popover";

const PopoverPage = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Popover" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Popovers */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Basic Popovers
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Simple popovers triggered by a click.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Popover
              trigger={
                <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
                  Click me
                </button>
              }
              content={
                <div className="w-48">
                  <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Popover Title</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This is a basic popover with some content.
                  </p>
                </div>
              }
            />

            <Popover
              trigger={
                <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  Info Popover
                </button>
              }
              content={
                <div className="w-64">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                      <svg className="h-4 w-4 text-blue-500 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Information</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This popover provides additional information to help users understand a feature or function.
                  </p>
                </div>
              }
              position="bottom"
            />
          </div>
        </div>

        {/* Positions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Popover Positions
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Popovers can be positioned in different directions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Popover
              trigger={
                <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  Top
                </button>
              }
              content={
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This popover appears on top.
                </p>
              }
              position="top"
            />

            <Popover
              trigger={
                <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  Right
                </button>
              }
              content={
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This popover appears on the right.
                </p>
              }
              position="right"
            />

            <Popover
              trigger={
                <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  Bottom
                </button>
              }
              content={
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This popover appears on the bottom.
                </p>
              }
              position="bottom"
            />

            <Popover
              trigger={
                <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  Left
                </button>
              }
              content={
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This popover appears on the left.
                </p>
              }
              position="left"
            />
          </div>
        </div>

        {/* Hover Popovers */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Hover Popovers
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Popovers that appear when hovering over a trigger.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Hover popovers are great for providing additional information without requiring a click.
              Try hovering over these items:
            </p>
            <div className="flex flex-wrap gap-4">
              <Popover
                trigger={
                  <span className="cursor-help text-gray-700 dark:text-gray-300 underline">
                    Hover for definition
                  </span>
                }
                content={
                  <div className="w-64">
                    <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Popover Component
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      A UI component that displays a popup box with content when triggered by user interaction.
                    </p>
                  </div>
                }
                triggerType="hover"
              />

              <Popover
                trigger={
                  <div className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-300">
                    <span>Annual Growth Rate</span>
                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                }
                content={
                  <div className="w-64">
                    <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Annual Growth Rate (AGR)
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      AGR is the percentage growth in a specific measure over one year. It is calculated by subtracting the previous value from the current value, dividing by the previous value, and multiplying by 100.
                    </p>
                  </div>
                }
                triggerType="hover"
                position="bottom"
              />
            </div>
          </div>
        </div>

        {/* Custom Content */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Rich Content Popovers
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Popovers with interactive content and rich formatting.
            </p>
          </div>

          <div className="flex justify-center">
            <Popover
              trigger={
                <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
                  Interactive Popover
                </button>
              }
              content={
                <div className="w-72">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Interactive Counter
                    </h3>
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                      Demo
                    </span>
                  </div>
                  <div className="py-3">
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                      This popover contains interactive elements that maintain their state.
                    </p>
                    <div className="text-center">
                      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        Count: {count}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                          onClick={() => setCount(count - 1)}
                        >
                          -
                        </button>
                        <button
                          className="rounded-md bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-800/40"
                          onClick={() => setCount(count + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                    <button
                      className="w-full rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      onClick={() => setCount(0)}
                    >
                      Reset Counter
                    </button>
                  </div>
                </div>
              }
              closeOnClickOutside={false}
              width={280}
            />
          </div>
        </div>

        {/* No Arrow Example */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Application Examples
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Real-world examples of popovers in a UI context.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Profile Card */}
            <div className="flex items-center space-x-4">
              <Popover
                trigger={
                  <div className="h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                }
                content={
                  <div className="w-64">
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <img
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Emma Wilson
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Product Designer
                        </p>
                      </div>
                    </div>
                    <div className="mb-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                        <span>emma.wilson@example.com</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="rounded-md bg-primary-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-600">
                        View Profile
                      </button>
                      <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                        Message
                      </button>
                    </div>
                  </div>
                }
                position="bottom"
                align="start"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                  Emma Wilson
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Online
                </p>
              </div>
            </div>

            {/* Help Icon */}
            <div className="flex items-center">
              <div className="mr-3 rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <span className="text-sm text-gray-800 dark:text-white">
                  API Usage: 80%
                </span>
              </div>
              <Popover
                trigger={
                  <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                }
                content={
                  <div className="w-64">
                    <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      API Usage Information
                    </h3>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                      You've used 80% of your monthly API quota. Usage resets on the 1st of next month.
                    </p>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="absolute left-0 top-0 h-full w-4/5 bg-amber-500"></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Consider upgrading your plan for additional capacity.
                    </p>
                  </div>
                }
                triggerType="hover"
                position="left"
              />
            </div>

            {/* Notification Bell */}
            <div>
              <Popover
                trigger={
                  <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      3
                    </span>
                  </button>
                }
                content={
                  <div className="w-80">
                    <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                      <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                        3 new
                      </span>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <div className="border-b border-gray-200 py-3 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                            <svg className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                              <span className="font-medium">System:</span> Deployment completed successfully
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              10 minutes ago
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 py-3 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                            <svg className="h-6 w-6 text-green-500 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                              <span className="font-medium">Task:</span> Monthly reports generated
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              1 hour ago
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 p-1 dark:bg-amber-900/30">
                            <svg className="h-6 w-6 text-amber-500 dark:text-amber-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                              <span className="font-medium">Warning:</span> Disk usage exceeds 80%
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              3 hours ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                      <button className="w-full text-center text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        View all notifications
                      </button>
                    </div>
                  </div>
                }
                position="bottom"
                align="end"
                arrow={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopoverPage;
