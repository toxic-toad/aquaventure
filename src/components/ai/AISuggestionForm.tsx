'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { productSuggestion } from '@/ai/flows/product-suggestion';
import type { AIProductSuggestion } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { AISuggestionResults } from './AISuggestionResults';

const formSchema = z.object({
  aquariumSize: z.string().min(1, { message: "Aquarium size is required." }).describe('The size of the aquarium in gallons (e.g., "20 gallons")'),
});

type FormData = z.infer<typeof formSchema>;

export function AISuggestionForm() {
  const [suggestions, setSuggestions] = useState<AIProductSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aquariumSize: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await productSuggestion({ aquariumSize: data.aquariumSize });
      setSuggestions(result.suggestions);
    } catch (e) {
      console.error("Error getting AI suggestions:", e);
      setError('Failed to get suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">AI Product Suggester</CardTitle>
        <CardDescription>Enter your aquarium size (e.g., "10 gallons", "75L") and get tailored product suggestions.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="aquariumSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aquarium Size</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 20 gallons" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Suggestions...
                </>
              ) : (
                'Get Suggestions'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      {error && <p className="text-destructive p-4 text-center">{error}</p>}
      
      {suggestions.length > 0 && !isLoading && (
        <div className="p-4 border-t">
          <AISuggestionResults suggestions={suggestions} />
        </div>
      )}
    </Card>
  );
}
