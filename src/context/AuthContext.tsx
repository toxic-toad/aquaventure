"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  fullName: string | null;
  email: string | null;
  phoneNumber: string | null;
  userImageUrl: string | null;
  gender: "Male" | "Female" | null;
  login: (userId: string, email: string, fullName: string, phoneNumber: string, userImageUrl?: string | null, gender?: "Male" | "Female" | null) => void;
  logout: () => void;
  updateProfile: (updates: Partial<{ userId: string; fullName: string; email: string; phoneNumber: string; userImageUrl: string | null; gender: "Male" | "Female" | null }>) => void;
  signup: (userId: string, email: string, fullName: string, password: string, phoneNumber: string, userImageUrl?: string | null, gender?: "Male" | "Female" | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // userId will now be editable
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [gender, setGender] = useState<"Male" | "Female" | null>("Male"); // Set default gender to "Male"

  React.useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedFullName = localStorage.getItem('fullName');
    const storedEmail = localStorage.getItem('email');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedUserImageUrl = localStorage.getItem('userImageUrl');
    const storedGender = localStorage.getItem('gender') as "Male" | "Female" | null;

    if (storedIsLoggedIn === 'true' && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
 setFullName(storedFullName || null);
      setPhoneNumber(storedPhoneNumber || null);
      setUserImageUrl(storedUserImageUrl || null);
      setGender(storedGender ?? "Male"); // Set gender from localStorage, default to "Male"
    }
  }, []);

  const login = (userId: string, email: string, name: string, phoneNumber: string, userImageUrl?: string | null, gender?: "Male" | "Female" | null) => {
    // Note: This login function is currently using sample data in login page. We will update this later.
    setIsLoggedIn(true);
    setUserId(userId);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setUserImageUrl(userImageUrl || null);
    setGender(gender ?? "Male"); // Set gender on login, default to "Male"
    setFullName(name); // Assuming 'name' parameter in login will correspond to 'fullName'
     localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
    if (userImageUrl) localStorage.setItem('userImageUrl', userImageUrl);
    if (gender) localStorage.setItem('gender', gender);
    else localStorage.removeItem('gender'); // Remove gender from localStorage if not provided
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setFullName(null);
    setPhoneNumber(null);
    setUserImageUrl(null);
    setGender(null); // Clear gender state on logout
    // Remove from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email'); // Corrected: Was removing 'fullName' twice, should remove 'email'
    localStorage.removeItem('email');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('userImageUrl');
    localStorage.removeItem('gender');
  };

  const signup = (userId: string, email: string, fullName: string, password: string, phoneNumber: string, userImageUrl?: string | null, gender?: "Male" | "Female" | null) => {
    // In a real application, you would send user data to a backend for registration,
    // and handle the password securely (hashing, etc.).
    // For this example, we'll simulate a successful signup by setting context state and localStorage.

    setIsLoggedIn(true); // Simulate immediate login after signup
    // Set all the collected data from signup to state and localStorage
    setUserId(userId);
    setEmail(email);
    setFullName(fullName);
    setPhoneNumber(phoneNumber);
    setUserImageUrl(userImageUrl || null);
    setGender(gender ?? "Male");

    // Persist data to localStorage (Note: Not secure for production passwords)
    // We don't store the password here.
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
    if (userImageUrl !== null && userImageUrl !== undefined) localStorage.setItem('userImageUrl', userImageUrl);
    if (gender) localStorage.setItem('gender', gender); // Only store if gender is not null
  };
 const updateProfile = (updates: Partial<{ userId: string; fullName: string; email: string; phoneNumber: string; userImageUrl: string | null; gender: "Male" | "Female" | null }>) => {
    if (updates.userId !== undefined) {
      setUserId(updates.userId);
      localStorage.setItem('userId', updates.userId);
    }
    if (updates.fullName !== undefined) {
      setFullName(updates.fullName);
      localStorage.setItem('fullName', updates.fullName);
    }
    if (updates.email !== undefined) {
      setEmail(updates.email);
      localStorage.setItem('email', updates.email);
    }
    if (updates.phoneNumber !== undefined) {
      setPhoneNumber(updates.phoneNumber);
      localStorage.setItem('phoneNumber', updates.phoneNumber);
    }
    // Handle userImageUrl updates: set if string, remove if null or undefined
 if (updates.userImageUrl !== undefined) {
      setUserImageUrl(updates.userImageUrl);
      if (updates.userImageUrl !== null) localStorage.setItem('userImageUrl', updates.userImageUrl);
      else localStorage.removeItem('userImageUrl');
    }
    if (updates.gender !== undefined) {
      setGender(updates.gender);
      if (updates.gender) localStorage.setItem('gender', updates.gender);
      else localStorage.removeItem('gender');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, fullName, email, phoneNumber, userImageUrl, gender, login, logout, updateProfile, signup: signup as any }}>
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
