import fs from "node:fs";

const res = await fetch("https://www.gumtree.com/search?search_category=cars&search_location=uk&q=bmw", {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-GB,en;q=0.9",
  },
});
const html = await res.text();
const cards = html.split('data-q="search-result"').slice(1);
const card0 = cards[0];

console.log("=== RAW CARD 0 ===");
console.log(card0.slice(0, 3000));
