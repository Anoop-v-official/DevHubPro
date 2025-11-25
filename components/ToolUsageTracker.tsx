'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface ToolUsageTrackerProps {
  toolName: string;
  toolUrl: string;
}

export default function ToolUsageTracker({ toolName, toolUrl }: ToolUsageTrackerProps) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      trackUsage();
    }
  }, [session]);

  const trackUsage = async () => {
    try {
      await fetch('/api/tool-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolName, toolUrl }),
      });
    } catch (error) {
      console.error('Error tracking tool usage:', error);
    }
  };

  return null; // This component doesn't render anything
}
