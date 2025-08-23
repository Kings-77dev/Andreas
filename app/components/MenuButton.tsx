// app/components/MenuButton.tsx
"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  showHamburger?: boolean; // 👈 control whether to show icon
};

export default function MenuButton({ id, className = "", showHamburger = false, ...props }: Props) {
  return (
    <button
      id={id}
      aria-label="Open menu"
      {...props}
      className={`flex items-center gap-2 text-black cursor-pointer select-none ${className}`}
    >
      {/* Conditionally render hamburger (mobile only + when requested) */}
      {showHamburger && (
        <svg
          className="block md:hidden h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}

      {/* MENU text stays visible on all screen sizes */}
      <span className="text-base sm:text-lg md:text-xl">MENU</span>
    </button>
  );
}