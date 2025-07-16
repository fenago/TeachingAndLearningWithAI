'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CheckCircle, XCircle, AlertCircle, Database, User, Shield, RefreshCw } from 'lucide-react';

interface ValidationResponse {
  authenticated: boolean;
  session?: {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
    expires: string;
  };
  provider?: string;
  userFromDatabase?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;
  database?: {
    status: string;
    database?: string;
    collection?: string;
    error?: string;
  };
  validation?: {
    sessionValid: boolean;
    userInDatabase: boolean;
    providerIdentified: boolean;
    timestamp: string;
  };
  error?: string;
}

export default function AuthValidationClient() {
  const { data: session, status } = useSession();
  const [validation, setValidation] = useState<ValidationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAuth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/validate', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      const data = await response.json();
      setValidation(data);
      
      if (!response.ok) {
        setError(data.error || 'Validation failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      validateAuth();
    }
  }, [status]);

  const StatusIcon = ({ status }: { status: boolean | undefined }) => {
    if (status === true) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === false) return <XCircle className="w-5 h-5 text-red-500" />;
    return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  };

  const getProviderDisplay = (provider?: string) => {
    switch (provider) {
      case 'google':
        return { name: 'Google OAuth2', color: 'text-blue-600', icon: '🔵' };
      case 'email':
        return { name: 'Magic Link (Email)', color: 'text-purple-600', icon: '✉️' };
      default:
        return { name: provider || 'Unknown', color: 'text-gray-600', icon: '❓' };
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">Loading session...</span>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="text-center p-8">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Not Authenticated</h3>
        <p className="text-gray-600">Please sign in to view authentication details.</p>
      </div>
    );
  }

  const providerInfo = getProviderDisplay(validation?.provider);

  return (
    <div className="space-y-6">
      {/* Validation Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">Live Validation Results</h3>
        <button
          onClick={validateAuth}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Validating...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">Validation Error</span>
          </div>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      )}

      {/* Authentication Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-gray-700">Session Status</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={validation?.authenticated} />
            <span className="text-sm">
              {validation?.authenticated ? 'Authenticated' : 'Not Authenticated'}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-green-500" />
            <span className="font-medium text-gray-700">User in DB</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={validation?.validation?.userInDatabase} />
            <span className="text-sm">
              {validation?.validation?.userInDatabase ? 'Found' : 'Not Found'}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-purple-500" />
            <span className="font-medium text-gray-700">Database</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={validation?.database?.status === 'connected'} />
            <span className="text-sm">
              {validation?.database?.status === 'connected' ? 'Connected' : 'Error'}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{providerInfo.icon}</span>
            <span className="font-medium text-gray-700">Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={validation?.validation?.providerIdentified} />
            <span className={`text-sm font-medium ${providerInfo.color}`}>
              {providerInfo.name}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      {validation && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-3">Session Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">User ID:</span>
                <span className="font-mono text-blue-800">{validation.session?.user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Name:</span>
                <span className="text-blue-800">{validation.session?.user.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Email:</span>
                <span className="text-blue-800">{validation.session?.user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Expires:</span>
                <span className="text-blue-800">
                  {validation.session?.expires ? new Date(validation.session.expires).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Database Information */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3">Database Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-600">Status:</span>
                <span className="text-green-800 font-medium">{validation.database?.status}</span>
              </div>
              {validation.database?.database && (
                <div className="flex justify-between">
                  <span className="text-green-600">Database:</span>
                  <span className="font-mono text-green-800">{validation.database.database}</span>
                </div>
              )}
              {validation.database?.collection && (
                <div className="flex justify-between">
                  <span className="text-green-600">Collection:</span>
                  <span className="font-mono text-green-800">{validation.database.collection}</span>
                </div>
              )}
              {validation.userFromDatabase && (
                <>
                  <div className="flex justify-between">
                    <span className="text-green-600">DB User ID:</span>
                    <span className="font-mono text-green-800">{validation.userFromDatabase.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Email Verified:</span>
                    <span className="text-green-800">
                      {validation.userFromDatabase.emailVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {validation.userFromDatabase.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Created:</span>
                      <span className="text-green-800">
                        {new Date(validation.userFromDatabase.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Timestamp */}
      {validation?.validation?.timestamp && (
        <div className="text-xs text-gray-500 text-center">
          Last validated: {new Date(validation.validation.timestamp).toLocaleString()}
        </div>
      )}
    </div>
  );
}
