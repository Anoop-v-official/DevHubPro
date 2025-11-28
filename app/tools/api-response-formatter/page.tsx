'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function APIResponseFormatterPage() {
  useToolTracking('API Response Formatter', '/tools/api-response-formatter');

  const [jsonInput, setJsonInput] = useState(`{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}`);
  const [formatted, setFormatted] = useState('');
  const [minified, setMinified] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      setError('');
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      const minified = JSON.stringify(parsed);

      setFormatted(formatted);
      setMinified(minified);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setFormatted('');
      setMinified('');
    }
  };

  const generateSuccessResponse = () => {
    const template = {
      status: 'success',
      statusCode: 200,
      message: 'Request completed successfully',
      data: {
        id: 1,
        name: 'Example',
        createdAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
    setJsonInput(JSON.stringify(template, null, 2));
  };

  const generateErrorResponse = () => {
    const template = {
      status: 'error',
      statusCode: 400,
      message: 'Bad request',
      error: {
        code: 'INVALID_INPUT',
        details: 'The provided input is invalid',
      },
      timestamp: new Date().toISOString(),
    };
    setJsonInput(JSON.stringify(template, null, 2));
  };

  const generatePaginatedResponse = () => {
    const template = {
      status: 'success',
      statusCode: 200,
      data: {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
        ],
        pagination: {
          total: 100,
          page: 1,
          limit: 10,
          pages: 10,
        },
      },
      timestamp: new Date().toISOString(),
    };
    setJsonInput(JSON.stringify(template, null, 2));
  };

  const generateNestedResponse = () => {
    const template = {
      status: 'success',
      statusCode: 200,
      data: {
        user: {
          id: 1,
          name: 'John Doe',
          profile: {
            bio: 'Software developer',
            location: 'New York',
            links: {
              twitter: 'https://twitter.com',
              github: 'https://github.com',
            },
          },
          posts: [
            { id: 1, title: 'Post 1', likes: 10 },
            { id: 2, title: 'Post 2', likes: 25 },
          ],
        },
      },
      timestamp: new Date().toISOString(),
    };
    setJsonInput(JSON.stringify(template, null, 2));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStats = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      return {
        keys: Object.keys(parsed).length,
        size: json.length,
        lines: json.split('\n').length,
      };
    } catch {
      return null;
    }
  };

  const stats = getStats(jsonInput);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">API Response Formatter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Format, minify, and validate JSON responses</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input & Controls */}
          <div className="space-y-6">
            {/* JSON Input */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">JSON Input</h3>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON response here..."
                rows={12}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
              {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">Error: {error}</p>}
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={formatJSON}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  Format JSON
                </button>
                <button
                  onClick={() => setJsonInput('')}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Response Templates</h3>
              <div className="space-y-2">
                <button
                  onClick={generateSuccessResponse}
                  className="w-full px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 text-sm font-medium transition-colors"
                >
                  Success Response
                </button>
                <button
                  onClick={generateErrorResponse}
                  className="w-full px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 text-sm font-medium transition-colors"
                >
                  Error Response
                </button>
                <button
                  onClick={generatePaginatedResponse}
                  className="w-full px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 text-sm font-medium transition-colors"
                >
                  Paginated Response
                </button>
                <button
                  onClick={generateNestedResponse}
                  className="w-full px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 text-sm font-medium transition-colors"
                >
                  Nested Response
                </button>
              </div>
            </div>

            {/* Stats */}
            {stats && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Top Level Keys</span>
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{stats.keys}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Size (bytes)</span>
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{stats.size}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Lines</span>
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{stats.lines}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-6">
            {/* Formatted Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Formatted JSON</h3>
                <button
                  onClick={() => copyToClipboard(formatted)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-64">
                <code className="text-green-400 text-xs font-mono whitespace-pre">
                  {formatted || 'Click "Format JSON" to see results'}
                </code>
              </div>
            </div>

            {/* Minified Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Minified JSON</h3>
                <button
                  onClick={() => copyToClipboard(minified)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-64">
                <code className="text-green-400 text-xs font-mono whitespace-pre-wrap break-all">
                  {minified || 'Click "Format JSON" to see results'}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">About JSON Formatting</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            This tool helps you format and validate JSON responses from APIs. Use the templates to generate common response structures,
            then format them with proper indentation for readability. Minified output removes whitespace for smaller file sizes.
          </p>
        </div>
      </div>
    </div>
  );
}
