"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Select, { SelectOption } from "@/components/ui/select/Select";
import Card from "@/components/ui/cards/Card";

const SelectPage = () => {
  const [basicValue, setBasicValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<string>('');
  const [searchableValue, setSearchableValue] = useState<string>('');
  const [groupedValue, setGroupedValue] = useState<string>('');
  
  // Sample options
  const basicOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'grape', label: 'Grape' },
  ];
  
  const userOptions: SelectOption[] = [
    { 
      value: 'john', 
      label: 'John Doe',
      subLabel: 'john@example.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      value: 'jane', 
      label: 'Jane Smith',
      subLabel: 'jane@example.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      value: 'robert', 
      label: 'Robert Johnson',
      subLabel: 'robert@example.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
  ];
  
  const countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States', subLabel: 'North America' },
    { value: 'ca', label: 'Canada', subLabel: 'North America' },
    { value: 'mx', label: 'Mexico', subLabel: 'North America' },
    { value: 'br', label: 'Brazil', subLabel: 'South America' },
    { value: 'ar', label: 'Argentina', subLabel: 'South America' },
    { value: 'gb', label: 'United Kingdom', subLabel: 'Europe' },
    { value: 'de', label: 'Germany', subLabel: 'Europe' },
    { value: 'fr', label: 'France', subLabel: 'Europe' },
    { value: 'in', label: 'India', subLabel: 'Asia' },
    { value: 'cn', label: 'China', subLabel: 'Asia' },
    { value: 'jp', label: 'Japan', subLabel: 'Asia' },
    { value: 'au', label: 'Australia', subLabel: 'Oceania' },
    { value: 'nz', label: 'New Zealand', subLabel: 'Oceania' },
  ];
  
  // Group countries by continent
  const groupByContinent = (option: SelectOption) => {
    return option.subLabel || 'Other';
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Select Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Select */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Select
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Basic dropdown select with different variants and states.
              </p>

              <div className="space-y-6">
                <Select
                  label="Default Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  value={basicValue}
                  onChange={setBasicValue}
                  helperText="This is a default select with helper text"
                />

                <Select
                  label="Outlined Select (Default)"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  variant="outlined"
                />

                <Select
                  label="Filled Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  variant="filled"
                />

                <Select
                  label="Underlined Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  variant="underlined"
                />

                <Select
                  label="Disabled Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  disabled
                />

                <Select
                  label="With Error"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  error="This field has an error message"
                />

                <Select
                  label="Required Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  required
                />

                <Select
                  label="With Floating Label"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  labelPosition="floating"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Select Sizes & Shapes */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Select Sizes & Shapes
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select dropdowns with different sizes and border radius options.
              </p>

              <div className="space-y-6">
                <Select
                  label="Small Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  size="sm"
                />

                <Select
                  label="Medium Select (Default)"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  size="md"
                />

                <Select
                  label="Large Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  size="lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Rounded Small"
                    placeholder="Choose a fruit"
                    options={basicOptions}
                    rounded="sm"
                  />

                  <Select
                    label="Rounded Full"
                    placeholder="Choose a fruit"
                    options={basicOptions}
                    rounded="full"
                  />
                </div>

                <Select
                  label="Full Width Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Select Features */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Advanced Select Features
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select dropdowns with advanced features like clearable, searchable, and with icons.
              </p>

              <div className="space-y-6">
                <Select
                  label="Clearable Select"
                  placeholder="Choose a fruit"
                  options={basicOptions}
                  clearable
                />

                <Select
                  label="Searchable Select"
                  placeholder="Search users..."
                  options={userOptions}
                  searchable
                  value={searchableValue}
                  onChange={setSearchableValue}
                />

                <Select
                  label="Select with Icons"
                  placeholder="Select a user"
                  options={userOptions}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                />

                <Select
                  label="With Sub-labels"
                  placeholder="Select a country"
                  options={countryOptions.slice(0, 5)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Multiple & Grouped Select */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Multiple & Grouped Select
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select dropdowns that allow multiple selections and options grouped by category.
              </p>

              <div className="space-y-6">
                <Select
                  label="Multiple Select"
                  placeholder="Select fruits"
                  options={basicOptions}
                  multiple
                  value={multiValue}
                  onChange={setMultiValue}
                  helperText="You can select multiple options"
                />

                <Select
                  label="Multiple Select with Limit"
                  placeholder="Select up to 2 fruits"
                  options={basicOptions}
                  multiple
                  maxItems={2}
                  helperText="You can select up to 2 options"
                />

                <Select
                  label="Grouped Options"
                  placeholder="Select a country"
                  options={countryOptions}
                  groupBy={groupByContinent}
                  value={groupedValue}
                  onChange={setGroupedValue}
                />

                <Select
                  label="Multiple with Search"
                  placeholder="Search and select countries"
                  options={countryOptions}
                  multiple
                  searchable
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form with Selects */}
        <div className="xl:col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Form with Select Fields
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A complete form example using various select components.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Country"
                    placeholder="Select country"
                    options={countryOptions}
                    searchable
                    required
                  />
                  
                  <Select
                    label="Language"
                    placeholder="Select language"
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                      { value: 'de', label: 'German' },
                      { value: 'zh', label: 'Chinese' },
                    ]}
                    required
                  />
                </div>
                
                <Select
                  label="Interests"
                  placeholder="Select your interests"
                  options={[
                    { value: 'tech', label: 'Technology' },
                    { value: 'health', label: 'Health & Fitness' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'art', label: 'Art & Culture' },
                    { value: 'sports', label: 'Sports' },
                    { value: 'travel', label: 'Travel' },
                    { value: 'food', label: 'Food & Cooking' },
                  ]}
                  multiple
                  searchable
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Select
                    label="Day"
                    placeholder="Day"
                    options={Array.from({ length: 31 }, (_, i) => ({
                      value: (i + 1).toString(),
                      label: (i + 1).toString(),
                    }))}
                  />
                  
                  <Select
                    label="Month"
                    placeholder="Month"
                    options={[
                      { value: '1', label: 'January' },
                      { value: '2', label: 'February' },
                      { value: '3', label: 'March' },
                      { value: '4', label: 'April' },
                      { value: '5', label: 'May' },
                      { value: '6', label: 'June' },
                      { value: '7', label: 'July' },
                      { value: '8', label: 'August' },
                      { value: '9', label: 'September' },
                      { value: '10', label: 'October' },
                      { value: '11', label: 'November' },
                      { value: '12', label: 'December' },
                    ]}
                  />
                  
                  <Select
                    label="Year"
                    placeholder="Year"
                    options={Array.from({ length: 50 }, (_, i) => ({
                      value: (2025 - i).toString(),
                      label: (2025 - i).toString(),
                    }))}
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 mr-2 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPage;
