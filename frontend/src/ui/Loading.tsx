export default function Loading() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xl font-medium text-gray-700">
          Loading guest list...
        </div>
        <div className="text-sm text-gray-500">This may take a few moments</div>
      </div>
    </div>
  );
}
