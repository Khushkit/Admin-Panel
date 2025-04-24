"use client";

import React, { useState, useEffect } from 'react';

export interface StepData {
  id: string | number;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  optional?: boolean;
  error?: boolean;
  completed?: boolean;
}

export interface StepperProps {
  steps: StepData[];
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'outlined' | 'filled' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  alternativeLabel?: boolean; // Places labels under the step icons
  nonLinear?: boolean; // Allows clicking on steps regardless of order
  onChange?: (step: number) => void;
  onComplete?: () => void;
  className?: string;
  stepClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  connectorClassName?: string;
  contentClassName?: string;
  controlsClassName?: string;
  showControls?: boolean;
  disableBackButton?: boolean;
  nextButtonLabel?: string;
  backButtonLabel?: string;
  finishButtonLabel?: string;
  renderStepContent?: boolean;
}

const Stepper = ({
  steps,
  activeStep = 0,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  alternativeLabel = false,
  nonLinear = false,
  onChange,
  onComplete,
  className = '',
  stepClassName = '',
  labelClassName = '',
  iconClassName = '',
  connectorClassName = '',
  contentClassName = '',
  controlsClassName = '',
  showControls = false,
  disableBackButton = false,
  nextButtonLabel = 'Next',
  backButtonLabel = 'Back',
  finishButtonLabel = 'Finish',
  renderStepContent = true,
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(activeStep);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Update current step if prop changes
  useEffect(() => {
    setCurrentStep(activeStep);
  }, [activeStep]);

  // Track which steps are completed
  const handleStepCompletion = (step: number, isCompleted: boolean) => {
    setCompletedSteps(prev => ({
      ...prev,
      [step]: isCompleted
    }));
  };

  // Check if a step is completed
  const isStepCompleted = (index: number) => {
    if (steps[index]?.completed !== undefined) {
      return steps[index].completed;
    }
    return completedSteps[index] || false;
  };

  // Handle step click
  const handleStepClick = (index: number) => {
    if (nonLinear || index < currentStep) {
      setCurrentStep(index);
      if (onChange) {
        onChange(index);
      }
    }
  };

  // Handle next button click
  const handleNext = () => {
    const nextStep = currentStep + 1;
    
    if (nextStep < steps.length) {
      handleStepCompletion(currentStep, true);
      setCurrentStep(nextStep);
      
      if (onChange) {
        onChange(nextStep);
      }
    } else if (nextStep === steps.length) {
      handleStepCompletion(currentStep, true);
      
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Handle back button click
  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      
      if (onChange) {
        onChange(prevStep);
      }
    }
  };

  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          icon: 'w-6 h-6 text-sm',
          label: 'text-xs',
          connector: 'h-0.5',
        };
      case 'lg':
        return {
          icon: 'w-10 h-10 text-xl',
          label: 'text-base',
          connector: 'h-1',
        };
      case 'md':
      default:
        return {
          icon: 'w-8 h-8 text-base',
          label: 'text-sm',
          connector: 'h-0.5',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Render step icon
  const renderStepIcon = (step: StepData, index: number) => {
    const isActive = currentStep === index;
    const isCompleted = isStepCompleted(index);
    const hasError = step.error;
    
    // If step provides a custom icon, use that
    if (step.icon) {
      return (
        <div className={`
          flex items-center justify-center 
          ${isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-gray-400 dark:text-gray-600'}
          ${iconClassName}
        `}>
          {step.icon}
        </div>
      );
    }
    
    // Otherwise use the appropriate icon based on state
    if (hasError) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    
    if (isCompleted) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    
    return index + 1;
  };
  
  // Get variant-specific classes for step icon
  const getVariantClasses = (index: number) => {
    const isActive = currentStep === index;
    const isCompleted = isStepCompleted(index);
    const hasError = steps[index].error;
    
    switch (variant) {
      case 'outlined':
        return {
          icon: `
            rounded-full border-2 
            ${isActive 
              ? 'border-primary-500 text-primary-500 dark:border-primary-400 dark:text-primary-400' 
              : isCompleted 
                ? 'border-green-500 text-green-500 dark:border-green-400 dark:text-green-400' 
                : hasError 
                  ? 'border-red-500 text-red-500 dark:border-red-400 dark:text-red-400' 
                  : 'border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400'
            }
          `,
        };
      case 'filled':
        return {
          icon: `
            rounded-full 
            ${isActive 
              ? 'bg-primary-500 text-white dark:bg-primary-600' 
              : isCompleted 
                ? 'bg-green-500 text-white dark:bg-green-600' 
                : hasError 
                  ? 'bg-red-500 text-white dark:bg-red-600' 
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }
          `,
        };
      case 'dots':
        return {
          icon: `
            rounded-full 
            ${isActive 
              ? 'bg-primary-500 dark:bg-primary-400 w-3 h-3' 
              : isCompleted 
                ? 'bg-green-500 dark:bg-green-400 w-3 h-3' 
                : hasError 
                  ? 'bg-red-500 dark:bg-red-400 w-3 h-3' 
                  : 'bg-gray-300 dark:bg-gray-600 w-2 h-2'
            }
          `,
        };
      case 'default':
      default:
        return {
          icon: `
            rounded-full 
            ${isActive 
              ? 'bg-primary-500 text-white dark:bg-primary-600' 
              : isCompleted 
                ? 'bg-green-500 text-white dark:bg-green-600' 
                : hasError 
                  ? 'bg-red-500 text-white dark:bg-red-600' 
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }
          `,
        };
    }
  };

  // Get active step content
  const getActiveStepContent = () => {
    const activeStepData = steps[currentStep];
    return activeStepData?.content;
  };

  // Render step label
  const renderStepLabel = (step: StepData, index: number) => {
    const isActive = currentStep === index;
    const isCompleted = isStepCompleted(index);
    const hasError = step.error;

    return (
      <div className={`
        ${orientation === 'horizontal' && alternativeLabel ? 'text-center' : ''}
        ${labelClassName}
      `}>
        <div className={`
          font-medium
          ${isActive 
            ? 'text-gray-900 dark:text-white' 
            : isCompleted 
              ? 'text-gray-900 dark:text-gray-100' 
              : hasError 
                ? 'text-red-500 dark:text-red-400' 
                : 'text-gray-500 dark:text-gray-400'
          }
        `}>
          {step.title}
        </div>
        
        {step.subtitle && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {step.subtitle}
            {step.optional && ' (Optional)'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Stepper */}
      <div className={`
        ${orientation === 'horizontal' ? 'flex' : 'flex flex-col'}
        ${orientation === 'horizontal' && alternativeLabel ? 'items-baseline' : ''}
      `}>
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = isStepCompleted(index);
          const isLast = index === steps.length - 1;
          const variantClasses = getVariantClasses(index);
          
          return (
            <div 
              key={step.id} 
              className={`
                ${orientation === 'horizontal' ? 'flex flex-1' : 'flex'}
                ${orientation === 'horizontal' && alternativeLabel 
                  ? 'flex-col items-center' 
                  : orientation === 'horizontal' 
                    ? 'items-center' 
                    : 'items-start'
                }
                ${isLast ? '' : 'mb-0'}
                ${stepClassName}
              `}
            >
              {/* Step Button & Label */}
              <div className={`
                flex 
                ${orientation === 'horizontal' && !alternativeLabel ? 'items-center' : ''}
                ${orientation === 'vertical' ? 'items-start' : ''}
                ${orientation === 'horizontal' && alternativeLabel ? 'flex-col items-center' : ''}
              `}>
                {/* Step Button */}
                <button
                  type="button"
                  className={`
                    flex items-center justify-center
                    ${variant === 'dots' ? 'p-0' : 'p-0'}
                    ${sizeClasses.icon}
                    ${variantClasses.icon}
                    ${isActive || isCompleted || nonLinear ? 'cursor-pointer' : 'cursor-not-allowed'}
                    focus:outline-none
                  `}
                  onClick={() => handleStepClick(index)}
                  disabled={!nonLinear && !isActive && !isCompleted}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {variant !== 'dots' && renderStepIcon(step, index)}
                </button>
                
                {/* Label - for horizontal non-alternative or vertical */}
                {!alternativeLabel && (
                  <div className={`ml-3 ${orientation === 'vertical' ? 'mb-6' : ''}`}>
                    {renderStepLabel(step, index)}
                  </div>
                )}
              </div>
              
              {/* Label - for alternative label */}
              {alternativeLabel && (
                <div className="mt-2">
                  {renderStepLabel(step, index)}
                </div>
              )}
              
              {/* Connector */}
              {!isLast && (
                <div 
                  className={`
                    ${orientation === 'horizontal' 
                      ? 'flex-auto border-t border-gray-200 dark:border-gray-700 mx-2' 
                      : 'ml-4 mt-1 border-l border-gray-200 dark:border-gray-700 h-full self-stretch'
                    }
                    ${isCompleted 
                      ? 'border-green-500 dark:border-green-400' 
                      : ''
                    }
                    ${connectorClassName}
                  `}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Content */}
      {renderStepContent && (
        <div className={`mt-6 ${contentClassName}`}>
          {getActiveStepContent()}
        </div>
      )}
      
      {/* Controls */}
      {showControls && (
        <div className={`
          mt-6 flex justify-between
          ${controlsClassName}
        `}>
          <button
            type="button"
            className={`
              px-4 py-2 rounded-md
              ${currentStep === 0 || disableBackButton 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }
            `}
            onClick={handleBack}
            disabled={currentStep === 0 || disableBackButton}
          >
            {backButtonLabel}
          </button>
          
          <button
            type="button"
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? finishButtonLabel : nextButtonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default Stepper;
