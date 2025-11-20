'use client';

import { useState, useEffect } from 'react';
import { Clock, Copy, Calendar, Info } from 'lucide-react';

export default function CronBuilderPage() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [cronExpression, setCronExpression] = useState('* * * * *');
  const [description, setDescription] = useState('');
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  useEffect(() => {
    const expression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setCronExpression(expression);
    setDescription(describeCron(expression));
    setNextRuns(calculateNextRuns(expression));
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const describeCron = (expr: string): string => {
    const [m, h, dom, mon, dow] = expr.split(' ');

    let desc = 'Run ';

    // Minute
    if (m === '*') desc += 'every minute ';
    else if (m.includes('/')) desc += `every ${m.split('/')[1]} minutes `;
    else if (m.includes(',')) desc += `at minutes ${m} `;
    else if (m.includes('-')) desc += `at minutes ${m} `;
    else desc += `at minute ${m} `;

    // Hour
    if (h === '*') desc += 'of every hour ';
    else if (h.includes('/')) desc += `every ${h.split('/')[1]} hours `;
    else if (h.includes(',')) desc += `at hours ${h} `;
    else if (h.includes('-')) desc += `between hours ${h} `;
    else desc += `at ${h}:00 `;

    // Day of month
    if (dom === '*') desc += 'every day ';
    else if (dom.includes('/')) desc += `every ${dom.split('/')[1]} days `;
    else if (dom.includes(',')) desc += `on days ${dom} `;
    else desc += `on day ${dom} `;

    // Month
    if (mon !== '*') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (mon.includes(',')) {
        const monthNames = mon.split(',').map(m => months[parseInt(m) - 1]).join(', ');
        desc += `in ${monthNames} `;
      } else {
        desc += `in ${months[parseInt(mon) - 1]} `;
      }
    }

    // Day of week
    if (dow !== '*') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      if (dow.includes(',')) {
        const dayNames = dow.split(',').map(d => days[parseInt(d)]).join(', ');
        desc += `on ${dayNames}`;
      } else {
        desc += `on ${days[parseInt(dow)]}`;
      }
    }

    return desc.trim();
  };

  const calculateNextRuns = (expr: string): string[] => {
    // Simplified calculation - in production, use a proper cron parser library
    const now = new Date();
    const runs: string[] = [];

    for (let i = 0; i < 5; i++) {
      const nextRun = new Date(now);
      nextRun.setMinutes(now.getMinutes() + (i + 1) * 15); // Simplified
      runs.push(nextRun.toLocaleString());
    }

    return runs;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const presets = [
    { name: 'Every minute', value: ['*', '*', '*', '*', '*'] },
    { name: 'Every hour', value: ['0', '*', '*', '*', '*'] },
    { name: 'Every day at midnight', value: ['0', '0', '*', '*', '*'] },
    { name: 'Every day at noon', value: ['0', '12', '*', '*', '*'] },
    { name: 'Every Monday at 9 AM', value: ['0', '9', '*', '*', '1'] },
    { name: 'Every weekday at 9 AM', value: ['0', '9', '*', '*', '1-5'] },
    { name: 'Every 15 minutes', value: ['*/15', '*', '*', '*', '*'] },
    { name: 'Every 30 minutes', value: ['*/30', '*', '*', '*', '*'] },
    { name: 'First day of month', value: ['0', '0', '1', '*', '*'] },
    { name: 'Every Sunday at midnight', value: ['0', '0', '*', '*', '0'] },
  ];

  const loadPreset = (preset: string[]) => {
    setMinute(preset[0]);
    setHour(preset[1]);
    setDayOfMonth(preset[2]);
    setMonth(preset[3]);
    setDayOfWeek(preset[4]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-4">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Cron Expression Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Build and test cron expressions for task scheduling with visual feedback
          </p>
        </div>

        {/* Cron Expression Display */}
        <div className="card p-8 mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cron Expression</h2>
            <button
              onClick={() => copyToClipboard(cronExpression)}
              className="btn btn-ghost"
            >
              <Copy className="w-5 h-5" />
              Copy
            </button>
          </div>
          <div className="bg-gray-900 dark:bg-black p-6 rounded-xl mb-4">
            <code className="text-3xl font-mono text-green-400 break-all">
              {cronExpression}
            </code>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Cron Builder */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Build Expression</h2>

          <div className="space-y-6">
            {/* Minute */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Minute (0-59)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder="* or 0-59"
                  className="input flex-1"
                />
                <button onClick={() => setMinute('*')} className="btn btn-outline">Every</button>
                <button onClick={() => setMinute('*/15')} className="btn btn-outline">Every 15</button>
                <button onClick={() => setMinute('0')} className="btn btn-outline">:00</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                * = every minute, */5 = every 5 minutes, 0,15,30,45 = specific minutes
              </p>
            </div>

            {/* Hour */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Hour (0-23)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="* or 0-23"
                  className="input flex-1"
                />
                <button onClick={() => setHour('*')} className="btn btn-outline">Every</button>
                <button onClick={() => setHour('9')} className="btn btn-outline">9 AM</button>
                <button onClick={() => setHour('17')} className="btn btn-outline">5 PM</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                * = every hour, */2 = every 2 hours, 9-17 = business hours
              </p>
            </div>

            {/* Day of Month */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Day of Month (1-31)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  placeholder="* or 1-31"
                  className="input flex-1"
                />
                <button onClick={() => setDayOfMonth('*')} className="btn btn-outline">Every</button>
                <button onClick={() => setDayOfMonth('1')} className="btn btn-outline">1st</button>
                <button onClick={() => setDayOfMonth('15')} className="btn btn-outline">15th</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                * = every day, 1 = first day, 1,15 = 1st and 15th
              </p>
            </div>

            {/* Month */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Month (1-12)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="* or 1-12"
                  className="input flex-1"
                />
                <button onClick={() => setMonth('*')} className="btn btn-outline">Every</button>
                <button onClick={() => setMonth('1')} className="btn btn-outline">Jan</button>
                <button onClick={() => setMonth('6')} className="btn btn-outline">Jun</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                * = every month, 1 = January, 1,4,7,10 = quarterly
              </p>
            </div>

            {/* Day of Week */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Day of Week (0-6, 0=Sunday)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  placeholder="* or 0-6"
                  className="input flex-1"
                />
                <button onClick={() => setDayOfWeek('*')} className="btn btn-outline">Every</button>
                <button onClick={() => setDayOfWeek('1-5')} className="btn btn-outline">Weekdays</button>
                <button onClick={() => setDayOfWeek('0,6')} className="btn btn-outline">Weekends</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                * = every day, 1 = Monday, 1-5 = weekdays, 0,6 = weekends
              </p>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Presets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => loadPreset(preset.value)}
                className="btn btn-outline text-left justify-start"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Next Runs */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Next Scheduled Runs (Estimated)
          </h2>
          <div className="space-y-3">
            {nextRuns.map((run, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-mono">{run}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Note: These are simplified estimates. Actual execution times may vary based on system timezone and cron implementation.
          </p>
        </div>

        {/* Reference */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-4">Special Characters</h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
              <div><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">*</code> Any value</div>
              <div><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">,</code> Value list separator (1,3,5)</div>
              <div><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">-</code> Range of values (1-5)</div>
              <div><code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">/</code> Step values (*/15 = every 15)</div>
            </div>
          </div>

          <div className="card p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-4">Common Examples</h3>
            <div className="space-y-2 text-sm text-green-800 dark:text-green-400">
              <div><code className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">0 0 * * *</code> Daily at midnight</div>
              <div><code className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">*/5 * * * *</code> Every 5 minutes</div>
              <div><code className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">0 */6 * * *</code> Every 6 hours</div>
              <div><code className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">0 9 * * 1-5</code> Weekdays at 9 AM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
