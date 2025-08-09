'use client';

import { useState } from 'react';

interface AuthPageProps {
  onLogin: () => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief loading period for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check credentials
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Circles - Similar to main app */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/30 via-teal-500/25 to-cyan-600/20 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        
        <div className="absolute top-1/3 -right-16 w-56 h-56 bg-gradient-to-br from-green-400/35 via-emerald-500/30 to-teal-600/25 rounded-full blur-xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-t from-orange-400/25 via-amber-500/20 to-yellow-600/15 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '3s' }} />
        
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-blue-400/20 via-indigo-500/15 to-purple-600/10 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '8s', animationDelay: '0.5s' }} />
      </div>

      {/* Auth Form */}
      <div className="relative z-10 w-full max-w-sm mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold mb-2 drop-shadow-lg">Welcome Back</h1>
          <p className="text-white/70 text-base drop-shadow-md">Sign in to access Loan-o-Meter</p>
        </div>

        {/* Demo Credentials Note */}
        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
              <span className="text-xs text-emerald-900 font-bold">i</span>
            </div>
            <p className="text-emerald-200 text-sm font-medium">Demo Credentials</p>
          </div>
          <p className="text-emerald-100 text-sm">
            Use <span className="font-semibold bg-emerald-600/30 px-2 py-0.5 rounded">admin</span> for both username and password
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-white text-sm font-medium block">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-white text-sm font-medium block">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-emerald-500/50 disabled:to-teal-600/50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-emerald-500/25 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-xs">
            Secure access to your loan calculator
          </p>
        </div>
      </div>
    </div>
  );
}