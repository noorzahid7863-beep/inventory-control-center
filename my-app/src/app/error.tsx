'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled UI Error captured:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800 my-8">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
        Something went wrong!
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        An error occurred while loading this section of the Inventory Control Center.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}