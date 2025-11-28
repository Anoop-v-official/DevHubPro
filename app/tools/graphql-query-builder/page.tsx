'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function GraphQLQueryBuilderPage() {
  useToolTracking('GraphQL Query Builder', '/tools/graphql-query-builder');

  const [queryType, setQueryType] = useState<'query' | 'mutation'>('query');
  const [operationName, setOperationName] = useState('GetUser');
  const [variables, setVariables] = useState('id: ID!');
  const [fields, setFields] = useState(`id
name
email
createdAt`);
  const [copied, setCopied] = useState(false);

  const generateGraphQL = () => {
    const fieldList = fields
      .split('\n')
      .filter((f) => f.trim())
      .map((f) => f.trim())
      .join('\n    ');

    const vars = variables.trim() ? `($${variables.trim()})` : '';

    if (queryType === 'query') {
      return `${queryType.charAt(0).toUpperCase() + queryType.slice(1)} ${operationName}${vars} {
  ${operationName.charAt(0).toLowerCase() + operationName.slice(1)}${vars ? '(id: $id)' : ''} {
    ${fieldList}
  }
}`;
    } else {
      return `${queryType.charAt(0).toUpperCase() + queryType.slice(1)} ${operationName}${vars} {
  ${operationName.charAt(0).toLowerCase() + operationName.slice(1)}${vars ? '(input: $input)' : ''} {
    ${fieldList}
  }
}`;
    }
  };

  const graphqlQuery = generateGraphQL();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      name: 'Get User Query',
      type: 'query' as const,
      operation: 'GetUser',
      vars: 'id: ID!',
      fields: `id
name
email
avatar
createdAt`,
    },
    {
      name: 'Get Posts Query',
      type: 'query' as const,
      operation: 'GetPosts',
      vars: 'limit: Int, offset: Int',
      fields: `id
title
content
author {
  id
  name
}
createdAt`,
    },
    {
      name: 'Create User Mutation',
      type: 'mutation' as const,
      operation: 'CreateUser',
      vars: 'input: CreateUserInput!',
      fields: `id
name
email
createdAt`,
    },
    {
      name: 'Update Post Mutation',
      type: 'mutation' as const,
      operation: 'UpdatePost',
      vars: 'id: ID!, input: UpdatePostInput!',
      fields: `id
title
content
updatedAt`,
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setQueryType(preset.type);
    setOperationName(preset.operation);
    setVariables(preset.vars);
    setFields(preset.fields);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">GraphQL Query Builder</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Build GraphQL queries and mutations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Query Type */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Operation Type</h3>
              <div className="flex gap-3">
                {(['query', 'mutation'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setQueryType(type)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all uppercase ${
                      queryType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Operation Details */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Operation Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Operation Name</label>
                  <input
                    type="text"
                    value={operationName}
                    onChange={(e) => setOperationName(e.target.value)}
                    placeholder="GetUser"
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Use PascalCase for operation names</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Variables</label>
                  <textarea
                    value={variables}
                    onChange={(e) => setVariables(e.target.value)}
                    placeholder="id: ID!, first: Int"
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Comma-separated, use ! for required</p>
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Fields</h3>
              <textarea
                value={fields}
                onChange={(e) => setFields(e.target.value)}
                placeholder="id
name
email"
                rows={6}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">One field per line. Nest with indentation.</p>
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
            {/* GraphQL Query Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Generated GraphQL</h3>
                <button
                  onClick={() => copyToClipboard(graphqlQuery)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-64">
                <code className="text-green-400 text-sm font-mono whitespace-pre">{graphqlQuery}</code>
              </div>
            </div>

            {/* JavaScript Fetch Example */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Fetch Example</h3>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto">
                <code className="text-green-400 text-xs font-mono whitespace-pre">{`const query = \`${graphqlQuery}\`;

fetch('https://api.example.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => console.log(data));`}</code>
              </div>
            </div>

            {/* GraphQL Types Reference */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">GraphQL Type Reference</h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p><code className="font-mono">String</code> - Text</p>
                <p><code className="font-mono">Int</code> - Integer</p>
                <p><code className="font-mono">Float</code> - Decimal</p>
                <p><code className="font-mono">Boolean</code> - True/False</p>
                <p><code className="font-mono">ID</code> - Unique identifier</p>
                <p><code className="font-mono">Type!</code> - Non-null (required)</p>
                <p><code className="font-mono">[Type]</code> - List</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">About GraphQL</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            GraphQL is a query language for APIs that allows clients to request exactly the data they need. Queries fetch data while mutations modify it.
            Variables enable reusable operations, and strong typing ensures type safety. This builder helps you construct valid GraphQL operations.
          </p>
        </div>
      </div>
    </div>
  );
}
