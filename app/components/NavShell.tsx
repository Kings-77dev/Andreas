

// app/components/NavShell.tsx
"use client";

import { useLayoutEffect, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import FixedNavBar from "../FixedNavBar";
import { useFixedNav } from "./FixedNavContext";

export default function NavShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { visible, setVisible } = useFixedNav();

  // Before paint, decide if this page has the morph section.
  useLayoutEffect(() => {
    const hasMorph = !!document.querySelector(".morph-container");
    if (!hasMorph) setVisible(true); // show nav on normal pages, no flash
    // If it *does* have morph, leave it hidden; HeroMorphNav will manage it.
  }, [setVisible]);

  // Hide fixed nav while overlay is open
  const hidden = menuOpen || !visible;

  return (
    <>
      {!hidden && <FixedNavBar onOpenMenu={() => setMenuOpen(true)} />}
      <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="pt-20">{children}</main>
    </>
  );
}
