export const metadata = {
  title: 'Contact Us | DevHub Pro',
  description: 'Get in touch with the DevHub Pro team',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="How can we help?"
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
