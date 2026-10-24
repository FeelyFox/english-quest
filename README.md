# English Quest

App web (sans dépendances, sans build) pour progresser en anglais pro de game dev, du niveau A2 au C1 : ~1000 cartes de vocabulaire, grammaire (42 leçons), conjugaison, verbes irréguliers, phrases orales, dictées et traductions.

En ligne : https://feelyfox.github.io/english-quest/

## Lancer en local

```bash
python3 -m http.server 8642
```

Puis ouvrir http://localhost:8642. (Double-cliquer sur `index.html` marche aussi, sans le mode hors ligne.)

## Sur Android

L'app est une PWA : une fois hébergée en HTTPS (GitHub Pages, Netlify…), ouvre-la dans Chrome → menu ⋮ → **Ajouter à l'écran d'accueil**. Elle marche ensuite hors ligne.

La progression est stockée sur chaque appareil. Pour passer de l'ordi au téléphone : Réglages → Exporter, puis Importer sur l'autre appareil.

## Structure

- `js/data/` : le contenu, chaque élément est classé par niveau (A2, B1, B2, C1). Ajouter des éléments **à la fin** des listes : les identifiants des cartes dépendent de leur position pour les phrases, dictées et traductions.
- `js/srs.js` : répétition espacée (SM-2)
- `js/check.js` : correction tolérante (contractions, fautes de frappe)
- `js/app.js` : interface et sessions
- `sw.js` : cache hors ligne — incrémenter `VERSION` après chaque modification
