"use client";

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface MarkdownProps {
  content: string;
  className?: string;
  allowHtml?: boolean;
  sanitize?: boolean;
}

const Markdown = ({
  content,
  className = '',
  allowHtml = false,
  sanitize = true,
}: MarkdownProps) => {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Add listener for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  // Plugins setup
  const plugins = [remarkGfm];
  if (allowHtml) {
    plugins.push(rehypeRaw as any);
  }
  if (sanitize) {
    plugins.push(rehypeSanitize as any);
  }

  // Custom components for rendering
  const components = {
    // Custom code block rendering with syntax highlighting
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={isDarkMode ? oneDark : oneLight}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-4"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded`} {...props}>
          {children}
        </code>
      );
    },
    // Custom heading styles
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-5 mb-3 text-gray-900 dark:text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold mt-3 mb-2 text-gray-900 dark:text-white">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-base font-bold mt-3 mb-1 text-gray-900 dark:text-white">{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-sm font-bold mt-3 mb-1 text-gray-900 dark:text-white">{children}</h6>
    ),
    // Paragraph styling
    p: ({ children }: any) => (
      <p className="my-3 text-gray-700 dark:text-gray-300">{children}</p>
    ),
    // List styling
    ul: ({ children }: any) => (
      <ul className="list-disc pl-6 my-3 text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-6 my-3 text-gray-700 dark:text-gray-300">{children}</ol>
    ),
    // Link styling
    a: ({ href, children }: any) => (
      <a 
        href={href} 
        className="text-primary-600 dark:text-primary-400 hover:underline" 
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    // Blockquote styling
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1 my-3 text-gray-700 dark:text-gray-300 italic">
        {children}
      </blockquote>
    ),
    // Table styling
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
    ),
    tr: ({ children }: any) => (
      <tr>{children}</tr>
    ),
    th: ({ children }: any) => (
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),
    // Horizontal rule
    hr: () => (
      <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />
    ),
    // Image styling
    img: ({ src, alt, title }: any) => (
      <img 
        src={src} 
        alt={alt || ''} 
        title={title || ''} 
        className="max-w-full h-auto rounded-md my-4" 
      />
    ),
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={plugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
