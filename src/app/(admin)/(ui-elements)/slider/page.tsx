"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Slider from "@/components/ui/slider/Slider";
import Card from "@/components/ui/cards/Card";

const SliderPage = () => {
  const [basicValue, setBasicValue] = useState<number>(50);
  const [rangeValues, setRangeValues] = useState<[number, number]>([20, 80]);
  const [temperatureValue, setTemperatureValue] = useState<number>(22);
  const [volumeValue, setVolumeValue] = useState<number>(75);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);
  const [brightness, setBrightness] = useState<number>(80);
  
  // Format currency value
  const formatCurrency = (value: number) => {
    return `$${value}`;
  };
  
  // Format temperature value
  const formatTemperature = (value: number) => {
    return `${value}°C`;
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Slider Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Slider */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Slider
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A simple slider with value display.
              </p>
              
              <div className="mb-8">
                <Slider
                  label="Basic Slider"
                  value={basicValue}
                  onChange={setBasicValue}
                  showValue
                  helperText="Drag the slider to adjust the value"
                />
              </div>
              
              <div className="mb-8">
                <Slider
                  label="Disabled Slider"
                  value={50}
                  disabled
                  showValue
                />
              </div>
              
              <div className="mb-8">
                <Slider
                  label="With Error"
                  value={25}
                  error="This slider has an error state"
                  showValue
                />
              </div>
              
              <div className="mb-8">
                <Slider
                  label="Custom Thumb & Track"
                  value={basicValue}
                  onChange={setBasicValue}
                  thumbSize="lg"
                  trackHeight="lg"
                  thumbColor="#3b82f6"
                  trackColor="#93c5fd"
                  showValue
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Range Slider */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Range Slider
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A slider with dual thumbs for selecting a range of values.
              </p>
              
              <div className="mb-8">
                <Slider
                  label="Range Slider"
                  range
                  rangeValues={rangeValues}
                  onRangeChange={setRangeValues}
                  showValue
                  helperText="Drag either handle to adjust the range"
                />
              </div>
              
              <div className="mb-8">
                <Slider
                  label="Price Range"
                  range
                  min={0}
                  max={1000}
                  step={10}
                  rangeValues={priceRange}
                  onRangeChange={setPriceRange}
                  showValue
                  formatValue={formatCurrency}
                  helperText="Select a price range"
                />
              </div>
              
              <div className="mb-8">
                <Slider
                  label="Disabled Range"
                  range
                  rangeValues={[30, 70]}
                  disabled
                  showValue
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Slider with Marks & Ticks */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Slider with Marks & Ticks
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sliders with ticks and labeled marks for specific values.
              </p>
              
              <div className="mb-10">
                <Slider
                  label="With Ticks"
                  value={basicValue}
                  onChange={setBasicValue}
                  showTicks
                  tickCount={5}
                  showValue
                />
              </div>
              
              <div className="mb-10">
                <Slider
                  label="Temperature"
                  value={temperatureValue}
                  onChange={setTemperatureValue}
                  min={15}
                  max={30}
                  step={0.5}
                  showValue
                  valuePosition="right"
                  formatValue={formatTemperature}
                  marks={[
                    { value: 15, label: "15°C" },
                    { value: 20, label: "20°C" },
                    { value: 25, label: "25°C" },
                    { value: 30, label: "30°C" }
                  ]}
                />
              </div>
              
              <div className="mb-12">
                <Slider
                  label="Volume"
                  value={volumeValue}
                  onChange={setVolumeValue}
                  showValue
                  valuePosition="right"
                  marks={[
                    { value: 0, label: "Mute" },
                    { value: 25, label: "Low" },
                    { value: 50, label: "Medium" },
                    { value: 75, label: "High" },
                    { value: 100, label: "Max" }
                  ]}
                  icon={
                    volumeValue === 0 ? (
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : volumeValue < 40 ? (
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Vertical Slider */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Vertical Slider
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sliders with vertical orientation for specialized interfaces.
              </p>
              
              <div className="flex justify-around h-64 mb-4">
                <div className="text-center">
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Basic</div>
                  <Slider
                    orientation="vertical"
                    value={basicValue}
                    onChange={setBasicValue}
                    showValue
                    valuePosition="top"
                    height="180px"
                  />
                </div>
                
                <div className="text-center">
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Range</div>
                  <Slider
                    orientation="vertical"
                    range
                    rangeValues={rangeValues}
                    onRangeChange={setRangeValues}
                    showValue
                    valuePosition="top"
                    height="180px"
                  />
                </div>
                
                <div className="text-center">
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">With Ticks</div>
                  <Slider
                    orientation="vertical"
                    value={basicValue}
                    onChange={setBasicValue}
                    showTicks
                    tickCount={5}
                    height="180px"
                  />
                </div>
                
                <div className="text-center">
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Brightness</div>
                  <Slider
                    orientation="vertical"
                    value={brightness}
                    onChange={setBrightness}
                    showValue
                    valuePosition="top"
                    formatValue={(v) => `${v}%`}
                    height="180px"
                    marks={[
                      { value: 0, label: "0%" },
                      { value: 50, label: "50%" },
                      { value: 100, label: "100%" }
                    ]}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="xl:col-span-2 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Real-World Examples
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Practical examples of sliders in common user interfaces.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Price Range Filter */}
                <div className="p-5 border rounded-lg dark:border-gray-700">
                  <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Price Range Filter</h5>
                  <Slider
                    range
                    min={0}
                    max={1000}
                    step={10}
                    rangeValues={priceRange}
                    onRangeChange={setPriceRange}
                    showValue
                    formatValue={formatCurrency}
                  />
                  <div className="mt-6 flex justify-between">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        min={0}
                        max={priceRange[1]}
                      />
                    </div>
                    <div className="mx-4 flex items-center">
                      <div className="border-t border-gray-300 dark:border-gray-700 w-6"></div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        min={priceRange[0]}
                        max={1000}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-opacity-90">
                      Apply Filter
                    </button>
                  </div>
                </div>
                
                {/* Audio Player Controls */}
                <div className="p-5 border rounded-lg dark:border-gray-700">
                  <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Audio Player Controls</h5>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400">0:00</div>
                    <Slider
                      min={0}
                      max={180}
                      value={60}
                      className="flex-grow mx-4"
                    />
                    <div className="text-sm text-gray-500 dark:text-gray-400">3:00</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-6">
                      <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      <Slider
                        value={volumeValue}
                        onChange={setVolumeValue}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Thermostat */}
                <div className="p-5 border rounded-lg dark:border-gray-700">
                  <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Thermostat</h5>
                  
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-white">
                        {temperatureValue}°C
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Current Temperature
                      </div>
                    </div>
                  </div>
                  
                  <Slider
                    min={15}
                    max={30}
                    step={0.5}
                    value={temperatureValue}
                    onChange={setTemperatureValue}
                    tickValues={[15, 20, 25, 30]}
                    showTicks
                  />
                  
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <div>Cool</div>
                    <div>Warm</div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button className="py-2 bg-blue-500 text-white rounded-md hover:bg-opacity-90">
                      Cool
                    </button>
                    <button className="py-2 bg-amber-500 text-white rounded-md hover:bg-opacity-90">
                      Heat
                    </button>
                  </div>
                </div>
                
                {/* Image Editor */}
                <div className="p-5 border rounded-lg dark:border-gray-700">
                  <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Image Editor Controls</h5>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-gray-700 dark:text-gray-300">Brightness</span>
                      <Slider
                        value={brightness}
                        onChange={setBrightness}
                        className="flex-grow"
                        formatValue={(v) => `${v}%`}
                        showValue
                        valuePosition="right"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-gray-700 dark:text-gray-300">Contrast</span>
                      <Slider
                        value={65}
                        className="flex-grow"
                        formatValue={(v) => `${v}%`}
                        showValue
                        valuePosition="right"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-gray-700 dark:text-gray-300">Saturation</span>
                      <Slider
                        value={50}
                        className="flex-grow"
                        formatValue={(v) => `${v}%`}
                        showValue
                        valuePosition="right"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-gray-700 dark:text-gray-300">Sharpness</span>
                      <Slider
                        value={25}
                        className="flex-grow"
                        formatValue={(v) => `${v}%`}
                        showValue
                        valuePosition="right"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                      Reset
                    </button>
                    <button className="px-3 py-1 bg-primary text-white rounded-md hover:bg-opacity-90">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SliderPage;
