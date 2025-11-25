'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BookOpen, Tag, FileText, Send, Lock } from 'lucide-react';

export default function SubmitArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: '',
    content: '',
    excerpt: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="card p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to sign in to submit articles.
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn btn-primary w-full"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const categories = [
    'Web Development',
    'Mobile Development',
    'DevOps',
    'Cloud Computing',
    'Security',
    'AI/ML',
    'Database',
    'Testing',
    'Architecture',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: Implement actual API call to save article
    console.log('Article submitted:', formData);

    setIsSubmitting(false);
    alert('Article submitted successfully!');
    router.push('/blog');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Submit an Article
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Share your knowledge with the developer community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-8 animate-slide-up">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Article Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Building Scalable APIs with Node.js"
              className="input"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., javascript, nodejs, api (comma separated)"
              className="input"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Separate tags with commas
            </p>
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Short Description *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of your article (2-3 sentences)"
              className="input min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Article Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article content here... (Markdown supported)"
              className="input min-h-[400px] resize-none font-mono text-sm"
              required
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              You can use Markdown formatting
            </p>
          </div>

          {/* Preview Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Note:</strong> Your article will be reviewed by our team before publishing.
              We'll notify you once it's live!
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Article
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/blog')}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Writing Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Use clear, descriptive titles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Include code examples when relevant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Break content into sections with headings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Add relevant tags for better discoverability</span>
              </li>
            </ul>
          </div>

          <div className="card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Markdown Basics
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-mono">
              <li># Heading 1</li>
              <li>## Heading 2</li>
              <li>**Bold text**</li>
              <li>*Italic text*</li>
              <li>`inline code`</li>
              <li>```code block```</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
