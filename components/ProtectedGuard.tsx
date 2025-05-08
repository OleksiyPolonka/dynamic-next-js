'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function ProtectedGuard({ protectedPage, children }: { protectedPage?: boolean, children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (protectedPage && isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [protectedPage, isLoaded, isSignedIn, router]);

  if (!protectedPage) {
    return children;
  }

  if (!isLoaded || (protectedPage && !isSignedIn)) {
    return null;
  }

  return children;
}
