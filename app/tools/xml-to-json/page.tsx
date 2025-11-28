'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function XMLToJSONPage() {
  useToolTracking('XML to JSON', '/tools/xml-to-json');

  const exampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>12345</id>
  <name>John Doe</name>
  <email>john@example.com</email>
  <profile>
    <age>28</age>
    <city>New York</city>
    <premium>true</premium>
  </profile>
  <hobbies>
    <hobby>Coding</hobby>
    <hobby>Reading</hobby>
    <hobby>Gaming</hobby>
  </hobbies>
</user>`;

  const [input, setInput] = useState(exampleXML);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-convert on input change
  useEffect(() => {
    convertXMLtoJSON();
  }, [input]);

  const parseXMLNode = (xmlString: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Invalid XML syntax');
    }

    const nodeToObject = (node: Element): any => {
      const obj: any = {};

      // Handle attributes
      if (node.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj['@attributes'][attr.name] = attr.value;
        }
      }

      // Handle child nodes
      const children = Array.from(node.children);

      if (children.length === 0) {
        // Leaf node - return text content
        const text = node.textContent?.trim() || '';

        // Try to parse as number or boolean
        if (text === 'true') return true;
        if (text === 'false') return false;
        if (!isNaN(Number(text)) && text !== '') return Number(text);

        return text;
      }

      // Group children by tag name
      const childGroups: { [key: string]: Element[] } = {};
      children.forEach(child => {
        const tagName = child.tagName;
        if (!childGroups[tagName]) {
          childGroups[tagName] = [];
        }
        childGroups[tagName].push(child);
      });

      // Convert each group
      Object.keys(childGroups).forEach(tagName => {
        const group = childGroups[tagName];
        if (group.length === 1) {
          obj[tagName] = nodeToObject(group[0]);
        } else {
          obj[tagName] = group.map(child => nodeToObject(child));
        }
      });

      return obj;
    };

    const rootElement = xmlDoc.documentElement;
    return { [rootElement.tagName]: nodeToObject(rootElement) };
  };

  const convertXMLtoJSON = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError('');
        return;
      }

      const jsonObj = parseXMLNode(input);
      const formatted = JSON.stringify(jsonObj, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to parse XML');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput(exampleXML);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🔄 XML to JSON Converter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Convert XML data to JSON format instantly</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">XML Input</label>
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
              placeholder="Paste your XML here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">JSON Output</label>
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
              placeholder="JSON output will appear here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-200">Conversion Error</p>
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About XML to JSON Conversion</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            XML (eXtensible Markup Language) and JSON (JavaScript Object Notation) are both data interchange formats.
            JSON is often preferred for web APIs due to its lighter syntax and native JavaScript support.
          </p>
          <div className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Conversion rules:</strong><br />
            • XML elements become JSON objects<br />
            • Repeated elements become arrays<br />
            • Text content is converted to appropriate types (string, number, boolean)<br />
            • Attributes are preserved in @attributes property
          </div>
        </div>
      </div>
    </div>
  );
}
