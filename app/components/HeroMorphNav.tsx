"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useFixedNav } from "./FixedNavContext";
import MenuButton from "./MenuButton";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpenMenu?: () => void;
  onDockChange?: (docked: boolean) => void;
};

export default function HeroMorphNav({ onOpenMenu, onDockChange }: Props) {
  const { setVisible } = useFixedNav();

  useLayoutEffect(() => {
    const container = document.querySelector(
      ".morph-container"
    ) as HTMLElement | null;
    const andre = document.querySelector("#logo-andre") as HTMLElement | null;
    const studio = document.querySelector("#logo-studio") as HTMLElement | null;
    const menu = document.querySelector("#menu") as HTMLElement | null;
    if (!container || !andre || !studio || !menu) return;

    setVisible(false);

    (document.fonts?.ready ?? Promise.resolve()).then(() =>
      ScrollTrigger.refresh()
    );

    gsap.set([andre, studio, menu], {
      willChange: "transform",
      transformOrigin: "50% 50%",
    });

    const remPx = () =>
      parseFloat(getComputedStyle(document.documentElement).fontSize);
    const RIGHT_PAD = () => 3 * remPx();

    const computeMenuX = () => {
      const vw = document.documentElement.clientWidth;
      const rect = menu.getBoundingClientRect();
      const startCenterX = vw / 2;
      const desired = vw - RIGHT_PAD() - rect.width / 2;
      const safe = vw - 0.75 * remPx() - rect.width / 2;
      const finalCenterX = Math.min(desired, safe);
      return finalCenterX - startCenterX;
    };

    const deltaToViewportCenterX = (el: HTMLElement) => {
      const vw = document.documentElement.clientWidth;
      const r = el.getBoundingClientRect();
      const elCenter = r.left + r.width / 2;
      return vw / 2 - elCenter;
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)",
      },
      (ctx) => {
        const { isDesktop, isTablet } = ctx.conditions as {
          isDesktop: boolean;
          isTablet: boolean;
          isMobile: boolean;
        };

        const scaleAndre = isDesktop ? 0.25 : isTablet ? 0.4 : 0.5;
        const scaleStudio = scaleAndre;

        const yAndre = isDesktop ? "-35vh" : isTablet ? "-32vh" : "-28vh";
        const yStudio = isDesktop ? "-47vh" : isTablet ? "-42vh" : "-38vh";

        const endAt = isDesktop ? "75% top" : isTablet ? "72% top" : "70% top";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: endAt,
            scrub: true,
            pinSpacing: false,
            pin: true,
            anticipatePin: 1,
            onRefreshInit: () => {
              gsap.set(menu, { clearProps: "x" });
              gsap.set([andre, studio], { clearProps: "y,scale" });
            },
            onLeave: () => {
              onDockChange?.(true);
              setVisible(true);
              gsap.to(container, { autoAlpha: 0, duration: 0.15 });
            },
            onEnterBack: () => {
              onDockChange?.(false);
              setVisible(false);
              gsap.to(container, { autoAlpha: 1, duration: 0.15 });
            },
          },
        });

        tl.to(
          andre,
          {
            scale: scaleAndre,
            y: yAndre,
            x: () => deltaToViewportCenterX(andre!),
            immediateRender: false,
          },
          0
        );

        tl.to(
          studio,
          {
            scale: scaleStudio,
            y: yStudio,
            x: () => deltaToViewportCenterX(studio!),
            immediateRender: false,
          },
          0
        );

        tl.to(
          menu,
          {
            x: () => computeMenuX(),
            immediateRender: false,
          },
          0
        );

        return () => tl.kill();
      }
    );

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mm.kill();
      setVisible(true);
    };
  }, [setVisible, onDockChange]);

  return (
    <div className="relative min-h-[100vh] bg-white">
      {/* Grain overlay (confined to hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-[100vh] z-20 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Edge vignette (confined to hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-[100vh] z-20"
        style={{
          WebkitMaskImage:
            "radial-gradient(140% 80% at 50% 40%, rgba(0,0,0,1) 60%, transparent 100%)",
          maskImage:
            "radial-gradient(140% 80% at 50% 40%, rgba(0,0,0,1) 60%, transparent 100%)",
          background:
            "radial-gradient(60% 40% at 50% -10%, rgba(0,0,0,0.15), transparent 60%)",
        }}
      />

      {/* Morph container fills hero height only */}
      <div className="morph-container relative flex h-[100vh] w-full items-center justify-center">
        {/* tiny brand logo (top-left) */}
        {/* <div className="absolute top-6 left-6 select-none">
          <Image
            src="/logo.png" // put your logo in /public/logo.svg or logo.png
            alt="Andreopology Studio"
            width={80} // adjust size
            height={40}
            priority // makes sure it loads immediately
            className="opacity-80 hover:opacity-100 transition"
          />
        </div> */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs tracking-wider text-black/70">
          <div className="flex flex-col items-center gap-1">
            <span>SCROLL</span>
            <span className="animate-bounce">⌄</span>
          </div>
        </div>

        {/* MENU */}

        <MenuButton
          id="menu" // ✅ keep ID so GSAP can target it
          onClick={() => {
            onOpenMenu?.();
            window.dispatchEvent(new CustomEvent("open-overlay-menu"));
          }}
          className="absolute top-6 left-1/2 -translate-x-1/2"
        />

        {/* ANDREOPOLOGY */}
        <span
          id="logo-andre"
          className="absolute left-[10%] leading-[0.9] font-extrabold text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[32vh] sm:top-[28vh] md:top-[32vh]"
          // style={{
          //   fontFamily: '"Fatkat", system-ui, sans-serif',
          //   letterSpacing: "0.04em",
          // }}
        >
          ANDREOPOLOGY
        </span>

        {/* STUDIO */}
        <span
          id="logo-studio"
          className="absolute right-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[45vh] sm:top-[44vh] md:top-[50vh]"
          style={{
            fontFamily: '"Fatkat", system-ui, sans-serif',
            letterSpacing: "0.04em",
          }}
        >
          STUDIO
        </span>

        {/* Slim info bar – centered, with larger CTA */}
        <div
          className="
              absolute bottom-2 left-1/2 -translate-x-1/2 z-30
              w-[min(95%,72rem)]
              pl-[max(env(safe-area-inset-left),1rem)]
              pr-[max(env(safe-area-inset-right),1rem)]
              pb-[max(env(safe-area-inset-bottom),1rem)]
            "
        >
          <div
            className="
                flex flex-wrap items-center justify-between gap-3
                text-sm md:text-base text-black/70
                px-4 md:px-6
              "
          >
            {/* Info text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="uppercase tracking-wide text-xs md:text-sm font-medium">
                CREATIVE, MULTIMEDIA STORYTELLER
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="uppercase tracking-wide text-xs md:text-sm font-medium">
                Based in The Hague, Netherlands
              </span>
            </div>

            {/* CTA (bigger, equal padding, never wraps) */}
            <a
              href="#contact"
              className="
              inline-flex  items-center justify-center whitespace-nowrap
              text-black
              /* size */
              text-base sm:text-lg md:text-xl leading-none
              px-12 sm:px-14 md:px-18   /* ← wider horizontal padding */
              py-4 sm:py-5 md:py-6      /* ← taller vertical padding */
              min-h-[2.5rem] sm:min-h-[2rem] md:min-h-[3rem]
              min-w-[3.5rem] sm:min-w-[4rem] md:min-w-[10.5rem]
              /* polish */
               hover:shadow-lg 
              transition-all duration-200
               relative
                focus-square-button
            "
            >
              Book a Shoot
              {/* Corner elements for the focus square effect, using Tailwind classes */}
              {/* Top-Left Corner */}
              <span className="absolute top-0 left-0 w-4 h-[2px] bg-black"></span>
              <span className="absolute top-0 left-0 w-[2px] h-4 bg-black"></span>
              {/* Top-Right Corner */}
              <span className="absolute top-0 right-0 w-4 h-[2px] bg-black"></span>
              <span className="absolute top-0 right-0 w-[2px] h-4 bg-black"></span>
              {/* Bottom-Left Corner */}
              <span className="absolute bottom-0 left-0 w-4 h-[2px] bg-black"></span>
              <span className="absolute bottom-0 left-0 w-[2px] h-4 bg-black"></span>
              {/* Bottom-Right Corner */}
              <span className="absolute bottom-0 right-0 w-4 h-[2px] bg-black"></span>
              <span className="absolute bottom-0 right-0 w-[2px] h-4 bg-black"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Slim info bar (now visible right under hero) */}
      {/* <section className="px-6 md:px-8">
        <div className="mx-auto max-w-6xl border-t border-black/10 py-6 md:py-8 flex flex-wrap items-center justify-between gap-3 text-sm text-black/70">
          <div className="flex items-center gap-4">
            <span>Andreopology Studio — Photography</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">
              Based in NYC — Available worldwide
            </span>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-black/20 px-3 py-1.5 hover:border-black/40 transition"
          >
            Book a shoot
          </a>
        </div>
      </section> */}
    </div>
  );
}
