"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Accordion, { AccordionItem } from "@/components/ui/accordion/Accordion";

const AccordionPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Accordion" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Accordion */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Basic Accordion
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Simple accordion with expand/collapse functionality.
            </p>
          </div>

          <Accordion>
            <AccordionItem title="What is an accordion component?" defaultOpen>
              <p>
                An accordion is a UI component that displays collapsible content panels
                for presenting information in a limited amount of space. Each panel has
                a header, which the user can click to expand or collapse the panel's
                content.
              </p>
            </AccordionItem>
            <AccordionItem title="How does it improve user experience?">
              <p>
                Accordions allow users to get an overview of available content and to
                focus on the specific information they're interested in. They help
                reduce page length and cognitive load by showing only information that
                users want to see.
              </p>
            </AccordionItem>
            <AccordionItem title="When should I use accordions?">
              <p>
                Use accordions when you have a lot of information to present but want to 
                reduce clutter. They're great for FAQs, product descriptions, or 
                settings panels where users may only need to see certain sections at a time.
              </p>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Bordered Accordion */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Bordered Accordion
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Accordion with a border around the entire component.
            </p>
          </div>

          <Accordion bordered>
            <AccordionItem title="Can I customize the appearance?">
              <p>
                Yes, the accordion component can be customized with different styles,
                colors, and behaviors to match your application's design system. You can 
                adjust the border, icons, animation, and other visual elements.
              </p>
            </AccordionItem>
            <AccordionItem title="Do accordions work on mobile devices?">
              <p>
                Absolutely. Accordions are especially useful on mobile devices where
                screen space is limited. They allow users to navigate through content
                efficiently without excessive scrolling.
              </p>
            </AccordionItem>
            <AccordionItem title="What are alternatives to accordions?">
              <p>
                Alternatives include tabs, collapsible panels, progressive disclosure
                techniques, and simply showing all content at once if it's not too
                lengthy. The best choice depends on your specific use case and user needs.
              </p>
            </AccordionItem>
          </Accordion>
        </div>

        {/* FAQ Accordion */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              FAQ Accordion
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Perfect for frequently asked questions sections.
            </p>
          </div>

          <Accordion className="max-w-3xl mx-auto">
            <AccordionItem title="How do I reset my password?">
              <p>
                To reset your password, click on the "Forgot Password" link on the login
                page. You'll receive an email with instructions to create a new password.
                Follow the link in the email and enter your new password when prompted.
              </p>
            </AccordionItem>
            <AccordionItem title="Can I change my username?">
              <p>
                Yes, you can change your username in your account settings. Go to your
                profile, click on "Edit Profile," and update your username. Note that
                username changes may be limited to once every 30 days on some platforms.
              </p>
            </AccordionItem>
            <AccordionItem title="How do I delete my account?">
              <p>
                To delete your account, go to your account settings and look for the
                "Delete Account" option, usually found under "Privacy" or "Account
                Management." Follow the prompts to confirm account deletion. Note that
                this action is usually permanent and cannot be undone.
              </p>
            </AccordionItem>
            <AccordionItem title="Is my data secure?">
              <p>
                We take data security seriously. Your data is encrypted both in transit
                and at rest using industry-standard protocols. We implement multiple
                security measures including regular security audits, strict access
                controls, and compliance with data protection regulations.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AccordionPage;
