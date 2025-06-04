
'use client';

import React, { useState, useMemo } from 'react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { mockProducts } from '@/data/products'; // Using mock products for now

export function ProductGrid() {
  const [products] = useState<Product[]>(mockProducts); // In a real app, this would be fetched
  const [filters, setFilters] = useState({ category: 'all', brand: 'all' });
  const [sortKey, setSortKey] = useState('default');

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let P_S_products = [...products];

    // Filtering
    if (filters.category !== 'all') {
      P_S_products = P_S_products.filter(p => p.category === filters.category);
    }
    if (filters.brand !== 'all') {
      P_S_products = P_S_products.filter(p => p.brand === filters.brand);
    }

    // Sorting
    switch (sortKey) {
      case 'price-asc':
        P_S_products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        P_S_products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        P_S_products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        P_S_products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sort (e.g., by ID or original order)
        P_S_products.sort((a,b) => parseInt(a.id) - parseInt(b.id));
        break;
    }
    return P_S_products;
  }, [products, filters, sortKey]);

  return (
    <div>
      <ProductFilters
        products={products}
        categories={categories}
        brands={brands}
        onFilterChange={setFilters}
        onSortChange={setSortKey}
        currentFilters={filters}
        currentSortKey={sortKey}
      />
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
