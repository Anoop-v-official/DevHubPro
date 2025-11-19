import Link from 'next/link';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Error Solutions | DevHub Pro',
  description: 'Find solutions to common programming errors and bugs',
};

export default function ErrorsPage() {
  const errors = [
    { error: 'TypeError: Cannot read property of undefined', language: 'JavaScript', solutions: 143 },
    { error: 'ModuleNotFoundError: No module named', language: 'Python', solutions: 89 },
    { error: 'NullPointerException', language: 'Java', solutions: 234 },
    { error: 'CORS policy error', language: 'Web', solutions: 156 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">Error Solutions Database</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">1000+ common errors with detailed solutions</p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for error message..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          {errors.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <code className="text-red-600 font-mono text-sm">{item.error}</code>
                  <div className="mt-2 flex gap-4">
                    <span className="text-sm text-gray-600">{item.language}</span>
                    <span className="text-sm text-blue-600">{item.solutions} solutions</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
                  View Solutions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
