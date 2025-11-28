'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function CSSToTailwindPage() {
  useToolTracking('CSS to Tailwind', '/tools/css-to-tailwind');

  const [cssInput, setCssInput] = useState(`display: flex;
justify-content: center;
align-items: center;
padding: 20px;
background-color: #667eea;
color: white;
border-radius: 8px;
font-weight: bold;`);
  const [tailwindOutput, setTailwindOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const cssToTailwindMap: { [key: string]: string } = {
    // Display
    'display: flex': 'flex',
    'display: grid': 'grid',
    'display: block': 'block',
    'display: inline': 'inline',
    'display: inline-block': 'inline-block',
    'display: none': 'hidden',

    // Flexbox
    'flex-direction: row': 'flex-row',
    'flex-direction: column': 'flex-col',
    'flex-direction: column-reverse': 'flex-col-reverse',
    'flex-direction: row-reverse': 'flex-row-reverse',
    'justify-content: center': 'justify-center',
    'justify-content: flex-start': 'justify-start',
    'justify-content: flex-end': 'justify-end',
    'justify-content: space-between': 'justify-between',
    'justify-content: space-around': 'justify-around',
    'justify-content: space-evenly': 'justify-evenly',
    'align-items: center': 'items-center',
    'align-items: flex-start': 'items-start',
    'align-items: flex-end': 'items-end',
    'align-items: stretch': 'items-stretch',
    'align-items: baseline': 'items-baseline',
    'gap: 1rem': 'gap-4',
    'gap: 0.5rem': 'gap-2',

    // Padding
    'padding: 20px': 'p-5',
    'padding: 16px': 'p-4',
    'padding: 12px': 'p-3',
    'padding: 8px': 'p-2',
    'padding: 4px': 'p-1',
    'padding-left: 20px': 'pl-5',
    'padding-right: 20px': 'pr-5',
    'padding-top: 20px': 'pt-5',
    'padding-bottom: 20px': 'pb-5',

    // Margin
    'margin: 20px': 'm-5',
    'margin: 16px': 'm-4',
    'margin: 12px': 'm-3',
    'margin: 8px': 'm-2',
    'margin: 4px': 'm-1',
    'margin-left: 20px': 'ml-5',
    'margin-right: 20px': 'mr-5',
    'margin-top: 20px': 'mt-5',
    'margin-bottom: 20px': 'mb-5',

    // Colors
    'color: white': 'text-white',
    'color: black': 'text-black',
    'color: red': 'text-red-600',
    'color: blue': 'text-blue-600',
    'color: green': 'text-green-600',
    'background-color: white': 'bg-white',
    'background-color: black': 'bg-black',
    'background-color: red': 'bg-red-600',
    'background-color: blue': 'bg-blue-600',
    'background-color: green': 'bg-green-600',

    // Border
    'border: 1px solid': 'border',
    'border-radius: 8px': 'rounded-lg',
    'border-radius: 4px': 'rounded',
    'border-radius: 12px': 'rounded-2xl',
    'border-radius: 50%': 'rounded-full',

    // Font
    'font-weight: bold': 'font-bold',
    'font-weight: 600': 'font-semibold',
    'font-weight: 500': 'font-medium',
    'font-weight: 400': 'font-normal',
    'font-size: 12px': 'text-xs',
    'font-size: 14px': 'text-sm',
    'font-size: 16px': 'text-base',
    'font-size: 18px': 'text-lg',
    'font-size: 20px': 'text-xl',
    'font-size: 24px': 'text-2xl',
    'font-size: 30px': 'text-3xl',

    // Width & Height
    'width: 100%': 'w-full',
    'width: 50%': 'w-1/2',
    'height: 100%': 'h-full',
    'max-width: 100%': 'max-w-full',
  };

  const convertCSSToTailwind = () => {
    let result = cssInput
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('/*') || trimmed.startsWith('*')) return '';

        for (const [css, tailwind] of Object.entries(cssToTailwindMap)) {
          if (trimmed.toLowerCase().includes(css.toLowerCase())) {
            return tailwind;
          }
        }

        // Try to extract values for simple properties
        const match = trimmed.match(/^([a-z-]+):\s*(.+);?$/i);
        if (match) {
          const [, property, value] = match;
          let suggestion = '';

          if (property === 'color' || property === 'background-color') {
            suggestion = `[color-value] /* ${trimmed} */`;
          } else if (property === 'padding' || property === 'margin') {
            suggestion = `[p/m-value] /* ${trimmed} */`;
          } else {
            suggestion = `/* TODO: ${trimmed} */`;
          }

          return suggestion;
        }

        return '';
      })
      .filter((line) => line.trim())
      .join('\n');

    setTailwindOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tailwindOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      name: 'Flex Container',
      css: `display: flex;
justify-content: center;
align-items: center;
gap: 1rem;`,
    },
    {
      name: 'Button Styles',
      css: `padding: 12px 20px;
background-color: blue;
color: white;
border-radius: 8px;
font-weight: bold;`,
    },
    {
      name: 'Card Layout',
      css: `padding: 20px;
background-color: white;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);`,
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setCssInput(preset.css);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">CSS to Tailwind Converter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Convert CSS to Tailwind utility classes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-6">
            {/* CSS Input */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">CSS Input</h3>
                <button
                  onClick={() => convertCSSToTailwind()}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Convert
                </button>
              </div>
              <textarea
                value={cssInput}
                onChange={(e) => setCssInput(e.target.value)}
                placeholder="Paste your CSS properties here..."
                rows={12}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>

            {/* Presets */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Example CSS Presets</h3>
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

            {/* Reference */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Common Mappings</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(cssToTailwindMap)
                  .slice(0, 10)
                  .map(([css, tailwind]) => (
                    <div key={css} className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                      <code className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        {css}
                      </code>
                      <span className="text-gray-600 dark:text-gray-400 mx-2">→</span>
                      <code className="text-xs font-mono text-blue-600 dark:text-blue-400">
                        {tailwind}
                      </code>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-6">
            {/* Tailwind Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Tailwind Classes</h3>
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto">
                <code className="text-green-400 text-sm font-mono whitespace-pre-wrap break-words">
                  {tailwindOutput || 'Click "Convert" to see Tailwind classes'}
                </code>
              </div>
            </div>

            {/* HTML Example */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">HTML Example</h3>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto">
                <code className="text-green-400 text-xs font-mono whitespace-pre">
                  {`<div class="${tailwindOutput.split('\n').join(' ')}">
  Your content here
</div>`}
                </code>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Tips</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Use semantic property names for best results</li>
                <li>• Complex selectors may need manual conversion</li>
                <li>• Combine generated classes in your HTML</li>
                <li>• Check Tailwind docs for custom values</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">About Tailwind CSS</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Tailwind CSS is a utility-first CSS framework. Instead of writing CSS rules, you apply pre-made utility classes to HTML elements.
            This converter helps you translate traditional CSS properties into Tailwind utility classes. Some conversions may need manual adjustment for custom values.
          </p>
        </div>
      </div>
    </div>
  );
}
