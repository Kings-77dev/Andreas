"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  open: boolean;
  onClose: () => void;
};

// const fatkat = localFont({
//   src: "/MyFont/Fatkat.ttf",
//   display: "swap",
//   variable: "--font-fatkat",
// });

export default function OverlayMenu({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const qs = <T extends HTMLElement>(sel: string) =>
    Array.from(overlayRef.current?.querySelectorAll<T>(sel) ?? []);

  // lock/unlock background scroll while menu is open
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.style.overflow = "hidden";
    else root.style.overflow = "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  // animate in/out when `open` changes
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const items = qs<HTMLElement>(".overlay-stagger");
    if (open) {
      gsap.set(overlay, { display: "block", pointerEvents: "auto" });
      gsap.set([overlay, ...items], { opacity: 0 });
      gsap.to(overlay, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(
        items,
        { opacity: 0, yPercent: 15 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
          stagger: 0.07,
          delay: 0.05,
          ease: "power3.out",
        }
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none", pointerEvents: "none" });
        },
      });
      tl.to(
        items,
        {
          opacity: 0,
          yPercent: 10,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
        },
        0
      ).to(overlay, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0.05);
    }
  }, [open]);

  const onBgClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      ref={overlayRef}
      id="overlay-menu"
      className="fixed inset-0 z-[2147483648] hidden opacity-0 pointer-events-none"
      aria-hidden={!open}
    >
      {/* backdrop (click to close) */}
      <div
        id="overlay-bg"
        className="absolute inset-0 bg-black"
        onClick={onBgClick}
      />

      {/* top-left logo */}
      <div
        className="absolute font-fatkat left-6 top-6 text-white font-bold leading-[1.2] 
              text-6 sm:text-xl md:text-xl lg:text-4xl overlay-stagger select-none"
        style={{ letterSpacing: "0.18em" }}
      >
        <div className="mb-8">
          <h1>A</h1>
        </div>
        <div>S</div>
      </div>

      {/* top-right CLOSE */}
      <button
        id="overlay-close"
        type="button"
        className="absolute right-6 top-6 text-white text-sm sm:text-base lg:text-lg tracking-wider overlay-stagger z-10 cursor-pointer select-none"
        onClick={onClose}
      >
        CLOSE
      </button>

      {/* center nav */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <nav className="text-white text-center font-extrabold leading-[0.9]">
          <a className="overlay-stagger block select-none cursor-pointer text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] mt-[2vh]">
            HOME
          </a>
          <a className="overlay-stagger block select-none cursor-pointer text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw]">
            PORTFOLIO{" "}
            <sup className="align-super text-[0.35em] font-bold">(10)</sup>
          </a>

          <a className="overlay-stagger block select-none cursor-pointer text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] mt-[2vh]">
            ABOUT
          </a>
          <a className="overlay-stagger block select-none cursor-pointer text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] mt-[2vh]">
            CONTACT
          </a>
        </nav>
      </div>

      {/* bottom center link */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/90 text-xs sm:text-sm overlay-stagger">
        INSTAGRAM
      </div>
    </div>
  );
}
