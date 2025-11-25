import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        toolUsage: {
          orderBy: { usedAt: 'desc' },
          take: 50,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ usage: user.toolUsage });
  } catch (error) {
    console.error('Error fetching tool usage:', error);
    return NextResponse.json({ error: 'Failed to fetch tool usage' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { toolName, toolUrl } = await request.json();

    if (!toolName || !toolUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const usage = await prisma.toolUsage.create({
      data: {
        userId: user.id,
        toolName,
        toolUrl,
      },
    });

    return NextResponse.json({ usage }, { status: 201 });
  } catch (error) {
    console.error('Error tracking tool usage:', error);
    return NextResponse.json({ error: 'Failed to track tool usage' }, { status: 500 });
  }
}
