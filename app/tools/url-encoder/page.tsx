'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function URLEncoderPage() {
  useToolTracking('URL Encoder', '/tools/url-encoder');

  const [input, setInput] = useState('https://example.com/path?name=John Doe&age=30');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // Auto-encode/decode on input change
  useEffect(() => {
    if (mode === 'encode') {
      try {
        setOutput(encodeURIComponent(input));
      } catch (err) {
        setOutput('');
      }
    } else {
      try {
        setOutput(decodeURIComponent(input));
      } catch (err) {
        setOutput('');
      }
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    if (mode === 'encode') {
      setInput('https://example.com/search?q=hello world&lang=en');
    } else {
      setInput('https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🔗 URL Encoder/Decoder</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Encode or decode URLs for safe transmission</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              mode === 'encode'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              mode === 'decode'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">Input</label>
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
              placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL to decode...'}
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
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
              placeholder="Output will appear here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 What is URL Encoding?</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            URL encoding (percent encoding) converts characters into a format that can be safely transmitted over the internet.
            Special characters are replaced with a '%' followed by hexadecimal digits. This is essential for passing data in URLs.
          </p>
        </div>
      </div>
    </div>
  );
}
