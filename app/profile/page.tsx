'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Mail, Calendar, Award, BookOpen, AlertCircle, ThumbsUp, Star, Bookmark, Trash2, ExternalLink, History } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BookmarkItem {
  id: string;
  type: string;
  itemId: string;
  itemTitle: string;
  itemUrl: string;
  createdAt: string;
}

interface ToolUsageItem {
  id: string;
  toolName: string;
  toolUrl: string;
  usedAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true);
  const [toolUsage, setToolUsage] = useState<ToolUsageItem[]>([]);
  const [isLoadingUsage, setIsLoadingUsage] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchBookmarks();
      fetchToolUsage();
    }
  }, [status, router]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setIsLoadingBookmarks(false);
    }
  };

  const fetchToolUsage = async () => {
    try {
      const response = await fetch('/api/tool-usage');
      if (response.ok) {
        const data = await response.json();
        setToolUsage(data.usage);
      }
    } catch (error) {
      console.error('Error fetching tool usage:', error);
    } finally {
      setIsLoadingUsage(false);
    }
  };

  const deleteBookmark = async (type: string, itemId: string) => {
    try {
      const response = await fetch(`/api/bookmarks?type=${type}&itemId=${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookmarks(bookmarks.filter(b => !(b.type === type && b.itemId === itemId)));
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const stats = [
    { icon: BookOpen, label: 'Articles', value: '0', color: 'from-blue-500 to-cyan-500' },
    { icon: AlertCircle, label: 'Solutions', value: '0', color: 'from-purple-500 to-pink-500' },
    { icon: ThumbsUp, label: 'Upvotes', value: '0', color: 'from-green-500 to-teal-500' },
    { icon: Award, label: 'Reputation', value: '0', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="card p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="relative group">
              {session.user?.image ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-600 ring-offset-4 ring-offset-white dark:ring-offset-gray-900 group-hover:scale-105 transition-transform">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center ring-4 ring-blue-600 ring-offset-4 ring-offset-white dark:ring-offset-gray-900 group-hover:scale-105 transition-transform">
                  <User className="w-16 h-16 text-white" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {session.user?.name || 'Anonymous User'}
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                {session.user?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{session.user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Member
                </span>
                <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">
                  Level 1
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button className="btn btn-outline">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card p-6 text-center group hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 group-hover:shadow-glow transition-all`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                My Articles
              </h2>
              <button className="btn btn-ghost text-sm">View All</button>
            </div>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't written any articles yet
              </p>
              <button className="btn btn-primary">
                Write Your First Article
              </button>
            </div>
          </div>

          {/* Recent Solutions */}
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-purple-600" />
                My Solutions
              </h2>
              <button className="btn btn-ghost text-sm">View All</button>
            </div>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't submitted any solutions yet
              </p>
              <button className="btn btn-primary">
                Submit Your First Solution
              </button>
            </div>
          </div>
        </div>

        {/* Saved Bookmarks Section */}
        <div className="card p-6 mt-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-green-600" />
              Saved Items ({bookmarks.length})
            </h2>
            <Link href="/tools" className="btn btn-ghost text-sm">
              Browse Tools
            </Link>
          </div>

          {isLoadingBookmarks ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading bookmarks...</p>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't saved any items yet
              </p>
              <Link href="/tools" className="btn btn-primary">
                Start Exploring
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded mb-2 capitalize">
                        {bookmark.type}
                      </span>
                      <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {bookmark.itemTitle}
                      </h4>
                    </div>
                    <button
                      onClick={() => deleteBookmark(bookmark.type, bookmark.itemId)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    Saved {new Date(bookmark.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href={bookmark.itemUrl}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    View
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tool Usage History Section */}
        <div className="card p-6 mt-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <History className="w-6 h-6 text-purple-600" />
              Tool Usage History ({toolUsage.length})
            </h2>
          </div>

          {isLoadingUsage ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading history...</p>
            </div>
          ) : toolUsage.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No tool usage history yet
              </p>
              <Link href="/tools" className="btn btn-primary">
                Start Using Tools
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {toolUsage.slice(0, 10).map((usage) => (
                <Link
                  key={usage.id}
                  href={usage.toolUrl}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <History className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {usage.toolName}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(usage.usedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </Link>
              ))}
              {toolUsage.length > 10 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                  Showing 10 of {toolUsage.length} recent tools
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
