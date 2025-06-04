'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Printer, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderConfirmationPage() {
  const { state } = useCart();
  const router = useRouter();
  const { lastOrder } = state;

  useEffect(() => {
    if (!lastOrder) {
      // If no order details are found (e.g. page refresh or direct access), redirect to home
      router.replace('/');
    }
  }, [lastOrder, router]);

  if (!lastOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <ShoppingBag size={64} className="text-muted-foreground mb-4" />
        <p className="text-xl text-muted-foreground">Loading order details or no order found...</p>
        <p className="text-sm text-muted-foreground mt-2">Redirecting to homepage...</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };
  
  const orderDate = new Date(lastOrder.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });


  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center bg-primary/10 p-8">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Order Confirmed!</CardTitle>
          <CardDescription className="text-lg mt-2">Thank you for your purchase, {lastOrder.customerDetails.name}.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-primary/90">Order Summary (ID: {lastOrder.id})</h3>
            <p className="text-sm text-muted-foreground">Placed on: {orderDate}</p>
            <div className="mt-4 space-y-3 border-t border-b py-4">
              {lastOrder.items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      width={50} 
                      height={50} 
                      className="rounded border object-cover"
                      data-ai-hint={`${item.category} small`}
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-xl mt-4">
              <p>Total Amount:</p>
              <p className="text-accent">${lastOrder.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-primary/90">Shipping To:</h3>
            <p>{lastOrder.customerDetails.name}</p>
            <p>{lastOrder.customerDetails.address}</p>
            <p>{lastOrder.customerDetails.city}, {lastOrder.customerDetails.postalCode}</p>
            <p>{lastOrder.customerDetails.country}</p>
            <p>Email: {lastOrder.customerDetails.email}</p>
          </div>
          
          <p className="text-sm text-center text-muted-foreground">
            You will receive an email confirmation shortly with your order details and tracking information (simulated).
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 p-6 border-t">
          <Button onClick={handlePrint} variant="outline">
            <Printer size={18} className="mr-2" /> Print Confirmation
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/">
              <ShoppingBag size={18} className="mr-2" /> Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Removed metadata export as this is a Client Component
// export const metadata = {
//   title: 'Order Confirmation | AquaVenture',
//   description: 'Your AquaVenture order has been confirmed.',
// };
