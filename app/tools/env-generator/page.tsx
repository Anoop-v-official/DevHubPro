'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function EnvGeneratorPage() {
  useToolTracking('ENV Generator', '/tools/env-generator');

  const [variables, setVariables] = useState([
    { key: 'DATABASE_URL', value: 'postgresql://user:password@localhost:5432/dbname' },
    { key: 'API_KEY', value: 'your-api-key-here' },
    { key: 'SECRET_KEY', value: 'your-secret-key-here' },
  ]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [copied, setCopied] = useState(false);

  const envContent = variables
    .filter((v) => v.key && v.value)
    .map((v) => `${v.key}=${v.value}`)
    .join('\n');

  const envExampleContent = variables
    .filter((v) => v.key)
    .map((v) => `${v.key}=`)
    .join('\n');

  const addVariable = () => {
    if (newKey.trim()) {
      setVariables([...variables, { key: newKey, value: newValue }]);
      setNewKey('');
      setNewValue('');
    }
  };

  const updateVariable = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...variables];
    updated[index][field] = value;
    setVariables(updated);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      name: 'Node.js/Express',
      vars: [
        { key: 'NODE_ENV', value: 'development' },
        { key: 'PORT', value: '3000' },
        { key: 'DATABASE_URL', value: 'postgresql://user:password@localhost:5432/db' },
        { key: 'SECRET_KEY', value: 'your-secret-key' },
        { key: 'API_URL', value: 'http://localhost:3000' },
      ],
    },
    {
      name: 'React/Next.js',
      vars: [
        { key: 'NEXT_PUBLIC_API_URL', value: 'https://api.example.com' },
        { key: 'NEXT_PUBLIC_ENVIRONMENT', value: 'development' },
        { key: 'DATABASE_URL', value: 'postgresql://user:password@localhost:5432/db' },
        { key: 'NEXTAUTH_SECRET', value: 'your-secret-key' },
        { key: 'NEXTAUTH_URL', value: 'http://localhost:3000' },
      ],
    },
    {
      name: 'Python/Django',
      vars: [
        { key: 'DEBUG', value: 'True' },
        { key: 'SECRET_KEY', value: 'your-secret-key' },
        { key: 'DATABASE_URL', value: 'postgresql://user:password@localhost:5432/db' },
        { key: 'ALLOWED_HOSTS', value: 'localhost,127.0.0.1' },
        { key: 'STATIC_URL', value: '/static/' },
      ],
    },
    {
      name: 'AWS/Cloud',
      vars: [
        { key: 'AWS_ACCESS_KEY_ID', value: 'your-access-key' },
        { key: 'AWS_SECRET_ACCESS_KEY', value: 'your-secret-key' },
        { key: 'AWS_REGION', value: 'us-east-1' },
        { key: 'S3_BUCKET_NAME', value: 'your-bucket-name' },
        { key: 'CLOUDFRONT_URL', value: 'https://xxxxx.cloudfront.net' },
      ],
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setVariables(preset.vars);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">ENV Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate .env files with environment variables</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Add New Variable */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add Variable</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value.toUpperCase())}
                  placeholder="Variable name (e.g., DATABASE_URL)"
                  onKeyPress={(e) => e.key === 'Enter' && addVariable()}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Variable value"
                  onKeyPress={(e) => e.key === 'Enter' && addVariable()}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addVariable}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  Add Variable
                </button>
              </div>
            </div>

            {/* Variable List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Variables ({variables.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {variables.map((variable, index) => (
                  <div key={index} className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <input
                      type="text"
                      value={variable.key}
                      onChange={(e) => updateVariable(index, 'key', e.target.value)}
                      className="flex-1 px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded font-mono text-xs focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-gray-500 dark:text-gray-400">=</span>
                    <input
                      type="text"
                      value={variable.value}
                      onChange={(e) => updateVariable(index, 'value', e.target.value)}
                      className="flex-1 px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded font-mono text-xs focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      onClick={() => removeVariable(index)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Presets</h3>
              <div className="space-y-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 text-sm font-medium transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-6">
            {/* .env Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">.env File</h3>
                <button
                  onClick={() => copyToClipboard(envContent)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-64">
                <code className="text-green-400 text-sm font-mono whitespace-pre">{envContent || '# No variables added'}</code>
              </div>
            </div>

            {/* .env.example Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">.env.example File</h3>
                <button
                  onClick={() => copyToClipboard(envExampleContent)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-64">
                <code className="text-green-400 text-sm font-mono whitespace-pre">
                  {envExampleContent || '# No variables added'}
                </code>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                .env.example is committed to version control without sensitive values
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">How to Use</h3>
              <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-decimal list-inside">
                <li>Add variables using the form above</li>
                <li>Copy the .env file content</li>
                <li>Create a .env file in your project root</li>
                <li>Paste the content into the file</li>
                <li>Add .env to .gitignore to keep secrets safe</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">About .env Files</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Environment files (.env) store configuration variables like API keys, database URLs, and secrets. They allow you to keep sensitive data
            out of version control. Always add .env to your .gitignore and never commit secrets. Share .env.example instead with empty values.
          </p>
        </div>
      </div>
    </div>
  );
}
