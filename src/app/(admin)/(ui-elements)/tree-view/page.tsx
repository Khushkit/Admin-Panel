"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TreeView, { TreeItemData } from "@/components/ui/tree-view/TreeView";
import Card from "@/components/ui/cards/Card";

const TreeViewPage = () => {
  const [selectedNode, setSelectedNode] = useState<TreeItemData | null>(null);

  // Basic tree data
  const basicTree: TreeItemData[] = [
    {
      id: 1,
      label: "Documents",
      expanded: true,
      children: [
        {
          id: 2,
          label: "Projects",
          children: [
            { id: 3, label: "Project 1" },
            { id: 4, label: "Project 2" },
            { id: 5, label: "Project 3" },
          ]
        },
        {
          id: 6,
          label: "Reports",
          children: [
            { id: 7, label: "Annual Report" },
            { id: 8, label: "Quarterly Report" },
          ]
        },
      ]
    },
    {
      id: 9,
      label: "Pictures",
      children: [
        { id: 10, label: "Vacation" },
        { id: 11, label: "Wedding" },
        { id: 12, label: "Graduation" },
      ]
    },
    {
      id: 13,
      label: "Music",
      children: [
        { id: 14, label: "Rock" },
        { id: 15, label: "Jazz" },
        { id: 16, label: "Classical" },
      ]
    },
  ];

  // File system tree with custom icons
  const folderTree: TreeItemData[] = [
    {
      id: "root",
      label: "Project Root",
      expanded: true,
      children: [
        {
          id: "src",
          label: "src",
          expanded: true,
          children: [
            {
              id: "components",
              label: "components",
              children: [
                {
                  id: "ui",
                  label: "ui",
                  children: [
                    { id: "button.tsx", label: "Button.tsx" },
                    { id: "card.tsx", label: "Card.tsx" },
                    { id: "input.tsx", label: "Input.tsx" },
                  ]
                },
                {
                  id: "layout",
                  label: "layout",
                  children: [
                    { id: "header.tsx", label: "Header.tsx" },
                    { id: "sidebar.tsx", label: "Sidebar.tsx" },
                    { id: "footer.tsx", label: "Footer.tsx" },
                  ]
                },
              ]
            },
            {
              id: "pages",
              label: "pages",
              children: [
                { id: "index.tsx", label: "index.tsx" },
                { id: "about.tsx", label: "about.tsx" },
                { id: "contact.tsx", label: "contact.tsx" },
              ]
            },
            {
              id: "utils",
              label: "utils",
              children: [
                { id: "helpers.ts", label: "helpers.ts" },
                { id: "constants.ts", label: "constants.ts" },
              ]
            },
          ]
        },
        {
          id: "public",
          label: "public",
          children: [
            { id: "favicon.ico", label: "favicon.ico" },
            { id: "logo.svg", label: "logo.svg" },
          ]
        },
        { id: "package.json", label: "package.json" },
        { id: "readme.md", label: "README.md" },
        { id: "tsconfig.json", label: "tsconfig.json" },
      ]
    }
  ];

  // Organization chart with custom content
  const organizationTree: TreeItemData[] = [
    {
      id: "ceo",
      label: "CEO",
      expanded: true,
      customContent: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-2">
            CEO
          </div>
          <div>
            <p className="font-medium">John Smith</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Chief Executive Officer</p>
          </div>
        </div>
      ),
      children: [
        {
          id: "cto",
          label: "CTO",
          customContent: (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                CTO
              </div>
              <div>
                <p className="font-medium">Robert Johnson</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Chief Technology Officer</p>
              </div>
            </div>
          ),
          children: [
            {
              id: "lead-dev",
              label: "Lead Developer",
              customContent: (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                    LD
                  </div>
                  <div>
                    <p className="font-medium">Sarah Williams</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lead Developer</p>
                  </div>
                </div>
              ),
              children: [
                {
                  id: "frontend-dev",
                  label: "Frontend Developer",
                  customContent: (
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-2">
                        FE
                      </div>
                      <div>
                        <p className="font-medium">Mike Chen</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Frontend Developer</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "backend-dev",
                  label: "Backend Developer",
                  customContent: (
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-2">
                        BE
                      </div>
                      <div>
                        <p className="font-medium">Lisa Brown</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Backend Developer</p>
                      </div>
                    </div>
                  ),
                },
              ]
            },
            {
              id: "qa-lead",
              label: "QA Lead",
              customContent: (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white mr-2">
                    QA
                  </div>
                  <div>
                    <p className="font-medium">David Lee</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">QA Lead</p>
                  </div>
                </div>
              ),
            },
          ]
        },
        {
          id: "cfo",
          label: "CFO",
          customContent: (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-2">
                CFO
              </div>
              <div>
                <p className="font-medium">Emily Davis</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Chief Financial Officer</p>
              </div>
            </div>
          ),
        },
        {
          id: "cmo",
          label: "CMO",
          customContent: (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white mr-2">
                CMO
              </div>
              <div>
                <p className="font-medium">Jessica Martinez</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Chief Marketing Officer</p>
              </div>
            </div>
          ),
        },
      ]
    }
  ];

  // Disabled nodes example
  const disabledNodesTree: TreeItemData[] = [
    {
      id: 1,
      label: "Available Documents",
      expanded: true,
      children: [
        {
          id: 2,
          label: "Projects",
          children: [
            { id: 3, label: "Project 1" },
            { id: 4, label: "Project 2 (Restricted)", disabled: true },
            { id: 5, label: "Project 3" },
          ]
        },
        {
          id: 6,
          label: "Reports (Restricted)",
          disabled: true,
          children: [
            { id: 7, label: "Annual Report" },
            { id: 8, label: "Quarterly Report" },
          ]
        },
      ]
    },
    {
      id: 9,
      label: "Available Applications",
      expanded: true,
      children: [
        { id: 10, label: "Word Processor" },
        { id: 11, label: "Spreadsheet" },
        { id: 12, label: "Presentation (Trial Version)", disabled: true },
      ]
    },
  ];

  // Categories tree with custom icons
  const categoriesTree: TreeItemData[] = [
    {
      id: "electronics",
      label: "Electronics",
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      expanded: true,
      children: [
        {
          id: "computers",
          label: "Computers",
          icon: (
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          children: [
            { id: "laptops", label: "Laptops" },
            { id: "desktops", label: "Desktops" },
            { id: "tablets", label: "Tablets" },
          ]
        },
        {
          id: "phones",
          label: "Phones",
          icon: (
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          ),
          children: [
            { id: "smartphones", label: "Smartphones" },
            { id: "feature-phones", label: "Feature Phones" },
          ]
        },
      ]
    },
    {
      id: "clothing",
      label: "Clothing",
      icon: (
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      children: [
        {
          id: "men",
          label: "Men",
          children: [
            { id: "shirts", label: "Shirts" },
            { id: "pants", label: "Pants" },
            { id: "shoes", label: "Shoes" },
          ]
        },
        {
          id: "women",
          label: "Women",
          children: [
            { id: "dresses", label: "Dresses" },
            { id: "skirts", label: "Skirts" },
            { id: "shoes-women", label: "Shoes" },
          ]
        },
      ]
    },
  ];

  // Event handler for node selection
  const handleNodeSelect = (item: TreeItemData) => {
    setSelectedNode(item);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Tree View Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Tree */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Basic Tree View
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A simple hierarchical tree structure with default styling.
              </p>
              
              <TreeView 
                items={basicTree} 
                onNodeSelect={(item) => handleNodeSelect(item)}
              />
              
              {selectedNode && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md dark:bg-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    Selected: <span className="font-medium">{selectedNode.label}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Folder Tree */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Folder Style Tree
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tree view with folder-style icons representing a file system.
              </p>
              
              <TreeView 
                items={folderTree} 
                variant="folder"
              />
            </div>
          </div>
        </Card>

        {/* Organization Chart */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Organization Chart
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tree view with custom content for org chart visualization.
              </p>
              
              <TreeView 
                items={organizationTree} 
                variant="custom"
              />
            </div>
          </div>
        </Card>

        {/* Multi-Select Tree */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Multi-Select Tree
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tree view with multi-selection capabilities. Use Ctrl+click to select multiple items.
              </p>
              
              <TreeView 
                items={basicTree} 
                multiSelect
                defaultExpanded
              />
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Hold Ctrl key while clicking to select multiple items.
              </p>
            </div>
          </div>
        </Card>

        {/* Dense Tree */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Dense Tree View
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Compact tree view with reduced padding for space-constrained UIs.
              </p>
              
              <TreeView 
                items={categoriesTree} 
                dense
                showIcons
              />
            </div>
          </div>
        </Card>

        {/* Disabled Nodes */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Tree with Disabled Nodes
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tree view with some nodes disabled (not selectable).
              </p>
              
              <TreeView 
                items={disabledNodesTree} 
                defaultExpanded
              />
            </div>
          </div>
        </Card>

        {/* Custom Icons */}
        <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-2">
          <div className="p-4 md:p-6">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Tree with Custom Icons
            </h4>
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tree view with custom icons for each category.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TreeView 
                  items={categoriesTree} 
                  defaultExpanded
                  showIcons
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TreeViewPage;
