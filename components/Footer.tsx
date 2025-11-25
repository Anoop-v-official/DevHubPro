import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 dark:from-gray-950 dark:via-black dark:to-gray-950 text-gray-300 dark:text-gray-400 mt-20 border-t border-gray-800/50 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">🚀</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevHub Pro
              </span>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed mb-6">
              Your complete toolkit for modern development. 50+ free tools, tech comparisons, error solutions, and resources trusted by 100K+ developers worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/jwt-decoder" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  JWT Decoder
                </Link>
              </li>
              <li>
                <Link href="/tools/base64-converter" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Base64 Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/ssh-keygen" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  SSH Key Gen
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/cheatsheets" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Cheatsheets
                </Link>
              </li>
              <li>
                <Link href="/ethical-hacking" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Ethical Hacking
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Tech Comparisons
                </Link>
              </li>
              <li>
                <Link href="/errors" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Error Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@devhubpro.com" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Contact
                </a>
              </li>
              <li>
                <a href="mailto:contact@devhubpro.com?subject=Tool Request" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Request Tool
                </a>
              </li>
              <li>
                <Link href="/submit-error" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Submit Error
                </Link>
              </li>
              <li>
                <a href="mailto:contact@devhubpro.com?subject=Article Submission" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Submit Article
                </a>
              </li>
              <li>
                <a href="mailto:contact@devhubpro.com?subject=Newsletter Subscription" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Newsletter
                </a>
              </li>
              <li>
                <a href="mailto:contact@devhubpro.com?subject=Feedback" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 dark:border-gray-900 mt-8 pt-8 text-center text-sm text-gray-400 dark:text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span>&copy; {currentYear} DevHub Pro.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Built with passion for developers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}