'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function GradientGeneratorPage() {
  useToolTracking('Gradient Generator', '/tools/gradient-generator');

  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [direction, setDirection] = useState('to right');
  const [cssOutput, setCssOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate CSS on value change
  useEffect(() => {
    generateCSS();
  }, [color1, color2, direction]);

  const generateCSS = () => {
    const css = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    setCssOutput(css);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const randomizeColors = () => {
    setColor1(randomColor());
    setColor2(randomColor());
  };

  const directions = [
    { label: 'To Right', value: 'to right' },
    { label: 'To Left', value: 'to left' },
    { label: 'To Bottom', value: 'to bottom' },
    { label: 'To Top', value: 'to top' },
    { label: 'To Bottom Right', value: 'to bottom right' },
    { label: 'To Bottom Left', value: 'to bottom left' },
    { label: 'To Top Right', value: 'to top right' },
    { label: 'To Top Left', value: 'to top left' },
  ];

  const presets = [
    { name: 'Purple Dream', colors: ['#667eea', '#764ba2'] },
    { name: 'Sunrise', colors: ['#ff6b6b', '#feca57'] },
    { name: 'Ocean', colors: ['#1e3c72', '#2a5298'] },
    { name: 'Sunset', colors: ['#ff6a00', '#ee0979'] },
    { name: 'Forest', colors: ['#134e5e', '#71b280'] },
    { name: 'Fire', colors: ['#f12711', '#f5af19'] },
    { name: 'Ice', colors: ['#00c6ff', '#0072ff'] },
    { name: 'Cotton Candy', colors: ['#fbc2eb', '#a6c1ee'] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🌈 Gradient Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Create beautiful CSS gradients with visual editor</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Color Pickers */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Colors</h3>
                <button
                  onClick={randomizeColors}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Random
                </button>
              </div>
              <div className="space-y-4">
                {/* Color 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Color 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Direction */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Direction</h3>
              <div className="grid grid-cols-2 gap-2">
                {directions.map((dir) => (
                  <button
                    key={dir.value}
                    onClick={() => setDirection(dir.value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      direction === dir.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {dir.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Presets</h3>
              <div className="grid grid-cols-2 gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setColor1(preset.colors[0]);
                      setColor2(preset.colors[1]);
                    }}
                    className="relative h-16 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(to right, ${preset.colors[0]}, ${preset.colors[1]})`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                      <span className="text-white font-semibold text-sm drop-shadow-lg">{preset.name}</span>
                    </div>
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
              <div
                className="w-full h-64 rounded-lg shadow-xl"
                style={{
                  background: `linear-gradient(${direction}, ${color1}, ${color2})`,
                }}
              />
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
                <code className="text-green-400 text-sm font-mono break-all">{cssOutput}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About CSS Gradients</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Linear gradients create smooth color transitions between two or more colors. They're perfect for backgrounds, buttons,
            and adding visual interest to your designs. Experiment with different directions and color combinations!
          </p>
        </div>
      </div>
    </div>
  );
}
