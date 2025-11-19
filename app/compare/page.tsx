import Link from 'next/link';

export const metadata = {
  title: 'Tech Comparisons | DevHub Pro',
  description: 'In-depth comparisons of programming languages, frameworks, and technologies',
};

export default function ComparePage() {
  const comparisons = [
    { name: 'React vs Vue.js', href: '/compare/react-vs-vue', popular: true },
    { name: 'Python vs JavaScript', href: '/compare/python-vs-javascript', popular: true },
    { name: 'MongoDB vs PostgreSQL', href: '/compare/mongodb-vs-postgresql', popular: false },
    { name: 'REST vs GraphQL', href: '/compare/rest-vs-graphql', popular: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">Tech Comparisons</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">Make informed decisions with our detailed comparisons</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comp, index) => (
            <Link
              key={index}
              href={comp.href}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              {comp.popular && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mb-3">
                  POPULAR
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                {comp.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
