import { Footer } from "@/components/layout/Footer";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import React from "react";

import { AuthProvider } from '@/context/AuthContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 return (<AuthProvider><React.Fragment><Header></Header><main className="flex-grow container mx-auto px-4 py-8"><Suspense fallback={<div>Loading...</div>}>{children}</Suspense></main><Footer></Footer></React.Fragment></AuthProvider>);
}
