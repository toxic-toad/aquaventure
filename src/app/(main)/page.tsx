import { ProductGrid } from '@/components/products/ProductGrid';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Welcome to AquaVenture!</h1>
      <p className="text-lg text-center mb-10 text-foreground/80">Discover the best products for your aquarium.</p>
      <ProductGrid />
    </div>
  );
}
