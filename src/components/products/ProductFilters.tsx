'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Product } from '@/types';

interface ProductFiltersProps {
  products: Product[];
  categories: string[];
  brands: string[];
  onFilterChange: (filters: { category: string; brand: string }) => void;
  onSortChange: (sortKey: string) => void;
  currentFilters: { category: string; brand: string };
  currentSortKey: string;
}

export function ProductFilters({
  categories,
  brands,
  onFilterChange,
  onSortChange,
  currentFilters,
  currentSortKey,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <Label htmlFor="category-filter" className="block text-sm font-medium mb-1">Category</Label>
          <Select
            value={currentFilters.category}
            onValueChange={(value) => onFilterChange({ ...currentFilters, category: value })}
          >
            <SelectTrigger id="category-filter" className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="brand-filter" className="block text-sm font-medium mb-1">Brand</Label>
          <Select
            value={currentFilters.brand}
            onValueChange={(value) => onFilterChange({ ...currentFilters, brand: value })}
          >
            <SelectTrigger id="brand-filter" className="w-full">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sort-filter" className="block text-sm font-medium mb-1">Sort By</Label>
          <Select value={currentSortKey} onValueChange={onSortChange}>
            <SelectTrigger id="sort-filter" className="w-full">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
