'use client';

import { useState, useEffect } from 'react';
import EMICalculator from '@/components/EMICalculator';
import AuthPage from '@/components/AuthPage';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on page load
  useEffect(() => {
    const authStatus = localStorage.getItem('loan-o-meter-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Handle successful login
  const handleLogin = () => {
    localStorage.setItem('loan-o-meter-auth', 'authenticated');
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('loan-o-meter-auth');
    setIsAuthenticated(false);
  };

  // Show loading screen briefly while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {isAuthenticated ? (
        <EMICalculator onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
}