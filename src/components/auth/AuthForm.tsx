gitgit
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { useToast } from "@/components/ui/use-toast"; // Import useToast

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
type LoginFormData = z.infer<typeof loginSchema>;

// Signup Schema - Removed name and confirmPassword for simplicity as requested
const signupSchema = z.object({
 email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters."),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type SignupFormData = z.infer<typeof signupSchema>;

export function AuthForm() {
  const { toast } = useToast();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
 defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const handleAuthError = (error: AuthError) => {
    console.error("Firebase Auth Error:", error);
    let errorMessage = "An unexpected error occurred. Please try again.";
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        errorMessage = "Invalid email or password.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak. It should be at least 6 characters.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address format.";
        break;
      default:
        errorMessage = error.message; // Use Firebase's message for other errors
    }
    toast({
      variant: "destructive",
      title: "Authentication Failed",
      description: errorMessage,
    });
  };

  const onLoginSubmit: SubmitHandler<LoginFormData> = async (data) => { 
    setIsLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      loginForm.reset();
    } catch (error) {
      handleAuthError(error as AuthError);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const onSignupSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsSignupLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Signup Successful",
        description: "Welcome! Your account has been created.",
      });
      signupForm.reset();
    } catch (error) {
      handleAuthError(error as AuthError);
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <Tabs defaultValue="login" className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center text-primary mb-2">Welcome to AquaVenture!</CardTitle>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>

        <TabsContent value="login" className="pt-0">
          <CardContent className="space-y-4">
            <CardDescription className="text-center">
              Access your account to continue shopping.
            </CardDescription>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} disabled={isLoginLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isLoginLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoginLoading}>
                  {isLoginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>

        <TabsContent value="signup" className="pt-0">
          <CardContent className="space-y-4">
             <CardDescription className="text-center">
              Create an account to get started.
            </CardDescription>
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-5">
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} disabled={isSignupLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isSignupLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isSignupLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSignupLoading}>
                  {isSignupLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
