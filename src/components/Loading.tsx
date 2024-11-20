import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="space-y-4 text-center">
        <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
        <p className="font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
};
