async function tryFetchPage(page) {
  try {
    const url = `https://www.gumtree.com/search?search_category=cars&search_location=uk&q=bmw&search_page=${page}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Referer": "https://www.gumtree.com/search?search_category=cars&search_location=uk",
      },
    });
    console.log(`Page ${page} status: ${res.status}`);
    const text = await res.text();
    console.log(`Page ${page} text length: ${text.length}`);
    if (text.includes('data-q="search-result"')) {
      const count = (text.match(/data-q="search-result"/g) || []).length;
      console.log(`Page ${page} found ${count} results!`);
      return text;
    }
  } catch (err) {
    console.error(`Page ${page} error:`, err.message);
  }
  return null;
}

const html2 = await tryFetchPage(2);
