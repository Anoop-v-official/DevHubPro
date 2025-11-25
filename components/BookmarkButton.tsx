'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface BookmarkButtonProps {
  type: 'tool' | 'blog' | 'cheatsheet' | 'error';
  itemId: string;
  itemTitle: string;
  itemUrl: string;
  className?: string;
}

export default function BookmarkButton({
  type,
  itemId,
  itemTitle,
  itemUrl,
  className = ''
}: BookmarkButtonProps) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      checkBookmarkStatus();
    }
  }, [session]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const data = await response.json();
        const exists = data.bookmarks.some(
          (b: any) => b.type === type && b.itemId === itemId
        );
        setIsBookmarked(exists);
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    if (!session?.user) {
      alert('Please sign in to bookmark items');
      return;
    }

    setIsLoading(true);

    try {
      if (isBookmarked) {
        const response = await fetch(
          `/api/bookmarks?type=${type}&itemId=${itemId}`,
          { method: 'DELETE' }
        );

        if (response.ok) {
          setIsBookmarked(false);
        }
      } else {
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, itemId, itemTitle, itemUrl }),
        });

        if (response.ok) {
          setIsBookmarked(true);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
        isBookmarked
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400'
          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">
        {isBookmarked ? 'Saved' : 'Save'}
      </span>
    </button>
  );
}
