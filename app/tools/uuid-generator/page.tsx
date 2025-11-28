'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function UUIDGeneratorPage() {
  useToolTracking('UUID Generator', '/tools/uuid-generator');

  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState<number | null>(null);

  const generateV4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateV4());
    setUuids(newUuids);
  };

  const copyToClipboard = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  // Generate UUIDs on mount
  useState(() => {
    generateUUIDs();
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🔖 UUID Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate UUIDs (v4) for unique identifiers</p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block font-semibold text-gray-900 dark:text-white mb-2">
                Number of UUIDs
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
              onClick={generateUUIDs}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" />
              Generate
            </button>
          </div>
        </div>

        {/* UUID List */}
        {uuids.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white">Generated UUIDs</h2>
              <button
                onClick={copyAll}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                {copied === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === -1 ? 'Copied All!' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <span className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                    {uuid}
                  </span>
                  <button
                    onClick={() => copyToClipboard(uuid, index)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copied === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About UUIDs</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
            Version 4 UUIDs are randomly generated and have a very low probability of collision, making them perfect for
            database keys, session IDs, and distributed systems.
          </p>
        </div>
      </div>
    </div>
  );
}
