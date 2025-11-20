import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 dark:from-gray-950 dark:via-black dark:to-gray-950 text-gray-300 dark:text-gray-400 mt-20 border-t border-gray-800/50 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">🚀</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevHub Pro
              </span>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
              Your complete toolkit for modern development. Free tools, comparisons, and resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/errors" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Errors
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  AI Prompts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-glow"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Join our community and stay updated with the latest tools and features.
            </p>
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