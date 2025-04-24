"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Checkbox from "@/components/ui/checkbox/Checkbox";

const CheckboxPage = () => {
  const [checked, setChecked] = useState(false);
  const [groupValues, setGroupValues] = useState({
    option1: false,
    option2: true,
    option3: false,
  });

  return (
    <>
      <PageBreadcrumb pageTitle="Checkbox Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Checkboxes */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Checkboxes
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded dark:border dark:border-gray-700">
              Basic checkbox options with different states.
            </p>
            <Checkbox 
              label="Default Checkbox" 
              onChange={(checked) => console.log("Checkbox state:", checked)} 
            />
            <Checkbox 
              label="Checked Checkbox" 
              defaultChecked={true}
            />
            <Checkbox 
              label="Disabled Checkbox" 
              disabled={true} 
            />
            <Checkbox 
              label="Disabled Checked Checkbox" 
              disabled={true} 
              defaultChecked={true}
            />
            <Checkbox 
              label="Indeterminate Checkbox" 
              indeterminate={true} 
            />
          </div>
        </div>

        {/* Checkbox Variants */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Checkbox Variants
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded dark:border dark:border-gray-700">
              Basic checkbox options with different states.
            </p>
            <Checkbox 
              label="Default Variant" 
              variant="default"
            />
            <Checkbox 
              label="Bordered Variant" 
              variant="bordered"
            />
            <Checkbox 
              label="Filled Variant" 
              variant="filled"
            />
          </div>
        </div>

        {/* Checkbox Sizes */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Checkbox Sizes
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded dark:border dark:border-gray-700">
              Basic checkbox options with different states.
            </p>
            <Checkbox 
              label="Small Size" 
              size="sm"
            />
            <Checkbox 
              label="Medium Size (Default)" 
              size="md"
            />
            <Checkbox 
              label="Large Size" 
              size="lg"
            />
          </div>
        </div>

        {/* Label Positions */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Label Positions
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded dark:border dark:border-gray-700">
              Basic checkbox options with different states.
            </p>
            <Checkbox 
              label="Label on Right (Default)" 
              labelPosition="right"
            />
            <Checkbox 
              label="Label on Left" 
              labelPosition="left"
            />
          </div>
        </div>

        {/* Controlled Checkbox */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Controlled Checkbox
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded dark:border dark:border-gray-700">
              Basic checkbox options with different states.
            </p>
            <Checkbox 
              label={`Controlled Checkbox (${checked ? 'Checked' : 'Unchecked'})`}
              checked={checked}
              onChange={setChecked}
            />
            <div className="mt-2">
              <button
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                onClick={() => setChecked(!checked)}
              >
                Toggle Checkbox
              </button>
            </div>
          </div>
        </div>
        
        {/* Checkbox Group */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Checkbox Group
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded dark:border dark:border-gray-700">
              Basic checkbox options with different states.
            </p>
            <Checkbox 
              label="Option 1"
              checked={groupValues.option1}
              onChange={(checked) => setGroupValues({...groupValues, option1: checked})}
            />
            <Checkbox 
              label="Option 2"
              checked={groupValues.option2}
              onChange={(checked) => setGroupValues({...groupValues, option2: checked})}
            />
            <Checkbox 
              label="Option 3"
              checked={groupValues.option3}
              onChange={(checked) => setGroupValues({...groupValues, option3: checked})}
            />
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md dark:border dark:border-gray-700">
              <h5 className="mb-2 font-medium dark:text-gray-100">Selected Options:</h5>
              <pre className="text-sm dark:text-gray-300">
                {JSON.stringify(
                  Object.entries(groupValues)
                    .filter(([_, value]) => value)
                    .map(([key]) => key),
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Custom Styling */}
        <div className="col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Styled Checkboxes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800">
              <Checkbox 
                label="Primary Color" 
                className="text-primary-500 focus:ring-primary-500 dark:text-primary-400 dark:focus:ring-primary-400"
                defaultChecked
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800">
              <Checkbox 
                label="Success Color" 
                className="text-success-500 focus:ring-success-500 dark:text-success-400 dark:focus:ring-success-400"
                defaultChecked
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800">
              <Checkbox 
                label="Danger Color" 
                className="text-danger-500 focus:ring-danger-500 dark:text-danger-400 dark:focus:ring-danger-400"
                defaultChecked
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800">
              <Checkbox 
                label="Warning Color" 
                className="text-warning-500 focus:ring-warning-500 dark:text-warning-400 dark:focus:ring-warning-400"
                defaultChecked
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800">
              <Checkbox 
                label="Info Color" 
                className="text-info-500 focus:ring-info-500 dark:text-info-400 dark:focus:ring-info-400"
                defaultChecked
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800">
              <Checkbox 
                label="Custom Format"
                labelClassName="font-bold text-gray-700 dark:text-gray-300" 
                className="rounded-full h-6 w-6 text-purple-500 focus:ring-purple-500 dark:text-purple-400 dark:focus:ring-purple-400"
                defaultChecked
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckboxPage;
