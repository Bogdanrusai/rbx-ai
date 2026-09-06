"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type WizardSource = "default" | "chatbot";

type WizardCtx = {
  open: (source?: WizardSource) => void;
  close: () => void;
  isOpen: boolean;
  source: WizardSource;
};

const Ctx = createContext<WizardCtx | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<WizardSource>("default");
  return (
    <Ctx.Provider
      value={{
        isOpen,
        source,
        open: (s: WizardSource = "default") => {
          setSource(s);
          setIsOpen(true);
        },
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
