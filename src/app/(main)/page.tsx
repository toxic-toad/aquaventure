
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { ArrowRight, Fish, Mail } from 'lucide-react'; // Changed Sparkles to Mail
import type { Metadata } from 'next';

// This function would typically fetch data from a database or API
async function getFeaturedProducts(count: number = 4): Promise<Product[]> {
  // For now, just return a slice of mock products
  return mockProducts.slice(0, count);
}

// This function would typically fetch data from a database or API
async function getFeaturedCategories(count: number = 3): Promise<{ name: string; count: number }[]> {
  const categoryCounts: Record<string, number> = {};
  const uniqueCategories: string[] = [];

  // First, get all unique categories and their counts
  mockProducts.forEach(product => {
    if (!categoryCounts[product.category]) {
      uniqueCategories.push(product.category);
    }
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });

  // Then, slice to get the desired number of featured categories and sort them
  return uniqueCategories
    .slice(0, count)
    .map(name => ({ name, count: categoryCounts[name] }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort featured categories alphabetically
}

export const metadata: Metadata = {
  title: 'Welcome to AquaVenture! | Your Premier Aquarium Store',
  description: 'Discover premium aquarium supplies, fish, plants, and expert advice. Create your dream underwater world with AquaVenture.',
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(4);
  const featuredCategories = await getFeaturedCategories(3);

  return (
    <div className="space-y-16 pb-10">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden shadow-xl min-h-[400px] md:min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1200x500.png"
            alt="A beautiful vibrant aquarium with colorful fish and lush green plants"
            fill
            className="object-cover"
            priority
            data-ai-hint="vibrant aquarium"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" /> {/* Darker overlay at bottom for text */}
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-24 text-center text-white z-10">
          <Fish className="mx-auto h-12 w-12 sm:h-16 sm:w-16 mb-4 text-accent" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Your Aquatic Paradise Awaits
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200">
            Dive into our world of premium aquarium supplies, expert advice, and everything you need to create a thriving underwater ecosystem.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
            <Link href="/categories">
              Explore Our Categories <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Categories Section */}
      {featuredCategories.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map(category => (
              <CategoryCard key={category.name} categoryName={category.name} productCount={category.count} />
            ))}
          </div>
           <div className="text-center mt-10">
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
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
           <div className="text-center mt-10">
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
        <div className="bg-secondary/50 p-8 md:p-12 rounded-lg shadow-md text-center">
          <Mail className="mx-auto h-12 w-12 mb-4 text-accent" /> {/* Changed icon */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Have Questions? Contact Us!</h2>
          <p className="text-foreground/80 mb-8 max-w-xl mx-auto text-lg">
            Our team is here to help you with any inquiries about our products, your orders, or aquarium advice.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact"> {/* Link to a potential contact page */}
              Get In Touch
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
