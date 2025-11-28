'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, TrendingUp, Star, BookOpen, AlertCircle, FileCode, Sparkles, Code, Users, Mail } from 'lucide-react';

interface VisitorStats {
  totalVisitors: number;
  monthlyVisitors: number;
  totalToolsUsed: number;
  totalUsers: number;
  userRating: number;
}

export default function Home() {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    monthlyVisitors: 0,
    totalToolsUsed: 0,
    totalUsers: 0,
    userRating: 4.9
  });
  const [loading, setLoading] = useState(true);
  const [toolUsage, setToolUsage] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch visitor statistics
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visitors');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
      } finally {
        setLoading(false);
      }
    };

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

    fetchStats();
    fetchToolUsage();

    // Track this page visit
    fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: '/' })
    }).catch(err => console.error('Error tracking visit:', err));
  }, []);

  // Get usage count for a tool
  const getUsageCount = (toolName: string): string => {
    const count = toolUsage[toolName] || 0;
    if (count === 0) return '0';
    return formatNumber(count);
  };
  const featuredTools = [
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting',
      href: '/tools/json-formatter',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      rank: 1
    },
    {
      name: 'JWT Decoder',
      description: 'Decode and validate JWT tokens with detailed information',
      href: '/tools/jwt-decoder',
      icon: '🔐',
      color: 'from-purple-500 to-pink-500',
      rank: 2
    },
    {
      name: 'Base64 Converter',
      description: 'Encode and decode Base64 strings and files instantly',
      href: '/tools/base64-converter',
      icon: '🔄',
      color: 'from-orange-500 to-red-500',
      rank: 3
    },
    {
      name: 'SSH Key Generator',
      description: 'Generate secure SSH key pairs directly in your browser',
      href: '/tools/ssh-keygen',
      icon: '🔑',
      color: 'from-indigo-500 to-blue-500',
      rank: 5
    },
    {
      name: 'Password Analyzer',
      description: 'Check password strength and get security recommendations',
      href: '/tools/password-analyzer',
      icon: '🛡️',
      color: 'from-green-500 to-teal-500',
      rank: 6
    },
    {
      name: 'CIDR Calculator',
      description: 'Calculate network ranges, subnet masks, and IP information',
      href: '/tools/cidr-calculator',
      icon: '🌐',
      color: 'from-cyan-500 to-blue-500',
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

  // Format number with K/M suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
    return num.toString();
  };

  const displayStats = [
    { value: '50+', label: 'Free Tools' },
    { value: loading ? '...' : formatNumber(stats.monthlyVisitors), label: 'Monthly Visitors' },
    { value: loading ? '...' : formatNumber(stats.totalToolsUsed || 0), label: 'Tools Used' },
    { value: `${stats.userRating}/5`, label: 'User Rating' },
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
              <span className="text-sm font-semibold">
                {loading ? 'Trusted by developers worldwide' : `Trusted by ${formatNumber(stats.totalVisitors)} developers`}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-slide-up">
              Your Complete
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Developer Toolkit
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-blue-100 dark:text-blue-200 max-w-3xl mx-auto animate-slide-up leading-relaxed">
              Empowering Backend, Frontend, DevOps, Network Engineers, and all IT Professionals with 50+ free tools, solutions, and resources.
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
                href="/playground"
                className="btn btn-outline text-white border-white hover:bg-white hover:text-purple-600 text-lg"
              >
                Code Playground
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
            {displayStats.map((stat, index) => (
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
              Most Popular Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Trusted by Backend, Frontend, DevOps, Network Engineers & IT Professionals worldwide
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
                    {getUsageCount(tool.name)} uses
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

      {/* Popular Resources */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Resources
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Most accessed content by IT professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Popular Blog Post */}
            <Link href="/blog" className="card card-hover p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Latest Articles
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                10 JavaScript Tips Every Developer Should Know
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Trending</span>
              </div>
            </Link>

            {/* Popular Cheatsheet */}
            <Link href="/cheatsheets" className="card card-hover p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <FileCode className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Git Cheatsheet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Essential Git commands for daily development
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>45K views</span>
              </div>
            </Link>

            {/* Popular Error Solution */}
            <Link href="/errors" className="card card-hover p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Top Error Fix
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Cannot read property of undefined - Solutions
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>143 solutions</span>
              </div>
            </Link>

            {/* Popular Playground */}
            <Link href="/playground" className="card card-hover p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Code Playground
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Interactive code editor supporting multiple languages
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>15K uses</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Tools Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              New This Week
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Recently Added
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Fresh tools and resources added to help you code faster
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/tools" className="card card-hover p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full mb-3">
                NEW
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                API Response Formatter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Format and beautify API responses with syntax highlighting
              </p>
            </Link>

            <Link href="/cheatsheets" className="card card-hover p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-600 to-red-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <FileCode className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full mb-3">
                NEW
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Docker Commands
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complete Docker cheatsheet for container management
              </p>
            </Link>

            <Link href="/blog" className="card card-hover p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full mb-3">
                NEW
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                TypeScript Best Practices 2025
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Modern TypeScript patterns for enterprise applications
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what the community is saying about DevHub Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                "DevHub Pro has become my go-to resource. The JSON formatter alone saves me hours every week. Fast, reliable, and completely free!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  SR
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Sarah Rodriguez</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer</div>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                "As a DevOps engineer, the CIDR calculator and SSH keygen tools are invaluable. Clean UI, works offline, and respects privacy."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  MK
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Michael Kim</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">DevOps Engineer</div>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                "The comprehensive tutorials and error solutions helped me solve complex problems quickly. Well-researched content with practical insights."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  AP
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Ananya Patel</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Backend Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 border-none text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
              Get weekly updates on new tools, tutorials, and developer resources delivered to your inbox
            </p>
            <a
              href="mailto:contact@devhubpro.com?subject=Newsletter Subscription"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              <Mail className="w-5 h-5" />
              Subscribe to Newsletter
            </a>
            <p className="text-sm text-blue-200 dark:text-blue-300 mt-4">
              Join 25,000+ developers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="card p-8 md:p-12 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-sm font-semibold text-gray-300">Growing Community</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  Join the Movement
                </h3>
                <p className="text-gray-400">
                  Used by developers at top tech companies worldwide
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 md:col-span-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {loading ? '...' : formatNumber(stats.totalVisitors)}
                  </div>
                  <div className="text-sm text-gray-400">Total Visitors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {loading ? '...' : formatNumber(stats.totalToolsUsed || 0)}
                  </div>
                  <div className="text-sm text-gray-400">Tools Used</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-1">50+</div>
                  <div className="text-sm text-gray-400">Free Tools</div>
                </div>
              </div>
            </div>
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
            {loading
              ? 'Join developers worldwide using DevHub Pro every day'
              : `Join ${formatNumber(stats.totalVisitors)} developers using DevHub Pro`
            }
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
