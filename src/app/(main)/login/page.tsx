"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();

  // Clear error message on input change
  useEffect(() => {
    if (loginError) {
      setLoginError('');
    }
  }, [username, password]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username === 'admin' && password === 'admin') {
      // Use the login function from AuthContext
      login('Admin', 'test@example.com', 'Test User', '1234567890'); // Sample data
      router.push(redirectUrl); // Redirect after successful login
    } else {
      setLoginError('Invalid username or password.');
      // Handle invalid credentials - e.g., show an error message to the user
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-var(--header-height)-var(--footer-height))] py-8">
      <div className="p-8 border rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              autoComplete="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              autoComplete="current-password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="mt-6 text-center text-sm">
          Don't have an account? <Link href="/signup" className="font-medium text-primary hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;