'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function ColorPickerPage() {
  useToolTracking('Color Picker', '/tools/color-picker');

  const [color, setColor] = useState('#3B82F6');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Auto-convert on color change
  useEffect(() => {
    const rgbVal = hexToRgb(color);
    if (rgbVal) {
      setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
      const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
      setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
    }
  }, [color]);

  const copyToClipboard = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const randomColor = () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(hex);
  };

  const presetColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🎨 Color Picker & Converter</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Pick colors and convert between HEX, RGB, HSL formats</p>
        </div>

        {/* Color Preview */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <div
            className="w-full h-64 rounded-lg shadow-xl mb-6 transition-all"
            style={{ backgroundColor: color }}
          />

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full sm:w-auto h-14 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={randomColor}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" />
              Random
            </button>
          </div>
        </div>

        {/* Color Formats */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Color Formats</h2>
          <div className="space-y-3">
            {/* HEX */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-16">HEX</span>
              <span className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100">{color.toUpperCase()}</span>
              <button
                onClick={() => copyToClipboard(color, 'hex')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {copied === 'hex' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* RGB */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-16">RGB</span>
              <span className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100">{rgb}</span>
              <button
                onClick={() => copyToClipboard(rgb, 'rgb')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {copied === 'rgb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* HSL */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-16">HSL</span>
              <span className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100">{hsl}</span>
              <button
                onClick={() => copyToClipboard(hsl, 'hsl')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {copied === 'hsl' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Preset Colors */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Preset Colors</h2>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-full aspect-square rounded-lg transition-all hover:scale-110 ${
                  color.toUpperCase() === presetColor.toUpperCase()
                    ? 'ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800'
                    : ''
                }`}
                style={{ backgroundColor: presetColor }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Color Formats</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <strong>HEX:</strong> Hexadecimal color code (#RRGGBB) commonly used in CSS and design.<br />
            <strong>RGB:</strong> Red, Green, Blue values (0-255) for each color channel.<br />
            <strong>HSL:</strong> Hue (0-360), Saturation (0-100%), Lightness (0-100%) - more intuitive for humans.
          </p>
        </div>
      </div>
    </div>
  );
}
