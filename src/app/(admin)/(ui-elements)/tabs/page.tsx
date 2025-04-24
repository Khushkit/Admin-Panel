"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Tabs from "@/components/ui/tabs/Tabs";

const TabsPage = () => {
  // Sample tab content
  const profileContent = (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300">
        This is the profile tab content. Here you can display user profile information,
        settings, and preferences.
      </p>
      <div className="flex items-center space-x-4 py-3">
        <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
          JD
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">John Doe</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
        </div>
      </div>
    </div>
  );

  const dashboardContent = (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300">
        This is the dashboard tab content. It typically shows analytics, stats, and other 
        important information at a glance.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <p className="text-xs text-blue-600 dark:text-blue-400">Users</p>
          <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">1,248</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
          <p className="text-xs text-green-600 dark:text-green-400">Revenue</p>
          <p className="text-lg font-semibold text-green-700 dark:text-green-300">$8.3k</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
          <p className="text-xs text-amber-600 dark:text-amber-400">Orders</p>
          <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">384</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <p className="text-xs text-red-600 dark:text-red-400">Returns</p>
          <p className="text-lg font-semibold text-red-700 dark:text-red-300">12</p>
        </div>
      </div>
    </div>
  );

  const settingsContent = (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300">
        This is the settings tab content. Here you can provide configuration options 
        for the user or application.
      </p>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-700 dark:text-gray-300">Enable notifications</span>
          <div className="relative h-5 w-10 rounded-full bg-gray-300 dark:bg-gray-600">
            <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow"></div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-700 dark:text-gray-300">Dark mode</span>
          <div className="relative h-5 w-10 rounded-full bg-primary-500">
            <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow"></div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-700 dark:text-gray-300">Auto-save</span>
          <div className="relative h-5 w-10 rounded-full bg-gray-300 dark:bg-gray-600">
            <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const helpContent = (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300">
        This is the help tab content. Here you can provide documentation, FAQs, or support
        information to assist users.
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
          <h4 className="font-medium text-gray-900 dark:text-white">How do I get started?</h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Begin by setting up your profile and exploring the dashboard features.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
          <h4 className="font-medium text-gray-900 dark:text-white">Can I export my data?</h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Yes, you can export your data in various formats from the settings page.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
          <h4 className="font-medium text-gray-900 dark:text-white">How do I contact support?</h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            You can reach our support team at support@example.com or via the chat widget.
          </p>
        </div>
      </div>
    </div>
  );

  // Tab items for different variants
  const defaultTabs = [
    {
      id: "profile",
      label: "Profile",
      content: profileContent,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      content: dashboardContent,
    },
    {
      id: "settings",
      label: "Settings",
      content: settingsContent,
    },
    {
      id: "help",
      label: "Help",
      content: helpContent,
    },
  ];

  const pillsTabs = [
    {
      id: "all",
      label: "All",
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Showing all items. This tab demonstrates the pills variant styling.
        </div>
      ),
    },
    {
      id: "active",
      label: "Active",
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Showing active items only. Pills provide a distinctive visual appearance.
        </div>
      ),
    },
    {
      id: "archived",
      label: "Archived",
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Showing archived items. Pills work well for filter-type interfaces.
        </div>
      ),
    },
  ];

  const borderedTabs = [
    {
      id: "details",
      label: "Details",
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Product details and specifications would be shown here.
        </div>
      ),
    },
    {
      id: "shipping",
      label: "Shipping",
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Shipping information and delivery options would be displayed in this tab.
        </div>
      ),
    },
    {
      id: "returns",
      label: "Returns",
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Return policy and procedures would be detailed here.
        </div>
      ),
    },
  ];

  const iconTabs = [
    {
      id: "home",
      label: (
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          Home
        </div>
      ),
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Home tab content with icon-based navigation.
        </div>
      ),
    },
    {
      id: "users",
      label: (
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
          </svg>
          Users
        </div>
      ),
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Users tab content with icon-based navigation.
        </div>
      ),
    },
    {
      id: "settings-icon",
      label: (
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
          </svg>
          Settings
        </div>
      ),
      content: (
        <div className="text-gray-700 dark:text-gray-300 py-4">
          Settings tab content with icon-based navigation.
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Tabs" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Default Tabs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Default Tabs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Standard tabs with underline indicator.
            </p>
          </div>

          <Tabs items={defaultTabs} variant="underlined" />
        </div>

        {/* Pills Tabs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Pills Tabs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tabs styled as pills, good for filters.
            </p>
          </div>

          <Tabs items={pillsTabs} variant="pills" />
        </div>

        {/* Bordered Tabs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Bordered Tabs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tabs with a border around the container.
            </p>
          </div>

          <Tabs items={borderedTabs} variant="bordered" />
        </div>

        {/* Full Width Tabs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Full Width Tabs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tabs that expand to fill the entire width.
            </p>
          </div>

          <Tabs 
            items={defaultTabs.slice(0, 3)} 
            variant="default" 
            fullWidth 
          />
        </div>

        {/* Tabs with Icons */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Tabs with Icons
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tabs that include icons alongside text.
            </p>
          </div>

          <Tabs items={iconTabs} variant="underlined" />
        </div>

        {/* Disabled Tab Example */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Tabs with Disabled State
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Example showing disabled tab state.
            </p>
          </div>

          <Tabs 
            items={[
              ...defaultTabs.slice(0, 2),
              {
                ...defaultTabs[2],
                disabled: true,
              },
              defaultTabs[3],
            ]} 
            variant="underlined" 
          />
        </div>
      </div>
    </div>
  );
};

export default TabsPage;
