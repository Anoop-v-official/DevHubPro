'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function YAMLValidatorPage() {
  useToolTracking('YAML Validator', '/tools/yaml-validator');

  const exampleYAML = `# Application Configuration
app:
  name: DevHub Pro
  version: 2.0.0
  port: 3000

database:
  host: localhost
  port: 5432
  name: devhub_db
  credentials:
    username: admin
    password: secret123

features:
  - authentication
  - api_endpoints
  - real_time_updates

settings:
  debug: true
  max_connections: 100
  timeout: 30`;

  const [input, setInput] = useState(exampleYAML);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-validate on input change
  useEffect(() => {
    validateYAML();
  }, [input]);

  const parseYAML = (yaml: string): any => {
    const lines = yaml.split('\n');
    const result: any = {};
    const stack: any[] = [{ obj: result, indent: -1 }];
    let currentArray: any[] | null = null;
    let arrayIndent = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip empty lines and comments
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const indent = line.search(/\S/);
      const trimmed = line.trim();

      // Handle array items
      if (trimmed.startsWith('- ')) {
        const value = trimmed.substring(2).trim();

        if (currentArray === null || indent !== arrayIndent) {
          currentArray = [];
          arrayIndent = indent;

          // Find parent object
          while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
            stack.pop();
          }

          if (stack.length > 0) {
            const parent = stack[stack.length - 1];
            const keys = Object.keys(parent.obj);
            const lastKey = keys[keys.length - 1];
            parent.obj[lastKey] = currentArray;
          }
        }

        currentArray.push(value);
        continue;
      }

      // Reset array context if indent changed
      if (currentArray !== null && indent <= arrayIndent) {
        currentArray = null;
        arrayIndent = -1;
      }

      // Handle key-value pairs
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) continue;

      const key = trimmed.substring(0, colonIndex).trim();
      const valueStr = trimmed.substring(colonIndex + 1).trim();

      // Pop stack to find correct parent
      while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      if (stack.length === 0) {
        stack.push({ obj: result, indent: -1 });
      }

      const parent = stack[stack.length - 1].obj;

      if (valueStr === '') {
        // Nested object
        parent[key] = {};
        stack.push({ obj: parent[key], indent });
      } else {
        // Parse value
        let value: any = valueStr;
        if (valueStr === 'true') value = true;
        else if (valueStr === 'false') value = false;
        else if (valueStr === 'null') value = null;
        else if (!isNaN(Number(valueStr))) value = Number(valueStr);

        parent[key] = value;
      }
    }

    return result;
  };

  const validateYAML = () => {
    try {
      if (!input.trim()) {
        setIsValid(null);
        setError('');
        setJsonOutput('');
        return;
      }

      const parsed = parseYAML(input);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setError('');
    } catch (err: any) {
      setIsValid(false);
      setError(err.message || 'Invalid YAML syntax');
      setJsonOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput(exampleYAML);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">✅ YAML Validator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Validate YAML syntax and convert to JSON</p>
        </div>

        {/* Validation Status */}
        {isValid !== null && (
          <div className={`mb-6 p-4 rounded-lg border-2 flex items-center gap-3 ${
            isValid
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'
          }`}>
            {isValid ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-200">Valid YAML</p>
                  <p className="text-sm text-green-700 dark:text-green-400">Your YAML syntax is correct!</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-200">Invalid YAML</p>
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">YAML Input</label>
              <button
                onClick={loadExample}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Load Example
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your YAML here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          {/* JSON Output */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">JSON Output</label>
              {jsonOutput && (
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
              value={jsonOutput}
              readOnly
              placeholder="JSON output will appear here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About YAML</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            YAML (YAML Ain't Markup Language) is a human-friendly data serialization format commonly used for configuration files.
            It uses indentation to represent structure and is easier to read than JSON or XML.
          </p>
          <div className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Tips:</strong><br />
            • Use spaces for indentation (not tabs)<br />
            • Colons separate keys from values<br />
            • Hyphens denote list items<br />
            • Comments start with #
          </div>
        </div>
      </div>
    </div>
  );
}
