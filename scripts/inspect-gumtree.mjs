import fs from "node:fs";

const html = fs.readFileSync(`${process.env.TEMP}/gumtree-bmw.html`, "utf8");
const hrefs = [...html.matchAll(/href="(\/p\/[^"?#]+)/g)].map((m) => m[1]);
console.log("p hrefs", hrefs.length);
console.log([...new Set(hrefs)].slice(0, 20).join("\n"));

const dataQs = [...html.matchAll(/data-q="([^"]+)"/g)].map((m) => m[1]);
const counts = {};
for (const q of dataQs) counts[q] = (counts[q] || 0) + 1;
console.log(
  "data-q",
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40),
);

for (const s of ["listing-title", "listing-card", "NaturalListing", "search-result", 'data-testid="listing"', "price"]) {
  console.log(s, (html.match(new RegExp(s, "g")) || []).length);
}
