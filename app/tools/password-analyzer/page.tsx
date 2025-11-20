'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Eye, EyeOff } from 'lucide-react';

export default function PasswordAnalyzerPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [crackTime, setCrackTime] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    analyzePassword(password);
  }, [password]);

  const analyzePassword = (pwd: string) => {
    if (!pwd) {
      setStrength(0);
      setFeedback([]);
      setCrackTime('');
      setScore(0);
      return;
    }

    let strengthScore = 0;
    const suggestions: string[] = [];

    // Length check
    if (pwd.length >= 8) strengthScore += 20;
    if (pwd.length >= 12) strengthScore += 10;
    if (pwd.length >= 16) strengthScore += 10;
    else suggestions.push('Use at least 12 characters');

    // Complexity checks
    if (/[a-z]/.test(pwd)) strengthScore += 10;
    else suggestions.push('Add lowercase letters');

    if (/[A-Z]/.test(pwd)) strengthScore += 10;
    else suggestions.push('Add uppercase letters');

    if (/[0-9]/.test(pwd)) strengthScore += 10;
    else suggestions.push('Add numbers');

    if (/[^a-zA-Z0-9]/.test(pwd)) strengthScore += 15;
    else suggestions.push('Add special characters (!@#$%^&*)');

    // Pattern checks
    if (/(.)\1{2,}/.test(pwd)) {
      strengthScore -= 10;
      suggestions.push('Avoid repeated characters');
    }

    if (/^[0-9]+$/.test(pwd)) {
      strengthScore -= 20;
      suggestions.push('Don\'t use only numbers');
    }

    if (/^[a-zA-Z]+$/.test(pwd)) {
      strengthScore -= 10;
      suggestions.push('Mix letters with numbers and symbols');
    }

    // Common patterns
    const commonPatterns = ['password', '123456', 'qwerty', 'abc123', 'letmein'];
    if (commonPatterns.some(pattern => pwd.toLowerCase().includes(pattern))) {
      strengthScore -= 30;
      suggestions.push('Avoid common words and patterns');
    }

    // Sequential characters
    if (/abc|bcd|cde|123|234|345/.test(pwd.toLowerCase())) {
      strengthScore -= 10;
      suggestions.push('Avoid sequential characters');
    }

    // Dictionary words (simple check)
    const commonWords = ['admin', 'user', 'login', 'welcome', 'hello'];
    if (commonWords.some(word => pwd.toLowerCase().includes(word))) {
      strengthScore -= 15;
      suggestions.push('Avoid dictionary words');
    }

    // Entropy bonus
    const uniqueChars = new Set(pwd).size;
    strengthScore += Math.min(15, uniqueChars * 2);

    // Normalize score
    strengthScore = Math.max(0, Math.min(100, strengthScore));

    setStrength(strengthScore);
    setFeedback(suggestions);
    setScore(strengthScore);

    // Calculate crack time
    const possibleChars =
      (/[a-z]/.test(pwd) ? 26 : 0) +
      (/[A-Z]/.test(pwd) ? 26 : 0) +
      (/[0-9]/.test(pwd) ? 10 : 0) +
      (/[^a-zA-Z0-9]/.test(pwd) ? 32 : 0);

    const combinations = Math.pow(possibleChars, pwd.length);
    const guessesPerSecond = 1000000000; // 1 billion guesses/sec
    const seconds = combinations / guessesPerSecond;

    setCrackTime(formatCrackTime(seconds));
  };

  const formatCrackTime = (seconds: number): string => {
    if (seconds < 1) return 'Instant';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 315360000) return `${Math.round(seconds / 31536000)} years`;
    return `${(seconds / 31536000).toExponential(2)} years`;
  };

  const getStrengthLabel = () => {
    if (strength < 30) return { label: 'Weak', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500' };
    if (strength < 50) return { label: 'Fair', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500' };
    if (strength < 70) return { label: 'Good', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500' };
    if (strength < 90) return { label: 'Strong', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500' };
    return { label: 'Very Strong', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500' };
  };

  const strengthInfo = getStrengthLabel();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Password Strength Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check your password strength and get real-time security recommendations
          </p>
        </div>

        {/* Password Input */}
        <div className="card p-8 mb-8">
          <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
            Enter Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password..."
              className="input pr-12 text-lg"
              autoComplete="off"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Your password is analyzed locally and never sent to any server
          </p>
        </div>

        {password && (
          <div className="space-y-6 animate-slide-up">
            {/* Strength Meter */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Strength</h2>
                <span className={`text-2xl font-bold ${strengthInfo.color}`}>
                  {strengthInfo.label}
                </span>
              </div>

              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full ${strengthInfo.bg} transition-all duration-500 ease-out`}
                  style={{ width: `${strength}%` }}
                />
              </div>

              <div className="text-center text-5xl font-bold gradient-text mb-2">
                {score}/100
              </div>
            </div>

            {/* Crack Time */}
            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Time to Crack</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {crackTime}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    At 1 billion guesses per second
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback */}
            {feedback.length > 0 && (
              <div className="card p-8">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Suggestions</h2>
                </div>
                <ul className="space-y-3">
                  {feedback.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Password Requirements */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Requirements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`flex items-center gap-3 ${password.length >= 8 ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                  {password.length >= 8 ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-3 ${/[a-z]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                  {/[a-z]/.test(password) ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span>Lowercase letter</span>
                </div>
                <div className={`flex items-center gap-3 ${/[A-Z]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                  {/[A-Z]/.test(password) ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span>Uppercase letter</span>
                </div>
                <div className={`flex items-center gap-3 ${/[0-9]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                  {/[0-9]/.test(password) ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span>Number</span>
                </div>
                <div className={`flex items-center gap-3 ${/[^a-zA-Z0-9]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                  {/[^a-zA-Z0-9]/.test(password) ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span>Special character</span>
                </div>
                <div className={`flex items-center gap-3 ${password.length >= 12 ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                  {password.length >= 12 ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span>12+ characters (recommended)</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="card p-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">Password Tips</h2>
              <ul className="space-y-2 text-blue-800 dark:text-blue-400">
                <li>• Use a unique password for each account</li>
                <li>• Consider using a passphrase (e.g., "coffee!Morning@2024")</li>
                <li>• Enable two-factor authentication whenever possible</li>
                <li>• Use a password manager to store complex passwords</li>
                <li>• Never share passwords or write them down</li>
                <li>• Change passwords if you suspect compromise</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
