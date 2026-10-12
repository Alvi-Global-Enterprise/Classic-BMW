const res = await fetch("https://www.gumtree.com/search?search_category=cars&search_location=uk&q=bmw", {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-GB,en;q=0.9",
  },
});
const html = await res.text();
console.log("Status:", res.status);
console.log("Length:", html.length);
console.log("Search results count:", (html.match(/data-q="search-result"/g) || []).length);
console.log("Listing cards count:", (html.match(/href="\/p\//g) || []).length);
