"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BODY_OPTIONS,
  BUDGET_OPTIONS,
  CONDITION_OPTIONS,
  ERA_OPTIONS,
  MILEAGE_OPTIONS,
  MODEL_OPTIONS,
  QUICK_LINKS,
  SELLER_OPTIONS,
  YEAR_TO_OPTIONS,
  type FilterState,
  type Option,
} from "@/lib/listings";

type Props = {
  filters: FilterState;
  variantOptions: Option[];
  onChange: (patch: Partial<FilterState>) => void;
  onSubmit: () => void;
};

const primarySelect =
  "min-h-12 w-full cursor-pointer rounded-[4px] border border-line-strong bg-white py-2 pr-[34px] pl-[14px] text-[0.88rem] text-ink transition-colors hover:border-ink max-[430px]:pr-7 max-[430px]:pl-[11px] max-[430px]:text-[0.82rem]";

const advancedControl =
  "min-h-11 w-full rounded-[4px] border border-line-strong bg-white px-[13px] py-[11px] text-[0.9rem] text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-60";

function Options({ options }: { options: Option[] }) {
  return options.map((o) => (
    <option key={o.value} value={o.value}>
      {o.label}
    </option>
  ));
}

function PrimaryFilter({ id, label, hiddenOnPhone, children }: { id: string; label: string; hiddenOnPhone: boolean; children: ReactNode }) {
  return (
    <label htmlFor={id} className={`relative min-w-0 ${hiddenOnPhone ? "max-[520px]:hidden" : ""}`}>
      <span className="sr-only">{label}</span>
      {children}
    </label>
  );
}

