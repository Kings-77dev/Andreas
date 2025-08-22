// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import localFont from "next/font/local";
// import { useFixedNav } from "./FixedNavContext";

// gsap.registerPlugin(ScrollTrigger);

// const fatkat = localFont({
//   src: "../MyFont/Fatkat.ttf",
//   display: "swap",
//   variable: "--font-fatkat",
// });

// type Props = {
//   onOpenMenu?: () => void;
//   onDockChange?: (docked: boolean) => void; // optional: if you still use this elsewhere
// };

// export default function HeroMorphNav({ onOpenMenu, onDockChange }: Props) {
//   const { setVisible } = useFixedNav();

//   useLayoutEffect(() => {
//     const container = document.querySelector(
//       ".morph-container"
//     ) as HTMLElement | null;
//     const andre = document.querySelector("#logo-andre") as HTMLElement | null;
//     const studio = document.querySelector("#logo-studio") as HTMLElement | null;
//     const menu = document.querySelector("#menu") as HTMLElement | null;
//     if (!container || !andre || !studio || !menu) return;

//     // Hide the fixed nav while we're in the morph page initially
//     setVisible(false);

//     // Ensure fonts are loaded before measuring
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     (document.fonts?.ready ?? Promise.resolve()).then(() =>
//       ScrollTrigger.refresh()
//     );

//     gsap.set([andre, studio, menu], {
//       willChange: "transform",
//       transformOrigin: "50% 50%",
//     });

//     const remPx = () =>
//       parseFloat(getComputedStyle(document.documentElement).fontSize);
//     const RIGHT_PAD = () => 3 * remPx(); // Tailwind right-12 = 3rem

//     const computeMenuX = () => {
//       const vw = document.documentElement.clientWidth;
//       const rect = menu.getBoundingClientRect();
//       const startCenterX = vw / 2;
//       const desired = vw - RIGHT_PAD() - rect.width / 2;
//       const safe = vw - 0.75 * remPx() - rect.width / 2;
//       const finalCenterX = Math.min(desired, safe);
//       return finalCenterX - startCenterX;
//     };

//     const deltaToViewportCenterX = (el: HTMLElement) => {
//       const vw = document.documentElement.clientWidth;
//       const r = el.getBoundingClientRect();
//       const elCenter = r.left + r.width / 2;
//       return vw / 2 - elCenter;
//     };

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: container,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//         pin: true,
//         anticipatePin: 1,
//         onRefreshInit: () => {
//           gsap.set(menu, { clearProps: "x" });
//           gsap.set([andre, studio], { clearProps: "y,scale" });
//         },
//         onLeave: () => {
//           // Morph finished → show fixed nav and fade the morph container out
//           onDockChange?.(true);
//           setVisible(true);
//           gsap.to(container, { autoAlpha: 0, duration: 0.15 });
//         },
//         onEnterBack: () => {
//           // Coming back into morph → hide fixed nav and fade morph container in
//           onDockChange?.(false);
//           setVisible(false);
//           gsap.to(container, { autoAlpha: 1, duration: 0.15 });
//         },
//       },
//     });

//     // ANDREOPOLOGY → top center
//     tl.to(
//       andre,
//       {
//         scale: 0.25,
//         y: "-35vh",
//         x: () => deltaToViewportCenterX(andre!),
//         immediateRender: false,
//       },
//       0
//     );

//     // STUDIO → directly under ANDRE
//     tl.to(
//       studio,
//       {
//         scale: 0.25,
//         y: "-47vh",
//         x: () => deltaToViewportCenterX(studio!),
//         immediateRender: false,
//       },
//       0
//     );

//     // MENU → slides to right
//     tl.to(
//       menu,
//       {
//         x: () => computeMenuX(),
//         immediateRender: false,
//       },
//       0
//     );

//     const onResize = () => ScrollTrigger.refresh();
//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//       tl.kill();
//       // Safety: if the component unmounts while still in morph page, show the fixed nav again
//       setVisible(true);
//     };
//   }, [setVisible, onDockChange]);

//   return (
//     <div className="relative h-[100vh] bg-white">
//       <div className="morph-container relative flex h-screen w-full items-center justify-center">
//         {/* MENU */}
//         <div
//           id="menu"
//           onClick={() => {
//             // keep your existing prop call if you pass it somewhere
//             onOpenMenu?.();
//             // also tell NavShell to open its overlay
//             window.dispatchEvent(new CustomEvent("open-overlay-menu"));
//           }}
//           className="absolute top-6 left-1/2 -translate-x-1/2
//              text-base sm:text-lg md:text-xl lg:text-2xl text-black cursor-pointer select-none"
//         >
//           MENU
//         </div>

//         {/* ANDREOPOLOGY */}
//         <span
//           id="logo-andre"
//           className={`${fatkat.className} absolute left-1/2 -translate-x-1/2 leading-[0.9] text-black text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw]`}
//           style={{ letterSpacing: "0.04em", top: "32vh" }}
//         >
//           ANDREOPOLOGY
//         </span>

//         {/* STUDIO */}
//         <span
//           id="logo-studio"
//           className={`${fatkat.className} absolute -right-2/7 -translate-x-1/2 leading-[0.9] text-black text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw]`}
//           style={{ letterSpacing: "0.04em", top: "50vh" }}
//         >
//           STUDIO
//         </span>
//       </div>
//     </div>
//   );
// }

// // Hidden on small screens.

// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import localFont from "next/font/local";
// import { useFixedNav } from "./FixedNavContext";

// gsap.registerPlugin(ScrollTrigger);

// const fatkat = localFont({
//   src: "../MyFont/Fatkat.ttf",
//   display: "swap",
//   variable: "--font-fatkat",
// });

// type Props = {
//   onOpenMenu?: () => void;
//   onDockChange?: (docked: boolean) => void; // optional: if you still use this elsewhere
// };

// export default function HeroMorphNav({ onOpenMenu, onDockChange }: Props) {
//   const { setVisible } = useFixedNav();

//   // useLayoutEffect(() => {
//   //   const container = document.querySelector(
//   //     ".morph-container"
//   //   ) as HTMLElement | null;
//   //   const andre = document.querySelector("#logo-andre") as HTMLElement | null;
//   //   const studio = document.querySelector("#logo-studio") as HTMLElement | null;
//   //   const menu = document.querySelector("#menu") as HTMLElement | null;
//   //   if (!container || !andre || !studio || !menu) return;

//   //   // Hide the fixed nav while we're in the morph page initially
//   //   setVisible(false);

//   //   // Ensure fonts are loaded before measuring
//   //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   //   // @ts-ignore
//   //   (document.fonts?.ready ?? Promise.resolve()).then(() =>
//   //     ScrollTrigger.refresh()
//   //   );

// useLayoutEffect(() => {
//     // only run morph animation on md+ screens
//     if (window.innerWidth < 768) {
//       setVisible(true); // show fixed nav on mobile
//       return;
//     }

//     const container = document.querySelector(".morph-container") as HTMLElement | null;
//     const andre = document.querySelector("#logo-andre") as HTMLElement | null;
//     const studio = document.querySelector("#logo-studio") as HTMLElement | null;
//     const menu = document.querySelector("#menu") as HTMLElement | null;
//     if (!container || !andre || !studio || !menu) return;

//     setVisible(false); // hide fixed nav initially

//     (document.fonts?.ready ?? Promise.resolve()).then(() => ScrollTrigger.refresh());

//     gsap.set([andre, studio, menu], {
//       willChange: "transform",
//       transformOrigin: "50% 50%",
//     });

//     const remPx = () =>
//       parseFloat(getComputedStyle(document.documentElement).fontSize);
//     const RIGHT_PAD = () => 3 * remPx(); // Tailwind right-12 = 3rem

//     const computeMenuX = () => {
//       const vw = document.documentElement.clientWidth;
//       const rect = menu.getBoundingClientRect();
//       const startCenterX = vw / 2;
//       const desired = vw - RIGHT_PAD() - rect.width / 2;
//       const safe = vw - 0.75 * remPx() - rect.width / 2;
//       const finalCenterX = Math.min(desired, safe);
//       return finalCenterX - startCenterX;
//     };

//     const deltaToViewportCenterX = (el: HTMLElement) => {
//       const vw = document.documentElement.clientWidth;
//       const r = el.getBoundingClientRect();
//       const elCenter = r.left + r.width / 2;
//       return vw / 2 - elCenter;
//     };

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: container,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//         pin: true,
//         anticipatePin: 1,
//         onRefreshInit: () => {
//           gsap.set(menu, { clearProps: "x" });
//           gsap.set([andre, studio], { clearProps: "y,scale" });
//         },
//         onLeave: () => {
//           // Morph finished → show fixed nav and fade the morph container out
//           onDockChange?.(true);
//           setVisible(true);
//           gsap.to(container, { autoAlpha: 0, duration: 0.15 });
//         },
//         onEnterBack: () => {
//           // Coming back into morph → hide fixed nav and fade morph container in
//           onDockChange?.(false);
//           setVisible(false);
//           gsap.to(container, { autoAlpha: 1, duration: 0.15 });
//         },
//       },
//     });

//     // ANDREOPOLOGY → top center
//     tl.to(
//       andre,
//       {
//         scale: 0.25,
//         y: "-35vh",
//         x: () => deltaToViewportCenterX(andre!),
//         immediateRender: false,
//       },
//       0
//     );

//     // STUDIO → directly under ANDRE
//     tl.to(
//       studio,
//       {
//         scale: 0.25,
//         y: "-47vh",
//         x: () => deltaToViewportCenterX(studio!),
//         immediateRender: false,
//       },
//       0
//     );

//     // MENU → slides to right
//     tl.to(
//       menu,
//       {
//         x: () => computeMenuX(),
//         immediateRender: false,
//       },
//       0
//     );

//     const onResize = () => ScrollTrigger.refresh();
//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//       tl.kill();
//       // Safety: if the component unmounts while still in morph page, show the fixed nav again
//       setVisible(true);
//     };
//   }, [setVisible, onDockChange]);

//   return (
//     <div className="relative h-[100vh] bg-white">
// <div className="morph-container relative hidden md:flex h-screen w-full items-center justify-center">        {/* MENU */}
//         <div
//           id="menu"
//           onClick={() => {
//             // keep your existing prop call if you pass it somewhere
//             onOpenMenu?.();
//             // also tell NavShell to open its overlay
//             window.dispatchEvent(new CustomEvent("open-overlay-menu"));
//           }}
//           className="absolute top-6 left-1/2 -translate-x-1/2
//              text-base sm:text-lg md:text-xl lg:text-2xl text-black cursor-pointer select-none"
//         >
//           MENU
//         </div>

//         {/* ANDREOPOLOGY */}
//         <span
//           id="logo-andre"
//           className={`${fatkat.className} absolute left-1/2 -translate-x-1/2 leading-[0.9] text-black text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw]`}
//           style={{ letterSpacing: "0.04em", top: "32vh" }}
//         >
//           ANDREOPOLOGY
//         </span>

//         {/* STUDIO */}
//         <span
//           id="logo-studio"
//           className={`${fatkat.className} absolute -right-2/7 -translate-x-1/2 leading-[0.9] text-black text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw]`}
//           style={{ letterSpacing: "0.04em", top: "50vh" }}
//         >
//           STUDIO
//         </span>
//       </div>
//     </div>
//   );
// }

// Original but working with

"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useFixedNav } from "./FixedNavContext";

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

    // Hide fixed nav while morph is active
    setVisible(false);

    // Ensure fonts are loaded before measuring
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
        isDesktop: "(min-width: 1024px)", // lg+
        isTablet: "(min-width: 768px) and (max-width: 1023px)", // md-only
        isMobile: "(max-width: 767px)", // < md
      },
      (ctx) => {
        const { isDesktop, isTablet } = ctx.conditions as {
          isDesktop: boolean;
          isTablet: boolean;
          isMobile: boolean;
        };

        // Device-specific targets (keeps final dock top-center for all)
        const scaleAndre = isDesktop ? 0.25 : isTablet ? 0.4 : 0.5;
        const scaleStudio = scaleAndre;

        const yAndre = isDesktop ? "-35vh" : isTablet ? "-32vh" : "-28vh";
        const yStudio = isDesktop ? "-47vh" : isTablet ? "-42vh" : "-38vh";

        // When to finish the morph (controls when fixed nav appears)
        const endAt = isDesktop ? "75% top" : isTablet ? "72% top" : "70% top";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: endAt,
            scrub: true,
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

        // ANDRE → dock top-center
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

        // STUDIO → dock below ANDRE (same x centering)
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

        // MENU → slide to right edge (responsive clamp)
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
    <div className="relative h-[85vh] md:h-[100vh] bg-white">
      <div className="morph-container relative flex h-screen w-full items-center justify-center">
        {/* MENU */}
        <div
          id="menu"
          onClick={() => {
            onOpenMenu?.();
            window.dispatchEvent(new CustomEvent("open-overlay-menu"));
          }}
          className="absolute top-6 left-1/2 -translate-x-1/2
             text-base sm:text-lg md:text-xl lg:text-2xl text-black cursor-pointer select-none"
        >
          MENU
        </div>

        {/* ANDREOPOLOGY */}
       <span
  id="logo-andre"
  className="absolute left-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[32vh] sm:top-[28vh] md:top-[32vh]"
  style={{ fontFamily: '"Fatkat", system-ui, sans-serif', letterSpacing: "0.04em" }}
>
  ANDREOPOLOGY
</span>

<span
  id="logo-studio"
  className="absolute right-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[45vh] sm:top-[44vh] md:top-[50vh]"
  style={{ fontFamily: '"Fatkat", system-ui, sans-serif', letterSpacing: "0.04em" }}
>
  STUDIO
</span>
      </div>
    </div>
  );
}
