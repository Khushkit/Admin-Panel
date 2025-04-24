"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Carousel from "@/components/ui/carousel/Carousel";
import Image from "next/image";

const CarouselPage = () => {
  // Sample data for carousel examples
  const carouselImages = [
    "/images/cover/cover-01.png",
    "/images/cover/cover-02.png",
    "/images/cover/cover-03.png",
    "/images/cover/cover-04.png",
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Carousel Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Basic Carousel */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Carousel
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A simple image carousel with navigation arrows and dots.
            </p>
            <div className="h-64 sm:h-80 md:h-96 xl:h-120">
              <Carousel>
                {carouselImages.map((src, index) => (
                  <div key={index} className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-semibold">Slide {index + 1}</h3>
                        <p>This is a description for slide {index + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Autoplay Carousel */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Autoplay Carousel
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              This carousel automatically transitions between slides every 3 seconds.
            </p>
            <div className="h-64 sm:h-72">
              <Carousel autoPlay interval={3000}>
                {carouselImages.map((src, index) => (
                  <div key={index} className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Custom Carousel */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Styled Carousel
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A carousel with custom styling for dots and arrows.
            </p>
            <div className="h-64 sm:h-80">
              <Carousel
                dotsClassName="bottom-6"
                dotClassName="w-4 h-4 bg-gray-300/50"
                activeDotClassName="w-6 h-4 bg-primary-600 rounded-md"
                arrowClassName="bg-primary-500 text-white hover:bg-primary-600"
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-full w-full flex items-center justify-center bg-gradient-to-r from-primary-500/20 to-primary-700/20 dark:from-primary-800/30 dark:to-primary-900/30 rounded-lg"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        Custom Slide {index + 1}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                        This carousel has custom styling for dots and navigation arrows.
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Content Carousel */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Content Carousel
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A carousel for displaying content cards rather than just images.
            </p>
            <div className="h-auto">
              <Carousel showDots={false}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-2">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 h-full">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Feature {index + 1}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum
                        ultrices, nunc metus pulvinar libero.
                      </p>
                      <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Carousel Without Controls */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Carousel Without Controls
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A clean carousel without navigation controls.
            </p>
            <div className="h-64 sm:h-72">
              <Carousel autoPlay interval={4000} showArrows={false} showDots={false}>
                {carouselImages.map((src, index) => (
                  <div key={index} className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-md text-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Slide {index + 1}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Multi-Item Carousel */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Testimonial Carousel
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A carousel designed specifically for testimonials.
            </p>
            <div className="h-auto">
              <Carousel autoPlay interval={5000}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-2">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 h-full">
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                          <Image
                            src={`/images/user/user-0${index + 1}.png`}
                            alt={`User ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                            {["John Doe", "Sarah Smith", "Robert Johnson"][index]}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {["CEO, Company", "Designer", "Product Manager"][index]}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="inline-block w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 italic">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum
                        ultrices, nunc metus pulvinar libero. Exceptional service and results!"
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselPage;
