'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Play, Save, Share2, Copy, Download, Code, Eye, Maximize2 } from 'lucide-react';
import Script from 'next/script';

type LanguageMode = 'html' | 'react' | 'python' | 'typescript';

export default function PlaygroundPage() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<LanguageMode>('html');
  const [pyodideReady, setPyodideReady] = useState(false);
  const pyodideRef = useRef<any>(null);

  // HTML/CSS/JS Mode
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Snippet</title>
</head>
<body>
  <div class="container">
    <h1>Hello, DevHub Pro!</h1>
    <p>Start coding your amazing project here.</p>
    <button id="btn">Click me!</button>
  </div>
</body>
</html>`);

  const [css, setCss] = useState(`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
}

h1 {
  color: #667eea;
  margin-bottom: 20px;
  font-size: 2.5em;
}

p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1em;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1em;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

button:active {
  transform: translateY(0);
}`);

  const [js, setJs] = useState(`document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('btn');
  let clicks = 0;

  btn.addEventListener('click', function() {
    clicks++;
    this.textContent = \`Clicked \${clicks} time\${clicks === 1 ? '' : 's'}!\`;

    // Add a fun animation
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 200);
  });

  console.log('JavaScript is ready! Try clicking the button.');
});`);

  // React/JSX Mode
  const [reactCode, setReactCode] = useState(`function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{ color: '#667eea', marginBottom: '20px' }}>
          React Counter
        </h1>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '2em' }}>
          Count: {count}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '50px',
            fontSize: '1.1em',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '50px',
            fontSize: '1.1em',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));`);

  // Python Mode
  const [pythonCode, setPythonCode] = useState(`# Python Playground powered by Pyodide
import sys
from datetime import datetime

def greet(name):
    """Greet someone with the current time"""
    current_time = datetime.now().strftime("%H:%M:%S")
    return f"Hello, {name}! The current time is {current_time}"

# Main code
print("🐍 Python is running in your browser!")
print("=" * 50)

name = "Developer"
message = greet(name)
print(message)

# Math operations
numbers = [1, 2, 3, 4, 5]
print(f"\\nNumbers: {numbers}")
print(f"Sum: {sum(numbers)}")
print(f"Average: {sum(numbers) / len(numbers)}")

# List comprehension
squares = [x**2 for x in numbers]
print(f"Squares: {squares}")

print("\\n✅ Python execution completed!")`);

  // TypeScript Mode
  const [typescriptCode, setTypescriptCode] = useState(`// TypeScript Playground
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(\`✅ Added user: \${user.name}\`);
  }

  getUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  displayUsers(): void {
    console.log('👥 User List:');
    console.log('=' .repeat(50));
    this.users.forEach(user => {
      console.log(\`ID: \${user.id} | Name: \${user.name} | Email: \${user.email}\`);
    });
  }
}

// Demo usage
const manager = new UserManager();

manager.addUser({
  id: 1,
  name: 'Alice Johnson',
  email: 'alice@example.com',
  age: 28
});

manager.addUser({
  id: 2,
  name: 'Bob Smith',
  email: 'bob@example.com'
});

manager.displayUsers();

const user = manager.getUser(1);
if (user) {
  console.log(\`\\n🔍 Found user: \${user.name}\`);
}

console.log('\\n✅ TypeScript execution completed!');`);

  const [activeTab, setActiveTab] = useState<'code' | 'css' | 'config'>('code');
  const [srcDoc, setSrcDoc] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(true);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [snippetName, setSnippetName] = useState('My Awesome Snippet');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load Pyodide
  useEffect(() => {
    if (mode === 'python' && !pyodideReady) {
      const loadPyodide = async () => {
        try {
          // @ts-ignore
          const pyodide = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
          });
          pyodideRef.current = pyodide;
          setPyodideReady(true);
          console.log('Pyodide loaded successfully');
        } catch (error) {
          console.error('Failed to load Pyodide:', error);
        }
      };
      loadPyodide();
    }
  }, [mode, pyodideReady]);

  // Auto-run preview for HTML mode
  useEffect(() => {
    if (mode === 'html') {
      const timeout = setTimeout(() => {
        const source = `
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>
              ${html}
              <script>${js}<\/script>
            </body>
          </html>
        `;
        setSrcDoc(source);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [html, css, js, mode]);

  const handleRun = async () => {
    setOutput([]);

    if (mode === 'html') {
      const source = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              // Capture console.log
              const originalLog = console.log;
              console.log = function(...args) {
                window.parent.postMessage({ type: 'console', message: args.join(' ') }, '*');
                originalLog.apply(console, args);
              };
              ${js}
            <\/script>
          </body>
        </html>
      `;
      setSrcDoc(source);
    } else if (mode === 'react') {
      const source = `
        <html>
          <head>
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
          </head>
          <body>
            <div id="root"></div>
            <script>
              try {
                ${reactCode}
              } catch (error) {
                document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px; font-family: monospace;">Error: ' + error.message + '</div>';
              }
            <\/script>
          </body>
        </html>
      `;
      setSrcDoc(source);
    } else if (mode === 'python') {
      if (!pyodideReady || !pyodideRef.current) {
        setOutput(['⏳ Loading Python environment... Please wait.']);
        return;
      }

      try {
        // Capture stdout
        const capturedOutput: string[] = [];
        pyodideRef.current.setStdout({
          batched: (msg: string) => {
            capturedOutput.push(msg);
          }
        });

        await pyodideRef.current.runPythonAsync(pythonCode);
        setOutput(capturedOutput.length > 0 ? capturedOutput : ['✅ Code executed successfully (no output)']);
      } catch (error: any) {
        setOutput([`❌ Error: ${error.message}`]);
      }
    } else if (mode === 'typescript') {
      try {
        // Simple TypeScript to JavaScript conversion (remove type annotations)
        const jsCode = typescriptCode
          .replace(/:\s*\w+(\[\])?/g, '') // Remove type annotations
          .replace(/interface\s+\w+\s*{[^}]*}/g, '') // Remove interfaces
          .replace(/<\w+>/g, ''); // Remove generics

        const capturedOutput: string[] = [];
        const originalLog = console.log;
        console.log = (...args: any[]) => {
          capturedOutput.push(args.join(' '));
          originalLog(...args);
        };

        eval(jsCode);
        console.log = originalLog;

        setOutput(capturedOutput.length > 0 ? capturedOutput : ['✅ Code executed successfully']);
      } catch (error: any) {
        setOutput([`❌ Error: ${error.message}`]);
      }
    }
  };

  const handleSave = () => {
    if (!session) {
      alert('Please sign in to save snippets');
      return;
    }
    setShowSaveModal(true);
  };

  const handleShare = () => {
    let codeData: any = { mode, name: snippetName };
    if (mode === 'html') {
      codeData = { ...codeData, html, css, js };
    } else if (mode === 'react') {
      codeData = { ...codeData, code: reactCode };
    } else if (mode === 'python') {
      codeData = { ...codeData, code: pythonCode };
    } else if (mode === 'typescript') {
      codeData = { ...codeData, code: typescriptCode };
    }

    const snippetData = btoa(JSON.stringify(codeData));
    const shareUrl = `${window.location.origin}/playground?snippet=${snippetData}`;
    navigator.clipboard.writeText(shareUrl);
    setShowShareModal(true);
  };

  const handleDownload = () => {
    let content = '';
    let filename = '';

    if (mode === 'html') {
      content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${snippetName}</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  <\/script>
</body>
</html>`;
      filename = `${snippetName.toLowerCase().replace(/\s+/g, '-')}.html`;
    } else if (mode === 'react') {
      content = reactCode;
      filename = `${snippetName.toLowerCase().replace(/\s+/g, '-')}.jsx`;
    } else if (mode === 'python') {
      content = pythonCode;
      filename = `${snippetName.toLowerCase().replace(/\s+/g, '-')}.py`;
    } else if (mode === 'typescript') {
      content = typescriptCode;
      filename = `${snippetName.toLowerCase().replace(/\s+/g, '-')}.ts`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    let code = '';
    if (mode === 'html') {
      if (activeTab === 'code') code = html;
      else if (activeTab === 'css') code = css;
      else code = js;
    } else if (mode === 'react') code = reactCode;
    else if (mode === 'python') code = pythonCode;
    else code = typescriptCode;

    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const getCurrentCode = () => {
    if (mode === 'html') {
      return activeTab === 'code' ? html : activeTab === 'css' ? css : js;
    } else if (mode === 'react') return reactCode;
    else if (mode === 'python') return pythonCode;
    else return typescriptCode;
  };

  const setCurrentCode = (value: string) => {
    if (mode === 'html') {
      if (activeTab === 'code') setHtml(value);
      else if (activeTab === 'css') setCss(value);
      else setJs(value);
    } else if (mode === 'react') setReactCode(value);
    else if (mode === 'python') setPythonCode(value);
    else setTypescriptCode(value);
  };

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="max-w-full mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <input
                type="text"
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 text-gray-900 dark:text-white"
              />
            </div>

            {/* Language Mode Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as LanguageMode)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="html">HTML/CSS/JS</option>
                <option value="react">React/JSX</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
              </select>

              <button
                onClick={handleRun}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Run</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex ${showPreview ? 'flex-col lg:flex-row' : 'flex-col'} h-[calc(100vh-73px)]`}>
          {/* Editor Section */}
          <div className={`${showPreview ? 'lg:w-1/2' : 'w-full'} flex flex-col bg-gray-800`}>
            {/* Tabs */}
            {mode === 'html' && (
              <div className="flex items-center bg-gray-900 border-b border-gray-700 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'code'
                      ? 'border-orange-500 text-orange-400 bg-gray-800'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'css'
                      ? 'border-blue-500 text-blue-400 bg-gray-800'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  CSS
                </button>
                <button
                  onClick={() => setActiveTab('config')}
                  className={`px-6 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'config'
                      ? 'border-yellow-500 text-yellow-400 bg-gray-800'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  JavaScript
                </button>
              </div>
            )}

            {/* Code Editor */}
            <div className="flex-1 overflow-hidden">
              <textarea
                value={getCurrentCode()}
                onChange={(e) => setCurrentCode(e.target.value)}
                className="w-full h-full p-4 bg-gray-800 text-gray-100 font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
                placeholder={mode === 'python' ? 'Write your Python code here...' : mode === 'typescript' ? 'Write your TypeScript code here...' : mode === 'react' ? 'Write your React/JSX code here...' : ''}
              />
            </div>
          </div>

          {/* Preview/Output Section */}
          {showPreview && (
            <div className={`${showPreview ? 'lg:w-1/2' : 'w-full'} flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  {mode === 'python' || mode === 'typescript' ? 'Output' : 'Preview'}
                </h3>
              </div>
              <div className="flex-1 overflow-auto">
                {(mode === 'python' || mode === 'typescript') ? (
                  <div className="p-4 font-mono text-sm bg-gray-900 text-green-400 h-full">
                    {output.length === 0 ? (
                      <div className="text-gray-500">Click "Run" to execute code</div>
                    ) : (
                      output.map((line, i) => (
                        <div key={i} className="mb-1">{line}</div>
                      ))
                    )}
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    srcDoc={srcDoc}
                    title="preview"
                    sandbox="allow-scripts allow-same-origin"
                    className="w-full h-full bg-white"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Save Modal */}
        {showSaveModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">💾</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Snippet Saved!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your code snippet "<span className="font-semibold text-blue-600 dark:text-blue-400">{snippetName}</span>" has been saved successfully.
                </p>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="btn btn-primary w-full"
                >
                  Great!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🔗</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Link Copied!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Share this link with others to let them view and fork your snippet.
                </p>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="btn btn-primary w-full"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
