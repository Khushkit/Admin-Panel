"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Drawer from "@/components/ui/drawer/Drawer";
import Image from "next/image";

const DrawerPage = () => {
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [topDrawerOpen, setTopDrawerOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  return (
    <>
      <PageBreadcrumb pageTitle="Drawer Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Drawer */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Right Side Drawer
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A basic drawer that slides in from the right side of the screen.
            </p>
            <div>
              <button
                onClick={() => setRightDrawerOpen(true)}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Right Drawer
              </button>

              <Drawer
                isOpen={rightDrawerOpen}
                onClose={() => setRightDrawerOpen(false)}
                position="right"
                size="300px"
                title="Right Side Drawer"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    This is a basic drawer that slides in from the right side of the screen.
                    It can be used for forms, details, or any content that doesn't require
                    a full-page view.
                  </p>
                  <div className="bg-gray-100 p-4 rounded-md dark:bg-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can close this drawer by:
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>Clicking the X button</li>
                      <li>Clicking outside the drawer</li>
                      <li>Pressing the ESC key</li>
                    </ul>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>

        {/* Left Drawer */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Left Side Drawer
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drawer that slides in from the left side, commonly used for navigation.
            </p>
            <div>
              <button
                onClick={() => setLeftDrawerOpen(true)}
                className="rounded-md bg-info-500 px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Left Drawer
              </button>

              <Drawer
                isOpen={leftDrawerOpen}
                onClose={() => setLeftDrawerOpen(false)}
                position="left"
                size="300px"
                title="Left Side Drawer"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    This drawer slides in from the left side of the screen.
                    Left drawers are often used for navigation menus or filters.
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <span className="ml-3">Dashboard</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <span className="ml-3">Users</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <span className="ml-3">Settings</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>

        {/* Top Drawer */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Top Drawer
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drawer that slides down from the top of the screen.
            </p>
            <div>
              <button
                onClick={() => setTopDrawerOpen(true)}
                className="rounded-md bg-success-500 px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Top Drawer
              </button>

              <Drawer
                isOpen={topDrawerOpen}
                onClose={() => setTopDrawerOpen(false)}
                position="top"
                size="250px"
                title="Top Drawer"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    This drawer slides down from the top of the screen.
                    Top drawers can be used for notifications, alerts, or quick actions.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-100 rounded-md text-center dark:bg-gray-700">
                      <p className="font-medium text-gray-800 dark:text-white">Action 1</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-md text-center dark:bg-gray-700">
                      <p className="font-medium text-gray-800 dark:text-white">Action 2</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-md text-center dark:bg-gray-700">
                      <p className="font-medium text-gray-800 dark:text-white">Action 3</p>
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>

        {/* Bottom Drawer */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Bottom Drawer
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drawer that slides up from the bottom of the screen, similar to a mobile sheet.
            </p>
            <div>
              <button
                onClick={() => setBottomDrawerOpen(true)}
                className="rounded-md bg-warning-500 px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Bottom Drawer
              </button>

              <Drawer
                isOpen={bottomDrawerOpen}
                onClose={() => setBottomDrawerOpen(false)}
                position="bottom"
                size="300px"
                title="Bottom Drawer"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    This drawer slides up from the bottom of the screen.
                    Bottom drawers are common in mobile interfaces and can be used for additional options or details.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex space-x-3">
                      <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                        Cancel
                      </button>
                      <button className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>

        {/* Form Drawer */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Form Drawer
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drawer containing a form, useful for creating or editing content without leaving the current page.
            </p>
            <div>
              <button
                onClick={() => setFormDrawerOpen(true)}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Form Drawer
              </button>

              <Drawer
                isOpen={formDrawerOpen}
                onClose={() => setFormDrawerOpen(false)}
                position="right"
                size="400px"
                title="Create New User"
                footer={
                  <div className="flex justify-end">
                    <button
                      onClick={() => setFormDrawerOpen(false)}
                      className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 mr-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert('Form submitted!');
                        setFormDrawerOpen(false);
                      }}
                      className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      Save
                    </button>
                  </div>
                }
              >
                <form className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Role
                    </label>
                    <select
                      id="role"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <option value="user">User</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                </form>
              </Drawer>
            </div>
          </div>
        </div>

        {/* Navigation Drawer */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Navigation Drawer
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A drawer designed for site navigation, similar to a mobile navigation menu.
            </p>
            <div>
              <button
                onClick={() => setNavDrawerOpen(true)}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Navigation Drawer
              </button>

              <Drawer
                isOpen={navDrawerOpen}
                onClose={() => setNavDrawerOpen(false)}
                position="left"
                size="280px"
                contentClassName="p-0"
              >
                <div className="flex flex-col">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Image
                          src="/images/logo/logo-icon.svg"
                          alt="Logo"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Dashboard
                      </h3>
                    </div>
                  </div>
                  
                  <nav className="flex-1 p-2">
                    <ul className="space-y-1">
                      <li>
                        <a href="#" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Dashboard</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span>Users</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <span>Inbox</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Settings</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                  
                  <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
                    <a href="#" className="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group p-2">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </a>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerPage;
