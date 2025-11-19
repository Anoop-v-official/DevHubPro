export const metadata = {
  title: 'Developer Blog | DevHub Pro',
  description: 'Tips, tutorials, and insights for developers',
};

export default function BlogPage() {
  const posts = [
    { title: '10 JavaScript Tips Every Developer Should Know', date: '2024-01-15', category: 'JavaScript', readTime: '5 min' },
    { title: 'Getting Started with Next.js 14', date: '2024-01-12', category: 'React', readTime: '8 min' },
    { title: 'Python vs JavaScript: Which to Learn First?', date: '2024-01-10', category: 'Career', readTime: '6 min' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">Developer Blog</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">Tips, tutorials, and insights</p>

        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm text-gray-500">• {post.readTime} read</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">{post.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
