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
        preferences: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create default preferences if they don't exist
    if (!user.preferences) {
      const newPreferences = await prisma.userPreferences.create({
        data: {
          userId: user.id,
          theme: 'system',
          defaultCodeLang: 'javascript',
          emailNotifications: true,
          favoriteTools: JSON.stringify([]),
          recentSearches: JSON.stringify([]),
        },
      });
      return NextResponse.json({ preferences: newPreferences });
    }

    return NextResponse.json({ preferences: user.preferences });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        preferences: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updates = await request.json();

    let preferences;
    if (user.preferences) {
      // Update existing preferences
      preferences = await prisma.userPreferences.update({
        where: { userId: user.id },
        data: {
          ...updates,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new preferences
      preferences = await prisma.userPreferences.create({
        data: {
          userId: user.id,
          theme: updates.theme || 'system',
          defaultCodeLang: updates.defaultCodeLang || 'javascript',
          emailNotifications: updates.emailNotifications !== undefined ? updates.emailNotifications : true,
          favoriteTools: updates.favoriteTools || JSON.stringify([]),
          recentSearches: updates.recentSearches || JSON.stringify([]),
        },
      });
    }

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}
