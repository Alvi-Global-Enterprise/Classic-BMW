import fs from "node:fs";

const res = await fetch("https://www.gumtree.com/search?search_category=cars&search_location=uk&q=bmw", {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-GB,en;q=0.9",
  },
});
const html = await res.text();

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function textBetween(src, startMarker, endMarker) {
  const i = src.indexOf(startMarker);
  if (i < 0) return "";
  const from = i + startMarker.length;
  const j = src.indexOf(endMarker, from);
  return src.slice(from, j < 0 ? from + 1000 : j);
}

const cards = html.split('data-q="search-result"').slice(1);
console.log(`Found ${cards.length} cards`);

const listings = [];

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];

  // href
  const hrefMatch = card.match(/href="([^"]+)"/);
  const href = hrefMatch ? hrefMatch[1] : "";
  const fullUrl = href.startsWith("http") ? href : `https://www.gumtree.com${href}`;

  // id from href
  const idMatch = href.match(/\/(\d+)$/) || href.match(/\/p\/[^/]+\/(\d+)/);
  const id = idMatch ? `gumtree-${idMatch[1]}` : `gumtree-${i + 1}`;

  // title
  const rawTitle = textBetween(card, 'data-q="tile-title"', "</h");
  const title = stripHtml(rawTitle);

  // price
  const rawPrice = textBetween(card, 'data-q="tile-price"', "</div>");
  const priceClean = stripHtml(rawPrice).replace(/[^\d.]/g, "");
  const price = parseFloat(priceClean) || 0;

  // location
  const rawLoc = textBetween(card, 'data-q="tile-location"', "</div>");
  const location = stripHtml(rawLoc);

  // attributes (year, mileage, body, engine, etc.)
  const rawAttrs = textBetween(card, 'data-q="tile-attributes"', "</div>");
  // split spans inside rawAttrs
  const attrMatches = [...rawAttrs.matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map(m => m[1].trim()).filter(Boolean);

  // image: look for src or srcset
  // Gumtree often has images like https://img.gumtree.com/...
  let img = "";
  const imgMatch = card.match(/src="(https:\/\/img\.gumtree\.com\/[^"]+)"/);
  if (imgMatch) {
    img = imgMatch[1];
  } else {
    const srcsetMatch = card.match(/srcset="([^"\s]+)/);
    if (srcsetMatch && srcsetMatch[1].startsWith("https://img.gumtree.com")) {
      img = srcsetMatch[1];
    }
  }

  // Parse year, mileage, body from attrs and title
  let year = 0;
  let mileage = 0;
  let body = "Saloon";

  for (const attr of attrMatches) {
    if (/^\d{4}$/.test(attr)) {
      year = parseInt(attr, 10);
    } else if (/miles/i.test(attr) || /k\s*miles/i.test(attr)) {
      const mVal = attr.replace(/[^\d]/g, "");
      mileage = parseInt(mVal, 10) || 0;
    } else if (/saloon|coupe|convertible|estate|hatchback|suv/i.test(attr)) {
      body = attr;
    }
  }

  // fallback year from title if not found in attrs
  if (!year) {
    const yMatch = title.match(/\b(19\d{2}|20\d{2})\b/);
    if (yMatch) year = parseInt(yMatch[1], 10);
  }

  // fallback body from title
  if (body === "Saloon") {
    if (/estate|touring/i.test(title)) body = "Estate";
    else if (/coupe/i.test(title)) body = "Coupe";
    else if (/convertible|cabriolet/i.test(title)) body = "Convertible";
    else if (/hatchback/i.test(title)) body = "Hatchback";
    else if (/suv|x\d/i.test(title)) body = "SUV / 4x4";
  }

  // detect model
  let model = "other-bmw";
  if (/\b3\s*series\b|\b3\d{2}\b/i.test(title)) model = "3-series";
  else if (/\b5\s*series\b|\b5\d{2}\b/i.test(title)) model = "5-series";
  else if (/\b1\s*series\b|\b1\d{2}\b/i.test(title)) model = "1-series";
  else if (/\b2\s*series\b|\b2\d{2}\b/i.test(title)) model = "2-series";
  else if (/\b4\s*series\b|\b4\d{2}\b/i.test(title)) model = "4-series";
  else if (/\b6\s*series\b|\b6\d{2}\b/i.test(title)) model = "6-series";
  else if (/\b7\s*series\b|\b7\d{2}\b/i.test(title)) model = "7-series";
  else if (/\b8\s*series\b|\b8\d{2}\b/i.test(title)) model = "8-series";
  else if (/\bx1\b/i.test(title)) model = "x1";
  else if (/\bx3\b/i.test(title)) model = "x3";
  else if (/\bx5\b/i.test(title)) model = "x5";
  else if (/\bx6\b/i.test(title)) model = "x6";
  else if (/\bz3\b/i.test(title)) model = "z3";
  else if (/\bz4\b/i.test(title)) model = "z4";
  else if (/\bm3\b/i.test(title)) model = "m3";
  else if (/\bm5\b/i.test(title)) model = "m5";

  listings.push({
    id,
    title,
    make: "BMW",
    model,
    price,
    location: location || "UK",
    year: year || 2015,
    body,
    mileage: mileage || 65000,
    source: "Gumtree",
    url: fullUrl,
    image: img || undefined,
    seller: "dealer",
    condition: "Good",
  });
}

console.log(JSON.stringify(listings.slice(0, 3), null, 2));
