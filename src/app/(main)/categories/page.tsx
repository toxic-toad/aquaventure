
import { CategoryCard } from '@/components/categories/CategoryCard';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import type { Metadata } from 'next';

async function getCategoriesWithCounts(): Promise<{ name: string; count: number }[]> {
  const categoryCounts: Record<string, number> = {};
  mockProducts.forEach(product => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort categories alphabetically
}

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Shop by Category</h1>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.name} categoryName={category.name} productCount={category.count} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No product categories found.</p>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Product Categories | AquaVenture',
  description: 'Browse all product categories available at AquaVenture.',
};
