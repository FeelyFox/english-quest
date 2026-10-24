// Transforme les données en cartes de révision uniformes.
// type : vocab | grammar | verb | phrase
const Cards = (() => {
  let cache = null;

  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  function build() {
    const out = [];
    for (const [deck, d] of Object.entries(DATA.vocab)) {
      d.items.forEach(([fr, en, ex, note]) => {
        out.push({ id: `v:${deck}:${slug(en.split("|")[0])}`, type: "vocab", deck, fr, en, ex, note });
      });
    }
    Store.state.custom.forEach(([fr, en, ex]) => {
      out.push({ id: `c:${slug(en.split("|")[0])}`, type: "vocab", deck: "custom", fr, en, ex });
    });
    DATA.grammar.forEach((t) => {
      t.ex.forEach((e, i) => {
        out.push({ id: `g:${t.id}:${i}`, type: "grammar", deck: t.kind, topic: t.id, ...e });
      });
    });
    DATA.verbs.items.forEach(([base, past, pp, fr]) => {
      out.push({ id: `iv:${base}`, type: "verb", deck: "verbs", base, past, pp, fr });
    });
    DATA.phrases.items.forEach(([fr, en], i) => {
      out.push({ id: `p:${i}`, type: "phrase", deck: "phrases", fr, en });
    });
    return out;
  }

  function all() { return cache || (cache = build()); }
  function invalidate() { cache = null; }

  const DECKS = () => ({
    work: { ...DATA.vocab.work, filter: (c) => c.deck === "work" },
    phrasal: { ...DATA.vocab.phrasal, filter: (c) => c.deck === "phrasal" },
    falsefriends: { ...DATA.vocab.falsefriends, filter: (c) => c.deck === "falsefriends" },
    grammar: { title: "Grammaire", emoji: "📐", desc: "Articles, indénombrables, prépositions, questions… les erreurs typiques des francophones.", filter: (c) => c.deck === "grammar" },
    conj: { title: "Conjugaison & temps", emoji: "⏱️", desc: "Present perfect, futur, conditionnels, passif.", filter: (c) => c.deck === "conj" },
    verbs: { ...DATA.verbs, filter: (c) => c.deck === "verbs" },
    phrases: { ...DATA.phrases, filter: (c) => c.deck === "phrases" },
    custom: { title: "Mes mots", emoji: "⭐", desc: "Les mots que TU entends au boulot. Le plus efficace de tous.", filter: (c) => c.deck === "custom" }
  });

  function topic(id) { return DATA.grammar.find((t) => t.id === id); }

  return { all, invalidate, DECKS, topic };
})();
