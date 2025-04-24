"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Switch from "@/components/ui/switch/Switch";

const SwitchPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [updates, setUpdates] = useState(true);
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Switch" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Switch */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Basic Switch
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Default switch component in different sizes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <Switch size="sm" />
              <Switch />
              <Switch size="lg" />
            </div>
            <div className="flex items-center gap-8">
              <Switch size="sm" checked={true} />
              <Switch checked={true} />
              <Switch size="lg" checked={true} />
            </div>
          </div>
        </div>

        {/* Disabled Switch */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Disabled Switch
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Disabled switch states.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <Switch disabled />
              <Switch disabled checked={true} />
            </div>
          </div>
        </div>

        {/* Switch with Label */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Switch with Label
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Switch components with labels in different positions.
            </p>
          </div>

          <div className="space-y-4">
            <Switch label="Enable notifications" />
            <Switch label="Accept marketing emails" labelPosition="left" />
          </div>
        </div>

        {/* Interactive Example */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Interactive Example
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Functional switches that update state.
            </p>
          </div>

          <div className="space-y-4">
            <Switch 
              label="Push Notifications" 
              checked={notifications} 
              onChange={setNotifications} 
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 pl-6 mt-1">
              {notifications ? 'You will receive push notifications' : 'Push notifications are disabled'}
            </div>
            
            <Switch 
              label="Marketing Emails" 
              checked={marketing} 
              onChange={setMarketing} 
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 pl-6 mt-1">
              {marketing ? 'You will receive marketing emails' : 'Marketing emails are disabled'}
            </div>
            
            <Switch 
              label="Product Updates" 
              checked={updates} 
              onChange={setUpdates} 
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 pl-6 mt-1">
              {updates ? 'You will receive product updates' : 'Product updates are disabled'}
            </div>
          </div>
        </div>

        {/* Settings Panel Example */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Settings Panel Example
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Usage example in a settings panel context.
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Browser Notifications
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications directly in your browser.
                </p>
              </div>
              <Switch checked={notifications} onChange={setNotifications} />
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Email Marketing
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive emails about new products and offers.
                </p>
              </div>
              <Switch checked={marketing} onChange={setMarketing} />
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                  System Updates
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Be notified when important system updates are available.
                </p>
              </div>
              <Switch checked={updates} onChange={setUpdates} />
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Dark Mode
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle between light and dark theme.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchPage;
