"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

const MouseContext = createContext<MousePosition>({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
});

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <MouseContext.Provider value={mousePos}>{children}</MouseContext.Provider>
  );
}

export function useMouse() {
  return useContext(MouseContext);
}
