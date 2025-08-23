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

// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { useFixedNav } from "./FixedNavContext";

// gsap.registerPlugin(ScrollTrigger);

// type Props = {
//   onOpenMenu?: () => void;
//   onDockChange?: (docked: boolean) => void;
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

//     // Hide fixed nav while morph is active
//     setVisible(false);

//     // Ensure fonts are loaded before measuring
//     (document.fonts?.ready ?? Promise.resolve()).then(() =>
//       ScrollTrigger.refresh()
//     );

//     gsap.set([andre, studio, menu], {
//       willChange: "transform",
//       transformOrigin: "50% 50%",
//     });

//     const remPx = () =>
//       parseFloat(getComputedStyle(document.documentElement).fontSize);
//     const RIGHT_PAD = () => 3 * remPx();

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

//     const mm = gsap.matchMedia();

//     mm.add(
//       {
//         isDesktop: "(min-width: 1024px)", // lg+
//         isTablet: "(min-width: 768px) and (max-width: 1023px)", // md-only
//         isMobile: "(max-width: 767px)", // < md
//       },
//       (ctx) => {
//         const { isDesktop, isTablet } = ctx.conditions as {
//           isDesktop: boolean;
//           isTablet: boolean;
//           isMobile: boolean;
//         };

//         // Device-specific targets (keeps final dock top-center for all)
//         const scaleAndre = isDesktop ? 0.25 : isTablet ? 0.4 : 0.5;
//         const scaleStudio = scaleAndre;

//         const yAndre = isDesktop ? "-35vh" : isTablet ? "-32vh" : "-28vh";
//         const yStudio = isDesktop ? "-47vh" : isTablet ? "-42vh" : "-38vh";

//         // When to finish the morph (controls when fixed nav appears)
//         const endAt = isDesktop ? "75% top" : isTablet ? "72% top" : "70% top";

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: container,
//             start: "top top",
//             end: endAt,
//             scrub: true,
//             pin: true,
//             anticipatePin: 1,
//             onRefreshInit: () => {
//               gsap.set(menu, { clearProps: "x" });
//               gsap.set([andre, studio], { clearProps: "y,scale" });
//             },
//             onLeave: () => {
//               onDockChange?.(true);
//               setVisible(true);
//               gsap.to(container, { autoAlpha: 0, duration: 0.15 });
//             },
//             onEnterBack: () => {
//               onDockChange?.(false);
//               setVisible(false);
//               gsap.to(container, { autoAlpha: 1, duration: 0.15 });
//             },
//           },
//         });

//         // ANDRE → dock top-center
//         tl.to(
//           andre,
//           {
//             scale: scaleAndre,
//             y: yAndre,
//             x: () => deltaToViewportCenterX(andre!),
//             immediateRender: false,
//           },
//           0
//         );

//         // STUDIO → dock below ANDRE (same x centering)
//         tl.to(
//           studio,
//           {
//             scale: scaleStudio,
//             y: yStudio,
//             x: () => deltaToViewportCenterX(studio!),
//             immediateRender: false,
//           },
//           0
//         );

//         // MENU → slide to right edge (responsive clamp)
//         tl.to(
//           menu,
//           {
//             x: () => computeMenuX(),
//             immediateRender: false,
//           },
//           0
//         );

//         return () => tl.kill();
//       }
//     );

//     const onResize = () => ScrollTrigger.refresh();
//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//       mm.kill();
//       setVisible(true);
//     };
//   }, [setVisible, onDockChange]);

//   return (
//     <div className="relative h-[100vh] bg-white">
//       {/* Grain */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
//         style={{
//           backgroundImage:
//             "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
//           backgroundSize: "200px 200px",
//         }}
//       />

