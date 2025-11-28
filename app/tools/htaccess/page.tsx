'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function HtaccessPage() {
  useToolTracking('.htaccess Generator', '/tools/htaccess');

  const [httpsRedirect, setHttpsRedirect] = useState(true);
  const [wwwRedirect, setWwwRedirect] = useState(true);
  const [customRedirects, setCustomRedirects] = useState<{from: string; to: string;}[]>([]);
  const [blockIPs, setBlockIPs] = useState<string[]>([]);
  const [customRules, setCustomRules] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate on change
  useEffect(() => {
    generateHtaccess();
  }, [httpsRedirect, wwwRedirect, customRedirects, blockIPs, customRules]);

  const generateHtaccess = () => {
    let content = '# Generated .htaccess\n';
    content += 'RewriteEngine On\n\n';

    // HTTPS Redirect
    if (httpsRedirect) {
      content += '# Force HTTPS\n';
      content += 'RewriteCond %{HTTPS} off\n';
      content += 'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n';
    }

    // WWW Redirect
    if (wwwRedirect) {
      content += '# Force WWW\n';
      content += 'RewriteCond %{HTTP_HOST} !^www\\.\n';
      content += 'RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n';
    }

    // Custom Redirects
    if (customRedirects.length > 0) {
      content += '# Custom Redirects\n';
      customRedirects.forEach(redirect => {
        if (redirect.from && redirect.to) {
          content += `Redirect 301 ${redirect.from} ${redirect.to}\n`;
        }
      });
      content += '\n';
    }

    // Block IPs
    if (blockIPs.length > 0) {
      content += '# Block IP Addresses\n';
      content += 'Order Allow,Deny\n';
      blockIPs.forEach(ip => {
        if (ip.trim()) {
          content += `Deny from ${ip}\n`;
        }
      });
      content += 'Allow from all\n\n';
    }

    // Custom Rules
    if (customRules.trim()) {
      content += '# Custom Rules\n';
      content += customRules + '\n';
    }

    setOutput(content);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addRedirect = () => {
    setCustomRedirects([...customRedirects, { from: '', to: '' }]);
  };

  const addBlockIP = () => {
    setBlockIPs([...blockIPs, '']);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">⚙️ .htaccess Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate Apache .htaccess rules</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Common Rules */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Common Rules</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={httpsRedirect}
                    onChange={(e) => setHttpsRedirect(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <div>
                    <div className="text-gray-900 dark:text-gray-100 font-medium">Force HTTPS</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Redirect all HTTP traffic to HTTPS</div>
                  </div>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={wwwRedirect}
                    onChange={(e) => setWwwRedirect(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <div>
                    <div className="text-gray-900 dark:text-gray-100 font-medium">Force WWW</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Redirect non-www to www</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom Redirects */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Custom Redirects</h3>
                <button
                  onClick={addRedirect}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-3">
                {customRedirects.map((redirect, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Redirect #{index + 1}</span>
                      <button
                        onClick={() => setCustomRedirects(customRedirects.filter((_, i) => i !== index))}
                        className="text-xs text-red-600 dark:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={redirect.from}
                      onChange={(e) => {
                        const newRedirects = [...customRedirects];
                        newRedirects[index].from = e.target.value;
                        setCustomRedirects(newRedirects);
                      }}
                      placeholder="/old-page"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <input
                      type="text"
                      value={redirect.to}
                      onChange={(e) => {
                        const newRedirects = [...customRedirects];
                        newRedirects[index].to = e.target.value;
                        setCustomRedirects(newRedirects);
                      }}
                      placeholder="/new-page"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Block IPs */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Block IP Addresses</h3>
                <button
                  onClick={addBlockIP}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {blockIPs.map((ip, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ip}
                      onChange={(e) => {
                        const newIPs = [...blockIPs];
                        newIPs[index] = e.target.value;
                        setBlockIPs(newIPs);
                      }}
                      placeholder="192.168.1.1"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      onClick={() => setBlockIPs(blockIPs.filter((_, i) => i !== index))}
                      className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Rules */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Custom Rules</h3>
              <textarea
                value={customRules}
                onChange={(e) => setCustomRules(e.target.value)}
                placeholder="Add your custom .htaccess rules here..."
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Generated .htaccess</h3>
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
                className="w-full h-[650px] p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About .htaccess</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            The .htaccess file is a configuration file used by Apache web servers. It controls redirects, URL rewriting, access control,
            and various server behaviors. Place this file in your website's root directory. Be careful as incorrect rules can break your site!
          </p>
        </div>
      </div>
    </div>
  );
}
