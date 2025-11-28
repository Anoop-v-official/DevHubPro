'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function MarkdownToHTMLPage() {
  useToolTracking('Markdown to HTML', '/tools/markdown-to-html');

  const exampleMarkdown = `# Welcome to Markdown

This is a **bold** text and this is *italic*.

## Features

- Easy to write
- Converts to HTML
- Widely supported

### Code Example

\`\`\`javascript
const greeting = "Hello World!";
console.log(greeting);
\`\`\`

[Visit DevHub Pro](https://devhubpro.com)`;

  const [input, setInput] = useState(exampleMarkdown);
  const [output, setOutput] = useState('');
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'preview'>('preview');

  // Basic Markdown to HTML converter
  const markdownToHTML = (markdown: string) => {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Fix empty paragraphs
    html = html.replace(/<p><\/p>/g, '');

    return html;
  };

  // Auto-convert on input change
  useEffect(() => {
    const htmlOutput = markdownToHTML(input);
    setOutput(htmlOutput);
    setPreview(htmlOutput);
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput(exampleMarkdown);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">📝 Markdown to HTML Converter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Convert Markdown to HTML with live preview</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-gray-900 dark:text-white">Markdown Input</label>
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
              placeholder="Enter Markdown here..."
              className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-1 rounded-lg font-semibold text-sm transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-4 py-1 rounded-lg font-semibold text-sm transition-colors ${
                    activeTab === 'html'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  HTML
                </button>
              </div>
              {activeTab === 'html' && output && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>

            {activeTab === 'html' ? (
              <textarea
                value={output}
                readOnly
                placeholder="HTML output will appear here..."
                className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              />
            ) : (
              <div
                className="w-full h-96 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800 prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Markdown</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            Markdown is a lightweight markup language that's easy to write and read. It's commonly used for documentation, README files, and blogs.
          </p>
          <div className="text-gray-700 dark:text-gray-300 text-sm">
            <strong>Supported syntax:</strong><br />
            # Header, **Bold**, *Italic*, `Code`, [Links](url), Lists, Code blocks
          </div>
        </div>
      </div>
    </div>
  );
}
