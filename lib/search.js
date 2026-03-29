function normalize(text = "") {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9+]+/g, " ")
    .trim();
}

function levenshtein(a = "", b = "") {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function buildTerms(product) {
  return [
    product.title,
    product.category,
    ...(product.tags || []),
    ...(product.aliases || []),
    product.description
  ]
    .filter(Boolean)
    .map(normalize);
}

export function interpretQuery(query = "") {
  const q = normalize(query);
  if (!q) return { normalized: "", corrected: "", interpretedAs: "" };

  const hardMap = {
    "chatgpt": "chatgpt",
    "chat gpt": "chatgpt",
    "chtgpt": "chatgpt",
    "chagpt": "chatgpt",
    "cgpt": "chatgpt",
    "netflx": "netflix",
    "netfli": "netflix",
    "spotfy": "spotify",
    "canvaa": "canva",
    "micosoft": "microsoft",
    "xbx": "xbox",
    "plstation": "playstation"
  };

  const corrected = hardMap[q] || q;
  return {
    normalized: q,
    corrected,
    interpretedAs: corrected !== q ? corrected : ""
  };
}

export function searchProducts(products, query) {
  const { normalized, corrected, interpretedAs } = interpretQuery(query);
  const q = corrected || normalized;
  if (!q) return { query, interpretedAs: "", results: [] };

  const scored = products
    .filter((p) => p.region === "Global" && p.visible !== false)
    .map((product) => {
      const hay = buildTerms(product);
      let score = 0;

      if (normalize(product.title) === q) score += 120;
      if ((product.aliases || []).map(normalize).includes(q)) score += 100;

      hay.forEach((term) => {
        if (term.includes(q)) score += 45;
        q.split(" ").forEach((token) => {
          if (term.includes(token)) score += 12;
          const distance = levenshtein(token, term.slice(0, Math.max(token.length, Math.min(term.length, token.length + 2))));
          if (distance <= 1 && token.length >= 4) score += 10;
        });
      });

      const titleDistance = levenshtein(q, normalize(product.title));
      if (titleDistance <= 3) score += 28 - titleDistance * 5;

      if (product.title.toLowerCase().includes("chatgpt") && q === "chatgpt") score += 90;

      const sellerBoost =
        ((product.seller?.rating || 0) >= 98 ? 15 : 0) +
        ((product.seller?.soldCount || 0) >= 1000 ? 10 : 0);

      return { ...product, score: score + sellerBoost };
    })
    .filter((p) => p.score > 40)
    .sort((a, b) => b.score - a.score);

  return { query, interpretedAs, results: scored };
}
