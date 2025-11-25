'use client';

import { useState } from 'react';
import { Search, Copy, Star, BookOpen } from 'lucide-react';

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const prompts = [
    {
      title: 'Code Refactoring Assistant',
      category: 'Code Generation',
      prompt: 'Analyze the following code and suggest refactoring improvements for better readability, performance, and maintainability. Explain each suggestion:\n\n[Your code here]',
      icon: '💻',
      popular: true
    },
    {
      title: 'Bug Fix Helper',
      category: 'Debugging',
      prompt: 'I have the following error in my code:\n\n[Error message]\n\nHere is the relevant code:\n\n[Your code]\n\nPlease help me identify the root cause and provide a fix with explanation.',
      icon: '🐛',
      popular: true
    },
    {
      title: 'API Documentation Generator',
      category: 'Documentation',
      prompt: 'Generate comprehensive API documentation for the following code. Include parameters, return types, examples, and edge cases:\n\n[Your API code]',
      icon: '📚',
      popular: true
    },
    {
      title: 'Code Review Checklist',
      category: 'Code Review',
      prompt: 'Review the following code for:\n1. Security vulnerabilities\n2. Performance issues\n3. Code quality and best practices\n4. Edge cases\n\n[Code to review]',
      icon: '👀',
      popular: false
    },
    {
      title: 'Function Generator',
      category: 'Code Generation',
      prompt: 'Write a [language] function that does the following:\n\n[Description]\n\nInclude:\n- Type annotations\n- Error handling\n- Unit test examples\n- JSDoc comments',
      icon: '⚡',
      popular: true
    },
    {
      title: 'Algorithm Explainer',
      category: 'Documentation',
      prompt: 'Explain the following algorithm step by step, including time and space complexity:\n\n[Algorithm code]',
      icon: '📖',
      popular: false
    },
    {
      title: 'Performance Optimization',
      category: 'Debugging',
      prompt: 'Analyze this code for performance bottlenecks and suggest optimizations:\n\n[Code]\n\nProvide benchmarks if possible.',
      icon: '🚀',
      popular: true
    },
    {
      title: 'Test Case Generator',
      category: 'Code Generation',
      prompt: 'Generate comprehensive test cases for the following function, including edge cases:\n\n[Function code]\n\nUse [testing framework]',
      icon: '🧪',
      popular: false
    },
    {
      title: 'SQL Query Optimizer',
      category: 'Code Review',
      prompt: 'Review and optimize this SQL query:\n\n[SQL query]\n\nSuggest indexes and explain performance improvements.',
      icon: '🔍',
      popular: false
    },
    {
      title: 'Git Commit Message Helper',
      category: 'Documentation',
      prompt: 'Based on these changes, suggest a clear commit message following conventional commits:\n\n[List of changes]',
      icon: '📝',
      popular: true
    },
  ];

  const categories = ['All', 'Code Generation', 'Debugging', 'Documentation', 'Code Review'];

  const filteredPrompts = prompts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            AI Prompts Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Curated prompts for ChatGPT, Claude, and other AI assistants
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 text-lg shadow-soft focus:shadow-glow"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((item, index) => (
            <div
              key={index}
              className="card p-6 hover:scale-105 transition-transform group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.popular && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full mb-3">
                  <Star className="w-3 h-3" />
                  POPULAR
                </span>
              )}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {item.prompt}
              </p>
              <button
                onClick={() => copyPrompt(item.prompt)}
                className="btn btn-ghost text-sm w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20"
              >
                <Copy className="w-4 h-4" />
                Copy Prompt
              </button>
            </div>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No prompts found. Try a different search or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
