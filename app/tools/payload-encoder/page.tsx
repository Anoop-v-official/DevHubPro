'use client';

import { useState } from 'react';
import { Code, Copy, ArrowRightLeft } from 'lucide-react';

export default function PayloadEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodingType, setEncodingType] = useState('base64');

  const encodingTypes = [
    { value: 'base64', label: 'Base64' },
    { value: 'url', label: 'URL Encoding' },
    { value: 'html', label: 'HTML Entities' },
    { value: 'hex', label: 'Hexadecimal' },
    { value: 'unicode', label: 'Unicode Escape' },
    { value: 'binary', label: 'Binary' },
    { value: 'rot13', label: 'ROT13' },
    { value: 'morse', label: 'Morse Code' },
  ];

  const encode = (text: string, type: string): string => {
    try {
      switch (type) {
        case 'base64':
          return btoa(text);

        case 'url':
          return encodeURIComponent(text);

        case 'html':
          return text.replace(/[&<>"']/g, (char) => {
            const entities: Record<string, string> = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#39;'
            };
            return entities[char] || char;
          });

        case 'hex':
          return text.split('').map(char =>
            char.charCodeAt(0).toString(16).padStart(2, '0')
          ).join('');

        case 'unicode':
          return text.split('').map(char =>
            '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')
          ).join('');

        case 'binary':
          return text.split('').map(char =>
            char.charCodeAt(0).toString(2).padStart(8, '0')
          ).join(' ');

        case 'rot13':
          return text.replace(/[a-zA-Z]/g, (char) => {
            const code = char.charCodeAt(0);
            const base = code >= 97 ? 97 : 65;
            return String.fromCharCode(((code - base + 13) % 26) + base);
          });

        case 'morse':
          const morseCode: Record<string, string> = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
            '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.', ' ': '/'
          };
          return text.toUpperCase().split('').map(char =>
            morseCode[char] || char
          ).join(' ');

        default:
          return text;
      }
    } catch (error) {
      return 'Error encoding';
    }
  };

  const decode = (text: string, type: string): string => {
    try {
      switch (type) {
        case 'base64':
          return atob(text);

        case 'url':
          return decodeURIComponent(text);

        case 'html':
          const textarea = document.createElement('textarea');
          textarea.innerHTML = text;
          return textarea.value;

        case 'hex':
          const hexMatch = text.match(/.{1,2}/g);
          if (!hexMatch) return 'Invalid hex';
          return hexMatch.map(byte =>
            String.fromCharCode(parseInt(byte, 16))
          ).join('');

        case 'unicode':
          return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16))
          );

        case 'binary':
          return text.split(' ').map(byte =>
            String.fromCharCode(parseInt(byte, 2))
          ).join('');

        case 'rot13':
          return encode(text, 'rot13'); // ROT13 is symmetric

        case 'morse':
          const morseToChar: Record<string, string> = {
            '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
            '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
            '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
            '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
            '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
            '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
            '---..': '8', '----.': '9', '/': ' '
          };
          return text.split(' ').map(code =>
            morseToChar[code] || code
          ).join('');

        default:
          return text;
      }
    } catch (error) {
      return 'Error decoding';
    }
  };

  const handleConvert = () => {
    if (!input) {
      setOutput('');
      return;
    }

    const result = mode === 'encode'
      ? encode(input, encodingType)
      : decode(input, encodingType);

    setOutput(result);
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    if (output) {
      setInput(output);
      setOutput('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Payload Encoder/Decoder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encode and decode payloads using various encoding schemes for security testing
          </p>
        </div>

        {/* Controls */}
        <div className="card p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Encoding Type
              </label>
              <select
                value={encodingType}
                onChange={(e) => setEncodingType(e.target.value)}
                className="input"
              >
                {encodingTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Mode
              </label>
              <button
                onClick={toggleMode}
                className="btn btn-secondary w-full"
              >
                <ArrowRightLeft className="w-5 h-5" />
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConvert}
                className="btn btn-primary flex-1"
              >
                Convert
              </button>
              <button
                onClick={clearAll}
                className="btn btn-outline"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Input/Output */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {mode === 'encode' ? 'Plain Text' : 'Encoded Data'}
              </h2>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-gray-600 dark:text-gray-400">
                {input.length} chars
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter data to decode...'}
              className="input font-mono text-sm h-64 resize-none"
            />
          </div>

          {/* Output */}
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {mode === 'encode' ? 'Encoded Data' : 'Plain Text'}
              </h2>
              <div className="flex gap-2">
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-gray-600 dark:text-gray-400">
                  {output.length} chars
                </span>
                {output && (
                  <button
                    onClick={() => copyToClipboard(output)}
                    className="btn btn-ghost text-sm"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="input font-mono text-sm h-64 resize-none bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Examples */}
        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">1</span>
                Bypassing WAF Filters
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Use URL encoding to bypass input validation</li>
                <li>• Double encoding for advanced evasion</li>
                <li>• Hex encoding for binary payloads</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm">2</span>
                Payload Obfuscation
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Base64 encode scripts and commands</li>
                <li>• Unicode escape for JavaScript injection</li>
                <li>• HTML entities for XSS payloads</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-sm">3</span>
                Data Transmission
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• URL encode query parameters</li>
                <li>• Base64 for binary data in JSON</li>
                <li>• Hex for low-level data representation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm">4</span>
                CTF Challenges
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Decode hidden messages</li>
                <li>• Multi-layer encoding puzzles</li>
                <li>• Morse code and ROT13 ciphers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold text-yellow-900 dark:text-yellow-300 mb-3">Example: XSS Payload</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-yellow-700 dark:text-yellow-400 font-semibold">Plain:</span>
                <code className="block bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded mt-1 text-xs">
                  &lt;script&gt;alert('XSS')&lt;/script&gt;
                </code>
              </div>
              <div>
                <span className="text-yellow-700 dark:text-yellow-400 font-semibold">URL Encoded:</span>
                <code className="block bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded mt-1 text-xs break-all">
                  %3Cscript%3Ealert('XSS')%3C%2Fscript%3E
                </code>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-3">Example: Command Obfuscation</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-green-700 dark:text-green-400 font-semibold">Plain:</span>
                <code className="block bg-green-100 dark:bg-green-900/40 p-2 rounded mt-1 text-xs">
                  whoami
                </code>
              </div>
              <div>
                <span className="text-green-700 dark:text-green-400 font-semibold">Base64:</span>
                <code className="block bg-green-100 dark:bg-green-900/40 p-2 rounded mt-1 text-xs">
                  d2hvYW1p
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
