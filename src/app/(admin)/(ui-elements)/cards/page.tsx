"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Card from "@/components/ui/cards/Card";
import Image from "next/image";

const CardsPage = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Card Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Cards */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Cards
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Basic card examples with different layouts and options.
            </p>
            <Card
              title="Basic Card"
              subtitle="A simple card with title and content"
            >
              <p className="text-gray-600 dark:text-gray-400">
                This is a basic card example. Cards are used to group and display
                content in a way that is easily readable and organized.
              </p>
            </Card>

            <Card>
              <p className="text-gray-600 dark:text-gray-400">
                This card has no title or subtitle. Sometimes you just need a
                simple container without any header.
              </p>
            </Card>

            <Card
              title="Card with Footer"
              subtitle="This card includes a footer section"
              footer={
                <div className="flex justify-end">
                  <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                    Cancel
                  </button>
                  <button className="ml-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90">
                    Save
                  </button>
                </div>
              }
            >
              <p className="text-gray-600 dark:text-gray-400">
                Cards can have footer sections that are great for actions,
                buttons, or additional information.
              </p>
            </Card>
          </div>
        </div>

        {/* Card Styling */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Card Styling Options
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Basic card examples with different layouts and options.
            </p>
            <Card
              title="No Border"
              bordered={false}
              className="bg-gray-50 dark:bg-gray-700"
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card has no border but uses a different background color
                to stand out.
              </p>
            </Card>

            <Card
              title="Large Shadow"
              shadow="lg"
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card has a larger shadow for more emphasis.
              </p>
            </Card>

            <Card
              title="Fully Rounded"
              rounded="full"
              className="bg-primary-50 dark:bg-primary-900/20"
              headerClassName="bg-primary-100 dark:bg-primary-800/30"
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card has fully rounded corners and custom background colors.
              </p>
            </Card>
          </div>
        </div>

        {/* Interactive Cards */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Interactive Cards
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card
              title="Clickable Card"
              onClick={() => alert("Card clicked!")}
              hoverEffect={true}
              className="cursor-pointer"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Click on this card to trigger an action. Hover to see a subtle animation.
              </p>
            </Card>

            <Card
              title="Link Card"
              href="#"
              hoverEffect={true}
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card acts as a link. Click it to navigate somewhere.
              </p>
            </Card>
            
            <Card
              title="Hover Effect"
              hoverEffect={true}
              className="col-span-1 md:col-span-2"
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card has a hover effect that slightly raises it and increases the shadow.
                Try hovering over it!
              </p>
            </Card>
          </div>
        </div>

        {/* Card with Header Actions */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Cards with Header Actions
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Basic card examples with different layouts and options.
            </p>
            <Card
              title="Card with Dropdown"
              headerAction={
                <div className="relative">
                  <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              }
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card has an action menu in the header. In a real application, this would open a dropdown menu.
              </p>
            </Card>

            <Card
              title="Card with Buttons"
              headerAction={
                <div className="flex space-x-2">
                  <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              }
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card has action buttons in the header for edit and delete operations.
              </p>
            </Card>

            <Card
              title="Card with Custom Action"
              headerAction={
                <button className="rounded-md bg-primary px-3 py-1 text-sm text-white hover:bg-opacity-90">
                  View All
                </button>
              }
            >
              <p className="text-gray-600 dark:text-gray-400">
                This card has a custom action button in the header.
              </p>
            </Card>
          </div>
        </div>

        {/* Content Cards */}
        <div className="col-span-1 xl:col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Content Cards
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Card */}
            <Card
              bordered={true}
              rounded="lg"
              className="overflow-hidden"
            >
              <div className="-m-4 mb-4">
                <Image
                  src="/images/cover/cover-01.png"
                  alt="Card image"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Featured Image Card
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This card displays an image at the top, followed by content.
                Great for blog posts, articles, or product cards.
              </p>
              <div className="mt-auto">
                <button className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90 w-full">
                  Read More
                </button>
              </div>
            </Card>

            {/* Stats Card */}
            <Card
              title="Analytics Overview"
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
              headerClassName="border-b-0 bg-transparent"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Users</span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">2,542</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Sessions</span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">3,789</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Bounce Rate</span>
                  <span className="text-xl font-semibold text-green-500">32.15%</span>
                </div>
                <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                  <div className="h-1 bg-primary rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </Card>

            {/* Profile Card */}
            <Card
              className="flex flex-col items-center text-center"
              bordered={true}
              rounded="lg"
              shadow="md"
            >
              <div className="rounded-full overflow-hidden w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg mb-4">
                <Image
                  src="/images/user/user-01.png"
                  alt="User profile"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Sarah Johnson
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Product Designer
              </p>
              <div className="flex space-x-2 mb-4">
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs dark:bg-primary-900/20 dark:text-primary-400">
                  UI/UX
                </span>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs dark:bg-primary-900/20 dark:text-primary-400">
                  Figma
                </span>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs dark:bg-primary-900/20 dark:text-primary-400">
                  Sketch
                </span>
              </div>
              <button className="rounded-md border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors w-full">
                View Profile
              </button>
            </Card>

            {/* Notification Card */}
            <Card
              className="border-l-4 border-l-warning-500"
              bordered={true}
              rounded="lg"
              shadow="md"
            >
              <div className="flex items-start">
                <div className="rounded-full bg-warning-100 p-2 mr-4 dark:bg-warning-900/30">
                  <svg className="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    System Warning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your storage is almost full. Please upgrade your plan or delete some files.
                  </p>
                  <div className="mt-4">
                    <button className="rounded-md bg-warning-500 px-4 py-2 text-white hover:bg-opacity-90">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Task Card */}
            <Card
              title="Today's Tasks"
              headerAction={
                <span className="text-sm font-medium text-primary">View All</span>
              }
              bordered={true}
              rounded="lg"
              shadow="md"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary dark:border-gray-600" />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">Review design updates</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary dark:border-gray-600" checked />
                  <span className="ml-3 line-through text-gray-500 dark:text-gray-500">Team meeting</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary dark:border-gray-600" />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">Prepare presentation</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary dark:border-gray-600" />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">Respond to emails</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-primary text-sm font-medium">Add New Task</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Calendar Card */}
            <Card
              bordered={true}
              rounded="lg"
              shadow="md"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  April 2025
                </h3>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Su</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Mo</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Tu</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">We</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Th</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Fr</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Sa</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                <span className="py-1 text-gray-400">30</span>
                <span className="py-1 text-gray-400">31</span>
                <span className="py-1">1</span>
                <span className="py-1">2</span>
                <span className="py-1">3</span>
                <span className="py-1">4</span>
                <span className="py-1">5</span>
                <span className="py-1">6</span>
                <span className="py-1">7</span>
                <span className="py-1">8</span>
                <span className="py-1">9</span>
                <span className="py-1">10</span>
                <span className="py-1">11</span>
                <span className="py-1">12</span>
                <span className="py-1">13</span>
                <span className="py-1">14</span>
                <span className="py-1">15</span>
                <span className="py-1">16</span>
                <span className="py-1">17</span>
                <span className="py-1">18</span>
                <span className="py-1">19</span>
                <span className="py-1">20</span>
                <span className="py-1">21</span>
                <span className="py-1 bg-primary text-white rounded-full">22</span>
                <span className="py-1">23</span>
                <span className="py-1">24</span>
                <span className="py-1">25</span>
                <span className="py-1">26</span>
                <span className="py-1">27</span>
                <span className="py-1">28</span>
                <span className="py-1">29</span>
                <span className="py-1">30</span>
                <span className="py-1 text-gray-400">1</span>
                <span className="py-1 text-gray-400">2</span>
                <span className="py-1 text-gray-400">3</span>
              </div>
              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">2 events today</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsPage;
