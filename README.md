# English Quest

App web (sans dépendances, sans build) pour progresser en anglais pro de game dev : vocabulaire, phrasal verbs, faux amis, grammaire, conjugaison, verbes irréguliers et phrases orales.

## Lancer en local

```bash
python3 -m http.server 8642
```

Puis ouvrir http://localhost:8642. (Double-cliquer sur `index.html` marche aussi, sans le mode hors ligne.)

## Sur Android

L'app est une PWA : une fois hébergée en HTTPS (GitHub Pages, Netlify…), ouvre-la dans Chrome → menu ⋮ → **Ajouter à l'écran d'accueil**. Elle marche ensuite hors ligne.

La progression est stockée sur chaque appareil. Pour passer de l'ordi au téléphone : Réglages → Exporter, puis Importer sur l'autre appareil.

## Structure

- `js/data/` : le contenu (facile à enrichir)
- `js/srs.js` : répétition espacée (SM-2)
- `js/check.js` : correction tolérante (contractions, fautes de frappe)
- `js/app.js` : interface et sessions
- `sw.js` : cache hors ligne — incrémenter `VERSION` après chaque modification
