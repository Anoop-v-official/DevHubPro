import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch best stories from Hacker News (updates more frequently than top stories)
    const bestStoriesRes = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json');
    const bestStories = await bestStoriesRes.json();

    // Get first 20 stories
    const storyIds = bestStories.slice(0, 20);

    // Fetch story details
    const stories = await Promise.all(
      storyIds.map(async (id: number) => {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyRes.json();
      })
    );

    // Filter and format stories
    const news = stories
      .filter(story => story && story.title && story.url)
      .map(story => ({
        id: story.id,
        title: story.title,
        url: story.url,
        score: story.score || 0,
        time: story.time
      }))
      .slice(0, 15); // Return top 15 for more variety

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return fallback news if API fails
    return NextResponse.json([
      { id: 1, title: 'Welcome to DevHub Pro - Your Developer Toolkit', url: '/', score: 0, time: Date.now() },
      { id: 2, title: '50+ Free Tools for Developers', url: '/tools', score: 0, time: Date.now() },
      { id: 3, title: 'Explore Our Code Playground', url: '/playground', score: 0, time: Date.now() },
    ]);
  }
}
