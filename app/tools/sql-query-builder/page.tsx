'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function SQLQueryBuilderPage() {
  useToolTracking('SQL Query Builder', '/tools/sql-query-builder');

  const [queryType, setQueryType] = useState<'select' | 'insert' | 'update' | 'delete'>('select');
  const [tableName, setTableName] = useState('users');
  const [columns, setColumns] = useState('id, name, email, created_at');
  const [whereClause, setWhereClause] = useState('id = 1');
  const [orderBy, setOrderBy] = useState('created_at DESC');
  const [limit, setLimit] = useState('10');
  const [values, setValues] = useState("('John Doe', 'john@example.com', NOW())");
  const [copied, setCopied] = useState(false);

  const generateQuery = () => {
    let query = '';

    switch (queryType) {
      case 'select':
        query = `SELECT ${columns || '*'}\nFROM ${tableName}`;
        if (whereClause) query += `\nWHERE ${whereClause}`;
        if (orderBy) query += `\nORDER BY ${orderBy}`;
        if (limit) query += `\nLIMIT ${limit}`;
        break;

      case 'insert':
        const columnList = columns
          .split(',')
          .map((c) => c.trim())
          .join(', ');
        query = `INSERT INTO ${tableName} (${columnList})\nVALUES ${values}`;
        break;

      case 'update':
        const setClause = columns
          .split(',')
          .map((c) => `${c.trim()} = ?`)
          .join(', ');
        query = `UPDATE ${tableName}\nSET ${setClause}`;
        if (whereClause) query += `\nWHERE ${whereClause}`;
        break;

      case 'delete':
        query = `DELETE FROM ${tableName}`;
        if (whereClause) query += `\nWHERE ${whereClause}`;
        break;
    }

    return query;
  };

  const sqlQuery = generateQuery();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      name: 'Get All Users',
      type: 'select' as const,
      table: 'users',
      columns: 'id, name, email, created_at',
      where: '',
      order: 'created_at DESC',
      limit: '50',
    },
    {
      name: 'Find User by ID',
      type: 'select' as const,
      table: 'users',
      columns: '*',
      where: 'id = 1',
      order: '',
      limit: '',
    },
    {
      name: 'Insert New User',
      type: 'insert' as const,
      table: 'users',
      columns: 'name, email, password',
      where: '',
      order: '',
      limit: '',
    },
    {
      name: 'Update User Profile',
      type: 'update' as const,
      table: 'users',
      columns: 'name, email, updated_at',
      where: 'id = 1',
      order: '',
      limit: '',
    },
    {
      name: 'Delete Inactive Users',
      type: 'delete' as const,
      table: 'users',
      columns: '',
      where: 'last_login < NOW() - INTERVAL 6 MONTH',
      order: '',
      limit: '',
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setQueryType(preset.type);
    setTableName(preset.table);
    setColumns(preset.columns);
    setWhereClause(preset.where);
    setOrderBy(preset.order);
    setLimit(preset.limit);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">SQL Query Builder</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate SQL queries (SELECT, INSERT, UPDATE, DELETE)</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Query Type */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Query Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {(['select', 'insert', 'update', 'delete'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setQueryType(type)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all uppercase ${
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

            {/* Table & Columns */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Table & Columns</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Table Name</label>
                  <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="users"
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {queryType === 'insert' ? 'Columns (comma-separated)' : 'Columns'}
                  </label>
                  <textarea
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    placeholder="id, name, email"
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {queryType === 'insert' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Values</label>
                    <textarea
                      value={values}
                      onChange={(e) => setValues(e.target.value)}
                      placeholder="('John Doe', 'john@example.com')"
                      rows={2}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Conditions & Options</h3>
              <div className="space-y-4">
                {(queryType === 'select' || queryType === 'update' || queryType === 'delete') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WHERE Clause</label>
                    <input
                      type="text"
                      value={whereClause}
                      onChange={(e) => setWhereClause(e.target.value)}
                      placeholder="id = 1 AND status = 'active'"
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                )}

                {queryType === 'select' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ORDER BY</label>
                      <input
                        type="text"
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}
                        placeholder="created_at DESC"
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LIMIT</label>
                      <input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        placeholder="10"
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </>
                )}
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
            {/* SQL Query Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Generated Query</h3>
                <button
                  onClick={() => copyToClipboard(sqlQuery)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-64">
                <code className="text-green-400 text-sm font-mono whitespace-pre">{sqlQuery}</code>
              </div>
            </div>

            {/* SQL Syntax Help */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Common Operators</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <code className="text-gray-800 dark:text-gray-200 font-mono">= </code>
                  <span className="text-gray-600 dark:text-gray-400">Equal to</span>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <code className="text-gray-800 dark:text-gray-200 font-mono">!= or &lt;&gt; </code>
                  <span className="text-gray-600 dark:text-gray-400">Not equal</span>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <code className="text-gray-800 dark:text-gray-200 font-mono">LIKE </code>
                  <span className="text-gray-600 dark:text-gray-400">Pattern match (use % wildcard)</span>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <code className="text-gray-800 dark:text-gray-200 font-mono">IN (val1, val2) </code>
                  <span className="text-gray-600 dark:text-gray-400">Multiple values</span>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <code className="text-gray-800 dark:text-gray-200 font-mono">BETWEEN a AND b </code>
                  <span className="text-gray-600 dark:text-gray-400">Range query</span>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <code className="text-gray-800 dark:text-gray-200 font-mono">AND / OR </code>
                  <span className="text-gray-600 dark:text-gray-400">Combine conditions</span>
                </div>
              </div>
            </div>

            {/* SQL Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Query Tips</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                <li>Always use parameterized queries to prevent SQL injection</li>
                <li>Test queries on a development database first</li>
                <li>Use indexes on frequently queried columns</li>
                <li>Avoid SELECT * in production queries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">About SQL Queries</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            SQL (Structured Query Language) is used to interact with databases. This builder helps generate common query patterns for SELECT, INSERT, UPDATE, and DELETE operations.
            Always validate and test your queries before using them in production.
          </p>
        </div>
      </div>
    </div>
  );
}
