"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TextInput from "@/components/ui/text-input/TextInput";
import Textarea from "@/components/ui/textarea/Textarea";
import Card from "@/components/ui/cards/Card";

const FormInputsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [bio, setBio] = useState('');

  return (
    <>
      <PageBreadcrumb pageTitle="Form Input Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Text Inputs */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Text Inputs
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Basic text input fields with different states and variants.
              </p>

              <TextInput
                label="Default Input"
                placeholder="Enter text here"
                helperText="This is a default text input with helper text"
              />

              <TextInput
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
              />

              <TextInput
                label="Input with Error"
                placeholder="Enter text here"
                error="This field has an error message"
                value="Invalid value"
              />

              <TextInput
                label="Input with Success"
                placeholder="Enter text here"
                success="This field has been validated"
                value="Valid input"
              />

              <TextInput
                label="Required Input"
                placeholder="This field is required"
                required
              />
            </div>
          </div>
        </div>

        {/* Input Variants */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Input Variants
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Different style variants for text inputs.
              </p>

              <TextInput
                label="Outlined Input (Default)"
                placeholder="Outlined style"
                variant="outlined"
              />

              <TextInput
                label="Filled Input"
                placeholder="Filled style"
                variant="filled"
              />

              <TextInput
                label="Underlined Input"
                placeholder="Underlined style"
                variant="underlined"
              />

              <TextInput
                label="With Floating Label"
                placeholder="Floating label"
                labelPosition="floating"
              />
            </div>
          </div>
        </div>

        {/* Input Types */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Input Types
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Different input types for specific data collection.
              </p>

              <TextInput
                label="Email Input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextInput
                label="Password Input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextInput
                label="Number Input"
                type="number"
                placeholder="0"
                min={0}
                max={100}
                step={1}
              />

              <TextInput
                label="URL Input"
                type="url"
                placeholder="https://example.com"
              />

              <TextInput
                label="Search Input"
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Input Sizes & Shapes */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Input Sizes & Shapes
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Inputs with different sizes and border radius options.
              </p>

              <TextInput
                label="Small Input"
                placeholder="Small size"
                size="sm"
              />

              <TextInput
                label="Medium Input (Default)"
                placeholder="Medium size"
                size="md"
              />

              <TextInput
                label="Large Input"
                placeholder="Large size"
                size="lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Rounded Small"
                  placeholder="Rounded small"
                  rounded="sm"
                />

                <TextInput
                  label="Rounded Full"
                  placeholder="Rounded full"
                  rounded="full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input with Icons & Affixes */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Input with Icons & Affixes
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Inputs with various icon positions and prefix/suffix elements.
              </p>

              <TextInput
                label="Input with Left Icon"
                placeholder="Search users"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                iconPosition="left"
              />

              <TextInput
                label="Input with Right Icon"
                placeholder="Enter email"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                iconPosition="right"
              />

              <TextInput
                label="Input with Prefix"
                placeholder="0.00"
                prefix="$"
              />

              <TextInput
                label="Input with Suffix"
                placeholder="140"
                suffix="kg"
              />

              <TextInput
                label="Username Input"
                placeholder="username"
                prefix={
                  <span className="text-gray-500">@</span>
                }
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Basic Textarea */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Textarea
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Basic textarea input fields with different states.
              </p>

              <Textarea
                label="Default Textarea"
                placeholder="Enter text here..."
                rows={4}
                helperText="This is a default textarea with helper text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Textarea
                label="Disabled Textarea"
                placeholder="This textarea is disabled"
                disabled
              />

              <Textarea
                label="Textarea with Error"
                placeholder="Enter text here..."
                error="This field has an error message"
                value="Invalid content"
              />

              <Textarea
                label="Textarea with Success"
                placeholder="Enter text here..."
                success="This field has been validated"
                value="Valid content"
              />
            </div>
          </div>
        </div>

        {/* Textarea Variants */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Textarea Variants
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Different style variants and features for textarea inputs.
              </p>

              <Textarea
                label="Outlined Textarea (Default)"
                placeholder="Outlined style"
                variant="outlined"
              />

              <Textarea
                label="Filled Textarea"
                placeholder="Filled style"
                variant="filled"
              />

              <Textarea
                label="Underlined Textarea"
                placeholder="Underlined style"
                variant="underlined"
              />

              <Textarea
                label="With Character Count"
                placeholder="Limited to 100 characters"
                maxLength={100}
                showCharCount
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <Textarea
                label="Auto-growing Textarea"
                placeholder="This textarea will grow as you type..."
                autoGrow
                minHeight="60px"
                maxHeight="200px"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                helperText="This textarea will automatically grow as you type, until it reaches its maximum height"
              />

              <Textarea
                label="Non-resizable Textarea"
                placeholder="User cannot resize this textarea"
                resizable={false}
              />
            </div>
          </div>
        </div>

        {/* Form Example */}
        <div className="xl:col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Form Example
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A complete form example using text inputs and textareas.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="First Name"
                    placeholder="John"
                    required
                    labelPosition="floating"
                  />
                  
                  <TextInput
                    label="Last Name"
                    placeholder="Doe"
                    required
                    labelPosition="floating"
                  />
                </div>
                
                <TextInput
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  iconPosition="left"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="Phone Number"
                    type="tel"
                    placeholder="(123) 456-7890"
                  />
                  
                  <TextInput
                    label="Company"
                    placeholder="Your company name"
                  />
                </div>
                
                <Textarea
                  label="Message"
                  placeholder="What would you like to tell us?"
                  rows={5}
                  required
                  showCharCount
                  maxLength={500}
                />
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
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

export default FormInputsPage;
