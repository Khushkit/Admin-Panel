"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RadioButton, { RadioGroup } from "@/components/ui/radio-button/RadioButton";

const RadioButtonPage = () => {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <>
      <PageBreadcrumb pageTitle="Radio Button Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Radio Buttons */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Radio Buttons
          </h4>
          <div className="flex flex-col gap-5">
            <RadioButton 
              name="basic-demo" 
              value="option1" 
              label="Default Radio Button" 
            />
            <RadioButton 
              name="basic-demo" 
              value="option2" 
              label="Checked Radio Button" 
              defaultChecked={true}
            />
            <RadioButton 
              name="basic-demo" 
              value="option3" 
              label="Disabled Radio Button" 
              disabled={true} 
            />
            <RadioButton 
              name="basic-demo-disabled" 
              value="option4" 
              label="Disabled Checked Radio Button" 
              disabled={true} 
              defaultChecked={true}
            />
          </div>
        </div>

        {/* Radio Button Variants */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Radio Button Variants
          </h4>
          <div className="flex flex-col gap-5">
            <RadioButton 
              name="variant-demo" 
              value="default" 
              label="Default Variant" 
              variant="default"
            />
            <RadioButton 
              name="variant-demo" 
              value="bordered" 
              label="Bordered Variant" 
              variant="bordered"
            />
            <RadioButton 
              name="variant-demo" 
              value="filled" 
              label="Filled Variant" 
              variant="filled"
            />
          </div>
        </div>

        {/* Radio Button Sizes */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Radio Button Sizes
          </h4>
          <div className="flex flex-col gap-5">
            <RadioButton 
              name="size-demo" 
              value="sm" 
              label="Small Size" 
              size="sm"
            />
            <RadioButton 
              name="size-demo" 
              value="md" 
              label="Medium Size (Default)" 
              size="md"
            />
            <RadioButton 
              name="size-demo" 
              value="lg" 
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
            <RadioButton 
              name="label-position-demo" 
              value="right" 
              label="Label on Right (Default)" 
              labelPosition="right"
            />
            <RadioButton 
              name="label-position-demo" 
              value="left" 
              label="Label on Left" 
              labelPosition="left"
            />
          </div>
        </div>

        {/* Controlled Radio Button */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Controlled Radio Button
          </h4>
          <div className="flex flex-col gap-5">
            <RadioButton 
              name="controlled-demo" 
              value="option1" 
              label="Option 1" 
              checked={selectedValue === 'option1'}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <RadioButton 
              name="controlled-demo" 
              value="option2" 
              label="Option 2" 
              checked={selectedValue === 'option2'}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <RadioButton 
              name="controlled-demo" 
              value="option3" 
              label="Option 3" 
              checked={selectedValue === 'option3'}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <p>Selected Value: <span className="font-semibold">{selectedValue}</span></p>
            </div>
          </div>
        </div>
        
        {/* Radio Group */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Radio Group - Vertical
          </h4>
          <RadioGroup
            name="radio-group-demo"
            value={selectedValue}
            onChange={setSelectedValue}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
              { value: 'option4', label: 'Option 4 (Disabled)', disabled: true }
            ]}
            orientation="vertical"
          />
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p>Selected Value: <span className="font-semibold">{selectedValue}</span></p>
          </div>
        </div>

        {/* Radio Group Horizontal */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Radio Group - Horizontal
          </h4>
          <RadioGroup
            name="radio-group-horizontal"
            value={selectedPlan}
            onChange={setSelectedPlan}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annually', label: 'Annually (Save 20%)' },
              { value: 'lifetime', label: 'Lifetime' }
            ]}
            orientation="horizontal"
            size="md"
          />
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p>Selected Plan: <span className="font-semibold">{selectedPlan}</span></p>
          </div>
        </div>

        {/* Custom Radio Button Styling */}
        <div className="col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Styled Radio Buttons
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <RadioButton 
                name="custom-color" 
                value="primary" 
                label="Primary Color" 
                className="text-primary-500 focus:ring-primary-500 dark:text-primary-400 dark:focus:ring-primary-400"
                defaultChecked
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <RadioButton 
                name="custom-color" 
                value="success" 
                label="Success Color" 
                className="text-success-500 focus:ring-success-500 dark:text-success-400 dark:focus:ring-success-400"
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <RadioButton 
                name="custom-color" 
                value="danger" 
                label="Danger Color" 
                className="text-danger-500 focus:ring-danger-500 dark:text-danger-400 dark:focus:ring-danger-400"
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <RadioButton 
                name="custom-color" 
                value="warning" 
                label="Warning Color" 
                className="text-warning-500 focus:ring-warning-500 dark:text-warning-400 dark:focus:ring-warning-400"
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <RadioButton 
                name="custom-color" 
                value="info" 
                label="Info Color" 
                className="text-info-500 focus:ring-info-500 dark:text-info-400 dark:focus:ring-info-400"
              />
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <RadioButton 
                name="custom-color" 
                value="custom" 
                label="Custom Format"
                labelClassName="font-bold text-gray-700 dark:text-gray-300" 
                className="h-6 w-6 text-purple-500 focus:ring-purple-500 dark:text-purple-400 dark:focus:ring-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Card Selection with Radio Buttons */}
        <div className="col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Card Selection with Radio Buttons
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Basic Plan */}
            <label className={`
              flex flex-col cursor-pointer p-4 rounded-lg border-2 
              ${selectedPlan === 'basic' 
                ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                : 'border-gray-200 dark:border-gray-700'}
            `}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-gray-900 dark:text-white">Basic Plan</span>
                <RadioButton
                  name="plan-selection"
                  value="basic"
                  checked={selectedPlan === 'basic'}
                  onChange={() => setSelectedPlan('basic')}
                  className="text-primary-500"
                />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">$9<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span></span>
              <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  1 User
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Basic Features
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  1GB Storage
                </li>
              </ul>
            </label>

            {/* Pro Plan */}
            <label className={`
              flex flex-col cursor-pointer p-4 rounded-lg border-2 
              ${selectedPlan === 'pro' 
                ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                : 'border-gray-200 dark:border-gray-700'}
            `}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-gray-900 dark:text-white">Pro Plan</span>
                <RadioButton
                  name="plan-selection"
                  value="pro"
                  checked={selectedPlan === 'pro'}
                  onChange={() => setSelectedPlan('pro')}
                  className="text-primary-500"
                />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">$29<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span></span>
              <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  5 Users
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  All Features
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  50GB Storage
                </li>
              </ul>
            </label>

            {/* Enterprise Plan */}
            <label className={`
              flex flex-col cursor-pointer p-4 rounded-lg border-2 
              ${selectedPlan === 'enterprise' 
                ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                : 'border-gray-200 dark:border-gray-700'}
            `}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-gray-900 dark:text-white">Enterprise</span>
                <RadioButton
                  name="plan-selection"
                  value="enterprise"
                  checked={selectedPlan === 'enterprise'}
                  onChange={() => setSelectedPlan('enterprise')}
                  className="text-primary-500"
                />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">$99<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span></span>
              <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Unlimited Users
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Premium Features
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  1TB Storage
                </li>
              </ul>
            </label>
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p>Selected Plan: <span className="font-semibold">{selectedPlan}</span></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RadioButtonPage;
