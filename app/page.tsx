import Link from 'next/link';
import { ArrowRight, Zap, Shield, TrendingUp, Star } from 'lucide-react';

export default function Home() {
  const featuredTools = [
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting',
      href: '/tools/json-formatter',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      usageCount: '45.2K',
      rank: 1
    },
    {
      name: 'JWT Decoder',
      description: 'Decode and validate JWT tokens with detailed information',
      href: '/tools/jwt-decoder',
      icon: '🔐',
      color: 'from-purple-500 to-pink-500',
      usageCount: '38.7K',
      rank: 2
    },
    {
      name: 'Base64 Converter',
      description: 'Encode and decode Base64 strings and files instantly',
      href: '/tools/base64-converter',
      icon: '🔄',
      color: 'from-orange-500 to-red-500',
      usageCount: '32.1K',
      rank: 3
    },
    {
      name: 'SSH Key Generator',
      description: 'Generate secure SSH key pairs directly in your browser',
      href: '/tools/ssh-keygen',
      icon: '🔑',
      color: 'from-indigo-500 to-blue-500',
      usageCount: '24.3K',
      rank: 5
    },
    {
      name: 'Password Analyzer',
      description: 'Check password strength and get security recommendations',
      href: '/tools/password-analyzer',
      icon: '🛡️',
      color: 'from-green-500 to-teal-500',
      usageCount: '22.8K',
      rank: 6
    },
    {
      name: 'CIDR Calculator',
      description: 'Calculate network ranges, subnet masks, and IP information',
      href: '/tools/cidr-calculator',
      icon: '🌐',
      color: 'from-cyan-500 to-blue-500',
      usageCount: '17.2K',
      rank: 8
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
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-5 py-2.5 mb-8 animate-fade-in border border-white/20">
              <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-sm font-semibold">Trusted by 100,000+ developers</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-slide-up">
              Your Complete
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Developer Toolkit
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-blue-100 dark:text-blue-200 max-w-3xl mx-auto animate-slide-up leading-relaxed">
              Access 50+ free tools, tech comparisons, error solutions, and AI prompts.
              Everything you need to build amazing software.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                href="/tools"
                className="btn btn-primary group text-lg hover:shadow-glow-lg"
              >
                Explore Free Tools
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/compare"
                className="btn btn-outline text-white border-white hover:bg-white hover:text-purple-600 text-lg"
              >
                Tech Comparisons
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L60 70C120 60 240 40 360 33.3C480 27 600 33 720 43.3C840 53 960 67 1080 70C1200 73 1320 67 1380 63.3L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="currentColor" className="text-white dark:text-gray-950"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Developer Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Our most-used tools, trusted by developers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="card card-hover group p-6 relative overflow-hidden"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                  #{tool.rank}
                </div>

                <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                  {tool.description}
                </p>

                {/* Usage Counter */}
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {tool.usageCount} uses
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="btn btn-primary group text-lg"
            >
              View All 50+ Tools
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose DevHub Pro?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center p-8 group hover:scale-105 transition-transform">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl mb-6 group-hover:shadow-glow transition-all">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-xl mb-10 text-blue-100 dark:text-blue-200 max-w-2xl mx-auto">
            Join 100,000+ developers using DevHub Pro every day
          </p>
          <Link
            href="/tools"
            className="btn bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 shadow-2xl hover:shadow-glow-lg text-lg font-bold"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
