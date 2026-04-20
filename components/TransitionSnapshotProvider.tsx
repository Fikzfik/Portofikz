"use client";

import React, { createContext, useContext, useState } from "react";

interface TransitionContextType {
  snapshotHTML: string | null;
  snapshotScrollY: number;
  hasPreloaded: boolean;
  triggerTransition: (html: string, scrollY: number) => void;
  clearSnapshot: () => void;
  setHasPreloaded: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  snapshotHTML: null,
  snapshotScrollY: 0,
  hasPreloaded: false,
  triggerTransition: () => {},
  clearSnapshot: () => {},
  setHasPreloaded: () => {},
});

export function useTransitionSnapshot() {
  return useContext(TransitionContext);
}

export function TransitionSnapshotProvider({ children }: { children: React.ReactNode }) {
  const [snapshotHTML, setSnapshotHTML] = useState<string | null>(null);
  const [snapshotScrollY, setSnapshotScrollY] = useState(0);
  const [hasPreloaded, setHasPreloaded] = useState(false);

  const triggerTransition = (html: string, scrollY: number) => {
    setSnapshotHTML(html);
    setSnapshotScrollY(scrollY);
  };

  const clearSnapshot = () => {
    setSnapshotHTML(null);
  };

  return (
    <TransitionContext.Provider value={{ 
      snapshotHTML, 
      snapshotScrollY, 
      hasPreloaded, 
      triggerTransition, 
      clearSnapshot,
      setHasPreloaded 
    }}>
      {children}
    </TransitionContext.Provider>
  );
}
