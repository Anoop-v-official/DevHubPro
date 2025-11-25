'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, AlertCircle, Tag, FileText, Send, Info } from 'lucide-react';

export default function SubmitErrorPage() {
  const [formData, setFormData] = useState({
    title: '',
    errorMessage: '',
    description: '',
    codeSnippet: '',
    language: '',
    framework: '',
    tags: '',
    attempted: '',
    environment: '',
  });

  const [charCount, setCharCount] = useState({
    title: 0,
    description: 0,
    errorMessage: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'title' || name === 'description' || name === 'errorMessage') {
      setCharCount(prev => ({ ...prev, [name]: value.length }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create email body
    const emailBody = `
ERROR SUBMISSION
================

Title: ${formData.title}

Error Message:
${formData.errorMessage}

Description:
${formData.description}

Code Snippet:
\`\`\`${formData.language}
${formData.codeSnippet}
\`\`\`

Language/Technology: ${formData.language}
Framework: ${formData.framework || 'N/A'}
Tags: ${formData.tags}

What I've Tried:
${formData.attempted}

Environment:
${formData.environment}

---
Submitted via DevHub Pro Error Submission Form
    `.trim();

    // Open email client
    const mailtoLink = `mailto:contact@devhubpro.com?subject=${encodeURIComponent(`Error Submission: ${formData.title}`)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby',
    'Go', 'Rust', 'Swift', 'Kotlin', 'SQL', 'HTML/CSS', 'Shell', 'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/errors"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Error Solutions
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Submit an Error or Issue
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Help the community by sharing your error or get help solving it. Be as detailed as possible.
          </p>
        </div>

        {/* Guidelines */}
        <div className="card p-6 mb-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Writing a good error submission</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• Be specific about the error message and context</li>
                <li>• Include relevant code snippets that reproduce the issue</li>
                <li>• Describe what you expected to happen vs what actually happened</li>
                <li>• Mention what you've already tried to fix it</li>
                <li>• Add relevant tags to help others find your issue</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="card p-6">
            <label className="block font-bold text-gray-900 dark:text-white mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Be specific and imagine you're asking another developer about your problem
            </p>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., TypeError: Cannot read property 'map' of undefined in React component"
              className="input w-full"
              required
              maxLength={150}
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {charCount.title}/150 characters
            </div>
          </div>

          {/* Error Message */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <label className="block font-bold text-gray-900 dark:text-white">
                Error Message <span className="text-red-500">*</span>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Copy and paste the exact error message or stack trace
            </p>
            <textarea
              name="errorMessage"
              value={formData.errorMessage}
              onChange={handleChange}
              placeholder="Paste your error message or stack trace here..."
              className="input w-full font-mono text-sm"
              rows={6}
              required
              maxLength={2000}
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {charCount.errorMessage}/2000 characters
            </div>
          </div>

          {/* Description */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <label className="block font-bold text-gray-900 dark:text-white">
                Detailed Description <span className="text-red-500">*</span>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Explain the context, what you were doing when the error occurred, and what you expected to happen
            </p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="I was trying to map over an array of users in my React component, but I'm getting this error when the component renders..."
              className="input w-full"
              rows={8}
              required
              maxLength={5000}
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {charCount.description}/5000 characters
            </div>
          </div>

          {/* Code Snippet */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <label className="block font-bold text-gray-900 dark:text-white">
                Code Snippet <span className="text-red-500">*</span>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Include the relevant code that causes the error (minimum viable reproducible example)
            </p>
            <textarea
              name="codeSnippet"
              value={formData.codeSnippet}
              onChange={handleChange}
              placeholder="const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};"
              className="input w-full font-mono text-sm bg-gray-900 dark:bg-black text-gray-100"
              rows={12}
              required
            />
          </div>

          {/* Language and Framework */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <label className="block font-bold text-gray-900 dark:text-white mb-2">
                Primary Language <span className="text-red-500">*</span>
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="input w-full"
                required
              >
                <option value="">Select language...</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="card p-6">
              <label className="block font-bold text-gray-900 dark:text-white mb-2">
                Framework/Library
              </label>
              <input
                type="text"
                name="framework"
                value={formData.framework}
                onChange={handleChange}
                placeholder="e.g., React, Django, Spring Boot"
                className="input w-full"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <label className="block font-bold text-gray-900 dark:text-white">
                Tags <span className="text-red-500">*</span>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Add up to 5 tags to categorize your issue (comma-separated)
            </p>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, arrays, mapping, undefined"
              className="input w-full"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Example: react, typescript, hooks, state-management
            </p>
          </div>

          {/* What I've Tried */}
          <div className="card p-6">
            <label className="block font-bold text-gray-900 dark:text-white mb-2">
              What I've Tried <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              List the solutions you've already attempted
            </p>
            <textarea
              name="attempted"
              value={formData.attempted}
              onChange={handleChange}
              placeholder="1. Checked if users array exists before mapping
2. Added console.log to debug the users prop
3. Verified the API response structure
4. Tried adding optional chaining users?.map()"
              className="input w-full"
              rows={6}
              required
            />
          </div>

          {/* Environment */}
          <div className="card p-6">
            <label className="block font-bold text-gray-900 dark:text-white mb-2">
              Environment Details
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              OS, browser, version numbers, etc.
            </p>
            <textarea
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              placeholder="- OS: macOS Sonoma 14.2
- Browser: Chrome 120
- Node: v18.17.0
- React: 18.2.0
- npm: 9.6.7"
              className="input w-full font-mono text-sm"
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Ready to submit?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This will open your email client with a pre-filled message
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-glow whitespace-nowrap"
              >
                <Send className="w-5 h-5" />
                Submit Error
              </button>
            </div>
          </div>
        </form>

        {/* Additional Help */}
        <div className="mt-8 card p-6 bg-gray-100 dark:bg-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">Need help right away?</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Check our <Link href="/errors" className="text-blue-600 dark:text-blue-400 hover:underline">Error Solutions Database</Link> for existing solutions</p>
            <p>• Browse <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">our blog</Link> for tutorials and guides</p>
            <p>• Use our <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:underline">developer tools</Link> to debug your code</p>
          </div>
        </div>
      </div>
    </div>
  );
}
