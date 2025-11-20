'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Wrench, Scale, AlertCircle, Sparkles, FileText, BookOpen, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Tools', href: '/tools', icon: Wrench },
    { name: 'Compare', href: '/compare', icon: Scale },
    { name: 'Errors', href: '/errors', icon: AlertCircle },
    { name: 'AI Prompts', href: '/prompts', icon: Sparkles },
    { name: 'Resume', href: '/resume', icon: FileText },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement search functionality here
      console.log('Searching for:', searchQuery);
      // For now, just redirect to tools page
      window.location.href = `/tools?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="glass shadow-soft sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 transition-all backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🚀</span>
            <span className="text-2xl font-bold gradient-text">
              DevHub Pro
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            })}

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:rotate-180 duration-300"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        {searchOpen && (
          <div className="hidden md:block pb-4 animate-slide-down">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tools, errors, prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-12 shadow-lg focus:shadow-glow"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center h-14">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🚀</span>
            <span className="text-lg font-bold gradient-text">
              DevHub Pro
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            {/* Search Button (Mobile) */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl text-gray-700 dark:text-gray-200 transition-all hover:scale-110"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl text-gray-700 dark:text-gray-200 transition-all hover:scale-110 hover:rotate-180 duration-300"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl text-gray-700 dark:text-gray-200 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        {searchOpen && (
          <div className="md:hidden pb-3 animate-slide-down">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-12 shadow-lg"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 glass backdrop-blur-xl animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}