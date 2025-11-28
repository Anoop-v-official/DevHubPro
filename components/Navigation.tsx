'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Home, Wrench, Code2, AlertCircle, Sparkles, FileText, BookOpen, Search, Sun, Moon, Book, Shield, LogIn, LogOut, User, Layers } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthContext';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { openAuthModal } = useAuth();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Primary navigation items
  const primaryMenuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Tools', href: '/tools', icon: Wrench, badge: '50+' },
    { name: 'Code Lab', href: '/playground', icon: Code2, badge: 'New' },
    { name: 'Solutions', href: '/errors', icon: AlertCircle },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  // Learn dropdown - organized by category
  const learnMenuItems = [
    { name: 'Cheatsheets', href: '/cheatsheets', icon: Book, description: 'Quick reference guides' },
    { name: 'AI Prompts', href: '/prompts', icon: Sparkles, description: 'Ready-to-use prompts' },
    { name: 'Ethical Hacking', href: '/ethical-hacking', icon: Shield, description: 'Security tutorials' },
    { name: 'Resume Builder', href: '/resume', icon: FileText, description: 'Create your resume' },
  ];

  // All menu items (for mobile)
  const allMenuItems = [...primaryMenuItems, ...learnMenuItems];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
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

          <div className="flex items-center gap-1">
            {/* Primary Menu Items */}
            {primaryMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 font-medium text-sm relative whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      item.badge === 'New'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}

            {/* Learn Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-all">
                <BookOpen className="w-4 h-4" />
                Learn ▾
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] py-2">
                {learnMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-4 h-4 mt-0.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
                        <div className="flex-1">
                          <div className={`font-semibold text-sm ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

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

            {/* Auth Button */}
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ) : session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium hidden lg:block">{session.user?.name || 'Account'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] py-2">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Settings
                  </Link>
                  <Link href="/snippets" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    My Snippets
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  console.log('Sign in button clicked!');
                  openAuthModal();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-glow"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden lg:block">Sign In</span>
              </button>
            )}
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

            {/* Auth Button (Mobile) */}
            {session ? (
              <Link href="/profile" className="p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl text-gray-700 dark:text-gray-200 transition-all">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={openAuthModal}
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:scale-110 transition-transform"
              >
                <LogIn className="w-5 h-5" />
              </button>
            )}

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
            {/* Main Navigation */}
            {primaryMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                      item.badge === 'New' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Learn Section */}
            <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-2 uppercase tracking-wider">
                Learn
              </div>
              {learnMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-start space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Actions */}
            {session && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
