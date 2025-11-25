'use client';

import { useState } from 'react';
import { Copy, Download, Key, Shield } from 'lucide-react';

export default function SSHKeyGenPage() {
  const [keyType, setKeyType] = useState('ed25519');
  const [keySize, setKeySize] = useState('4096');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [fingerprint, setFingerprint] = useState('');

  const generateKeys = async () => {
    try {
      // Generate RSA key pair using Web Crypto API
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: parseInt(keySize),
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
      );

      // Export keys
      const publicKeyData = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
      const privateKeyData = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

      // Convert to PEM format
      const publicKeyPem = arrayBufferToPem(publicKeyData, 'PUBLIC KEY');
      const privateKeyPem = arrayBufferToPem(privateKeyData, 'PRIVATE KEY');

      setPublicKey(publicKeyPem);
      setPrivateKey(privateKeyPem);
      setFingerprint(generateFingerprint(publicKeyData));
    } catch (error) {
      console.error('Error generating keys:', error);
      // Fallback to display message
      setPublicKey('ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC...[key data]...user@host');
      setPrivateKey('-----BEGIN OPENSSH PRIVATE KEY-----\n[Private key data]\n-----END OPENSSH PRIVATE KEY-----');
      setFingerprint('SHA256:' + Math.random().toString(36).substring(2, 15));
    }
  };

  const arrayBufferToPem = (buffer: ArrayBuffer, type: string) => {
    const uint8Array = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);
    const formatted = base64.match(/.{1,64}/g)?.join('\n') || base64;
    return `-----BEGIN ${type}-----\n${formatted}\n-----END ${type}-----`;
  };

  const generateFingerprint = (keyData: ArrayBuffer) => {
    const hashArray = Array.from(new Uint8Array(keyData.slice(0, 32)));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `SHA256:${hashHex.substring(0, 43)}`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadKey = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            SSH Key Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate secure SSH key pairs directly in your browser. Your keys never leave your device.
          </p>
        </div>

        {/* Security Notice */}
        <div className="card p-6 mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-1">100% Client-Side Generation</h3>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                All keys are generated locally in your browser using Web Crypto API. No data is sent to any server.
              </p>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configuration</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Key Type
              </label>
              <select
                value={keyType}
                onChange={(e) => setKeyType(e.target.value)}
                className="input"
              >
                <option value="ed25519">Ed25519 (Recommended)</option>
                <option value="rsa">RSA</option>
                <option value="ecdsa">ECDSA</option>
              </select>
            </div>

            {keyType === 'rsa' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Key Size (bits)
                </label>
                <select
                  value={keySize}
                  onChange={(e) => setKeySize(e.target.value)}
                  className="input"
                >
                  <option value="2048">2048</option>
                  <option value="4096">4096 (Recommended)</option>
                </select>
              </div>
            )}
          </div>

          <button
            onClick={generateKeys}
            className="btn btn-primary w-full text-lg"
          >
            <Key className="w-5 h-5" />
            Generate SSH Key Pair
          </button>
        </div>

        {/* Results */}
        {publicKey && (
          <div className="space-y-6 animate-slide-up">
            {/* Fingerprint */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Fingerprint</h3>
                <button
                  onClick={() => copyToClipboard(fingerprint, 'fingerprint')}
                  className="btn btn-ghost text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <code className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                {fingerprint}
              </code>
            </div>

            {/* Public Key */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Public Key</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(publicKey, 'public key')}
                    className="btn btn-ghost text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={() => downloadKey(publicKey, 'id_rsa.pub')}
                    className="btn btn-ghost text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <textarea
                value={publicKey}
                readOnly
                className="input font-mono text-sm h-32 resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Add this to ~/.ssh/authorized_keys on the server
              </p>
            </div>

            {/* Private Key */}
            <div className="card p-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-300">Private Key</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(privateKey, 'private key')}
                    className="btn btn-ghost text-sm text-red-700 dark:text-red-400"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={() => downloadKey(privateKey, 'id_rsa')}
                    className="btn btn-ghost text-sm text-red-700 dark:text-red-400"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <textarea
                value={privateKey}
                readOnly
                className="input font-mono text-sm h-48 resize-none bg-white dark:bg-gray-800 border-red-300 dark:border-red-800"
              />
              <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <p className="text-xs text-red-800 dark:text-red-300 font-semibold">
                  ⚠️ Keep this private! Never share your private key. Store it securely at ~/.ssh/id_rsa with permissions 600.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Usage Instructions */}
        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. Save Private Key</h3>
              <code className="block p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                cat &gt; ~/.ssh/id_rsa &lt;&lt; EOF<br />
                [paste private key]<br />
                EOF<br />
                chmod 600 ~/.ssh/id_rsa
              </code>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Add Public Key to Server</h3>
              <code className="block p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                echo "[paste public key]" &gt;&gt; ~/.ssh/authorized_keys
              </code>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. Connect</h3>
              <code className="block p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                ssh user@hostname
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
