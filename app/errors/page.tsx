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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">Error Solutions Database</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">1000+ common errors with detailed solutions</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for error message..."
              className="input pl-12 text-lg shadow-soft focus:shadow-glow"
            />
          </div>
        </div>

        <div className="space-y-4">
          {errors.map((item, index) => (
            <div key={index} className="card group hover:scale-[1.01] transition-all p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <code className="text-red-600 dark:text-red-400 font-mono text-sm bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg block">{item.error}</code>
                  <div className="mt-3 flex gap-4">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">{item.language}</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">{item.solutions} solutions</span>
                  </div>
                </div>
                <button className="btn btn-primary text-sm whitespace-nowrap">
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