//       {/* Edge vignette */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0"
//         style={{
//           WebkitMaskImage:
//             "radial-gradient(140% 80% at 50% 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
//           maskImage:
//             "radial-gradient(140% 80% at 50% 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
//           background:
//             "radial-gradient(60% 40% at 50% -10%, rgba(0,0,0,0.08), transparent 60%)",
//         }}
//       />
//       <div className="morph-container relative flex h-screen w-full items-center justify-center">
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-wider text-black/70">
//           <div className="flex flex-col items-center gap-1">
//             <span>SCROLL</span>
//             <span className="animate-bounce">⌄</span>
//           </div>
//         </div>
//         {/* MENU */}
//         <div
//           id="menu"
//           onClick={() => {
//             onOpenMenu?.();
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
//           className="absolute left-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[32vh] sm:top-[28vh] md:top-[32vh]"
//           style={{
//             fontFamily: '"Fatkat", system-ui, sans-serif',
//             letterSpacing: "0.04em",
//           }}
//         >
//           ANDREOPOLOGY
//         </span>

//         <span
//           id="logo-studio"
//           className="absolute right-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[45vh] sm:top-[44vh] md:top-[50vh]"
//           style={{
//             fontFamily: '"Fatkat", system-ui, sans-serif',
//             letterSpacing: "0.04em",
//           }}
//         >
//           STUDIO
//         </span>
//       </div>
//       <section className="px-6 md:px-8">
//         <div className="mx-auto max-w-6xl border-t border-black/10 py-6 md:py-8 flex flex-wrap items-center justify-between gap-3 text-sm text-black/70">
//           <div className="flex items-center gap-4">
//             <span>Andreopology Studio — Photography</span>
//             <span className="hidden md:inline">•</span>
//             <span className="hidden md:inline">
//               Based in NYC — Available worldwide
//             </span>
//           </div>
//           <a
//             href="#contact"
//             className="rounded-full border border-black/20 px-3 py-1.5 hover:border-black/40 transition"
//           >
//             Book a shoot
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { useFixedNav } from "./FixedNavContext";

// gsap.registerPlugin(ScrollTrigger);

// type Props = {
//   onOpenMenu?: () => void;
//   onDockChange?: (docked: boolean) => void;
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

//     // Hide fixed nav while morph is active
//     setVisible(false);

//     // Ensure fonts are loaded before measuring
//     (document.fonts?.ready ?? Promise.resolve()).then(() =>
//       ScrollTrigger.refresh()
//     );

//     gsap.set([andre, studio, menu], {
//       willChange: "transform",
//       transformOrigin: "50% 50%",
//     });

//     const remPx = () =>
//       parseFloat(getComputedStyle(document.documentElement).fontSize);
//     const RIGHT_PAD = () => 3 * remPx();

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

//     const mm = gsap.matchMedia();

//     mm.add(
//       {
//         isDesktop: "(min-width: 1024px)", // lg+
//         isTablet: "(min-width: 768px) and (max-width: 1023px)", // md-only
//         isMobile: "(max-width: 767px)", // < md
//       },
//       (ctx) => {
//         const { isDesktop, isTablet } = ctx.conditions as {
//           isDesktop: boolean;
//           isTablet: boolean;
//           isMobile: boolean;
//         };

//         // Device-specific targets (keeps final dock top-center for all)
//         const scaleAndre = isDesktop ? 0.25 : isTablet ? 0.4 : 0.5;
//         const scaleStudio = scaleAndre;

//         const yAndre = isDesktop ? "-35vh" : isTablet ? "-32vh" : "-28vh";
//         const yStudio = isDesktop ? "-47vh" : isTablet ? "-42vh" : "-38vh";

//         // When to finish the morph (controls when fixed nav appears)
//         const endAt = isDesktop ? "75% top" : isTablet ? "72% top" : "70% top";

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: container,
//             start: "top top",
//             end: endAt,

//             scrub: true,
//             pin: true,
//             anticipatePin: 1,
//             onRefreshInit: () => {
//               gsap.set(menu, { clearProps: "x" });
//               gsap.set([andre, studio], { clearProps: "y,scale" });
//             },
//             onLeave: () => {
//               onDockChange?.(true);
//               setVisible(true);
//               gsap.to(container, { autoAlpha: 0, duration: 0.15 });
//             },
//             onEnterBack: () => {
//               onDockChange?.(false);
//               setVisible(false);
//               gsap.to(container, { autoAlpha: 1, duration: 0.15 });
//             },
//           },
//         });

