
import { ProductGrid } from '@/components/products/ProductGrid';
import { mockProducts } from '@/data/products'; // Using mock products for now
import type { Product } from '@/types';

// This function would typically fetch data from a database or API
async function getAllProducts(): Promise<Product[]> {
  // For now, just return mock products
  return mockProducts;
}

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Welcome to AquaVenture!</h1>
      <p className="text-lg text-center mb-10 text-foreground/80">Discover the best products for your aquarium.</p>
      <ProductGrid products={products} />
    </div>
  );
}
