'use client';

import { useState } from 'react';
import { FileText, Download, Sparkles, CheckCircle } from 'lucide-react';

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState('templates');

  const templates = [
    {
      name: 'Software Engineer',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      description: 'Perfect for developers',
      skills: ['JavaScript', 'React', 'Node.js'],
      popular: true
    },
    {
      name: 'DevOps Engineer',
      icon: '⚙️',
      color: 'from-purple-500 to-pink-500',
      description: 'Infrastructure roles',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      popular: true
    },
    {
      name: 'Security Engineer',
      icon: '🔒',
      color: 'from-red-500 to-orange-500',
      description: 'Cybersecurity positions',
      skills: ['Penetration Testing', 'SIEM'],
      popular: false
    },
    {
      name: 'Full Stack',
      icon: '🚀',
      color: 'from-green-500 to-teal-500',
      description: 'Full-stack development',
      skills: ['React', 'Node.js', 'MongoDB'],
      popular: true
    },
  ];

  const tips = [
    { title: 'Keep it Concise', description: '1-2 pages maximum', icon: '📝' },
    { title: 'Quantify Results', description: 'Use numbers and metrics', icon: '📈' },
    { title: 'Tailor Content', description: 'Match job description', icon: '🎯' },
    { title: 'Action Verbs', description: 'Start with strong verbs', icon: '⚡' },
    { title: 'Technical Skills', description: 'List tools and languages', icon: '🛠️' },
    { title: 'Projects', description: 'Show your work', icon: '🔨' },
  ];

  const actionVerbs = [
    'Architected', 'Built', 'Designed', 'Developed', 'Implemented', 'Optimized',
    'Led', 'Managed', 'Deployed', 'Automated', 'Integrated', 'Scaled'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Resume Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Professional templates and writing guides
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {['templates', 'tips'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'templates' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <div key={index} className="card p-6 hover:scale-105 transition-transform">
                {template.popular && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full mb-3">
                    POPULAR
                  </span>
                )}
                <div className={`w-16 h-16 bg-gradient-to-br ${template.color} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                  {template.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.skills.map((skill, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{skill}</span>
                  ))}
                </div>
                <button className="btn btn-primary w-full"><Download className="w-4 h-4" />Download</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="card p-6">
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                </div>
              ))}
            </div>

            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Power Action Verbs
              </h2>
              <div className="flex flex-wrap gap-2">
                {actionVerbs.map((verb, i) => (
                  <span key={i} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium">
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <h3 className="text-lg font-bold text-green-900 dark:text-green-300 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />Good Examples
                </h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-400">
                  <li>• Reduced API latency by 40% through optimization</li>
                  <li>• Led 5 engineers in building React dashboard</li>
                  <li>• Automated CI/CD, cutting deployment time 75%</li>
                </ul>
              </div>

              <div className="card p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-4">❌ Avoid These</h3>
                <ul className="space-y-2 text-sm text-red-800 dark:text-red-400">
                  <li>• Worked on various projects</li>
                  <li>• Responsible for writing code</li>
                  <li>• Helped with deployment tasks</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
