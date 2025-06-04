
'use client';

import React from 'react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <PackageSearch size={64} className="mx-auto text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-4">No Products Available</h2>
        <p className="text-muted-foreground">Please check back later or try a different category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
