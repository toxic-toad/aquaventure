"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  userImageUrl: string | null;
  gender: string | null;
  login: (username: string, email: string, phoneNumber: string, userImageUrl?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<{ username: string; email: string; phoneNumber: string; userImageUrl: string }>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage on mount
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  React.useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedUserImageUrl = localStorage.getItem('userImageUrl');

    const storedGender = localStorage.getItem('gender');

    if (storedIsLoggedIn === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setEmail(storedEmail || null);
      setPhoneNumber(storedPhoneNumber || null);
      setUserImageUrl(storedUserImageUrl !== null ? storedUserImageUrl : null);
    }
  }, []); // Empty dependency array means this effect runs only once on mount

  const login = (username: string, email: string, phoneNumber: string, userImageUrl?: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setUserImageUrl(userImageUrl || null);
    setGender(null); // Assuming gender is not set during login initially
    // Persist to localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
    if (userImageUrl) localStorage.setItem('userImageUrl', userImageUrl);
    localStorage.removeItem('gender'); // Ensure gender is not saved initially
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setEmail(null);
    setPhoneNumber(null);
    setUserImageUrl(null);
    setGender(null);
    // Remove from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  };

  const updateProfile = (updates: Partial<{ username: string; email: string; phoneNumber: string; userImageUrl: string; gender: string }>) => {
    if (updates.username !== undefined) {
      setUsername(updates.username);
      localStorage.setItem('username', updates.username);
    }
    if (updates.email !== undefined) {
      setEmail(updates.email);
      localStorage.setItem('email', updates.email);
    }
    if (updates.phoneNumber !== undefined) {
      setPhoneNumber(updates.phoneNumber);
      localStorage.setItem('phoneNumber', updates.phoneNumber);
    }
    if (updates.userImageUrl !== undefined) {
      setUserImageUrl(updates.userImageUrl);
      if (updates.userImageUrl) localStorage.setItem('userImageUrl', updates.userImageUrl);
      else localStorage.removeItem('userImageUrl');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, email, phoneNumber, userImageUrl, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}