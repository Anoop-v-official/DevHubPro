'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JWTDecoderPage() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');

  const decodeJWT = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        alert('Invalid JWT format');
        return;
      }
      setHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
    } catch (err) {
      alert('Invalid JWT token');
    }
  };

  const loadSample = () => {
    setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🔐 JWT Decoder</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Decode and inspect JWT tokens</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div>
            <label className="block font-semibold text-gray-900 dark:text-white mb-2">JWT Token</label>
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste JWT token here..."
              className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={decodeJWT}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Decode JWT
            </button>
            <button
              onClick={loadSample}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition-colors"
            >
              Load Sample
            </button>
          </div>

          {header && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Header</h3>
                <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  {header}
                </pre>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Payload</h3>
                <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  {payload}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
