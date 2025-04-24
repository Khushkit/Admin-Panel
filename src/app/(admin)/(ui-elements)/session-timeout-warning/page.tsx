import React from 'react';

export default function SessionTimeoutWarningPage() {
  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-800 dark:text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">Session Timeout Warning</h1>
        <p>Your session is about to expire. Please save your work.</p>
      </div>
    </div>
  );
}
