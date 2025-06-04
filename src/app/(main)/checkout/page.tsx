import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutForm />
    </div>
  );
}

export const metadata = {
  title: 'Checkout | AquaVenture',
  description: 'Complete your purchase at AquaVenture.',
};
