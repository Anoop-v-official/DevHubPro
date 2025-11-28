import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Track tool usage for both authenticated and anonymous users
export async function POST(request: NextRequest) {
  try {
    const { toolName, toolUrl } = await request.json();

    if (!toolName || !toolUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await getServerSession();

    // If user is authenticated, track with userId
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        await prisma.toolUsage.create({
          data: {
            userId: user.id,
            toolName,
            toolUrl,
          },
        });
      }
    } else {
      // For anonymous users, use upsert to handle concurrent requests
      const anonymousUser = await prisma.user.upsert({
        where: { email: 'anonymous@devhubpro.com' },
        update: {},
        create: {
          email: 'anonymous@devhubpro.com',
          name: 'Anonymous User',
        }
      });

      await prisma.toolUsage.create({
        data: {
          userId: anonymousUser.id,
          toolName,
          toolUrl,
        },
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error tracking tool usage:', error);
    return NextResponse.json({ error: 'Failed to track tool usage' }, { status: 500 });
  }
}
