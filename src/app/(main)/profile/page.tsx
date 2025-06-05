'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Assuming you have a Form component
import { zodResolver } from '@hookform/resolvers/zod'; // Assuming zod and react-hook-form are used
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming you have Card components

// Define a schema for your form data
const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal('')), // Make email optional but validate if provided
  gender: z.string().optional().or(z.literal('')), // Make gender optional
  phoneNumber: z.string().optional().or(z.literal('')), // Make phone number optional
  userImageUrl: z.string().optional().or(z.literal('')), // Placeholder for image URL
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { isLoggedIn, username, email, phoneNumber, userImageUrl, gender, updateProfile, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      username: username || '',
      gender: gender || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
      userImageUrl: userImageUrl || '',
    },
  });

  useEffect(() => {
    // Set form default values once user data is loaded from context and auth is not loading
    if (!authLoading && isLoggedIn) {
      form.reset({
        username: username || '',
        email: email || '',
        phoneNumber: phoneNumber || '',
        userImageUrl: userImageUrl || '',
        gender: gender || '',
      });
      setLoading(false); // Set loading to false after initial load and data is available
    }
    if (!authLoading && !isLoggedIn) {
      setLoading(false); // Set loading to false if not logged in
    }
  }, [isLoggedIn, username, email, phoneNumber, userImageUrl, gender, authLoading, form]);


  async function onSubmit(values: ProfileFormValues) {
    updateProfile({
      username: values.username,
      email: values.email || null, // Ensure null if empty string
      gender: values.gender || null, // Ensure null if empty string
      phoneNumber: values.phoneNumber || null, // Ensure null if empty string
      userImageUrl: values.userImageUrl || null, // Ensure null if empty string
    });
    setIsEditing(false); // Exit editing mode after saving
  }

  if (loading || authLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-background text-foreground">Loading profile...</div>;
  }

  if (!isLoggedIn && !loading && !authLoading) {
      return <div className="container mx-auto px-4 py-8 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="w-full bg-card text-card-foreground shadow-lg">
        <CardHeader className="text-center border-b border-border">
          <CardTitle className="text-3xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-8">
            {userImageUrl ? (
              <img src={userImageUrl} alt={`${username}'s profile`} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary shadow-md" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4 border-4 border-border shadow-md">
                <User size={64} />
              </div>
            )}
            {/* Display username outside form when not editing and logged in */}
             {!isEditing && <p className="text-xl font-semibold text-primary-foreground">{username}</p>}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {isEditing ? (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Your username" {...field} className="bg-input text-foreground border-border focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} className="bg-background text-foreground border-border" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
 control={form.control}
 name="gender"
 render={({ field }) => (
 <FormItem>
 <FormLabel>Gender</FormLabel>
 <FormControl>
 <Input placeholder="Your gender" {...field} className="bg-input text-foreground border-border focus:ring-2 focus:ring-primary focus:border-transparent" />
 </FormControl>
 <FormMessage />
 </FormItem>
 )}
 />
              <FormField
 control={form.control}
 name="phoneNumber"
 render={({ field }) => (
 <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your phone number" {...field} className="bg-input text-foreground border-border focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {/* Optional: Field for user image URL if you want to allow updating it */}
               {/* <FormField
                control={form.control}
                name="userImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="Image URL" {...field} className="bg-input text-foreground border-border focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => {
                     setIsEditing(false);
                     // Reset form to current context values if cancelling edit
                     form.reset({
                        username: username || '',
                        email: email || '',
                        phoneNumber: phoneNumber || '',
                        userImageUrl: userImageUrl || '',
 gender: gender || '',
                     });
                }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </>
          ) : (
             <div className="space-y-4 text-foreground">
                <div className="border-t border-border pt-4">
                  <p className="text-lg font-semibold mb-2">Details:</p>
                  <p><strong>Email:</strong> {email || 'N/A'}</p>
                  <p><strong>Gender:</strong> {gender || 'N/A'}</p>
                  <p><strong>Phone Number:</strong> {phoneNumber || 'N/A'}</p>
                  {/* Optional: Display Image URL if available */}
                  {/* {userImageUrl && <p><strong>Image URL:</strong> {userImageUrl}</p>} */}
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
             </div>
          )}
        </form>
        </CardContent>
      </Card>
    </div>
  );
}