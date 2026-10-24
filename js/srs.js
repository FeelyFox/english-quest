// Répétition espacée (variante de SM-2, l'algorithme d'Anki).
// Notes : 1 = À revoir, 2 = Difficile, 3 = Bien, 4 = Facile.
const SRS = (() => {
  const MIN = 60 * 1000;
  const DAY = 24 * 60 * MIN;

  function fresh() {
    return { reps: 0, interval: 0, ease: 2.5, due: 0, lapses: 0, last: 0 };
  }

  // Petite variation aléatoire pour éviter que toutes les cartes reviennent le même jour
  function fuzz(days) {
    if (days < 3) return days;
    const spread = Math.max(1, Math.round(days * 0.05));
    return days + Math.round((Math.random() * 2 - 1) * spread);
  }

  function schedule(prev, grade, now = Date.now()) {
    const s = { ...(prev || fresh()) };
    s.last = now;

    if (grade === 1) {
      if (s.reps > 0) s.lapses++;
      s.reps = 0;
      s.interval = 0;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.due = now + 10 * MIN;
      return s;
    }

    if (s.reps === 0) {
      s.interval = { 2: 1, 3: 1, 4: 4 }[grade];
    } else if (s.reps === 1) {
      s.interval = { 2: 2, 3: 3, 4: 6 }[grade];
    } else {
      const factor = { 2: 1.2, 3: s.ease, 4: s.ease * 1.3 }[grade];
      s.interval = Math.max(s.interval + 1, Math.round(s.interval * factor));
    }
    s.interval = fuzz(s.interval);
    s.ease = Math.min(3.0, Math.max(1.3, s.ease + { 2: -0.15, 3: 0, 4: 0.15 }[grade]));
    s.reps++;
    // Dû en début de journée pour que la carte soit disponible dès le matin
    const d = new Date(now + s.interval * DAY);
    d.setHours(4, 0, 0, 0);
    s.due = d.getTime();
    return s;
  }

  // Aperçu de l'intervalle affiché sous chaque bouton
  function preview(prev, grade) {
    const s = schedule(prev, grade);
    if (grade === 1) return "10 min";
    const days = s.interval;
    if (days < 30) return `${days} j`;
    if (days < 365) return `${Math.round(days / 30)} mois`;
    return `${(days / 365).toFixed(1)} an`;
  }

  function isDue(s, now = Date.now()) { return s && s.due <= now; }
  function isMature(s) { return s && s.interval >= 21; }
  function isLeech(s) { return s && s.lapses >= 4; }

  return { schedule, preview, isDue, isMature, isLeech, fresh };
})();
