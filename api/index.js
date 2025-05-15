export default async function handler(req, res) {
    const { chain = "solana", pair } = req.query;
  
    if (!pair) {
      return res.status(400).json({ error: "Missing `pair` query param" });
    }
  
    const url = `https://api.dexscreener.com/latest/dex/pairs/${chain}/${pair}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/112.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Referer": "https://dexscreener.com/"
        }
      });
  
      if (!response.ok) {
        return res.status(response.status).json({ error: "Dexscreener blocked or failed" });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  