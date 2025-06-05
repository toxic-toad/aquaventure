
'use client';

import Link from 'next/link'; // User icon added back
import { ShoppingBag, Home, List, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const { getTotalItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalItems = getTotalItems();
  const isLoggedIn = false; // Placeholder: Replace with actual login status check
  const userImage = null; // Placeholder: Replace with actual user image URL if available
  const username = "Admin User"; // Placeholder: Replace with actual logged in username

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-accent">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm3.5-4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm2.5 4.5c0-1.93-1.57-3.5-3.5-3.5S7.5 9.07 7.5 11c0 1.06.47 2.02 1.23 2.69l.76.67.01.01c.82.73 1.96 1.13 3.16 1.13s2.34-.4 3.16-1.13l.01-.01.76-.67c.76-.67 1.23-1.63 1.23-2.69zM12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
          </svg>
          AquaVenture
        </Link>
        <nav className="space-x-1 md:space-x-2 flex items-center">
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
            <Link href="/" className="flex items-center gap-1">
              <Home size={18} /> <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
            <Link href="/categories" className="flex items-center gap-1">
              <List size={18} /> <span className="hidden sm:inline">Categories</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
            <Link href="/cart" className="relative flex items-center gap-1">
              <ShoppingBag size={18} /> <span className="hidden sm:inline">Cart</span>
              {isClient && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          <div className="flex items-center ml-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    {userImage ? (
                      <img src={userImage} alt="User" className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <User size={24} className="text-primary-foreground" />
                    )}
                    <span className="ml-2 text-primary-foreground hidden sm:inline">{username}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Go to Profile</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              <>
                <User size={24} className="text-primary-foreground" />
                <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3 ml-1">
                  <Link href="/login" className="flex items-center gap-1">
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
