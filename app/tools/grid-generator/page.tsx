'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function GridGeneratorPage() {
  useToolTracking('Grid Generator', '/tools/grid-generator');

  const [columns, setColumns] = useState('3');
  const [rows, setRows] = useState('3');
  const [gap, setGap] = useState('10');
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    return `.container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, auto);
  gap: ${gap}px;
}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gridItems = Array.from({ length: parseInt(columns) * parseInt(rows) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🎯 Grid Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">CSS Grid layout generator</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Controls</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Columns</label>
                <input
                  type="number"
                  value={columns}
                  onChange={(e) => setColumns(e.target.value)}
                  min="1"
                  max="12"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rows</label>
                <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  min="1"
                  max="12"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gap (px)</label>
                <input
                  type="number"
                  value={gap}
                  onChange={(e) => setGap(e.target.value)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Generated CSS</h3>
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 bg-gray-900 dark:bg-black text-green-400 rounded-lg font-mono text-sm overflow-auto">
              {generateCSS()}
            </pre>

            <div className="mt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Preview</h3>
              <div
                className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, auto)`,
                  gap: `${gap}px`
                }}
              >
                {gridItems.map((num) => (
                  <div key={num} className="bg-blue-500 text-white rounded p-4 text-center">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About CSS Grid</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            CSS Grid is a powerful 2-dimensional layout system for creating complex, responsive layouts.
          </p>
        </div>
      </div>
    </div>
  );
}
