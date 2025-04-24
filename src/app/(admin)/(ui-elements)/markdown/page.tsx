"use client";

import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Markdown from "@/components/ui/markdown/Markdown";

const MarkdownPage = () => {
  const [markdownInput, setMarkdownInput] = useState(`# Markdown Example

This is a **bold text** and this is an *italic text*.

## Lists

### Unordered List
- Item 1
- Item 2
- Item 3
  - Nested Item 1
  - Nested Item 2

### Ordered List
1. First item
2. Second item
3. Third item

## Code Examples

Inline code: \`const example = "Hello World";\`

Code block:
\`\`\`javascript
function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting('World'));
\`\`\`

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |

## Links and Images

[Visit Dashboard](/)

![Example Image](https://via.placeholder.com/150)

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Horizontal Rule

---

## Task List

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
`);

  return (
    <>
      <PageBreadcrumb pageTitle="Markdown Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Basic Markdown */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Markdown
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A simple markdown renderer with support for basic markdown syntax.
            </p>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
              <Markdown 
                content="# Hello World\n\nThis is a **bold text** and this is an *italic text*.\n\n- List item 1\n- List item 2\n- List item 3" 
              />
            </div>
          </div>
        </div>

        {/* Markdown with Code Highlighting */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Markdown with Code Highlighting
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Markdown with syntax highlighting for code blocks.
            </p>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
              <Markdown 
                content={`## Code Example\n\n\`\`\`javascript\nfunction greeting(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greeting('World'));\n\`\`\`\n\n\`\`\`python\ndef greeting(name):\n    return f"Hello, {name}!"\n\nprint(greeting('World'))\n\`\`\``} 
              />
            </div>
          </div>
        </div>

        {/* Markdown with Tables */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Markdown with Tables
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Markdown with table support.
            </p>
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
              <Markdown 
                content={`## User Table\n\n| ID | Name | Email | Role |\n|---|---|---|---|\n| 1 | John Doe | john@example.com | Admin |\n| 2 | Jane Smith | jane@example.com | Editor |\n| 3 | Bob Johnson | bob@example.com | Viewer |`} 
              />
            </div>
          </div>
        </div>

        {/* Live Markdown Editor */}
        <div className="xl:col-span-2 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Live Markdown Editor
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              Edit markdown in real-time and see the preview.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                <h5 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Editor</h5>
                <textarea 
                  className="w-full h-[400px] p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-300"
                  value={markdownInput}
                  onChange={(e) => setMarkdownInput(e.target.value)}
                />
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-md overflow-auto max-h-[500px]">
                <h5 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Preview</h5>
                <Markdown content={markdownInput} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkdownPage;
