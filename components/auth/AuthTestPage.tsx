'use client';

import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';
import ModalLoginButton from './ModalLoginButton';
import ModalSignUpButton from './ModalSignUpButton';
import AuthValidationClient from '../AuthValidationClient';
import { CheckCircle, XCircle, AlertCircle, User, LogOut } from 'lucide-react';

const AuthTestPage = () => {
  const { data: session, status } = useSession();
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAuthTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/validate');
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      setTestResults({ error: 'Test failed' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      runAuthTest();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            🔐 Authentication System Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete testing environment for Google OAuth2 and Magic Link authentication.
          </p>
        </motion.div>

        {/* Authentication Status Banner */}
        {status === 'authenticated' && session && (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    ✅ Authentication Successful!
                  </h3>
                  <p className="text-green-600">
                    Welcome, {session.user?.name || session.user?.email}!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-green-300"
                    referrerPolicy="no-referrer"
                  />
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'unauthenticated' && (
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  🔓 Not Authenticated
                </h3>
                <p className="text-blue-600">
                  Please sign in to test the authentication system.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Authentication Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Login Buttons Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Login Buttons
            </h2>
            <div className="space-y-4">
              <LoginButton variant="primary" size="md" />
              <LoginButton variant="secondary" size="md" />
              <LoginButton variant="outline" size="md" />
            </div>
          </motion.div>

          {/* Sign Up Buttons Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Sign Up Buttons
            </h2>
            <div className="space-y-4">
              <SignUpButton variant="primary" size="md" />
              <SignUpButton variant="secondary" size="md" />
              <SignUpButton variant="outline" size="md" />
            </div>
          </motion.div>

          {/* Modal Authentication Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Modal Authentication
            </h2>
            <div className="space-y-4">
              <ModalSignUpButton ctaTheme={true} size="lg" />
              <ModalLoginButton variant="secondary" />
            </div>
          </motion.div>

          {/* Size Variants */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Size Variants
            </h2>
            <div className="space-y-4">
              <LoginButton size="sm" />
              <LoginButton size="md" />
              <LoginButton size="lg" />
            </div>
          </motion.div>

          {/* Full Width Buttons */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Full Width
            </h2>
            <div className="space-y-4">
              <LoginButton fullWidth />
              <SignUpButton fullWidth />
            </div>
          </motion.div>

          {/* Brand Integration Preview */}
          <motion.div
            className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-6 rounded-2xl shadow-lg text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              On Brand Background
            </h2>
            <div className="space-y-4">
              <SignUpButton variant="secondary" />
              <LoginButton variant="outline" />
            </div>
          </motion.div>
        </div>

        {/* Authentication Validation Section */}
        {status === 'authenticated' && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🔍 Live Authentication Validation
            </h2>
            <AuthValidationClient />
          </motion.div>
        )}

        {/* Testing Instructions */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            📋 Testing Instructions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                🔵 Google OAuth2 Testing
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Click any "Sign in with Google" button</li>
                <li>Complete the Google OAuth flow</li>
                <li>Verify redirection to dashboard</li>
                <li>Check validation status above</li>
                <li>Test sign out functionality</li>
              </ol>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                ✉️ Magic Link Testing
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Click "Sign in with Email" button</li>
                <li>Enter your email address</li>
                <li>Check your email for magic link</li>
                <li>Click the link to sign in</li>
                <li>Verify authentication success</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Database Validation Instructions */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            🗄️ Database Validation
          </h2>
          <div className="space-y-4">
            <p className="text-blue-700">
              To validate your authentication setup in the database, check these collections:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📊 Users Collection</h4>
                <p className="text-sm text-blue-600">Contains user profile data</p>
                <code className="text-xs bg-blue-100 px-2 py-1 rounded">db.users.find()</code>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🔗 Accounts Collection</h4>
                <p className="text-sm text-blue-600">OAuth provider connections</p>
                <code className="text-xs bg-blue-100 px-2 py-1 rounded">db.accounts.find()</code>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🎫 Sessions Collection</h4>
                <p className="text-sm text-blue-600">Active user sessions</p>
                <code className="text-xs bg-blue-100 px-2 py-1 rounded">db.sessions.find()</code>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🔧 Database Validation Script</h4>
              <p className="text-sm text-blue-600 mb-2">Run this script to validate your database setup:</p>
              <code className="text-xs bg-blue-100 px-2 py-1 rounded font-mono">
                node scripts/validate-database.js
              </code>
            </div>
          </div>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            🌐 API Endpoints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800">Authentication Endpoints:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-white p-2 rounded">
                  <span className="font-mono text-green-600">GET</span>
                  <span>/api/auth/signin</span>
                </div>
                <div className="flex justify-between bg-white p-2 rounded">
                  <span className="font-mono text-green-600">POST</span>
                  <span>/api/auth/signin/google</span>
                </div>
                <div className="flex justify-between bg-white p-2 rounded">
                  <span className="font-mono text-green-600">POST</span>
                  <span>/api/auth/signin/email</span>
                </div>
                <div className="flex justify-between bg-white p-2 rounded">
                  <span className="font-mono text-green-600">GET</span>
                  <span>/api/auth/signout</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800">Validation Endpoints:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-white p-2 rounded">
                  <span className="font-mono text-green-600">GET</span>
                  <span>/api/auth/session</span>
                </div>
                <div className="flex justify-between bg-white p-2 rounded">
                  <span className="font-mono text-green-600">GET</span>
                  <span>/api/auth/validate</span>
                </div>
                <div className="flex justify-between bg-white p-2 rounded">
                  <span className="font-mono text-green-600">GET</span>
                  <span>/dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature List */}
        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            ✨ Features Implemented
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#667eea] mb-2">Brand Alignment</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Brand gradient colors (#667eea to #764ba2)</li>
                <li>• Consistent with design system</li>
                <li>• Professional educator-focused messaging</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#667eea] mb-2">Microinteractions</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Hover scale effects (1.02x)</li>
                <li>• Gradient shimmer animations</li>
                <li>• Smooth loading states</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#667eea] mb-2">Authentication</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Google OAuth integration</li>
                <li>• Magic Link email authentication</li>
                <li>• Modal with glass-morphism effect</li>
                <li>• Session state management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#667eea] mb-2">Modal Features</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Glass-morphism backdrop effect</li>
                <li>• Smooth tab transitions</li>
                <li>• Educator-focused messaging</li>
                <li>• Email magic link form</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthTestPage;
