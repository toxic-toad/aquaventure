import { CartView } from '@/components/cart/CartView';

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CartView />
    </div>
  );
}

export const metadata = {
  title: 'Your Shopping Cart | AquaVenture',
  description: 'Review items in your shopping cart.',
};
