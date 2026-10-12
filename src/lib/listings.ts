import GUMTREE_BMW_DATA from "./gumtree-bmw-listings.json";

export const MODEL_YEAR_CUTOFF = 2026;
export const LISTINGS_BATCH_SIZE = 80;

export type SellerType = "private" | "dealer";

export type Listing = {
  id: string;
  title: string;
  make: string;
  model: string;
  price: number;
  location: string;
  year: number;
  body: string;
  mileage: number;
  source: string;
  url: string;
  image?: string;
  seller: SellerType;
  condition: string;
  featured?: boolean;
};

export type Option = { value: string; label: string };

export const MODEL_OPTIONS: Option[] = [
  { value: "all", label: "All BMW ranges" },
  { value: "1-series", label: "1 Series" },
  { value: "2-series", label: "2 Series" },
  { value: "3-series", label: "3 Series" },
  { value: "4-series", label: "4 Series" },
  { value: "5-series", label: "5 Series" },
  { value: "6-series", label: "6 Series" },
  { value: "7-series", label: "7 Series" },
  { value: "8-series", label: "8 Series" },
  { value: "x1", label: "X1" },
  { value: "x3", label: "X3" },
  { value: "x5", label: "X5" },
  { value: "x6", label: "X6" },
  { value: "z3", label: "Z3" },
  { value: "z4", label: "Z4" },
  { value: "m2", label: "M2" },
  { value: "m3", label: "M3" },
  { value: "m4", label: "M4" },
  { value: "m5", label: "M5" },
  { value: "other-bmw", label: "Other BMW models" },
];

export const BODY_OPTIONS: Option[] = [
  { value: "all", label: "Body style" },
  { value: "Saloon", label: "Saloon" },
  { value: "Coupe", label: "Coupe" },
  { value: "Cabriolet", label: "Convertible / Cabriolet" },
  { value: "Estate", label: "Estate / Touring" },
  { value: "Hatchback", label: "Hatchback" },
  { value: "SUV / 4x4", label: "SUV / 4x4 / X-Drive" },
];

export const BUDGET_OPTIONS: Option[] = [
  { value: "0", label: "Price" },
  { value: "5000", label: "Up to £5k" },
  { value: "10000", label: "Up to £10k" },
  { value: "15000", label: "Up to £15k" },
  { value: "25000", label: "Up to £25k" },
  { value: "40000", label: "Up to £40k" },
];

export const ERA_OPTIONS: Option[] = [
  { value: "0", label: "Era" },
  { value: "2020", label: "2020s onwards" },
  { value: "2015", label: "2015 onwards" },
  { value: "2010", label: "2010 onwards" },
  { value: "2000", label: "2000s onwards" },
  { value: "1990", label: "1990s classics" },
];

export const YEAR_TO_OPTIONS: Option[] = [
  { value: "2026", label: "Any year" },
  { value: "2022", label: "Up to 2022" },
  { value: "2018", label: "Up to 2018" },
  { value: "2015", label: "Up to 2015" },
  { value: "2010", label: "Up to 2010" },
  { value: "2005", label: "Up to 2005" },
];

export const MILEAGE_OPTIONS: Option[] = [
  { value: "0", label: "Any mileage" },
  { value: "50000", label: "Up to 50k" },
  { value: "75000", label: "Up to 75k" },
  { value: "100000", label: "Up to 100k" },
  { value: "125000", label: "Up to 125k" },
  { value: "150000", label: "Up to 150k" },
];

export const SELLER_OPTIONS: Option[] = [
  { value: "all", label: "Any seller" },
  { value: "private", label: "Private sellers" },
  { value: "dealer", label: "Dealers and garages" },
];

export const CONDITION_OPTIONS: Option[] = [
  { value: "all", label: "Any condition" },
  { value: "Excellent", label: "Excellent condition" },
  { value: "Very good", label: "Very good condition" },
  { value: "Good", label: "Good driver condition" },
];

export const SORT_OPTIONS: Option[] = [
  { value: "featured", label: "Sort: featured first" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "year-desc", label: "Newest year first" },
];

export const QUICK_LINKS: Option[] = [
  { value: "3-series", label: "3 Series" },
  { value: "5-series", label: "5 Series" },
  { value: "1-series", label: "1 Series" },
  { value: "4-series", label: "4 Series" },
  { value: "x5", label: "X5" },
  { value: "x3", label: "X3" },
];

export function variantForListing(listing: Listing): Option | null {
  // Check for series models like 320d, 520d, 116i, 420d, 530d, 330i, etc.
  const match3Digit = listing.title.match(/\b([1-8]\d{2}[a-z]?)\b/i);
  if (match3Digit) {
    const val = match3Digit[1].toUpperCase();
    return { value: val.toLowerCase(), label: val };
  }
  // Check for M models like M3, M5, M135i, etc.
  const matchM = listing.title.match(/\b(M\d{1,3}[a-z]?)\b/i);
  if (matchM) {
    const val = matchM[1].toUpperCase();
    return { value: val.toLowerCase(), label: val };
  }
  // Check for X or Z models like X5 3.0d, Z4 2.5, etc.
  const matchXZ = listing.title.match(/\b([XZ]\d(?:\s+[a-z0-9.]+)?)\b/i);
  if (matchXZ) {
    const val = matchXZ[1].trim().toUpperCase();
    return { value: val.toLowerCase().replace(/\s+/g, "-"), label: val };
  }
  return null;
}

