export const metadata = {
  title: 'About Us | DevHub Pro',
  description: 'Learn more about DevHub Pro and our mission',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">About DevHub Pro</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            DevHub Pro is dedicated to providing developers with the best free tools and resources. 
            We believe that powerful development tools should be accessible to everyone, regardless of budget.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>50+ free developer tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>In-depth tech comparisons</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>1000+ error solutions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>500+ AI prompts for developers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
