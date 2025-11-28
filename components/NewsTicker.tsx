'use client';

import { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  url: string;
  score: number;
  time: number;
}

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || news.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 text-white py-2 overflow-hidden relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {/* News Icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-white/20 rounded-full p-1.5">
            <Newspaper className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm hidden sm:inline">TECH NEWS</span>
          <span className="text-white/60">|</span>
        </div>

        {/* Scrolling News */}
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-scroll-slow hover:pause-animation gap-8">
            {/* Duplicate news items for seamless loop */}
            {[...news, ...news].map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 whitespace-nowrap hover:text-yellow-300 transition-colors group flex-shrink-0"
              >
                <span className="text-yellow-300 group-hover:scale-110 transition-transform">🔥</span>
                <span className="font-medium text-sm">{item.title}</span>
                {item.score > 0 && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    ⬆ {item.score}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-slow {
          animation: scroll-slow 120s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
