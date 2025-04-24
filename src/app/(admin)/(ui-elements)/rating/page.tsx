"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Rating from "@/components/ui/rating/Rating";

const RatingPage = () => {
  const [rating1, setRating1] = useState(3);
  const [rating2, setRating2] = useState(4);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the feedback to your backend
    alert(`Thank you for your feedback! Rating: ${feedbackRating}/5`);
    setFeedbackRating(0);
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the review to your backend
    alert(`Review submitted! Rating: ${reviewRating}/5, Comment: ${reviewText}`);
    setReviewRating(0);
    setReviewText("");
  };
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Rating" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Rating */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Basic Rating
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Simple star rating component.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Read-only Rating</p>
              <Rating value={3.5} readOnly />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Interactive Rating</p>
              <Rating 
                value={rating1}
                onChange={(value) => setRating1(value)}
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Rating with value display</p>
              <Rating 
                value={rating1}
                onChange={(value) => setRating1(value)}
                showValue
              />
            </div>
          </div>
        </div>

        {/* Rating Sizes */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Rating Sizes
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Small, medium, and large rating components.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Small</p>
              <Rating 
                value={rating2}
                onChange={(value) => setRating2(value)}
                size="sm"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Medium (Default)</p>
              <Rating 
                value={rating2}
                onChange={(value) => setRating2(value)}
                size="md"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Large</p>
              <Rating 
                value={rating2}
                onChange={(value) => setRating2(value)}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Rating Precision */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Rating Precision
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ratings with different precision levels.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Full Stars Only (precision: 1)</p>
              <Rating 
                value={4}
                readOnly
                precision={1}
                showValue
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Half Stars (precision: 0.5)</p>
              <Rating 
                value={3.5}
                readOnly
                precision={0.5}
                showValue
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Interactive Half Stars</p>
              <Rating 
                value={rating2}
                onChange={(value) => setRating2(value)}
                precision={0.5}
                showValue
              />
            </div>
          </div>
        </div>

        {/* Rating Colors */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Rating Colors
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ratings with different color schemes.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Default (Amber)</p>
              <Rating 
                value={4}
                readOnly
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Primary</p>
              <Rating 
                value={4}
                readOnly
                activeColor="text-primary-500"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Success</p>
              <Rating 
                value={4}
                readOnly
                activeColor="text-green-500"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Warning</p>
              <Rating 
                value={4}
                readOnly
                activeColor="text-red-500"
              />
            </div>
          </div>
        </div>

        {/* Rating with Labels */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Rating with Labels
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ratings with descriptive labels.
            </p>
          </div>

          <div className="space-y-6">
            <Rating 
              value={4}
              onChange={(value) => console.log(value)}
              label="Product Quality"
              showValue
            />
            
            <Rating 
              value={3.5}
              onChange={(value) => console.log(value)}
              label="Customer Service"
              precision={0.5}
              showValue
            />
            
            <Rating 
              value={5}
              onChange={(value) => console.log(value)}
              label="Value for Money"
              showValue
            />
          </div>
        </div>

        {/* Rating in Feedback Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Rating in Feedback Forms
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Examples of using ratings in forms.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Quick Feedback
              </h4>
              
              <form onSubmit={handleSubmitFeedback}>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    How would you rate your experience?
                  </label>
                  <Rating 
                    value={feedbackRating}
                    onChange={setFeedbackRating}
                    showValue
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={feedbackRating === 0}
                  className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                    feedbackRating === 0 
                      ? "bg-gray-300 cursor-not-allowed dark:bg-gray-700" 
                      : "bg-primary-500 hover:bg-primary-600"
                  }`}
                >
                  Submit Feedback
                </button>
              </form>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Product Review
              </h4>
              
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rating
                  </label>
                  <Rating 
                    value={reviewRating}
                    onChange={setReviewRating}
                    showValue
                  />
                </div>
                
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500"
                    rows={3}
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={reviewRating === 0}
                  className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                    reviewRating === 0 
                      ? "bg-gray-300 cursor-not-allowed dark:bg-gray-700" 
                      : "bg-primary-500 hover:bg-primary-600"
                  }`}
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Product Rating Example */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Product Rating Example
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Practical product card with rating component.
            </p>
          </div>

          <div className="flex flex-col rounded-lg border border-gray-200 md:flex-row dark:border-gray-700">
            <div className="h-48 w-full bg-gray-200 md:h-auto md:w-64 dark:bg-gray-700">
              <div className="flex h-full items-center justify-center">
                <svg className="h-16 w-16 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-between p-4">
              <div>
                <div className="flex items-center justify-between">
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white">
                    Product Name
                  </h5>
                  <span className="rounded-md bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
                    New
                  </span>
                </div>
                <div className="mt-1 flex items-center">
                  <Rating value={4.5} readOnly precision={0.5} size="sm" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    4.5 (128 reviews)
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et ullamcorper enim, in rhoncus nibh. Vestibulum euismod.
                </p>
                <div className="mt-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">$49.99</span>
                  <span className="ml-2 text-sm text-gray-500 line-through dark:text-gray-500">$69.99</span>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <button className="flex-1 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
                  Add to Cart
                </button>
                <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
