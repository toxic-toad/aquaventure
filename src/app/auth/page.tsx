import type { Metadata } from 'next';
import AuthForm from '@/components/auth/AuthForm';

export default function AuthPage() {
  return (
    <AuthForm />
  );
}

export const metadata: Metadata = {
  title: 'Login or Sign Up | AquaVenture',
  description: 'Access your AquaVenture account or create a new one.',
};
