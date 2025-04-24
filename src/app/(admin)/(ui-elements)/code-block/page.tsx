"use client";

import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CodeBlock from "@/components/ui/code-block/CodeBlock";

const CodeBlockPage = () => {
  // Sample code snippets
  const jsCodeExample = `// Example JavaScript function
function calculateTotal(items) {
  return items
    .map(item => item.price * item.quantity)
    .reduce((total, value) => total + value, 0);
}

// Example usage
const cart = [
  { name: 'Widget', price: 9.99, quantity: 2 },
  { name: 'Gadget', price: 14.99, quantity: 1 }
];

const total = calculateTotal(cart);
console.log(\`Total: \$\${total.toFixed(2)}\`);
`;

  const reactCodeExample = `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Counter: {count}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrease
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;
`;

  const htmlCodeExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section>
      <h2>Main Content</h2>
      <p>This is the main content of the page.</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2025 My Website. All rights reserved.</p>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>
`;

  const cssCodeExample = `/* Main styles */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --dark-color: #1f2937;
  --light-color: #f9fafb;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--dark-color);
  background-color: var(--light-color);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}`;

  return (
    <>
      <PageBreadcrumb pageTitle="Code Block Components" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Basic Code Block */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Basic Code Block
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A simple code block for displaying JavaScript code with line numbers.
            </p>
            <CodeBlock
              code={jsCodeExample}
              language="javascript"
              title="JavaScript Example"
            />
          </div>
        </div>

        {/* React Component Code Block */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            React Component Code Block
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A code block displaying a React component with syntax highlighting.
            </p>
            <CodeBlock
              code={reactCodeExample}
              language="jsx"
              title="React Counter Component"
            />
          </div>
        </div>

        {/* HTML Code Block */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            HTML Code Block
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A code block displaying HTML markup with syntax highlighting.
            </p>
            <CodeBlock
              code={htmlCodeExample}
              language="html"
              title="HTML Structure Example"
            />
          </div>
        </div>

        {/* CSS Code Block */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            CSS Code Block
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A code block displaying CSS styling with syntax highlighting.
            </p>
            <CodeBlock
              code={cssCodeExample}
              language="css"
              title="CSS Styling Example"
            />
          </div>
        </div>

        {/* Code Block with Highlighted Lines */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Code Block with Highlighted Lines
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A code block with specific lines highlighted to draw attention to important code.
            </p>
            <CodeBlock
              code={jsCodeExample}
              language="javascript"
              title="JavaScript Example with Highlighted Lines"
              highlightLines={[2, 3, 4, 5]}
            />
          </div>
        </div>

        {/* Code Block Without Line Numbers */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Code Block Without Line Numbers
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A code block that doesn't display line numbers for a cleaner look.
            </p>
            <CodeBlock
              code={cssCodeExample}
              language="css"
              showLineNumbers={false}
              title="CSS Example Without Line Numbers"
            />
          </div>
        </div>

        {/* Code Block Configurations */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-900 md:p-6">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Code Block with Custom Styling
          </h4>
          <div className="flex flex-col gap-5">
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              A code block with custom styling applied.
            </p>
            <CodeBlock
              code={reactCodeExample.slice(0, 200)}
              language="jsx"
              title="Custom Styled Code Block"
              className="border-primary-500 dark:border-primary-400"
              highlightLines={[5]}
            />
            <div className="mt-6">
              <h5 className="text-lg font-medium text-black dark:text-white mb-4">
                Code Block Without Copy Button
              </h5>
              <CodeBlock
                code={htmlCodeExample.slice(0, 200)}
                language="html"
                title="HTML Example"
                copyable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeBlockPage;
