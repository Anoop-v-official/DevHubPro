'use client';

import { useState, useEffect } from 'react';
import { Network, Copy, Info } from 'lucide-react';

export default function CIDRCalculatorPage() {
  const [ipAddress, setIpAddress] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    calculateCIDR();
  }, [ipAddress, cidr]);

  const ipToInt = (ip: string): number => {
    const parts = ip.split('.').map(Number);
    return ((parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0;
  };

  const intToIp = (int: number): string => {
    return [
      (int >>> 24) & 0xFF,
      (int >>> 16) & 0xFF,
      (int >>> 8) & 0xFF,
      int & 0xFF
    ].join('.');
  };

  const calculateCIDR = () => {
    try {
      // Validate IP address format
      const ipParts = ipAddress.split('.');
      if (ipParts.length !== 4 || ipParts.some(part => {
        const num = parseInt(part);
        return isNaN(num) || num < 0 || num > 255;
      })) {
        setResults(null);
        return;
      }

      const cidrNum = parseInt(cidr);
      if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
        setResults(null);
        return;
      }

      const ipInt = ipToInt(ipAddress);
      const mask = cidrNum === 0 ? 0 : (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
      const wildcardMask = ~mask >>> 0;
      const networkInt = (ipInt & mask) >>> 0;
      const broadcastInt = (networkInt | wildcardMask) >>> 0;
      const totalHosts = Math.pow(2, 32 - cidrNum);

      // For /31 and /32, special rules apply
      let firstHostInt, lastHostInt, usableHosts;
      if (cidrNum === 32) {
        // Single host
        firstHostInt = networkInt;
        lastHostInt = networkInt;
        usableHosts = 1;
      } else if (cidrNum === 31) {
        // Point-to-point link (RFC 3021)
        firstHostInt = networkInt;
        lastHostInt = broadcastInt;
        usableHosts = 2;
      } else {
        firstHostInt = networkInt + 1;
        lastHostInt = broadcastInt - 1;
        usableHosts = Math.max(0, totalHosts - 2);
      }

      setResults({
        networkAddress: intToIp(networkInt),
        broadcastAddress: intToIp(broadcastInt),
        subnetMask: intToIp(mask),
        wildcardMask: intToIp(wildcardMask),
        firstHost: intToIp(firstHostInt),
        lastHost: intToIp(lastHostInt),
        totalHosts,
        usableHosts,
        ipClass: getIPClass(intToIp(networkInt)),
        isPrivate: isPrivateIP(intToIp(networkInt)),
        binarySubnetMask: mask.toString(2).padStart(32, '0'),
        binaryIP: ipInt.toString(2).padStart(32, '0'),
        cidrNotation: `${intToIp(networkInt)}/${cidr}`,
        ipRange: `${intToIp(networkInt)} - ${intToIp(broadcastInt)}`
      });
    } catch (error) {
      console.error('CIDR calculation error:', error);
      setResults(null);
    }
  };

  const getIPClass = (ip: string): string => {
    const firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet >= 1 && firstOctet <= 126) return 'A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
    if (firstOctet >= 240 && firstOctet <= 255) return 'E (Reserved)';
    return 'Unknown';
  };

  const isPrivateIP = (ip: string): boolean => {
    const parts = ip.split('.').map(Number);
    const firstOctet = parts[0];
    const secondOctet = parts[1];

    if (firstOctet === 10) return true;
    if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) return true;
    if (firstOctet === 192 && secondOctet === 168) return true;
    return false;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl mb-4">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            CIDR Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate network ranges, subnet masks, and IP address information from CIDR notation
          </p>
        </div>

        {/* Input */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Network Configuration</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                IP Address
              </label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="192.168.1.0"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                CIDR Prefix (0-32)
              </label>
              <input
                type="number"
                min="0"
                max="32"
                value={cidr}
                onChange={(e) => setCidr(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6 animate-slide-up">
            {/* Network Info Card */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Network Information</h2>
                <button
                  onClick={() => copyToClipboard(results.cidrNotation)}
                  className="btn btn-ghost text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy CIDR
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">CIDR Notation</label>
                    <div className="text-xl font-bold text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-1">
                      {results.cidrNotation}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Network Address</label>
                    <div className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1">
                      {results.networkAddress}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Broadcast Address</label>
                    <div className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1">
                      {results.broadcastAddress}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Subnet Mask</label>
                    <div className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1">
                      {results.subnetMask}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Wildcard Mask</label>
                    <div className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1">
                      {results.wildcardMask}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">First Usable Host</label>
                    <div className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1">
                      {results.firstHost}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Last Usable Host</label>
                    <div className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-1">
                      {results.lastHost}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">IP Class</label>
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg mt-1">
                        {results.ipClass}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Type</label>
                      <div className={`text-lg font-bold p-3 rounded-lg mt-1 ${
                        results.isPrivate
                          ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                          : 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                      }`}>
                        {results.isPrivate ? 'Private' : 'Public'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Information */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Host Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl">
                  <div className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">Total Hosts</div>
                  <div className="text-4xl font-bold gradient-text">{formatNumber(results.totalHosts)}</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl">
                  <div className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">Usable Hosts</div>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">{formatNumber(results.usableHosts)}</div>
                </div>
              </div>
            </div>

            {/* IP Range */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">IP Address Range</h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                <code className="text-xl font-mono text-gray-900 dark:text-white">
                  {results.ipRange}
                </code>
              </div>
            </div>

            {/* Binary Representation */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Binary Representation</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 block">IP Address</label>
                  <code className="block p-4 bg-gray-900 dark:bg-black rounded-lg text-cyan-400 font-mono text-sm overflow-x-auto">
                    {results.binaryIP.match(/.{1,8}/g)?.join('.') || results.binaryIP}
                  </code>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Subnet Mask</label>
                  <code className="block p-4 bg-gray-900 dark:bg-black rounded-lg text-green-400 font-mono text-sm overflow-x-auto">
                    {results.binarySubnetMask.match(/.{1,8}/g)?.join('.') || results.binarySubnetMask}
                  </code>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="card p-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Quick Reference</h3>
                  <div className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                    <div>• /32 = 255.255.255.255 (Single host)</div>
                    <div>• /24 = 255.255.255.0 (256 addresses, 254 usable)</div>
                    <div>• /16 = 255.255.0.0 (65,536 addresses)</div>
                    <div>• /8 = 255.0.0.0 (16,777,216 addresses)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
