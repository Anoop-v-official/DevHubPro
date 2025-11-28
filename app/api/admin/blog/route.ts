import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Get all blog posts (including pending)
export async function GET() {
  try {
    const posts = await prisma.contribution.findMany({
      where: {
        type: 'article'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// Create a new blog post
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { title, content, category, tags, status } = await request.json();

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create blog post
    const post = await prisma.contribution.create({
      data: {
        userId: user.id,
        type: 'article',
        title,
        content,
        category,
        tags: JSON.stringify(tags || []),
        status: status || 'approved',
        reviewedAt: new Date()
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

// Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    await prisma.contribution.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
