'use client';

import { ReactNode } from 'react';
import { MouseProvider } from '@/context/MouseContext';

export function Providers({ children }: { children: ReactNode }) {
  return <MouseProvider>{children}</MouseProvider>;
}
