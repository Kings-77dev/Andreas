
"use client";
import { createContext, useContext, useState } from "react";

type FixedNavContextType = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};
const FixedNavContext = createContext<FixedNavContextType | null>(null);

export function FixedNavProvider({ children }: { children: React.ReactNode }) {
  // ⬅️ default hidden to avoid a flash on the morph page
  const [visible, setVisible] = useState(false);
  return (
    <FixedNavContext.Provider value={{ visible, setVisible }}>
      {children}
    </FixedNavContext.Provider>
  );
}

export function useFixedNav() {
  const ctx = useContext(FixedNavContext);
  if (!ctx) throw new Error("useFixedNav must be used inside FixedNavProvider");
  return ctx;
}
