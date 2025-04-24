"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DatePicker from "@/components/ui/date-picker/DatePicker";

const DatePickerPage = () => {
  const [basicDate, setBasicDate] = useState<Date | undefined>(undefined);
  const [rangeStartDate, setRangeStartDate] = useState<Date | undefined>(undefined);
  const [rangeEndDate, setRangeEndDate] = useState<Date | undefined>(undefined);
  const [minMaxDate, setMinMaxDate] = useState<Date | undefined>(new Date());

  // Calculate min and max dates for demonstration
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  
  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(today.getMonth() + 1);

  // Format date for display
  const formatDate = (date: Date | undefined): string => {
    if (!date) return 'Not selected';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Date Picker Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Date Picker */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Date Picker
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A simple date picker with default settings.
            </p>
            <div className="mb-4">
              <DatePicker
                selectedDate={basicDate}
                onChange={setBasicDate}
                placeholder="Select a date"
                label="Basic Date Picker"
              />
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">Selected date: <span className="font-medium text-gray-700 dark:text-gray-300">{formatDate(basicDate)}</span></p>
            </div>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Date Range Picker
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Use two date pickers to create a date range selection.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                selectedDate={rangeStartDate}
                onChange={setRangeStartDate}
                placeholder="Start date"
                label="Start Date"
                maxDate={rangeEndDate}
              />
              <DatePicker
                selectedDate={rangeEndDate}
                onChange={setRangeEndDate}
                placeholder="End date"
                label="End Date"
                minDate={rangeStartDate}
              />
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Selected range: <span className="font-medium text-gray-700 dark:text-gray-300">
                  {formatDate(rangeStartDate)} - {formatDate(rangeEndDate)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Date Picker with Min/Max Dates */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Date Picker with Min/Max Dates
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A date picker with minimum and maximum allowed dates.
            </p>
            <div className="mb-4">
              <DatePicker
                selectedDate={minMaxDate}
                onChange={setMinMaxDate}
                placeholder="Select a date"
                label="Select Date (Limited Range)"
                minDate={oneWeekAgo}
                maxDate={oneMonthLater}
              />
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You can only select dates between <span className="font-medium text-gray-700 dark:text-gray-300">{formatDate(oneWeekAgo)}</span> and <span className="font-medium text-gray-700 dark:text-gray-300">{formatDate(oneMonthLater)}</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Date Picker with Different Format */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Date Picker with Different Format
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A date picker with a custom date format.
            </p>
            <div className="mb-4">
              <DatePicker
                selectedDate={basicDate}
                onChange={setBasicDate}
                placeholder="DD/MM/YYYY"
                label="Date with Custom Format"
                format="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>

        {/* Date Picker States */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Date Picker States
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Date pickers in different states: disabled, with error, and required.
            </p>
            <div className="space-y-6">
              <DatePicker
                selectedDate={new Date()}
                placeholder="Disabled date picker"
                label="Disabled Date Picker"
                disabled
              />
              
              <DatePicker
                selectedDate={undefined}
                placeholder="Date with error"
                label="Date Picker with Error"
                error="This field is required"
              />
              
              <DatePicker
                selectedDate={undefined}
                placeholder="Required date picker"
                label="Required Date Picker"
                required
              />
            </div>
          </div>
        </div>

        {/* Custom Styled Date Picker */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Styled Date Picker
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A date picker with custom styling applied to the input and calendar.
            </p>
            <div className="space-y-6">
              <DatePicker
                selectedDate={basicDate}
                onChange={setBasicDate}
                placeholder="Select a date"
                label="Primary Themed Date Picker"
                inputClassName="border-primary-500 focus:border-primary-600 focus:ring-primary-600"
                labelClassName="text-primary-600 dark:text-primary-400"
              />
              
              <DatePicker
                selectedDate={basicDate}
                onChange={setBasicDate}
                placeholder="Select a date"
                label="Rounded Date Picker"
                inputClassName="rounded-full px-4"
              />
            </div>
          </div>
        </div>

        {/* Form with Date Pickers */}
        <div className="col-span-1 xl:col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Form with Date Pickers
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Example of a form using date pickers for different fields.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="formTitle" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Title
                </label>
                <input
                  type="text"
                  id="formTitle"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                  placeholder="Enter event title"
                />
              </div>
              
              <DatePicker
                selectedDate={rangeStartDate}
                onChange={setRangeStartDate}
                placeholder="Start date"
                label="Event Start Date"
                required
              />
              
              <DatePicker
                selectedDate={rangeEndDate}
                onChange={setRangeEndDate}
                placeholder="End date"
                label="Event End Date"
                required
              />
              
              <div className="md:col-span-2">
                <label htmlFor="formDescription" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Description
                </label>
                <textarea
                  id="formDescription"
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                  placeholder="Enter event description"
                ></textarea>
              </div>
              
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePickerPage;
