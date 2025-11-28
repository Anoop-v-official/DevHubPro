'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function NginxConfigPage() {
  useToolTracking('Nginx Config Generator', '/tools/nginx-config');

  const [serverName, setServerName] = useState('example.com');
  const [port, setPort] = useState('80');
  const [root, setRoot] = useState('/var/www/html');
  const [index, setIndex] = useState('index.html index.htm');
  const [enableSSL, setEnableSSL] = useState(false);
  const [sslCert, setSslCert] = useState('/etc/ssl/certs/cert.pem');
  const [sslKey, setSslKey] = useState('/etc/ssl/private/key.pem');
  const [enableGzip, setEnableGzip] = useState(true);
  const [enableCache, setEnableCache] = useState(true);
  const [proxyPass, setProxyPass] = useState('');
  const [customRules, setCustomRules] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-generate on change
  useEffect(() => {
    generateNginxConfig();
  }, [serverName, port, root, index, enableSSL, sslCert, sslKey, enableGzip, enableCache, proxyPass, customRules]);

  const generateNginxConfig = () => {
    let config = 'server {\n';
    config += `    listen ${port};\n`;
    if (enableSSL) {
      config += `    listen 443 ssl;\n`;
    }
    config += `    server_name ${serverName};\n\n`;

    if (enableSSL) {
      config += `    ssl_certificate ${sslCert};\n`;
      config += `    ssl_certificate_key ${sslKey};\n`;
      config += `    ssl_protocols TLSv1.2 TLSv1.3;\n`;
      config += `    ssl_ciphers HIGH:!aNULL:!MD5;\n\n`;
    }

    config += `    root ${root};\n`;
    config += `    index ${index};\n\n`;

    if (enableGzip) {
      config += `    # Gzip Compression\n`;
      config += `    gzip on;\n`;
      config += `    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;\n`;
      config += `    gzip_min_length 1000;\n\n`;
    }

    config += `    location / {\n`;
    if (proxyPass) {
      config += `        proxy_pass ${proxyPass};\n`;
      config += `        proxy_http_version 1.1;\n`;
      config += `        proxy_set_header Upgrade $http_upgrade;\n`;
      config += `        proxy_set_header Connection 'upgrade';\n`;
      config += `        proxy_set_header Host $host;\n`;
      config += `        proxy_cache_bypass $http_upgrade;\n`;
    } else {
      config += `        try_files $uri $uri/ =404;\n`;
    }
    config += `    }\n\n`;

    if (enableCache) {
      config += `    # Browser Caching\n`;
      config += `    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {\n`;
      config += `        expires 1y;\n`;
      config += `        add_header Cache-Control "public, immutable";\n`;
      config += `    }\n\n`;
    }

    if (customRules.trim()) {
      config += `    # Custom Rules\n`;
      config += customRules.split('\n').map(line => `    ${line}`).join('\n') + '\n\n';
    }

    config += '}';

    setOutput(config);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🌐 Nginx Config Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate Nginx server configuration</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Basic Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Basic Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Server Name</label>
                  <input
                    type="text"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Port</label>
                  <input
                    type="text"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    placeholder="80"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Root Directory</label>
                  <input
                    type="text"
                    value={root}
                    onChange={(e) => setRoot(e.target.value)}
                    placeholder="/var/www/html"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Index Files</label>
                  <input
                    type="text"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    placeholder="index.html index.htm"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* SSL Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">SSL/HTTPS</h3>
              <label className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={enableSSL}
                  onChange={(e) => setEnableSSL(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-900 dark:text-gray-100">Enable SSL</span>
              </label>
              {enableSSL && (
                <div className="space-y-3 pl-7">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certificate Path</label>
                    <input
                      type="text"
                      value={sslCert}
                      onChange={(e) => setSslCert(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Private Key Path</label>
                    <input
                      type="text"
                      value={sslKey}
                      onChange={(e) => setSslKey(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Optimization */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Optimization</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={enableGzip}
                    onChange={(e) => setEnableGzip(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-gray-900 dark:text-gray-100">Enable Gzip Compression</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={enableCache}
                    onChange={(e) => setEnableCache(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-gray-900 dark:text-gray-100">Enable Browser Caching</span>
                </label>
              </div>
            </div>

            {/* Proxy */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Reverse Proxy (Optional)</h3>
              <input
                type="text"
                value={proxyPass}
                onChange={(e) => setProxyPass(e.target.value)}
                placeholder="http://localhost:3000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Leave empty for static file serving</p>
            </div>

            {/* Custom Rules */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Custom Rules</h3>
              <textarea
                value={customRules}
                onChange={(e) => setCustomRules(e.target.value)}
                placeholder="Add custom Nginx directives..."
                className="w-full h-24 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Generated Config</h3>
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
                className="w-full h-[750px] p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Nginx Configuration</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Nginx is a high-performance web server and reverse proxy. Save the generated configuration in /etc/nginx/sites-available/
            and create a symbolic link to /etc/nginx/sites-enabled/. Always test your configuration with "nginx -t" before reloading!
          </p>
        </div>
      </div>
    </div>
  );
}
