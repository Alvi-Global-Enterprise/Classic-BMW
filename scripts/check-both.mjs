import fs from "node:fs";

try {
  const res = await fetch("https://www.gumtree.com/search?search_category=cars&search_location=uk&q=bmw", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "en-GB,en;q=0.9",
    },
  });
  console.log("Status:", res.status);
  const html = await res.text();
  console.log("HTML len:", html.length);
  const cards = html.split('data-q="search-result"');
  console.log("split len:", cards.length);
  if (cards.length > 1) {
    fs.writeFileSync(`${process.env.TEMP}/gumtree-live.html`, html, "utf8");
    console.log("Saved live html to TEMP");
  }
} catch (e) {
  console.error("Fetch error:", e.message);
}

// Also check the cached temp file
const cachedHtml = fs.readFileSync(`${process.env.TEMP}/gumtree-bmw.html`, "utf8");
console.log("Cached HTML len:", cachedHtml.length);
const cachedCards = cachedHtml.split('data-q="search-result"');
console.log("Cached split len:", cachedCards.length);
