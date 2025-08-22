"use client";
import { useState } from "react";
import HeroMorphNav from "./HeroMorphNav";
import OverlayMenu from "./OverlayMenu";
import FixedNavBar from "../FixedNavBar";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [docked, setDocked] = useState(false);

  return (
    <>
      {/* show FixedNavBar only when docked AND overlay is closed */}
      {docked && !menuOpen && (
        <>
          <FixedNavBar onOpenMenu={() => setMenuOpen(true)} />
          <div className="h-20" /> {/* spacer under fixed bar (same height as FixedNavBar) */}
        </>
      )}

      <HeroMorphNav
        onOpenMenu={() => setMenuOpen(true)}
        onDockChange={setDocked}
      />

      <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}