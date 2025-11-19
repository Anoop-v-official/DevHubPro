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
    },
    {
      name: 'Base64 Converter',
      description: 'Encode and decode Base64 strings and files',
      href: '/tools/base64-converter',
      icon: '🔄',
      category: 'Converters',
      popular: true,
    },
    {
      name: 'JWT Decoder',
      description: 'Decode and validate JWT tokens',
      href: '/tools/jwt-decoder',
      icon: '🔐',
      category: 'Security',
      popular: true,
    },
    {
      name: 'Hash Generator',
      description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
      href: '/tools/hash-generator',
      icon: '🔒',
      category: 'Security',
      popular: false,
    },
  ];

  const categories = ['All', 'Formatters', 'Converters', 'Security', 'Generators'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Free Developer Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade tools for developers. All free, always.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white border-2 border-gray-200 rounded-full font-medium hover:border-blue-500 hover:text-blue-600 transition"
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
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              {tool.popular && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mb-3">
                  POPULAR
                </span>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {tool.description}
                  </p>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Can't find what you need?</h2>
          <p className="text-lg mb-6 text-blue-100">
            We're constantly adding new tools. Request a tool and we'll build it!
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition">
            Request a Tool
          </button>
        </div>
      </div>
    </div>
  );
}
