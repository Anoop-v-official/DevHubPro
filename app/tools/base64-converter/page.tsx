'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';

export default function Base64ConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (err) {
      alert('Invalid input for ' + mode);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/tools" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">🔄 Base64 Converter</h1>
        <p className="text-xl text-gray-600 mb-8">Encode and decode Base64 strings</p>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('encode')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Decode
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={convert}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              Convert
            </button>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-semibold text-gray-900">Output</label>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
