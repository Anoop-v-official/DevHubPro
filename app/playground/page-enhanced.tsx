'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import {
  Play, Save, Share2, Download, Code, Eye, Maximize2, Settings,
  Copy, Check, Smartphone, Layout, Palette, Plus, FileCode, Terminal,
  Grid, Loader, RefreshCw, ZoomIn, ZoomOut
} from 'lucide-react';
import Script from 'next/script';

type LanguageMode = 'html' | 'react' | 'python' | 'typescript' | 'vue' | 'json';
type Theme = 'vs-dark' | 'vs-light' | 'monokai';
type Layout = 'horizontal' | 'vertical';

export default function PlaygroundPage() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<LanguageMode>('html');
  const [theme, setTheme] = useState<Theme>('vs-dark');
  const [layout, setLayout] = useState<Layout>('horizontal');
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [autoRun, setAutoRun] = useState(true);

  // Templates
  const templates = {
    html: {
      basic: {
        name: 'Basic HTML',
        html: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
        css: 'body { font-family: Arial; padding: 20px; }',
        js: 'console.log("Ready!");'
      },
      responsive: {
        name: 'Responsive Card',
        html: '<div class="card">\n  <h2>Responsive Card</h2>\n  <p>This card adapts to screen size</p>\n</div>',
        css: '.card {\n  max-width: 400px;\n  margin: 20px auto;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n}\n\n@media (max-width: 768px) {\n  .card { padding: 15px; }\n}',
        js: ''
      },
      flexbox: {
        name: 'Flexbox Layout',
        html: '<div class="flex-container">\n  <div class="box">Box 1</div>\n  <div class="box">Box 2</div>\n  <div class="box">Box 3</div>\n</div>',
        css: '.flex-container {\n  display: flex;\n  gap: 20px;\n  padding: 20px;\n}\n\n.box {\n  flex: 1;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  text-align: center;\n  border-radius: 10px;\n}',
        js: ''
      }
    },
    react: {
      basic: {
        name: 'Basic Component',
        code: 'function App() {\n  return <div><h1>Hello React!</h1></div>;\n}\n\nReactDOM.render(<App />, document.getElementById("root"));'
      },
      hooks: {
        name: 'useState Hook',
        code: 'function Counter() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <div style={{padding: "20px"}}>\n      <h1>Count: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>+</button>\n    </div>\n  );\n}\n\nReactDOM.render(<Counter />, document.getElementById("root"));'
      }
    },
    python: {
      basic: {
        name: 'Hello Python',
        code: 'print("Hello from Python!")\nprint("Python version:", __import__("sys").version)'
      },
      dataProcessing: {
        name: 'Data Processing',
        code: '# Data processing example\ndata = [1, 2, 3, 4, 5]\nprint("Data:", data)\nprint("Sum:", sum(data))\nprint("Average:", sum(data)/len(data))\nprint("Squared:", [x**2 for x in data])'
      }
    }
  };

  const [html, setHtml] = useState(templates.html.basic.html);
  const [css, setCss] = useState(templates.html.basic.css);
  const [js, setJs] = useState(templates.html.basic.js);
  const [reactCode, setReactCode] = useState('');
  const [pythonCode, setPythonCode] = useState('');
  const [typescriptCode, setTypescriptCode] = useState('');
  const [jsonCode, setJsonCode] = useState('{\n  "name": "JSON Editor",\n  "version": "1.0"\n}');
  const [vueCode, setVueCode] = useState('');

  const [activeTab, setActiveTab] = useState<'code' | 'css' | 'js'>('code');
  const [srcDoc, setSrcDoc] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(true);
  const [showConsole, setShowConsole] = useState(false);

  // Load template
  const loadTemplate = (templateKey: string) => {
    if (mode === 'html') {
      const template = templates.html[templateKey as keyof typeof templates.html];
      if (template) {
        setHtml(template.html);
        setCss(template.css);
        setJs(template.js);
      }
    } else if (mode === 'react') {
      const template = templates.react[templateKey as keyof typeof templates.react];
      if (template) {
        setReactCode(template.code);
      }
    } else if (mode === 'python') {
      const template = templates.python[templateKey as keyof typeof templates.python];
      if (template) {
        setPythonCode(template.code);
      }
    }
  };

  // Copy code
  const copyCode = () => {
    let code = '';
    if (mode === 'html') {
      code = `HTML:\n${html}\n\nCSS:\n${css}\n\nJS:\n${js}`;
    } else if (mode === 'react') {
      code = reactCode;
    } else if (mode === 'python') {
      code = pythonCode;
    }
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download code
  const downloadCode = () => {
    let content = '';
    let filename = '';
    if (mode === 'html') {
      content = `<!DOCTYPE html>\n<html>\n<head>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n</script>\n</body>\n</html>`;
      filename = 'index.html';
    } else if (mode === 'react') {
      content = reactCode;
      filename = 'app.jsx';
    } else if (mode === 'python') {
      content = pythonCode;
      filename = 'script.py';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Format code (simple version)
  const formatCode = () => {
    if (mode === 'json') {
      try {
        const formatted = JSON.stringify(JSON.parse(jsonCode), null, 2);
        setJsonCode(formatted);
      } catch (e) {
        console.error('Invalid JSON');
      }
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      if (mode === 'html') {
        const source = `
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>
              ${html}
              <script>
                // Console override
                const originalLog = console.log;
                console.log = function(...args) {
                  window.parent.postMessage({type: 'console', data: args}, '*');
                  originalLog.apply(console, args);
                };
                ${js}
              <\/script>
            </body>
          </html>
        `;
        setSrcDoc(source);
      }
      setIsRunning(false);
    }, 300);
  };

  // Listen for console messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'console') {
        setOutput(prev => [...prev, ...e.data.data.map((d: any) => String(d))]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-[1800px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-bold">Code Lab</h1>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['html', 'react', 'python', 'typescript', 'json'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setMode(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    mode === lang
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                {isRunning ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Run
              </button>
              <button onClick={copyCode} className="btn bg-gray-800 hover:bg-gray-700">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              <button onClick={downloadCode} className="btn bg-gray-800 hover:bg-gray-700">
                <Download className="w-4 h-4" />
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className="btn bg-gray-800 hover:bg-gray-700">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-3 p-4 bg-gray-800 rounded-lg space-y-3">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  <select
                    value={layout}
                    onChange={(e) => setLayout(e.target.value as Layout)}
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Font Size:</span>
                  <button onClick={() => setFontSize(f => Math.max(10, f - 2))} className="btn-sm bg-gray-700">
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="text-sm">{fontSize}px</span>
                  <button onClick={() => setFontSize(f => Math.min(24, f + 2))} className="btn-sm bg-gray-700">
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoRun}
                    onChange={(e) => setAutoRun(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Auto Run</span>
                </label>
              </div>
            </div>
          )}

          {/* Templates */}
          {mode === 'html' && (
            <div className="mt-3 flex gap-2 flex-wrap">
              <span className="text-sm text-gray-400">Templates:</span>
              {Object.entries(templates.html).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => loadTemplate(key)}
                  className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg"
                >
                  {template.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor & Preview */}
      <div className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-row'} h-[calc(100vh-140px)]`}>
        {/* Editor */}
        <div className={`${layout === 'vertical' ? 'h-1/2' : 'w-1/2'} border-r border-gray-800`}>
          {mode === 'html' && (
            <div className="h-full flex flex-col">
              <div className="flex border-b border-gray-800">
                {(['code', 'css', 'js'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === tab
                        ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab === 'code' ? 'HTML' : tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <textarea
                value={activeTab === 'code' ? html : activeTab === 'css' ? css : js}
                onChange={(e) => {
                  if (activeTab === 'code') setHtml(e.target.value);
                  else if (activeTab === 'css') setCss(e.target.value);
                  else setJs(e.target.value);
                  if (autoRun) runCode();
                }}
                className="flex-1 p-4 bg-gray-900 text-white font-mono resize-none focus:outline-none"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.5' }}
                spellCheck={false}
              />
            </div>
          )}
        </div>

        {/* Preview */}
        <div className={`${layout === 'vertical' ? 'h-1/2' : 'w-1/2'} bg-white`}>
          {mode === 'html' && (
            <iframe
              srcDoc={srcDoc}
              className="w-full h-full border-0"
              title="preview"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
}
