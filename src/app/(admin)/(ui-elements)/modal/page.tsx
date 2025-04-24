"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Modal from "@/components/ui/modal/Modal";

const ModalPage = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [sizeModalOpen, setsSizeModalOpen] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [centeredModalOpen, setCenteredModalOpen] = useState(false);
  
  const handleConfirm = () => {
    alert("Action confirmed!");
    setConfirmModalOpen(false);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Modal Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Modal */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Modal
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              A simple modal with a title, content, and close button. Click the button below to open it.
            </p>
            <div>
              <button
                onClick={() => setBasicModalOpen(true)}
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Basic Modal
              </button>

              <Modal
                isOpen={basicModalOpen}
                onClose={() => setBasicModalOpen(false)}
                title="Basic Modal"
              >
                <div className="text-gray-600 dark:text-gray-300">
                  <p>This is a basic modal with default settings.</p>
                  <p className="mt-4">You can close it by:</p>
                  <ul className="mt-2 list-disc pl-5">
                    <li>Clicking the X button</li>
                    <li>Clicking outside the modal</li>
                    <li>Pressing the ESC key</li>
                  </ul>
                </div>
              </Modal>
            </div>
          </div>
        </div>

        {/* Modal Sizes */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Modal Sizes
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Modals come in different sizes to accommodate various content needs.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setsSizeModalOpen('sm')}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Small
              </button>
              <button
                onClick={() => setsSizeModalOpen('md')}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Medium
              </button>
              <button
                onClick={() => setsSizeModalOpen('lg')}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Large
              </button>
              <button
                onClick={() => setsSizeModalOpen('xl')}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Extra Large
              </button>
              <button
                onClick={() => setsSizeModalOpen('full')}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Full Width
              </button>
            </div>

            <Modal
              isOpen={sizeModalOpen !== null}
              onClose={() => setsSizeModalOpen(null)}
              title={`${sizeModalOpen?.charAt(0).toUpperCase()}${sizeModalOpen?.slice(1)} Modal`}
              size={sizeModalOpen || 'md'}
            >
              <div className="text-gray-600 dark:text-gray-400">
                <p>This is a modal with the {sizeModalOpen} size setting.</p>
                <div className="mt-4 h-32 w-full rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <p className="text-center text-gray-500 dark:text-gray-400">Content area dimensions adjust based on the selected size</p>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        {/* Custom Modal */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Custom Styled Modal
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Modals can be customized with different styles and classes for header, content, and footer.
            </p>
            <div>
              <button
                onClick={() => setCustomModalOpen(true)}
                className="rounded-md bg-info-500 px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Custom Modal
              </button>

              <Modal
                isOpen={customModalOpen}
                onClose={() => setCustomModalOpen(false)}
                title="Custom Modal"
                headerClassName="bg-info-50 dark:bg-info-900/30 text-info-700 dark:text-info-400"
                contentClassName="bg-gray-50 dark:bg-gray-800"
                footerClassName="bg-info-50 dark:bg-info-900/30"
                className="border-2 border-info-200 dark:border-info-700"
                footer={
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCustomModalOpen(false)}
                      className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setCustomModalOpen(false)}
                      className="rounded-md bg-info-500 px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                }
              >
                <div className="text-gray-600 dark:text-gray-300">
                  <p>This modal has custom styling for the header, content, and footer sections.</p>
                  <p className="mt-4">You can apply different background colors, border styles, and more.</p>
                </div>
              </Modal>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Form Modal
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Modals are perfect for forms that don't require a full page.
            </p>
            <div>
              <button
                onClick={() => setFormModalOpen(true)}
                className="rounded-md bg-success-500 px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Form Modal
              </button>

              <Modal
                isOpen={formModalOpen}
                onClose={() => setFormModalOpen(false)}
                title="Contact Form"
                size="md"
                footer={
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFormModalOpen(false)}
                      className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert("Form submitted!");
                        setFormModalOpen(false);
                      }}
                      className="rounded-md bg-success-500 px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      Submit
                    </button>
                  </div>
                }
              >
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Confirmation Modal
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              Use confirmation modals to prevent accidental actions and get user confirmation.
            </p>
            <div>
              <button
                onClick={() => setConfirmModalOpen(true)}
                className="rounded-md bg-danger-500 px-4 py-2 text-white hover:bg-opacity-90"
              >
                Delete Item
              </button>

              <Modal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                title="Confirm Deletion"
                size="sm"
                footer={
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmModalOpen(false)}
                      className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="rounded-md bg-danger-500 px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      Delete
                    </button>
                  </div>
                }
              >
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="rounded-full bg-danger-100 p-3 dark:bg-danger-900/30">
                      <svg className="h-6 w-6 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-center">Are you sure you want to delete this item? This action cannot be undone.</p>
                </div>
              </Modal>
            </div>
          </div>
        </div>

        {/* Centered Modal */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Centered Modal
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400">
              This modal is vertically centered in the viewport, which is useful for important information or actions.
            </p>
            <div>
              <button
                onClick={() => setCenteredModalOpen(true)}
                className="rounded-md bg-warning-500 px-4 py-2 text-white hover:bg-opacity-90"
              >
                Open Centered Modal
              </button>

              <Modal
                isOpen={centeredModalOpen}
                onClose={() => setCenteredModalOpen(false)}
                title="Important Notice"
                centered={true}
              >
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="rounded-full bg-warning-100 p-3 dark:bg-warning-900/30">
                      <svg className="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-center">This modal is centered vertically in the viewport for better visibility and focus.</p>
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setCenteredModalOpen(false)}
                      className="rounded-md bg-warning-500 px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      I Understand
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPage;
