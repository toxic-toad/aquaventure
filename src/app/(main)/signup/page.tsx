'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; // Assuming AuthContext will be updated with signup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react'; // Using User icon for default image representation, CircleUser removed as not used
import { CameraIcon } from 'lucide-react';
import FemaleAvatar from '@/components/ui/female-avatar';
import MaleAvatar from '@/components/ui/male-avatar';

const signupFormSchema = z.object({
  userId: z.string().min(4, {
    message: "User ID must be at least 4 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(1, {
    message: "Name cannot be blank.",
  }),
  password: z.string()
  .min(8, { message: 'Password must be at least 8 characters.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character.' }),
phoneNumber: z.string()
  .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." })
  .optional().or(z.literal('')), // Making phone number optional
userImageUrl: z.string().optional().default('https://lucide.dev/icons/user'),
// gender is required for signup with a default value
gender: z.enum(["Male", "Female"]),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function SignupPage() {
  const { signup } = useAuth(); // Assuming signup function is added to AuthContext
  const [isSigningUp, setIsSigningUp] = useState(false);  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
    defaultValues: {
      userId: '',
      email: '',
      name: '',
      password: '',
      gender: "Male",
      phoneNumber: '', // Add phone number field with default empty string
    },
  });

  const currentGender = form.watch('gender'); // Watch gender after form is initialized

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  async function onSubmit(values: SignupFormValues) {
    setIsSigningUp(true);
    // Placeholder for signup logic using AuthContext.signup
    console.log("Signup values:", values);
    // await signup(values.userId, values.email, values.name, values.password, values.userImageUrl, values.gender);
    setIsSigningUp(false); // Set loading to false after signup attempt
    // Add redirection or success message after signup
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col items-center mb-6">
            <input
              type="file"
              id="user-image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {/* Wrap the image area in a div to control click behavior */}
             <div
              className="relative w-32 h-32 rounded-full overflow-hidden mb-4 cursor-pointer"
              onClick={() => document.getElementById('user-image-upload')?.click()}>
              {imagePreviewUrl ? (
                               <Image src={imagePreviewUrl} alt="User preview" layout="fill" objectFit="cover" className="z-0" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                  {currentGender === 'Female' ? (
                                    <FemaleAvatar width={32} height={32} />
                                  ) : (
                                    <MaleAvatar width={32} height={32} />
                                  )}
                                  </div>
             )}
             {/* Camera icon overlay */}
             <div className="absolute inset-0 flex items-center justify-center text-white opacity-100 transition-opacity z-10 bg-black bg-opacity-40">
               <CameraIcon size={48} />
             </div>
           </div>
             <p className="text-xl font-semibold text-foreground">New User</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">User ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Choose a User ID" {...field} className="bg-background text-foreground border-border" />
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
                        <Input type="email" placeholder="Enter your email" {...field} className="bg-background text-foreground border-border" />
                      </FormControl>
                      <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} className="bg-background text-foreground border-border" />
                      </FormControl>
                      <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Choose a password" {...field} className="bg-background text-foreground border-border" />
                      </FormControl>
                      <FormMessage />
                </FormItem>
              )}
            />
             {/* Phone Number Field (Optional) */}
             <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        {...field}
                        className="bg-background text-foreground border-border"
                        inputMode="numeric"
                        maxLength={10}
                         onChange={(e) => {
                          const filteredValue = e.target.value.replace(/\\D/g, '');
                          field.onChange(filteredValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            {/* Gender Field (Required with Default) */}
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

              <div className="flex justify-end">
                <Button type="submit" disabled={isSigningUp}>
                  {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}