'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, TrendingUp, Star, X, Plus } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const { openAuthModal } = useAuth();

  const posts = [
    {
      id: 'javascript-tips',
      title: '10 JavaScript Tips Every Developer Should Know in 2024',
      date: '2024-01-15',
      category: 'JavaScript',
      readTime: '8 min',
      excerpt: 'Master essential JavaScript techniques including optional chaining, nullish coalescing, destructuring, and modern ES6+ features to write cleaner, more efficient code.',
      author: 'Sarah Johnson',
      views: '12.5K',
      popular: true,
      content: `Modern JavaScript has evolved significantly. Here are 10 essential tips:

1. **Optional Chaining (?.)** - Safely access nested object properties without checking each level
2. **Nullish Coalescing (??)** - Better default values than || operator
3. **Array Methods** - map(), filter(), reduce() for functional programming
4. **Async/Await** - Cleaner asynchronous code than promises
5. **Destructuring** - Extract values from objects and arrays elegantly
6. **Spread Operator** - Copy and merge objects/arrays efficiently
7. **Template Literals** - Better string interpolation and multi-line strings
8. **Arrow Functions** - Concise function syntax with lexical 'this'
9. **Modules** - import/export for better code organization
10. **let/const** - Block-scoped variables instead of var`
    },
    {
      id: 'nextjs-14',
      title: 'Getting Started with Next.js 14: Complete Guide',
      date: '2024-01-12',
      category: 'React',
      readTime: '10 min',
      excerpt: 'Learn the latest features in Next.js 14 including Server Components, App Router, Server Actions, and streaming. Build faster, more efficient React applications.',
      author: 'Michael Chen',
      views: '10.2K',
      popular: true,
      content: `Next.js 14 introduces game-changing features:

**Server Components**
- Reduce client-side JavaScript bundle size
- Fetch data directly on the server
- Better SEO and initial page load

**App Router**
- File-based routing with layouts
- Nested routes and loading states
- Error boundaries built-in

**Server Actions**
- Mutations without API routes
- Type-safe form submissions
- Progressive enhancement

**Streaming**
- Instant page loading with Suspense
- Load UI components as they're ready
- Better user experience

Get started today and build the next generation of React apps!`
    },
    {
      id: 'python-vs-javascript',
      title: 'Python vs JavaScript: Complete Career Comparison 2024',
      date: '2024-01-10',
      category: 'Career',
      readTime: '12 min',
      excerpt: 'Comprehensive comparison of Python and JavaScript ecosystems, job markets, salaries, learning curves, and use cases to help you choose the right path.',
      author: 'DevHub Team',
      views: '8.7K',
      popular: true,
      content: `Choosing between Python and JavaScript? Here's what you need to know:

**Python Strengths:**
- Data Science & ML (NumPy, Pandas, TensorFlow)
- Backend Development (Django, Flask, FastAPI)
- Automation & Scripting
- Scientific Computing
- Average Salary: $110k - $150k

**JavaScript Strengths:**
- Full-Stack Development (Node.js + React)
- Frontend Development (React, Vue, Angular)
- Real-time Applications
- Mobile Apps (React Native)
- Average Salary: $105k - $145k

**Learning Curve:**
Python is generally easier for beginners with cleaner syntax. JavaScript requires understanding of async programming and DOM manipulation.

**Job Market:**
Both have excellent opportunities. Python dominates in AI/ML, while JavaScript leads in web development.

**Verdict:** Learn both! Start with Python for easier syntax, then add JavaScript for full-stack capabilities.`
    },
    {
      id: 'docker-best-practices',
      title: 'Docker Best Practices for Production in 2024',
      date: '2024-01-08',
      category: 'DevOps',
      readTime: '15 min',
      excerpt: 'Essential Docker practices for production: multi-stage builds, security hardening, image optimization, health checks, and deployment strategies at scale.',
      author: 'Alex Kumar',
      views: '7.3K',
      popular: false,
      content: `Production Docker requires careful planning. Follow these best practices:

**1. Multi-Stage Builds**
- Separate build and runtime dependencies
- Reduce final image size by 80%+
- Faster deployments and lower costs

**2. Security**
- Use official base images
- Run as non-root user
- Scan for vulnerabilities
- Keep images updated

**3. Image Optimization**
- Use .dockerignore
- Minimize layers
- Cache dependencies properly
- Use Alpine for smaller size

**4. Health Checks**
- Implement liveness probes
- Add readiness checks
- Monitor container health

**5. Docker Compose**
- Define services clearly
- Use environment variables
- Network isolation
- Volume management

**6. Best Practices**
- One process per container
- Immutable infrastructure
- Log to stdout/stderr
- Use docker-compose for local dev

Deploy with confidence using these battle-tested practices!`
    },
    {
      id: 'api-security-owasp',
      title: 'API Security: Complete OWASP Top 10 Guide 2024',
      date: '2024-01-05',
      category: 'Security',
      readTime: '18 min',
      excerpt: 'Protect your APIs from the OWASP Top 10 vulnerabilities: broken authentication, injection attacks, security misconfigurations, and more with practical examples.',
      author: 'Jessica Martinez',
      views: '6.8K',
      popular: false,
      content: `API security is critical. Here's the OWASP API Security Top 10:

**1. Broken Object Level Authorization**
- Always verify user owns requested resource
- Implement proper authorization checks
- Use UUIDs instead of sequential IDs

**2. Broken Authentication**
- Implement JWT properly
- Use secure session management
- Enable MFA where possible
- Rate limit authentication endpoints

**3. Broken Object Property Level Authorization**
- Validate all input properties
- Use allow-lists, not deny-lists
- Implement proper field-level access control

**4. Unrestricted Resource Consumption**
- Implement rate limiting
- Set request size limits
- Timeout long-running requests
- Use pagination for large datasets

**5. Broken Function Level Authorization**
- Check permissions for every endpoint
- Separate admin routes
- Validate user roles

**6. Unrestricted Access to Sensitive Business Flows**
- Add CAPTCHA for sensitive operations
- Implement step-up authentication
- Monitor for suspicious patterns

**7. Server Side Request Forgery (SSRF)**
- Validate and sanitize URLs
- Use allow-lists for external requests
- Disable unnecessary protocols

**8. Security Misconfiguration**
- Remove default credentials
- Disable debug mode in production
- Keep dependencies updated
- Use security headers

**9. Improper Inventory Management**
- Document all API endpoints
- Version your APIs
- Remove deprecated endpoints
- Monitor API usage

**10. Unsafe Consumption of APIs**
- Validate third-party API responses
- Encrypt sensitive data in transit
- Implement timeouts
- Handle errors gracefully

Implement these controls to secure your APIs!`
    },
    {
      id: 'microservices-nodejs',
      title: 'Building Scalable Microservices with Node.js',
      date: '2024-01-03',
      category: 'Backend',
      readTime: '20 min',
      excerpt: 'Comprehensive guide to architecting and building production-ready microservices with Node.js, Docker, message queues, and service discovery.',
      author: 'Robert Williams',
      views: '5.9K',
      popular: false,
      content: `Build enterprise-grade microservices with Node.js:

**Architecture Principles:**
- Single Responsibility: One service, one job
- Loose Coupling: Independent services
- High Cohesion: Related functionality together
- API Gateway: Central entry point

**Key Components:**

1. **Service Structure**
   - Express.js or Fastify for HTTP
   - Separate routes, controllers, services
   - Validation layer (Joi, Yup)
   - Error handling middleware

2. **Database Per Service**
   - Each service owns its data
   - No shared databases
   - Use PostgreSQL, MongoDB, Redis

3. **Inter-Service Communication**
   - REST APIs for synchronous
   - Message queues (RabbitMQ, Kafka) for async
   - gRPC for high-performance
   - Event-driven architecture

4. **Service Discovery**
   - Consul or Eureka
   - Health check endpoints
   - Load balancing

5. **Monitoring & Logging**
   - Centralized logging (ELK Stack)
   - Distributed tracing (Jaeger)
   - Metrics (Prometheus, Grafana)
   - APM tools (New Relic, Datadog)

6. **Security**
   - JWT authentication
   - API Gateway for auth
   - Service mesh (Istio)
   - Encrypt inter-service communication

**Best Practices:**
- Circuit breakers for resilience
- Retry mechanisms with exponential backoff
- Graceful degradation
- Feature flags
- Automated testing (unit, integration, e2e)

**Deployment:**
- Docker containers
- Kubernetes orchestration
- CI/CD pipelines
- Blue-green deployments

Start small, scale as needed!`
    },
    {
      id: 'react-hooks-advanced',
      title: 'Advanced React Hooks Patterns You Should Know',
      date: '2023-12-28',
      category: 'React',
      readTime: '14 min',
      excerpt: 'Master advanced React Hooks patterns: useCallback optimization, custom hooks, useReducer for complex state, and composition patterns for reusable logic.',
      author: 'Emily Davis',
      views: '9.1K',
      popular: true,
      content: `Level up your React skills with these advanced hooks patterns:

**1. Custom Hooks for Reusability**
- Extract common logic
- Share stateful logic across components
- Compose hooks together

**2. useCallback & useMemo**
- Prevent unnecessary re-renders
- Optimize expensive computations
- Memoize callback functions

**3. useReducer for Complex State**
- Better than useState for complex logic
- Predictable state updates
- Easy to test

**4. useContext for Global State**
- Avoid prop drilling
- Share data across components
- Combine with useReducer

**5. useRef Beyond DOM**
- Store mutable values
- Keep previous values
- Avoid re-renders

**6. useLayoutEffect**
- Synchronous DOM updates
- Measure DOM elements
- Prevent visual glitches

**Common Patterns:**
- Data fetching hooks
- Form handling hooks
- Window size hooks
- Local storage hooks
- Debounce/throttle hooks

Write cleaner, more maintainable React code!`
    },
    {
      id: 'typescript-tips',
      title: 'TypeScript Best Practices for Large Applications',
      date: '2023-12-25',
      category: 'JavaScript',
      readTime: '16 min',
      excerpt: 'Essential TypeScript patterns for enterprise applications: strict mode, utility types, generics, type guards, and project organization.',
      author: 'David Park',
      views: '7.5K',
      popular: false,
      content: `Build better TypeScript applications:

**Strict Mode Configuration:**
- Enable strict mode in tsconfig.json
- noImplicitAny for type safety
- strictNullChecks for null safety
- strictFunctionTypes for better type checking

**Utility Types:**
- Partial<T> for optional properties
- Required<T> for required properties
- Pick<T, K> to select properties
- Omit<T, K> to exclude properties
- Record<K, T> for object types

**Generics:**
- Create reusable components
- Type-safe functions
- Constrain types with extends

**Type Guards:**
- typeof for primitives
- instanceof for classes
- Custom type predicates
- Discriminated unions

**Advanced Patterns:**
- Mapped types for transformations
- Conditional types for logic
- Template literal types
- Decorators for metadata

**Project Organization:**
- Separate types folder
- Shared types package
- Avoid type assertions
- Use unknown over any

**Best Practices:**
- Write interfaces for objects
- Use type for unions/intersections
- Prefer const assertions
- Enable incremental compilation
- Use path mapping

Build type-safe, maintainable applications!`
    },
  ];

  const categories = ['All', 'JavaScript', 'React', 'DevOps', 'Security', 'Career', 'Backend'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Tips, tutorials, and insights for modern developers
          </p>
          <button
            onClick={openAuthModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-glow"
          >
            <Plus className="w-5 h-5" />
            Submit Article
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredPosts.map((post, index) => (
            <article
              key={index}
              onClick={() => setSelectedPost(post)}
              className="card p-8 hover:scale-[1.02] transition-transform cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    post.category === 'JavaScript' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                    post.category === 'React' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                    post.category === 'DevOps' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                    post.category === 'Security' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                    post.category === 'Career' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {post.category}
                  </span>
                  {post.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  {post.views}
                </div>
              </div>

              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="card p-8 mt-12 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 border-none">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Contribute?
          </h2>
          <p className="text-lg text-blue-100 dark:text-blue-200 mb-6">
            Share your knowledge with the developer community
          </p>
          <button
            onClick={openAuthModal}
            className="btn bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Submit Article
          </button>
        </div>

        {/* Blog Post Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-white" />
                  <span className={`px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white`}>
                    {selectedPost.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {selectedPost.views} views
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {selectedPost.excerpt}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    This is a comprehensive guide covering essential techniques and best practices.
                    In this article, we'll explore various concepts and provide practical examples
                    that you can apply to your projects immediately.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>✓ Learn modern best practices and patterns</li>
                    <li>✓ Understand core concepts with practical examples</li>
                    <li>✓ Implement solutions in real-world scenarios</li>
                    <li>✓ Avoid common pitfalls and mistakes</li>
                  </ul>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 my-8">
                    <p className="text-blue-900 dark:text-blue-300 font-semibold mb-2">💡 Pro Tip</p>
                    <p className="text-blue-800 dark:text-blue-400">
                      Always test your code in different environments and scenarios to ensure reliability and performance.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    Example Code
                  </h2>
                  <pre className="bg-gray-900 dark:bg-black p-6 rounded-lg overflow-x-auto mb-6">
                    <code className="text-green-400 text-sm">
{`// Example implementation
function exampleFunction() {
  console.log("Hello, Developer!");
  return true;
}

// Usage
exampleFunction();`}
                    </code>
                  </pre>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    This example demonstrates a simple implementation. You can adapt this pattern
                    to suit your specific needs and requirements.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    Conclusion
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    By following these guidelines and best practices, you'll be able to write
                    more efficient and maintainable code. Keep practicing and exploring new
                    techniques to continuously improve your skills.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Written by {selectedPost.author} • Published on {selectedPost.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
