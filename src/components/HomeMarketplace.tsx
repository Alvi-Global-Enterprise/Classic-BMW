"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AdRail } from "./AdRail";
import { FinderDock } from "./FinderDock";
import { ListingRow } from "./ListingRow";
import {
  DEFAULT_FILTERS,
  LISTINGS,
  LISTINGS_BATCH_SIZE,
  SORT_OPTIONS,
  describeResults,
  filterListings,
  variantOptionsFor,
  type FilterState,
} from "@/lib/listings";

const SAVED_KEY = "classicMercsSaved";
const SAVED_EVENT = "classic-mercs-saved";

function subscribeSaved(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SAVED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SAVED_EVENT, callback);
  };
}

const readSavedRaw = () => localStorage.getItem(SAVED_KEY) ?? "[]";

function parseSaved(raw: string): Set<string> {
  try {
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function useSavedListings() {
  const raw = useSyncExternalStore(subscribeSaved, readSavedRaw, () => "[]");
  const saved = useMemo(() => parseSaved(raw), [raw]);

  const toggle = useCallback((id: string) => {
    const next = parseSaved(readSavedRaw());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    localStorage.setItem(SAVED_KEY, JSON.stringify([...next]));
    window.dispatchEvent(new Event(SAVED_EVENT));
  }, []);

  return { saved, toggle };
}

const TABLE_HEAD = ["Photo", "Vehicle", "Year · body · mileage", "Price & location", "Listing"];

export function HomeMarketplace() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [visible, setVisible] = useState(LISTINGS_BATCH_SIZE);
  const { saved, toggle } = useSavedListings();

  const updateFilters = useCallback((patch: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setVisible(LISTINGS_BATCH_SIZE);
  }, []);

  const results = useMemo(() => filterListings(LISTINGS, filters), [filters]);
  const variantOptions = useMemo(() => variantOptionsFor(filters.model, LISTINGS), [filters.model]);
  const shown = results.slice(0, visible);
  const description = describeResults(results.length, filters);

  const scrollToResults = () => document.getElementById("home-inventory")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <FinderDock filters={filters} variantOptions={variantOptions} onChange={updateFilters} onSubmit={scrollToResults} />

      <main id="main-content">
        <section
          id="home-inventory"
          aria-label="BMW cars for sale"
          className="scroll-mt-[110px] bg-white pt-[22px] pb-[54px] min-[521px]:pt-6 min-[621px]:pt-8 min-[821px]:pb-[72px]"
        >
          <div className="container-site">
            <div className="mb-[14px] min-[521px]:mb-6">
              <h1 className="m-0 font-display text-[1.75rem] leading-[1.2] font-normal text-black min-[621px]:text-[2rem]">
                Cars for sale now
              </h1>
            </div>

            <div className="grid grid-cols-1 items-start gap-5 min-[1081px]:grid-cols-[minmax(0,1fr)_160px]">
              <div className="min-w-0">
                <div className="mb-2 flex min-h-[42px] items-center justify-between gap-3 text-ink min-[521px]:mb-[14px] min-[521px]:min-h-[50px] max-[620px]:flex-wrap">
                  <span aria-live="polite" className="min-w-0 font-bold [overflow-wrap:anywhere]">
                    {description}
                  </span>
                  <label className="ml-auto w-full min-[621px]:w-[min(250px,100%)]">
                    <span className="sr-only">Sort listings</span>
                    <select
                      value={filters.sort}
                      onChange={(e) => updateFilters({ sort: e.target.value })}
                      className="min-h-12 w-full cursor-pointer rounded-[4px] border border-line-strong bg-white px-[13px] py-[11px] pr-9 text-ink transition-colors hover:border-ink"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div
                  aria-hidden="true"
                  className="hidden min-h-[34px] grid-cols-[96px_minmax(180px,2fr)_minmax(180px,1.25fr)_minmax(145px,0.9fr)_minmax(160px,0.85fr)] items-center gap-[10px] border border-b-0 border-line bg-paper px-[10px] text-[0.68rem] font-bold tracking-[0.04em] text-ink-soft uppercase min-[821px]:grid"
                >
                  {TABLE_HEAD.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>

                <div aria-live="polite" className="overflow-hidden rounded-lg border border-line bg-white min-[821px]:rounded-none">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {shown.map((listing, i) => (
                      <ListingRow key={listing.id} listing={listing} index={i} saved={saved.has(listing.id)} onToggleSave={toggle} />
                    ))}
                  </AnimatePresence>
                  {!shown.length && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="m-0 p-6 text-center text-ink-soft">
                      Try removing a filter or searching for a different BMW model.
                    </motion.p>
                  )}
                </div>

                {results.length > visible && (
                  <nav
                    aria-label="More cars for sale"
                    className="mt-4 flex flex-col items-stretch justify-between gap-4 rounded-[4px] border border-line bg-white px-4 py-[14px] text-center min-[521px]:flex-row min-[521px]:items-center min-[521px]:text-left"
                  >
                    <span className="text-[0.82rem] font-bold text-ink-soft">
                      Showing {shown.length} of {results.length} cars
                    </span>
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + LISTINGS_BATCH_SIZE)}
                      className="min-h-10 cursor-pointer rounded-full border border-brand-blue bg-brand-blue px-[18px] py-2 font-bold text-white transition-colors hover:bg-brand-blue-deep"
                    >
                      Load more cars
                    </button>
                  </nav>
                )}
              </div>

              <AdRail />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
