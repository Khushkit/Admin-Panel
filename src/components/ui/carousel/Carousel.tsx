"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infiniteLoop?: boolean;
  className?: string;
  slideClassName?: string;
  dotsClassName?: string;
  arrowClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;
}

const Carousel = ({
  children,
  autoPlay = false,
  interval = 3000,
  showArrows = true,
  showDots = true,
  infiniteLoop = true,
  className = '',
  slideClassName = '',
  dotsClassName = '',
  arrowClassName = '',
  dotClassName = '',
  activeDotClassName = '',
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = children.length;
  
  // Clear the timer when component unmounts
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, []);

  // Reset the timer when currentSlide changes
  useEffect(() => {
    if (autoPlay && totalSlides > 1) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentSlide, autoPlay, totalSlides]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    autoPlayTimerRef.current = setTimeout(() => {
      goToNextSlide();
    }, interval);
  }, [interval]);

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return infiniteLoop ? totalSlides - 1 : prev;
      }
      return prev - 1;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev === totalSlides - 1) {
        return infiniteLoop ? 0 : prev;
      }
      return prev + 1;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // If there are no children or only one child, don't render carousel controls
  if (!totalSlides || totalSlides === 1) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-300 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div className={`w-full flex-shrink-0 ${slideClassName}`}>
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={goToPrevSlide}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 ${arrowClassName}`}
            aria-label="Previous slide"
            disabled={!infiniteLoop && currentSlide === 0}
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 ${arrowClassName}`}
            aria-label="Next slide"
            disabled={!infiniteLoop && currentSlide === totalSlides - 1}
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 ${dotsClassName}`}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide 
                  ? `bg-primary-500 ${activeDotClassName}` 
                  : `bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 ${dotClassName}`
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
