export const MODEL_YEAR_CUTOFF = 2005;
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
  { value: "all", label: "All Mercedes ranges (MY2005 or older)" },
  { value: "a-class", label: "A-Class" },
  { value: "b-class", label: "B-Class" },
  { value: "c-class", label: "C-Class" },
  { value: "cl-class", label: "CL-Class" },
  { value: "clk-class", label: "CLK-Class" },
  { value: "cls-class", label: "CLS-Class" },
  { value: "e-class", label: "E-Class" },
  { value: "g-class", label: "G-Class" },
  { value: "m-class", label: "M-Class" },
  { value: "r-class", label: "R-Class" },
  { value: "s-class", label: "S-Class" },
  { value: "sl-class", label: "SL-Class" },
  { value: "slk-class", label: "SLK-Class" },
  { value: "slr-class", label: "SLR McLaren" },
  { value: "v-class", label: "V-Class, Vito & Vaneo" },
  { value: "other-classic", label: "Other classic Mercedes" },
];

export const BODY_OPTIONS: Option[] = [
  { value: "all", label: "Body style" },
  { value: "Saloon", label: "Saloon" },
  { value: "Coupe", label: "Coupe" },
  { value: "Cabriolet", label: "Cabriolet" },
  { value: "Roadster", label: "Roadster" },
  { value: "Estate", label: "Estate" },
  { value: "Hatchback", label: "Hatchback" },
  { value: "SUV / 4x4", label: "SUV / 4x4" },
  { value: "MPV", label: "MPV / people carrier" },
  { value: "Limousine", label: "Limousine" },
  { value: "Van / Camper", label: "Van / camper" },
  { value: "Utility", label: "Pickup / utility" },
];

export const BUDGET_OPTIONS: Option[] = [
  { value: "0", label: "Price" },
  { value: "15000", label: "Up to £15k" },
  { value: "30000", label: "Up to £30k" },
  { value: "60000", label: "Up to £60k" },
];

export const ERA_OPTIONS: Option[] = [
  { value: "0", label: "Era" },
  { value: "1970", label: "1970s onwards" },
  { value: "1980", label: "1980s onwards" },
  { value: "1990", label: "1990s onwards" },
  { value: "2000", label: "2000s onwards" },
];

export const YEAR_TO_OPTIONS: Option[] = [
  { value: "2005", label: "2005 model year (site maximum)" },
  { value: "2000", label: "2000" },
  { value: "1995", label: "1995" },
  { value: "1990", label: "1990" },
  { value: "1985", label: "1985" },
];

export const MILEAGE_OPTIONS: Option[] = [
  { value: "0", label: "Any mileage" },
  { value: "75000", label: "Up to 75k" },
  { value: "100000", label: "Up to 100k" },
  { value: "125000", label: "Up to 125k" },
  { value: "150000", label: "Up to 150k" },
  { value: "200000", label: "Up to 200k" },
];

export const SELLER_OPTIONS: Option[] = [
  { value: "all", label: "Any seller" },
  { value: "private", label: "Private sellers" },
  { value: "dealer", label: "Dealers and garages" },
];

export const CONDITION_OPTIONS: Option[] = [
  { value: "all", label: "Any condition" },
  { value: "Collector grade", label: "Collector grade" },
  { value: "Excellent", label: "Excellent" },
  { value: "Very good", label: "Very good" },
  { value: "Good", label: "Good driver / good" },
  { value: "Usable classic", label: "Usable classic" },
];

export const SORT_OPTIONS: Option[] = [
  { value: "featured", label: "Sort: featured first" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "year-desc", label: "Newest year first" },
];

export const QUICK_LINKS: Option[] = [
  { value: "s-class", label: "S-Class" },
  { value: "e-class", label: "E-Class" },
  { value: "c-class", label: "C-Class" },
  { value: "a-class", label: "A-Class" },
  { value: "sl-class", label: "SL-Class" },
  { value: "slk-class", label: "SLK-Class" },
];

const MODEL_VARIANT_PREFIX: Record<string, string> = {
  "a-class": "A",
  "b-class": "B",
  "c-class": "C",
  "cl-class": "CL",
  "clk-class": "CLK",
  "cls-class": "CLS",
  "e-class": "E",
  "g-class": "G",
  "m-class": "ML",
  "r-class": "R",
  "s-class": "S",
  "sl-class": "SL",
  "slk-class": "SLK",
  "slr-class": "SLR",
  "v-class": "V",
};

export function variantForListing(listing: Listing): Option | null {
  const prefix = MODEL_VARIANT_PREFIX[listing.model];
  if (!prefix) return null;
  const match = listing.title.match(new RegExp(`\\b${prefix}[\\s-]*(\\d{2,3})(?!\\d)`, "i"));
  if (!match) return null;
  return { value: `${prefix.toLowerCase()}${match[1]}`, label: `${prefix} ${match[1]}` };
}

