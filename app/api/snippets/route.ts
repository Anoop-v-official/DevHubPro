import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const publicOnly = searchParams.get('public') === 'true';

    const snippets = await prisma.codeSnippet.findMany({
      where: publicOnly ? { isPublic: true } : { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ snippets });
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json({ error: 'Failed to fetch snippets' }, { status: 500 });
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

    const { title, description, code, language, tags, isPublic } = await request.json();

    if (!title || !code || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const snippet = await prisma.codeSnippet.create({
      data: {
        userId: user.id,
        title,
        description: description || '',
        code,
        language,
        tags: JSON.stringify(tags || []),
        isPublic: isPublic || false,
      },
    });

    return NextResponse.json({ snippet }, { status: 201 });
  } catch (error) {
    console.error('Error creating snippet:', error);
    return NextResponse.json({ error: 'Failed to create snippet' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const snippetId = searchParams.get('id');

    if (!snippetId) {
      return NextResponse.json({ error: 'Missing snippet ID' }, { status: 400 });
    }

    // Verify ownership
    const snippet = await prisma.codeSnippet.findUnique({
      where: { id: snippetId },
    });

    if (!snippet || snippet.userId !== user.id) {
      return NextResponse.json({ error: 'Snippet not found or unauthorized' }, { status: 404 });
    }

    await prisma.codeSnippet.delete({
      where: { id: snippetId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting snippet:', error);
    return NextResponse.json({ error: 'Failed to delete snippet' }, { status: 500 });
  }
}
