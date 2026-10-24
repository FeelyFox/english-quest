// Interface : routeur par hash, vues, déroulement d'une session.
(() => {
  const $app = document.getElementById("app");
  const $modal = document.getElementById("modal");
  const $modalBox = document.getElementById("modal-box");
  const st = () => Store.state;

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const first = (alts) => alts.split("|")[0];
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const INPUT_ATTRS = 'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done"';

  // ---------- Statistiques par module ----------
  function deckStats(filter) {
    const cards = Cards.all().filter(filter);
    let seen = 0, mature = 0, due = 0;
    const now = Date.now();
    for (const c of cards) {
      const s = st().cards[c.id];
      if (!s) continue;
      seen++;
      if (SRS.isMature(s)) mature++;
      if (SRS.isDue(s, now)) due++;
    }
    return { total: cards.length, seen, mature, due, fresh: cards.length - seen };
  }

  function progressBar({ total, seen, mature }) {
    if (!total) return `<div class="bar"></div>`;
    return `<div class="bar"><i class="mature" style="width:${(mature / total) * 100}%"></i><i class="learn" style="width:${((seen - mature) / total) * 100}%"></i></div>`;
  }

  // Un niveau est « en cours » tant que moins de 80 % de ses cartes ont été découvertes
  const LEVEL_DONE = 0.8;
  const LEVEL_NAMES = { A2: "Élémentaire", B1: "Seuil", B2: "Avancé", C1: "Autonome" };

  function levelStats() {
    return Cards.LEVELS.map((level) => ({ level, ...deckStats((c) => c.level === level) }));
  }

  function currentLevel() {
    const start = Cards.rank(st().settings.startLevel);
    const stats = levelStats();
    for (let r = start; r < stats.length; r++) {
      if (stats[r].seen / stats[r].total < LEVEL_DONE) return stats[r].level;
    }
    return Cards.LEVELS[Cards.LEVELS.length - 1];
  }

  function levelPanel() {
    const cur = currentLevel();
    const stats = levelStats();
    return `<section class="panel mt">
      <div class="row"><h2 style="margin:0">Ton parcours</h2><span class="spacer"></span><span class="level-badge big">${cur} · ${LEVEL_NAMES[cur]}</span></div>
      <div class="levels mt">${stats.map((l) => {
        const seenPct = Math.round((l.seen / l.total) * 100), maturePct = Math.round((l.mature / l.total) * 100);
        return `<div class="level-row ${l.level === cur ? "current" : ""}">
          <span class="level-badge">${l.level}</span>
          <div class="spacer">${progressBar(l)}</div>
          <span class="small muted" style="min-width:110px;text-align:right">${seenPct}% vu · ${maturePct}% maîtrisé</span>
        </div>`;
      }).join("")}</div>
      <p class="small muted">Les nouvelles cartes viennent de ton niveau en cours. Tu passes au suivant quand ${LEVEL_DONE * 100}% du niveau est découvert ; les révisions continuent pour ne rien oublier.</p>
    </section>`;
  }

  function newLeftToday() {
    return Math.max(0, st().settings.newPerDay - Store.dayLog().fresh);
  }

  // ---------- Accueil ----------
  const TIPS = [
    "Dis les phrases <b>à voix haute</b>. Parler active une autre mémoire que lire — et c'est ce qui te manquera en réunion.",
    "Note dans <b>Mes mots</b> chaque expression que tes collègues utilisent et que tu ne connais pas. Ton vocabulaire le plus utile, c'est le leur.",
    "Passe Slack, ton IDE et ton téléphone en anglais : quelques centaines d'expositions gratuites par jour.",
    "Mieux vaut <b>10 minutes tous les jours</b> que 1 heure le dimanche. La régularité bat l'intensité.",
    "Quand tu te trompes, c'est bon signe : l'effort de récupération est ce qui grave le souvenir.",
    "Technique du <b>shadowing</b> : écoute une phrase, répète-la immédiatement en imitant le rythme et l'intonation.",
    "Avant une réunion, prépare 2-3 phrases clés que tu veux placer. Tu parleras plus, et plus sereinement.",
    "Écris tes messages Slack sans traducteur, puis vérifie seulement après. C'est de la production active."
  ];

  function viewHome() {
    const all = deckStats(() => true);
    const newLeft = Math.min(newLeftToday(), all.fresh);
    const sessionSize = Math.min(all.due, 150) + newLeft;
    const minutes = Math.max(1, Math.round(sessionSize * 0.3));
    const tip = TIPS[new Date().getDate() % TIPS.length];
    const decks = Cards.DECKS();
    const streak = Store.streak();

    $app.innerHTML = `
      <section class="panel hero">
        <div>
          <h1>Hello! 👋</h1>
          <div class="stats-inline">
            <div class="stat streak"><b>🔥 ${streak}</b><span>jour${streak > 1 ? "s" : ""} d'affilée</span></div>
            <div class="stat"><b>${all.due}</b><span>à réviser</span></div>
            <div class="stat"><b>${newLeft}</b><span>nouvelles aujourd'hui</span></div>
            <div class="stat"><b>${all.mature}</b><span>maîtrisées / ${all.total}</span></div>
          </div>
        </div>
        <div>
          ${sessionSize
            ? `<button class="btn primary big" data-go="#/session">▶ Session du jour<br><small style="font-weight:400">${sessionSize} cartes · ~${minutes} min</small></button>`
            : `<div class="muted">✅ Tout est à jour.<br>Reviens demain, ou entraîne-toi sur un module.</div>`}
        </div>
      </section>

      ${levelPanel()}

      <section class="panel tip mt"><b>💡 Conseil du jour</b><br>${tip}</section>

      <h2 class="mt2">Modules</h2>
      <div class="grid">
        ${Object.entries(decks).map(([id, d]) => {
          const s = deckStats(d.filter);
          return `<a class="panel module" href="#/deck/${id}">
            <div class="row"><span class="emoji">${d.emoji}</span><h3>${esc(d.title)}</h3>${d.level ? `<span class="spacer"></span><span class="level-badge">${d.level}</span>` : ""}</div>
            <div class="muted small">${esc(d.desc)}</div>
            ${progressBar(s)}
            <div class="small muted mt">${s.seen}/${s.total} vues · ${s.mature} maîtrisées${s.due ? ` · <b style="color:var(--hard)">${s.due} à revoir</b>` : ""}</div>
          </a>`;
        }).join("")}
      </div>`;
  }

  // ---------- Page d'un module ----------
  function cardStatus(c) {
    const s = st().cards[c.id];
    if (!s) return "";
    if (SRS.isLeech(s)) return "leech";
    return SRS.isMature(s) ? "mature" : "learn";
  }

  function viewDeck(id) {
    const d = Cards.DECKS()[id];
    if (!d) return go("#/");
    const s = deckStats(d.filter);
    const isGrammar = id === "grammar" || id === "conj";

    let body = "";
    if (isGrammar) {
      const topics = DATA.grammar.filter((t) => t.kind === id);
      body = Cards.LEVELS.filter((lv) => topics.some((t) => t.level === lv)).map((lv) => `<h3 class="mt">${lv} · ${LEVEL_NAMES[lv]}</h3><div class="list">${topics.filter((t) => t.level === lv).map((t) => {
        const ts = deckStats((c) => c.topic === t.id);
        return `<div class="item topic">
          <span class="dot ${ts.mature === ts.total ? "mature" : ts.seen ? "learn" : ""}"></span>
          <div class="spacer"><div class="en">${esc(t.title)}</div><div class="fr small">${ts.seen}/${ts.total} exercices vus${ts.due ? ` · ${ts.due} à revoir` : ""}</div></div>
          <a class="btn ghost" href="#/lesson/${t.id}">📖 Leçon</a>
          <a class="btn" href="#/practice/topic/${t.id}">S'entraîner</a>
        </div>`;
      }).join("")}</div>`).join("");
    } else {
      const cards = Cards.all().filter(d.filter);
      body = `
        ${id === "custom" ? customForm() : ""}
        <input class="search" id="search" placeholder="Rechercher…" ${INPUT_ATTRS}>
        <div class="list" id="items">${cards.map((c) => `
          <div class="item" data-text="${esc((c.fr + " " + (c.en || c.base + " " + c.past + " " + c.pp)).toLowerCase())}">
            <span class="dot ${cardStatus(c)}"></span>
            <div class="spacer">
              <div class="en">${esc(c.type === "verb" ? `${c.base} – ${first(c.past)} – ${first(c.pp)}` : first(c.en))}${c.level && d.level && d.level.includes("→") ? ` <span class="level-badge">${c.level}</span>` : ""}</div>
              <div class="fr small">${esc(c.fr)}</div>
            </div>
            <button class="btn icon ghost" data-say="${esc(c.type === "verb" ? `${c.base}, ${first(c.past)}, ${first(c.pp)}` : first(c.en))}" aria-label="Écouter">🔊</button>
          </div>`).join("") || `<p class="muted">Aucun mot pour l'instant.</p>`}
        </div>`;
    }

    $app.innerHTML = `
      <a href="#/" class="small">← Accueil</a>
      <div class="row mt">
        <h1>${d.emoji} ${esc(d.title)}</h1>
        <span class="spacer"></span>
        ${s.total ? `<a class="btn primary" href="#/practice/${id}">S'entraîner sur ce module</a>` : ""}
      </div>
      <p class="muted">${esc(d.desc)}</p>
      ${progressBar(s)}
      <p class="small muted">${s.seen}/${s.total} vues · ${s.mature} maîtrisées · <span class="dot learn" style="display:inline-block"></span> en cours · <span class="dot mature" style="display:inline-block"></span> maîtrisé · <span class="dot leech" style="display:inline-block"></span> point faible</p>
      <div class="mt">${body}</div>`;

    const search = document.getElementById("search");
    if (search) search.addEventListener("input", () => {
      const q = search.value.toLowerCase().trim();
      document.querySelectorAll("#items .item").forEach((el) => { el.style.display = el.dataset.text.includes(q) ? "" : "none"; });
    });
    const form = document.getElementById("custom-form");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const fr = f.get("fr").trim(), en = f.get("en").trim(), ex = f.get("ex").trim();
      if (!fr || !en) return;
      st().custom.push([fr, en, ex]);
      Store.save();
      Cards.invalidate();
      viewDeck("custom");
    });
  }

  function customForm() {
    return `<form class="panel" id="custom-form">
      <h3>Ajouter un mot entendu au boulot</h3>
      <div class="field"><label>Français (ou contexte)</label><input name="fr" required placeholder="ex : se synchroniser rapidement" ${INPUT_ATTRS}></div>
      <div class="field"><label>Anglais (variantes séparées par |)</label><input name="en" required placeholder="ex : to touch base|touch base" ${INPUT_ATTRS}></div>
      <div class="field"><label>Phrase entendue (optionnel mais très efficace)</label><input name="ex" placeholder="ex : Let's touch base after lunch." ${INPUT_ATTRS}></div>
      <button class="btn primary">Ajouter</button>
    </form>`;
  }

  // ---------- Leçon ----------
  function lessonHTML(t) {
    return `<div class="lesson"><h2>${esc(t.title)}</h2>${t.lesson}</div>`;
  }

  function viewLesson(id) {
    const t = Cards.topic(id);
    if (!t) return go("#/");
    st().seenLessons[id] = true;
    Store.save();
    $app.innerHTML = `
      <a href="#/deck/${t.kind}" class="small">← ${t.kind === "conj" ? "Conjugaison" : "Grammaire"}</a>
      <div class="panel mt">${lessonHTML(t)}</div>
      <div class="row mt"><a class="btn primary" href="#/practice/topic/${id}">S'entraîner sur cette leçon →</a></div>`;
  }

  function showModal(html) {
    $modalBox.innerHTML = html;
    $modal.classList.remove("hidden");
  }
  function closeModal() { $modal.classList.add("hidden"); }
  $modal.addEventListener("click", (e) => { if (e.target === $modal || e.target.closest("[data-close]")) closeModal(); });

  // ---------- Session ----------
  let S = null;
  // Familles de cartes et leur poids dans les nouvelles cartes du jour (sur 10)
  const BUCKETS = [
    { types: ["vocab"], weight: 3 },
    { types: ["grammar"], weight: 3 },
    { types: ["verb"], weight: 1 },
    { types: ["phrase"], weight: 1 },
    { types: ["dictation"], weight: 1 },
    { types: ["translate"], weight: 1 }
  ];

  // Dans une famille : niveau croissant, et on alterne les modules d'un même niveau
  // (sauf la grammaire, qui suit l'ordre pédagogique des leçons)
  function orderBucket(cards) {
    const out = [];
    for (const lv of [...Cards.LEVELS, null]) {
      const decks = {};
      cards.filter((c) => c.level === lv).forEach((c) => (decks[c.type === "grammar" ? "grammar" : c.deck] ||= []).push(c));
      const groups = Object.values(decks);
      while (groups.some((g) => g.length)) for (const g of groups) if (g.length) out.push(g.shift());
    }
    return out;
  }

  // Entrelacement (interleaving) : on alterne les familles au lieu de faire des blocs
  function interleave(cards, limit) {
    // Les mots perso passent en premier : ce sont les plus utiles
    const out = cards.filter((c) => c.deck === "custom").slice(0, limit);
    const groups = BUCKETS.map((b) => ({ ...b, cards: orderBucket(cards.filter((c) => c.deck !== "custom" && b.types.includes(c.type))) }));
    while (out.length < limit && groups.some((g) => g.cards.length)) {
      for (const g of groups) for (let k = 0; k < g.weight && g.cards.length && out.length < limit; k++) out.push(g.cards.shift());
    }
    return out;
  }

  // Nouvelles cartes : celles du niveau en cours (et des niveaux précédents non finis),
  // complétées par le niveau suivant s'il n'en reste plus assez
  function pickNew(cards, limit, practice) {
    const unseen = cards.filter((c) => !st().cards[c.id]);
    if (practice) return interleave(unseen, limit);
    const start = Cards.rank(st().settings.startLevel);
    const cur = Cards.rank(currentLevel());
    const inRange = (c, max) => c.level === null || (Cards.rank(c.level) >= start && Cards.rank(c.level) <= max);
    let pool = unseen.filter((c) => inRange(c, cur));
    if (pool.length < limit) pool = unseen.filter((c) => inRange(c, cur + 1));
    return interleave(pool, limit);
  }

  function startSession(filter, practice, label) {
    const now = Date.now();
    const cards = Cards.all().filter(filter);
    const due = shuffle(cards.filter((c) => SRS.isDue(st().cards[c.id], now))).slice(0, practice ? 30 : 150);
    const newLimit = practice ? 10 : newLeftToday();
    const fresh = pickNew(cards, newLimit, practice);

    // On répartit les nouvelles cartes au milieu des révisions
    const queue = [];
    const ratio = due.length / Math.max(1, fresh.length);
    let di = 0;
    for (const c of fresh) {
      for (let k = 0; k < ratio && di < due.length; k++) queue.push({ card: due[di++] });
      queue.push({ card: c, isNew: true });
    }
    while (di < due.length) queue.push({ card: due[di++] });

    // Rien à faire en mode entraînement : on révise librement sans toucher au planning
    if (practice && !queue.length) {
      shuffle(cards.filter((c) => st().cards[c.id])).slice(0, 15).forEach((card) => queue.push({ card, cram: true }));
    }

    S = { queue, total: queue.length, done: 0, ok: 0, practice, label, phase: "ask", item: null, usedHint: false, result: null };
    nextCard();
  }

  function nextCard() {
    if (!S.queue.length) return renderDone();
    S.item = S.queue.shift();
    S.phase = "ask";
    S.usedHint = false;
    S.result = null;
    const c = S.item.card;
    // Première rencontre avec une notion de grammaire : on montre la leçon d'abord
    if (c.type === "grammar" && !st().seenLessons[c.topic]) {
      st().seenLessons[c.topic] = true;
      Store.save();
      showModal(`<div class="tag new">Nouvelle notion</div>${lessonHTML(Cards.topic(c.topic))}
        <div class="row mt"><button class="btn primary" data-close>J'ai compris → exercices</button></div>`);
    }
    renderCard();
  }

  function deckTitle(c) {
    if (c.type === "grammar") return Cards.topic(c.topic).title;
    return Cards.DECKS()[c.deck]?.title || "";
  }

  function renderCard() {
    const { item } = S;
    const c = item.card;
    const pct = S.total ? (S.done / S.total) * 100 : 0;
    const tag = `<div class="row"><span class="tag ${item.isNew ? "new" : ""}">${item.isNew ? "Nouveau · " : ""}${esc(deckTitle(c))}</span><span class="spacer"></span>${c.level ? `<span class="level-badge">${c.level}</span>` : ""}</div>`;
    const answered = S.phase === "answer";
    const cls = answered && S.result !== "self" ? S.result : "";
    // Après correction, on réaffiche la saisie (désactivée) avec sa couleur de verdict
    const field = (i) => answered ? `class="answer-input ${cls}" disabled value="${esc(S.input[i])}"` : `class="answer-input"`;
    let body = "";

    if (c.type === "vocab") {
      body = `
        <div class="hint">Traduis en anglais</div>
        <div class="prompt">${esc(c.fr)}</div>
        <div class="hint" id="hint-text"></div>
        <input ${field(0)} id="a1" ${INPUT_ATTRS} placeholder="Ta réponse…">`;
    } else if (c.type === "grammar") {
      const q = esc(c.q).replace("___", `<span class="blank">${answered ? esc(first(c.a)) : "___"}</span>`);
      body = `
        <div class="hint">Complète la phrase</div>
        <div class="prompt">${q}</div>
        <div class="hint"><a href="#" data-lesson="${c.topic}">📖 Revoir la règle</a></div>
        <input ${field(0)} id="a1" ${INPUT_ATTRS} placeholder="Mot(s) manquant(s)…">`;
    } else if (c.type === "verb") {
      body = `
        <div class="hint">Verbe irrégulier — ${esc(c.fr)}</div>
        <div class="prompt">to ${esc(c.base)}</div>
        <div class="inputs-2 mt">
          <div><label>Prétérit</label><input ${field(0)} id="a1" ${INPUT_ATTRS}></div>
          <div><label>Participe passé</label><input ${field(1)} id="a2" ${INPUT_ATTRS}></div>
        </div>`;
    } else if (c.type === "phrase") {
      body = `
        <div class="hint">Comment le dirais-tu ? Formule-le <b>à voix haute</b>, puis révèle.</div>
        <div class="prompt">${esc(c.fr)}</div>
        <div id="mic-result" class="mic-result"></div>`;
    } else if (c.type === "dictation") {
      body = `
        <div class="hint">Écoute et écris ce que tu entends</div>
        <div class="row mt">
          <button class="btn primary big" data-say="${esc(c.en)}">🔊 Écouter</button>
          <button class="btn" data-say-slow="${esc(c.en)}">🐢 Lentement</button>
        </div>
        <textarea ${field(0).replace(/ value="[^"]*"/, "")} id="a1" rows="2" ${INPUT_ATTRS} placeholder="Ce que tu entends…" style="margin-top:16px">${answered ? esc(S.input[0]) : ""}</textarea>`;
    } else if (c.type === "translate") {
      body = `
        <div class="hint">Traduis la phrase en anglais</div>
        <div class="prompt">${esc(c.fr)}</div>
        <textarea ${field(0).replace(/ value="[^"]*"/, "")} id="a1" rows="3" ${INPUT_ATTRS} placeholder="Ta traduction…" style="margin-top:12px">${answered ? esc(S.input[0]) : ""}</textarea>`;
    }

    const actions = answered ? "" : (c.type === "phrase"
      ? `${Speech.canListen ? `<button class="btn" id="mic">🎤 Parler</button>` : ""}
         <span class="spacer"></span>
         <button class="btn primary" id="check">Révéler <kbd>Entrée</kbd></button>`
      : `${c.type === "vocab" ? `<button class="btn ghost" id="hint">Indice</button>` : ""}
         ${c.type === "dictation" ? `<button class="btn ghost" id="show-fr">Voir en français</button>` : ""}
         <button class="btn ghost" id="idk">Je ne sais pas</button>
         <span class="spacer"></span>
         <button class="btn primary" id="check">Vérifier <kbd>Entrée</kbd></button>`);

    $app.innerHTML = `
      <div class="progress-top">
        <a href="#/" class="small">✕</a>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <span class="small muted">${S.done}/${S.total}</span>
      </div>
      <section class="panel card">
        ${tag}
        ${body}
        <div id="feedback"></div>
        <div class="actions">${actions}</div>
      </section>
      ${S.label ? `<p class="small muted mt">${esc(S.label)}</p>` : ""}`;

    if (answered) renderFeedback();
    else {
      const a1 = document.getElementById("a1");
      if (a1 && $modal.classList.contains("hidden")) a1.focus();
      document.getElementById("check").onclick = check;
      const idk = document.getElementById("idk");
      if (idk) idk.onclick = () => check(true);
      const hint = document.getElementById("hint");
      if (hint) hint.onclick = giveHint;
      const showFr = document.getElementById("show-fr");
      if (showFr) showFr.onclick = () => { S.usedHint = true; showFr.outerHTML = `<span class="muted small">« ${esc(c.fr)} »</span>`; };
      if (c.type === "dictation") Speech.say(c.en);
      const mic = document.getElementById("mic");
      if (mic) mic.onclick = () => listenPhrase(mic);
      const a2 = document.getElementById("a2");
      if (a1 && a2) a1.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); a2.focus(); } });
    }
  }

  function giveHint() {
    const ans = first(S.item.card.en).replace(/^to /, "");
    S.usedHint = true;
    const shown = ans.split(" ").map((w) => w[0] + w.slice(1).replace(/[a-z]/gi, "·")).join(" ");
    document.getElementById("hint-text").textContent = `Indice : ${shown}`;
    document.getElementById("a1").focus();
  }

  function listenPhrase(btn) {
    btn.textContent = "🎙️ J'écoute…";
    btn.disabled = true;
    Speech.listen((alts) => {
      const models = S.item.card.en.split("|");
      let best = 0, said = alts[0];
      for (const a of alts) for (const m of models) {
        const sim = Check.similarity(a, m.replace(/…/g, ""));
        if (sim > best) { best = sim; said = a; }
      }
      S.spoken = { said, score: Math.round(best * 100) };
      document.getElementById("mic-result").innerHTML = `Tu as dit : « <b>${esc(said)}</b> »<br><span class="muted small">Révèle pour comparer avec le modèle.</span>`;
    }, () => { btn.textContent = "🎤 Parler"; btn.disabled = false; });
  }

  function check(giveUp = false) {
    if (S.phase !== "ask") return;
    const c = S.item.card;
    const v1 = document.getElementById("a1")?.value || "";
    const v2 = document.getElementById("a2")?.value || "";
    let result;

    if (c.type === "phrase") result = "self";
    else if (giveUp === true) result = "ko";
    else if (c.type === "verb") {
      const r1 = Check.grade(v1, c.past), r2 = Check.grade(v2, c.pp);
      result = r1 === "ok" && r2 === "ok" ? "ok" : (r1 !== "ko" && r2 !== "ko") ? "near" : "ko";
    } else if (c.type === "grammar") result = Check.grade(v1, c.a);
    else if (c.type === "dictation" || c.type === "translate") {
      const r = Check.sentence(v1, c.en, c.type === "dictation" ? 0.85 : 0.75);
      result = r.result;
      S.closest = r.model;
    } else result = Check.grade(v1, c.en, true);
    if (giveUp === true) S.closest = first(c.en || "");

    S.result = result;
    S.input = [v1, v2];
    S.phase = "answer";
    renderCard();
  }

  function suggestedGrade() {
    if (S.result === "self") return 3;
    if (S.result === "ko") return 1;
    if (S.result === "near" || S.usedHint) return 2;
    return 3;
  }

  function renderFeedback() {
    const c = S.item.card;
    const r = S.result;
    const [v1, v2] = S.input;
    let html = "", speakText = "";

    const verdict = {
      ok: `<div class="verdict ok-t">✓ Correct !</div>`,
      near: `<div class="verdict near-t">≈ Presque — attention à l'orthographe</div>`,
      ko: `<div class="verdict ko-t">✗ Pas tout à fait</div>`,
      self: `<div class="verdict">Modèle :</div>`
    }[r];

    if (c.type === "vocab") {
      const alts = c.en.split("|");
      speakText = first(c.en);
      html = `${verdict}
        ${r !== "ok" && v1 ? `<div class="yours">${esc(v1)}</div>` : ""}
        <div class="correct">${esc(alts[0])} <button class="btn icon ghost" data-say="${esc(alts[0])}">🔊</button></div>
        ${alts.length > 1 ? `<div class="note">Aussi accepté : ${alts.slice(1).map(esc).join(", ")}</div>` : ""}
        ${c.ex ? `<div class="example">« ${esc(c.ex)} » <button class="btn icon ghost" data-say="${esc(c.ex)}">🔊</button></div>` : ""}
        ${c.note ? `<div class="note">${c.note}</div>` : ""}`;
    } else if (c.type === "grammar") {
      const ans = first(c.a);
      const full = c.q.replace(/\s*\([^)]*\)/g, "").replace(ans === "Ø" ? /___ ?/ : "___", ans === "Ø" ? "" : ans).replace(/^./, (m) => m.toUpperCase());
      speakText = full;
      html = `${verdict}
        ${r !== "ok" && v1 ? `<div class="yours">${esc(v1)}</div>` : ""}
        <div class="correct">${esc(c.a.split("|").join(" / "))}</div>
        <div class="example">« ${esc(full)} » <button class="btn icon ghost" data-say="${esc(full)}">🔊</button></div>
        <div class="note">${esc(c.e)}</div>`;
    } else if (c.type === "verb") {
      speakText = `${c.base}, ${first(c.past)}, ${first(c.pp)}`;
      html = `${verdict}
        ${r !== "ok" ? `<div class="yours">${esc(v1 || "—")} / ${esc(v2 || "—")}</div>` : ""}
        <div class="correct">${esc(c.base)} – ${esc(c.past.replace("|", " / "))} – ${esc(c.pp.replace("|", " / "))} <button class="btn icon ghost" data-say="${esc(speakText)}">🔊</button></div>`;
    } else if (c.type === "phrase") {
      const models = c.en.split("|");
      speakText = models[0];
      html = `${verdict}
        ${models.map((m) => `<div class="correct mt">${esc(m)} <button class="btn icon ghost" data-say="${esc(m)}">🔊</button></div>`).join("")}
        ${S.spoken ? `<div class="note">Ta version orale : « ${esc(S.spoken.said)} » — proximité avec le modèle ${S.spoken.score}%</div>` : ""}
        <div class="note">Écoute et <b>répète à voix haute</b> en imitant l'intonation (shadowing). Puis note-toi honnêtement.</div>`;
      S.spoken = null;
    } else if (c.type === "dictation") {
      speakText = c.en;
      html = `${verdict}
        ${r !== "ok" && v1 ? `<div class="diff">${Check.diffHTML(v1, c.en, esc)}</div>` : ""}
        <div class="correct">${esc(c.en)} <button class="btn icon ghost" data-say="${esc(c.en)}">🔊</button></div>
        <div class="note">« ${esc(c.fr)} »</div>
        <div class="note">Réécoute et répète la phrase à voix haute en imitant le rythme.</div>`;
    } else if (c.type === "translate") {
      const models = c.en.split("|");
      const closest = S.closest || models[0];
      speakText = closest;
      html = `${verdict}
        ${r !== "ok" && v1 ? `<div class="diff">${Check.diffHTML(v1, closest, esc)}</div><div class="note small">Comparé au modèle le plus proche : <del>en trop</del> · <ins>manquant</ins></div>` : ""}
        ${models.map((m) => `<div class="correct mt">${esc(m)} <button class="btn icon ghost" data-say="${esc(m)}">🔊</button></div>`).join("")}
        ${c.note ? `<div class="note">${c.note}</div>` : ""}
        ${r !== "ok" ? `<div class="note">Ta phrase est correcte mais formulée autrement ? Note-toi <b>Bien</b> : c'est toi le juge.</div>` : ""}`;
    }

    const fb = document.getElementById("feedback");
    fb.className = `feedback ${r === "self" ? "" : r}`;
    fb.innerHTML = html;

    const sug = suggestedGrade();
    const prev = S.item.cram ? st().cards[S.item.card.id] : st().cards[c.id];
    const labels = { 1: "À revoir", 2: "Difficile", 3: "Bien", 4: "Facile" };
    document.querySelector(".actions").outerHTML = `<div class="grades">
      ${[1, 2, 3, 4].map((g) => `<button class="btn grade g${g} ${g === sug ? "suggested" : ""}" data-grade="${g}">
        ${labels[g]}<small>${S.item.cram ? "" : SRS.preview(prev, g)} <kbd>${g}</kbd></small></button>`).join("")}
    </div>`;
    document.querySelector(".grade.suggested")?.focus({ preventScroll: true });

    if (st().settings.autoplay) Speech.say(speakText);
  }

  function rate(grade) {
    if (S.phase !== "answer") return;
    const c = S.item.card;
    const log = Store.dayLog();
    log.n++;
    if (grade > 1) log.ok++;
    if (S.item.isNew && !st().cards[c.id]) log.fresh++;

    if (!S.item.cram) st().cards[c.id] = SRS.schedule(st().cards[c.id], grade);
    Store.save();

    if (grade === 1) {
      // Carte ratée : elle revient un peu plus loin dans la même session
      const pos = Math.min(S.queue.length, 3 + Math.floor(Math.random() * 3));
      S.queue.splice(pos, 0, { card: c, cram: S.item.cram });
    } else {
      S.done++;
      S.ok++;
    }
    nextCard();
  }

  function renderDone() {
    const log = Store.dayLog();
    const acc = log.n ? Math.round((log.ok / log.n) * 100) : 0;
    $app.innerHTML = `
      <section class="panel done">
        <div class="big-emoji">🏆</div>
        <h1>Session terminée !</h1>
        <p class="muted">${S.done} cartes validées. Aujourd'hui : ${log.n} réponses, ${acc}% de réussite.</p>
        <p>🔥 Série : <b>${Store.streak()} jour${Store.streak() > 1 ? "s" : ""}</b></p>
        <div class="row" style="justify-content:center">
          <a class="btn primary" href="#/">Retour à l'accueil</a>
          <a class="btn" href="#/stats">Voir mes stats</a>
        </div>
      </section>`;
    S = null;
  }

  // ---------- Stats ----------
  function viewStats() {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = Store.today(d);
      days.push({ k, ...(st().log[k] || { n: 0, ok: 0 }) });
    }
    const max = Math.max(10, ...days.map((d) => d.n));
    const week = days.slice(-7);
    const wn = week.reduce((a, d) => a + d.n, 0), wok = week.reduce((a, d) => a + d.ok, 0);
    const all = deckStats(() => true);

    const forecast = [];
    for (let i = 0; i < 7; i++) {
      const end = new Date(); end.setDate(end.getDate() + i); end.setHours(23, 59, 59, 999);
      const start = new Date(end); start.setHours(0, 0, 0, 0);
      const n = Object.values(st().cards).filter((s) => (i === 0 ? s.due <= end : s.due >= start && s.due <= end)).length;
      forecast.push(n);
    }

    const weak = Cards.all()
      .map((c) => ({ c, s: st().cards[c.id] }))
      .filter((x) => x.s && x.s.lapses > 0)
      .sort((a, b) => b.s.lapses - a.s.lapses || a.s.ease - b.s.ease)
      .slice(0, 12);

    const label = (c) => c.type === "verb" ? `${c.base} – ${first(c.past)} – ${first(c.pp)}` : c.type === "grammar" ? c.q.replace("___", first(c.a)) : first(c.en);

    $app.innerHTML = `
      <h1>📊 Statistiques</h1>
      <div class="grid stats-grid">
        <div class="panel stat"><b>🔥 ${Store.streak()}</b><span>jours d'affilée</span></div>
        <div class="panel stat"><b>${wn}</b><span>réponses sur 7 jours</span></div>
        <div class="panel stat"><b>${wn ? Math.round((wok / wn) * 100) : 0}%</b><span>réussite sur 7 jours</span></div>
        <div class="panel stat"><b>${all.seen} / ${all.total}</b><span>cartes découvertes (${all.mature} maîtrisées)</span></div>
      </div>

      <section class="panel mt">
        <h2>30 derniers jours</h2>
        <div class="chart">${days.map((d) => `<div class="col" style="height:${(d.n / max) * 100}%" data-t="${d.k.slice(5)} : ${d.n} rép., ${d.n ? Math.round((d.ok / d.n) * 100) : 0}%"><i style="height:${d.n ? (d.ok / d.n) * 100 : 0}%"></i></div>`).join("")}</div>
        <p class="small muted">Hauteur = nombre de réponses · vert = part de bonnes réponses</p>
      </section>

      <section class="panel mt">
        <h2>Progression par niveau</h2>
        <div class="levels">${levelStats().map((l) => `<div class="level-row">
          <span class="level-badge">${l.level}</span>
          <div class="spacer">${progressBar(l)}</div>
          <span class="small muted" style="min-width:150px;text-align:right">${l.seen}/${l.total} vues · ${l.mature} maîtrisées</span>
        </div>`).join("")}</div>
        <p class="small muted">Une carte est « maîtrisée » quand son intervalle de révision dépasse 3 semaines.</p>
      </section>

      <section class="panel mt">
        <h2>Prévisions</h2>
        <div class="row">${forecast.map((n, i) => `<div class="stat" style="min-width:70px"><b>${n}</b><span>${i === 0 ? "auj." : i === 1 ? "demain" : `J+${i}`}</span></div>`).join("")}</div>
      </section>

      <section class="panel mt">
        <h2>Points faibles</h2>
        ${weak.length ? `<div class="list">${weak.map(({ c, s }) => `
          <div class="item"><span class="dot ${SRS.isLeech(s) ? "leech" : "learn"}"></span>
            <div class="spacer"><div class="en">${esc(label(c))}</div><div class="fr small">${esc(c.fr || "")}</div></div>
            <span class="small muted">${s.lapses} oubli${s.lapses > 1 ? "s" : ""}</span></div>`).join("")}</div>
          <p class="small muted mt">Astuce : pour un mot qui ne rentre pas, ajoute-le dans « Mes mots » avec une phrase perso tirée de ton quotidien.</p>`
          : `<p class="muted">Rien pour l'instant. Continue !</p>`}
      </section>`;
  }

  // ---------- Méthode ----------
  function viewMethod() {
    $app.innerHTML = `
      <h1>🧠 La méthode</h1>
      <div class="panel lesson">
        <p>L'app s'appuie sur les techniques d'apprentissage les mieux validées par la recherche en sciences cognitives.</p>
        <h3>1. Répétition espacée</h3>
        <p>Chaque carte revient juste avant que tu l'oublies : 1 jour, 3 jours, 1 semaine, 3 semaines, 2 mois… Ta note (À revoir / Difficile / Bien / Facile) ajuste l'intervalle. C'est l'algorithme d'Anki (SM-2).</p>
        <h3>2. Rappel actif</h3>
        <p>Tu dois <b>produire</b> la réponse (la taper ou la dire), pas la reconnaître dans une liste. L'effort de récupération est ce qui ancre le souvenir — et c'est exactement ce que tu fais quand tu parles en réunion.</p>
        <h3>3. Entrelacement (interleaving)</h3>
        <p>La session mélange vocabulaire, grammaire, verbes et phrases au lieu de faire des blocs. C'est plus dur sur le moment, mais bien plus efficace à long terme.</p>
        <h3>4. Apprendre en contexte</h3>
        <p>Chaque mot vient avec une phrase de studio. Les exercices ciblent les erreurs typiques des francophones (present perfect, articles, faux amis…).</p>
        <h3>5. L'oral et le shadowing</h3>
        <p>Écoute 🔊, répète immédiatement en imitant le rythme. Le micro 🎤 compare ta phrase au modèle. Dire les choses à voix haute = mémoire motrice + aisance.</p>
        <h3>6. Feedback immédiat</h3>
        <p>Chaque erreur est corrigée et expliquée tout de suite, avant qu'elle ne s'installe.</p>

        <h3>7. Une progression par niveaux (A2 → C1)</h3>
        <p>Chaque carte est classée selon le Cadre européen (CECRL). Les nouvelles cartes viennent de ton niveau en cours ; tu passes au suivant quand 80 % du niveau est découvert. Les révisions des niveaux précédents continuent pour consolider.</p>
        <ul>
          <li><b>A2</b> : les bases solides (be, past simple, pronoms, articles) + le vocabulaire de survie au bureau.</li>
          <li><b>B1</b> : tous les temps courants, le vocabulaire pro et les phrasal verbs. Tu tiens une conversation.</li>
          <li><b>B2</b> : conditionnels mixtes, regrets, modaux au passé, argumentation. Tu débats en réunion.</li>
          <li><b>C1</b> : inversion, phrases clivées, nuance, idiomes. Tu parles avec aisance et diplomatie.</li>
        </ul>
        <h3>8. Les 4 compétences</h3>
        <p>Vocabulaire et grammaire (cartes), <b>compréhension orale</b> (dictées), <b>expression écrite</b> (traductions de phrases complètes) et <b>expression orale</b> (phrases clés au micro).</p>
        <p class="muted">Ordre de grandeur réaliste : environ 6 mois de pratique quotidienne pour viser le B1 solide, puis 1 à 2 ans pour le B2/C1, en complétant avec l'immersion ci-dessous.</p>

        <h2 class="mt2">🎮 Ton plan au quotidien</h2>
        <ul>
          <li><b>Chaque jour, 10-15 min</b> : la session du jour (dans le métro, en pause café).</li>
          <li><b>Au boulot</b> : dès que tu entends une expression inconnue chez un collègue → <a href="#/deck/custom">Mes mots</a>.</li>
          <li><b>Immersion passive</b> : téléphone, Slack, IDE et moteur en anglais. GDC talks et devlogs YouTube en VO avec sous-titres <i>anglais</i>.</li>
          <li><b>Avant une réunion</b> : prépare 2-3 phrases que tu veux placer.</li>
          <li><b>Écris sans traducteur</b> : rédige tes messages, puis vérifie seulement après.</li>
          <li><b>Ose les erreurs</b> : tes collègues anglais en font aussi, et ils préfèrent quelqu'un qui parle à quelqu'un qui se tait.</li>
        </ul>
      </div>`;
  }

  // ---------- Réglages ----------
  function viewSettings() {
    const s = st().settings;
    $app.innerHTML = `
      <h1>⚙️ Réglages</h1>
      <section class="panel">
        <div class="field"><label>Nouvelles cartes par jour</label>
          <input type="number" id="newPerDay" min="0" max="100" value="${s.newPerDay}" inputmode="numeric">
          <span class="small muted">15 est un bon rythme (~10-15 min/jour). Les révisions s'accumulent : n'augmente pas trop vite.</span></div>
        <div class="field"><label>Niveau de départ</label>
          <select id="startLevel">
            ${Cards.LEVELS.map((lv) => `<option value="${lv}" ${s.startLevel === lv ? "selected" : ""}>${lv} · ${LEVEL_NAMES[lv]}</option>`).join("")}
          </select>
          <span class="small muted">Les niveaux inférieurs restent accessibles depuis chaque module. Si les cartes te paraissent trop faciles, monte d'un cran.</span></div>
        <div class="field"><label>Accent</label>
          <select id="accent">
            <option value="en-GB" ${s.accent === "en-GB" ? "selected" : ""}>🇬🇧 Britannique</option>
            <option value="en-US" ${s.accent === "en-US" ? "selected" : ""}>🇺🇸 Américain</option>
          </select></div>
        <div class="field"><label>Vitesse de lecture : <span id="rate-v">${s.rate}</span></label>
          <input type="range" id="rate" min="0.6" max="1.2" step="0.05" value="${s.rate}"></div>
        <div class="field"><label><input type="checkbox" id="autoplay" ${s.autoplay ? "checked" : ""}> Lire la réponse automatiquement</label></div>
        <button class="btn" data-say="Hi! How was your weekend? Did you get up to anything nice?">🔊 Tester la voix</button>
      </section>

      <section class="panel mt">
        <h2>Sauvegarde & synchronisation</h2>
        <p class="muted small">Ta progression est stockée sur cet appareil. Exporte-la pour la sauvegarder ou la transférer entre ton téléphone et ton ordinateur.</p>
        <div class="row">
          <button class="btn" id="export">⬇️ Exporter</button>
          <label class="btn">⬆️ Importer<input type="file" id="import" accept="application/json,.json" hidden></label>
          <span class="spacer"></span>
          <button class="btn ghost" id="reset" style="color:var(--bad)">Tout réinitialiser</button>
        </div>
        <p id="msg" class="small"></p>
      </section>`;

    const saveSetting = (k, v) => { st().settings[k] = v; Store.save(); };
    document.getElementById("newPerDay").onchange = (e) => saveSetting("newPerDay", Math.max(0, Math.min(100, +e.target.value || 0)));
    document.getElementById("accent").onchange = (e) => saveSetting("accent", e.target.value);
    document.getElementById("startLevel").onchange = (e) => saveSetting("startLevel", e.target.value);
    document.getElementById("rate").oninput = (e) => { saveSetting("rate", +e.target.value); document.getElementById("rate-v").textContent = e.target.value; };
    document.getElementById("autoplay").onchange = (e) => saveSetting("autoplay", e.target.checked);
    document.getElementById("export").onclick = () => {
      const blob = new Blob([Store.exportJSON()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `english-quest-${Store.today()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    };
    document.getElementById("import").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        Store.importJSON(await file.text());
        Cards.invalidate();
        document.getElementById("msg").textContent = "✅ Progression importée.";
      } catch (err) {
        document.getElementById("msg").textContent = "❌ Fichier invalide.";
      }
    };
    document.getElementById("reset").onclick = () => {
      if (confirm("Effacer toute ta progression ? (exporte-la d'abord si tu veux la garder)")) {
        Store.reset();
        Cards.invalidate();
        go("#/");
      }
    };
  }

  // ---------- Routeur ----------
  function go(hash) { location.hash = hash; }

  function route() {
    closeModal();
    const h = location.hash.replace(/^#\/?/, "");
    const parts = h.split("/");
    document.querySelectorAll(".topbar nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#/" + parts[0]));
    window.scrollTo(0, 0);

    if (parts[0] === "session") return startSession(() => true, false, "");
    if (parts[0] === "practice" && parts[1] === "topic") {
      const t = Cards.topic(parts[2]);
      return startSession((c) => c.topic === parts[2], true, `Entraînement : ${t?.title || ""}`);
    }
    if (parts[0] === "practice") {
      const d = Cards.DECKS()[parts[1]];
      return startSession(d.filter, true, `Entraînement : ${d.title}`);
    }
    if (parts[0] === "deck") return viewDeck(parts[1]);
    if (parts[0] === "lesson") return viewLesson(parts[1]);
    if (parts[0] === "stats") return viewStats();
    if (parts[0] === "method") return viewMethod();
    if (parts[0] === "settings") return viewSettings();
    S = null;
    viewHome();
  }

  // ---------- Événements globaux ----------
  document.addEventListener("click", (e) => {
    const say = e.target.closest("[data-say]");
    if (say) { e.preventDefault(); Speech.say(say.dataset.say); return; }
    const slow = e.target.closest("[data-say-slow]");
    if (slow) { e.preventDefault(); Speech.say(slow.dataset.saySlow, 0.65); return; }
    const gr = e.target.closest("[data-grade]");
    if (gr) { rate(+gr.dataset.grade); return; }
    const goEl = e.target.closest("[data-go]");
    if (goEl) { go(goEl.dataset.go); return; }
    const lesson = e.target.closest("[data-lesson]");
    if (lesson) {
      e.preventDefault();
      showModal(`${lessonHTML(Cards.topic(lesson.dataset.lesson))}<div class="row mt"><button class="btn primary" data-close>Fermer</button></div>`);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!$modal.classList.contains("hidden")) {
      if (e.key === "Escape" || e.key === "Enter") { e.preventDefault(); closeModal(); document.getElementById("a1")?.focus(); }
      return;
    }
    if (!S) return;
    if (S.phase === "ask" && e.key === "Enter") { e.preventDefault(); check(); return; }
    if (S.phase === "answer") {
      if (["1", "2", "3", "4"].includes(e.key)) { e.preventDefault(); rate(+e.key); }
      else if (e.key === "Enter") { e.preventDefault(); rate(suggestedGrade()); }
    }
  });

  // Fermer le modal remet le focus sur la réponse
  $modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) setTimeout(() => document.getElementById("a1")?.focus(), 0); });

  window.addEventListener("hashchange", route);
  route();

  // Installation comme application (PWA) quand l'app est servie en HTTPS
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
