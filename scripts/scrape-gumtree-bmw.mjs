import fs from "node:fs";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchGumtreePage(page) {
  const url = `https://www.gumtree.com/search?search_category=cars&search_location=uk&q=bmw&search_page=${page}`;
  console.log(`Fetching page ${page}: ${url}...`);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      "Referer": "https://www.gumtree.com/search?search_category=cars&search_location=uk",
    },
  });

  if (res.status !== 200) {
    console.warn(`Page ${page} returned status ${res.status}`);
    return null;
  }
  const text = await res.text();
  console.log(`Page ${page} length: ${text.length}`);
  return text;
}

function parseCards(html, pageNum) {
  const noStyleHtml = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const cards = noStyleHtml.split('data-q="search-result"').slice(1);
  const results = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    // href
    const hrefMatch = card.match(/href="(\/p\/[^"?#]+|\/p\/[^"]+)"/);
    if (!hrefMatch) continue;
    const rawHref = hrefMatch[1];
    const url = rawHref.startsWith("http") ? rawHref : `https://www.gumtree.com${rawHref}`;

    // id
    const idMatch = rawHref.match(/\/(\d+)(?:[/?#]|$)/);
    const id = idMatch ? `gumtree-${idMatch[1]}` : `gumtree-p${pageNum}-${i + 1}`;

    // title
    const titleMatch = card.match(/data-q="tile-title"[^>]*>([^<]+)<\/h[1-6]>/);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title) continue;

    // price
    const priceMatch = card.match(/data-testid="rh-standard-card-price-amount"[^>]*>([\d,]+)</) ||
                       card.match(/data-q="tile-price"[^>]*>[\s\S]*?([0-9,]+)\s*<\/div>/);
    const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ""), 10) : 0;

    // location
    const locMatch = card.match(/data-q="tile-location"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/);
    const location = locMatch ? locMatch[1].trim() : "UK";

    // attributes
    const attrsMatch = card.match(/data-q="tile-attributes"[^>]*>([\s\S]*?)<\/div>/);
    const rawAttrs = attrsMatch ? attrsMatch[1] : "";
    const attrSpans = [...rawAttrs.matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map(m => m[1].trim()).filter(Boolean);

    let year = 0;
    let mileage = 0;
    let seller = "dealer";

    for (const a of attrSpans) {
      if (/^\d{4}$/.test(a)) {
        year = parseInt(a, 10);
      } else if (/miles/i.test(a)) {
        mileage = parseInt(a.replace(/[^\d]/g, ""), 10) || 0;
      } else if (/private/i.test(a)) {
        seller = "private";
      } else if (/trade|dealer/i.test(a)) {
        seller = "dealer";
      }
    }

    if (!year) {
      const yMatch = title.match(/\b(19\d{2}|20\d{2})\b/);
      if (yMatch) year = parseInt(yMatch[1], 10);
      else year = 2016;
    }

    if (!mileage) {
      mileage = 65000;
    }

    // body style detection
    let body = "Saloon";
    if (/touring|estate/i.test(title)) body = "Estate";
    else if (/coupe/i.test(title)) body = "Coupe";
    else if (/convertible|cabriolet/i.test(title)) body = "Cabriolet";
    else if (/hatchback/i.test(title)) body = "Hatchback";
    else if (/suv|x\d|4x4/i.test(title)) body = "SUV / 4x4";
    else body = "Saloon";

    // model range detection
    let model = "other-bmw";
    if (/\b3\s*series\b|\b3\d{2}[a-z]?\b/i.test(title)) model = "3-series";
    else if (/\b5\s*series\b|\b5\d{2}[a-z]?\b/i.test(title)) model = "5-series";
    else if (/\b1\s*series\b|\b1\d{2}[a-z]?\b/i.test(title)) model = "1-series";
    else if (/\b2\s*series\b|\b2\d{2}[a-z]?\b/i.test(title)) model = "2-series";
    else if (/\b4\s*series\b|\b4\d{2}[a-z]?\b/i.test(title)) model = "4-series";
    else if (/\b6\s*series\b|\b6\d{2}[a-z]?\b/i.test(title)) model = "6-series";
    else if (/\b7\s*series\b|\b7\d{2}[a-z]?\b/i.test(title)) model = "7-series";
    else if (/\b8\s*series\b|\b8\d{2}[a-z]?\b/i.test(title)) model = "8-series";
    else if (/\bx1\b/i.test(title)) model = "x1";
    else if (/\bx3\b/i.test(title)) model = "x3";
    else if (/\bx5\b/i.test(title)) model = "x5";
    else if (/\bx6\b/i.test(title)) model = "x6";
    else if (/\bz3\b/i.test(title)) model = "z3";
    else if (/\bz4\b/i.test(title)) model = "z4";
    else if (/\bm3\b/i.test(title)) model = "m3";
    else if (/\bm5\b/i.test(title)) model = "m5";
    else if (/\bm2\b/i.test(title)) model = "m2";
    else if (/\bm4\b/i.test(title)) model = "m4";

    // image
    const imgMatch = card.match(/<img[^>]+src="(https:\/\/img\.gumtree\.com\/[^"]+)"/);
    const image = imgMatch ? imgMatch[1] : undefined;

    const featured = /Featured/i.test(card);

    results.push({
      id,
      title,
      make: "BMW",
      model,
      price,
      location,
      year,
      body,
      mileage,
      source: "Gumtree",
      url,
      image,
      seller,
      condition: year >= 2019 ? "Excellent" : year >= 2012 ? "Very good" : "Good",
      featured,
    });
  }

  return results;
}

async function main() {
  const allListings = [];
  const seenIds = new Set();

  // Try pages 1 to 4
  for (let page = 1; page <= 4; page++) {
    const html = await fetchGumtreePage(page);
    if (!html) {
      console.log(`Page ${page} failed or rate limited, continuing...`);
      // Fallback: if page 1 failed, we also have the cached html
      if (page === 1 && fs.existsSync(`${process.env.TEMP}/gumtree-bmw.html`)) {
        console.log("Using cached gumtree-bmw.html for page 1...");
        const cached = fs.readFileSync(`${process.env.TEMP}/gumtree-bmw.html`, "utf8");
        const parsed = parseCards(cached, 1);
        for (const l of parsed) {
          if (!seenIds.has(l.id)) {
            seenIds.add(l.id);
            allListings.push(l);
          }
        }
      }
      continue;
    }

    const parsed = parseCards(html, page);
    console.log(`Page ${page}: extracted ${parsed.length} listings`);
    for (const l of parsed) {
      if (!seenIds.has(l.id)) {
        seenIds.add(l.id);
        allListings.push(l);
      }
    }

    await sleep(1500); // polite pause between requests
  }

  console.log(`Total unique listings collected: ${allListings.length}`);
  fs.writeFileSync(
    new URL("../src/lib/gumtree-bmw-listings.json", import.meta.url),
    JSON.stringify(allListings, null, 2),
    "utf8"
  );
  console.log("Wrote listings to src/lib/gumtree-bmw-listings.json");
}

main().catch(console.error);
