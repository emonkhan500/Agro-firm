export default function Loading() {
    // Or a custom loading skeleton component
    return(<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
    <div className="flex flex-col items-center space-y-4">
      {/* Tailwind Spinner */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      <p className="text-gray-700 dark:text-gray-300 font-medium">Loading products...</p>
    </div>
  </div>)
  }