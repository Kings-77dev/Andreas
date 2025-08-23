// "use client";
// import localFont from "next/font/local";

// // Adjust path if your font is in /public/fonts/
// const fatkat = localFont({
//   src: "./MyFont/Fatkat.ttf",
//   display: "swap",
//   variable: "--font-fatkat",
// });

// type Props = { onOpenMenu?: () => void };

// export default function FixedNavBar({ onOpenMenu }: Props) {
//   return (
//     <header
//       className="
//         fixed top-0 left-0 right-0
//         bg-white/95 backdrop-blur
//         z-[2147483647]
//         flex items-center justify-center
//         h-20  /* taller so the logo fits */
//       "
//     >
//       {/* Centered stacked logo */}
//       <div
//         className={`
//           ${fatkat.className}
//           flex flex-col items-center leading-[0.8] text-black select-none
//         `}
//         style={{ letterSpacing: "0.04em" }}
//       >
//         <span className="text-3xl md:text-3xl lg:text-3xl ">ANDREOPOLOGY</span>
//         <span className="text-3xl md:text-3xl lg:text-3xl -mt-1">STUDIO</span>
//       </div>

//       {/* MENU aligned right */}
//       <button
//         onClick={onOpenMenu}
//         className="
//           absolute right-6 top-1/2 -translate-y-1/2
//           text-black text-base sm:text-lg md:text-xl
//         "
//       >
//         MENU
//       </button>
//     </header>
//   );
// }
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useFixedNav } from "./components/FixedNavContext";

type Props = { onOpenMenu?: () => void };

export default function FixedNavBar({ onOpenMenu }: Props) {
  const { visible } = useFixedNav();

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="fixed-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeIn" }}
          className="
            fixed top-0 left-0 right-0
            bg-white/95 backdrop-blur
            z-[2147483647]
            flex items-center justify-center
            h-20
          "
        >
          {/* Centered stacked logo */}
          <div
            className="
              flex flex-col items-center leading-[0.8] text-black select-none
            "
            style={{
              fontFamily: "Fatkat, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            <span className="text-lg md:text-3xl">ANDREOPOLOGY</span>
            <span className="text-lg md:text-3xl -mt-1">STUDIO</span>
          </div>

          {/* MENU aligned right → hamburger on mobile, text on md+ */}
          <button
            onClick={onOpenMenu}
            className="
              absolute right-6 top-1/2 -translate-y-1/2
              text-black select-none cursor-pointer
              flex items-center justify-center
            "
            aria-label="Open menu"
          >
            {/* Mobile (below md): hamburger icon */}
            <svg
              className="block md:hidden h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            {/* Tablet & Desktop (md+): MENU text */}
            <span className="hidden md:inline text-base sm:text-lg md:text-xl">
              MENU
            </span>
          </button>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
