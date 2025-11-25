'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copy, Check } from 'lucide-react';

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [md5, setMd5] = useState('');
  const [sha256, setSha256] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (input) {
      generateHashes();
    } else {
      setMd5('');
      setSha256('');
    }
  }, [input]);

  const generateHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256Array = Array.from(new Uint8Array(sha256Buffer));
    const sha256Hex = sha256Array.map(b => b.toString(16).padStart(2, '0')).join('');
    setSha256(sha256Hex);
    
    setMd5('MD5 requires server-side implementation');
  };

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🔒 Hash Generator</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Generate cryptographic hashes</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div>
            <label className="block font-semibold text-gray-900 dark:text-white mb-2">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {sha256 && (
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">SHA-256</h3>
                  <button
                    onClick={() => copyHash(sha256, 'sha256')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    {copied === 'sha256' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'sha256' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="text-sm break-all text-gray-900 dark:text-gray-100">{sha256}</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
