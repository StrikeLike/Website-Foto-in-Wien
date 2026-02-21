'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

const MouseContext = createContext<MousePosition>({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({
          x: e.clientX,
          y: e.clientY,
          normalizedX: (e.clientX / window.innerWidth - 0.5) * 2,
          normalizedY: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <MouseContext.Provider value={mousePos}>{children}</MouseContext.Provider>;
}

export const useMouse = () => useContext(MouseContext);
