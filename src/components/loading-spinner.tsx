"use client";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  );
};
