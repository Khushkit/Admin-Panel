"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import MaskedInput, { 
  PhoneInput, 
  DateInput, 
  CreditCardInput, 
  SSNInput, 
  ZipCodeInput,
  MaskPresets
} from "@/components/ui/masked-input/MaskedInput";

const MaskedInputPage = () => {
  const [phoneValue, setPhoneValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [creditCardValue, setCreditCardValue] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [zipValue, setZipValue] = useState('');
  
  return (
    <>
      <PageBreadcrumb pageTitle="Masked Input Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Masked Inputs */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Masked Inputs
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Common input masks for standardized data entry.
            </p>
            
            <div className="space-y-4">
              <PhoneInput 
                label="Phone Number"
                value={phoneValue}
                onChange={setPhoneValue}
                required
              />
              
              <DateInput 
                label="Date (MM/DD/YYYY)"
                value={dateValue}
                onChange={setDateValue}
              />
              
              <CreditCardInput 
                label="Credit Card Number"
                value={creditCardValue}
                onChange={setCreditCardValue}
              />
              
              <SSNInput 
                label="Social Security Number"
                placeholder="___-__-____"
              />
              
              <ZipCodeInput 
                label="ZIP Code"
                value={zipValue}
                onChange={setZipValue}
              />
            </div>
          </div>
        </div>

        {/* Custom Masked Input */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Masked Input
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Create custom input masks for specific data formats.
            </p>
            
            <div className="space-y-4">
              <MaskedInput 
                label="License Key"
                mask="****-****-****-****"
                formatChars={{ '*': '[A-Za-z0-9]' }}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={customValue}
                onChange={setCustomValue}
              />
              
              <div className="mt-4">
                <h5 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300">Value:</h5>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{customValue || 'No value entered'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Masked Input States */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Masked Input States
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Different states for masked inputs.
            </p>
            
            <div className="space-y-4">
              <PhoneInput 
                label="Disabled Input"
                disabled
                placeholder="(___) ___-____"
              />
              
              <PhoneInput 
                label="With Error"
                error="Please enter a valid phone number"
                placeholder="(___) ___-____"
              />
              
              <PhoneInput 
                label="Read Only"
                value="(555) 123-4567"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Form with Masked Inputs */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Form with Masked Inputs
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Example of a form using masked inputs for standardized data entry.
            </p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <PhoneInput 
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateInput 
                  label="Birth Date"
                  id="birthdate"
                  name="birthdate"
                />
                
                <ZipCodeInput 
                  label="ZIP Code"
                  id="zipcode"
                  name="zipcode"
                />
              </div>
              
              <CreditCardInput 
                label="Credit Card Number"
                id="creditcard"
                name="creditcard"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Expiry Date
                  </label>
                  <MaskedInput
                    id="expiry"
                    name="expiry"
                    mask="99/99"
                    placeholder="MM/YY"
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    CVV
                  </label>
                  <MaskedInput
                    id="cvv"
                    name="cvv"
                    mask="999"
                    placeholder="123"
                    type="password"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                >
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaskedInputPage;
