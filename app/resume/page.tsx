export const metadata = {
  title: 'Resume Builder | DevHub Pro',
  description: 'Create professional developer resumes with our templates',
};

export default function ResumePage() {
  const templates = [
    { name: 'Modern', preview: '🎨', popular: true },
    { name: 'Classic', preview: '📄', popular: false },
    { name: 'Minimal', preview: '✨', popular: true },
    { name: 'Creative', preview: '🚀', popular: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">Resume Builder</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">Create professional developer resumes in minutes</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer">
              {template.popular && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mb-3">
                  POPULAR
                </span>
              )}
              <div className="text-6xl text-center mb-4">{template.preview}</div>
              <h3 className="text-xl font-bold text-gray-900 text-center">{template.name}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 text-lg">
            Start Building →
          </button>
        </div>
      </div>
    </div>
  );
}
