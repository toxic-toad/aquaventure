'use client';

import Image from 'next/image';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Minus, Plus, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCartMessage, setAddedToCartMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCartMessage(true);
    setTimeout(() => setAddedToCartMessage(false), 3000); // Message disappears after 3 seconds
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stock));
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div className="bg-card p-4 rounded-lg shadow-lg">
        <div className="aspect-square relative w-full overflow-hidden rounded-md">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            data-ai-hint={`${product.category} ${product.brand} detail`}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary">{product.name}</h1>
        
        <div className="flex items-center gap-4">
          <p className="text-3xl font-semibold text-accent">${product.price.toFixed(2)}</p>
          <Badge variant={product.stock > 0 ? "default" : "destructive"} className="text-sm">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </Badge>
        </div>

        <p className="text-foreground/80 leading-relaxed">{product.description}</p>
        
        <Separator />

        <div className="space-y-2">
          <h3 className="text-md font-semibold">Details:</h3>
          <p><span className="font-medium">Brand:</span> {product.brand}</p>
          <p><span className="font-medium">Category:</span> {product.category}</p>
          {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
            <p key={key}><span className="font-medium">{key}:</span> {value}</p>
          ))}
        </div>
        
        <Separator />

        {product.stock > 0 && (
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decrementQuantity} className="rounded-r-none">
                <Minus size={18} />
              </Button>
              <span className="px-4 w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity} className="rounded-l-none">
                <Plus size={18} />
              </Button>
            </div>
            <Button 
              onClick={handleAddToCart} 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground flex-grow sm:flex-grow-0"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} className="mr-2" /> Add to Cart
            </Button>
          </div>
        )}

        {addedToCartMessage && (
          <div className="mt-4 flex items-center text-green-600 bg-green-100 border border-green-300 p-3 rounded-md">
            <CheckCircle size={20} className="mr-2" />
            <span>Added {quantity} x {product.name} to cart!</span>
          </div>
        )}

        {product.stock === 0 && (
           <p className="text-destructive font-semibold">This product is currently out of stock.</p>
        )}
      </div>
    </div>
  );
}
