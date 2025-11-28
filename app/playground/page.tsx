'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import {
  Play, Save, Share2, Download, Code, Eye, Maximize2, Settings,
  Copy, Check, Layout, ZoomIn, ZoomOut, RotateCcw, Terminal,
  FileCode, Book, Loader, X
} from 'lucide-react';
import Script from 'next/script';

type LanguageMode = 'html' | 'react' | 'python' | 'typescript' | 'json';
type Layout = 'horizontal' | 'vertical';

export default function PlaygroundPage() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<LanguageMode>('html');
  const [layout, setLayout] = useState<Layout>('horizontal');
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const pyodideRef = useRef<any>(null);
  const [pyodideReady, setPyodideReady] = useState(false);

  // Templates
  const templates = {
    html: {
      basic: {
        name: '🚀 Hello World',
        html: '<div class="container">\n  <h1>Hello, DevHub Pro!</h1>\n  <p>Start coding your amazing project here.</p>\n  <button id="btn">Click me!</button>\n</div>',
        css: '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n}\n\n.container {\n  background: white;\n  padding: 40px;\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  text-align: center;\n  max-width: 500px;\n}\n\nh1 {\n  color: #667eea;\n  margin-bottom: 20px;\n}\n\nbutton {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 15px 40px;\n  border-radius: 50px;\n  font-size: 1.1em;\n  cursor: pointer;\n  transition: transform 0.3s;\n}\n\nbutton:hover {\n  transform: translateY(-2px);\n}',
        js: 'document.getElementById("btn").addEventListener("click", function() {\n  this.textContent = "🎉 Clicked!";\n  console.log("Button clicked!");\n});'
      },
      card: {
        name: '💳 Responsive Card',
        html: '<div class="card">\n  <div class="card-header">\n    <h2>Premium Card</h2>\n  </div>\n  <div class="card-body">\n    <p>This is a beautiful responsive card component.</p>\n    <ul>\n      <li>✅ Modern design</li>\n      <li>✅ Fully responsive</li>\n      <li>✅ Easy to customize</li>\n    </ul>\n  </div>\n  <div class="card-footer">\n    <button>Learn More</button>\n  </div>\n</div>',
        css: 'body {\n  font-family: system-ui, sans-serif;\n  background: #f0f2f5;\n  padding: 40px 20px;\n  margin: 0;\n}\n\n.card {\n  max-width: 400px;\n  margin: 0 auto;\n  background: white;\n  border-radius: 15px;\n  overflow: hidden;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s;\n}\n\n.card:hover {\n  transform: translateY(-5px);\n}\n\n.card-header {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 30px;\n}\n\n.card-header h2 {\n  margin: 0;\n}\n\n.card-body {\n  padding: 30px;\n}\n\n.card-body ul {\n  list-style: none;\n  padding: 0;\n  margin: 20px 0;\n}\n\n.card-body li {\n  padding: 8px 0;\n}\n\n.card-footer {\n  padding: 20px 30px;\n  background: #f8f9fa;\n}\n\nbutton {\n  width: 100%;\n  padding: 12px;\n  background: #667eea;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background 0.3s;\n}\n\nbutton:hover {\n  background: #5568d3;\n}',
        js: 'console.log("Card component loaded!");'
      },
      flexbox: {
        name: '📐 Flexbox Layout',
        html: '<div class="flex-container">\n  <div class="box box-1">Box 1</div>\n  <div class="box box-2">Box 2</div>\n  <div class="box box-3">Box 3</div>\n</div>',
        css: 'body {\n  margin: 0;\n  padding: 20px;\n  font-family: system-ui, sans-serif;\n  background: #f0f2f5;\n}\n\n.flex-container {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n\n.box {\n  flex: 1;\n  min-width: 200px;\n  padding: 40px;\n  color: white;\n  text-align: center;\n  border-radius: 15px;\n  font-size: 24px;\n  font-weight: bold;\n  transition: transform 0.3s;\n}\n\n.box:hover {\n  transform: scale(1.05);\n}\n\n.box-1 {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n.box-2 {\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n}\n\n.box-3 {\n  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);\n}',
        js: 'console.log("Flexbox layout ready!");'
      },
      animation: {
        name: '✨ CSS Animation',
        html: '<div class="animated-box">\n  <div class="pulse"></div>\n  <h2>Animated!</h2>\n</div>',
        css: 'body {\n  margin: 0;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #1a1a2e;\n  font-family: system-ui, sans-serif;\n}\n\n.animated-box {\n  position: relative;\n  text-align: center;\n}\n\n.pulse {\n  width: 100px;\n  height: 100px;\n  margin: 0 auto 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 50%;\n  animation: pulse 2s infinite;\n}\n\n@keyframes pulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.2);\n    opacity: 0.7;\n  }\n}\n\nh2 {\n  color: white;\n  font-size: 48px;\n  animation: fadeIn 1s ease-in;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}',
        js: 'console.log("Animation running!");'
      }
    },
    react: {
      counter: {
        name: '🔢 Counter App',
        code: 'function Counter() {\n  const [count, setCount] = React.useState(0);\n\n  return (\n    <div style={{\n      minHeight: "100vh",\n      display: "flex",\n      alignItems: "center",\n      justifyContent: "center",\n      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",\n      fontFamily: "system-ui, sans-serif"\n    }}>\n      <div style={{\n        background: "white",\n        padding: "40px",\n        borderRadius: "20px",\n        textAlign: "center",\n        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"\n      }}>\n        <h1 style={{ color: "#667eea", marginBottom: "20px" }}>\n          React Counter\n        </h1>\n        <p style={{ fontSize: "48px", margin: "30px 0" }}>\n          {count}\n        </p>\n        <div style={{ display: "flex", gap: "10px" }}>\n          <button\n            onClick={() => setCount(count + 1)}\n            style={{\n              flex: 1,\n              padding: "15px",\n              background: "#667eea",\n              color: "white",\n              border: "none",\n              borderRadius: "10px",\n              fontSize: "18px",\n              cursor: "pointer"\n            }}\n          >\n            +\n          </button>\n          <button\n            onClick={() => setCount(count - 1)}\n            style={{\n              flex: 1,\n              padding: "15px",\n              background: "#e74c3c",\n              color: "white",\n              border: "none",\n              borderRadius: "10px",\n              fontSize: "18px",\n              cursor: "pointer"\n            }}\n          >\n            -\n          </button>\n          <button\n            onClick={() => setCount(0)}\n            style={{\n              flex: 1,\n              padding: "15px",\n              background: "#95a5a6",\n              color: "white",\n              border: "none",\n              borderRadius: "10px",\n              fontSize: "18px",\n              cursor: "pointer"\n            }}\n          >\n            Reset\n          </button>\n        </div>\n      </div>\n    </div>\n  );\n}\n\nReactDOM.render(<Counter />, document.getElementById("root"));'
      },
      todo: {
        name: '✅ Todo List',
        code: 'function TodoApp() {\n  const [todos, setTodos] = React.useState([]);\n  const [input, setInput] = React.useState("");\n\n  const addTodo = () => {\n    if (input.trim()) {\n      setTodos([...todos, { id: Date.now(), text: input, done: false }]);\n      setInput("");\n    }\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, done: !todo.done } : todo\n    ));\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  return (\n    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", fontFamily: "system-ui" }}>\n      <h1 style={{ color: "#667eea" }}>📝 Todo List</h1>\n      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>\n        <input\n          value={input}\n          onChange={(e) => setInput(e.target.value)}\n          onKeyPress={(e) => e.key === "Enter" && addTodo()}\n          placeholder="Add a todo..."\n          style={{\n            flex: 1,\n            padding: "12px",\n            borderRadius: "8px",\n            border: "2px solid #ddd",\n            fontSize: "16px"\n          }}\n        />\n        <button\n          onClick={addTodo}\n          style={{\n            padding: "12px 24px",\n            background: "#667eea",\n            color: "white",\n            border: "none",\n            borderRadius: "8px",\n            cursor: "pointer"\n          }}\n        >\n          Add\n        </button>\n      </div>\n      <div>\n        {todos.map(todo => (\n          <div\n            key={todo.id}\n            style={{\n              display: "flex",\n              alignItems: "center",\n              gap: "10px",\n              padding: "12px",\n              background: "#f8f9fa",\n              borderRadius: "8px",\n              marginBottom: "8px"\n            }}\n          >\n            <input\n              type="checkbox"\n              checked={todo.done}\n              onChange={() => toggleTodo(todo.id)}\n            />\n            <span style={{\n              flex: 1,\n              textDecoration: todo.done ? "line-through" : "none",\n              color: todo.done ? "#999" : "#333"\n            }}>\n              {todo.text}\n            </span>\n            <button\n              onClick={() => deleteTodo(todo.id)}\n              style={{\n                padding: "6px 12px",\n                background: "#e74c3c",\n                color: "white",\n                border: "none",\n                borderRadius: "6px",\n                cursor: "pointer"\n              }}\n            >\n              Delete\n            </button>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\n\nReactDOM.render(<TodoApp />, document.getElementById("root"));'
      }
    },
    python: {
      hello: {
        name: '👋 Hello Python',
        code: '# Python in the browser!\nprint("🐍 Python is running!")\nprint("=" * 50)\n\nname = "Developer"\nprint(f"Hello, {name}!")\n\n# Math\nnumbers = [1, 2, 3, 4, 5]\nprint(f"\\nNumbers: {numbers}")\nprint(f"Sum: {sum(numbers)}")\nprint(f"Average: {sum(numbers)/len(numbers)}")\n\nprint("\\n✅ Complete!")'
      },
      data: {
        name: '📊 Data Processing',
        code: '# Data processing example\nimport sys\nfrom datetime import datetime\n\nprint("🐍 Python Data Processing")\nprint("=" * 50)\n\n# Sample data\nstudents = [\n    {"name": "Alice", "score": 95},\n    {"name": "Bob", "score": 87},\n    {"name": "Charlie", "score": 92}\n]\n\nprint(f"\\nTotal students: {len(students)}")\n\n# Calculate average\navg_score = sum(s["score"] for s in students) / len(students)\nprint(f"Average score: {avg_score:.2f}")\n\n# Find top student\ntop_student = max(students, key=lambda s: s["score"])\nprint(f"\\nTop student: {top_student[\'name\']} ({top_student[\'score\']})")\n\n# List comprehension\nsquares = [x**2 for x in range(1, 6)]\nprint(f"\\nSquares: {squares}")\n\nprint("\\n✅ Processing complete!")'
      }
    },
    typescript: {
      basic: {
        name: '🔷 TypeScript Basics',
        code: '// TypeScript Example\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst users: User[] = [\n  { id: 1, name: "Alice", email: "alice@example.com" },\n  { id: 2, name: "Bob", email: "bob@example.com" }\n];\n\nconsole.log("👥 Users:", users);\n\nfunction greetUser(user: User): string {\n  return `Hello, ${user.name}!`;\n}\n\nusers.forEach(user => {\n  console.log(greetUser(user));\n});\n\nconsole.log("\\n✅ TypeScript executed!");'
      }
    },
    json: {
      sample: {
        name: '📋 JSON Formatter',
        code: '{\n  "name": "DevHub Pro",\n  "version": "1.0.0",\n  "features": [\n    "Code Playground",\n    "Developer Tools",\n    "Tutorials"\n  ],\n  "active": true\n}'
      }
    }
  };

  const [html, setHtml] = useState(templates.html.basic.html);
  const [css, setCss] = useState(templates.html.basic.css);
  const [js, setJs] = useState(templates.html.basic.js);
  const [reactCode, setReactCode] = useState(templates.react.counter.code);
  const [pythonCode, setPythonCode] = useState(templates.python.hello.code);
  const [typescriptCode, setTypescriptCode] = useState(templates.typescript.basic.code);
  const [jsonCode, setJsonCode] = useState(templates.json.sample.code);

  const [activeTab, setActiveTab] = useState<'code' | 'css' | 'js'>('code');
  const [srcDoc, setSrcDoc] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);

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
        } catch (error) {
          console.error('Pyodide load error:', error);
        }
      };
      loadPyodide();
    }
  }, [mode, pyodideReady]);

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
      if (template) setReactCode(template.code);
    } else if (mode === 'python') {
      const template = templates.python[templateKey as keyof typeof templates.python];
      if (template) setPythonCode(template.code);
    } else if (mode === 'typescript') {
      const template = templates.typescript[templateKey as keyof typeof templates.typescript];
      if (template) setTypescriptCode(template.code);
    } else if (mode === 'json') {
      const template = templates.json[templateKey as keyof typeof templates.json];
      if (template) setJsonCode(template.code);
    }
    setShowTemplates(false);
  };

  // Copy code
  const copyCode = () => {
    let code = '';
    if (mode === 'html') code = `HTML:\n${html}\n\nCSS:\n${css}\n\nJS:\n${js}`;
    else if (mode === 'react') code = reactCode;
    else if (mode === 'python') code = pythonCode;
    else if (mode === 'typescript') code = typescriptCode;
    else if (mode === 'json') code = jsonCode;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download code
  const downloadCode = () => {
    let content = '', filename = '';
    if (mode === 'html') {
      content = `<!DOCTYPE html>\n<html>\n<head>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n</script>\n</body>\n</html>`;
      filename = 'index.html';
    } else if (mode === 'react') {
      content = reactCode;
      filename = 'app.jsx';
    } else if (mode === 'python') {
      content = pythonCode;
      filename = 'script.py';
    } else if (mode === 'typescript') {
      content = typescriptCode;
      filename = 'script.ts';
    } else if (mode === 'json') {
      content = jsonCode;
      filename = 'data.json';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Format JSON
  const formatJSON = () => {
    if (mode === 'json') {
      try {
        const formatted = JSON.stringify(JSON.parse(jsonCode), null, 2);
        setJsonCode(formatted);
      } catch (e) {
        alert('Invalid JSON');
      }
    }
  };

  // Run code
  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);

    if (mode === 'html') {
      setTimeout(() => {
        const source = `
          <html>
            <head><style>${css}</style></head>
            <body>
              ${html}
              <script>
                const originalLog = console.log;
                console.log = function(...args) {
                  window.parent.postMessage({type: 'log', data: args.map(String)}, '*');
                  originalLog.apply(console, args);
                };
                const originalError = console.error;
                console.error = function(...args) {
                  window.parent.postMessage({type: 'error', data: args.map(String)}, '*');
                  originalError.apply(console, args);
                };
                try {
                  ${js}
                } catch(e) {
                  console.error('Error: ' + e.message);
                }
              <\/script>
            </body>
          </html>
        `;
        setSrcDoc(source);
        setIsRunning(false);
      }, 300);
    } else if (mode === 'react') {
      setTimeout(() => {
        const source = `
          <html>
            <head>
              <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
              <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
            </head>
            <body>
              <div id="root"></div>
              <script>
                const originalLog = console.log;
                console.log = function(...args) {
                  window.parent.postMessage({type: 'log', data: args.map(String)}, '*');
                  originalLog.apply(console, args);
                };
                try {
                  ${reactCode}
                } catch(e) {
                  console.error('Error: ' + e.message);
                }
              <\/script>
            </body>
          </html>
        `;
        setSrcDoc(source);
        setIsRunning(false);
      }, 300);
    } else if (mode === 'python' && pyodideReady) {
      try {
        const pyodide = pyodideRef.current;
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        pyodide.runPython(pythonCode);
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        setOutput(stdout.split('\n'));
        setShowConsole(true);
      } catch (e: any) {
        setOutput([`Error: ${e.message}`]);
        setShowConsole(true);
      }
      setIsRunning(false);
    } else if (mode === 'typescript') {
      // Simple eval for TS (in real app, use TypeScript compiler)
      try {
        eval(typescriptCode);
        setOutput(['✅ TypeScript executed (converted to JS)']);
        setShowConsole(true);
      } catch (e: any) {
        setOutput([`Error: ${e.message}`]);
        setShowConsole(true);
      }
      setIsRunning(false);
    } else if (mode === 'json') {
      try {
        JSON.parse(jsonCode);
        setOutput(['✅ Valid JSON']);
        setShowConsole(true);
      } catch (e: any) {
        setOutput([`❌ Invalid JSON: ${e.message}`]);
        setShowConsole(true);
      }
      setIsRunning(false);
    } else {
      setIsRunning(false);
    }
  };

  // Listen for console messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'log') {
        setOutput(prev => [...prev, ...e.data.data]);
        setShowConsole(true);
      } else if (e.data.type === 'error') {
        setOutput(prev => [...prev, '❌ ' + e.data.data.join(' ')]);
        setShowConsole(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run
  useEffect(() => {
    if (autoRun && mode === 'html') {
      const timeout = setTimeout(runCode, 500);
      return () => clearTimeout(timeout);
    }
  }, [html, css, js, autoRun, mode]);

  // Initialize preview on mount and mode change
  useEffect(() => {
    if (mode === 'html' || mode === 'react') {
      runCode();
    }
  }, [mode]);

  // Pyodide script
  const pyodideScript = mode === 'python' ? (
    <Script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js" />
  ) : null;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {pyodideScript}

      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
        <div className="max-w-full px-4 py-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Title */}
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
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    mode === lang
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {lang === 'html' ? 'HTML/CSS/JS' : lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2"
              >
                <Book className="w-4 h-4" />
                Templates
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 font-medium"
              >
                {isRunning ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Run
              </button>
              <button
                onClick={copyCode}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={downloadCode}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout(layout === 'horizontal' ? 'vertical' : 'horizontal')}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg"
                title="Toggle layout"
              >
                <Layout className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings */}
          {showSettings && (
            <div className="mt-3 p-3 bg-gray-800 rounded-lg flex items-center gap-4 flex-wrap text-sm">
              <div className="flex items-center gap-2">
                <span>Font:</span>
                <button
                  onClick={() => setFontSize(f => Math.max(10, f - 2))}
                  className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span>{fontSize}px</span>
                <button
                  onClick={() => setFontSize(f => Math.min(24, f + 2))}
                  className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>
              {mode === 'html' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRun}
                    onChange={(e) => setAutoRun(e.target.checked)}
                    className="rounded"
                  />
                  <span>Auto Run</span>
                </label>
              )}
              {mode === 'json' && (
                <button
                  onClick={formatJSON}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Format JSON
                </button>
              )}
            </div>
          )}

          {/* Templates Modal */}
          {showTemplates && (
            <div className="mt-3 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Choose a template</h3>
                <button onClick={() => setShowTemplates(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(
                  mode === 'html' ? templates.html :
                  mode === 'react' ? templates.react :
                  mode === 'python' ? templates.python :
                  mode === 'typescript' ? templates.typescript :
                  templates.json
                ).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => loadTemplate(key)}
                    className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left text-sm"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor & Preview */}
      <div className={`flex flex-1 ${layout === 'vertical' ? 'flex-col' : 'flex-row'} overflow-hidden`}>
        {/* Editor */}
        <div className={`${layout === 'vertical' ? 'h-1/2' : 'w-1/2'} border-r border-gray-800 flex flex-col`}>
          {mode === 'html' && (
            <>
              <div className="flex border-b border-gray-800 bg-gray-900">
                {(['code', 'css', 'js'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm ${
                      activeTab === tab
                        ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
                }}
                className="flex-1 p-4 bg-gray-900 text-white font-mono resize-none focus:outline-none"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.6', tabSize: 2 }}
                spellCheck={false}
                placeholder={`Write your ${activeTab === 'code' ? 'HTML' : activeTab.toUpperCase()} code here...`}
              />
            </>
          )}

          {mode !== 'html' && (
            <textarea
              value={
                mode === 'react' ? reactCode :
                mode === 'python' ? pythonCode :
                mode === 'typescript' ? typescriptCode :
                jsonCode
              }
              onChange={(e) => {
                if (mode === 'react') setReactCode(e.target.value);
                else if (mode === 'python') setPythonCode(e.target.value);
                else if (mode === 'typescript') setTypescriptCode(e.target.value);
                else setJsonCode(e.target.value);
              }}
              className="flex-1 p-4 bg-gray-900 text-white font-mono resize-none focus:outline-none"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.6', tabSize: 2 }}
              spellCheck={false}
              placeholder={`Write your ${mode.toUpperCase()} code here...`}
            />
          )}
        </div>

        {/* Preview/Output */}
        <div className={`${layout === 'vertical' ? 'h-1/2' : 'w-1/2'} flex flex-col`}>
          {(mode === 'html' || mode === 'react') && (
            <iframe
              srcDoc={srcDoc}
              className="flex-1 bg-white border-0"
              title="preview"
              sandbox="allow-scripts allow-same-origin"
            />
          )}

          {(mode === 'python' || mode === 'typescript' || mode === 'json' || showConsole) && (
            <div className="flex-1 bg-gray-900 flex flex-col">
              <div className="flex items-center justify-between p-2 border-b border-gray-800 bg-gray-950">
                <div className="flex items-center gap-2 text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>Console</span>
                </div>
                {showConsole && (
                  <button
                    onClick={() => {
                      setOutput([]);
                      setShowConsole(false);
                    }}
                    className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                {output.length === 0 ? (
                  <div className="text-gray-500">Click "Run" to see output...</div>
                ) : (
                  output.map((line, i) => (
                    <div key={i} className={line.startsWith('❌') ? 'text-red-400' : 'text-green-400'}>
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
