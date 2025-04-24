import React from 'react';

export default function TwoFactorAuthPage() {
  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Two-Factor Authentication Input</h1>
      <form className="space-y-4">
        <label htmlFor="code" className="block">Enter Code:</label>
        <input type="text" id="code" className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
