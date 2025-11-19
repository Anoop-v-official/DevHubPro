import { Search } from 'lucide-react';

export const metadata = {
  title: 'AI Prompts Library | DevHub Pro',
  description: '500+ curated AI prompts for developers',
};

export default function PromptsPage() {
  const categories = [
    { name: 'Code Generation', count: 150, icon: '💻' },
    { name: 'Debugging', count: 80, icon: '🐛' },
    { name: 'Documentation', count: 120, icon: '📚' },
    { name: 'Code Review', count: 90, icon: '👀' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">AI Prompts Library</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">500+ curated prompts for ChatGPT, Claude, and more</p>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-gray-600">{cat.count} prompts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
