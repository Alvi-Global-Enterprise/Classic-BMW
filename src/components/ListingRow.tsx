"use client";

import { motion } from "framer-motion";
import { formatMiles, formatPrice, type Listing } from "@/lib/listings";

type Props = {
  listing: Listing;
  saved: boolean;
  index: number;
  onToggleSave: (id: string) => void;
};

function PhotoPlaceholder() {
  return (
    <svg viewBox="0 0 96 75" className="h-full w-full text-[#b8b8b8]" aria-hidden="true">
      <rect width="96" height="75" fill="#ebebeb" />
      <path
        d="M18 47c0-4 2-6 6-7l8-2 8-8c2-2 4-3 7-3h10c3 0 5 1 7 3l7 7 7 1c3 1 5 3 5 6v4H18z"
        fill="currentColor"
      />
      <circle cx="31" cy="50" r="5" fill="#ebebeb" stroke="currentColor" strokeWidth="3" />
      <circle cx="66" cy="50" r="5" fill="#ebebeb" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

const metaChip =
  "inline-flex min-h-[22px] items-center rounded-[3px] bg-paper px-[5px] text-[0.65rem] whitespace-nowrap text-ink min-[701px]:px-[6px] min-[701px]:text-[0.64rem]";

export function ListingRow({ listing, saved, index, onToggleSave }: Props) {
  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, delay: Math.min(index, 12) * 0.025 }}
      className="grid min-h-[168px] grid-cols-[86px_minmax(0,1fr)] items-start border-b border-line-soft bg-white transition-[background-color,box-shadow] duration-150 last:border-b-0 hover:bg-[#f8f8f8] hover:shadow-[inset_3px_0_0_var(--color-brand-blue)] focus-within:bg-[#f8f8f8] focus-within:shadow-[inset_3px_0_0_var(--color-brand-blue)] min-[701px]:h-[76px] min-[701px]:min-h-[76px] min-[701px]:grid-cols-[96px_minmax(0,1fr)] min-[701px]:grid-rows-[76px] min-[701px]:items-stretch"
    >
      <div className="relative mt-[10px] h-24 w-[86px] self-start overflow-hidden bg-line-soft min-[701px]:mt-0 min-[701px]:h-[75px] min-[701px]:w-24 min-[701px]:self-stretch min-[701px]:border-r min-[701px]:border-line">
        {listing.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.image}
            alt={`${listing.title} in Not supplied`}
            width={1200}
            height={800}
            loading="lazy"
            className="block h-full w-full object-cover"
          />
        ) : (
          <PhotoPlaceholder />
        )}
        <span className="absolute top-1 left-1 hidden min-h-[18px] max-w-[88px] items-center overflow-hidden rounded-[3px] border border-line bg-white px-[5px] text-[0.58rem] text-ellipsis whitespace-nowrap text-ink min-[701px]:inline-flex">
          {listing.source}
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-[7px] p-[10px] [grid-template-areas:'title'_'price'_'meta'_'actions'] min-[701px]:grid-cols-[minmax(130px,1.7fr)_minmax(135px,1.2fr)_minmax(100px,0.8fr)_minmax(130px,0.9fr)] min-[701px]:gap-[10px] min-[701px]:px-[10px] min-[701px]:py-[7px] min-[701px]:[grid-template-areas:'title_meta_price_actions'] min-[821px]:grid-cols-[minmax(180px,2fr)_minmax(180px,1.25fr)_minmax(145px,0.9fr)_minmax(160px,0.85fr)]">
        <h3 className="m-0 line-clamp-2 min-w-0 text-[0.9rem] leading-[1.25] font-bold text-black [grid-area:title] min-[701px]:line-clamp-none min-[701px]:truncate min-[701px]:leading-[1.2] min-[701px]:text-[0.92rem]">
          {listing.title}
        </h3>

        <div className="flex min-w-0 flex-wrap items-baseline gap-x-[10px] gap-y-[5px] [grid-area:price] min-[701px]:grid min-[701px]:justify-start min-[701px]:gap-px">
          <strong className="text-base leading-[1.1] font-bold text-black min-[701px]:text-[0.98rem]">{formatPrice(listing.price)}</strong>
          <small className="block max-w-full truncate text-[0.7rem] min-[701px]:text-[0.68rem]">{listing.location}</small>
        </div>

        <div className="flex min-w-0 flex-wrap gap-1 [grid-area:meta] min-[701px]:flex-nowrap min-[701px]:overflow-hidden">
          <span className={metaChip}>{listing.year}</span>
          <span className={metaChip}>{listing.body}</span>
          <span className={metaChip}>{formatMiles(listing.mileage)}</span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_44px] gap-[6px] [grid-area:actions] min-[701px]:grid-cols-[minmax(0,1fr)_48px] min-[701px]:gap-[5px]">
          <a
            href={listing.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex min-h-9 items-center justify-center overflow-hidden rounded-[4px] border border-brand-blue bg-brand-blue px-[5px] text-[0.7rem] font-bold text-ellipsis whitespace-nowrap text-white transition-colors hover:border-brand-blue-deep hover:bg-brand-blue-deep min-[701px]:min-h-8 min-[701px]:px-[6px] min-[701px]:text-[0.68rem]"
          >
            View on {listing.source}
          </a>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => onToggleSave(listing.id)}
            aria-label={`${saved ? "Unsave" : "Save"} ${listing.title}`}
            aria-pressed={saved}
            className={`inline-flex min-h-9 cursor-pointer items-center justify-center overflow-hidden rounded-[4px] border px-[5px] text-[0.7rem] font-bold whitespace-nowrap transition-colors min-[701px]:min-h-8 min-[701px]:px-[6px] min-[701px]:text-[0.68rem] ${
              saved ? "border-ink bg-ink text-white" : "border-line bg-white text-black hover:border-ink hover:bg-paper"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
