
'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Product } from '@/types';

interface ProductFiltersProps {
  products: Product[];
  categories: string[];
  onFilterChange: (filters: { category: string }) => void;
  currentFilters: { category: string };
}

export function ProductFilters({
  categories,
  onFilterChange,
  currentFilters,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <Label htmlFor="category-filter" className="block text-sm font-medium mb-1">Category</Label>
          <Select
            value={currentFilters.category}
            onValueChange={(value) => onFilterChange({ category: value })}
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
      </div>
    </div>
  );
}
