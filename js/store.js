// Persistance locale (localStorage) + export/import pour sauvegarder ou synchroniser entre appareils.
const Store = (() => {
  const KEY = "english-quest-v1";
  const defaults = () => ({
    cards: {},            // id -> état SRS
    log: {},              // "YYYY-MM-DD" -> { n, ok, fresh }
    seenLessons: {},      // id de leçon -> true
    custom: [],           // mots perso : [fr, en, exemple]
    settings: { newPerDay: 15, accent: "en-GB", autoplay: true, rate: 0.95 }
  });

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      const saved = JSON.parse(raw);
      const d = defaults();
      return { ...d, ...saved, settings: { ...d.settings, ...saved.settings } };
    } catch (e) {
      return defaults();
    }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* stockage indisponible */ }
  }

  function today(d = new Date()) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function dayLog(key = today()) {
    if (!state.log[key]) state.log[key] = { n: 0, ok: 0, fresh: 0 };
    return state.log[key];
  }

  function streak() {
    let count = 0;
    const d = new Date();
    // Aujourd'hui pas encore fait ne casse pas la série
    if (!state.log[today(d)]?.n) d.setDate(d.getDate() - 1);
    while (state.log[today(d)]?.n) { count++; d.setDate(d.getDate() - 1); }
    return count;
  }

  function exportJSON() { return JSON.stringify(state); }

  function importJSON(text) {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed.cards !== "object") throw new Error("Fichier invalide");
    const d = defaults();
    state = { ...d, ...parsed, settings: { ...d.settings, ...parsed.settings } };
    save();
  }

  function reset() { state = defaults(); save(); }

  return {
    get state() { return state; },
    save, today, dayLog, streak, exportJSON, importJSON, reset
  };
})();
