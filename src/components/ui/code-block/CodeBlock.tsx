"use client";

import React, { useState } from 'react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
  copyable?: boolean;
  className?: string;
  highlightLines?: number[];
}

const CodeBlock = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  title,
  copyable = true,
  className = '',
  highlightLines = [],
}: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  // Process the code to add line numbers and handle highlighting
  const processCode = () => {
    const lines = code.split('\n');
    
    return lines.map((line, index) => {
      const isHighlighted = highlightLines.includes(index + 1);
      
      return (
        <div 
          key={index} 
          className={`flex ${isHighlighted ? 'bg-primary-100 dark:bg-primary-900/20' : ''}`}
        >
          {showLineNumbers && (
            <span className="w-12 text-right pr-4 select-none text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 mr-4">
              {index + 1}
            </span>
          )}
          <span className="flex-1 overflow-x-auto">
            {line || '\u00A0'}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center">
          {title && (
            <span className="mr-4 text-sm font-medium text-gray-600 dark:text-gray-300">
              {title}
            </span>
          )}
          <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
            {language}
          </span>
        </div>
        {copyable && (
          <button
            onClick={copyToClipboard}
            className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {isCopied ? (
              <>
                <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code content */}
      <div className="overflow-x-auto bg-white p-4 dark:bg-gray-900">
        <pre className="font-mono text-sm text-gray-800 dark:text-gray-200">
          <code>{processCode()}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
