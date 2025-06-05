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

// Define a schema for your form data
const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal('')), // Make email optional but validate if provided
  phoneNumber: z.string().optional().or(z.literal('')), // Make phone number optional
  userImageUrl: z.string().optional().or(z.literal('')), // Placeholder for image URL
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { isLoggedIn, username, email, phoneNumber, userImageUrl, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      username: username || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
      userImageUrl: userImageUrl || '',
    },
  });

  useEffect(() => {
    // Set form default values once user data is loaded from context
    if (!loading && isLoggedIn) {
      form.reset({
        username: username || '',
        email: email || '',
        phoneNumber: phoneNumber || '',
        userImageUrl: userImageUrl || '',
      });
    }
     if (!isLoggedIn) {
        // Redirect or show a message if not logged in
        // Example: router.push('/login');
     }
     setLoading(false); // Set loading to false after initial load
  }, [isLoggedIn, username, email, phoneNumber, userImageUrl, loading, form]);


  async function onSubmit(values: ProfileFormValues) {
    // Call the updateProfile function from context
    updateProfile({
      username: values.username,
      email: values.email || null, // Ensure null if empty string
      phoneNumber: values.phoneNumber || null, // Ensure null if empty string
      userImageUrl: values.userImageUrl || null, // Ensure null if empty string
    });
    setIsEditing(false); // Exit editing mode after saving
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading profile...</div>;
  }

  if (!isLoggedIn) {
      return <div className="container mx-auto px-4 py-8 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-primary-foreground">User Profile</h1>

      <div className="flex flex-col items-center mb-6">
        {userImageUrl ? (
          <img src={userImageUrl} alt={`${username}'s profile`} className="w-32 h-32 rounded-full object-cover mb-4" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
            <User size={64} />
          </div>
        )}
        {/* Display username outside form when not editing */}
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
                    <FormLabel className="text-primary-foreground">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your username" {...field} className="bg-background text-foreground border-border" />
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
                    <FormLabel className="text-primary-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} className="bg-background text-foreground border-border" />
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
                    <FormLabel className="text-primary-foreground">Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your phone number" {...field} className="bg-background text-foreground border-border" />
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
                    <FormLabel className="text-primary-foreground">Profile Image URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="Image URL" {...field} className="bg-background text-foreground border-border" />
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
             // Display user details when not editing
            <div className="space-y-4 text-primary-foreground">
                <p><strong>Email:</strong> {email || 'N/A'}</p>
                <p><strong>Phone Number:</strong> {phoneNumber || 'N/A'}</p>
                {/* Optional: Display Image URL if available */}
                {/* {userImageUrl && <p><strong>Image URL:</strong> {userImageUrl}</p>} */}
                <div className="flex justify-end">
                     <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}