'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function RobotsTxtPage() {
  useToolTracking('robots.txt Generator', '/tools/robots-txt');

  const [allowAll, setAllowAll] = useState(true);
  const [userAgents, setUserAgents] = useState(['*']);
  const [disallowPaths, setDisallowPaths] = useState<string[]>([]);
  const [allowPaths, setAllowPaths] = useState<string[]>([]);
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml');
  const [crawlDelay, setCrawlDelay] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate on change
  useEffect(() => {
    generateRobotsTxt();
  }, [allowAll, userAgents, disallowPaths, allowPaths, sitemapUrl, crawlDelay]);

  const generateRobotsTxt = () => {
    let txt = '';

    userAgents.forEach(agent => {
      txt += `User-agent: ${agent}\n`;
    });

    if (allowAll) {
      txt += 'Allow: /\n';
    } else {
      if (allowPaths.length > 0) {
        allowPaths.forEach(path => {
          if (path.trim()) txt += `Allow: ${path}\n`;
        });
      }
      if (disallowPaths.length > 0) {
        disallowPaths.forEach(path => {
          if (path.trim()) txt += `Disallow: ${path}\n`;
        });
      } else {
        txt += 'Disallow:\n';
      }
    }

    if (crawlDelay) {
      txt += `Crawl-delay: ${crawlDelay}\n`;
    }

    txt += `\nSitemap: ${sitemapUrl}`;

    setOutput(txt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addDisallowPath = () => {
    setDisallowPaths([...disallowPaths, '/']);
  };

  const addAllowPath = () => {
    setAllowPaths([...allowPaths, '/']);
  };

  const commonBots = ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🤖 robots.txt Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate robots.txt for search engines</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Access Control */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Access Control</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={allowAll}
                    onChange={() => setAllowAll(true)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900 dark:text-gray-100">Allow all bots</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={!allowAll}
                    onChange={() => setAllowAll(false)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900 dark:text-gray-100">Custom rules</span>
                </label>
              </div>
            </div>

            {/* User Agents */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">User Agents</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {commonBots.map(bot => (
                  <button
                    key={bot}
                    onClick={() => {
                      if (!userAgents.includes(bot)) {
                        setUserAgents([...userAgents, bot]);
                      }
                    }}
                    className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 text-sm font-medium transition-colors"
                  >
                    {bot}
                  </button>
                ))}
              </div>
            </div>

            {!allowAll && (
              <>
                {/* Disallow Paths */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">Disallow Paths</h3>
                    <button
                      onClick={addDisallowPath}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {disallowPaths.map((path, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={path}
                          onChange={(e) => {
                            const newPaths = [...disallowPaths];
                            newPaths[index] = e.target.value;
                            setDisallowPaths(newPaths);
                          }}
                          placeholder="/admin/"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                        <button
                          onClick={() => setDisallowPaths(disallowPaths.filter((_, i) => i !== index))}
                          className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allow Paths */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">Allow Paths</h3>
                    <button
                      onClick={addAllowPath}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {allowPaths.map((path, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={path}
                          onChange={(e) => {
                            const newPaths = [...allowPaths];
                            newPaths[index] = e.target.value;
                            setAllowPaths(newPaths);
                          }}
                          placeholder="/public/"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                        <button
                          onClick={() => setAllowPaths(allowPaths.filter((_, i) => i !== index))}
                          className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Additional Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Additional Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sitemap URL</label>
                  <input
                    type="text"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    placeholder="https://example.com/sitemap.xml"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Crawl Delay (seconds)</label>
                  <input
                    type="number"
                    value={crawlDelay}
                    onChange={(e) => setCrawlDelay(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Generated robots.txt</h3>
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
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About robots.txt</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            The robots.txt file tells search engine crawlers which URLs they can access on your site. It's primarily used to avoid
            overloading your site with requests. Place this file in your website's root directory.
          </p>
        </div>
      </div>
    </div>
  );
}
