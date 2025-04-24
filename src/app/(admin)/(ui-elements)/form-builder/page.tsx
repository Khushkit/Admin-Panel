"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Card from "@/components/ui/cards/Card";
import TextInput from "@/components/ui/text-input/TextInput";
import Textarea from "@/components/ui/textarea/Textarea";
import Checkbox from "@/components/ui/checkbox/Checkbox";
import Select from "@/components/ui/select/Select";
import FileUpload from "@/components/ui/file-upload/FileUpload";
import RadioButton, { RadioGroup } from "@/components/ui/radio-button/RadioButton";
import Switch from "@/components/ui/switch/Switch";
import Slider from "@/components/ui/slider/Slider";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";
import Stepper, { StepData } from "@/components/ui/stepper/Stepper";

// Define types for form elements
type FormElementOption = {
  value: string;
  label: string;
};

type FormElementType = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: FormElementOption[];
  stepId?: string; // Associate element with a step
};

type FormStep = {
  id: string;
  title: string;
  subtitle?: string;
};

type ElementTypeInfo = {
  type: string;
  label: string;
  icon: string;
};

const FormBuilderPage = () => {
  const [formElements, setFormElements] = useState<FormElementType[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState<string>("Untitled Form");
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportCode, setExportCode] = useState<string>("");
  
  // Multi-step form states
  const [formSteps, setFormSteps] = useState<FormStep[]>([
    { id: "step-1", title: "Step 1" }
  ]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isMultiStep, setIsMultiStep] = useState<boolean>(false);

  // Available form elements that can be added to the form
  const availableElements: ElementTypeInfo[] = [
    { type: "text", label: "Text Input", icon: "text_fields" },
    { type: "textarea", label: "Text Area", icon: "notes" },
    { type: "select", label: "Select Dropdown", icon: "list" },
    { type: "checkbox", label: "Checkbox", icon: "check_box" },
    { type: "radio", label: "Radio Button", icon: "radio_button_checked" },
    { type: "date", label: "Date Picker", icon: "calendar_today" },
    { type: "file", label: "File Upload", icon: "attach_file" },
    { type: "number", label: "Number Input", icon: "looks_one" },
    { type: "email", label: "Email Input", icon: "email" },
    { type: "phone", label: "Phone Input", icon: "phone" },
    { type: "switch", label: "Switch", icon: "toggle_on" },
    { type: "slider", label: "Slider", icon: "tune" },
    { type: "rating", label: "Rating", icon: "star" },
  ];

  // Add a new form element
  const addFormElement = (elementInfo: ElementTypeInfo) => {
    const id = `element-${Date.now()}`;
    const newElement: FormElementType = {
      id,
      type: elementInfo.type,
      label: `${elementInfo.label} ${formElements.length + 1}`,
      placeholder: `Enter ${elementInfo.label.toLowerCase()} here`,
      required: false,
      // If multi-step is enabled, assign the element to the active step
      stepId: isMultiStep ? formSteps[activeStep].id : undefined,
    };

    // Add options array for select, radio, and checkbox inputs
    if (elementInfo.type === "select" || elementInfo.type === "radio") {
      newElement.options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ];
    }

    setFormElements([...formElements, newElement]);
    setActiveElement(id);
  };

  // Add a new step to the form
  const addStep = () => {
    const newStep: FormStep = {
      id: `step-${formSteps.length + 1}`,
      title: `Step ${formSteps.length + 1}`,
    };
    setFormSteps([...formSteps, newStep]);
  };

  // Remove a step from the form
  const removeStep = (stepId: string) => {
    // Don't allow removing the last step
    if (formSteps.length <= 1) return;

    // Remove the step
    const updatedSteps = formSteps.filter(step => step.id !== stepId);
    setFormSteps(updatedSteps);

    // Update active step if needed
    if (activeStep >= updatedSteps.length) {
      setActiveStep(updatedSteps.length - 1);
    }

    // Handle form elements associated with the removed step
    // Option 1: Delete them
    setFormElements(formElements.filter(el => el.stepId !== stepId));

    // Option 2: Move them to another step (first step)
    // const firstStepId = updatedSteps[0].id;
    // setFormElements(formElements.map(el => 
    //  el.stepId === stepId ? {...el, stepId: firstStepId} : el
    // ));
  };

  // Update step properties
  const updateStep = (stepId: string, updates: Partial<FormStep>) => {
    setFormSteps(formSteps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  // Toggle multi-step mode
  const toggleMultiStep = () => {
    setIsMultiStep(!isMultiStep);

    // If enabling multi-step, assign all elements to the first step
    if (!isMultiStep) {
      const firstStepId = formSteps[0].id;
      setFormElements(formElements.map(el => ({ ...el, stepId: firstStepId })));
    } else {
      // If disabling, remove step associations
      setFormElements(formElements.map(el => ({ ...el, stepId: undefined })));
    }
  };

  // Remove a form element
  const removeFormElement = (id: string): void => {
    setFormElements(formElements.filter((element) => element.id !== id));
    if (activeElement === id) {
      setActiveElement(null);
    }
  };

  // Update form element properties
  const updateFormElement = (id: string, updates: Partial<FormElementType>): void => {
    setFormElements(
      formElements.map((element) => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  // Update the order of form elements (for drag and drop functionality)
  const reorderFormElements = (startIndex: number, endIndex: number): void => {
    const newFormElements = [...formElements];
    const [removed] = newFormElements.splice(startIndex, 1);
    newFormElements.splice(endIndex, 0, removed);
    setFormElements(newFormElements);
  };

  // Render the form element in preview mode
  const renderFormElement = (element: FormElementType) => {
    // Add common classNames for better dark mode support
    const darkModeClasses = "dark:text-white dark:border-gray-700 dark:bg-boxdark";
    const isActive = activeElement === element.id;
    
    return (
      <div 
        key={element.id}
        className={`p-4 mb-4 border rounded-md ${isActive ? 'border-primary bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'} ${darkModeClasses}`}
        onClick={() => setActiveElement(element.id)}
      >
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium text-gray-800 dark:text-gray-200">{element.label}</h4>
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                removeFormElement(element.id);
              }}
              className="text-red-500 hover:text-red-700"
              title="Remove element"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Preview of the element using existing UI components from the UI elements dropdown */}
        <div className="dark:text-white">
        {element.type === "text" || element.type === "email" || element.type === "number" || element.type === "phone" ? (
          <TextInput
            type={element.type === "phone" ? "tel" : element.type as any}
            label=""
            placeholder={element.placeholder}
            disabled={true}
            required={element.required}
            fullWidth
            variant="outlined"
            size="md"
          />
        ) : element.type === "textarea" ? (
          <Textarea
            label=""
            placeholder={element.placeholder}
            rows={3}
            disabled={true}
            required={element.required}
            fullWidth
            variant="outlined"
            resizable={true}
            showCharCount={element.type === "textarea"}
          />
        ) : element.type === "select" ? (
          <Select
            label=""
            placeholder={element.placeholder || "Select an option"}
            options={element.options ? element.options.map(o => ({ value: o.value, label: o.label })) : []}
            disabled={true}
            required={element.required}
            fullWidth
            clearable
          />
        ) : element.type === "checkbox" ? (
          <Checkbox
            label={element.placeholder || element.label}
            disabled={true}
            size="md"
          />
        ) : element.type === "radio" ? (
          <RadioGroup
            name={`radio-group-${element.id}`}
            options={element.options ? element.options.map(o => ({ value: o.value, label: o.label, disabled: true })) : []}
            orientation="vertical"
            size="md"
          />
        ) : element.type === "date" ? (
          <TextInput
            label=""
            type="text"
            placeholder="YYYY-MM-DD"
            disabled={true}
            required={element.required}
            fullWidth
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            iconPosition="right"
          />
        ) : element.type === "file" ? (
          <FileUpload
            label={element.placeholder || "Upload file"}
            disabled={true}
            multiple={false}
            accept={["*/*"]}
            simulateUpload={false}
          />
        ) : element.type === "switch" ? (
          <Switch
            label={element.placeholder || element.label}
            disabled={true}
            size="md"
          />
        ) : element.type === "slider" ? (
          <Slider
            label={element.label}
            min={0}
            max={100}
            step={1}
            defaultValue={50}
            disabled={true}
            showValue={true}
            trackHeight="md"
            thumbSize="md"
            className="border border-gray-300 rounded-md p-4 bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        ) : element.type === "rating" ? (
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-6 h-6 ${i < 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        ) : null}
        </div>
      </div>
    );
  };

  // Generate export code for the form
  const generateExportCode = () => {
    if (formElements.length === 0) {
      return "// No form elements to export";
    }

    let imports = [
      "import React, { useState } from 'react';\n",
      "import TextInput from '@/components/ui/text-input/TextInput';",
      "import Textarea from '@/components/ui/textarea/Textarea';",
      "import Checkbox from '@/components/ui/checkbox/Checkbox';",
      "import Select from '@/components/ui/select/Select';",
      "import FileUpload from '@/components/ui/file-upload/FileUpload';",
      "import RadioButton, { RadioGroup } from '@/components/ui/radio-button/RadioButton';",
      "import Switch from '@/components/ui/switch/Switch';",
      "import Slider from '@/components/ui/slider/Slider';",
      "import Button from '@/components/ui/button/Button';",
      "import Card from '@/components/ui/cards/Card';",
    ];
    
    // Add Stepper import if it's a multi-step form
    if (isMultiStep) {
      imports.push("import Stepper from '@/components/ui/stepper/Stepper';\n");
    } else {
      imports.push("\n");
    }

    // Filter imports based on what's actually used
    const usedTypes = formElements.map(el => el.type);
    if (!usedTypes.includes("textarea")) imports = imports.filter(i => !i.includes("Textarea"));
    if (!usedTypes.includes("checkbox")) imports = imports.filter(i => !i.includes("Checkbox"));
    if (!usedTypes.includes("select")) imports = imports.filter(i => !i.includes("Select"));
    if (!usedTypes.includes("file")) imports = imports.filter(i => !i.includes("FileUpload"));
    if (!usedTypes.includes("radio")) imports = imports.filter(i => !i.includes("RadioButton"));
    if (!usedTypes.includes("switch")) imports = imports.filter(i => !i.includes("Switch"));
    if (!usedTypes.includes("slider")) imports = imports.filter(i => !i.includes("Slider"));
    if (!usedTypes.includes("rating")) imports = imports.filter(i => !i.includes("Rating"));

    // Generate form component code
    const sanitizedFormName = formTitle
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .replace(/^[a-z]/, c => c.toUpperCase());

    const componentName = sanitizedFormName || "CustomForm";

    let formContent = `
// Form element rendering
const renderFormElement = (element, value, onChange) => {
  switch (element.type) {`;

    // Add case statements for each form element type that exists in the form
    if (usedTypes.includes("text") || usedTypes.includes("email") || usedTypes.includes("number") || usedTypes.includes("phone")) {
      formContent += `
    case "text":
    case "email":
    case "number":
    case "phone":
      return (
        <TextInput
          type={element.type === "phone" ? "tel" : element.type}
          label={element.label}
          placeholder={element.placeholder}
          required={element.required}
          fullWidth
          value={value || ""}
          onChange={onChange}
        />
      );`;
    }

    if (usedTypes.includes("textarea")) {
      formContent += `
    case "textarea":
      return (
        <Textarea
          label={element.label}
          placeholder={element.placeholder}
          rows={3}
          required={element.required}
          fullWidth
          value={value || ""}
          onChange={onChange}
          resizable={true}
        />
      );`;
    }

    if (usedTypes.includes("select")) {
      formContent += `
    case "select":
      return (
        <Select
          label={element.label}
          placeholder={element.placeholder || "Select an option"}
          options={element.options || []}
          required={element.required}
          fullWidth
          value={value || ""}
          onChange={onChange}
        />
      );`;
    }

    if (usedTypes.includes("checkbox")) {
      formContent += `
    case "checkbox":
      return (
        <Checkbox
          label={element.label}
          checked={value || false}
          onChange={onChange}
        />
      );`;
    }

    if (usedTypes.includes("radio")) {
      formContent += `
    case "radio":
      return (
        <RadioGroup
          name={element.id}
          label={element.label}
          options={element.options || []}
          value={value || ""}
          onChange={onChange}
        />
      );`;
    }

    if (usedTypes.includes("date")) {
      formContent += `
    case "date":
      return (
        <TextInput
          type="text"
          label={element.label}
          placeholder="YYYY-MM-DD"
          required={element.required}
          fullWidth
          value={value || ""}
          onChange={onChange}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          iconPosition="right"
        />
      );`;
    }

    if (usedTypes.includes("file")) {
      formContent += `
    case "file":
      return (
        <FileUpload
          label={element.label}
          multiple={false}
          accept={["*/*"]}
          onUpload={onChange}
        />
      );`;
    }

    if (usedTypes.includes("switch")) {
      formContent += `
    case "switch":
      return (
        <Switch
          label={element.label}
          checked={value || false}
          onChange={onChange}
        />
      );`;
    }

    if (usedTypes.includes("slider")) {
      formContent += `
    case "slider":
      return (
        <Slider
          label={element.label}
          min={0}
          max={100}
          step={1}
          value={value || 50}
          onChange={onChange}
          showValue={true}
        />
      );`;
    }

    if (usedTypes.includes("rating")) {
      formContent += `
    case "rating":
      // Implement a rating component
      const rating = value || 0;
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{element.label}</label>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={\`w-6 h-6 cursor-pointer $\{i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}\`} 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => onChange(i + 1)}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      );`;
    }

    // Close out the switch and function
    formContent += `
    default:
      return null;
  }
};
`;

    // Generate the main component
    const componentCode = `"use client";

${imports.join('\n')}

const ${componentName} = () => {
  // Form state
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  ${isMultiStep ? `const [activeStep, setActiveStep] = useState(0);` : ''}
  
  // Form elements configuration
  const formElements = ${JSON.stringify(formElements, null, 2)};
  ${isMultiStep ? `
  // Form steps configuration
  const formSteps = ${JSON.stringify(formSteps, null, 2)};` : ''}
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual form submission logic
      console.log('Form data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      alert('Form submitted successfully!');
      
      // Reset form
      setFormData({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle form field change
  const handleChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  ${formContent}
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">${formTitle}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          ${isMultiStep ? `
          {/* Multi-step form with Stepper */}
          <div className="mb-8">
            <Stepper
              steps={formSteps.map((step, index) => ({
                id: step.id,
                title: step.title,
                subtitle: step.subtitle,
                completed: index < activeStep
              }))}
              activeStep={activeStep}
              onChange={(step) => setActiveStep(step)}
              size="md"
              variant="filled"
              alternativeLabel
              showControls
            />
          </div>
          
          {/* Current step elements */}
          {activeStep < formSteps.length && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{formSteps[activeStep].title}</h3>
              
              {formElements
                .filter(el => el.stepId === formSteps[activeStep].id)
                .map((element) => (
                  <div key={element.id} className="mb-4">
                    {renderFormElement(
                      element, 
                      formData[element.id], 
                      (value) => handleChange(element.id, value)
                    )}
                  </div>
                ))}
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
              variant="outline"
              disabled={activeStep === 0 || isSubmitting}
            >
              Previous
            </Button>
            
            <div>
              <Button
                type="button"
                onClick={() => setFormData({})}
                className="mr-2"
                variant="outline"
                disabled={isSubmitting}
              >
                Reset
              </Button>
              
              {activeStep < formSteps.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="bg-primary text-white hover:bg-primary-dark flex items-center"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>` : `
          {/* Single-page form */}
          {formElements.map((element) => (
            <div key={element.id} className="mb-4">
              {renderFormElement(
                element, 
                formData[element.id], 
                (value) => handleChange(element.id, value)
              )}
            </div>
          ))}
          
          <div className="flex justify-end mt-8">
            <Button
              type="button"
              onClick={() => setFormData({})}
              className="mr-2"
              variant="outline"
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>`}
        </form>
      </Card>
    </div>
  );
};

export default ${componentName};
`;

    return componentCode;
  };

  // Handle exporting the form
  const handleExportForm = () => {
    const code = generateExportCode();
    setExportCode(code);
    setIsExportModalOpen(true);
  };

  // Render the properties panel for editing the selected element
  const renderPropertiesPanel = () => {
    if (!activeElement) {
      return (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <p>Select a form element to configure its properties</p>
        </div>
      );
    }

    const element = formElements.find((el) => el.id === activeElement);
    if (!element) return null;

    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Element Properties</h3>
        
        <div className="space-y-4">
          <TextInput
            label="Element Label"
            value={element.label}
            onChange={(e) => updateFormElement(element.id, { label: e.target.value })}
            fullWidth
          />
          
          <TextInput
            label="Placeholder Text"
            value={element.placeholder}
            onChange={(e) => updateFormElement(element.id, { placeholder: e.target.value })}
            fullWidth
            helperText="Text that will show when the field is empty"
          />
          
          {(element.type === "select" || element.type === "radio") && element.options && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
              <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Options</label>
              <div className="space-y-2">
                {element.options.map((option: FormElementOption, index: number) => (
                  <div key={index} className="flex space-x-2">
                    <TextInput
                      value={option.label}
                      onChange={(e) => {
                        if (element.options) {
                          const newOptions = [...element.options];
                          newOptions[index] = { 
                            ...newOptions[index], 
                            label: e.target.value,
                            value: e.target.value.toLowerCase().replace(/\s+/g, '_')
                          };
                          updateFormElement(element.id, { options: newOptions });
                        }
                      }}
                      fullWidth
                    />
                    <button
                      className="text-red-500 hover:text-red-700 px-2 flex items-center justify-center"
                      onClick={() => {
                        if (element.options) {
                          const newOptions = element.options.filter((_, i) => i !== index);
                          updateFormElement(element.id, { options: newOptions });
                        }
                      }}
                      title="Remove option"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-3 px-4 py-2 text-sm bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
                  onClick={() => {
                    if (element.options) {
                      const newIndex = element.options.length + 1;
                      const newOptions = [
                        ...element.options,
                        { value: `option${newIndex}`, label: `Option ${newIndex}` }
                      ];
                      updateFormElement(element.id, { options: newOptions });
                    }
                  }}
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
          
          <Checkbox
            label="Required Field"
            checked={element.required}
            onChange={(checked) => updateFormElement(element.id, { required: checked })}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Form Builder" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
        {/* Form Elements Palette */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-3">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Form Elements
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {availableElements.map((element) => (
                <div
                  key={element.type}
                  className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => addFormElement(element)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {element.type === "text" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
                    {element.type === "textarea" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
                    {element.type === "select" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />}
                    {element.type === "checkbox" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
                    {element.type === "radio" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {element.type === "date" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                    {element.type === "file" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />}
                    {element.type === "number" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />}
                    {element.type === "email" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                    {element.type === "phone" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                    {element.type === "switch" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9l0 0M9 15l0 0M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />}
                    {element.type === "slider" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M7 12h10M5 18h14" />}
                    {element.type === "rating" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
                  </svg>
                  <span className="text-sm font-medium">{element.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Form Preview */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <TextInput
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-xl font-semibold"
                fullWidth
                variant="underlined"
                placeholder="Your Form Title"
              />
              <div className="flex space-x-2">
                <Switch
                  label="Multi-step form"
                  checked={isMultiStep}
                  onChange={toggleMultiStep}
                  size="sm"
                />
                <button
                  className="px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 flex items-center h-9 font-medium"
                  onClick={handleExportForm}
                  disabled={formElements.length === 0}
                  title={formElements.length === 0 ? "Add form elements first" : "Export form as a component"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Form
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto p-2 h-full min-h-[400px]">
              {formElements.length === 0 ? (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mb-2 font-medium">Your form is empty</p>
                  <p className="text-sm">Click on form elements from the left panel to start building</p>
                </div>
              ) : isMultiStep ? (
                <div className="space-y-4">
                  {/* Stepper for multi-step form */}
                  <div className="mb-6">
                    <Stepper
                      steps={formSteps.map((step, index) => ({
                        id: step.id,
                        title: step.title,
                        subtitle: step.subtitle,
                        completed: index < activeStep
                      }))}
                      activeStep={activeStep}
                      onChange={(step) => setActiveStep(step)}
                      size="md"
                      variant="filled"
                      alternativeLabel
                      showControls
                    />
                  </div>
                  
                  {/* Step management controls */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        {formSteps[activeStep].title}
                      </h3>
                      <TextInput
                        value={formSteps[activeStep].title}
                        onChange={(e) => updateStep(formSteps[activeStep].id, { title: e.target.value })}
                        placeholder="Step Title"
                        size="sm"
                        className="w-40"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={addStep}
                        className="flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Step
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => removeStep(formSteps[activeStep].id)}
                        disabled={formSteps.length <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove Step
                      </Button>
                    </div>
                  </div>
                  
                  {/* Current step elements */}
                  <div className="space-y-2">
                    {formElements
                      .filter(el => el.stepId === formSteps[activeStep].id)
                      .map(renderFormElement)}
                    
                    {formElements.filter(el => el.stepId === formSteps[activeStep].id).length === 0 && (
                      <div className="text-center py-6 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
                        <p className="mb-2 font-medium">This step is empty</p>
                        <p className="text-sm">Add form elements from the left panel to this step</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {formElements.map(renderFormElement)}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Properties Panel */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Element Properties
            </h4>
            {renderPropertiesPanel()}
          </div>
        </Card>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export Form Component"
        size="xl"
      >
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Copy the code below to create a standalone form component based on your form design.
            Create a new file in your project and paste this code to use your form.
          </p>
          
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(exportCode);
                    alert('Code copied to clipboard!');
                  } catch (err) {
                    console.error('Failed to copy code:', err);
                    alert('Failed to copy code. Please try manually selecting and copying.');
                  }
                }}
                className="p-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
            <div className="rounded-md bg-gray-800 text-gray-100 p-4 max-h-96 overflow-auto">
              <pre className="whitespace-pre-wrap break-all">
                <code>{exportCode}</code>
              </pre>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setIsExportModalOpen(false)}
            variant="outline"
            size="sm"
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FormBuilderPage;
