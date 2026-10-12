"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type HouseAd = {
  id: string;
  href: string;
  brand: [string, string];
  eyebrow: string;
  headline: string;
  badges: [string, string];
  product: string;
  lead: string;
  copy: string;
  features: string[];
  cta: string;
};

const AD: HouseAd = {
  id: "crashedcars-marketplace",
  href: "https://crashedcars.website/marketplace-browse-cars.html?utm_source=classicmercs&utm_medium=display_ad&utm_campaign=salvage_marketplace",
  brand: ["Crashed", "Cars"],
  eyebrow: "UK salvage marketplace",
  headline: "Find your next salvage project.",
  badges: ["CAT S", "CAT N"],
  product: "Repairable cars & parts",
  lead: "Free listings. Smarter checks.",
  copy: "Browse Cat S, Cat N, project cars and parts.",
  features: ["Basic vehicle checks", "Matched parts"],
  cta: "Browse marketplace",
};

function AdLogo() {
  return (
    <span className="grid h-[34px] w-[34px] place-items-center rounded-lg bg-ad-blue text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M4 15l1.6-4.6A2 2 0 0 1 7.5 9h9a2 2 0 0 1 1.9 1.4L20 15v3h-2v-1.5H6V18H4zm3.2-1.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm9.6 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function AdRail() {
  return (
    <aside aria-label="Advertisement" className="sticky top-[108px] hidden w-40 self-start min-[1081px]:block">
      <div className="w-40">
        <p className="mb-[7px] text-center text-[0.65rem] font-bold tracking-[0.08em] text-muted uppercase">Advertisement</p>

        <motion.a
          href={AD.href}
          rel="sponsored noopener noreferrer"
          aria-label="Browse repairable vehicles, project cars and parts on CrashedCars"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.16 }}
          className="relative box-border flex h-[600px] w-40 flex-col items-center overflow-hidden rounded-2xl border border-[#d8e8fb] bg-[radial-gradient(circle_at_88%_6%,rgba(19,127,236,0.16),transparent_26%),linear-gradient(180deg,#ffffff_0%,#f5f9ff_100%)] px-[11px] pt-[14px] pb-[13px] text-center font-ad text-ad-navy shadow-[0_18px_42px_rgba(15,23,42,0.18)] transition-[border-color,box-shadow] hover:border-ad-blue hover:shadow-[0_22px_48px_rgba(19,127,236,0.2)]"
        >
          <span className="flex w-full items-center justify-center gap-[7px] text-[0.94rem] leading-none font-black tracking-[-0.04em]">
            <AdLogo />
            <span>
              {AD.brand[0]}
              <span className="text-ad-blue">{AD.brand[1]}</span>
            </span>
          </span>

          <span className="mt-[13px] rounded-full border border-[#c8def8] bg-[#edf6ff] px-2 py-[5px] text-[0.52rem] leading-[1.2] font-extrabold tracking-[0.09em] text-[#0f66bd] uppercase">
            {AD.eyebrow}
          </span>

          <strong className="mt-[15px] text-[1.26rem] leading-[1.02] font-black tracking-[-0.055em]">{AD.headline}</strong>

          <span className="relative mt-4 block h-[152px] w-full overflow-hidden rounded-xl border border-[#d8e8fb] bg-[linear-gradient(160deg,#c9def5_0%,#8fb4dc_45%,#3c5878_100%)] shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
            <svg viewBox="0 0 136 152" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
              <path d="M10 98c0-6 4-10 10-11l14-3 15-14c4-3 8-5 13-5h18c5 0 9 2 13 5l13 12 12 2c6 1 10 5 10 11v8H10z" fill="#1d2b3d" />
              <path d="M52 72h16v14H43zM73 72h14l11 14H73z" fill="#7da4cf" opacity="0.8" />
              <circle cx="36" cy="104" r="10" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
              <circle cx="102" cy="104" r="10" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
            </svg>
            <span className="absolute inset-[46%_0_0] bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.9))]" />
            <span className="absolute top-2 left-2 z-[1] flex gap-1" aria-hidden="true">
              <span className="rounded-[5px] bg-[#ef4444] px-[5px] py-1 text-[0.48rem] font-black tracking-[0.04em] text-white shadow-[0_3px_10px_rgba(15,23,42,0.18)]">
                {AD.badges[0]}
              </span>
              <span className="rounded-[5px] bg-ad-blue px-[5px] py-1 text-[0.48rem] font-black tracking-[0.04em] text-white shadow-[0_3px_10px_rgba(15,23,42,0.18)]">
                {AD.badges[1]}
              </span>
            </span>
            <span className="absolute right-2 bottom-[9px] left-2 z-[1] text-left text-[0.7rem] leading-[1.18] font-extrabold text-white">
              {AD.product}
            </span>
          </span>

          <span className="mt-[15px] text-[0.8rem] leading-[1.2] font-extrabold">{AD.lead}</span>
          <span className="mt-2 text-[0.62rem] leading-[1.42] text-[#526174]">{AD.copy}</span>

          <span className="mt-[11px] grid w-full gap-[5px] text-left text-[0.56rem] leading-[1.2] font-bold text-[#334155]" aria-hidden="true">
            {AD.features.map((f) => (
              <span key={f} className="flex items-center gap-[5px]">
                <span className="h-[6px] w-[6px] flex-[0_0_6px] rounded-full bg-ad-blue shadow-[0_0_0_3px_rgba(19,127,236,0.12)]" />
                {f}
              </span>
            ))}
          </span>

          <span className="mt-auto box-border w-full rounded-full bg-ad-blue px-[6px] py-[11px] text-[0.58rem] font-black tracking-[0.025em] text-white uppercase shadow-[0_8px_20px_rgba(19,127,236,0.25)]">
            {AD.cta} <span aria-hidden="true">→</span>
          </span>
        </motion.a>

        <Link
          href="/advertise/"
          className="mt-[10px] grid w-40 gap-[2px] rounded-[4px] border border-line bg-white px-[9px] py-[11px] text-center text-black transition-[border-color,transform] hover:-translate-y-px hover:border-brand-blue"
        >
          <strong className="text-[0.78rem] text-brand-blue">Advertise here</strong>
          <span className="text-[0.6rem] leading-[1.35] text-ink-soft">£20/month · rotates with approved ads</span>
        </Link>
      </div>
    </aside>
  );
}
