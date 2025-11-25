'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Code, Database, Cloud, Terminal, CheckCircle, XCircle, TrendingUp, Users, Star, X, Download, MessageCircle } from 'lucide-react';

export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedComparison, setSelectedComparison] = useState<any>(null);

  const comparisons = [
    {
      name: 'React vs Vue.js',
      tech1: 'React',
      tech2: 'Vue.js',
      category: 'Frontend',
      icon1: '⚛️',
      icon2: '💚',
      color1: 'from-blue-400 to-cyan-400',
      color2: 'from-green-400 to-emerald-400',
      popular: true,
      comparison: {
        learning: { react: 7, vue: 9 },
        performance: { react: 9, vue: 9 },
        ecosystem: { react: 10, vue: 8 },
        popularity: { react: 10, vue: 7 }
      },
      pros1: ['Huge ecosystem', 'Strong job market', 'React Native for mobile'],
      pros2: ['Easier learning curve', 'Better documentation', 'Built-in solutions'],
      cons1: ['Steeper learning curve', 'Requires additional libraries', 'JSX syntax'],
      cons2: ['Smaller ecosystem', 'Less job opportunities', 'Limited mobile options'],
      install1: 'npx create-react-app my-app\ncd my-app\nnpm start',
      install2: 'npm create vue@latest\ncd vue-project\nnpm install\nnpm run dev',
      docs1: 'https://react.dev',
      docs2: 'https://vuejs.org',
      useCase1: 'Large-scale applications, mobile apps, complex UIs',
      useCase2: 'Progressive enhancement, simple to complex SPAs, rapid prototyping'
    },
    {
      name: 'Python vs JavaScript',
      tech1: 'Python',
      tech2: 'JavaScript',
      category: 'Languages',
      icon1: '🐍',
      icon2: '📜',
      color1: 'from-blue-500 to-yellow-500',
      color2: 'from-yellow-400 to-orange-400',
      popular: true,
      comparison: {
        learning: { python: 10, js: 7 },
        performance: { python: 7, js: 9 },
        versatility: { python: 9, js: 10 },
        community: { python: 9, js: 10 }
      },
      pros1: ['Clean syntax', 'Great for AI/ML', 'Extensive libraries'],
      pros2: ['Browser native', 'Full-stack', 'Async by nature'],
      cons1: ['Slower execution', 'Limited mobile development', 'GIL for threading'],
      cons2: ['Callback hell', 'Type coercion issues', 'Browser compatibility'],
      install1: '# Ubuntu/Debian\nsudo apt install python3 python3-pip\n\n# macOS\nbrew install python3\n\n# Windows\n# Download from python.org',
      install2: '# Install Node.js (includes npm)\n# Ubuntu/Debian\nsudo apt install nodejs npm\n\n# macOS\nbrew install node\n\n# Windows\n# Download from nodejs.org',
      docs1: 'https://docs.python.org',
      docs2: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      useCase1: 'Data science, AI/ML, automation, backend development',
      useCase2: 'Web development, full-stack apps, real-time applications'
    },
    {
      name: 'MongoDB vs PostgreSQL',
      category: 'Databases',
      icon1: '🍃',
      icon2: '🐘',
      color1: 'from-green-500 to-teal-500',
      color2: 'from-blue-600 to-indigo-600',
      popular: true,
      comparison: {
        flexibility: { mongo: 10, postgres: 7 },
        reliability: { mongo: 8, postgres: 10 },
        performance: { mongo: 9, postgres: 9 },
        scalability: { mongo: 9, postgres: 8 }
      },
      pros1: ['Flexible schema', 'Horizontal scaling', 'JSON-like documents'],
      pros2: ['ACID compliant', 'Complex queries', 'Data integrity'],
    },
    {
      name: 'REST vs GraphQL',
      category: 'API',
      icon1: '🔄',
      icon2: '📊',
      color1: 'from-orange-500 to-red-500',
      color2: 'from-pink-500 to-purple-500',
      popular: true,
      comparison: {
        simplicity: { rest: 9, graphql: 6 },
        flexibility: { rest: 6, graphql: 10 },
        performance: { rest: 8, graphql: 9 },
        caching: { rest: 9, graphql: 7 }
      },
      pros1: ['Simple & mature', 'Better caching', 'Stateless'],
      pros2: ['Single endpoint', 'No over-fetching', 'Strongly typed'],
    },
    {
      name: 'Docker vs Kubernetes',
      category: 'DevOps',
      icon1: '🐳',
      icon2: '☸️',
      color1: 'from-blue-500 to-cyan-500',
      color2: 'from-blue-600 to-purple-600',
      popular: false,
      comparison: {
        simplicity: { docker: 9, k8s: 5 },
        scalability: { docker: 7, k8s: 10 },
        orchestration: { docker: 6, k8s: 10 },
        learning: { docker: 8, k8s: 4 }
      },
      pros1: ['Easy to learn', 'Lightweight', 'Great for development'],
      pros2: ['Auto-scaling', 'Self-healing', 'Production-ready'],
    },
    {
      name: 'Git vs SVN',
      category: 'Version Control',
      icon1: '🌿',
      icon2: '📦',
      color1: 'from-orange-500 to-red-600',
      color2: 'from-blue-500 to-cyan-500',
      popular: false,
      comparison: {
        speed: { git: 10, svn: 6 },
        branching: { git: 10, svn: 5 },
        learning: { git: 6, svn: 8 },
        popularity: { git: 10, svn: 3 }
      },
      pros1: ['Distributed', 'Fast branching', 'Industry standard'],
      pros2: ['Centralized', 'Simpler model', 'Better for large files'],
    },
  ];

  const categories = ['All', 'Languages', 'Frontend', 'Databases', 'API', 'DevOps', 'Version Control'];

  const filteredComparisons = selectedCategory === 'All'
    ? comparisons
    : comparisons.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Comparisons
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Make informed decisions with our detailed, data-driven technology comparisons
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Comparisons Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredComparisons.map((comp, index) => (
            <div
              key={index}
              onClick={() => setSelectedComparison(comp)}
              className="card p-6 animate-scale-in hover:scale-[1.02] transition-transform cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {comp.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                  {comp.category}
                </span>
              </div>

              {/* Icons & Title */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${comp.color1} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {comp.icon1}
                </div>
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-600">VS</span>
                <div className={`w-16 h-16 bg-gradient-to-br ${comp.color2} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {comp.icon2}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                {comp.name}
              </h3>

              {/* Comparison Metrics */}
              <div className="space-y-4 mb-6">
                {Object.entries(comp.comparison).map(([key, values]: [string, any]) => {
                  const tech1Key = Object.keys(values)[0];
                  const tech2Key = Object.keys(values)[1];
                  const score1 = values[tech1Key];
                  const score2 = values[tech2Key];
                  const total = score1 + score2;

                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
                          {key}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-blue-600 dark:text-blue-400">{score1}</span>
                          <span className="text-gray-400">:</span>
                          <span className="text-purple-600 dark:text-purple-400">{score2}</span>
                        </div>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          style={{ width: `${(score1 / total) * 100}%` }}
                        />
                        <div
                          className="absolute right-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${(score2 / total) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pros */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Pros
                  </h4>
                  <ul className="space-y-1">
                    {comp.pros1.map((pro, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                        <span className="text-blue-500 mt-0.5">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    Pros
                  </h4>
                  <ul className="space-y-1">
                    {comp.pros2.map((pro, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                        <span className="text-purple-500 mt-0.5">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="card p-8 mt-12 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 border-none">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Specific Comparison?
          </h2>
          <p className="text-lg text-blue-100 dark:text-blue-200 mb-6">
            Request a technology comparison and we'll add it to our database
          </p>
          <a
            href="mailto:contact@devhubpro.com?subject=Comparison Request"
            className="btn bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Request Comparison
          </a>
        </div>

        {/* Detailed Comparison Modal */}
        {selectedComparison && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedComparison(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedComparison.color1} rounded-xl flex items-center justify-center text-2xl`}>
                    {selectedComparison.icon1}
                  </div>
                  <span className="text-2xl font-bold text-white">VS</span>
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedComparison.color2} rounded-xl flex items-center justify-center text-2xl`}>
                    {selectedComparison.icon2}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComparison(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  {selectedComparison.name}
                </h2>

                {/* Installation Steps */}
                {selectedComparison.install1 && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Install {selectedComparison.tech1 || selectedComparison.name.split(' vs ')[0]}
                        </h3>
                      </div>
                      <pre className="bg-gray-900 dark:bg-black p-4 rounded-lg overflow-x-auto">
                        <code className="text-green-400 text-sm">{selectedComparison.install1}</code>
                      </pre>
                    </div>
                    <div className="card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Download className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Install {selectedComparison.tech2 || selectedComparison.name.split(' vs ')[1]}
                        </h3>
                      </div>
                      <pre className="bg-gray-900 dark:bg-black p-4 rounded-lg overflow-x-auto">
                        <code className="text-green-400 text-sm">{selectedComparison.install2}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Pros & Cons */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedComparison.tech1 || selectedComparison.name.split(' vs ')[0]}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Pros
                        </h4>
                        <ul className="space-y-1">
                          {selectedComparison.pros1.map((pro: string, i: number) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {selectedComparison.cons1 && (
                        <div>
                          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            Cons
                          </h4>
                          <ul className="space-y-1">
                            {selectedComparison.cons1.map((con: string, i: number) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedComparison.tech2 || selectedComparison.name.split(' vs ')[1]}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Pros
                        </h4>
                        <ul className="space-y-1">
                          {selectedComparison.pros2.map((pro: string, i: number) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {selectedComparison.cons2 && (
                        <div>
                          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            Cons
                          </h4>
                          <ul className="space-y-1">
                            {selectedComparison.cons2.map((con: string, i: number) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Use Cases */}
                {selectedComparison.useCase1 && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Best For:</h4>
                      <p className="text-blue-800 dark:text-blue-400">{selectedComparison.useCase1}</p>
                    </div>
                    <div className="card p-6 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                      <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Best For:</h4>
                      <p className="text-purple-800 dark:text-purple-400">{selectedComparison.useCase2}</p>
                    </div>
                  </div>
                )}

                {/* Documentation Links */}
                {selectedComparison.docs1 && (
                  <div className="flex gap-4 justify-center">
                    <a
                      href={selectedComparison.docs1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {selectedComparison.tech1 || selectedComparison.name.split(' vs ')[0]} Docs →
                    </a>
                    <a
                      href={selectedComparison.docs2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      {selectedComparison.tech2 || selectedComparison.name.split(' vs ')[1]} Docs →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
