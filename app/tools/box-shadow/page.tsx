'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function BoxShadowPage() {
  useToolTracking('Box Shadow Generator', '/tools/box-shadow');

  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.5);
  const [inset, setInset] = useState(false);
  const [cssOutput, setCssOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate CSS on value change
  useEffect(() => {
    generateCSS();
  }, [hOffset, vOffset, blur, spread, color, opacity, inset]);

  const generateCSS = () => {
    const rgbaColor = hexToRgba(color, opacity);
    const insetStr = inset ? 'inset ' : '';
    const css = `box-shadow: ${insetStr}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor};`;
    setCssOutput(css);
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetValues = () => {
    setHOffset(10);
    setVOffset(10);
    setBlur(20);
    setSpread(0);
    setColor('#000000');
    setOpacity(0.5);
    setInset(false);
  };

  const presets = [
    { name: 'Soft', values: { h: 0, v: 4, blur: 15, spread: 0, opacity: 0.1 } },
    { name: 'Medium', values: { h: 0, v: 10, blur: 25, spread: 0, opacity: 0.15 } },
    { name: 'Strong', values: { h: 0, v: 20, blur: 40, spread: 0, opacity: 0.2 } },
    { name: 'Lifted', values: { h: 0, v: 25, blur: 50, spread: -10, opacity: 0.25 } },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">⬛ Box Shadow Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate CSS box-shadow with live preview</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Shadow Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Shadow Properties</h3>
              <div className="space-y-4">
                {/* Horizontal Offset */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Horizontal Offset</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{hOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={hOffset}
                    onChange={(e) => setHOffset(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Vertical Offset */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Vertical Offset</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{vOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={vOffset}
                    onChange={(e) => setVOffset(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Blur Radius */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Blur Radius</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{blur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={blur}
                    onChange={(e) => setBlur(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Spread Radius */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Spread Radius</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{spread}px</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={spread}
                    onChange={(e) => setSpread(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Opacity */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Opacity</label>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{opacity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shadow Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Inset */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="inset"
                    checked={inset}
                    onChange={(e) => setInset(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
                  />
                  <label htmlFor="inset" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Inset Shadow
                  </label>
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
              <div className="grid grid-cols-2 gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setHOffset(preset.values.h);
                      setVOffset(preset.values.v);
                      setBlur(preset.values.blur);
                      setSpread(preset.values.spread);
                      setOpacity(preset.values.opacity);
                      setInset(false);
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
                  className="w-48 h-48 bg-white dark:bg-gray-800 rounded-lg"
                  style={{
                    boxShadow: `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`,
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
                <code className="text-green-400 text-sm font-mono break-all">{cssOutput}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Box Shadow</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            The box-shadow CSS property adds shadow effects around an element's frame. You can control the horizontal and vertical offsets,
            blur radius, spread radius, color, and whether the shadow is inside (inset) or outside the element.
          </p>
        </div>
      </div>
    </div>
  );
}
