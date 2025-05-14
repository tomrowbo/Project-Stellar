"use client"

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-10">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Tailwind CSS Test</h1>
        <p className="text-lg text-gray-700 mb-6">If you can see this text styled properly, Tailwind CSS is working!</p>
        
        {/* Test with regular CSS */}
        <div className="test-style mb-6">
          This text should be red with a blue border if CSS is loading properly.
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-500 text-white p-4 rounded">Red Box</div>
          <div className="bg-green-500 text-white p-4 rounded">Green Box</div>
          <div className="bg-blue-500 text-white p-4 rounded">Blue Box</div>
        </div>
        <div className="mt-8">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
} 