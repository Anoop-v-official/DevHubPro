'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function HTMLEntityEncoderPage() {
  useToolTracking('HTML Entity Encoder', '/tools/html-entity-encoder');

  const exampleText = `<div class="example">
  <p>This is a "test" & 'example' with <special> characters!</p>
  <a href="https://example.com?param=value&other=123">Link</a>
</div>`;

  const [input, setInput] = useState(exampleText);
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  // Auto-convert on input change
  useEffect(() => {
    if (mode === 'encode') {
      encodeHTML();
    } else {
      decodeHTML();
    }
  }, [input, mode]);

  const encodeHTML = () => {
    const encoded = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\//g, '&#x2F;');
    setOutput(encoded);
  };

  const decodeHTML = () => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    setOutput(textarea.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput(exampleText);
  };

  const commonEntities = [
    { entity: '&lt;', char: '<', name: 'Less than' },
    { entity: '&gt;', char: '>', name: 'Greater than' },
    { entity: '&amp;', char: '&', name: 'Ampersand' },
    { entity: '&quot;', char: '"', name: 'Double quote' },
    { entity: '&#39;', char: "'", name: 'Single quote' },
    { entity: '&nbsp;', char: ' ', name: 'Non-breaking space' },
    { entity: '&copy;', char: '©', name: 'Copyright' },
    { entity: '&reg;', char: '®', name: 'Registered' },
    { entity: '&trade;', char: '™', name: 'Trademark' },
    { entity: '&euro;', char: '€', name: 'Euro' },
    { entity: '&pound;', char: '£', name: 'Pound' },
    { entity: '&yen;', char: '¥', name: 'Yen' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🔤 HTML Entity Encoder</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Encode and decode HTML entities</p>
        </div>

        {/* Mode Toggle */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('encode')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">
                {mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
              </label>
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
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter HTML entities to decode...'}
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">
                {mode === 'encode' ? 'HTML Entities' : 'Plain Text'}
              </label>
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

        {/* Common Entities Reference */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Common HTML Entities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {commonEntities.map((item) => (
              <div
                key={item.entity}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.char}</span>
                  <button
                    onClick={() => {
                      if (mode === 'encode') {
                        setInput(input + item.char);
                      } else {
                        setInput(input + item.entity);
                      }
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Insert
                  </button>
                </div>
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-1">{item.entity}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About HTML Entities</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            HTML entities are used to display reserved characters in HTML. Characters like &lt;, &gt;, and &amp; have special meanings in HTML
            and must be encoded to display correctly. HTML entities start with &amp; and end with a semicolon.
          </p>
        </div>
      </div>
    </div>
  );
}