export function variantOptionsFor(model: string, listings: Listing[]): Option[] {
  if (model === "all") return [{ value: "all", label: "Choose a Mercedes range first" }];
  const seen = new Map<string, string>();
  for (const listing of listings) {
    if (listing.model !== model) continue;
    const variant = variantForListing(listing);
    if (variant) seen.set(variant.value, variant.label);
  }
  const variants = [...seen.entries()]
    .sort((a, b) => a[1].localeCompare(b[1], "en-GB", { numeric: true }))
    .map(([value, label]) => ({ value, label }));
  return [{ value: "all", label: "Any model" }, ...variants];
}

const AT = "https://m.atcdn.co.uk/a/media/w340";
const AT_URL = "https://www.autotrader.co.uk/car-details";

const slk = (
  id: string,
  image: string,
  price: number,
  location: string,
  mileage: number,
  year = 2005,
): Listing => ({
  id: `autotrader-${id}`,
  title: "Mercedes-Benz SLK 1.8 SLK200 Kompressor 2dr",
  make: "Mercedes-Benz",
  model: "slk-class",
  price,
  location,
  year,
  body: "Other",
  mileage,
  source: "Auto Trader",
  url: `${AT_URL}/${id}`,
  image: `${AT}/${image}.jpg`,
  seller: "dealer",
  condition: "Good",
  featured: true,
});

