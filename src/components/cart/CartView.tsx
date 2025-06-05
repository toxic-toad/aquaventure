
'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export function CartView() {
  const { state, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) { 
      updateQuantity(productId, newQuantity);
    }
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart size={56} className="mx-auto text-muted-foreground mb-6" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">Looks like you haven't added any products yet.</p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-primary">Your Shopping Cart ({getTotalItems()} items)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-2">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[70px] sm:w-[90px] px-2 py-3 md:px-4 md:py-4">Product</TableHead>
                    <TableHead className="px-2 py-3 md:px-4 md:py-4">Details</TableHead>
                    <TableHead className="text-center px-2 py-3 md:px-4 md:py-4">Quantity</TableHead>
                    <TableHead className="text-right px-2 py-3 md:px-4 md:py-4">Price</TableHead>
                    <TableHead className="text-right px-2 py-3 md:px-4 md:py-4">Total</TableHead>
                    <TableHead className="text-center px-2 py-3 md:px-4 md:py-4">Remove</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="px-2 py-3 md:px-4 md:py-4">
                        <Link href={`/products/${item.id}`}>
                          <Image 
                            src={item.imageUrl} 
                            alt={item.name} 
                            width={60} 
                            height={60} 
                            className="rounded-md object-cover border"
                            data-ai-hint={`${item.category} thumbnail`}
                          />
                        </Link>
                      </TableCell>
                      <TableCell className="px-2 py-3 md:px-4 md:py-4 min-w-[150px]">
                        <Link href={`/products/${item.id}`} className="font-medium hover:text-primary text-sm sm:text-base">{item.name}</Link>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.brand}</p>
                      </TableCell>
                      <TableCell className="text-center px-2 py-3 md:px-4 md:py-4">
                        <div className="flex items-center justify-center space-x-1">
                          <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus size={14} />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            min="1"
                            max={item.stock}
                            className="w-10 h-7 text-center px-1 text-sm sm:w-12 sm:h-8 sm:text-base"
                          />
                          <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                            <Plus size={14} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-2 py-3 md:px-4 md:py-4 text-sm sm:text-base">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium px-2 py-3 md:px-4 md:py-4 text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-center px-2 py-3 md:px-4 md:py-4">
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80 h-7 w-7 sm:h-8 sm:w-8">
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="shadow-lg sticky top-24">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl text-primary">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <hr/>
            <div className="flex justify-between font-bold text-base sm:text-lg">
              <span>Total</span>
              <span className="text-accent">${getTotalPrice().toFixed(2)}</span>
            </div>
            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-3 sm:mt-4">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