function AdvancedFilter({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <label htmlFor={id} className="grid min-w-0 gap-[6px] text-[0.78rem] text-black">
      <span>{label}</span>
      {children}
    </label>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10.4 10.4 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M1 4h14M1 8h14M1 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="2" width="3" height="4" rx="1" fill="currentColor" />
      <rect x="9" y="6" width="3" height="4" rx="1" fill="currentColor" />
      <rect x="5" y="10" width="3" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

export function FinderDock({ filters, variantOptions, onChange, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    onSubmit();
  };

  const hideOnPhone = !open;

  return (
    <section aria-label="Find a classic Mercedes" className="relative z-20 border-b border-line bg-white">
      <div className="container-site py-2 min-[521px]:py-[14px] min-[621px]:pt-5 min-[621px]:pb-4">
        <form role="search" onSubmit={submit}>
          <div
            className={`grid items-center gap-2 min-[521px]:gap-[9px] ${
              open ? "grid-cols-2" : "grid-cols-[minmax(0,1fr)_auto]"
            } min-[521px]:grid-cols-2 min-[701px]:grid-cols-[minmax(260px,2fr)_repeat(2,minmax(125px,1fr))] min-[1051px]:grid-cols-[minmax(280px,1.75fr)_repeat(4,minmax(118px,0.8fr))_minmax(128px,0.72fr)]`}
          >
            <label className={`relative block ${open ? "col-span-full" : ""} min-[521px]:col-span-full min-[701px]:col-span-1`}>
              <span className="sr-only">Search cars</span>
              <button
                type="submit"
                aria-label="Search cars"
                className="absolute top-[6px] left-[7px] z-[2] inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-brand-blue p-0 text-white transition-colors hover:bg-brand-blue-deep"
              >
                <SearchIcon />
              </button>
              <input
                type="search"
                name="q"
                value={filters.query}
                onChange={(e) => onChange({ query: e.target.value })}
                placeholder="Find your dream Mercedes"
                autoComplete="off"
                className="min-h-12 w-full rounded-[4px] border border-line-strong bg-white py-[10px] pr-[14px] pl-[58px] text-[0.9rem] text-ink transition-colors hover:border-ink min-[431px]:text-[0.98rem]"
              />
            </label>

            <PrimaryFilter id="finder-model" label="Mercedes range" hiddenOnPhone={hideOnPhone}>
              <select
                id="finder-model"
                value={filters.model}
                onChange={(e) => onChange({ model: e.target.value, variant: "all" })}
                className={primarySelect}
              >
                <Options options={MODEL_OPTIONS} />
              </select>
            </PrimaryFilter>

            <PrimaryFilter id="finder-body" label="Body style" hiddenOnPhone={hideOnPhone}>
              <select id="finder-body" value={filters.body} onChange={(e) => onChange({ body: e.target.value })} className={primarySelect}>
                <Options options={BODY_OPTIONS} />
              </select>
            </PrimaryFilter>

            <PrimaryFilter id="finder-budget" label="Price" hiddenOnPhone={hideOnPhone}>
              <select
                id="finder-budget"
                value={String(filters.budget)}
                onChange={(e) => onChange({ budget: Number(e.target.value) })}
                className={primarySelect}
              >
                <Options options={BUDGET_OPTIONS} />
              </select>
            </PrimaryFilter>

            <PrimaryFilter id="finder-year-from" label="Era" hiddenOnPhone={hideOnPhone}>
              <select
                id="finder-year-from"
                value={String(filters.yearFrom)}
                onChange={(e) => onChange({ yearFrom: Number(e.target.value) })}
                className={primarySelect}
              >
                <Options options={ERA_OPTIONS} />
              </select>
            </PrimaryFilter>

            <div ref={moreRef} className={`relative min-w-0 ${open ? "col-span-full" : ""} min-[521px]:col-span-full min-[701px]:col-span-1`}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                aria-expanded={open}
                aria-controls="finder-advanced"
                onClick={() => setOpen((o) => !o)}
                className="flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-brand-blue bg-brand-blue px-4 text-[0.88rem] font-bold whitespace-nowrap text-white transition-colors hover:border-brand-blue-deep hover:bg-brand-blue-deep max-[700px]:rounded-xl min-[521px]:min-h-12"
              >
                <SlidersIcon />
                All filters
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    id="finder-advanced"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="z-[90] mt-[10px] grid w-full origin-top-right grid-cols-1 gap-[14px] rounded-xl border border-line bg-white p-[14px] shadow-[0_14px_38px_rgba(14,24,22,0.14)] min-[701px]:absolute min-[701px]:top-[calc(100%+12px)] min-[701px]:right-0 min-[701px]:mt-0 min-[701px]:w-[min(760px,calc(100vw-32px))] min-[701px]:grid-cols-3 min-[701px]:p-5 min-[701px]:shadow-[0_12px_32px_rgb(0_0_0/16%)]"
                  >
                    <AdvancedFilter id="finder-variant" label="Specific model">
                      <select
                        id="finder-variant"
                        value={filters.variant}
                        disabled={filters.model === "all"}
                        onChange={(e) => onChange({ variant: e.target.value })}
                        className={advancedControl}
                      >
                        <Options options={variantOptions} />
                      </select>
                    </AdvancedFilter>
                    <AdvancedFilter id="finder-year-to" label="Year to">
                      <select
                        id="finder-year-to"
                        value={String(filters.yearTo)}
                        onChange={(e) => onChange({ yearTo: Number(e.target.value) })}
                        className={advancedControl}
                      >
                        <Options options={YEAR_TO_OPTIONS} />
                      </select>
                    </AdvancedFilter>
                    <AdvancedFilter id="finder-mileage" label="Max mileage">
                      <select
                        id="finder-mileage"
                        value={String(filters.mileage)}
                        onChange={(e) => onChange({ mileage: Number(e.target.value) })}
                        className={advancedControl}
                      >
                        <Options options={MILEAGE_OPTIONS} />
                      </select>
                    </AdvancedFilter>
                    <AdvancedFilter id="finder-seller" label="Seller">
                      <select
                        id="finder-seller"
                        value={filters.seller}
                        onChange={(e) => onChange({ seller: e.target.value })}
                        className={advancedControl}
                      >
                        <Options options={SELLER_OPTIONS} />
                      </select>
                    </AdvancedFilter>
                    <AdvancedFilter id="finder-condition" label="Condition">
                      <select
                        id="finder-condition"
                        value={filters.condition}
                        onChange={(e) => onChange({ condition: e.target.value })}
                        className={advancedControl}
                      >
                        <Options options={CONDITION_OPTIONS} />
                      </select>
                    </AdvancedFilter>
                    <AdvancedFilter id="finder-location" label="Location">
                      <input
                        id="finder-location"
                        type="search"
                        value={filters.location}
                        onChange={(e) => onChange({ location: e.target.value })}
                        placeholder="County or city"
                        autoComplete="off"
                        className={advancedControl}
                      />
                    </AdvancedFilter>
                    <button
                      type="submit"
                      className="min-h-11 cursor-pointer self-end rounded-full border border-brand-blue bg-brand-blue font-bold text-white transition-colors hover:border-brand-blue-deep hover:bg-brand-blue-deep"
                    >
                      Show results
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>

        <nav
          aria-label="Popular vehicle searches"
          className={`scrollbar-thin mt-[10px] -mx-[2px] items-center gap-[10px] overflow-x-auto px-[2px] pb-[2px] min-[701px]:mx-0 min-[701px]:px-0 ${
            open ? "flex" : "hidden min-[521px]:flex"
          }`}
        >
          {QUICK_LINKS.map((q) => (
            <QuickChip key={q.value} active={filters.model === q.value} onClick={() => onChange({ model: q.value, variant: "all" })}>
              {q.label}
            </QuickChip>
          ))}
          <QuickChip
            last
            active={false}
            onClick={() => onChange({ model: "all", variant: "all" })}
          >
            All MY2005-or-older cars
          </QuickChip>
        </nav>
      </div>
    </section>
  );
}

function QuickChip({ children, active, last, onClick }: { children: ReactNode; active: boolean; last?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={last ? undefined : active}
      className={`inline-flex min-h-[35px] flex-none cursor-pointer items-center rounded-full border px-[14px] text-[0.8rem] whitespace-nowrap transition-colors hover:border-ink hover:bg-paper hover:text-black ${
        active ? "border-ink bg-paper text-black" : last ? "border-line-strong bg-white text-ink" : "border-line bg-white text-ink"
      } ${last ? "min-[1051px]:ml-auto" : ""}`}
    >
      {children}
    </button>
  );
}
