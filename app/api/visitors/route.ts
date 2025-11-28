import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Track a new visitor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;

    // Get IP address and user agent
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Check if this IP visited in the last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentVisit = await prisma.pageVisit.findFirst({
      where: {
        ipAddress,
        visitedAt: {
          gte: yesterday
        }
      }
    });

    // Only count as new visitor if they haven't visited in 24 hours
    if (!recentVisit) {
      // Create new visit record
      await prisma.pageVisit.create({
        data: {
          ipAddress,
          userAgent,
          page: page || '/'
        }
      });

      // Update or create site stats
      const stats = await prisma.siteStats.findFirst();
      if (stats) {
        await prisma.siteStats.update({
          where: { id: stats.id },
          data: {
            totalVisitors: {
              increment: 1
            }
          }
        });
      } else {
        await prisma.siteStats.create({
          data: {
            totalVisitors: 1,
            totalToolsUsed: 0
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}

// Get visitor statistics
export async function GET() {
  try {
    // Get total unique visitors (count distinct IPs from last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const monthlyVisitors = await prisma.pageVisit.groupBy({
      by: ['ipAddress'],
      where: {
        visitedAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get total visitors from stats
    const stats = await prisma.siteStats.findFirst();
    const totalVisitors = stats?.totalVisitors || 0;

    // Get total tool usage
    const totalToolsUsed = await prisma.toolUsage.count();

    // Get total registered users
    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      totalVisitors,
      monthlyVisitors: monthlyVisitors.length,
      totalToolsUsed,
      totalUsers,
      userRating: 4.9 // This can be calculated from user feedback in the future
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json({
      totalVisitors: 0,
      monthlyVisitors: 0,
      totalToolsUsed: 0,
      totalUsers: 0,
      userRating: 4.9
    });
  }
}
