'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, TrendingUp, Star, X, Plus } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const posts = [
    {
      id: 'javascript-tips',
      title: '10 JavaScript Tips Every Developer Should Know',
      date: '2024-01-15',
      category: 'JavaScript',
      readTime: '5 min',
      excerpt: 'Master these essential JavaScript techniques to write cleaner, more efficient code.',
      author: 'DevHub Team',
      views: '12.5K',
      popular: true
    },
    {
      title: 'Getting Started with Next.js 14',
      date: '2024-01-12',
      category: 'React',
      readTime: '8 min',
      excerpt: 'Learn the latest features in Next.js 14 including Server Components and App Router.',
      author: 'DevHub Team',
      views: '10.2K',
      popular: true
    },
    {
      title: 'Python vs JavaScript: Complete Comparison 2024',
      date: '2024-01-10',
      category: 'Career',
      readTime: '6 min',
      excerpt: 'Comprehensive guide to choosing between Python and JavaScript for your career.',
      author: 'DevHub Team',
      views: '8.7K',
      popular: true
    },
    {
      title: 'Docker Best Practices for Production',
      date: '2024-01-08',
      category: 'DevOps',
      readTime: '10 min',
      excerpt: 'Essential Docker practices for deploying containerized applications at scale.',
      author: 'DevHub Team',
      views: '7.3K',
      popular: false
    },
    {
      title: 'API Security: OWASP Top 10 Guide',
      date: '2024-01-05',
      category: 'Security',
      readTime: '12 min',
      excerpt: 'Protect your APIs from common vulnerabilities with these security best practices.',
      author: 'DevHub Team',
      views: '6.8K',
      popular: false
    },
    {
      title: 'Building Microservices with Node.js',
      date: '2024-01-03',
      category: 'Backend',
      readTime: '15 min',
      excerpt: 'Step-by-step guide to architecting and building scalable microservices.',
      author: 'DevHub Team',
      views: '5.9K',
      popular: false
    },
  ];

  const categories = ['All', 'JavaScript', 'React', 'DevOps', 'Security', 'Career', 'Backend'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Tips, tutorials, and insights for modern developers
          </p>
          <a
            href="mailto:contact@devhubpro.com?subject=Article Submission"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-glow"
          >
            <Plus className="w-5 h-5" />
            Submit Article
          </a>
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

        {/* Blog Posts */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredPosts.map((post, index) => (
            <article
              key={index}
              className="card p-8 hover:scale-[1.02] transition-transform cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    post.category === 'JavaScript' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                    post.category === 'React' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                    post.category === 'DevOps' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                    post.category === 'Security' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                    post.category === 'Career' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {post.category}
                  </span>
                  {post.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  {post.views}
                </div>
              </div>

              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="card p-8 mt-12 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 border-none">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Contribute?
          </h2>
          <p className="text-lg text-blue-100 dark:text-blue-200 mb-6">
            Share your knowledge with the developer community
          </p>
          <a
            href="mailto:contact@devhubpro.com?subject=Article Submission"
            className="btn bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Submit Article
          </a>
        </div>

        {/* Blog Post Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-white" />
                  <span className={`px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white`}>
                    {selectedPost.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {selectedPost.views} views
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {selectedPost.excerpt}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    This is a comprehensive guide covering essential techniques and best practices.
                    In this article, we'll explore various concepts and provide practical examples
                    that you can apply to your projects immediately.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>✓ Learn modern best practices and patterns</li>
                    <li>✓ Understand core concepts with practical examples</li>
                    <li>✓ Implement solutions in real-world scenarios</li>
                    <li>✓ Avoid common pitfalls and mistakes</li>
                  </ul>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 my-8">
                    <p className="text-blue-900 dark:text-blue-300 font-semibold mb-2">💡 Pro Tip</p>
                    <p className="text-blue-800 dark:text-blue-400">
                      Always test your code in different environments and scenarios to ensure reliability and performance.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    Example Code
                  </h2>
                  <pre className="bg-gray-900 dark:bg-black p-6 rounded-lg overflow-x-auto mb-6">
                    <code className="text-green-400 text-sm">
{`// Example implementation
function exampleFunction() {
  console.log("Hello, Developer!");
  return true;
}

// Usage
exampleFunction();`}
                    </code>
                  </pre>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    This example demonstrates a simple implementation. You can adapt this pattern
                    to suit your specific needs and requirements.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    Conclusion
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    By following these guidelines and best practices, you'll be able to write
                    more efficient and maintainable code. Keep practicing and exploring new
                    techniques to continuously improve your skills.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Written by {selectedPost.author} • Published on {selectedPost.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
