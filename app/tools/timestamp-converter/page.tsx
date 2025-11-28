'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Clock } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function TimestampConverterPage() {
  useToolTracking('Timestamp Converter', '/tools/timestamp-converter');

  const [timestamp, setTimestamp] = useState(Date.now().toString());
  const [datetime, setDatetime] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-convert timestamp to datetime
  useEffect(() => {
    try {
      const ts = parseInt(timestamp);
      if (!isNaN(ts)) {
        const date = new Date(ts);
        setDatetime(date.toISOString());
      }
    } catch (err) {
      setDatetime('');
    }
  }, [timestamp]);

  const setCurrentTimestamp = () => {
    setTimestamp(Date.now().toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(timestamp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: Date) => {
    return {
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const parsedDate = timestamp && !isNaN(parseInt(timestamp))
    ? formatDate(new Date(parseInt(timestamp)))
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">⏱️ Timestamp Converter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Convert between Unix timestamps and human-readable dates</p>
        </div>

        {/* Current Timestamp */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 p-6 rounded-lg shadow-lg mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Current Unix Timestamp</p>
              <p className="text-3xl font-bold font-mono">{Date.now()}</p>
            </div>
            <Clock className="w-12 h-12 opacity-75" />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <label className="block font-semibold text-gray-900 dark:text-white mb-2">
            Unix Timestamp (milliseconds)
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="Enter timestamp..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={setCurrentTimestamp}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors whitespace-nowrap"
            >
              Now
            </button>
            {timestamp && (
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Output */}
        {parsedDate && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Converted Formats</h2>
            <div className="space-y-3">
              {Object.entries(parsedDate).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase sm:w-32">
                    {key}
                  </span>
                  <span className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Unix Timestamps</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            A Unix timestamp is the number of milliseconds (or seconds) that have elapsed since January 1, 1970 (UTC).
            It's a standard way to represent dates and times in programming, especially useful for storing dates in databases
            and performing date calculations.
          </p>
        </div>
      </div>
    </div>
  );
}
