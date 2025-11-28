'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export default function SitemapXMLPage() {
  useToolTracking('sitemap.xml Generator', '/tools/sitemap-xml');

  const [baseUrl, setBaseUrl] = useState('https://example.com');
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
  ]);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate on change
  useEffect(() => {
    generateSitemap();
  }, [baseUrl, urls]);

  const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      if (url.loc.trim()) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${url.loc}</loc>\n`;
        if (url.lastmod) {
          xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        }
        if (url.changefreq) {
          xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        }
        if (url.priority) {
          xml += `    <priority>${url.priority}</priority>\n`;
        }
        xml += '  </url>\n';
      }
    });

    xml += '</urlset>';
    setOutput(xml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addUrl = () => {
    setUrls([
      ...urls,
      { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.8' }
    ]);
  };

  const updateUrl = (index: number, field: keyof SitemapUrl, value: string) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const changefreqOptions = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🗺️ sitemap.xml Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate XML sitemaps for SEO</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Base URL */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Base URL</h3>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* URLs */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">URLs ({urls.length})</h3>
                <button
                  onClick={addUrl}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors text-sm"
                >
                  + Add URL
                </button>
              </div>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {urls.map((url, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">URL #{index + 1}</span>
                      <button
                        onClick={() => removeUrl(index)}
                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Path</label>
                      <input
                        type="text"
                        value={url.loc}
                        onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                        placeholder="/page"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Last Modified */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Last Modified</label>
                      <input
                        type="date"
                        value={url.lastmod}
                        onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Change Frequency */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Change Frequency</label>
                      <select
                        value={url.changefreq}
                        onChange={(e) => updateUrl(index, 'changefreq', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        {changefreqOptions.map(freq => (
                          <option key={freq} value={freq}>{freq}</option>
                        ))}
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Priority (0.0 - 1.0)</label>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        value={url.priority}
                        onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Generated sitemap.xml</h3>
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                className="w-full h-[600px] p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Sitemaps</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            A sitemap is an XML file that lists all important pages of your website. It helps search engines discover and index your content more efficiently.
            Upload the generated sitemap.xml to your website's root directory and submit it to search engines via Google Search Console, Bing Webmaster Tools, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
