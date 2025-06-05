
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
    setTimeout(() => setAddedToCartMessage(false), 3000); 
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stock));
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-start">
      <div className="bg-card p-3 sm:p-4 rounded-lg shadow-lg">
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

      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{product.name}</h1>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <p className="text-2xl sm:text-3xl font-semibold text-accent">${product.price.toFixed(2)}</p>
          <Badge variant={product.stock > 0 ? "default" : "destructive"} className="text-xs sm:text-sm px-2 py-0.5 sm:px-2.5 sm:py-0.5">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </Badge>
        </div>

        <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">{product.description}</p>
        
        <Separator />

        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
          <h3 className="text-base sm:text-lg font-semibold">Details:</h3>
          <p><span className="font-medium">Brand:</span> {product.brand}</p>
          <p><span className="font-medium">Category:</span> {product.category}</p>
          {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
            <p key={key}><span className="font-medium">{key}:</span> {value}</p>
          ))}
        </div>
        
        <Separator />

        {product.stock > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <div className="flex items-center border rounded-md self-start sm:self-center">
              <Button variant="ghost" size="icon" onClick={decrementQuantity} className="rounded-r-none h-10 w-10">
                <Minus size={18} />
              </Button>
              <span className="px-3 sm:px-4 w-12 text-center text-sm sm:text-base">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity} className="rounded-l-none h-10 w-10">
                <Plus size={18} />
              </Button>
            </div>
            <Button 
              onClick={handleAddToCart} 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground flex-grow"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} className="mr-2" /> Add to Cart
            </Button>
          </div>
        )}

        {addedToCartMessage && (
          <div className="mt-3 sm:mt-4 flex items-center text-green-600 bg-green-100 border border-green-300 p-2 sm:p-3 rounded-md text-sm">
            <CheckCircle size={18} className="mr-2" />
            <span>Added {quantity} x {product.name} to cart!</span>
          </div>
        )}

        {product.stock === 0 && (
           <p className="text-destructive font-semibold text-sm sm:text-base">This product is currently out of stock.</p>
        )}
      </div>
    </div>
  );
}
