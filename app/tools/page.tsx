'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Search, MessageCircle } from 'lucide-react';
import BookmarkButton from '@/components/BookmarkButton';
import { useAuth } from '@/components/AuthContext';

export default function ToolsPage() {
  const { data: session } = useSession();
  const { openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toolUsage, setToolUsage] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch tool usage statistics
    const fetchToolUsage = async () => {
      try {
        const response = await fetch('/api/tool-usage/stats');
        const data = await response.json();
        setToolUsage(data);
      } catch (error) {
        console.error('Error fetching tool usage:', error);
      }
    };

    fetchToolUsage();
  }, []);

  // Format number with K/M suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Get usage count for a tool
  const getUsageCount = (toolName: string): string => {
    const count = toolUsage[toolName] || 0;
    if (count === 0) return '0';
    return formatNumber(count);
  };

  const tools = [
    // Existing Popular Tools
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting',
      href: '/tools/json-formatter',
      icon: '📋',
      category: 'Formatters',
      popular: true,
      usageCount: '45.2K',
      rank: 1
    },
    {
      name: 'JWT Decoder',
      description: 'Decode and validate JWT tokens',
      href: '/tools/jwt-decoder',
      icon: '🔐',
      category: 'Security',
      popular: true,
      usageCount: '38.7K',
      rank: 2
    },
    {
      name: 'Base64 Converter',
      description: 'Encode and decode Base64 strings and files',
      href: '/tools/base64-converter',
      icon: '🔄',
      category: 'Converters',
      popular: true,
      usageCount: '32.1K',
      rank: 3
    },
    {
      name: 'Hash Generator',
      description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
      href: '/tools/hash-generator',
      icon: '🔒',
      category: 'Security',
      popular: false,
      usageCount: '28.5K',
      rank: 4
    },
    {
      name: 'SSH Key Generator',
      description: 'Generate secure SSH key pairs in your browser',
      href: '/tools/ssh-keygen',
      icon: '🔑',
      category: 'Security',
      popular: true,
      usageCount: '24.3K',
      rank: 5
    },

    // Frontend Developer Tools
    {
      name: 'CSS Minifier',
      description: 'Minify and compress CSS code to reduce file size',
      href: '/tools/css-minifier',
      icon: '🎨',
      category: 'Frontend',
      popular: true,
      rank: 0
    },
    {
      name: 'HTML Formatter',
      description: 'Format and beautify HTML code with proper indentation',
      href: '/tools/html-formatter',
      icon: '📝',
      category: 'Frontend',
      popular: true,
      rank: 0
    },
    {
      name: 'Color Picker',
      description: 'Pick colors and convert between HEX, RGB, HSL formats',
      href: '/tools/color-picker',
      icon: '🎨',
      category: 'Frontend',
      popular: true,
      rank: 0
    },
    {
      name: 'Gradient Generator',
      description: 'Create beautiful CSS gradients with visual editor',
      href: '/tools/gradient-generator',
      icon: '🌈',
      category: 'Frontend',
      popular: false,
      rank: 0
    },
    {
      name: 'Box Shadow Generator',
      description: 'Generate CSS box-shadow with live preview',
      href: '/tools/box-shadow',
      icon: '⬛',
      category: 'Frontend',
      popular: false,
      rank: 0
    },
    {
      name: 'SVG Optimizer',
      description: 'Optimize and compress SVG files',
      href: '/tools/online-tools',
      icon: '🖼️',
      category: 'Frontend',
      popular: false,
      usageCount: '17.9K',
      rank: 0
    },
    {
      name: 'Flexbox Generator',
      description: 'Visual CSS Flexbox layout generator',
      href: '/tools/online-tools',
      icon: '📐',
      category: 'Frontend',
      popular: false,
      usageCount: '16.7K',
      rank: 0
    },
    {
      name: 'Grid Generator',
      description: 'CSS Grid layout generator with visual interface',
      href: '/tools/online-tools',
      icon: '🎯',
      category: 'Frontend',
      popular: false,
      usageCount: '15.3K',
      rank: 0
    },
    {
      name: 'Meta Tag Generator',
      description: 'Generate SEO-friendly meta tags for your website',
      href: '/tools/online-tools',
      icon: '🏷️',
      category: 'Frontend',
      popular: false,
      usageCount: '14.9K',
      rank: 0
    },
    {
      name: 'Open Graph Generator',
      description: 'Create Open Graph tags for social media sharing',
      href: '/tools/online-tools',
      icon: '📱',
      category: 'Frontend',
      popular: false,
      usageCount: '13.8K',
      rank: 0
    },
    {
      name: 'Favicon Generator',
      description: 'Generate favicons in multiple sizes for all platforms',
      href: '/tools/online-tools',
      icon: '🎭',
      category: 'Frontend',
      popular: false,
      usageCount: '12.6K',
      rank: 0
    },
    {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for your designs',
      href: '/tools/lorem-ipsum',
      icon: '📄',
      category: 'Frontend',
      popular: false,
      rank: 0
    },
    {
      name: 'Border Radius Generator',
      description: 'Create CSS border-radius with visual preview',
      href: '/tools/border-radius',
      icon: '⭕',
      category: 'Frontend',
      popular: false,
      rank: 0
    },
    {
      name: 'CSS to Tailwind',
      description: 'Convert CSS code to Tailwind CSS classes',
      href: '/tools/online-tools',
      icon: '🔀',
      category: 'Frontend',
      popular: false,
      usageCount: '9.7K',
      rank: 0
    },
    {
      name: 'Markdown to HTML',
      description: 'Convert Markdown to HTML with live preview',
      href: '/tools/markdown-to-html',
      icon: '📃',
      category: 'Frontend',
      popular: false,
      rank: 0
    },

    // Backend Developer Tools
    {
      name: 'SQL Formatter',
      description: 'Format and beautify SQL queries',
      href: '/tools/sql-formatter',
      icon: '🗄️',
      category: 'Backend',
      popular: true,
      rank: 0
    },
    {
      name: 'UUID Generator',
      description: 'Generate UUIDs v4 instantly',
      href: '/tools/uuid-generator',
      icon: '🔖',
      category: 'Backend',
      popular: true,
      rank: 0
    },
    {
      name: 'Timestamp Converter',
      description: 'Convert between Unix timestamps and datetime',
      href: '/tools/timestamp-converter',
      icon: '⏱️',
      category: 'Backend',
      popular: true,
      rank: 0
    },
    {
      name: 'XML to JSON',
      description: 'Convert XML to JSON and vice versa',
      href: '/tools/xml-to-json',
      icon: '🔄',
      category: 'Backend',
      popular: false,
      rank: 0
    },
    {
      name: 'YAML Validator',
      description: 'Validate and format YAML configuration files',
      href: '/tools/yaml-validator',
      icon: '📋',
      category: 'Backend',
      popular: false,
      rank: 0
    },
    {
      name: 'Random Data Generator',
      description: 'Generate random names, emails, addresses, and more',
      href: '/tools/random-data',
      icon: '🎲',
      category: 'Backend',
      popular: false,
      rank: 0
    },
    {
      name: 'API Response Formatter',
      description: 'Format and validate API responses',
      href: '/tools/online-tools',
      icon: '🔌',
      category: 'Backend',
      popular: false,
      usageCount: '15.7K',
      rank: 0
    },
    {
      name: 'Environment Variable Generator',
      description: 'Generate .env files with secure values',
      href: '/tools/online-tools',
      icon: '🔐',
      category: 'Backend',
      popular: false,
      usageCount: '14.3K',
      rank: 0
    },
    {
      name: 'SQL Query Builder',
      description: 'Build complex SQL queries visually',
      href: '/tools/online-tools',
      icon: '🏗️',
      category: 'Backend',
      popular: false,
      usageCount: '13.9K',
      rank: 0
    },
    {
      name: 'GraphQL Query Builder',
      description: 'Build and test GraphQL queries',
      href: '/tools/online-tools',
      icon: '⚡',
      category: 'Backend',
      popular: false,
      usageCount: '12.8K',
      rank: 0
    },
    {
      name: 'Docker Compose Generator',
      description: 'Generate docker-compose.yml files',
      href: '/tools/online-tools',
      icon: '🐳',
      category: 'Backend',
      popular: false,
      usageCount: '11.6K',
      rank: 0
    },
    {
      name: 'Nginx Config Generator',
      description: 'Generate Nginx server configuration',
      href: '/tools/nginx-config',
      icon: '🌐',
      category: 'Backend',
      popular: false,
      rank: 0
    },
    {
      name: 'robots.txt Generator',
      description: 'Generate robots.txt for search engines',
      href: '/tools/robots-txt',
      icon: '🤖',
      category: 'Backend',
      popular: false,
      rank: 0
    },
    {
      name: 'sitemap.xml Generator',
      description: 'Generate XML sitemaps for SEO',
      href: '/tools/sitemap-xml',
      icon: '🗺️',
      category: 'Backend',
      popular: false,
      rank: 0
    },
    {
      name: '.htaccess Generator',
      description: 'Generate Apache .htaccess rules',
      href: '/tools/htaccess',
      icon: '⚙️',
      category: 'Backend',
      popular: false,
      rank: 0
    },

    // Existing Tools Continued
    {
      name: 'Password Analyzer',
      description: 'Check password strength and get security recommendations',
      href: '/tools/password-analyzer',
      icon: '🛡️',
      category: 'Security',
      popular: true,
      usageCount: '22.8K',
      rank: 6
    },
    {
      name: 'Reverse Shell Generator',
      description: 'Generate reverse shell commands for penetration testing',
      href: '/tools/reverse-shell',
      icon: '💻',
      category: 'Ethical Hacking',
      popular: true,
      usageCount: '19.4K',
      rank: 7
    },
    {
      name: 'CIDR Calculator',
      description: 'Calculate network ranges, subnet masks, and IP information',
      href: '/tools/cidr-calculator',
      icon: '🌐',
      category: 'Networking',
      popular: true,
      usageCount: '17.2K',
      rank: 8
    },
    {
      name: 'Payload Encoder',
      description: 'Encode and decode payloads using multiple schemes',
      href: '/tools/payload-encoder',
      icon: '🔓',
      category: 'Ethical Hacking',
      popular: true,
      usageCount: '15.8K',
      rank: 9
    },
    {
      name: 'Cron Expression Builder',
      description: 'Build and test cron expressions for task scheduling',
      href: '/tools/cron-builder',
      icon: '⏰',
      category: 'DevOps',
      popular: false,
      usageCount: '14.6K',
      rank: 10
    },
    {
      name: 'Regex Tester',
      description: 'Test and debug regular expressions with live results',
      href: '/tools/regex-tester',
      icon: '🔍',
      category: 'Generators',
      popular: true,
      rank: 0
    },
    {
      name: 'URL Encoder',
      description: 'Encode and decode URL parameters',
      href: '/tools/url-encoder',
      icon: '🔗',
      category: 'Converters',
      popular: false,
      rank: 0
    },
    {
      name: 'HTML Entity Encoder',
      description: 'Encode and decode HTML entities',
      href: '/tools/html-entity-encoder',
      icon: '🔤',
      category: 'Converters',
      popular: false,
      rank: 0
    },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Formatters', 'Converters', 'Security', 'Generators', 'DevOps', 'Networking', 'Ethical Hacking'];

  // Filter tools based on search query and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Free Developer Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional-grade tools for developers. All free, always.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 text-lg shadow-soft focus:shadow-glow"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 border-2 rounded-full font-semibold transition-all hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredTools.length}</span> {filteredTools.length === 1 ? 'tool' : 'tools'}
            {searchQuery && <span> for "{searchQuery}"</span>}
            {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}
          </p>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="card card-hover group p-6 animate-scale-in relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tool.popular && (
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg">
                  POPULAR
                </span>
              )}

              {/* Rank Badge */}
              {tool.rank <= 3 && (
                <div className="absolute top-4 right-4 w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg group-hover:scale-110 transition-transform">
                  #{tool.rank}
                </div>
              )}

              <div className="flex items-start space-x-4 mb-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                <div className="flex-1">
                  <Link href={tool.href}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg font-medium">
                      {tool.category}
                    </span>
                    {/* Usage Counter */}
                    <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      {getUsageCount(tool.name)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bookmark and Visit Buttons */}
              <div className="flex items-center gap-2">
                <BookmarkButton
                  type="tool"
                  itemId={tool.href}
                  itemTitle={tool.name}
                  itemUrl={tool.href}
                  className="flex-1"
                />
                <Link
                  href={tool.href}
                  className="flex-1 text-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Open Tool
                </Link>
              </div>
            </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="relative text-center mt-16 p-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-2xl text-white shadow-glow overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Can't find what you need?</h2>
            <p className="text-lg mb-8 text-blue-100 dark:text-blue-200 max-w-2xl mx-auto">
              We're constantly adding new tools. Request a tool and we'll build it!
            </p>
            <button
              onClick={() => {
                if (session) {
                  window.location.href = 'mailto:contact@devhubpro.com?subject=Tool Request';
                } else {
                  openAuthModal();
                }
              }}
              className="btn bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 font-bold shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Request a Tool
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
