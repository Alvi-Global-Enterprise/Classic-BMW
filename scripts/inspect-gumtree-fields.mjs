import fs from "node:fs";

const html = fs.readFileSync(`${process.env.TEMP}/gumtree-bmw.html`, "utf8");
const cards = html.split('data-q="search-result"').slice(1);
console.log("cards", cards.length);

function textBetween(src, startMarker, endMarker) {
  const i = src.indexOf(startMarker);
  if (i < 0) return "";
  const from = i + startMarker.length;
  const j = src.indexOf(endMarker, from);
  return src.slice(from, j < 0 ? from + 400 : j);
}

for (const card of cards.slice(0, 3)) {
  const href = (card.match(/href="([^"]+)"/) || [])[1];
  const title = textBetween(card, 'data-q="tile-title"', "</");
  const titleClean = title.replace(/<[^>]+>/g, "").replace(/^.*>/, "").trim();
  const price = textBetween(card, 'data-q="tile-price"', "</");
  const loc = textBetween(card, 'data-q="tile-location"', "</");
  const attrs = textBetween(card, 'data-q="tile-attributes"', "</div>");
  const img = (card.match(/src="(https:\/\/img\.gumtree\.com[^"]+)"/) || [])[1];
  const imgAlt = (card.match(/srcset="([^"]+)"/) || [])[1];
  console.log({
    href,
    title: title.replace(/\s+/g, " ").slice(0, 180),
    price: price.replace(/\s+/g, " ").slice(0, 120),
    loc: loc.replace(/\s+/g, " ").slice(0, 120),
    attrs: attrs.replace(/\s+/g, " ").slice(0, 250),
    img,
    imgAlt: imgAlt?.slice(0, 180),
  });
}
