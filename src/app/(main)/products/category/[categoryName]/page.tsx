
import { ProductCard } from '@/components/products/ProductCard';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, PackageSearch } from 'lucide-react';
import type { Metadata } from 'next';

interface CategoryProductsPageProps {
  params: {
    categoryName: string;
  };
}

async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  const decodedCategoryName = decodeURIComponent(categoryName).toLowerCase();
  return mockProducts.filter(p => p.category.toLowerCase() === decodedCategoryName);
}

export async function generateStaticParams() {
  const categories = [...new Set(mockProducts.map(p => p.category.toLowerCase()))];
  return categories.map(categoryName => ({
    categoryName: encodeURIComponent(categoryName),
  }));
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const products = await getProductsByCategory(params.categoryName);
  const categoryDisplayName = decodeURIComponent(params.categoryName)
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/categories">
          <ArrowLeft size={18} className="mr-2" /> Back to Categories
        </Link>
      </Button>
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary">
        Products in: <span className="text-accent">{categoryDisplayName}</span>
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <PackageSearch size={56} className="mx-auto text-muted-foreground mb-6" />
          <p className="text-lg sm:text-xl text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: CategoryProductsPageProps): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.categoryName)
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return {
    title: `${categoryName} Products | AquaVenture`,
    description: `Browse all products in the ${categoryName} category at AquaVenture.`,
  };
}
