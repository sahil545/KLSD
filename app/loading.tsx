export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Diving bubbles animation */}
          <div className="flex space-x-2 justify-center items-center">
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Diving into the Experience...
            </h2>
            <p className="text-gray-500">
              Preparing your Key Largo adventure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
