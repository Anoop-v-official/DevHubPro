'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Upload } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function Base64ConverterPage() {
  useToolTracking('Base64 Converter', '/tools/base64-converter');

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Auto-convert when input changes
  useEffect(() => {
    if (input.trim()) {
      convert();
    } else {
      setOutput('');
      setImagePreview('');
    }
  }, [input, mode]);

  const convert = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(input);
        setOutput(encoded);
        setImagePreview('');
      } else {
        // Decode mode
        let base64Data = input.trim();

        // Check if it's a data URL (data:image/png;base64,...)
        if (base64Data.startsWith('data:')) {
          setImagePreview(base64Data);
          // Extract just the base64 part for output
          const base64Part = base64Data.split(',')[1] || base64Data;
          try {
            setOutput(atob(base64Part));
          } catch {
            setOutput('Image data (binary)');
          }
        } else {
          // Plain base64 string
          const decoded = atob(base64Data);
          setOutput(decoded);

          // Try to detect if it's an image by checking for common image file headers
          const isPNG = decoded.startsWith('\x89PNG');
          const isJPEG = decoded.startsWith('\xff\xd8\xff');
          const isGIF = decoded.startsWith('GIF');
          const isWEBP = decoded.includes('WEBP');

          if (isPNG || isJPEG || isGIF || isWEBP) {
            let mimeType = 'image/png';
            if (isJPEG) mimeType = 'image/jpeg';
            if (isGIF) mimeType = 'image/gif';
            if (isWEBP) mimeType = 'image/webp';

            setImagePreview(`data:${mimeType};base64,${base64Data}`);
            setOutput('Image data (binary)');
          } else {
            setImagePreview('');
          }
        }
      }
    } catch (err) {
      setOutput('Error: Invalid Base64 input');
      setImagePreview('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setInput(dataUrl.split(',')[1]); // Set just the base64 part as input
      setImagePreview(dataUrl); // Show preview
      setMode('encode');
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyBase64WithPrefix = () => {
    if (imagePreview) {
      navigator.clipboard.writeText(imagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadExample = () => {
    if (mode === 'encode') {
      setInput('Hello, World! This is a Base64 encoding example.');
    } else {
      // Example: Small red pixel PNG
      setInput('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🔄 Base64 Converter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Encode and decode Base64 strings and images</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setMode('encode')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Decode
            </button>
            <button
              onClick={loadExample}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition-colors"
            >
              Load Example
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-semibold text-gray-900 dark:text-white">Input</label>
                {mode === 'encode' && (
                  <label className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode or upload an image...' : 'Paste Base64 string (with or without data:image prefix)...'}
                className="w-full h-64 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>

            {/* Output Section */}
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
                placeholder="Result will appear here..."
                className="w-full h-64 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Image Preview</h3>
                <button
                  onClick={copyBase64WithPrefix}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Copy Data URL
                </button>
              </div>
              <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-96 object-contain rounded shadow-lg"
                  onError={() => setImagePreview('')}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Data URL: {imagePreview.substring(0, 50)}...
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Base64 Encoding</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
            Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format. It's commonly used for:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
            <li>Embedding images in HTML/CSS (data URLs)</li>
            <li>Encoding binary data in JSON/XML</li>
            <li>Email attachments (MIME)</li>
            <li>Storing binary data in text-based systems</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
            <strong>Tip:</strong> Upload an image file to instantly convert it to Base64, or paste Base64 data to see the decoded image!
          </p>
        </div>
      </div>
    </div>
  );
}
