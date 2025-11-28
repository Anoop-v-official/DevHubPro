import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get tool usage statistics
export async function GET() {
  try {
    // Get usage count for each tool
    const toolUsageStats = await prisma.toolUsage.groupBy({
      by: ['toolName'],
      _count: {
        toolName: true
      }
    });

    // Convert to a more usable format
    const stats: Record<string, number> = {};
    toolUsageStats.forEach(stat => {
      stats[stat.toolName] = stat._count.toolName;
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching tool usage stats:', error);
    return NextResponse.json({}, { status: 200 }); // Return empty object on error
  }
}
