'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function LoremIpsumPage() {
  useToolTracking('Lorem Ipsum Generator', '/tools/lorem-ipsum');

  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWord = () => loremWords[Math.floor(Math.random() * loremWords.length)];

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const words = Array.from({ length }, (_, i) => i === 0 ? 'Lorem' : generateWord());
    return words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 3) + 3;
    return Array.from({ length: sentenceCount }, () => generateSentence()).join(' ');
  };

  const generateLorem = () => {
    let result = '';

    if (type === 'words') {
      result = Array.from({ length: count }, () => generateWord()).join(' ');
    } else if (type === 'sentences') {
      result = Array.from({ length: count }, () => generateSentence()).join(' ');
    } else if (type === 'paragraphs') {
      result = Array.from({ length: count }, () => generateParagraph()).join('\n\n');
    }

    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate on mount
  useState(() => {
    generateLorem();
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">📝 Lorem Ipsum Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate placeholder text for your designs</p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <button
              onClick={() => setType('paragraphs')}
              className={`py-3 px-6 rounded-lg font-semibold transition-all ${
                type === 'paragraphs'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Paragraphs
            </button>
            <button
              onClick={() => setType('sentences')}
              className={`py-3 px-6 rounded-lg font-semibold transition-all ${
                type === 'sentences'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Sentences
            </button>
            <button
              onClick={() => setType('words')}
              className={`py-3 px-6 rounded-lg font-semibold transition-all ${
                type === 'words'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Words
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Count
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button
              onClick={generateLorem}
              className="mt-7 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" />
              Generate
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Generated Text</h2>
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
          <div className="min-h-[300px] p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
            {output || 'Click "Generate" to create Lorem Ipsum text'}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Lorem Ipsum</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Lorem Ipsum is dummy text used in the printing and typesetting industry since the 1500s.
            It's used as placeholder text to demonstrate the visual form of a document without relying on meaningful content.
            Perfect for mockups, prototypes, and design presentations!
          </p>
        </div>
      </div>
    </div>
  );
}
