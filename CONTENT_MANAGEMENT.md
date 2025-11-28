# Content Management Guide for DevHub Pro

## Quick Start: Adding Content

You have 4 ways to add blog posts, errors, and other content to your application.

---

## ✨ Option 1: Prisma Studio (Easiest - Visual GUI)

Prisma Studio is a visual database editor that comes with Prisma.

### Start Prisma Studio:
```bash
npx prisma studio
```

This will open `http://localhost:5555` in your browser with a visual interface where you can:
- Add blog posts (Contribution model)
- Add error posts (ErrorPost model)
- Add code snippets (CodeSnippet model)
- View and edit all data

### Adding a Blog Post via Prisma Studio:
1. Open Prisma Studio
2. Click on "Contribution" model
3. Click "Add record"
4. Fill in the fields:
   - **userId**: Use the ID from your User table (check User model first)
   - **type**: `article`
   - **title**: Your blog post title
   - **content**: Your blog post content (markdown supported)
   - **status**: `approved` (to make it visible)
   - **category**: JavaScript, React, DevOps, etc.
   - **tags**: `["javascript", "tips", "tutorial"]` (JSON format)
5. Click Save

---

## 💻 Option 2: Direct Database Access (SQLite)

Use the SQLite command line to add content directly.

### Adding a Blog Post:
```bash
sqlite3 prisma/dev.db

-- Get your user ID first
SELECT id, email FROM User;

-- Insert a blog post
INSERT INTO Contribution (
  id, userId, type, title, content, status, category, tags, submittedAt
) VALUES (
  'blog-' || hex(randomblob(16)),
  'YOUR_USER_ID_HERE',
  'article',
  'My Awesome Blog Post',
  'This is the content of my blog post with **markdown** support.',
  'approved',
  'JavaScript',
  '["javascript", "tips"]',
  datetime('now')
);

-- View your posts
SELECT * FROM Contribution WHERE type = 'article';
```

### Adding an Error Post:
```bash
INSERT INTO ErrorPost (
  id, userId, title, description, errorMessage,
  language, tags, attempted, status, createdAt, updatedAt
) VALUES (
  'error-' || hex(randomblob(16)),
  'YOUR_USER_ID_HERE',
  'TypeError: Cannot read property of undefined',
  'I am getting this error when trying to access nested object properties',
  'TypeError: Cannot read property "name" of undefined',
  'JavaScript',
  '["javascript", "error", "objects"]',
  'I tried using optional chaining but still getting the error',
  'open',
  datetime('now'),
  datetime('now')
);
```

---

## 🔧 Option 3: Create API Endpoints

Create API endpoints to add content programmatically.

### Create Admin API for Blog Posts

**File: `app/api/admin/blog/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

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

    const { title, content, category, tags } = await request.json();

    // Create blog post
    const post = await prisma.contribution.create({
      data: {
        userId: user.id,
        type: 'article',
        title,
        content,
        category,
        tags: JSON.stringify(tags),
        status: 'approved' // or 'pending' for moderation
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

// Get all blog posts
export async function GET() {
  try {
    const posts = await prisma.contribution.findMany({
      where: {
        type: 'article',
        status: 'approved'
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
```

### Usage:
```bash
# Add a blog post via API
curl -X POST http://localhost:3000/api/admin/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "content": "Post content here...",
    "category": "JavaScript",
    "tags": ["js", "tips"]
  }'

# Get all blog posts
curl http://localhost:3000/api/admin/blog
```

---

## 🎨 Option 4: Create Admin Panel (Best for Production)

Create a simple admin interface to manage content.

### Create Admin Page

**File: `app/admin/page.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('JavaScript');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          tags: tags.split(',').map(t => t.trim())
        })
      });

      if (response.ok) {
        setMessage('✅ Blog post created successfully!');
        setTitle('');
        setContent('');
        setTags('');
      } else {
        setMessage('❌ Failed to create post');
      }
    } catch (error) {
      setMessage('❌ Error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in to access admin panel</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          📝 Admin Panel
        </h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter blog post title"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Content (Markdown supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white font-mono"
              placeholder="Enter blog post content..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option>JavaScript</option>
              <option>React</option>
              <option>DevOps</option>
              <option>Security</option>
              <option>Career</option>
              <option>Backend</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="javascript, tips, tutorial"
            />
          </div>

          {message && (
            <div className="mb-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Creating...' : 'Create Blog Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

Access it at: `http://localhost:3000/admin`

---

## 📊 Database Schema Reference

### Contribution (Blog Posts)
- **userId** - User ID (required)
- **type** - `article`, `tutorial`, or `error-solution`
- **title** - Post title
- **content** - Post content (markdown)
- **status** - `pending`, `approved`, or `rejected`
- **category** - Category name
- **tags** - JSON array: `["tag1", "tag2"]`

### ErrorPost (Q&A)
- **userId** - User ID
- **title** - Error title
- **description** - Error description
- **errorMessage** - The actual error message
- **codeSnippet** - Code that causes error (optional)
- **language** - Programming language
- **framework** - Framework name (optional)
- **tags** - JSON array
- **attempted** - What user tried
- **status** - `open`, `answered`, or `closed`

### CodeSnippet
- **userId** - User ID
- **title** - Snippet title
- **description** - Description (optional)
- **code** - The code
- **language** - Programming language
- **tags** - JSON array
- **isPublic** - Boolean (true/false)

---

## 🚀 Recommended Workflow

### For Development:
1. Use **Prisma Studio** for quick testing and manual entries
2. Run: `npx prisma studio`

### For Production:
1. Create the **Admin Panel** (Option 4)
2. Add authentication checks
3. Use the API endpoints to manage content

---

## 📝 Quick Commands

```bash
# Start Prisma Studio
npx prisma studio

# Access SQLite database
sqlite3 prisma/dev.db

# View all blog posts
sqlite3 prisma/dev.db "SELECT * FROM Contribution WHERE type='article';"

# View all errors
sqlite3 prisma/dev.db "SELECT * FROM ErrorPost;"

# Count posts
sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Contribution WHERE type='article' AND status='approved';"
```

---

## 🔐 Important Notes

1. **User ID Required**: You need a valid user ID from the User table
2. **Tags Format**: Always use JSON format: `["tag1", "tag2"]`
3. **Status**: Set to `approved` to make content visible
4. **Security**: Add proper authentication to admin endpoints
5. **Validation**: Validate input data before saving

---

## Need Help?

- Check database with: `sqlite3 prisma/dev.db ".schema"`
- View User IDs: `sqlite3 prisma/dev.db "SELECT id, email FROM User;"`
- Reset database: `npx prisma migrate reset` (⚠️ deletes all data)
