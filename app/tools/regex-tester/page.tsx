'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function RegexTesterPage() {
  useToolTracking('Regex Tester', '/tools/regex-tester');

  const examplePattern = '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b';
  const exampleText = `Contact us at support@example.com or admin@devhubpro.com
For sales inquiries: sales@company.org
Invalid emails: notanemail, @example.com, user@.com`;

  const [pattern, setPattern] = useState(examplePattern);
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState(exampleText);
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-test on input change
  useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const foundMatches: RegExpMatchArray[] = [];

      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push(match);
        }
      } else {
        const match = testString.match(regex);
        if (match) foundMatches.push(match);
      }

      setMatches(foundMatches);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setMatches([]);
    }
  };

  const getHighlightedText = () => {
    if (matches.length === 0) return testString;

    try {
      const regex = new RegExp(pattern, flags);
      return testString.replace(regex, (match) => `<mark class="bg-yellow-300 dark:bg-yellow-600 font-bold">${match}</mark>`);
    } catch {
      return testString;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setPattern(examplePattern);
    setTestString(exampleText);
    setFlags('gi');
  };

  const commonPatterns = [
    { name: 'Email', pattern: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { name: 'Phone', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}' },
    { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
    { name: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🔍 Regex Tester</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Test and debug regular expressions with live results</p>
        </div>

        {/* Regex Pattern */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block font-semibold text-gray-900 dark:text-white">Regular Expression</label>
            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Load Example
              </button>
              {pattern && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-2xl text-gray-500 dark:text-gray-400 mt-2">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <span className="text-2xl text-gray-500 dark:text-gray-400 mt-2">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gi"
              className="w-20 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center"
            />
          </div>
          <div className="flex gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Flags:</span>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={flags.includes('g')} onChange={(e) => setFlags(e.target.checked ? flags + 'g' : flags.replace('g', ''))} />
              g (global)
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={flags.includes('i')} onChange={(e) => setFlags(e.target.checked ? flags + 'i' : flags.replace('i', ''))} />
              i (case-insensitive)
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={flags.includes('m')} onChange={(e) => setFlags(e.target.checked ? flags + 'm' : flags.replace('m', ''))} />
              m (multiline)
            </label>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">Common Patterns</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {commonPatterns.map((item) => (
              <button
                key={item.name}
                onClick={() => setPattern(item.pattern)}
                className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 text-sm font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Test String */}
          <div>
            <label className="block font-semibold text-gray-900 dark:text-white mb-2">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against..."
              className="w-full h-64 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          {/* Highlighted Output */}
          <div>
            <label className="block font-semibold text-gray-900 dark:text-white mb-2">
              Highlighted Matches
              {matches.length > 0 && (
                <span className="ml-2 text-sm font-normal text-green-600 dark:text-green-400">
                  ({matches.length} {matches.length === 1 ? 'match' : 'matches'})
                </span>
              )}
            </label>
            <div
              className="w-full h-64 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-200">Invalid Regular Expression</p>
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Matches Details */}
        {matches.length > 0 && !error && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Match Details</h3>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Match #{index + 1}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Index: {match.index}</span>
                  </div>
                  <p className="font-mono text-sm text-gray-900 dark:text-gray-100 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                    {match[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Regular Expressions</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Regular expressions (regex) are patterns used to match character combinations in strings.
            They're powerful tools for text processing, validation, and search operations.
            Test your patterns in real-time to ensure they work correctly before using them in your code!
          </p>
        </div>
      </div>
    </div>
  );
}
