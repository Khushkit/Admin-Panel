"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/ui/pagination/Pagination";

const PaginationPage = () => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(5);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(3);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [currentPage6, setCurrentPage6] = useState(1);
  
  // Mock data for table example
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "User" },
    { id: 5, name: "Robert Brown", email: "robert@example.com", role: "Editor" },
  ];
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Pagination" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Default Pagination */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Default Pagination
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Standard pagination with page numbers and navigation controls.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Pagination
              currentPage={currentPage1}
              totalPages={10}
              onPageChange={setCurrentPage1}
            />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Current page: {currentPage1}
            </p>
          </div>
        </div>

        {/* Pagination Sizes */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Pagination Sizes
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Small, medium, and large pagination components.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Small</p>
              <Pagination
                currentPage={currentPage2}
                totalPages={10}
                onPageChange={setCurrentPage2}
                size="sm"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Medium (Default)</p>
              <Pagination
                currentPage={currentPage2}
                totalPages={10}
                onPageChange={setCurrentPage2}
                size="md"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Large</p>
              <Pagination
                currentPage={currentPage2}
                totalPages={10}
                onPageChange={setCurrentPage2}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Pagination Variants */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Pagination Variants
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Different styles of pagination components.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Default</p>
              <Pagination
                currentPage={currentPage3}
                totalPages={10}
                onPageChange={setCurrentPage3}
                variant="default"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Rounded</p>
              <Pagination
                currentPage={currentPage3}
                totalPages={10}
                onPageChange={setCurrentPage3}
                variant="rounded"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Simple</p>
              <Pagination
                currentPage={currentPage3}
                totalPages={10}
                onPageChange={setCurrentPage3}
                variant="simple"
              />
            </div>
          </div>
        </div>

        {/* Pagination Configuration */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Pagination Configuration
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Customizable pagination with different options.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Without First/Last Buttons</p>
              <Pagination
                currentPage={currentPage4}
                totalPages={10}
                onPageChange={setCurrentPage4}
                showFirstLastButtons={false}
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Without Prev/Next Buttons</p>
              <Pagination
                currentPage={currentPage4}
                totalPages={10}
                onPageChange={setCurrentPage4}
                showPrevNextButtons={false}
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">With Larger Sibling Count</p>
              <Pagination
                currentPage={currentPage4}
                totalPages={20}
                onPageChange={setCurrentPage4}
                siblingCount={2}
              />
            </div>
          </div>
        </div>

        {/* Pagination with Table */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Table with Pagination
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Example of pagination with a data table.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-transparent">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing page {currentPage5} of 10
            </div>
            <Pagination
              currentPage={currentPage5}
              totalPages={10}
              onPageChange={setCurrentPage5}
              size="sm"
            />
          </div>
        </div>

        {/* Pagination with Cards */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Cards with Pagination
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Example of pagination with card-based content.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-3 h-32 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <h4 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Item {item} (Page {currentPage6})
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This is a sample card item to demonstrate pagination.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage6}
              totalPages={5}
              onPageChange={setCurrentPage6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationPage;
