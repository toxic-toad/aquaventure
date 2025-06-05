"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  userImageUrl: string | null;
  gender: "Male" | "Female" | null;
  login: (username: string, email: string, phoneNumber: string, userImageUrl?: string, gender?: "Male" | "Female") => void;
  logout: () => void;
  updateProfile: (updates: Partial<{ username: string; email: string; phoneNumber: string; userImageUrl: string; gender: "Male" | "Female" }>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [gender, setGender] = useState<"Male" | "Female" | null>("Male"); // Set default gender to "Male"

  React.useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedUserImageUrl = localStorage.getItem('userImageUrl');
    const storedGender = localStorage.getItem('gender') as "Male" | "Female" | null;

    if (storedIsLoggedIn === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setEmail(storedEmail || null);
      setPhoneNumber(storedPhoneNumber || null);
      setUserImageUrl(storedUserImageUrl || null);
      setGender(storedGender ?? "Male"); // Set gender from localStorage, default to "Male"
    }
  }, []);

  const login = (username: string, email: string, phoneNumber: string, userImageUrl?: string, gender?: "Male" | "Female") => {
    setIsLoggedIn(true);
    setUsername(username);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setUserImageUrl(userImageUrl || null);
    setGender(gender ?? "Male"); // Set gender on login, default to "Male"
    // Persist to localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
    if (userImageUrl) localStorage.setItem('userImageUrl', userImageUrl);
    if (gender) localStorage.setItem('gender', gender);
    else localStorage.removeItem('gender'); // Remove gender from localStorage if not provided
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setEmail(null);
    setPhoneNumber(null);
    setUserImageUrl(null);
    setGender(null); // Clear gender state on logout
    // Remove from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('userImageUrl');
    localStorage.removeItem('gender');
  };

  const updateProfile = (updates: Partial<{ username: string; email: string; phoneNumber: string; userImageUrl: string; gender: "Male" | "Female" }>) => {
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
    if (updates.gender !== undefined) {
      setGender(updates.gender);
      if (updates.gender) localStorage.setItem('gender', updates.gender);
      else localStorage.removeItem('gender');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, email, phoneNumber, userImageUrl, gender, login, logout, updateProfile }}>
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
