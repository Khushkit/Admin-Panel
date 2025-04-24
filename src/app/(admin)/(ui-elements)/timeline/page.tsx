"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Timeline from "@/components/ui/timeline/Timeline";
import Card from "@/components/ui/cards/Card";

const TimelinePage = () => {
  // Basic timeline items
  const basicItems = [
    {
      id: 1,
      title: "Project Started",
      subtitle: "Initial planning phase",
      date: "Jan 10, 2023",
      time: "9:30 AM",
    },
    {
      id: 2,
      title: "Design Approved",
      subtitle: "Design mockups finalized",
      date: "Jan 24, 2023",
      time: "2:00 PM",
    },
    {
      id: 3,
      title: "Development Phase",
      subtitle: "Frontend implementation",
      date: "Feb 15, 2023",
      time: "10:15 AM",
    },
    {
      id: 4,
      title: "Testing Completed",
      subtitle: "QA signed off on all features",
      date: "Mar 5, 2023",
      time: "4:45 PM",
    },
    {
      id: 5,
      title: "Project Launched",
      subtitle: "Successfully deployed to production",
      date: "Mar 20, 2023",
      time: "11:00 AM",
    },
  ];

  // Custom icon timeline items
  const customIconItems = [
    {
      id: 1,
      title: "Idea Generation",
      subtitle: "Brainstorming session",
      date: "Jan 5, 2023",
      iconBackground: "bg-blue-500 dark:bg-blue-600",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Research Phase",
      subtitle: "Market analysis completed",
      date: "Jan 15, 2023",
      iconBackground: "bg-green-500 dark:bg-green-600",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Prototyping",
      subtitle: "First prototype developed",
      date: "Feb 1, 2023",
      iconBackground: "bg-yellow-500 dark:bg-yellow-600",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "User Testing",
      subtitle: "Conducted user feedback sessions",
      date: "Feb 20, 2023",
      iconBackground: "bg-purple-500 dark:bg-purple-600",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Final Product",
      subtitle: "Ready for market launch",
      date: "Mar 15, 2023",
      iconBackground: "bg-red-500 dark:bg-red-600",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ];

  // Project milestone timeline
  const projectItems = [
    {
      id: 1,
      title: "Project Kickoff",
      date: "Jan 5, 2023",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Project kickoff meeting with stakeholders to define project scope, objectives, and timeline.
          </p>
        </div>
      ),
      highlighted: true,
    },
    {
      id: 2,
      title: "Requirements Gathering",
      date: "Jan 15, 2023",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Conducted interviews with stakeholders to gather detailed project requirements.
          </p>
          <ul className="list-disc ml-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
            <li>User personas defined</li>
            <li>Feature prioritization complete</li>
            <li>Technical constraints identified</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Design Phase",
      date: "Feb 1-28, 2023",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Created wireframes, mockups, and finalized the UI/UX design for all application screens.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Development Sprint 1",
      date: "Mar 1-15, 2023",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Implemented core functionality and basic user flows.
          </p>
          <div className="mt-2 p-2 bg-green-50 rounded dark:bg-green-900/20">
            <span className="text-xs font-medium text-green-700 dark:text-green-400">75% complete</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 dark:bg-gray-700">
              <div className="bg-green-500 h-2 rounded-full dark:bg-green-400" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>
      ),
      dashed: true,
    },
    {
      id: 5,
      title: "Development Sprint 2",
      date: "Mar 16-31, 2023",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Implemented advanced features and integrations with third-party services.
          </p>
          <div className="mt-2 p-2 bg-blue-50 rounded dark:bg-blue-900/20">
            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">In progress</span>
          </div>
        </div>
      ),
      dashed: true,
    },
  ];

  // Work experience timeline
  const experienceItems = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      subtitle: "TechCorp Inc.",
      date: "2021 - Present",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Leading the frontend development team, implementing modern UI frameworks and optimizing application performance.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Frontend Developer",
      subtitle: "WebSolutions Ltd.",
      date: "2018 - 2021",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Developed responsive web applications using React and Next.js, collaborated with designers to implement pixel-perfect interfaces.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "UI/UX Designer",
      subtitle: "Creative Digital Agency",
      date: "2016 - 2018",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Created wireframes, prototypes, and visual designs for various client projects across multiple industries.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Junior Web Developer",
      subtitle: "StartUp Hub",
      date: "2014 - 2016",
      content: (
        <div className="p-3 bg-gray-50 rounded-md dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Worked on small to medium web projects, primarily using HTML, CSS, and JavaScript.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Timeline Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Timeline */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Timeline
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A simple vertical timeline with default styling.
              </p>
              
              <Timeline items={basicItems} />
            </div>
          </div>
        </Card>

        {/* Custom Icons Timeline */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Custom Icons Timeline
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Timeline with custom icons and color variations.
              </p>
              
              <Timeline items={customIconItems} />
            </div>
          </div>
        </Card>

        {/* Horizontal Timeline */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-2">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Horizontal Timeline
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A horizontal timeline for space-constrained layouts.
              </p>
              
              <div className="overflow-x-auto pb-4">
                <div className="min-w-max">
                  <Timeline 
                    items={customIconItems.slice(0, 4)} 
                    orientation="horizontal" 
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline Variants */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Timeline Variants
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Different line styles and alignments.
              </p>
              
              <div className="space-y-8">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Dashed Line
                  </h5>
                  <Timeline 
                    items={basicItems.slice(0, 3)} 
                    lineStyle="dashed" 
                  />
                </div>
                
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Dotted Line
                  </h5>
                  <Timeline 
                    items={basicItems.slice(0, 3)} 
                    lineStyle="dotted" 
                  />
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Right Aligned
                  </h5>
                  <Timeline 
                    items={basicItems.slice(0, 3)} 
                    align="right" 
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Alternating Timeline */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Alternating Timeline
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Timeline with content alternating between left and right sides.
              </p>
              
              <Timeline 
                items={basicItems} 
                align="alternate" 
              />
            </div>
          </div>
        </Card>

        {/* Project Timeline */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Project Timeline
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A timeline showing project milestones with detailed content.
              </p>
              
              <Timeline 
                items={projectItems} 
                iconSize="md" 
              />
            </div>
          </div>
        </Card>

        {/* Experience Timeline */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Experience Timeline
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A timeline showing work experience with right alignment.
              </p>
              
              <Timeline 
                items={experienceItems} 
                align="right" 
                gap="lg" 
              />
            </div>
          </div>
        </Card>

        {/* Different Sizes */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-2">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Timeline Sizes
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Different icon and spacing sizes for the timeline.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Small Size
                  </h5>
                  <Timeline 
                    items={basicItems.slice(0, 3)} 
                    iconSize="sm" 
                    gap="sm" 
                  />
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Medium Size (Default)
                  </h5>
                  <Timeline 
                    items={basicItems.slice(0, 3)} 
                    iconSize="md" 
                    gap="md" 
                  />
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Large Size
                  </h5>
                  <Timeline 
                    items={basicItems.slice(0, 3)} 
                    iconSize="lg" 
                    gap="lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TimelinePage;
