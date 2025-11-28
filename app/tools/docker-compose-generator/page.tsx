'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function DockerComposeGeneratorPage() {
  useToolTracking('Docker Compose Generator', '/tools/docker-compose-generator');

  const [services, setServices] = useState([
    { name: 'web', image: 'node:18-alpine', port: '3000:3000', env: 'NODE_ENV=production' },
    { name: 'database', image: 'postgres:15-alpine', port: '5432:5432', env: 'POSTGRES_PASSWORD=password' },
  ]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceImage, setNewServiceImage] = useState('');
  const [newServicePort, setNewServicePort] = useState('');
  const [newServiceEnv, setNewServiceEnv] = useState('');
  const [version, setVersion] = useState('3.8');
  const [copied, setCopied] = useState(false);

  const generateDockerCompose = () => {
    const serviceConfigs = services
      .filter((s) => s.name && s.image)
      .map((s) => {
        let config = `  ${s.name}:\n    image: ${s.image}`;
        if (s.port) config += `\n    ports:\n      - "${s.port}"`;
        if (s.env) {
          const envVars = s.env.split(',').map((e) => e.trim());
          config += `\n    environment:`;
          envVars.forEach((env) => {
            config += `\n      - ${env}`;
          });
        }
        return config;
      })
      .join('\n');

    return `version: '${version}'

services:
${serviceConfigs}

networks:
  default:
    name: app-network
`;
  };

  const generateDockerfile = () => {
    return `# Multi-stage build example
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
`;
  };

  const dockerCompose = generateDockerCompose();
  const dockerfile = generateDockerfile();

  const addService = () => {
    if (newServiceName.trim() && newServiceImage.trim()) {
      setServices([
        ...services,
        {
          name: newServiceName,
          image: newServiceImage,
          port: newServicePort,
          env: newServiceEnv,
        },
      ]);
      setNewServiceName('');
      setNewServiceImage('');
      setNewServicePort('');
      setNewServiceEnv('');
    }
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: string, value: string) => {
    const updated = [...services];
    (updated[index] as any)[field] = value;
    setServices(updated);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      name: 'MERN Stack',
      version: '3.8',
      services: [
        { name: 'frontend', image: 'node:18-alpine', port: '3000:3000', env: 'NODE_ENV=development' },
        { name: 'backend', image: 'node:18-alpine', port: '5000:5000', env: 'NODE_ENV=development' },
        { name: 'mongodb', image: 'mongo:6.0', port: '27017:27017', env: 'MONGO_INITDB_ROOT_USERNAME=root' },
      ],
    },
    {
      name: 'Full Stack',
      version: '3.8',
      services: [
        { name: 'web', image: 'node:18-alpine', port: '3000:3000', env: 'NODE_ENV=production' },
        { name: 'api', image: 'python:3.11-slim', port: '8000:8000', env: 'PYTHONUNBUFFERED=1' },
        { name: 'postgres', image: 'postgres:15-alpine', port: '5432:5432', env: 'POSTGRES_PASSWORD=secret' },
        { name: 'redis', image: 'redis:7-alpine', port: '6379:6379', env: '' },
      ],
    },
    {
      name: 'Microservices',
      version: '3.8',
      services: [
        { name: 'user-service', image: 'node:18-alpine', port: '3001:3000', env: 'SERVICE_NAME=user-service' },
        { name: 'product-service', image: 'node:18-alpine', port: '3002:3000', env: 'SERVICE_NAME=product-service' },
        { name: 'order-service', image: 'node:18-alpine', port: '3003:3000', env: 'SERVICE_NAME=order-service' },
        { name: 'postgres', image: 'postgres:15-alpine', port: '5432:5432', env: 'POSTGRES_PASSWORD=secret' },
      ],
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setVersion(preset.version);
    setServices(preset.services);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Docker Compose Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate docker-compose.yml files for multi-container applications</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Version */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Compose Version</h3>
              <div className="flex gap-2">
                {['3.8', '3.9', '2.4'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVersion(v)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      version === v
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Service */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add Service</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Service name (e.g., web)"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="text"
                  value={newServiceImage}
                  onChange={(e) => setNewServiceImage(e.target.value)}
                  placeholder="Image (e.g., node:18-alpine)"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="text"
                  value={newServicePort}
                  onChange={(e) => setNewServicePort(e.target.value)}
                  placeholder="Port (e.g., 3000:3000)"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="text"
                  value={newServiceEnv}
                  onChange={(e) => setNewServiceEnv(e.target.value)}
                  placeholder="Environment (comma-separated)"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addService}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  Add Service
                </button>
              </div>
            </div>

            {/* Service List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Services ({services.length})</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {services.map((service, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                    <div className="flex justify-between items-start mb-2">
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => updateService(index, 'name', e.target.value)}
                        className="font-bold px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100 flex-1"
                      />
                      <button
                        onClick={() => removeService(index)}
                        className="ml-2 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={service.image}
                      onChange={(e) => updateService(index, 'image', e.target.value)}
                      placeholder="Image"
                      className="w-full px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-xs mb-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                    />
                    <input
                      type="text"
                      value={service.port}
                      onChange={(e) => updateService(index, 'port', e.target.value)}
                      placeholder="Port"
                      className="w-full px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-xs mb-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                    />
                    <input
                      type="text"
                      value={service.env}
                      onChange={(e) => updateService(index, 'env', e.target.value)}
                      placeholder="Environment variables"
                      className="w-full px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-xs focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Presets</h3>
              <div className="space-y-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 text-sm font-medium transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-6">
            {/* Docker Compose Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">docker-compose.yml</h3>
                <button
                  onClick={() => copyToClipboard(dockerCompose)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-72">
                <code className="text-green-400 text-xs font-mono whitespace-pre">{dockerCompose}</code>
              </div>
            </div>

            {/* Dockerfile Output */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Dockerfile Example</h3>
                <button
                  onClick={() => copyToClipboard(dockerfile)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-gray-900 dark:bg-black rounded-lg overflow-x-auto h-72">
                <code className="text-green-400 text-xs font-mono whitespace-pre">{dockerfile}</code>
              </div>
            </div>

            {/* Docker Commands */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Common Commands</h3>
              <div className="text-xs space-y-2 font-mono text-gray-700 dark:text-gray-300">
                <p><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">docker-compose up</code> Start services</p>
                <p><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">docker-compose down</code> Stop services</p>
                <p><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">docker-compose logs -f</code> View logs</p>
                <p><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">docker-compose ps</code> List services</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">About Docker Compose</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Docker Compose simplifies multi-container application deployment using a single YAML file. Define your services, networks, and volumes in one place.
            Perfect for development environments, this tool helps generate valid docker-compose.yml files that you can run with a single command.
          </p>
        </div>
      </div>
    </div>
  );
}
