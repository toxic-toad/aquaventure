'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User, CircleUser } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FemaleAvatar from '@/components/ui/female-avatar';
import MaleAvatar from '@/components/ui/male-avatar';

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal('')),
  phoneNumber: z.string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." })
    .optional().or(z.literal('')),
  userImageUrl: z.string().optional().or(z.literal('')),
  gender: z.enum(["Male", "Female"]).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { isLoggedIn, username, email, phoneNumber, userImageUrl, gender, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      username: username || '',
      email: email || 'sample@example.com',
      phoneNumber: phoneNumber || '0000000000',
      userImageUrl: userImageUrl || undefined,
      gender: gender || undefined,
    },
  });

  useEffect(() => {
    if (!loading && isLoggedIn) {
      form.reset({
        username: username || '',
        email: email || 'sample@example.com',
        phoneNumber: phoneNumber || '0000000000',
        userImageUrl: userImageUrl || undefined,
        gender: gender || undefined,
      });
    }
     if (!isLoggedIn) {
     }
     setLoading(false);
  }, [isLoggedIn, username, email, phoneNumber, userImageUrl, gender, loading, form]);


  async function onSubmit(values: ProfileFormValues) {
    updateProfile({
      username: values.username,
      email: values.email || undefined,
      phoneNumber: values.phoneNumber || undefined,
      userImageUrl: values.userImageUrl || undefined,
      gender: values.gender || undefined,
    });
    setIsEditing(false);
  }


  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading profile...</div>;
  }

  if (!isLoggedIn) {
      return <div className="container mx-auto px-4 py-8 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            {userImageUrl ? (
              <img src={userImageUrl} alt={`${username}'s profile`} className="w-32 h-32 rounded-full object-cover mb-4" />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-gray-500 mb-4">
                {gender === "Female" ? (
 <FemaleAvatar width={48} height={48} />
 ) : gender === "Male" ? (
 <MaleAvatar width={48} height={48} />
                ) : (
 <User size={64} />
                )}
              </div>
            )}
             {!isEditing && <p className="text-xl font-semibold text-foreground">{username}</p>}
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
                        <FormLabel className="text-muted-foreground">Username</FormLabel>
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
                        <FormLabel className="text-muted-foreground">Email Address</FormLabel>
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
                    <FormLabel className="text-muted-foreground">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        {...field}
                        className="bg-background text-foreground border-border"
                        inputMode="numeric"
                        maxLength={10}
                        onChange={(e) => {
                          const filteredValue = e.target.value.replace(/\D/g, '');
                          field.onChange(filteredValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Field */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-muted-foreground">Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Male" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Female" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Female
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
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
                    <FormLabel className="text-muted-foreground">Profile Image URL</FormLabel>
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
                     form.reset({
                        username: username || '',
                        email: email || 'sample@example.com',
                        phoneNumber: phoneNumber || '0000000000',
                        userImageUrl: userImageUrl || undefined,
                        gender: gender || undefined,
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
            <div className="space-y-4 text-foreground">
                    <p><strong className="text-muted-foreground">Email:</strong> <span>{email || 'N/A'}</span></p>
                    <p><strong className="text-muted-foreground">Phone Number:</strong> <span>{phoneNumber || 'N/A'}</span></p>
                    {gender && <p><strong className="text-muted-foreground">Gender:</strong> <span>{gender}</span></p>}
                    {/* Optional: Display Image URL if available */}
                    {/* {userImageUrl && <p><strong>Image URL:</strong> <span>{userImageUrl}</span></p>} */}
                    <div className="flex justify-end">
                         <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}