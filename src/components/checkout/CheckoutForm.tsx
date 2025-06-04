'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import type { Order, CustomerDetails } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, ShoppingBag } from 'lucide-react';

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  postalCode: z.string().min(3, "Postal code is too short.").regex(/^\S+$/, "Postal code cannot contain spaces."),
  country: z.string().min(2, "Country must be at least 2 characters."),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { state, getTotalPrice, clearCart, setLastOrder } = useCart();
  
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    const order: Order = {
      id: new Date().getTime().toString(), // Simple order ID
      items: state.items,
      totalAmount: getTotalPrice(),
      customerDetails: data,
      createdAt: new Date().toISOString(),
    };

    // Simulate order processing
    console.log('Order submitted:', order);
    setLastOrder(order); // Store order details for confirmation page
    clearCart(); // Clear the cart
    router.push('/order-confirmation');
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Please add items to your cart before proceeding to checkout.</p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Shipping Details</CardTitle>
            <CardDescription>Please provide your shipping information.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl><Input placeholder="123 Aqua Street" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="Atlantis" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl><Input placeholder="12345" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl><Input placeholder="Oceania" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                 <Button type="submit" size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                  Place Order <ArrowRight size={18} className="ml-2" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      <div className="md:col-span-1">
        <Card className="shadow-lg sticky top-24">
            <CardHeader>
                <CardTitle className="text-xl text-primary">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {state.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <div>
                            <p className="font-medium">{item.name} <span className="text-muted-foreground">x {item.quantity}</span></p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <hr className="my-3"/>
                <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p className="text-accent">${getTotalPrice().toFixed(2)}</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
