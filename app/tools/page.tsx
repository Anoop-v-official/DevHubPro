import Link from 'next/link';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Free Developer Tools | DevHub Pro',
  description: 'Access 50+ free developer tools including formatters, converters, generators, and more.',
};

export default function ToolsPage() {
  const tools = [
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
      category: 'DevOps',
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
  ];

  const categories = ['All', 'Formatters', 'Converters', 'Security', 'Generators', 'DevOps', 'Ethical Hacking'];

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
              className="input pl-12 text-lg shadow-soft focus:shadow-glow"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105 text-gray-700 dark:text-gray-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.href}
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

              <div className="flex items-start space-x-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
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
                      {tool.usageCount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
            <button className="btn bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 font-bold shadow-xl hover:shadow-2xl">
              Request a Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
