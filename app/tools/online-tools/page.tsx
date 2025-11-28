'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type ToolType = 'css-minifier' | 'html-formatter' | 'uuid' | 'timestamp' | 'lorem' | 'color-picker' | 'sql-formatter' | 'yaml-validator' | 'xml-json' | 'random-data';

const tools = [
  { id: 'css-minifier', name: 'CSS Minifier', icon: '🎨' },
  { id: 'html-formatter', name: 'HTML Formatter', icon: '📝' },
  { id: 'uuid', name: 'UUID Generator', icon: '🔖' },
  { id: 'timestamp', name: 'Timestamp Converter', icon: '⏱️' },
  { id: 'lorem', name: 'Lorem Ipsum', icon: '📄' },
  { id: 'color-picker', name: 'Color Converter', icon: '🎨' },
  { id: 'sql-formatter', name: 'SQL Formatter', icon: '🗄️' },
  { id: 'yaml-validator', name: 'YAML Validator', icon: '📋' },
  { id: 'xml-json', name: 'XML to JSON', icon: '🔄' },
  { id: 'random-data', name: 'Random Data', icon: '🎲' },
];

export default function OnlineToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolType>('css-minifier');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const processInput = (tool: ToolType, text: string) => {
    switch (tool) {
      case 'css-minifier':
        return text.replace(/\s+/g, ' ').replace(/\s*{\s*/g, '{').replace(/\s*}\s*/g, '}').replace(/\s*:\s*/g, ':').replace(/\s*;\s*/g, ';').trim();

      case 'html-formatter':
        // Simple HTML formatting
        let formatted = text;
        let indent = 0;
        formatted = formatted.replace(/></g, '>\n<');
        return formatted.split('\n').map(line => {
          if (line.match(/<\//)) indent--;
          const indented = '  '.repeat(Math.max(0, indent)) + line.trim();
          if (line.match(/<[^/][^>]*[^/]>/) && !line.match(/<br|<img|<input|<meta|<link/)) indent++;
          return indented;
        }).join('\n');

      case 'uuid':
        return crypto.randomUUID();

      case 'timestamp':
        if (text.trim() === '') return new Date().getTime().toString();
        const num = parseInt(text);
        if (isNaN(num)) return 'Invalid number';
        return new Date(num).toISOString();

      case 'lorem':
        const words = parseInt(text) || 50;
        const lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";
        const loremWords = lorem.split(' ');
        let result = '';
        for (let i = 0; i < words; i++) {
          result += loremWords[i % loremWords.length] + ' ';
        }
        return result.trim() + '.';

      case 'color-picker':
        if (text.startsWith('#')) {
          const hex = text.slice(1);
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `RGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${Math.round((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI + 360) % 360)}, ${Math.round((Math.max(r, g, b) - Math.min(r, g, b)) / Math.max(r, g, b) * 100)}%, ${Math.round((Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255 * 100)}%)`;
        }
        return text;

      case 'sql-formatter':
        return text
          .replace(/\bSELECT\b/gi, '\nSELECT\n  ')
          .replace(/\bFROM\b/gi, '\nFROM\n  ')
          .replace(/\bWHERE\b/gi, '\nWHERE\n  ')
          .replace(/\bAND\b/gi, '\n  AND ')
          .replace(/\bOR\b/gi, '\n  OR ')
          .replace(/\bJOIN\b/gi, '\nJOIN\n  ')
          .replace(/\bON\b/gi, '\n  ON ')
          .trim();

      case 'yaml-validator':
        try {
          // Simple YAML validation
          if (!text.trim()) return 'Empty input';
          if (text.includes('\t')) return 'Error: YAML does not allow tabs, use spaces';
          return 'Valid YAML syntax (basic check)';
        } catch {
          return 'Invalid YAML';
        }

      case 'xml-json':
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, 'text/xml');
          if (xmlDoc.getElementsByTagName('parsererror').length) {
            return 'Invalid XML';
          }
          return JSON.stringify({ message: 'XML parsing available, full conversion requires server-side' }, null, 2);
        } catch {
          return 'Invalid XML';
        }

      case 'random-data':
        const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];
        const emails = ['user@example.com', 'test@mail.com', 'demo@site.org'];
        return `Name: ${names[Math.floor(Math.random() * names.length)]}\nEmail: ${emails[Math.floor(Math.random() * emails.length)]}\nPhone: +1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;

      default:
        return text;
    }
  };

  const handleGenerate = () => {
    const result = processInput(activeTab, input);
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🛠️ Online Developer Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            All-in-one toolbox for developers
          </p>
        </div>

        <div className="card p-6">
          {/* Tool Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTab(tool.id as ToolType);
                  setInput('');
                  setOutput('');
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tool.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tool.icon} {tool.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  activeTab === 'uuid' ? 'Click Generate for UUID' :
                  activeTab === 'lorem' ? 'Enter word count (default: 50)' :
                  activeTab === 'timestamp' ? 'Enter Unix timestamp or leave empty for current' :
                  activeTab === 'random-data' ? 'Click Generate for random data' :
                  activeTab === 'color-picker' ? 'Enter HEX color (e.g., #FF5733)' :
                  'Enter your input here...'
                }
                className="input min-h-[400px] font-mono text-sm"
              />
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Output
                </label>
                {output && (
                  <button onClick={copyToClipboard} className="btn btn-ghost text-sm">
                    {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                  </button>
                )}
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Output will appear here..."
                className="input min-h-[400px] font-mono text-sm bg-gray-100 dark:bg-gray-800"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="btn btn-primary mt-6 w-full"
          >
            {activeTab === 'uuid' || activeTab === 'random-data' ? 'Generate' : 'Process'}
          </button>
        </div>
      </div>
    </div>
  );
}
