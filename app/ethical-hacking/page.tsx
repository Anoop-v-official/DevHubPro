'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Terminal, Network, Eye, Key, Search, Bug, AlertTriangle, BookOpen, Clock, TrendingUp, Star, ExternalLink } from 'lucide-react';

export default function EthicalHackingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Security', 'Network Security', 'Penetration Testing', 'Bug Bounty', 'CTF', 'Tools', 'Certifications'];

  const tutorials = [
    {
      id: 1,
      title: 'Introduction to Ethical Hacking',
      category: 'Web Security',
      difficulty: 'Beginner',
      duration: '15 min',
      views: '25.4K',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      excerpt: 'Learn the fundamentals of ethical hacking, penetration testing, and responsible disclosure.',
      popular: true,
      topics: ['Security Basics', 'Legal Frameworks', 'Testing Methodology']
    },
    {
      id: 2,
      title: 'OWASP Top 10 Vulnerabilities 2024',
      category: 'Web Security',
      difficulty: 'Intermediate',
      duration: '30 min',
      views: '32.1K',
      icon: Bug,
      color: 'from-red-500 to-orange-500',
      excerpt: 'Comprehensive guide to the most critical web application security risks and how to prevent them.',
      popular: true,
      topics: ['Injection', 'Broken Auth', 'XSS', 'CSRF']
    },
    {
      id: 3,
      title: 'SQL Injection: From Basics to Advanced',
      category: 'Web Security',
      difficulty: 'Intermediate',
      duration: '45 min',
      views: '18.7K',
      icon: Terminal,
      color: 'from-purple-500 to-pink-500',
      excerpt: 'Master SQL injection techniques, detection methods, and mitigation strategies.',
      popular: true,
      topics: ['Union-based', 'Blind SQLi', 'Prevention']
    },
    {
      id: 4,
      title: 'Network Reconnaissance with Nmap',
      category: 'Network Security',
      difficulty: 'Intermediate',
      duration: '25 min',
      views: '15.3K',
      icon: Network,
      color: 'from-green-500 to-teal-500',
      excerpt: 'Learn advanced Nmap scanning techniques for network discovery and security auditing.',
      popular: false,
      topics: ['Port Scanning', 'Service Detection', 'OS Fingerprinting']
    },
    {
      id: 5,
      title: 'Cross-Site Scripting (XSS) Exploitation',
      category: 'Web Security',
      difficulty: 'Intermediate',
      duration: '35 min',
      views: '14.2K',
      icon: Bug,
      color: 'from-yellow-500 to-orange-500',
      excerpt: 'Understand XSS vulnerabilities, exploitation techniques, and defensive programming.',
      popular: false,
      topics: ['Reflected XSS', 'Stored XSS', 'DOM XSS']
    },
    {
      id: 6,
      title: 'Password Cracking with John the Ripper',
      category: 'Tools',
      difficulty: 'Beginner',
      duration: '20 min',
      views: '12.8K',
      icon: Key,
      color: 'from-indigo-500 to-purple-500',
      excerpt: 'Learn password cracking techniques using John the Ripper for security assessments.',
      popular: false,
      topics: ['Hash Cracking', 'Dictionary Attacks', 'Rainbow Tables']
    },
    {
      id: 7,
      title: 'Getting Started with Bug Bounty',
      category: 'Bug Bounty',
      difficulty: 'Beginner',
      duration: '40 min',
      views: '28.5K',
      icon: Search,
      color: 'from-pink-500 to-red-500',
      excerpt: 'Complete guide to starting your bug bounty journey, from choosing platforms to writing reports.',
      popular: true,
      topics: ['Platform Selection', 'Reconnaissance', 'Report Writing']
    },
    {
      id: 8,
      title: 'Metasploit Framework: Complete Guide',
      category: 'Penetration Testing',
      difficulty: 'Advanced',
      duration: '60 min',
      views: '16.9K',
      icon: Terminal,
      color: 'from-gray-600 to-gray-800',
      excerpt: 'Master the Metasploit Framework for penetration testing and vulnerability exploitation.',
      popular: false,
      topics: ['MSFconsole', 'Exploits', 'Payloads', 'Post-Exploitation']
    },
    {
      id: 9,
      title: 'Web Application Penetration Testing',
      category: 'Penetration Testing',
      difficulty: 'Advanced',
      duration: '90 min',
      views: '21.3K',
      icon: Lock,
      color: 'from-blue-600 to-purple-600',
      excerpt: 'Complete methodology for testing web applications, from information gathering to reporting.',
      popular: true,
      topics: ['OWASP Testing Guide', 'Burp Suite', 'Manual Testing']
    },
    {
      id: 10,
      title: 'CTF Challenges: Beginner to Advanced',
      category: 'CTF',
      difficulty: 'All Levels',
      duration: '120 min',
      views: '19.7K',
      icon: Star,
      color: 'from-yellow-500 to-red-500',
      excerpt: 'Practice your skills with Capture The Flag challenges covering various security domains.',
      popular: true,
      topics: ['Web Exploitation', 'Cryptography', 'Reverse Engineering']
    },
    {
      id: 11,
      title: 'Wireless Network Security Testing',
      category: 'Network Security',
      difficulty: 'Advanced',
      duration: '50 min',
      views: '11.2K',
      icon: Network,
      color: 'from-cyan-500 to-blue-500',
      excerpt: 'Learn wireless security testing with tools like Aircrack-ng and understand WPA/WPA2/WPA3.',
      popular: false,
      topics: ['WiFi Security', 'WPA Cracking', 'Evil Twin']
    },
    {
      id: 12,
      title: 'Security Certifications Guide 2025',
      category: 'Certifications',
      difficulty: 'All Levels',
      duration: '30 min',
      views: '24.6K',
      icon: BookOpen,
      color: 'from-green-600 to-teal-600',
      excerpt: 'Complete guide to cybersecurity certifications: CEH, OSCP, CISSP, and more.',
      popular: true,
      topics: ['CEH', 'OSCP', 'CISSP', 'Security+']
    },
  ];

  const resources = [
    {
      name: 'HackTheBox',
      description: 'Practice penetration testing in realistic environments',
      url: 'https://hackthebox.com',
      color: 'from-green-500 to-emerald-500',
      icon: '🎯'
    },
    {
      name: 'TryHackMe',
      description: 'Learn cybersecurity through gamified challenges',
      url: 'https://tryhackme.com',
      color: 'from-red-500 to-pink-500',
      icon: '🎮'
    },
    {
      name: 'PortSwigger Academy',
      description: 'Free web security training from Burp Suite creators',
      url: 'https://portswigger.net/web-security',
      color: 'from-orange-500 to-red-500',
      icon: '🎓'
    },
    {
      name: 'OWASP',
      description: 'Open Web Application Security Project resources',
      url: 'https://owasp.org',
      color: 'from-blue-500 to-indigo-500',
      icon: '🛡️'
    },
  ];

  const filteredTutorials = selectedCategory === 'All'
    ? tutorials
    : tutorials.filter(t => t.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Ethical Hacking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
            Learn cybersecurity, penetration testing, and ethical hacking through comprehensive tutorials and hands-on practice
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-sm font-semibold text-red-800 dark:text-red-300">
              For Educational & Authorized Testing Only
            </span>
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
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTutorials.map((tutorial, index) => {
            const Icon = tutorial.icon;
            return (
              <div
                key={tutorial.id}
                className="card p-6 hover:scale-[1.02] transition-transform cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tutorial.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {tutorial.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Category & Difficulty */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    {tutorial.category}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  {tutorial.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {tutorial.excerpt}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.topics.map((topic, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      {tutorial.views}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Resources */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Practice Platforms
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Sharpen your skills on these recommended platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 hover:scale-105 transition-transform group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {resource.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="card p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Legal & Ethical Disclaimer
              </h3>
              <div className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <p>
                  <strong>All content is for educational purposes only.</strong> Unauthorized access to computer systems is illegal and punishable by law.
                </p>
                <p>
                  Always obtain proper written authorization before testing any systems. Use these techniques only on:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your own systems and networks</li>
                  <li>Systems you have explicit written permission to test</li>
                  <li>Authorized penetration testing engagements</li>
                  <li>Legal bug bounty programs</li>
                  <li>Educational lab environments (HackTheBox, TryHackMe, etc.)</li>
                </ul>
                <p className="font-semibold mt-4">
                  DevHub Pro does not condone illegal activities and is not responsible for misuse of this information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 mt-12 text-center bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-900 dark:via-orange-900 dark:to-yellow-900 border-none">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Contribute?
          </h2>
          <p className="text-lg text-white/90 mb-6">
            Share your ethical hacking tutorials and help others learn cybersecurity
          </p>
          <a
            href="mailto:contact@devhubpro.com?subject=Ethical Hacking Tutorial Submission"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
          >
            <BookOpen className="w-5 h-5" />
            Submit Tutorial
          </a>
        </div>
      </div>
    </div>
  );
}
