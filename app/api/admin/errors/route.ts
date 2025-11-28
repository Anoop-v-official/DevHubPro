import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Get all error posts
export async function GET() {
  try {
    const errors = await prisma.errorPost.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        answers: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(errors);
  } catch (error) {
    console.error('Error fetching error posts:', error);
    return NextResponse.json({ error: 'Failed to fetch error posts' }, { status: 500 });
  }
}

// Create a new error post
export async function POST(request: NextRequest) {
  try {
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

    const {
      title,
      description,
      errorMessage,
      codeSnippet,
      language,
      framework,
      tags,
      attempted,
      environment
    } = await request.json();

    if (!title || !description || !errorMessage || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const errorPost = await prisma.errorPost.create({
      data: {
        userId: user.id,
        title,
        description,
        errorMessage,
        codeSnippet,
        language,
        framework,
        tags: JSON.stringify(tags || []),
        attempted: attempted || 'Not specified',
        environment,
        status: 'open'
      }
    });

    return NextResponse.json(errorPost, { status: 201 });
  } catch (error) {
    console.error('Error creating error post:', error);
    return NextResponse.json({ error: 'Failed to create error post' }, { status: 500 });
  }
}

// Delete an error post
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Error post ID required' }, { status: 400 });
    }

    await prisma.errorPost.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting error post:', error);
    return NextResponse.json({ error: 'Failed to delete error post' }, { status: 500 });
  }
}
