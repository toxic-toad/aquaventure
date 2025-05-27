import { AISuggestionForm } from '@/components/ai/AISuggestionForm';

export default function AISuggestionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AISuggestionForm />
    </div>
  );
}

export const metadata = {
  title: 'AI Product Suggestions | AquaVenture',
  description: 'Get AI-powered product suggestions for your aquarium.',
};
