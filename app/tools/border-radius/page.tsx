'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function BorderRadiusPage() {
  useToolTracking('Border Radius Generator', '/tools/border-radius');

  const [topLeft, setTopLeft] = useState(20);
  const [topRight, setTopRight] = useState(20);
  const [bottomRight, setBottomRight] = useState(20);
  const [bottomLeft, setBottomLeft] = useState(20);
  const [unit, setUnit] = useState<'px' | '%' | 'rem'>('px');
  const [cssOutput, setCssOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate CSS on value change
  useEffect(() => {
    generateCSS();
  }, [topLeft, topRight, bottomRight, bottomLeft, unit]);

  const generateCSS = () => {
    const css = `border-radius: ${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit};`;
    setCssOutput(css);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetValues = () => {
    setTopLeft(20);
    setTopRight(20);
    setBottomRight(20);
    setBottomLeft(20);
  };

  const presets = [
    { name: 'None', values: [0, 0, 0, 0] },
    { name: 'Small', values: [8, 8, 8, 8] },
    { name: 'Medium', values: [16, 16, 16, 16] },
    { name: 'Large', values: [32, 32, 32, 32] },
    { name: 'Pill', values: [50, 50, 50, 50] },
    { name: 'Circle', values: [50, 50, 50, 50] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">⭕ Border Radius Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Create CSS border-radius with live preview</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Unit Selector */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Unit</h3>
              <div className="flex gap-3">
                {(['px', '%', 'rem'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      unit === u
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Corner Radius</h3>
              <div className="space-y-4">
                {/* Top Left */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Left</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{topLeft}{unit}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={unit === '%' ? 100 : unit === 'rem' ? 10 : 200}
                    value={topLeft}
                    onChange={(e) => setTopLeft(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Top Right */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Right</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{topRight}{unit}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={unit === '%' ? 100 : unit === 'rem' ? 10 : 200}
                    value={topRight}
                    onChange={(e) => setTopRight(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Bottom Right */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bottom Right</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{bottomRight}{unit}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={unit === '%' ? 100 : unit === 'rem' ? 10 : 200}
                    value={bottomRight}
                    onChange={(e) => setBottomRight(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Bottom Left */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bottom Left</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{bottomLeft}{unit}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={unit === '%' ? 100 : unit === 'rem' ? 10 : 200}
                    value={bottomLeft}
                    onChange={(e) => setBottomLeft(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <button
                onClick={resetValues}
                className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Presets */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Presets</h3>
              <div className="grid grid-cols-3 gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setTopLeft(preset.values[0]);
                      setTopRight(preset.values[1]);
                      setBottomRight(preset.values[2]);
                      setBottomLeft(preset.values[3]);
                    }}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 text-sm font-medium transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Output */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Preview</h3>
              <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div
                  className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600"
                  style={{
                    borderRadius: `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`,
                  }}
                />
              </div>
            </div>

            {/* CSS Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">CSS Code</h3>
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg">
                <code className="text-green-400 text-sm font-mono">{cssOutput}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Border Radius</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            The border-radius CSS property rounds the corners of an element's outer border edge. You can set different values for each corner
            (top-left, top-right, bottom-right, bottom-left) to create unique shapes. Use percentage values for elliptical corners!
          </p>
        </div>
      </div>
    </div>
  );
}
