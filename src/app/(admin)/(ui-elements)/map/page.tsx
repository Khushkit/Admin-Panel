"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CountryMap from "@/components/ecommerce/CountryMap";
// Metadata cannot be exported from client components

const MapPage = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Map Component" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Default Map */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              World Map
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Interactive world map with selectable regions and custom markers.
            </p>
          </div>

          <div className="flex h-125 flex-col items-center justify-center">
            <div
              id="mapOne"
              className="mapOne map-btn h-[350px] w-full dark:bg-white/[0.03]"
            >
              <CountryMap />
            </div>
          </div>
        </div>

        {/* Custom Color Map */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Custom Color Map
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Map with custom region colors.
            </p>
          </div>

          <div className="flex h-125 flex-col items-center justify-center">
            <div
              id="mapTwo"
              className="mapOne map-btn h-[350px] w-full dark:bg-white/[0.03]"
            >
              <CountryMap mapColor="#e5e7eb" />
            </div>
          </div>
        </div>

        {/* Blue Theme Map */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Blue Theme Map
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Map with blue color scheme.
            </p>
          </div>

          <div className="flex h-125 flex-col items-center justify-center">
            <div
              id="mapThree"
              className="mapOne map-btn h-[350px] w-full dark:bg-white/[0.03]"
            >
              <CountryMap mapColor="#dbeafe" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapPage;
