import fs from "node:fs";

const cachedHtml = fs.readFileSync(`${process.env.TEMP}/gumtree-bmw.html`, "utf8");
const cards = cachedHtml.split('data-q="search-result"').slice(1);
console.log("Cached cards count:", cards.length);

const card0 = cards[0];
const cleanHtml = card0.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
console.log("=== CLEAN CARD 0 ===");
console.log(cleanHtml);
