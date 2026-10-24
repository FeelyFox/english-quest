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

  // Phrases complètes (dictée, traduction) : on compare mot à mot au modèle le plus proche
  // Les nombres écrits en chiffres valent leur forme en lettres (« 10 » = « ten »)
  const UNITS = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
  const TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
  const spell = (n) => n < 20 ? UNITS[n] : TENS[Math.floor(n / 10)] + (n % 10 ? " " + UNITS[n % 10] : "");
  const words = (s) => norm(s).replace(/[—–-]/g, " ").replace(/\b\d{1,2}\b/g, (d) => spell(+d))
    .replace(/\s+/g, " ").trim().split(" ").filter(Boolean);

  function sentence(input, accepted, nearAt) {
    let best = { model: accepted.split("|")[0], sim: -1 };
    for (const model of accepted.split("|")) {
      const a = words(input).join(" "), b = words(model).join(" ");
      for (const d of [" would", " had"]) {
        if (expand(a, d) === expand(b, d)) return { result: "ok", model, sim: 1 };
      }
      const sim = similarity(words(input).join(" "), words(model).join(" "));
      if (sim > best.sim) best = { model, sim };
    }
    return { result: best.sim >= nearAt ? "near" : "ko", model: best.model, sim: best.sim };
  }

  // Diff mot à mot (plus longue sous-séquence commune) → HTML : mots en trop barrés, mots manquants surlignés
  function diffHTML(input, model, esc) {
    const a = words(input), b = words(model);
    const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = a.length - 1; i >= 0; i--)
      for (let j = b.length - 1; j >= 0; j--)
        dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const out = [];
    let i = 0, j = 0;
    while (i < a.length || j < b.length) {
      if (i < a.length && j < b.length && a[i] === b[j]) { out.push(esc(a[i])); i++; j++; }
      else if (j < b.length && (i >= a.length || dp[i][j + 1] >= dp[i + 1][j])) { out.push(`<ins>${esc(b[j])}</ins>`); j++; }
      else { out.push(`<del>${esc(a[i])}</del>`); i++; }
    }
    return out.join(" ");
  }

  return { grade, similarity, norm, sentence, diffHTML };
})();
