'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    // Optionally, add a visual confirmation like a toast notification here
    // For now, relies on cart icon update
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={`${product.category} ${product.brand}`}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
          {product.description.substring(0, 70)}{product.description.length > 70 ? '...' : ''}
        </CardDescription>
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={handleAddToCart} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <ShoppingCart size={18} className="mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
