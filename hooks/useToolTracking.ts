import { useEffect } from 'react';

export function useToolTracking(toolName: string, toolUrl: string) {
  useEffect(() => {
    // Track tool usage when the tool is visited
    const trackUsage = async () => {
      try {
        await fetch('/api/tool-usage/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toolName, toolUrl })
        });
      } catch (error) {
        console.error('Error tracking tool usage:', error);
      }
    };

    trackUsage();
  }, [toolName, toolUrl]);
}
