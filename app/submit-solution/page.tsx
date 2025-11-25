'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AlertCircle, Tag, Code, Send, Lock, CheckCircle } from 'lucide-react';

export default function SubmitSolutionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    errorTitle: '',
    errorMessage: '',
    technology: '',
    tags: '',
    solution: '',
    explanation: '',
    references: '',
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to sign in to submit error solutions.
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

  const technologies = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'Go',
    'Rust',
    'PHP',
    'Ruby',
    'React',
    'Node.js',
    'Docker',
    'Git',
    'SQL',
    'MongoDB',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: Implement actual API call to save solution
    console.log('Solution submitted:', formData);

    setIsSubmitting(false);
    alert('Solution submitted successfully!');
    router.push('/errors');
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Submit Error Solution
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Help others by sharing solutions to common errors
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-8 animate-slide-up">
          {/* Error Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Error Title *
            </label>
            <input
              type="text"
              name="errorTitle"
              value={formData.errorTitle}
              onChange={handleChange}
              placeholder="e.g., Cannot find module 'express'"
              className="input"
              required
            />
          </div>

          {/* Error Message */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Error Message *
            </label>
            <textarea
              name="errorMessage"
              value={formData.errorMessage}
              onChange={handleChange}
              placeholder="Paste the complete error message or stack trace here..."
              className="input min-h-[150px] resize-none font-mono text-sm"
              required
            />
          </div>

          {/* Technology */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Technology/Framework *
            </label>
            <select
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select technology</option>
              {technologies.map((tech) => (
                <option key={tech} value={tech}>{tech}</option>
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
              placeholder="e.g., npm, modules, dependencies (comma separated)"
              className="input"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Separate tags with commas
            </p>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Solution *
            </label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              placeholder="Step-by-step solution to fix this error..."
              className="input min-h-[200px] resize-none"
              required
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Provide clear, actionable steps to resolve the error
            </p>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Explanation
            </label>
            <textarea
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              placeholder="Explain why this error occurs and how your solution fixes it..."
              className="input min-h-[150px] resize-none"
            />
          </div>

          {/* References */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              References (Optional)
            </label>
            <textarea
              name="references"
              value={formData.references}
              onChange={handleChange}
              placeholder="Links to documentation, GitHub issues, or related resources (one per line)"
              className="input min-h-[100px] resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 mb-6">
            <p className="text-sm text-purple-900 dark:text-purple-200">
              <strong>Note:</strong> Your solution will be reviewed by our team before publishing.
              High-quality solutions earn reputation points!
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
                  Submit Solution
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/errors')}
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
              Solution Best Practices
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Test the solution before submitting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Include exact commands or code snippets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Explain why the solution works</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Mention any prerequisites or dependencies</span>
              </li>
            </ul>
          </div>

          <div className="card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              What Makes a Great Solution
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span>Clear step-by-step instructions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span>Root cause analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span>Alternative approaches when applicable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span>Links to official documentation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