export function variantOptionsFor(model: string, listings: Listing[]): Option[] {
  if (model === "all") return [{ value: "all", label: "Choose a BMW range first" }];
  const seen = new Map<string, string>();
  for (const listing of listings) {
    if (listing.model !== model) continue;
    const variant = variantForListing(listing);
    if (variant) seen.set(variant.value, variant.label);
  }
  const variants = [...seen.entries()]
    .sort((a, b) => a[1].localeCompare(b[1], "en-GB", { numeric: true }))
    .map(([value, label]) => ({ value, label }));
  return [{ value: "all", label: "Any model variant" }, ...variants];
}

export const LISTINGS: Listing[] = GUMTREE_BMW_DATA as unknown as Listing[];

export type FilterState = {
  query: string;
  model: string;
  variant: string;
  body: string;
  budget: number;
  yearFrom: number;
  yearTo: number;
  mileage: number;
  seller: string;
  condition: string;
  location: string;
  sort: string;
};

export const DEFAULT_FILTERS: FilterState = {
  query: "",
  model: "all",
  variant: "all",
  body: "all",
  budget: 0,
  yearFrom: 0,
  yearTo: MODEL_YEAR_CUTOFF,
  mileage: 0,
  seller: "all",
  condition: "all",
  location: "",
  sort: "featured",
};

export function filterListings(listings: Listing[], f: FilterState): Listing[] {
  const terms = f.query.toLowerCase().split(/\s+/).filter(Boolean);
  const location = f.location.trim().toLowerCase();

  const result = listings.filter((l) => {
    if (l.year > f.yearTo && f.yearTo < MODEL_YEAR_CUTOFF) return false;
    if (terms.length) {
      const haystack = `${l.title} ${l.location} ${l.body} ${l.source} ${l.year}`.toLowerCase();
      if (!terms.every((t) => haystack.includes(t))) return false;
    }
    if (f.model !== "all" && l.model !== f.model) return false;
    if (f.variant !== "all" && variantForListing(l)?.value !== f.variant) return false;
    if (f.body !== "all" && l.body !== f.body) return false;
    if (f.budget && l.price > f.budget) return false;
    if (f.yearFrom && l.year < f.yearFrom) return false;
    if (f.yearTo && l.year > f.yearTo) return false;
    if (f.mileage && l.mileage > f.mileage) return false;
    if (f.seller !== "all" && l.seller !== f.seller) return false;
    if (f.condition !== "all" && l.condition !== f.condition) return false;
    if (location && !l.location.toLowerCase().includes(location)) return false;
    return true;
  });

  const sorted = [...result];
  switch (f.sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      sorted.sort((a, b) => b.year - a.year);
      break;
    default:
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }
  return sorted;
}

const labelFor = (options: Option[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

export function describeResults(count: number, f: FilterState): string {
  const parts: string[] = [];
  if (f.query) parts.push(`matching “${f.query}”`);
  if (f.model !== "all") parts.push(`in the ${labelFor(MODEL_OPTIONS, f.model)} range`);
  if (f.variant !== "all") parts.push(`variant ${f.variant.toUpperCase()}`);
  if (f.body !== "all") parts.push(`with ${f.body.toLowerCase()} body style`);
  if (f.yearFrom && f.yearTo < MODEL_YEAR_CUTOFF) parts.push(`from ${f.yearFrom} to ${f.yearTo}`);
  else if (f.yearFrom) parts.push(`from ${f.yearFrom} onward`);
  else if (f.yearTo < MODEL_YEAR_CUTOFF) parts.push(`up to year ${f.yearTo}`);
  if (f.budget) parts.push(`priced up to £${f.budget.toLocaleString("en-GB")}`);
  if (f.mileage) parts.push(`with up to ${f.mileage.toLocaleString("en-GB")} miles`);
  if (f.seller !== "all") parts.push(`from ${f.seller === "dealer" ? "dealers" : "private sellers"}`);
  if (f.condition !== "all") parts.push(`in ${f.condition.toLowerCase()} condition`);
  if (f.location) parts.push(`in ${f.location}`);

  const details = parts.length ? ` ${parts.join(", ")}` : "";
  if (!count) {
    return parts.length
      ? `No BMW cars found${details}.`
      : "No BMW cars are currently listed.";
  }
  return `Showing ${count} ${parts.length ? "BMW cars" : "BMW cars from Gumtree UK"}${details}.`;
}

export const formatPrice = (n: number) => `£${n.toLocaleString("en-GB")}`;
export const formatMiles = (n: number) => `${n.toLocaleString("en-GB")} miles`;
