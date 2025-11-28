'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useToolTracking } from '@/hooks/useToolTracking';

export default function RandomDataPage() {
  useToolTracking('Random Data Generator', '/tools/random-data');

  const [dataType, setDataType] = useState<'name' | 'email' | 'phone' | 'address' | 'number' | 'password' | 'date' | 'creditcard'>('name');
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Emma', 'Robert', 'Olivia', 'William', 'Ava', 'Daniel', 'Sophia', 'Matthew', 'Isabella', 'Joseph', 'Mia', 'Andrew', 'Charlotte'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com', 'test.com'];
  const streets = ['Main St', 'Oak Ave', 'Park Rd', 'Maple Dr', 'Cedar Ln', 'Elm St', 'Washington Blvd', 'Lake View Dr', 'Hill St', 'Forest Ave'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'GA'];

  const randomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateName = () => `${randomElement(firstNames)} ${randomElement(lastNames)}`;

  const generateEmail = () => {
    const firstName = randomElement(firstNames).toLowerCase();
    const lastName = randomElement(lastNames).toLowerCase();
    const domain = randomElement(domains);
    return `${firstName}.${lastName}@${domain}`;
  };

  const generatePhone = () => {
    const areaCode = randomNumber(200, 999);
    const prefix = randomNumber(200, 999);
    const lineNumber = randomNumber(1000, 9999);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  };

  const generateAddress = () => {
    const number = randomNumber(100, 9999);
    const street = randomElement(streets);
    const city = randomElement(cities);
    const state = randomElement(states);
    const zip = randomNumber(10000, 99999);
    return `${number} ${street}, ${city}, ${state} ${zip}`;
  };

  const generateNumber = () => randomNumber(1, 1000000).toString();

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all = lowercase + uppercase + numbers + symbols;

    let password = '';
    password += randomElement([...lowercase]);
    password += randomElement([...uppercase]);
    password += randomElement([...numbers]);
    password += randomElement([...symbols]);

    for (let i = 4; i < 16; i++) {
      password += randomElement([...all]);
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const generateDate = () => {
    const year = randomNumber(2020, 2025);
    const month = randomNumber(1, 12).toString().padStart(2, '0');
    const day = randomNumber(1, 28).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateCreditCard = () => {
    const cardNumber = Array.from({ length: 16 }, () => randomNumber(0, 9)).join('');
    return cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber;
  };

  const generateData = () => {
    const results: string[] = [];

    for (let i = 0; i < count; i++) {
      let data = '';
      switch (dataType) {
        case 'name':
          data = generateName();
          break;
        case 'email':
          data = generateEmail();
          break;
        case 'phone':
          data = generatePhone();
          break;
        case 'address':
          data = generateAddress();
          break;
        case 'number':
          data = generateNumber();
          break;
        case 'password':
          data = generatePassword();
          break;
        case 'date':
          data = generateDate();
          break;
        case 'creditcard':
          data = generateCreditCard();
          break;
      }
      results.push(data);
    }

    setOutput(results);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dataTypes = [
    { value: 'name', label: 'Full Name', icon: '👤' },
    { value: 'email', label: 'Email', icon: '📧' },
    { value: 'phone', label: 'Phone', icon: '📱' },
    { value: 'address', label: 'Address', icon: '🏠' },
    { value: 'number', label: 'Number', icon: '🔢' },
    { value: 'password', label: 'Password', icon: '🔐' },
    { value: 'date', label: 'Date', icon: '📅' },
    { value: 'creditcard', label: 'Credit Card', icon: '💳' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 inline-block">
          ← Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">🎲 Random Data Generator</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Generate random test data for development</p>
        </div>

        {/* Data Type Selection */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Select Data Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dataTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setDataType(type.value as any)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all text-sm flex items-center justify-center gap-2 ${
                  dataType === type.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Number of Items
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button
              onClick={generateData}
              className="mt-7 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" />
              Generate
            </button>
          </div>
        </div>

        {/* Output */}
        {output.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white">
                Generated Data ({output.length} {output.length === 1 ? 'item' : 'items'})
              </h2>
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {output.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 break-all"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">💡 About Random Data</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Generate realistic random data for testing, prototyping, and development purposes.
            All generated data is fictional and randomly created - not based on real people or accounts.
            Perfect for populating databases, testing forms, and creating mockups!
          </p>
        </div>
      </div>
    </div>
  );
}
