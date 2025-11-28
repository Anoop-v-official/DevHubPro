'use client';

import { useState } from 'react';
import { FileText, Download, Plus, Trash2, Eye } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [summary, setSummary] = useState('');

  // Skills
  const [skills, setSkills] = useState<string>('');

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: '1', company: '', position: '', duration: '', description: '' }
  ]);

  // Education
  const [education, setEducation] = useState<Education[]>([
    { id: '1', institution: '', degree: '', year: '' }
  ]);

  // Projects
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: '', description: '', technologies: '' }
  ]);

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now().toString(), company: '', position: '', duration: '', description: '' }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addEducation = () => {
    setEducation([...education, { id: Date.now().toString(), institution: '', degree: '', year: '' }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), name: '', description: '', technologies: '' }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
  };

  const downloadResume = () => {
    const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fullName} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; padding: 40px; max-width: 850px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
    .header h1 { font-size: 32px; color: #1e40af; margin-bottom: 10px; }
    .contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; font-size: 14px; }
    .contact span { color: #666; }
    .section { margin: 25px 0; }
    .section-title { font-size: 20px; color: #1e40af; border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
    .summary { font-style: italic; color: #555; margin-bottom: 20px; }
    .experience-item, .education-item, .project-item { margin-bottom: 20px; }
    .experience-item h3, .project-item h3 { color: #1e40af; font-size: 16px; }
    .experience-item .company, .education-item .institution { font-weight: bold; color: #333; }
    .experience-item .duration, .education-item .year { color: #666; font-size: 14px; }
    .experience-item p, .project-item p { margin-top: 8px; color: #555; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill { background: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 4px; font-size: 14px; }
    .project-tech { color: #7c3aed; font-size: 14px; margin-top: 5px; }
    @media print {
      body { padding: 20px; }
      .header { page-break-after: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${fullName}</h1>
    <div class="contact">
      ${email ? `<span>📧 ${email}</span>` : ''}
      ${phone ? `<span>📱 ${phone}</span>` : ''}
      ${location ? `<span>📍 ${location}</span>` : ''}
      ${linkedin ? `<span>🔗 ${linkedin}</span>` : ''}
      ${github ? `<span>💻 ${github}</span>` : ''}
      ${portfolio ? `<span>🌐 ${portfolio}</span>` : ''}
    </div>
  </div>

  ${summary ? `
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary">${summary}</p>
  </div>
  ` : ''}

  ${skills ? `
  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills">
      ${skills.split(',').map(skill => `<span class="skill">${skill.trim()}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${experiences.some(exp => exp.company) ? `
  <div class="section">
    <div class="section-title">Professional Experience</div>
    ${experiences.filter(exp => exp.company).map(exp => `
      <div class="experience-item">
        <h3>${exp.position}</h3>
        <div class="company">${exp.company}</div>
        <div class="duration">${exp.duration}</div>
        <p>${exp.description}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${projects.some(proj => proj.name) ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${projects.filter(proj => proj.name).map(proj => `
      <div class="project-item">
        <h3>${proj.name}</h3>
        <p>${proj.description}</p>
        ${proj.technologies ? `<div class="project-tech">Technologies: ${proj.technologies}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${education.some(edu => edu.institution) ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${education.filter(edu => edu.institution).map(edu => `
      <div class="education-item">
        <div class="institution">${edu.institution}</div>
        <div>${edu.degree}</div>
        <div class="year">${edu.year}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  <div style="margin-top: 40px; text-align: center; color: #999; font-size: 12px;">
    <p>Generated with DevHub Pro Resume Builder</p>
  </div>
</body>
</html>`;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            Create a professional resume in minutes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'edit'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
            }`}
          >
            Edit Resume
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
            }`}
          >
            <Eye className="w-5 h-5" />
            Preview
          </button>
        </div>

        {activeTab === 'edit' ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Personal Information */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input w-full"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input w-full"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input w-full"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="input w-full"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="input w-full"
                    placeholder="github.com/johndoe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Portfolio Website</label>
                  <input
                    type="text"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="input w-full"
                    placeholder="johndoe.com"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Professional Summary</h2>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="input w-full h-32"
                placeholder="Write a brief professional summary highlighting your key skills and experience..."
              />
            </div>

            {/* Skills */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Skills</h2>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input w-full h-24"
                placeholder="React, Node.js, Python, Docker, AWS, PostgreSQL (comma-separated)"
              />
            </div>

            {/* Experience */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
                <button onClick={addExperience} className="btn btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Experience {index + 1}</h3>
                      {experiences.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="input w-full"
                        placeholder="Company Name"
                      />
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        className="input w-full"
                        placeholder="Job Title"
                      />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                        className="input w-full md:col-span-2"
                        placeholder="Jan 2020 - Present"
                      />
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      className="input w-full mt-4 h-24"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
                <button onClick={addProject} className="btn btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              <div className="space-y-6">
                {projects.map((proj, index) => (
                  <div key={proj.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Project {index + 1}</h3>
                      {projects.length > 1 && (
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="input w-full mb-4"
                      placeholder="Project Name"
                    />
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      className="input w-full mb-4 h-24"
                      placeholder="Project description..."
                    />
                    <input
                      type="text"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                      className="input w-full"
                      placeholder="Technologies used (e.g., React, Node.js, MongoDB)"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                <button onClick={addEducation} className="btn btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Education {index + 1}</h3>
                      {education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="input w-full"
                        placeholder="University Name"
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="input w-full"
                        placeholder="Degree (e.g., BS Computer Science)"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        className="input w-full"
                        placeholder="Graduation Year (e.g., 2020)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
              <button
                onClick={downloadResume}
                className="btn btn-primary text-lg flex items-center gap-3 px-8 py-4"
              >
                <Download className="w-5 h-5" />
                Download Resume (HTML)
              </button>
            </div>
          </div>
        ) : (
          /* Preview */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
              <div className="text-center border-b-4 border-blue-600 pb-6 mb-8">
                <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-3">{fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {email && <span>📧 {email}</span>}
                  {phone && <span>📱 {phone}</span>}
                  {location && <span>📍 {location}</span>}
                  {linkedin && <span>🔗 {linkedin}</span>}
                  {github && <span>💻 {github}</span>}
                  {portfolio && <span>🌐 {portfolio}</span>}
                </div>
              </div>

              {summary && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 border-b-2 border-gray-300 dark:border-gray-700 pb-2 mb-4">PROFESSIONAL SUMMARY</h2>
                  <p className="text-gray-700 dark:text-gray-300 italic">{summary}</p>
                </div>
              )}

              {skills && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 border-b-2 border-gray-300 dark:border-gray-700 pb-2 mb-4">TECHNICAL SKILLS</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.split(',').map((skill, i) => (
                      <span key={i} className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 px-3 py-1 rounded text-sm">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {experiences.some(exp => exp.company) && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 border-b-2 border-gray-300 dark:border-gray-700 pb-2 mb-4">PROFESSIONAL EXPERIENCE</h2>
                  {experiences.filter(exp => exp.company).map((exp, i) => (
                    <div key={i} className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                      <div className="font-semibold text-gray-700 dark:text-gray-300">{exp.company}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{exp.duration}</div>
                      <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {projects.some(proj => proj.name) && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 border-b-2 border-gray-300 dark:border-gray-700 pb-2 mb-4">PROJECTS</h2>
                  {projects.filter(proj => proj.name).map((proj, i) => (
                    <div key={i} className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{proj.name}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">{proj.description}</p>
                      {proj.technologies && (
                        <div className="text-sm text-purple-600 dark:text-purple-400">Technologies: {proj.technologies}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {education.some(edu => edu.institution) && (
                <div>
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 border-b-2 border-gray-300 dark:border-gray-700 pb-2 mb-4">EDUCATION</h2>
                  {education.filter(edu => edu.institution).map((edu, i) => (
                    <div key={i} className="mb-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{edu.institution}</div>
                      <div className="text-gray-700 dark:text-gray-300">{edu.degree}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{edu.year}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={downloadResume}
                className="btn btn-primary text-lg flex items-center gap-3 px-8 py-4"
              >
                <Download className="w-5 h-5" />
                Download Resume (HTML)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
