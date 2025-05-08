"use client"
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export function BackButtonComponent() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push('/')}>
      ← Tillbaka
    </Button>
  );
}
