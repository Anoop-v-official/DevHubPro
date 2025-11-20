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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">AI Prompts Library</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">500+ curated prompts for ChatGPT, Claude, and more</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="input pl-12 text-lg shadow-soft focus:shadow-glow"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="card card-hover group p-8 cursor-pointer text-center animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{cat.count} prompts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
