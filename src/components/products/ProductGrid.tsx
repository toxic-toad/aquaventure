
'use client';

import React, { useState, useMemo } from 'react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { mockProducts } from '@/data/products'; // Using mock products for now
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageSearch } from 'lucide-react';

export function ProductGrid() {
  const [products] = useState<Product[]>(mockProducts); 

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    // Ensure a consistent order for categories, e.g., alphabetical
    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [products]);

  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || '');

  // Effect to set active category if categories load after initial render (more relevant for async data)
  // For static mockProducts, categories[0] should be fine, but this is robust.
  React.useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <PackageSearch size={64} className="mx-auto text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-4">No Products Available</h2>
        <p className="text-muted-foreground">Please check back later.</p>
      </div>
    );
  }
  
  if (categories.length === 0) {
     return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">No product categories found.</p>
      </div>
    );
  }

  return (
    <div>
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="whitespace-nowrap">
              {category}
            </TabsTrigger>
          ))}
        </TabsList
        >
        {categories.map((category) => {
          const productsInCategory = products.filter(p => p.category === category);
          return (
            <TabsContent key={category} value={category} className="mt-6">
              {productsInCategory.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                  {productsInCategory.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <PackageSearch size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">No products found in this category.</p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