//         // ANDRE → dock top-center
//         tl.to(
//           andre,
//           {
//             scale: scaleAndre,
//             y: yAndre,
//             x: () => deltaToViewportCenterX(andre!),
//             immediateRender: false,
//           },
//           0
//         );

//         // STUDIO → dock below ANDRE (same x centering)
//         tl.to(
//           studio,
//           {
//             scale: scaleStudio,
//             y: yStudio,
//             x: () => deltaToViewportCenterX(studio!),
//             immediateRender: false,
//           },
//           0
//         );

//         // MENU → slide to right edge (responsive clamp)
//         tl.to(
//           menu,
//           {
//             x: () => computeMenuX(),
//             immediateRender: false,
//           },
//           0
//         );

//         return () => tl.kill();
//       }
//     );

//     const onResize = () => ScrollTrigger.refresh();
//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//       mm.kill();
//       setVisible(true);
//     };
//   }, [setVisible, onDockChange]);

//   return (
//     <div className="relative h-[100vh] bg-white">
//       {/* Grain (now visible above content) */}
//      <div
//   aria-hidden
//   className="pointer-events-none absolute inset-0 z-20 opacity-20 mix-blend-multiply"
//   style={{
//     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
//     backgroundSize: "200px 200px",
//   }}
// />

//       {/* Edge vignette (now above content) */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 z-20"
//         style={{
//           WebkitMaskImage:
//             "radial-gradient(140% 80% at 50% 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 100%)",
//           maskImage:
//             "radial-gradient(140% 80% at 50% 40%, rgba(0,0,0,1) 60%, rgba(0, 0, 0, 0.5) 100%)",
//           background:
//             "radial-gradient(60% 40% at 50% -10%, rgba(0, 0, 0, 1), transparent 60%)",
//         }}
//       />

//       {/* Morph container respects hero height (so info bar sits right below) */}
//       <div className="morph-container relative flex h-full w-full items-center justify-center">
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-wider text-black/70">
//           <div className="flex flex-col items-center gap-1">
//             <span>SCROLL</span>
//             <span className="animate-bounce">⌄</span>
//           </div>
//         </div>

//         {/* MENU */}
//         <div
//           id="menu"
//           onClick={() => {
//             onOpenMenu?.();
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
//           className="absolute left-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[32vh] sm:top-[28vh] md:top-[32vh]"
//           style={{
//             fontFamily: '"Fatkat", system-ui, sans-serif',
//             letterSpacing: "0.04em",
//           }}
//         >
//           ANDREOPOLOGY
//         </span>

//         <span
//           id="logo-studio"
//           className="absolute right-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[45vh] sm:top-[44vh] md:top-[50vh]"
//           style={{
//             fontFamily: '"Fatkat", system-ui, sans-serif',
//             letterSpacing: "0.04em",
//           }}
//         >
//           STUDIO
//         </span>
//       </div>

//       {/* Slim info bar under the fold */}
//       <section className="px-6 md:px-8">
//         <div className="mx-auto max-w-6xl border-t border-black/10 py-6 md:py-8 flex flex-wrap items-center justify-between gap-3 text-sm text-black/70">
//           <div className="flex items-center gap-4">
//             <span>Andreopology Studio — Photography</span>
//             <span className="hidden md:inline">•</span>
//             <span className="hidden md:inline">
//               Based in NYC — Available worldwide
//             </span>
//           </div>
//           <a
//             href="#contact"
//             className="rounded-full border border-black/20 px-3 py-1.5 hover:border-black/40 transition"
//           >
//             Book a shoot
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useFixedNav } from "./FixedNavContext";
import MenuButton from "./MenuButton";

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
    <div className="relative min-h-[110vh] bg-white">
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-wider text-black/70">
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
          className="absolute left-[10%] leading-[0.9] text-black text-[8vw] sm:text-[9vw] md:text-[8vw] top-[32vh] sm:top-[28vh] md:top-[32vh]"
          style={{
            fontFamily: '"Fatkat", system-ui, sans-serif',
            letterSpacing: "0.04em",
          }}
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
      </div>

      {/* Slim info bar (now visible right under hero) */}
      <section className="px-6 md:px-8">
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
      </section>
    </div>
  );
}
