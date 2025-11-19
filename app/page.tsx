import Link from 'next/link';
import { ArrowRight, Zap, Shield, TrendingUp, Star } from 'lucide-react';

export default function Home() {
  const featuredTools = [
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting',
      href: '/tools/json-formatter',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'JWT Decoder',
      description: 'Decode and validate JWT tokens with detailed information',
      href: '/tools/jwt-decoder',
      icon: '🔐',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Base64 Converter',
      description: 'Encode and decode Base64 strings and files instantly',
      href: '/tools/base64-converter',
      icon: '🔄',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Hash Generator',
      description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes',
      href: '/tools/hash-generator',
      icon: '🔒',
      color: 'from-green-500 to-teal-500'
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'All tools run instantly in your browser with zero server delays'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data never leaves your browser. 100% client-side processing'
    },
    {
      icon: TrendingUp,
      title: 'Always Free',
      description: 'No hidden fees, no subscriptions. Free forever for everyone'
    }
  ];

  const stats = [
    { value: '50+', label: 'Free Tools' },
    { value: '100k+', label: 'Monthly Users' },
    { value: '1M+', label: 'Tools Used' },
    { value: '4.9/5', label: 'User Rating' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Trusted by 100,000+ developers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Complete
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Developer Toolkit
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Access 50+ free tools, tech comparisons, error solutions, and AI prompts. 
              Everything you need to build amazing software.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl hover:shadow-2xl inline-flex items-center justify-center"
              >
                Explore Free Tools
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/compare"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition"
              >
                Tech Comparisons
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 33.3C480 27 600 33 720 43.3C840 53 960 67 1080 70C1200 73 1320 67 1380 63.3L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Developer Tools
            </h2>
            <p className="text-xl text-gray-600">
              Our most-used tools, trusted by developers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              View All 50+ Tools
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DevHub Pro?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 100,000+ developers using DevHub Pro every day
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
