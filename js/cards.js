// Transforme les données en cartes de révision uniformes.
// type : vocab | grammar | verb | phrase | dictation | translate — chaque carte a un niveau CECRL.
const Cards = (() => {
  const LEVELS = ["A2", "B1", "B2", "C1"];
  const rank = (level) => Math.max(0, LEVELS.indexOf(level));
  let cache = null;

  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  function build() {
    const out = [];
    for (const [deck, d] of Object.entries(DATA.vocab)) {
      d.items.forEach(([fr, en, ex, note]) => {
        out.push({ id: `v:${deck}:${slug(en.split("|")[0])}`, type: "vocab", deck, level: d.level, fr, en, ex, note });
      });
    }
    Store.state.custom.forEach(([fr, en, ex]) => {
      out.push({ id: `c:${slug(en.split("|")[0])}`, type: "vocab", deck: "custom", level: null, fr, en, ex });
    });
    DATA.grammar.forEach((t) => {
      t.ex.forEach((e, i) => {
        out.push({ id: `g:${t.id}:${i}`, type: "grammar", deck: t.kind, topic: t.id, level: t.level, ...e });
      });
    });
    // Les 45 verbes les plus fréquents relèvent du A2, les autres du B1
    DATA.verbs.items.forEach(([base, past, pp, fr], i) => {
      out.push({ id: `iv:${base}`, type: "verb", deck: "verbs", level: i < 45 ? "A2" : "B1", base, past, pp, fr });
    });
    DATA.phrases.items.forEach(([fr, en, level], i) => {
      out.push({ id: `p:${i}`, type: "phrase", deck: "phrases", level: level || "B1", fr, en });
    });
    if (Speech.available) {
      DATA.dictation.items.forEach(([level, en, fr], i) => {
        out.push({ id: `d:${i}`, type: "dictation", deck: "dictation", level, en, fr });
      });
    }
    DATA.translate.items.forEach(([level, fr, en, note], i) => {
      out.push({ id: `t:${i}`, type: "translate", deck: "translate", level, fr, en, note });
    });
    return out;
  }

  function all() { return cache || (cache = build()); }
  function invalidate() { cache = null; }

  const vocabDeck = (id) => ({ ...DATA.vocab[id], filter: (c) => c.deck === id });

  // Ordre d'affichage des modules (du plus simple au plus avancé)
  const DECKS = () => ({
    a2: vocabDeck("a2"),
    b1: vocabDeck("b1"),
    work: vocabDeck("work"),
    phrasal: vocabDeck("phrasal"),
    falsefriends: vocabDeck("falsefriends"),
    b2: vocabDeck("b2"),
    c1: vocabDeck("c1"),
    grammar: { title: "Grammaire", emoji: "📐", level: "A2 → C1", desc: "Des articles à l'inversion : les points clés, du plus simple au plus avancé.", filter: (c) => c.deck === "grammar" },
    conj: { title: "Conjugaison & temps", emoji: "⏱️", level: "A2 → C1", desc: "Tous les temps, le discours indirect, les modaux au passé, le subjonctif.", filter: (c) => c.deck === "conj" },
    verbs: { ...DATA.verbs, level: "A2 → B1", filter: (c) => c.deck === "verbs" },
    phrases: { ...DATA.phrases, level: "A2 → C1", filter: (c) => c.deck === "phrases" },
    dictation: { ...DATA.dictation, level: "A2 → C1", filter: (c) => c.deck === "dictation" },
    translate: { ...DATA.translate, level: "A2 → C1", filter: (c) => c.deck === "translate" },
    custom: { title: "Mes mots", emoji: "⭐", desc: "Les mots que TU entends au boulot. Le plus efficace de tous.", filter: (c) => c.deck === "custom" }
  });

  function topic(id) { return DATA.grammar.find((t) => t.id === id); }

  return { all, invalidate, DECKS, topic, LEVELS, rank };
})();
