"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

type Supplier = { id: string; name: string; className: string };

const SUPPLIERS: Supplier[] = [
  { id: "ebay", name: "eBay", className: "text-[1.7rem] font-bold tracking-[-0.04em] text-[#e53238]" },
  { id: "autotrader", name: "Autotrader", className: "text-[1.3rem] font-bold tracking-[-0.03em] text-[#0f1e3c]" },
  { id: "gumtree", name: "Gumtree", className: "text-[1.35rem] font-semibold tracking-[-0.02em] text-[#3c8a2e]" },
  { id: "cazoo", name: "CAZOO", className: "text-[1.45rem] font-black tracking-[0.02em] text-black" },
  { id: "carandclassic", name: "CAR & CLASSIC", className: "text-[1rem] font-bold tracking-[0.01em] text-black" },
];

const SECONDS_PER_LOOP = 36;

function SupplierGroup({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-label={hidden ? undefined : "Advertisement sources"}
      aria-hidden={hidden || undefined}
      className="m-0 flex flex-none list-none items-center gap-8 p-0 pr-8 min-[621px]:gap-12 min-[621px]:pr-12"
    >
      {SUPPLIERS.map((s) => (
        <li key={s.id} className="flex-[0_0_132px] min-[621px]:flex-[0_0_144px]">
          <span className="flex h-14 w-[132px] items-center justify-center rounded-[4px] whitespace-nowrap select-none min-[621px]:h-16 min-[621px]:w-36">
            <span className={s.className}>{s.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function SupplierGallery() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupWidth = useRef(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      groupWidth.current = track.scrollWidth / 3;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused || hovered || !groupWidth.current) return;
    const speed = groupWidth.current / (SECONDS_PER_LOOP / 3) / 1000;
    let next = x.get() - speed * delta;
    if (next <= -groupWidth.current) next += groupWidth.current;
    x.set(next);
  });

  return (
    <section
      aria-labelledby="supplier-gallery-title"
      className="border-b border-line bg-white text-ink"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`container-site grid min-h-16 items-center gap-3 min-[621px]:min-h-[76px] min-[621px]:gap-6 ${
          reduceMotion
            ? "grid-cols-1 min-[621px]:grid-cols-[auto_minmax(0,1fr)]"
            : "grid-cols-[minmax(0,1fr)_36px] min-[621px]:grid-cols-[auto_minmax(0,1fr)_40px]"
        }`}
      >
        <h2
          id="supplier-gallery-title"
          className="sr-only m-0 text-[0.72rem] leading-[1.3] font-normal tracking-[0.04em] text-muted uppercase min-[621px]:not-sr-only"
        >
          Ads from
        </h2>

        <div
          role="group"
          aria-label="Advertisement sources"
          tabIndex={-1}
          className={`min-w-0 ${
            reduceMotion
              ? "scrollbar-thin overflow-x-auto"
              : "overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_24px,#000_calc(100%-24px),transparent)]"
          }`}
        >
          <motion.div ref={trackRef} style={{ x: reduceMotion ? 0 : x }} className="flex w-max">
            <SupplierGroup />
            {!reduceMotion && (
              <>
                <SupplierGroup hidden />
                <SupplierGroup hidden />
              </>
            )}
          </motion.div>
        </div>

        {!reduceMotion && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play supplier logo scrolling" : "Pause supplier logo scrolling"}
            title={paused ? "Play supplier logo scrolling" : "Pause supplier logo scrolling"}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line bg-white p-0 text-ink transition-colors hover:border-line-strong hover:bg-paper hover:text-black min-[621px]:h-10 min-[621px]:w-10"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
              {paused ? <path d="M7 4v16l13-8z" /> : <path d="M6 4h4v16H6zm8 0h4v16h-4z" />}
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  );
}
