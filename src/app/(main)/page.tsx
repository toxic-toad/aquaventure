
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { ArrowRight, Fish, Mail } from 'lucide-react';
import type { Metadata } from 'next';

async function getFeaturedProducts(count: number = 4): Promise<Product[]> {
  return mockProducts.slice(0, count);
}

async function getFeaturedCategories(count: number = 3): Promise<{ name: string; count: number }[]> {
  const categoryCounts: Record<string, number> = {};
  const uniqueCategories: string[] = [];

  mockProducts.forEach(product => {
    if (!categoryCounts[product.category]) {
      uniqueCategories.push(product.category);
    }
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });

  return uniqueCategories
    .slice(0, count)
    .map(name => ({ name, count: categoryCounts[name] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const metadata: Metadata = {
  title: 'Welcome to AquaVenture! | Your Premier Aquarium Store',
  description: 'Discover premium aquarium supplies, fish, plants, and expert advice. Create your dream underwater world with AquaVenture.',
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(4);
  const featuredCategories = await getFeaturedCategories(3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-10">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden shadow-xl min-h-[360px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1200x500.png"
            alt="A beautiful vibrant aquarium with colorful fish and lush green plants"
            fill
            className="object-cover"
            priority
            data-ai-hint="vibrant aquarium"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-10 sm:py-12 md:py-24 text-center text-white z-10">
          <Fish className="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 mb-3 sm:mb-4 text-accent" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Your Aquatic Paradise Awaits
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-xl md:max-w-3xl mx-auto text-gray-200">
            Dive into our world of premium aquarium supplies, expert advice, and everything you need to create a thriving underwater ecosystem.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-6">
            <Link href="/categories">
              Explore Our Categories <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Categories Section */}
      {featuredCategories.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-primary">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredCategories.map(category => (
              <CategoryCard key={category.name} categoryName={category.name} productCount={category.count} />
            ))}
          </div>
           <div className="text-center mt-8 sm:mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-primary">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
           <div className="text-center mt-8 sm:mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories">
                Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}
      
      {/* Contact Us Callout */}
      <section className="container mx-auto px-4">
        <div className="bg-secondary/50 p-6 sm:p-8 md:p-12 rounded-lg shadow-md text-center">
          <Mail className="mx-auto h-10 w-10 sm:h-12 sm:w-12 mb-4 text-accent" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-primary">Have Questions? Contact Us!</h2>
          <p className="text-foreground/80 mb-6 sm:mb-8 max-w-lg md:max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            Our team is here to help you with any inquiries about our products, your orders, or aquarium advice.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">
              Get In Touch
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