export const LISTINGS: Listing[] = [
  slk("202401175629808", "5284387cfd7346668577d3d56bbf6ab3", 1300, "Crediton", 128000),
  slk("202510066916139", "e255dd445bdf45ac9cd240247711a5bb", 2500, "Oldbury", 106553),
  slk("202601149148366", "881a382c803a4078a922da8888479a75", 2499, "Luton", 97757),
  slk("202609075803556", "db8898df3cff47a89024071ec730a8cf", 2999, "Sutton", 63417),
  slk("202609095886127", "9bda55aa117140da89c7033549950f5e", 2600, "Edenbridge", 153051),
  slk("202609196201189", "b7cb94f448ac4dd6aceb288174f9de1e", 2000, "Chesham", 99911),
  slk("202609246347854", "1697e2f8835f466187eb09340577e6cd", 2000, "Ipswich", 78000),
  slk("202610046651955", "dea4fe14ac2c4faa95c5f893b4cb960c", 2480, "Hemel Hempstead", 92389),
  slk("202609055749653", "8b8578d25f9d4eeab57df2cc72e6ec9d", 11450, "Crook", 1990, 2004),
  {
    id: "ebay-301",
    title: "Mercedes-Benz SL500 R129 Roadster Auto",
    make: "Mercedes-Benz",
    model: "sl-class",
    price: 14995,
    location: "Guildford",
    year: 1998,
    body: "Roadster",
    mileage: 84200,
    source: "eBay",
    url: "https://www.ebay.co.uk/",
    seller: "dealer",
    condition: "Very good",
  },
  {
    id: "carandclassic-302",
    title: "Mercedes-Benz 280 SL W113 Pagoda",
    make: "Mercedes-Benz",
    model: "sl-class",
    price: 58500,
    location: "Harrogate",
    year: 1970,
    body: "Cabriolet",
    mileage: 71000,
    source: "Car & Classic",
    url: "https://www.carandclassic.com/",
    seller: "dealer",
    condition: "Collector grade",
  },
  {
    id: "gumtree-303",
    title: "Mercedes-Benz E220 W124 Saloon Auto",
    make: "Mercedes-Benz",
    model: "e-class",
    price: 3750,
    location: "Leeds",
    year: 1994,
    body: "Saloon",
    mileage: 146000,
    source: "Gumtree",
    url: "https://www.gumtree.com/",
    seller: "private",
    condition: "Usable classic",
  },
  {
    id: "autotrader-304",
    title: "Mercedes-Benz E320 W210 Avantgarde Estate",
    make: "Mercedes-Benz",
    model: "e-class",
    price: 4250,
    location: "Bristol",
    year: 2001,
    body: "Estate",
    mileage: 118500,
    source: "Auto Trader",
    url: "https://www.autotrader.co.uk/",
    seller: "dealer",
    condition: "Good",
  },
  {
    id: "ebay-305",
    title: "Mercedes-Benz S500 W140 Long Wheelbase",
    make: "Mercedes-Benz",
    model: "s-class",
    price: 8995,
    location: "Manchester",
    year: 1996,
    body: "Limousine",
    mileage: 132000,
    source: "eBay",
    url: "https://www.ebay.co.uk/",
    seller: "private",
    condition: "Good",
  },
  {
    id: "carandclassic-306",
    title: "Mercedes-Benz 560 SEC C126 Coupe",
    make: "Mercedes-Benz",
    model: "s-class",
    price: 27950,
    location: "Cheltenham",
    year: 1989,
    body: "Coupe",
    mileage: 92000,
    source: "Car & Classic",
    url: "https://www.carandclassic.com/",
    seller: "dealer",
    condition: "Excellent",
  },
  {
    id: "gumtree-307",
    title: "Mercedes-Benz C180 W202 Elegance Saloon",
    make: "Mercedes-Benz",
    model: "c-class",
    price: 1650,
    location: "Norwich",
    year: 1999,
    body: "Saloon",
    mileage: 104000,
    source: "Gumtree",
    url: "https://www.gumtree.com/",
    seller: "private",
    condition: "Usable classic",
  },
  {
    id: "cazoo-308",
    title: "Mercedes-Benz C32 AMG W203 Saloon",
    make: "Mercedes-Benz",
    model: "c-class",
    price: 9450,
    location: "Reading",
    year: 2003,
    body: "Saloon",
    mileage: 88500,
    source: "Cazoo",
    url: "https://www.cazoo.co.uk/",
    seller: "dealer",
    condition: "Very good",
  },
  {
    id: "autotrader-309",
    title: "Mercedes-Benz A160 W168 Elegance Hatchback",
    make: "Mercedes-Benz",
    model: "a-class",
    price: 995,
    location: "Swindon",
    year: 2002,
    body: "Hatchback",
    mileage: 121000,
    source: "Auto Trader",
    url: "https://www.autotrader.co.uk/",
    seller: "private",
    condition: "Usable classic",
  },
  {
    id: "ebay-310",
    title: "Mercedes-Benz G300 W463 Station Wagon",
    make: "Mercedes-Benz",
    model: "g-class",
    price: 29995,
    location: "Exeter",
    year: 1995,
    body: "SUV / 4x4",
    mileage: 139000,
    source: "eBay",
    url: "https://www.ebay.co.uk/",
    seller: "dealer",
    condition: "Very good",
  },
  {
    id: "carandclassic-311",
    title: "Mercedes-Benz CLK320 W208 Cabriolet",
    make: "Mercedes-Benz",
    model: "clk-class",
    price: 3995,
    location: "Brighton",
    year: 2000,
    body: "Cabriolet",
    mileage: 97000,
    source: "Car & Classic",
    url: "https://www.carandclassic.com/",
    seller: "private",
    condition: "Good",
  },
  {
    id: "gumtree-312",
    title: "Mercedes-Benz V230 W638 MPV",
    make: "Mercedes-Benz",
    model: "v-class",
    price: 3450,
    location: "Cardiff",
    year: 1999,
    body: "MPV",
    mileage: 168000,
    source: "Gumtree",
    url: "https://www.gumtree.com/",
    seller: "private",
    condition: "Usable classic",
  },
  {
    id: "carandclassic-313",
    title: "Mercedes-Benz 300 TE W123 Estate",
    make: "Mercedes-Benz",
    model: "e-class",
    price: 12750,
    location: "York",
    year: 1984,
    body: "Estate",
    mileage: 154000,
    source: "Car & Classic",
    url: "https://www.carandclassic.com/",
    seller: "dealer",
    condition: "Excellent",
  },
];

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
    if (l.year > MODEL_YEAR_CUTOFF) return false;
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
  if (f.variant !== "all") parts.push(`model ${f.variant.toUpperCase()}`);
  if (f.body !== "all") parts.push(`with ${f.body.toLowerCase()} body style`);
  if (f.yearFrom && f.yearTo < MODEL_YEAR_CUTOFF) parts.push(`from ${f.yearFrom} to ${f.yearTo}`);
  else if (f.yearFrom) parts.push(`from ${f.yearFrom} onward`);
  else if (f.yearTo < MODEL_YEAR_CUTOFF) parts.push(`up to model year ${f.yearTo}`);
  if (f.budget) parts.push(`priced up to £${f.budget.toLocaleString("en-GB")}`);
  if (f.mileage) parts.push(`with up to ${f.mileage.toLocaleString("en-GB")} miles`);
  if (f.seller !== "all") parts.push(`from ${f.seller === "dealer" ? "dealers" : "private sellers"}`);
  if (f.condition !== "all") parts.push(`in ${f.condition.toLowerCase()} condition`);
  if (f.location) parts.push(`in ${f.location}`);

  const details = parts.length ? ` ${parts.join(", ")}` : "";
  if (!count) {
    return parts.length
      ? `No classic Mercedes cars found${details}.`
      : "No classic Mercedes cars are currently listed.";
  }
  return `Showing ${parts.length ? "classic Mercedes cars" : "all classic Mercedes cars"}${details}.`;
}

export const formatPrice = (n: number) => `£${n.toLocaleString("en-GB")}`;
export const formatMiles = (n: number) => `${n.toLocaleString("en-GB")} miles`;
