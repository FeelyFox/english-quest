// Vérification des réponses tapées : tolère contractions, ponctuation, « to » devant les verbes, petites fautes de frappe.
const Check = (() => {
  const NONE = ["ø", "0", "-", "x", "none", "rien", "nothing", "/"];

  function norm(s) {
    return s.toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/…/g, "")
      .replace(/[.,!?;:"()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function expand(s, d) {
    return s
      .replace(/\bwon't\b/g, "will not")
      .replace(/\bcan't\b/g, "cannot")
      .replace(/\bcan not\b/g, "cannot")
      .replace(/\bshan't\b/g, "shall not")
      .replace(/n't\b/g, " not")
      .replace(/'m\b/g, " am")
      .replace(/'re\b/g, " are")
      .replace(/'ve\b/g, " have")
      .replace(/'ll\b/g, " will")
      .replace(/'d\b/g, d);
  }

  // Toutes les formes équivalentes d'une réponse
  // loose : « to ship » et « ship » sont équivalents (vocabulaire seulement, pas en grammaire)
  function variants(raw, loose) {
    const n = norm(raw);
    if (n === "" || NONE.includes(n)) return new Set(["ø"]);
    const out = new Set([n, expand(n, " would"), expand(n, " had")]);
    if (loose) {
      for (const v of [...out]) {
        if (v.startsWith("to ")) out.add(v.slice(3));
        else out.add("to " + v);
      }
    }
    return out;
  }

  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 1; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return dp[m][n];
  }

  // Retourne "ok", "near" (faute de frappe) ou "ko"
  function grade(input, accepted, loose = false) {
    const answers = accepted.split("|");
    const mine = variants(input, loose);
    let best = Infinity, bestLen = 1;
    for (const a of answers) {
      for (const v of variants(a, loose)) {
        if (mine.has(v)) return "ok";
        for (const m of mine) {
          const d = levenshtein(m, v);
          if (d < best) { best = d; bestLen = v.length; }
        }
      }
    }
    if (bestLen >= 5 && best === 1) return "near";
    if (bestLen >= 10 && best === 2) return "near";
    return "ko";
  }

  // Similarité 0..1 pour comparer une phrase prononcée au modèle
  function similarity(a, b) {
    const x = norm(expand(norm(a), " would")), y = norm(expand(norm(b), " would"));
    if (!x || !y) return 0;
    return 1 - levenshtein(x, y) / Math.max(x.length, y.length);
  }

  return { grade, similarity, norm };
})();
