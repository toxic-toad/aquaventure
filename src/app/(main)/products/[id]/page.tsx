import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { ProductDetailsClient } from '@/components/products/ProductDetailsClient';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// This function would typically fetch data from a database or API
async function getProductById(id: string): Promise<Product | undefined> {
  return mockProducts.find(p => p.id === id);
}

export async function generateStaticParams() {
  return mockProducts.map(product => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
        <div className="text-center py-10">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you were looking for.</p>
            <Button asChild>
                <Link href="/">
                    <ArrowLeft size={18} className="mr-2" /> Go Back to Products
                </Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <Button variant="outline" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft size={18} className="mr-2" /> Back to Products
        </Link>
      </Button>
      <ProductDetailsClient product={product} />
    </div>
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductById(params.id);
  if (!product) {
    return {
      title: 'Product Not Found | AquaVenture',
    };
  }
  return {
    title: `${product.name} | AquaVenture`,
    description: product.description.substring(0, 160),
  };
}
