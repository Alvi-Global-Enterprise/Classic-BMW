import fs from "node:fs";

const html = fs.readFileSync(`${process.env.TEMP}/gumtree-bmw.html`, "utf8");
const start = html.indexOf('data-q="search-result"');
const slice = html.slice(Math.max(0, start - 80), start + 4500);
fs.writeFileSync(`${process.env.TEMP}/gumtree-card.txt`, slice);
console.log(slice.slice(0, 2500));
