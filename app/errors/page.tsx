'use client';

import { useState } from 'react';
import { Search, Plus, TrendingUp, MessageSquare, Eye, CheckCircle, ArrowUp, ArrowDown, Clock, Filter, Tag } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

export default function ErrorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unanswered' | 'popular' | 'recent'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { openAuthModal } = useAuth();

  // Sample error questions data (in a real app, this would come from a database)
  const questions = [
    {
      id: 1,
      title: 'TypeError: Cannot read property "map" of undefined in React',
      description: 'I\'m trying to map over an array of users in my React component, but I\'m getting this error when the component renders. The data comes from an API call...',
      tags: ['javascript', 'react', 'arrays', 'undefined'],
      author: 'Sarah Chen',
      authorAvatar: 'SC',
      timeAgo: '2 hours ago',
      votes: 23,
      answers: 5,
      views: 142,
      hasAcceptedAnswer: true,
      bounty: null,
    },
    {
      id: 2,
      title: 'CORS policy: No "Access-Control-Allow-Origin" header present',
      description: 'When making a fetch request to my Express API from my React frontend, I get a CORS error. I\'ve tried adding cors middleware but still getting the error...',
      tags: ['cors', 'express', 'react', 'api'],
      author: 'Michael Torres',
      authorAvatar: 'MT',
      timeAgo: '5 hours ago',
      votes: 18,
      answers: 3,
      views: 234,
      hasAcceptedAnswer: true,
      bounty: null,
    },
    {
      id: 3,
      title: 'ModuleNotFoundError: No module named "django.core.urlresolvers"',
      description: 'After upgrading to Django 3.0, I\'m getting this error. It seems like the module has been moved or removed in newer versions...',
      tags: ['python', 'django', 'migration', 'django-3.0'],
      author: 'Alex Kumar',
      authorAvatar: 'AK',
      timeAgo: '1 day ago',
      votes: 45,
      answers: 8,
      views: 567,
      hasAcceptedAnswer: true,
      bounty: null,
    },
    {
      id: 4,
      title: 'NullPointerException when accessing database in Spring Boot',
      description: 'My Spring Boot application throws a NullPointerException when trying to access the database. The repository seems to be null even though I\'ve annotated it with @Autowired...',
      tags: ['java', 'spring-boot', 'jpa', 'null-pointer'],
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      timeAgo: '3 days ago',
      votes: 12,
      answers: 0,
      views: 89,
      hasAcceptedAnswer: false,
      bounty: 50,
    },
    {
      id: 5,
      title: 'Docker container exits immediately after starting',
      description: 'I\'ve created a Docker image for my Node.js app, but the container exits immediately after I run it. The logs show "Error: Cannot find module"...',
      tags: ['docker', 'nodejs', 'containers', 'debugging'],
      author: 'David Park',
      authorAvatar: 'DP',
      timeAgo: '1 week ago',
      votes: 34,
      answers: 6,
      views: 456,
      hasAcceptedAnswer: true,
      bounty: null,
    },
    {
      id: 6,
      title: 'Next.js hydration mismatch error in production',
      description: 'Getting hydration mismatch warnings in production but not in development. The error says "Text content does not match server-rendered HTML"...',
      tags: ['nextjs', 'react', 'ssr', 'hydration'],
      author: 'Lisa Anderson',
      authorAvatar: 'LA',
      timeAgo: '2 days ago',
      votes: 28,
      answers: 4,
      views: 312,
      hasAcceptedAnswer: false,
      bounty: null,
    },
  ];

  const popularTags = [
    { name: 'javascript', count: 1243 },
    { name: 'python', count: 987 },
    { name: 'react', count: 856 },
    { name: 'typescript', count: 654 },
    { name: 'nodejs', count: 543 },
    { name: 'docker', count: 432 },
    { name: 'api', count: 398 },
    { name: 'database', count: 367 },
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredQuestions = questions.filter(q => {
    // Filter by search query
    if (searchQuery && !q.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !q.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by selected tags
    if (selectedTags.length > 0 && !selectedTags.some(tag => q.tags.includes(tag))) {
      return false;
    }

    // Filter by active filter
    if (activeFilter === 'unanswered' && q.answers > 0) return false;
    if (activeFilter === 'popular' && q.votes < 20) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Error Solutions & Q&A
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get help with your coding errors from the community
              </p>
            </div>
            <button
              onClick={openAuthModal}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-glow whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Ask Question
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for errors, keywords, or tags..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {filteredQuestions.length} questions
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('unanswered')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'unanswered'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Unanswered
                </button>
                <button
                  onClick={() => setActiveFilter('popular')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'popular'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => setActiveFilter('recent')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'recent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Recent
                </button>
              </div>
            </div>

            {/* Selected Tags Filter */}
            {selectedTags.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">Active Filters:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      {tag} ×
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedTags([])}
                    className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No questions found matching your criteria</p>
                  <button
                    onClick={openAuthModal}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
                  >
                    <Plus className="w-5 h-5" />
                    Ask the First Question
                  </button>
                </div>
              ) : (
                filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Stats Sidebar */}
                      <div className="flex flex-col items-center gap-3 min-w-[80px]">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {question.votes}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">votes</div>
                        </div>

                        <div className={`flex flex-col items-center ${
                          question.hasAcceptedAnswer
                            ? 'text-green-600 dark:text-green-400'
                            : question.answers > 0
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          <div className="text-xl font-bold flex items-center gap-1">
                            {question.hasAcceptedAnswer && <CheckCircle className="w-5 h-5" />}
                            {question.answers}
                          </div>
                          <div className="text-xs">answers</div>
                        </div>

                        <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                          <div className="text-sm font-semibold">{question.views}</div>
                          <div className="text-xs">views</div>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3
                            onClick={() => alert(`Viewing question: "${question.title}"\n\nThis feature is coming soon! Sign in to ask and answer questions.`)}
                            className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                          >
                            {question.title}
                          </h3>
                          {question.bounty && (
                            <span className="px-3 py-1 bg-gradient-to-r from-orange-600 to-yellow-600 text-white text-xs font-bold rounded-full whitespace-nowrap">
                              +{question.bounty} bounty
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {question.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {question.tags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                selectedTags.includes(tag)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {question.authorAvatar}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {question.author}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {question.timeAgo}
                              </div>
                            </div>
                          </div>

                          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:scale-105 transition-transform">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredQuestions.length > 0 && (
              <div className="mt-8 flex justify-center gap-2">
                <button className="px-4 py-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                  1
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
              <h3 className="font-bold text-lg mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Questions</span>
                  <span className="text-2xl font-bold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Answered</span>
                  <span className="text-2xl font-bold">987</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Contributors</span>
                  <span className="text-2xl font-bold">5,432</span>
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-gray-900 dark:text-white">Popular Tags</h3>
              </div>
              <div className="space-y-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => toggleTag(tag.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTags.includes(tag.name)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium">{tag.name}</span>
                    <span className="text-xs opacity-75">{tag.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 p-6">
              <h3 className="font-bold text-yellow-900 dark:text-yellow-300 mb-3">
                Asking Guidelines
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-2">
                <li>• Search before posting</li>
                <li>• Be specific and clear</li>
                <li>• Include code examples</li>
                <li>• Add relevant tags</li>
                <li>• Show what you've tried</li>
              </ul>
              <button
                onClick={openAuthModal}
                className="mt-4 w-full text-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold text-sm"
              >
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
