"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  // Tailwind-friendly gradient/bg tokens
  accent: string; // e.g. "from-emerald-400 to-teal-500"
};

const CARDS: Card[] = [
  {
    id: 1,
    title: "Brand System",
    subtitle: "Visual identity & usage",
    tag: "Design",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: 2,
    title: "Motion Suite",
    subtitle: "Micro-interactions",
    tag: "Motion",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    id: 3,
    title: "Product Site",
    subtitle: "Next.js + GSAP",
    tag: "Web",
    accent: "from-sky-400 to-indigo-500",
  },
  {
    id: 4,
    title: "3D Preview",
    subtitle: "Interactive model",
    tag: "3D",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: 5,
    title: "Photography",
    subtitle: "Art direction",
    tag: "Content",
    accent: "from-rose-400 to-pink-500",
  },
  {
    id: 6,
    title: "Style Library",
    subtitle: "Tokens & components",
    tag: "System",
    accent: "from-lime-400 to-green-500",
  },
  {
    id: 7,
    title: "Style Library",
    subtitle: "Tokens & components",
    tag: "System",
    accent: "from-lime-400 to-green-500",
  },
];

export default function GridSection() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".grid-card");

      // Reveal cards as the section scrolls into view
      gsap.from(cards, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".grid-section",
          start: "top 75%",
          end: "top 25%",
          scrub: false,
        },
      });

      // Subtle parallax of the gradient bars for depth
      cards.forEach((card) => {
        const bar = card.querySelector(".accent-bar");
        if (!bar) return;

        gsap.fromTo(
          bar,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="grid-section relative bg-gray-50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            Selected Work
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl">
            A mix of branding, motion, and product experiments—each card is a
            snapshot you can expand later.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {CARDS.map((c) => (
            <article
              key={c.id}
              className="
                grid-card group relative overflow-hidden
                rounded-2xl border border-gray-200/70 bg-white
                shadow-sm hover:shadow-xl
                transition-shadow duration-300
                aspect-[4/3]   /* nice squared rectangles */
              "
            >
              {/* Accent gradient bar */}
              <div
                className={`
                  accent-bar absolute inset-x-0 top-0 h-24
                  bg-gradient-to-br ${c.accent} opacity-80
                  blur-[2px]
                `}
              />

              {/* Soft background pattern */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.04),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.05),transparent_45%)]
                "
              />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <span
                    className="
                    inline-flex items-center rounded-full
                    bg-black/80 text-white text-[10px] md:text-xs
                    px-2.5 py-1 tracking-wide
                  "
                  >
                    {c.tag}
                  </span>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{c.subtitle}</p>
                </div>

                {/* Footer / CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="
                      text-[13px] md:text-sm font-medium tracking-wide
                      text-gray-900/90 hover:text-gray-900
                      transition-colors
                    "
                  >
                    View case
                  </button>
                  <div
                    className="
                    h-8 w-8 md:h-9 md:w-9
                    rounded-full border border-gray-300/80
                    grid place-items-center
                    group-hover:translate-x-0.5 transition-transform
                  "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover lift */}
              <div
                className="
                  absolute inset-0 rounded-2xl ring-1 ring-black/0
                  group-hover:translate-y-[-2px]
                  group-hover:ring-black/5
                  transition-all duration-300
                "
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
