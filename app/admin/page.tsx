'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  BookOpen, FileCode, Trash2, Plus, Check, X,
  AlertCircle, Save, Eye, Loader, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'blog' | 'errors';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string;
  status: string;
  submittedAt: string;
  user: { name: string; email: string };
}

interface ErrorPost {
  id: string;
  title: string;
  description: string;
  errorMessage: string;
  language: string;
  status: string;
  createdAt: string;
  answers: any[];
  user: { name: string; email: string };
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('blog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [errorPosts, setErrorPosts] = useState<ErrorPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewError, setShowNewError] = useState(false);
  const [message, setMessage] = useState('');

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    category: 'JavaScript',
    tags: '',
    status: 'approved'
  });

  // Error form state
  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
    errorMessage: '',
    codeSnippet: '',
    language: 'JavaScript',
    framework: '',
    tags: '',
    attempted: '',
    environment: ''
  });

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/');
      return;
    }

    fetchData();
  }, [session, status, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogRes, errorRes] = await Promise.all([
        fetch('/api/admin/blog'),
        fetch('/api/admin/errors')
      ]);

      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setBlogPosts(blogData);
      }

      if (errorRes.ok) {
        const errorData = await errorRes.json();
        setErrorPosts(errorData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showMessage('❌ Failed to fetch data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCreateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogForm,
          tags: blogForm.tags.split(',').map(t => t.trim()).filter(t => t)
        })
      });

      if (response.ok) {
        showMessage('✅ Blog post created successfully!');
        setBlogForm({ title: '', content: '', category: 'JavaScript', tags: '', status: 'approved' });
        setShowNewPost(false);
        fetchData();
      } else {
        showMessage('❌ Failed to create post', 'error');
      }
    } catch (error) {
      showMessage('❌ Error: ' + error, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateError = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...errorForm,
          tags: errorForm.tags.split(',').map(t => t.trim()).filter(t => t)
        })
      });

      if (response.ok) {
        showMessage('✅ Error post created successfully!');
        setErrorForm({
          title: '',
          description: '',
          errorMessage: '',
          codeSnippet: '',
          language: 'JavaScript',
          framework: '',
          tags: '',
          attempted: '',
          environment: ''
        });
        setShowNewError(false);
        fetchData();
      } else {
        showMessage('❌ Failed to create error post', 'error');
      }
    } catch (error) {
      showMessage('❌ Error: ' + error, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showMessage('✅ Post deleted');
        fetchData();
      } else {
        showMessage('❌ Failed to delete', 'error');
      }
    } catch (error) {
      showMessage('❌ Error deleting', 'error');
    }
  };

  const handleDeleteError = async (id: string) => {
    if (!confirm('Are you sure you want to delete this error post?')) return;

    try {
      const response = await fetch(`/api/admin/errors?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showMessage('✅ Error post deleted');
        fetchData();
      } else {
        showMessage('❌ Failed to delete', 'error');
      }
    } catch (error) {
      showMessage('❌ Error deleting', 'error');
    }
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blog posts and error submissions
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.startsWith('✅')
              ? 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300'
          }`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'blog'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Blog Posts ({blogPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('errors')}
            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'errors'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            Error Posts ({errorPosts.length})
          </button>
        </div>

        {/* Blog Posts Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Blog Posts Management
              </h2>
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                {showNewPost ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showNewPost ? 'Cancel' : 'New Post'}
              </button>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <form onSubmit={handleCreateBlogPost} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Blog Post</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Title</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="Enter blog post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Content (Markdown)</label>
                    <textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      required
                      rows={10}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white font-mono text-sm dark:border-gray-600"
                      placeholder="Enter blog post content with markdown..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Category</label>
                      <select
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      >
                        <option>JavaScript</option>
                        <option>React</option>
                        <option>DevOps</option>
                        <option>Security</option>
                        <option>Career</option>
                        <option>Backend</option>
                        <option>Tutorial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Status</label>
                      <select
                        value={blogForm.status}
                        onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="javascript, tips, tutorial"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Creating...' : 'Create Blog Post'}
                </button>
              </form>
            )}

            {/* Blog Posts List */}
            <div className="space-y-4">
              {loading && blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Loader className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No blog posts yet. Create your first one!
                </div>
              ) : (
                blogPosts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">
                            {post.category}
                          </span>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            post.status === 'approved'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : post.status === 'pending'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}>
                            {post.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(post.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete post"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {post.content.substring(0, 200)}...
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      By {post.user.name || post.user.email}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Error Posts Tab */}
        {activeTab === 'errors' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Error Posts Management
              </h2>
              <button
                onClick={() => setShowNewError(!showNewError)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                {showNewError ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showNewError ? 'Cancel' : 'New Error'}
              </button>
            </div>

            {/* New Error Form */}
            {showNewError && (
              <form onSubmit={handleCreateError} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Error Post</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Title</label>
                    <input
                      type="text"
                      value={errorForm.title}
                      onChange={(e) => setErrorForm({ ...errorForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="Brief description of the error"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Description</label>
                    <textarea
                      value={errorForm.description}
                      onChange={(e) => setErrorForm({ ...errorForm, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="Detailed description of the issue..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Error Message</label>
                    <input
                      type="text"
                      value={errorForm.errorMessage}
                      onChange={(e) => setErrorForm({ ...errorForm, errorMessage: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white font-mono text-sm dark:border-gray-600"
                      placeholder="The actual error message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Code Snippet (optional)</label>
                    <textarea
                      value={errorForm.codeSnippet}
                      onChange={(e) => setErrorForm({ ...errorForm, codeSnippet: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white font-mono text-sm dark:border-gray-600"
                      placeholder="Paste the code that causes the error..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Language</label>
                      <select
                        value={errorForm.language}
                        onChange={(e) => setErrorForm({ ...errorForm, language: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      >
                        <option>JavaScript</option>
                        <option>Python</option>
                        <option>TypeScript</option>
                        <option>Java</option>
                        <option>C#</option>
                        <option>PHP</option>
                        <option>Go</option>
                        <option>Rust</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Framework (optional)</label>
                      <input
                        type="text"
                        value={errorForm.framework}
                        onChange={(e) => setErrorForm({ ...errorForm, framework: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        placeholder="React, Next.js, Django..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">What have you tried?</label>
                    <textarea
                      value={errorForm.attempted}
                      onChange={(e) => setErrorForm({ ...errorForm, attempted: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="Describe what you've tried to solve this..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={errorForm.tags}
                      onChange={(e) => setErrorForm({ ...errorForm, tags: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      placeholder="error, react, hooks"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Creating...' : 'Create Error Post'}
                </button>
              </form>
            )}

            {/* Error Posts List */}
            <div className="space-y-4">
              {loading && errorPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Loader className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                </div>
              ) : errorPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No error posts yet. Create your first one!
                </div>
              ) : (
                errorPosts.map((error) => (
                  <div key={error.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {error.title}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-full">
                            {error.language}
                          </span>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            error.status === 'answered'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : error.status === 'open'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {error.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {error.answers.length} answer{error.answers.length !== 1 ? 's' : ''}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(error.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteError(error.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete error post"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {error.description.substring(0, 150)}...
                    </p>
                    <div className="bg-gray-900 dark:bg-black p-3 rounded text-red-400 text-xs font-mono mb-3">
                      {error.errorMessage}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      By {error.user.name || error.user.email}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
