'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function FaviconGeneratorPage() {
  useToolTracking('Favicon Generator', '/tools/favicon-generator');

  const [text, setText] = useState('A');
  const [bgColor, setBgColor] = useState('#667eea');
  const [textColor, setTextColor] = useState('#ffffff');
  const [faviconUrl, setFaviconUrl] = useState('https://example.com/favicon.ico');
  const [copied, setCopied] = useState(false);

  const faviconSizes = [
    { size: 16, name: 'Browser Tab' },
    { size: 32, name: 'Standard Favicon' },
    { size: 48, name: 'Windows Taskbar' },
    { size: 64, name: 'Large Icon' },
    { size: 128, name: 'Chrome Extension' },
    { size: 192, name: 'Android Chrome' },
    { size: 256, name: 'Android Home Screen' },
    { size: 512, name: 'Android Splash Screen' },
  ];

  const generateFaviconHTML = () => {
    return `<!-- Favicon Links -->
<link rel="icon" type="image/x-icon" href="${faviconUrl}">
<link rel="icon" type="image/png" sizes="16x16" href="${faviconUrl}?size=16">
<link rel="icon" type="image/png" sizes="32x32" href="${faviconUrl}?size=32">
<link rel="icon" type="image/png" sizes="48x48" href="${faviconUrl}?size=48">
<link rel="icon" type="image/png" sizes="64x64" href="${faviconUrl}?size=64">
<link rel="apple-touch-icon" sizes="180x180" href="${faviconUrl}?size=180">
<link rel="icon" type="image/png" sizes="192x192" href="${faviconUrl}?size=192">
<link rel="icon" type="image/png" sizes="512x512" href="${faviconUrl}?size=512">

<!-- Microsoft Tile for Windows -->
<meta name="msapplication-TileImage" content="${faviconUrl}?size=144">
<meta name="msapplication-TileColor" content="${bgColor}">

<!-- Theme Color -->
<meta name="theme-color" content="${bgColor}">`;
  };

  const generateManifest = () => {
    return JSON.stringify(
      {
        name: 'My App',
        short_name: 'App',
        icons: faviconSizes.map((favicon) => ({
          src: `${faviconUrl}?size=${favicon.size}`,
          sizes: `${favicon.size}x${favicon.size}`,
          type: 'image/png',
        })),
        theme_color: bgColor,
        background_color: bgColor,
        display: 'standalone',
      },
      null,
      2
    );
  };

  const faviconHTML = generateFaviconHTML();
  const manifestJSON = generateManifest();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateDataUrl = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 192, 192);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 96px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.substring(0, 1), 96, 96);

    return canvas.toDataURL('image/png');
  };

  const presets = [
    { name: 'Blue Tech', text: 'T', bg: '#667eea', fg: '#ffffff' },
    { name: 'Red Energy', text: 'E', bg: '#ff6b6b', fg: '#ffffff' },
    { name: 'Green Nature', text: 'N', bg: '#51cf66', fg: '#ffffff' },
    { name: 'Purple Creative', text: 'C', bg: '#9775fa', fg: '#ffffff' },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setText(preset.text);
    setBgColor(preset.bg);
    setTextColor(preset.fg);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Favicon Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate favicon and PWA icon HTML/JSON</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Favicon Settings</h3>
              <div className="space-y-4">
                {/* Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Character</label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value.substring(0, 1).toUpperCase())}
                    maxLength={1}
                    placeholder="A"
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center text-2xl font-bold"
                  />
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Favicon URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favicon URL (Base)</label>
                  <input
                    type="url"
                    value={faviconUrl}
                    onChange={(e) => setFaviconUrl(e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Favicon Sizes Reference */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Icon Sizes</h3>
              <div className="space-y-2">
                {faviconSizes.map((favicon) => (
                  <div key={favicon.size} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{favicon.name}</span>
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{favicon.size}x{favicon.size}</span>
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

          {/* Preview & Output */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Preview</h3>
              <div className="flex flex-col gap-6">
                {/* Large Preview */}
                <div className="flex justify-center">
                  <div
                    className="flex items-center justify-center rounded-lg shadow-xl"
                    style={{
                      width: '192px',
                      height: '192px',
                      backgroundColor: bgColor,
                      color: textColor,
                      fontSize: '96px',
                      fontWeight: 'bold',
                    }}
                  >
                    {text}
                  </div>
                </div>

                {/* Size Variations */}
                <div className="flex gap-4 justify-center flex-wrap">
                  {[16, 32, 64, 128].map((size) => (
                    <div key={size} className="flex flex-col items-center gap-2">
                      <div
                        className="rounded-lg shadow-md"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          backgroundColor: bgColor,
                          color: textColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: `${size / 2}px`,
                          fontWeight: 'bold',
                        }}
                      >
                        {text}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{size}x{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HTML Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">HTML Code</h3>
                <button
                  onClick={() => copyToClipboard(faviconHTML)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto">
                <code className="text-green-400 text-xs font-mono whitespace-pre-wrap break-words">{faviconHTML}</code>
              </div>
            </div>

            {/* Manifest Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Manifest JSON</h3>
                <button
                  onClick={() => copyToClipboard(manifestJSON)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto">
                <code className="text-green-400 text-xs font-mono whitespace-pre">{manifestJSON}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">About Favicons</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            A favicon is a small icon displayed in the browser tab. This generator provides links for multiple favicon sizes used across different platforms
            and devices. Include the HTML in your head tag and the manifest.json in your PWA configuration for full compatibility.
          </p>
        </div>
      </div>
    </div>
  );
}
