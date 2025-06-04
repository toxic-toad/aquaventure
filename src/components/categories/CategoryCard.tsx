
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// ArrowRight is no longer needed
// import { ArrowRight } from 'lucide-react'; 

interface CategoryCardProps {
  categoryName: string;
  productCount: number;
}

export function CategoryCard({ categoryName, productCount }: CategoryCardProps) {
  const placeholderImage = `https://placehold.co/600x400.png?text=${encodeURIComponent(categoryName)}`;
  // Create a simple slug for data-ai-hint
  const hintSlug = categoryName.toLowerCase().replace(/\s+/g, '-').split('-').slice(0,2).join(' ');


  return (
    <Link href={`/products/category/${encodeURIComponent(categoryName.toLowerCase())}`} passHref>
      <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg group cursor-pointer">
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full">
            <Image
              src={placeholderImage}
              alt={categoryName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={hintSlug}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <div>
            <CardTitle className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{categoryName}</CardTitle>
            <p className="text-sm text-muted-foreground">{productCount} product{productCount !== 1 ? 's' : ''}</p>
          </div>
          {/* The explicit "View Products" link with ArrowRight has been removed. 
              The entire card is a link, and hover effects (shadow, title color) indicate interactivity. */}
        </CardContent>
      </Card>
    </Link>
  );
}
