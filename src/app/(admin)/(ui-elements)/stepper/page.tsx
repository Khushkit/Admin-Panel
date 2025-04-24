"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Stepper, { StepData } from "@/components/ui/stepper/Stepper";
import Card from "@/components/ui/cards/Card";

const StepperPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [verticalStep, setVerticalStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  // Basic stepper steps
  const basicSteps: StepData[] = [
    {
      id: 1,
      title: 'Step 1',
      subtitle: 'First step',
      content: (
        <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">This is the content for step 1.</p>
        </div>
      )
    },
    {
      id: 2,
      title: 'Step 2',
      subtitle: 'Second step',
      content: (
        <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">This is the content for step 2.</p>
        </div>
      )
    },
    {
      id: 3,
      title: 'Step 3',
      subtitle: 'Third step',
      content: (
        <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">This is the content for step 3.</p>
        </div>
      )
    }
  ];

  // Checkout stepper steps
  const checkoutSteps: StepData[] = [
    {
      id: 'account',
      title: 'Account Details',
      content: (
        <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
        </div>
      ),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'address',
      title: 'Shipping Address',
      content: (
        <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'payment',
      title: 'Payment Details',
      content: (
        <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Card Number
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                placeholder="XXXX XXXX XXXX XXXX"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  placeholder="MM/YY"
                  value={formData.expDate}
                  onChange={(e) => setFormData({...formData, expDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  placeholder="XXX"
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'confirm',
      title: 'Confirmation',
      content: (
        <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h2>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Review your order details before confirming your purchase.
            </p>
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">$99.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">$4.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">$8.32</span>
              </div>
              <div className="flex justify-between font-medium pt-2">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-primary-600 dark:text-primary-400">$112.31</span>
              </div>
            </div>
            <button className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600">
              Complete Order
            </button>
          </div>
        </div>
      ),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
  ];

  // Vertical stepper steps
  const verticalSteps: StepData[] = [
    {
      id: 'select',
      title: 'Select Campaign Settings',
      subtitle: 'Select type, location, and budget',
      content: (
        <div className="p-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Choose the type of campaign you want to create, select target locations and set your budget.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Campaign Type
              </label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <option>Brand Awareness</option>
                <option>Website Traffic</option>
                <option>Lead Generation</option>
                <option>Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Budget
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                placeholder="Enter budget amount"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'create',
      title: 'Create Ad Group',
      subtitle: 'Create your ad group',
      content: (
        <div className="p-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Create your ad group and define your target audience for this campaign.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ad Group Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                placeholder="Enter ad group name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Audience
              </label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <option>18-24 years</option>
                <option>25-34 years</option>
                <option>35-44 years</option>
                <option>45+ years</option>
              </select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'design',
      title: 'Create Ad',
      subtitle: 'Design your advertisement',
      content: (
        <div className="p-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Design your advertisement by uploading images and writing ad copy.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ad Title
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                placeholder="Enter ad title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ad Description
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                placeholder="Enter ad description"
                rows={3}
              />
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Stepper Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Stepper */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-2">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Stepper
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A basic horizontal stepper with navigation controls.
              </p>
              
              <Stepper
                steps={basicSteps}
                activeStep={activeStep}
                onChange={setActiveStep}
                showControls
              />
            </div>
          </div>
        </Card>

        {/* Stepper Variants */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Stepper Variants
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Different visual styles for steppers.
              </p>
              
              <div className="space-y-8">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Default Variant
                  </h5>
                  <Stepper
                    steps={[
                      { id: 1, title: 'Step 1' },
                      { id: 2, title: 'Step 2' },
                      { id: 3, title: 'Step 3' },
                    ]}
                    activeStep={1}
                  />
                </div>
                
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Outlined Variant
                  </h5>
                  <Stepper
                    steps={[
                      { id: 1, title: 'Step 1' },
                      { id: 2, title: 'Step 2' },
                      { id: 3, title: 'Step 3' },
                    ]}
                    activeStep={1}
                    variant="outlined"
                  />
                </div>
                
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Filled Variant
                  </h5>
                  <Stepper
                    steps={[
                      { id: 1, title: 'Step 1' },
                      { id: 2, title: 'Step 2' },
                      { id: 3, title: 'Step 3' },
                    ]}
                    activeStep={1}
                    variant="filled"
                  />
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Dots Variant
                  </h5>
                  <Stepper
                    steps={[
                      { id: 1, title: 'Step 1' },
                      { id: 2, title: 'Step 2' },
                      { id: 3, title: 'Step 3' },
                    ]}
                    activeStep={1}
                    variant="dots"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Alternative Labels */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Alternative Labels
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Stepper with labels positioned under the icons.
              </p>
              
              <Stepper
                steps={[
                  { id: 1, title: 'Step 1', subtitle: 'First step' },
                  { id: 2, title: 'Step 2', subtitle: 'Second step' },
                  { id: 3, title: 'Step 3', subtitle: 'Third step' },
                ]}
                activeStep={1}
                alternativeLabel
              />
            </div>
          </div>
        </Card>

        {/* Vertical Stepper */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Vertical Stepper
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A vertical stepper for space-constrained layouts.
              </p>
              
              <Stepper
                steps={verticalSteps}
                activeStep={verticalStep}
                onChange={setVerticalStep}
                orientation="vertical"
                showControls
              />
            </div>
          </div>
        </Card>

        {/* Non-Linear Stepper */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Non-Linear Stepper
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Stepper with steps that can be clicked in any order.
              </p>
              
              <Stepper
                steps={[
                  { id: 1, title: 'Step 1', subtitle: 'Can be accessed anytime' },
                  { id: 2, title: 'Step 2', subtitle: 'Can be accessed anytime' },
                  { id: 3, title: 'Step 3', subtitle: 'Can be accessed anytime' },
                ]}
                activeStep={1}
                nonLinear
              />
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Click on any step to navigate directly to it.
              </p>
            </div>
          </div>
        </Card>

        {/* Checkout Form Example */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-2">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Checkout Form Example
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A complete checkout process example using steppers.
              </p>
              
              <Stepper
                steps={checkoutSteps}
                activeStep={activeStep}
                onChange={setActiveStep}
                showControls
                variant="filled"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepperPage;
