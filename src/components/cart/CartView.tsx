'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CartView() {
  const { state, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) { // Allow 0 to remove via input, though UI prefers buttons
      updateQuantity(productId, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any products yet.</p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Your Shopping Cart ({getTotalItems()} items)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link href={`/products/${item.id}`}>
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          width={80} 
                          height={80} 
                          className="rounded-md object-cover border"
                          data-ai-hint={`${item.category} thumbnail`}
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/products/${item.id}`} className="font-medium hover:text-primary">{item.name}</Link>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <Minus size={16} />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          min="1"
                          max={item.stock}
                          className="w-14 h-8 text-center px-1"
                        />
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                          <Plus size={16} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80">
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="shadow-lg sticky top-24">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <hr/>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-accent">${getTotalPrice().toFixed(2)}</span>
            </div>
            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4">
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
