'use client';

import { useState } from 'react';
import { BookOpen, Search, Download, Copy, Star, Code2, Terminal, Database, GitBranch, X } from 'lucide-react';

export default function CheatsheetsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSheet, setSelectedSheet] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const cheatsheets = [
    {
      id: 'git',
      title: 'Git Commands',
      category: 'Version Control',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      popular: true,
      commands: [
        { cmd: 'git init', desc: 'Initialize a new Git repository' },
        { cmd: 'git clone <url>', desc: 'Clone a repository' },
        { cmd: 'git add .', desc: 'Stage all changes' },
        { cmd: 'git commit -m "message"', desc: 'Commit staged changes' },
        { cmd: 'git push origin main', desc: 'Push to remote branch' },
        { cmd: 'git pull origin main', desc: 'Pull from remote branch' },
        { cmd: 'git status', desc: 'Check repository status' },
        { cmd: 'git branch', desc: 'List all branches' },
        { cmd: 'git checkout -b <branch>', desc: 'Create and switch to new branch' },
        { cmd: 'git merge <branch>', desc: 'Merge branch into current branch' },
        { cmd: 'git log --oneline', desc: 'View commit history' },
        { cmd: 'git stash', desc: 'Stash current changes' },
        { cmd: 'git stash pop', desc: 'Apply stashed changes' },
        { cmd: 'git reset --hard HEAD', desc: 'Reset to last commit' },
      ]
    },
    {
      id: 'linux',
      title: 'Linux Commands',
      category: 'DevOps',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-green-500 to-teal-500',
      popular: true,
      commands: [
        { cmd: 'ls -la', desc: 'List all files with details' },
        { cmd: 'cd /path/to/dir', desc: 'Change directory' },
        { cmd: 'pwd', desc: 'Print working directory' },
        { cmd: 'mkdir dirname', desc: 'Create directory' },
        { cmd: 'rm -rf dirname', desc: 'Remove directory recursively' },
        { cmd: 'cp source dest', desc: 'Copy files' },
        { cmd: 'mv source dest', desc: 'Move/rename files' },
        { cmd: 'cat filename', desc: 'Display file contents' },
        { cmd: 'grep "pattern" file', desc: 'Search for pattern in file' },
        { cmd: 'find . -name "*.txt"', desc: 'Find files by name' },
        { cmd: 'chmod 755 file', desc: 'Change file permissions' },
        { cmd: 'ps aux | grep process', desc: 'Find running process' },
        { cmd: 'kill -9 PID', desc: 'Force kill process' },
      ]
    },
    {
      id: 'docker',
      title: 'Docker Commands',
      category: 'DevOps',
      icon: <Code2 className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      popular: true,
      commands: [
        { cmd: 'docker build -t image:tag .', desc: 'Build Docker image' },
        { cmd: 'docker run -d -p 80:80 image', desc: 'Run container in background' },
        { cmd: 'docker ps', desc: 'List running containers' },
        { cmd: 'docker ps -a', desc: 'List all containers' },
        { cmd: 'docker stop container_id', desc: 'Stop container' },
        { cmd: 'docker rm container_id', desc: 'Remove container' },
        { cmd: 'docker images', desc: 'List all images' },
        { cmd: 'docker exec -it container bash', desc: 'Execute command in container' },
        { cmd: 'docker logs container_id', desc: 'View container logs' },
        { cmd: 'docker-compose up -d', desc: 'Start services with compose' },
        { cmd: 'docker-compose down', desc: 'Stop services with compose' },
      ]
    },
    {
      id: 'javascript',
      title: 'JavaScript ES6+',
      category: 'Programming',
      icon: <Code2 className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      popular: true,
      commands: [
        { cmd: 'const arr = [1, 2, 3]', desc: 'Array declaration' },
        { cmd: '[...arr, 4, 5]', desc: 'Spread operator' },
        { cmd: 'arr.map(x => x * 2)', desc: 'Map array' },
        { cmd: 'arr.filter(x => x > 1)', desc: 'Filter array' },
        { cmd: 'arr.reduce((a,b) => a+b, 0)', desc: 'Reduce array' },
        { cmd: 'const {a, b} = obj', desc: 'Object destructuring' },
        { cmd: 'const [x, y] = arr', desc: 'Array destructuring' },
        { cmd: 'async/await', desc: 'Async function syntax' },
        { cmd: 'Promise.all([p1, p2])', desc: 'Wait for multiple promises' },
      ]
    },
    {
      id: 'python',
      title: 'Python Essentials',
      category: 'Programming',
      icon: <Code2 className="w-6 h-6" />,
      color: 'from-blue-600 to-indigo-600',
      popular: false,
      commands: [
        { cmd: 'list = [1, 2, 3]', desc: 'List declaration' },
        { cmd: '[x*2 for x in list]', desc: 'List comprehension' },
        { cmd: 'dict = {"key": "value"}', desc: 'Dictionary declaration' },
        { cmd: 'with open("file") as f:', desc: 'File handling' },
        { cmd: 'import module', desc: 'Import module' },
        { cmd: 'def func(param):', desc: 'Function definition' },
        { cmd: 'class MyClass:', desc: 'Class definition' },
        { cmd: 'lambda x: x*2', desc: 'Lambda function' },
      ]
    },
    {
      id: 'sql',
      title: 'SQL Queries',
      category: 'Database',
      icon: <Database className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      popular: false,
      commands: [
        { cmd: 'SELECT * FROM table', desc: 'Select all records' },
        { cmd: 'SELECT col FROM table WHERE condition', desc: 'Select with condition' },
        { cmd: 'INSERT INTO table VALUES (val1, val2)', desc: 'Insert record' },
        { cmd: 'UPDATE table SET col=val WHERE condition', desc: 'Update records' },
        { cmd: 'DELETE FROM table WHERE condition', desc: 'Delete records' },
        { cmd: 'JOIN table2 ON table1.id = table2.id', desc: 'Inner join' },
        { cmd: 'LEFT JOIN table2 ON condition', desc: 'Left join' },
        { cmd: 'GROUP BY column', desc: 'Group results' },
        { cmd: 'ORDER BY column DESC', desc: 'Sort results' },
      ]
    },
    {
      id: 'react',
      title: 'React Hooks',
      category: 'Frontend',
      icon: <Code2 className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-500',
      popular: true,
      commands: [
        { cmd: 'useState(initialValue)', desc: 'State hook' },
        { cmd: 'useEffect(() => {}, [])', desc: 'Effect hook' },
        { cmd: 'useContext(MyContext)', desc: 'Context hook' },
        { cmd: 'useRef(initialValue)', desc: 'Ref hook' },
        { cmd: 'useMemo(() => value, [deps])', desc: 'Memoization hook' },
        { cmd: 'useCallback(() => fn, [deps])', desc: 'Callback hook' },
      ]
    },
    {
      id: 'regex',
      title: 'Regular Expressions',
      category: 'Programming',
      icon: <Code2 className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      popular: false,
      commands: [
        { cmd: '^', desc: 'Start of string' },
        { cmd: '$', desc: 'End of string' },
        { cmd: '.', desc: 'Any character' },
        { cmd: '*', desc: 'Zero or more' },
        { cmd: '+', desc: 'One or more' },
        { cmd: '\\d', desc: 'Any digit [0-9]' },
        { cmd: '\\w', desc: 'Any word character' },
        { cmd: '\\s', desc: 'Any whitespace' },
        { cmd: '[abc]', desc: 'Any of a, b, or c' },
      ]
    },
  ];

  const categories = ['All', 'Programming', 'DevOps', 'Frontend', 'Database', 'Version Control'];

  const filteredSheets = cheatsheets.filter(sheet => {
    const matchesCategory = selectedCategory === 'All' || sheet.category === selectedCategory;
    const matchesSearch = sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sheet.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Cheatsheets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Quick reference guides for popular programming languages, tools, and frameworks
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search cheatsheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 shadow-lg focus:shadow-glow"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cheatsheets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredSheets.map((sheet, index) => (
            <div
              key={sheet.id}
              onClick={() => setSelectedSheet(sheet)}
              className="card p-6 hover:scale-105 transition-transform cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {sheet.popular && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full mb-3">
                  <Star className="w-3 h-3" />
                  POPULAR
                </span>
              )}
              <div className={`w-14 h-14 bg-gradient-to-br ${sheet.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {sheet.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {sheet.title}
              </h3>
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                {sheet.category}
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                {sheet.commands.length} commands
              </p>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSheets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No cheatsheets found. Try a different search or category.
            </p>
          </div>
        )}

        {/* Cheatsheet Modal */}
        {selectedSheet && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedSheet(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`sticky top-0 bg-gradient-to-r ${selectedSheet.color} p-6 rounded-t-2xl flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    {selectedSheet.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedSheet.title}</h2>
                    <span className="text-sm text-white/80">{selectedSheet.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSheet(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Commands */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Quick Reference ({selectedSheet.commands.length} commands)
                  </h3>
                  <button
                    onClick={() => copyToClipboard(selectedSheet.commands.map((c: any) => c.cmd).join('\n'))}
                    className="btn btn-ghost text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Export All
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedSheet.commands.map((command: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <code className="block text-sm font-mono text-blue-600 dark:text-blue-400 mb-2 break-all">
                            {command.cmd}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {command.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(command.cmd)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                          title="Copy command"
                        >
                          <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-300">
                    <strong>Pro Tip:</strong> Hover over commands to see the copy button. Click to copy any command to your clipboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
