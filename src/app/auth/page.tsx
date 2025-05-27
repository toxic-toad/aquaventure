
import { AuthForm } from '@/components/auth/AuthForm';
import type { Metadata } from 'next';

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <AuthForm />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Login or Sign Up | AquaVenture',
  description: 'Access your AquaVenture account or create a new one.',
};
