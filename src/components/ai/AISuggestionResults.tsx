import type { AIProductSuggestion } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ListChecks } from 'lucide-react';

interface AISuggestionResultsProps {
  suggestions: AIProductSuggestion[];
}

export function AISuggestionResults({ suggestions }: AISuggestionResultsProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-primary flex items-center">
        <ListChecks size={24} className="mr-2 text-accent" />
        Our AI Recommends:
      </h2>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="bg-background/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-primary/90">{suggestion.productName}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/80">{suggestion.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
