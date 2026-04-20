"use client";

import React, { createContext, useContext, useState } from "react";

interface TransitionContextType {
  snapshotHTML: string | null;
  snapshotScrollY: number;
  triggerTransition: (html: string, scrollY: number) => void;
  clearSnapshot: () => void;
}

const TransitionContext = createContext<TransitionContextType>({
  snapshotHTML: null,
  snapshotScrollY: 0,
  triggerTransition: () => {},
  clearSnapshot: () => {},
});

export function useTransitionSnapshot() {
  return useContext(TransitionContext);
}

export function TransitionSnapshotProvider({ children }: { children: React.ReactNode }) {
  const [snapshotHTML, setSnapshotHTML] = useState<string | null>(null);
  const [snapshotScrollY, setSnapshotScrollY] = useState(0);

  const triggerTransition = (html: string, scrollY: number) => {
    setSnapshotHTML(html);
    setSnapshotScrollY(scrollY);
  };

  const clearSnapshot = () => {
    setSnapshotHTML(null);
  };

  return (
    <TransitionContext.Provider value={{ snapshotHTML, snapshotScrollY, triggerTransition, clearSnapshot }}>
      {children}
    </TransitionContext.Provider>
  );
}
