// src/ai/flows/product-suggestion.ts
'use server';

/**
 * @fileOverview An AI agent that suggests aquarium products based on aquarium size.
 *
 * - productSuggestion - A function that handles the product suggestion process.
 * - ProductSuggestionInput - The input type for the productSuggestion function.
 * - ProductSuggestionOutput - The return type for the productSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSuggestionInputSchema = z.object({
  aquariumSize: z
    .string()
    .describe('The size of the aquarium in gallons (e.g., "20 gallon").'),
});
export type ProductSuggestionInput = z.infer<typeof ProductSuggestionInputSchema>;

const ProductSuggestionOutputSchema = z.object({
  suggestions: z
    .array(z.object({
      productName: z.string().describe('The name of the product.'),
      description: z.string().describe('A brief description of the product.'),
    }))
    .describe('A list of product suggestions for the aquarium.'),
});
export type ProductSuggestionOutput = z.infer<typeof ProductSuggestionOutputSchema>;

export async function productSuggestion(input: ProductSuggestionInput): Promise<ProductSuggestionOutput> {
  return productSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productSuggestionPrompt',
  input: {schema: ProductSuggestionInputSchema},
  output: {schema: ProductSuggestionOutputSchema},
  prompt: `You are an aquarium expert. A user has an aquarium of a certain size and wants you to provide a list of product suggestions with brief descriptions.

Aquarium Size: {{{aquariumSize}}}

Suggest products that are appropriate for the specified aquarium size. Be specific.

Return the product suggestions in the specified JSON format.`,
});

const productSuggestionFlow = ai.defineFlow(
  {
    name: 'productSuggestionFlow',
    inputSchema: ProductSuggestionInputSchema,
    outputSchema: ProductSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
