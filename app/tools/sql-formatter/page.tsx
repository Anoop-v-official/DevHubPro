'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function SQLFormatterPage() {
  useToolTracking('SQL Formatter', '/tools/sql-formatter');

  const exampleSQL = `SELECT users.id,users.name,users.email,orders.id AS order_id,orders.total FROM users INNER JOIN orders ON users.id=orders.user_id WHERE users.status='active' AND orders.total>100 ORDER BY orders.created_at DESC LIMIT 10;`;

  const [input, setInput] = useState(exampleSQL);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-format on input change
  useEffect(() => {
    formatSQL();
  }, [input]);

  const formatSQL = () => {
    try {
      let formatted = input.trim();
      let indent = 0;
      const indentStr = '  ';

      // Add line breaks for major SQL keywords
      formatted = formatted
        .replace(/\b(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL JOIN|ON|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|OFFSET|UNION|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|CREATE TABLE|ALTER TABLE|DROP TABLE)\b/gi, '\n$1')
        .split('\n')
        .map(line => {
          line = line.trim();
          if (!line) return '';

          // Keywords that increase indent
          if (/^(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL JOIN|ORDER BY|GROUP BY|HAVING)\b/i.test(line)) {
            const result = indentStr.repeat(indent) + line;
            indent++;
            return result;
          }

          // Keywords that maintain current indent
          if (/^(AND|OR|ON)\b/i.test(line)) {
            return indentStr.repeat(Math.max(0, indent - 1)) + line;
          }

          // Reset indent for new statements
          if (/^(INSERT INTO|UPDATE|DELETE FROM|CREATE TABLE|ALTER TABLE|DROP TABLE)\b/i.test(line)) {
            indent = 0;
            return line;
          }

          return indentStr.repeat(Math.max(0, indent - 1)) + line;
        })
        .filter(line => line.length > 0)
        .join('\n');

      // Clean up commas
      formatted = formatted.replace(/\s*,\s*/g, ', ');

      setOutput(formatted);
    } catch (err) {
      setOutput('Error formatting SQL');
    }
  };

  const minifySQL = () => {
    try {
      const minified = input
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*=\s*/g, '=')
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        .trim();
      setOutput(minified);
    } catch (err) {
      setOutput('Error minifying SQL');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput(exampleSQL);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🗄️ SQL Formatter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Format and beautify SQL queries with proper indentation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">Input SQL</label>
              <button
                onClick={loadExample}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Load Example
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your SQL query here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={formatSQL}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Format
              </button>
              <button
                onClick={minifySQL}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors"
              >
                Minify
              </button>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">Output</label>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted SQL will appear here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About SQL Formatting</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            SQL formatting adds proper indentation and line breaks to make your queries more readable and maintainable.
            Use "Format" to beautify your SQL or "Minify" to compress it for storage or transmission.
            Supports SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, and JOIN operations.
          </p>
        </div>
      </div>
    </div>
  );
}
