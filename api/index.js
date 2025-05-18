export default async function handler(req, res) {
    const { chainId = "solana", tokenAddress } = req.query;
  
    // Secret key check
    const SECRET = process.env.SECRET_KEY;
    const clientSecret = req.headers['x-secret'];
  
    if (clientSecret !== SECRET) {
      return res.status(403).json({ error: "Unauthorized" });
    }
  
    if (!tokenAddress) {
      return res.status(400).json({ error: "Missing `tokenAddress` query param" });
    }
  
    const url = `https://api.dexscreener.com/token-pairs/v1/${chainId}/${tokenAddress}`;
  
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
  