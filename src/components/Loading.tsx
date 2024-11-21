import { Loader2 } from 'lucide-react';
import React from 'react';

/**
 * Loading Component
 *
 * A full-screen loading indicator with a spinning loader and text
 *
 * @component
 * @returns {React.ReactElement} Full-screen loading state
 *
 * @description
 * Renders a centered loading screen with:
 * - Spinning loader icon
 * - Loading text
 * - Soft background
 *
 * @example
 * // Used during async operations or page transitions
 * {isLoading ? <Loading /> : <MainContent />}
 *
 * Design Features:
 * - Fullscreen coverage
 * - Animated spinning loader
 * - Subtle, professional appearance
 * - Provides clear feedback during wait times
 */
export const Loading = React.memo(() => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-50"
      role="alert"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="space-y-4 text-center">
        {/* Spinning loader icon */}
        <Loader2
          className="w-12 h-12 mx-auto text-blue-500 animate-spin"
          aria-hidden="true"
        />

        {/* Loading text */}
        <p
          className="font-medium text-gray-600"
          aria-live="polite"
        >
          Loading...
        </p>
      </div>
    </div>
  );
});
